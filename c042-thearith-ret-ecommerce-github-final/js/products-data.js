/* =========================================================
   C042 – Mr. Thearith Ret | Household Products Demo
   Shared demo product data (used by website + admin dashboard)
   NOTE: Demo data only — no real backend/database.
   ========================================================= */

const STORE_INFO = {
  name: "Thearith Home & Living",
  shortName: "Thearith HL",
  tagline: "Everything You Need for Your Home",
  phone: "+855 12 345 678",
  telegram: "https://t.me/thearith_homeliving",
  facebook: "https://facebook.com/thearith.homeliving",
  address: "St. 271, Sen Sok, Phnom Penh, Cambodia",
  hours: "Mon – Sat, 8:00 AM – 6:00 PM",
};

const CATEGORIES = [
  { id: "kitchen", name: "Kitchen", icon: "assets/categories/kitchen.svg" },
  { id: "cleaning", name: "Cleaning", icon: "assets/categories/cleaning.svg" },
  { id: "storage", name: "Storage", icon: "assets/categories/storage.svg" },
  { id: "bathroom", name: "Bathroom", icon: "assets/categories/bathroom.svg" },
  { id: "home-accessories", name: "Home Accessories", icon: "assets/categories/home-accessories.svg" },
  { id: "gadgets", name: "Gadgets", icon: "assets/categories/gadgets.svg" },
  { id: "electrical", name: "Electrical", icon: "assets/categories/electrical.svg" },
  { id: "other", name: "Other", icon: "assets/categories/other.svg" },
];

