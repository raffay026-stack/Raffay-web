import React, { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, X, Save } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PRODUCT_CATEGORY_NAMES } from "../constants/productCategories";

const emptyProduct = () => ({
  name: "", price: 0, deliveryCharge: 0, description: "", category: "", image: "", inStock: true,
  isSale: false, isNewArrival: false, isHotArticle: false
});

export default function AdminProductsView() {
  const { products, updateProduct, addProduct, deleteProduct, deleteAllProducts } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const categories = PRODUCT_CATEGORY_NAMES;
  const saleCount = products.filter((product) => product.isSale).length;
  const newArrivalCount = products.filter((product) => product.isNewArrival).length;
  const hotArticleCount = products.filter((product) => product.isHotArticle).length;
  const categoryCounts = categories.map((name) => ({
    name,
    count: products.filter((product) => product.category === name).length
  }));
  const filtered = useMemo(() => products.filter((product) => {
    const search = query.trim().toLowerCase();
    const matchesSearch = !search || [product.name, product.category, product.id].some((value) => String(value || "").toLowerCase().includes(search));
    const matchesCategory = category === "All categories" || product.category === category;
    return matchesSearch && matchesCategory;
  }), [products, query, category]);

  const openEditor = (product = null) => {
    setError("");
    setEditor(product ? { ...product, isExisting: true, isHotArticle: Boolean(product.isHotArticle) } : { ...emptyProduct(), brand: "FK Decore", sizes: ["One Size"], topNotes: [], middleNotes: [], baseNotes: [], isBestseller: false, isRoyalOud: false, featured: false, isHotArticle: false, isExisting: false });
  };

  const setField = (field, value) => setEditor((current) => ({ ...current, [field]: value }));

  const updateVariationName = (value) => setEditor((current) => ({
    ...current,
    variations: {
      ...(current.variations || {}),
      name: value,
      options: current.variations?.options || []
    }
  }));

  const updateVariationOption = (index, field, value) => setEditor((current) => ({
    ...current,
    variations: {
      name: current.variations?.name || "",
      options: (current.variations?.options || []).map((option, optionIndex) =>
        optionIndex === index ? { ...option, [field]: value } : option
      )
    }
  }));

  const addVariationOption = () => setEditor((current) => ({
    ...current,
    variations: {
      name: current.variations?.name || "",
      options: [
        ...(current.variations?.options || []),
        { value: "", price: Number(current.price) || 0, image: "" }
      ]
    }
  }));

  const removeVariationOption = (index) => setEditor((current) => ({
    ...current,
    variations: {
      name: current.variations?.name || "",
      options: (current.variations?.options || []).filter((_, optionIndex) => optionIndex !== index)
    }
  }));

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please choose a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError("Image must be 3 MB or smaller.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setField("image", String(reader.result || ""));
      setImageFileName(file.name);
      setError("");
    };

    reader.onerror = () => {
      setError("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  const handleVariationImageChange = (index, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please choose a JPG, PNG or WEBP variation image.");
      event.target.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError("Variation images must be 3 MB or smaller.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : "";
      setEditor((current) => ({
        ...current,
        variations: {
          name: current.variations?.name || "",
          options: (current.variations?.options || []).map((option, optionIndex) =>
            optionIndex === index ? { ...option, image } : option
          )
        }
      }));
      setError("");
    };
    reader.readAsDataURL(file);
  };
  const saveProduct = async (event) => {
    event.preventDefault();
    if (!editor.name.trim()) { setError("Enter a product name."); return; }
    if (!editor.image.trim()) { setError("Please choose a product image."); return; }
    const payload = {
      name: editor.name.trim(),
      price: Number(editor.price) || 0,
      deliveryCharge: Number(editor.deliveryCharge) || 0,
      description: editor.description || "",
      category: editor.category || "",
      image: editor.image.trim(),
      inStock: Boolean(editor.inStock),
      isSale: Boolean(editor.isSale),
      isNewArrival: Boolean(editor.isNewArrival),
      isHotArticle: Boolean(editor.isHotArticle),
      variations: {
        name: String(editor.variations?.name || "").trim(),
        options: (editor.variations?.options || [])
          .filter((option) => String(option.value || "").trim())
          .map((option) => ({
            value: String(option.value).trim(),
            price: Math.max(0, Number(option.price) || 0),
            image: String(option.image || "")
          }))
      }
    };
    try {
      if (editor.isExisting) await updateProduct(editor.id, payload);
      else await addProduct({ ...payload, brand: editor.brand || "FK Decore", rating: 0, reviewsCount: 0, sizes: editor.sizes || ["One Size"], topNotes: [], middleNotes: [], baseNotes: [], isBestseller: false, isRoyalOud: false, featured: false, isHotArticle: Boolean(editor.isHotArticle) });
      setEditor(null);
    } catch (saveError) {
      setError(saveError.message || "Unable to save product.");
    }
  };

  const removeProduct = async (product) => {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    setError("");
    try {
      await deleteProduct(product.id);
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete product.");
    }
  };


  const removeAllProducts = async () => {
    if (products.length === 0) {
      window.alert("There are no products to delete.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ALL ${products.length} products? This cannot be undone.`
    );

    if (!confirmed) return;

    setError("");

    try {
      await deleteAllProducts();
      setEditor(null);
      window.alert("All products deleted successfully.");
    } catch (deleteError) {
      console.error("Delete all products failed:", deleteError);
      setError(deleteError?.message || "Unable to delete all products.");
    }
  };
  const toggle = async (product, field) => {
    setError("");
    try {
      await updateProduct(product.id, { [field]: !product[field] });
    } catch (updateError) {
      setError(updateError.message || "Unable to update product.");
    }
  };

  return <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C6E72]">Catalog</p><h1 className="mt-1 font-serif text-3xl font-bold text-[#43111F]">Products</h1><p className="mt-1 text-sm text-[#7C6E72]">{products.length} active products</p></div><div className="flex flex-col gap-2 sm:flex-row"><button onClick={() => openEditor()} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#6E1F35] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#43111F]"><Plus size={17} />Add product</button><button onClick={removeAllProducts} disabled={products.length === 0} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"><Trash2 size={17} />Delete all products</button></div></div>
    <section className="grid gap-3 rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] p-4 shadow-sm sm:grid-cols-3"><label className="relative sm:col-span-1"><Search size={16} className="absolute left-3 top-3 text-[#7C6E72]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or ID" className="w-full rounded-md border border-[#D2BCB0] bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#6E1F35]" /></label><select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-md border border-[#D2BCB0] bg-white px-3 py-2.5 text-sm"><option value="All categories">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></section>
    <section aria-label="Live product counts" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {[["Total products", products.length], ["Sale", saleCount], ["New arrivals", newArrivalCount], ["Hot articles", hotArticleCount]].map(([label, count]) => <div key={label} className="rounded-md border border-[#43111F]/10 bg-[#FFFDF8] px-4 py-3"><p className="text-xs text-[#7C6E72]">{label}</p><p className="mt-1 text-lg font-semibold text-[#43111F]">{count}</p></div>)}
    </section>
    <section aria-label="Live category product counts" className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] p-4 sm:grid-cols-4">
      {categoryCounts.map(({ name, count }) => <div key={name} className="flex justify-between gap-2 border-b border-[#E5D8D0] py-2 text-xs"><span className="text-[#5D5054]">{name}</span><span className="font-semibold text-[#43111F]">{count}</span></div>)}
    </section>
    {!editor && error && <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
    {filtered.length === 0 ? <div className="rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] px-5 py-12 text-center text-sm text-[#7C6E72]">No products match those filters.</div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <article key={product.id} className="overflow-hidden rounded-lg border border-[#43111F]/10 bg-[#FFFDF8] shadow-sm"><div className="flex gap-4 p-4"><img src={product.image} alt={product.name} className="h-24 w-24 shrink-0 rounded-md border border-[#E5D8D0] bg-white object-contain p-1" /><div className="min-w-0 flex-1"><h2 className="line-clamp-2 font-medium text-[#43111F]">{product.name}</h2><p className="mt-1 text-xs text-[#7C6E72]">{product.category || "Uncategorized"} Ã‚Â· PKR {Number(product.price || 0).toFixed(2)}</p></div></div><div className="grid grid-cols-3 gap-2 border-t border-[#E5D8D0] px-4 py-3 text-xs"><label className="flex items-center gap-1.5"><input type="checkbox" checked={Boolean(product.inStock)} onChange={() => toggle(product, "inStock")} />Stock</label><label className="flex items-center gap-1.5"><input type="checkbox" checked={Boolean(product.isSale)} onChange={() => toggle(product, "isSale")} />Sale</label><label className="flex items-center gap-1.5"><input type="checkbox" checked={Boolean(product.isNewArrival)} onChange={() => toggle(product, "isNewArrival")} />New</label></div><div className="flex items-center justify-between border-t border-[#E5D8D0] px-4 py-3"><span className="text-[11px] text-[#7C6E72]">ID: {product.id}</span><div className="flex gap-2"><button onClick={() => openEditor(product)} className="inline-flex items-center gap-1.5 rounded border border-[#6E1F35]/25 px-2.5 py-1.5 text-xs font-medium text-[#6E1F35] hover:bg-[#F7F1EC]"><Pencil size={13} />Edit</button><button onClick={() => removeProduct(product)} className="rounded border border-red-200 p-1.5 text-red-700 hover:bg-red-50" aria-label={`Delete ${product.name}`}><Trash2 size={14} /></button></div></div></article>)}</div>}
    {editor && <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditor(null); }}><section role="dialog" aria-modal="true" aria-labelledby="product-editor-title" className="flex h-[96vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-[#43111F]/15 bg-[#FFFDF8] shadow-2xl sm:h-[92vh] sm:rounded-xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5D8D0] bg-[#FFFDF8] px-5 py-4"><div><p className="text-[10px] font-semibold uppercase tracking-widest text-[#7C6E72]">Product record</p><h2 id="product-editor-title" className="font-serif text-xl font-bold text-[#43111F]">{editor.isExisting ? "Edit product" : "Add product"}</h2></div><button type="button" onClick={() => setEditor(null)} className="rounded p-2 text-[#7C6E72] hover:bg-[#F7F1EC]" aria-label="Close editor"><X size={18} /></button></div><form onSubmit={saveProduct} className="min-h-0 flex-1 overflow-y-auto grid gap-4 p-5 sm:grid-cols-2"><label className="text-xs font-semibold text-[#5D5054]">Name<input value={editor.name} onChange={(event) => setField("name", event.target.value)} className="mt-1.5 w-full rounded border border-[#D2BCB0] bg-white px-3 py-2.5 text-sm" required /></label><label className="text-xs font-semibold text-[#5D5054]">Price<input type="number" min="0" step="0.01" value={editor.price} onChange={(event) => setField("price", event.target.value)} className="mt-1.5 w-full rounded border border-[#D2BCB0] bg-white px-3 py-2.5 text-sm" /></label><label className="text-xs font-semibold text-[#5D5054]">Delivery Charges (PKR)<input type="number" min="0" step="1" value={editor.deliveryCharge} onChange={(event) => setField("deliveryCharge", event.target.value)} className="mt-1.5 w-full rounded border border-[#D2BCB0] bg-white px-3 py-2.5 text-sm" placeholder="Enter delivery charges" /></label><label className="text-xs font-semibold text-[#5D5054]">
  Category
  <select
    value={editor.category || ""}
    onChange={(event) => setField("category", event.target.value)}
    className="mt-1.5 w-full rounded border border-[#D2BCB0] bg-white px-3 py-2.5 text-sm"
  >
    <option value="">Select category</option>
    {categories.map((item) => <option key={item} value={item}>{item}</option>)}
  </select>
