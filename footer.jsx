import React from "react";
import { Link } from "react-router-dom";
import { Crown, Sparkles, ShieldCheck, Truck, RefreshCw, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#D4AF37]/30 text-neutral-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury perks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-neutral-800 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#12100C] border border-[#D4AF37]/30 rounded-full text-[#D4AF37]">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-neutral-200 font-medium">Complimentary Courier</h4>
            <p className="text-xs text-neutral-500">Insured express delivery worldwide in signature velvet-lined presentation boxes.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#12100C] border border-[#D4AF37]/30 rounded-full text-[#D4AF37]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-neutral-200 font-medium">Complimentary Samples</h4>
            <p className="text-xs text-neutral-500">Two bespoke 2ml discovery vials included with every 100ml flacon order.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#12100C] border border-[#D4AF37]/30 rounded-full text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-neutral-200 font-medium">Guaranteed Authenticity</h4>
            <p className="text-xs text-neutral-500">Sourced directly from master noses in Grasse, Milan, and London with serial-numbered seals.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#12100C] border border-[#D4AF37]/30 rounded-full text-[#D4AF37]">
              <Crown className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-neutral-200 font-medium">Private Concierge</h4>
            <p className="text-xs text-neutral-500">Dedicated olfactive experts available 24/7 for bespoke fragrance curation.</p>
          </div>
        </div>

        {/* Main Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-16 border-b border-neutral-800">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] flex items-center justify-center text-[#0A0A0A]">
                <Crown className="w-5 h-5 fill-current" />
              </div>
              <span className="font-serif text-lg font-bold tracking-widest text-[#F3E5AB]">
                L'ÉLIXIR NOIR
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-serif">
              An uncompromising sanctuary for high-end perfumery connoisseurs. We curate rare elixirs, legendary vintage formulas, and contemporary avant-garde masterpieces.
            </p>
            <div className="pt-2 text-xs text-[#D4AF37] font-serif tracking-widest">
              PARIS • LONDON • MILAN • NEW YORK • TOKYO
            </div>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase mb-4">Haute Collections</h5>
            <ul className="space-y-2 text-xs font-serif">
              <li><Link to="/catalog?category=Oud+%26+Woody" className="hover:text-[#D4AF37] transition-colors">Royal Oud Series</Link></li>
              <li><Link to="/catalog?category=Extrait+de+Parfum" className="hover:text-[#D4AF37] transition-colors">Extrait de Parfum</Link></li>
              <li><Link to="/catalog?category=Oriental+Spice" className="hover:text-[#D4AF37] transition-colors">Oriental Spices</Link></li>
              <li><Link to="/catalog?category=Sensual+Floral" className="hover:text-[#D4AF37] transition-colors">Sensual Florals</Link></li>
              <li><Link to="/catalog?category=Fresh+Citrus" className="hover:text-[#D4AF37] transition-colors">Fresh Mediterranean</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase mb-4">Client Concierge</h5>
            <ul className="space-y-2 text-xs font-serif">
              <li><Link to="/orders" className="hover:text-[#D4AF37] transition-colors">Track Orders</Link></li>
              <li><Link to="/catalog" className="hover:text-[#D4AF37] transition-colors">Bespoke Curation</Link></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); alert("Concierge Hotline: +1 (800) 555-ELIXIR"); }} className="hover:text-[#D4AF37] transition-colors">Private Hotline</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); alert("Complimentary returns within 30 days in unopened crystal presentation boxes."); }} className="hover:text-[#D4AF37] transition-colors">Returns & Exchanges</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#D4AF37] tracking-wider uppercase mb-4">Newsletter</h5>
            <p className="text-xs text-neutral-400 mb-3 font-serif">Receive private invitations to limited flacon releases.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully to private salon notices."); e.target.reset(); }} className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="bg-[#12100C] border border-[#D4AF37]/40 px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#D4AF37] rounded-sm font-serif"
                data-testid="footer-newsletter-input"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0A0A0A] font-serif text-xs font-bold uppercase tracking-widest py-2 rounded-sm hover:opacity-95 transition-opacity"
                data-testid="footer-newsletter-submit"
              >
                Join Inner Circle
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-serif">
          <p>© 2026 L'ÉLIXIR NOIR Haute Parfumerie. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-[#D4AF37] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#D4AF37] cursor-pointer">Terms of Salon</span>
            <span className="hover:text-[#D4AF37] cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

