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
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#43111F]/30">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-[#43111F] via-[#6E1F35] to-[#43111F] text-white text-xs py-1.5 px-4 text-center tracking-widest uppercase font-serif flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-white" />
        <span>Complimentary 24K Gold Gift Wrapped Delivery on Orders Exceeding $300</span>
        <Sparkles className="w-3.5 h-3.5 text-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-4 group" data-testid="navbar-brand-logo">
              <img src={Logo} alt="Styleora" className="w-16 h-16 object-contain group-hover:scale-105 transition-transform scentora-logo-badge" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-[0.16em] bg-gradient-to-r from-[#43111F] via-[#6E1F35] to-[#87344D] bg-clip-text text-transparent" style={{ fontFamily: "Didot, Bodoni 72, Bodoni MT, Times New Roman, serif" }}>SCENTORA</span>
                <span className="text-[10px] tracking-[0.32em] font-semibold text-[#6E1F35] uppercase">Haute Perfumeerie</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-serif text-sm tracking-wider">
            <Link 
              to="/" 
              className={`transition-colors hover:text-[#6E1F35] ${isActive('/') ? 'text-[#6E1F35] border-b border-[#6E1F35] pb-1' : 'text-[#5D5054]'}`}
              data-testid="nav-link-home"
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className={`transition-colors hover:text-[#6E1F35] ${isActive('/catalog') ? 'text-[#6E1F35] border-b border-[#6E1F35] pb-1' : 'text-[#5D5054]'}`}
              data-testid="nav-link-catalog"
            >
              Collection (100)
            </Link>
            <button 
              onClick={() => onOpenQuiz?.()} 
              className="text-[#5D5054] hover:text-[#6E1F35] transition-colors flex items-center gap-1.5"
              data-testid={HOME.quizCta}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6E1F35]" />
              <span>Style Profiler Quiz</span>
            </button>
            <Link 
              to="/orders" 
              className={`transition-colors hover:text-[#6E1F35] ${isActive('/orders') ? 'text-[#6E1F35] border-b border-[#6E1F35] pb-1' : 'text-[#5D5054]'}`}
              data-testid="nav-link-orders"
            >
              My Orders
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => navigate('/catalog')}
              className="p-2 text-[#5D5054] hover:text-[#6E1F35] transition-colors relative"
              title="Search Catalog"
              data-testid="nav-search-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={() => navigate('/orders')}
              className="p-2 text-[#5D5054] hover:text-[#6E1F35] transition-colors relative hidden sm:block"
              title="Wishlist"
              data-testid="nav-wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#43111F] text-[#FFFDF8] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              onClick={() => onOpenCart?.()}
              className="relative p-2.5 bg-gradient-to-r from-[#43111F] to-[#6E1F35] border border-[#6E1F35]/40 rounded-full text-white hover:border-[#6E1F35] transition-all shadow-md group"
              data-testid={CART.drawerBtn}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#43111F] text-[#FFFDF8] text-xs font-bold rounded-full flex items-center justify-center shadow">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth */}
            {user ? (
              <div className="relative group hidden sm:block">
                <button 
                  onClick={() => navigate('/orders')}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-[#6E1F35]/30 hover:border-[#6E1F35] transition-all bg-[#FFFDF8]"
                  data-testid="nav-user-menu"
                >
                  <div className="w-8 h-8 rounded-full bg-[#6E1F35]/20 text-[#6E1F35] flex items-center justify-center font-serif font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/auth')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[#6E1F35] text-[#6E1F35] hover:bg-[#6E1F35] hover:text-white font-serif text-xs uppercase tracking-widest transition-all rounded-sm"
                data-testid="nav-login-btn"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5D5054] hover:text-[#6E1F35]"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF8] border-b border-[#43111F]/30 px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#2D2326] hover:text-[#43111F] font-serif py-2 border-b border-[#E5D8D0]"
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#2D2326] hover:text-[#43111F] font-serif py-2 border-b border-[#E5D8D0]"
          >
            Collection (100)
          </Link>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenQuiz?.(); }}
            className="w-full text-left text-[#2D2326] hover:text-[#6E1F35] font-serif py-2 border-b border-[#E5D8D0] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#6E1F35]" />
            <span>Style Profiler Quiz</span>
          </button>
          <Link 
            to="/orders" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#2D2326] hover:text-[#43111F] font-serif py-2 border-b border-[#E5D8D0]"
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
              className="block text-[#6E1F35] font-serif py-2 text-center border border-[#6E1F35] rounded uppercase tracking-wider text-xs hover:bg-[#6E1F35] hover:text-white"
            >
              Sign In / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}





















