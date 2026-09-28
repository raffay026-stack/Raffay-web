import React from "react";

const saleProducts = [
  { name: "Elegant Artificial Plant", image: "/hero-desktop1.jpg", oldPrice: "Rs. 12,500", price: "Rs. 10,500" },
  { name: "Luxury Statement Decor", image: "/hero-desktop2.jpg", oldPrice: "Rs. 9,500", price: "Rs. 7,500" },
  { name: "Premium Decorative Accent", image: "/hero-desktop3.jpg", oldPrice: "Rs. 8,500", price: "Rs. 6,500" },
  { name: "Modern Home Decor", image: "/hero-desktop4.jpg", oldPrice: "Rs. 16,500", price: "Rs. 13,500" },

  { name: "Artificial Greenery Collection", image: "/hero-desktop1.jpg", oldPrice: "Rs. 13,500", price: "Rs. 10,500" },
  { name: "Luxury Table Decor", image: "/hero-desktop2.jpg", oldPrice: "Rs. 7,500", price: "Rs. 5,500" },
  { name: "Elegant Floor Decor", image: "/hero-desktop3.jpg", oldPrice: "Rs. 11,500", price: "Rs. 8,500" },
  { name: "Premium Outdoor Decor", image: "/hero-desktop4.jpg", oldPrice: "Rs. 15,500", price: "Rs. 12,500" },

  { name: "Decorative Plant Collection", image: "/hero-desktop1.jpg", oldPrice: "Rs. 10,500", price: "Rs. 8,500" },
  { name: "Modern Statement Piece", image: "/hero-desktop2.jpg", oldPrice: "Rs. 9,500", price: "Rs. 7,000" },
  { name: "Classic Home Accent", image: "/hero-desktop3.jpg", oldPrice: "Rs. 8,500", price: "Rs. 6,500" },
  { name: "Elegant Lobby Decor", image: "/hero-desktop4.jpg", oldPrice: "Rs. 14,500", price: "Rs. 11,500" },

  { name: "Premium Artificial Plant", image: "/hero-desktop1.jpg", oldPrice: "Rs. 12,000", price: "Rs. 9,500" },
  { name: "Luxury Interior Accent", image: "/hero-desktop2.jpg", oldPrice: "Rs. 10,500", price: "Rs. 8,500" },
  { name: "Stylish Decorative Piece", image: "/hero-desktop3.jpg", oldPrice: "Rs. 13,500", price: "Rs. 10,500" },
  { name: "Modern Outdoor Accent", image: "/hero-desktop4.jpg", oldPrice: "Rs. 16,000", price: "Rs. 13,500" },

  { name: "Elegant Office Decor", image: "/hero-desktop1.jpg", oldPrice: "Rs. 9,500", price: "Rs. 7,500" },
  { name: "Premium Statement Decor", image: "/hero-desktop2.jpg", oldPrice: "Rs. 12,500", price: "Rs. 9,500" },
  { name: "Luxury Greenery Accent", image: "/hero-desktop3.jpg", oldPrice: "Rs. 11,500", price: "Rs. 8,500" },
  { name: "FK Decore Signature Piece", image: "/hero-desktop4.jpg", oldPrice: "Rs. 15,500", price: "Rs. 12,500" }
];

const pageData = {
  sale: {
    title: "Sale Products",
    subtitle: "Exclusive offers and special prices",
    text: "Discover our selected decoration pieces available at special prices for a limited time."
  },
  categories: {
    title: "Categories",
    subtitle: "Explore our collections",
    text: "Browse our beautiful decoration pieces by category and style."
  },
  arrivals: {
    title: "New Arrivals",
    subtitle: "Fresh from FK Decore",
    text: "Discover our latest decoration pieces and newest additions."
  },
  about: {
    title: "About Us",
    subtitle: "The FK Decore story",
    text: "Elegant decoration pieces curated to bring beauty, warmth and character to every space."
  },
  articles: {
    title: "Hot Articles",
    subtitle: "Decor inspiration",
    text: "Explore decoration ideas, styling tips and inspiration from FK Decore."
  },
  terms: {
    title: "Terms & Condition",
    subtitle: "Terms and condition / Privacy policy",
    text: ""
  }
};

