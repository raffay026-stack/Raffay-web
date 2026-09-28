export const PRODUCT_CATEGORIES = [
  {
    name: "Table Decor",
    slug: "table-decor",
    legacySlugs: ["oud-woody"],
    image: "/Product%20images/Black%20%26%20Golden%20Abstract%20Ring%20Decor%20Set.jpeg",
    description: "Decorative accents and statement pieces for beautifully styled tables."
  },
  {
    name: "Planters & Plants",
    slug: "planters-plants",
    legacySlugs: ["oriental-spice"],
    image: "/hero-desktop2.jpg",
    imagePosition: "left center",
    description: "Greenery and planters that bring natural warmth to your home."
  },
  {
    name: "Consoles, Tables, & Stools",
    slug: "consoles-tables-stools",
    legacySlugs: ["floral"],
    image: "/Product%20images/Black%20metal%20table.jpeg",
    description: "Functional accent furniture for entryways, living rooms, and more."
  },
  {
    name: "Lanterns & Floor Lamps",
    slug: "lanterns-floor-lamps",
    legacySlugs: ["citrus-fresh"],
    image: "/Product%20images/square%20Glow%20led%20table%20lamp.jpeg",
    description: "Decorative lighting to add a warm glow to your space."
  },
  {
    name: "Platers & Dishes",
    slug: "platers-dishes",
    legacySlugs: ["fresh-spicy"],
    image: "/Product%20images/golden%20leaf%20plate.jpeg",
    description: "Ornamental platters and dishes for elegant serving and display."
  },
  {
    name: "Fancy Crockery",
    slug: "fancy-crockery",
    legacySlugs: ["sensual-floral"],
    image: "/Product%20images/Buffet%20Dishesjpeg.jpeg",
    description: "Distinctive serving pieces for memorable dining and entertaining."
  },
  {
    name: "Floor Decor & Racks",
    slug: "floor-decor-racks",
    legacySlugs: ["gourmand-amber"],
    image: "/Product%20images/3%20pcs%20Metal%20stands.jpeg",
    description: "Sculptural floor accents and stands to complete your interior."
  },
  {
    name: "Clocks & Wall Arts",
    slug: "clocks-wall-arts",
    legacySlugs: ["aquatic-fresh"],
    image: "/Product%20images/Black%20Eifel%20Tower%20Table%20Clock.jpeg",
    description: "Wall accents and timepieces with character and detail."
  }
];

export const PRODUCT_CATEGORY_NAMES = PRODUCT_CATEGORIES.map(({ name }) => name);

const LEGACY_PRODUCT_CATEGORIES = {
  "Plants and Planters": "Planters & Plants",
  "Table and Consoles": "Consoles, Tables, & Stools",
  Stools: "Consoles, Tables, & Stools",
  "Wall Art and Wall Clocks": "Clocks & Wall Arts",
  Platers: "Platers & Dishes",
  "Crockery and Kitchen Items": "Fancy Crockery"
};

export const normalizeProductCategory = (category) => {
  if (typeof category !== "string") return category;
  const trimmedCategory = category.trim();
  const legacyCategory = Object.keys(LEGACY_PRODUCT_CATEGORIES).find(
    (name) => name.toLowerCase() === trimmedCategory.toLowerCase()
  );
  return legacyCategory ? LEGACY_PRODUCT_CATEGORIES[legacyCategory] : category;
};

export const getProductCategoryBySlug = (slug) =>
  PRODUCT_CATEGORIES.find(
    (category) => category.slug === slug || category.legacySlugs.includes(slug)
  ) || null;