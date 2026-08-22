# C043 — Ms. Kanharoth Heang E-Commerce Demo
## Option 2: E-Commerce + CMS/Admin + KHQR Payment — $899 Package Demo

This folder contains a **client presentation demo** matching the agreed **$899 quotation scope** for the C043 project (Option 2). It is built with plain HTML, CSS and JavaScript (no build tools required) so it can be opened directly in a browser or hosted on any static web host for the client review.

> **This is a DEMO only.** It does not process real payments, does not connect to any bank or KHQR provider API, and does not store or transmit real customer financial data. All product, order, customer and payment data shown is fictional sample data generated for this presentation.

---

## How to view the demo

Open `index.html` in a browser (double-click the file, or serve the folder with any static file server, e.g. `npx serve .`). All pages link to each other — no server/build step is required. Admin is reached directly by opening `admin/index.html` — there is intentionally no link to it from the public site (see below).

## Site map

| Area | File |
|---|---|
| Homepage | `index.html` |
| Product catalog (search/filter) | `shop/index.html` |
| Product detail | `product/index.html?id=P001` |
| Cart | `cart/index.html` |
| Checkout (customer + delivery + payment method) | `checkout/index.html` |
| KHQR demo payment screen | `payment/index.html?order=ORD-XXXX` |
| Order confirmation | `order-success/index.html?order=ORD-XXXX` |
| Admin / CMS dashboard (not linked from the public site) | `admin/index.html` |

`css/style.css` holds all shared styling. `js/data.js` holds demo product/order/customer/payment data. `js/i18n.js` holds the Khmer/English text dictionary. `js/app.js` and `js/layout.js` hold shared cart/header/footer/floating-cart logic. `js/admin.js` powers the admin dashboard.

## What this demo shows (matches the $899 scope)

**Customer side:** homepage, product catalog with search/filter, product detail page, a multi-item cart with a **floating mini-cart** for quick feedback, guest checkout (no login required) with customer + delivery information, order summary, and a KHQR / Cash on Delivery / Bank Transfer payment choice, followed by a **Demo KHQR payment screen** and an order confirmation page. Pending / Paid / Failed payment states can all be demonstrated (see below).

**Admin side (CMS):** a simple dashboard with operational KPI cards and recent activity, product management (add/edit/deactivate/delete demo products), category management, order management with status updates, and a payments log — plus a settings page including a KHQR section clearly marked **"Demo / Not Connected."** The admin menu intentionally contains only: **Dashboard, Products, Categories, Orders, Payments, Settings** — see "Out of scope" below for what was deliberately left out.

## Floating mini-cart

Clicking **Add to Cart** anywhere on the site no longer redirects the customer to the cart page. Instead a floating mini-cart appears (bottom-right on desktop, a slim bar at the bottom of the screen on mobile) showing the item count and subtotal, with a small bump animation and a **View Cart** button. It updates live as items are added or the quantity changes, and stays out of the way of page content. It's hidden on the cart/checkout/payment/confirmation pages since the cart is already the main content there.

## Demonstrating the KHQR payment flow

1. Add a product to the cart (the floating mini-cart appears) and click **View Cart**, then **Proceed to Checkout**.
2. Fill in the customer/delivery form (any sample values work) and leave **KHQR** selected as the payment method (it is the recommended default).
3. Click **Place Order & Pay** — this opens the **Demo KHQR Payment** screen, clearly labeled "Demo KHQR" with a placeholder QR graphic, the order number and amount.
4. Click **I Have Paid** to simulate a successful payment (shows "Checking payment…" then "Payment Successful" and redirects to the order confirmation page).
5. To show the **failed payment** state instead, use the small "Presenter: simulate failed payment" link on that screen, which demonstrates the Failed status and a Try Again option.
6. All orders and their Pending / Paid / Failed / order-status values are visible immediately afterward in **Admin → Orders** and **Admin → Payments**.

Order statuses in this demo are kept simple, matching the $899 scope: **New → Confirmed → Preparing → Completed**, with **Cancelled** available at any point. No shipping/warehouse-level statuses are included.

## Language

The site defaults to **Khmer** (Noto Sans Khmer) with an **EN** switch in the top bar (and inside the Admin sidebar). The selection is remembered per-browser for this demo session.

## Demo data & state

Cart contents and any orders placed during a demo session are stored in the browser's `localStorage` so the flow feels real when clicking through the demo. This is **client-side only** — nothing is sent to a server or database. Clearing the browser's site data (or opening the site in a private/incognito window) resets the demo to its original seed data (25 sample products, 13 sample orders, 8 sample customers used only to populate order records, and their related payment records).

## Out of scope for this $899 demo (by design)

To keep this demo an accurate preview of the $899 package — and avoid setting expectations for features that weren't quoted — the following were intentionally left out:

- **No Admin/Dashboard link on the public website.** The customer-facing site looks and behaves like a normal e-commerce storefront; admin access is a separate, unlinked URL.
- **No standalone Customers (CRM) module.** Customer name, phone, email and delivery address are still visible inside each order's detail view — there just isn't a separate customer-management page/menu.
- **No Promotions module.** Discount/promotion management is treated as an additional feature for a future phase, not part of this package.
- **No Reports/analytics module.** The dashboard's KPI cards and "recent activity" tables cover day-to-day visibility; dedicated charts/reports are not part of this package.
- **No customer login/profile, loyalty/points, or OTP/SMS verification.** Checkout is guest-only.
- **No advanced inventory workflow, marketplace sync, or advanced delivery/shipping integration.**
- **No mobile app** — this is a responsive website only.

## Important — what is NOT included (by design, payment-specific)

This build intentionally does **not** include, and must not be mistaken for, a production payment system:

- No real KHQR / EMV QR payload is generated — the QR graphic on the payment screen is a decorative placeholder pattern only.
- No connection to any bank, Bakong, or payment provider API.
- No real merchant credentials, API keys, or account secrets are used or stored anywhere in this code.
- No real transactions are processed and no real customer financial data is collected.
- Admin login is not a real authentication system (demo mode, no password) — for production this must be replaced with real authenticated access.

## Note for production implementation (internal — not shown prominently to the client in the UI)

When this project moves from demo to a real production build, Option 2's payment flow will require:

- A licensed KHQR/payment provider integration (e.g. Bakong KHQR via a bank or PSP), including a real merchant account and onboarding.
- A secure backend service to generate real, signed KHQR payloads per order and to hold any provider credentials — never in front-end code.
- A webhook or polling integration with the provider to receive real payment confirmation events (the "I Have Paid" button in this demo is a stand-in for that automatic confirmation).
- Payment verification and reconciliation logic, plus transaction logging/audit trail.
- Error handling for expired QR codes, partial payments, timeouts, and provider outages.
- Awareness of any provider transaction fees/charges, which affect pricing.
- A real authentication system for the Admin/CMS area, with role-based access.

## Scope reminder

This build reflects the **$899 Option 2 package** (e-commerce website + CMS/Admin product management + cart/checkout + one supported online payment / KHQR demo integration + basic order/payment status management), for comparison against Option 1 (catalog + CMS/Admin + inquiry-only, no checkout/payment).
