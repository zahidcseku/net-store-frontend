// ---------------------------------------------------------------
// Sample catalog data.
//
// This file plays the role that `GET /categories` and
// `GET /products` will play once the Dizi Cashier API is wired up
// (see src/lib/api.js). Shapes here were chosen to be a reasonable,
// generic superset of what a POS/inventory backend like Dizi
// Cashier is likely to return (id, sku, name, price, stock,
// category, images) — expect to adjust field names once you have
// the real response schema.
// ---------------------------------------------------------------

export const categories = [
  {
    id: "laptops",
    name: "Laptops",
    icon: "Laptop",
    blurb: "Everyday, business, creator & gaming",
    subcategories: ["Everyday", "Business", "Gaming", "Creator"],
  },
  {
    id: "desktops",
    name: "Desktop PCs",
    icon: "Monitor",
    blurb: "Pre-built & custom builds",
    subcategories: ["Gaming", "Office", "All-in-One"],
  },
  {
    id: "monitors",
    name: "Monitors",
    icon: "MonitorSmartphone",
    blurb: "From everyday to 240Hz",
    subcategories: ["Everyday", "Gaming", "Ultrawide"],
  },
  {
    id: "phones",
    name: "Phones",
    icon: "Smartphone",
    blurb: "Android & iOS",
    subcategories: ["Flagship", "Mid-range", "Budget"],
  },
  {
    id: "components",
    name: "Components",
    icon: "Cpu",
    blurb: "GPUs, storage, memory",
    subcategories: ["Graphics Cards", "Storage", "Memory"],
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "Keyboard",
    blurb: "Keyboards, mice, bags & more",
    subcategories: ["Keyboards", "Mice", "Bags", "Audio"],
  },
];

export const brands = [
  "ASUS", "Acer", "Dell", "HP", "Lenovo", "Apple", "Samsung", "MSI",
  "Xiaomi", "Logitech", "LG",
];

