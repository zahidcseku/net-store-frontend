# Electronics Storefront

A React + Vite frontend for an online electronics store (laptops, desktops,
monitors, phones, components, accessories), built to run against the
**Dizi Cashier** POS backend (`globalapp.dizicashier.com`).

The store is currently named **Bijli** as a placeholder — rename it in one
place: `src/components/Header.jsx` (brand mark/name) and `index.html`
(`<title>`).

## What's included

- Home page: hero, category tiles, deal strip, popular products
- Category browsing: subcategory nav, brand filters, price slider, sorting
- Product detail page: specs table, related products, add to cart / buy now
- Cart with quantity editing, persisted to `localStorage`
- Checkout: delivery details form + payment method (Cash on Delivery, bKash,
  Nagad, Card) — the four payment options commonly used by BD e-commerce
- Order confirmation page
- Search
- Fully responsive, keyboard-accessible, works down to mobile widths

No real product photography ships with this starter — product art is a
generated icon-on-gradient placeholder per category
(`src/components/ProductImage.jsx`). Swap in real image URLs once the
backend returns them (see below).

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Connecting the real Dizi Cashier backend

**Everything currently runs on mock/sample data** (`src/data/mockData.js`),
routed through a single data-access layer: **`src/lib/api.js`**. Every page
calls functions from that file — `getCategories()`, `getProducts()`,
`getProductBySlug()`, `getRelatedProducts()`, `placeOrder()` — instead of
fetching anything directly. That's the seam.

### Steps once you have API access

1. Copy `.env.example` to `.env.local` and fill in:
   ```
   VITE_API_BASE_URL=https://<the-real-api-host>
   VITE_API_KEY=<token-or-key-from-dizi-cashier>
   ```
   Note: `globalapp.dizicashier.com` itself is the **login page** for their
   POS app, not necessarily the API host — ask their support for the actual
   REST/JSON API base URL (often a separate subdomain like `api.*`).

2. Ask Dizi Cashier support for:
   - The auth method (API key header, bearer token, or session cookie from
     a login endpoint)
   - Field names/shape for products, categories, stock levels, and prices
   - **How they want orders submitted back.** Dizi Cashier is a point-of-
     sale system, so a storefront "checkout" most likely needs to create a
     **sale/order record** in their system, not a generic e-commerce order.
     Confirm the exact payload shape before relying on `placeOrder()`.

3. Open `src/lib/api.js`. Once `VITE_API_BASE_URL` is set, `USE_MOCKS`
   automatically becomes `false` and every function's `request(...)` branch
   takes over — no other file needs to change. You'll likely still need to:
   - Adjust the query params / body shapes in each function to match their
     actual API
   - Map their response fields onto the shape components expect (see the
     product object shape at the bottom of `src/data/mockData.js` — id,
     slug, name, brand, category, price, oldPrice, rating, reviewCount,
     stock, specs, description)
   - Add an `imageUrl` field to products and pass it into `<ProductImage
     imageUrl={...} />` (already wired to prefer a real image if given)

4. Currency: prices are formatted as BDT via `src/lib/currency.js`
   (`formatBDT`). If Dizi Cashier returns prices in a different unit or
   currency, adjust there.

## Project structure

```
src/
  lib/
    api.js          <- the swappable data layer (start here)
    currency.js
  data/
    mockData.js     <- sample catalog, stands in for the backend for now
  context/
    CartContext.jsx <- cart state, persisted to localStorage
  components/        <- Header (mega nav), Footer, ProductCard, etc.
  pages/             <- one file per route
  App.jsx            <- routes
  main.jsx           <- entry point
```

## Design notes

Palette and type were chosen deliberately for this brief rather than
defaulted: deep navy (`--navy-950`/`--navy-800`) as the base with a single
amber accent (`--amber`) reserved for prices and calls-to-action, Space
Grotesk for headings and Manrope for body text. Local payment methods
(Cash on Delivery, bKash, Nagad) are treated as first-class, not an
afterthought, since that's how checkout actually works for a Bangladesh
audience.