export default function SitePage({ type }) {
  const data = pageData[type] || pageData.sale;

  if (type === "terms") {
    return (
      <main className="min-h-screen bg-[#FFFDF8] text-[#43111F]">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="bg-white border border-[#E5D8D0] rounded-2xl shadow-sm p-6 sm:p-10 md:p-12">

            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#6E1F35] font-serif mb-4">
                FK DECORE
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
                Terms & Condition
              </h1>

              <div className="w-20 h-px bg-[#6E1F35] mx-auto mt-7" />
            </div>

            <div className="font-serif text-[#4B3A40] text-sm sm:text-base md:text-lg leading-8 space-y-7">

              <p>
                Customers are advised to make video while unwrapping or unboxing of parcel from the first tape till the last piece got opened. This video will be used as a proof that customer received damaged products. If video proof is not provided or video is made after the product has been unboxed or even the box is opened before the starting of the video then customer will not be entitled for the refund / replacement.
              </p>

              <p className="font-bold text-[#43111F]">
                No Claim Will Be Accepted After 24 Hours of Dilvery
              </p>

            </div>

          </div>
        </section>
      </main>
    );
  }

  if (type !== "sale") {
    return (
      <main className="min-h-screen bg-[#FFFDF8] text-[#43111F]">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6E1F35] font-serif mb-4">
              FK DECORE
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-5">
              {data.title}
            </h1>

            <p className="text-sm uppercase tracking-[0.18em] text-[#8A7078] font-serif">
              {data.subtitle}
            </p>

            <div className="w-20 h-px bg-[#6E1F35] mx-auto my-8" />

            <p className="text-base sm:text-lg leading-8 text-[#6B5A60] font-serif">
              {data.text}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#43111F]">

      {/* Sale Page Header */}
      <section className="relative overflow-hidden bg-[#43111F] text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/hero-desktop1.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl mx-auto text-center">

            <p className="text-xs uppercase tracking-[0.35em] text-[#E8D2A8] font-serif mb-5">
              FK DECORE
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold">
              Sale Products
            </h1>

            <div className="w-24 h-px bg-[#E8D2A8] mx-auto my-7" />

            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-7 font-serif">
              Exclusive decoration pieces at special prices
            </p>

            <div className="mt-8 inline-flex items-center border border-[#E8D2A8]/60 px-5 py-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#E8D2A8]">
                Limited Time Offers
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 border-b border-[#E5D8D0] pb-6">

          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#6E1F35] font-serif mb-2">
              Special Collection
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#43111F]">
              Sale's Products
            </h2>

            <p className="text-sm text-[#7C6E72] mt-2">
              Premium decor at special prices
            </p>
          </div>

          <div className="text-sm font-serif text-[#6E1F35]">
            20 Products
          </div>

        </div>

        {/* 20 Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {saleProducts.map((product, index) => (
            <article
              key={index}
              className="group bg-white border border-[#E5D8D0] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Product Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F1EC]">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Sale Badge */}
                <span className="absolute top-3 left-3 bg-[#6E1F35] text-white text-[9px] sm:text-[10px] uppercase tracking-widest px-3 py-1.5">
                  Sale
                </span>

              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-5">

                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8A7078] font-serif mb-2">
                  FK Decore
                </p>

                <h3 className="font-serif font-bold text-sm sm:text-base text-[#6E1F35] leading-5 sm:leading-6 min-h-[40px]">
                  {product.name}
                </h3>

                <div className="mt-3 sm:mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-[#9A8A8F] line-through">
                    {product.oldPrice}
                  </span>

                  <span className="text-sm sm:text-base font-bold text-[#6E1F35]">
                    {product.price}
                  </span>
                </div>

                <button
                  type="button"
                  className="w-full mt-4 border border-[#6E1F35] text-[#6E1F35] py-2 text-[10px] sm:text-xs uppercase tracking-widest font-serif hover:bg-[#6E1F35] hover:text-white transition-colors duration-300"
                >
                  View Product
                </button>

              </div>
            </article>
          ))}

        </div>

      </section>

      {/* Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">

        <div className="bg-[#43111F] text-white text-center px-6 py-10 sm:py-14">

          <p className="text-xs uppercase tracking-[0.3em] text-[#E8D2A8] mb-3">
            FK DECORE
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Bring Beauty Into Every Space
          </h2>

          <p className="text-sm text-white/70 mt-3">
            Home • Office • Lobby • Outdoor
          </p>

        </div>

      </section>

    </main>
  );
}


