/* C066 Loan Book – DEMO data & loan logic. ALL DATA IS MOCK. No backend, no payment gateway, no banking. */
'use strict';

const pad = n => String(n).padStart(2, '0');
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const addMonths = (d, n) => {
  const x = new Date(d), day = x.getDate();
  x.setDate(1); x.setMonth(x.getMonth() + n);
  const last = new Date(x.getFullYear(), x.getMonth() + 1, 0).getDate();
  x.setDate(Math.min(day, last)); return x;
};
const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const parseISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
const diffDays = (a, b) => Math.round((a - b) / 86400000); // a - b in days

const FREQ = {
  daily:    { days: 1 },
  weekly:   { days: 7 },
  biweekly: { days: 14 },
  monthly:  { months: 1, days: 30 },
  custom:   { days: 10 }
};

function stepDays(loan) {
  if (loan.frequency === 'custom') return Math.max(1, Number(loan.customDays) || 10);
  return FREQ[loan.frequency].days;
}
function installmentCount(loan) {
  const months = Math.max(0.5, Number(loan.durationMonths) || 1);
  if (loan.frequency === 'monthly') return Math.max(1, Math.round(months));
  return Math.max(1, Math.round(months * 30 / stepDays(loan)));
}
function dueDateOf(loan, i) { // i zero-based
  const first = parseISO(loan.firstPayment);
  return loan.frequency === 'monthly' ? addMonths(first, i) : addDays(first, stepDays(loan) * i);
}
function roundCur(v, cur) { return cur === 'KHR' ? Math.round(v / 100) * 100 : Math.round(v * 100) / 100; }

/* Simulated calculation – NOT legal / accounting advice */
function calcLoan(loan) {
  const n = installmentCount(loan), P = Number(loan.amount) || 0;
  const r = loan.interestType === 'none' ? 0 : (Number(loan.rate) || 0) / 100;
  const months = Number(loan.durationMonths) || 1;
  const pd = loan.frequency === 'monthly' ? 30 : stepDays(loan);
  const rows = [];
  let bal = P, sumP = 0, sumI = 0;
  const flatInt = P * r * months;
  for (let i = 0; i < n; i++) {
    let pr = roundCur(P / n, loan.currency);
    if (i === n - 1) pr = roundCur(P - sumP, loan.currency);
    const int = loan.interestType === 'declining' ? roundCur(bal * r * (pd / 30), loan.currency) : roundCur(flatInt / n, loan.currency);
    bal -= P / n; sumP += pr; sumI += int;
    rows.push({ no: i + 1, due: iso(P ? dueDateOf(loan, i) : TODAY), principal: pr, interest: int, total: roundCur(pr + int, loan.currency) });
  }
  return { n, rows, principal: P, interest: sumI, total: roundCur(P + sumI, loan.currency), installment: rows[0] ? rows[0].total : 0, maturity: rows.length ? rows[rows.length - 1].due : iso(TODAY) };
}

