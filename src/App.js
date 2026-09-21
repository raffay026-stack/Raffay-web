import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "sonner";

import HomeView from "./views/HomeView";
import CatalogView from "./views/CatalogView";
import ProductDetailView from "./views/ProductDetailView";
import CheckoutView from "./views/CheckoutView";
import OrderConfirmationView from "./views/OrderConfirmationView";
import MyOrdersView from "./views/MyOrdersView";
import AuthView from "./views/AuthView";

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
        <div className="min-h-screen bg-[#FFFDF8] text-[#2D2326] flex flex-col justify-between selection:bg-[#6E1F35] selection:text-white">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/catalog" element={<CatalogView />} />
            <Route path="/Perfume/:id" element={<ProductDetailView />} />
            <Route path="/checkout" element={<CheckoutView />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmationView />} />
            <Route path="/orders" element={<MyOrdersView />} />
            <Route path="/auth" element={<AuthView />} />
          </Routes>
          <Toaster richColors position="top-right" theme="light" />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;






















