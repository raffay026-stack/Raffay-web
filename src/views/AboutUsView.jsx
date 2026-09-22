import React from "react";
import { Link } from "react-router-dom";

export default function AboutUsView() {
  return (
    <main className="min-h-screen bg-[#F8F3ED] text-[#2F2427]">

      {/* Premium Intro */}
      <section className="relative overflow-hidden border-b border-[#6E1F35]/15">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#6E1F35]/10 blur-3xl" />
          <div className="absolute top-16 right-0 w-80 h-80 rounded-full bg-[#C7A36A]/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">

          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#6E1F35]/20 bg-white/70 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rotate-45 bg-[#C7A36A]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#6E1F35] font-semibold">
                ABOUT FK DECORE
              </span>
              <span className="w-2 h-2 rotate-45 bg-[#C7A36A]" />
            </div>

            <h1 className="mt-7 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-[#43111F]">
              Transforming Spaces.
              <span className="block text-[#6E1F35]">Inspiring Homes.</span>
            </h1>

            <div className="w-24 h-px bg-[#C7A36A] mx-auto mt-7 mb-7" />

            <p className="text-base sm:text-lg md:text-xl leading-8 text-[#6B5C60] max-w-3xl mx-auto">
              Welcome to <strong className="text-[#43111F]">FK Decore</strong>, where beautiful spaces
              begin with thoughtful details.
            </p>
          </div>

          {/* Brand Message Card */}
          <div className="mt-12 lg:mt-16 grid lg:grid-cols-[1.15fr_.85fr] gap-6 lg:gap-8 items-stretch">

            <div className="rounded-3xl bg-white/85 border border-[#6E1F35]/10 shadow-[0_20px_60px_rgba(67,17,31,0.08)] p-6 sm:p-9 lg:p-12">
              <p className="text-base sm:text-lg leading-8 text-[#5F5257]">
                At FK Decore, we believe that your home is more than just a place to live —
                it is a reflection of your personality, your taste, and the moments that matter
                to you. Our mission is to help you transform ordinary spaces into warm, elegant,
                and inspiring environments through carefully selected home décor pieces.
              </p>

              <p className="mt-6 text-base sm:text-lg leading-8 text-[#5F5257]">
                From statement <strong className="text-[#43111F]">planters and artificial plants</strong>
                {" "}to elegant <strong className="text-[#43111F]">decoration pieces, wall art, mirrors,
                console tables, table décor, table sets, stools, fountains</strong>, and much more,
                we bring together a diverse collection designed to add character and sophistication
                to every corner of your home.
              </p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-[#43111F] via-[#5A172B] to-[#6E1F35] text-white p-7 sm:p-9 lg:p-10 shadow-[0_20px_60px_rgba(67,17,31,0.2)] flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#E8D5B6]">
                  FK DECORE
                </p>

                <h2 className="mt-5 font-serif text-3xl sm:text-4xl leading-tight">
                  Thoughtful details.
                  <span className="block text-[#E5C994]">Beautiful spaces.</span>
                </h2>
              </div>

              <div className="mt-10 pt-6 border-t border-white/20">
                <p className="text-sm sm:text-base leading-7 text-white/80">
                  Décor that brings warmth, elegance, personality, and character to every space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6E1F35] font-semibold">
              OUR PHILOSOPHY
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-[#43111F]">
              Our Philosophy
            </h2>

            <div className="w-20 h-px bg-[#C7A36A] mt-5 mb-7" />

            <p className="text-base sm:text-lg leading-8 text-[#6B5C60]">
              We believe that great décor doesn't always require a complete makeover.
              Sometimes, a beautiful mirror, a striking wall piece, an elegant planter,
              or a carefully styled table is all it takes to completely transform a space.
            </p>

            <p className="mt-5 text-base sm:text-lg leading-8 text-[#6B5C60]">
              That's why we focus on bringing you décor that combines
              <strong className="text-[#43111F]">
                {" "}style, elegance, functionality, and visual appeal
              </strong>
              {" "}— making it easier for you to create a space that truly feels like yours.
            </p>
          </div>
        </div>
      </section>

      {/* Designed for Every Corner */}
      <section className="py-16 sm:py-20 bg-white/70 border-y border-[#6E1F35]/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6E1F35] font-semibold">
              DESIGNED FOR EVERY CORNER
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-[#43111F]">
              Designed for Every Corner
            </h2>

            <div className="w-20 h-px bg-[#C7A36A] mx-auto mt-5 mb-6" />

            <p className="text-base sm:text-lg leading-8 text-[#6B5C60]">
              Whether you're decorating your <strong className="text-[#43111F]">
              living room, bedroom, dining area, entrance, office, hallway, or outdoor space
              </strong>, FK Decore offers pieces to complement different interiors and styles.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              "✦ Elegant and modern décor",
              "✦ Statement pieces that stand out",
              "✦ Beautiful details and finishing",
              "✦ Stylish yet functional designs",
              "✦ Décor that adds personality to a space",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#6E1F35]/10 bg-[#FBF8F4] px-5 py-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <p className="text-sm sm:text-base leading-6 text-[#5F5257]">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* More Than Décor */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-14 items-center">

            <div className="rounded-3xl bg-[#43111F] text-white p-8 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(67,17,31,0.18)]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#E5C994]">
                MORE THAN DÉCOR
              </p>

              <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
                More Than Décor
              </h2>

              <div className="w-16 h-px bg-[#C7A36A] mt-5 mb-6" />

              <p className="text-lg sm:text-xl leading-8 text-white/85">
                We want to inspire you to
              </p>

              <p className="mt-2 font-serif text-2xl sm:text-3xl leading-tight text-[#E5C994]">
                create a space you love coming home to.
              </p>
            </div>

            <div>
              <p className="text-base sm:text-lg leading-8 text-[#6B5C60]">
                At FK Decore, we don't simply want to sell you a decoration piece.
              </p>

              <p className="mt-6 text-base sm:text-lg leading-8 text-[#6B5C60]">
                We want to inspire you to <strong className="text-[#43111F]">
                create a space you love coming home to.
                </strong>
              </p>

              <p className="mt-6 text-base sm:text-lg leading-8 text-[#6B5C60]">
                Every product you choose has the potential to change the feel of a room —
                adding warmth, personality, elegance, or a distinctive finishing touch.
              </p>

              <p className="mt-6 text-base sm:text-lg leading-8 text-[#6B5C60]">
                Our goal is to make discovering beautiful home décor simple, enjoyable, and inspiring.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F1E7DE] border-y border-[#6E1F35]/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#6E1F35] font-semibold">
              OUR VISION
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-[#43111F]">
              Our Vision
            </h2>

            <div className="w-20 h-px bg-[#C7A36A] mx-auto mt-5 mb-7" />

            <p className="text-base sm:text-lg leading-8 text-[#6B5C60]">
              Our vision is to become a trusted destination for home décor lovers who are
              looking for unique, stylish, and beautiful pieces to elevate their spaces.
            </p>

            <p className="mt-5 text-base sm:text-lg leading-8 text-[#6B5C60]">
              We continuously explore new styles, ideas, and décor trends so that our collection
              can keep evolving with the way people live and decorate their homes.
            </p>
          </div>

          {/* Closing Statement */}
          <div className="mt-12 sm:mt-16">
            <div className="rounded-[2rem] border border-[#6E1F35]/15 bg-white/75 backdrop-blur-sm px-6 sm:px-10 lg:px-16 py-10 sm:py-14 text-center shadow-[0_20px_60px_rgba(67,17,31,0.08)]">

              <div className="flex justify-center items-center gap-3 mb-5">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#C7A36A]" />
                <span className="w-2.5 h-2.5 rotate-45 bg-[#6E1F35]" />
                <span className="w-2.5 h-2.5 rotate-45 bg-[#C7A36A]" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43111F]">
                Your Space. Your Style. Your Story.
              </h3>

              <p className="mt-5 text-base sm:text-lg leading-8 text-[#6B5C60] max-w-3xl mx-auto">
                At <strong className="text-[#43111F]">FK Decore</strong>, we believe every home has a story.
              </p>

              <p className="mt-3 text-base sm:text-lg leading-8 text-[#6B5C60] max-w-3xl mx-auto">
                Let us help you make yours more beautiful.
              </p>

              <div className="mt-8">
                <p className="font-serif text-2xl sm:text-3xl text-[#6E1F35]">
                  <strong>FK Decore — Elevate Your Space.</strong>
                </p>
              </div>

              <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/catalog"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#43111F] text-white text-sm font-semibold tracking-wide hover:bg-[#6E1F35] transition-all duration-300 shadow-md"
                >
                  Explore Décor Collection
                </Link>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-[#43111F]/20 bg-white text-[#43111F] text-sm font-semibold tracking-wide hover:bg-[#F8F3ED] transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
