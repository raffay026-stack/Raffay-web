import { Crown } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";
import Logo from "../assets/fk-logo.jpeg";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0A0506] via-[#050505] to-[#0A0506] border-t border-[#43111F]/40 text-[#7C6E72] pt-16 pb-12 overflow-hidden">
      {/* Premium ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6E1F35]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#87344D]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Premium Decor Benefits with 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-[#E5D8D0]/20 text-center md:text-left">

          <div className="flex flex-col items-center md:items-start space-y-3 group">
            <div className="relative p-4 bg-gradient-to-br from-[#F7F1EC] to-[#EFE5D8] border border-[#43111F]/30 rounded-2xl text-[#43111F] shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6E1F35]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Truck className="relative w-6 h-6 text-[#43111F]" style={{ color: "#43111F", stroke: "#43111F" }} />
            </div>
            <h4 className="font-serif text-[#F3EFE6] font-semibold group-hover:text-[#D8C3A5] transition-colors">Fast Delivery</h4>
            <p className="text-xs text-[#8A7A80]">
              Safe and reliable delivery for your selected decor pieces.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#F7F1EC] border border-[#43111F]/30 rounded-full text-[#43111F]">
              <Sparkles className="w-6 h-6 text-[#43111F]" style={{ color: "#43111F", stroke: "#43111F" }} />
            </div>
            <h4 className="font-serif text-[#2D2326] font-medium">Curated Decor Selection</h4>
            <p className="text-xs text-[#8A7A80]">
              Beautiful decorative pieces selected to elevate every space.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#F7F1EC] border border-[#43111F]/30 rounded-full text-[#43111F]">
              <ShieldCheck className="w-6 h-6 text-[#43111F]" style={{ color: "#43111F", stroke: "#43111F" }} />
            </div>
            <h4 className="font-serif text-[#2D2326] font-medium">Premium Quality</h4>
            <p className="text-xs text-[#8A7A80]">
              Quality materials with refined finishing, detail, and lasting beauty.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#F7F1EC] border border-[#43111F]/30 rounded-full text-[#43111F]">
              <Crown className="w-6 h-6 text-[#43111F]" style={{ color: "#43111F", stroke: "#43111F" }} />
            </div>
            <h4 className="font-serif text-[#2D2326] font-medium">Perfect For Every Space</h4>
            <p className="text-xs text-[#8A7A80]">
              Ideal decor pieces for homes, offices, lobbies, and outdoor spaces.
            </p>
          </div>

        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-16 border-b border-[#E5D8D0]">

          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="FK Decore"
                className="w-8 h-8 rounded-full object-cover FK Decore-logo-badge"
              />
              <span className="font-serif text-lg font-bold tracking-widest text-[#F3EFE6]">
                FK Decore
              </span>
            </div>

            <p className="text-xs text-[#7C6E72] max-w-sm leading-relaxed font-serif">
              An elegant destination for beautiful decoration pieces. We curate
              artificial plants, statement decor, and refined accents designed
              to bring beauty, warmth, and character to every space.
            </p>

            <div className="pt-2 text-xs text-[#43111F] font-serif tracking-widest">
              HOME • OFFICE • LOBBY • OUTDOOR
            </div>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#43111F] tracking-wider uppercase mb-4">
              Decor Collections
            </h5>

            <ul className="space-y-2 text-xs font-serif">
              <li>
                <Link to="/catalog" className="hover:text-[#43111F] transition-colors">
                  Artificial Plants
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-[#43111F] transition-colors">
                  Statement Decor
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-[#43111F] transition-colors">
                  Table & Floor Decor
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-[#43111F] transition-colors">
                  Home Accents
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-[#43111F] transition-colors">
                  Outdoor Decor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#43111F] tracking-wider uppercase mb-4">
              Customer Care
            </h5>

            <ul className="space-y-2 text-xs font-serif">
              <li>
                <Link to="/orders" className="hover:text-[#43111F] transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-[#43111F] transition-colors">
                  Decor Collection
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/923356066069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#43111F] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#returns"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please contact FK Decore for returns and exchanges.");
                  }}
                  className="hover:text-[#43111F] transition-colors"
                >
                  Returns & Exchanges
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#43111F] tracking-wider uppercase mb-4">
              Stay Inspired
            </h5>

            <p className="text-xs text-[#7C6E72] mb-3 font-serif">
              Receive updates on new decor pieces, latest arrivals, and special offers.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed successfully to FK Decore updates.");
                e.target.reset();
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="bg-[#F7F1EC] border border-[#43111F]/40 px-3 py-2 text-xs text-[#2D2326] focus:outline-none focus:border-[#43111F] rounded-sm font-serif"
                data-testid="footer-newsletter-input"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-[#43111F] to-[#87344D] text-[#F3E8E1] font-serif text-xs font-bold uppercase tracking-widest py-2 rounded-sm hover:opacity-95 transition-opacity"
                data-testid="footer-newsletter-submit"
              >
                Join Decor Circle
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#8A7A80] font-serif">
          <p>© 2026 FK Decore. All Rights Reserved.</p>

          <div className="mt-4 md:mt-0 text-center md:text-right">
            <a
              href="/terms-and-condition.html"
              className="hover:text-[#43111F] transition-colors"
            >
              Terms and condition / Privacy policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}




