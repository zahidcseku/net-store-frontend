// =================================================================
// Data access layer
// =================================================================
// Every screen in this app calls the functions below instead of
// fetching directly. That's the seam: right now they resolve from
// the in-memory mock catalog (src/data/mockData.js); once you have
// Dizi Cashier's API docs, you rewrite ONLY the bodies of these
// functions to call `fetch(...)` against their endpoints. No page
// or component needs to change.
//
// HOW TO WIRE UP THE REAL BACKEND
// --------------------------------
// 1. Set VITE_API_BASE_URL and VITE_API_KEY in a `.env.local` file
//    (see .env.example). Vite exposes these as
//    import.meta.env.VITE_API_BASE_URL / VITE_API_KEY.
// 2. Ask Dizi Cashier support for:
//      - Base URL for their REST/JSON API (globalapp.dizicashier.com
//        is the app's login page, not the API host — the API is
//        likely served from a separate subdomain, e.g. api.* )
//      - Auth method: API key header, bearer token, or session
//        cookie from their login endpoint
//      - Endpoints/fields for: products, categories, stock levels,
//        price, and how they want orders/sales submitted back
//        (Dizi Cashier is a POS system, so "checkout" here probably
//        needs to create a "sale" or "order" record in their system)
// 3. Replace the body of each function below with a `request(...)`
//    call. The `request` helper already attaches the base URL and
//    auth header, and throws on non-2xx so callers can catch errors
//    consistently.
// =================================================================

import { categories, products, getCategoryById } from "../data/mockData";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_KEY = import.meta.env.VITE_API_KEY || "";
const USE_MOCKS = !BASE_URL; // falls back to mock data until a real base URL is configured

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${body}`);
  }
  return res.json();
}

// Simulates realistic network latency for the mock path so loading
// states are visible and easy to test during development.
function mockDelay(value, ms = 350) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getCategories() {
  if (USE_MOCKS) return mockDelay(categories);
  // return request("/categories");
  return request("/categories");
}

export async function getProducts({ category, subcategory, brand, q, sort, minPrice, maxPrice } = {}) {
  if (USE_MOCKS) {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (subcategory) list = list.filter((p) => p.subcategory === subcategory);
    if (brand?.length) list = list.filter((p) => brand.includes(p.brand));
    if (minPrice != null) list = list.filter((p) => p.price >= minPrice);
    if (maxPrice != null) list = list.filter((p) => p.price <= maxPrice);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(needle) || p.brand.toLowerCase().includes(needle)
      );
    }
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: break; // "relevance" — keep seed order
    }
    return mockDelay(list);
  }
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (subcategory) params.set("subcategory", subcategory);
  if (brand?.length) params.set("brand", brand.join(","));
  if (q) params.set("q", q);
  if (sort) params.set("sort", sort);
  if (minPrice != null) params.set("minPrice", minPrice);
  if (maxPrice != null) params.set("maxPrice", maxPrice);
  return request(`/products?${params.toString()}`);
}

export async function getProductBySlug(slug) {
  if (USE_MOCKS) return mockDelay(products.find((p) => p.slug === slug) || null);
  return request(`/products/${slug}`);
}

export async function getRelatedProducts(product, limit = 4) {
  if (USE_MOCKS) {
    const related = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
    return mockDelay(related);
  }
  return request(`/products/${product.id}/related?limit=${limit}`);
}

// Submits a checkout. Note: against the real backend this almost
// certainly needs to create a "sale"/"order" in Dizi Cashier's POS
// system rather than a generic e-commerce order — confirm the exact
// payload shape with their support before wiring this up for real.
export async function placeOrder(orderPayload) {
  if (USE_MOCKS) {
    const orderId = "BJ" + Math.floor(100000 + Math.random() * 900000);
    return mockDelay({ orderId, status: "confirmed", ...orderPayload }, 600);
  }
  return request("/orders", { method: "POST", body: JSON.stringify(orderPayload) });
}

export { getCategoryById };
