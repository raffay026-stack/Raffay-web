import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
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
  const [activeTab, setActiveTab] = useState("summer");
  const [quickSearch, setQuickSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(".luxury-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("luxury-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -70px 0px"
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif selection:bg-[#6E1F35] selection:text-[#FFFDF8]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section className="FK Decore-cinematic-hero relative overflow-hidden min-h-[640px] flex items-center border-b border-[#6E1F35]/20">

        <video
          className="FK Decore-hero-video absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/WhatsApp%20Video%202026-09-21%20at%209.05.41%20PM.mp4" type="video/mp4" />
        </video>

        <div className="FK Decore-hero-video-overlay absolute inset-0 pointer-events-none" />
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#6E1F35]/10 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left max-w-2xl mr-auto space-y-6 py-20">

            {/* Quick search input */}

          </div>
        </div>
      </section>

      {/* Featured Showcase Tabs */}
            <nav className="fk-breadcrumb" aria-label="Main navigation">
        <a href="/sale-products">Sale Products</a>
        <span>�</span>
        <a href="/categories">Categories</a>
        <span>�</span>
        <a href="/new-arrivals">New Arrivals</a>
        <span>�</span>
        <a href="/about-us">About Us</a>
        <span>�</span>
        <a href="/hot-articles">Hot Articles</a>
      </nav>

      <section className="luxury-reveal py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-[#E5D8D0] pb-6">
          <div>
            <span className="text-xs text-[#6E1F35] uppercase tracking-widest font-serif">Curated Masterpieces</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#43111F] mt-1">Exclusive Selections</h2>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab("royal")}
              className={`px-5 py-2 rounded font-serif text-xs uppercase tracking-widest transition-all ${activeTab === 'royal' ? 'bg-[#6E1F35] text-[#FFFDF8] font-bold shadow-lg' : 'bg-[#FFFDF8] text-[#7C6E72] border border-[#6E1F35]/30 hover:border-[#6E1F35]'}`}
              data-testid={HOME.royalOudTab}
            >
              Summer Collection Series
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-5 py-2 rounded font-serif text-xs uppercase tracking-widest transition-all ${activeTab === 'bestseller' ? 'bg-[#6E1F35] text-[#FFFDF8] font-bold shadow-lg' : 'bg-[#FFFDF8] text-[#7C6E72] border border-[#6E1F35]/30 hover:border-[#6E1F35]'}`}
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
                className="group bg-gradient-to-b from-[#FFFDF8] to-[#F7F1EC] border border-[#6E1F35]/30 rounded-lg overflow-hidden hover:border-[#6E1F35] transition-all duration-300 shadow-xl flex flex-col justify-between"
                data-testid={CATALOG.PerfumeCard}
              >
                <div className="relative overflow-hidden aspect-square bg-[#FFFDF8]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 bg-[#FFFDF8]/80 border border-[#6E1F35]/40 px-2.5 py-1 rounded text-[10px] text-[#6E1F35] font-serif uppercase tracking-widest">
                    {product.category}
                  </div>
                  
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#FFFDF8]/80 border border-[#6E1F35]/30 text-[#5D5054] hover:text-[#6E1F35] transition-colors"
                    title="Save to favorites"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#6E1F35] text-[#6E1F35]' : ''}`} />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#FFFDF8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <button
                      onClick={() => navigate(`/Perfume/${product.id}`)}
                      className="w-full py-2 bg-[#6E1F35] text-[#FFFDF8] font-serif text-xs font-bold uppercase tracking-widest rounded shadow hover:bg-[#43111F] transition-colors"
                      data-testid={CATALOG.quickViewBtn}
                    >
                      Quick View & Notes
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#6E1F35] font-serif uppercase tracking-widest">
                      <span>{product.brand}</span>
                      <div className="flex items-center gap-1 text-[#6E1F35]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <h3 
                      onClick={() => navigate(`/Perfume/${product.id}`)}
                      className="font-serif text-lg font-bold text-[#2D2326] mt-1 cursor-pointer hover:text-[#6E1F35] transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#7C6E72] font-serif line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E5D8D0]">
                    <div>
                      <span className="text-[10px] text-[#8A7A80] uppercase tracking-widest block">Price</span>
                      <span className="font-serif text-base font-bold text-[#6E1F35]">${product.price}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product, product.sizes[1] || "L", 1)}
                      className="px-4 py-2 bg-gradient-to-r from-[#6E1F35] to-[#43111F] text-[#FFFDF8] font-serif text-xs font-bold uppercase tracking-wider rounded hover:opacity-95 transition-all shadow-md flex items-center gap-1.5"
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
            className="px-8 py-3.5 bg-gradient-to-r from-[#43111F] via-[#6E1F35] to-[#43111F] text-[#FFFDF8] font-serif text-xs font-bold uppercase tracking-widest rounded shadow-2xl hover:opacity-95 transition-all inline-flex items-center gap-2 group"
          >
            <span>Explore Full Catalog of 100 Perfumes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Brand Heritage Banner */}
      <section className="luxury-reveal py-24 border-y border-[#6E1F35]/30 bg-gradient-to-r from-[#FFFDF8] via-[#F3E8E1] to-[#FFFDF8] my-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#6E1F35] font-serif text-xs tracking-widest uppercase">
                <Sparkles className="w-4 h-4" />
                <span>The Art of Extrait de Perfume</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#43111F] leading-tight">
                Handcrafted in Grasse & Aged in French Oak Casks
              </h2>
              <p className="text-sm sm:text-base text-[#5D5054] font-serif leading-relaxed">
                Every flacon of 𝓢𝓬𝓮𝓷𝓽𝓸𝓻𝓪 undergoes a meticulous 6-month maceration process. Our master Perfumers blend rare essential oils with pristine botanical alcohol, creating an opulent sillage that develops exquisitely on the skin over 24 hours.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E5D8D0] font-serif">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#6E1F35]">100</div>
                  <div className="text-xs text-[#7C6E72] mt-1 uppercase tracking-wider">Curated Flacons</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#6E1F35]">25+</div>
                  <div className="text-xs text-[#7C6E72] mt-1 uppercase tracking-wider">Years Aged Oud</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#6E1F35]">100%</div>
                  <div className="text-xs text-[#7C6E72] mt-1 uppercase tracking-wider">Authentic Noses</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#6E1F35]/40 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury Perfume Atelier" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF8]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] text-[#6E1F35] uppercase tracking-widest font-serif block">Private Reserve</span>
                  <h4 className="font-serif text-lg font-bold text-white">The Connoisseur's Vault</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
















































