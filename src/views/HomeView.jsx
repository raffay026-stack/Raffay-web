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

  const featuredOuds = products.filter(p => p.isRoyalOud || p.category === "Graphic Tees").slice( 0, 8 );
  const bestsellers = products.filter(p => p.isBestseller).slice( 0, 8 );

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

                <div className="Decore-hero-slider absolute inset-0">
          <div className="Decore-desktop-slides">
            <img src="/hero-desktop1.jpg" alt="FK Decore" />
            <img src="/hero-desktop2.jpg" alt="FK Decore" />
            <img src="/hero-desktop3.jpg" alt="FK Decore" />
            <img src="/hero-desktop4.jpg" alt="FK Decore" />
          </div>

          <div className="Decore-mobile-slides">
            <img src="/hero-mobile1.jpg" alt="FK Decore" />
            <img src="/hero-mobile2.jpg" alt="FK Decore" />
            <img src="/hero-mobile3.jpg" alt="FK Decore" />
            <img src="/hero-mobile4.jpg" alt="FK Decore" />
          </div>
        </div>

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
        <span>›</span>
        <a href="/categories">Categories</a>
        <span>›</span>
        <a href="/new-arrivals">New Arrivals</a>
        <span>›</span>
        <a href="/about-us">About Us</a>
        <span>›</span>
        <a href="/hot-articles">Hot Articles</a>
      </nav>

      <section className="luxury-reveal py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-[#E5D8D0] pb-6">
          <div>
            <span className="text-xs text-[#6E1F35] uppercase tracking-widest font-serif">Sale's Products</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#43111F] mt-1">Sale's Products</h2>
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
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-20 bg-[#F7F1EC] border-y border-[#6E1F35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10 sm:mb-14">
            <p className="uppercase tracking-[0.3em] text-sm text-[#6E1F35] mb-3">
              Explore
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43111F]">
              Categories
            </h2>

            <p className="mt-3 text-gray-600">
              Explore decor categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

            {[
              ["Oud & Woody", "oud-woody", "/hero-desktop1.jpg"],
              ["Oriental Spice", "oriental-spice", "/hero-desktop2.jpg"],
              ["Floral", "floral", "/hero-desktop3.jpg"],
              ["Citrus Fresh", "citrus-fresh", "/hero-desktop4.jpg"],
              ["Fresh Spicy", "fresh-spicy", "/hero-desktop1.jpg"],
              ["Sensual Floral", "sensual-floral", "/hero-desktop2.jpg"],
              ["Gourmand Amber", "gourmand-amber", "/hero-desktop3.jpg"],
              ["Aquatic & Fresh", "aquatic-fresh", "/hero-desktop4.jpg"]
            ].map(([name, slug, image]) => (
              <button
                key={slug}
                onClick={() => navigate(`/category/${slug}`)}
                className="group text-left bg-[#FFFDF8] border border-[#6E1F35]/15 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >

                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-serif text-lg sm:text-xl text-[#43111F]">
                    {name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm uppercase tracking-wider text-[#6E1F35]">
                    Explore Collection →
                  </p>
                </div>

              </button>
            ))}

          </div>
        </div>
      </section>
      {/* All Products Section */}
      <section className="py-14 sm:py-20 bg-[#FFFDF8] border-b border-[#6E1F35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-8 sm:mb-10">
            <p className="uppercase tracking-[0.3em] text-sm text-[#6E1F35] mb-3">
              Complete Collection
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43111F]">
              All Products
            </h2>

            <p className="mt-3 text-gray-600">
              Discover all products in decoration collection
            </p>
          </div>

          <button
            onClick={() => navigate("/catalog")}
            className="group block w-full max-w-5xl mx-auto bg-[#F7F1EC] border border-[#6E1F35]/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left"
          >

            <div className="grid md:grid-cols-2">

              <div className="aspect-[16/9] md:aspect-auto overflow-hidden">
                <img
                  src="/hero-desktop4.jpg"
                  alt="All Products"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col justify-center items-center text-center p-7 sm:p-10 md:p-14">

                <p className="uppercase tracking-[0.25em] text-sm text-[#6E1F35] mb-3">
                  FK Decore
                </p>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#43111F] mb-4">
                  All Products
                </h3>

                <p className="text-gray-600 leading-7 max-w-md mb-7">
                  Tap here to view all products
                </p>

                <span className="inline-flex items-center px-7 py-3.5 bg-[#43111F] text-white rounded-lg group-hover:bg-[#6E1F35] transition">
                  View All Products →
                </span>

              </div>

            </div>

          </button>

        </div>
      </section>
      {/* Hot Arrivals Section */}
      <section id="hot-arrivals" className="py-16 sm:py-20 bg-[#FFFDF8] border-y border-[#6E1F35]/10">

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">

          <div className="text-center mb-10 sm:mb-14">

            <p className="uppercase tracking-[0.3em] text-sm text-[#6E1F35] mb-3">
              ✦ HOT ARRIVALS ✦
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43111F]">
              Most Demanding Products
            </h2>

            <div className="w-28 h-px bg-[#6E1F35] mx-auto mt-5 mb-5"></div>

            <p className="text-gray-600 text-base sm:text-lg">
              Be the first to get these hot articles
            </p>

          </div>


          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-4">

            {products.slice(0, 8).map((product) => (

              <div
                key={product.id}
                className="group bg-[#F7F1EC] border border-[#6E1F35]/15 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >

                <div
                  className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-[#FFFDF8] text-[#6E1F35] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md border border-[#6E1F35]/15">
                    NEW
                  </span>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-[#6E1F35] shadow-sm hover:bg-[#6E1F35] hover:text-white transition"
                    aria-label="Add to wishlist"
                  >
                    ♡
                  </button>

                </div>


                <div className="p-3 sm:p-4">

                  <div className="flex items-center justify-between gap-2">

                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#6E1F35] font-semibold truncate">
                      {product.brand || "FK DECORE"}
                    </p>

                    <span className="text-xs text-[#6E1F35] whitespace-nowrap">
                      ★ {product.rating || "4.9"}
                    </span>

                  </div>


                  <h3
                    className="font-serif text-base sm:text-lg text-[#43111F] mt-2 cursor-pointer line-clamp-1"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>


                  <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2 min-h-[32px]">
                    {product.description || "A refined fragrance crafted for an unforgettable impression."}
                  </p>


                  <div className="border-t border-[#6E1F35]/10 mt-4 pt-3 flex items-end justify-between gap-2">

                    <div>
                      <p className="uppercase text-[9px] tracking-widest text-gray-500">
                        Price
                      </p>

                      <p className="font-serif text-base sm:text-lg font-semibold text-[#6E1F35]">
                        ${product.price}
                      </p>
                    </div>


                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="px-3 sm:px-4 py-2 bg-[#43111F] text-white rounded-md text-xs sm:text-sm font-semibold hover:bg-[#6E1F35] transition"
                    >
                      🛍 ADD
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>


          <div className="text-center mt-10 sm:mt-12">

            <button
              onClick={() => navigate("/catalog")}
              className="px-7 sm:px-10 py-3.5 bg-[#43111F] text-white rounded-lg font-semibold tracking-wider hover:bg-[#6E1F35] transition"
            >
              VIEW ALL HOT ARRIVALS →
            </button>

          </div>

        </div>

      </section>


      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* FK Decore Contact Footer */}
      <footer className="bg-[#43111F] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

            <div>
              <h3 className="font-serif text-2xl mb-3">
                FK Decore
              </h3>

              <p className="text-white/70 text-sm leading-6">
                Discover beautiful decor and premium collections.
              </p>
            </div>


            {/* Social Swipe Cards */}
            <div>
              <h4 className="uppercase tracking-[0.2em] text-sm mb-5">
                Follow Us
              </h4>

              <div className="flex justify-center gap-3">

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/fk_decore/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-swipe-card group"
                >
                  <div className="social-swipe-logo instagram-logo">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-7 h-7"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1"/>
                    </svg>

                  </div>

                  <div className="social-swipe-info">
                    <span>Instagram</span>
                    <small>@fk_decore</small>
                  </div>
                </a>


                {/* Facebook */}
                <a
                  href="https://www.facebook.com/FKDecorCollection/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-swipe-card group"
                >
                  <div className="social-swipe-logo facebook-logo">

                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7"
                    >
                      <path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.7.3-1 1-1Z"/>
                    </svg>

                  </div>

                  <div className="social-swipe-info">
                    <span>Facebook</span>
                    <small>FK Decor Collection</small>
                  </div>
                </a>

              </div>
            </div>


            <div>
              <h4 className="uppercase tracking-[0.2em] text-sm mb-5">
                Contact Us
              </h4>

              <a
  href="https://wa.me/923356066069"
  target="_blank"
  rel="noopener noreferrer"
  className="social-swipe-card group mx-auto"
>
  <div className="social-swipe-logo whatsapp-logo">

    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-7 h-7"
    >
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 0 0 5.78 1.48h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.18-3.48-8.4ZM12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.86 9.86 0 1 1 8.35 4.61Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
    </svg>

  </div>

  <div className="social-swipe-info">
    <span>WhatsApp</span>
    <small>0335 6066069</small>
  </div>
</a>
            </div>

          </div>

          <div className="border-t border-white/15 mt-10 pt-6 text-center">
            <p className="text-white/50 text-xs sm:text-sm">
              © {new Date().getFullYear()} FK Decore. All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}































































