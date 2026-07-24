# Kep Ocean Resort — Website & Booking Dashboard Demo

A frontend concept and booking-system demonstration prepared by **BizWeb KH** for
client review. This project includes a public resort website, a multi-step
villa booking flow, and an internal booking-management dashboard — all built
with realistic sample data and no backend dependency.

> **Demo scope.** This is a polished, functional frontend demo only. There is
> no real database, authentication server, payment gateway, or notification
> service connected. See [Production Considerations](#production-considerations)
> below for what's needed to go live.

## ⚠️ Local Preview — Read This First

**Do not double-click `index.html`.** Opening it directly in a browser (a
`file:///...` address) will show a **blank white screen**. This is normal
browser behavior for any modern JavaScript app — browsers block ES module
scripts from running over the `file://` protocol for security reasons. It is
not a bug in this project, and it does not affect the real, deployed site.

To preview the site correctly, always run it through a local server using one
of the options below.

### Easiest option — double-click a `.bat` file (Windows)

| File | What it does |
|------|----------------|
| **`START-DEMO.bat`** | Installs dependencies (first run only) and starts the live development server. Use this for day-to-day preview while reviewing the site. |
| **`PREVIEW-BUILD.bat`** | Builds the production bundle and serves it locally, exactly as it will behave once deployed. Use this as a final check before publishing. |

Just double-click either file. A Command Prompt window will open, run the
necessary steps, and print a local URL to open in your browser (e.g.
`http://localhost:5173/`). If anything fails, the window stays open so you can
read the error message instead of it closing immediately.

### Manual option — npm commands (any OS)

```bash
npm install       # first time only, or after pulling new changes
npm run dev       # live preview with hot reload, for development
npm run build     # production build, output goes to dist/
npm run preview   # serve the production build locally
```

### URLs once the server is running

- **Public website:** `http://localhost:5173/` (or `:4173` when using preview/`PREVIEW-BUILD.bat`)
- **Admin dashboard:** add `#/admin` to the same address, e.g. `http://localhost:5173/#/admin`

### Demo admin login

| Field    | Value                        |
|----------|-------------------------------|
| Email    | `admin@kepoceanresort.com`   |
| Password | `demo123`                    |

This is a **client-side demo login only** — it is not secure authentication
and must not be used in production.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router (`HashRouter`, chosen specifically so the site works correctly
  on GitHub Pages and other static hosts with zero server configuration, and
  so browser refreshes never produce a 404)
- lucide-react icons
- No backend — all data lives in `src/data/*.ts` and in-memory React context

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install
```bash
npm install
```

### Run locally
```bash
npm run dev
```
Visit the printed local URL (typically `http://localhost:5173`). For the
admin dashboard, go to `http://localhost:5173/#/admin`.

### Build for production
```bash
npm run build
```
Output is generated in `dist/`. Preview the production build locally with:
```bash
npm run preview
```
(typically `http://localhost:4173`, dashboard at `http://localhost:4173/#/admin`)

Windows users can run `START-DEMO.bat` or `PREVIEW-BUILD.bat` instead of
typing these commands manually — see [Local Preview](#️-local-preview--read-this-first) above.

## GitHub Pages Deployment — BizWeb KH

This project is fully ready to publish. It uses relative asset paths
(`base: './'` in `vite.config.ts`), so it works correctly under a repository
subpath like `/kep-ocean-resort/` with no extra configuration, and it uses
`HashRouter` so page refreshes and direct links (including the dashboard)
never produce a 404 on GitHub Pages.

### Exact steps (no coding required)

1. Create a new GitHub repository named **`kep-ocean-resort`**.
2. Keep the repository **Public** if your GitHub plan requires that for
   GitHub Pages (Public repos always support Pages; some paid plans also
   support Pages on Private repos).
3. Upload or push all project files to the repository (the complete source
   project — see [Files to Upload](#files-to-upload) below).
4. Make sure the code is on the **`main`** branch.
5. In the repository, open **Settings**.
6. Open **Pages** in the left sidebar.
7. Under "Build and deployment", set **Source** to **GitHub Actions**.
8. Wait for the **Deploy to GitHub Pages** workflow (under the **Actions**
   tab) to finish — it installs dependencies, builds the project, and
   publishes it automatically. This normally takes 1–2 minutes.
9. Open the generated website URL shown in **Settings → Pages** (or in the
   workflow's summary once it completes).

### Expected URLs

- **Website:** `https://[github-username].github.io/kep-ocean-resort/`
- **Dashboard:** `https://[github-username].github.io/kep-ocean-resort/#/admin`

Replace `[github-username]` with whichever GitHub account/organization the
repository is created under — this is decided when the repository is
created, not hardcoded anywhere in the project.

### Demo login
Email: `admin@kepoceanresort.com` — Password: `demo123`

### Updating the project later / triggering a new deployment
Any push to the `main` branch automatically re-runs the workflow and
re-publishes the updated site — there is nothing else to configure. To
re-run a deployment without changing code, open the **Actions** tab, select
the **Deploy to GitHub Pages** workflow, and click **Run workflow**.

### Removing the demo `noindex` setting after client approval
This demo is intentionally hidden from search engines until the client
approves it (see [Search Engine Protection](#search-engine-protection-for-demo)
below). Once approved and ready for the public official launch:
1. Open `index.html` and delete the `<meta name="robots" content="noindex, nofollow" />`
   line (it is marked with a comment for easy removal).
2. Open `public/robots.txt` and remove the `Disallow: /` line (or delete the
   file, or replace it with a normal `Allow: /` policy).
3. Rebuild and redeploy (push to `main`).

### Troubleshooting

**The published page is blank / shows nothing.**
- Confirm **Settings → Pages → Source** is set to **GitHub Actions** (not
  "Deploy from a branch").
- Confirm the repository name is exactly `kep-ocean-resort` — the build
  assumes a subpath deployment and uses relative paths, so this works for
  any repository name, but the URL you open must match the actual repo name.
- Open the browser console on the published page and check for a 404 on any
  `.js` or `.css` file — if you see that, the Pages deployment may still be
  processing; wait a minute and hard-refresh (Ctrl+Shift+R).

**The GitHub Actions build failed (red ✕ under the Actions tab).**
- Click into the failed run and open the failing step's log.
- Most common cause: `package-lock.json` was not uploaded. Make sure it is
  included in the repository (see [Files to Upload](#files-to-upload)).
- If the log shows a dependency or TypeScript error, it means the source
  code was modified after this demo was prepared — restore the original
  files or contact BizWeb KH for support.

**The dashboard shows a blank page after refresh.**
- This project uses `HashRouter` specifically to prevent this. If it still
  happens, confirm the URL still contains `#/admin` after the refresh — if
  the `#` was dropped by copy/paste, re-add it.

### Files to Upload
The GitHub repository should contain the **complete source project** —
`.github/`, `public/`, `src/`, `.gitignore`, `index.html`, `package.json`,
`package-lock.json`, the `tsconfig*.json` files, `vite.config.ts`, and
`README.md`. GitHub Actions builds the project automatically and publishes
only the compiled result — you do not upload a `dist` folder yourself, and
you never need to open or edit any of these files to publish the site.

## Demo Admin Login

Dashboard URL: append `#/admin` to the site URL (e.g. `/#/admin`)

| Field    | Value                        |
|----------|-------------------------------|
| Email    | admin@kepoceanresort.com     |
| Password | demo123                      |

This is a **client-side demo login only** — it is not secure authentication
and must not be used in production.

## Project Structure

```
src/
  data/            Mock data & editable config (villas, bookings, guests,
                    menu, orders, experiences, reviews, gallery, resortConfig.ts)
  types/           Shared TypeScript types
  context/         App-wide state: bookings store, admin auth, booking wizard
  components/
    layout/        Header, Footer, PublicLayout
    ui/             Button, Badge, Container, SectionHeading
    public/         VillaCard, SearchWidget
    dashboard/      StatCard, ConfirmDialog
  pages/
    public/         Home, Villas, VillaDetail, Dining, Bar, Experiences,
                    Gallery, About, Contact, PolicyPage, NotFound
    booking/        6-step booking flow + confirmation
    dashboard/      Admin login + 10 dashboard modules
  lib/format.ts     Currency/date formatting helpers
START-DEMO.bat       Windows one-click dev server launcher
PREVIEW-BUILD.bat    Windows one-click production build + preview launcher
```

### Editable content
Nearly all business content (resort name, contact details, policies, hero
copy, deposit %, service charge %) lives in **`src/data/resortConfig.ts`** so
BizWeb KH can update client details in one place. Villa, menu, experience,
and review data live in their own files under `src/data/`.

## Pages Created

**Public website:** Home, Villas (listing + filters), Villa Details (8
villas), Dining, Bar, Experiences, Gallery (filterable + lightbox), About,
Contact, and Privacy / Booking Terms / Cancellation policy pages.

**Booking flow:** Search Availability → Select Villa → Extras → Guest
Information → Review & Payment Method → Confirmation (with a generated
`KOR-2026-XXXX` reference, print/download actions).

**Dashboard (`/#/admin`):** Overview, Bookings (list + detail with status
actions, payments, notes, activity timeline), Calendar (Week/Month/Timeline
views), Villas, Guests (list + profile), Food & Bar (menu, orders,
categories, availability), Payments, Reports, Website Content (preview/edit
simulation), Settings.

## Sample Data

- 8 villas with distinct types, pricing, and status
- 23 bookings across multiple weeks with varied statuses and payment states
- 16 guest profiles (Cambodian & international names)
- 23 menu items across 11 categories
- 11 sample guest food/bar orders

Bookings submitted through the public booking flow are added to this
in-memory dataset for the current browser session and immediately appear in
the dashboard — there is no persistence between sessions or across devices.

## Search Engine Protection for Demo

This deployment is a **private client-review demo**, not Kep Ocean Resort's
official published website. To keep it out of search engines while it's
still in review:

- `index.html` includes `<meta name="robots" content="noindex, nofollow" />`
- `public/robots.txt` disallows all crawling (`Disallow: /`)
- No sitemap is included, and the demo is not linked from any public listing

See [Removing the demo noindex setting after client approval](#removing-the-demo-noindex-setting-after-client-approval)
above for exactly what to remove when the official site is ready to launch.

## Production Considerations

This is a frontend concept and booking-system demonstration prepared for
client review. Production booking operations require a secure backend,
database, authentication, notification services, data protection, backups,
and appropriate payment integration. Specifically, before this project can
go live it needs:

- A real backend/API and database (bookings, guests, villas, payments, orders)
- Real authentication for the dashboard (replacing the demo login)
- A real payment integration (KHQR, card, bank transfer reconciliation)
- Email/Telegram/WhatsApp notification services for booking confirmations
- Server-side availability locking to prevent double-bookings
- Real content management for the "Website Content" module
- Final photography to replace the Unsplash placeholder images in `src/data/images.ts`
- A production domain, hosting, backups, and monitoring

## Quality Checklist (completed for this demo)

- All routes tested and reachable, no broken links
- Full booking flow tested end to end
- Dashboard navigation tested across all 10 modules
- Responsive layouts verified for mobile, tablet, and desktop breakpoints
- Production build (`npm run build`) completes with no errors
- No placeholder "Lorem ipsum" text remaining
- Images sourced consistently via `src/data/images.ts` for easy replacement
- `npm run dev`, `npm run build`, and `npm run preview` all verified working
