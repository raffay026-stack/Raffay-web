import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
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
    variations: product.variations && typeof product.variations === "object"
      ? product.variations
      : { name: "", options: [] },
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
    id: order.id || order.orderNumber || `ORD-${Date.now()}`,
    order_number: order.orderNumber || `ORD-${Date.now()}`,
    customer,
    shipping_address: shippingAddress,
    items: Array.isArray(order.items) ? order.items : [],
    payment_method: order.paymentMethod || "",
    notes: order.notes || "",
    subtotal: Number(order.subtotal) || 0,
    shipping: Number(order.shipping) || 0,
    tax: Number(order.tax) || 0,
    discount: Number(order.discount) || 0,
    grand_total: Number(order.grandTotal) || 0,
    status: "Pending",
    access_token_hash: order.accessTokenHash
  };
};

const rowToOrder = (row) => {
  row = row && typeof row === "object" ? row : {};
  const customer = row.customer && typeof row.customer === "object" && !Array.isArray(row.customer)
    ? row.customer
    : {};
  const shippingAddress =
    row.shipping_address && typeof row.shipping_address === "object" && !Array.isArray(row.shipping_address)
      ? row.shipping_address
      : customer;
  const totals = row.totals && typeof row.totals === "object" && !Array.isArray(row.totals)
    ? row.totals
    : {};

  return {
    id: row.id,
    orderNumber: row.order_number || row.id,
    date: row.date || row.created_at,
    status: row.status || "Processing",
    items: Array.isArray(row.items) ? row.items : [],
    subtotal: Number(totals.subtotal ?? row.subtotal) || 0,
    shipping: Number(totals.shipping ?? row.shipping) || 0,
    tax: Number(totals.tax ?? row.tax) || 0,
    discount: Number(totals.discount ?? row.discount) || 0,
    grandTotal: Number(totals.grandTotal ?? row.grand_total) || 0,
    totals: {
      subtotal: Number(totals.subtotal ?? row.subtotal) || 0,
      shipping: Number(totals.shipping ?? row.shipping) || 0,
      tax: Number(totals.tax ?? row.tax) || 0,
      discount: Number(totals.discount ?? row.discount) || 0,
      grandTotal: Number(totals.grandTotal ?? row.grand_total) || 0
    },
    customer: {
      ...shippingAddress,
      ...customer,
      fullName: customer.fullName || row.customer_name || shippingAddress.fullName || "",
      email: customer.email || row.customer_email || shippingAddress.email || "",
      phone: customer.phone || row.customer_phone || shippingAddress.phone || "",
      address: customer.address || shippingAddress.address || row.customer_address || ""
    },
    shippingAddress,
    customerName: row.customer_name || "",
    customerEmail: row.customer_email || "",
    customerPhone: row.customer_phone || "",
    customerAddress: row.customer_address || "",
    paymentMethod: row.payment_method || "",
    notes: row.notes || "",
    createdAt: row.created_at
  };
};

const AppContext = createContext();
const ADMIN_PRODUCTS_KEY = "fk_decore_admin_products";
const ADMIN_ORDERS_KEY = "fk_decore_admin_orders";

function safeSetLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(
      "FK DECORE: browser storage is full; keeping server data and continuing.",
      key,
      error
    );
    return false;
  }
}


const dispatchAdminDataEvent = (detail) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("fk-decore-admin-data", { detail }));
  }
};

