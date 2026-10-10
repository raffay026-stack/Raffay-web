import React, { useState } from "react";

const JAZZCASH_NUMBER = "03001234567";
const EASYPAISA_NUMBER = "03001234567";
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
  drrowRight,
  ShoppingBag
} from "lucide-react";
import { CHECKOUT } from "../constants/testIds";
import { toast } from "sonner";

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
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    paymentMethod: "jazzcash",
    customerPaymentNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const order = await placeOrder({
        subtotal,
        shipping,
        tax,
        discount: discountAmount,
        grandTotal,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        notes: formData.customerPaymentNumber ? `Customer payment number: ${formData.customerPaymentNumber}` : "",
        paymentMethod: formData.paymentMethod === "jazzcash" ? "JazzCash" : formData.paymentMethod === "easypaisa" ? "Easypaisa" : "Online Payment"
      });
      toast.success(`Order ${order.orderNumber} was placed.`);
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      const message = error.message || "The order could not be saved. Please try again.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif">
        <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />
        <div className="max-w-4xl mx-auto px-4 py-32 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#FFFFFF] border border-[#43111F]/30 flex items-center justify-center text-[#43111F]">
            <ShoppingBag className="w-10 h-10 opacity-60" />
          </div>
          <h2 className="text-2xl font-bold text-[#43111F]">Your Cart is Currently Empty</h2>
          <p className="text-xs text-[#7C6E72]">ddd luxury Perfumes to proceed to secure checkout.</p>
          <button
            onClick={() => navigate("/catalog")}
            className="px-8 py-3 bg-gradient-to-r from-[#43111F] to-[#6E1F35] text-white font-serif text-xs font-bold uppercase tracking-widest rounded"
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
    <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif selection:bg-[#43111F] selection:text-[#FFFDF8]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#43111F] uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#43111F]">
            FK Decore Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Shipping Information */}
            <div className="bg-[#FFFFFF] border border-[#43111F]/30 p-6 sm:p-8 rounded-lg space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#E5D8D0] pb-4">
                <h3 className="text-lg font-serif font-bold text-[#43111F] flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span>White-Glove Shipping Destination</span>
                </h3>
                <span className="text-xs text-[#8d7d80] font-serif">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#5D5054] uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#FFFDF8] border border-[#43111F]/30 px-3 py-2.5 text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded"
                    data-testid={CHECKOUT.fullNameInput}
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#5D5054] uppercase tracking-wider">Email dddress (For order tracking)</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#FFFDF8] border border-[#43111F]/30 px-3 py-2.5 text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#5D5054] uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="03XXXXXXXXX"
                    maxLength={11}
                    inputMode="numeric"
                    pattern="03[0-9]{9}"
                    className="w-full bg-[#FFFDF8] border border-[#43111F]/30 px-3 py-2.5 text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#5D5054] uppercase tracking-wider">Street dddress & Suite</label>
                  <input 
                    type="text" 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#FFFDF8] border border-[#43111F]/30 px-3 py-2.5 text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded"
                    data-testid={CHECKOUT.addressInput}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#5D5054] uppercase tracking-wider">City</label>
                  <input 
                    type="text" 
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-[#FFFDF8] border border-[#43111F]/30 px-3 py-2.5 text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded"
                    data-testid={CHECKOUT.cityInput}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#5D5054] uppercase tracking-wider">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full bg-[#FFFDF8] border border-[#43111F]/30 px-3 py-2.5 text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded"
                    data-testid={CHECKOUT.postalInput}
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[#5D5054] uppercase tracking-wider">Country</label>
                  <input 
                    type="text" 
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-[#FFFDF8] border border-[#43111F]/30 px-3 py-2.5 text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded"
                    data-testid={CHECKOUT.countryInput}
                  />
                </div>
              </div>
            </div>
            {/* Payment Method */}
            <div className="bg-[#FFFFFF] border border-[#43111F]/30 p-6 sm:p-8 rounded-lg space-y-6 shadow-xl">

              <div className="flex items-center justify-between border-b border-[#E5D8D0] pb-4">
                <h3 className="text-lg font-serif font-bold text-[#43111F] flex items-center gap-2">
                  <span className="text-xl">Ã°Å¸â€™Â³</span>
                  <span>Payment Method</span>
                </h3>

                <span className="text-xs text-[#8d7d80] font-serif">
                  Step 2 of 2
                </span>
              </div>

              <div className="space-y-3">

                {/* JazzCash */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.paymentMethod === "jazzcash"
                      ? "bg-[#FFF5F5] border-[#ED1C24] ring-1 ring-[#ED1C24]/20"
                      : "bg-[#FFFDF8] border-[#E5D8D0] hover:border-[#ED1C24]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="jazzcash"
                    checked={formData.paymentMethod === "jazzcash"}
                    onChange={handleChange}
                    className="accent-red-600"
                  />

                  <div className="w-20 h-14 bg-white rounded-md border border-[#E5D8D0] flex items-center justify-center p-1 overflow-hidden shrink-0">
                    <img
                      src="/payment-logos/jazzcash.png"
                      alt="JazzCash"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-[#2D2326] text-sm">
                      JazzCash
                    </p>
                    <p className="text-xs text-[#7C6E72] mt-1">
                      Manual payment
                    </p>
                  </div>
                </label>

                {/* Easypaisa */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    formData.paymentMethod === "easypaisa"
                      ? "bg-[#F2FBF8] border-[#00A651] ring-1 ring-[#00A651]/20"
                      : "bg-[#FFFDF8] border-[#E5D8D0] hover:border-[#00A651]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="easypaisa"
                    checked={formData.paymentMethod === "easypaisa"}
                    onChange={handleChange}
                    className="accent-green-600"
                  />

                  <div className="w-20 h-14 bg-white rounded-md border border-[#E5D8D0] flex items-center justify-center p-1 overflow-hidden shrink-0">
                    <img
                      src="/payment-logos/easypaisa.png"
                      alt="Easypaisa"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-[#2D2326] text-sm">
                      Easypaisa
                    </p>
                    <p className="text-xs text-[#7C6E72] mt-1">
                      Manual payment
                    </p>
                  </div>
                </label>



              </div>

              {/* Manual Payment Details */}
              {(formData.paymentMethod === "jazzcash" ||
                formData.paymentMethod === "easypaisa") && (

                <div className="pt-4 border-t border-[#E5D8D0] space-y-4">

                  {/* Merchant Number */}
                  <div className="bg-[#F9F3EE] border border-[#43111F]/20 rounded-lg p-5">

                    <p className="font-bold text-[#43111F] text-sm">
                      Send Payment To
                    </p>

                    <p className="text-xs text-[#7C6E72] mt-1">
                      {formData.paymentMethod === "jazzcash"
                        ? "JazzCash Merchant Number"
                        : "Easypaisa Merchant Number"}
                    </p>

                    <div className="mt-3 flex items-center gap-3 bg-white border border-[#E5D8D0] rounded-lg p-3">

                      <span className="flex-1 text-lg sm:text-xl font-bold tracking-wide text-[#43111F] break-all">
                        {formData.paymentMethod === "jazzcash"
                          ? JAZZCASH_NUMBER
                          : EASYPAISA_NUMBER}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const number =
                            formData.paymentMethod === "jazzcash"
                              ? JAZZCASH_NUMBER
                              : EASYPAISA_NUMBER;

                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(number);
                          }
                        }}
                        className="shrink-0 px-3 py-2 bg-[#43111F] text-white rounded-md text-xs font-bold hover:bg-[#6E1F35] transition"
                      >
                        COPY
                      </button>

                    </div>

                    <p className="text-[10px] text-[#8d7d80] mt-2">
                      This is our payment number. You cannot edit it.
                    </p>

                  </div>

                  {/* Payment Note */}
                  <div className="flex gap-2 items-start text-[#5D5054]">
                    <span className="text-[#43111F]">â“˜</span>

                    <p className="text-[11px] leading-5">
                      After sending the payment, enter your payment number
                      above and place your order. Your payment will be
                      verified manually.
                    </p>
                  </div>

                </div>
              )}

            </div>

          </div>


          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#43111F]/40 p-6 sm:p-8 rounded-lg shadow-2xl space-y-6 sticky top-28">
              
              <h3 className="text-lg font-serif font-bold text-[#6E1F35] border-b border-[#E5D8D0] pb-4">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3 pb-3 border-b border-[#E5D8D0]/60">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded border border-[#43111F]/30" />
                    <div className="flex-1">
                      <div className="text-[10px] text-[#43111F] uppercase tracking-wider font-serif">{item.brand}</div>
                      <div className="font-serif text-xs text-[#2D2326] line-clamp-1">{item.name}</div>
                      <div className="text-[11px] text-[#7C6E72] font-serif">Size: {item.selectedSize} Ã— {item.quantity}</div>
                    </div>
                    <div className="font-serif text-xs font-bold text-[#43111F]">PKR {item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs font-serif text-[#7C6E72] pt-2 border-t border-[#E5D8D0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#2D2326]">PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Courier Shipping</span>
                  <span className="text-[#2D2326]">{shipping === 0 ? "FREE" : `PKR ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-[#2D2326]">PKR {tax.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#43111F]">
                    <span>Privilege Discount ({promoCode})</span>
                    <span>-PKR {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#43111F] pt-3 border-t border-[#E5D8D0]">
                  <span>Grand Total</span>
                  <span>PKR {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {submitError && <p role="alert" className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">{submitError}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#43111F] to-[#6E1F35] text-white font-serif text-xs font-bold uppercase tracking-widest rounded shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
                data-testid={CHECKOUT.placeOrderBtn}
              >
                {isSubmitting ? (
                  <span>Processing Secure Order...</span>
                ) : (
                  <>
                    <span>Place Order & Join Inner Circle</span>
                    <drrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8d7d80] font-serif pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#43111F]" />
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














































