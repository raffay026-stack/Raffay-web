import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

const productToRow = (product) => {
  const row = {
    id: product.id,
    name: product.name || "",
    price: Number(product.price) || 0,
    delivery_charge: Number(product.deliveryCharge) || 0,
    description: product.description || "",
    category: product.category || "",
    image: product.image || "",
    in_stock: product.inStock !== false,
    is_sale: product.isSale === true,
    is_new_arrival: product.isNewArrival === true,
    is_hot_article: product.isHotArticle === true,
    brand: product.brand || "FK Decore",
    rating: Number(product.rating) || 0,
    reviews_count: Number(product.reviewsCount) || 0,
    sizes: Array.isArray(product.sizes) ? product.sizes : ["One Size"],
    top_notes: Array.isArray(product.topNotes) ? product.topNotes : [],
    middle_notes: Array.isArray(product.middleNotes) ? product.middleNotes : [],
    base_notes: Array.isArray(product.baseNotes) ? product.baseNotes : [],
    is_bestseller: product.isBestseller === true,
    is_royal_oud: product.isRoyalOud === true,
    featured: product.featured === true,
    updated_at: new Date().toISOString()
  };

  if (product.createdAt) {
    row.created_at = product.createdAt;
  }

  return row;
};

const rowToProduct = (row) => ({
  ...row,
  inStock: row.in_stock,
  isSale: row.is_sale,
  isNewArrival: row.is_new_arrival,
  isHotArticle: row.is_hot_article,
  reviewsCount: row.reviews_count,
  deliveryCharge: Number(row.delivery_charge) || 0,
  topNotes: row.top_notes || [],
  middleNotes: row.middle_notes || [],
  baseNotes: row.base_notes || [],
  isBestseller: row.is_bestseller,
  isRoyalOud: row.is_royal_oud,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});
const orderToRow = (order) => {
  const customer = order.customer || {};
  const shippingAddress = order.shippingAddress || customer;

  return {
    id: order.id,
    order_number: order.orderNumber || order.id,
    date: order.date || new Date().toISOString().split("T")[0],
    status: order.status || "Processing",
    items: Array.isArray(order.items) ? order.items : [],
    subtotal: Number(order.subtotal) || 0,
    shipping: Number(order.shipping) || 0,
    tax: Number(order.tax) || 0,
    discount: Number(order.discount) || 0,
    grand_total: Number(order.grandTotal) || 0,
    customer,
    shipping_address: shippingAddress,
    customer_name: customer.fullName || "",
    customer_email: customer.email || "",
    customer_phone: customer.phone || "",
    customer_address: [
      customer.address,
      customer.city,
      customer.postalCode,
      customer.country
    ].filter(Boolean).join(", "),
    payment_method: order.paymentMethod || "",
    notes: order.notes || ""
  };
};

const rowToOrder = (row) => ({
  id: row.id,
  orderNumber: row.order_number || row.id,
  date: row.date,
  status: row.status || "Processing",
  items: row.items || [],
  subtotal: Number(row.subtotal) || 0,
  shipping: Number(row.shipping) || 0,
  tax: Number(row.tax) || 0,
  discount: Number(row.discount) || 0,
  grandTotal: Number(row.grand_total) || 0,
  customer: {
    ...(row.shipping_address || {}),
    ...(row.customer || {}),
    fullName: row.customer?.fullName || row.customer_name || row.shipping_address?.fullName || "",
    email: row.customer?.email || row.customer_email || row.shipping_address?.email || "",
    phone: row.customer?.phone || row.customer_phone || row.shipping_address?.phone || "",
    address: row.customer?.address || row.shipping_address?.address || row.customer_address || ""
  },
  shippingAddress: row.shipping_address || row.customer || {},
  customerName: row.customer_name || "",
  customerEmail: row.customer_email || "",
  customerPhone: row.customer_phone || "",
  customerAddress: row.customer_address || "",
  paymentMethod: row.payment_method || "",
  notes: row.notes || "",
  createdAt: row.created_at
});

