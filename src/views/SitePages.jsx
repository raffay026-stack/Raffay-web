import React from "react";

const pageData = {
  sale: {
    title: "Sale Products",
    subtitle: "Exclusive offers and special prices",
    text: "Discover selected perfumes available at special prices for a limited time."
  },
  categories: {
    title: "Categories",
    subtitle: "Explore our collections",
    text: "Browse perfumes by category, style, fragrance family and occasion."
  },
  arrivals: {
    title: "New Arrivals",
    subtitle: "Fresh from FK Decore",
    text: "Discover our latest perfume arrivals and newest additions to the collection."
  },
  about: {
    title: "About Us",
    subtitle: "The FK Decore story",
    text: "FK Decore brings together refined fragrances, elegant presentation and a premium shopping experience."
  },
  articles: {
    title: "Hot Articles",
    subtitle: "Stories, guides and fragrance inspiration",
    text: "Explore fragrance guides, perfume tips, styling ideas and the latest stories from FK Decore."
  }
};

export default function SitePage({ type }) {
  const data = pageData[type] || pageData.categories;

  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#43111F]">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6E1F35] font-serif mb-4">
            FK Decore
          </p>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-5">
            {data.title}
          </h1>

          <p className="text-sm uppercase tracking-[0.18em] text-[#8A7078] font-serif mb-8">
            {data.subtitle}
          </p>

          <div className="w-20 h-px bg-[#6E1F35] mx-auto mb-8" />

          <p className="text-lg leading-8 text-[#6B5A60] font-serif">
            {data.text}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white border border-[#E5D8D0]">
            <h2 className="font-serif text-xl font-bold mb-3">
              Premium Selection
            </h2>
            <p className="text-sm text-[#7C6E72] leading-6">
              Carefully selected fragrances for a refined experience.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E5D8D0]">
            <h2 className="font-serif text-xl font-bold mb-3">
              Elegant Experience
            </h2>
            <p className="text-sm text-[#7C6E72] leading-6">
              Discover products presented with the FK Decore aesthetic.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#E5D8D0]">
            <h2 className="font-serif text-xl font-bold mb-3">
              Discover More
            </h2>
            <p className="text-sm text-[#7C6E72] leading-6">
              Explore our collection and find your signature fragrance.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
