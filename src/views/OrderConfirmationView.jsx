import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Logo from "../assets/logo.svg";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from '../components/ScentQuizModal';
import { 
  Crown, 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  Package, 
  Truck,
  ShieldCheck
} from "lucide-react";
import { ORDERS } from "../constants/testIds";

export default function OrderConfirmationView() {
  const { id } = useParams();
  const { orders } = useApp();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const order = orders.find(o => o.id === id) || orders[0] || {
    id: id || "ORD-98421",
    date: new Date().toISOString().split("T")[0],
    status: "Processing",
    items: [],
    subtotal: 395,
    shipping: 0,
    tax: 31.60,
    discount: 0,
    grandTotal: 426.60,
    shippingAddress: {
      fullName: "Alexander Wright",
      address: "742 Evergreen Terrace, Suite 400",
      city: "New York",
      postalCode: "10021",
      country: "United States"
    },
    paymentMethod: "Credit Card (â€¢â€¢â€¢â€¢ 4242)"
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-serif selection:bg-[#080809] selection:text-[#0A0A0A]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      <div className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Success header */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#080809] to-[#46CDB3] flex items-center justify-center text-[#0A0A0A] shadow-2xl animate-in zoom-in duration-300">
            <img src={Logo} alt="SCENTORA" className="w-14 h-14 object-contain scentora-logo-badge" />
          </div>

          <div className="space-y-1">
            <span className="text-xs text-[#080809] uppercase tracking-[0.25em]">Welcome to Our Private Salon</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F3EFE6]">
              Order Successfully Placed
            </h1>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Your order <span className="text-[#080809] font-bold">#{order.id}</span> has been received and is currently being prepared by our master bottlers.
            </p>
          </div>
        </div>

        {/* Receipt Card */}
        <div className="bg-[#12100C] border border-[#080809]/40 rounded-lg p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#080809]/5 blur-3xl rounded-full pointer-events-none" />

          {/* Receipt Top Meta */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-neutral-800 gap-4">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Order Identifier</span>
              <span className="text-lg font-bold text-[#080809]">#{order.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Date Placed</span>
              <span className="text-sm text-neutral-200">{order.date}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Status</span>
              <span className="text-xs px-2.5 py-1 rounded bg-[#080809]/20 text-[#080809] border border-[#080809]/40 inline-flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{order.status}</span>
              </span>
            </div>
          </div>

          {/* Shipping & Payment Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-serif pb-6 border-b border-neutral-800">
            <div className="space-y-2">
              <span className="text-[#080809] uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>Shipping Destination</span>
              </span>
              <div className="text-neutral-300 space-y-0.5">
                <div className="font-bold text-neutral-100">{order.shippingAddress?.fullName}</div>
                <div>{order.shippingAddress?.address}</div>
                <div>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</div>
                <div>{order.shippingAddress?.country}</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[#080809] uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Payment Method</span>
              </span>
              <div className="text-neutral-300 space-y-0.5">
                <div className="font-bold text-neutral-100">{order.paymentMethod}</div>
                <div className="text-green-400">Status: Verified & Secured</div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-4">
            <h4 className="text-xs text-[#080809] uppercase tracking-wider font-bold">Flacons Included in Order</h4>
            <div className="space-y-3">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded bg-[#0A0A0A] border border-[#080809]/20">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-[#080809]/30" />
                    <div>
                      <div className="text-[10px] text-[#080809] uppercase tracking-wider">{item.brand}</div>
                      <div className="font-serif text-xs font-medium text-neutral-100">{item.name}</div>
                      <div className="text-[11px] text-neutral-400">Size: {item.selectedSize} | Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-serif text-sm font-bold text-[#080809]">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="space-y-2 text-xs font-serif text-neutral-400 pt-4 border-t border-neutral-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-neutral-200">${order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Insured Shipping</span>
              <span className="text-neutral-200">{order.shipping === 0 ? "FREE" : `$${order.shipping?.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span className="text-neutral-200">${order.tax?.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#080809]">
                <span>Privilege Discount</span>
                <span>-${order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#080809] pt-3 border-t border-neutral-800">
              <span>Grand Total</span>
              <span>${order.grandTotal?.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-800">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-[#1C1610] border border-[#080809]/40 text-[#080809] font-serif text-xs uppercase tracking-widest rounded hover:bg-[#282117] transition-all flex items-center justify-center gap-2"
              data-testid={ORDERS.viewReceiptBtn}
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Receipt</span>
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="flex-1 py-3 bg-gradient-to-r from-[#080809] to-[#46CDB3] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>View My Orders Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}


















