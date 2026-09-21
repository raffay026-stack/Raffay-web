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
    <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif selection:bg-[#43111F] selection:text-[#FFFDF8]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs text-[#7C6E72] hover:text-[#6E1F35] mb-8 font-serif transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Product Image */}
          <div className="space-y-4 sticky top-28">
            <div className="aspect-square rounded-lg overflow-hidden border border-[#43111F]/40 bg-[#FFFFFF] shadow-2xl relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover opacity-95"
              />
              <div className="absolute top-4 left-4 bg-[#FFFDF8]/90 border border-[#43111F]/40 px-3 py-1 rounded text-xs text-[#6E1F35] font-serif uppercase tracking-widest">
                {product.category}
              </div>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-[#FFFDF8]/90 border border-[#43111F]/30 text-[#5D5054] hover:text-[#6E1F35] transition-colors shadow-lg"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#43111F] text-[#6E1F35]' : ''}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-[#7C6E72] font-serif">
              <div className="p-3 bg-[#FFFFFF] border border-[#43111F]/20 rounded">
                <ShieldCheck className="w-4 h-4 text-[#6E1F35] mx-auto mb-1" />
                <span>100% Authentic Flacon</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#43111F]/20 rounded">
                <Truck className="w-4 h-4 text-[#6E1F35] mx-auto mb-1" />
                <span>Insured 24K Delivery</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#43111F]/20 rounded">
                <Sparkles className="w-4 h-4 text-[#6E1F35] mx-auto mb-1" />
                <span>2 Free Samples Included</span>
              </div>
            </div>
          </div>

          {/* Product Details info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6E1F35] font-serif uppercase tracking-[0.2em]">{product.brand}</span>
                <div className="flex items-center gap-1.5 text-[#6E1F35] text-sm font-serif">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-[#8A7A80]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F3EFE6] mt-1">
                {product.name}
              </h1>

              <div className="text-2xl font-serif font-bold text-[#6E1F35] mt-3">
                ${product.price} <span className="text-xs text-[#8A7A80] font-normal">USD (Tax Included)</span>
              </div>
            </div>

            <p className="text-sm text-[#5D5054] font-serif leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs text-[#6E1F35] uppercase tracking-wider font-serif block">
                Select Flacon Size: <span className="text-[#2D2326] font-bold">{selectedSize}</span>
              </label>
              <div className="flex gap-3" data-testid={PRODUCT_DETAIL.sizeSelector}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-3 px-4 rounded font-serif text-xs uppercase tracking-widest border transition-all ${selectedSize === size ? 'bg-[#43111F] text-[#FFFDF8] font-bold border-[#43111F] shadow-lg' : 'bg-[#FFFFFF] text-[#5D5054] border-[#43111F]/30 hover:border-[#43111F]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs text-[#6E1F35] uppercase tracking-wider font-serif block">Quantity</label>
              <div className="flex items-center border border-[#43111F]/40 rounded bg-[#FFFFFF] w-36">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#7C6E72] hover:text-[#6E1F35]"
                  data-testid={PRODUCT_DETAIL.qtyMinus}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-serif text-sm font-bold text-[#6E1F35]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#7C6E72] hover:text-[#6E1F35]"
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
                className="flex-1 py-3.5 bg-[#F7F1EC] border border-[#87344D] text-[#6E1F35] hover:bg-[#87344D] hover:text-[#6E1F35] font-serif text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 shadow-lg"
                data-testid={PRODUCT_DETAIL.addToCart}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Crystal Cart</span>
              </button>

              <button 
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#43111F] via-[#6E1F35] to-[#87344D] text-[#FFFDF8] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
                data-testid={PRODUCT_DETAIL.buyNow}
              >
                <span>Acquire Now</span>
              </button>
            </div>

            {/* Fragrance Notes Breakdown Accordion / Tabs */}
            <div className="pt-6 border-t border-[#E5D8D0] space-y-4">
              <div className="flex items-center gap-4 border-b border-[#E5D8D0] pb-2">
                <button 
                  onClick={() => setActiveNotesTab("pyramid")}
                  className={`font-serif text-xs uppercase tracking-wider pb-2 border-b-2 transition-all ${activeNotesTab === 'pyramid' ? 'text-[#6E1F35] border-[#43111F]' : 'text-[#8A7A80] border-transparent'}`}
                  data-testid={PRODUCT_DETAIL.notesTab}
                >
                  Fragrance Notes Pyramid
                </button>
                <button 
                  onClick={() => setActiveNotesTab("delivery")}
                  className={`font-serif text-xs uppercase tracking-wider pb-2 border-b-2 transition-all ${activeNotesTab === 'delivery' ? 'text-[#6E1F35] border-[#43111F]' : 'text-[#8A7A80] border-transparent'}`}
                >
                  Authenticity & Delivery
                </button>
              </div>

              {activeNotesTab === "pyramid" ? (
                <div className="space-y-4 bg-[#FFFFFF] p-5 rounded border border-[#43111F]/20 font-serif text-xs">
                  <div>
                    <span className="text-[#6E1F35] font-bold uppercase tracking-widest block mb-1">Top Notes (First 15 Minutes)</span>
                    <div className="flex flex-wrap gap-2">
                      {product.topNotes.map(note => (
                        <span key={note} className="px-2.5 py-1 rounded bg-[#F7F1EC] border border-[#43111F]/30 text-[#5D5054]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#6E1F35] font-bold uppercase tracking-widest block mb-1">Middle / Heart Notes (2 - 6 Hours)</span>
                    <div className="flex flex-wrap gap-2">
                      {product.middleNotes.map(note => (
                        <span key={note} className="px-2.5 py-1 rounded bg-[#F7F1EC] border border-[#43111F]/30 text-[#5D5054]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#6E1F35] font-bold uppercase tracking-widest block mb-1">Base Notes (6 - 24 Hours)</span>
                    <div className="flex flex-wrap gap-2">
                      {product.baseNotes.map(note => (
                        <span key={note} className="px-2.5 py-1 rounded bg-[#F7F1EC] border border-[#43111F]/30 text-[#5D5054]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-[#FFFFFF] p-5 rounded border border-[#43111F]/20 font-serif text-xs text-[#5D5054]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6E1F35] shrink-0 mt-0.5" />
                    <span>Each flacon is individually numbered and sealed with a tamper-proof hologram.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6E1F35] shrink-0 mt-0.5" />
                    <span>Shipped via insured white-glove courier in temperature-controlled packaging.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6E1F35] shrink-0 mt-0.5" />
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






















