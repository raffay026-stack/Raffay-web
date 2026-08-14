import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import ScentQuizModal from "../components/ScentQuizModal";
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
  const { perfumes, addToCart, wishlist, toggleWishlist } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("royal");
  const [quickSearch, setQuickSearch] = useState("");
  const navigate = useNavigate();

  const featuredOuds = perfumes.filter(p => p.isRoyalOud || p.category === "Oud & Woody").slice(0, 4);
  const bestsellers = perfumes.filter(p => p.isBestseller).slice(0, 4);

  const displayedPerfumes = activeTab === "royal" ? featuredOuds : bestsellers;

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(quickSearch)}`);
    } else {
      navigate('/catalog');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 font-serif selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#14110C] via-[#0A0A0A] to-[#0A0A0A]">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1610] border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase tracking-[0.25em] shadow-lg">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>The Pinnacle of Haute Parfumerie</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent font-serif leading-tight">
              Royal Oud Collection & Bespoke Elixirs
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-serif max-w-2xl mx-auto leading-relaxed">
              Immerse yourself in rare Cambodian oud flacons, aged sandalwood, and hand-selected extrait de parfums crafted by master noses for true fragrance connoisseurs.
            </p>

            {/* Quick search input */}
            <form onSubmit={handleQuickSearchSubmit} className="max-w-xl mx-auto mt-6 flex gap-2 p-2 bg-[#14110C]/90 border border-[#D4AF37]/40 rounded-lg shadow-2xl backdrop-blur-md">
              <div className="flex items-center pl-3 text-[#D4AF37]">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder="Search 100 luxury perfumes by name, brand, or note (e.g. Tom Ford, Oud)..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="flex-1 bg-transparent border-none text-neutral-100 text-xs sm:text-sm font-serif focus:outline-none px-2"
                data-testid={CATALOG.searchInput}
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest rounded hover:opacity-95 transition-all shadow-md"
                data-testid={HOME.heroCta}
              >
                Explore Catalog
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => setIsQuizOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] font-serif text-xs uppercase tracking-widest transition-all rounded shadow-md"
                data-testid={HOME.quizCta}
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Scent Profiler Quiz</span>
              </button>
              <Link 
                to="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1710] border border-[#D4AF37]/30 text-neutral-200 hover:text-[#D4AF37] font-serif text-xs uppercase tracking-widest transition-all rounded"
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
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-serif">Curated Masterpieces</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F3E5AB] mt-1">Exclusive Selections</h2>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab("royal")}
              className={`px-5 py-2 rounded font-serif text-xs uppercase tracking-widest transition-all ${activeTab === 'royal' ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-lg' : 'bg-[#14110C] text-neutral-400 border border-[#D4AF37]/30 hover:border-[#D4AF37]'}`}
              data-testid={HOME.royalOudTab}
            >
              Royal Oud Series
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-5 py-2 rounded font-serif text-xs uppercase tracking-widest transition-all ${activeTab === 'bestseller' ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-lg' : 'bg-[#14110C] text-neutral-400 border border-[#D4AF37]/30 hover:border-[#D4AF37]'}`}
              data-testid={HOME.bestsellersTab}
            >
              Connoisseur Bestsellers
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPerfumes.map((perfume) => {
            const isWishlisted = wishlist.includes(perfume.id);
            return (
              <div 
                key={perfume.id}
                className="group bg-gradient-to-b from-[#14110C] to-[#0D0B08] border border-[#D4AF37]/30 rounded-lg overflow-hidden hover:border-[#D4AF37] transition-all duration-300 shadow-xl flex flex-col justify-between"
                data-testid={CATALOG.perfumeCard}
              >
                <div className="relative overflow-hidden aspect-square bg-[#0A0A0A]">
                  <img 
                    src={perfume.image} 
                    alt={perfume.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0A0A]/80 border border-[#D4AF37]/40 px-2.5 py-1 rounded text-[10px] text-[#D4AF37] font-serif uppercase tracking-widest">
                    {perfume.category}
                  </div>
                  
                  <button 
                    onClick={() => toggleWishlist(perfume.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#0A0A0A]/80 border border-[#D4AF37]/30 text-neutral-300 hover:text-[#D4AF37] transition-colors"
                    title="Save to favorites"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <button
                      onClick={() => navigate(`/perfume/${perfume.id}`)}
                      className="w-full py-2 bg-[#D4AF37] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest rounded shadow hover:bg-[#F3E5AB] transition-colors"
                      data-testid={CATALOG.quickViewBtn}
                    >
                      Quick View & Notes
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#D4AF37] font-serif uppercase tracking-widest">
                      <span>{perfume.brand}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{perfume.rating}</span>
                      </div>
                    </div>
                    <h3 
                      onClick={() => navigate(`/perfume/${perfume.id}`)}
                      className="font-serif text-lg font-bold text-neutral-100 mt-1 cursor-pointer hover:text-[#D4AF37] transition-colors line-clamp-1"
                    >
                      {perfume.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-serif line-clamp-2 mt-1">
                      {perfume.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Price</span>
                      <span className="font-serif text-base font-bold text-[#D4AF37]">${perfume.price}</span>
                    </div>

                    <button
                      onClick={() => addToCart(perfume, perfume.sizes[1] || "100ml", 1)}
                      className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-wider rounded hover:opacity-95 transition-all shadow-md flex items-center gap-1.5"
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
            className="px-8 py-3.5 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-2xl hover:opacity-95 transition-all inline-flex items-center gap-2 group"
          >
            <span>Explore Full Catalog of 100 Perfumes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Brand Heritage Banner */}
      <section className="py-24 border-y border-[#D4AF37]/30 bg-gradient-to-r from-[#14110C] via-[#1A1610] to-[#14110C] my-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#D4AF37] font-serif text-xs tracking-widest uppercase">
                <Sparkles className="w-4 h-4" />
                <span>The Art of Extrait de Parfum</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F3E5AB] leading-tight">
                Handcrafted in Grasse & Aged in French Oak Casks
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed">
                Every flacon of L'Élixir Noir undergoes a meticulous 6-month maceration process. Our master perfumers blend rare essential oils with pristine botanical alcohol, creating an opulent sillage that develops exquisitely on the skin over 24 hours.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-800 font-serif">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">100</div>
                  <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Curated Flacons</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">25+</div>
                  <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Years Aged Oud</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">100%</div>
                  <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Authentic Noses</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#D4AF37]/40 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury Perfume Atelier" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-serif block">Private Reserve</span>
                  <h4 className="font-serif text-lg font-bold text-white">The Connoisseur's Vault</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ScentQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}

