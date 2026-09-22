import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const categories = {
  "oud-woody": {
    name: "Oud & Woody",
    image: "/hero-desktop1.jpg",
    description: "Rich oud, deep woods and sophisticated oriental fragrances."
  },
  "oriental-spice": {
    name: "Oriental Spice",
    image: "/hero-desktop2.jpg",
    description: "Warm spices, exotic notes and luxurious oriental aromas."
  },
  "floral": {
    name: "Floral",
    image: "/hero-desktop3.jpg",
    description: "Elegant floral fragrances inspired by beautiful blossoms."
  },
  "citrus-fresh": {
    name: "Citrus Fresh",
    image: "/hero-desktop4.jpg",
    description: "Bright, refreshing citrus fragrances for a clean fresh feel."
  },
  "fresh-spicy": {
    name: "Fresh Spicy",
    image: "/hero-desktop1.jpg",
    description: "Fresh aromatic notes combined with modern spicy accords."
  },
  "sensual-floral": {
    name: "Sensual Floral",
    image: "/hero-desktop2.jpg",
    description: "Romantic floral fragrances with a smooth sensual character."
  },
  "gourmand-amber": {
    name: "Gourmand Amber",
    image: "/hero-desktop3.jpg",
    description: "Warm amber, sweet gourmand notes and luxurious depth."
  },
  "aquatic-fresh": {
    name: "Aquatic & Fresh",
    image: "/hero-desktop4.jpg",
    description: "Cool aquatic and refreshing fragrances inspired by clean water."
  }
};

export default function CategoryView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = categories[slug];

  if (!category) {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#43111F] mb-4">
            Category Not Found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#43111F] text-white rounded-lg"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326]">

      <section className="relative w-full">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-[280px] sm:h-[380px] md:h-[500px] object-cover"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-5">
            <p className="uppercase tracking-[0.3em] text-sm mb-4">
              FK Decore Collection
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl">
              {category.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20 text-center">

        <p className="uppercase tracking-[0.25em] text-sm text-[#6E1F35] mb-3">
          Explore Collection
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#43111F] mb-5">
          {category.name}
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 leading-7 mb-10">
          {category.description}
        </p>

        <div className="border border-[#6E1F35]/15 bg-[#F7F1EC] rounded-2xl p-8 sm:p-12">
          <h3 className="font-serif text-2xl text-[#43111F] mb-3">
            Discover {category.name}
          </h3>

          <p className="text-gray-600 max-w-xl mx-auto mb-7">
            Explore our carefully selected collection.
          </p>

          <button
            onClick={() => navigate("/catalog")}
            className="px-7 py-3.5 bg-[#43111F] text-white rounded-lg hover:bg-[#6E1F35] transition"
          >
            View All Perfumes
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 text-[#6E1F35] underline underline-offset-4"
        >
          ← Back to Home
        </button>

      </section>
    </div>
  );
}
