import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import StyleQuizModal from "../components/ScentQuizModal";
import { Heart, ShoppingBag, Star } from "lucide-react";

export default function NewArrivalsView() {
  const { products, addToCart, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const newProducts = products.filter((product) => product.isNewArrival);

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
  }, [newProducts.length]);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] font-serif selection:bg-[#43111F] selection:text-white">

      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F7F1EC] to-[#FFFDF8] border-b border-[#43111F]/20 py-12 sm:py-16 px-4 text-center">

        <div className="max-w-4xl mx-auto">

          <p className="text-xs uppercase tracking-[0.3em] text-[#6E1F35] font-serif mb-4">
            FK DECORE
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#43111F]">
            New Arrivals
          </h1>

          <div className="w-20 h-px bg-[#6E1F35] mx-auto my-6" />

          <p className="text-sm sm:text-base text-[#7C6E72] max-w-2xl mx-auto leading-7">
            Discover the latest additions to our collection of refined decoration pieces.
          </p>

        </div>

      </section>

      {/* Product Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 border-b border-[#E5D8D0] pb-6 mb-8">

          <div>
            <p className="text-xs uppercase tracking-widest text-[#6E1F35]">
              Fresh Collection
            </p>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#43111F] mt-1">
              New Arrivals
            </h2>

            <p className="text-xs sm:text-sm text-[#7C6E72] mt-2">
              {newProducts.length} current products
            </p>
          </div>

          <span className="text-xs sm:text-sm text-[#6E1F35] font-serif">
            {newProducts.length} Products
          </span>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {newProducts.map((product, index) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <article
                key={`${product.id}-${index}`}
                className="catalog-luxury-product group bg-gradient-to-b from-[#F7F1EC] to-[#FFFFFF] border border-[#43111F]/30 rounded-lg overflow-hidden hover:border-[#43111F] transition-all duration-300 shadow-xl flex flex-col justify-between"
              >

                {/* Image */}
                <div className="relative overflow-hidden aspect-square bg-[#FFFDF8]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />

                  <div className="absolute top-3 left-3 bg-[#FFFDF8]/85 border border-[#43111F]/40 px-2.5 py-1 rounded text-[10px] text-[#43111F] font-serif uppercase tracking-widest">
                    NEW
                  </div>

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

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#FFFDF8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate(`/Perfume/${product.id}`)}
                      className="w-full py-2 bg-[#6E1F35] text-white font-serif text-xs font-bold uppercase tracking-widest rounded shadow hover:bg-[#43111F] transition-colors"
                    >
                      Quick View & Notes
                    </button>
                  </div>

                </div>

                {/* Product Details */}
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

              </article>
            );
          })}

        </div>

      </main>

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

