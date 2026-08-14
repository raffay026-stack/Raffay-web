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
  "Sensual Floral",
  "Fresh Citrus",
  "Gourmand Amber",
  "Extrait de Parfum"
];

export const INITIAL_PERFUMES = [
  {
    id: "perfume-1",
    name: "Oud Wood ImpÃ©rial",
    brand: "Tom Ford",
    category: "Oud & Woody",
    price: 395,
    rating: 4.9,
    reviewsCount: 342,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    description: "Rare oud wood, rose wood and cardamom give way to a smoky blend of rare oud wood, sandalwood and vetiver. Tonka bean and amber add warmth and sensuality.",
    topNotes: ["Cardamom", "Rosewood", "Chinese Pepper"],
    middleNotes: ["Oud Wood", "Sandalwood", "Vetiver"],
    baseNotes: ["Tonka Bean", "Amber", "Vanilla"],
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    isBestseller: true,
    isRoyalOud: true,
    featured: true
  },
  {
    id: "perfume-2",
    name: "Aventus Royal Extrait",
    brand: "Creed",
    category: "Fresh Citrus",
    price: 495,
    rating: 5.0,
    reviewsCount: 890,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    description: "The legendary fragrance celebrating strength, power and success. Sensational notes of Calabrian bergamot and French apple fused with royal jasmine and rich ambergris.",
    topNotes: ["Lemon", "Pink Pepper", "Italian Apple", "Bergamot"],
    middleNotes: ["Pineapple", "Jasmine", "Indonesian Patchouli"],
    baseNotes: ["Birch", "Ambergris", "Cedarwood", "Musk"],
    sizes: ["50ml", "100ml", "250ml Flacon"],
    inStock: true,
    isBestseller: true,
    isRoyalOud: false,
    featured: true
  },
  {
    id: "perfume-3",
    name: "Gypsy Water Elixir",
    brand: "Byredo",
    category: "Sensual Floral",
    price: 320,
    rating: 4.8,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    description: "An ode to the beauty of gypsy culture, its unique custom, vibrant beliefs and distinguished way of living. A woody scent born of a picnic in the pine forests of faraway lands.",
    topNotes: ["Bergamot", "Lemon", "Pepper", "Juniper Berries"],
    middleNotes: ["Incense", "Pine Needle", "Orris"],
    baseNotes: ["Amber", "Vanilla", "Sandalwood"],
    sizes: ["50ml", "100ml"],
    inStock: true,
    isBestseller: false,
    isRoyalOud: false,
    featured: true
  },
  {
    id: "perfume-4",
    name: "Apex Roja Sultan",
    brand: "Roja Parfums",
    category: "Oriental Spice",
    price: 550,
    rating: 4.9,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    description: "Crafted for the ultimate connoisseur. A breathtaking symphony of Taif rose, saffron, and aged Indian oud aged for over 25 years in oak casks.",
    topNotes: ["Mandarin", "Bergamot", "Lemon", "Grapefruit"],
    middleNotes: ["Cistus", "Jasmine de Grasse", "Taif Rose"],
    baseNotes: ["Sandalwood", "Aged Oud", "Leather", "Ambergris", "Musk"],
    sizes: ["50ml", "100ml"],
    inStock: true,
    isBestseller: true,
    isRoyalOud: true,
    featured: true
  },
  {
    id: "perfume-5",
    name: "Baccarat Rouge 540 Extrait",
    brand: "Maison Francis Kurkdjian",
    category: "Gourmand Amber",
    price: 435,
    rating: 4.9,
    reviewsCount: 1250,
    image: "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
    description: "Luminous and sophisticated, Baccarat Rouge 540 lays on the skin like an amber, floral and woody breeze. A poetic alchemy where the aerial notes of jasmine and the radiance of saffron carry facet-rich ambergris.",
    topNotes: ["Grandiflorum Jasmine from Egypt", "Saffron"],
    middleNotes: ["Bitter Almond from Morocco", "Cedarwood"],
    baseNotes: ["Woody Musk", "Ambergrisaccord"],
    sizes: ["35ml", "70ml", "200ml"],
    inStock: true,
    isBestseller: true,
    isRoyalOud: false,
    featured: true
  },
  {
    id: "perfume-6",
    name: "No. 1 Imperial Majesty",
    brand: "Clive Christian",
    category: "Extrait de Parfum",
    price: 850,
    rating: 5.0,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
    description: "Recognized as the world's most expensive perfume. Encased in hand-cut crystal with an 18-carat gold collar and brilliant-cut white diamond.",
    topNotes: ["Lime", "Mandarin", "Sicilian Bergamot", "Cardamom"],
    middleNotes: ["Ylang Ylang", "Orris", "Lily of the Valley", "Rose"],
    baseNotes: ["Indian Sandalwood", "Cedarwood", "Tahitian Vanilla", "Amber"],
    sizes: ["50ml", "100ml"],
    inStock: true,
    isBestseller: false,
    isRoyalOud: false,
    featured: false
  },
  {
    id: "perfume-7",
    name: "Naxos 1861",
    brand: "Xerjoff",
    category: "Oriental Spice",
    price: 340,
    rating: 4.8,
    reviewsCount: 412,
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    description: "An intoxicating homage to Sicily. A rich gourmand explosion of honey, tobacco, and divine cashmeran enveloped in zesty Mediterranean citrus.",
    topNotes: ["Bergamot", "Lemon", "Lavender"],
    middleNotes: ["Jasmine Sambac", "Cinnamon", "Honey", "Cashmere"],
    baseNotes: ["Tobacco Leaf", "Tonka Bean", "Vanilla"],
    sizes: ["50ml", "100ml"],
    inStock: true,
    isBestseller: true,
    isRoyalOud: false,
    featured: false
  },
  {
    id: "perfume-8",
    name: "Herod Royal Essence",
    brand: "Parfums de Marly",
    category: "Oud & Woody",
    price: 360,
    rating: 4.9,
    reviewsCount: 520,
    image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    description: "A sophisticated tobacco fragrance with a warm heart of osmanthus and frankincense, wrapped in rich vanilla and cedar.",
    topNotes: ["Cinnamon", "Pepper"],
    middleNotes: ["Tobacco Leaf", "Incense", "Cistus", "Osmanthus"],
    baseNotes: ["Vanilla", "Musk", "Cedarwood", "Vetiver"],
    sizes: ["75ml", "125ml"],
    inStock: true,
    isBestseller: true,
    isRoyalOud: false,
    featured: false
  },
  {
    id: "perfume-9",
    name: "Interlude Royal Man",
    brand: "Amouage",
    category: "Oud & Woody",
    price: 420,
    rating: 4.7,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80",
    description: "An opulent spicy woody fragrance that inspires an aura of eternal order amidst chaos. Rich incense, oregano and pimento berry oil.",
    topNotes: ["Bergamot", "Oregano", "Pimento Berry Oil"],
    middleNotes: ["Amber", "Frankincense", "Cistus", "Opoponax"],
    baseNotes: ["Leather", "Agarwood Smoke", "Patchouli", "Sandalwood"],
    sizes: ["50ml", "100ml"],
    inStock: true,
    isBestseller: false,
    isRoyalOud: true,
    featured: false
  },
  {
    id: "perfume-10",
    name: "Angels' Share Cognac",
    brand: "Kilian Paris",
    category: "Gourmand Amber",
    price: 395,
    rating: 4.9,
    reviewsCount: 780,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    description: "Contains the essence of cognac derived from the liquor to lend it a natural caramel color. Opening with cognac oil upon a blend of oak absolute, cinnamon essence and long-lasting tonka bean.",
    topNotes: ["Cognac"],
    middleNotes: ["Cinnamon Bark", "Oak Absolute", "Tonka Bean"],
    baseNotes: ["Sandalwood", "Praline", "Vanilla"],
    sizes: ["50ml", "100ml"],
    inStock: true,
    isBestseller: true,
    isRoyalOud: false,
    featured: true
  }
];

