# KING KIDS · Full Function Discussion Demo

This is an independent, front-end-only expansion of the C046 King Kids child development and therapy management demo. Open `index.html` in a browser; it has no installation, build, server, account, or internet requirement.

## Discussion modules

- Student registration with a branch-aware simulated ID: `KK-[BRANCH]-2026-[RUNNING NUMBER]`
- Student Directory with search and branch, service, class, and status filters
- School and clinic/therapy classifications, attendance, development, plans, goals, sessions, assessments, schedule, and case review
- Inventory items, stock movement, and student distribution
- Fee invoices, manual KHQR / bank transfer / cash confirmation, payment history, and clearly labelled future-payment options
- Multi-branch display, role-view simulation, reports, parent communication, documents, users, activity log, and settings

## Demo boundary

All names, records, inventory, invoice states, and payments are fictional. Changes are stored only in this browser's localStorage under `king-kids-full-demo-v1`; **Reset Demo** in Settings restores the starting data. Role selection is a presentation of access scope, not authentication or security enforcement. The app does not contact a payment service, bank, KHQR provider, database, or messaging provider.

The original demo is preserved separately at `../c046-king-kids-child-development-system-demo/` and has not been edited by this work.

## Production follow-up

A real launch would need a backend database, server-side identity generation and uniqueness rules, authentication and enforced authorization, document/image storage, audit controls, multi-branch data policies, payment-provider integration and webhooks, receipt validation, and live communication services.
