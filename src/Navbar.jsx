import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "./assets/fk-logo.jpeg";
import { AppContext } from "./AppContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Catalog", to: "/catalog" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const appContext = useContext(AppContext) || {};

  const cartCandidate =
    appContext.cart ||
    appContext.cartItems ||
    appContext.cartProducts ||
    appContext.items ||
    [];

  const cartCount =
    typeof appContext.cartItemsCount === "number"
      ? appContext.cartItemsCount
      : Array.isArray(cartCandidate)
      ? cartCandidate.length
      : typeof cartCandidate?.length === "number"
      ? cartCandidate.length
      : 0;

  const user = appContext.user || appContext.currentUser || appContext.account || null;
  const logout =
    typeof appContext.logout === "function"
      ? appContext.logout
      : typeof appContext.signOut === "function"
      ? appContext.signOut
      : appContext.handleLogout;

  const searchQuery =
    appContext.searchQuery ?? appContext.searchTerm ?? appContext.search ?? "";
  const setSearchQuery =
    typeof appContext.setSearchQuery === "function"
      ? appContext.setSearchQuery
      : typeof appContext.setSearchTerm === "function"
      ? appContext.setSearchTerm
      : typeof appContext.setSearch === "function"
      ? appContext.setSearch
      : typeof appContext.updateSearch === "function"
      ? appContext.updateSearch
      : null;

  const cartToggle =
    typeof appContext.toggleCart === "function"
      ? appContext.toggleCart
      : typeof appContext.openCart === "function"
      ? appContext.openCart
      : typeof appContext.setCartOpen === "function"
      ? () => appContext.setCartOpen(true)
      : appContext.handleCartOpen;

  const wishlistCandidate =
    appContext.wishlist || appContext.wishlistItems || appContext.favorites || [];

  const wishlistCount =
    typeof appContext.wishlistCount === "number"
      ? appContext.wishlistCount
      : Array.isArray(wishlistCandidate)
      ? wishlistCandidate.length
      : 0;

  const wishlistExists =
    Boolean(appContext.wishlist) ||
    Boolean(appContext.wishlistItems) ||
    Boolean(appContext.favorites) ||
    appContext.wishlistCount != null;

  const announcementText =
    appContext.announcement ||
    appContext.announcementText ||
    appContext.promoText ||
    "Maison de Perfume";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (typeof setSearchQuery === "function") {
      setSearchQuery(value);
    }
  };

  const handleCartClick = () => {
    if (typeof cartToggle === "function") {
      cartToggle();
      return;
    }
    navigate("/cart");
  };

  const handleLogout = () => {
    if (typeof logout === "function") {
      logout();
    }
    setProfileOpen(false);
  };

  const displayName =
    typeof user === "object"
      ? user?.name || user?.email || "Account"
      : typeof user === "string"
      ? user
      : "Account";

  const centerNavItems = [
    { label: "Home", to: "/" },
    { label: "Collection (100)", to: "/catalog" },
    { label: "Style Profiler Quiz", to: "/quiz" },
    { label: "My Orders", to: "/my-orders" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-slate-950/90 border-b border-slate-200/10">
        <div className="mx-auto max-w-screen-xl px-4 py-2 text-center text-[0.72rem] uppercase tracking-[0.32em] text-slate-400">
          {announcementText}
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-3 bg-slate-950/75 backdrop-blur-xl shadow-[0_18px_45px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-white no-underline"
          >
            <img src={Logo} alt="FK Decore" className="w-10 h-10 rounded-full object-cover FK Decore-logo-badge" />
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-semibold uppercase tracking-[0.35em] text-slate-50 transition-colors duration-300 group-hover:text-[#9AE9D8]">
                𝓢𝓬𝓮𝓷𝓽𝓸𝓻𝓪
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">
                Maison de Perfume
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-3">
            {centerNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-2 text-sm font-medium uppercase tracking-[0.18em] transition duration-300 ${
                    isActive
                      ? "bg-[#2FB59A]/10 text-[#D8FFF5]"
                      : "text-slate-300 hover:text-[#D8FFF5] hover:bg-slate-900/60"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center rounded-2xl border border-slate-200/10 bg-slate-900/70 px-3 py-2 shadow-sm shadow-slate-950/20 transition duration-300">
              <span className="pointer-events-none flex items-center text-[#9AE9D8]/80">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search styles"
                className="min-w-[180px] max-w-[260px] bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none"
              />
            </div>

            {wishlistExists && (
              <Link
                to="/wishlist"
                className="hidden md:inline-flex items-center gap-2 rounded-2xl border border-slate-200/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5]"
              >
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#2FB59A] px-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-950">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            <button
              type="button"
              onClick={handleCartClick}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/10 bg-slate-900/80 text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5] focus:outline-none focus:ring-2 focus:ring-[#2FB59A]/20"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6L4 3H2" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#2FB59A] px-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-sm shadow-[#2FB59A]/20">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((current) => !current)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5] focus:outline-none focus:ring-2 focus:ring-[#2FB59A]/20"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2FB59A]/10 text-[#D8FFF5]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium text-slate-100">
                      {displayName}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 z-20 mt-3 w-44 rounded-3xl border border-slate-200/10 bg-slate-950/95 p-3 shadow-xl shadow-slate-950/40 backdrop-blur-xl">
                      <Link
                        to="/profile"
                        className="block rounded-2xl px-3 py-2 text-sm text-slate-100 transition duration-200 hover:bg-slate-900/80 hover:text-[#D8FFF5]"
                        onClick={() => setProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/my-orders"
                        className="mt-1 block rounded-2xl px-3 py-2 text-sm text-slate-100 transition duration-200 hover:bg-slate-900/80 hover:text-[#D8FFF5]"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-100 transition duration-200 hover:bg-slate-900/80 hover:text-[#D8FFF5]"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center rounded-2xl border border-[#2FB59A]/20 bg-[#2FB59A]/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.18em] text-[#D8FFF5] transition duration-300 hover:border-[#2FB59A]/50 hover:bg-[#2FB59A]/15"
                >
                  Sign In
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/10 bg-slate-900/80 text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5] md:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 rounded-[2rem] border border-slate-200/10 bg-slate-950/95 p-4 shadow-xl shadow-slate-950/40 backdrop-blur-xl">
            <nav className="flex flex-col gap-3">
              {centerNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-3xl px-4 py-3 text-sm font-medium uppercase tracking-[0.22em] transition duration-300 ${
                      isActive
                        ? "bg-slate-900/80 text-[#D8FFF5]"
                        : "text-slate-300 hover:bg-slate-900/70 hover:text-[#D8FFF5]"
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 rounded-3xl border border-slate-200/10 bg-slate-900/80 p-4 shadow-inner shadow-slate-950/20">
              <div className="relative mb-3">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9AE9D8]/80">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search styles"
                  className="w-full rounded-3xl border border-slate-200/10 bg-slate-950/90 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition duration-300 focus:border-[#2FB59A]/70 focus:bg-slate-900/90"
                />
              </div>

              <div className="flex flex-col gap-3">
                {wishlistExists && (
                  <Link
                    to="/wishlist"
                    className="block rounded-3xl border border-slate-200/10 bg-slate-900/90 px-4 py-3 text-sm font-medium text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ""}
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleCartClick}
                  className="inline-flex items-center justify-center rounded-3xl border border-slate-200/10 bg-slate-900/90 px-4 py-3 text-sm font-medium text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5]"
                >
                  Cart {cartCount > 0 ? `(${cartCount})` : ""}
                </button>

                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="block rounded-3xl border border-slate-200/10 bg-slate-900/90 px-4 py-3 text-sm font-medium text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5]"
                      onClick={() => setMobileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      className="block rounded-3xl border border-slate-200/10 bg-slate-900/90 px-4 py-3 text-sm font-medium text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5]"
                      onClick={() => setMobileOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="w-full rounded-3xl border border-slate-200/10 bg-slate-900/90 px-4 py-3 text-left text-sm font-medium text-slate-100 transition duration-300 hover:border-[#2FB59A]/40 hover:text-[#D8FFF5]"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block rounded-3xl border border-[#2FB59A]/20 bg-[#2FB59A]/10 px-4 py-3 text-center text-sm font-medium uppercase tracking-[0.18em] text-[#D8FFF5] transition duration-300 hover:border-[#2FB59A]/50 hover:bg-[#2FB59A]/15"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;