// Generate additional 90 realistic luxury perfumes to reach 100 items
const brandsList = PERFUME_BRANDS;
const categoriesList = PERFUME_CATEGORIES;
const adjectives = ["Royal", "Imperial", "Grand", "Noir", "Gilded", "Velvet", "Sovereign", "Opulent", "Mystic", "Divine", "Celestial", "Ethereal"];
const nounWords = ["Oud", "Santal", "Amber", "Rose", "Musk", "Iris", "Vanilla", "Tabac", "Neroli", "Jasmine", "Vetiver", "Cashmere"];

for (let i = 11; i <= 100; i++) {
  const brand = brandsList[i % brandsList.length];
  const category = categoriesList[i % categoriesList.length];
  const adj = adjectives[i % adjectives.length];
  const noun = nounWords[(i * 3) % nounWords.length];
  const name = `${adj} ${noun} No. ${i}`;
  const price = 250 + ((i * 37) % 350);
  const rating = Number((4.5 + ((i % 5) * 0.1)).toFixed(1));
  const reviewsCount = 20 + ((i * 13) % 450);
  const isRoyalOud = category === "Oud & Woody" || (i % 4 === 0);

  INITIAL_PERFUMES.push({
    id: `perfume-${i}`,
    name,
    brand,
    category,
    price,
    rating,
    reviewsCount,
    image: `https://images.unsplash.com/photo-${1500000000000 + (i * 9876543) % 999999}?auto=format&fit=crop&w=800&q=80`,
    description: `An exquisite masterpiece from ${brand}. Combining rare botanical essences with centuries-old perfumery traditions for an unforgettable olfactory signature.`,
    topNotes: ["Italian Bergamot", "Pink Peppercorn", "Saffron"],
    middleNotes: [category.includes("Oud") ? "Aged Cambodian Oud" : "Damask Rose", "Orris Butter", "Cedar"],
    baseNotes: ["Golden Amber", "White Musk", "Madagascar Vanilla"],
    sizes: ["30ml", "50ml", "100ml"],
    inStock: true,
    isBestseller: i % 5 === 0,
    isRoyalOud,
    featured: i <= 15
  });
}

