import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, LogOut } from "lucide-react";
import { requireSupabase } from "../lib/supabaseClient";

const STORAGE_KEY = "fk_decore_admin_settings";
const defaults = { storeName: "FK Decore", primaryColor: "#6E1F35", currency: "PKR", shippingFee: "25" };

const readSettings = () => {
  try { return { ...defaults, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) }; }
  catch { return defaults; }
};

export default function AdminSettingsView() {
  const [settings, setSettings] = useState(readSettings);
  const [saved, setSaved] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();
  const update = (field, value) => { setSettings((current) => ({ ...current, [field]: value })); setSaved(false); };
  const save = (event) => { event.preventDefault(); localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); setSaved(true); };
  const logout = async () => {
    setLogoutError("");
    try {
      const { error } = await requireSupabase().auth.signOut();
      if (error) throw error;
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Admin sign out failed:", error);
      setLogoutError(error.message || "Unable to end the admin session. Please try again.");
    }
  };

  return <main className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C6E72]">Store configuration</p><h1 className="mt-1 font-serif text-3xl font-bold text-[#43111F]">Settings</h1><p className="mt-1 text-sm text-[#7C6E72]">These preferences are stored locally and do not change checkout behavior.</p></div><form onSubmit={save} className="space-y-5 rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] p-5 shadow-sm sm:p-7"><label className="block text-sm font-medium">Store name<input value={settings.storeName} onChange={(event) => update("storeName", event.target.value)} className="mt-2 w-full rounded-md border border-[#D2BCB0] bg-white px-3 py-2.5 outline-none focus:border-[#6E1F35]" /></label><label className="block text-sm font-medium">Primary theme color<span className="mt-2 flex gap-3"><input type="color" value={settings.primaryColor} onChange={(event) => update("primaryColor", event.target.value)} className="h-11 w-14 rounded border border-[#D2BCB0] p-1" /><input value={settings.primaryColor} onChange={(event) => update("primaryColor", event.target.value)} className="min-w-0 flex-1 rounded-md border border-[#D2BCB0] px-3 py-2.5 font-mono text-sm" /></span></label><label className="block text-sm font-medium">Currency<select value={settings.currency} onChange={(event) => update("currency", event.target.value)} className="mt-2 w-full rounded-md border border-[#D2BCB0] bg-white px-3 py-2.5"><option value="PKR">PKR</option></select></label><label className="block text-sm font-medium">Shipping fee<input type="number" min="0" step="0.01" value={settings.shippingFee} onChange={(event) => update("shippingFee", event.target.value)} className="mt-2 w-full rounded-md border border-[#D2BCB0] bg-white px-3 py-2.5" /></label><div className="flex flex-wrap items-center gap-3 border-t border-[#E5D8D0] pt-5">{logoutError && <p role="alert" className="w-full text-sm text-red-800">{logoutError}</p>}<button type="submit" className="inline-flex items-center gap-2 rounded-md bg-[#6E1F35] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#43111F]"><Save size={16} />Save settings</button>{saved && <span role="status" className="text-sm text-green-800">Saved on this device.</span>}<button type="button" onClick={logout} className="ml-auto inline-flex items-center gap-2 rounded-md border border-[#6E1F35]/30 px-4 py-2.5 text-sm text-[#6E1F35] hover:bg-[#F7F1EC]"><LogOut size={15} />End admin session</button></div></form></main>;
}
