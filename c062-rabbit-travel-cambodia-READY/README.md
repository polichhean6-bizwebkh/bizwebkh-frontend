# Rabbit Travel Cambodia

Open index.html in a modern browser. All website assets are local; no installation or build is needed.

## Files
- index.html: sections, service information, inquiry fields, and footer.
- assets/css/style.css: existing design and responsive rules.
- assets/js/main.js: menu, tour details, guest gallery, and inquiry download.
- assets/images/guests/: enhanced client photography in responsive WebP sizes.
- assets/images/guests/enhanced-manifest.json: original image mappings and optimized dimensions/file sizes.
- image-credits.html: photographer credits and licenses.

## Inquiry behavior
Request Tour Info validates the form and downloads a text file containing the entered trip details. The traveler can save and share this file with the guide. No message is transmitted, no booking is confirmed, and no personal information is persisted by the site. Actual email, phone, WhatsApp, and Telegram details have not been supplied; none are fabricated or displayed.

## Confirmed services
- Killing Field Tour: $20/person; approximately four hours; 8:00 AM–12:00 PM or 1:20 PM–5:30 PM. Entrance fees and audio-guide fees are NOT included in the $20/person tour price.
- Phnom Penh Highlight City Tour: $30/person; 8:00 AM–5:00 PM.
- Street Food Tour: hotel pickup by TukTuk from 5:30 PM; contact for quote.
- Airport to hotel: car $25, van $30.
- Longer/private trips: contact for quote; route and group size determine pricing.

The About Me section contains the client-supplied biography and closing statement. TripAdvisor, Booking.com, and GetYourGuide are future connection options, with no active integration or affiliation claims. No deployment has been performed.

## Destination galleries
The six Phnom Penh cards open one native dialog using assets/css/destinations.css, assets/js/destinations-data.js and assets/js/destinations.js. Every destination has three distinct photos. Victory Monument is consistently the Win-Win Memorial; no Cambodia–Vietnam Friendship Monument images are mixed into that gallery.

Photos load on opening; only the selected photo and its immediate previous/next neighbors are decoded/preloaded. The fixed image stage and reserved status row prevent layout movement. A 160ms photo-only fade respects reduced-motion preferences. Asynchronous request guards prevent stale images from replacing newer selections or loading into a closed dialog.

Add real local image entries (src, alt, width, height) to the relevant photos array; maintain sources and credits. Keep a destination-level caption so slide changes do not change the footer height. See GALLERY-QA.md for validation details.
