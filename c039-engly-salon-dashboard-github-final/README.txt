C039 - Engly Khun Salon
Customer Management & Staff Incentive Dashboard
Demo Version (Dashboard Only)

============================================================
DEMO LOGIN
============================================================
Owner:
  username: owner
  password: demo123

Cashier:
  username: cashier
  password: demo123

============================================================
FEATURES INCLUDED IN THIS DEMO
============================================================
- Owner / Cashier separate login and permissions
- Dashboard overview (today's sales, customers, incentive summary)
- New Deal multi-customer tabs (work on several customers at once)
- Normal customers and VIP/package customers
- VIP balance deduction and VIP top-up / package purchase
- Customer search & autofill by name or phone
- Customer visit count and history
- Multiple services per transaction, with a different staff per service
- Function-based staff incentives: one Service Incentive % and one Sales
  Incentive % per staff member (instead of per-service rules)
- Staff Management combined with Incentive Setup (Owner-only, Cashier
  cannot view/change percentages)
- Owner-only staff add / edit / deactivate-reactivate (with confirmation
  prompts) / incentive setup; deactivated staff are kept in history and
  simply removed from New Deal staff selection, never deleted
- New Deal incentive is calculated automatically in the background and
  shown in Transactions/Reports (not displayed on the New Deal screen itself)
- VIP customers can pay with VIP Package Balance OR Cash/ABA/ACLEDA/Credit
  Card/Other for each transaction - VIP Balance is never forced, and only
  deducts when it is the option actually chosen (with automatic split if
  the balance doesn't cover the full amount)
- New customers can purchase a VIP package directly from Customers > Sell/
  Top-Up VIP Package, without any prior Normal-customer transaction
- Redesigned VIP customer detail view with clear summary, package history,
  and visit history sections
- Accurate revenue accounting: paying with an existing VIP Package Balance
  is treated as balance redemption, not new income (it was already counted
  as revenue when the package was purchased/topped up) - Dashboard, Reports,
  revenue charts and Excel export all reflect this consistently, with VIP
  Balance Used shown separately as an operational (non-revenue) figure
- Reports use a consistent Total Revenue / Service Revenue / VIP Package
  Sales / VIP Balance Used model across Overview, Sales & Payment, Customers
  (Top Customers by Revenue Contribution), Staff & Incentive (Service Value
  Performed), the Sales Trend chart, and the Excel export; only completed
  salon services count as customer "visits" (VIP purchases/top-ups do not)
- Customers page search (by name or phone) and Customer Type filter (All/Normal/
  VIP), with a Clear button and a "No customers found" message when nothing matches
- Owner-only Edit Customer function from the Customer Detail view - name, phone,
  customer type, and source can be updated; visit history, spending, VIP balance
  and package history stay system-calculated and are never edited directly
- Duplicate phone protection when editing a customer, and a safeguard that blocks
  changing a VIP customer back to Normal while they still have a VIP balance
  (VIP history and balance are never deleted); switching Normal to VIP keeps the
  VIP balance at $0 until an actual package purchase/top-up is recorded
- Transactions date filter with Today / Last 7 Days / Last 30 Days / Custom Range
  presets (defaults to Today), a small "period" indicator showing the exact dates in
  use, future dates blocked in the date pickers, From/To range validation, and a
  clean "No transactions found for the selected period" message - kept consistent
  with the same date-range logic already used in Reports
- Transaction search by customer name or phone
- Completed transaction editing with full audit / edit history
- Reports reorganized into 4 tabs: Overview, Sales & Payment, Customers, Staff & Incentive
- Export Excel (.xlsx) from any Reports tab, respecting the active filters
- Khmer / English language switch
- Responsive layout (desktop, tablet, mobile)

============================================================
RUNNING THE DEMO
============================================================
This is a static HTML/CSS/JS demo - no backend or server is required.
All data is generated on first load and stored in the browser's
localStorage, so changes made in the demo persist between visits on
the same browser/device, and can be reset by clearing site data.

To run locally: open index.html directly in a browser, or serve the
folder with any static file server.

To publish on GitHub Pages: upload the contents of this folder to a
GitHub repository and enable Pages for that repository/branch. index.html
is at the root of this folder and all asset paths are relative, so the
site works correctly whether it's served from the domain root or from a
GitHub Pages project subfolder (e.g. username.github.io/repo-name/).

============================================================
NOTES
============================================================
- Prepared for client demo purposes.
- This package is dashboard-only; the public marketing website is not
  included here.
