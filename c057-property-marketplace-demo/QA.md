# QA record

Verified in headless Microsoft Edge with Playwright on 2026-09-13.

- JavaScript syntax checks passed for both source files.
- Homepage featured/latest content and all photo loads passed.
- Combined purpose/location/type search, detail navigation, save toggle and inquiry simulation passed.
- Sign-up, signed-in UI, dashboard, logout and sign-in with a newly created account passed.
- Internal sample account sign-in and three seeded owned listings passed.
- Land field adaptation, photo upload preview, listing preview/submission and Pending Review status passed.
- Edit/resubmit, duplicate, sold status, deactivate and confirmed delete passed.
- Profile save passed.
- Home, properties, detail, dashboard, post, profile, my listings and about were checked at 768px and 390px with no document horizontal overflow.
- Mobile filter expansion and hamburger navigation passed.
- No JavaScript page errors occurred during the tested flows.
- Desktop/mobile full-page captures are in `qa/`; visually reviewed homepage and member workspace/form captures.
- No payment, checkout or subscription features exist.

Limitations: no live reference visual review due to site fetch timeouts; no Safari/iOS hardware testing; real backend security, moderation and message delivery are intentionally outside this demo. External Google Fonts need network access. Browser storage can be cleared or exhausted and is not a durable database.
