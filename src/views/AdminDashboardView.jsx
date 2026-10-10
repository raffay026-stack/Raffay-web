import React from "react";
import { Link } from "react-router-dom";
import { Package, ReceiptText, Clock3, CheckCircle2, Banknote, Boxes, ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { customerName, getAdminOrders, orderTotal } from "../admin/adminUtils";

const money = (amount) => new Intl.NumberFormat(undefined, { style: "currency", currency: "PKR" }).format(amount || 0);

export default function AdminDashboardView() {
  const { products, orders } = useApp();
  const realOrders = getAdminOrders(orders);
  const deliveredOrders = realOrders.filter((order) => order.status === "Delivered");
  const pendingOrders = realOrders.filter((order) => order.status === "Pending");
  const totalSales = realOrders.filter((order) => order.status !== "Cancelled").reduce((sum, order) => sum + orderTotal(order), 0);
  const lowStock = products.filter((product) => Number.isFinite(Number(product.stockQuantity)) && Number(product.stockQuantity) <= 5).length;
  const productCounts = [
    ["Sale products", products.filter((product) => product.isSale).length],
    ["New arrivals", products.filter((product) => product.isNewArrival).length],
    ["Hot articles", products.filter((product) => product.isHotArticle).length],
    ["Out of stock", products.filter((product) => !product.inStock).length]
  ];
  const stats = [
    ["Total products", products.length, Package],
    ...productCounts.map(([label, count]) => [label, count, Package]),
    ["Total orders", realOrders.length, ReceiptText],
    ["Pending orders", pendingOrders.length, Clock3],
    ["Completed orders", deliveredOrders.length, CheckCircle2],
    ["Total sales", money(totalSales), Banknote],
    ["Low stock", lowStock, Boxes]
  ];
  const recentOrders = [...realOrders].sort((a, b) => String(b.createdAt || b.date || "").localeCompare(String(a.createdAt || a.date || ""))).slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
      <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C6E72]">Store overview</p><h1 className="mt-1 font-serif text-3xl font-bold text-[#43111F]">Dashboard</h1><p className="mt-1 text-sm text-[#7C6E72]">A current view of store activity and inventory.</p></div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value, Icon]) => <article key={label} className="rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] p-5 shadow-sm"><div className="flex items-start justify-between"><span className="text-sm text-[#7C6E72]">{label}</span><Icon size={18} className="text-[#6E1F35]" /></div><div className="mt-4 text-2xl font-semibold text-[#2D2326]">{value}</div></article>)}
      </section>
      <section className="overflow-hidden rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E5D8D0] px-5 py-4"><div><h2 className="font-serif text-lg font-bold text-[#43111F]">Recent orders</h2><p className="text-xs text-[#7C6E72]">Latest customer orders</p></div><Link to="/admin/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E1F35] hover:underline">All orders <ArrowUpRight size={14} /></Link></div>
        {recentOrders.length === 0 ? <p className="px-5 py-8 text-sm text-[#7C6E72]">No orders yet</p> : <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-[#F7F1EC] text-xs uppercase tracking-wide text-[#7C6E72]"><tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Total</th><th className="px-5 py-3">Status</th></tr></thead><tbody>{recentOrders.map((order) => <tr key={order.id} className="border-t border-[#E5D8D0]"><td className="px-5 py-3 font-medium text-[#43111F]">{order.orderNumber || order.id}</td><td className="px-5 py-3">{customerName(order) || "â€”"}</td><td className="px-5 py-3">{order.date || "â€”"}</td><td className="px-5 py-3">{money(orderTotal(order))}</td><td className="px-5 py-3"><span className="rounded-full bg-[#F7F1EC] px-2.5 py-1 text-xs text-[#6E1F35]">{order.status || "Pending"}</span></td></tr>)}</tbody></table></div>}
      </section>
      <section className="rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-serif text-lg font-bold text-[#43111F]">Product summary</h2><p className="mt-1 text-xs text-[#7C6E72]">Current active catalog</p></div><Link to="/admin/products" className="text-xs font-semibold text-[#6E1F35] hover:underline">Manage products</Link></div><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0, 4).map((product) => <div key={product.id} className="flex min-w-0 items-center gap-3 rounded-md border border-[#E5D8D0] p-3"><img src={product.image} alt="" className="h-12 w-12 rounded border border-[#E5D8D0] bg-white object-contain" /><div className="min-w-0"><p className="truncate text-sm font-medium">{product.name}</p></div></div>)}</div></section>
    </main>
  );
}

