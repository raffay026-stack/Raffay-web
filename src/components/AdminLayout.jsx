import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ReceiptText, Users, Settings, Store, Menu, X, LogOut } from "lucide-react";
import { isAuthorizedAdmin, isSupabaseConfigured, requireSupabase } from "../lib/supabaseClient";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ReceiptText },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    isAuthorizedAdmin().then((result) => {
      if (!active) return;
      setAuthorized(result);
      setChecking(false);
    }).catch(() => {
      if (active) setChecking(false);
    });
    return () => { active = false; };
  }, []);

  if (checking) return null;
  if (!authorized || !isSupabaseConfigured) return <Navigate to="/admin" replace />;

  const logout = async () => {
    await requireSupabase().auth.signOut();
    navigate("/admin", { replace: true });
  };

  const sidebar = (
    <>
      <div className="flex h-20 items-center justify-between border-b border-[#43111F]/20 px-5">
        <Link to="/admin/dashboard" className="font-serif text-xl font-bold text-[#43111F]">FK DECORE <span className="block text-[10px] font-medium tracking-[0.18em] text-[#7C6E72]">ADMINISTRATION</span></Link>
        <button className="rounded p-2 text-[#6E1F35] md:hidden" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><X size={20} /></button>
      </div>
      <nav className="space-y-1 p-3" aria-label="Admin navigation">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={() => setDrawerOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${isActive ? "bg-[#6E1F35] text-white" : "text-[#5D5054] hover:bg-[#F7F1EC] hover:text-[#43111F]"}`}>
            <Icon size={17} strokeWidth={1.8} />{label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-[#43111F]/15 p-3">
        <Link to="/" className="mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#5D5054] hover:bg-[#F7F1EC]"><Store size={17} />View Website</Link>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#6E1F35] hover:bg-[#F7F1EC]"><LogOut size={17} />Log out</button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F7F1EC] text-[#2D2326] md:flex">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-[#43111F]/15 bg-[#FFFDF8] md:flex">{sidebar}</aside>
      {drawerOpen && <button className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setDrawerOpen(false)} aria-label="Close navigation overlay" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#43111F]/15 bg-[#FFFDF8] transition-transform md:hidden ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>{sidebar}</aside>
      <div className="min-w-0 flex-1 md:ml-60">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#43111F]/15 bg-[#FFFDF8]/95 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3"><button onClick={() => setDrawerOpen(true)} className="rounded p-2 text-[#6E1F35] hover:bg-[#F7F1EC] md:hidden" aria-label="Open navigation"><Menu size={20} /></button><span className="font-serif text-lg font-semibold text-[#43111F]">FK Decore <span className="font-normal text-[#7C6E72]">/ Admin</span></span></div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded border border-[#6E1F35]/30 px-3 py-2 text-xs font-semibold text-[#6E1F35] hover:bg-[#F7F1EC]"><LogOut size={15} />Log out</button>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
