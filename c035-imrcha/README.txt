====================================================================
 IMRCHA — Final Production-Ready Website Package
 Islamic Medical Relief for Cambodia Humanity Association
 Project Code: C035  |  Prepared by: BizWeb KH
 Client-facing URL: https://www.bizwebkh.com/c035-imrcha/
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
It is built to be deployed as a subfolder inside the existing
BizWeb KH main website repository (bizwebkh-frontend), so it will
be reachable at https://www.bizwebkh.com/c035-imrcha/ with no
manual editing required.

HOW TO PREVIEW LOCALLY
--------------------------------------------------------------------
Option 1 (recommended):
  Double-click START-DEMO.bat
  - If Python is installed, it starts a local server and opens the
    site automatically at http://localhost:8080/
  - If Python is not found, it opens index.html directly instead.

Option 2 (manual):
  Double-click index.html to open it directly in your browser.

HOW TO DEPLOY (SUBFOLDER SETUP)
--------------------------------------------------------------------
This package is configured to live inside the existing main
website repository, at the path:
     bizwebkh-frontend/c035-imrcha/

1. Copy the entire contents of this folder into that exact path in
   the bizwebkh-frontend repository (index.html, assets/,
   robots.txt, sitemap.xml should sit directly inside the
   c035-imrcha/ subfolder).
2. Do not add a CNAME file inside this subfolder — the domain
   (www.bizwebkh.com) is already handled at the main repository
   level.
3. All asset paths in this package are relative (e.g.
   "assets/css/style.css", not "/assets/css/style.css"), so the
   site works correctly when served from the subfolder path
   /c035-imrcha/ rather than the domain root.
4. Once deployed, the site will be reachable at:
     https://www.bizwebkh.com/c035-imrcha/

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
sitemap.xml             Sitemap for https://www.bizwebkh.com/c035-imrcha/
START-DEMO.bat          Local preview launcher (Windows)
README.txt              This file

Note: no CNAME file is included in this folder. The domain
www.bizwebkh.com is managed at the main repository level, not
within this project subfolder.

====================================================================
 Website by BizWeb KH
====================================================================
