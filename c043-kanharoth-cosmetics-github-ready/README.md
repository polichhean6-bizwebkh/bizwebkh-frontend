# Kanharoth Cosmetics Demo

Static, GitHub Pages-ready presentation demo for Ms. Kanharoth Heang. No build tools or server code are required.

## Run locally

Open `index.html` in a browser, or serve this folder with any static-file server.

## Pages

- `index.html` — homepage with single-image hero, categories, featured products, FAQ, and Telegram CTA
- `products.html` — catalog, category filter, sorting, and search
- `product-detail.html` — product detail, quantity selection, cart, and Telegram order action
- `cart.html` — cart review, customer information, order summary, and Telegram handoff
- `about.html` and `contact.html` — brand and contact pages
- `admin.html` — Dashboard, Products, Categories, Orders, and Settings

## Catalog and assets

The catalog contains 20 products, all backed by the prepared cosmetic photography in `images/`. The single hero uses `images/img01.jpg`; `images/img10.jpg` supports the About page. No placeholder product illustrations are included.

## Order flow

Product → Add to Cart → Customer Information → Telegram handoff.

The Telegram summary includes customer details, products, quantities, unit prices, total amount, delivery address, and optional note. Update the demonstration Telegram username and group link in `js/telegram.js` before a real launch.

## Admin demo

Admin data is stored only in the browser's `localStorage` for presentation. It is not connected to the public catalog in this static demo. The dashboard focuses on order fulfillment and stock: total, new, confirmed, and preparing orders; total products; and low-stock products.

## Hosting

Upload the contents of this folder to a GitHub Pages repository or a static host. All page, asset, and script paths are relative, so the demo works when hosted in a subfolder.
