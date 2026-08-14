import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from '../components/ScentQuizModal';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  Plus, 
  Minus,
  CheckCircle2
} from "lucide-react";
import { PRODUCT_DETAIL } from "../constants/testIds";

export default function ProductDetailView() {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const product = products.find(p => p.id === id) || products[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0] || "L");
  const [quantity, setQuantity] = useState(1);
  const [activeNotesTab, setActiveNotesTab] = useState("pyramid");

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-serif selection:bg-[#080809] selection:text-[#0A0A0A]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-[#9AE9D8] mb-8 font-serif transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Product Image */}
          <div className="space-y-4 sticky top-28">
            <div className="aspect-square rounded-lg overflow-hidden border border-[#080809]/40 bg-[#12100C] shadow-2xl relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover opacity-95"
              />
              <div className="absolute top-4 left-4 bg-[#0A0A0A]/90 border border-[#080809]/40 px-3 py-1 rounded text-xs text-[#9AE9D8] font-serif uppercase tracking-widest">
                {product.category}
              </div>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-[#0A0A0A]/90 border border-[#080809]/30 text-neutral-300 hover:text-[#9AE9D8] transition-colors shadow-lg"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#080809] text-[#9AE9D8]' : ''}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-neutral-400 font-serif">
              <div className="p-3 bg-[#12100C] border border-[#080809]/20 rounded">
                <ShieldCheck className="w-4 h-4 text-[#9AE9D8] mx-auto mb-1" />
                <span>100% Authentic Flacon</span>
              </div>
              <div className="p-3 bg-[#12100C] border border-[#080809]/20 rounded">
                <Truck className="w-4 h-4 text-[#9AE9D8] mx-auto mb-1" />
                <span>Insured 24K Delivery</span>
              </div>
              <div className="p-3 bg-[#12100C] border border-[#080809]/20 rounded">
                <Sparkles className="w-4 h-4 text-[#9AE9D8] mx-auto mb-1" />
                <span>2 Free Samples Included</span>
              </div>
            </div>
          </div>

          {/* Product Details info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9AE9D8] font-serif uppercase tracking-[0.2em]">{product.brand}</span>
                <div className="flex items-center gap-1.5 text-[#9AE9D8] text-sm font-serif">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-neutral-500">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F3EFE6] mt-1">
                {product.name}
              </h1>

              <div className="text-2xl font-serif font-bold text-[#9AE9D8] mt-3">
                ${product.price} <span className="text-xs text-neutral-500 font-normal">USD (Tax Included)</span>
              </div>
            </div>

            <p className="text-sm text-neutral-300 font-serif leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs text-[#9AE9D8] uppercase tracking-wider font-serif block">
                Select Flacon Size: <span className="text-neutral-200 font-bold">{selectedSize}</span>
              </label>
              <div className="flex gap-3" data-testid={PRODUCT_DETAIL.sizeSelector}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-3 px-4 rounded font-serif text-xs uppercase tracking-widest border transition-all ${selectedSize === size ? 'bg-[#080809] text-[#0A0A0A] font-bold border-[#080809] shadow-lg' : 'bg-[#12100C] text-neutral-300 border-[#080809]/30 hover:border-[#080809]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs text-[#9AE9D8] uppercase tracking-wider font-serif block">Quantity</label>
              <div className="flex items-center border border-[#080809]/40 rounded bg-[#12100C] w-36">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-400 hover:text-[#9AE9D8]"
                  data-testid={PRODUCT_DETAIL.qtyMinus}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-serif text-sm font-bold text-[#9AE9D8]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-neutral-400 hover:text-[#9AE9D8]"
                  data-testid={PRODUCT_DETAIL.qtyPlus}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-[#1C1710] border border-[#57D5BD] text-[#9AE9D8] hover:bg-[#57D5BD] hover:text-[#9AE9D8] font-serif text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 shadow-lg"
                data-testid={PRODUCT_DETAIL.addToCart}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Crystal Cart</span>
              </button>

              <button 
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#177A69] via-[#2FB59A] to-[#57D5BD] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
                data-testid={PRODUCT_DETAIL.buyNow}
              >
                <span>Acquire Now</span>
              </button>
            </div>

            {/* Fragrance Notes Breakdown Accordion / Tabs */}
            <div className="pt-6 border-t border-neutral-800 space-y-4">
              <div className="flex items-center gap-4 border-b border-neutral-800 pb-2">
                <button 
                  onClick={() => setActiveNotesTab("pyramid")}
                  className={`font-serif text-xs uppercase tracking-wider pb-2 border-b-2 transition-all ${activeNotesTab === 'pyramid' ? 'text-[#9AE9D8] border-[#080809]' : 'text-neutral-500 border-transparent'}`}
                  data-testid={PRODUCT_DETAIL.notesTab}
                >
                  Fragrance Notes Pyramid
                </button>
                <button 
                  onClick={() => setActiveNotesTab("delivery")}
                  className={`font-serif text-xs uppercase tracking-wider pb-2 border-b-2 transition-all ${activeNotesTab === 'delivery' ? 'text-[#9AE9D8] border-[#080809]' : 'text-neutral-500 border-transparent'}`}
                >
                  Authenticity & Delivery
                </button>
              </div>

              {activeNotesTab === "pyramid" ? (
                <div className="space-y-4 bg-[#12100C] p-5 rounded border border-[#080809]/20 font-serif text-xs">
                  <div>
                    <span className="text-[#9AE9D8] font-bold uppercase tracking-widest block mb-1">Top Notes (First 15 Minutes)</span>
                    <div className="flex flex-wrap gap-2">
                      {product.topNotes.map(note => (
                        <span key={note} className="px-2.5 py-1 rounded bg-[#1A1610] border border-[#080809]/30 text-neutral-300">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#9AE9D8] font-bold uppercase tracking-widest block mb-1">Middle / Heart Notes (2 - 6 Hours)</span>
                    <div className="flex flex-wrap gap-2">
                      {product.middleNotes.map(note => (
                        <span key={note} className="px-2.5 py-1 rounded bg-[#1A1610] border border-[#080809]/30 text-neutral-300">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#9AE9D8] font-bold uppercase tracking-widest block mb-1">Base Notes (6 - 24 Hours)</span>
                    <div className="flex flex-wrap gap-2">
                      {product.baseNotes.map(note => (
                        <span key={note} className="px-2.5 py-1 rounded bg-[#1A1610] border border-[#080809]/30 text-neutral-300">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-[#12100C] p-5 rounded border border-[#080809]/20 font-serif text-xs text-neutral-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9AE9D8] shrink-0 mt-0.5" />
                    <span>Each flacon is individually numbered and sealed with a tamper-proof hologram.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9AE9D8] shrink-0 mt-0.5" />
                    <span>Shipped via insured white-glove courier in temperature-controlled packaging.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9AE9D8] shrink-0 mt-0.5" />
                    <span>Includes a complimentary 2ml sample vial so you can test without opening the main flacon.</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}


















