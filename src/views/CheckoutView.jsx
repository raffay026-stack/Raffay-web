import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from '../components/ScentQuizModal';
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { CHECKOUT } from "../constants/testIds";

export default function CheckoutView() {
  const { 
    cart, 
    subtotal, 
    shipping, 
    tax, 
    grandTotal, 
    discountAmount, 
    promoCode, 
    placeOrder 
  } = useApp();
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "Alexander Wright",
    email: "alexander@lixirnoir.com",
    address: "742 Evergreen Terrace, Suite 400",
    city: "New York",
    postalCode: "10021",
    country: "United States",
    paymentMethod: "credit-card",
    cardNumber: "â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ 4242",
    cardExp: "08/28",
    cardCvc: "888"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder({
        subtotal,
        shipping,
        tax,
        discount: discountAmount,
        grandTotal,
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod === 'credit-card' ? 'Credit Card (â€¢â€¢â€¢â€¢ 4242)' : formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Apple Pay)'
      });
      setIsSubmitting(false);
      navigate(`/order-confirmation/${order.id}`);
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-serif">
        <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#12100C] border border-[#080809]/30 flex items-center justify-center text-[#080809]">
            <ShoppingBag className="w-10 h-10 opacity-60" />
          </div>
          <h2 className="text-2xl font-bold text-[#F3EFE6]">Your Cart is Currently Empty</h2>
          <p className="text-xs text-neutral-400">Add luxury Perfumes to proceed to secure checkout.</p>
          <button
            onClick={() => navigate("/catalog")}
            className="px-8 py-3 bg-gradient-to-r from-[#2FB59A] to-[#2FB59A] text-[#9AE9D8] font-serif text-xs font-bold uppercase tracking-widest rounded"
          >
            Browse Collection
          </button>
        </div>
        <Footer />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-serif selection:bg-[#080809] selection:text-[#0A0A0A]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#080809] uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F3EFE6]">
            SCENTORA Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Shipping Information */}
            <div className="bg-[#12100C] border border-[#080809]/30 p-6 sm:p-8 rounded-lg space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <h3 className="text-lg font-serif font-bold text-[#080809] flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span>White-Glove Shipping Destination</span>
                </h3>
                <span className="text-xs text-neutral-500 font-serif">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-neutral-300 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                    data-testid={CHECKOUT.fullNameInput}
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-neutral-300 uppercase tracking-wider">Email Address (For order tracking)</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-neutral-300 uppercase tracking-wider">Street Address & Suite</label>
                  <input 
                    type="text" 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                    data-testid={CHECKOUT.addressInput}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase tracking-wider">City</label>
                  <input 
                    type="text" 
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                    data-testid={CHECKOUT.cityInput}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase tracking-wider">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                    data-testid={CHECKOUT.postalInput}
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-neutral-300 uppercase tracking-wider">Country</label>
                  <input 
                    type="text" 
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                    data-testid={CHECKOUT.countryInput}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#12100C] border border-[#080809]/30 p-6 sm:p-8 rounded-lg space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <h3 className="text-lg font-serif font-bold text-[#080809] flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Secure Payment Simulation</span>
                </h3>
                <span className="text-xs text-neutral-500 font-serif">Step 2 of 2</span>
              </div>

              <div className="space-y-3 font-serif text-xs">
                <label className={`flex items-center gap-3 p-4 rounded border cursor-pointer transition-all ${formData.paymentMethod === 'credit-card' ? 'bg-[#1C1610] border-[#080809]' : 'bg-[#0A0A0A] border-neutral-800'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleChange}
                    className="accent-[#080809]"
                    data-testid={CHECKOUT.paymentMethodRadio}
                  />
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-bold text-neutral-200">Credit / Debit Card (Simulated Secure)</span>
                    <CreditCard className="w-4 h-4 text-[#080809]" />
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded border cursor-pointer transition-all ${formData.paymentMethod === 'online' ? 'bg-[#1C1610] border-[#080809]' : 'bg-[#0A0A0A] border-neutral-800'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleChange}
                    className="accent-[#080809]"
                  />
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-bold text-neutral-200">Apple Pay / Google Pay Online</span>
                    <span className="text-[#080809]">Instant</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'bg-[#1C1610] border-[#080809]' : 'bg-[#0A0A0A] border-neutral-800'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="accent-[#080809]"
                  />
                  <div className="flex items-center justify-between flex-1">
                    <span className="font-bold text-neutral-200">Cash on Delivery (Courier Verification)</span>
                    <span className="text-neutral-400">COD</span>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === 'credit-card' && (
                <div className="space-y-4 pt-4 border-t border-neutral-800 text-xs font-serif">
                  <div className="space-y-1.5">
                    <label className="text-neutral-300 uppercase tracking-wider">Card Number</label>
                    <input 
                      type="text" 
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                      className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-neutral-300 uppercase tracking-wider">Expiration Date</label>
                      <input 
                        type="text" 
                        value={formData.cardExp}
                        onChange={(e) => setFormData({...formData, cardExp: e.target.value})}
                        className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-neutral-300 uppercase tracking-wider">CVC Security Code</label>
                      <input 
                        type="text" 
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({...formData, cardCvc: e.target.value})}
                        className="w-full bg-[#0A0A0A] border border-[#080809]/30 px-3 py-2.5 text-neutral-100 focus:outline-none focus:border-[#080809] rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#12100C] border border-[#080809]/40 p-6 sm:p-8 rounded-lg shadow-2xl space-y-6 sticky top-28">
              
              <h3 className="text-lg font-serif font-bold text-[#F3EFE6] border-b border-neutral-800 pb-4">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3 pb-3 border-b border-neutral-800/60">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded border border-[#080809]/30" />
                    <div className="flex-1">
                      <div className="text-[10px] text-[#080809] uppercase tracking-wider font-serif">{item.brand}</div>
                      <div className="font-serif text-xs text-neutral-200 line-clamp-1">{item.name}</div>
                      <div className="text-[11px] text-neutral-400 font-serif">Size: {item.selectedSize} Ã— {item.quantity}</div>
                    </div>
                    <div className="font-serif text-xs font-bold text-[#080809]">${item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs font-serif text-neutral-400 pt-2 border-t border-neutral-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-neutral-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Courier Shipping</span>
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
                <div className="flex justify-between text-base font-bold text-[#080809] pt-3 border-t border-neutral-800">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#2FB59A] to-[#2FB59A] text-[#9AE9D8] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
                data-testid={CHECKOUT.placeOrderBtn}
              >
                {isSubmitting ? (
                  <span>Processing Secure Order...</span>
                ) : (
                  <>
                    <span>Place Order & Join Inner Circle</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-serif pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#080809]" />
                <span>30-Day Guarantee on Unopened Flacons</span>
              </div>

            </div>
          </div>

        </form>

      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <Footer />
    </div>
  );
}
















