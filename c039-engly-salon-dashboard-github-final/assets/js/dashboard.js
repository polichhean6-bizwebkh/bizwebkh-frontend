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

  const SEED_STAFF = [
    { id: "sokha", name: "Sokha", role: "Senior Stylist", specialty: "Hair Styling", active: true },
    { id: "dara", name: "Dara", role: "Hair Color Specialist", specialty: "Hair Coloring / Treatment", active: true },
    { id: "sreyneang", name: "Sreyneang", role: "Nail Artist", specialty: "Nail Care", active: true },
    { id: "ratha", name: "Ratha", role: "Makeup Artist", specialty: "Makeup", active: true },
    { id: "lina", name: "Lina", role: "Beauty Therapist", specialty: "Facial", active: true }
  ];

  const SEED_SCHEMES = {
    sokha: [{ category: "Hair Styling", type: "percent", rate: 10 }, { category: "Hair Coloring", type: "percent", rate: 12 }],
    dara: [{ category: "Scalp Care", type: "fixed", rate: 3 }, { category: "Hair Treatment", type: "percent", rate: 10 }],
    sreyneang: [{ category: "Nail Care", type: "percent", rate: 15 }],
    ratha: [{ category: "Makeup", type: "percent", rate: 10 }],
    lina: [{ category: "Facial", type: "percent", rate: 10 }]
  };

  const SEED_CUSTOMERS = [
    { id: "CUS-001", name: "Sophea Ros", phone: "012 111 222", source: "Walk-in", notes: "" },
    { id: "CUS-002", name: "Dara Chan", phone: "012 222 333", source: "Facebook", notes: "" },
    { id: "CUS-003", name: "Lida Sok", phone: "012 333 444", source: "Walk-in", notes: "" },
    { id: "CUS-004", name: "Channary Pen", phone: "012 444 555", source: "Telegram", notes: "" },
    { id: "CUS-005", name: "Bopha Heng", phone: "097 512 884", source: "Walk-in", notes: "" },
    { id: "CUS-006", name: "Sina Ort", phone: "012 999 777", source: "Existing Customer", notes: "" },
    { id: "CUS-007", name: "Maly Chea", phone: "012 555 666", source: "Walk-in", notes: "" },
    { id: "CUS-008", name: "Rithy Van", phone: "012 000 111", source: "Other", notes: "" },
    { id: "CUS-009", name: "Chenda Ly", phone: "012 112 233", source: "TikTok", notes: "" },
    // Returning-customer demo records — used to showcase name/phone autocomplete
    { id: "CUS-010", name: "Bopha Chenda", phone: "097 234 561", source: "Facebook", notes: "" },
    { id: "CUS-011", name: "Bora Ly", phone: "097 345 671", source: "Walk-in", notes: "" },
    { id: "CUS-012", name: "Chenda CM", phone: "085 776 234", source: "Facebook", notes: "" },
    { id: "CUS-013", name: "Nak Sreyneang", phone: "010 998 221", source: "Referral", notes: "" },
    { id: "CUS-014", name: "Kanha CM", phone: "077 663 210", source: "Existing Customer", notes: "" }
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
    { id: "TX-006", customerId: "CUS-006", date: daysAgo(0), time: "14:00", payment: "VIP", discount: 5, status: "Completed",
      services: [
        row("Hair Wash & Dry", "Dara", 12, 1, { type: "fixed", rate: 2, amount: 2 }),
        row("Nail Gel", "Sreyneang", 18, 1, { type: "fixed", rate: 3, amount: 3 }),
        row("Facial", "Lina", 25, 1, { type: "fixed", rate: 4, amount: 4 })
      ] },
    { id: "TX-007", customerId: "CUS-007", date: daysAgo(0), time: "16:00", payment: "Cash", discount: 0, status: "Open",
      services: [row("Makeup", "", 20, 1)] },
    { id: "TX-008", customerId: "CUS-008", date: daysAgo(4), time: "10:00", payment: "Cash", discount: 0, status: "Cancelled",
      services: [row("Hair Cut & Styling", "Sokha", 8, 1)] },
    { id: "TX-009", customerId: "CUS-009", date: daysAgo(1), time: "11:00", payment: "ACLEDA", discount: 0, status: "Completed",
      services: [row("Lash / Brow Beauty", "Lina", 15, 1), row("Manicure", "Sreyneang", 7, 1)] },

    // ---- Returning-customer histories (Customer Lookup demo) ----
    ...buildHistorySeed("TX-BH", "CUS-005", 8,
      [{ service: "Hair Cut & Styling", staff: "Sokha" }, { service: "Hair Wash & Dry", staff: "Dara" }],
      ["Cash", "ABA"], 5, 9),
    ...buildHistorySeed("TX-BC", "CUS-010", 2,
      [{ service: "Manicure", staff: "Sreyneang" }], ["Cash"], 12, 20),
    ...buildHistorySeed("TX-BL", "CUS-011", 2,
      [{ service: "Hair Cut & Styling", staff: "Sokha" }], ["Cash"], 15, 25),
    ...buildHistorySeed("TX-CC", "CUS-012", 12,
      [{ service: "Nail Gel", staff: "Sreyneang" }, { service: "Manicure", staff: "Sreyneang" }],
      ["ABA", "Cash", "VIP"], 3, 7),
    ...buildHistorySeed("TX-NS", "CUS-013", 5,
      [{ service: "Facial", staff: "Lina" }, { service: "Makeup", staff: "Ratha" }],
      ["Cash", "ACLEDA"], 6, 11),
    ...buildHistorySeed("TX-KC", "CUS-014", 15,
      [{ service: "Hair Coloring", staff: "Dara" }, { service: "Hair Treatment", staff: "Dara" }],
      ["VIP", "ABA", "Cash"], 2, 6)
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

  function computeIncentiveForRow(staffName, category, price, qty) {
    const schemes = load(KEY_SCHEMES, SEED_SCHEMES);
    const staffList = load(KEY_STAFF, SEED_STAFF);
    const staffObj = staffList.find((s) => s.name === staffName);
    const lineTotal = (price || 0) * (qty || 1);
    if (!staffObj) return { type: "percent", rate: 0, amount: 0 };
    const rules = schemes[staffObj.id] || [];
    let rule = rules.find((r) => r.category === category);
    if (!rule) rule = { category, type: "percent", rate: 8 }; // fallback default
    const amount = rule.type === "fixed" ? +(rule.rate * (qty || 1)).toFixed(2) : +(lineTotal * (rule.rate / 100)).toFixed(2);
    return { type: rule.type, rate: rule.rate, amount };
  }

  function buildSeedTransactions() {
    return SEED_TRANSACTIONS_RAW.map((tx) => {
      const services = tx.services.map((r) => {
        if (r.incentiveAmount === undefined) {
          const calc = computeIncentiveForRow(r.staff, r.category, r.price, r.qty);
          r.incentiveType = calc.type;
          r.incentiveRate = calc.rate;
          r.incentiveAmount = calc.amount;
        }
        return r;
      });
      const subtotal = services.reduce((sum, r) => sum + computeLineTotal(r), 0);
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
          status: "Confirmed"
        });
      });
    });
    return records;
  }

  function initData() {
    if (!localStorage.getItem(KEY_SERVICES)) save(KEY_SERVICES, SEED_SERVICES);
    if (!localStorage.getItem(KEY_STAFF)) save(KEY_STAFF, SEED_STAFF);
    if (!localStorage.getItem(KEY_SCHEMES)) save(KEY_SCHEMES, SEED_SCHEMES);
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

      "toast.saved": "រក្សាទុកបានជោគជ័យ",
      "toast.dealSaved": "រក្សាទុកប្រតិបត្តិការបានជោគជ័យ",
      "toast.dealSavedOpen": "រក្សាទុកជាមិនទាន់បិទ — សូមកំណត់បុគ្គលិកគ្រប់សេវាកម្មដើម្បីបិទ",
      "toast.needStaffToComplete": "សូមកំណត់បុគ្គលិកគ្រប់សេវាកម្មមុននឹងបិទប្រតិបត្តិការ",
      "toast.needOneService": "សូមបន្ថែមសេវាកម្មយ៉ាងតិចមួយ",
      "toast.completed": "ប្រតិបត្តិការត្រូវបានបិទ",
      "toast.cancelled": "ប្រតិបត្តិការត្រូវបានលុបចោល",
      "toast.reset": "ទិន្នន័យសាកល្បងត្រូវបានកំណត់ឡើងវិញ",

      "common.any": "គ្មានកំណត់",
      "common.none": "—"
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

      "toast.saved": "Saved successfully",
      "toast.dealSaved": "Transaction saved successfully",
      "toast.dealSavedOpen": "Saved as Open — assign staff to every service to complete",
      "toast.needStaffToComplete": "Please assign staff to every service before completing",
      "toast.needOneService": "Please add at least one service",
      "toast.completed": "Transaction marked as Completed",
      "toast.cancelled": "Transaction cancelled",
      "toast.reset": "Demo data has been reset",

      "common.any": "Unassigned",
      "common.none": "—"
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

  /* ============================================================
     NAVIGATION
     ============================================================ */
  const PAGE_TITLE_KEYS = {
    overview: "nav.overview", "new-deal": "nav.newDeal", transactions: "nav.transactions",
    customers: "nav.customers", "staff-incentive": "nav.staffIncentive", services: "nav.services",
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
    if (page === "staff-incentive") renderStaffIncentivePage();
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

    const todaySales = completedToday.reduce((s, tx) => s + tx.grandTotal, 0);
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
    const txs = load(KEY_TRANSACTIONS, []);
    const records = load(KEY_RECORDS, []);
    const completed = txs.filter((tx) => tx.status === "Completed");

    // Sales trend last 7 days
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const d = daysAgo(i);
      const sum = completed.filter((tx) => tx.date === d).reduce((s, tx) => s + tx.grandTotal, 0);
      trend.push({ label: d.slice(5), value: +sum.toFixed(2), isMoney: true });
    }
    renderBarChart("chartSalesTrend", trend);

    // Popular services (all-time, completed)
    const svcCount = {};
    completed.forEach((tx) => tx.services.forEach((r) => { svcCount[r.service] = (svcCount[r.service] || 0) + 1; }));
    const popular = Object.entries(svcCount).sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([name, count]) => ({ label: name, value: count }));
    renderBarChart("chartPopularServices", popular.length ? popular : [{ label: t("common.none"), value: 0 }]);

    // Staff incentive summary / ranking
    const staff = load(KEY_STAFF, SEED_STAFF);
    const perf = staff.map((s) => {
      const staffRecords = records.filter((r) => r.staff === s.name);
      const completedCount = completed.reduce((sum, tx) => sum + tx.services.filter((r) => r.staff === s.name).length, 0);
      const incentive = staffRecords.reduce((sum, r) => sum + r.incentiveAmount, 0);
      return { name: s.name, role: s.role, completedCount, incentive };
    }).sort((a, b) => b.incentive - a.incentive);

    document.getElementById("staffIncentiveSummaryList").innerHTML = perf.map((p) => `
      <div class="staff-perf-item">
        <div>
          <div class="name">${p.name}</div>
          <div class="sub">${p.role} · ${p.completedCount} ${t("th.servicesCompleted")}</div>
        </div>
        <div class="val">${fmt(p.incentive)}</div>
      </div>
    `).join("");
  }

  /* ============================================================
     TRANSACTION TABLE RENDERER (shared: overview + transactions page)
     ============================================================ */
  function transactionRowHtml(tx, showActions) {
    const servicesHtml = tx.services.map((r) => `${r.service} <span class="tx-row-staff">(${r.staff || t("common.any")})</span>`).join("<br>");
    const canEdit = tx.status === "Open";
    const canComplete = tx.status === "Open";
    const canCancel = tx.status === "Open";
    return `
      <tr data-id="${tx.id}">
        <td>${tx.customerName}</td>
        <td>${tx.phone}</td>
        <td class="tx-services-cell">${servicesHtml}</td>
        <td><strong>${fmt(tx.grandTotal)}</strong></td>
        <td>${tx.payment || t("common.none")}</td>
        <td>${tx.date}<br><span class="tx-time">${tx.time || ""}</span></td>
        <td><span class="badge ${statusBadgeClass(tx.status)}">${t("status." + tx.status)}</span></td>
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
    return { service: "", price: 0, qty: 1, staff: "", incentiveType: "percent", incentiveRate: 0, incentiveAmount: 0 };
  }

  function blankDeal(blankNum) {
    return {
      id: "AD-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      customerId: null, customerName: "", phone: "", source: "", notes: "",
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
        { service: "Hair Wash & Dry", category: "Scalp Care", price: 12, qty: 1, staff: "Sokha", incentiveType: "percent", incentiveRate: 0, incentiveAmount: 0 }
      ],
      discountType: "amount", discountValue: 0,
      payment: "Cash"
    };
    dealSophea.services.forEach((r) => {
      const inc = computeIncentiveForRow(r.staff, r.category, r.price, r.qty);
      r.incentiveType = inc.type; r.incentiveRate = inc.rate; r.incentiveAmount = inc.amount;
    });

    // Row 2: Dara Chenda (new / not-yet-registered customer) - two services, one deliberately unstaffed
    const dealDara = {
      id: "AD-seed-2",
      customerId: null, customerName: "Dara Chenda", phone: "012 777 888", source: "Facebook", notes: "",
      services: [
        { service: "Nail Gel", category: "Nail Care", price: 18, qty: 1, staff: "Sreyneang", incentiveType: "percent", incentiveRate: 0, incentiveAmount: 0 },
        { service: "Facial", category: "Facial", price: 25, qty: 1, staff: "", incentiveType: "percent", incentiveRate: 0, incentiveAmount: 0 }
      ],
      discountType: "amount", discountValue: 0,
      payment: "Cash"
    };
    dealDara.services.forEach((r) => {
      if (!r.staff) return;
      const inc = computeIncentiveForRow(r.staff, r.category, r.price, r.qty);
      r.incentiveType = inc.type; r.incentiveRate = inc.rate; r.incentiveAmount = inc.amount;
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

  function loadFormFromDeal(deal) {
    if (!deal) return;
    document.getElementById("dCustName").value = deal.customerName || "";
    document.getElementById("dPhone").value = deal.phone || "";
    document.getElementById("dSource").value = deal.source || "";
    document.getElementById("dNotes").value = deal.notes || "";
    document.getElementById("dDiscountType").value = deal.discountType || "amount";
    document.getElementById("dDiscount").value = deal.discountValue || 0;
    document.getElementById("dPayment").value = deal.payment || "Cash";
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
        <div class="deal-incentive-wrap">
          <select class="deal-incentive-type">
            <option value="percent" ${r.incentiveType === "percent" ? "selected" : ""}>%</option>
            <option value="fixed" ${r.incentiveType === "fixed" ? "selected" : ""}>$</option>
          </select>
          <input type="number" class="deal-incentive-amount" min="0" step="0.5" value="${r.incentiveAmount}">
        </div>
        <button type="button" class="deal-row-remove" data-idx="${idx}" title="${t("deal.removeRow")}">×</button>
      </div>
    `).join("");

    wrap.querySelectorAll(".deal-row").forEach((rowEl) => {
      const idx = parseInt(rowEl.dataset.idx, 10);
      const serviceSel = rowEl.querySelector(".deal-service-select");
      const priceInput = rowEl.querySelector(".deal-price-input");
      const qtyInput = rowEl.querySelector(".deal-qty-input");
      const staffSel = rowEl.querySelector(".deal-staff-select");
      const incTypeSel = rowEl.querySelector(".deal-incentive-type");
      const incAmountInput = rowEl.querySelector(".deal-incentive-amount");

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
      incTypeSel.addEventListener("change", () => { dealRows[idx].incentiveType = incTypeSel.value; recalcRowIncentiveAmount(idx); recalcDealTotals(); });
      incAmountInput.addEventListener("input", () => { dealRows[idx].incentiveAmount = parseFloat(incAmountInput.value) || 0; recalcDealTotals(); });
    });

    wrap.querySelectorAll(".deal-row-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (dealRows.length <= 1) { dealRows = [blankRow()]; } else { dealRows.splice(parseInt(btn.dataset.idx, 10), 1); }
        renderDealRows();
        recalcDealTotals();
      });
    });
  }

  function autoSuggestIncentive(idx) {
    const r = dealRows[idx];
    if (!r.service || !r.staff) return;
    const calc = computeIncentiveForRow(r.staff, categoryOf(r.service), r.price, r.qty);
    r.incentiveType = calc.type;
    r.incentiveRate = calc.rate;
    r.incentiveAmount = calc.amount;
    renderDealRows();
  }

  function recalcRowIncentiveAmount(idx) {
    // when switching % <-> $ manually, recompute a sensible default based on current rate basis
    const r = dealRows[idx];
    const lineTotal = computeLineTotal(r);
    if (r.incentiveType === "percent" && lineTotal > 0) {
      r.incentiveAmount = +((r.incentiveAmount / lineTotal) * 100 >= 0 ? r.incentiveAmount : 0).toFixed(2);
    }
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
    const totalIncentive = dealRows.reduce((sum, r) => sum + (r.incentiveAmount || 0), 0);
    document.getElementById("dealSubtotal").textContent = fmt(subtotal);
    document.getElementById("dealDiscountLine").textContent = "-" + fmt(discountAmount) + (discountType === "percent" && discountValue ? ` (${discountValue}%)` : "");
    document.getElementById("dealGrandTotal").textContent = fmt(grandTotal);
    document.getElementById("dealTotalIncentive").textContent = fmt(totalIncentive);
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

    document.getElementById("modalTitle").textContent = t("deal.confirmTitle");
    document.getElementById("modalBody").innerHTML = `
      <div class="detail-row"><strong>${t("th.customer")}</strong><span>${name}</span></div>
      <div class="detail-row"><strong>${t("deal.services")}</strong><span>${validRows.length}</span></div>
      <div class="detail-row"><strong>${t("deal.grandTotal")}</strong><span><strong>${fmt(grandTotal)}</strong></span></div>
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
    const cust = findOrCreateCustomer(name, phone, source, notes);

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
      payment, discountType: totals.discountType, discountValue: totals.discountValue, discount: +totals.discountAmount.toFixed(2),
      subtotal: +totals.subtotal.toFixed(2), grandTotal: +totals.grandTotal.toFixed(2), totalIncentive: +totals.totalIncentive.toFixed(2),
      status: "Completed",
      services: validRows.map((r) => ({ ...r })),
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
        status: "Confirmed"
      });
    });
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
      ["Cash", "ABA", "ACLEDA", "Credit Card", "VIP", "Other"].map((p) => `<option value="${p}">${p}</option>`).join("");
  }

  function renderTransactionsPage() {
    populateTxFilterOptions();
    applyTxFilters();
  }

  function applyTxFilters() {
    let txs = load(KEY_TRANSACTIONS, []);
    const date = document.getElementById("filterTxDate").value;
    const staff = document.getElementById("filterTxStaff").value;
    const service = document.getElementById("filterTxService").value;
    const status = document.getElementById("filterTxStatus").value;
    const payment = document.getElementById("filterTxPayment").value;

    if (date) txs = txs.filter((tx) => tx.date === date);
    if (staff) txs = txs.filter((tx) => tx.services.some((r) => r.staff === staff));
    if (service) txs = txs.filter((tx) => tx.services.some((r) => r.service === service));
    if (status) txs = txs.filter((tx) => tx.status === status);
    if (payment) txs = txs.filter((tx) => tx.payment === payment);

    txs.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
    renderTransactionsTable("transactionsTable", txs, true);
  }

  function setupTxFilters() {
    ["filterTxDate", "filterTxStaff", "filterTxService", "filterTxStatus", "filterTxPayment"].forEach((id) => {
      document.getElementById(id).addEventListener("change", applyTxFilters);
    });
    document.getElementById("clearTxFilters").addEventListener("click", () => {
      ["filterTxDate", "filterTxStaff", "filterTxService", "filterTxStatus", "filterTxPayment"].forEach((id) => { document.getElementById(id).value = ""; });
      applyTxFilters();
    });
  }

  function handleTxAction(action, id) {
    const txs = load(KEY_TRANSACTIONS, []);
    const tx = txs.find((t) => t.id === id);
    if (!tx) return;
    if (action === "view") openTxViewModal(tx);
    if (action === "edit") openTxForEdit(tx);
    if (action === "complete") completeTransaction(tx.id);
    if (action === "cancel") cancelTransaction(tx.id);
    if (action === "print") printReceipt(tx);
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
  function renderCustomersPage() {
    const customers = load(KEY_CUSTOMERS, []);
    const txs = load(KEY_TRANSACTIONS, []);

    const rows = customers.map((c) => {
      const custTxs = txs.filter((tx) => tx.customerId === c.id);
      const completedTxs = custTxs.filter((tx) => tx.status === "Completed");
      const lastVisit = custTxs.reduce((max, tx) => (tx.date > max ? tx.date : max), "");
      const totalSpending = completedTxs.reduce((sum, tx) => sum + tx.grandTotal, 0);
      const svcCount = {};
      completedTxs.forEach((tx) => tx.services.forEach((r) => { svcCount[r.service] = (svcCount[r.service] || 0) + 1; }));
      const mostUsed = Object.entries(svcCount).sort((a, b) => b[1] - a[1])[0];
      return { ...c, custTxs, lastVisit, totalVisits: custTxs.length, totalSpending, mostUsed: mostUsed ? mostUsed[0] : t("common.none") };
    });

    const table = document.getElementById("customersTable");
    const headers = ["th.customer", "th.phone", "th.lastVisit", "th.totalVisits", "th.totalSpending", "th.mostUsedService", "th.source"];
    table.querySelector("thead").innerHTML = `<tr>${headers.map((h) => `<th>${t(h)}</th>`).join("")}<th>${t("th.actions")}</th></tr>`;
    table.querySelector("tbody").innerHTML = rows.map((c) => `
      <tr data-id="${c.id}">
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>${c.lastVisit || t("common.none")}</td>
        <td>${c.totalVisits}</td>
        <td>${fmt(c.totalSpending)}</td>
        <td>${c.mostUsed}</td>
        <td class="source-cell">${c.source || t("common.none")}</td>
        <td><button class="icon-btn" data-action="view-customer" data-id="${c.id}">${t("actions.view")}</button></td>
      </tr>
    `).join("") || `<tr><td colspan="8" style="text-align:center;color:#B7ABA0;padding:24px;">—</td></tr>`;

    table.querySelectorAll('[data-action="view-customer"]').forEach((btn) => {
      btn.addEventListener("click", () => openCustomerModal(rows.find((c) => c.id === btn.dataset.id)));
    });
  }

  function openCustomerModal(c) {
    document.getElementById("modalTitle").textContent = t("modal.customerDetail");
    const historyRows = [...c.custTxs].sort((a, b) => b.date.localeCompare(a.date)).map((tx) => `
      <div class="detail-row">
        <strong>${tx.date} — ${tx.services.map((r) => r.service).join(", ")}</strong>
        <span>${fmt(tx.grandTotal)} · <span class="badge ${statusBadgeClass(tx.status)}">${t("status." + tx.status)}</span></span>
      </div>
    `).join("") || `<p class="scheme-empty">—</p>`;
    document.getElementById("modalBody").innerHTML = `
      <div class="detail-row"><strong>${t("th.customer")}</strong><span>${c.name}</span></div>
      <div class="detail-row"><strong>${t("th.phone")}</strong><span>${c.phone}</span></div>
      <div class="detail-row"><strong>${t("th.source")}</strong><span>${c.source || t("common.none")}</span></div>
      <div class="detail-row"><strong>${t("th.totalVisits")}</strong><span>${c.totalVisits}</span></div>
      <div class="detail-row"><strong>${t("th.totalSpending")}</strong><span>${fmt(c.totalSpending)}</span></div>
      <div class="modal-section-label">${t("customers.history")}</div>
      ${historyRows}
    `;
    openModal();
  }

  /* ============================================================
     STAFF INCENTIVE PAGE
     ============================================================ */
  function populateIncentiveFilterOptions() {
    const staff = load(KEY_STAFF, SEED_STAFF);
    document.getElementById("incFilterStaff").innerHTML = `<option value="">${t("filters.all")} - ${t("th.staff")}</option>` +
      staff.map((s) => `<option value="${s.name}">${s.name}</option>`).join("");
  }

  function getIncentiveDateRange() {
    const range = document.getElementById("incFilterRange").value;
    const fromEl = document.getElementById("incFilterFrom");
    const toEl = document.getElementById("incFilterTo");
    fromEl.style.display = range === "custom" ? "" : "none";
    toEl.style.display = range === "custom" ? "" : "none";
    if (range === "today") return { from: daysAgo(0), to: daysAgo(0) };
    if (range === "week") { const now = new Date(); const start = new Date(now); start.setDate(now.getDate() - now.getDay()); return { from: start.toISOString().split("T")[0], to: daysAgo(0) }; }
    if (range === "month") { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth(), 1); return { from: start.toISOString().split("T")[0], to: daysAgo(0) }; }
    if (range === "custom") return { from: fromEl.value, to: toEl.value };
    return { from: "", to: "" };
  }

  function renderStaffIncentivePage() {
    populateIncentiveFilterOptions();
    applyIncentiveFilters();
    renderIncentiveSchemeSection();
  }

  function applyIncentiveFilters() {
    const { from, to } = getIncentiveDateRange();
    const staffFilter = document.getElementById("incFilterStaff").value;
    const records = load(KEY_RECORDS, []).filter((r) => inRange(r.date, from, to) && (!staffFilter || r.staff === staffFilter));
    const staff = load(KEY_STAFF, SEED_STAFF).filter((s) => !staffFilter || s.name === staffFilter);

    const summary = staff.map((s) => {
      const staffRecords = records.filter((r) => r.staff === s.name);
      const salesValue = staffRecords.reduce((sum, r) => sum + r.price * r.qty, 0);
      const incentiveEarned = staffRecords.reduce((sum, r) => sum + r.incentiveAmount, 0);
      const paid = 0; // demo: no payout tracking yet
      return { staff: s, count: staffRecords.length, salesValue, incentiveEarned, paid, outstanding: incentiveEarned - paid, records: staffRecords };
    });

    const table = document.getElementById("staffIncentiveTable");
    const headers = ["th.staff", "th.servicesCompleted", "th.salesValue", "th.incentiveEarned", "th.outstanding"];
    table.querySelector("thead").innerHTML = `<tr>${headers.map((h) => `<th>${t(h)}</th>`).join("")}<th>${t("th.actions")}</th></tr>`;
    table.querySelector("tbody").innerHTML = summary.map((s) => `
      <tr>
        <td>${s.staff.name}<br><span class="tx-time">${s.staff.role}</span></td>
        <td>${s.count}</td>
        <td>${fmt(s.salesValue)}</td>
        <td><strong>${fmt(s.incentiveEarned)}</strong></td>
        <td>${fmt(s.outstanding)}</td>
        <td><button class="icon-btn" data-action="view-staff" data-id="${s.staff.id}">${t("actions.view")}</button></td>
      </tr>
    `).join("") || `<tr><td colspan="6" style="text-align:center;color:#B7ABA0;padding:24px;">—</td></tr>`;

    table.querySelectorAll('[data-action="view-staff"]').forEach((btn) => {
      btn.addEventListener("click", () => openStaffIncentiveModal(summary.find((s) => s.staff.id === btn.dataset.id)));
    });
  }

  function openStaffIncentiveModal(s) {
    document.getElementById("modalTitle").textContent = `${t("modal.staffDetail")} — ${s.staff.name}`;
    const rows = [...s.records].sort((a, b) => b.date.localeCompare(a.date)).map((r) => `
      <div class="detail-row">
        <strong>${r.date} — ${r.customer}</strong>
        <span>${r.service} · ${fmt(r.price)} → ${fmt(r.incentiveAmount)}</span>
      </div>
    `).join("") || `<p class="scheme-empty">—</p>`;
    document.getElementById("modalBody").innerHTML = `
      <div class="detail-row"><strong>${t("th.servicesCompleted")}</strong><span>${s.count}</span></div>
      <div class="detail-row"><strong>${t("th.salesValue")}</strong><span>${fmt(s.salesValue)}</span></div>
      <div class="detail-row"><strong>${t("th.incentiveEarned")}</strong><span><strong>${fmt(s.incentiveEarned)}</strong></span></div>
      <div class="modal-section-label">${t("staffIncentive.detail")}</div>
      ${rows}
    `;
    openModal();
  }

  function setupIncentiveFilters() {
    document.getElementById("incFilterRange").addEventListener("change", applyIncentiveFilters);
    document.getElementById("incFilterFrom").addEventListener("change", applyIncentiveFilters);
    document.getElementById("incFilterTo").addEventListener("change", applyIncentiveFilters);
    document.getElementById("incFilterStaff").addEventListener("change", applyIncentiveFilters);
    document.getElementById("toggleSchemeBtn").addEventListener("click", () => {
      const el = document.getElementById("incentiveSchemeCards");
      el.style.display = el.style.display === "none" ? "" : "none";
    });
  }

  /* ============================================================
     INCENTIVE SCHEME (owner editable / cashier view-only) — lives inside Staff Incentive page
     ============================================================ */
  function renderIncentiveSchemeSection() {
    const staff = load(KEY_STAFF, SEED_STAFF);
    const schemes = load(KEY_SCHEMES, SEED_SCHEMES);
    const isOwner = getSettings().role === "owner";
    const categories = [...new Set(load(KEY_SERVICES, SEED_SERVICES).map((s) => s.category))];

    document.getElementById("incentiveSchemeCards").innerHTML = staff.map((s) => {
      const rules = schemes[s.id] || [];
      const rowsHtml = rules.map((r, idx) => `
        <div class="scheme-row ${isOwner ? "" : "readonly"}" data-staff="${s.id}" data-idx="${idx}">
          <select class="rule-category" ${isOwner ? "" : "disabled"}>
            ${categories.map((c) => `<option value="${c}" ${c === r.category ? "selected" : ""}>${c}</option>`).join("")}
          </select>
          <select class="rule-type" ${isOwner ? "" : "disabled"}>
            <option value="percent" ${r.type === "percent" ? "selected" : ""}>${t("incentiveScheme.percent")}</option>
            <option value="fixed" ${r.type === "fixed" ? "selected" : ""}>${t("incentiveScheme.fixed")}</option>
          </select>
          <div class="rule-value-wrap">
            <input type="number" class="rule-rate" value="${r.rate}" min="0" step="0.5" ${isOwner ? "" : "disabled"}>
            <span class="rule-unit">${r.type === "fixed" ? "$" : "%"}</span>
          </div>
        </div>
      `).join("");
      return `
        <div class="incentive-card">
          <div class="incentive-card-head"><h4>${s.name}</h4><span class="staff-role">${s.role}</span></div>
          ${rules.length ? `<div class="scheme-col-labels"><span>${t("incentiveScheme.colService")}</span><span>${t("incentiveScheme.colType")}</span><span>${t("incentiveScheme.colValue")}</span></div>` : ""}
          <div class="scheme-rows">${rowsHtml || `<p class="scheme-empty">—</p>`}</div>
          ${isOwner ? `<button class="add-rule-btn" data-staff="${s.id}" data-action="add-rule">${t("incentiveScheme.addRule")}</button>` : ""}
        </div>
      `;
    }).join("");

    if (isOwner) {
      document.querySelectorAll(".scheme-row").forEach((rowEl) => {
        rowEl.querySelectorAll("select, input").forEach((input) => input.addEventListener("change", () => saveSchemeRow(rowEl)));
        const typeSelect = rowEl.querySelector(".rule-type");
        const unitEl = rowEl.querySelector(".rule-unit");
        typeSelect.addEventListener("change", () => { unitEl.textContent = typeSelect.value === "fixed" ? "$" : "%"; });
      });
      document.querySelectorAll('[data-action="add-rule"]').forEach((btn) => {
        btn.addEventListener("click", () => addSchemeRule(btn.dataset.staff));
      });
    }
  }

  function saveSchemeRow(rowEl) {
    const staffId = rowEl.dataset.staff;
    const idx = parseInt(rowEl.dataset.idx, 10);
    const schemes = load(KEY_SCHEMES, SEED_SCHEMES);
    const rules = schemes[staffId] || [];
    rules[idx] = {
      category: rowEl.querySelector(".rule-category").value,
      type: rowEl.querySelector(".rule-type").value,
      rate: parseFloat(rowEl.querySelector(".rule-rate").value) || 0
    };
    schemes[staffId] = rules;
    save(KEY_SCHEMES, schemes);
    showToast(t("toast.saved"), "success");
  }

  function addSchemeRule(staffId) {
    const schemes = load(KEY_SCHEMES, SEED_SCHEMES);
    const rules = schemes[staffId] || [];
    const categories = [...new Set(load(KEY_SERVICES, SEED_SERVICES).map((s) => s.category))];
    rules.push({ category: categories[0], type: "percent", rate: 10 });
    schemes[staffId] = rules;
    save(KEY_SCHEMES, schemes);
    renderIncentiveSchemeSection();
    document.getElementById("incentiveSchemeCards").style.display = "";
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
    document.getElementById("repPayment").innerHTML = `<option value="">${t("filters.all")} - ${t("th.payment")}</option>` + ["Cash", "ABA", "ACLEDA", "Credit Card", "VIP", "Other"].map((p) => `<option value="${p}">${p}</option>`).join("");
    document.getElementById("repSource").innerHTML = `<option value="">${t("reports.sourceOptional")}</option>` +
      ["Walk-in", "Facebook", "TikTok", "Telegram", "Referral", "Existing Customer", "Website", "Other"].map((s) => `<option value="${s}">${s}</option>`).join("");
  }

  function renderReportsPage() {
    populateReportFilterOptions();
    renderReportsAnalytics();
    applyReportFilters();
  }

  function setupReportFilters() {
    ["repRange", "repFrom", "repTo", "repStaff", "repService", "repPayment", "repSource"].forEach((id) => {
      document.getElementById(id).addEventListener("change", applyReportFilters);
    });
    document.getElementById("clearRepFilters").addEventListener("click", () => {
      document.getElementById("repRange").value = "last7";
      ["repFrom", "repTo", "repStaff", "repService", "repPayment", "repSource"].forEach((id) => { document.getElementById(id).value = ""; });
      applyReportFilters();
    });
  }

  function applyReportFilters() {
    const { from, to } = getReportDateRange();
    const staffF = document.getElementById("repStaff").value;
    const serviceF = document.getElementById("repService").value;
    const paymentF = document.getElementById("repPayment").value;
    const sourceF = document.getElementById("repSource").value;

    let txs = load(KEY_TRANSACTIONS, []).filter((tx) => tx.status === "Completed" && inRange(tx.date, from, to));
    if (paymentF) txs = txs.filter((tx) => tx.payment === paymentF);
    if (sourceF) txs = txs.filter((tx) => tx.source === sourceF);
    if (staffF) txs = txs.filter((tx) => tx.services.some((r) => r.staff === staffF));
    if (serviceF) txs = txs.filter((tx) => tx.services.some((r) => r.service === serviceF));

    const allRows = [];
    txs.forEach((tx) => tx.services.forEach((r) => {
      if (staffF && r.staff !== staffF) return;
      if (serviceF && r.service !== serviceF) return;
      allRows.push({ ...r, txId: tx.id, payment: tx.payment, customerId: tx.customerId });
    }));

    const totalSales = txs.reduce((sum, tx) => sum + tx.grandTotal, 0);
    const numCustomers = new Set(txs.map((tx) => tx.customerId)).size;
    const numVisits = txs.length;
    const numServices = allRows.length;

    document.getElementById("reportKpiGrid").innerHTML = [
      { label: t("reports.totalSales"), value: fmt(totalSales), gold: true },
      { label: t("reports.numCustomers"), value: numCustomers },
      { label: t("reports.numVisits"), value: numVisits },
      { label: t("reports.numServices"), value: numServices }
    ].map((k) => `<div class="kpi-card ${k.gold ? "gold" : ""}"><div class="kpi-label">${k.label}</div><div class="kpi-value">${k.value}</div></div>`).join("");

    const byService = {};
    allRows.forEach((r) => { byService[r.service] = (byService[r.service] || 0) + r.price * r.qty; });
    document.getElementById("reportSalesByService").innerHTML = Object.entries(byService).sort((a, b) => b[1] - a[1])
      .map(([name, val]) => `<div class="report-line"><span>${name}</span><strong>${fmt(val)}</strong></div>`).join("") || `<div class="report-line"><span>—</span></div>`;

    const byStaffIncentive = {};
    const bySalesStaff = {};
    allRows.forEach((r) => {
      if (!r.staff) return;
      byStaffIncentive[r.staff] = (byStaffIncentive[r.staff] || 0) + (r.incentiveAmount || 0);
      bySalesStaff[r.staff] = (bySalesStaff[r.staff] || 0) + r.price * r.qty;
    });
    document.getElementById("reportStaffIncentive").innerHTML = Object.entries(byStaffIncentive).sort((a, b) => b[1] - a[1])
      .map(([name, val]) => `<div class="report-line"><span>${name}</span><strong>${fmt(val)}</strong></div>`).join("") || `<div class="report-line"><span>—</span></div>`;
    document.getElementById("reportSalesByStaff").innerHTML = Object.entries(bySalesStaff).sort((a, b) => b[1] - a[1])
      .map(([name, val]) => `<div class="report-line"><span>${name}</span><strong>${fmt(val)}</strong></div>`).join("") || `<div class="report-line"><span>—</span></div>`;

    const byPayment = {};
    txs.forEach((tx) => { byPayment[tx.payment || "—"] = (byPayment[tx.payment || "—"] || 0) + tx.grandTotal; });
    document.getElementById("reportPaymentMethod").innerHTML = Object.entries(byPayment).sort((a, b) => b[1] - a[1])
      .map(([name, val]) => `<div class="report-line"><span>${name}</span><strong>${fmt(val)}</strong></div>`).join("") || `<div class="report-line"><span>—</span></div>`;
  }

  /* ============================================================
     MODAL / SETTINGS / INIT
     ============================================================ */
  function openModal() { document.getElementById("modalOverlay").classList.add("show"); }
  function closeModal() { document.getElementById("modalOverlay").classList.remove("show"); }
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
    document.getElementById("dPayment").addEventListener("change", syncFormIntoActiveDeal);
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
    setupIncentiveFilters();
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
