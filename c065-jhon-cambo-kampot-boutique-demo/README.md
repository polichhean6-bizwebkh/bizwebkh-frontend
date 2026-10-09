# Kampot Haven Boutique — Jhon Cambo website review

Local, buildless HTML/CSS/JavaScript website. Created exclusively inside the C065 client folder. Nothing has been deployed or uploaded to GitHub. The existing quotation PDF is unchanged.

## Open

Open `index.html` in a modern browser. For the most reliable clipboard and browser testing, run a static server from this folder, for example `python -m http.server 8766 --bind 127.0.0.1`, and visit `http://127.0.0.1:8766`. No installation, build, backend, or API keys are required.

## Files

- `index.html`: complete single-page website, SEO/OG metadata, configurable map area, contact form, native dialog.
- `assets/css/style.css`: responsive design, Khmer typography, reduced-motion support.
- `assets/js/main.js`: EN/KH text, room and gallery data, galleries, inquiry validation and contact configuration.
- `assets/images/`: locally optimized WebP photography in three sizes, favicon, and an original SVG area-map illustration.
- `assets/image-sources.json`: image origin and license records.
- `photo-credits.html`: visible image attribution linked in the footer; retain it with the photos.
- `tools/`: local development helpers, QA script, reports and screenshots. Not required for a static upload.
- `FILE-MANIFEST.txt`: exact relative file inventory.

## Features

Four room concepts with four or five different photographs each; fixed media stage, arrows, thumbnails, counter, Escape, keyboard arrows, native focus containment, focus restoration, touch swiping. Twelve-image property gallery with seven filters. Five photographed Kampot destination cards. Navigation, a mobile menu, bilingual content, lazy-loaded responsive images, and restrained reveal animations.

The location section shows a local, explicitly not-to-scale Kampot area illustration and a button to load the Google Maps iframe. A separate Google Maps link always opens the city-level search. The map does not identify the unconfirmed property location. Google Maps and optional Google Fonts require internet access; fallback fonts and the local map illustration keep the page usable without them.

## Inquiry behavior

The form validates required fields and date order, then prepares a readable message. With missing contact configuration, it explicitly says nothing was sent and no reservation was made, and offers the message for copying. It never posts data to a server or stores guest details. Language preference alone is stored locally when the browser permits it.

After verified details are added to `CONFIG` at the top of `assets/js/main.js`, the prepared message offers an email or Telegram app link. Users send it from that app. Website actions never confirm a booking. Test each configured contact on the client's intended devices before release. The phone link becomes `tel:` once configured. Empty contacts lead to the inquiry section with an honest explanatory notice.

## Client confirmation required

1. Real property name, logo, and approved English/Khmer spelling. `Kampot Haven Boutique` is a temporary internal concept.
2. Original, approved property photography. The hospitality images are stock visual references, not images of this property. Room gallery views are not a verified set of the same physical room. Destination images show actual Kampot locations.
3. Actual room names, bed arrangements, guest limits, descriptions, room-specific photos, and facilities. Room specifications are illustrative. No room sizes or prices are asserted.
4. Confirmed amenities, including Wi-Fi, breakfast, garden/lounge access, air conditioning, parking, or any other services. No pool is claimed or shown in the selected website imagery.
5. Exact address, property Google Maps place link, iframe URL, and arrival instructions. No distances or street address are invented.
6. Property email, telephone, and Telegram username. The quotation's BizWeb KH contacts are NOT the hotel's contacts.
7. Inquiry handling, rates, payment/cancellation policies if later needed, and final approved translations. A Khmer-speaking client should review the representative Khmer copy before publication.
8. Final domain and sharing metadata. Add a canonical URL and convert `og:image` to an absolute hosted URL after the domain is confirmed.

## Scope

Static informational site only. No booking engine, automatic confirmation, live availability, payments, database, dashboard, CMS, login, OTP, or API integrations. No invented reviews, awards, ratings, or room counts. No prohibited demo labels appear in the customer-facing page.

## QA

Automated browser checks are in `tools/qa.cjs`; results are saved to `tools/qa-results.json`. Screenshots cover English and Khmer at desktop and mobile sizes. QA checks 1440, 1280, 768 and 390 px layouts, horizontal overflow, image loads, JavaScript errors, room image uniqueness, fixed gallery height, filters, arrows, Escape, room preselection, mobile navigation, invalid dates, prepared message content and the unconfigured Telegram state.

Google map loading is an external service and can be blocked by a browser/network policy; the local area illustration and direct Maps link provide a useful fallback. Client contact delivery cannot be tested until actual endpoints are supplied.

## Photography

See `photo-credits.html` and `assets/image-sources.json`. Images were resized and converted to WebP; display crops use CSS. Creative Commons image derivatives retain their corresponding source license. Do not remove the image credits if retaining those photos. Stock images should be replaced with the property's own approved photography for launch.

For a future static upload, only `index.html`, `photo-credits.html`, and `assets/` are needed. This task does not authorize deployment.
