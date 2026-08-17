import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from '../components/ScentQuizModal';
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = orders.filter(o => {
    if (selectedStatus === "all") return true;
    return o.status.toLowerCase() === selectedStatus.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif selection:bg-[#43111F] selection:text-[#FFFDF8]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-[#E5D8D0] gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#43111F] uppercase tracking-widest mb-1">
              <Crown className="w-4 h-4" />
              <span>Connoisseur VIP Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F3EFE6]">
              Order History & Tracking
            </h1>
          </div>

          <div className="flex gap-2">
            {["all", "processing", "shipped", "delivered"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-4 py-2 rounded text-xs uppercase tracking-widest font-serif transition-all ${selectedStatus === st ? 'bg-[#43111F] text-[#FFFDF8] font-bold shadow-lg' : 'bg-[#FFFFFF] text-[#7C6E72] border border-[#43111F]/30 hover:border-[#43111F]'}`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-24 bg-[#FFFFFF] border border-[#43111F]/20 rounded-lg space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#F7F1EC] border border-[#43111F]/30 flex items-center justify-center text-[#43111F]">
              <Package className="w-8 h-8 opacity-60" />
            </div>
            <h4 className="font-serif text-lg text-[#5D5054]">No Orders Found</h4>
            <p className="text-xs text-[#8A7A80] max-w-xs mx-auto font-serif">
              You have no orders matching this status. Explore our 100 luxury Perfumes to make your first acquisition.
            </p>
            <button
              onClick={() => navigate("/catalog")}
              className="px-6 py-2.5 bg-gradient-to-r from-[#43111F] to-[#87344D] text-[#FFFDF8] font-serif text-xs font-bold uppercase tracking-widest rounded shadow"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-gradient-to-b from-[#FFFFFF] to-[#FFFDF8] border border-[#43111F]/30 rounded-lg p-6 sm:p-8 shadow-xl space-y-6"
                data-testid={ORDERS.orderCard}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-[#E5D8D0] gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#8A7A80] uppercase tracking-widest">Order Identifier</span>
                    <h3 className="text-lg font-bold text-[#43111F]">#{order.id}</h3>
                    <div className="text-xs text-[#7C6E72]">Placed on {order.date}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-[#8A7A80] uppercase tracking-widest block">Status</span>
                      <span className="text-xs px-3 py-1 rounded bg-[#43111F]/20 text-[#43111F] border border-[#43111F]/40 font-bold inline-flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{order.status}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/order-confirmation/${order.id}`)}
                      className="px-4 py-2 bg-[#F7F1EC] border border-[#43111F]/40 text-[#43111F] font-serif text-xs uppercase tracking-wider rounded hover:bg-[#EFE5D8] transition-all flex items-center gap-1.5"
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
                    <div key={idx} className="flex items-center gap-3 p-3 rounded bg-[#FFFDF8] border border-[#43111F]/20">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-[#43111F]/30" />
                      <div className="flex-1">
                        <div className="text-[9px] text-[#43111F] uppercase tracking-wider">{item.brand}</div>
                        <div className="font-serif text-xs font-medium text-[#2D2326] line-clamp-1">{item.name}</div>
                        <div className="text-[10px] text-[#7C6E72]">Size: {item.selectedSize} Ã— {item.quantity}</div>
                      </div>
                      <div className="font-serif text-xs font-bold text-[#43111F]">${item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>

                {/* Footer Details */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-[#E5D8D0] text-xs font-serif gap-2">
                  <div className="text-[#7C6E72]">
                    Shipping to: <span className="text-[#2D2326]">{order.shippingAddress?.fullName}, {order.shippingAddress?.city}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#7C6E72]">Grand Total: <strong className="text-[#43111F] text-sm">${order.grandTotal?.toFixed(2)}</strong></span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
















