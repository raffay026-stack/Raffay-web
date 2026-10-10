import React, { useEffect, useState } from "react";
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
  Minus
} from "lucide-react";
import { PRODUCT_DETAIL } from "../constants/testIds";

export default function ProductDetailView() {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const matchedProduct = products.find(p => p.id === id) || products[0] || null;
  const product = matchedProduct || {
    id: "",
    name: "",
    sizes: ["One Size"],
    variations: { name: "", options: [] },
    price: 0,
    image: "",
    deliveryCharge: 0,
    brand: "FK Decore",
    rating: 0,
    reviewsCount: 0,
    description: "",
    category: ""
  };
  const variationOptions = Array.isArray(product?.variations?.options)
    ? product.variations.options
    : [];
  const [selectedSize, setSelectedSize] = useState(
    variationOptions[0]?.value || product.sizes?.[1] || product.sizes?.[0] || "L"
  );
  const [quantity, setQuantity] = useState(1);
  const selectedVariation = variationOptions.find(
    (option) => String(option.value) === String(selectedSize)
  ) || null;
  const selectedPrice = selectedVariation &&
    selectedVariation.price !== undefined &&
    selectedVariation.price !== null &&
    selectedVariation.price !== ""
      ? Number(selectedVariation.price) || 0
      : Number(product.price) || 0;

  useEffect(() => {
    setSelectedSize(
      variationOptions[0]?.value || product.sizes?.[1] || product.sizes?.[0] || "L"
    );
    setQuantity(1);
  }, [id, product.id]);

  const extraGalleryImages = Array.isArray(product.galleryImages)
    ? product.galleryImages
    : [];

  const productGallery = Array.from(new Set([
    selectedVariation?.image,
    product.image,
    ...extraGalleryImages
  ].filter((image) => typeof image === "string" && image.length > 0)));

  const productGalleryKey = productGallery
    .map((image) => `${image.length}:${image.slice(0, 48)}`)
    .join("|");

  const activeGalleryImage = productGallery[activeGalleryIndex] || product.image;

  useEffect(() => {
    setActiveGalleryIndex(0);

    if (productGallery.length < 2) return undefined;

    const slideshow = window.setInterval(() => {
      setActiveGalleryIndex((current) =>
        (current + 1) % productGallery.length
      );
    }, 3500);

    return () => window.clearInterval(slideshow);
  }, [id, product.id, selectedSize, productGallery.length, productGalleryKey]);
  const isWishlisted = wishlist.includes(product.id);

  if (!matchedProduct) {
    return (
      <main className="min-h-screen bg-[#FFFDF8] text-[#43111F] flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold">Loading product...</h1>
          <p className="mt-3 text-sm text-[#7C6E72]">
            Please wait while the product information loads.
          </p>
          <button
            onClick={() => navigate("/catalog")}
            className="mt-5 rounded bg-[#6E1F35] px-5 py-3 text-white"
          >
            Return to collection
          </button>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate("/checkout");
  };

  return (
    <div className="luxury-detail-page min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif selection:bg-[#43111F] selection:text-[#FFFDF8]">
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
            <div className="luxury-detail-media aspect-square rounded-lg overflow-hidden border border-[#43111F]/40 bg-[#FFFFFF] shadow-2xl relative">
              <img 
                key={activeGalleryImage}
                src={activeGalleryImage} 
                alt={product.name}
                className="product-gallery-slide w-full h-full object-contain opacity-95"
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
            
            {productGallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2" aria-label="Product image gallery">
                {productGallery.map((image, index) => (
                  <button
                    key={`${index}-${image.slice(0, 20)}`}
                    type="button"
                    onClick={() => setActiveGalleryIndex(index)}
                    aria-label={`Show product image ${index + 1}`}
                    aria-pressed={activeGalleryIndex === index}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded border p-1 ${
                      activeGalleryIndex === index
                        ? "border-[#6E1F35]"
                        : "border-[#D2BCB0]"
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
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
          <div className="luxury-detail-content space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6E1F35] font-serif uppercase tracking-[0.2em]">{product.brand}</span>
                <div className="flex items-center gap-1.5 text-[#6E1F35] text-sm font-serif">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-[#8A7A80]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#6E1F35] mt-1">
                {product.name}
              </h1>

              <div className="text-2xl font-serif font-bold text-[#6E1F35] mt-3">
                PKR {selectedPrice} <span className="text-xs text-[#8A7A80] font-normal">PKR (Tax Included)</span>
              </div>
                <div className="mt-2 text-sm font-semibold text-[#6E1F35]">                   Delivery Charges: PKR {Number(product.deliveryCharge || 0).toFixed(2)}                 </div>
            </div>

            <p className="text-sm text-[#5D5054] font-serif leading-relaxed">
              {product.description}
            </p>


            {variationOptions.length > 0 ? (
              <div className="space-y-2 pt-2">
                <label className="text-xs text-[#6E1F35] uppercase tracking-wider font-serif block">
                  {product.variations?.name || "Choose an option"}
                </label>
                <select
                  value={selectedSize}
                  onChange={(event) => setSelectedSize(event.target.value)}
                  className="w-full rounded border border-[#43111F]/40 bg-white px-3 py-3 text-sm text-[#43111F]"
                >
                  {variationOptions.map((option, index) => {
                    const optionPrice = option.price !== undefined && option.price !== null && option.price !== ""
                      ? Number(option.price) || 0
                      : Number(product.price) || 0;
                    return (
                      <option key={`${option.value}-${index}`} value={option.value}>
                        {option.value} — PKR {optionPrice.toFixed(2)}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : Array.isArray(product.sizes) && product.sizes.length > 1 ? (
              <div className="space-y-2 pt-2">
                <label className="text-xs text-[#6E1F35] uppercase tracking-wider font-serif block">
                  Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(event) => setSelectedSize(event.target.value)}
                  className="w-full rounded border border-[#43111F]/40 bg-white px-3 py-3 text-sm text-[#43111F]"
                >
                  {product.sizes.map((size, index) => (
                    <option key={`${size}-${index}`} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            ) : null}
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


          </div>

        </div>

      </div>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <StyleQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}

























