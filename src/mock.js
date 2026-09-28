export const PERFUME_BRANDS = [
  "Tom Ford",
  "Creed",
  "Byredo",
  "Roja Parfums",
  "Maison Francis Kurkdjian",
  "Clive Christian",
  "Xerjoff",
  "Parfums de Marly",
  "Amouage",
  "Kilian Paris"
];

export const PERFUME_CATEGORIES = [
  "Oud & Woody",
  "Oriental Spice",
  "Floral",
  "Citrus Fresh",
  "Fresh Spicy",
  "Sensual Floral",
  "Gourmand Amber",
  "Aquatic & Fresh"
];

export const INITIAL_PERFUMES = [];

export const INITIAL_ORDERS = [
  {
    id: "ORD-98421",
    date: "2026-06-12",
    status: "Delivered",
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    grandTotal: 0,
    shippingAddress: {
      fullName: "",
      address: "742 Evergreen Terrace, Suite 400",
      city: "New York",
      postalCode: "10021",
      country: "United States"
    },
    paymentMethod: "Credit Card (•••• 4242)"
  },
  {
    id: "ORD-97512",
    date: "2026-06-01",
    status: "Shipped",
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    grandTotal: 0,
    shippingAddress: {
      fullName: "",
      address: "742 Evergreen Terrace, Suite 400",
      city: "New York",
      postalCode: "10021",
      country: "United States"
    },
    paymentMethod: "Online Payment (Apple Pay)"
  }
];

export const SCENT_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What time of day do you intend to wear your signature scent?",
    options: [
      { label: "Enigmatic Evenings & Galas", category: "Oud & Woody" },
      { label: "Crisp Mornings & Daytime Elegance", category: "Fresh Citrus" },
      { label: "Romantic Dinners & Intimate Gatherings", category: "Sensual Floral" },
      { label: "All-Day Statement of Power", category: "Oriental Spice" }
    ]
  },
  {
    id: 2,
    question: "Which primary botanical facet captivates your senses most?",
    options: [
      { label: "Resinous Woods & Aged Agarwood (Oud)", category: "Oud & Woody" },
      { label: "Rare Spices, Saffron & Warm Amber", category: "Oriental Spice" },
      { label: "Velvety Petals & Blooming White Florals", category: "Sensual Floral" },
      { label: "Sparkling Citrus, Bergamot & Sea Salt", category: "Fresh Citrus" }
    ]
  },
  {
    id: 3,
    question: "How do you prefer your fragrance to project upon entering a room?",
    options: [
      { label: "A commanding, hypnotic sillage that lingers", category: "Extrait de Parfum" },
      { label: "An opulent yet intimate warmth close to the skin", category: "Gourmand Amber" },
      { label: "A vibrant, refreshing burst of crystalline clarity", category: "Fresh Citrus" },
      { label: "A sophisticated mystery that unfolds slowly", category: "Oud & Woody" }
    ]
  }
];








