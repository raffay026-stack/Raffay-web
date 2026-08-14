import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './assets/logo.svg'

export default function Footer() {
  return (
    <footer className="w-full text-gray-200" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[rgba(10,10,12,0.7)] backdrop-blur-sm rounded-2xl border border-[rgba(255,215,170,0.06)] shadow-[0_8px_30px_rgba(2,6,23,0.6)] p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-[#9AE9D8]">ð“¢ð“¬ð“®ð“·ð“½ð“¸ð“»ð“ª</h2>
              <p className="text-sm text-[#D8FFF5]/70 max-w-xs">A curated house of fine Perfumes crafting timeless styles for the discerning. Discover compositions that linger like a memory.</p>
                <div className="flex items-center space-x-3 mt-2">
                  <img src={Logo} alt="Styleora" className="w-12 h-12 rounded-full object-cover shadow-sm scentora-logo-badge" />
                  <div className="text-xs text-[#9AE9D8]/60">Â© {new Date().getFullYear()} Styleora</div>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-[#D8FFF5] mb-3">Shop</h3>
                <ul className="space-y-2 text-sm text-[#D8FFF5]/75">
                  <li><Link to="/" className="hover:text-[#9AE9D8] transition-colors">Home</Link></li>
                  <li><Link to="/catalog" className="hover:text-[#9AE9D8] transition-colors">Catalog</Link></li>
                  <li><Link to="/collections" className="hover:text-[#9AE9D8] transition-colors">Collections</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#D8FFF5] mb-3">Support</h3>
                <ul className="space-y-2 text-sm text-[#D8FFF5]/75">
                  <li><Link to="/about" className="hover:text-[#9AE9D8] transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-[#9AE9D8] transition-colors">Contact</Link></li>
                  <li><Link to="/terms" className="hover:text-[#9AE9D8] transition-colors">Terms &amp; Conditions</Link></li>
                </ul>
              </div>
            </div>

            {/* Newsletter & Social */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#D8FFF5] mb-3">Join the List</h3>
                <p className="text-sm text-[#D8FFF5]/70 mb-4">Receive exclusive invites and early access to new products.</p>
                <form className="flex flex-col sm:flex-row sm:items-center gap-3" onSubmit={(e)=>e.preventDefault()} aria-label="newsletter-form">
                  <input name="email" type="email" required placeholder="Email address" className="w-full sm:flex-1 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[#2FB59A]/10 px-4 py-3 text-sm placeholder-[#2FB59A]/50 focus:outline-none focus:ring-2 focus:ring-[#2FB59A]/20" />
                  <button type="submit" className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-b from-[#2FB59A] to-[#2FB59A] text-[#9AE9D8] rounded-lg text-sm font-medium shadow-[inset_0_-2px_8px_rgba(0,0,0,0.25)] hover:brightness-95 transition">Subscribe</button>
                </form>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-[#D8FFF5] mb-3">Follow</h4>
                <div className="flex items-center space-x-3">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2FB59A]/10 bg-[rgba(255,255,255,0.02)] hover:scale-105 transition-shadow shadow-sm hover:shadow-[0_6px_20px_rgba(140,95,109,0.08)]">
                    <svg className="w-4 h-4 text-[#9AE9D8]" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.4v-2.9h2.4V9.3c0-2.4 1.4-3.7 3.5-3.7 1 0 2 .07 2 .07v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" /></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2FB59A]/10 bg-[rgba(255,255,255,0.02)] hover:scale-105 transition-shadow shadow-sm hover:shadow-[0_6px_20px_rgba(140,95,109,0.08)]">
                    <svg className="w-4 h-4 text-[#9AE9D8]" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.3-.9a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1zM12 9.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5z" /></svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2FB59A]/10 bg-[rgba(255,255,255,0.02)] hover:scale-105 transition-shadow shadow-sm hover:shadow-[0_6px_20px_rgba(140,95,109,0.08)]">
                    <svg className="w-4 h-4 text-[#9AE9D8]" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.9c-.6.3-1.2.5-1.9.6a3.3 3.3 0 0 0-5.7 3v.3A9.4 9.4 0 0 1 3.2 4.6a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.4-.4 0 1.7 1.2 3.2 2.9 3.5-.4.1-.8.2-1.2.1-.3 0-.6 0-.9-.1.6 1.9 2.3 3.3 4.4 3.3A9.4 9.4 0 0 1 2 19.5 13.3 13.3 0 0 0 8 21c8.3 0 12.8-6.8 12.8-12.8v-.6 c.9-.7 1.6-1.6 2.2-2.6-.8.4-1.6.7-2.5.8z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[rgba(255,215,170,0.06)] pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-[#D8FFF5]/60">
            <div className="mb-3 sm:mb-0">Made with care Â· Luxury styles worldwide</div>
            <div className="flex items-center space-x-4">
              <Link to="/privacy" className="hover:text-[#9AE9D8] transition">Privacy</Link>
              <Link to="/shipping" className="hover:text-[#9AE9D8] transition">Shipping</Link>
              <Link to="/returns" className="hover:text-[#9AE9D8] transition">Returns</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
















