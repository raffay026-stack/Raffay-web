import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { customerEmail, customerName, customerPhone, getAdminOrders, orderTotal } from "../admin/adminUtils";

const money = (amount) => new Intl.NumberFormat(undefined, { style: "currency", currency: "PKR" }).format(amount || 0);

export default function AdminCustomersView() {
  const { orders } = useApp();
  const customers = useMemo(() => {
    const byEmail = new Map();
    getAdminOrders(orders).forEach((order) => {
      const name = customerName(order).trim();
      const email = customerEmail(order).trim();
      const phone = customerPhone(order).trim();
      if (!name && !email && !phone) return;
      const key = email.toLowerCase() || `${name.toLowerCase()}|${phone}`;
      if (!key.replace("|", "")) return;
      const customer = byEmail.get(key) || { name, email, phone, orderCount: 0, totalSpent: 0 };
      customer.name ||= name;
      customer.email ||= email;
      customer.phone ||= phone;
      customer.orderCount += 1;
      if (order.status !== "Cancelled") customer.totalSpent += orderTotal(order);
      byEmail.set(key, customer);
    });
    return [...byEmail.values()].sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  return <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C6E72]">Customer records</p><h1 className="mt-1 font-serif text-3xl font-bold text-[#43111F]">Customers</h1><p className="mt-1 text-sm text-[#7C6E72]">Built only from customer details present in orders.</p></div>{customers.length === 0 ? <div className="rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] px-5 py-12 text-center text-sm text-[#7C6E72]">No customer records yet</div> : <div className="overflow-hidden rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-[#F7F1EC] text-xs uppercase tracking-wide text-[#7C6E72]"><tr>{["Name", "Email", "Phone", "Orders", "Total spent"].map((heading) => <th key={heading} className="px-5 py-3">{heading}</th>)}</tr></thead><tbody>{customers.map((customer) => <tr key={customer.email || `${customer.name}-${customer.phone}`} className="border-t border-[#E5D8D0]"><td className="px-5 py-3 font-medium">{customer.name || "—"}</td><td className="px-5 py-3">{customer.email || "—"}</td><td className="px-5 py-3">{customer.phone || "—"}</td><td className="px-5 py-3">{customer.orderCount}</td><td className="px-5 py-3">{money(customer.totalSpent)}</td></tr>)}</tbody></table></div></div>}</main>;
}
