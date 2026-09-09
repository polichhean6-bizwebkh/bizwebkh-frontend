# TEA DONG CMS demo

Open `index.html` directly in a modern browser. No installation or build step is required. This is a frontend concept, without accounts, authentication or a backend.

Keep this folder beside `c053-tea-dong-website-demo`. Serve the parent folder locally for automatic cross-tab content updates. Both demos must use the same host and port. With direct file opening, use **Export demo** here, then **Demo data → Import demo JSON** in the public website footer. Browser file-origin storage sharing is not portable.

## Demo walkthrough

1. Open **Products / Drinks**, edit Orange Green Tea, change its price, and choose **Publish to demo**.
2. Open **View website** and check the product card. When served locally, an already-open website updates automatically.
3. Add a drink and choose **Save draft**. It appears in the CMS but stays off the public website. **Show/Hide** changes its visibility.
4. Create or edit a promotion. Select Published to display it; Archive removes it from the website. Dates are descriptive demo fields; there is no scheduling engine.
5. Edit homepage content, gallery captions/order/visibility, store details and SEO.
6. **Media Library** accepts local JPG/PNG/WebP uploads up to 600 KB each. Select an image to use it as the hero; all saved images are also available in product, promotion and gallery selectors. Referenced images cannot be deleted until their references are replaced.
7. **Settings** provides JSON import/export and a confirmed reset to the original sample content.

## Modules

Dashboard; Products / Drinks; Categories; Promotions; Homepage Content; Gallery; Store Information; Contact Information; SEO; Media Library; Settings.

## Files

- `index.html`: admin shell and accessible native editor dialog.
- `styles.css`: tablet/laptop dashboard and compact mobile navigation.
- `app.js`: navigation, forms, uploads, local persistence and content management.
- `demo-data.js`: shared seed content/storage helpers, matching the website copy.
- `assets/`: unchanged client Logo.jpg and Drink.jpg, plus four AI-generated illustrative photographs (brown.jpg, matcha.jpg, strawberry.jpg, friends.jpg).

Browser-local storage is limited, not multi-user or production persistence. Save failures show an export reminder. Export JSON is for this demo's schema. Existing open editor dialogs do not refresh on external storage changes. No real publish, delete, order, account or payment operation occurs on an external service.

No node_modules, framework, build tooling, database, Supabase connection or deployment. Ready for GitHub source upload alongside the website folder.
