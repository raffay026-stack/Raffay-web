import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "sonner";

import HomeView from "./views/HomeView";
import NewArrivalsView from "./views/NewArrivalsView";
import CategoryView from "./views/CategoryView";
import SaleProductsView from "./views/SaleProductsView";
import CatalogView from "./views/CatalogView";
import ProductDetailView from "./views/ProductDetailView";
import CheckoutView from "./views/CheckoutView";
import OrderConfirmationView from "./views/OrderConfirmationView";
import MyOrdersView from "./views/MyOrdersView";
import AuthView from "./views/AuthView";
import AdminLoginView from "./views/AdminLoginView";
import AdminDashboardView from "./views/AdminDashboardView";
import AdminProductsView from "./views/AdminProductsView";
import AdminOrdersView from "./views/AdminOrdersView";
import AdminCustomersView from "./views/AdminCustomersView";
import AdminSettingsView from "./views/AdminSettingsView";
import AdminLayout from "./components/AdminLayout";
import AdminErrorBoundary from "./components/AdminErrorBoundary";

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "FK DECORE | Home";

    if (path === "/") {
      title = "FK DECORE | Home";
    } else if (path === "/new-arrivals") {
      title = "FK DECORE | New Arrivals";
    } else if (path === "/sale-products") {
      title = "FK DECORE | Sale Products";
    } else if (path === "/catalog") {
      title = "FK DECORE | Collection";
    } else if (path === "/checkout") {
      title = "FK DECORE | Checkout";
    } else if (path === "/orders") {
      title = "FK DECORE | My Orders";
    } else if (path === "/auth") {
      title = "FK DECORE | Login";
    } else if (path === "/admin") {
      title = "FK DECORE | Admin Login";
    } else if (path.startsWith("/admin/")) {
      title = "FK DECORE | Admin";
    } else if (path.startsWith("/order-confirmation/")) {
      title = "FK DECORE | Order Confirmation";
    } else if (path.startsWith("/Perfume/")) {
      title = "FK DECORE | Product";
    } else if (path.startsWith("/category/")) {
      const category = decodeURIComponent(path.split("/")[2] || "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      title = category
        ? `FK DECORE | ${category}`
        : "FK DECORE | Category";
    } else if (path === "/about-us") {
      title = "FK DECORE | About Us";
    }

    document.title = title;
  }, [location.pathname]);

  return null;
}
function App() {

  useEffect(() => {
    const revealElements = () => {
      const elements = document.querySelectorAll(
        ".luxury-reveal, main section, main article, footer, [data-luxury-reveal]"
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("luxury-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.10,
          rootMargin: "0px 0px -45px 0px"
        }
      );

      elements.forEach((el) => {
        el.classList.add("luxury-reveal");

      if (
        el.tagName === "ARTICLE" ||
        el.classList.contains("group") ||
        el.querySelector?.("img")
      ) {
        el.classList.add("luxury-product-reveal");
      }
        observer.observe(el);
      });

      return observer;
    };

    const observer = revealElements();

    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll(
        "main section:not(.luxury-reveal), main article:not(.luxury-reveal), footer:not(.luxury-reveal), [data-luxury-reveal]:not(.luxury-reveal)"
      ).forEach((el) => {
        el.classList.add("luxury-reveal");

      if (
        el.tagName === "ARTICLE" ||
        el.classList.contains("group") ||
        el.querySelector?.("img")
      ) {
        el.classList.add("luxury-product-reveal");
      }
        observer.observe(el);
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <PageTitle />
        <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] flex flex-col justify-between selection:bg-[#6E1F35] selection:text-white">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/new-arrivals" element={<NewArrivalsView />} />
            <Route path="/sale-products" element={<SaleProductsView />} />
            <Route path="/catalog" element={<CatalogView />} />
            <Route path="/category/:slug" element={<CategoryView />} />
            <Route path="/Perfume/:id" element={<ProductDetailView />} />
            <Route path="/checkout" element={<CheckoutView />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmationView />} />
            <Route path="/orders" element={<MyOrdersView />} />
            <Route path="/auth" element={<AuthView />} />
            <Route path="/admin" element={<AdminLoginView />} />
            <Route element={<AdminErrorBoundary><AdminLayout /></AdminErrorBoundary>}>
              <Route path="/admin/dashboard" element={<AdminDashboardView />} />
              <Route path="/admin/products" element={<AdminProductsView />} />
              <Route path="/admin/orders" element={<AdminOrdersView />} />
              <Route path="/admin/customers" element={<AdminCustomersView />} />
              <Route path="/admin/settings" element={<AdminSettingsView />} />
            </Route>
                  <Route path="/about-us" element={<AboutUsView />} />      </Routes>
          <Toaster richColors position="top-right" theme="light" />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;


























import AboutUsView from "./views/AboutUsView";

