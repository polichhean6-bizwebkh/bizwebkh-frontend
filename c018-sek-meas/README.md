# Sek Meas catalogue demo

Static product-catalogue and Telegram inquiry demo for Sek Meas Grains & Edible Oils Co., Ltd. It stores all demo data in browser localStorage, so catalogue changes made in the admin immediately appear on the public pages in that same browser.

## Run locally

From this folder run `python -m http.server 8000`, then open `http://localhost:8000`.

## Admin demo

Open `admin-login.html`. Username: `admin`; password: `admin123`. This is a demo-only browser session using sessionStorage, not secure authentication.

## Functions

- Browse, search and filter active products; view product details; select multiple products and quantities.
- Inquiry generation creates a copyable message, then opens the configurable Telegram URL. The visitor manually pastes and sends it.
- Admin can add, edit, hide, feature, delete products, manage unused categories, and reset data.
- Image uploads are small base64 images in localStorage for this demo only.

## Production needs

A server/API, secure authentication and roles, database, cloud image storage, real Telegram/contact details, server-side validation, backups and a privacy policy.

## Structure

Public pages are in the project root. Shared CSS is `assets/css/style.css`; starter data and configuration are in `assets/js/data.js`; public catalogue, inquiry and admin behaviour each have their own JS file.
