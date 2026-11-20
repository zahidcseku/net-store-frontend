# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Net Store" — a React 18 + Vite electronics storefront for a UK audience (GBP pricing; Card/PayPal/Apple Pay/Google Pay checkout; based in Dagenham, London), built to eventually run against the **Dizi Cashier** POS backend. It currently runs entirely on an in-memory mock catalog.

## Commands

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build
```

There are no tests and no linter/formatter configured.

## Architecture

### The data layer seam: `src/lib/api.js`

Every page fetches through the functions in `src/lib/api.js` (`getCategories`, `getProducts`, `getProductBySlug`, `getRelatedProducts`, `placeOrder`) — never `fetch` directly. `USE_MOCKS` is `!VITE_API_BASE_URL`: with no `.env.local` (see `.env.example`), functions resolve from the mock catalog (with an artificial ~350ms delay so loading states are visible); once `VITE_API_BASE_URL` is set (plus optional `VITE_API_KEY`, sent as a bearer header by the `request` helper), the `request(...)` branches take over with no other file changing. When wiring the real backend, only the bodies of these functions should change.

One exception to the seam: `Header.jsx` and `Footer.jsx` import `categories` directly from `src/data/mockData.js` for the mega-nav and footer link lists — they don't go through `api.js`.

`placeOrder` is a known open question: Dizi Cashier is a POS, so checkout probably needs to create a "sale" record, not a generic order — payload shape must be confirmed with their support.

### Product shape contract

The mapped product objects at the bottom of `src/data/mockData.js` (`id`, `slug`, `sku`, `name`, `brand`, `category`, `subcategory`, `price`, `oldPrice`, `rating`, `reviewCount`, `stock`, `badge`, `specs`, `description`) define the shape components expect. Any backend response must be mapped onto this (plus an optional `imageUrl` — `ProductImage.jsx` renders a generated icon-on-gradient placeholder per category and already prefers a real `imageUrl` when given).

### State & routing

- Cart lives in `src/context/CartContext.jsx`: `useReducer` + persistence to `localStorage` (key `netstore-cart-v2`); quantity changes are clamped to `stock`. Consume via `useCart()`.
- Routes are declared in `src/App.jsx`: `/`, `/category/:categoryId`, `/product/:slug`, `/cart`, `/checkout`, `/order-confirmation`, `/search`, `/track-order`, `/account`, `*`. One file per route in `src/pages/`. `/track-order` and `/account` are static "coming soon" placeholders.

### Conventions & gotchas

- Styling is plain co-located CSS (no framework). Design tokens are CSS variables in `src/index.css` — deep navy base (`--navy-950`/`--navy-800`) with amber (`--amber`) reserved for prices and CTAs.
- Beyond React Router, the UI stack is framer-motion (entrance/hover animations), lucide-react (all icons), and Radix's NavigationMenu (header mega-nav, styled by `NavigationMenu.css`). The header search is `ActionSearchBar.jsx` — a ⌘K-focusable quick-action palette whose Enter/submit navigates to `/search?q=…`.
- Static imagery in `public/` is optimized WebP (`hero.webp` from `dev-resources/banner/banner.png`, `logo.webp`) plus `phone.png` and the Black Friday set — two banner strips (`bf-event-banner.webp`, `bf-speaker-giveaway.webp`, 1600px wide) and nine offer cards (`offer-*.webp`, 640px wide), converted from `dev-resources/extracted-images-2026-11-19-12-04-08-214/`; full-size originals live in `dev-resources/` — resize/re-encode before copying new ones in, and keep them ≤2× their on-screen size. The home page shows the hero, then the two Black Friday banner strips around a nine-card offers grid (3 columns desktop, 2 ≤860px) — none of them links yet.
- Currency goes through `formatPrice` (`src/lib/currency.js`) — GBP with `en-GB` grouping (`£1,249`). All prices across pages, cart, and checkout use it; the category filter's price slider bounds are also £-scaled in `CategoryPage.jsx`.
- Checkout payment methods (Card, PayPal, Apple Pay, Google Pay) are UK-market choices, and delivery pricing (£5 flat, free over £100) is defined in both `CartPage.jsx` and `CheckoutPage.jsx` — keep them in sync.
- The header brand is the logo image `public/logo.png` (alt text in `Header.jsx`); the store name as text appears in `Footer.jsx`, the `index.html` `<title>`, and the mock data descriptions. The cart's localStorage key and mock order-ID prefix (`NS…`) also derive from it.
- Contact details (+447782377307, 734 Green Lane, Dagenham RM8 1YX) are hardcoded in two places: the top bar in `Header.jsx` and the brand column in `Footer.jsx`.