/* ---------- Seed (relative to today so reminders always look "live") ---------- */
function seedData() {
  const T = TODAY;
  const B = (n, kh, en, g, phone, nid, job, village, commune, district, vEn, cEn, dEn, gName, gPhone, gRel, notes, map) => ({
    id: 'BR-' + String(n).padStart(4, '0'), name: kh, nameEn: en, gender: g, phone, nid, job,
    village, commune, district, villageEn: vEn, communeEn: cEn, districtEn: dEn, province: 'បាត់ដំបង',
    address: '', map: map || 'https://maps.google.com/?q=Battambang',
    guarantor: gName, gPhone, gRel, notes, photo: '', created: iso(addDays(T, -200 + n * 9))
  });
  const borrowers = [
    B(1, 'សុខ ដារ៉ា', 'Sok Dara', 'M', '012 301 101', '010 123 456 78', 'លក់ដូរក្នុងផ្សារ', 'ទួលតាឯក', 'សង្កាត់ទួលតាឯក', 'ក្រុងបាត់ដំបង', 'Tuol Ta Ek', 'Tuol Ta Ek', 'Battambang City', 'សុខ សុវណ្ណ', '092 411 222', 'ប្អូនប្រុស', 'អ្នកខ្ចីចាស់ ទុកចិត្តបាន។ បង់ទៀងទាត់។'),
    B(2, 'ចាន់ ស្រីនាង', 'Chan Sreyneang', 'F', '096 222 3344', '010 234 567 89', 'កាត់ដេរ', 'ស្វាយប៉ោ', 'សង្កាត់ស្វាយប៉ោ', 'ក្រុងបាត់ដំបង', 'Svay Pao', 'Svay Pao', 'Battambang City', 'ចាន់ វុធ', '097 555 6677', 'ស្វាមី', 'បង់ជារៀងរាល់សប្តាហ៍ ថ្ងៃសុក្រ។'),
    B(3, 'ហេង វិសាល', 'Heng Visal', 'M', '085 770 880', '010 345 678 90', 'កសិករ', 'បវេល', 'ឃុំបវេល', 'ស្រុកបវេល', 'Bavel', 'Bavel', 'Bavel District', 'ហេង សារ៉ុន', '088 123 9090', 'ឪពុក', 'ពេលខ្លះយឺត ព្រោះរង់ចាំលក់ស្រូវ។ ត្រូវតាមដាន។'),
    B(4, 'លី សុខា', 'Ly Sokha', 'F', '070 456 789', '010 456 789 01', 'លក់បន្លែ', 'ថ្មគោល', 'ឃុំថ្មគោល', 'ស្រុកថ្មគោល', 'Thma Koul', 'Thma Koul', 'Thma Koul District', 'លី ចំរើន', '012 667 788', 'បងប្រុស', 'បានសន្យាថានឹងបង់ក្នុងសប្តាហ៍នេះ។'),
    B(5, 'គឹម ណារិទ្ធ', 'Kim Narith', 'M', '010 889 900', '010 567 890 12', 'ជាងសំណង់', 'មោងឫស្សី', 'ឃុំមោងឫស្សី', 'ស្រុកមោងឫស្សី', 'Moung Russei', 'Moung Russei', 'Moung Ruessei District', 'គឹម សុភា', '093 220 110', 'ប្រពន្ធ', ''),
    B(6, 'ម៉ែន ចាន់ធី', 'Men Chanthy', 'F', '098 123 456', '010 678 901 23', 'ម្ចាស់ហាងលក់គ្រឿងទេស', 'សំឡូត', 'ឃុំសំឡូត', 'ស្រុកសំឡូត', 'Samlout', 'Samlout', 'Samlout District', 'ម៉ែន សំអូន', '011 334 455', 'ម្តាយ', 'ខ្ចីដើម្បីពង្រីកហាង។'),
    B(7, 'រស់ សោភ័ណ្ឌ', 'Roth Sophon', 'M', '017 998 877', '010 789 012 34', 'អ្នកបើកម៉ូតូឌុប', 'ឯកភ្នំ', 'ឃុំឯកភ្នំ', 'ស្រុកឯកភ្នំ', 'Ek Phnom', 'Ek Phnom', 'Ek Phnom District', 'រស់ ពិសី', '081 909 808', 'ប្អូនស្រី', 'បានបង់ចប់ប្រាក់កម្ចីទី១ មុនកំណត់។'),
    B(8, 'ថោង ម៉ាលីន', 'Thong Malin', 'F', '099 654 321', '010 890 123 45', 'គ្រូបង្រៀនឯកជន', 'ព្រែកព្រះស្តេច', 'ឃុំព្រែកព្រះស្តេច', 'ក្រុងបាត់ដំបង', 'Prek Preah Sdach', 'Prek Preah Sdach', 'Battambang City', 'ថោង សុវណ្ណារី', '069 777 111', 'បងស្រី', 'អ្នកខ្ចីថ្មី មិនទាន់មានប្រាក់កម្ចី។')
  ];

  // anchor: installment `an` is due on T+off ; installments before it are paid (unless in `skip`)
  const L = (n, bid, amount, cur, freq, months, rate, itype, an, off, o = {}) => {
    const loan = {
      id: 'LN-2026-' + String(n).padStart(3, '0'), borrowerId: bid, amount, currency: cur, frequency: freq,
      customDays: 10, durationMonths: months, rate, interestType: itype, fee: o.fee || 0,
      collateral: o.collateral || '', notes: o.notes || '', status: o.cancelled ? 'cancelled' : 'open'
    };
    const tmp = Object.assign({}, loan, { firstPayment: iso(T) });
    const anchor = addDays(T, off);
    let first;
    if (freq === 'monthly') first = addMonths(anchor, -(an - 1)); else first = addDays(anchor, -stepDays(tmp) * (an - 1));
    loan.firstPayment = iso(first);
    loan.date = iso(addDays(first, -(freq === 'monthly' ? 30 : stepDays(tmp))));
    const c = calcLoan(loan);
    loan.maturity = c.maturity;
    loan._an = an; loan._partial = o.partial; loan._paidAll = o.paidAll; loan._skip = o.skip || [];
    return loan;
  };
  const loans = [
    L(1, 'BR-0001', 1000, 'USD', 'monthly', 10, 2.5, 'flat', 5, 0, { collateral: 'សៀវភៅគោលដីឡូតិ៍ (ចម្លង)', notes: 'ប្រើសម្រាប់ពង្រីកស្តុកទំនិញ។', fee: 10 }),
    L(2, 'BR-0002', 500, 'USD', 'weekly', 3, 3, 'flat', 8, 1, { notes: 'ម៉ាស៊ីនដេរ ជាការធានា។', collateral: 'ម៉ាស៊ីនដេរ ១គ្រឿង' }),
    L(3, 'BR-0003', 300, 'USD', 'weekly', 2, 3, 'flat', 3, -5, { notes: 'រង់ចាំលក់ស្រូវ។' }),
    L(4, 'BR-0004', 1500000, 'KHR', 'monthly', 6, 3, 'flat', 3, -12, { partial: { no: 3, amount: 100000 }, collateral: 'កាតកំណើត + ឯកសារគ្រួសារ' }),
    L(5, 'BR-0005', 500, 'USD', 'biweekly', 4, 2.5, 'flat', 4, 5),
    L(6, 'BR-0006', 1000, 'USD', 'monthly', 12, 2, 'declining', 7, 12, { collateral: 'ប័ណ្ណកម្មសិទ្ធិម៉ូតូ', fee: 15 }),
    L(7, 'BR-0007', 300, 'USD', 'monthly', 3, 3, 'flat', 3, -40, { paidAll: true, notes: 'បង់ចប់មុនកំណត់។' }),
    L(8, 'BR-0001', 300, 'USD', 'weekly', 1, 3, 'flat', 4, -45, { paidAll: true }),
    L(9, 'BR-0007', 500, 'USD', 'monthly', 6, 2.5, 'flat', 2, 0, { notes: 'ប្រាក់កម្ចីទី២។' }),
    L(10, 'BR-0005', 300, 'USD', 'monthly', 3, 3, 'flat', 1, 10, { cancelled: true, notes: 'បោះបង់ មុនចេញប្រាក់។' })
  ];

  const payments = []; let pn = 1;
  const methods = ['cash', 'cash', 'bank', 'cash', 'wallet'];
  loans.forEach(loan => {
    if (loan.status === 'cancelled') return;
    const c = calcLoan(loan);
    const upto = loan._paidAll ? c.n : loan._an - 1;
    c.rows.forEach(r => {
      if (r.no > upto || loan._skip.includes(r.no)) return;
      const lateBy = (r.no * 7 + loan.id.length) % 4 === 0 ? 1 : 0;
      payments.push({
        id: 'PM-' + String(pn++).padStart(4, '0'), loanId: loan.id, no: r.no, date: iso(addDays(parseISO(r.due), lateBy)),
        amount: r.total, currency: loan.currency, type: 'full', method: methods[(pn + r.no) % methods.length], note: ''
      });
    });
    if (loan._partial) {
      const r = c.rows[loan._partial.no - 1];
      payments.push({ id: 'PM-' + String(pn++).padStart(4, '0'), loanId: loan.id, no: r.no, date: iso(addDays(parseISO(r.due), 1)), amount: loan._partial.amount, currency: loan.currency, type: 'partial', method: 'cash', note: 'បង់ផ្នែកខ្លះសិន' });
    }
  });
  payments.forEach(p => { if (parseISO(p.date) > TODAY) p.date = iso(TODAY); });
  loans.forEach(l => { delete l._an; delete l._partial; delete l._paidAll; delete l._skip; });

  return {
    v: 3,
    owner: { name: 'Mr. Daily Daily', phone: '012 345 678', password: '123456', photo: '' },
    settings: {
      defaultCur: 'USD', rate: 4100, defRate: 2.5, defType: 'flat', defFreq: 'monthly', defFee: 0,
      notif: { on: true, dueDay: true, day1: true, day3: false, overdue: true, time: '08:00' }
    },
    borrowers, loans, payments, seq: { br: 9, ln: 11, pm: pn, rc: 1 }
  };
}

