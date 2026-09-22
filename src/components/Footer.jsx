import { Crown } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Truck, RefreshCw, Heart } from "lucide-react";
import Logo from "../assets/fk-logo.jpeg";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#43111F]/30 text-[#7C6E72] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury perks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-[#E5D8D0] text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#F7F1EC] border border-[#43111F]/30 rounded-full text-[#43111F]">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-[#2D2326] font-medium">Complimentary Courier</h4>
            <p className="text-xs text-[#8A7A80]">Insured express delivery worldwide in signature velvet-lined presentation boxes.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#F7F1EC] border border-[#43111F]/30 rounded-full text-[#43111F]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-[#2D2326] font-medium">Complimentary Samples</h4>
            <p className="text-xs text-[#8A7A80]">Two bespoke 2ml discovery vials included with every L flacon order.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#F7F1EC] border border-[#43111F]/30 rounded-full text-[#43111F]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-[#2D2326] font-medium">Guaranteed Authenticity</h4>
            <p className="text-xs text-[#8A7A80]">Sourced directly from master noses in Grasse, Milan, and London with serial-numbered seals.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="p-3 bg-[#F7F1EC] border border-[#43111F]/30 rounded-full text-[#43111F]">
              <Crown className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-[#2D2326] font-medium">Private Concierge</h4>
            <p className="text-xs text-[#8A7A80]">Dedicated olfactive experts available 24/7 for bespoke fragrance curation.</p>
          </div>
        </div>

        {/* Main Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-16 border-b border-[#E5D8D0]">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="FK Decore" className="w-8 h-8 rounded-full object-cover FK Decore-logo-badge" />
              <span className="font-serif text-lg font-bold tracking-widest text-[#F3EFE6]">FK Decore</span>
            </div>
            <p className="text-xs text-[#7C6E72] max-w-sm leading-relaxed font-serif">
              An uncompromising sanctuary for high-end Perfumery connoisseurs. We curate rare elixirs, legendary vintage formulas, and contemporary avant-garde masterpieces.
            </p>
            <div className="pt-2 text-xs text-[#43111F] font-serif tracking-widest">
              PARIS â€¢ LONDON â€¢ MILAN â€¢ NEW YORK â€¢ TOKYO
            </div>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#43111F] tracking-wider uppercase mb-4">Haute Collections</h5>
            <ul className="space-y-2 text-xs font-serif">
              <li><Link to="/catalog?category=Oud+%26+Woody" className="hover:text-[#43111F] transition-colors">Summer Collection Series</Link></li>
              <li><Link to="/catalog?category=Extrait+de+Perfume" className="hover:text-[#43111F] transition-colors">Extrait de Perfume</Link></li>
              <li><Link to="/catalog?category=Oriental+Spice" className="hover:text-[#43111F] transition-colors">Summer Printeds</Link></li>
              <li><Link to="/catalog?category=Sensual+Floral" className="hover:text-[#43111F] transition-colors">Plain Essentialss</Link></li>
              <li><Link to="/catalog?category=Fresh+Citrus" className="hover:text-[#43111F] transition-colors">Fresh Mediterranean</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#43111F] tracking-wider uppercase mb-4">Client Concierge</h5>
            <ul className="space-y-2 text-xs font-serif">
              <li><Link to="/orders" className="hover:text-[#43111F] transition-colors">Track Orders</Link></li>
              <li><Link to="/catalog" className="hover:text-[#43111F] transition-colors">Bespoke Curation</Link></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); alert("Concierge Hotline: +1 (800) 555-ELIXIR"); }} className="hover:text-[#43111F] transition-colors">Private Hotline</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); alert("Complimentary returns within 30 days in unopened crystal presentation boxes."); }} className="hover:text-[#43111F] transition-colors">Returns & Exchanges</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-semibold text-[#43111F] tracking-wider uppercase mb-4">Newsletter</h5>
            <p className="text-xs text-[#7C6E72] mb-3 font-serif">Receive private invitations to limited flacon releases.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully to private salon notices."); e.target.reset(); }} className="flex flex-col gap-2">
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
                Join Inner Circle
              </button>
            </form>
          </div>
        </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#8A7A80] font-serif">
          <p>© 2026 FK Decore. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-[#43111F] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#43111F] cursor-pointer">Terms of Salon</span>
            <span className="hover:text-[#43111F] cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}





























