# C045 — KY Services Demo

A static one-page website demo for **KY Services**, a cleaning and pest-control business serving residential and commercial clients in Cambodia (established 2015). Prepared by **BizWeb KH** as a GitHub Pages demo build for client presentation.

This folder is upload-ready as a subfolder inside the BizWeb KH GitHub Pages repository — all asset paths are relative, so the site works correctly when served from `/c045-ky-services-github-final/`.

## What This Is

- A static, front-end-only demo site (HTML / CSS / vanilla JS)
- No backend, no CMS, no database, no payment processing, no login or admin area
- The "Send Inquiry" contact form is a front-end demo only — it shows a confirmation message on submit and does **not** transmit or store any data

## Entry Point

Open **`index.html`** — this is the single page containing every section of the site.

## File Structure

```
c045-ky-services-github-final/
├── index.html          # single-page site (all sections)
├── css/
│   └── style.css        # styling, responsive rules, animations
├── js/
│   └── main.js           # navigation, smooth scroll, scroll animations, demo form
├── assets/
│   └── images/           # reserved for local image assets (site currently uses verified remote images)
└── README.md
```

## Sections

Header (sticky nav + mobile menu) · Hero · About · Services (Daily Janitor Service, Deep Cleaning Service, External Glass Cleaning, General Pest Control, Termite Control) · Why Choose KY Services · Vision & Mission · How We Deliver Results · Residential & Commercial Clients · CTA · Contact · Footer.

## Images

All photography is served from Pexels' permanent CDN (`images.pexels.com/photos/...`), matched to each service (glass cleaning, cleaning teams, janitorial, pest control, residential/commercial exteriors). Every image URL was checked and confirmed to load before this build was finalized. Local optimized copies were not bundled in this pass — see the Known Limitation note below.

## Contact Information

- Phone: [+855 17 6666 18](tel:+855176666618)
- Email: [info@kyservices.biz](mailto:info@kyservices.biz)
- Website: [www.kyservices.biz](https://www.kyservices.biz)

No physical address or messaging-app contact (Telegram/WhatsApp) is shown, as none was supplied in the source company profile.

## SEO / Demo Settings

- `<title>KY Services | Cleaning & Pest Control Cambodia</title>`
- `<meta name="robots" content="noindex,nofollow">` — kept in place since this is a client demo, not a live production site.

## Known Limitation

This build environment could not reach general image-hosting domains to download and re-encode images to WebP, so images remain hosted on Pexels' CDN rather than bundled locally. The URLs are Pexels' stable, permanent photo-CDN links (not search or redirect links) and were each verified to return a valid image before upload. If fully self-hosted assets are required for the live GitHub Pages deployment, the same URLs can be downloaded and dropped into `assets/images/` with a quick path update in `index.html`.
