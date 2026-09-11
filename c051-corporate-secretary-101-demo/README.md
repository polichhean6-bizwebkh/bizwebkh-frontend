# Corporate Secretary 101 — website & CMS demo

Ready-to-upload static website. No installation, build process, backend or database is required.

## Entry points

- Public website: `index.html`
- CMS demo: `cms-demo/index.html` (or `/cms-demo/`)
- Dashboard: `cms-demo/dashboard.html`

Upload the complete contents of this folder to your static host, preserving the folder structure. For GitHub Pages, put these contents at the repository root, then choose **Settings → Pages → Deploy from a branch → main / root**. The root homepage is the public website. All links also work when hosted beneath a repository subpath.

Use the hosted HTTP/HTTPS address for the meeting. Opening files directly with `file://` can display the pages, but browser storage sharing between files varies. The website and CMS must use the same browser profile and the same host/port to share edits.

## Suggested meeting walkthrough

1. Open the homepage and explore all nine services.
2. Open Insights & Events and try the category filters.
3. Open `/cms-demo/`. Leave both fields blank and select **Sign In**.
4. Edit a service or insight and select **Save Changes** or **Publish**.
5. Select **View website**. The change appears in the public listing and detail page. Already-open public tabs refresh when browser storage changes.
6. Add an event, save it as a draft, preview it, then publish it.
7. Demonstrate Page Content, Media Library and Website Settings.
8. Use **Website Settings → Reset demo content** to return to the original presentation.

## Included pages

Public: Home, About Us, Services, parameter-driven Service Detail, Insights & Events, parameter-driven Insight/Event Detail, Contact.

CMS: Demo Login, Overview Dashboard, Services, Insights & Events, Page Content, Media Library, Website Settings.

## Interactive functions

- Service and editorial creation, editing, deletion confirmation, draft/published status, display order and previews.
- Article categories, featured homepage content, event date/time/location/contact fields.
- Editable homepage, about and contact copy; business details, optional social links and logo.
- Local image upload (JPG/PNG/WebP/GIF, up to 1 MB per file), preview, reference copying and removal. Included photos are retained because public pages use them.
- Searchable CMS tables, responsive navigation, native keyboard-accessible dialogs, save notifications and reset.
- Contact form validation and simulated success; article link copying.

## Intentionally demo-only

- **No authentication or access control.** The login accepts blank fields and never checks credentials. Do not enter a real password. All CMS routes are publicly accessible.
- All content edits and uploaded images live only in localStorage on the current browser/device. They do not change the source files, deploy to the server or sync with other devices. Clearing browser data removes the edits.
- Contact form submissions are neither sent nor saved. Use the displayed phone/email for real inquiries.
- Publishing is immediate. Publish Date is display information, not a scheduler.
- Articles are illustrative editorial copy. The event is explicitly a proposed demo event; no real registration is collected.
- The brand wordmark is temporary. The client poster, original logo and client contact QR were not present among the supplied files. The quotation contained BizWeb KH branding and payment QR codes, which were intentionally excluded from this client website.
- The phone and email match the user brief exactly. Confirm the unusual email spelling with the client before production.
- Fonts load from Google Fonts, with Georgia/Arial fallbacks. All photographs, icons, scripts and styles are included locally; there are no runtime libraries or build dependencies.

## Image credits

Illustrative stock imagery; people shown are not presented as the client's team or clients.

- `assets/images/meeting.jpg`: Werner Pfennig / Pexels — https://www.pexels.com/photo/people-sitting-at-conference-table-6949523/
- `assets/images/office.jpg`: Wolf Art / Pexels — https://www.pexels.com/photo/modern-office-building-16113732/
- `assets/images/workshop.jpg`: Airam Dato-on / Pexels — https://www.pexels.com/photo/man-giving-a-presentation-to-a-group-of-people-15189552/

Photos were listed as free to use on their Pexels source pages at preparation time. The office photo is illustrative architecture, not a claimed Cambodia office location. Icons and the temporary C favicon are local inline SVG.

## Validation

Browser-checked all seven public page templates (including article and event variants) and all seven CMS pages at desktop and mobile widths. Also checked the tablet homepage. No page-level horizontal overflow, broken local images or application console errors were observed.

Verified demo login, contact success, mobile navigation, editorial filtering, service/insight changes reaching public detail pages, page/settings changes, event draft → published → deletion, image upload and resetting the demo. Original content was restored after testing. CMS tables scroll inside their containers on narrow screens.
