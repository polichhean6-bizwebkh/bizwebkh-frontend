# Account and consultation UI refinement

8 September 2026 · Existing demo only · Not deployed

## 1. Files changed

- `index.html`: phone-based login/sign-up/reset forms, phone profile identifier, Sign Out row, and two consultation detail screen containers.
- `assets/account.js` (new): local phone account simulation, validation, profile updates, phone reset placeholder, and sign-out confirmation.
- `assets/account.css` (new): account form styles, Profile scrolling/bottom-nav clearance, short-viewport account layout and confirmation dialog.
- `assets/consultation.js`: simplified channel selection, separate method details, detail-to-booking video handoff and back navigation retaining the draft.
- `assets/consultation.css`: lighter channel cards and compact detail sections.
- `qa/account.cjs` (new), `qa/consultation.cjs` (updated): repeatable browser QA.
- `qa/account-results.json`, `qa/results.json`, QA screenshots and reports: verification evidence.

## 2. Phone login

Phone Number and Password replace email login. The input shows a Cambodia +855 prefix, accepts local or international Cambodian formatting, and normalizes the value. The example is the requested demo number +855 12 345 678. Log In and Sign Up remain available; inactive social-login buttons were removed. Forgot Password now requests a demo reset code by phone and explicitly reports that no SMS is sent.

The logged-in Profile header displays the submitted phone number. Login remains a frontend simulation; a valid sample phone and a password of at least eight characters enter the demo account. No credentials are persisted or transmitted.

## 3. Sign-up

Fields are Full Name, Phone Number, Password and Confirm Password. Email is not required or collected by account creation. Password confirmation and phone validation are enforced, and the submitted name/phone appear in Profile. No real account or authentication backend is created.

## 4. Profile scrolling and Sign Out

All eight existing menu destinations remain: Personal Information, Consultation History, E-Book Library, Subscription, Notifications, Settings, Language and Sign Out. The menu scroll area has an explicit flex constraint and bottom padding that reserves navigation/safe-area space.

On short mobile viewports, the account phone preview fits the available height and is no longer overlapped by the reviewer Screen Index. Sign Out uses a real SVG exit icon and restrained red styling. It opens a keyboard-accessible modal reading “Sign out of your account?” with Cancel and Sign Out. Cancel preserves the session; Sign Out returns to Guest Profile.

## 5. Simplified Online Consulting

The selection screen contains the requested subtitle and exactly two cards: On-App Consulting and Telegram Consulting. Each has an icon, title, short description and View Details action. Video toggles, fees, payment explanations, KHQR and confirmation copy are absent from this selection screen.

## 6. On-App detail

A separate screen contains the consultation introduction, video switch, instant KHQR payment explanation, confirmation-after-payment wording, $15.00 demo fee and Book On-App Consultation CTA. Its content fits the existing full-height phone preview without a bottom navigation bar.

## 7. Telegram detail

A separate screen uses a Telegram paper-plane SVG and contains the introduction, video switch, manual payment explanation, confirmation-after-verification wording, $15.00 demo fee and Request Telegram Consultation CTA. The Telegram placeholder destination is unchanged.

## 8. Flow and navigation

Both detail screens return to Online Consulting using Back. The selection screen still returns to Service. The first booking step returns to the relevant detail screen; re-entering booking retains the draft date/time and chosen video value. Video is configured on the detail screen and summarized during booking.

The agreed payment paths remain unchanged: On-App requires simulated KHQR success before Paid / Confirmed; Telegram submits a request with Awaiting Payment and never requires in-app KHQR. Both remain available to guests. Home, Articles, Videos, E-Book service/detail/library markup and the EN/KH switch implementation were compared with the pre-change version and are unchanged.

## 9. QA results

Automated local Microsoft Edge/Playwright checks passed:

| Test | Result |
| --- | --- |
| Phone number + password → logged-in Profile | PASS |
| Phone sign-up without email; matching passwords | PASS |
| Invalid phone and mismatched passwords rejected | PASS |
| All eight Profile menu rows reachable | PASS |
| Sign Out clear of bottom navigation at 1100×1000, 390×844 and 375×667 | PASS |
| Sign-out Cancel preserves account; Sign Out returns Guest | PASS |
| Phone password-reset placeholder | PASS |
| Service → On-App detail → video OFF → KHQR → Confirmed | PASS |
| Service → On-App detail → video ON → KHQR → Confirmed | PASS |
| Service → Telegram detail → video OFF → request → Awaiting Payment → Telegram placeholder | PASS |
| Service → Telegram detail → video ON → request → Awaiting Payment → Telegram placeholder | PASS |
| Detail Back → selection; booking Back → detail with draft retained | PASS |
| Selection contains two cards and no video/payment/fee settings | PASS |
| Existing payment guards, appointment statuses and EN/KH switch round trip | PASS |

No browser JavaScript errors. Both changed JavaScript files passed syntax checks. Screenshots of the main selection, details, phone login, Profile bottom and confirmation dialog were visually inspected.

Run `node qa/account.cjs` and `node qa/consultation.cjs` with Playwright installed. `PLAYWRIGHT_MODULE` may point to the installed package; `QA_BROWSER` defaults to `msedge`. Consultation test dates currently use 12 September 2026.

Limitations remain frontend-only authentication/payment/chat/video/Telegram simulations, session-memory bookings and English-only new body copy. No deployment was performed.
