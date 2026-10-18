# C061 · British Bridge International School

Local Starter Website demo. Open `index.html` in a browser, or serve this folder with a static HTTP server. No build, framework, backend, database, enrollment form, payment, or login is included. Not deployed.

## Files
- `index.html`: single-page site and SEO metadata
- `assets/css/style.css`: responsive styles
- `assets/css/community.css`: practical local-school styling, image ratios, and Khmer readability refinements
- `assets/css/fonts.css` and `assets/fonts/`: bundled DM Sans, Manrope, and Noto Sans Khmer fonts with licenses
- `assets/js/main.js`: navigation and accessible native-dialog gallery lightbox
- `assets/js/i18n.js`: English/Khmer translation dictionary and instant language switching
- `assets/images/favicon.svg`: temporary B favicon, not an official BBIS logo
- `assets/images/local-*.webp`: seven distinct optimized illustrative school images; see `IMAGE-NOTES.md`

All local asset paths are relative. External destinations use HTTPS and telephone links use `tel:`. Fonts and imagery are bundled locally, so the visual demo works offline. The folder can later be uploaded to GitHub Pages as-is.

## Source and content decisions
The user-provided brief was the only client material available. The C061 workspace was empty when inspected. School name, positioning, teaching benefits, languages, General English Program, September 1, 2026 term date, 20% promotion, telephone numbers, website, and Facebook display name come from that brief.

No official logo, poster, or school photographs were available. The reference photo attachments mentioned in the October 16 request were not accessible in this task. A temporary text wordmark and favicon are used. Seven new images follow the user's written direction for a clean, current-day Cambodian private school: registration, classroom exercises, teacher support, stage activities, certificates, campus, and parent meetings. Each image is used once in page content. Images are explicitly illustrative; the certificate scene is not a claim of an actual BBIS achievement. Earlier generated assets remain on disk but are no longer referenced.

## Request from the client before publication
1. Official BBIS logo in SVG or transparent PNG.
2. Original school poster/information image and approved school photographs, with permission to publish.
3. Exact physical address and, optionally, an official Google Maps URL.
4. Direct official Facebook page URL; no social link has been guessed.
5. Confirm that the September 1, 2026 term announcement and 20% General English discount remain applicable. The term date is already past as of September 24, 2026, so availability should be confirmed before publication.
6. Confirm the existing `www.bbis.edu.kh` website destination and preferred published contact details.

The demo contains only brief-confirmed claims. No accreditation, statistics, achievements, partnerships, rankings, extra programs, or tuition fees have been added.

## English / Khmer language support
The header's `EN | ខ្មែរ` buttons switch every text label immediately without reloading or duplicating the page. Khmer is the default in both the saved HTML and JavaScript, including when scripts or storage are unavailable. The new `bbis-language-v2` localStorage key remembers a deliberate selection after this revision. The previous English-default demo's key is ignored so existing demo visitors see the Khmer-first update. Invalid saved values fall back to Khmer. English remains available and a newly selected English preference persists.

Translations live in `assets/js/i18n.js` and connect to HTML using `data-i18n` and attribute translation keys. Rendering uses text nodes and explicit line breaks, never translation HTML injection. The document language, title, description, navigation accessibility labels, image descriptions, and lightbox caption update together. The official school name, branding, BBIS, contact numbers, URLs, and language names intentionally remain unchanged. Supplied approved Khmer copy is used, with Khmer translations added for existing accessibility and placeholder labels.

Khmer uses the already bundled Noto Sans Khmer font. Scoped Khmer typography allows longer labels to wrap. The existing section order and brand colors are retained, with reduced spacing, simpler rectangular photos, lighter program cards, and less decorative styling. No backend, CMS, or translation service was added.

Bilingual QA passed at 375, 768, 1366, and 1920 pixels in both English and Khmer: no viewport or card/button overflow, missing translation keys, unkeyed content text, broken section anchors, or console errors. Language switching without reload, saved preference after reload, disabled-storage fallback, mobile menu, gallery lightbox, and Escape dismissal passed. English and Khmer desktop/mobile screenshots were reviewed.

## Review checks
Verified in headless Microsoft Edge at 375, 768, 1366, and 1920 pixels: no horizontal overflow, all local images load, all section anchors resolve, and no browser console or JavaScript errors. Mobile menu opening/closing, section navigation, gallery lightbox, and Escape dismissal passed. Desktop and mobile screenshots were visually inspected. Phone links use the supplied numbers; external website availability and actual telephone calls were not tested.
