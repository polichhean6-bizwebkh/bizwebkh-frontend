====================================================================
 IMRCHA — Final Production-Ready Website Package
 Islamic Medical Relief for Cambodia Humanity Association
 Project Code: C035  |  Prepared by: BizWeb KH
 Client-facing domain: https://c035.bizwebkh.com/
====================================================================

PROJECT NAME
--------------------------------------------------------------------
IMRCHA Website Demo — Islamic Medical Relief for Cambodia Humanity
Association (Short Name: IMRCHA)

FOLDER PURPOSE
--------------------------------------------------------------------
This folder is the final, production-ready package for the IMRCHA
website demo. It contains only the files needed to run the site —
no source backups, drafts, design references, or development notes.
It is ready to be uploaded directly to hosting, configured for the
client-facing domain https://c035.bizwebkh.com/, with no manual
editing required.

HOW TO PREVIEW LOCALLY
--------------------------------------------------------------------
Option 1 (recommended):
  Double-click START-DEMO.bat
  - If Python is installed, it starts a local server and opens the
    site automatically at http://localhost:8080/
  - If Python is not found, it opens index.html directly instead.

Option 2 (manual):
  Double-click index.html to open it directly in your browser.

HOW TO UPLOAD (HOSTING SETUP)
--------------------------------------------------------------------
This package is configured for the client-facing domain:
     https://c035.bizwebkh.com/

1. Upload the entire contents of this folder to the hosting
   repository root (index.html, assets/, robots.txt, sitemap.xml,
   and CNAME should sit at the top level — not inside an extra
   subfolder).
2. Configure the hosting provider's custom domain setting to use
   c035.bizwebkh.com, and point the domain's DNS records to the
   hosting provider as required.
3. A CNAME file containing exactly "c035.bizwebkh.com" is already
   included in this package for that setup.
4. All asset paths in this package are relative (e.g.
   "assets/css/style.css", not "/assets/css/style.css"), so the
   site will continue to work correctly regardless of where it is
   deployed from.

WHAT THIS IS
--------------------------------------------------------------------
This is a fully static HTML, CSS, and JavaScript demo website.
It includes:
- English (default) and Khmer language switch, saved with
  localStorage, using Noto Sans Khmer for Khmer text
- Responsive layout for desktop, tablet, and mobile
- Sticky header with mobile hamburger menu
- Hero, About, Focus Areas, Featured Program, Impact, How We Work,
  Gallery (8 unique images with lightbox), Get Involved,
  Transparency, Contact, and Footer sections
- Contact form demo (front-end only, shows a success message)
- Basic SEO metadata, Open Graph tags, robots.txt, and sitemap.xml

CONFIRMATION — NO BACKEND FUNCTIONALITY
--------------------------------------------------------------------
This package does NOT include and does NOT connect to:
- A backend server or API
- A database
- A login or admin dashboard
- A content management system (CMS)
- Any payment or donation checkout functionality

The contact form is a front-end demo only. Submitting it displays a
success message in the browser; no data is sent, stored, or emailed
anywhere.

FOLDER CONTENTS
--------------------------------------------------------------------
index.html              Main website page
assets/css/style.css    All styling
assets/js/script.js     Language switch, menu, gallery, form demo
assets/images/          Logo, hero/about/featured photos, gallery
assets/icons/           Favicon (.ico and .svg)
robots.txt              Search engine crawl rules
sitemap.xml             Sitemap for https://c035.bizwebkh.com/
CNAME                   Custom domain file (c035.bizwebkh.com)
START-DEMO.bat          Local preview launcher (Windows)
README.txt              This file

====================================================================
 Website by BizWeb KH
====================================================================
