# Contact inquiry demo

The contact information cards were replaced with a Khmer-first, bilingual Parent / Student Inquiry form. The original contact introduction remains. The footer HTML, links, branding, content, and responsive layout are unchanged.

## Real behavior
- Required parent/guardian name, phone, and interested grade/program fields.
- Optional student name and message.
- Local validation rejects blank/whitespace-only required entries and malformed phone numbers. Khmer numerals, Cambodian local numbers, +855 numbers, and other international numbers are supported.
- Explicit labels, required attributes, associated inline errors, first-error focus, and a live status message.
- English/Khmer switching also updates errors and confirmation text.
- Two form columns on desktop/tablet; one on mobile.

## Demo-only submission
There is no endpoint, email recipient, Telegram destination, database, network send, or inquiry persistence. A visible notice asks for sample information. Values exist only in the browser's current input fields. Successful validation clears all fields and explicitly says no inquiry was sent or saved. Fields also clear when leaving the page. Autocomplete is disabled as a browser hint. With JavaScript disabled, the controls remain disabled to prevent accidental fallback form submission. The site's existing storage of the language preference is unrelated to form entries and remains in place.

## Verification
Checked English and Khmer at 375, 768, 1366, and 1920px. Verified required/whitespace validation, malformed phone rejection, Khmer digits, +855 format, optional fields, localized errors/status, cleared inputs, no network requests or URL/storage changes on submission, and disabled controls without JavaScript. No overflow or console errors. Footer source matched exactly, and rendered footer content/dimensions matched at mobile, tablet, and desktop widths. No other page section was edited.

Changed production files: `index.html`, `assets/js/i18n.js`; added `assets/js/inquiry.js` and `assets/css/inquiry.css`.
