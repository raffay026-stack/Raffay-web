import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "./AppContext";

const CatalogView = () => {
  const ctx = useContext(AppContext) || {};
  const navigate = useNavigate();

  const products = ctx.products || [];

  const [localSearch, setLocalSearch] = useState("");
  const searchTerm = ctx.searchTerm ?? localSearch;
  const setSearchTerm = ctx.setSearchTerm ?? setLocalSearch;

  const categories = ctx.categories || Array.from(new Set(products.map(p=>p.category)));
  const selectedCategory = ctx.selectedCategory ?? "All";
  const setSelectedCategory = ctx.setSelectedCategory ?? (()=>{});

  const sortOption = ctx.sortOption ?? "default";
  const setSortOption = ctx.setSortOption ?? (()=>{});

  const addToCart = ctx.addToCart ?? (()=>{});

  const filtered = useMemo(()=>{
    let list = products.slice();
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(p => (p.name||"").toLowerCase().includes(q) || (p.description||"").toLowerCase().includes(q));
    }
    if (selectedCategory && selectedCategory !== "All") list = list.filter(p=>p.category === selectedCategory);
    if (sortOption === "price-asc") list.sort((a,b)=>a.price-b.price);
    if (sortOption === "price-desc") list.sort((a,b)=>b.price-a.price);
    return list;
  }, [products, searchTerm, selectedCategory, sortOption]);

  const goDetail = (p)=>{
    if (ctx.setSelectedProduct) ctx.setSelectedProduct(p);
    navigate(`/product/${p.id || p.slug || p.name}`);
  }

  return (
    <div className="catalog-view-unique container mx-auto px-4 py-8">
      <div className="header flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-100">Our Collection</h1>
          <div className="mt-2 flex items-center">
            <span className="w-16 h-0.5 bg-gradient-to-r from-[#2FB59A] via-transparent to-transparent mr-3" />
            <p className="text-sm text-gray-300">A curated selection of exclusive Perfumes</p>
          </div>
        </div>

        <div className="controls mt-4 md:mt-0 flex gap-3 items-center">
          <div className="relative">
            <input
              aria-label="Search Perfumes"
              className="search-input bg-gray-800/60 text-gray-100 placeholder-gray-400 px-4 py-2 rounded-xl focus:outline-none"
              placeholder="Search products, notes, or brands"
              value={searchTerm}
              onChange={e=>setSearchTerm(e.target.value)}
            />
          </div>
          <select className="select-category bg-transparent border border-gray-700 text-gray-200 px-3 py-2 rounded-lg"
            value={selectedCategory}
            onChange={e=>setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map(cat=> <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select className="select-sort bg-transparent border border-gray-700 text-gray-200 px-3 py-2 rounded-lg"
            value={sortOption}
            onChange={e=>setSortOption(e.target.value)}>
            <option value="default">Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(product=> (
          <article key={product.id || product.name} className="card group bg-gradient-to-b from-gray-900/60 via-gray-900/50 to-gray-900/40 border border-gray-800 rounded-2xl p-4 shadow-lg transform transition hover:-translate-y-2">
            <div className="image-wrap rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center" style={{height:220}} onClick={()=>goDetail(product)}>
              <img src={product.image} alt={product.name} className="product-image transition-transform duration-500 group-hover:scale-105" style={{maxHeight:'100%', width:'auto'}} />
            </div>
            <div className="pt-4 flex flex-col h-40">
              <div className="flex items-baseline justify-between">
                <h2 className="product-title text-lg font-medium text-gray-100">{product.name}</h2>
                <span className="text-sm text-[#9AE9D8] font-semibold">${product.price}</span>
              </div>
              <p className="mt-1 text-sm text-gray-300 line-clamp-2">{product.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="meta text-xs text-gray-400">
                  <span className="category mr-2">{product.category}</span>
                  {product.rating && <span className="rating">★ {product.rating}</span>}
                </div>
                <div className="actions flex gap-2">
                  <button onClick={()=>addToCart(product)} className="btn-add px-3 py-2 rounded-lg bg-[#2FB59A] text-white hover:bg-[#46CDB3] font-semibold transform transition hover:scale-105">Add</button>
                  <button onClick={()=>goDetail(product)} className="btn-buy px-3 py-2 rounded-lg border border-gray-700 text-gray-100 hover:bg-gray-800/60">View</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .catalog-view-unique { background: linear-gradient(180deg, rgba(10,10,10,0.6), rgba(5,5,5,0.4)); }
        .catalog-view-unique .search-input { min-width:260px; box-shadow: 0 6px 18px rgba(2,2,2,0.6); border: 1px solid rgba(255,215,160,0.06); }
        .catalog-view-unique .search-input:focus { box-shadow: 0 8px 28px rgba(255,215,160,0.06); border-color: rgba(255,215,160,0.25); }
        .catalog-view-unique .card { background-clip: padding-box; }
        .catalog-view-unique .image-wrap { transition: transform 0.5s ease, box-shadow 0.3s ease; }
        .catalog-view-unique .card:hover .image-wrap { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 30px rgba(2,2,2,0.7); }
        .catalog-view-unique .product-image { transition: transform 0.6s cubic-bezier(.2,.9,.3,1); }
        .catalog-view-unique .card:hover .product-image { transform: scale(1.08); }
        .catalog-view-unique .btn-add { background: linear-gradient(90deg,#2FB59A,#177A69); }
        .catalog-view-unique .btn-add:hover { box-shadow: 0 8px 24px rgba(226,178,75,0.18); }
        .catalog-view-unique .btn-buy { border-color: rgba(255,255,255,0.04); }
        .catalog-view-unique .card { transition: box-shadow .25s ease, transform .25s ease; }
        .catalog-view-unique .card:hover { box-shadow: 0 18px 40px rgba(2,2,2,0.75); border-color: rgba(255,215,160,0.08); }
        @media (max-width:768px) {
          .catalog-view-unique .image-wrap { height:180px !important }
        }
      `}</style>
    </div>
  );
}

export default CatalogView;




