const AppContext = createContext();
const ADMIN_PRODUCTS_KEY = "fk_decore_admin_products";
const ADMIN_ORDERS_KEY = "fk_decore_admin_orders";

const dispatchAdminDataEvent = (detail) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("fk-decore-admin-data", { detail }));
  }
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("lixir_user");
    return saved ? JSON.parse(saved) : { name: "", email: "alexander@lixirnoir.com", role: "Connoisseur VIP" };
  });

  const [products, setproducts] = useState([]);
  
  const [cart, setCart] = useState(() => {
    return [];
  });

  const [orders, setOrders] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem("lixir_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("lixir_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("lixir_orders", JSON.stringify(orders));
    localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    let mounted = true;
    localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify([]));
    localStorage.setItem("lixir_cart", JSON.stringify([]));
    setCart([]);

    const loadProductsFromSupabase = async () => {
      if (!isSupabaseConfigured || !supabase) {
        if (mounted) setproducts([]);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: true });
        if (error) throw error;

        const loadedProducts = (data || []).map(rowToProduct);
        if (mounted) {
          setproducts(loadedProducts);
          localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(loadedProducts));
          dispatchAdminDataEvent({ products: loadedProducts });
        }
      } catch (error) {
        console.error("Supabase products load failed:", error);
        if (mounted) {
          setproducts([]);
          localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify([]));
        }
      }
    };

    loadProductsFromSupabase();

    const authListener = isSupabaseConfigured && supabase
      ? supabase.auth.onAuthStateChange(() => window.setTimeout(loadProductsFromSupabase, 0)).data.subscription
      : null;

    return () => {
      mounted = false;
      authListener?.unsubscribe();
    };
  }, []);
  const saveProducts = (nextProducts) => {
    setproducts(nextProducts);
    localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(nextProducts));
    dispatchAdminDataEvent({ products: nextProducts });
  };

  const updateProduct = async (productId, updates) => {
    const currentProduct = products.find((product) => product.id === productId);

    if (!currentProduct) {
      throw new Error("Product not found.");
    }

    const nextProduct = {
      ...currentProduct,
      ...updates,
      id: productId
    };

    const { data, error } = await supabase
      .from("products")
      .update(productToRow(nextProduct))
      .eq("id", productId)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    const updatedProduct = rowToProduct(data);

    saveProducts(
      products.map((product) =>
        product.id === productId ? updatedProduct : product
      )
    );

    return updatedProduct;
  };

  const addProduct = async (product) => {
    const nextProduct = {
      ...product,
      id: product.id || `fk-admin-${Date.now()}`
    };

    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData?.session) {
      throw new Error("Admin authentication is required before adding products.");
    }

    const { data, error } = await supabase
      .from("products")
      .insert(productToRow(nextProduct))
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    const createdProduct = rowToProduct(data);

    saveProducts([...products, createdProduct]);

    return createdProduct;
  };

  const deleteProduct = async (productId) => {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData?.session) {
      throw new Error("Admin authentication is required before deleting products.");
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      throw error;
    }

    saveProducts(products.filter((product) => product.id !== productId));
  };
  const deleteAllProducts = async () => {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData?.session) {
      throw new Error("Admin authentication is required before deleting products.");
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .not("id", "is", null);

    if (error) {
      throw error;
    }

    saveProducts([]);
  };


  const updateOrderStatus = async (orderId, status) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("Supabase is not configured.");
    }

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      throw error;
    }

    const nextOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(nextOrders);
    localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(nextOrders));
    localStorage.setItem("lixir_orders", JSON.stringify(nextOrders));
    dispatchAdminDataEvent({ orders: nextOrders });
  };

  const refreshOrders = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("Supabase is not configured.");
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (Array.isArray(data)) {
      const loadedOrders = data.map(rowToOrder);
      setOrders(loadedOrders);
      localStorage.setItem("lixir_orders", JSON.stringify(loadedOrders));
      localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(loadedOrders));
      dispatchAdminDataEvent({ orders: loadedOrders });
      return loadedOrders;
    }

    return orders;
  }, []);

  const addToCart = (product, size = "M", qty = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity: qty, selectedSize: size }];
      }
    });
    toast.success(`Added ${product.name} (${size}) to your shopping cart.`);
  };

  const updateCartQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart(prev => prev.map(item => item.id === id && item.selectedSize === size ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
    toast.info("Item removed from cart.");
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        toast.info("Removed from your favorites.");
        return prev.filter(item => item !== id);
      } else {
        toast.success("Added to your favorites.");
        return [...prev, id];
      }
    });
  };

  const applyPromoCode = (code) => {
    if (code.toUpperCase() === "ROYAL25") {
      setDiscountAmount(25);
      setPromoCode("ROYAL25");
      toast.success("Exclusive PKR 25 Royal Connoisseur discount applied!");
      return true;
    } else if (code.toUpperCase() === "LUXURY50") {
      setDiscountAmount(50);
      setPromoCode("LUXURY50");
      toast.success("Grand Connoisseur PKR 50 discount applied!");
      return true;
    } else {
      toast.error("Invalid or expired royal privilege code.");
      return false;
    }
  };

  const placeOrder = async (orderDetails) => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const customer = orderDetails.customer || {};

    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      items: [...cart],
      subtotal: Number(orderDetails.subtotal) || 0,
      shipping: Number(orderDetails.shipping) || 0,
      tax: Number(orderDetails.tax) || 0,
      discount: Number(orderDetails.discount) || 0,
      grandTotal: Number(orderDetails.grandTotal) || 0,
      customer,
      shippingAddress: orderDetails.shippingAddress || customer,
      customerName: customer.fullName || "",
      customerEmail: customer.email || "",
      customerPhone: customer.phone || "",
      customerAddress: [customer.address, customer.city, customer.postalCode, customer.country].filter(Boolean).join(", "),
      paymentMethod: orderDetails.paymentMethod || "Online Payment",
      notes: orderDetails.notes || ""
    };

    if (!isSupabaseConfigured || !supabase) {
      throw new Error("Supabase is not configured.");
    }

    const { error } = await supabase
      .from("orders")
      .insert(orderToRow(newOrder));

    if (error) {
      console.error("Order save failed:", error);
      throw error;
    }

    setOrders(prev => {
      const nextOrders = [newOrder, ...prev];
      localStorage.setItem("lixir_orders", JSON.stringify(nextOrders));
      localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(nextOrders));
      dispatchAdminDataEvent({ orders: nextOrders });
      return nextOrders;
    });

    clearCart();
    setDiscountAmount(0);
    setPromoCode("");

    toast.success(`Order #${newOrder.orderNumber} successfully placed!`);
    return newOrder;
  };

  const loginUser = (email, name) => {
    setUser({ name: name || email.split("@")[0], email, role: "Connoisseur VIP" });
    toast.success(`Welcome back, ${name || email.split("@")[0]}`);
  };

  const logoutUser = () => {
    setUser(null);
    toast.info("Logged out from private salon session.");
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = Number(
    [...new Map(
      cart.map((item) => {
        const liveProduct = products.find(
          (product) => product.id === (item.id ?? item.productId)
        );

        return [
          item.id ?? item.productId ?? item.name,
          Number(liveProduct?.deliveryCharge ?? item.deliveryCharge ?? 0)
        ];
      })
    ).values()]
      .reduce((sum, fee) => sum + fee, 0)
      .toFixed(2)
  );
  const tax = Number((subtotal * 0.08).toFixed(2));
  const grandTotal = Number((subtotal + shipping + tax - discountAmount).toFixed(2));

  return (
    <AppContext.Provider value={{
      user,
      products,
      updateProduct,
      addProduct,
      deleteProduct,

      deleteAllProducts,
      cart,
      orders,
      refreshOrders,
      updateOrderStatus,
      wishlist,
      promoCode,
      discountAmount,
      subtotal,
      shipping,
      tax,
      grandTotal,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      applyPromoCode,
      placeOrder,
      loginUser,
      logoutUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);






























