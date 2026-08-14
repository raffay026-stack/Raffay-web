import React from "react";
import { useApp } from "../context/AppContext";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CART } from "../constants/testIds";

export default function CartDrawer({ isOpen, onClose }) {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    subtotal, 
    shipping, 
    tax, 
    grandTotal,
    promoCode,
    discountAmount,
    applyPromoCode 
  } = useApp();
  
  const [localPromo, setLocalPromo] = React.useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" data-testid="cart-drawer-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0B08] border-l border-[#080809]/30 text-neutral-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#080809]/20 flex items-center justify-between bg-[#14110C]">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg font-bold tracking-widest text-[#080809]">
                CRYSTAL CART
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#080809]/20 text-[#080809] border border-[#080809]/40">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-neutral-400 hover:text-[#080809] transition-colors"
              data-testid="cart-drawer-close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#1A1610] border border-[#080809]/30 flex items-center justify-center text-[#080809]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-lg text-neutral-300">Your Cart is Empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto font-serif">
                  Explore our 100 luxury Perfumes to discover your signature style.
                </p>
                <button
                  onClick={() => { onClose(); navigate("/catalog"); }}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#2FB59A] to-[#2FB59A] text-[#9AE9D8] font-serif text-xs font-bold uppercase tracking-widest rounded-sm hover:opacity-95 transition-all"
                  data-testid="empty-cart-explore-btn"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4 p-4 rounded-lg bg-[#14110C]/80 border border-[#080809]/20 relative group"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md border border-[#080809]/30 bg-neutral-900"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#080809] uppercase tracking-widest font-serif">{item.brand}</span>
                      <h5 className="font-serif text-sm font-medium text-neutral-200 line-clamp-1">{item.name}</h5>
                      <div className="text-xs text-neutral-400 mt-0.5 font-serif">Size: <span className="text-[#080809]">{item.selectedSize}</span></div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#080809]/40 rounded bg-[#0A0A0A]">
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 text-neutral-400 hover:text-[#080809]"
                          data-testid={CART.itemQtyMinus}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-serif text-[#080809]">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 text-neutral-400 hover:text-[#080809]"
                          data-testid={CART.itemQtyPlus}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-[#080809]">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 p-1 transition-colors"
                    title="Remove item"
                    data-testid={CART.removeItem}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout calculation summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#080809]/20 bg-[#120F0A] space-y-4">
              
              {/* Promo input */}
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Promo Code (e.g. ROYAL25)"
                  value={localPromo}
                  onChange={(e) => setLocalPromo(e.target.value)}
                  className="flex-1 bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2 text-xs font-serif text-neutral-200 focus:outline-none focus:border-[#080809]"
                  data-testid={CART.promoInput}
                />
                <button 
                  onClick={() => applyPromoCode(localPromo)}
                  className="px-4 py-2 bg-[#2FB59A] border border-[#2FB59A]/50 text-[#9AE9D8] font-serif text-xs uppercase rounded hover:bg-[#2FB59A] hover:text-[#9AE9D8] transition-all"
                  data-testid={CART.applyPromo}
                >
                  Apply
                </button>
              </div>

              <div className="space-y-1.5 text-xs font-serif text-neutral-400 pt-2 border-t border-neutral-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-neutral-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Courier Shipping {subtotal > 300 && "(Free over $300)"}</span>
                  <span className="text-neutral-200">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-neutral-200">${tax.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#080809]">
                    <span>Privilege Discount ({promoCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#080809] pt-2 border-t border-neutral-800">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => { onClose(); navigate("/checkout"); }}
                className="w-full py-3 bg-gradient-to-r from-[#2FB59A] to-[#2FB59A] text-[#9AE9D8] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
                data-testid={CART.checkoutBtn}
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-serif pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#080809]" />
                <span>256-Bit Encrypted High-End Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}















