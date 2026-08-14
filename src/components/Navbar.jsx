import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Search, 
  Sparkles, 
  Menu, 
  X,
  PackageCheck,
  LogOut
} from "lucide-react";
import Logo from "../assets/logo.svg";
import { useState } from "react";
import { CART, HOME } from "../constants/testIds";

export default function Navbar({ onOpenCart, onOpenQuiz }) {
  const { user, cart, wishlist, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#080809]/30">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-[#1A1811] via-[#332B14] to-[#1A1811] text-[#9AE9D8] text-xs py-1.5 px-4 text-center tracking-widest uppercase font-serif flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#9AE9D8]" />
        <span>Complimentary 24K Gold Gift Wrapped Delivery on Orders Exceeding $300</span>
        <Sparkles className="w-3.5 h-3.5 text-[#080809]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group" data-testid="navbar-brand-logo">
              <img src={Logo} alt="Styleora" className="w-10 h-10 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform scentora-logo-badge" />
              <div className="flex flex-col">
                <span className="text-2xl font-semibold tracking-[0.18em] bg-gradient-to-r from-[#2FB59A] via-[#E2C37A] to-[#2FB59A] bg-clip-text text-transparent" style={{ fontFamily: "Didot, Bodoni 72, Bodoni MT, Times New Roman, serif" }}>SCENTORA</span>
                <span className="text-[9px] tracking-[0.25em] text-[#B9A2A9] uppercase">Haute Perfumeerie</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-serif text-sm tracking-wider">
            <Link 
              to="/" 
              className={`transition-colors hover:text-[#9AE9D8] ${isActive('/') ? 'text-[#9AE9D8] border-b border-[#2FB59A] pb-1' : 'text-neutral-300'}`}
              data-testid="nav-link-home"
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className={`transition-colors hover:text-[#9AE9D8] ${isActive('/catalog') ? 'text-[#9AE9D8] border-b border-[#2FB59A] pb-1' : 'text-neutral-300'}`}
              data-testid="nav-link-catalog"
            >
              Collection (100)
            </Link>
            <button 
              onClick={() => onOpenQuiz?.()} 
              className="text-neutral-300 hover:text-[#9AE9D8] transition-colors flex items-center gap-1.5"
              data-testid={HOME.quizCta}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9AE9D8]" />
              <span>Style Profiler Quiz</span>
            </button>
            <Link 
              to="/orders" 
              className={`transition-colors hover:text-[#9AE9D8] ${isActive('/orders') ? 'text-[#9AE9D8] border-b border-[#2FB59A] pb-1' : 'text-neutral-300'}`}
              data-testid="nav-link-orders"
            >
              My Orders
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => navigate('/catalog')}
              className="p-2 text-neutral-300 hover:text-[#9AE9D8] transition-colors relative"
              title="Search Catalog"
              data-testid="nav-search-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={() => navigate('/orders')}
              className="p-2 text-neutral-300 hover:text-[#9AE9D8] transition-colors relative hidden sm:block"
              title="Wishlist"
              data-testid="nav-wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#080809] text-[#0A0A0A] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              onClick={() => onOpenCart?.()}
              className="relative p-2.5 bg-gradient-to-r from-[#1A1811] to-[#2E2512] border border-[#2FB59A]/50 rounded-full text-[#9AE9D8] hover:border-[#2FB59A] transition-all shadow-md group"
              data-testid={CART.drawerBtn}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#080809] text-[#0A0A0A] text-xs font-bold rounded-full flex items-center justify-center shadow">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth */}
            {user ? (
              <div className="relative group hidden sm:block">
                <button 
                  onClick={() => navigate('/orders')}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-[#2FB59A]/30 hover:border-[#2FB59A] transition-all bg-[#121212]"
                  data-testid="nav-user-menu"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2FB59A]/20 text-[#9AE9D8] flex items-center justify-center font-serif font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/auth')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[#2FB59A] text-[#9AE9D8] hover:bg-[#2FB59A] hover:text-[#9AE9D8] font-serif text-xs uppercase tracking-widest transition-all rounded-sm"
                data-testid="nav-login-btn"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-[#9AE9D8]"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#080809]/30 px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-200 hover:text-[#080809] font-serif py-2 border-b border-neutral-800"
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-200 hover:text-[#080809] font-serif py-2 border-b border-neutral-800"
          >
            Collection (100)
          </Link>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenQuiz?.(); }}
            className="w-full text-left text-neutral-200 hover:text-[#9AE9D8] font-serif py-2 border-b border-neutral-800 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#9AE9D8]" />
            <span>Style Profiler Quiz</span>
          </button>
          <Link 
            to="/orders" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-200 hover:text-[#080809] font-serif py-2 border-b border-neutral-800"
          >
            My Orders
          </Link>
          {user ? (
            <button 
              onClick={() => { logoutUser(); setMobileMenuOpen(false); }}
              className="w-full text-left text-red-400 font-serif py-2 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out ({user.name})</span>
            </button>
            ) : (
            <Link 
              to="/auth" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#9AE9D8] font-serif py-2 text-center border border-[#2FB59A] rounded uppercase tracking-wider text-xs hover:bg-[#151116] hover:text-[#9AE9D8]"
            >
              Sign In / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}


















