# C067 — Mini CRM Demo (Mr. Panha, Battambang)

Local, Khmer-first interactive demo for client review. **Demo only — not production.**

## How to open
Double-click `index.html` (works offline except the Khmer web font, which falls back to a system Khmer font).

## Demo logins (do not show to client on screen)
| Role | Username | Password |
|---|---|---|
| Admin | `Admin` | `admin123456` |
| User View | `user369` | `user8020369` |

## Structure
```
index.html
css/style.css
js/data.js      constants (positions, interests, geography) + sample demo data
js/app.js       all app logic (localStorage only)
assets/logo.svg default logo
```

## Demo-only / mock
- All data lives in browser `localStorage` (keys `c067_demo_db_v1`, `c067_demo_session_v1`). No server, no API.
- Google Sheets / Drive / Apps Script are **not connected**. Status shows "Demo / Not Connected"; Sync shows an info message only.
- Export button is a placeholder. All sample records are fictional.
- Photos are resized in the browser and stored as data URLs (keep images small; localStorage is ~5 MB).
- Developer reset: open Settings (Admin) and tap the small "Demo v1.0" text 5 times → Reset Demo Data.
- The District/Commune list is a sample of Battambang names for demo; confirm the official list with the client.

## SECURITY NOTE
localStorage login is **NOT secure** (passwords are stored in plain text in the browser, roles are checked in client JS only).
The production version must use:
- proper backend authentication
- hashed passwords
- protected APIs
- proper server-side role authorization
- server-side validation

## Future production idea (not implemented)
- Google Spreadsheet `8020_369_5P_Database` with tabs: `Members`, `Partners`, `Partner_Items`, `Settings`
- Google Drive folder `8020_App_Assets` for profile/cover/logo images
- Apps Script Web App as API (token + role checked on the server)
- Partner products/services are stored inside each partner now; in production → `Partner_Items` rows keyed by Partner ID

## Open questions for the client
See the final report in the chat (ID format rules, official geography list, per-role access, export format, language switch, etc.).
