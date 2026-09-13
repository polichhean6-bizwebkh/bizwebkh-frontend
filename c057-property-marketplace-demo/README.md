# C057 Property Marketplace — client demo

## Open the demo

Open `index.html` in a modern browser. No installation or build is required. For consistent browser storage and sharing behavior, use the included local server:

```powershell
node serve.cjs
```

Then visit http://127.0.0.1:8057. Upload `index.html`, `css/`, `js/` and `assets/` together to any static host when ready. No deployment has been made.

## Demo account

- Email: `sokha@example.com`
- Password: `Property2026!`
- Includes three sample listings for management demonstrations.
- You can also create an account with fictional details. Sign out and back in within the same browser tab using the email or phone and password you supplied.
- New accounts and their mock passwords exist in sessionStorage for this tab only. Do not enter real credentials. Closing the tab ends this mock account registry.
- Sign-in normally lasts for the tab session. Remember me retains the simulated signed-in profile in localStorage. This is not secure authentication.
- Listings and saved properties use localStorage on this device. Uploaded photos are resized locally and stored with the listing. They are never uploaded to a server.
- Clearing browser site data resets all demo changes and restores the original 16 sample properties on reload. File and HTTP previews use separate storage contexts.

## Pages and flows

Single-page HTML architecture with hash routes, so static hosting needs no route rewrites:

- `#home`: hero search, eight category links, six featured listings, latest listings and owner CTA.
- `#properties`: purpose, province, type, price, bedrooms, bathrooms, area and keyword/reference filters; sorting; grid/list views; mobile collapsible filters.
- `#property/C057-1001`: photography, specifications, description, amenities, illustrative map, representative, save/share and simulated contact/inquiry.
- `#about`: marketplace concept and owner/seeker journeys.
- Sign-up and sign-in dialogs, validation, password mismatch feedback, simulated reset flow.
- `#dashboard`: owner overview, status counts and recent listings.
- `#my-listings`: view, edit, duplicate, mark sold/rented, deactivate and delete with confirmation. Status filtering.
- `#post`: eight form sections, type-sensitive fields, mock map selection, local photo previews, contact prefill, preview and submit.
- `#edit/PROPERTY-ID`: listing edits; resubmission goes to Pending Review.
- `#saved`: saved active properties.
- `#profile`: profile details and photo.

Pending, inactive, sold and rented listings are excluded from public discovery. Owners can preview their own non-public listings. There is no real approval engine; pending listings remain pending. Sold/rented/inactive rows can be edited and resubmitted for simulated review.

## Files

- `index.html` — HTML entry and metadata.
- `css/styles.css` — responsive design, forms, dialogs and dashboard.
- `js/data.js` — locations, categories, features and 16 fictional Cambodian sample listings.
- `js/app.js` — all frontend interactions and browser state.
- `assets/*.jpg` — six locally bundled illustrative stock photographs.
- `ASSET-SOURCES.md` — photo sources and reference review notes.
- `serve.cjs` — optional local-only static preview server, not a backend.
- `qa.cjs` and `qa/` — development browser checks and visual evidence. Not needed for hosting. The QA script uses the current workstation's bundled Playwright path.
- `QA.md` — verification scope and limitations.

## Mock boundaries / next phase

This demo has no backend, database, API, server authentication, real file upload, admin portal, messaging delivery or payment functionality. Names, listing details and prices are fictional. Stock photographs illustrate property types and are not verified Cambodian listing photos. Contact actions do not initiate calls or messages; inquiry and reset screens explicitly report that nothing was sent. Maps use illustrative styling and a simulated approximate-location selection.

C057 is a replaceable wordmark. English is the initial language; Noto Sans Khmer is in the font stack and labels wrap. Khmer translation and a working language switch are not implemented. Google Fonts may require internet; system sans-serif fonts are used as fallback.

If the client approves, confirm branding, Khmer translations, listing fields and moderation rules. Then scope real authentication, database ownership rules, secure image storage, moderation/admin tools, geographic search and contact delivery. Add legal policies, accessibility/security review and production testing before launch. Posting remains free.