// Fix image URLs for reliable high-end perfume photos
const fallbackImages = [
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80"
];

INITIAL_PERFUMES.forEach((p, index) => {
  p.image = fallbackImages[index % fallbackImages.length];
});

export const INITIAL_ORDERS = [
  {
    id: "ORD-98421",
    date: "2026-06-12",
    status: "Delivered",
    items: [
      { id: "perfume-1", name: "Oud Wood ImpÃ©rial", brand: "Tom Ford", price: 395, quantity: 1, size: "100ml", image: INITIAL_PERFUMES[0].image }
    ],
    subtotal: 395,
    shipping: 0,
    tax: 31.60,
    discount: 0,
    grandTotal: 426.60,
    shippingAddress: {
      fullName: "Alexander Wright",
      address: "742 Evergreen Terrace, Suite 400",
      city: "New York",
      postalCode: "10021",
      country: "United States"
    },
    paymentMethod: "Credit Card (â€¢â€¢â€¢â€¢ 4242)"
  },
  {
    id: "ORD-97512",
    date: "2026-06-01",
    status: "Shipped",
    items: [
      { id: "perfume-5", name: "Baccarat Rouge 540 Extrait", brand: "Maison Francis Kurkdjian", price: 435, quantity: 1, size: "70ml", image: INITIAL_PERFUMES[4].image }
    ],
    subtotal: 435,
    shipping: 0,
    tax: 34.80,
    discount: 25,
    grandTotal: 444.80,
    shippingAddress: {
      fullName: "Alexander Wright",
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




