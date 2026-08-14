import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';

const ProductDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(AppContext);
  const products = ctx?.products || [];
  const product = products.find((p) => String(p.id) === String(id));

  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [id]);

  if (!product) return null;

  const increase = () => setQty((q) => Math.min(q + 1, 99));
  const decrease = () => setQty((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    if (ctx?.addToCart) ctx.addToCart(product, qty);
  };

  const handleBuyNow = () => {
    if (ctx?.addToCart) ctx.addToCart(product, qty);
    navigate('/checkout');
  };

  return (
    <div className="product-detail-root max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="back mb-6">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-300 hover:text-white transition">â† Back to catalog</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Image Column */}
        <div className="image-wrap bg-gradient-to-br from-gray-900 via-transparent to-transparent p-6 rounded-2xl shadow-xl border border-gray-800">
          <div className="relative overflow-hidden rounded-xl bg-[rgba(255,255,255,0.02)] p-8 flex items-center justify-center"
               style={{ minHeight: 420 }}>
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[460px] w-auto object-contain transform transition-all duration-500 ease-out hover:scale-105"
              style={{ willChange: 'transform' }}
            />
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="w-full h-full bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
            </div>
          </div>
          <div className="mt-4 flex gap-3 justify-center">
            {/* thumbnails: reuse same image to avoid creating assets */}
            {[0,1,2].map((i) => (
              <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-gray-800 bg-black/30 flex items-center justify-center">
                <img src={product.image} alt={`${product.name}-${i}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="info-wrap text-gray-200">
          <div className="glass p-8 rounded-2xl border border-gray-800 shadow-lg" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }}>
            <div className="mb-3 text-sm text-[#9AE9D8] uppercase tracking-wider">{product.category}</div>
            <h1 className="text-3xl lg:text-4xl font-serif text-white tracking-tight mb-3">{product.name}</h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="price text-2xl font-bold text-[#9AE9D8]">${product.price}</div>
                <div className="rating flex items-center text-sm text-[#D8FFF5]/80">
                  <svg className="w-5 h-5 text-[#9AE9D8] mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z"/></svg>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-400 ml-2">({product.numReviews || 0})</span>
                </div>
              </div>

              <div className="availability text-sm text-gray-300">{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>

            <div className="controls flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="qty inline-flex items-center bg-black/40 border border-gray-800 rounded-lg p-1">
                <button onClick={decrease} className="px-3 py-2 text-lg text-white/90 hover:text-[#9AE9D8] transition">âˆ’</button>
                <div className="px-5 text-lg font-medium">{qty}</div>
                <button onClick={increase} className="px-3 py-2 text-lg text-white/90 hover:text-[#9AE9D8] transition">+</button>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={handleAddToCart} className="flex-1 sm:flex-none px-6 py-3 rounded-lg bg-[#2FB59A] text-[#9AE9D8] font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="flex-1 sm:flex-none px-6 py-3 rounded-lg border border-gray-700 text-white font-semibold hover:bg-white/5 transition">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-gray-400">
              <div className="mb-2"><strong className="text-gray-200">Fragrance Details:</strong> {product.category}</div>
              <div><strong className="text-gray-200">Type:</strong> {product.type || 'Perfume'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;















