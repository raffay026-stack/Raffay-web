import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from './AppContext'

const CartDrawer = (props) => {
  const ctx = useContext(AppContext) || {}
  const navigate = useNavigate()

  // Flexible accessors to preserve compatibility with existing app shape
  const isOpen = props.isOpen ?? ctx.isCartOpen ?? ctx.showCart ?? ctx.cartOpen ?? false
  const onClose = props.onClose ?? ctx.setIsCartOpen ?? ctx.setShowCart ?? ctx.closeCart ?? (() => {})

  const items = ctx.cart ?? ctx.cartItems ?? ctx.items ?? []

  const increase = (id) => {
    if (ctx.increaseQty) return ctx.increaseQty(id)
    if (ctx.increaseQuantity) return ctx.increaseQuantity(id)
    if (ctx.addToCart) return ctx.addToCart(id)
  }

  const decrease = (id) => {
    if (ctx.decreaseQty) return ctx.decreaseQty(id)
    if (ctx.decreaseQuantity) return ctx.decreaseQuantity(id)
  }

  const remove = (id) => {
    if (ctx.removeFromCart) return ctx.removeFromCart(id)
    if (ctx.removeItem) return ctx.removeItem(id)
  }

  const subtotal = ctx.subtotal ?? ctx.getSubtotal ?? ctx.cartSubtotal ?? 0
  const shipping = ctx.shipping ?? ctx.cartShipping ?? 0
  const discount = ctx.discount ?? ctx.cartDiscount ?? 0
  const total = ctx.total ?? ctx.cartTotal ?? ctx.getTotal ?? subtotal + shipping - discount

  const handleCheckout = () => {
    if (ctx.checkout) return ctx.checkout()
    navigate('/checkout')
  }

  const handleContinue = () => {
    if (props.onContinue) return props.onContinue()
    navigate('/')
    if (onClose) onClose(false)
  }

  const visible = Boolean(isOpen)

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-50 pointer-events-none ${visible ? 'pointer-events-auto' : ''}`}
    >
      {/* Backdrop */}
      <div
        onClick={() => onClose(false)}
        className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-60 bg-black' : 'opacity-0'}`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] lg:w-[520px] transform transition-transform duration-400 ${visible ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          boxShadow: 'rgba(0,0,0,0.6) 0 20px 40px',
        }}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-[#0b0b0b]/80 via-[#0f0f0f]/60 to-[#101010]/90 text-white p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-serif tracking-tight">Your Cart</h3>
              <p className="text-sm text-gray-300 mt-1">Premium selections waiting for you</p>
            </div>
            <button
              onClick={() => onClose(false)}
              aria-label="Close cart"
              className="ml-4 p-2 rounded-full bg-white/6 hover:bg-white/10 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="gold" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {items && items.length > 0 ? (
              <ul className="space-y-4">
                {items.map((it, idx) => (
                  <li key={it.id ?? it._id ?? idx} className="flex items-center gap-4 bg-white/3 rounded-xl p-3 md:p-4 border border-white/5 hover:translate-y-0.5 transition-transform">
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-black/40 flex items-center justify-center border border-white/6">
                      <img src={it.image || it.images?.[0] || it.img} alt={it.name || it.title} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-md font-medium truncate">{it.name || it.title}</h4>
                          <p className="text-sm text-gray-300 mt-1 truncate">{it.variant || ''}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-md font-semibold text-gold">{it.price ? `$${it.price}` : (it.unit_price ? `$${it.unit_price}` : '')}</div>
                          <button onClick={() => remove(it.id ?? it._id ?? it.productId)} className="mt-2 text-sm text-gray-400 hover:text-red-300">Remove</button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center bg-white/5 rounded-lg p-1">
                          <button onClick={() => decrease(it.id ?? it._id ?? it.productId)} className="w-9 h-9 flex items-center justify-center text-white/80 hover:bg-white/8 rounded-md">-</button>
                          <div className="px-4 text-center min-w-[36px]">{it.quantity ?? it.qty ?? 1}</div>
                          <button onClick={() => increase(it.id ?? it._id ?? it.productId)} className="w-9 h-9 flex items-center justify-center text-white/80 hover:bg-white/8 rounded-md">+</button>
                        </div>
                        <div className="text-sm text-gray-300">{it.size ? it.size : ''}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-300">
                <div className="w-32 h-32 rounded-full bg-white/3 flex items-center justify-center mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="gold" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 6h15l-1.5 9h-12z" />
                    <path d="M6 6L4 2" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium">Your cart is empty</h4>
                <p className="text-sm mt-2 text-gray-400">Discover our signature Perfumes and add them to your cart.</p>
                <button onClick={handleContinue} className="mt-4 px-5 py-2 rounded-md bg-white/6 hover:bg-white/10">Continue Shopping</button>
              </div>
            )}
          </div>

          {/* Footer totals and actions */}
          <div className="mt-6 pt-4 border-t border-white/6">
            <div className="flex justify-between text-gray-300 mb-2">
              <span>Subtotal</span>
              <span className="font-medium text-white">${subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-300 mb-2">
              <span>Shipping</span>
              <span className="font-medium text-white">${shipping}</span>
            </div>
            {discount ? (
              <div className="flex justify-between text-gray-300 mb-2">
                <span>Discount</span>
                <span className="font-medium text-white">-${discount}</span>
              </div>
            ) : null}

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="text-sm text-gray-300">Total</div>
                <div className="text-2xl font-semibold text-white">${total}</div>
              </div>
              <div className="flex flex-col gap-3 w-48">
                <button onClick={handleCheckout} className="w-full px-4 py-3 bg-gradient-to-r from-[#2FB59A] to-[#2FB59A] text-[#9AE9D8] font-semibold rounded-md shadow-md hover:scale-99 transition-transform">Checkout</button>
                <button onClick={handleContinue} className="w-full px-4 py-2 border border-white/10 rounded-md text-gray-200 hover:bg-white/5">Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer


















