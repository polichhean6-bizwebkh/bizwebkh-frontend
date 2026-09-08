# Consultation refinement — 8 September 2026

Historical report for the payment-flow refinement. The subsequent account/UI changes are documented in [ACCOUNT-AND-CONSULTATION-REPORT.md](ACCOUNT-AND-CONSULTATION-REPORT.md); consultation options now live on separate method detail screens.

Existing local demo refined. No deployment performed.

## 1. Files changed

- `index.html`: replaced the existing consultation/booking/payment/appointment content and obsolete booking handlers, preserving the existing app shell and navigation. Updated Online Consulting service description and payment labels in the reviewer screen index.
- `assets/consultation.js` (new): guest booking, method-specific payment logic, in-memory appointment records, status timelines and room previews.
- `assets/consultation.css` (new): styles scoped to the consultation screens, SVG icons, accessible video switches, payment card, badges and timeline.
- `qa/consultation.cjs` (new): repeatable browser checks.
- `qa/results.json`, `qa/*.png`, and this report (new): QA evidence and documentation.

## 2. Online Consulting screen

Exactly two main choices: On-App Consulting and Telegram Consulting. Each explains the consultation location, optional video, payment arrangement and confirmation requirement. The Service screen still offers Online Consulting and E-Book only. Home, E-Book service, Articles, Videos and Profile screen markup was compared against the original and is unchanged. Shared language-switch code and bottom navigation are unchanged.

## 3. On-App flow

Choose On-App and optional video → date/time → guest contact and reason → review → Pay Now → KHQR → simulated Payment Successful / Booking Confirmed → appointment detail. There is no pay-later action. An appointment record is created only after clicking the demo payment confirmation. Direct payment jumps without a completed review are guarded.

## 4. Telegram flow

Choose Telegram and optional video → preferred date/time → guest contact, Telegram username/phone and reason → review → Submit Consultation Request → Request Sent. Payment status is Awaiting Payment; booking status is Requested. The UI states: “Payment will be arranged manually via Telegram before the consultation starts.” Open Telegram opens an explicit local placeholder because no verified link was provided. No KHQR is required or shown for this method.

## 5. Video toggle

Both methods use the same full-width keyboard-accessible switch, with explicit ON/OFF text and `aria-checked`. Defaults are OFF. The chosen value carries into the booking wizard, review, KHQR, success, appointment list and detail. The wizard allows the option to be changed before review. On-app joining opens either a chat or video room preview according to the booking.

## 6. KHQR demo

Shows method, Video Call Yes/No, selected date/time, consultation fee and total. The fee is consistently $15.00, with no added service fee or video surcharge in this demo. A red KHQR-style card contains a decorative, non-scannable QR placeholder marked DEMO. I Have Paid / Confirm Payment synchronously simulates success. Back to Review retains the draft without creating a booking.

## 7. Appointments and statuses

Cards show method, video/non-video, date/time, payment and consultation status. Each card opens its own submitted details and unique reference. Both timelines are displayed in appointment detail:

- On-App: Payment Required → Paid → Confirmed → Scheduled → Completed.
- Telegram: Requested → Awaiting Payment → Payment Confirmed → Consultation Scheduled → Completed.

Telegram starts at Requested with Awaiting Payment. A collapsed, explicitly labeled reviewer control can simulate manual verification and later scheduling/completion. On-app Join Consultation is available only for Paid appointments with Confirmed or Scheduled status. Completed records appear in the Past tab.

## 8. QA results

Automated local browser run using installed Microsoft Edge through Playwright:

| Scenario | Result |
| --- | --- |
| On-App, video OFF → KHQR → success → Paid / Confirmed → chat preview | PASS |
| On-App, video ON → KHQR → success → Paid / Confirmed → video preview | PASS |
| Telegram, video OFF → request → Awaiting Payment → Telegram placeholder | PASS |
| Telegram, video ON → request → Awaiting Payment → Telegram placeholder | PASS |

Also passed: unique booking references; no records before payment; KHQR back navigation; required guest/date/time fields; escaped consultation notes; selected date/time propagation; Telegram verification/scheduling/completion; completed records in Past; guarded direct KHQR navigation; EN/KH switch round trip; no horizontal overflow at 390px; no browser JavaScript errors. Screenshots of the method screen, mobile layout, appointment details, KHQR and success screens were visually inspected. JavaScript syntax check passed.

Rerun with Node and Playwright available: `node qa/consultation.cjs`. `PLAYWRIGHT_MODULE` can point to the installed Playwright package, and `QA_BROWSER` can override the default `msedge` browser channel. Scenario dates are fixed to 12 September 2026 and must be advanced for later test runs.

## 9. Limitations

- Frontend only: no real banking, Telegram, chat, video, database or authentication integration.
- Bookings and contact details remain in memory only and reset on page reload.
- Prices and availability are demonstration values; Telegram slots remain subject to team confirmation.
- Existing English/Khmer controls and translations are preserved. New consultation body copy is English; a full Khmer translation of that new copy is not included.
- No live notifications are sent, and no real Telegram destination is opened.

No unrelated content redesign and no deployment.
