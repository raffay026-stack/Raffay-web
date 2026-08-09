import React from "react";
import "@/App.css";
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
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/catalog" element={<CatalogView />} />
            <Route path="/perfume/:id" element={<ProductDetailView />} />
            <Route path="/checkout" element={<CheckoutView />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmationView />} />
            <Route path="/orders" element={<MyOrdersView />} />
            <Route path="/auth" element={<AuthView />} />
          </Routes>
          <Toaster richColors position="top-right" theme="dark" />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
