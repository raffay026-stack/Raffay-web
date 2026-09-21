import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Eye,
  Crown
} from "lucide-react";
import { ORDERS } from "../constants/testIds";

export default function MyOrdersView() {
  const { orders } = useApp();
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = orders.filter(o => {
    if (selectedStatus === "all") return true;
    return o.status.toLowerCase() === selectedStatus.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-serif selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
      <Navbar onOpenCart={() => {}} onOpenQuiz={() => {}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-neutral-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest mb-1">
              <Crown className="w-4 h-4" />
              <span>Connoisseur VIP Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F3E5AB]">
              Order History & Tracking
            </h1>
          </div>

          <div className="flex gap-2">
            {["all", "processing", "shipped", "delivered"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-4 py-2 rounded text-xs uppercase tracking-widest font-serif transition-all ${selectedStatus === st ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-lg' : 'bg-[#12100C] text-neutral-400 border border-[#D4AF37]/30 hover:border-[#D4AF37]'}`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-24 bg-[#12100C] border border-[#D4AF37]/20 rounded-lg space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#1A1610] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Package className="w-8 h-8 opacity-60" />
            </div>
            <h4 className="font-serif text-lg text-neutral-300">No Orders Found</h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto font-serif">
              You have no orders matching this status. Explore our 100 luxury perfumes to make your first acquisition.
            </p>
            <button
              onClick={() => navigate("/catalog")}
              className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest rounded shadow"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-gradient-to-b from-[#12100C] to-[#0A0A0A] border border-[#D4AF37]/30 rounded-lg p-6 sm:p-8 shadow-xl space-y-6"
                data-testid={ORDERS.orderCard}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-neutral-800 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Order Identifier</span>
                    <h3 className="text-lg font-bold text-[#D4AF37]">#{order.id}</h3>
                    <div className="text-xs text-neutral-400">Placed on {order.date}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Status</span>
                      <span className="text-xs px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold inline-flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{order.status}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/order-confirmation/${order.id}`)}
                      className="px-4 py-2 bg-[#1C1610] border border-[#D4AF37]/40 text-[#D4AF37] font-serif text-xs uppercase tracking-wider rounded hover:bg-[#282117] transition-all flex items-center gap-1.5"
                      data-testid={ORDERS.viewReceiptBtn}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded bg-[#0A0A0A] border border-[#D4AF37]/20">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-[#D4AF37]/30" />
                      <div className="flex-1">
                        <div className="text-[9px] text-[#D4AF37] uppercase tracking-wider">{item.brand}</div>
                        <div className="font-serif text-xs font-medium text-neutral-200 line-clamp-1">{item.name}</div>
                        <div className="text-[10px] text-neutral-400">Size: {item.selectedSize} × {item.quantity}</div>
                      </div>
                      <div className="font-serif text-xs font-bold text-[#D4AF37]">${item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>

                {/* Footer Details */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-neutral-800 text-xs font-serif gap-2">
                  <div className="text-neutral-400">
                    Shipping to: <span className="text-neutral-200">{order.shippingAddress?.fullName}, {order.shippingAddress?.city}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-neutral-400">Grand Total: <strong className="text-[#D4AF37] text-sm">${order.grandTotal?.toFixed(2)}</strong></span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}


