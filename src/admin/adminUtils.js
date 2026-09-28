export const getAdminOrders = (orders = []) => orders;

export const customerName = (order) =>
  order.customer?.fullName ||
  order.shippingAddress?.fullName ||
  order.customerName ||
  "";

export const customerEmail = (order) =>
  order.customer?.email ||
  order.shippingAddress?.email ||
  order.email ||
  order.customerEmail ||
  "";

export const customerPhone = (order) =>
  order.customer?.phone ||
  order.shippingAddress?.phone ||
  order.phone ||
  order.customerPhone ||
  "";

export const customerAddress = (order) => {
  const address = { ...(order.shippingAddress || {}), ...(order.customer || {}) };
  const fullAddress = [
    address.address,
    address.city,
    address.postalCode,
    address.country
  ].filter(Boolean).join(", ");
  return fullAddress || order.customerAddress || "";
};

export const orderTotal = (order) =>
  Number(order.grandTotal ?? order.total ?? 0) || 0;
