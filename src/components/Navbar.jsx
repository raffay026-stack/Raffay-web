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
import Logo from "../assets/fk-logo.jpeg";
import { useState } from "react";
import { CART, HOME } from "../constants/testIds";

export default function Navbar({ onOpenCart }) {
  const { products: navbarProducts } = useApp();
  const collectionCount = Array.isArray(navbarProducts)
    ? navbarProducts.length
    : 0;
  const { user, cart, wishlist, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/98 backdrop-blur-xl border-b border-[#43111F]/20 shadow-lg">
      {/* Top announcement bar - Premium elevated design */}
      <div className="relative bg-gradient-to-r from-[#43111F] via-[#6E1F35] to-[#87344D] text-white text-xs py-2 px-4 text-center tracking-[0.15em] uppercase font-serif overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse opacity-50"></div>
        <div className="relative flex items-center justify-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#E5D1A0] animate-pulse" />
          <span className="font-medium">We deal in all type of Interior & Exterior Decor</span>
          <Sparkles className="w-4 h-4 text-[#E5D1A0] animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">

          {/* Brand Logo - Premium 3D Elevated */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-4 group relative" data-testid="navbar-brand-logo">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6E1F35]/20 to-[#87344D]/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500"></div>
                <img src={Logo} alt="FK Decore" className="relative w-16 h-16 object-contain group-hover:scale-110 transition-all duration-500 FK-Decore-logo-badge shadow-xl" style={{ filter: 'drop-shadow(0 4px 12px rgba(110, 31, 53, 0.25))' }} />
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold tracking-[0.16em] bg-gradient-to-r from-[#43111F] via-[#6E1F35] to-[#87344D] bg-clip-text text-transparent group-hover:tracking-[0.18em] transition-all duration-300" style={{ fontFamily: "Didot, Bodoni 72, Bodoni MT, Times New Roman, serif", textShadow: '0 2px 8px rgba(110, 31, 53, 0.15)' }}>FK Decore</span>
                <span className="text-sm tracking-[0.18em] font-semibold text-[#6E1F35] text-center group-hover:text-[#87344D] transition-colors">Come first  Get first</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links - Premium 3D Hover Effects */}
          <nav className="hidden md:flex items-center space-x-8 font-serif text-sm tracking-wider">
            <Link
              to="/"
              className={`relative py-2 transition-all duration-300 hover:text-[#6E1F35] hover:tracking-widest group ${isActive('/') ? 'text-[#6E1F35] font-semibold' : 'text-[#5D5054]'}`}
              data-testid="nav-link-home"
            >
              <span className="relative z-10">Home</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6E1F35] to-[#87344D] transition-all duration-300 ${isActive('/') ? 'w-full shadow-lg shadow-[#6E1F35]/30' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link
              to="/catalog"
              className={`relative py-2 transition-all duration-300 hover:text-[#6E1F35] hover:tracking-widest group ${isActive('/catalog') ? 'text-[#6E1F35] font-semibold' : 'text-[#5D5054]'}`}
              data-testid="nav-link-catalog"
            >
              <span className="relative z-10">Collection ({collectionCount})</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6E1F35] to-[#87344D] transition-all duration-300 ${isActive('/catalog') ? 'w-full shadow-lg shadow-[#6E1F35]/30' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link
              to="/new-arrivals"
              className={`relative py-2 transition-all duration-300 hover:text-[#6E1F35] hover:tracking-widest group ${isActive('/new-arrivals') ? 'text-[#6E1F35] font-semibold' : 'text-[#5D5054]'}`}
            >
              <span className="relative z-10">New Arrivals</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6E1F35] to-[#87344D] transition-all duration-300 ${isActive('/new-arrivals') ? 'w-full shadow-lg shadow-[#6E1F35]/30' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link
              to="/orders"
              className={`relative py-2 transition-all duration-300 hover:text-[#6E1F35] hover:tracking-widest group ${isActive('/orders') ? 'text-[#6E1F35] font-semibold' : 'text-[#5D5054]'}`}
              data-testid="nav-link-orders"
            >
              <span className="relative z-10">My Orders</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6E1F35] to-[#87344D] transition-all duration-300 ${isActive('/orders') ? 'w-full shadow-lg shadow-[#6E1F35]/30' : 'w-0 group-hover:w-full'}`}></span>
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

            {/* Cart Drawer Trigger - Premium 3D Button */}
            <button
              onClick={() => onOpenCart?.()}
              className="relative p-3 bg-gradient-to-br from-[#43111F] via-[#6E1F35] to-[#87344D] border border-[#6E1F35]/30 rounded-full text-white hover:shadow-2xl hover:shadow-[#6E1F35]/40 hover:scale-110 transition-all duration-300 group"
              data-testid={CART.drawerBtn}
              style={{
                boxShadow: '0 8px 24px rgba(110, 31, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ShoppingBag className="relative w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#87344D] text-[#FFFDF8] text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#FFFDF8] shadow-lg animate-pulse">
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
            Collection ({collectionCount})
          </Link>
          <Link to="/#hot-arrivals" onClick={() => setMobileMenuOpen(false)} className="block text-[#2D2326] hover:text-[#43111F] font-serif py-2 border-b border-[#E5D8D0]">New Arrivals</Link>
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








