// Category -> icon used for the placeholder product art (no real
// product photography is included; swap ProductImage's rendering
// for real image URLs once the backend returns them).
const productSeed = [
  // Laptops
  { name: "ASUS Vivobook 15", brand: "ASUS", category: "laptops", sub: "Everyday", price: 62990, oldPrice: 69990, rating: 4.4, reviews: 212, stock: 18,
    specs: { CPU: "Intel Core i5-1334U", RAM: "16GB", Storage: "512GB SSD", Display: "15.6\" FHD IPS", Battery: "Up to 10 hrs" } },
  { name: "Lenovo IdeaPad Slim 3", brand: "Lenovo", category: "laptops", sub: "Everyday", price: 54500, oldPrice: null, rating: 4.2, reviews: 143, stock: 25,
    specs: { CPU: "AMD Ryzen 5 7530U", RAM: "8GB", Storage: "512GB SSD", Display: "14\" FHD", Battery: "Up to 9 hrs" } },
  { name: "Dell Latitude 5440", brand: "Dell", category: "laptops", sub: "Business", price: 98500, oldPrice: 109000, rating: 4.6, reviews: 87, stock: 9,
    specs: { CPU: "Intel Core i7-1355U", RAM: "16GB", Storage: "1TB SSD", Display: "14\" FHD", Security: "Fingerprint + TPM 2.0" } },
  { name: "HP EliteBook 840 G10", brand: "HP", category: "laptops", sub: "Business", price: 112000, oldPrice: null, rating: 4.5, reviews: 61, stock: 6,
    specs: { CPU: "Intel Core i7-1365U", RAM: "16GB", Storage: "512GB SSD", Display: "14\" WUXGA", Security: "IR Camera, TPM" } },
  { name: "ASUS ROG Strix G16", brand: "ASUS", category: "laptops", sub: "Gaming", price: 189900, oldPrice: 205000, rating: 4.7, reviews: 154, stock: 7,
    specs: { CPU: "Intel Core i7-14650HX", GPU: "RTX 4060 8GB", RAM: "16GB", Storage: "1TB SSD", Display: "16\" QHD 165Hz" } },
  { name: "Acer Nitro V15", brand: "Acer", category: "laptops", sub: "Gaming", price: 124500, oldPrice: null, rating: 4.3, reviews: 98, stock: 14,
    specs: { CPU: "Intel Core i5-13420H", GPU: "RTX 4050 6GB", RAM: "16GB", Storage: "512GB SSD", Display: "15.6\" FHD 144Hz" } },
  { name: "Apple MacBook Air 13 (M3)", brand: "Apple", category: "laptops", sub: "Creator", price: 148900, oldPrice: null, rating: 4.8, reviews: 301, stock: 11,
    specs: { CPU: "Apple M3", RAM: "8GB", Storage: "256GB SSD", Display: "13.6\" Liquid Retina", Battery: "Up to 18 hrs" } },
  { name: "MSI Creator Z16", brand: "MSI", category: "laptops", sub: "Creator", price: 215000, oldPrice: 229000, rating: 4.5, reviews: 34, stock: 4,
    specs: { CPU: "Intel Core i9-13900H", GPU: "RTX 4060 8GB", RAM: "32GB", Storage: "1TB SSD", Display: "16\" QHD+ Touch" } },

  // Desktops
  { name: "Bijli Ryzen Home Office PC", brand: "ASUS", category: "desktops", sub: "Office", price: 45000, oldPrice: null, rating: 4.3, reviews: 42, stock: 20,
    specs: { CPU: "AMD Ryzen 5 5600G", RAM: "8GB", Storage: "512GB SSD", GPU: "Integrated", Case: "Mid Tower" } },
  { name: "MSI Aegis RS RTX 4070", brand: "MSI", category: "desktops", sub: "Gaming", price: 245000, oldPrice: 259000, rating: 4.6, reviews: 27, stock: 5,
    specs: { CPU: "Intel Core i7-14700F", GPU: "RTX 4070 12GB", RAM: "32GB", Storage: "1TB NVMe", PSU: "750W Gold" } },
  { name: "HP All-in-One 24", brand: "HP", category: "desktops", sub: "All-in-One", price: 68900, oldPrice: null, rating: 4.1, reviews: 19, stock: 13,
    specs: { CPU: "Intel Core i5-1235U", RAM: "8GB", Storage: "512GB SSD", Display: "23.8\" FHD Touch" } },

  // Monitors
  { name: "LG UltraGear 27\" 165Hz", brand: "LG", category: "monitors", sub: "Gaming", price: 32900, oldPrice: 36900, rating: 4.6, reviews: 176, stock: 30,
    specs: { Panel: "IPS", Resolution: "QHD 2560x1440", Refresh: "165Hz", Response: "1ms", Ports: "HDMI, DP" } },
  { name: "Samsung 24\" Essential", brand: "Samsung", category: "monitors", sub: "Everyday", price: 12500, oldPrice: null, rating: 4.3, reviews: 240, stock: 55,
    specs: { Panel: "VA", Resolution: "FHD 1920x1080", Refresh: "75Hz", Ports: "HDMI, VGA" } },
  { name: "ASUS TUF 34\" Ultrawide", brand: "ASUS", category: "monitors", sub: "Ultrawide", price: 58900, oldPrice: null, rating: 4.5, reviews: 41, stock: 8,
    specs: { Panel: "VA Curved", Resolution: "WQHD 3440x1440", Refresh: "144Hz", Ports: "HDMI x2, DP" } },
  { name: "Acer Nitro 27\" 240Hz", brand: "Acer", category: "monitors", sub: "Gaming", price: 41900, oldPrice: 44900, rating: 4.4, reviews: 63, stock: 12,
    specs: { Panel: "IPS", Resolution: "FHD 1920x1080", Refresh: "240Hz", Response: "0.5ms" } },

  // Phones
  { name: "Samsung Galaxy A55", brand: "Samsung", category: "phones", sub: "Mid-range", price: 42999, oldPrice: 45999, rating: 4.4, reviews: 388, stock: 40,
    specs: { Display: "6.6\" Super AMOLED", RAM: "8GB", Storage: "128GB", Camera: "50MP OIS", Battery: "5000mAh" } },
  { name: "Apple iPhone 15", brand: "Apple", category: "phones", sub: "Flagship", price: 109900, oldPrice: null, rating: 4.7, reviews: 512, stock: 15,
    specs: { Display: "6.1\" Super Retina XDR", Storage: "128GB", Camera: "48MP Main", Chip: "A16 Bionic" } },
  { name: "Xiaomi Redmi Note 13", brand: "Xiaomi", category: "phones", sub: "Budget", price: 18999, oldPrice: 20999, rating: 4.2, reviews: 601, stock: 70,
    specs: { Display: "6.67\" AMOLED 120Hz", RAM: "6GB", Storage: "128GB", Camera: "108MP", Battery: "5000mAh" } },
  { name: "Samsung Galaxy S24", brand: "Samsung", category: "phones", sub: "Flagship", price: 94999, oldPrice: 99999, rating: 4.6, reviews: 204, stock: 10,
    specs: { Display: "6.2\" Dynamic AMOLED 2X", RAM: "8GB", Storage: "256GB", Camera: "50MP Triple", AI: "Galaxy AI" } },

  // Components
  { name: "MSI GeForce RTX 4060 Ventus", brand: "MSI", category: "components", sub: "Graphics Cards", price: 43500, oldPrice: null, rating: 4.5, reviews: 58, stock: 16,
    specs: { VRAM: "8GB GDDR6", Interface: "PCIe 4.0", Ports: "HDMI, DP x3", Length: "220mm" } },
  { name: "Samsung 970 EVO 1TB NVMe", brand: "Samsung", category: "components", sub: "Storage", price: 9800, oldPrice: 10800, rating: 4.7, reviews: 320, stock: 90,
    specs: { Capacity: "1TB", Interface: "NVMe PCIe 3.0", "Read Speed": "3500MB/s" } },
  { name: "Kingston Fury 16GB DDR4", brand: "ASUS", category: "components", sub: "Memory", price: 4200, oldPrice: null, rating: 4.6, reviews: 145, stock: 120,
    specs: { Capacity: "16GB (1x16GB)", Speed: "3200MHz", Type: "DDR4 UDIMM" } },

  // Accessories
  { name: "Logitech MX Master 3S", brand: "Logitech", category: "accessories", sub: "Mice", price: 9500, oldPrice: 10500, rating: 4.8, reviews: 410, stock: 60,
    specs: { Connectivity: "Bluetooth / USB Receiver", DPI: "8000", Battery: "Up to 70 days" } },
  { name: "Logitech G Pro X Keyboard", brand: "Logitech", category: "accessories", sub: "Keyboards", price: 14200, oldPrice: null, rating: 4.6, reviews: 88, stock: 22,
    specs: { Switch: "Hot-swappable mechanical", Layout: "TKL", Backlight: "RGB" } },
  { name: "Anti-Theft Laptop Backpack 15.6\"", brand: "ASUS", category: "accessories", sub: "Bags", price: 2450, oldPrice: 2900, rating: 4.3, reviews: 233, stock: 150,
    specs: { Fits: "Up to 15.6\" laptops", Material: "Water-resistant fabric", USB: "Charging port" } },
  { name: "Samsung Galaxy Buds FE", brand: "Samsung", category: "accessories", sub: "Audio", price: 6900, oldPrice: null, rating: 4.4, reviews: 176, stock: 45,
    specs: { Type: "In-ear, ANC", Battery: "Up to 30 hrs with case", Connectivity: "Bluetooth 5.3" } },
];

function slugify(s) {
  return s.toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
}

export const products = productSeed.map((p, i) => ({
  id: `P${1000 + i}`,
  slug: slugify(p.name) + "-" + (1000 + i),
  sku: `SKU-${1000 + i}`,
  name: p.name,
  brand: p.brand,
  category: p.category,
  subcategory: p.sub,
  price: p.price,
  oldPrice: p.oldPrice || null,
  rating: p.rating,
  reviewCount: p.reviews,
  stock: p.stock,
  badge: p.oldPrice ? "Sale" : i % 7 === 0 ? "New" : null,
  specs: p.specs,
  description:
    `The ${p.name} pairs ${Object.values(p.specs)[0]?.toLowerCase() || "solid specs"} with everyday reliability, ` +
    `backed by Bijli's official warranty and after-sales support across Bangladesh.`,
}));

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}