/* ---------- Derived views ---------- */
const EPS = cur => cur === 'KHR' ? 1 : 0.005;
const toUSD = (v, cur) => cur === 'KHR' ? v / DB.settings.rate : v;

function instStatus(row, paid, dueISO) {
  const remaining = row.total - paid;
  const d = diffDays(parseISO(dueISO), TODAY);
  if (remaining <= row._eps) return 'paid';
  if (d < 0) return 'overdue';
  if (d === 0) return paid > row._eps ? 'partial' : 'today';
  if (paid > row._eps) return 'partial';
  if (d <= 7) return 'soon';
  return 'upcoming';
}

function loanView(loan) {
  const c = calcLoan(loan);
  const pays = DB.payments.filter(p => p.loanId === loan.id);
  const eps = EPS(loan.currency);
  const rows = c.rows.map(r => {
    const paid = pays.filter(p => p.no === r.no).reduce((s, p) => s + p.amount, 0);
    const row = Object.assign({}, r, { _eps: eps, paid, remaining: Math.max(0, roundCur(r.total - paid, loan.currency)) });
    row.status = instStatus(row, paid, r.due);
    row.daysLate = row.status === 'overdue' ? -diffDays(parseISO(r.due), TODAY) : 0;
    return row;
  });
  const paid = pays.reduce((s, p) => s + p.amount, 0);
  const remaining = Math.max(0, roundCur(c.total - paid, loan.currency));
  const overdueRows = rows.filter(r => r.status === 'overdue');
  const next = rows.find(r => r.status !== 'paid') || null;
  let status = 'active';
  if (loan.status === 'cancelled') status = 'cancelled';
  else if (remaining <= eps) status = 'paid';
  else if (overdueRows.length) status = 'overdue';
  return Object.assign({}, c, {
    loan, rows, paid, remaining, pays, next, status,
    overdueAmount: overdueRows.reduce((s, r) => s + r.remaining, 0),
    maxLate: overdueRows.length ? Math.max(...overdueRows.map(r => r.daysLate)) : 0,
    progress: c.total ? Math.min(100, Math.round(paid / c.total * 100)) : 0
  });
}

