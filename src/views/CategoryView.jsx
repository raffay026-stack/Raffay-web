import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from "../components/ScentQuizModal";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { getProductCategoryBySlug, normalizeProductCategory } from "../constants/productCategories";

export default function CategoryView() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    products,
    addToCart,
    wishlist,
    toggleWishlist
  } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const category = getProductCategoryBySlug(slug);

  const categoryProducts = useMemo(() => {
    if (!products || !category) return [];
    return products.filter(
      (product) => normalizeProductCategory(product.category) === category.name
    );
  }, [products, category]);

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
          threshold: 0.1,
          rootMargin: "0px 0px -40px 0px"
        }
      );

      cards.forEach((card, index) => {
        card.classList.remove("catalog-luxury-visible");
        card.style.setProperty(
          "--catalog-delay",
          `${(index % 4) * 90}ms`
        );
        observer.observe(card);
      });

      return () => observer.disconnect();
    }, 80);

    return () => clearTimeout(timer);
  }, [categoryProducts.length]);

  if (!category) {
    return (
      <div className="min-h-screen bg-[#FFFDF8]">
        <Navbar />

        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-[#43111F] mb-4">
              Category Not Found
            </h1>

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[#43111F] text-white rounded-lg hover:bg-[#6E1F35] transition"
            >
              Back Home
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif selection:bg-[#43111F] selection:text-[#FFFDF8]">

      {/* Existing website navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Category Hero */}
{/* Heading */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        <div className="text-center border-b border-[#E5D8D0] pb-8 mb-10">

          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-[#6E1F35] mb-3">
            Explore Collection
          </p>

          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-[#7C6E72] sm:text-sm">
            <Link to="/" className="hover:text-[#43111F]">Home</Link>
            <span aria-hidden="true">/</span>
            <a href="/#categories" className="hover:text-[#43111F]">Categories</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#43111F]">{category.name}</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#43111F] mb-4">
            {category.name}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#6B5A60] leading-7">
            {category.description}
          </p>

          <p className="mt-5 text-xs sm:text-sm text-[#6E1F35] uppercase tracking-widest">
            {categoryProducts.length} {categoryProducts.length === 1 ? "Product" : "Products"}
          </p>

        </div>

        {/* EXACT CATALOG-STYLE PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {categoryProducts.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm text-[#6B5A60]">
              No products are currently available in this category.
            </p>
          ) : categoryProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="catalog-luxury-product group bg-gradient-to-b from-[#F7F1EC] to-[#FFFFFF] border border-[#43111F]/30 rounded-lg overflow-hidden hover:border-[#43111F] transition-all duration-300 shadow-xl flex flex-col justify-between"
              >

                {/* Product image */}
                <div className="relative overflow-hidden aspect-square bg-[#FFFDF8]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 opacity-90"
                  />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-[#FFFDF8]/85 border border-[#43111F]/40 px-2.5 py-1 rounded text-[10px] text-[#43111F] font-serif uppercase tracking-widest">
                    {category.name}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#FFFDF8]/85 border border-[#43111F]/30 text-[#5D5054] hover:text-[#43111F] transition-colors"
                    title="Save to favorites"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted
                          ? "fill-[#43111F] text-[#43111F]"
                          : ""
                      }`}
                    />
                  </button>

                  {/* Quick view */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#FFFDF8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">

                    <button
                      onClick={() => navigate(`/Perfume/${product.id}`)}
                      className="w-full py-2 bg-[#6E1F35] text-white font-serif text-xs font-bold uppercase tracking-widest rounded shadow hover:bg-[#43111F] transition-colors"
                    >
                      Quick View & Notes
                    </button>

                  </div>
                </div>

                {/* Product details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">

                  <div>

                    <div className="flex items-center justify-between text-xs text-[#43111F] font-serif uppercase tracking-widest">

                      <span>
                        {product.brand || "FK DECORE"}
                      </span>

                      <div className="flex items-center gap-1 text-[#6E1F35]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating || "4.8"}</span>
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
                      <span className="text-[10px] text-[#8A7A80] uppercase tracking-widest block">
                        Price
                      </span>

                      <span className="font-serif text-base font-bold text-[#43111F]">
                        PKR {product.price}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        addToCart(
                          product,
                          product.sizes?.[1] || "L",
                          1
                        )
                      }
                      className="px-4 py-2 bg-gradient-to-r from-[#43111F] to-[#6E1F35] text-white font-serif text-xs font-bold uppercase tracking-wider rounded hover:opacity-95 transition-all shadow-md flex items-center gap-1.5"
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

        {/* Bottom navigation */}
        <div className="text-center pt-12">

          <button
            onClick={() => navigate("/")}
            className="text-[#6E1F35] underline underline-offset-4 text-sm"
          >
            ← Back to Home
          </button>

        </div>

      </section>

      {/* Existing footer */}
      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <StyleQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

    </div>
  );
}


