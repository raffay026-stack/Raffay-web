import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { PERFUME_BRANDS, PERFUME_CATEGORIES } from "../mock";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from '../components/ScentQuizModal';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingBag, 
  Heart, 
  ArrowUpDown, 
  RotateCcw,
  Crown
} from "lucide-react";
import { CATALOG } from "../constants/testIds";

export default function CatalogView() {
  const { products, addToCart, wishlist, toggleWishlist } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Filters state from URL query or default
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "all";
  const brandFilter = searchParams.get("brand") || "all";
  const sortBy = searchParams.get("sort") || "featured";
  const maxPriceParam = searchParams.get("maxPrice");
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : Infinity;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleSearchChange = (val) => {
    const params = new URLSearchParams(searchParams);
    if (val) params.set("search", val); else params.delete("search");
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat && cat !== "all") params.set("category", cat); else params.delete("category");
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    const params = new URLSearchParams(searchParams);
    if (brand && brand !== "all") params.set("brand", brand); else params.delete("brand");
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    setSearchParams(params);
  };

  const handlePriceChange = (price) => {
    const params = new URLSearchParams(searchParams);
    params.set("maxPrice", price);
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  // Filter and Sort logic
  const filteredPerfumes = useMemo(() => {
    return products.filter(p => {
      // Search match
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category match
      const matchesCategory = categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase();

      // Brand match
      const matchesBrand = brandFilter === "all" || p.brand.toLowerCase() === brandFilter.toLowerCase();

      // Price match
      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return 0; // featured
    });
  }, [products, searchQuery, categoryFilter, brandFilter, maxPrice, sortBy]);

  // Paginated items
  const totalPages = Math.ceil(filteredPerfumes.length / itemsPerPage);
  const currentItems = filteredPerfumes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll(".catalog-luxury-product");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("catalog-luxury-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.10,
          rootMargin: "0px 0px -40px 0px"
        }
      );

      cards.forEach((card, index) => {
        card.classList.remove("catalog-luxury-visible");
        card.style.setProperty("--catalog-delay", `${(index % 4) * 90}ms`);
        observer.observe(card);
      });

      return () => observer.disconnect();
    }, 80);

    return () => clearTimeout(timer);
  }, [currentPage, currentItems]);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif selection:bg-[#43111F] selection:text-[#FFFDF8]">
      <Navbar onOpenCart={() => setIsCartOpen(true)} onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#F7F1EC] to-[#FFFDF8] border-b border-[#43111F]/20 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#43111F] text-xs uppercase tracking-[0.2em] font-serif">
            <Crown className="w-4 h-4" />
            <span>FK Decore â€¢ {products.length} Products</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#43111F]">
            Premium Decoration Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#7C6E72] max-w-xl mx-auto font-serif">
            Explore our curated collection of elegant decoration pieces for home, office, lobby and outdoor spaces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8">


          {/* Main Grid Area */}
          <div className="w-full space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-[#FFFDF8] border border-[#43111F]/30 p-4 rounded-lg gap-4">
              <div className="text-xs font-serif text-[#5D5054]">
                <span className="text-[#43111F] font-bold">{filteredPerfumes.length}</span> matching products Â· {products.length} total products
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-xs font-serif text-[#7C6E72] whitespace-nowrap">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#43111F]" />
                  <span>Sort By:</span>
                </div>
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-[#FFFDF8] border border-[#43111F]/30 px-3 py-1.5 text-xs text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded font-serif flex-1 sm:w-48"
                  data-testid={CATALOG.sortSelect}
                >
                  <option value="featured">Featured Masterpieces</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Releases</option>
                </select>
              </div>
            </div>

            {/* Perfumes Grid */}
            {filteredPerfumes.length === 0 ? (
              <div className="text-center py-24 bg-[#FFFDF8] border border-[#43111F]/20 rounded-lg space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F7F1EC] border border-[#43111F]/30 flex items-center justify-center text-[#43111F]">
                  <Search className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-lg text-[#5D5054]">No Decoration Piece Found</h4>
                <p className="text-xs text-[#8A7A80] max-w-xs mx-auto font-serif">
                  No premium decoration pieces match your current filters or search terms. Try resetting your search parameters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#43111F] to-[#6E1F35] text-white font-serif text-xs font-bold uppercase tracking-widest rounded-sm hover:opacity-95 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <div 
                      key={product.id}
                      className="catalog-luxury-product group bg-gradient-to-b from-[#F7F1EC] to-[#FFFFFF] border border-[#43111F]/30 rounded-lg overflow-hidden hover:border-[#43111F] transition-all duration-300 shadow-xl flex flex-col justify-between"
                      data-testid={CATALOG.PerfumeCard}
                    >
                      <div className="relative overflow-hidden aspect-square bg-[#FFFDF8]">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-500 opacity-90"
                        />
                        
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-[#FFFDF8]/80 border border-[#43111F]/30 text-[#5D5054] hover:text-[#43111F] transition-colors"
                          title="Save to favorites"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#43111F] text-[#43111F]' : ''}`} />
                        </button>

                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#FFFDF8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                          <button
                            onClick={() => navigate(`/Perfume/${product.id}`)}
                            className="w-full py-2 bg-[#6E1F35] text-white font-serif text-xs font-bold uppercase tracking-widest rounded shadow hover:bg-[#6E1F35] transition-colors"
                            data-testid={CATALOG.quickViewBtn}
                          >
                            Quick View & Notes
                          </button>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#43111F] font-serif uppercase tracking-widest">
                            <span>{product.brand}</span>
                            <div className="flex items-center gap-1 text-[#6E1F35]">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                          <h3 
                            onClick={() => navigate(`/Perfume/${product.id}`)}
                            className="font-serif text-lg font-bold text-[#2D2326] mt-1 cursor-pointer hover:text-[#43111F] transition-colors line-clamp-1"
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
                            <span className="font-serif text-base font-bold text-[#43111F]">PKR {product.price}</span>
                          </div>

                          <button
                            onClick={() => addToCart(product, product.sizes[1] || "L", 1)}
                            className="px-4 py-2 bg-gradient-to-r from-[#43111F] to-[#6E1F35] text-white font-serif text-xs font-bold uppercase tracking-wider rounded hover:opacity-95 transition-all shadow-md flex items-center gap-1.5"
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
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded font-serif text-xs flex items-center justify-center transition-all ${currentPage === i + 1 ? 'bg-[#6E1F35] text-white font-bold shadow-lg' : 'bg-[#FFFDF8] border border-[#6E1F35]/30 text-[#5D5054] hover:border-[#6E1F35]'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}






























