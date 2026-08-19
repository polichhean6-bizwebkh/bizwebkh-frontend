# C042 – Mr. Thearith Ret E-Commerce Website Demo

Client-facing static HTML/CSS/JavaScript demo, prepared for GitHub Pages hosting.

## Includes
- Customer-facing product catalog website (home, categories, product search/filter/sort, product detail)
- Multiple-product order selection ("My Order" drawer) with quantity controls and running total
- Telegram / Facebook inquiry flow — generates a plain-text order summary (product names, quantities, prices, subtotal, estimated total, order reference) for the customer to send
- Simple admin dashboard — Dashboard overview, Products, Categories, Settings (demo login, no real authentication)
- Product / category / store-settings management, demonstrated with browser `localStorage` (no backend)

## Scope Exclusions (by design)
- No online payment or checkout
- No customer account / login / OTP
- No real order-management backend
- No delivery integration
- No production database or server

This is a **static demo only** — for client review and requirement confirmation before quotation and full development. No build step, server, or database is required; it runs directly as static files, including on GitHub Pages.

## Entry Points
- **Customer Website:** `./index.html`
- **Admin Dashboard:** `./admin/index.html`

## Demo Login (Admin)
```
Email:    admin@thearithhl.com
Password: admin123
```
Demo only — this is not a real authentication system and should not be treated as a secret.

## Folder Structure
```
c042-thearith-ret-ecommerce-github-final/
│
├── index.html            → Customer website
├── css/style.css
├── js/
│   ├── app.js
│   └── products-data.js
├── assets/                → Product illustrations, category icons, hero/about art, logo
│
├── admin/                 → Admin dashboard (self-contained)
│   ├── index.html         → Admin login
│   ├── dashboard.html     → Dashboard / Products / Categories / Settings
│   ├── css/admin.css
│   ├── js/
│   │   ├── admin.js
│   │   └── products-data.js
│   └── assets/
│
└── README.md
```

## Hosting Notes
All internal links and asset paths are relative, so the site works correctly whether deployed at a domain root or inside a subfolder, e.g. `https://www.bizwebkh.com/c042-thearith-ret-ecommerce-github-final/`. No absolute local paths, `localhost` references, or server-side dependencies are used anywhere in the project.

Product/category photography in this demo is custom-generated SVG illustrations (not external image links), so nothing can appear as a broken image, on or offline.
