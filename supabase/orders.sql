create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer jsonb not null,
  items jsonb not null,
  payment_method text,
  notes text,
  totals jsonb not null,
  status text not null default 'Pending'
    check (status in ('Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
  access_token_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_order_number_idx on public.orders (order_number);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create or replace function public.is_store_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.id = (select auth.uid())
      and lower(au.email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
  );
$$;

alter table public.admin_users enable row level security;
alter table public.orders enable row level security;

revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
drop policy if exists "Admins can read their own admin membership" on public.admin_users;
create policy "Admins can read their own admin membership"
on public.admin_users for select to authenticated
using (id = (select auth.uid()) and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), '')));

revoke all on public.orders from anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant select, update on public.orders to authenticated;
drop policy if exists "Public checkout can create pending orders" on public.orders;
create policy "Public checkout can create pending orders"
on public.orders for insert to anon, authenticated
with check (
  status = 'Pending'
  and length(access_token_hash) = 64
  and jsonb_typeof(customer) = 'object'
  and jsonb_typeof(items) = 'array'
  and jsonb_typeof(totals) = 'object'
);
drop policy if exists "Store admins can read orders" on public.orders;
create policy "Store admins can read orders"
on public.orders for select to authenticated
using ((select public.is_store_admin()));
drop policy if exists "Store admins can update orders" on public.orders;
create policy "Store admins can update orders"
on public.orders for update to authenticated
using ((select public.is_store_admin()))
with check ((select public.is_store_admin()));

create or replace function public.customer_order_by_token(p_order_id uuid, p_access_token text)
returns table (
  id uuid,
  order_number text,
  customer jsonb,
  items jsonb,
  payment_method text,
  notes text,
  totals jsonb,
  status text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select o.id, o.order_number, o.customer, o.items, o.payment_method,
         o.notes, o.totals, o.status, o.created_at, o.updated_at
  from public.orders o
  where o.id = p_order_id
    and o.access_token_hash = encode(extensions.digest(p_access_token, 'sha256'), 'hex')
  limit 1;
$$;

revoke all on function public.is_store_admin() from public, anon;
grant execute on function public.is_store_admin() to authenticated;
revoke all on function public.customer_order_by_token(uuid, text) from public;
grant execute on function public.customer_order_by_token(uuid, text) to anon, authenticated;

-- Enable Realtime for admin order updates. Ignore duplicate publication membership.
do $$
begin
  alter publication supabase_realtime add table public.orders;
exception when duplicate_object then
  null;
end;
$$;
