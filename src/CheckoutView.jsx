import React, { useContext, useMemo, useState } from "react";
import AppContext from "./AppContext";

const CheckoutView = () => {
  const appContext = useContext(AppContext) || {};
  const cartItems =
    appContext.cartItems ||
    appContext.cart?.items ||
    appContext.cart ||
    [];

  const shippingFee = Number(
    appContext.shippingFee ?? appContext.shippingCost ?? 0
  );
  const discountAmount = Number(
    appContext.discountAmount ?? appContext.discount ?? 0
  );
  const currency = appContext.currency || "USD";

  const subtotalAmount = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const price = Number(item.price ?? item.unitPrice ?? 0);
        const quantity = Number(item.quantity ?? item.qty ?? 1);
        return sum + price * quantity;
      }, 0),
    [cartItems]
  );

  const subtotal = Number(appContext.cartSubtotal ?? subtotalAmount);
  const total = Number(
    appContext.cartTotal ?? subtotal + shippingFee - discountAmount
  );

  const savedCustomer = appContext.customer || appContext.user || {};
  const [formFields, setFormFields] = useState({
    firstName: savedCustomer.firstName || "",
    lastName: savedCustomer.lastName || "",
    email: savedCustomer.email || "",
    phone: savedCustomer.phone || "",
    address1: savedCustomer.address1 || "",
    address2: savedCustomer.address2 || "",
    city: savedCustomer.city || "",
    postalCode: savedCustomer.postalCode || savedCustomer.zip || "",
    country: savedCustomer.country || "",
    paymentMethod: appContext.defaultPaymentMethod || "card",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formatPrice = (value) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      return String(value || "");
    }
    return amount.toLocaleString(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    });
  };

  const handleChange = (key) => (event) => {
    const value = event.target.value;
    setFormFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formFields.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }
    if (!formFields.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }
    if (!formFields.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formFields.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }
    if (!formFields.address1.trim()) {
      nextErrors.address1 = "Street address is required.";
    }
    if (!formFields.city.trim()) {
      nextErrors.city = "City or area is required.";
    }
    if (!formFields.postalCode.trim()) {
      nextErrors.postalCode = "Postal code is required.";
    }
    if (!formFields.country.trim()) {
      nextErrors.country = "Country is required.";
    }
    if (!formFields.paymentMethod.trim()) {
      nextErrors.paymentMethod = "Select a payment method.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const orderPayload = {
      customer: {
        firstName: formFields.firstName,
        lastName: formFields.lastName,
        email: formFields.email,
        phone: formFields.phone,
        address1: formFields.address1,
        address2: formFields.address2,
        city: formFields.city,
        postalCode: formFields.postalCode,
        country: formFields.country,
      },
      paymentMethod: formFields.paymentMethod,
      notes: formFields.notes,
      items: cartItems,
      totals: {
        subtotal,
        shipping: shippingFee,
        discount: discountAmount,
        total,
      },
    };

    try {
      if (typeof appContext.createOrder === "function") {
        if (appContext.createOrder.length === 0) {
          await appContext.createOrder();
        } else {
          await appContext.createOrder(orderPayload);
        }
      } else if (typeof appContext.placeOrder === "function") {
        if (appContext.placeOrder.length === 0) {
          await appContext.placeOrder();
        } else {
          await appContext.placeOrder(orderPayload);
        }
      }
      setSuccessMessage(
        "Your order has been submitted. Your premium style journey is now in motion."
      );
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit:
          error?.message ||
          "Unable to place your order right now. Please try again." ,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentOptions = [
    {
      id: "card",
      label: "Credit / Debit card",
      description: "Secure payment with encrypted card authorization.",
    },
    {
      id: "cash",
      label: "Cash on Delivery",
      description: "Pay when your fragrance arrives at your door.",
    },
  ];

  return (
    <main className="checkout-view min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,215,180,0.1),_transparent_45%),linear-gradient(to_bottom,_#020617,_#08111e)] px-4 py-10 text-slate-100">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9AE9D8]/70">
            Luxury Checkout
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
            Secure your signature fragrance
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Review your order details and submit with confidence. Every detail is curated for a premium Perfume experience.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.8fr_1.2fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-[32px] border border-slate-700/75 bg-slate-950/85 p-8 shadow-[0_32px_90px_rgba(15,23,42,0.35)] backdrop-blur-xl"
          >
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-[#9AE9D8]/70">
                      Personal Details
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-100">
                      Contact & delivery
                    </h2>
                  </div>
                  <p className="text-sm text-slate-400">
                    Elegant form, premium finish.
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {[
                    { key: "firstName", label: "First name" },
                    { key: "lastName", label: "Last name" },
                  ].map((field) => (
                    <label
                      key={field.key}
                      className="space-y-2 text-sm text-slate-200"
                    >
                      <span className="font-medium text-slate-300">
                        {field.label}
                      </span>
                      <input
                        type="text"
                        name={field.key}
                        value={formFields[field.key]}
                        onChange={handleChange(field.key)}
                        className="w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                        placeholder={field.label}
                      />
                      {errors[field.key] && (
                        <p className="text-xs text-rose-300">
                          {errors[field.key]}
                        </p>
                      )}
                    </label>
                  ))}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-200">
                    <span className="font-medium text-slate-300">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formFields.email}
                      onChange={handleChange("email")}
                      className="w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-300">{errors.email}</p>
                    )}
                  </label>

                  <label className="space-y-2 text-sm text-slate-200">
                    <span className="font-medium text-slate-300">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formFields.phone}
                      onChange={handleChange("phone")}
                      className="w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-300">{errors.phone}</p>
                    )}
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-[#9AE9D8]/70">
                      Delivery address
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-100">
                      Elegant shipping details
                    </h2>
                  </div>
                  <p className="text-sm text-slate-400">
                    Delivered with care, just for you.
                  </p>
                </div>

                <div className="mt-6 space-y-5">
                  <label className="space-y-2 text-sm text-slate-200">
                    <span className="font-medium text-slate-300">Street address</span>
                    <input
                      type="text"
                      name="address1"
                      value={formFields.address1}
                      onChange={handleChange("address1")}
                      className="w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                      placeholder="123 Signature Avenue"
                    />
                    {errors.address1 && (
                      <p className="text-xs text-rose-300">{errors.address1}</p>
                    )}
                  </label>

                  <label className="space-y-2 text-sm text-slate-200">
                    <span className="font-medium text-slate-300">Apartment, studio, or suite</span>
                    <input
                      type="text"
                      name="address2"
                      value={formFields.address2}
                      onChange={handleChange("address2")}
                      className="w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                      placeholder="Optional"
                    />
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-slate-200">
                      <span className="font-medium text-slate-300">City / Area</span>
                      <input
                        type="text"
                        name="city"
                        value={formFields.city}
                        onChange={handleChange("city")}
                        className="w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                        placeholder="Paris"
                      />
                      {errors.city && (
                        <p className="text-xs text-rose-300">{errors.city}</p>
                      )}
                    </label>

                    <label className="space-y-2 text-sm text-slate-200">
                      <span className="font-medium text-slate-300">Postal code</span>
                      <input
                        type="text"
                        name="postalCode"
                        value={formFields.postalCode}
                        onChange={handleChange("postalCode")}
                        className="w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                        placeholder="75001"
                      />
                      {errors.postalCode && (
                        <p className="text-xs text-rose-300">{errors.postalCode}</p>
                      )}
                    </label>
                  </div>

                  <label className="space-y-2 text-sm text-slate-200">
                    <span className="font-medium text-slate-300">Country</span>
                    <input
                      type="text"
                      name="country"
                      value={formFields.country}
                      onChange={handleChange("country")}
                      className="w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                      placeholder="France"
                    />
                    {errors.country && (
                      <p className="text-xs text-rose-300">{errors.country}</p>
                    )}
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-[#9AE9D8]/70">
                      Payment method
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-100">
                      Choose how you'd like to pay
                    </h2>
                  </div>
                  <p className="text-sm text-slate-400">
                    Trusted payment options.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {paymentOptions.map((option) => {
                    const selected = formFields.paymentMethod === option.id;
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer flex-col gap-3 rounded-3xl border px-5 py-4 transition duration-200 ${
                          selected
                            ? "border-[#2FB59A] bg-[#2FB59A]/10 shadow-[0_10px_40px_rgba(251,191,36,0.12)]"
                            : "border-slate-700/80 bg-slate-950/90 hover:border-slate-500"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-base font-semibold text-slate-100">
                              {option.label}
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                              {option.description}
                            </p>
                          </div>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={option.id}
                            checked={selected}
                            onChange={handleChange("paymentMethod")}
                            className="h-5 w-5 accent-[#2FB59A]"
                          />
                        </div>
                      </label>
                    );
                  })}
                  {errors.paymentMethod && (
                    <p className="text-xs text-rose-300">
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>

                <label className="mt-6 block text-sm text-slate-200">
                  <span className="font-medium text-slate-300">
                    Order notes
                  </span>
                  <textarea
                    name="notes"
                    value={formFields.notes}
                    onChange={handleChange("notes")}
                    rows={4}
                    className="mt-3 w-full rounded-3xl border border-slate-700/90 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-[#2FB59A]/80 focus:ring-2 focus:ring-[#2FB59A]/20"
                    placeholder="Special delivery instructions or fragrance preferences"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl bg-slate-900/80 p-6 text-center text-slate-400 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08)]">
              <p className="text-sm text-slate-300">
                Your order is protected by secure encryption. No payment details are stored on this page.
              </p>
              {errors.submit && (
                <p className="text-sm text-rose-300">{errors.submit}</p>
              )}
              {successMessage && (
                <p className="text-sm text-emerald-300">{successMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#2FB59A] px-8 py-4 text-base font-semibold text-[#9AE9D8] shadow transition duration-200 hover:bg-[#2FB59A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Processing order..." : "Place order"}
            </button>
          </form>

          <aside className="flex flex-col gap-6 rounded-[32px] border border-slate-700/75 bg-slate-950/85 p-6 shadow-[0_32px_90px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-[#9AE9D8]/70">
                    Order summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-100">
                    Review your selection
                  </h2>
                </div>
                <p className="text-sm text-slate-400">
                  {cartItems.length} item{cartItems.length === 1 ? "" : "s"}
                </p>
              </div>

              <ul className="mt-6 space-y-4">
                {cartItems.map((item, index) => (
                  <li
                    key={item.id ?? item.sku ?? `${item.name}-${index}`}
                    className="grid gap-3 rounded-3xl border border-slate-700/80 bg-slate-950/90 p-4 sm:grid-cols-[72px_minmax(0,_1fr)] sm:items-center"
                  >
                    <div className="aspect-square overflow-hidden rounded-3xl bg-slate-800">
                      {item.image || item.thumbnail || item.imageUrl ? (
                        <img
                          src={item.image || item.thumbnail || item.imageUrl}
                          alt={item.name || item.title || "Product image"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                          {item.name ? item.name.charAt(0) : "S"}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 text-sm">
                      <p className="font-semibold text-slate-100">
                        {item.name || item.title || "Fragrance"}
                      </p>
                      <p className="mt-1 text-slate-400">
                        Qty {item.quantity ?? item.qty ?? 1}
                      </p>
                      <p className="mt-2 text-sm text-[#9AE9D8]">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6">
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Shipping</span>
                  <span>
                    {shippingFee > 0
                      ? formatPrice(shippingFee)
                      : "Free shipping"}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-300">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-700/70 pt-6">
                <span className="text-base font-semibold text-slate-200">
                  Total
                </span>
                <span className="text-2xl font-semibold text-[#9AE9D8]">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 text-sm text-slate-400">
              <p className="mb-3 font-medium text-slate-100">
                Crafted for a premium checkout experience
              </p>
              <p className="leading-6">
                Your order will be packaged with care and shipped with priority handling. No hidden fees, just a refined finishing touch.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutView;