</label><div className="text-xs font-semibold text-[#5D5054]">
  <p>Product image</p>
  <div className="mt-1.5 rounded border border-dashed border-[#D2BCB0] bg-white p-3">
    {editor.image ? (
      <img
        src={editor.image}
        alt={editor.name || "Product preview"}
        className="h-40 w-full rounded-md border border-[#E5D8D0] bg-[#FFFDF8] object-contain p-2"
      />
    ) : (
      <div className="flex h-40 items-center justify-center rounded-md border border-[#E5D8D0] bg-[#FFFDF8] text-sm text-[#7C6E72]">
        No image selected
      </div>
    )}

    <div className="mt-3 flex flex-wrap items-center gap-2">
      <label
        htmlFor="product-image-upload"
        className="cursor-pointer rounded bg-[#6E1F35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#43111F]"
      >
        Choose image
      </label>

      <input
        id="product-image-upload"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageChange}
        className="hidden"
      />

      {editor.image && (
        <button
          type="button"
          onClick={() => {
            setField("image", "");
            setImageFileName("");
            setError("");
          }}
          className="rounded border border-[#D2BCB0] px-4 py-2 text-sm text-[#6E1F35] hover:bg-[#F7F1EC]"
        >
          Remove image
        </button>
      )}
    </div>

    <p className="mt-2 text-[11px] font-normal text-[#7C6E72]">
      {imageFileName || (editor.image ? "Current product image" : "JPG, PNG or WEBP Â· Maximum 3 MB")}
    </p>
  </div>