/* stock: number of units. status is derived: 0 = Out of Stock, <=5 = Low Stock, else In Stock */
const PRODUCTS = [
  {
    id: "p01", sku: "THL-KT-001", name: "Mini Electric Food Chopper", category: "kitchen",
    price: 24.0, oldPrice: 29.0, stock: 42, status: "active",
    image: "assets/products/p01.svg", badges: ["bestseller", "sale"], dateAdded: "2026-08-10",
    description: "A compact electric chopper that makes chopping vegetables, garlic, and meat quick and effortless — perfect for busy Cambodian kitchens.",
    features: ["Powerful motor, quiet operation", "Detachable bowl, dishwasher safe", "Safety lock lid", "Compact size, easy to store"],
  },
  {
    id: "p02", sku: "THL-KT-002", name: "Stainless Steel Dish Rack", category: "kitchen",
    price: 19.5, oldPrice: null, stock: 4, status: "active",
    image: "assets/products/p02.svg", badges: [], dateAdded: "2026-07-28",
    description: "Rust-resistant stainless steel dish rack with a built-in drainboard to keep your kitchen counter dry and organized.",
    features: ["Rust resistant stainless steel", "Built-in drain tray", "Space for plates, cups & utensils", "Easy to wipe clean"],
  },
  {
    id: "p03", sku: "THL-KT-003", name: "Multi-Purpose Kitchen Organizer", category: "kitchen",
    price: 15.0, oldPrice: null, stock: 30, status: "active",
    image: "assets/products/p03.svg", badges: ["new"], dateAdded: "2026-08-15",
    description: "Stackable kitchen organizer for pots, pans, and containers — makes the most of your cabinet space.",
    features: ["Stackable & adjustable", "Sturdy plastic construction", "Fits most cabinets & shelves", "Easy tool-free assembly"],
  },
  {
    id: "p04", sku: "THL-KT-004", name: "Oil Dispenser Bottle", category: "kitchen",
    price: 6.5, oldPrice: null, stock: 55, status: "active",
    image: "assets/products/p04.svg", badges: [], dateAdded: "2026-06-20",
    description: "Leak-proof glass oil dispenser bottle for controlled pouring — keeps your stovetop clean and mess-free.",
    features: ["Leak-proof spout", "Heat resistant glass", "350ml capacity", "Easy one-hand pouring"],
  },
  {
    id: "p05", sku: "THL-CL-001", name: "Spin Mop Set", category: "cleaning",
    price: 22.0, oldPrice: 27.0, stock: 26, status: "active",
    image: "assets/products/p05.svg", badges: ["bestseller", "sale"], dateAdded: "2026-08-01",
    description: "360° spin mop with foot-pedal bucket for effortless, hands-free wringing — ideal for tile and hardwood floors.",
    features: ["360° spin mop head", "Foot-pedal wringer bucket", "Microfiber mop pad included", "Lightweight aluminium handle"],
  },
  {
    id: "p06", sku: "THL-CL-002", name: "Window Cleaning Tool", category: "cleaning",
    price: 8.0, oldPrice: null, stock: 18, status: "active",
    image: "assets/products/p06.svg", badges: [], dateAdded: "2026-07-05",
    description: "2-in-1 squeegee and microfiber washer for streak-free windows and glass surfaces.",
    features: ["2-in-1 squeegee + washer", "Extendable handle", "Streak-free finish", "Great for windows & mirrors"],
  },
  {
    id: "p07", sku: "THL-CL-003", name: "Multi-Purpose Cleaning Brush", category: "cleaning",
    price: 4.5, oldPrice: null, stock: 60, status: "active",
    image: "assets/products/p07.svg", badges: [], dateAdded: "2026-05-18",
    description: "Durable scrub brush with an ergonomic handle, ideal for bathrooms, kitchens, and outdoor surfaces.",
    features: ["Firm, durable bristles", "Ergonomic non-slip grip", "Suitable for tiles, sinks & tubs", "Compact for easy storage"],
  },
  {
    id: "p08", sku: "THL-ST-001", name: "Foldable Storage Box", category: "storage",
    price: 12.0, oldPrice: null, stock: 34, status: "active",
    image: "assets/products/p08.svg", badges: ["new"], dateAdded: "2026-08-12",
    description: "Collapsible fabric storage box for clothes, toys, and household items — folds flat when not in use.",
    features: ["Collapsible design saves space", "Reinforced side handles", "Sturdy bottom board", "Washable fabric exterior"],
  },
  {
    id: "p09", sku: "THL-ST-002", name: "Multi-Layer Storage Rack", category: "storage",
    price: 18.0, oldPrice: null, stock: 21, status: "active",
    image: "assets/products/p09.svg", badges: ["bestseller"], dateAdded: "2026-06-30",
    description: "Sturdy multi-layer storage rack for shoes, kitchenware, or general household storage.",
    features: ["Rust resistant construction", "Strong load-bearing shelves", "Easy tool-free installation", "Suitable for kitchen or living room"],
  },
  {
    id: "p10", sku: "THL-ST-003", name: "Clothes Organizer", category: "storage",
    price: 9.5, oldPrice: null, stock: 3, status: "active",
    image: "assets/products/p10.svg", badges: [], dateAdded: "2026-07-14",
    description: "6-compartment hanging closet organizer to keep folded clothes, accessories, and linens tidy.",
    features: ["6 storage compartments", "Hangs on any standard rod", "Breathable fabric", "Foldable for travel or storage"],
  },
  {
    id: "p11", sku: "THL-BT-001", name: "Bathroom Corner Shelf", category: "bathroom",
    price: 11.0, oldPrice: null, stock: 0, status: "active",
    image: "assets/products/p11.svg", badges: [], dateAdded: "2026-06-05",
    description: "Space-saving corner shelf for shampoo, soap, and bathroom essentials. No drilling required.",
    features: ["No-drill corner installation", "Rust & moisture resistant", "Two-tier storage", "Fits most bathroom corners"],
  },
  {
    id: "p12", sku: "THL-BT-002", name: "Soap Dispenser", category: "bathroom",
    price: 5.0, oldPrice: null, stock: 48, status: "active",
    image: "assets/products/p12.svg", badges: [], dateAdded: "2026-05-22",
    description: "Refillable soap dispenser with a smooth pump action, suitable for kitchen or bathroom counters.",
    features: ["Smooth pump mechanism", "Refillable 300ml bottle", "Leak-proof base", "Fits kitchen or bathroom decor"],
  },
  {
    id: "p13", sku: "THL-BT-003", name: "Towel Rack", category: "bathroom",
    price: 13.5, oldPrice: null, stock: 16, status: "active",
    image: "assets/products/p13.svg", badges: [], dateAdded: "2026-07-01",
    description: "Wall-mounted stainless steel towel rack that keeps towels dry and within easy reach.",
    features: ["Rust resistant stainless steel", "Wall-mounted, easy install", "Holds up to 3 towels", "Sleek modern design"],
  },
  {
    id: "p14", sku: "THL-GD-001", name: "Rechargeable Mini Fan", category: "gadgets",
    price: 16.0, oldPrice: 21.0, stock: 29, status: "active",
    image: "assets/products/p14.svg", badges: ["sale"], dateAdded: "2026-08-05",
    description: "Portable rechargeable fan with 3 speed settings — great for hot days, desks, or travel.",
    features: ["USB rechargeable battery", "3-speed adjustable airflow", "Quiet brushless motor", "Compact & portable"],
  },
  {
    id: "p15", sku: "THL-GD-002", name: "Motion Sensor Light", category: "gadgets",
    price: 14.0, oldPrice: null, stock: 22, status: "active",
    image: "assets/products/p15.svg", badges: ["new"], dateAdded: "2026-08-16",
    description: "Battery-powered LED light with motion sensor — ideal for hallways, stairs, and closets.",
    features: ["Automatic motion detection", "Long-lasting LED bulb", "Battery powered, no wiring", "Stick-on or screw mount"],
  },
  {
    id: "p16", sku: "THL-GD-003", name: "Digital Desk Clock", category: "gadgets",
    price: 10.0, oldPrice: null, stock: 5, status: "active",
    image: "assets/products/p16.svg", badges: [], dateAdded: "2026-04-30",
    description: "Simple digital desk clock with time, date, and temperature display for home or office.",
    features: ["Time, date & temperature display", "Adjustable brightness", "Compact desk-friendly size", "Battery or USB powered"],
  },
  {
    id: "p17", sku: "THL-EL-001", name: "Extension Power Strip", category: "electrical",
    price: 9.0, oldPrice: null, stock: 40, status: "active",
    image: "assets/products/p17.svg", badges: [], dateAdded: "2026-06-12",
    description: "4-outlet power strip with surge protection and a 2-meter cord, suitable for home or office use.",
    features: ["4 power outlets", "Surge protection", "2-meter durable cord", "Overload safety switch"],
  },
  {
    id: "p18", sku: "THL-HA-001", name: "Decorative Wall Hooks (Set of 6)", category: "home-accessories",
    price: 7.5, oldPrice: null, stock: 37, status: "active",
    image: "assets/products/p18.svg", badges: [], dateAdded: "2026-07-20",
    description: "Set of 6 adhesive wall hooks for coats, bags, keys, and towels — no drilling required.",
    features: ["Strong adhesive backing", "No drilling required", "Set of 6 hooks", "Suitable for walls, doors & tiles"],
  },
];

function getStockStatus(stock) {
  if (stock <= 0) return { label: "Out of Stock", cls: "out" };
  if (stock <= 5) return { label: "Low Stock", cls: "low" };
  return { label: "In Stock", cls: "in" };
}

function getCategoryName(catId) {
  const c = CATEGORIES.find((c) => c.id === catId);
  return c ? c.name : catId;
}

function formatPrice(n) {
  return "$" + n.toFixed(2);
}
