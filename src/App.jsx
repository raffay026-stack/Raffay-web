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
import CategoryView from './views/CategoryView'
import SitePage from './views/SitePages'
import SaleProductsView from './views/SaleProductsView'
import { AppProvider } from './AppContext'

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-transparent text-gray-900">

          <Navbar />

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>

              <Routes>

                <Route path="/" element={<HomeView />} />

                <Route path="/catalog" element={<CatalogView />} />

                <Route path="/product/:id" element={<ProductDetailView />} />

                <Route path="/checkout" element={<CheckoutView />} />

                <Route path="/orders" element={<MyOrdersView />} />

                <Route path="/order-confirmation/:id" element={<OrderConfirmationView />} />

                {/* SEPARATE SALE PRODUCTS WEBPAGE */}

                <Route path="/categories" element={<SitePage type="categories" />} />

                <Route path="/new-arrivals" element={<SitePage type="arrivals" />} />

                <Route path="/about-us" element={<SitePage type="about" />} />

                <Route path="/hot-articles" element={<SitePage type="articles" />} />

                <Route path="/category/:slug" element={<CategoryView />} />

                <Route path="/sale-products" element={<SaleProductsView />} />
                        </div>

                        <div
                          className="terms-text"
                          style={{
                            fontFamily: "Georgia, serif",
                            color: "#4B3A40",
                            fontSize: "17px",
                            lineHeight: "2",
                          }}
                        >
                          <p style={{ margin: "0 0 30px 0" }}>
                            Customers are advised to make video while unwrapping or unboxing of parcel from the first tape till the last piece got opened. This video will be used as a proof that customer received damaged products. If video proof is not provided or video is made after the product has been unboxed or even the box is opened before the starting of the video then customer will not be entitled for the refund / replacement.
                          </p>

                          <div
                            style={{
                              background: "#F7F1EC",
                              borderLeft: "4px solid #6E1F35",
                              borderRadius: "8px",
                              padding: "20px 22px",
                            }}
                          >
                            <p
                              style={{
                                margin: 0,
                                color: "#43111F",
                                fontWeight: 700,
                              }}
                            >
                              No Claim Will Be Accepted After 24 Hours of Dilvery
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            marginTop: "40px",
                            paddingTop: "24px",
                            borderTop: "1px solid #E5D8D0",
                            textAlign: "center",
                          }}
                        >
                          <a
                            href="/"
                            style={{
                              color: "#43111F",
                              fontFamily: "Georgia, serif",
                              fontSize: "15px",
                              fontWeight: 700,
                              textDecoration: "none",
                            }}
                          >
                            ← Back to Home
                          </a>
                        </div>
                      </div>
                    </div>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />

              </Routes>

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






