import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { customerAddress, customerEmail, customerName, customerPhone, getAdminOrders, orderTotal } from "../admin/adminUtils";

const statuses = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];
const money = (amount) => new Intl.NumberFormat(undefined, { style: "currency", currency: "PKR" }).format(amount || 0);

export default function AdminOrdersView() {
  const { orders, refreshOrders, updateOrderStatus } = useApp();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [updateError, setUpdateError] = useState("");
  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let active = true;
    const loadOrders = async () => {
      try {
        await refreshOrders();
        if (active) setLoadError("");
      } catch (error) {
        if (active) setLoadError(error.message || "Unable to load orders from Supabase.");
      }
    };

    loadOrders();
    const intervalId = window.setInterval(loadOrders, 3000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [refreshOrders]);
  const filtered = useMemo(() => getAdminOrders(orders).filter((order) => {
    const search = query.trim().toLowerCase();
    const matchesSearch = !search || [order.orderNumber, order.id, customerName(order), customerEmail(order), customerPhone(order)].some((value) => String(value || "").toLowerCase().includes(search));
    return matchesSearch && (status === "All statuses" || (order.status || "Pending") === status);
  }), [orders, query, status]);
  const handleStatusChange = async (orderId, nextStatus) => {
    setUpdateError("");
    try {
      await updateOrderStatus(orderId, nextStatus);
    } catch (error) {
      setUpdateError(error.message || "Unable to update order status.");
    }
  };

  return <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
    <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C6E72]">Fulfillment</p><h1 className="mt-1 font-serif text-3xl font-bold text-[#43111F]">Orders</h1><p className="mt-1 text-sm text-[#7C6E72]">Review customer orders and update fulfillment status.</p></div>
    <div className="flex flex-col gap-3 sm:flex-row"><label className="relative min-w-0 flex-1"><Search size={16} className="absolute left-3 top-3 text-[#7C6E72]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, customer, email, or phone" className="w-full rounded-md border border-[#D2BCB0] bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#6E1F35]" /></label><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-md border border-[#D2BCB0] bg-white px-3 py-2.5 text-sm"><option>All statuses</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div>
    {updateError && <p role="alert" className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">{updateError}</p>}
    {loadError && <p role="alert" className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">{loadError}</p>}
    {filtered.length === 0 ? <div className="rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] px-5 py-12 text-center text-sm text-[#7C6E72]">No orders yet</div> : <>
      <div className="hidden overflow-hidden rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] shadow-sm md:block"><div className="overflow-x-auto"><table className="w-full min-w-[1250px] text-left text-sm"><thead className="bg-[#F7F1EC] text-[11px] uppercase tracking-wide text-[#7C6E72]"><tr>{["Order", "Customer", "Phone", "Email", "Address", "Date", "Items", "Total", "Payment", "Status", "View"].map((label) => <th key={label} className="px-4 py-3">{label}</th>)}</tr></thead><tbody>{filtered.map((order) => <tr key={order.id} className="border-t border-[#E5D8D0]"><td className="px-4 py-3 font-semibold text-[#43111F]">{order.orderNumber || order.id}</td><td className="px-4 py-3">{customerName(order) || "—"}</td><td className="px-4 py-3">{customerPhone(order) || "—"}</td><td className="px-4 py-3">{customerEmail(order) || "—"}</td><td className="max-w-56 px-4 py-3">{customerAddress(order) || "—"}</td><td className="px-4 py-3">{order.date || "—"}</td><td className="px-4 py-3">{order.items?.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) || 0}</td><td className="px-4 py-3">{money(orderTotal(order))}</td><td className="max-w-36 truncate px-4 py-3">{order.paymentMethod || "—"}</td><td className="px-4 py-3"><select aria-label={`Status for ${order.orderNumber || order.id}`} value={order.status || "Pending"} onChange={(event) => handleStatusChange(order.id, event.target.value)} className="rounded border border-[#D2BCB0] bg-white px-2 py-1.5 text-xs">{statuses.map((item) => <option key={item}>{item}</option>)}</select></td><td className="px-4 py-3"><Link to={`/order-confirmation/${order.id}`} aria-label={`View ${order.orderNumber || order.id}`} className="inline-flex rounded border border-[#6E1F35]/25 p-2 text-[#6E1F35] hover:bg-[#F7F1EC]"><Eye size={15} /></Link></td></tr>)}</tbody></table></div></div>
      <div className="space-y-3 md:hidden">{filtered.map((order) => <article key={order.id} className="rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-[#43111F]">{order.orderNumber || order.id}</p><p className="mt-1 text-xs text-[#7C6E72]">{customerName(order) || "Customer details unavailable"} · {order.date || "No date"}</p><p className="mt-1 text-xs text-[#7C6E72]">{customerPhone(order)} · {customerEmail(order)}</p><p className="mt-1 text-xs text-[#7C6E72]">{customerAddress(order)}</p></div><Link to={`/order-confirmation/${order.id}`} className="rounded border border-[#6E1F35]/25 p-2 text-[#6E1F35]" aria-label={`View ${order.orderNumber || order.id}`}><Eye size={15} /></Link></div><div className="mt-3 flex items-center justify-between text-sm"><span>{money(orderTotal(order))}</span><span>{order.items?.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) || 0} items</span></div><select aria-label={`Status for ${order.orderNumber || order.id}`} value={order.status || "Pending"} onChange={(event) => handleStatusChange(order.id, event.target.value)} className="mt-3 w-full rounded border border-[#D2BCB0] bg-white px-2 py-2 text-sm">{statuses.map((item) => <option key={item}>{item}</option>)}</select></article>)}</div>
    </>}
  </main>;
}
