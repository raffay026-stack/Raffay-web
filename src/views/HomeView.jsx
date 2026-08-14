import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from '../components/ScentQuizModal';
import { 
  Crown, 
  Sparkles, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  ShoppingBag,
  SlidersHorizontal,
  Search
} from "lucide-react";
import { HOME, CATALOG } from "../constants/testIds";

export default function HomeView() {
  const { products, addToCart, wishlist, toggleWishlist } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("summer");
  const [quickSearch, setQuickSearch] = useState("");
  const navigate = useNavigate();

  const featuredOuds = products.filter(p => p.isRoyalOud || p.category === "Graphic Tees").slice(0, 4);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);

  const displayedPerfumes = activeTab === "summer" ? featuredOuds : bestsellers;

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(quickSearch)}`);
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1D1A] text-neutral-100 font-serif selection:bg-[#2FB59A] selection:text-[#0B1D1A]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Hero Section */}
      <section style={{ "--scentora-hero-image": 'url(/perfume-hero.png)' }} className="scentora-cinematic-hero relative overflow-hidden py-24 sm:py-32 border-b border-[#2FB59A]/20 bg-gradient-to-b from-[#071412] via-[#0B1D1A] to-[#0B1D1A]">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#2FB59A]/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D211E] border border-[#2FB59A]/40 text-[#2FB59A] text-xs uppercase tracking-[0.25em] shadow-lg">
              <Crown className="w-4 h-4 text-[#2FB59A]" />
              <span>Premium Summer Menswear</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#F4F1E9] via-[#2FB59A] to-[#177A69] bg-clip-text text-transparent font-serif leading-tight">
              Summer Men's Perfume Collection
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-serif max-w-2xl mx-auto leading-relaxed">
              Discover breathable men's Perfumes made for sunny days, casual weekends, and effortless summer style.
            </p>

            {/* Quick search input */}
            <form onSubmit={handleQuickSearchSubmit} className="max-w-xl mx-auto mt-6 flex gap-2 p-2 bg-[#071412]/90 border border-[#2FB59A]/40 rounded-lg shadow-2xl backdrop-blur-md">
              <div className="flex items-center pl-3 text-[#2FB59A]">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder="Search 100 summer Perfumes by name, brand, color, or style..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="flex-1 bg-transparent border-none text-neutral-100 text-xs sm:text-sm font-serif focus:outline-none px-2"
                data-testid={CATALOG.searchInput}
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#76DEC9] to-[#76DEC9] text-[#76DEC9] font-serif text-xs font-bold uppercase tracking-widest rounded hover:opacity-95 transition-all shadow-md"
                data-testid={HOME.heroCta}
              >
                Explore Catalog
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => setIsQuizOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#76DEC9] text-[#76DEC9] hover:bg-[#76DEC9] hover:text-[#76DEC9] font-serif text-xs uppercase tracking-widest transition-all rounded shadow-md"
                data-testid={HOME.quizCta}
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Style Profiler Quiz</span>
              </button>
              <Link 
                to="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1710] border border-[#2FB59A]/30 text-neutral-200 hover:text-[#2FB59A] font-serif text-xs uppercase tracking-widest transition-all rounded"
              >
                <span>Browse All 100 Perfumes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Showcase Tabs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-neutral-800 pb-6">
          <div>
            <span className="text-xs text-[#2FB59A] uppercase tracking-widest font-serif">Curated Masterpieces</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E9] mt-1">Exclusive Selections</h2>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab("royal")}
              className={`px-5 py-2 rounded font-serif text-xs uppercase tracking-widest transition-all ${activeTab === 'royal' ? 'bg-[#2FB59A] text-[#0B1D1A] font-bold shadow-lg' : 'bg-[#071412] text-neutral-400 border border-[#2FB59A]/30 hover:border-[#2FB59A]'}`}
              data-testid={HOME.royalOudTab}
            >
              Summer Collection Series
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-5 py-2 rounded font-serif text-xs uppercase tracking-widest transition-all ${activeTab === 'bestseller' ? 'bg-[#2FB59A] text-[#0B1D1A] font-bold shadow-lg' : 'bg-[#071412] text-neutral-400 border border-[#2FB59A]/30 hover:border-[#2FB59A]'}`}
              data-testid={HOME.bestsellersTab}
            >
              Connoisseur Bestsellers
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPerfumes.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div 
                key={product.id}
                className="group bg-gradient-to-b from-[#071412] to-[#102622] border border-[#2FB59A]/30 rounded-lg overflow-hidden hover:border-[#2FB59A] transition-all duration-300 shadow-xl flex flex-col justify-between"
                data-testid={CATALOG.PerfumeCard}
              >
                <div className="relative overflow-hidden aspect-square bg-[#0B1D1A]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1D1A]/80 border border-[#2FB59A]/40 px-2.5 py-1 rounded text-[10px] text-[#2FB59A] font-serif uppercase tracking-widest">
                    {product.category}
                  </div>
                  
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#0B1D1A]/80 border border-[#2FB59A]/30 text-neutral-300 hover:text-[#2FB59A] transition-colors"
                    title="Save to favorites"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#2FB59A] text-[#2FB59A]' : ''}`} />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0B1D1A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <button
                      onClick={() => navigate(`/Perfume/${product.id}`)}
                      className="w-full py-2 bg-[#2FB59A] text-[#0B1D1A] font-serif text-xs font-bold uppercase tracking-widest rounded shadow hover:bg-[#F4F1E9] transition-colors"
                      data-testid={CATALOG.quickViewBtn}
                    >
                      Quick View & Notes
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#2FB59A] font-serif uppercase tracking-widest">
                      <span>{product.brand}</span>
                      <div className="flex items-center gap-1 text-[#9AE9D8]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <h3 
                      onClick={() => navigate(`/Perfume/${product.id}`)}
                      className="font-serif text-lg font-bold text-neutral-100 mt-1 cursor-pointer hover:text-[#2FB59A] transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-serif line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Price</span>
                      <span className="font-serif text-base font-bold text-[#2FB59A]">${product.price}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product, product.sizes[1] || "L", 1)}
                      className="px-4 py-2 bg-gradient-to-r from-[#2FB59A] to-[#177A69] text-[#0B1D1A] font-serif text-xs font-bold uppercase tracking-wider rounded hover:opacity-95 transition-all shadow-md flex items-center gap-1.5"
                      data-testid={CATALOG.addToCartBtn}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/catalog')}
            className="px-8 py-3.5 bg-gradient-to-r from-[#F4F1E9] via-[#2FB59A] to-[#177A69] text-[#0B1D1A] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-2xl hover:opacity-95 transition-all inline-flex items-center gap-2 group"
          >
            <span>Explore Full Catalog of 100 Perfumes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Brand Heritage Banner */}
      <section className="py-24 border-y border-[#2FB59A]/30 bg-gradient-to-r from-[#071412] via-[#0D211E] to-[#071412] my-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#2FB59A] font-serif text-xs tracking-widest uppercase">
                <Sparkles className="w-4 h-4" />
                <span>The Art of Extrait de Perfume</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4F1E9] leading-tight">
                Handcrafted in Grasse & Aged in French Oak Casks
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed">
                Every flacon of ð“¢ð“¬ð“®ð“·ð“½ð“¸ð“»ð“ª undergoes a meticulous 6-month maceration process. Our master Perfumers blend rare essential oils with pristine botanical alcohol, creating an opulent sillage that develops exquisitely on the skin over 24 hours.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-800 font-serif">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#2FB59A]">100</div>
                  <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Curated Flacons</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#2FB59A]">25+</div>
                  <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Years Aged Oud</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#2FB59A]">100%</div>
                  <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Authentic Noses</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#2FB59A]/40 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury Perfume Atelier" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D1A]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] text-[#2FB59A] uppercase tracking-widest font-serif block">Private Reserve</span>
                  <h4 className="font-serif text-lg font-bold text-white">The Connoisseur's Vault</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}



















