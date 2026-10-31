# C035 bilingual client-testing readiness — 31 October 2026

Verdict: ready for local client review and deployment approval. Not deployed. Public release still needs the owner's privacy/legal sign-off and explicit deployment approval. Inbox delivery remains a client activation test.

## Completed and checked
- All twelve sections translated: navigation, headings/body, program lists, leadership roles, buttons, Inquiry fields, required/email validation, dialogs, gallery descriptions, footer and accessible labels. Original English main HTML is byte-for-byte unchanged. Personal names, identity, registration 7128, figures and contact details preserved. Names, brand/provider names, country codes and contact identifiers intentionally retained; provider-hosted CAPTCHA/results are outside our translation control.
- EN/KM switching checked in both directions; desktop 1440px, tablet 1024px, mobile 390px. No horizontal overflow or detected text clipping. Existing Khmer fonts retained. Client editorial review of Khmer is still welcome; no certified translation is claimed.
- All local references resolve; all page images loaded after scrolling sections. Internal anchors have targets. Mobile menu and translated Learn More/gallery controls work. No browser console errors observed.
- Existing Facebook and Maps destinations unchanged: https://www.facebook.com/profile.php?id=61593967689308 and https://maps.app.goo.gl/jbU9ERJQnJbVrmw36?g_st=atm . Destination content/third-party availability is not controlled by this site.
- FlagCounter NzVZ preserved. No image before opt-in. Opt-in loaded genuine statistics; withdrawal, decline and reload leave no counter image/source. Accessible bilingual footer notice covers provider, transmitted data, US processing, public totals, retention claims, policy link and withdrawal limits. No persistent tracking consent is inferred.
- FormSubmit POST endpoint: https://formsubmit.co/imrcha.org@gmail.com . Name/email/message required; phone optional. Empty and invalid-email checks reject input, valid fields pass locally, button enabled. Local feedback does not claim delivery. No test inquiry sent. CAPTCHA remains enabled; provider acceptance and Gmail delivery NOT confirmed.
- Hash comparison shows no image or unrelated source changes. No push/deployment.

## Owner decision
Review FLAG-COUNTER-SETUP.md and the implemented privacy notice. Applicable legal jurisdiction and international-transfer obligations remain an owner/legal decision. Conservative prior opt-in is implemented while this is unresolved; do not interpret this as legal certification or remove the gate without review. Counts now represent opted-in visits, not all visitors.

## Client activation, after approved hosting
1. Open the approved test website and send one clearly labelled test inquiry using the client's own email.
2. Complete CAPTCHA if prompted in the NEW FormSubmit tab; read the actual result. Original entries remain in the original tab. Provider pages may have their own language.
3. In imrcha.org@gmail.com, check Inbox/Spam and click the activation email link personally. An already activated endpoint may skip activation.
4. Send a fresh test and confirm actual receipt, subject [IMR-CHA Website] New Inquiry, all fields, timestamp and Reply-To. Check receipt before retrying an uncertain result. No credentials or activation links need to be shared here.

## Files and package
Runtime changes: index.html; assets/css/style.css; assets/js/script.js; new assets/js/khmer.js.
Documentation updated: FLAG-COUNTER-SETUP.md, INQUIRY-SETUP.md, README.txt, CLIENT-TESTING-RELEASE.md.

Local preview: http://127.0.0.1:8082/ (this computer only).
Intended hosted URL: https://www.bizwebkh.com/c035-imrcha/ . This candidate is not published there.
Publish index.html, robots.txt, sitemap.xml and all assets/ files, preserving paths inside bizwebkh-frontend/c035-imrcha/. No setup notes, PDFs, README, launcher or CNAME. Public testing is not private hosting.

The new C035-client-testing-bilingual.zip supersedes the previous candidate. Exact files/hashes are in C035-BILINGUAL-PUBLISH-MANIFEST.txt beside it. Packaging was performed after local QA; neither artifact authorizes deployment.
