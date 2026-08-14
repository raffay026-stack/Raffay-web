import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './AppContext';

const HomeView = () => {
  const [mounted, setMounted] = useState(false);
  const { featuredProducts = [], categories = [] } = useAppContext() || {};

  const heroProducts = Array.isArray(featuredProducts) ? featuredProducts.slice(0, 3) : [];
  const curatedProducts = Array.isArray(featuredProducts) ? featuredProducts.slice(0, 4) : [];
  const categoryCards = Array.isArray(categories) ? categories.slice(0, 3) : [];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#0f0b12] text-slate-100">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at top left, rgba(255,236,176,0.16), transparent 24%), radial-gradient(circle at bottom right, rgba(212,175,143,0.08), transparent 22%)',
        }}
      />

      <section className="relative px-6 pt-20 pb-12 sm:px-8 lg:px-16 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div
              className={`mx-auto max-w-2xl space-y-8 transition-all duration-800 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="inline-flex text-sm uppercase tracking-[0.35em] text-[#D8FFF5]/80">
                ð“¢ð“¬ð“®ð“·ð“½ð“¸ð“»ð“ª Perfumes
              </span>
              <h1 className="font-serif text-5xl tracking-tight leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                A modern heirloom, captured in every bottle.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-200/85 sm:text-xl">
                Crafted for those who seek refined presence and subtle luxury. Explore a curated Perfume
                collection designed to inspire, enchant, and linger.
              </p>

              <div className="space-y-5">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-sm">
                  <label htmlFor="hero-search" className="sr-only">
                    Search Perfumes
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      id="hero-search"
                      type="search"
                      placeholder="Search styles, notes, or brands"
                      className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950/75 px-5 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2FB59A]/70 focus:outline-none focus:ring-2 focus:ring-[#2FB59A]/20"
                    />
                    <button
                      type="button"
                      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#151116] border border-[#2FB59A] px-5 py-3 text-sm font-semibold text-[#9AE9D8] transition duration-300 hover:bg-[#2FB59A] hover:border-[#2FB59A]"
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    to="/catalog"
                    className="inline-flex items-center justify-center rounded-full bg-[#2FB59A] px-6 py-3 text-sm font-semibold tracking-wide text-[#9AE9D8] shadow-lg transition duration-300 hover:bg-[#2FB59A]"
                  >
                    Shop the Collection
                  </Link>
                  <Link
                    to="/catalog"
                    className="inline-flex items-center justify-center rounded-full bg-[#151116] border border-[#2FB59A] px-6 py-3 text-sm font-semibold text-[#9AE9D8] transition duration-300 hover:bg-[#2FB59A] hover:border-[#2FB59A]"
                  >
                    Discover Bestsellers
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-[#D8FFF5]/75">Fine fragrance notes</p>
                  <p className="mt-3 text-base leading-7 text-slate-200/80">
                    Oud, jasmine and amber warmed by soft musk.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-[#D8FFF5]/75">Premium artistry</p>
                  <p className="mt-3 text-base leading-7 text-slate-200/80">
                    Thoughtfully composed styles with elegant balance.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-800`}
            >
              {heroProducts.length ? (
                heroProducts.map((product, index) => (
                  <div
                    key={product.id ?? index}
                    className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/90" />
                    <img
                      src={product.image}
                      alt={product.name || 'Featured Perfume'}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-[#D8FFF5]/80">
                          {product.category || 'Fragrance'}
                        </p>
                        <h2 className="mt-2 text-lg font-semibold text-white">{product.name}</h2>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 rounded-[2rem] border border-white/10 bg-slate-950/70 p-10 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#D8FFF5]/80">Featured fragrance stories</p>
                  <p className="mt-4 text-lg text-slate-200">
                    Discover our bestselling signatures and become part of the ritual.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 px-6 pb-16 pt-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-[#D8FFF5]/80">crafted collections</p>
              <h2 className="mt-3 text-4xl font-serif tracking-tight text-white sm:text-5xl">
                Signature styles and curated rituals
              </h2>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center rounded-full border border-[#2FB59A]/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-[#2FB59A]/60 hover:bg-white/10"
            >
              View entire range
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {curatedProducts.length ? (
              curatedProducts.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-[#2FB59A]/20"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name || 'Perfume'}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/95 to-transparent" />
                  </div>
                  <div className="space-y-3 p-6">
                    <div className="flex items-center justify-between text-sm text-[#D8FFF5]/80">
                      <span>{product.category || 'Fragrance'}</span>
                      <span className="font-semibold">
                        {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">{product.name}</h3>
                    <p className="text-sm leading-6 text-slate-300/85">
                      {product.description ?? 'A luminous blend of warm amber, elegant florals, and polished woods.'}
                    </p>
                    <div className="mt-4">
                      <Link
                        to="/catalog"
                        className="inline-flex rounded-full bg-[#151116] border border-[#2FB59A] px-4 py-2 text-sm font-semibold text-[#9AE9D8] transition duration-300 hover:bg-[#2FB59A] hover:border-[#2FB59A]"
                      >
                        Explore fragrance
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded-[2rem] border border-white/10 bg-slate-950/70 p-12 text-center">
                <p className="text-lg font-semibold text-white">Premium products ready for your ritual.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {categoryCards.length > 0 && (
        <section className="px-6 pb-20 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.35em] text-[#D8FFF5]/80">Collections</p>
              <h2 className="mt-3 text-4xl font-serif tracking-tight text-white sm:text-5xl">
                Elevated categories, sculpted for the senses
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {categoryCards.map((category) => (
                <Link
                  key={category.id ?? category.name}
                  to="/catalog"
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-1 hover:border-[#2FB59A]/20"
                >
                  <div className="mb-6 h-56 overflow-hidden rounded-[1.75rem] bg-slate-950/80">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name || 'Category'}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm uppercase text-slate-500">
                        Collection
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.35em] text-[#D8FFF5]/80">{category.name}</p>
                    <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                    <p className="text-sm leading-6 text-slate-300/85">
                      {category.description ?? 'A refined selection of signature styles for every mood.'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-white/10 px-6 pb-24 pt-16 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.6fr_0.4fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D8FFF5]/80">Our ethos</p>
            <h2 className="text-4xl font-serif tracking-tight text-white sm:text-5xl">
              A quiet luxury experience built around style.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-300/85">
              Each fragrance is curated with premium ingredients and thoughtful design. The artistry behind
              every bottle creates a memorable impression that feels as personal as it is timeless.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">Refined ingredients</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300/85">
                Rare essences blended with modern precision for a luminous trail.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">Timeless design</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300/85">
                Elegant bottle silhouettes and sophisticated packaging, designed to delight.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeView;















