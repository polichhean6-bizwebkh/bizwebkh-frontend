# KING KIDS · Child Development Management System

A self-contained HTML5 / CSS3 / vanilla JavaScript demonstration for C046 – King Kids School.

## Open the demo

Double-click `index.html`. No server, installation, npm, build process, or account is required. The same folder can be uploaded to any static host. Keep `assets/` beside `index.html`.

Exact entry file:

`C:\Users\Hi\Desktop\BizWeb KH\Client\C046 - King Kid School\c046-king-kids-child-development-system-demo\index.html`

## Start presenting

1. Begin in Director / Administrator, then open Children → Sok Dara.
2. Select Development Profile → Communication & Language. Change a skill stage.
3. Open Individual Development Plans. Add a goal, update its progress, and inspect History.
4. Open Therapy Sessions and inspect Speech, OT, and Special Education notes.
5. Open Progress Tracking, compare the baseline and current review, then generate a report.
6. Switch to Speech Therapist, view the assigned children and service sessions, and add a session note.
7. Check the parent-approval checkbox only for a note you want to share in the demo.
8. Switch to Parent to see Sok Dara’s simplified shared progress.

## Persistence and resets

Demo edits use localStorage key `king-kids-demo-v1`. Storage is specific to the browser and URL; behavior for local files varies by browser. If storage is unavailable, the app keeps working for the current visit and displays a notice when saving. Director → Settings → Reset fictional demo data restores the seeded dataset after confirmation.

The presentation clock is September 12, 2026. Session and review dates are intentionally fixed for repeatable demonstrations. Activity log entries use the actual UTC save time.

## Reports

Preview generates a report from the selected child’s current saved state. Print uses a dedicated A4 stylesheet. Export PDF opens instructions for the browser’s **Print → Save as PDF** option; there is no PDF-generation service. Operations reports support filtered previews, CSV download, and print.

## Assets and branding

DM Sans and Noto Sans Khmer are bundled locally in `assets/fonts/`, along with their SIL Open Font License notices. There are no runtime network dependencies. Key navigation labels support English and Khmer; detailed fictional paragraphs remain in English.

The supplied quotation did not contain a King Kids logo. The interface therefore uses a temporary KING KIDS text wordmark and a simple crown interface icon. Replace this treatment with the client-approved logo when supplied. Fictional children use initials avatars, not photographs of real children. No quotation payment assets are included.

## Demo boundary

This application demonstrates development tracking, education planning, therapy coordination, and reporting. It has no backend, database, real login, security enforcement, medical diagnosis, clinical decision engine, real records, payment processing, messages sent to families, or file upload service. Document and evidence entries store demo text labels only. Browser role switching is a visual simulation, not authentication.

## QA

`qa/results.json` records the interaction checks. `qa/verify.cjs` runs Playwright checks using the bundled development runtime on the authoring machine; it is optional and is not required to open the demo. Screenshots in `qa/` show desktop, tablet, mobile, and development views.

See `FINAL-REPORT.md` for the module inventory, role behavior, and limitations.
