/* ==========================================================================
   Ms. Engly Khun Salon — Admin Dashboard Logic (v2)
   Customer Management + Service Transaction Management + Staff Incentive
   Demo / front-end only — no backend, no real payments.
   ========================================================================== */

(function () {
  "use strict";

  /* ============================================================
     STORAGE KEYS
     ============================================================ */
  const KEY_TRANSACTIONS = "c039_transactions";
  const KEY_CUSTOMERS = "c039_customers";
  const KEY_STAFF = "c039_staff";
  const KEY_SCHEMES = "c039_incentive_schemes";
  const KEY_RECORDS = "c039_incentive_records";
  const KEY_SERVICES = "c039_services_catalog";
  const KEY_SETTINGS = "c039_dashboard_settings";
  const KEY_WEBSITE_BOOKINGS = "c039_salon_bookings"; // written by the public website
  const KEY_IMPORTED = "c039_imported_web_ids";
  const KEY_SESSION = "c039_login_session"; // sessionStorage - demo login only, no real auth

  const ALL_KEYS = [KEY_TRANSACTIONS, KEY_CUSTOMERS, KEY_STAFF, KEY_SCHEMES, KEY_RECORDS, KEY_SERVICES, KEY_IMPORTED];

  // Demo-only accounts. This is a static client demo - no real authentication/backend.
  const DEMO_ACCOUNTS = [
    { username: "owner", password: "demo123", role: "owner" },
    { username: "cashier", password: "demo123", role: "cashier" }
  ];

  function getSession() {
    try {
      const raw = sessionStorage.getItem(KEY_SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function setSession(s) { sessionStorage.setItem(KEY_SESSION, JSON.stringify(s)); }
  function clearSession() { sessionStorage.removeItem(KEY_SESSION); }

  /* ============================================================
     SEED DATA
     ============================================================ */
  const SEED_SERVICES = [
    { id: "svc-haircut", name: "Hair Cut & Styling", category: "Hair Styling", price: 8 },
    { id: "svc-haircolor", name: "Hair Coloring", category: "Hair Coloring", price: 25 },
    { id: "svc-hairtreat", name: "Hair Treatment", category: "Hair Treatment", price: 18 },
    { id: "svc-hairwash", name: "Hair Wash & Dry", category: "Scalp Care", price: 12 },
    { id: "svc-makeup", name: "Makeup", category: "Makeup", price: 20 },
    { id: "svc-manicure", name: "Manicure", category: "Nail Care", price: 7 },
    { id: "svc-nailgel", name: "Nail Gel", category: "Nail Care", price: 18 },
    { id: "svc-pedicure", name: "Pedicure", category: "Nail Care", price: 9 },
    { id: "svc-facial", name: "Facial", category: "Facial", price: 25 },
    { id: "svc-lashbrow", name: "Lash / Brow Beauty", category: "Facial", price: 15 }
  ];

  // staff.type: "sales" (closes package/product sales), "service" (performs salon services), or "both"
  // Incentive model (function-based, not per-service): each staff member has a flat
  // serviceIncentiveRate (%) applied to any service they perform, and/or a flat
  // salesIncentiveRate (%) applied to any VIP package sale they close as Sales Staff.
  // Only the field(s) relevant to staff.type are used - see computeIncentiveForRow / computeSalesIncentive.
  const SEED_STAFF = [
    { id: "sokha", name: "Sokha", phone: "012 111 001", role: "Senior Stylist", specialty: "Hair Styling", type: "service", active: true, serviceIncentiveRate: 10 },
    { id: "dara", name: "Dara", phone: "012 111 002", role: "Hair Color Specialist", specialty: "Hair Coloring / Treatment", type: "both", active: true, serviceIncentiveRate: 10, salesIncentiveRate: 5 },
    { id: "sreyneang", name: "Sreyneang", phone: "012 111 003", role: "Nail Artist", specialty: "Nail Care", type: "service", active: true, serviceIncentiveRate: 15 },
    { id: "ratha", name: "Ratha", phone: "012 111 004", role: "Makeup Artist", specialty: "Makeup", type: "service", active: true, serviceIncentiveRate: 10 },
    { id: "lina", name: "Lina", phone: "012 111 005", role: "Beauty Therapist", specialty: "Facial", type: "service", active: true, serviceIncentiveRate: 10 },
    { id: "sokunthea", name: "Sokunthea", phone: "012 111 006", role: "Front Desk / Sales", specialty: "VIP Package Sales", type: "sales", active: true, salesIncentiveRate: 5 },
    { id: "momo", name: "Momo", phone: "012 111 007", role: "Sales Consultant", specialty: "VIP Package Sales", type: "sales", active: true, salesIncentiveRate: 5 }
  ];

  // customer.type: "normal" (pays per visit) or "vip" (prepaid package balance)
  // customer.vipBalance: current remaining prepaid balance (VIP only)
  // customer.packageHistory: [{ id, amount, paymentMethod, salesStaff, salesIncentiveAmount, date, type:"purchase"|"topup" }]
  const SEED_CUSTOMERS = [
    { id: "CUS-001", name: "Sophea Ros", phone: "012 111 222", source: "Walk-in", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-002", name: "Dara Chan", phone: "012 222 333", source: "Facebook", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-003", name: "Lida Sok", phone: "012 333 444", source: "Walk-in", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-004", name: "Channary Pen", phone: "012 444 555", source: "Telegram", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    // vipBalance = final current balance after seeded purchase/top-up/deduction transactions (see SEED_TRANSACTIONS_RAW)
    { id: "CUS-005", name: "Bopha Heng", phone: "097 512 884", source: "Walk-in", notes: "", type: "vip", vipBalance: 155,
      packageHistory: [
        { id: "PKG-001", amount: 200, paymentMethod: "Cash", salesStaff: "Dara", salesIncentiveAmount: 10, date: daysAgo(30), type: "purchase" },
        { id: "PKG-003", amount: 100, paymentMethod: "ABA", salesStaff: "Sokunthea", salesIncentiveAmount: 5, date: daysAgo(1), type: "topup" }
      ] },
    { id: "CUS-006", name: "Sina Ort", phone: "012 999 777", source: "Existing Customer", notes: "", type: "vip", vipBalance: 323,
      packageHistory: [{ id: "PKG-002", amount: 500, paymentMethod: "ABA", salesStaff: "Sokunthea", salesIncentiveAmount: 5, date: daysAgo(40), type: "purchase" }] },
    { id: "CUS-007", name: "Maly Chea", phone: "012 555 666", source: "Walk-in", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-008", name: "Rithy Van", phone: "012 000 111", source: "Other", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-009", name: "Chenda Ly", phone: "012 112 233", source: "TikTok", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    // Returning-customer demo records — used to showcase name/phone autocomplete
    { id: "CUS-010", name: "Bopha Chenda", phone: "097 234 561", source: "Facebook", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-011", name: "Bora Ly", phone: "097 345 671", source: "Walk-in", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-012", name: "Chenda CM", phone: "085 776 234", source: "Facebook", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-013", name: "Nak Sreyneang", phone: "010 998 221", source: "Referral", notes: "", type: "normal", vipBalance: 0, packageHistory: [] },
    { id: "CUS-014", name: "Kanha CM", phone: "077 663 210", source: "Existing Customer", notes: "", type: "normal", vipBalance: 0, packageHistory: [] }
  ];

  function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().split("T")[0];
  }

  function row(service, staff, price, qty, incentiveOverride) {
    const svc = SEED_SERVICES.find((s) => s.name === service);
    const r = {
      service, category: svc ? svc.category : "General",
      price, qty: qty || 1, staff
    };
    if (incentiveOverride) {
      r.incentiveType = incentiveOverride.type;
      r.incentiveRate = incentiveOverride.rate;
      r.incentiveAmount = incentiveOverride.amount;
    }
    return r;
  }

  // Generates a spread of past completed transactions for a "returning customer" demo record
  function buildHistorySeed(idPrefix, customerId, count, pairs, payments, startOffset, gapDays) {
    const out = [];
    for (let i = 0; i < count; i++) {
      const pair = pairs[i % pairs.length];
      const svc = SEED_SERVICES.find((s) => s.name === pair.service);
      out.push({
        id: idPrefix + String(i + 1).padStart(2, "0"),
        customerId,
        date: daysAgo(startOffset + i * gapDays),
        time: "1" + (i % 5) + ":" + (i % 2 === 0 ? "00" : "30"),
        payment: payments[i % payments.length],
        discount: 0,
        status: "Completed",
        services: [row(pair.service, pair.staff, svc ? svc.price : 0, 1)]
      });
    }
    return out;
  }

  const SEED_TRANSACTIONS_RAW = [
    { id: "TX-001", customerId: "CUS-001", date: daysAgo(3), time: "10:00", payment: "Cash", discount: 0, status: "Completed",
      services: [row("Hair Cut & Styling", "Sokha", 8, 1)] },
    { id: "TX-002", customerId: "CUS-002", date: daysAgo(3), time: "13:30", payment: "ABA", discount: 0, status: "Completed",
      services: [row("Hair Coloring", "Dara", 25, 1)] },
    { id: "TX-003", customerId: "CUS-003", date: daysAgo(2), time: "09:30", payment: "Cash", discount: 0, status: "Completed",
      services: [row("Manicure", "Sreyneang", 7, 1), row("Pedicure", "Sreyneang", 9, 1)] },
    { id: "TX-004", customerId: "CUS-004", date: daysAgo(2), time: "15:00", payment: "Credit Card", discount: 0, status: "Open",
      services: [row("Facial", "Lina", 25, 1)] },
    // Sina Ort (VIP) - 3 services, 3 different staff, paid from VIP Balance (demonstrates multi-staff + VIP deduction)
    { id: "TX-006", customerId: "CUS-006", date: daysAgo(5), time: "14:00", payment: "VIP Balance", discount: 5, status: "Completed",
      txType: "service", vipDeduction: 50,
      services: [
        row("Hair Wash & Dry", "Dara", 12, 1),
        row("Nail Gel", "Sreyneang", 18, 1),
        row("Facial", "Lina", 25, 1)
      ] },
    { id: "TX-007", customerId: "CUS-007", date: daysAgo(0), time: "16:00", payment: "Cash", discount: 0, status: "Open",
      services: [row("Makeup", "", 20, 1)] },
    { id: "TX-008", customerId: "CUS-008", date: daysAgo(4), time: "10:00", payment: "Cash", discount: 0, status: "Cancelled",
      services: [row("Hair Cut & Styling", "Sokha", 8, 1)] },
    // Chenda Ly - demo of an already-EDITED completed transaction (Edit History / audit log demo)
    { id: "TX-009", customerId: "CUS-009", date: daysAgo(1), time: "11:00", payment: "ACLEDA", discount: 2, status: "Completed",
      services: [row("Lash / Brow Beauty", "Lina", 15, 1), row("Manicure", "Sreyneang", 7, 1)],
      editHistory: [{
        editedBy: "Sophea", role: "cashier", date: daysAgo(0), time: "15:42",
        changes: [
          { field: "Staff (Lash / Brow Beauty)", from: "Ratha", to: "Lina" },
          { field: "Price (Lash / Brow Beauty)", from: "$18.00", to: "$15.00" },
          { field: "Discount", from: "$0.00", to: "$2.00" }
        ]
      }] },

    // ---- VIP package purchase / top-up / deduction demo (Bopha Heng) ----
    // Purchase $200 - closed by Sales Staff Dara (5%) -> $10 sales incentive. No service performed, so no service incentive.
    { id: "TX-VIP-BH-01", customerId: "CUS-005", date: daysAgo(30), time: "09:00", payment: "Cash", discount: 0, status: "Completed",
      txType: "vip_purchase", amount: 200, salesStaff: "Dara", salesIncentiveAmount: 10, services: [] },
    // Later visit: Hair Treatment + Nail Gel paid fully from VIP Balance ($45 deducted -> balance 200-45=155)
    { id: "TX-VIP-BH-02", customerId: "CUS-005", date: daysAgo(5), time: "10:30", payment: "VIP Balance", discount: 0, status: "Completed",
      txType: "service", vipDeduction: 45,
      services: [row("Hair Treatment", "Lina", 25, 1), row("Nail Gel", "Sreyneang", 20, 1)] },
    // Top-up +$100 - closed by Sales Staff Sokunthea (fixed $5) -> balance 155+100=255
    { id: "TX-VIP-BH-03", customerId: "CUS-005", date: daysAgo(1), time: "12:00", payment: "ABA", discount: 0, status: "Completed",
      txType: "vip_topup", amount: 100, salesStaff: "Sokunthea", salesIncentiveAmount: 5, services: [] },
    // Latest visit: Hair Coloring with Dara, paid fully from VIP Balance ($100 deducted -> balance 255-100=155)
    // Final balance lands back on $155 to match the demo spec's worked example exactly.
    { id: "TX-VIP-BH-04", customerId: "CUS-005", date: daysAgo(0), time: "09:00", payment: "VIP Balance", discount: 0, status: "Completed",
      txType: "service", vipDeduction: 100,
      services: [row("Hair Coloring", "Dara", 25, 4)] },

    // Sina Ort (VIP) - package purchase $500, closed by Sales Staff Sokunthea (fixed $5)
    { id: "TX-VIP-SO-01", customerId: "CUS-006", date: daysAgo(40), time: "09:30", payment: "ABA", discount: 0, status: "Completed",
      txType: "vip_purchase", amount: 500, salesStaff: "Sokunthea", salesIncentiveAmount: 5, services: [] },
    // ---- Second VIP deduction visit for Sina Ort (further reduces balance after TX-006) ----
    { id: "TX-VIP-SO-02", customerId: "CUS-006", date: daysAgo(2), time: "11:00", payment: "VIP Balance", discount: 0, status: "Completed",
      txType: "service", vipDeduction: 127,
      services: [
        row("Hair Coloring", "Dara", 25, 1), row("Facial", "Lina", 25, 1), row("Makeup", "Ratha", 20, 1),
        row("Hair Treatment", "Dara", 18, 1), row("Hair Cut & Styling", "Sokha", 8, 1),
        row("Pedicure", "Sreyneang", 9, 1), row("Manicure", "Sreyneang", 7, 1), row("Lash / Brow Beauty", "Lina", 15, 1)
      ] },

    // ---- Returning-customer histories (Customer Lookup demo) ----
    // Bopha Heng: 5 older regular visits (pre-VIP) + 3 VIP transactions above = 8 total visits, matching demo spec
    ...buildHistorySeed("TX-BH", "CUS-005", 5,
      [{ service: "Hair Cut & Styling", staff: "Sokha" }, { service: "Hair Wash & Dry", staff: "Dara" }],
      ["Cash", "ABA"], 60, 9),
    ...buildHistorySeed("TX-BC", "CUS-010", 2,
      [{ service: "Manicure", staff: "Sreyneang" }], ["Cash"], 12, 20),
    ...buildHistorySeed("TX-BL", "CUS-011", 2,
      [{ service: "Hair Cut & Styling", staff: "Sokha" }], ["Cash"], 15, 25),
    ...buildHistorySeed("TX-CC", "CUS-012", 12,
      [{ service: "Nail Gel", staff: "Sreyneang" }, { service: "Manicure", staff: "Sreyneang" }],
      ["ABA", "Cash"], 3, 7),
    ...buildHistorySeed("TX-NS", "CUS-013", 5,
      [{ service: "Facial", staff: "Lina" }, { service: "Makeup", staff: "Ratha" }],
      ["Cash", "ACLEDA"], 6, 11),
    ...buildHistorySeed("TX-KC", "CUS-014", 15,
      [{ service: "Hair Coloring", staff: "Dara" }, { service: "Hair Treatment", staff: "Dara" }],
      ["ABA", "Cash"], 2, 6)
  ];

  /* ============================================================
     STORAGE HELPERS
     ============================================================ */
  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  function serviceByName(name) {
    const services = load(KEY_SERVICES, SEED_SERVICES);
    return services.find((s) => s.name === name);
  }
  function categoryOf(name) {
    const s = serviceByName(name);
    return s ? s.category : "General";
  }
  function priceOf(name) {
    const s = serviceByName(name);
    return s ? s.price : 0;
  }

  function computeLineTotal(r) { return (r.price || 0) * (r.qty || 1); }

  // Source of truth for Service Incentive = Staff Management -> Incentive Setup, one flat
  // percentage per staff member (staff.serviceIncentiveRate), applied to ANY service that staff
  // performs - not configured per individual service. Uses the FINAL transaction price entered in
  // New Deal (price x qty), before the overall transaction discount. If the assigned staff has no
  // serviceIncentiveRate configured (or isn't a Service/Both type), no incentive is calculated
  // (configured: false, amount: 0) - New Deal displays "No incentive configured" in that case.
  function computeIncentiveForRow(staffName, serviceName, price, qty) {
    const staffList = load(KEY_STAFF, SEED_STAFF);
    const staffObj = staffList.find((s) => s.name === staffName);
    const lineTotal = (price || 0) * (qty || 1);
    if (!staffObj || typeof staffObj.serviceIncentiveRate !== "number") return { type: null, rate: 0, amount: 0, configured: false };
    const rate = staffObj.serviceIncentiveRate;
    const amount = +(lineTotal * (rate / 100)).toFixed(2);
    return { type: "percent", rate, amount, configured: true };
  }

  // Sales Incentive = a flat percentage (staff.salesIncentiveRate) applied when this staff member
  // closes a VIP package purchase/top-up as Sales Staff. Kept completely separate from Service
  // Incentive - never calculated on a package sale where no salon service was performed.
  function computeSalesIncentive(staffName, saleAmount) {
    const staffList = load(KEY_STAFF, SEED_STAFF);
    const staffObj = staffList.find((s) => s.name === staffName);
    if (!staffObj || typeof staffObj.salesIncentiveRate !== "number") return { type: "percent", rate: 0, amount: 0, configured: false };
    const rate = staffObj.salesIncentiveRate;
    const amount = +((saleAmount || 0) * (rate / 100)).toFixed(2);
    return { type: "percent", rate, amount, configured: true };
  }

  function buildSeedTransactions() {
    return SEED_TRANSACTIONS_RAW.map((tx) => {
      const isPackageTx = tx.txType === "vip_purchase" || tx.txType === "vip_topup";
      const services = (tx.services || []).map((r) => {
        if (r.incentiveAmount === undefined) {
          const calc = computeIncentiveForRow(r.staff, r.service, r.price, r.qty);
          r.incentiveType = calc.type;
          r.incentiveRate = calc.rate;
          r.incentiveAmount = calc.amount;
        }
        return r;
      });
      const subtotal = isPackageTx ? (tx.amount || 0) : services.reduce((sum, r) => sum + computeLineTotal(r), 0);
      const grandTotal = +(subtotal - (tx.discount || 0)).toFixed(2);
      const totalIncentive = +services.reduce((sum, r) => sum + (r.incentiveAmount || 0), 0).toFixed(2);
      const cust = SEED_CUSTOMERS.find((c) => c.id === tx.customerId);
      return {
        id: tx.id,
        customerId: tx.customerId,
        customerName: cust ? cust.name : "",
        phone: cust ? cust.phone : "",
        source: cust ? cust.source : "",
        notes: "",
        date: tx.date, time: tx.time,
        payment: tx.payment,
        discountType: "amount", discountValue: tx.discount || 0,
        discount: tx.discount || 0,
        subtotal: +subtotal.toFixed(2),
        grandTotal, totalIncentive,
        status: tx.status,
        services,
        txType: tx.txType || "service",
        salesStaff: tx.salesStaff || "",
        salesIncentiveAmount: tx.salesIncentiveAmount || 0,
        vipDeduction: tx.vipDeduction || 0,
        editHistory: tx.editHistory || [],
        createdAt: new Date().toISOString()
      };
    });
  }

  function generateInitialRecords(transactions) {
    const records = [];
    let n = 1;
    transactions.filter((tx) => tx.status === "Completed").forEach((tx) => {
      tx.services.forEach((r, idx) => {
        if (!r.staff) return;
        records.push({
          id: "INC-" + String(n++).padStart(3, "0"),
          transactionId: tx.id,
          rowIndex: idx,
          date: tx.date,
          customer: tx.customerName,
          phone: tx.phone,
          service: r.service,
          price: r.price,
          qty: r.qty,
          staff: r.staff,
          incentiveType: r.incentiveType,
          incentiveRate: r.incentiveRate,
          incentiveAmount: r.incentiveAmount,
          incentiveCategory: "service",
          status: "Confirmed"
        });
      });
      // Sales Incentive record (package/product sale closed by a Sales Staff) - separate from Service Incentive
      if (tx.salesStaff && tx.salesIncentiveAmount) {
        records.push({
          id: "INC-" + String(n++).padStart(3, "0"),
          transactionId: tx.id,
          rowIndex: -1,
          date: tx.date,
          customer: tx.customerName,
          phone: tx.phone,
          service: tx.txType === "vip_topup" ? "VIP Top-Up" : "VIP Package Purchase",
          price: tx.grandTotal,
          qty: 1,
          staff: tx.salesStaff,
          incentiveType: "sale",
          incentiveRate: 0,
          incentiveAmount: tx.salesIncentiveAmount,
          incentiveCategory: "sales",
          status: "Confirmed"
        });
      }
    });
    return records;
  }

  // ------------------------------------------------------------------------
  // ONE-TIME MIGRATION: old per-service incentive rule model -> new flat
  // function-based model (staff.serviceIncentiveRate / staff.salesIncentiveRate).
  // Runs once per browser; existing customers/transactions/package history/services
  // are never touched. Only staff records are updated, and the old per-service
  // "incentive schemes" storage key is retired afterward.
  // ------------------------------------------------------------------------
  const KEY_INCENTIVE_MODEL_VERSION = "c039_incentive_model_version";
  function migrateToFunctionBasedIncentives() {
    if (localStorage.getItem(KEY_INCENTIVE_MODEL_VERSION) === "2") return;
    const staffList = load(KEY_STAFF, null);
    if (staffList) {
      let legacySchemes = {};
      try { legacySchemes = JSON.parse(localStorage.getItem(KEY_SCHEMES) || "{}") || {}; } catch (e) { legacySchemes = {}; }
      staffList.forEach((s) => {
        if (typeof s.serviceIncentiveRate !== "number") {
          const rules = legacySchemes[s.id] || [];
          if (rules.length) {
            // Approximate a single flat % from the old per-service rules: percent rules use their
            // own rate directly; old fixed-$ rules are approximated against a $20 average ticket
            // (demo-only baseline) so every staff member ends up with one representative rate.
            const rates = rules.map((r) => (r.type === "percent" ? r.rate : Math.round((r.rate / 20) * 100)));
            s.serviceIncentiveRate = Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
          } else if (s.type === "service" || s.type === "both") {
            s.serviceIncentiveRate = 0;
          }
        }
        if (typeof s.salesIncentiveRate !== "number") {
          if (s.salesIncentive) {
            // Old fixed-$ sales incentives are approximated against a $100 baseline VIP package.
            s.salesIncentiveRate = s.salesIncentive.type === "percent" ? s.salesIncentive.rate : Math.round((s.salesIncentive.rate / 100) * 100);
            delete s.salesIncentive;
          } else if (s.type === "sales" || s.type === "both") {
            s.salesIncentiveRate = 0;
          }
        }
      });
      save(KEY_STAFF, staffList);
    }
    localStorage.removeItem(KEY_SCHEMES); // legacy per-service rule storage retired
    localStorage.setItem(KEY_INCENTIVE_MODEL_VERSION, "2");
  }

  function initData() {
    if (!localStorage.getItem(KEY_SERVICES)) save(KEY_SERVICES, SEED_SERVICES);
    if (!localStorage.getItem(KEY_STAFF)) save(KEY_STAFF, SEED_STAFF);
    migrateToFunctionBasedIncentives();
    if (!localStorage.getItem(KEY_CUSTOMERS)) save(KEY_CUSTOMERS, SEED_CUSTOMERS);
    if (!localStorage.getItem(KEY_TRANSACTIONS)) {
      const txs = buildSeedTransactions();
      save(KEY_TRANSACTIONS, txs);
      save(KEY_RECORDS, generateInitialRecords(txs));
    }
    if (!localStorage.getItem(KEY_SETTINGS)) save(KEY_SETTINGS, { lang: "km", role: "owner" });
    if (!localStorage.getItem(KEY_IMPORTED)) save(KEY_IMPORTED, []);
    importWebsiteBookings();
  }

  // Convert public-website booking submissions into single-service transactions
  function importWebsiteBookings() {
    const webBookings = load(KEY_WEBSITE_BOOKINGS, []);
    if (!webBookings.length) return;
    const imported = load(KEY_IMPORTED, []);
    const transactions = load(KEY_TRANSACTIONS, []);
    const customers = load(KEY_CUSTOMERS, []);
    let changed = false;

    webBookings.forEach((wb) => {
      if (imported.includes(wb.id)) return;
      let cust = customers.find((c) => c.phone === wb.phone);
      if (!cust) {
        const nextNum = customers.reduce((max, c) => {
          const m = /CUS-(\d+)/.exec(c.id || "");
          return m ? Math.max(max, parseInt(m[1], 10)) : max;
        }, 0) + 1;
        cust = { id: "CUS-" + String(nextNum).padStart(3, "0"), name: wb.customerName, phone: wb.phone, source: "Website", notes: "" };
        customers.push(cust);
      }
      const price = wb.price || priceOf(wb.service);
      transactions.push({
        id: wb.id,
        customerId: cust.id,
        customerName: wb.customerName,
        phone: wb.phone,
        source: "Website",
        notes: wb.notes || "",
        date: wb.date, time: wb.time,
        payment: "",
        discount: 0,
        subtotal: price, grandTotal: price, totalIncentive: 0,
        status: "Open",
        services: [{
          service: wb.service, category: categoryOf(wb.service), price,
          qty: 1, staff: wb.staff && wb.staff !== "Any Available" ? wb.staff : "",
          incentiveType: "percent", incentiveRate: 0, incentiveAmount: 0
        }],
        createdAt: wb.createdAt || new Date().toISOString()
      });
      imported.push(wb.id);
      changed = true;
    });

    if (changed) {
      save(KEY_TRANSACTIONS, transactions);
      save(KEY_CUSTOMERS, customers);
      save(KEY_IMPORTED, imported);
    }
  }

  /* ============================================================
     I18N
     ============================================================ */
  const I18N = {
    km: {
      "sidebar.subtitle": "ប្រព័ន្ធគ្រប់គ្រងសាឡន",
      "sidebar.subtitleOwner": "ម្ចាស់សាឡន",
      "sidebar.subtitleCashier": "អ្នកគិតលុយ/ជំនួយការ",
      "nav.logout": "⎋ ចេញពីប្រព័ន្ធ",
      "login.subtitle": "ចូលប្រព័ន្ធគ្រប់គ្រងសាឡន",
      "login.username": "ឈ្មោះអ្នកប្រើប្រាស់",
      "login.password": "ពាក្យសម្ងាត់",
      "login.submit": "ចូលប្រព័ន្ធ",
      "login.error": "ឈ្មោះអ្នកប្រើប្រាស់ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ",
      "login.hintTitle": "គណនីសាកល្បង",
      "login.confirmLogout": "ចេញពីប្រព័ន្ធឬ?",
      "nav.overview": "ទិដ្ឋភាពទូទៅ",
      "nav.newDeal": "កិច្ចការថ្មី",
      "nav.transactions": "ប្រតិបត្តិការ",
      "nav.customers": "អតិថិជន",
      "nav.staffIncentive": "កម្រៃជើងសារបុគ្គលិក",
      "nav.services": "សេវាកម្ម",
      "nav.reports": "របាយការណ៍",
      "nav.settings": "ការកំណត់",
      "topbar.role": "តួនាទី",
      "topbar.colon": "៖",

      "kpi.todaySales": "លក់ថ្ងៃនេះ",
      "kpi.todayCustomers": "អតិថិជនថ្ងៃនេះ",
      "kpi.servicesCompleted": "សេវាកម្មបានបញ្ចប់",
      "kpi.totalIncentive": "កម្រៃជើងសារខែនេះ",
      "kpi.openTransactions": "ប្រតិបត្តិការមិនទាន់បិទ",
      "kpi.openPendingDeals": "កិច្ចព្រមព្រៀងកំពុងបម្រើ",

      "overview.salesTrend": "និន្នាការលក់ (៧ថ្ងៃ)",
      "overview.popularServices": "សេវាកម្មពេញនិយម",
      "overview.staffIncentiveSummary": "សង្ខេបកម្រៃជើងសារបុគ្គលិក",
      "overview.recentTransactions": "ប្រតិបត្តិការថ្មីៗ",
      "overview.staffActivity": "សកម្មភាពបុគ្គលិកថ្ងៃនេះ",

      "deal.customerInfo": "ព័ត៌មានអតិថិជន",
      "deal.services": "សេវាកម្ម",
      "deal.colService": "សេវាកម្ម",
      "deal.colPrice": "តម្លៃ",
      "deal.colQty": "ចំនួន",
      "deal.colStaff": "បុគ្គលិក",
      "deal.colIncentive": "កម្រៃជើងសារ",
      "deal.staffIncentive": "កម្រៃជើងសារបុគ្គលិក",
      "deal.noIncentiveConfigured": "មិនទាន់កំណត់កម្រៃជើងសារ",
      "deal.addService": "+ បន្ថែមសេវាកម្ម",
      "deal.discount": "បញ្ចុះតម្លៃ ($)",
      "deal.paymentMethod": "វិធីបង់ប្រាក់",
      "deal.subtotal": "សរុបរង",
      "deal.discountLine": "បញ្ចុះតម្លៃ",
      "deal.grandTotal": "សរុបទាំងអស់",
      "deal.totalIncentive": "កម្រៃជើងសារសរុប",
      "deal.saveOpen": "រក្សាទុកជាមិនទាន់បិទ",
      "deal.saveComplete": "បញ្ចប់ និងរក្សាទុកប្រតិបត្តិការ",
      "deal.newDeal": "+ ការលក់ថ្មី",
      "deal.autosaveNote": "ព័ត៌មានត្រូវបានរក្សាទុកដោយស្វ័យប្រវត្តិពេលប្តូរផ្ទាំង",
      "deal.confirmTitle": "បញ្ជាក់ការបិទប្រតិបត្តិការ",
      "deal.confirmNote": "សូមពិនិត្យព័ត៌មានខាងលើមុននឹងបញ្ជាក់។ សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
      "deal.confirmOk": "បញ្ជាក់ និងបញ្ចប់",
      "deal.removeRow": "លុប",
      "history.returning": "អតិថិជនចាស់",

      "form.customerName": "ឈ្មោះអតិថិជន",
      "form.phone": "លេខទូរស័ព្ទ",
      "form.customerSource": "ប្រភពអតិថិជន",
      "form.optional": "(មិនចាំបាច់)",
      "form.notes": "កំណត់ចំណាំ",

      "filters.clear": "សម្អាតតម្រង",
      "transactions.searchPlaceholder": "ស្វែងរកឈ្មោះអតិថិជន ឬលេខទូរស័ព្ទ",
      "filters.all": "ទាំងអស់",
      "filters.today": "ថ្ងៃនេះ",
      "filters.week": "សប្តាហ៍នេះ",
      "filters.month": "ខែនេះ",
      "filters.last7": "៧ថ្ងៃចុងក្រោយ",
      "filters.last30": "៣០ថ្ងៃចុងក្រោយ",
      "filters.custom": "កំណត់ចន្លោះកាលបរិច្ឆេទ",

      "th.customer": "អតិថិជន",
      "th.phone": "លេខទូរស័ព្ទ",
      "th.services": "សេវាកម្ម",
      "th.staff": "បុគ្គលិក",
      "th.total": "សរុប",
      "th.payment": "វិធីបង់ប្រាក់",
      "th.date": "កាលបរិច្ឆេទ",
      "th.status": "ស្ថានភាព",
      "th.actions": "សកម្មភាព",
      "th.lastVisit": "មកលើកចុងក្រោយ",
      "th.totalVisits": "ចំនួនមកសរុប",
      "th.totalSpending": "ចំណាយសរុប",
      "th.mostUsedService": "សេវាកម្មប្រើញឹកញាប់",
      "th.source": "ប្រភព",
      "th.amount": "ចំនួនទឹកប្រាក់",
      "th.type": "ប្រភេទ",
      "th.serviceTransaction": "សេវាកម្ម/ប្រតិបត្តិការ",
      "th.servicesCompleted": "សេវាកម្មបានបញ្ចប់",
      "th.salesValue": "តម្លៃលក់",
      "th.incentiveEarned": "កម្រៃជើងសារទទួលបាន",
      "th.outstanding": "នៅសល់",
      "th.category": "ប្រភេទ",
      "th.price": "តម្លៃ",

      "status.Open": "មិនទាន់បិទ",
      "status.Completed": "បានបញ្ចប់",
      "status.Cancelled": "បានលុបចោល",

      "actions.view": "មើល",
      "actions.edit": "កែសម្រួល",
      "actions.remove": "លុប",
      "actions.complete": "បិទ",
      "actions.cancel": "លុបចោល",
      "actions.print": "បញ្ចេញវិក្កយបត្រ",

      "customers.title": "អតិថិជន",
      "customers.history": "ប្រវត្តិមកកម្សាន្ត",

      "staffIncentive.summary": "សង្ខេបកម្រៃជើងសារបុគ្គលិក",
      "staffIncentive.detail": "លម្អិតកម្រៃជើងសារ",

      "incentiveScheme.title": "គម្រោងកម្រៃជើងសារ",
      "incentiveScheme.toggle": "បង្ហាញ / លាក់",
      "incentiveScheme.viewOnlyNote": "អ្នកកំពុងមើលក្នុងនាមជាអ្នកគិតលុយ/ជំនួយការ — គម្រោងកម្រៃជើងសារអាចមើលបានតែប៉ុណ្ណោះ។",
      "incentiveScheme.percent": "ភាគរយ (%)",
      "incentiveScheme.fixed": "ចំនួនថេរ ($)",
      "incentiveScheme.addRule": "+ បន្ថែមជួរ",
      "incentiveScheme.serviceRulesTitle": "ច្បាប់កម្រៃជើងសារតាមសេវាកម្ម",
      "incentiveScheme.colService": "សេវាកម្ម",
      "incentiveScheme.colType": "ប្រភេទ",
      "incentiveScheme.colValue": "តម្លៃ",

      "services.title": "កាតាឡុកសេវាកម្ម",
      "services.addNew": "+ បន្ថែមសេវាកម្ម",

      "reports.sourceOptional": "ប្រភពអតិថិជន (មិនចាំបាច់)",
      "reports.salesByService": "លក់តាមសេវាកម្ម",
      "reports.staffIncentive": "កម្រៃជើងសារបុគ្គលិក",
      "reports.salesByStaff": "លក់តាមបុគ្គលិក",
      "reports.paymentMethod": "វិធីបង់ប្រាក់",
      "reports.totalSales": "លក់សរុប",
      "reports.numCustomers": "ចំនួនអតិថិជន",
      "reports.numVisits": "ចំនួនមកកម្សាន្ត",
      "reports.numServices": "ចំនួនសេវាកម្ម",
      "reports.moreReports": "របាយការណ៍បន្ថែម (មកដល់ឆាប់ៗ)",
      "reports.newVsReturning": "អតិថិជនថ្មី និងអតិថិជនចាស់",
      "reports.visitFrequency": "ភាពញឹកញាប់នៃការមកកម្សាន្តរបស់អតិថិជន",
      "reports.revenueByService": "ចំណូលតាមសេវាកម្ម",
      "reports.monthlyPerformance": "សមិទ្ធិផលប្រចាំខែ",

      "settings.title": "ការកំណត់",
      "settings.language": "ភាសា",
      "settings.loggedInAs": "ចូលប្រព័ន្ធក្នុងឈ្មោះ",
      "settings.owner": "ម្ចាស់",
      "settings.cashier": "អ្នកគិតលុយ/ជំនួយការ",
      "settings.demoTesting": "សាកល្បង / ការធ្វើតេស្ត",
      "settings.resetData": "កំណត់ទិន្នន័យឡើងវិញ",
      "settings.resetBtn": "កំណត់ទិន្នន័យទាំងអស់ឡើងវិញ",

      "modal.transactionDetail": "ព័ត៌មានលម្អិតប្រតិបត្តិការ",
      "modal.customerDetail": "ព័ត៌មានលម្អិតអតិថិជន",
      "modal.staffDetail": "លម្អិតកម្រៃជើងសារបុគ្គលិក",
      "modal.addService": "បន្ថែមសេវាកម្មថ្មី",
      "modal.save": "រក្សាទុក",
      "modal.cancel": "បោះបង់",

      "customerModal.summaryTitle": "ព័ត៌មានសង្ខេបអតិថិជន",
      "customerModal.vipSummaryTitle": "សង្ខេបកញ្ចប់ VIP",

      "toast.saved": "រក្សាទុកបានជោគជ័យ",
      "toast.dealSaved": "រក្សាទុកប្រតិបត្តិការបានជោគជ័យ",
      "toast.dealSavedOpen": "រក្សាទុកជាមិនទាន់បិទ — សូមកំណត់បុគ្គលិកគ្រប់សេវាកម្មដើម្បីបិទ",
      "toast.needStaffToComplete": "សូមកំណត់បុគ្គលិកគ្រប់សេវាកម្មមុននឹងបិទប្រតិបត្តិការ",
      "toast.needOneService": "សូមបន្ថែមសេវាកម្មយ៉ាងតិចមួយ",
      "toast.completed": "ប្រតិបត្តិការត្រូវបានបិទ",
      "toast.cancelled": "ប្រតិបត្តិការត្រូវបានលុបចោល",
      "toast.reset": "ទិន្នន័យសាកល្បងត្រូវបានកំណត់ឡើងវិញ",

      "common.any": "គ្មានកំណត់",
      "common.none": "—",

      "nav.staff": "គ្រប់គ្រងបុគ្គលិក",
      "customers.addNew": "+ បន្ថែមអតិថិជន",
      "deal.salesInfo": "ព័ត៌មានការលក់",
      "deal.salesStaff": "បុគ្គលិកលក់",
      "customerType.normal": "ធម្មតា",
      "customerType.vip": "VIP",
      "th.customerType": "ប្រភេទអតិថិជន",
      "vip.sellTopUp": "$ លក់ / បញ្ចូលទឹកប្រាក់ VIP",
      "vip.balanceLabel": "សមតុល្យ VIP",
      "vip.paymentLocked": "សមតុល្យកញ្ចប់ VIP",
      "vip.balanceAvailable": "សមតុល្យ VIP ដែលមាន",
      "vip.purchaseLabel": "ទិញកញ្ចប់ VIP",
      "vip.topupLabel": "បញ្ចូលទឹកប្រាក់ VIP",
      "vip.initialPackage": "ចំនួនកញ្ចប់ដំបូង",
      "vip.packageAmount": "ចំនួនកញ្ចប់",
      "vip.purchaseDate": "កាលបរិច្ឆេទទិញ",
      "vip.totalPurchased": "ចំនួនកញ្ចប់សរុបបានទិញ",
      "vip.packageHistory": "ប្រវត្តិកញ្ចប់",
      "vip.remainingToPay": "នៅសល់ត្រូវបង់",
      "vip.remainingPaymentMethod": "វិធីបង់ប្រាក់សម្រាប់ចំនួនសល់",
      "vip.used": "VIP ប្រើប្រាស់",
      "vip.custom": "កំណត់ដោយខ្លួនឯង",
      "vip.customerMode": "ប្រភេទអតិថិជន",
      "vip.existingCustomer": "អតិថិជនចាស់",
      "vip.newCustomer": "អតិថិជនថ្មី",
      "staff.title": "គ្រប់គ្រងបុគ្គលិក",
      "staff.addNew": "+ បន្ថែមបុគ្គលិក",
      "staff.name": "ឈ្មោះបុគ្គលិក",
      "staff.type": "ប្រភេទបុគ្គលិក",
      "staff.position": "តួនាទី / មុខតំណែង",
      "staff.defaultIncentive": "កម្រៃជើងសារលំនាំដើម",
      "staff.incentiveSetup": "កំណត់កម្រៃជើងសារ",
      "staff.manageIncentive": "គ្រប់គ្រងកម្រៃជើងសារ",
      "staff.viewIncentive": "មើលកម្រៃជើងសារ",
      "staff.addIncentiveRule": "+ បន្ថែមច្បាប់កម្រៃជើងសារ",
      "staff.saveIncentive": "រក្សាទុកកម្រៃជើងសារ",
      "staff.noRulesYet": "មិនទាន់កំណត់",
      "staff.serviceIncentivePercent": "កម្រៃជើងសារសេវាកម្ម (%)",
      "staff.salesIncentivePercent": "កម្រៃជើងសារការលក់ (%)",
      "staff.serviceIncentiveHint": "អនុវត្តលើគ្រប់សេវាកម្មទាំងអស់ដែលបុគ្គលិកនេះបំពេញ គិតលើតម្លៃចុងក្រោយក្នុងប្រតិបត្តិការ។",
      "staff.salesIncentiveHint": "អនុវត្តតែពេលបុគ្គលិកនេះជាបុគ្គលិកលក់បិទការទិញ/បញ្ចូលទឹកប្រាក់កញ្ចប់ VIP ប៉ុណ្ណោះ។",
      "staff.incentiveSetupHint": "ការកំណត់កម្រៃជើងសារអាចធ្វើបានពី \"គ្រប់គ្រងកម្រៃជើងសារ\" បន្ទាប់ពីរក្សាទុកបុគ្គលិកនេះ។",
      "staff.status": "ស្ថានភាព",
      "staff.active": "សកម្ម",
      "staff.inactive": "អសកម្ម",
      "staff.activate": "ធ្វើឲ្យសកម្ម",
      "staff.deactivate": "បិទសកម្មភាព",
      "staff.confirmActivate": "តើអ្នកប្រាកដថាចង់ធ្វើឲ្យបុគ្គលិកនេះសកម្មឬ?",
      "staff.confirmDeactivate": "តើអ្នកប្រាកដថាចង់បិទសកម្មភាពបុគ្គលិកនេះឬ?",
      "staff.salesClosed": "ការលក់បានបិទ",
      "staff.salesIncentiveEarned": "កម្រៃជើងសារលក់ទទួលបាន",
      "staff.totalIncentive": "កម្រៃជើងសាររួម",
      "staffType.sales": "បុគ្គលិកលក់",
      "staffType.service": "បុគ្គលិកសេវាកម្ម",
      "staffType.both": "ទាំងពីរ",
      "incentiveType.all": "គ្រប់ប្រភេទកម្រៃជើងសារ",
      "incentiveType.sales": "កម្រៃជើងសារលក់",
      "incentiveType.service": "កម្រៃជើងសារសេវាកម្ម",
      "incentiveType.combined": "សង្ខេបរួម",
      "reports.serviceRevenue": "ចំណូលពីសេវាកម្ម",
      "reports.vipPackageSales": "លក់កញ្ចប់ VIP",
      "reports.vipBalanceOutstanding": "សមតុល្យ VIP នៅសល់",
      "reports.vipBalanceUsed": "សមតុល្យ VIP បានប្រើ (មិនមែនចំណូល)",
      "reports.normalCustomers": "អតិថិជនធម្មតា",
      "reports.vipCustomers": "អតិថិជន VIP",
      "reports.newVipCustomers": "អតិថិជន VIP ថ្មី",
      "reports.serviceIncentive": "កម្រៃជើងសារសេវាកម្ម",
      "reports.salesIncentive": "កម្រៃជើងសារលក់",
      "reports.allCustomerTypes": "ប្រភេទអតិថិជនទាំងអស់",
      "reports.tabOverview": "ទិដ្ឋភាពទូទៅ",
      "reports.tabSales": "លក់ & ការទូទាត់",
      "reports.tabCustomers": "អតិថិជន",
      "reports.tabStaff": "បុគ្គលិក & កម្រៃជើងសារ",
      "reports.revenueBreakdown": "ការបំបែកចំណូល",
      "reports.totalRevenue": "ចំណូលសរុប",
      "reports.topCustomers": "អតិថិជនកំពូលតាមចំណូលរួមចំណែក",
      "reports.vipBalanceSummary": "សង្ខេបសមតុល្យ VIP",
      "reports.serviceIncentiveSummary": "សង្ខេបកម្រៃជើងសារសេវាកម្ម",
      "reports.salesIncentiveSummary": "សង្ខេបកម្រៃជើងសារលក់",
      "reports.combinedStaffSummary": "សង្ខេបបុគ្គលិករួម",
      "reports.totalCustomers": "អតិថិជនសរុប",
      "reports.totalVisits": "ចំនួនមកសរុប",
      "reports.avgVisitsPerCustomer": "ចំនួនមកជាមធ្យមក្នុងមួយអតិថិជន",
      "reports.newCustomers": "អតិថិជនថ្មី",
      "reports.returningCustomers": "អតិថិជនចាស់",
      "reports.visitFreq1": "មកម្តង (១ដង)",
      "reports.visitFreq2to3": "មក ២-៣ដង",
      "reports.visitFreq4plus": "មក ៤ដងឡើងទៅ",
      "reports.totalServiceIncentive": "កម្រៃជើងសារសេវាកម្មសរុប",
      "reports.totalSalesIncentive": "កម្រៃជើងសារលក់សរុប",
      "reports.totalIncentive": "កម្រៃជើងសាររួម",
      "th.serviceSales": "តម្លៃសេវាកម្មដែលបានធ្វើ",
      "th.incentiveEarned": "កម្រៃជើងសារទទួលបាន",
      "th.salesStaff": "បុគ្គលិកលក់",
      "th.salesClosed": "ការលក់បានសម្រេច",
      "th.salesValue": "តម្លៃលក់",
      "th.serviceIncentiveCol": "កម្រៃជើងសារសេវាកម្ម",
      "th.salesIncentiveCol": "កម្រៃជើងសារលក់",
      "th.totalIncentiveCol": "កម្រៃជើងសាររួម",
      "reports.exportExcel": "នាំចេញ Excel",
      "reports.exportSuccess": "នាំចេញ Excel បានជោគជ័យ",
      "reports.exportFailed": "នាំចេញ Excel មិនជោគជ័យ",
      "reports.exportLibMissing": "មិនអាចនាំចេញបានទេ សូមពិនិត្យការតភ្ជាប់អ៊ីនធឺណិត",
      "audit.editedBy": "កែប្រែដោយ",
      "audit.edited": "បានកែប្រែ",
      "audit.editHistory": "ប្រវត្តិកែប្រែ",
      "audit.editWarning": "ការកែប្រែនេះនឹងត្រូវបានកត់ត្រាទុកជាប្រវត្តិកែប្រែ",
      "audit.saved": "រក្សាទុកការកែប្រែជោគជ័យ"
    },
    en: {
      "sidebar.subtitle": "Salon Admin",
      "sidebar.subtitleOwner": "Salon Owner",
      "sidebar.subtitleCashier": "Cashier / Admin",
      "nav.logout": "⎋ Logout",
      "login.subtitle": "Salon Admin Login",
      "login.username": "Username",
      "login.password": "Password",
      "login.submit": "Log In",
      "login.error": "Invalid username or password.",
      "login.hintTitle": "Demo accounts",
      "login.confirmLogout": "Log out?",
      "nav.overview": "Dashboard",
      "nav.newDeal": "New Deal",
      "nav.transactions": "Transactions",
      "nav.customers": "Customers",
      "nav.staffIncentive": "Staff Incentive",
      "nav.services": "Services",
      "nav.reports": "Reports",
      "nav.settings": "Settings",
      "topbar.role": "Role",
      "topbar.colon": ":",

      "kpi.todaySales": "Today's Sales",
      "kpi.todayCustomers": "Today's Customers",
      "kpi.servicesCompleted": "Services Completed",
      "kpi.totalIncentive": "Total Staff Incentive (Month)",
      "kpi.openTransactions": "Pending / Open Transactions",
      "kpi.openPendingDeals": "Open / Pending Deals",

      "overview.salesTrend": "Sales Trend (7 Days)",
      "overview.popularServices": "Popular Services",
      "overview.staffIncentiveSummary": "Staff Incentive Summary",
      "overview.recentTransactions": "Recent Transactions",
      "overview.staffActivity": "Today's Staff Activity",

      "deal.customerInfo": "Customer Information",
      "deal.services": "Services",
      "deal.colService": "Service",
      "deal.colPrice": "Price",
      "deal.colQty": "Qty",
      "deal.colStaff": "Staff",
      "deal.colIncentive": "Incentive",
      "deal.staffIncentive": "Staff Incentive",
      "deal.noIncentiveConfigured": "No incentive configured",
      "deal.addService": "+ Add More Service",
      "deal.discount": "Discount ($)",
      "deal.paymentMethod": "Payment Method",
      "deal.subtotal": "Subtotal",
      "deal.discountLine": "Discount",
      "deal.grandTotal": "Grand Total",
      "deal.totalIncentive": "Total Staff Incentive",
      "deal.saveOpen": "Save as Open",
      "deal.saveComplete": "Complete & Save Transaction",
      "deal.newDeal": "+ New Deal",
      "deal.autosaveNote": "Changes are kept automatically while you switch tabs",
      "deal.confirmTitle": "Confirm Transaction Completion",
      "deal.confirmNote": "Please review the details above before confirming. This action cannot be undone.",
      "deal.confirmOk": "Confirm & Complete",
      "deal.removeRow": "Remove",
      "history.returning": "Returning Customer",

      "form.customerName": "Customer Name",
      "form.phone": "Phone Number",
      "form.customerSource": "Customer Source",
      "form.optional": "(optional)",
      "form.notes": "Notes",

      "filters.clear": "Clear",
      "transactions.searchPlaceholder": "Search customer name or phone number",
      "filters.all": "All",
      "filters.today": "Today",
      "filters.week": "This Week",
      "filters.month": "This Month",
      "filters.last7": "Last 7 Days",
      "filters.last30": "Last 30 Days",
      "filters.custom": "Custom Range",

      "th.customer": "Customer",
      "th.phone": "Phone",
      "th.services": "Services",
      "th.staff": "Staff",
      "th.total": "Total",
      "th.payment": "Payment",
      "th.date": "Date",
      "th.status": "Status",
      "th.actions": "Actions",
      "th.lastVisit": "Last Visit",
      "th.totalVisits": "Total Visits",
      "th.totalSpending": "Total Spending",
      "th.mostUsedService": "Most-Used Service",
      "th.source": "Source",
      "th.servicesCompleted": "Services Completed",
      "th.salesValue": "Sales Value",
      "th.incentiveEarned": "Incentive Earned",
      "th.outstanding": "Outstanding",
      "th.category": "Category",
      "th.price": "Price",

      "status.Open": "Open",
      "status.Completed": "Completed",
      "status.Cancelled": "Cancelled",

      "actions.view": "View",
      "actions.edit": "Edit",
      "actions.remove": "Remove",
      "actions.complete": "Complete",
      "actions.cancel": "Cancel",
      "actions.print": "Print Receipt",

      "customers.title": "Customers",
      "customers.history": "Visit History",

      "staffIncentive.summary": "Staff Incentive Summary",
      "staffIncentive.detail": "Incentive Detail",

      "incentiveScheme.title": "Incentive Scheme",
      "incentiveScheme.toggle": "Show / Hide",
      "incentiveScheme.viewOnlyNote": "You are viewing as Cashier/Admin — incentive scheme is view-only.",
      "incentiveScheme.percent": "Percentage (%)",
      "incentiveScheme.fixed": "Fixed ($)",
      "incentiveScheme.addRule": "+ Add Rule",
      "incentiveScheme.serviceRulesTitle": "Service Incentive Rules",
      "incentiveScheme.colService": "Service",
      "incentiveScheme.colType": "Type",
      "incentiveScheme.colValue": "Value",

      "services.title": "Service Catalog",
      "services.addNew": "+ Add Service",

      "reports.sourceOptional": "Customer Source (optional)",
      "reports.salesByService": "Sales by Service",
      "reports.staffIncentive": "Staff Incentive",
      "reports.salesByStaff": "Sales by Staff",
      "reports.paymentMethod": "Payment Method",
      "reports.totalSales": "Total Sales",
      "reports.numCustomers": "Number of Customers",
      "reports.numVisits": "Number of Visits",
      "reports.numServices": "Number of Services",
      "reports.moreReports": "More Reports (coming soon)",
      "reports.newVsReturning": "New vs Returning Customers",
      "reports.visitFrequency": "Customer Visit Frequency",
      "reports.revenueByService": "Revenue by Service",
      "reports.monthlyPerformance": "Monthly Performance",

      "settings.title": "Settings",
      "settings.language": "Language",
      "settings.loggedInAs": "Logged in as",
      "settings.owner": "Owner",
      "settings.cashier": "Cashier / Admin",
      "settings.demoTesting": "Demo / Testing",
      "settings.resetData": "Reset Demo Data",
      "settings.resetBtn": "Reset All Data",

      "modal.transactionDetail": "Transaction Detail",
      "modal.customerDetail": "Customer Detail",
      "modal.staffDetail": "Staff Incentive Detail",
      "modal.addService": "Add New Service",
      "modal.save": "Save",
      "modal.cancel": "Cancel",

      "customerModal.summaryTitle": "Customer Summary",
      "customerModal.vipSummaryTitle": "VIP Package Summary",

      "toast.saved": "Saved successfully",
      "toast.dealSaved": "Transaction saved successfully",
      "toast.dealSavedOpen": "Saved as Open — assign staff to every service to complete",
      "toast.needStaffToComplete": "Please assign staff to every service before completing",
      "toast.needOneService": "Please add at least one service",
      "toast.completed": "Transaction marked as Completed",
      "toast.cancelled": "Transaction cancelled",
      "toast.reset": "Demo data has been reset",

      "common.any": "Unassigned",
      "common.none": "—",

      "nav.staff": "Staff Management",
      "customers.addNew": "+ Add Customer",
      "deal.salesInfo": "Sales Information",
      "deal.salesStaff": "Sales Staff",
      "customerType.normal": "Normal",
      "customerType.vip": "VIP",
      "th.customerType": "Customer Type",
      "vip.sellTopUp": "$ Sell / Top-Up VIP Package",
      "vip.balanceLabel": "VIP Balance",
      "vip.paymentLocked": "VIP Package Balance",
      "vip.balanceAvailable": "VIP Balance Available",
      "vip.purchaseLabel": "VIP Package Purchase",
      "vip.topupLabel": "VIP Top-Up",
      "vip.initialPackage": "Initial Package Amount",
      "vip.packageAmount": "Package Amount",
      "vip.purchaseDate": "Package Purchase Date",
      "vip.totalPurchased": "Total Package Purchased",
      "vip.packageHistory": "Package History",
      "vip.remainingToPay": "Remaining to Pay",
      "vip.remainingPaymentMethod": "Payment Method for Remaining Amount",
      "vip.used": "VIP Balance Used",
      "vip.custom": "Custom",
      "vip.customerMode": "Customer",
      "vip.existingCustomer": "Existing Customer",
      "vip.newCustomer": "New Customer",
      "staff.title": "Staff Management",
      "staff.addNew": "+ Add Staff",
      "staff.name": "Staff Name",
      "staff.type": "Staff Type",
      "staff.position": "Position / Role",
      "staff.defaultIncentive": "Default Incentive",
      "staff.incentiveSetup": "Incentive Setup",
      "staff.manageIncentive": "Manage Incentive",
      "staff.viewIncentive": "View Incentive",
      "staff.addIncentiveRule": "+ Add Incentive Rule",
      "staff.saveIncentive": "Save Incentive",
      "staff.noRulesYet": "Not configured",
      "staff.serviceIncentivePercent": "Service Incentive (%)",
      "staff.salesIncentivePercent": "Sales Incentive (%)",
      "staff.serviceIncentiveHint": "Applies to every service this staff member performs, based on the final price used in the transaction.",
      "staff.salesIncentiveHint": "Applies only when this staff member is the Sales Staff who closes a VIP Package Purchase or Top-Up.",
      "staff.incentiveSetupHint": "Incentive rules can be configured from \"Manage Incentive\" after this staff member is saved.",
      "staff.status": "Status",
      "staff.active": "Active",
      "staff.inactive": "Inactive",
      "staff.activate": "Activate",
      "staff.deactivate": "Deactivate",
      "staff.confirmActivate": "Are you sure you want to activate this staff member?",
      "staff.confirmDeactivate": "Are you sure you want to deactivate this staff member?",
      "staff.salesClosed": "Sales Closed",
      "staff.salesIncentiveEarned": "Sales Incentive Earned",
      "staff.totalIncentive": "Total Incentive",
      "staffType.sales": "Sales Staff",
      "staffType.service": "Service Staff",
      "staffType.both": "Both",
      "incentiveType.all": "All Incentive Types",
      "incentiveType.sales": "Sales Incentive",
      "incentiveType.service": "Service Incentive",
      "incentiveType.combined": "Combined Summary",
      "reports.serviceRevenue": "Service Revenue",
      "reports.vipPackageSales": "VIP Package Sales",
      "reports.vipBalanceOutstanding": "VIP Balance Outstanding",
      "reports.vipBalanceUsed": "VIP Balance Used (not revenue)",
      "reports.normalCustomers": "Normal Customers",
      "reports.vipCustomers": "VIP Customers",
      "reports.newVipCustomers": "New VIP Customers",
      "reports.serviceIncentive": "Service Incentive",
      "reports.salesIncentive": "Sales Incentive",
      "reports.allCustomerTypes": "All Customer Types",
      "reports.tabOverview": "Overview",
      "reports.tabSales": "Sales & Payment",
      "reports.tabCustomers": "Customers",
      "reports.tabStaff": "Staff & Incentive",
      "reports.revenueBreakdown": "Revenue Breakdown",
      "reports.totalRevenue": "Total Revenue",
      "reports.topCustomers": "Top Customers by Revenue Contribution",
      "reports.vipBalanceSummary": "VIP Balance Summary",
      "reports.serviceIncentiveSummary": "Service Incentive Summary",
      "reports.salesIncentiveSummary": "Sales Incentive Summary",
      "reports.combinedStaffSummary": "Combined Staff Summary",
      "reports.totalCustomers": "Total Customers",
      "reports.totalVisits": "Total Visits",
      "reports.avgVisitsPerCustomer": "Average Visits per Customer",
      "reports.newCustomers": "New Customers",
      "reports.returningCustomers": "Returning Customers",
      "reports.visitFreq1": "1 Visit",
      "reports.visitFreq2to3": "2-3 Visits",
      "reports.visitFreq4plus": "4+ Visits",
      "reports.totalServiceIncentive": "Total Service Incentive",
      "reports.totalSalesIncentive": "Total Sales Incentive",
      "reports.totalIncentive": "Total Incentive",
      "th.serviceSales": "Service Value Performed",
      "th.incentiveEarned": "Incentive Earned",
      "th.salesStaff": "Sales Staff",
      "th.salesClosed": "Sales Closed",
      "th.salesValue": "Sales Value",
      "th.serviceIncentiveCol": "Service Incentive",
      "th.salesIncentiveCol": "Sales Incentive",
      "th.totalIncentiveCol": "Total Incentive",
      "reports.exportExcel": "Export Excel",
      "reports.exportSuccess": "Excel exported successfully",
      "reports.exportFailed": "Excel export failed",
      "reports.exportLibMissing": "Export unavailable — check your internet connection",
      "audit.editedBy": "Edited by",
      "audit.edited": "Edited",
      "audit.editHistory": "Edit History",
      "audit.editWarning": "This edit will be recorded in the edit history",
      "audit.saved": "Changes saved successfully"
    }
  };

  function t(key) {
    const settings = load(KEY_SETTINGS, { lang: "km", role: "owner" });
    const dict = I18N[settings.lang] || I18N.km;
    return dict[key] || key;
  }

  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.documentElement.lang = getSettings().lang === "km" ? "km" : "en";
  }

  /* ============================================================
     SETTINGS HELPERS
     ============================================================ */
  function getSettings() { return load(KEY_SETTINGS, { lang: "km", role: "owner" }); }
  function setSettings(patch) {
    const s = Object.assign(getSettings(), patch);
    save(KEY_SETTINGS, s);
    return s;
  }

  /* ============================================================
     TOAST
     ============================================================ */
  let toastTimer;
  function showToast(msg, type) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.className = "toast show" + (type ? " " + type : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.className = "toast"; }, 2800);
  }

  /* ============================================================
     BADGE / DATE HELPERS
     ============================================================ */
  function statusBadgeClass(status) {
    return { Open: "badge-new", Completed: "badge-completed", Cancelled: "badge-cancelled" }[status] || "badge-new";
  }
  function isToday(dateStr) { return dateStr === new Date().toISOString().split("T")[0]; }
  function isThisMonth(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr), now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  function isThisWeek(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr), now = new Date();
    const start = new Date(now); start.setDate(now.getDate() - now.getDay()); start.setHours(0, 0, 0, 0);
    const end = new Date(start); end.setDate(start.getDate() + 7);
    return d >= start && d < end;
  }
  function inRange(dateStr, from, to) {
    if (!dateStr) return false;
    if (from && dateStr < from) return false;
    if (to && dateStr > to) return false;
    return true;
  }
  function fmt(n) { return "$" + (Number(n) || 0).toFixed(2); }

  // NEW REVENUE ACCOUNTING RULE: VIP Package Balance redemption is NOT new daily income - that
  // amount was already recognized as revenue at the moment the VIP package was purchased/topped
  // up (recorded separately as a vip_purchase/vip_topup transaction with its own grandTotal).
  // For any transaction, "new revenue" = grandTotal minus whatever portion was paid from an
  // existing VIP balance (tx.vipDeduction). VIP Package Purchase/Top-Up transactions always have
  // vipDeduction = 0, so their full grandTotal is counted as new revenue as usual. A split payment
  // (e.g. $20 VIP Balance + $30 Cash on a $50 total) correctly nets to just the $30 new-revenue
  // portion. Value is derived live from existing transaction fields - no historical record is
  // rewritten, so this recomputes correctly for both new and already-seeded demo transactions.
  function revenueOf(tx) { return +Math.max(0, (tx.grandTotal || 0) - (tx.vipDeduction || 0)).toFixed(2); }

  // A "visit" is a completed salon SERVICE transaction. VIP Package Purchase / VIP Top-Up
  // transactions are sales events, not service visits, so they must never be counted toward
  // Total Visits, Average Visits, Visit Frequency, or New/Returning customer logic.
  function isServiceTx(tx) { return (tx.txType || "service") === "service"; }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  const PAGE_TITLE_KEYS = {
    overview: "nav.overview", "new-deal": "nav.newDeal", transactions: "nav.transactions",
    customers: "nav.customers", staff: "nav.staff", services: "nav.services",
    reports: "nav.reports", settings: "nav.settings"
  };

  function updatePageTitle(page) {
    document.getElementById("pageTitle").textContent = t(PAGE_TITLE_KEYS[page]);
  }

  function setupNav() {
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => goToPage(btn.dataset.page));
    });
    document.getElementById("hamburger").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
    });
  }

  function goToPage(page) {
    document.querySelectorAll(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.page === page));
    document.querySelectorAll(".page").forEach((p) => p.classList.toggle("active", p.id === "page-" + page));
    document.getElementById("sidebar").classList.remove("open");
    updatePageTitle(page);
    renderPage(page);
  }

  function currentPage() {
    const active = document.querySelector(".nav-item.active");
    return active ? active.dataset.page : "overview";
  }
  function refreshCurrentPage() { renderPage(currentPage()); }

  function renderPage(page) {
    if (page === "overview") renderOverview();
    if (page === "new-deal") renderNewDealPage();
    if (page === "transactions") renderTransactionsPage();
    if (page === "customers") renderCustomersPage();
    if (page === "staff") renderStaffPage();
    if (page === "services") renderServicesPage();
    if (page === "reports") renderReportsPage();
  }

  /* ============================================================
     ROLE
     ============================================================ */
  function applyRole() {
    const role = getSettings().role;
    document.body.classList.toggle("role-cashier", role === "cashier");
    document.getElementById("roleLabel").textContent = role === "owner" ? t("settings.owner") : t("settings.cashier");

    const sidebarRoleText = document.getElementById("sidebarRoleText");
    if (sidebarRoleText) sidebarRoleText.textContent = role === "owner" ? t("sidebar.subtitleOwner") : t("sidebar.subtitleCashier");

    const settingsLoggedInAs = document.getElementById("settingsLoggedInAs");
    if (settingsLoggedInAs) settingsLoggedInAs.textContent = role === "owner" ? t("settings.owner") : t("settings.cashier");

    const demoPanel = document.getElementById("settingsDemoPanel");
    if (demoPanel) demoPanel.style.display = role === "owner" ? "" : "none";

    // Staff Management: Cashier can view/select staff (including read-only incentive setup) but
    // cannot add/delete staff or modify incentive rules - so the menu item itself stays visible,
    // and Add/Edit/Deactivate/Save-incentive controls are hidden (not just disabled) inside the page.
    const navStaff = document.getElementById("navStaff");
    if (navStaff) navStaff.classList.remove("hidden");
  }

  /* ============================================================
     LOGIN / SESSION
     ============================================================ */
  function showLoginScreen() {
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("appRoot").style.display = "none";
  }
  function showAppScreen() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appRoot").style.display = "";
  }

  function setupLogin() {
    const form = document.getElementById("loginForm");
    const errorEl = document.getElementById("loginError");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const account = DEMO_ACCOUNTS.find((a) => a.username === username && a.password === password);
      if (!account) {
        errorEl.style.display = "block";
        return;
      }
      errorEl.style.display = "none";
      setSession({ username: account.username, role: account.role });
      setSettings({ role: account.role });
      form.reset();
      showAppScreen();
      fullRerender();
      goToPage("overview");
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      if (!confirm(t("login.confirmLogout"))) return;
      clearSession();
      document.getElementById("loginUsername").value = "";
      document.getElementById("loginPassword").value = "";
      showLoginScreen();
    });
  }

  /* ============================================================
     BAR CHART HELPER
     ============================================================ */
  function renderBarChart(containerId, data) {
    const max = Math.max(1, ...data.map((d) => d.value));
    const el = document.getElementById(containerId);
    el.innerHTML = data.map((d) => `
      <div class="bar-row">
        <span class="bar-label">${d.label}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${(d.value / max) * 100}%"></span></span>
        <span class="bar-value">${d.isMoney ? fmt(d.value) : d.value}</span>
      </div>
    `).join("");
  }

  /* ============================================================
     RENDER: DASHBOARD OVERVIEW
     ============================================================ */
  function renderOverview() {
    const txs = load(KEY_TRANSACTIONS, []);
    const records = load(KEY_RECORDS, []);
    const completed = txs.filter((tx) => tx.status === "Completed");
    const completedToday = completed.filter((tx) => isToday(tx.date));

    const todaySales = completedToday.reduce((s, tx) => s + revenueOf(tx), 0);
    const todayCustomerIds = new Set(txs.filter((tx) => isToday(tx.date)).map((tx) => tx.customerId));
    const servicesCompletedToday = completedToday.reduce((s, tx) => s + tx.services.length, 0);
    const incentiveMonth = records.filter((r) => isThisMonth(r.date)).reduce((s, r) => s + r.incentiveAmount, 0);

    // "Open / Pending Deals" = Open transactions in Transactions + any in-progress (non-blank) active deal tabs
    const openTxCount = txs.filter((tx) => tx.status === "Open").length;
    const liveActiveDeals = load(KEY_ACTIVE_DEALS, []);
    const pendingDealTabs = liveActiveDeals.filter((d) => d.customerName && d.services.some((r) => r.service)).length;
    const openPendingDeals = openTxCount + pendingDealTabs;

    const kpis = [
      { label: t("kpi.todaySales"), value: fmt(todaySales), gold: true },
      { label: t("kpi.todayCustomers"), value: todayCustomerIds.size },
      { label: t("kpi.servicesCompleted"), value: servicesCompletedToday },
      { label: t("kpi.openPendingDeals"), value: openPendingDeals },
      { label: t("kpi.totalIncentive"), value: fmt(incentiveMonth), gold: true }
    ];
    document.getElementById("kpiGrid").innerHTML = kpis.map((k) => `
      <div class="kpi-card ${k.gold ? "gold" : ""}">
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-value">${k.value}</div>
      </div>
    `).join("");

    // Today's Staff Activity - simple operational count, no financial detail
    const staffList = load(KEY_STAFF, SEED_STAFF).filter((s) => s.active);
    const activity = staffList.map((s) => {
      const count = completedToday.reduce((sum, tx) => sum + tx.services.filter((r) => r.staff === s.name).length, 0);
      return { name: s.name, count };
    }).sort((a, b) => b.count - a.count);

    document.getElementById("staffActivityList").innerHTML = activity.map((a) => `
      <div class="staff-activity-item ${a.count === 0 ? "zero" : ""}">
        <span class="name">${a.name}</span>
        <span class="count">${a.count} ${t("th.servicesCompleted")}</span>
      </div>
    `).join("") || `<div class="staff-activity-item"><span class="name">${t("common.none")}</span></div>`;

    // Recent transactions - latest 6 only, full analytics moved to Reports
    const recent = [...txs].sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time)).slice(0, 6);
    renderTransactionsTable("recentTransactionsTable", recent, false);
  }

  function renderReportsAnalytics() {
    // Kept as a no-op hook (chart rendering for the Reports page now lives inside
    // applyReportFilters so that Sales Trend / Popular Services react to the
    // selected date range and filters). Preserved for call-site compatibility.
  }

  /* ============================================================
     TRANSACTION TABLE RENDERER (shared: overview + transactions page)
     ============================================================ */
  function transactionRowHtml(tx, showActions) {
    const servicesHtml = tx.services && tx.services.length
      ? tx.services.map((r) => `${r.service} <span class="tx-row-staff">(${r.staff || t("common.any")})</span>`).join("<br>")
      : (tx.txType === "vip_purchase" ? t("vip.purchaseLabel") : tx.txType === "vip_topup" ? t("vip.topupLabel") : t("common.none"));
    // Both Open and Completed transactions can now be edited; Complete/Cancel remain Open-only actions.
    const canEdit = tx.status === "Open" || tx.status === "Completed";
    const canComplete = tx.status === "Open";
    const canCancel = tx.status === "Open";
    const wasEdited = tx.editHistory && tx.editHistory.length;
    return `
      <tr data-id="${tx.id}">
        <td>${tx.customerName}</td>
        <td>${tx.phone}</td>
        <td class="tx-services-cell">${servicesHtml}</td>
        <td><strong>${fmt(tx.grandTotal)}</strong></td>
        <td>${tx.payment || t("common.none")}</td>
        <td>${tx.date}<br><span class="tx-time">${tx.time || ""}</span></td>
        <td>
          <span class="badge ${statusBadgeClass(tx.status)}">${t("status." + tx.status)}</span>
          ${wasEdited ? `<span class="edited-badge" data-action="edit-history" data-id="${tx.id}">${t("audit.edited")}</span>` : ""}
        </td>
        ${showActions ? `<td>
          <div class="row-actions">
            <button class="icon-btn" data-action="view" data-id="${tx.id}">${t("actions.view")}</button>
            <button class="icon-btn" data-action="edit" data-id="${tx.id}" ${canEdit ? "" : "disabled"}>${t("actions.edit")}</button>
            <button class="icon-btn primary" data-action="complete" data-id="${tx.id}" ${canComplete ? "" : "disabled"}>${t("actions.complete")}</button>
            <button class="icon-btn" data-action="cancel" data-id="${tx.id}" ${canCancel ? "" : "disabled"}>${t("actions.cancel")}</button>
            <button class="icon-btn" data-action="print" data-id="${tx.id}">${t("actions.print")}</button>
          </div>
        </td>` : ""}
      </tr>
    `;
  }

  function renderTransactionsTable(tableId, list, showActions) {
    const table = document.getElementById(tableId);
    const headers = ["th.customer", "th.phone", "th.services", "th.total", "th.payment", "th.date", "th.status"];
    let headHtml = headers.map((h) => `<th>${t(h)}</th>`).join("");
    if (showActions) headHtml += `<th>${t("th.actions")}</th>`;
    table.querySelector("thead").innerHTML = `<tr>${headHtml}</tr>`;
    table.querySelector("tbody").innerHTML = list.map((tx) => transactionRowHtml(tx, showActions)).join("") ||
      `<tr><td colspan="${headers.length + (showActions ? 1 : 0)}" style="text-align:center;color:#B7ABA0;padding:24px;">—</td></tr>`;
    if (showActions) {
      table.querySelectorAll("[data-action]").forEach((btn) => {
        btn.addEventListener("click", () => handleTxAction(btn.dataset.action, btn.dataset.id));
      });
    }
  }

  /* ============================================================
     NEW DEAL PAGE — MULTIPLE ACTIVE CUSTOMER DEAL TABS
     ============================================================ */
  const KEY_ACTIVE_DEALS = "c039_active_deals";
  const KEY_ACTIVE_DEAL_CURRENT = "c039_active_deal_current";

  let dealRows = [];         // always a direct reference to the current active deal's `services` array
  let activeDeals = [];      // in-memory working copy of all active deal tabs
  let activeDealId = null;   // id of the tab currently shown in the form
  let dealBlankCounter = 1;  // next "New Customer N" label number

  function blankRow() {
    return { service: "", price: 0, qty: 1, staff: "", incentiveType: null, incentiveRate: 0, incentiveAmount: 0, incentiveConfigured: false };
  }

  function blankDeal(blankNum) {
    return {
      id: "AD-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      customerId: null, customerName: "", phone: "", source: "", notes: "",
      salesStaff: "",
      services: [blankRow()],
      discountType: "amount", discountValue: 0,
      payment: "Cash",
      blankNum
    };
  }

  function buildSeedActiveDeals() {
    // Row 1: Sophea Ros (existing customer CUS-001) - one staffed service
    const dealSophea = {
      id: "AD-seed-1",
      customerId: "CUS-001", customerName: "Sophea Ros", phone: "012 111 222", source: "Walk-in", notes: "",
      services: [
        { service: "Hair Cut & Styling", category: "Hair Styling", price: 8, qty: 1, staff: "Sokha", incentiveType: "percent", incentiveRate: 0, incentiveAmount: 0, incentiveConfigured: false }
      ],
      discountType: "amount", discountValue: 0,
      payment: "Cash"
    };
    dealSophea.services.forEach((r) => {
      const inc = computeIncentiveForRow(r.staff, r.service, r.price, r.qty);
      r.incentiveType = inc.type; r.incentiveRate = inc.rate; r.incentiveAmount = inc.amount; r.incentiveConfigured = inc.configured;
    });

    // Row 2: Dara Chenda (new / not-yet-registered customer) - two services, one deliberately unstaffed
    const dealDara = {
      id: "AD-seed-2",
      customerId: null, customerName: "Dara Chenda", phone: "012 777 888", source: "Facebook", notes: "",
      services: [
        { service: "Nail Gel", category: "Nail Care", price: 18, qty: 1, staff: "Sreyneang", incentiveType: "percent", incentiveRate: 0, incentiveAmount: 0, incentiveConfigured: false },
        { service: "Facial", category: "Facial", price: 25, qty: 1, staff: "", incentiveType: "percent", incentiveRate: 0, incentiveAmount: 0, incentiveConfigured: false }
      ],
      discountType: "amount", discountValue: 0,
      payment: "Cash"
    };
    dealDara.services.forEach((r) => {
      if (!r.staff) return;
      const inc = computeIncentiveForRow(r.staff, r.service, r.price, r.qty);
      r.incentiveType = inc.type; r.incentiveRate = inc.rate; r.incentiveAmount = inc.amount; r.incentiveConfigured = inc.configured;
    });

    // Row 3: blank "New Customer 3" tab
    const dealBlank = blankDeal(3);

    return [dealSophea, dealDara, dealBlank];
  }

  function loadActiveDeals() {
    activeDeals = load(KEY_ACTIVE_DEALS, null);
    if (!activeDeals || !activeDeals.length) {
      activeDeals = buildSeedActiveDeals();
      saveActiveDeals();
    }
    activeDealId = load(KEY_ACTIVE_DEAL_CURRENT, null);
    if (!activeDeals.some((d) => d.id === activeDealId)) activeDealId = activeDeals[0].id;
    dealBlankCounter = activeDeals.reduce((max, d) => Math.max(max, d.blankNum || 0), 0) + 1;
  }

  function saveActiveDeals() {
    save(KEY_ACTIVE_DEALS, activeDeals);
    save(KEY_ACTIVE_DEAL_CURRENT, activeDealId);
  }

  function getActiveDeal() { return activeDeals.find((d) => d.id === activeDealId); }

  function dealTabLabel(deal) {
    if (deal.customerName && deal.customerName.trim()) return deal.customerName.trim();
    const n = deal.blankNum || 1;
    return getSettings().lang === "km" ? `អតិថិជនថ្មី ${n}` : `New Customer ${n}`;
  }

  function fmtCompact(n) {
    const v = Number(n) || 0;
    return "$" + (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2));
  }

  function dealSubtotalOf(deal) {
    return deal.services.reduce((sum, r) => sum + computeLineTotal(r), 0);
  }

  function renderDealTabs() {
    const bar = document.getElementById("dealTabsScroll");
    const countEl = document.getElementById("dealTabsCount");
    if (!bar || !countEl) return;
    countEl.textContent = activeDeals.length + " " + (getSettings().lang === "km" ? "ព្រមកិច្ចការសកម្ម" : (activeDeals.length === 1 ? "Active Deal" : "Active Deals"));

    bar.innerHTML = activeDeals.map((deal) => {
      const sub = dealSubtotalOf(deal);
      return `
        <div class="deal-tab ${deal.id === activeDealId ? "active" : ""}" data-id="${deal.id}">
          <span class="deal-tab-status">${t("status.Open")}</span>
          <span class="deal-tab-name">${dealTabLabel(deal)}</span>
          ${sub > 0 ? `<span class="deal-tab-sub">${fmtCompact(sub)}</span>` : ""}
          <button type="button" class="deal-tab-close" data-id="${deal.id}" title="${getSettings().lang === "km" ? "លុបចេញ" : "Discard"}">×</button>
        </div>
      `;
    }).join("");

    bar.querySelectorAll(".deal-tab").forEach((tabEl) => {
      tabEl.addEventListener("click", (e) => {
        if (e.target.closest(".deal-tab-close")) return;
        switchToDeal(tabEl.dataset.id);
      });
    });
    bar.querySelectorAll(".deal-tab-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        discardDeal(btn.dataset.id);
      });
    });
  }

  function switchToDeal(id) {
    if (id === activeDealId) return;
    activeDealId = id;
    saveActiveDeals();
    loadFormFromDeal(getActiveDeal());
    renderDealTabs();
  }

  function discardDeal(id) {
    const deal = activeDeals.find((d) => d.id === id);
    if (!deal) return;
    const hasData = (deal.customerName && deal.customerName.trim()) || (deal.phone && deal.phone.trim()) || deal.services.some((r) => r.service);
    if (hasData) {
      const msg = getSettings().lang === "km" ? "លុបចេញកិច្ចការនេះ? ទិន្នន័យមិនទាន់រក្សាទុកនឹងបាត់។" : "Discard this active deal? Unsaved data will be lost.";
      if (!confirm(msg)) return;
    }
    activeDeals = activeDeals.filter((d) => d.id !== id);
    if (!activeDeals.length) activeDeals.push(blankDeal(dealBlankCounter++));
    if (activeDealId === id) activeDealId = activeDeals[0].id;
    saveActiveDeals();
    loadFormFromDeal(getActiveDeal());
    renderDealTabs();
  }

  function addNewDealTab() {
    const deal = blankDeal(dealBlankCounter++);
    activeDeals.push(deal);
    activeDealId = deal.id;
    saveActiveDeals();
    loadFormFromDeal(deal);
    renderDealTabs();
  }

  function renderSalesStaffOptions() {
    const sel = document.getElementById("dSalesStaff");
    if (!sel) return;
    const staff = load(KEY_STAFF, SEED_STAFF).filter((s) => s.active && (s.type === "sales" || s.type === "both"));
    const current = sel.value;
    sel.innerHTML = `<option value="">—</option>` + staff.map((s) => `<option value="${s.name}">${s.name}</option>`).join("");
    sel.value = current;
  }

  // Payment options a Cashier/Owner may manually pick from (Cash/ABA/ACLEDA/Credit Card/Other).
  // "VIP Balance" is an ADDITIONAL choice offered on top of these whenever the selected customer
  // is an active VIP/package customer with a balance - it is never forced. See updateVipBalanceUI().
  const MANUAL_PAYMENT_OPTIONS = ["Cash", "ABA", "ACLEDA", "Credit Card", "Other"];
  function manualPaymentOptionsHtml(selected) {
    return MANUAL_PAYMENT_OPTIONS.map((p) => `<option value="${p}" ${p === selected ? "selected" : ""}>${p}</option>`).join("");
  }
  function vipPaymentOptionsHtml(selected) {
    return `<option value="VIP Balance" ${selected === "VIP Balance" ? "selected" : ""}>${t("vip.paymentLocked")}</option>` + manualPaymentOptionsHtml(selected);
  }

  // Reflects the active deal's customer VIP balance in the New Deal totals area. NEW RULE: VIP
  // customers are never forced to pay from their balance - "VIP Package Balance" is offered as an
  // extra option alongside Cash/ABA/ACLEDA/Credit Card/Other, and the cashier/owner freely chooses
  // per transaction. Deduction/split only happens if "VIP Package Balance" is the option actually
  // selected; choosing any other method leaves the VIP balance untouched. Never lets VIP balance
  // go negative (deduction is capped downstream in completeActiveDeal()).
  function updateVipBalanceUI() {
    const deal = getActiveDeal();
    const bannerRow = document.getElementById("dealVipBalanceLine");
    const bannerVal = document.getElementById("dealVipBalance");
    const fieldWrap = document.getElementById("dVipBalanceFieldWrap");
    const readout = document.getElementById("dVipBalanceReadout");
    const remainingRow = document.getElementById("dRemainingPaymentRow");
    const splitLine = document.getElementById("dealVipSplitLine");
    const splitVal = document.getElementById("dealVipRemaining");
    const paymentSelect = document.getElementById("dPayment");
    if (!bannerRow) return { vipAvailable: 0, cust: null };

    let cust = null;
    if (deal && deal.customerId) cust = load(KEY_CUSTOMERS, []).find((c) => c.id === deal.customerId);
    const isVip = !!(cust && cust.type === "vip");
    const vipAvailable = isVip ? (cust.vipBalance || 0) : 0;
    const vipOfferable = isVip && vipAvailable > 0;

    bannerRow.style.display = isVip ? "" : "none";
    bannerVal.textContent = fmt(vipAvailable);
    if (fieldWrap) fieldWrap.style.display = isVip ? "" : "none";
    if (readout) readout.value = isVip ? fmt(vipAvailable) : "";

    const grandTotal = parseFloat((document.getElementById("dealGrandTotal").textContent || "$0").replace(/[^0-9.]/g, "")) || 0;

    // Only rebuild the <select> options when the available option SET changes (VIP-offerable vs
    // manual-only) - never on every keystroke/recalc, so an already-made manual choice (e.g. the
    // cashier picked "Cash" for a VIP customer) is preserved instead of being reset each time.
    const desiredMode = vipOfferable ? "vip" : "manual";
    if (paymentSelect && paymentSelect.dataset.mode !== desiredMode) {
      const pending = paymentSelect.dataset.pendingValue || paymentSelect.value;
      paymentSelect.dataset.mode = desiredMode;
      paymentSelect.disabled = false;
      if (desiredMode === "vip") {
        paymentSelect.innerHTML = vipPaymentOptionsHtml(["VIP Balance", ...MANUAL_PAYMENT_OPTIONS].includes(pending) ? pending : "VIP Balance");
      } else {
        paymentSelect.innerHTML = manualPaymentOptionsHtml(MANUAL_PAYMENT_OPTIONS.includes(pending) ? pending : "Cash");
      }
      delete paymentSelect.dataset.pendingValue;
    }

    const usingVip = vipOfferable && paymentSelect && paymentSelect.value === "VIP Balance";
    if (usingVip) {
      if (vipAvailable >= grandTotal) {
        remainingRow.style.display = "none";
        splitLine.style.display = "none";
      } else {
        remainingRow.style.display = "";
        splitLine.style.display = "";
        splitVal.textContent = fmt(Math.max(0, grandTotal - vipAvailable));
      }
    } else {
      remainingRow.style.display = "none";
      splitLine.style.display = "none";
    }
    return { vipAvailable, cust };
  }

  function loadFormFromDeal(deal) {
    if (!deal) return;
    document.getElementById("dCustName").value = deal.customerName || "";
    document.getElementById("dPhone").value = deal.phone || "";
    document.getElementById("dSource").value = deal.source || "";
    document.getElementById("dNotes").value = deal.notes || "";
    document.getElementById("dDiscountType").value = deal.discountType || "amount";
    document.getElementById("dDiscount").value = deal.discountValue || 0;
    // Force updateVipBalanceUI() (called via recalcDealTotals() below) to rebuild the Payment
    // Method options fresh for this specific deal tab, preferring whatever payment value was
    // saved on it (which may be "VIP Balance" or a manual method).
    const paymentSelect = document.getElementById("dPayment");
    paymentSelect.dataset.mode = "";
    paymentSelect.dataset.pendingValue = deal.payment || "Cash";
    renderSalesStaffOptions();
    document.getElementById("dSalesStaff").value = deal.salesStaff || "";
    dealRows = deal.services;

    hideSuggestions();
    if (deal.customerId) {
      const cust = load(KEY_CUSTOMERS, []).find((c) => c.id === deal.customerId);
      if (cust) showHistoryBadge(cust); else hideHistoryBadge();
    } else {
      hideHistoryBadge();
    }

    renderDealRows();
    recalcDealTotals();
  }

  function syncFormIntoActiveDeal() {
    const deal = getActiveDeal();
    if (!deal) return;
    deal.customerName = document.getElementById("dCustName").value;
    deal.phone = document.getElementById("dPhone").value;
    deal.source = document.getElementById("dSource").value;
    deal.notes = document.getElementById("dNotes").value;
    deal.discountType = document.getElementById("dDiscountType").value;
    deal.discountValue = parseFloat(document.getElementById("dDiscount").value) || 0;
    deal.payment = document.getElementById("dPayment").value;
    deal.salesStaff = document.getElementById("dSalesStaff").value;
    // deal.services already reflects live edits since dealRows is the same array reference
    saveActiveDeals();
    renderDealTabs();
  }

  function renderNewDealPage() {
    loadActiveDeals();
    loadFormFromDeal(getActiveDeal());
    renderDealTabs();
  }

  function renderDealRows() {
    const services = load(KEY_SERVICES, SEED_SERVICES);
    const staff = load(KEY_STAFF, SEED_STAFF).filter((s) => s.active);
    const wrap = document.getElementById("dealServiceRows");

    wrap.innerHTML = dealRows.map((r, idx) => `
      <div class="deal-row" data-idx="${idx}">
        <select class="deal-service-select">
          <option value="">—</option>
          ${services.map((s) => `<option value="${s.name}" ${s.name === r.service ? "selected" : ""}>${s.name}</option>`).join("")}
        </select>
        <input type="number" class="deal-price-input" min="0" step="0.5" value="${r.price}">
        <input type="number" class="deal-qty-input" min="1" step="1" value="${r.qty}">
        <select class="deal-staff-select">
          <option value="">${t("common.any")}</option>
          ${staff.map((s) => `<option value="${s.name}" ${s.name === r.staff ? "selected" : ""}>${s.name}</option>`).join("")}
        </select>
        <button type="button" class="deal-row-remove" data-idx="${idx}" title="${t("deal.removeRow")}">×</button>
      </div>
    `).join("");

    wrap.querySelectorAll(".deal-row").forEach((rowEl) => {
      const idx = parseInt(rowEl.dataset.idx, 10);
      const serviceSel = rowEl.querySelector(".deal-service-select");
      const priceInput = rowEl.querySelector(".deal-price-input");
      const qtyInput = rowEl.querySelector(".deal-qty-input");
      const staffSel = rowEl.querySelector(".deal-staff-select");

      serviceSel.addEventListener("change", () => {
        dealRows[idx].service = serviceSel.value;
        dealRows[idx].price = priceOf(serviceSel.value);
        priceInput.value = dealRows[idx].price;
        autoSuggestIncentive(idx);
        recalcDealTotals();
      });
      priceInput.addEventListener("input", () => { dealRows[idx].price = parseFloat(priceInput.value) || 0; autoSuggestIncentive(idx); recalcDealTotals(); });
      qtyInput.addEventListener("input", () => { dealRows[idx].qty = parseInt(qtyInput.value, 10) || 1; autoSuggestIncentive(idx); recalcDealTotals(); });
      staffSel.addEventListener("change", () => { dealRows[idx].staff = staffSel.value; autoSuggestIncentive(idx); recalcDealTotals(); });
    });

    wrap.querySelectorAll(".deal-row-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (dealRows.length <= 1) { dealRows = [blankRow()]; } else { dealRows.splice(parseInt(btn.dataset.idx, 10), 1); }
        renderDealRows();
        recalcDealTotals();
      });
    });
  }

  // Staff Incentive is always read-only in New Deal: the source of truth is
  // Staff Management -> Incentive Setup. Owner/Cashier cannot type in a rate or amount here.
  function incentiveDisplayHtml(r) {
    if (!r.service || !r.staff) return `<span class="incentive-readout incentive-none">—</span>`;
    if (!r.incentiveConfigured) return `<span class="incentive-readout incentive-none">${t("deal.noIncentiveConfigured")}</span>`;
    const label = r.incentiveType === "percent" ? `${r.incentiveRate}% = ${fmt(r.incentiveAmount)}` : fmt(r.incentiveAmount);
    return `<span class="incentive-readout incentive-value">${t("deal.staffIncentive")}: ${label}</span>`;
  }

  function autoSuggestIncentive(idx) {
    const r = dealRows[idx];
    if (!r.service || !r.staff) {
      r.incentiveType = null; r.incentiveRate = 0; r.incentiveAmount = 0; r.incentiveConfigured = false;
      renderDealRows();
      return;
    }
    const calc = computeIncentiveForRow(r.staff, r.service, r.price, r.qty);
    r.incentiveType = calc.type;
    r.incentiveRate = calc.rate;
    r.incentiveAmount = calc.amount;
    r.incentiveConfigured = calc.configured;
    renderDealRows();
  }


  function computeDiscountAmount(subtotal, discountType, discountValue) {
    if (discountType === "percent") return +(subtotal * (discountValue / 100)).toFixed(2);
    return +discountValue.toFixed(2);
  }

  function recalcDealTotals() {
    const subtotal = dealRows.reduce((sum, r) => sum + computeLineTotal(r), 0);
    const discountType = document.getElementById("dDiscountType").value;
    const discountValue = parseFloat(document.getElementById("dDiscount").value) || 0;
    const discountAmount = computeDiscountAmount(subtotal, discountType, discountValue);
    const grandTotal = Math.max(0, subtotal - discountAmount);
    document.getElementById("dealSubtotal").textContent = fmt(subtotal);
    document.getElementById("dealDiscountLine").textContent = "-" + fmt(discountAmount) + (discountType === "percent" && discountValue ? ` (${discountValue}%)` : "");
    document.getElementById("dealGrandTotal").textContent = fmt(grandTotal);
    updateVipBalanceUI();
    syncFormIntoActiveDeal();
  }

  /* ============================================================
     CUSTOMER LOOKUP / AUTOCOMPLETE / HISTORY BADGE
     ============================================================ */
  let selectedHistoryCustomer = null;

  function customerStats(cust) {
    const txs = load(KEY_TRANSACTIONS, []).filter((tx) => tx.customerId === cust.id);
    const completed = txs.filter((tx) => tx.status === "Completed");
    const lastVisit = txs.reduce((max, tx) => (tx.date > max ? tx.date : max), "");
    const totalSpending = completed.reduce((sum, tx) => sum + tx.grandTotal, 0);
    const svcCount = {};
    completed.forEach((tx) => tx.services.forEach((r) => { svcCount[r.service] = (svcCount[r.service] || 0) + 1; }));
    const preferred = Object.entries(svcCount).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([name]) => name);
    return { visitCount: txs.length, lastVisit, totalSpending, preferred };
  }

  function visitedLabel(n) {
    return getSettings().lang === "km" ? `មកលេង ${n} ដង` : `Visited ${n} times`;
  }
  function lastVisitLabel(date) {
    return (getSettings().lang === "km" ? "ថ្ងៃមកលើកចុងក្រោយ: " : "Last visit: ") + (date || t("common.none"));
  }
  function spendingLabel(amount) {
    return (getSettings().lang === "km" ? "ចំណាយសរុប " : "Total spent ") + fmt(amount);
  }
  function preferredLabel(list) {
    if (!list.length) return "";
    return (getSettings().lang === "km" ? "សេវាកម្មពេញចិត្ត: " : "Prefers: ") + list.join(", ");
  }

  function showHistoryBadge(cust) {
    selectedHistoryCustomer = cust;
    const stats = customerStats(cust);
    document.getElementById("chbVisits").textContent = visitedLabel(stats.visitCount);
    document.getElementById("chbLastVisit").textContent = lastVisitLabel(stats.lastVisit);
    document.getElementById("chbSpending").textContent = spendingLabel(stats.totalSpending);
    document.getElementById("chbPreferred").textContent = preferredLabel(stats.preferred);
    document.getElementById("customerHistoryBadge").style.display = "flex";
  }

  function hideHistoryBadge() {
    selectedHistoryCustomer = null;
    const badge = document.getElementById("customerHistoryBadge");
    if (badge) badge.style.display = "none";
  }

  function hideSuggestions() {
    const nameEl = document.getElementById("nameSuggest");
    const phoneEl = document.getElementById("phoneSuggest");
    if (nameEl) nameEl.classList.remove("show");
    if (phoneEl) phoneEl.classList.remove("show");
  }

  function selectCustomerIntoForm(cust) {
    document.getElementById("dCustName").value = cust.name;
    document.getElementById("dPhone").value = cust.phone;
    document.getElementById("dSource").value = cust.source || "";
    document.getElementById("dNotes").value = cust.notes || "";
    showHistoryBadge(cust);
    hideSuggestions();
    const deal = getActiveDeal();
    if (deal) deal.customerId = cust.id;
    syncFormIntoActiveDeal();
    recalcDealTotals();
  }

  function renderSuggestions(containerId, matches) {
    const el = document.getElementById(containerId);
    if (!matches.length) {
      el.innerHTML = `<div class="suggest-empty">${getSettings().lang === "km" ? "រកមិនឃើញអតិថិជន" : "No matching customer"}</div>`;
      el.classList.add("show");
      return;
    }
    el.innerHTML = matches.slice(0, 6).map((c) => `
      <div class="suggest-item" data-id="${c.id}">
        <span class="suggest-name">${c.name}</span>
        <span class="suggest-meta">${c.phone}${c.source ? " · " + c.source : ""}</span>
      </div>
    `).join("");
    el.classList.add("show");
    el.querySelectorAll(".suggest-item").forEach((item) => {
      item.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const cust = load(KEY_CUSTOMERS, []).find((c) => c.id === item.dataset.id);
        if (cust) selectCustomerIntoForm(cust);
      });
    });
  }

  function setupCustomerAutocomplete() {
    const nameInput = document.getElementById("dCustName");
    const phoneInput = document.getElementById("dPhone");
    if (!nameInput || !phoneInput) return;

    nameInput.addEventListener("input", () => {
      hideHistoryBadge();
      const deal = getActiveDeal();
      if (deal) deal.customerId = null;
      syncFormIntoActiveDeal();
      updateVipBalanceUI();
      const q = nameInput.value.trim().toLowerCase();
      if (q.length < 2) { hideSuggestions(); return; }
      const matches = load(KEY_CUSTOMERS, []).filter((c) => c.name.toLowerCase().includes(q));
      renderSuggestions("nameSuggest", matches);
    });
    nameInput.addEventListener("focus", () => {
      const q = nameInput.value.trim().toLowerCase();
      if (q.length >= 2) {
        const matches = load(KEY_CUSTOMERS, []).filter((c) => c.name.toLowerCase().includes(q));
        renderSuggestions("nameSuggest", matches);
      }
    });

    phoneInput.addEventListener("input", () => {
      hideHistoryBadge();
      const deal = getActiveDeal();
      if (deal) deal.customerId = null;
      syncFormIntoActiveDeal();
      updateVipBalanceUI();
      const q = phoneInput.value.replace(/\s+/g, "");
      if (q.length < 2) { hideSuggestions(); return; }
      const matches = load(KEY_CUSTOMERS, []).filter((c) => c.phone.replace(/\s+/g, "").includes(q));
      renderSuggestions("phoneSuggest", matches);
    });
    phoneInput.addEventListener("focus", () => {
      const q = phoneInput.value.replace(/\s+/g, "");
      if (q.length >= 2) {
        const matches = load(KEY_CUSTOMERS, []).filter((c) => c.phone.replace(/\s+/g, "").includes(q));
        renderSuggestions("phoneSuggest", matches);
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".autocomplete-field")) hideSuggestions();
    });

    const clearBtn = document.getElementById("chbClear");
    if (clearBtn) clearBtn.addEventListener("click", () => {
      const deal = getActiveDeal();
      if (deal) deal.customerId = null;
      hideHistoryBadge();
      syncFormIntoActiveDeal();
      updateVipBalanceUI();
    });
  }

  function findOrCreateCustomer(name, phone, source, notes) {
    const customers = load(KEY_CUSTOMERS, []);
    let cust = customers.find((c) => c.phone === phone.trim());
    if (cust) {
      cust.name = name.trim();
      if (source) cust.source = source;
    } else {
      const nextNum = customers.reduce((max, c) => {
        const m = /CUS-(\d+)/.exec(c.id || "");
        return m ? Math.max(max, parseInt(m[1], 10)) : max;
      }, 0) + 1;
      cust = { id: "CUS-" + String(nextNum).padStart(3, "0"), name: name.trim(), phone: phone.trim(), source: source || "", notes: notes || "" };
      customers.push(cust);
    }
    save(KEY_CUSTOMERS, customers);
    return cust;
  }

  function requestCompleteActiveDeal() {
    const deal = getActiveDeal();
    if (!deal) return;
    const name = (document.getElementById("dCustName").value || "").trim();
    const phone = (document.getElementById("dPhone").value || "").trim();
    if (!name || !phone) {
      showToast(getSettings().lang === "km" ? "សូមបញ្ចូលឈ្មោះ និងលេខទូរស័ព្ទ" : "Please enter customer name and phone", "error");
      return;
    }
    const validRows = dealRows.filter((r) => r.service);
    if (!validRows.length) { showToast(t("toast.needOneService"), "error"); return; }
    if (!validRows.every((r) => r.staff)) { showToast(t("toast.needStaffToComplete"), "error"); return; }

    const subtotal = validRows.reduce((sum, r) => sum + computeLineTotal(r), 0);
    const discountType = document.getElementById("dDiscountType").value;
    const discountValue = parseFloat(document.getElementById("dDiscount").value) || 0;
    const discountAmount = computeDiscountAmount(subtotal, discountType, discountValue);
    const grandTotal = Math.max(0, subtotal - discountAmount);
    const totalIncentive = validRows.reduce((sum, r) => sum + (r.incentiveAmount || 0), 0);

    const payment = document.getElementById("dPayment").value;
    const existingCust = load(KEY_CUSTOMERS, []).find((c) => c.phone === phone);
    const vipAvailable = (existingCust && existingCust.type === "vip") ? (existingCust.vipBalance || 0) : 0;
    let vipLineHtml = "";
    if (payment === "VIP Balance") {
      if (vipAvailable >= grandTotal) {
        vipLineHtml = `<div class="detail-row"><strong>${t("vip.used")}</strong><span>${fmt(grandTotal)}</span></div>`;
      } else {
        const remaining = +(grandTotal - vipAvailable).toFixed(2);
        const remainingMethod = document.getElementById("dRemainingPayment").value;
        vipLineHtml = `
          <div class="detail-row"><strong>${t("vip.used")}</strong><span>${fmt(vipAvailable)}</span></div>
          <div class="detail-row"><strong>${t("vip.remainingToPay")}</strong><span>${fmt(remaining)} (${remainingMethod})</span></div>
        `;
      }
    }

    document.getElementById("modalTitle").textContent = t("deal.confirmTitle");
    document.getElementById("modalBody").innerHTML = `
      <div class="detail-row"><strong>${t("th.customer")}</strong><span>${name}</span></div>
      <div class="detail-row"><strong>${t("deal.services")}</strong><span>${validRows.length}</span></div>
      <div class="detail-row"><strong>${t("deal.grandTotal")}</strong><span><strong>${fmt(grandTotal)}</strong></span></div>
      ${vipLineHtml}
      <div class="detail-row"><strong>${t("deal.totalIncentive")}</strong><span>${fmt(totalIncentive)}</span></div>
      <p class="confirm-note">${t("deal.confirmNote")}</p>
      <div class="modal-actions">
        <button class="btn-outline-mini" id="dealConfirmCancel">${getSettings().lang === "km" ? "ត្រឡប់វិញ" : "Back"}</button>
        <button class="btn-primary" id="dealConfirmOk">${t("deal.confirmOk")}</button>
      </div>
    `;
    openModal();
    document.getElementById("dealConfirmCancel").addEventListener("click", closeModal);
    document.getElementById("dealConfirmOk").addEventListener("click", () => {
      closeModal();
      completeActiveDeal(validRows, { subtotal, discountType, discountValue, discountAmount, grandTotal, totalIncentive });
    });
  }

  function completeActiveDeal(validRows, totals) {
    const deal = getActiveDeal();
    if (!deal) return;
    const name = document.getElementById("dCustName").value.trim();
    const phone = document.getElementById("dPhone").value.trim();
    const source = document.getElementById("dSource").value;
    const notes = document.getElementById("dNotes").value.trim();
    const payment = document.getElementById("dPayment").value;
    const salesStaff = document.getElementById("dSalesStaff").value;
    const cust = findOrCreateCustomer(name, phone, source, notes);

    // VIP Balance deduction (never allow the balance to go negative; split remainder to another method)
    let vipDeduction = 0;
    let finalPaymentLabel = payment;
    let remainingPaymentMethod = "";
    let remainingAmount = 0;
    if (payment === "VIP Balance" && cust.type === "vip") {
      const vipAvailable = cust.vipBalance || 0;
      vipDeduction = Math.min(vipAvailable, totals.grandTotal);
      cust.vipBalance = +Math.max(0, vipAvailable - vipDeduction).toFixed(2);
      if (vipDeduction < totals.grandTotal) {
        remainingPaymentMethod = document.getElementById("dRemainingPayment").value;
        remainingAmount = +(totals.grandTotal - vipDeduction).toFixed(2);
        finalPaymentLabel = "VIP Balance + " + remainingPaymentMethod;
      }
      const customers = load(KEY_CUSTOMERS, []);
      const idx = customers.findIndex((c) => c.id === cust.id);
      if (idx >= 0) { customers[idx] = cust; save(KEY_CUSTOMERS, customers); }
    }

    const transactions = load(KEY_TRANSACTIONS, []);
    let id = deal.id;
    if (!/^TX-/.test(id)) {
      const nextNum = transactions.reduce((max, tx) => {
        const m = /TX-(\d+)/.exec(tx.id || "");
        return m ? Math.max(max, parseInt(m[1], 10)) : max;
      }, 0) + 1;
      id = "TX-" + String(nextNum).padStart(3, "0");
    }

    const tx = {
      id, customerId: cust.id, customerName: cust.name, phone: cust.phone, source: source || cust.source,
      notes, date: new Date().toISOString().split("T")[0], time: new Date().toTimeString().slice(0, 5),
      payment: finalPaymentLabel, remainingPaymentMethod, remainingAmount,
      discountType: totals.discountType, discountValue: totals.discountValue, discount: +totals.discountAmount.toFixed(2),
      subtotal: +totals.subtotal.toFixed(2), grandTotal: +totals.grandTotal.toFixed(2), totalIncentive: +totals.totalIncentive.toFixed(2),
      status: "Completed",
      txType: "service",
      salesStaff, salesIncentiveAmount: 0, vipDeduction: +vipDeduction.toFixed(2),
      services: validRows.map((r) => ({ ...r })),
      editHistory: [],
      createdAt: new Date().toISOString()
    };

    const i = transactions.findIndex((t) => t.id === id);
    if (i >= 0) transactions[i] = tx; else transactions.push(tx);
    save(KEY_TRANSACTIONS, transactions);
    generateIncentiveRecordsForTransaction(tx);

    // remove this tab and advance to the next active deal (or start a fresh one)
    activeDeals = activeDeals.filter((d) => d.id !== deal.id);
    if (!activeDeals.length) activeDeals.push(blankDeal(dealBlankCounter++));
    activeDealId = activeDeals[0].id;
    saveActiveDeals();

    showToast(t("toast.dealSaved"), "success");
    hideHistoryBadge();
    loadFormFromDeal(getActiveDeal());
    renderDealTabs();
  }

  function generateIncentiveRecordsForTransaction(tx) {
    const records = load(KEY_RECORDS, []);
    if (records.some((r) => r.transactionId === tx.id)) return; // avoid duplicates
    let n = records.reduce((max, r) => {
      const m = /INC-(\d+)/.exec(r.id || "");
      return m ? Math.max(max, parseInt(m[1], 10)) : max;
    }, 0);
    tx.services.forEach((r, idx) => {
      if (!r.staff) return;
      n++;
      records.push({
        id: "INC-" + String(n).padStart(3, "0"),
        transactionId: tx.id, rowIndex: idx,
        date: tx.date, customer: tx.customerName, phone: tx.phone,
        service: r.service, price: r.price, qty: r.qty, staff: r.staff,
        incentiveType: r.incentiveType, incentiveRate: r.incentiveRate, incentiveAmount: r.incentiveAmount,
        incentiveCategory: "service",
        status: "Confirmed"
      });
    });
    // Sales Incentive - separate from Service Incentive, only for the staff who closed the sale
    if (tx.salesStaff && tx.salesIncentiveAmount) {
      n++;
      records.push({
        id: "INC-" + String(n).padStart(3, "0"),
        transactionId: tx.id, rowIndex: -1,
        date: tx.date, customer: tx.customerName, phone: tx.phone,
        service: tx.txType === "vip_topup" ? "VIP Top-Up" : (tx.txType === "vip_purchase" ? "VIP Package Purchase" : "Sale"),
        price: tx.grandTotal, qty: 1, staff: tx.salesStaff,
        incentiveType: "sale", incentiveRate: 0, incentiveAmount: tx.salesIncentiveAmount,
        incentiveCategory: "sales",
        status: "Confirmed"
      });
    }
    save(KEY_RECORDS, records);
  }

  /* ============================================================
     TRANSACTIONS PAGE
     ============================================================ */
  function populateTxFilterOptions() {
    const staff = load(KEY_STAFF, SEED_STAFF);
    const services = load(KEY_SERVICES, SEED_SERVICES);

    document.getElementById("filterTxStaff").innerHTML = `<option value="">${t("filters.all")} - ${t("th.staff")}</option>` +
      staff.map((s) => `<option value="${s.name}">${s.name}</option>`).join("");
    document.getElementById("filterTxService").innerHTML = `<option value="">${t("filters.all")} - ${t("deal.colService")}</option>` +
      services.map((s) => `<option value="${s.name}">${s.name}</option>`).join("");
    document.getElementById("filterTxStatus").innerHTML = `<option value="">${t("filters.all")} - ${t("th.status")}</option>` +
      ["Open", "Completed", "Cancelled"].map((s) => `<option value="${s}">${t("status." + s)}</option>`).join("");
    document.getElementById("filterTxPayment").innerHTML = `<option value="">${t("filters.all")} - ${t("th.payment")}</option>` +
      ["Cash", "ABA", "ACLEDA", "Credit Card", "VIP Balance", "Other"].map((p) => `<option value="${p}">${p}</option>`).join("");
  }

  function renderTransactionsPage() {
    populateTxFilterOptions();
    applyTxFilters();
  }

  function applyTxFilters() {
    let txs = load(KEY_TRANSACTIONS, []);
    const searchEl = document.getElementById("txSearch");
    const search = searchEl ? searchEl.value.trim().toLowerCase() : "";
    const date = document.getElementById("filterTxDate").value;
    const staff = document.getElementById("filterTxStaff").value;
    const service = document.getElementById("filterTxService").value;
    const status = document.getElementById("filterTxStatus").value;
    const payment = document.getElementById("filterTxPayment").value;

    // Search matches partial/full customer name OR partial/full phone number, works alongside
    // all other filters (date/staff/service/status/payment) rather than replacing them.
    if (search) {
      const searchDigits = search.replace(/\D/g, "");
      txs = txs.filter((tx) => {
        const nameMatch = (tx.customerName || "").toLowerCase().includes(search);
        const phoneDigits = (tx.phone || "").replace(/\D/g, "");
        const phoneMatch = searchDigits && phoneDigits.includes(searchDigits);
        return nameMatch || phoneMatch;
      });
    }
    if (date) txs = txs.filter((tx) => tx.date === date);
    if (staff) txs = txs.filter((tx) => tx.services.some((r) => r.staff === staff));
    if (service) txs = txs.filter((tx) => tx.services.some((r) => r.service === service));
    if (status) txs = txs.filter((tx) => tx.status === status);
    if (payment) txs = txs.filter((tx) => tx.payment === payment);

    txs.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
    renderTransactionsTable("transactionsTable", txs, true);
  }

  function setupTxFilters() {
    const searchEl = document.getElementById("txSearch");
    if (searchEl) searchEl.addEventListener("input", applyTxFilters);
    ["filterTxDate", "filterTxStaff", "filterTxService", "filterTxStatus", "filterTxPayment"].forEach((id) => {
      document.getElementById(id).addEventListener("change", applyTxFilters);
    });
    document.getElementById("clearTxFilters").addEventListener("click", () => {
      if (searchEl) searchEl.value = "";
      ["filterTxDate", "filterTxStaff", "filterTxService", "filterTxStatus", "filterTxPayment"].forEach((id) => { document.getElementById(id).value = ""; });
      applyTxFilters();
    });
  }

  function handleTxAction(action, id) {
    const txs = load(KEY_TRANSACTIONS, []);
    const tx = txs.find((t) => t.id === id);
    if (!tx) return;
    if (action === "view") openTxViewModal(tx);
    if (action === "edit") {
      if (tx.status === "Open") openTxForEdit(tx);
      else if (tx.status === "Completed") openEditCompletedTxModal(tx);
    }
    if (action === "complete") completeTransaction(tx.id);
    if (action === "cancel") cancelTransaction(tx.id);
    if (action === "print") printReceipt(tx);
    if (action === "edit-history") openEditHistoryModal(tx);
  }

  function completeTransaction(id) {
    const txs = load(KEY_TRANSACTIONS, []);
    const tx = txs.find((t) => t.id === id);
    if (!tx) return;
    if (!tx.services.every((r) => r.staff)) { showToast(t("toast.needStaffToComplete"), "error"); return; }
    tx.status = "Completed";
    save(KEY_TRANSACTIONS, txs);
    generateIncentiveRecordsForTransaction(tx);
    showToast(t("toast.completed"), "success");
    refreshCurrentPage();
  }

  function cancelTransaction(id) {
    const txs = load(KEY_TRANSACTIONS, []);
    const tx = txs.find((t) => t.id === id);
    if (!tx || tx.status !== "Open") return;
    tx.status = "Cancelled";
    save(KEY_TRANSACTIONS, txs);
    showToast(t("toast.cancelled"));
    refreshCurrentPage();
  }

  function openTxForEdit(tx) {
    if (tx.status !== "Open") return;

    // Remove it from Transactions - it becomes a live active-deal tab instead
    const transactions = load(KEY_TRANSACTIONS, []);
    save(KEY_TRANSACTIONS, transactions.filter((t) => t.id !== tx.id));

    loadActiveDeals();

    const deal = {
      id: tx.id,
      customerId: tx.customerId || null,
      customerName: tx.customerName || "",
      phone: tx.phone || "",
      source: tx.source || "",
      notes: tx.notes || "",
      services: tx.services.map((r) => ({ ...r })),
      discountType: tx.discountType || "amount",
      discountValue: tx.discountValue !== undefined ? tx.discountValue : (tx.discount || 0),
      payment: tx.payment || "Cash"
    };

    // avoid duplicate tab if this transaction was already reopened once
    activeDeals = activeDeals.filter((d) => d.id !== deal.id);
    activeDeals.unshift(deal);
    activeDealId = deal.id;
    saveActiveDeals();

    hideHistoryBadge();
    goToPage("new-deal");
  }

  /* ============================================================
     EDIT A COMPLETED TRANSACTION + AUDIT LOG (Owner & Cashier both allowed)
     VIP RULE: if the transaction used VIP Balance, editing it auto-corrects
     the customer's current VIP balance by the exact difference.
     ============================================================ */
  function currentEditorLabel() {
    const session = getSession();
    const role = session ? session.role : getSettings().role;
    const username = session ? session.username : role;
    const name = username.charAt(0).toUpperCase() + username.slice(1);
    const roleLabel = role === "owner" ? t("settings.owner") : t("settings.cashier");
    return { name, role, roleLabel, display: `${name} (${roleLabel})` };
  }

  function openEditCompletedTxModal(tx) {
    if (tx.status !== "Completed") return;
    const staffList = load(KEY_STAFF, SEED_STAFF).filter((s) => s.active);
    const rowsHtml = (tx.services || []).map((r, idx) => `
      <div class="edit-tx-row" data-idx="${idx}">
        <span class="edit-tx-service">${r.service}</span>
        <select class="edit-tx-staff">
          <option value="">${t("common.any")}</option>
          ${staffList.map((s) => `<option value="${s.name}" ${s.name === r.staff ? "selected" : ""}>${s.name}</option>`).join("")}
        </select>
        <input type="number" class="edit-tx-price" min="0" step="0.5" value="${r.price}">
        <input type="number" class="edit-tx-qty" min="1" step="1" value="${r.qty}">
      </div>
    `).join("") || `<p class="scheme-empty">—</p>`;

    document.getElementById("modalTitle").textContent = `${t("actions.edit")} — ${tx.id}`;
    document.getElementById("modalBody").innerHTML = `
      <p class="confirm-note">${t("audit.editWarning")}</p>
      <div class="edit-tx-rows-labels"><span>${t("deal.colService")}</span><span>${t("deal.colStaff")}</span><span>${t("deal.colPrice")}</span><span>${t("deal.colQty")}</span></div>
      ${rowsHtml}
      <div class="form-row" style="margin-top:14px;">
        <div class="form-field">
          <label>${t("deal.discount")}</label>
          <div class="discount-input-group">
            <select id="editTxDiscountType">
              <option value="amount" ${tx.discountType !== "percent" ? "selected" : ""}>$</option>
              <option value="percent" ${tx.discountType === "percent" ? "selected" : ""}>%</option>
            </select>
            <input type="number" id="editTxDiscountValue" min="0" step="0.5" value="${tx.discountValue !== undefined ? tx.discountValue : tx.discount}">
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-outline-mini" id="editTxCancel">${getSettings().lang === "km" ? "ត្រឡប់វិញ" : "Cancel"}</button>
        <button class="btn-primary" id="editTxSave">${t("modal.save")}</button>
      </div>
    `;
    openModal();
    document.getElementById("editTxCancel").addEventListener("click", closeModal);
    document.getElementById("editTxSave").addEventListener("click", () => saveEditedTransaction(tx));
  }

  function saveEditedTransaction(tx) {
    const rowsEls = document.querySelectorAll(".edit-tx-row");
    const changes = [];
    const newServices = (tx.services || []).map((r, idx) => {
      const rowEl = rowsEls[idx];
      const newStaff = rowEl.querySelector(".edit-tx-staff").value;
      const newPrice = parseFloat(rowEl.querySelector(".edit-tx-price").value) || 0;
      const newQty = parseInt(rowEl.querySelector(".edit-tx-qty").value, 10) || 1;
      if (newStaff !== r.staff) changes.push({ field: `${t("th.staff")} (${r.service})`, from: r.staff || t("common.any"), to: newStaff || t("common.any") });
      if (newPrice !== r.price) changes.push({ field: `${t("th.price")} (${r.service})`, from: fmt(r.price), to: fmt(newPrice) });
      if (newQty !== r.qty) changes.push({ field: `${t("deal.colQty")} (${r.service})`, from: String(r.qty), to: String(newQty) });
      const inc = newStaff ? computeIncentiveForRow(newStaff, r.service, newPrice, newQty) : { type: null, rate: 0, amount: 0, configured: false };
      return { ...r, staff: newStaff, price: newPrice, qty: newQty, incentiveType: inc.type, incentiveRate: inc.rate, incentiveAmount: inc.amount, incentiveConfigured: inc.configured };
    });

    const newDiscountType = document.getElementById("editTxDiscountType").value;
    const newDiscountValue = parseFloat(document.getElementById("editTxDiscountValue").value) || 0;
    if (newDiscountType !== tx.discountType) changes.push({ field: t("deal.discountLine") + " " + t("th.category"), from: tx.discountType, to: newDiscountType });
    if (newDiscountValue !== (tx.discountValue !== undefined ? tx.discountValue : tx.discount)) {
      changes.push({ field: t("deal.discountLine"), from: fmt(tx.discountValue !== undefined ? tx.discountValue : tx.discount), to: fmt(newDiscountValue) });
    }

    if (!changes.length) { closeModal(); showToast(getSettings().lang === "km" ? "គ្មានការផ្លាស់ប្ដូរ" : "No changes made", undefined); return; }

    const newSubtotal = newServices.reduce((sum, r) => sum + computeLineTotal(r), 0);
    const newDiscountAmount = computeDiscountAmount(newSubtotal, newDiscountType, newDiscountValue);
    const newGrandTotal = Math.max(0, +(newSubtotal - newDiscountAmount).toFixed(2));
    const newTotalIncentive = +newServices.reduce((sum, r) => sum + (r.incentiveAmount || 0), 0).toFixed(2);
    const oldGrandTotal = tx.grandTotal;

    // VIP RULE: if this transaction drew from VIP Balance, correct the customer's balance by the exact difference
    let newVipDeduction = tx.vipDeduction || 0;
    if (tx.vipDeduction > 0) {
      const customers = load(KEY_CUSTOMERS, []);
      const custIdx = customers.findIndex((c) => c.id === tx.customerId);
      if (custIdx >= 0) {
        const cust = customers[custIdx];
        const balanceBefore = cust.vipBalance || 0;
        const diff = +(newGrandTotal - oldGrandTotal).toFixed(2);
        if (diff > 0) {
          const additionalDeduction = Math.min(diff, balanceBefore);
          cust.vipBalance = +Math.max(0, balanceBefore - additionalDeduction).toFixed(2);
          newVipDeduction = +(newVipDeduction + additionalDeduction).toFixed(2);
        } else if (diff < 0) {
          const refund = -diff;
          cust.vipBalance = +(balanceBefore + refund).toFixed(2);
          newVipDeduction = +Math.max(0, newVipDeduction - refund).toFixed(2);
        }
        customers[custIdx] = cust;
        save(KEY_CUSTOMERS, customers);
        if (diff !== 0) changes.push({ field: t("vip.balanceAvailable"), from: fmt(balanceBefore), to: fmt(cust.vipBalance) });
      }
    }

    const editor = currentEditorLabel();
    const now = new Date();
    const editEntry = {
      editedBy: editor.name, role: editor.role,
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().slice(0, 5),
      changes
    };

    const transactions = load(KEY_TRANSACTIONS, []);
    const idx = transactions.findIndex((t) => t.id === tx.id);
    if (idx < 0) return;
    transactions[idx] = {
      ...tx,
      services: newServices,
      discountType: newDiscountType, discountValue: newDiscountValue, discount: +newDiscountAmount.toFixed(2),
      subtotal: +newSubtotal.toFixed(2), grandTotal: newGrandTotal, totalIncentive: newTotalIncentive,
      vipDeduction: newVipDeduction,
      editHistory: [...(tx.editHistory || []), editEntry]
    };
    save(KEY_TRANSACTIONS, transactions);

    // Refresh incentive records for this transaction to match the edited services/staff
    const records = load(KEY_RECORDS, []).filter((r) => r.transactionId !== tx.id);
    save(KEY_RECORDS, records);
    generateIncentiveRecordsForTransaction(transactions[idx]);

    closeModal();
    showToast(t("audit.saved"), "success");
    refreshCurrentPage();
  }

  function openEditHistoryModal(tx) {
    document.getElementById("modalTitle").textContent = `${t("audit.editHistory")} — ${tx.id}`;
    const entries = [...(tx.editHistory || [])].reverse().map((e) => `
      <div class="audit-entry">
        <div class="audit-entry-head">
          <strong>${t("audit.editedBy")}: ${e.editedBy} (${e.role === "owner" ? t("settings.owner") : t("settings.cashier")})</strong>
          <span>${e.date} ${e.time}</span>
        </div>
        <div class="audit-changes">
          ${e.changes.map((c) => `<div class="audit-change-line"><span>${c.field}</span><span>${c.from} → ${c.to}</span></div>`).join("")}
        </div>
      </div>
    `).join("") || `<p class="scheme-empty">—</p>`;
    document.getElementById("modalBody").innerHTML = entries;
    openModal();
  }

  function openTxViewModal(tx) {
    document.getElementById("modalTitle").textContent = t("modal.transactionDetail");
    const rowsHtml = tx.services.map((r) => `
      <div class="detail-row">
        <strong>${r.service} × ${r.qty} — ${r.staff || t("common.any")}</strong>
        <span>${fmt(computeLineTotal(r))} (${t("deal.colIncentive")}: ${fmt(r.incentiveAmount)})</span>
      </div>
    `).join("");
    document.getElementById("modalBody").innerHTML = `
      <div class="detail-row"><strong>${t("th.customer")}</strong><span>${tx.customerName}</span></div>
      <div class="detail-row"><strong>${t("th.phone")}</strong><span>${tx.phone}</span></div>
      <div class="detail-row"><strong>${t("th.payment")}</strong><span>${tx.payment || t("common.none")}</span></div>
      <div class="detail-row"><strong>${t("th.date")}</strong><span>${tx.date} ${tx.time || ""}</span></div>
      <div class="detail-row"><strong>${t("th.status")}</strong><span>${t("status." + tx.status)}</span></div>
      <div class="modal-section-label">${t("deal.services")}</div>
      ${rowsHtml}
      <div class="detail-row"><strong>${t("deal.subtotal")}</strong><span>${fmt(tx.subtotal)}</span></div>
      <div class="detail-row"><strong>${t("deal.discountLine")}</strong><span>-${fmt(tx.discount)}${tx.discountType === "percent" && tx.discountValue ? ` (${tx.discountValue}%)` : ""}</span></div>
      <div class="detail-row"><strong>${t("deal.grandTotal")}</strong><span><strong>${fmt(tx.grandTotal)}</strong></span></div>
      <div class="detail-row"><strong>${t("deal.totalIncentive")}</strong><span>${fmt(tx.totalIncentive)}</span></div>
      <div class="modal-actions">
        <button class="btn-outline-mini" id="modalPrintBtn">${t("actions.print")}</button>
      </div>
    `;
    openModal();
    document.getElementById("modalPrintBtn").addEventListener("click", () => printReceipt(tx));
  }

  /* ============================================================
     RECEIPT PRINT
     ============================================================ */
  function printReceipt(tx) {
    const area = document.getElementById("receiptPrintArea");
    const rowsHtml = tx.services.map((r) => `
      <tr><td>${r.service}</td><td>${r.staff || "-"}</td><td>${r.qty}</td><td>${fmt(r.price)}</td><td>${fmt(computeLineTotal(r))}</td></tr>
    `).join("");
    area.innerHTML = `
      <div class="receipt-box">
        <h2>Ms. Engly Khun Salon</h2>
        <p>${t("modal.transactionDetail")} — ${tx.id}</p>
        <p>${t("th.customer")}: ${tx.customerName} (${tx.phone})</p>
        <p>${t("th.date")}: ${tx.date} ${tx.time || ""}</p>
        <table>
          <thead><tr><th>${t("deal.colService")}</th><th>${t("th.staff")}</th><th>${t("deal.colQty")}</th><th>${t("deal.colPrice")}</th><th>${t("th.total")}</th></tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        <p>${t("deal.subtotal")}: ${fmt(tx.subtotal)}</p>
        <p>${t("deal.discountLine")}: -${fmt(tx.discount)}</p>
        <p><strong>${t("deal.grandTotal")}: ${fmt(tx.grandTotal)}</strong></p>
        <p>${t("th.payment")}: ${tx.payment || "-"}</p>
      </div>
    `;
    window.print();
  }

  /* ============================================================
     CUSTOMERS PAGE
     ============================================================ */
  function customerRowStats(c, txs) {
    const custTxs = txs.filter((tx) => tx.customerId === c.id);
    const completedTxs = custTxs.filter((tx) => tx.status === "Completed");
    const lastVisit = custTxs.reduce((max, tx) => (tx.date > max ? tx.date : max), "");
    const totalSpending = completedTxs.reduce((sum, tx) => sum + tx.grandTotal, 0);
    const svcCount = {};
    completedTxs.forEach((tx) => tx.services.forEach((r) => { svcCount[r.service] = (svcCount[r.service] || 0) + 1; }));
    const mostUsed = Object.entries(svcCount).sort((a, b) => b[1] - a[1])[0];
    return { ...c, custTxs, lastVisit, totalVisits: custTxs.length, totalSpending, mostUsed: mostUsed ? mostUsed[0] : t("common.none") };
  }

  function renderCustomersPage() {
    const customers = load(KEY_CUSTOMERS, []);
    const txs = load(KEY_TRANSACTIONS, []);
    const rows = customers.map((c) => customerRowStats(c, txs));

    const table = document.getElementById("customersTable");
    const headers = ["th.customer", "th.phone", "th.customerType", "th.lastVisit", "th.totalVisits", "th.totalSpending", "th.vipBalance", "th.mostUsedService"];
    table.querySelector("thead").innerHTML = `<tr>${headers.map((h) => `<th>${t(h)}</th>`).join("")}<th>${t("th.actions")}</th></tr>`;
    table.querySelector("tbody").innerHTML = rows.map((c) => `
      <tr data-id="${c.id}">
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>${c.type === "vip" ? `<span class="badge-vip">VIP</span>` : `<span class="badge-normal">${t("customerType.normal")}</span>`}</td>
        <td>${c.lastVisit || t("common.none")}</td>
        <td>${c.totalVisits}</td>
        <td>${fmt(c.totalSpending)}</td>
        <td>${c.type === "vip" ? `<strong>${fmt(c.vipBalance || 0)}</strong>` : "—"}</td>
        <td>${c.mostUsed}</td>
        <td><button class="icon-btn" data-action="view-customer" data-id="${c.id}">${t("actions.view")}</button></td>
      </tr>
    `).join("") || `<tr><td colspan="9" style="text-align:center;color:#B7ABA0;padding:24px;">—</td></tr>`;

    table.querySelectorAll('[data-action="view-customer"]').forEach((btn) => {
      btn.addEventListener("click", () => openCustomerModal(rows.find((c) => c.id === btn.dataset.id)));
    });

    document.getElementById("addCustomerBtn").onclick = () => openAddCustomerModal();
    document.getElementById("sellVipBtn").onclick = () => openVipSellTopUpModal();
  }

  // Requirement E: VIP customer detail modal is organized into 4 clean sections —
  // (1) Customer Summary (2-col grid), (2) VIP Package Summary, (3) Package History table,
  // (4) Visit/Transaction History table. Modal keeps default max-height + internal scroll
  // (see .modal{max-height:85vh;overflow-y:auto;} in dashboard.css) so the outer page never
  // scrolls awkwardly even with long history.
  function openCustomerModal(c) {
    const historyRows = [...c.custTxs].sort((a, b) => b.date.localeCompare(a.date)).map((tx) => {
      const label = tx.txType === "vip_purchase" ? t("vip.purchaseLabel") : tx.txType === "vip_topup" ? t("vip.topupLabel") : tx.services.map((r) => `${r.service} (${r.staff || t("common.any")})`).join(", ");
      const staffNames = tx.txType === "vip_purchase" || tx.txType === "vip_topup" ? (tx.salesStaff || t("common.none")) : [...new Set(tx.services.map((r) => r.staff).filter(Boolean))].join(", ") || t("common.none");
      return `
      <tr>
        <td>${tx.date}</td>
        <td>${label}</td>
        <td>${fmt(tx.grandTotal)}${tx.vipDeduction ? ` <span class="tx-row-staff">(${t("vip.used")}: ${fmt(tx.vipDeduction)})</span>` : ""}</td>
        <td>${tx.payment}</td>
        <td>${staffNames}</td>
        <td><span class="badge ${statusBadgeClass(tx.status)}">${t("status." + tx.status)}</span></td>
      </tr>`;
    }).join("");

    const packageRows = (c.packageHistory || []).slice().sort((a, b) => b.date.localeCompare(a.date)).map((p) => `
      <tr>
        <td>${p.date}</td>
        <td>${p.type === "topup" ? t("vip.topupLabel") : t("vip.purchaseLabel")}</td>
        <td>${fmt(p.amount)}</td>
        <td>${p.paymentMethod}</td>
        <td>${p.salesStaff || t("common.none")}</td>
      </tr>
    `).join("");

    const vipSection = c.type === "vip" ? `
      <div class="modal-section-label">${t("customerModal.vipSummaryTitle")}</div>
      <div class="detail-grid">
        <div class="detail-row"><strong>${t("vip.totalPurchased")}</strong><span>${fmt((c.packageHistory || []).reduce((s, p) => s + p.amount, 0))}</span></div>
        <div class="detail-row"><strong>${t("vip.balanceAvailable")}</strong><span><strong>${fmt(c.vipBalance || 0)}</strong></span></div>
      </div>
      <div class="modal-section-label">${t("vip.packageHistory")}</div>
      <div class="detail-table-wrap">
        <table class="detail-table">
          <thead><tr><th>${t("th.date")}</th><th>${t("th.type")}</th><th>${t("th.amount")}</th><th>${t("th.payment")}</th><th>${t("th.salesStaff")}</th></tr></thead>
          <tbody>${packageRows || `<tr><td colspan="5" class="detail-table-empty">—</td></tr>`}</tbody>
        </table>
      </div>
    ` : "";

    document.getElementById("modalTitle").textContent = `${t("modal.customerDetail")} — ${c.name}`;
    document.getElementById("modalBody").innerHTML = `
    <div class="customer-detail-view">
      <div class="modal-section-label modal-section-label-first">${t("customerModal.summaryTitle")}</div>
      <div class="detail-grid">
        <div class="detail-row"><strong>${t("th.customer")}</strong><span>${c.name}</span></div>
        <div class="detail-row"><strong>${t("th.phone")}</strong><span>${c.phone}</span></div>
        <div class="detail-row"><strong>${t("th.customerType")}</strong><span>${c.type === "vip" ? "VIP" : t("customerType.normal")}</span></div>
        <div class="detail-row"><strong>${t("th.source")}</strong><span>${c.source || t("common.none")}</span></div>
        <div class="detail-row"><strong>${t("th.totalVisits")}</strong><span>${c.totalVisits}</span></div>
        <div class="detail-row"><strong>${t("th.lastVisit")}</strong><span>${c.lastVisit || t("common.none")}</span></div>
        <div class="detail-row"><strong>${t("th.totalSpending")}</strong><span>${fmt(c.totalSpending)}</span></div>
        <div class="detail-row"><strong>${t("th.mostUsedService")}</strong><span>${c.mostUsed}</span></div>
      </div>
      ${vipSection}
      <div class="modal-section-label">${t("customers.history")}</div>
      <div class="detail-table-wrap">
        <table class="detail-table">
          <thead><tr><th>${t("th.date")}</th><th>${t("th.serviceTransaction")}</th><th>${t("th.amount")}</th><th>${t("th.payment")}</th><th>${t("th.staff")}</th><th>${t("th.status")}</th></tr></thead>
          <tbody>${historyRows || `<tr><td colspan="6" class="detail-table-empty">—</td></tr>`}</tbody>
        </table>
      </div>
    </div>
    `;
    const box = document.getElementById("modalBox");
    if (box) box.classList.add("modal-wide");
    openModal();
  }

  function vipAmountPickerHtml(inputId) {
    return `
      <div class="vip-amount-buttons" id="${inputId}Buttons">
        <button type="button" class="vip-amount-btn" data-amount="100">$100</button>
        <button type="button" class="vip-amount-btn" data-amount="200">$200</button>
        <button type="button" class="vip-amount-btn" data-amount="500">$500</button>
        <button type="button" class="vip-amount-btn" data-amount="custom">${t("vip.custom")}</button>
      </div>
      <input type="number" id="${inputId}" min="0" step="5" placeholder="${t('vip.packageAmount')}" style="margin-top:8px;">
    `;
  }

  function wireVipAmountPicker(inputId) {
    const wrap = document.getElementById(inputId + "Buttons");
    const input = document.getElementById(inputId);
    wrap.querySelectorAll(".vip-amount-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        wrap.querySelectorAll(".vip-amount-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (btn.dataset.amount !== "custom") { input.value = btn.dataset.amount; input.readOnly = true; }
        else { input.value = ""; input.readOnly = false; input.focus(); }
      });
    });
  }

  function salesStaffOptionsHtml(selectedName) {
    const staff = load(KEY_STAFF, SEED_STAFF).filter((s) => s.active && (s.type === "sales" || s.type === "both"));
    return `<option value="">—</option>` + staff.map((s) => `<option value="${s.name}" ${s.name === selectedName ? "selected" : ""}>${s.name}</option>`).join("");
  }

  function openAddCustomerModal() {
    document.getElementById("modalTitle").textContent = t("customers.addNew");
    document.getElementById("modalBody").innerHTML = `
      <div class="form-field"><label>${t("form.customerName")}</label><input type="text" id="newCustName"></div>
      <div class="form-field"><label>${t("form.phone")}</label><input type="tel" id="newCustPhone"></div>
      <div class="form-field">
        <label>${t("th.customerType")}</label>
        <select id="newCustType">
          <option value="normal">${t("customerType.normal")}</option>
          <option value="vip">${t("customerType.vip")}</option>
        </select>
      </div>
      <div class="form-field"><label>${t("form.customerSource")} <span class="optional-tag">${t("form.optional")}</span></label>
        <select id="newCustSource">
          <option value="">—</option>
          <option value="Walk-in">Walk-in</option>
          <option value="Facebook">Facebook</option>
          <option value="TikTok">TikTok</option>
          <option value="Telegram">Telegram</option>
          <option value="Referral">Referral</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-field"><label>${t("form.notes")}</label><input type="text" id="newCustNotes"></div>

      <div id="newCustVipFields" style="display:none;">
        <div class="modal-section-label">${t("vip.initialPackage")}</div>
        <div class="form-field">
          <label>${t("vip.packageAmount")}</label>
          ${vipAmountPickerHtml("newCustVipAmount")}
        </div>
        <div class="form-field"><label>${t("vip.purchaseDate")}</label><input type="date" id="newCustVipDate" value="${daysAgo(0)}"></div>
        <div class="form-field">
          <label>${t("th.payment")}</label>
          <select id="newCustVipPayment">
            <option value="Cash">Cash</option><option value="ABA">ABA</option><option value="ACLEDA">ACLEDA</option>
            <option value="Credit Card">Credit Card</option><option value="Other">Other</option>
          </select>
        </div>
        <div class="form-field"><label>${t("deal.salesStaff")}</label><select id="newCustVipSalesStaff">${salesStaffOptionsHtml("")}</select></div>
      </div>

      <div class="modal-actions"><button class="btn-primary" id="saveNewCustBtn">${t("modal.save")}</button></div>
    `;
    openModal();
    wireVipAmountPicker("newCustVipAmount");
    document.getElementById("newCustType").addEventListener("change", (e) => {
      document.getElementById("newCustVipFields").style.display = e.target.value === "vip" ? "" : "none";
    });
    document.getElementById("saveNewCustBtn").addEventListener("click", () => {
      const name = document.getElementById("newCustName").value.trim();
      const phone = document.getElementById("newCustPhone").value.trim();
      if (!name || !phone) { showToast(getSettings().lang === "km" ? "សូមបញ្ចូលឈ្មោះ និងលេខទូរស័ព្ទ" : "Please enter customer name and phone", "error"); return; }
      const type = document.getElementById("newCustType").value;
      const source = document.getElementById("newCustSource").value;
      const notes = document.getElementById("newCustNotes").value.trim();

      const customers = load(KEY_CUSTOMERS, []);
      if (customers.some((c) => c.phone === phone)) { showToast(getSettings().lang === "km" ? "អតិថិជននេះមានរួចហើយ" : "A customer with this phone already exists", "error"); return; }
      const nextNum = customers.reduce((max, c) => {
        const m = /CUS-(\d+)/.exec(c.id || "");
        return m ? Math.max(max, parseInt(m[1], 10)) : max;
      }, 0) + 1;
      const cust = { id: "CUS-" + String(nextNum).padStart(3, "0"), name, phone, source, notes, type, vipBalance: 0, packageHistory: [] };

      if (type === "vip") {
        const amount = parseFloat(document.getElementById("newCustVipAmount").value) || 0;
        const salesStaff = document.getElementById("newCustVipSalesStaff").value;
        const payment = document.getElementById("newCustVipPayment").value;
        const date = document.getElementById("newCustVipDate").value || daysAgo(0);
        if (amount > 0) {
          const inc = computeSalesIncentive(salesStaff, amount);
          cust.vipBalance = amount;
          cust.packageHistory.push({ id: "PKG-" + Date.now(), amount, paymentMethod: payment, salesStaff, salesIncentiveAmount: inc.amount, date, type: "purchase" });
          recordVipPackageTransaction(cust, amount, "vip_purchase", payment, salesStaff, inc.amount, date);
        }
      }
      customers.push(cust);
      save(KEY_CUSTOMERS, customers);
      closeModal();
      showToast(t("toast.saved"), "success");
      renderCustomersPage();
    });
  }

  function recordVipPackageTransaction(cust, amount, txType, payment, salesStaff, salesIncentiveAmount, date) {
    const transactions = load(KEY_TRANSACTIONS, []);
    const nextNum = transactions.reduce((max, tx) => {
      const m = /TX-(\d+)/.exec(tx.id || "");
      return m ? Math.max(max, parseInt(m[1], 10)) : max;
    }, 0) + 1;
    const tx = {
      id: "TX-" + String(nextNum).padStart(3, "0"),
      customerId: cust.id, customerName: cust.name, phone: cust.phone, source: cust.source || "",
      notes: "", date: date || daysAgo(0), time: new Date().toTimeString().slice(0, 5),
      payment, remainingPaymentMethod: "", remainingAmount: 0,
      discountType: "amount", discountValue: 0, discount: 0,
      subtotal: amount, grandTotal: amount, totalIncentive: 0,
      status: "Completed", txType,
      salesStaff, salesIncentiveAmount, vipDeduction: 0,
      services: [], editHistory: [],
      createdAt: new Date().toISOString()
    };
    transactions.push(tx);
    save(KEY_TRANSACTIONS, transactions);
    generateIncentiveRecordsForTransaction(tx);
    return tx;
  }

  // Sell / Top-Up VIP Package - works for an existing customer (reused record, balance added to
  // their existing total, no duplicate) OR a brand-new customer who does not need any prior
  // Normal-customer transaction first: choosing "New Customer" creates the customer record as
  // part of this same VIP sale.
  function openVipSellTopUpModal() {
    document.getElementById("modalTitle").textContent = t("vip.sellTopUp");
    const customers = load(KEY_CUSTOMERS, []);
    document.getElementById("modalBody").innerHTML = `
      <div class="form-field">
        <label>${t("vip.customerMode")}</label>
        <select id="vipTxMode">
          <option value="existing">${t("vip.existingCustomer")}</option>
          <option value="new">${t("vip.newCustomer")}</option>
        </select>
      </div>
      <div id="vipTxExistingWrap" class="form-field">
        <label>${t("th.customer")}</label>
        <select id="vipTxCustomer">
          <option value="">—</option>
          ${customers.map((c) => `<option value="${c.id}">${c.name} (${c.phone})${c.type === "vip" ? " · VIP $" + (c.vipBalance || 0).toFixed(2) : ""}</option>`).join("")}
        </select>
      </div>
      <div id="vipTxNewWrap" style="display:none;">
        <div class="form-field"><label>${t("form.customerName")}</label><input type="text" id="vipTxNewName"></div>
        <div class="form-field"><label>${t("form.phone")}</label><input type="tel" id="vipTxNewPhone"></div>
        <div class="form-field"><label>${t("form.customerSource")} <span class="optional-tag">${t("form.optional")}</span></label>
          <select id="vipTxNewSource">
            <option value="">—</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Facebook">Facebook</option>
            <option value="TikTok">TikTok</option>
            <option value="Telegram">Telegram</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div class="form-field">
        <label>${t("vip.packageAmount")}</label>
        ${vipAmountPickerHtml("vipTxAmount")}
      </div>
      <div class="form-field"><label>${t("th.payment")}</label>
        <select id="vipTxPayment">
          <option value="Cash">Cash</option><option value="ABA">ABA</option><option value="ACLEDA">ACLEDA</option>
          <option value="Credit Card">Credit Card</option><option value="Other">Other</option>
        </select>
      </div>
      <div class="form-field"><label>${t("deal.salesStaff")}</label><select id="vipTxSalesStaff">${salesStaffOptionsHtml("")}</select></div>
      <div class="modal-actions"><button class="btn-primary" id="saveVipTxBtn">${t("modal.save")}</button></div>
    `;
    openModal();
    wireVipAmountPicker("vipTxAmount");
    document.getElementById("vipTxMode").addEventListener("change", (e) => {
      const isNew = e.target.value === "new";
      document.getElementById("vipTxExistingWrap").style.display = isNew ? "none" : "";
      document.getElementById("vipTxNewWrap").style.display = isNew ? "" : "none";
    });
    document.getElementById("saveVipTxBtn").addEventListener("click", () => {
      const mode = document.getElementById("vipTxMode").value;
      const amount = parseFloat(document.getElementById("vipTxAmount").value) || 0;
      if (amount <= 0) { showToast(getSettings().lang === "km" ? "សូមបញ្ចូលចំនួនទឹកប្រាក់" : "Please enter an amount", "error"); return; }
      const payment = document.getElementById("vipTxPayment").value;
      const salesStaff = document.getElementById("vipTxSalesStaff").value;
      const customersNow = load(KEY_CUSTOMERS, []);

      let cust;
      if (mode === "new") {
        const name = document.getElementById("vipTxNewName").value.trim();
        const phone = document.getElementById("vipTxNewPhone").value.trim();
        if (!name || !phone) { showToast(getSettings().lang === "km" ? "សូមបញ្ចូលឈ្មោះ និងលេខទូរស័ព្ទ" : "Please enter customer name and phone", "error"); return; }
        if (customersNow.some((c) => c.phone === phone)) { showToast(getSettings().lang === "km" ? "អតិថិជននេះមានរួចហើយ" : "A customer with this phone already exists", "error"); return; }
        const source = document.getElementById("vipTxNewSource").value;
        const nextNum = customersNow.reduce((max, c) => {
          const m = /CUS-(\d+)/.exec(c.id || "");
          return m ? Math.max(max, parseInt(m[1], 10)) : max;
        }, 0) + 1;
        cust = { id: "CUS-" + String(nextNum).padStart(3, "0"), name, phone, source, notes: "", type: "normal", vipBalance: 0, packageHistory: [] };
        customersNow.push(cust);
      } else {
        const custId = document.getElementById("vipTxCustomer").value;
        if (!custId) { showToast(getSettings().lang === "km" ? "សូមជ្រើសរើសអតិថិជន" : "Please select a customer", "error"); return; }
        const idx = customersNow.findIndex((c) => c.id === custId);
        if (idx < 0) return;
        cust = customersNow[idx];
      }

      const isFirstPurchase = cust.type !== "vip";
      const txType = isFirstPurchase ? "vip_purchase" : "vip_topup";
      const inc = computeSalesIncentive(salesStaff, amount);
      cust.type = "vip";
      cust.vipBalance = +((cust.vipBalance || 0) + amount).toFixed(2);
      cust.packageHistory = cust.packageHistory || [];
      cust.packageHistory.push({ id: "PKG-" + Date.now(), amount, paymentMethod: payment, salesStaff, salesIncentiveAmount: inc.amount, date: daysAgo(0), type: isFirstPurchase ? "purchase" : "topup" });
      save(KEY_CUSTOMERS, customersNow);
      recordVipPackageTransaction(cust, amount, txType, payment, salesStaff, inc.amount, daysAgo(0));
      closeModal();
      showToast(t("toast.saved"), "success");
      renderCustomersPage();
    });
  }

  /* ============================================================
     STAFF MANAGEMENT PAGE (Owner-only add/edit/deactivate/incentive config;
     Cashier may view/select staff but cannot add, delete, or modify incentive setup)
     Staff Incentive setup now lives here - there is no separate "Staff Incentive" page/nav item.
     ============================================================ */
  // Function-based incentive summary shown in the Staff Management table, e.g.
  // "Service: 10% · Sales: 5%" for a "Both" staff member, or just one side for Service/Sales-only staff.
  function incentiveSetupSummary(s) {
    const parts = [];
    if (s.type === "service" || s.type === "both") {
      parts.push(`${t("incentiveType.service")}: ${typeof s.serviceIncentiveRate === "number" ? s.serviceIncentiveRate + "%" : t("staff.noRulesYet")}`);
    }
    if (s.type === "sales" || s.type === "both") {
      parts.push(`${t("incentiveType.sales")}: ${typeof s.salesIncentiveRate === "number" ? s.salesIncentiveRate + "%" : t("staff.noRulesYet")}`);
    }
    return parts.join(" · ");
  }

  function renderStaffPage() {
    const staff = load(KEY_STAFF, SEED_STAFF);
    const isOwner = getSettings().role === "owner";
    const table = document.getElementById("staffTable");
    const headers = ["th.staff", "th.phone", "staff.type", "staff.position", "staff.incentiveSetup", "staff.status"];
    table.querySelector("thead").innerHTML = `<tr>${headers.map((h) => `<th>${t(h)}</th>`).join("")}<th>${t("th.actions")}</th></tr>`;
    table.querySelector("tbody").innerHTML = staff.map((s) => `
      <tr data-id="${s.id}">
        <td>${s.name}</td>
        <td>${s.phone || t("common.none")}</td>
        <td><span class="staff-type-badge">${t("staffType." + (s.type || "service"))}</span></td>
        <td>${s.role}</td>
        <td><span class="incentive-setup-summary">${incentiveSetupSummary(s)}</span>${isOwner ? `<br><button class="icon-btn" data-action="manage-incentive" data-id="${s.id}">${t("staff.manageIncentive")}</button>` : ""}</td>
        <td><span class="badge ${s.active ? "badge-completed" : "badge-cancelled"}">${s.active ? t("staff.active") : t("staff.inactive")}</span></td>
        <td>${isOwner ? `
          <div class="row-actions">
            <button class="icon-btn" data-action="edit-staff" data-id="${s.id}">${t("actions.edit")}</button>
            <button class="icon-btn" data-action="toggle-staff" data-id="${s.id}">${s.active ? t("staff.deactivate") : t("staff.activate")}</button>
          </div>` : "—"}</td>
      </tr>
    `).join("") || `<tr><td colspan="7" style="text-align:center;color:#B7ABA0;padding:24px;">—</td></tr>`;

    // Manage Incentive / Add Staff / Edit Staff / Deactivate are all Owner-only actions - Cashier
    // never sees these buttons at all (not just disabled), only the read-only incentive summary text.
    if (isOwner) {
      table.querySelectorAll('[data-action="manage-incentive"]').forEach((btn) => {
        btn.addEventListener("click", () => openManageIncentiveModal(staff.find((s) => s.id === btn.dataset.id)));
      });
      table.querySelectorAll('[data-action="edit-staff"]').forEach((btn) => {
        btn.addEventListener("click", () => openStaffModal(staff.find((s) => s.id === btn.dataset.id)));
      });
      table.querySelectorAll('[data-action="toggle-staff"]').forEach((btn) => {
        btn.addEventListener("click", () => {
          const list = load(KEY_STAFF, SEED_STAFF);
          const s = list.find((x) => x.id === btn.dataset.id);
          if (!s) return;
          const msg = s.active ? t("staff.confirmDeactivate") : t("staff.confirmActivate");
          if (!confirm(msg)) return;
          s.active = !s.active;
          save(KEY_STAFF, list);
          renderStaffPage();
        });
      });
    }

    const addBtn = document.getElementById("addStaffBtn");
    addBtn.style.display = isOwner ? "" : "none";
    addBtn.onclick = () => openStaffModal(null);
  }

  // "Manage Incentive" modal - Owner-only. The single source of truth for both Service Incentive
  // rules (per exact service) and the Sales Incentive setting. Cashier never opens this (the
  // button that triggers it isn't even rendered for Cashier in renderStaffPage()).
  function openManageIncentiveModal(s) {
    if (getSettings().role !== "owner") return; // defense in depth - Owner-only feature
    // Any unexpected/missing staff.type still shows the Service Incentive field by default
    // (matches the type badge fallback used elsewhere), so the modal is never left empty.
    const showService = s.type !== "sales";
    const showSales = s.type === "sales" || s.type === "both";

    function renderModalBody() {
      const serviceHtml = showService ? `
        <div class="modal-section-label">${t("incentiveType.service")}</div>
        <div class="form-field">
          <label>${t("staff.serviceIncentivePercent")}</label>
          <input type="number" id="mgrServiceRate" min="0" max="100" step="0.5" value="${typeof s.serviceIncentiveRate === "number" ? s.serviceIncentiveRate : 10}">
          <p class="incentive-field-hint">${t("staff.serviceIncentiveHint")}</p>
        </div>
      ` : "";
      const salesHtml = showSales ? `
        <div class="modal-section-label">${t("incentiveType.sales")}</div>
        <div class="form-field">
          <label>${t("staff.salesIncentivePercent")}</label>
          <input type="number" id="mgrSalesRate" min="0" max="100" step="0.5" value="${typeof s.salesIncentiveRate === "number" ? s.salesIncentiveRate : 5}">
          <p class="incentive-field-hint">${t("staff.salesIncentiveHint")}</p>
        </div>
      ` : "";

      document.getElementById("modalTitle").textContent = `${t("staff.manageIncentive")} — ${s.name}${s.role ? " – " + s.role : ""}`;
      document.getElementById("modalBody").innerHTML = `
        ${serviceHtml}
        ${salesHtml}
        <div class="modal-actions">
          <button type="button" class="btn-outline-mini" id="mgrCancelBtn">${t("modal.cancel")}</button>
          <button type="button" class="btn-primary" id="mgrSaveBtn">${t("staff.saveIncentive")}</button>
        </div>
      `;
      document.getElementById("mgrCancelBtn").addEventListener("click", closeModal);
      document.getElementById("mgrSaveBtn").addEventListener("click", handleSave);
    }

    function handleSave() {
      let newServiceRate = null;
      if (showService) {
        newServiceRate = parseFloat(document.getElementById("mgrServiceRate").value);
        if (isNaN(newServiceRate)) { showToast(getSettings().lang === "km" ? "សូមបញ្ចូលភាគរយកម្រៃជើងសារសេវាកម្ម" : "Please enter a Service Incentive percentage", "error"); return; }
        if (newServiceRate < 0 || newServiceRate > 100) { showToast(getSettings().lang === "km" ? "ភាគរយត្រូវនៅចន្លោះ 0-100" : "Percentage must be between 0 and 100", "error"); return; }
      }

      let newSalesRate = null;
      if (showSales) {
        newSalesRate = parseFloat(document.getElementById("mgrSalesRate").value);
        if (isNaN(newSalesRate)) { showToast(getSettings().lang === "km" ? "សូមបញ្ចូលភាគរយកម្រៃជើងសារលក់" : "Please enter a Sales Incentive percentage", "error"); return; }
        if (newSalesRate < 0 || newSalesRate > 100) { showToast(getSettings().lang === "km" ? "ភាគរយត្រូវនៅចន្លោះ 0-100" : "Percentage must be between 0 and 100", "error"); return; }
      }

      // ---- Persist: applies immediately to localStorage/demo data - New Deal always reads this
      // live via computeIncentiveForRow()/computeSalesIncentive(), so no page refresh is required. ----
      const staffList = load(KEY_STAFF, SEED_STAFF);
      const idx = staffList.findIndex((x) => x.id === s.id);
      if (idx >= 0) {
        const updated = { ...staffList[idx] };
        if (showService) updated.serviceIncentiveRate = newServiceRate;
        if (showSales) updated.salesIncentiveRate = newSalesRate;
        staffList[idx] = updated;
        save(KEY_STAFF, staffList);
      }

      closeModal();
      showToast(t("toast.saved"), "success");
      renderStaffPage();
    }

    renderModalBody();
    openModal();
  }

  function openStaffModal(staffMember) {
    const isEdit = !!staffMember;
    document.getElementById("modalTitle").textContent = isEdit ? t("actions.edit") + " — " + staffMember.name : t("staff.addNew");
    const s = staffMember || { name: "", phone: "", role: "", type: "service", active: true };
    document.getElementById("modalBody").innerHTML = `
      <div class="form-field"><label>${t("staff.name")}</label><input type="text" id="stfName" value="${s.name}"></div>
      <div class="form-field"><label>${t("th.phone")}</label><input type="tel" id="stfPhone" value="${s.phone || ""}"></div>
      <div class="form-field"><label>${t("staff.position")}</label><input type="text" id="stfRole" value="${s.role || ""}"></div>
      <div class="form-field">
        <label>${t("staff.type")}</label>
        <select id="stfType">
          <option value="service" ${s.type === "service" ? "selected" : ""}>${t("staffType.service")}</option>
          <option value="sales" ${s.type === "sales" ? "selected" : ""}>${t("staffType.sales")}</option>
          <option value="both" ${s.type === "both" ? "selected" : ""}>${t("staffType.both")}</option>
        </select>
      </div>
      <p class="owner-note">${t("staff.incentiveSetupHint")}</p>
      <div class="modal-actions"><button class="btn-primary" id="saveStaffBtn">${t("modal.save")}</button></div>
    `;
    openModal();
    document.getElementById("saveStaffBtn").addEventListener("click", () => {
      const name = document.getElementById("stfName").value.trim();
      if (!name) return;
      const phone = document.getElementById("stfPhone").value.trim();
      const role = document.getElementById("stfRole").value.trim();
      const type = document.getElementById("stfType").value;

      const staffList = load(KEY_STAFF, SEED_STAFF);
      if (isEdit) {
        const idx = staffList.findIndex((x) => x.id === staffMember.id);
        // Active/Inactive status is managed ONLY via the Deactivate/Activate action in Staff
        // Management (toggle-staff) - Edit Staff never reads or writes staffList[idx].active,
        // so the existing status is preserved untouched here.
        if (idx >= 0) staffList[idx] = { ...staffList[idx], name, phone, role, type };
      } else {
        const id = "stf-" + Date.now();
        // Service/Sales incentive rates default to 0 and are configured afterward via "Manage Incentive".
        staffList.push({ id, name, phone, role, specialty: role, type, active: true, serviceIncentiveRate: type !== "sales" ? 0 : undefined, salesIncentiveRate: type !== "service" ? 0 : undefined });
      }
      save(KEY_STAFF, staffList);
      closeModal();
      showToast(t("toast.saved"), "success");
      renderStaffPage();
    });
  }

  /* ============================================================
     SERVICES PAGE
     ============================================================ */
  function renderServicesPage() {
    const services = load(KEY_SERVICES, SEED_SERVICES);
    const isOwner = getSettings().role === "owner";
    const table = document.getElementById("servicesTable");
    table.querySelector("thead").innerHTML = `<tr><th>${t("deal.colService")}</th><th>${t("th.category")}</th><th>${t("th.price")}</th><th>${t("th.actions")}</th></tr>`;
    table.querySelector("tbody").innerHTML = services.map((s, idx) => `
      <tr data-idx="${idx}">
        <td>${s.name}</td>
        <td>${s.category}</td>
        <td><input type="number" class="svc-price-input" data-idx="${idx}" value="${s.price}" min="0" step="0.5" ${isOwner ? "" : "disabled"} style="width:90px;"></td>
        <td>${isOwner ? `<button class="icon-btn" data-action="remove-service" data-idx="${idx}">×</button>` : ""}</td>
      </tr>
    `).join("");

    if (isOwner) {
      table.querySelectorAll(".svc-price-input").forEach((input) => {
        input.addEventListener("change", () => {
          const svc = load(KEY_SERVICES, SEED_SERVICES);
          svc[parseInt(input.dataset.idx, 10)].price = parseFloat(input.value) || 0;
          save(KEY_SERVICES, svc);
          showToast(t("toast.saved"), "success");
        });
      });
      table.querySelectorAll('[data-action="remove-service"]').forEach((btn) => {
        btn.addEventListener("click", () => {
          const svc = load(KEY_SERVICES, SEED_SERVICES);
          svc.splice(parseInt(btn.dataset.idx, 10), 1);
          save(KEY_SERVICES, svc);
          renderServicesPage();
        });
      });
    }

    document.getElementById("addServiceCatalogBtn").onclick = () => openAddServiceModal();
  }

  function openAddServiceModal() {
    document.getElementById("modalTitle").textContent = t("modal.addService");
    document.getElementById("modalBody").innerHTML = `
      <input type="text" id="newSvcName" placeholder="${t('deal.colService')}">
      <input type="text" id="newSvcCategory" placeholder="${t('th.category')}">
      <input type="number" id="newSvcPrice" placeholder="${t('th.price')}" min="0" step="0.5">
      <div class="modal-actions"><button class="btn-primary" id="newSvcSave">${t("modal.save")}</button></div>
    `;
    openModal();
    document.getElementById("newSvcSave").addEventListener("click", () => {
      const name = document.getElementById("newSvcName").value.trim();
      const category = document.getElementById("newSvcCategory").value.trim() || "General";
      const price = parseFloat(document.getElementById("newSvcPrice").value) || 0;
      if (!name) return;
      const services = load(KEY_SERVICES, SEED_SERVICES);
      services.push({ id: "svc-" + Date.now(), name, category, price });
      save(KEY_SERVICES, services);
      closeModal();
      renderServicesPage();
    });
  }

  /* ============================================================
     REPORTS PAGE
     ============================================================ */
  function getReportDateRange() {
    const range = document.getElementById("repRange").value;
    const fromEl = document.getElementById("repFrom");
    const toEl = document.getElementById("repTo");
    fromEl.style.display = range === "custom" ? "" : "none";
    toEl.style.display = range === "custom" ? "" : "none";
    if (range === "today") return { from: daysAgo(0), to: daysAgo(0) };
    if (range === "last7") return { from: daysAgo(6), to: daysAgo(0) };
    if (range === "last30") return { from: daysAgo(29), to: daysAgo(0) };
    if (range === "custom") return { from: fromEl.value, to: toEl.value };
    return { from: "", to: "" };
  }

  function populateReportFilterOptions() {
    const staff = load(KEY_STAFF, SEED_STAFF);
    const services = load(KEY_SERVICES, SEED_SERVICES);
    document.getElementById("repStaff").innerHTML = `<option value="">${t("filters.all")} - ${t("th.staff")}</option>` + staff.map((s) => `<option value="${s.name}">${s.name}</option>`).join("");
    document.getElementById("repService").innerHTML = `<option value="">${t("filters.all")} - ${t("deal.colService")}</option>` + services.map((s) => `<option value="${s.name}">${s.name}</option>`).join("");
    document.getElementById("repPayment").innerHTML = `<option value="">${t("filters.all")} - ${t("th.payment")}</option>` + ["Cash", "ABA", "ACLEDA", "Credit Card", "VIP Balance", "Other"].map((p) => `<option value="${p}">${p}</option>`).join("");
    document.getElementById("repSource").innerHTML = `<option value="">${t("reports.sourceOptional")}</option>` +
      ["Walk-in", "Facebook", "TikTok", "Telegram", "Referral", "Existing Customer", "Website", "Other"].map((s) => `<option value="${s}">${s}</option>`).join("");
  }

  function renderReportsPage() {
    populateReportFilterOptions();
    renderReportsAnalytics();
    applyReportFilters();
  }

  function setupReportTabs() {
    document.querySelectorAll("#reportTabs .report-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#reportTabs .report-tab").forEach((b) => b.classList.toggle("active", b === btn));
        const tab = btn.dataset.reportTab;
        document.querySelectorAll(".report-tab-content").forEach((c) => c.classList.toggle("active", c.id === "reportTab-" + tab));
      });
    });
  }

  function setupReportFilters() {
    ["repRange", "repFrom", "repTo", "repStaff", "repService", "repPayment", "repCustomerType", "repSource"].forEach((id) => {
      document.getElementById(id).addEventListener("change", applyReportFilters);
    });
    document.getElementById("clearRepFilters").addEventListener("click", () => {
      document.getElementById("repRange").value = "last7";
      ["repFrom", "repTo", "repStaff", "repService", "repPayment", "repCustomerType", "repSource"].forEach((id) => { document.getElementById(id).value = ""; });
      applyReportFilters();
    });
    setupReportTabs();
    setupReportExport();
  }

  function kpiGridHtml(items) {
    return items.map((k) => `<div class="kpi-card ${k.gold ? "gold" : ""}"><div class="kpi-label">${k.label}</div><div class="kpi-value">${k.value}</div></div>`).join("");
  }
  function reportLineHtml(name, val, strongClass) {
    return `<div class="report-line"><span>${name}</span><strong class="${strongClass || ""}">${val}</strong></div>`;
  }
  function reportLinesOrNone(entries) {
    return entries.length ? entries.join("") : `<div class="report-line"><span>—</span></div>`;
  }

  function applyReportFilters() {
    const { from, to } = getReportDateRange();
    const staffF = document.getElementById("repStaff").value;
    const serviceF = document.getElementById("repService").value;
    const paymentF = document.getElementById("repPayment").value;
    const sourceF = document.getElementById("repSource").value;
    const custTypeF = document.getElementById("repCustomerType").value;

    const allCustomers = load(KEY_CUSTOMERS, SEED_CUSTOMERS);
    const customerTypeById = {};
    allCustomers.forEach((c) => { customerTypeById[c.id] = c.type; });

    const allTxsEver = load(KEY_TRANSACTIONS, []);
    let txs = allTxsEver.filter((tx) => tx.status === "Completed" && inRange(tx.date, from, to));
    if (paymentF) txs = txs.filter((tx) => tx.payment === paymentF);
    if (sourceF) txs = txs.filter((tx) => tx.source === sourceF);
    if (staffF) txs = txs.filter((tx) => tx.services.some((r) => r.staff === staffF));
    if (serviceF) txs = txs.filter((tx) => tx.services.some((r) => r.service === serviceF));
    if (custTypeF) txs = txs.filter((tx) => customerTypeById[tx.customerId] === custTypeF);

    const allRows = [];
    txs.forEach((tx) => {
      // Proportional share of this transaction's line amounts that counts as new revenue (i.e.
      // excludes whatever fraction was paid from an existing VIP balance) - used only for the
      // money figures in the Sales & Payment breakdowns below, never for incentive math.
      const revenueRatio = tx.grandTotal > 0 ? revenueOf(tx) / tx.grandTotal : 1;
      tx.services.forEach((r) => {
        if (staffF && r.staff !== staffF) return;
        if (serviceF && r.service !== serviceF) return;
        allRows.push({ ...r, txId: tx.id, payment: tx.payment, customerId: tx.customerId, revenueRatio });
      });
    });

    // Revenue rule: VIP Package Balance redemption is NOT new income (already recognized as
    // revenue when the package was purchased/topped up) - see revenueOf(). VIP Package Purchase
    // and VIP Top-Up transactions always have vipDeduction = 0, so they still count in full.
    const totalSales = txs.reduce((sum, tx) => sum + revenueOf(tx), 0);
    const numCustomers = new Set(txs.map((tx) => tx.customerId)).size;

    const serviceTxs = txs.filter((tx) => (tx.txType || "service") === "service");
    // A "visit" is a completed salon SERVICE transaction only - VIP Package Purchase/Top-Up alone
    // does not create a visit.
    const numVisits = serviceTxs.length;
    const vipTxs = txs.filter((tx) => tx.txType === "vip_purchase" || tx.txType === "vip_topup");
    const serviceRevenue = serviceTxs.reduce((sum, tx) => sum + revenueOf(tx), 0);
    const vipPackageSales = vipTxs.reduce((sum, tx) => sum + revenueOf(tx), 0);
    // Operational metric only - value of services paid using an existing VIP balance. Never added
    // to revenue totals above; shown separately so Owner can see redemption activity.
    const vipBalanceUsed = txs.reduce((sum, tx) => sum + (tx.vipDeduction || 0), 0);

    const customersForVipBalance = custTypeF ? allCustomers.filter((c) => c.type === custTypeF) : allCustomers;
    const vipBalanceOutstanding = customersForVipBalance.filter((c) => c.type === "vip").reduce((sum, c) => sum + (c.vipBalance || 0), 0);

    /* ---------------- OVERVIEW TAB ---------------- */
    document.getElementById("reportKpiGrid").innerHTML = kpiGridHtml([
      { label: t("reports.totalSales"), value: fmt(totalSales), gold: true },
      { label: t("reports.serviceRevenue"), value: fmt(serviceRevenue) },
      { label: t("reports.vipPackageSales"), value: fmt(vipPackageSales), gold: true },
      { label: t("reports.numCustomers"), value: numCustomers },
      { label: t("reports.numVisits"), value: numVisits },
      { label: t("reports.vipBalanceOutstanding"), value: fmt(vipBalanceOutstanding) }
    ]);

    document.getElementById("reportRevenueBreakdown").innerHTML =
      reportLineHtml(t("reports.serviceRevenue"), fmt(serviceRevenue)) +
      reportLineHtml(t("reports.vipPackageSales"), fmt(vipPackageSales)) +
      reportLineHtml(t("reports.totalRevenue"), fmt(serviceRevenue + vipPackageSales), "revenue-total") +
      reportLineHtml(t("reports.vipBalanceUsed"), fmt(vipBalanceUsed), "vip-balance-used-line");

    renderBarChart("chartSalesTrend", buildSalesTrend(from, to, allTxsEver, custTypeF, customerTypeById));

    const popularSvcCount = {};
    allRows.forEach((r) => { popularSvcCount[r.service] = (popularSvcCount[r.service] || 0) + (r.qty || 1); });
    const popular = Object.entries(popularSvcCount).sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([name, count]) => ({ label: name, value: count }));
    renderBarChart("chartPopularServices", popular.length ? popular : [{ label: t("common.none"), value: 0 }]);

    /* ---------------- SALES & PAYMENT TAB ---------------- */
    document.getElementById("reportSalesKpiGrid").innerHTML = kpiGridHtml([
      { label: t("reports.serviceRevenue"), value: fmt(serviceRevenue) },
      { label: t("reports.vipPackageSales"), value: fmt(vipPackageSales) },
      { label: t("reports.totalRevenue"), value: fmt(serviceRevenue + vipPackageSales), gold: true }
    ]);
    renderBarChart("chartSalesTrendSales", buildSalesTrend(from, to, allTxsEver, custTypeF, customerTypeById));

    const byService = {};
    allRows.forEach((r) => { byService[r.service] = (byService[r.service] || 0) + r.price * r.qty * r.revenueRatio; });
    document.getElementById("reportSalesByService").innerHTML = reportLinesOrNone(
      Object.entries(byService).sort((a, b) => b[1] - a[1]).map(([name, val]) => reportLineHtml(name, fmt(val)))
    );

    const bySalesStaff = {};
    allRows.forEach((r) => {
      if (!r.staff) return;
      bySalesStaff[r.staff] = (bySalesStaff[r.staff] || 0) + r.price * r.qty * r.revenueRatio;
    });
    document.getElementById("reportSalesByStaff").innerHTML = reportLinesOrNone(
      Object.entries(bySalesStaff).sort((a, b) => b[1] - a[1]).map(([name, val]) => reportLineHtml(name, fmt(val)))
    );

    const byPayment = {};
    txs.forEach((tx) => { byPayment[tx.payment || "—"] = (byPayment[tx.payment || "—"] || 0) + revenueOf(tx); });
    document.getElementById("reportPaymentMethod").innerHTML = reportLinesOrNone(
      Object.entries(byPayment).sort((a, b) => b[1] - a[1]).map(([name, val]) => reportLineHtml(name, fmt(val)))
    );

    /* ---------------- CUSTOMERS TAB ---------------- */
    renderReportCustomersTab({ from, to, custTypeF, allCustomers, allTxsEver, txs });

    /* ---------------- STAFF & INCENTIVE TAB ---------------- */
    renderReportStaffTab({ from, to, staffF });
  }

  function buildSalesTrend(from, to, allTxsEver, custTypeF, customerTypeById) {
    const days = [];
    const start = from || daysAgo(6);
    const end = to || daysAgo(0);
    // Parse/iterate in UTC (matching how daysAgo()/tx.date strings are generated via
    // toISOString()) instead of local-midnight + toISOString(), which previously shifted every
    // date back by one day in timezones ahead of UTC (e.g. UTC+7) - causing "today" to silently
    // drop off the trend and undercounting revenue that was actually recorded today.
    let d = new Date(start + "T00:00:00Z");
    const endD = new Date(end + "T00:00:00Z");
    if (isNaN(d) || isNaN(endD) || d > endD) {
      for (let i = 6; i >= 0; i--) days.push(daysAgo(i));
    } else {
      while (d <= endD && days.length < 31) {
        days.push(d.toISOString().slice(0, 10));
        d.setUTCDate(d.getUTCDate() + 1);
      }
    }
    const completed = allTxsEver.filter((tx) => tx.status === "Completed" && (!custTypeF || customerTypeById[tx.customerId] === custTypeF));
    return days.map((dt) => ({
      label: dt.slice(5),
      value: +completed.filter((tx) => tx.date === dt).reduce((s, tx) => s + revenueOf(tx), 0).toFixed(2),
      isMoney: true
    }));
  }

  function renderReportCustomersTab(ctx) {
    const { from, to, custTypeF, allCustomers, allTxsEver, txs } = ctx;
    const customersFiltered = custTypeF ? allCustomers.filter((c) => c.type === custTypeF) : allCustomers;
    const filteredIds = new Set(customersFiltered.map((c) => c.id));

    const totalCustomers = customersFiltered.length;
    const normalCustomers = customersFiltered.filter((c) => c.type !== "vip").length;
    const vipCustomers = customersFiltered.filter((c) => c.type === "vip").length;
    const newVipCustomers = customersFiltered.filter((c) => c.type === "vip" && (c.packageHistory || []).some((p) => p.type === "purchase" && inRange(p.date, from, to))).length;
    // "Visit" = a completed salon SERVICE transaction only - VIP Package Purchase/Top-Up alone is
    // not a visit. revenueVisitsInRange (all completed tx types) is kept separately below for
    // Top Customers by Revenue Contribution, which SHOULD include VIP purchases/top-ups.
    const revenueVisitsInRange = txs.filter((tx) => filteredIds.has(tx.customerId));
    const visitsInRange = revenueVisitsInRange.filter(isServiceTx);
    const totalVisits = visitsInRange.length;
    const avgVisits = totalCustomers ? (totalVisits / totalCustomers) : 0;

    document.getElementById("reportCustomersKpiGrid").innerHTML = kpiGridHtml([
      { label: t("reports.totalCustomers"), value: totalCustomers, gold: true },
      { label: t("reports.normalCustomers"), value: normalCustomers },
      { label: t("reports.vipCustomers"), value: vipCustomers },
      { label: t("reports.newVipCustomers"), value: newVipCustomers },
      { label: t("reports.totalVisits"), value: totalVisits },
      { label: t("reports.avgVisitsPerCustomer"), value: avgVisits.toFixed(1) }
    ]);

    // New vs Returning: a customer is "new" if their earliest-ever completed transaction falls in range
    let newCount = 0, returningCount = 0;
    const customersWithVisit = new Set(visitsInRange.map((tx) => tx.customerId));
    customersWithVisit.forEach((cid) => {
      // "First visit" = earliest completed SERVICE transaction (VIP purchase/top-up never counts).
      const custAllTxs = allTxsEver.filter((tx) => tx.customerId === cid && tx.status === "Completed" && isServiceTx(tx)).sort((a, b) => a.date.localeCompare(b.date));
      const firstDate = custAllTxs.length ? custAllTxs[0].date : null;
      if (firstDate && inRange(firstDate, from, to)) newCount++; else returningCount++;
    });
    document.getElementById("reportNewVsReturning").innerHTML =
      reportLineHtml(t("reports.newCustomers"), newCount) +
      reportLineHtml(t("reports.returningCustomers"), returningCount);

    // Visit frequency buckets (all-time SERVICE visit count only, for customers in the filtered type)
    let bucket1 = 0, bucket2to3 = 0, bucket4plus = 0;
    customersFiltered.forEach((c) => {
      const count = allTxsEver.filter((tx) => tx.customerId === c.id && tx.status === "Completed" && isServiceTx(tx)).length;
      if (count <= 0) return;
      if (count === 1) bucket1++;
      else if (count <= 3) bucket2to3++;
      else bucket4plus++;
    });
    document.getElementById("reportVisitFrequency").innerHTML =
      reportLineHtml(t("reports.visitFreq1"), bucket1) +
      reportLineHtml(t("reports.visitFreq2to3"), bucket2to3) +
      reportLineHtml(t("reports.visitFreq4plus"), bucket4plus);

    // Top Customers by Revenue Contribution (within date range, filtered) - new money paid only:
    // service payments via cash/bank/card/etc PLUS VIP Package Purchase/Top-Up, excluding any
    // later VIP balance redemption (see revenueOf()). Uses revenueVisitsInRange (all completed
    // transaction types) since VIP purchases/top-ups ARE revenue even though they aren't "visits".
    const spendById = {};
    revenueVisitsInRange.forEach((tx) => { spendById[tx.customerId] = (spendById[tx.customerId] || 0) + revenueOf(tx); });
    const topCustomers = Object.entries(spendById).sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([cid, val]) => {
        const c = allCustomers.find((x) => x.id === cid);
        return reportLineHtml(c ? c.name : cid, fmt(val));
      });
    document.getElementById("reportTopCustomers").innerHTML = reportLinesOrNone(topCustomers);

    // VIP balance summary
    const vipCustomersFull = customersFiltered.filter((c) => c.type === "vip");
    const totalVipBalance = vipCustomersFull.reduce((sum, c) => sum + (c.vipBalance || 0), 0);
    const vipLines = vipCustomersFull.filter((c) => (c.vipBalance || 0) > 0).sort((a, b) => (b.vipBalance || 0) - (a.vipBalance || 0)).slice(0, 6)
      .map((c) => reportLineHtml(c.name, fmt(c.vipBalance || 0)));
    document.getElementById("reportVipBalanceSummary").innerHTML =
      reportLineHtml(t("reports.vipBalanceOutstanding"), fmt(totalVipBalance), "revenue-total") +
      reportLinesOrNone(vipLines);
  }

  function reportDataTableHtml(headers, rows) {
    const thead = `<tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>`;
    const tbody = rows.length
      ? rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")
      : `<tr><td colspan="${headers.length}">${t("common.none")}</td></tr>`;
    return { thead, tbody };
  }

  function renderReportStaffTab(ctx) {
    const { from, to, staffF } = ctx;
    const staffList = load(KEY_STAFF, SEED_STAFF);
    const recordsInRange = load(KEY_RECORDS, []).filter((r) => inRange(r.date, from, to) && (!staffF || r.staff === staffF));

    const serviceRecords = recordsInRange.filter((r) => (r.incentiveCategory || "service") === "service");
    const salesRecords = recordsInRange.filter((r) => r.incentiveCategory === "sales");

    const serviceIncentiveTotal = serviceRecords.reduce((sum, r) => sum + r.incentiveAmount, 0);
    const salesIncentiveTotal = salesRecords.reduce((sum, r) => sum + r.incentiveAmount, 0);

    document.getElementById("reportStaffKpiGrid").innerHTML = kpiGridHtml([
      { label: t("reports.totalServiceIncentive"), value: fmt(serviceIncentiveTotal) },
      { label: t("reports.totalSalesIncentive"), value: fmt(salesIncentiveTotal) },
      { label: t("reports.totalIncentive"), value: fmt(serviceIncentiveTotal + salesIncentiveTotal), gold: true }
    ]);

    // Service Incentive Summary: Staff | Services Completed | Service Value Performed (full line
    // value regardless of payment method - VIP-balance-paid services still count here since the
    // service WAS performed; this is intentionally different from "Sales by Service" revenue,
    // which excludes VIP balance redemption) | Incentive Earned
    const svcByStaff = {};
    serviceRecords.forEach((r) => {
      if (!svcByStaff[r.staff]) svcByStaff[r.staff] = { count: 0, sales: 0, incentive: 0 };
      svcByStaff[r.staff].count += r.qty || 1;
      svcByStaff[r.staff].sales += (r.price || 0) * (r.qty || 1);
      svcByStaff[r.staff].incentive += r.incentiveAmount || 0;
    });
    const svcRows = Object.entries(svcByStaff).sort((a, b) => b[1].incentive - a[1].incentive)
      .map(([name, d]) => [name, d.count, fmt(d.sales), fmt(d.incentive)]);
    const svcTable = reportDataTableHtml([t("th.staff"), t("th.servicesCompleted"), t("th.serviceSales"), t("th.incentiveEarned")], svcRows);
    document.getElementById("reportServiceIncentiveTable").querySelector("thead").innerHTML = svcTable.thead;
    document.getElementById("reportServiceIncentiveTable").querySelector("tbody").innerHTML = svcTable.tbody;

    // Sales Incentive Summary: Sales Staff | Sales Closed | Sales Value | Incentive Earned
    const salesByStaff = {};
    salesRecords.forEach((r) => {
      if (!salesByStaff[r.staff]) salesByStaff[r.staff] = { count: 0, value: 0, incentive: 0 };
      salesByStaff[r.staff].count += 1;
      salesByStaff[r.staff].value += r.price || 0;
      salesByStaff[r.staff].incentive += r.incentiveAmount || 0;
    });
    const salesRows = Object.entries(salesByStaff).sort((a, b) => b[1].incentive - a[1].incentive)
      .map(([name, d]) => [name, d.count, fmt(d.value), fmt(d.incentive)]);
    const salesTable = reportDataTableHtml([t("th.salesStaff"), t("th.salesClosed"), t("th.salesValue"), t("th.incentiveEarned")], salesRows);
    document.getElementById("reportSalesIncentiveTable").querySelector("thead").innerHTML = salesTable.thead;
    document.getElementById("reportSalesIncentiveTable").querySelector("tbody").innerHTML = salesTable.tbody;

    // Combined Staff Summary: Staff | Service Incentive | Sales Incentive | Total Incentive
    const combinedNames = new Set([...Object.keys(svcByStaff), ...Object.keys(salesByStaff)]);
    if (staffF) combinedNames.add(staffF);
    const combinedRows = [...combinedNames].filter((n) => staffList.some((s) => s.name === n) || svcByStaff[n] || salesByStaff[n]).map((name) => {
      const svcInc = svcByStaff[name] ? svcByStaff[name].incentive : 0;
      const salesInc = salesByStaff[name] ? salesByStaff[name].incentive : 0;
      return [name, fmt(svcInc), fmt(salesInc), fmt(svcInc + salesInc)];
    }).sort((a, b) => parseFloat(b[3].replace(/[^0-9.-]/g, "")) - parseFloat(a[3].replace(/[^0-9.-]/g, "")));
    const combinedTable = reportDataTableHtml([t("th.staff"), t("th.serviceIncentiveCol"), t("th.salesIncentiveCol"), t("th.totalIncentiveCol")], combinedRows);
    document.getElementById("reportCombinedStaffTable").querySelector("thead").innerHTML = combinedTable.thead;
    document.getElementById("reportCombinedStaffTable").querySelector("tbody").innerHTML = combinedTable.tbody;
  }

  /* ============================================================
     REPORTS: EXPORT TO EXCEL
     ============================================================ */
  function computeReportExportData() {
    const { from, to } = getReportDateRange();
    const staffF = document.getElementById("repStaff").value;
    const serviceF = document.getElementById("repService").value;
    const paymentF = document.getElementById("repPayment").value;
    const sourceF = document.getElementById("repSource").value;
    const custTypeF = document.getElementById("repCustomerType").value;

    const allCustomers = load(KEY_CUSTOMERS, SEED_CUSTOMERS);
    const customerById = {};
    allCustomers.forEach((c) => { customerById[c.id] = c; });
    const customerTypeById = {};
    allCustomers.forEach((c) => { customerTypeById[c.id] = c.type; });

    const allTxsEver = load(KEY_TRANSACTIONS, []);
    let txs = allTxsEver.filter((tx) => tx.status === "Completed" && inRange(tx.date, from, to));
    if (paymentF) txs = txs.filter((tx) => tx.payment === paymentF);
    if (sourceF) txs = txs.filter((tx) => tx.source === sourceF);
    if (staffF) txs = txs.filter((tx) => tx.services.some((r) => r.staff === staffF));
    if (serviceF) txs = txs.filter((tx) => tx.services.some((r) => r.service === serviceF));
    if (custTypeF) txs = txs.filter((tx) => customerTypeById[tx.customerId] === custTypeF);

    const allRows = [];
    txs.forEach((tx) => {
      const revenueRatio = tx.grandTotal > 0 ? revenueOf(tx) / tx.grandTotal : 1;
      tx.services.forEach((r) => {
        if (staffF && r.staff !== staffF) return;
        if (serviceF && r.service !== serviceF) return;
        allRows.push({ ...r, txId: tx.id, payment: tx.payment, customerId: tx.customerId, revenueRatio });
      });
    });

    /* ---- Overview ---- */
    // Revenue rule: VIP Package Balance redemption is NOT new income - see revenueOf().
    const totalSales = txs.reduce((sum, tx) => sum + revenueOf(tx), 0);
    const numCustomers = new Set(txs.map((tx) => tx.customerId)).size;
    const serviceTxs = txs.filter((tx) => (tx.txType || "service") === "service");
    const vipTxs = txs.filter((tx) => tx.txType === "vip_purchase" || tx.txType === "vip_topup");
    // "Visit" = completed SERVICE transaction only - VIP Package Purchase/Top-Up alone is not a visit.
    const numVisits = serviceTxs.length;
    const serviceRevenue = serviceTxs.reduce((sum, tx) => sum + revenueOf(tx), 0);
    const vipPackageSales = vipTxs.reduce((sum, tx) => sum + revenueOf(tx), 0);
    const vipBalanceUsed = txs.reduce((sum, tx) => sum + (tx.vipDeduction || 0), 0);
    const customersForBalance = custTypeF ? allCustomers.filter((c) => c.type === custTypeF) : allCustomers;
    const vipBalanceOutstanding = customersForBalance.filter((c) => c.type === "vip").reduce((sum, c) => sum + (c.vipBalance || 0), 0);
    const salesTrend = buildSalesTrend(from, to, allTxsEver, custTypeF, customerTypeById);
    const popularCount = {};
    allRows.forEach((r) => { popularCount[r.service] = (popularCount[r.service] || 0) + (r.qty || 1); });
    const popularServices = Object.entries(popularCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count }));

    const overview = {
      totalSales, serviceRevenue, vipPackageSales, numCustomers, numVisits, vipBalanceOutstanding, vipBalanceUsed,
      salesTrend, popularServices,
      revenueBreakdown: { serviceRevenue, vipPackageSales, total: serviceRevenue + vipPackageSales, vipBalanceUsed }
    };

    /* ---- Sales & Payment (one row per transaction) ---- */
    const salesRows = txs.map((tx) => {
      const isService = (tx.txType || "service") === "service";
      const isVip = tx.txType === "vip_purchase" || tx.txType === "vip_topup";
      const serviceStaffList = [...new Set(tx.services.map((r) => r.staff).filter(Boolean))];
      const servicesStr = tx.services.filter((r) => r.service).map((r) => (r.qty > 1 ? `${r.service} x${r.qty}` : r.service)).join(", ");
      return {
        date: tx.date,
        customer: tx.customerName || "—",
        phone: tx.phone || "—",
        services: servicesStr || (isVip ? (tx.txType === "vip_topup" ? "VIP Top-Up" : "VIP Package Purchase") : "—"),
        serviceStaff: serviceStaffList.join(", ") || "—",
        salesStaff: tx.salesStaff || "—",
        serviceRevenue: isService ? revenueOf(tx) : 0,
        vipPackageSale: isVip ? revenueOf(tx) : 0,
        vipBalanceUsed: tx.vipDeduction || 0,
        payment: tx.payment || "—",
        total: tx.grandTotal || 0
      };
    }).sort((a, b) => a.date.localeCompare(b.date));

    /* ---- Customers (only customers with a matching transaction under the current filters) ---- */
    const filteredCustomerIds = new Set(txs.map((tx) => tx.customerId));
    const customersForExport = allCustomers.filter((c) => filteredCustomerIds.has(c.id));
    const customerRows = customersForExport.map((c) => {
      const custTxsFiltered = txs.filter((tx) => tx.customerId === c.id);
      // Completed Service Visits only - VIP Package Purchase/Top-Up alone is not a visit.
      const totalVisits = custTxsFiltered.filter(isServiceTx).length;
      const lastVisit = custTxsFiltered.reduce((max, tx) => (tx.date > max ? tx.date : max), "");
      // Revenue Contribution = new money paid (service payments + VIP purchase/top-up), excluding
      // any later VIP balance redemption - see revenueOf().
      const revenueContribution = custTxsFiltered.reduce((sum, tx) => sum + revenueOf(tx), 0);
      const vipPurchased = (c.packageHistory || []).filter((p) => p.type === "purchase" && inRange(p.date, from, to)).reduce((sum, p) => sum + (p.amount || 0), 0);
      return {
        name: c.name, phone: c.phone, type: c.type === "vip" ? "VIP" : "Normal",
        totalVisits, lastVisit: lastVisit || "—", revenueContribution,
        vipPurchased, vipBalance: c.type === "vip" ? (c.vipBalance || 0) : null
      };
    }).sort((a, b) => b.revenueContribution - a.revenueContribution);

    /* ---- Staff & Incentive ---- */
    const staffList = load(KEY_STAFF, SEED_STAFF);
    const recordsInRange = load(KEY_RECORDS, []).filter((r) => inRange(r.date, from, to) && (!staffF || r.staff === staffF));
    const svcByStaff = {}, salesByStaff = {};
    recordsInRange.forEach((r) => {
      if ((r.incentiveCategory || "service") === "service") {
        if (!svcByStaff[r.staff]) svcByStaff[r.staff] = { count: 0, sales: 0, incentive: 0 };
        svcByStaff[r.staff].count += r.qty || 1;
        svcByStaff[r.staff].sales += (r.price || 0) * (r.qty || 1);
        svcByStaff[r.staff].incentive += r.incentiveAmount || 0;
      } else if (r.incentiveCategory === "sales") {
        if (!salesByStaff[r.staff]) salesByStaff[r.staff] = { count: 0, value: 0, incentive: 0 };
        salesByStaff[r.staff].count += 1;
        salesByStaff[r.staff].value += r.price || 0;
        salesByStaff[r.staff].incentive += r.incentiveAmount || 0;
      }
    });
    const staffNames = new Set([...Object.keys(svcByStaff), ...Object.keys(salesByStaff)]);
    const staffRows = [...staffNames].map((name) => {
      const s = staffList.find((x) => x.name === name);
      const svc = svcByStaff[name] || { count: 0, sales: 0, incentive: 0 };
      const sal = salesByStaff[name] || { count: 0, value: 0, incentive: 0 };
      return {
        name,
        type: s ? (s.type === "both" ? "Both" : s.type === "sales" ? "Sales" : "Service") : "—",
        servicesCompleted: svc.count, serviceSales: svc.sales, serviceIncentive: svc.incentive,
        salesClosed: sal.count, salesValue: sal.value, salesIncentive: sal.incentive,
        totalIncentive: svc.incentive + sal.incentive
      };
    }).sort((a, b) => b.totalIncentive - a.totalIncentive);

    return { meta: { from, to, staffF, serviceF, paymentF, sourceF, custTypeF }, overview, salesRows, customerRows, staffRows };
  }

  function reportExportFilename(tab, to) {
    const base = "Engly_Khun_Salon";
    const dateStr = to || daysAgo(0);
    if (tab === "overview") return `${base}_Overview_Report_${dateStr}.xlsx`;
    if (tab === "sales") return `${base}_Sales_Payment_Report_${dateStr}.xlsx`;
    if (tab === "customers") return `${base}_Customers_Report_${dateStr}.xlsx`;
    if (tab === "staff") return `${base}_Staff_Incentive_${dateStr.slice(0, 7)}.xlsx`;
    return `${base}_Report_${dateStr}.xlsx`;
  }

  function currentReportTab() {
    const active = document.querySelector("#reportTabs .report-tab.active");
    return active ? active.dataset.reportTab : "overview";
  }

  async function exportReportsExcel() {
    if (typeof ExcelJS === "undefined") {
      showToast(t("reports.exportLibMissing"), "error");
      return;
    }
    const tab = currentReportTab();
    const data = computeReportExportData();
    const CURRENCY_FMT = '"$"#,##0.00';

    const wb = new ExcelJS.Workbook();
    wb.creator = "Engly Khun Salon Dashboard";
    wb.created = new Date();

    function styleHeaderRow(sheet) {
      const headerRow = sheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFC9A227" } };
        cell.alignment = { vertical: "middle" };
      });
    }

    if (tab === "overview") {
      const kpiSheet = wb.addWorksheet("Overview Summary");
      kpiSheet.columns = [{ header: "Metric", key: "metric", width: 30 }, { header: "Value", key: "value", width: 20 }];
      styleHeaderRow(kpiSheet);
      [
        ["Total Sales", data.overview.totalSales, true],
        ["Service Revenue", data.overview.serviceRevenue, true],
        ["VIP Package Sales", data.overview.vipPackageSales, true],
        ["Number of Customers", data.overview.numCustomers, false],
        ["Number of Visits", data.overview.numVisits, false],
        ["VIP Balance Outstanding", data.overview.vipBalanceOutstanding, true],
        ["VIP Balance Used (not counted as revenue)", data.overview.vipBalanceUsed, true]
      ].forEach(([metric, value, isCurrency]) => {
        const r = kpiSheet.addRow({ metric, value });
        if (isCurrency) r.getCell("value").numFmt = CURRENCY_FMT;
      });

      const trendSheet = wb.addWorksheet("Sales Trend");
      trendSheet.columns = [{ header: "Date", key: "date", width: 16 }, { header: "Sales", key: "sales", width: 16 }];
      styleHeaderRow(trendSheet);
      data.overview.salesTrend.forEach((d) => {
        const r = trendSheet.addRow({ date: d.label, sales: d.value });
        r.getCell("sales").numFmt = CURRENCY_FMT;
      });

      const popularSheet = wb.addWorksheet("Popular Services");
      popularSheet.columns = [{ header: "Service", key: "service", width: 28 }, { header: "Count", key: "count", width: 14 }];
      styleHeaderRow(popularSheet);
      (data.overview.popularServices.length ? data.overview.popularServices : [{ name: "—", count: 0 }]).forEach((p) => popularSheet.addRow({ service: p.name, count: p.count }));

      const revSheet = wb.addWorksheet("Revenue Breakdown");
      revSheet.columns = [{ header: "Category", key: "cat", width: 28 }, { header: "Amount", key: "amt", width: 18 }];
      styleHeaderRow(revSheet);
      [
        ["Service Revenue", data.overview.revenueBreakdown.serviceRevenue],
        ["VIP Package Sales", data.overview.revenueBreakdown.vipPackageSales],
        ["Total Revenue", data.overview.revenueBreakdown.total],
        ["VIP Balance Used (operational only, not revenue)", data.overview.revenueBreakdown.vipBalanceUsed]
      ].forEach(([cat, amt]) => {
        const r = revSheet.addRow({ cat, amt });
        r.getCell("amt").numFmt = CURRENCY_FMT;
        if (cat === "Total Revenue") r.eachCell((cell) => { cell.font = { bold: true }; });
      });
    }

    if (tab === "sales") {
      const sheet = wb.addWorksheet("Sales & Payment");
      sheet.columns = [
        { header: "Date", key: "date", width: 14 },
        { header: "Customer", key: "customer", width: 22 },
        { header: "Phone", key: "phone", width: 16 },
        { header: "Services", key: "services", width: 34 },
        { header: "Service Staff", key: "serviceStaff", width: 20 },
        { header: "Sales Staff", key: "salesStaff", width: 18 },
        { header: "Service Revenue", key: "serviceRevenue", width: 16 },
        { header: "VIP Package Sale", key: "vipPackageSale", width: 16 },
        { header: "VIP Balance Used", key: "vipBalanceUsed", width: 16 },
        { header: "Payment Method", key: "payment", width: 16 },
        { header: "Total", key: "total", width: 14 }
      ];
      styleHeaderRow(sheet);
      data.salesRows.forEach((row) => {
        const r = sheet.addRow(row);
        r.getCell("serviceRevenue").numFmt = CURRENCY_FMT;
        r.getCell("vipPackageSale").numFmt = CURRENCY_FMT;
        r.getCell("vipBalanceUsed").numFmt = CURRENCY_FMT;
        r.getCell("total").numFmt = CURRENCY_FMT;
      });
      if (!data.salesRows.length) sheet.addRow({ date: "—" });
    }

    if (tab === "customers") {
      const sheet = wb.addWorksheet("Customers");
      sheet.columns = [
        { header: "Customer Name", key: "name", width: 22 },
        { header: "Phone", key: "phone", width: 16 },
        { header: "Customer Type", key: "type", width: 14 },
        { header: "Completed Service Visits", key: "totalVisits", width: 18 },
        { header: "Last Visit", key: "lastVisit", width: 14 },
        { header: "Revenue Contribution", key: "revenueContribution", width: 18 },
        { header: "VIP Package Purchased", key: "vipPurchased", width: 20 },
        { header: "VIP Remaining Balance", key: "vipBalance", width: 20 }
      ];
      styleHeaderRow(sheet);
      data.customerRows.forEach((row) => {
        const r = sheet.addRow({ ...row, vipBalance: row.vipBalance === null ? "—" : row.vipBalance });
        r.getCell("revenueContribution").numFmt = CURRENCY_FMT;
        r.getCell("vipPurchased").numFmt = CURRENCY_FMT;
        if (row.vipBalance !== null) r.getCell("vipBalance").numFmt = CURRENCY_FMT;
      });
      if (!data.customerRows.length) sheet.addRow({ name: "—" });
    }

    if (tab === "staff") {
      const sheet = wb.addWorksheet("Staff & Incentive");
      sheet.columns = [
        { header: "Staff Name", key: "name", width: 20 },
        { header: "Staff Type", key: "type", width: 12 },
        { header: "Services Completed", key: "servicesCompleted", width: 16 },
        { header: "Service Value Performed", key: "serviceSales", width: 18 },
        { header: "Service Incentive", key: "serviceIncentive", width: 16 },
        { header: "Sales Closed", key: "salesClosed", width: 14 },
        { header: "Sales Value", key: "salesValue", width: 14 },
        { header: "Sales Incentive", key: "salesIncentive", width: 14 },
        { header: "Total Incentive", key: "totalIncentive", width: 16 }
      ];
      styleHeaderRow(sheet);
      data.staffRows.forEach((row) => {
        const r = sheet.addRow(row);
        ["serviceSales", "serviceIncentive", "salesValue", "salesIncentive", "totalIncentive"].forEach((k) => { r.getCell(k).numFmt = CURRENCY_FMT; });
      });
      if (!data.staffRows.length) sheet.addRow({ name: "—" });
    }

    const filename = reportExportFilename(tab, data.meta.to);
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(t("reports.exportSuccess"), "success");
  }

  function setupReportExport() {
    document.getElementById("exportReportExcelBtn").addEventListener("click", () => {
      exportReportsExcel().catch((e) => {
        console.error("Excel export failed:", e);
        showToast(t("reports.exportFailed"), "error");
      });
    });
  }

  /* ============================================================
     MODAL / SETTINGS / INIT
     ============================================================ */
  function openModal() { document.getElementById("modalOverlay").classList.add("show"); }
  function closeModal() {
    document.getElementById("modalOverlay").classList.remove("show");
    const box = document.getElementById("modalBox");
    if (box) box.classList.remove("modal-wide");
  }
  function setupModal() {
    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.getElementById("modalOverlay").addEventListener("click", (e) => { if (e.target.id === "modalOverlay") closeModal(); });
  }

  function setupNewDealForm() {
    document.getElementById("addServiceRowBtn").addEventListener("click", () => {
      dealRows.push(blankRow());
      renderDealRows();
      recalcDealTotals();
    });
    document.getElementById("dDiscount").addEventListener("input", recalcDealTotals);
    document.getElementById("dDiscountType").addEventListener("change", recalcDealTotals);
    document.getElementById("dSource").addEventListener("change", syncFormIntoActiveDeal);
    document.getElementById("dNotes").addEventListener("input", syncFormIntoActiveDeal);
    document.getElementById("dPayment").addEventListener("change", () => { syncFormIntoActiveDeal(); updateVipBalanceUI(); });
    document.getElementById("dSalesStaff").addEventListener("change", syncFormIntoActiveDeal);
    document.getElementById("dRemainingPayment").addEventListener("change", syncFormIntoActiveDeal);
    document.getElementById("saveCompleteBtn").addEventListener("click", requestCompleteActiveDeal);
    document.getElementById("addDealTabBtn").addEventListener("click", addNewDealTab);
  }

  function setupSettings() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setSettings({ lang: btn.dataset.lang });
        document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === btn.dataset.lang));
        fullRerender();
      });
    });
    document.getElementById("resetDataBtn").addEventListener("click", () => {
      if (!confirm("Reset all demo data? This cannot be undone.")) return;
      ALL_KEYS.concat([KEY_WEBSITE_BOOKINGS, KEY_ACTIVE_DEALS, KEY_ACTIVE_DEAL_CURRENT]).forEach((k) => localStorage.removeItem(k));
      initData();
      showToast(t("toast.reset"), "success");
      fullRerender();
      goToPage("overview");
    });
  }

  function syncSettingsUI() {
    const s = getSettings();
    document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === s.lang));
  }

  function fullRerender() {
    applyStaticI18n();
    syncSettingsUI();
    applyRole();
    updatePageTitle(currentPage());
    renderPage(currentPage());
  }

  document.addEventListener("DOMContentLoaded", () => {
    initData();
    setupNav();
    setupModal();
    setupNewDealForm();
    setupCustomerAutocomplete();
    setupTxFilters();
    setupReportFilters();
    setupSettings();
    setupLogin();

    applyStaticI18n();
    syncSettingsUI();

    const session = getSession();
    if (session && DEMO_ACCOUNTS.some((a) => a.username === session.username && a.role === session.role)) {
      setSettings({ role: session.role });
      applyRole();
      showAppScreen();
      goToPage("overview");
    } else {
      applyRole();
      showLoginScreen();
    }
  });
})();
