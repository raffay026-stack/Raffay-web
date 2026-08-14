import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PERFUMES, INITIAL_ORDERS } from "../mock";
import { toast } from "sonner";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("lixir_user");
    return saved ? JSON.parse(saved) : { name: "Alexander Wright", email: "alexander@lixirnoir.com", role: "Connoisseur VIP" };
  });

  const [products, setProducts] = useState(INITIAL_PERFUMES);
  
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("lixir_cart");
    return saved ? JSON.parse(saved) : [
      { ...INITIAL_PERFUMES[0], quantity: 1, selectedSize: "L" },
      { ...INITIAL_PERFUMES[4], quantity: 1, selectedSize: "M" }
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("lixir_orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [wishlist, setWishlist] = useState(["Perfume-1", "Perfume-5"]);
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
  }, [orders]);

  const addToCart = (product, size = "M", qty = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { ...Perfume, quantity: qty, selectedSize: size }];
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
      toast.success("Exclusive $25 Royal Connoisseur discount applied!");
      return true;
    } else if (code.toUpperCase() === "LUXURY50") {
      setDiscountAmount(50);
      setPromoCode("LUXURY50");
      toast.success("Grand Connoisseur $50 discount applied!");
      return true;
    } else {
      toast.error("Invalid or expired royal privilege code.");
      return false;
    }
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      items: [...cart],
      subtotal: orderDetails.subtotal,
      shipping: orderDetails.shipping,
      tax: orderDetails.tax,
      discount: orderDetails.discount,
      grandTotal: orderDetails.grandTotal,
      shippingAddress: orderDetails.shippingAddress,
      paymentMethod: orderDetails.paymentMethod
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setDiscountAmount(0);
    setPromoCode("");
    toast.success(`Order #${newOrder.id} successfully placed! Welcome to our inner circle.`);
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
  const shipping = subtotal > 300 ? 0 : 25;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const grandTotal = Number((subtotal + shipping + tax - discountAmount).toFixed(2));

  return (
    <AppContext.Provider value={{
      user,
      products,
      cart,
      orders,
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















