create table if not exists public.products (
  id text primary key,
  name text not null default '',
  price numeric not null default 0,
  description text not null default '',
  category text not null default '',
  image text not null default '',
  in_stock boolean not null default true,
  is_sale boolean not null default false,
  is_new_arrival boolean not null default false,
  is_hot_article boolean not null default false,
  brand text not null default 'FK Decore',
  rating numeric not null default 0,
  reviews_count integer not null default 0,
  sizes jsonb not null default '["One Size"]'::jsonb,
  top_notes jsonb not null default '[]'::jsonb,
  middle_notes jsonb not null default '[]'::jsonb,
  base_notes jsonb not null default '[]'::jsonb,
  is_bestseller boolean not null default false,
  is_royal_oud boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products add column if not exists name text not null default '';
alter table public.products add column if not exists price numeric not null default 0;
alter table public.products add column if not exists description text not null default '';
alter table public.products add column if not exists category text not null default '';
alter table public.products add column if not exists image text not null default '';
alter table public.products add column if not exists in_stock boolean not null default true;
alter table public.products add column if not exists is_sale boolean not null default false;
alter table public.products add column if not exists is_new_arrival boolean not null default false;
alter table public.products add column if not exists is_hot_article boolean not null default false;
alter table public.products add column if not exists brand text not null default 'FK Decore';
alter table public.products add column if not exists rating numeric not null default 0;
alter table public.products add column if not exists reviews_count integer not null default 0;
alter table public.products add column if not exists sizes jsonb not null default '["One Size"]'::jsonb;
alter table public.products add column if not exists top_notes jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists middle_notes jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists base_notes jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists is_bestseller boolean not null default false;
alter table public.products add column if not exists is_royal_oud boolean not null default false;
alter table public.products add column if not exists featured boolean not null default false;
alter table public.products add column if not exists created_at timestamptz not null default now();
alter table public.products add column if not exists updated_at timestamptz not null default now();

alter table public.products enable row level security;
revoke all on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

drop policy if exists "Anyone can read products" on public.products;
create policy "Anyone can read products"
on public.products for select to anon, authenticated
using (true);

drop policy if exists "Store admins can insert products" on public.products;
create policy "Store admins can insert products"
on public.products for insert to authenticated
with check ((select public.is_store_admin()));

drop policy if exists "Store admins can update products" on public.products;
create policy "Store admins can update products"
on public.products for update to authenticated
using ((select public.is_store_admin()))
with check ((select public.is_store_admin()));

drop policy if exists "Store admins can delete products" on public.products;
create policy "Store admins can delete products"
on public.products for delete to authenticated
using ((select public.is_store_admin()));

do $$
begin
  alter publication supabase_realtime add table public.products;
exception when duplicate_object then
  null;
end;
$$;