const getFunctionErrorMessage = async (error) => {
  const response = error?.context;
  let responseBody;

  if (response && typeof response.clone === "function") {
    try {
      responseBody = await response.clone().json();
    } catch {
      try {
        responseBody = await response.clone().text();
      } catch {
        responseBody = null;
      }
    }
  }

  if (responseBody && typeof responseBody === "object") {
    const message = responseBody.error || responseBody.message;
    const details = responseBody.details;
    const detailMessage =
      typeof details === "string"
        ? details
        : details?.message || (details ? JSON.stringify(details) : "");

    if (message) {
      return `${message}${detailMessage ? ` (${detailMessage})` : ""}`;
    }
  } else if (typeof responseBody === "string" && responseBody.trim()) {
    return responseBody.trim();
  }

  return error?.message || "The email service returned an unknown error.";
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
  const ordersRefreshInFlight = useRef(null);

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
    safeSetLocalStorage("lixir_orders", JSON.stringify(orders));
    safeSetLocalStorage(ADMIN_ORDERS_KEY, JSON.stringify(orders));
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
      }
    };

    loadProductsFromSupabase();

    let productReloadTimer;
    const authListener = isSupabaseConfigured && supabase
      ? supabase.auth.onAuthStateChange(() => {
        window.clearTimeout(productReloadTimer);
        productReloadTimer = window.setTimeout(loadProductsFromSupabase, 0);
      }).data.subscription
      : null;

    return () => {
      mounted = false;
      window.clearTimeout(productReloadTimer);
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
      id: product.id || `fk-admin-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
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

    saveProducts(
      products.some((product) => product.id === createdProduct.id)
        ? products
        : [...products, createdProduct]
    );

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

    const currentOrder = orders.find((order) => order.id === orderId);
    const shouldSendStatusEmail =
      currentOrder &&
      currentOrder.status !== status;

    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      throw error;
    }

    const updatedOrder = currentOrder
      ? { ...currentOrder, status }
      : null;

    const nextOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );

    setOrders(nextOrders);
    safeSetLocalStorage(ADMIN_ORDERS_KEY, JSON.stringify(nextOrders));
    safeSetLocalStorage("lixir_orders", JSON.stringify(nextOrders));
    dispatchAdminDataEvent({ orders: nextOrders });

    if (shouldSendStatusEmail && updatedOrder) {
      const customer = updatedOrder.customer || {};
      const totals = updatedOrder.totals || {
        subtotal: updatedOrder.subtotal,
        shipping: updatedOrder.shipping,
        tax: updatedOrder.tax,
        discount: updatedOrder.discount,
        grandTotal: updatedOrder.grandTotal
      };
      const { error: emailError } = await supabase.functions.invoke(
        "send-order-confirmation",
        {
          body: {
            order: {
              ...updatedOrder,
              orderNumber: updatedOrder.orderNumber || updatedOrder.id,
              customer: {
                ...customer,
                fullName: customer.fullName || updatedOrder.customerName || "",
                email: customer.email || updatedOrder.customerEmail || "",
                phone: customer.phone || updatedOrder.customerPhone || "",
                address: customer.address || updatedOrder.customerAddress || "",
                city: customer.city || updatedOrder.shippingAddress?.city || ""
              },
              items: Array.isArray(updatedOrder.items) ? updatedOrder.items : [],
              totals,
              status
            }
          },
        }
      );

      if (emailError) {
        const emailReason = await getFunctionErrorMessage(emailError);
        throw new Error(
          `Order status was updated to ${status}, but the customer email could not be sent: ${emailReason}`
        );
      }
    }
  };

  const refreshOrders = useCallback(() => {
    if (ordersRefreshInFlight.current) {
      return ordersRefreshInFlight.current;
    }

    const request = (async () => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error("Supabase is not configured.");
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!Array.isArray(data)) {
        throw new Error("Supabase returned an invalid orders response.");
      }

      const loadedOrders = data.map(rowToOrder);
      setOrders(loadedOrders);
      safeSetLocalStorage("lixir_orders", JSON.stringify(loadedOrders));
      safeSetLocalStorage(ADMIN_ORDERS_KEY, JSON.stringify(loadedOrders));
      dispatchAdminDataEvent({ orders: loadedOrders });
      return loadedOrders;
    })();

    ordersRefreshInFlight.current = request;
    request.finally(() => {
      if (ordersRefreshInFlight.current === request) {
        ordersRefreshInFlight.current = null;
      }
    }).catch(() => {});

    return request;
  }, []);

  const addToCart = (product, size = "M", qty = 1) => {
    const variation = product.variations && Array.isArray(product.variations.options)
      ? product.variations
      : null;
    const options = variation?.options || [];
    const selectedOption =
      options.find((option) => String(option.value) === String(size)) ||
      options[0] ||
      null;
    const selectedValue = selectedOption
      ? String(selectedOption.value)
      : String(size || "M");

    const hasOptionPrice = selectedOption &&
      selectedOption.price !== undefined &&
      selectedOption.price !== null &&
      selectedOption.price !== "";

    const cartProduct = selectedOption
      ? {
          ...product,
          image: selectedOption.image || product.image,
          price: hasOptionPrice
            ? Math.max(0, Number(selectedOption.price) || 0)
            : Number(product.price) || 0,
          selectedVariationName: variation?.name || "Option",
          selectedVariationValue: selectedValue
        }
      : product;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedValue
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      }

      return [...prevCart, {
        ...cartProduct,
        quantity: qty,
        selectedSize: selectedValue
      }];
    });

    toast.success(
      selectedOption
        ? `Added ${product.name} (${variation?.name || "Option"}: ${selectedValue}) to your shopping cart.`
        : `Added ${product.name} (${selectedValue}) to your shopping cart.`
    );
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
    const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const customer = orderDetails.customer || {};

    if (!isSupabaseConfigured || !supabase) {
      throw new Error("Supabase is not configured.");
    }

    if (!cart.length) {
      throw new Error("Your cart is empty.");
    }

    const accessToken = crypto.randomUUID() + crypto.randomUUID();
    const accessTokenHashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(accessToken)
    );
    const accessTokenHash = Array.from(new Uint8Array(accessTokenHashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    const newOrder = {
      id: orderNumber,
      orderNumber,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
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
      customerAddress: [
        customer.address,
        customer.city,
        customer.postalCode,
        customer.country
      ].filter(Boolean).join(", "),
      paymentMethod: orderDetails.paymentMethod || "Online Payment",
      notes: orderDetails.notes || "",
      accessTokenHash
    };

    const { error } = await supabase
      .from("orders")
      .insert(orderToRow(newOrder));

    if (error) {
      console.error("Order save failed:", error);
      throw error;
    }

    setOrders((prev) => {
      const nextOrders = [newOrder, ...prev];
      safeSetLocalStorage("lixir_orders", JSON.stringify(nextOrders));
      safeSetLocalStorage(ADMIN_ORDERS_KEY, JSON.stringify(nextOrders));
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

