function allViews() { return DB.loans.map(loanView); }
function borrowerOf(id) { return DB.borrowers.find(b => b.id === id); }
function borrowerSummary(b) {
  const vs = allViews().filter(v => v.loan.borrowerId === b.id && v.status !== 'cancelled');
  const act = vs.filter(v => v.status === 'active' || v.status === 'overdue');
  const done = vs.filter(v => v.status === 'paid');
  let status = 'new';
  if (act.some(v => v.status === 'overdue')) status = 'overdue';
  else if (act.length) status = 'active';
  else if (done.length) status = 'completed';
  return {
    vs, act, done, status,
    borrowed: vs.reduce((s, v) => s + toUSD(v.principal, v.loan.currency), 0),
    paid: vs.reduce((s, v) => s + toUSD(v.paid, v.loan.currency), 0),
    remaining: vs.reduce((s, v) => s + toUSD(v.remaining, v.loan.currency), 0)
  };
}

/* all unpaid installments across loans, with day offset */
function dueItems() {
  const items = [];
  allViews().forEach(v => {
    if (v.status === 'cancelled') return;
    v.rows.forEach(r => {
      if (r.status === 'paid') return;
      const d = diffDays(parseISO(r.due), TODAY);
      items.push({ v, r, b: borrowerOf(v.loan.borrowerId), d, amount: r.remaining, cur: v.loan.currency });
    });
  });
  return items.sort((a, b) => a.d - b.d);
}

/* ---------- Storage (browser only, demo) ---------- */
const KEY = 'c066-demo-v3';
let DB;
function loadDB() {
  try { const s = localStorage.getItem(KEY); if (s) { const o = JSON.parse(s); if (o && o.v === 3) { DB = o; return; } } } catch (e) {}
  DB = seedData();
}
function saveDB() { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {} }
function resetDB() { try { localStorage.removeItem(KEY); } catch (e) {} DB = seedData(); }
loadDB();
