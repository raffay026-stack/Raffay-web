import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomeView from './views/HomeView'
import CatalogView from './views/CatalogView'
import ProductDetailView from './views/ProductDetailView'
import CheckoutView from './views/CheckoutView'
import MyOrdersView from './views/MyOrdersView'
import OrderConfirmationView from './views/OrderConfirmationView'
import CartDrawer from './components/CartDrawer'
import StyleQuizModal from '../components/ScentQuizModal'
import { AppProvider } from './AppContext'

// Application-level shell: lightweight, responsive container and subtle page transition.
export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-transparent text-gray-900">
          <Navbar />

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Suspense kept minimal to avoid interfering with existing component behavior */}
            <Suspense fallback={<div className="py-20 text-center">Loadingâ€¦</div>}>
              <div className="transition-opacity duration-300 ease-in-out">
                <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/catalog" element={<CatalogView />} />
                  <Route path="/product/:id" element={<ProductDetailView />} />
                  <Route path="/checkout" element={<CheckoutView />} />
                  <Route path="/orders" element={<MyOrdersView />} />
                  <Route path="/order-confirmation/:id" element={<OrderConfirmationView />} />
                  {/* Preserve any legacy/default navigation */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Suspense>
          </main>

          <CartDrawer />
          <StyleQuizModal />
          <Footer />
        </div>
      </Router>
    </AppProvider>
  )
}
















