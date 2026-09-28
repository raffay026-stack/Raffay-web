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

const makeDecorProduct = (id, name, image) => ({
  id,
  name,
  brand: "",
  category: "",
  price: 0,
  rating: 0,
  reviewsCount: 0,
  image,
  description: "",
  topNotes: [],
  middleNotes: [],
  baseNotes: [],
  sizes: [],
  inStock: true,
  isBestseller: false,
  isRoyalOud: false,
  featured: false
});

export const INITIAL_PERFUMES = [
  makeDecorProduct("fk-decore-001", "3 pcs Metal stands", "/product%20images/3%20pcs%20Metal%20stands.jpeg"),
  makeDecorProduct("fk-decore-002", "3 rass in sparrows on log", "/product%20images/3%20rassin%20sparrows%20on%20log.jpeg"),
  makeDecorProduct("fk-decore-003", "Abstronaut Moot Sculpture", "/product%20images/Abstronaut%20Moot%20Sculpture.jpeg"),
  makeDecorProduct("fk-decore-004", "beer double plate holder", "/product%20images/beer%20double%20plate%20holder.jpeg"),
  makeDecorProduct("fk-decore-005", "beer standing dish holder", "/product%20images/beer%20standing%20dish%20holder.jpeg"),
  makeDecorProduct("fk-decore-006", "Black & Gold tic tac toe", "/product%20images/Black%20%26%20Gold%20tic%20tac%20toe.jpeg"),
  makeDecorProduct("fk-decore-007", "Black & Golden Abstract Ring Decor Set", "/product%20images/Black%20%26%20Golden%20Abstract%20Ring%20Decor%20Set.jpeg"),
  makeDecorProduct("fk-decore-008", "Black Eifel Tower Table Clock", "/product%20images/Black%20Eifel%20Tower%20Table%20Clock.jpeg"),
  makeDecorProduct("fk-decore-009", "Black metal table", "/product%20images/Black%20metal%20table.jpeg"),
  makeDecorProduct("fk-decore-010", "Black sparrow key holder", "/product%20images/Black%20sparrow%20key%20holder.jpeg"),
  makeDecorProduct("fk-decore-011", "Buffet Dishesjpeg", "/product%20images/Buffet%20Dishesjpeg.jpeg"),
  makeDecorProduct("fk-decore-012", "Butterfly round mirror", "/product%20images/Butterfly%20round%20mirror.jpeg"),
  makeDecorProduct("fk-decore-013", "Emeral owl family", "/product%20images/Emeral%20owl%20family.jpeg"),
  makeDecorProduct("fk-decore-014", "GOLD WHITE LUXUARY CAKE STANDS", "/product%20images/GOLD%20WHITE%20LUXUARY%20CAKE%20STANDS.jpeg"),
  makeDecorProduct("fk-decore-015", "Golden big swan set", "/product%20images/Golden%20big%20swan%20set.jpeg"),
  makeDecorProduct("fk-decore-016", "Golden crystal cut tissue box", "/product%20images/Golden%20crystal%20cut%20tissue%20box.jpeg"),
  makeDecorProduct("fk-decore-017", "Golden Embrace Couple under glass", "/product%20images/Golden%20Embrace%20Couple%20under%20glass.jpeg"),
  makeDecorProduct("fk-decore-018", "golden leaf plate", "/product%20images/golden%20leaf%20plate.jpeg"),
  makeDecorProduct("fk-decore-019", "Golden metal apple with crystal", "/product%20images/Golden%20metal%20apple%20with%20crystal.jpeg"),
  makeDecorProduct("fk-decore-020", "Golden metal with crystal Tissue Holder", "/product%20images/Golden%20metal%20with%20crystal%20Tissue%20Holder.jpeg"),
  makeDecorProduct("fk-decore-021", "Golden mirror handle dish", "/product%20images/Golden%20mirror%20handle%20dish.jpeg"),
  makeDecorProduct("fk-decore-022", "Golden Pear with Crystal", "/product%20images/Golden%20Pear%20with%20Crystal.jpeg"),
  makeDecorProduct("fk-decore-023", "Golden Pineaple with crystal decor", "/product%20images/Golden%20Pineaple%20with%20crystal%20decor.jpeg"),
  makeDecorProduct("fk-decore-024", "golden rasin 4 sparrows on log", "/product%20images/golden%20rasin%204%20sparrows%20on%20log.jpeg"),
  makeDecorProduct("fk-decore-025", "Golden Rasin Peackock", "/product%20images/Golden%20Rasin%20Peackock.jpeg"),
  makeDecorProduct("fk-decore-026", "Golden rectangular handle dish", "/product%20images/Golden%20rectangular%20handle%20dish.jpeg"),
  makeDecorProduct("fk-decore-027", "golden resin sparrow on leaf", "/product%20images/golden%20resin%20sparrow%20on%20leaf.jpeg"),
  makeDecorProduct("fk-decore-028", "Golden sparrow log tray", "/product%20images/Golden%20sparrow%20log%20tray.jpeg"),
  makeDecorProduct("fk-decore-029", "heart golden glow led table lamp", "/product%20images/heart%20golden%20glow%20led%20table%20lamp.jpeg"),
  makeDecorProduct("fk-decore-030", "Metal plate stands", "/product%20images/Metal%20plate%20stands.jpeg"),
  makeDecorProduct("fk-decore-031", "metal silver serving dishes", "/product%20images/metal%20silver%20serving%20dishes.jpeg"),
  makeDecorProduct("fk-decore-032", "Royal Golden Antelope Sculpture", "/product%20images/Royal%20Golden%20Antelope%20Sculpture.jpeg"),
  makeDecorProduct("fk-decore-033", "Royal Whirling Dervish set", "/product%20images/Royal%20Whirling%20Dervish%20set.jpeg"),
  makeDecorProduct("fk-decore-034", "Sitting beer pastry plate holder", "/product%20images/Sitting%20beer%20pastry%20plate%20holder.jpeg"),
  makeDecorProduct("fk-decore-035", "Sparrow key hanging golden", "/product%20images/Sparrow%20key%20hanging%20golden.jpeg"),
  makeDecorProduct("fk-decore-036", "square crystal tissue box", "/product%20images/square%20crystal%20tissue%20box.jpeg"),
  makeDecorProduct("fk-decore-037", "square Glow led table lamp", "/product%20images/square%20Glow%20led%20table%20lamp.jpeg"),
  makeDecorProduct("fk-decore-038", "Vintage Abstract Human Trio Sculpture", "/product%20images/Vintage%20Abstract%20Human%20Trio%20Sculpture.jpeg"),
  makeDecorProduct("fk-decore-039", "Vintage Sparrow On Log Tray", "/product%20images/Vintage%20Sparrow%20On%20Log%20Tray.jpeg"),
  makeDecorProduct("fk-decore-040", "white & silver swan set", "/product%20images/white%20%26%20silver%20swan%20set.jpeg"),
  makeDecorProduct("fk-decore-041", "white and gold bowl stand", "/product%20images/white%20and%20gold%20bowl%20stand.jpeg"),
  makeDecorProduct("fk-decore-042", "White and Golden Leaf Crescent Decor Set", "/product%20images/White%20and%20Golden%20Leaf%20Crescent%20Decor%20Set.jpeg"),
  makeDecorProduct("fk-decore-043", "White and Golden Teardrop decor set", "/product%20images/White%20and%20Golden%20Teardrop%20decor%20set.jpeg"),
  makeDecorProduct("fk-decore-044", "WHITE BOWL STAND SET", "/product%20images/WHITE%20BOWL%20STAND%20SET.jpeg"),
  makeDecorProduct("fk-decore-045", "white gold plate cake stand", "/product%20images/white%20gold%20plate%20cake%20stand.jpeg"),
  makeDecorProduct("fk-decore-046", "white royal whirling dervish set", "/product%20images/white%20royal%20whirling%20dervish%20set.jpeg")
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-98421",
    date: "2026-06-12",
    status: "Delivered",
    items: [
      { id: "perfume-1", name: "Oud Wood Impérial", brand: "Tom Ford", price: 395, quantity: 1, size: "100ml", image: INITIAL_PERFUMES[0].image }
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
    paymentMethod: "Credit Card (•••• 4242)"
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