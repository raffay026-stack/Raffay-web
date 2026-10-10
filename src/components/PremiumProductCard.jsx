import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { CATALOG } from "../constants/testIds";

/**
 * Premium 3D Product Card Component
 * Reusable luxury product card with sophisticated depth, shadows, and hover effects
 */
export default function PremiumProductCard({
  product,
  addToCart,
  wishlist = [],
  toggleWishlist,
  showQuickAdd = true
}) {
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, product.sizes?.[1] || product.sizes?.[0] || "One Size", 1);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-gradient-to-br from-[#FFFDF8] via-[#FFFFFF] to-[#F7F1EC] border border-[#6E1F35]/20 rounded-2xl overflow-hidden hover:border-[#6E1F35] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      style={{
        boxShadow: '0 4px 16px rgba(110, 31, 53, 0.08), 0 1px 4px rgba(110, 31, 53, 0.04)',
        transform: 'perspective(1000px) rotateX(0deg)',
      }}
      data-testid={CATALOG.PerfumeCard}
    >
      {/* Premium 3D Image Container */}
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-[#FFFDF8] to-[#F7F1EC]">
        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6E1F35]/5 via-transparent to-[#87344D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))' }}
        />

        {/* Sale/New Badge */}
        {(product.isSale || product.isNewArrival || product.isHotArticle) && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#6E1F35] to-[#87344D] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
            {product.isSale ? 'SALE' : product.isNewArrival ? 'NEW' : 'HOT'}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#6E1F35]/20 text-[#5D5054] hover:text-[#6E1F35] hover:bg-white hover:shadow-lg transition-all duration-300"
          title="Save to favorites"
        >
          <Heart className={`w-4 h-4 transition-all ${isWishlisted ? 'fill-[#6E1F35] text-[#6E1F35] scale-110' : ''}`} />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#2D2326]/80 via-[#2D2326]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-end">
          <button
            onClick={handleCardClick}
            className="w-full py-2.5 bg-white/95 backdrop-blur-sm text-[#6E1F35] font-serif text-xs font-bold uppercase tracking-[0.15em] rounded-lg shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300"
            data-testid={CATALOG.quickViewBtn}
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information - Premium Typography */}
      <div className="p-5 space-y-3">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#6E1F35] font-serif uppercase tracking-[0.15em] font-semibold">
            {product.brand || "FK DECORE"}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1 text-[#6E1F35]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-lg font-bold text-[#2D2326] line-clamp-1 group-hover:text-[#6E1F35] transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#7C6E72] font-serif line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5D8D0]">
          <div>
            <span className="text-[10px] text-[#8A7A80] uppercase tracking-widest block mb-0.5">Price</span>
            <span className="font-serif text-lg font-bold text-[#6E1F35]">
              PKR {product.price}
            </span>
          </div>

          {showQuickAdd && (
            <button
              onClick={handleQuickAdd}
              className="px-4 py-2.5 bg-gradient-to-r from-[#6E1F35] to-[#87344D] text-[#FFFDF8] font-serif text-xs font-bold uppercase tracking-wider rounded-lg hover:shadow-xl hover:shadow-[#6E1F35]/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              data-testid={CATALOG.addToCartBtn}
              style={{
                boxShadow: '0 4px 12px rgba(110, 31, 53, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Premium 3D depth effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(110, 31, 53, 0.1)'
        }}
      ></div>
    </div>
  );
}