</div><section className="sm:col-span-2 rounded-lg border border-[#D2BCB0] bg-white p-4 space-y-4">
  <div>
    <h3 className="text-sm font-semibold text-[#43111F]">Product variations (optional)</h3>
    <p className="mt-1 text-xs text-[#7C6E72]">Add options such as Color, Size or Material. Each option can have its own price and stock.</p>
  </div>
  <label className="block text-xs font-semibold text-[#5D5054]">
    Variation name
    <input
      value={editor.variations?.name || ""}
      onChange={(event) => updateVariationName(event.target.value)}
      placeholder="e.g. Color, Size, Material"
      className="mt-1.5 w-full rounded border border-[#D2BCB0] bg-white px-3 py-2.5 text-sm"
    />
  </label>
  {(editor.variations?.options || []).map((option, index) => (
    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end rounded-md border border-[#E5D8D0] p-3">
      <label className="text-xs font-semibold text-[#5D5054]">
        Option
        <input
          value={option.value || ""}
          onChange={(event) => updateVariationOption(index, "value", event.target.value)}
          placeholder="e.g. Gold"
          className="mt-1.5 w-full rounded border border-[#D2BCB0] px-3 py-2 text-sm"
        />
      </label>
      <label className="text-xs font-semibold text-[#5D5054]">
        Price (PKR)
        <input
          type="number"
          min="0"
          step="0.01"
          value={option.price ?? ""}
          onChange={(event) => updateVariationOption(index, "price", event.target.value)}
          className="mt-1.5 w-full rounded border border-[#D2BCB0] px-3 py-2 text-sm"
        />
      </label>
      <label className="text-xs font-semibold text-[#5D5054]">
        Variation image (optional)
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => handleVariationImageChange(index, event)}
          className="mt-1.5 w-full text-xs"
        />
        {option.image ? (
          <img
            src={option.image}
            alt={`${option.value || "Variation"} preview`}
            className="mt-2 h-16 w-16 rounded border border-[#D2BCB0] bg-white object-contain"
          />
        ) : (
          <span className="mt-2 block text-[11px] font-normal text-[#7C6E72]">Choose JPG, PNG or WEBP</span>
        )}
      </label>
      <button
        type="button"
        onClick={() => removeVariationOption(index)}
        className="rounded border border-red-200 px-3 py-2 text-xs text-red-700 hover:bg-red-50"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addVariationOption}
    className="rounded border border-[#6E1F35]/30 px-3 py-2 text-xs font-semibold text-[#6E1F35] hover:bg-[#F7F1EC]"
  >
    + Add variation
  </button>
</section>
    <label className="text-xs font-semibold text-[#5D5054] sm:col-span-2">Description<textarea rows="4" value={editor.description || ""} onChange={(event) => setField("description", event.target.value)} className="mt-1.5 w-full resize-y rounded border border-[#D2BCB0] bg-white px-3 py-2.5 text-sm" /></label><div className="flex flex-wrap gap-x-5 gap-y-3 text-sm sm:col-span-2">{[["isSale", "Sale"], ["isNewArrival", "New arrival"], ["isHotArticle", "Hot article"]].map(([field, label]) => <label key={field} className="flex items-center gap-2"><input type="checkbox" checked={Boolean(editor[field])} onChange={(event) => setField(field, event.target.checked)} />{label}</label>)}</div>{error && <p role="alert" className="text-sm text-red-800 sm:col-span-2">{error}</p>}<div className="flex justify-end gap-2 border-t border-[#E5D8D0] pt-4 sm:col-span-2"><button type="button" onClick={() => setEditor(null)} className="rounded border border-[#D2BCB0] px-4 py-2 text-sm">Cancel</button><button type="submit" className="inline-flex items-center gap-2 rounded bg-[#6E1F35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#43111F]"><Save size={15} />Save product</button></div></form></section></div>}
  </main>;
}











