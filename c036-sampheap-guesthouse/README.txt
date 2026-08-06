SAMPHEAP GUESTHOUSE — PRODUCTION DEMO PACKAGE
BizWeb KH | Project Code: C036
==========================================================

PROJECT
-------
Project:            C036 - Sampheap Guesthouse
Demo URL:            https://www.bizwebkh.com/c036-sampheap-guesthouse/
Upload destination:  bizwebkh-frontend/c036-sampheap-guesthouse/
Website type:        Static HTML demonstration website (front-end only)

HOW TO PREVIEW LOCALLY
------------------------
Double-click START-DEMO.bat. It starts a local Python HTTP server
on port 8080 and opens http://localhost:8080/ in your browser.
(Do not just double-click index.html — some browsers block relative
asset loading over file:// paths. Use the local server instead.)

If Python is not installed, install it from python.org and run
START-DEMO.bat again.

DEPLOYMENT NOTES (GitHub Pages subfolder)
-------------------------------------------
- This folder is designed to be uploaded AS-IS into:
  bizwebkh-frontend/c036-sampheap-guesthouse/
- index.html sits directly in the folder root (not nested).
- All asset paths are relative (assets/css/style.css, assets/js/script.js,
  assets/images/...). No root-relative ("/assets/...") or local machine
  paths are used anywhere.
- .nojekyll is included (empty file) so GitHub Pages serves the folder
  without Jekyll processing.
- No CNAME file is included. The custom domain (www.bizwebkh.com) is
  already managed by the main bizwebkh-frontend repository — do not add
  a CNAME here.

INCLUDED
--------
- Accommodation presentation (hero, about, rooms & facilities)
- Stay packages (Standard / Premium)
- Travel packages (Silver / Gold / Platinum)
- Transportation & extra services
- Explore Stung Treng destination section
- 2-day sample itinerary
- Photo gallery with lightbox
- Direct inquiry form with WhatsApp and email buttons
- English / Khmer language switch (saved in browser localStorage)
- robots.txt and sitemap.xml for search engines

NOT INCLUDED (by design — demo only)
---------------------------------------
- Backend / server-side code
- Database
- Admin dashboard
- Customer login
- Real-time room availability
- Online booking engine
- Online payment

CLIENT INFORMATION STILL NEEDED
-----------------------------------
The following are demo placeholders and must be confirmed by the
client before this goes fully live:
1. Confirmed WhatsApp number (currently a placeholder: +855 12 345 678)
2. Confirmed email address (currently a placeholder:
   info@sampheap-guesthouse.com)
3. Exact business address and Google Maps location
4. Office hours
5. Final, confirmed prices for stay packages and travel packages
6. Final room information (number of rooms, confirmed features, real
   room photos if available)
7. Final service details (rental rates, transfer pricing, boat rates)
8. Any real certifications, ratings, or social media links to add

FOLDER CONTENTS
-----------------
index.html             Main page (all sections)
assets/css/style.css   Styling
assets/js/script.js    Language switch, mobile menu, form, gallery lightbox,
                        package/service inquiry prefill
assets/images/          WebP photos used across the site
assets/icons/           Favicon
robots.txt              Search engine crawl rules
sitemap.xml             Search engine sitemap
.nojekyll               Tells GitHub Pages to skip Jekyll processing
START-DEMO.bat          One-click local preview launcher (Windows)
README.txt              This file

Prepared by BizWeb KH.
