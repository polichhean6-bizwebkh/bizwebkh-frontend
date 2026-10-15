/* Screens B: loans, schedule, payments, receipt */
'use strict';
const STATUS_RANK = { overdue: 0, active: 1, paid: 2, cancelled: 3 };

/* ---------- loans list ---------- */
function loansListHTML() {
  const q = (S.ui.lq || '').toLowerCase().trim(), f = S.ui.lf || 'all';
  const vs = allViews().filter(v => {
    if (f !== 'all' && v.status !== f) return false;
    if (!q) return true; const b = borrowerOf(v.loan.borrowerId);
    return v.loan.id.toLowerCase().includes(q) || b.name.includes(q) || b.nameEn.toLowerCase().includes(q) || (digits(q) && digits(b.phone).includes(digits(q)));
  }).sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status] || b.loan.date.localeCompare(a.loan.date));
  if (!vs.length) return emptyBlock('loan', T('រកមិនឃើញប្រាក់កម្ចី', 'No loans found'), T('សូមសាកល្បងតម្រងផ្សេង ឬបង្កើតប្រាក់កម្ចីថ្មី។', 'Try another filter or create a new loan.'), `<div style="margin-top:14px"><button class="btn" data-go="loanForm">${I('plus', 'sm')} ${T('បង្កើតប្រាក់កម្ចី', 'Create loan')}</button></div>`);
  return vs.map(v => {
    const b = borrowerOf(v.loan.borrowerId);
    return `<button class="card" data-go="loanDetail" data-a="${v.loan.id}" style="width:100%;text-align:left;display:block;${v.status === 'overdue' ? 'border-left:5px solid var(--red)' : ''}">
    <div class="row between"><span class="b">${v.loan.id}</span>${bd(v.status === 'paid' ? 'paid' : v.status, loanStLabel(v.status))}</div>
    <div class="row" style="margin:8px 0">${avatar(b, 'sm')}<div class="grow"><div class="b ell">${esc(nm(b))}</div><div class="small mute ell">${esc(b.phone)}</div></div><div class="right"><div class="b" style="font-size:18px;color:var(--navy)">${M(v.principal, v.loan.currency)}</div><div class="tiny mute">${FREQ_L()[v.loan.frequency]}</div></div></div>
    <div class="prog light" style="height:8px"><i style="width:${v.progress}%"></i></div>
    <div class="row between small" style="margin-top:6px"><span class="mute">${T('បានបង់', 'Paid')} ${v.progress}%</span><span>${T('នៅសល់', 'Left')} <b>${M(v.remaining, v.loan.currency)}</b></span></div>
    ${v.status === 'overdue' ? `<div class="late" style="margin-top:4px">${I('warn', 'sm').replace('class="ic sm"', 'class="ic sm" style="display:inline;vertical-align:-3px"')} ${T(`យឺត ${v.maxLate} ថ្ងៃ · ${M(v.overdueAmount, v.loan.currency)}`, `${v.maxLate} days late · ${M(v.overdueAmount, v.loan.currency)}`)}</div>` : v.next && v.status === 'active' ? `<div class="small mute" style="margin-top:4px">${T('បង់បន្ទាប់', 'Next')}: ${fmtDate(v.next.due)} · ${M(v.next.remaining, v.loan.currency)}</div>` : ''}</button>`;
  }).join('');
}
SCREENS.loans = () => {
  const f = S.ui.lf || 'all'; const vs = allViews(); const cnt = k => vs.filter(v => v.status === k).length;
  return {
    title: T('ប្រាក់កម្ចី', 'Loans'), right: `<button class="ib" data-go="loanForm" aria-label="add">${I('plus')}</button>`,
    fab: `<button class="fab tabs" data-go="loanForm" aria-label="add">${I('plus', 'lg')}</button>`,
    body: `<div class="search">${I('search')}<input id="lq" value="${esc(S.ui.lq || '')}" placeholder="${T('ស្វែងរកលេខកម្ចី ឬឈ្មោះ', 'Search loan ID or name')}"></div>
    <div class="chips">${[['all', T('ទាំងអស់', 'All'), vs.length], ['active', T('កំពុងដំណើរការ', 'Active'), cnt('active')], ['overdue', T('យឺត', 'Overdue'), cnt('overdue')], ['paid', T('បានបង់ចប់', 'Paid'), cnt('paid')], ['cancelled', T('បានលុបចោល', 'Cancelled'), cnt('cancelled')]].map(([k, l, n]) => `<button class="chip ${f === k ? 'on' : ''}" data-act="lF" data-k="${k}">${l} (${n})</button>`).join('')}</div>
    <div id="llist">${loansListHTML()}</div><div style="height:64px"></div>`,
    bind() { $('#lq').addEventListener('input', e => { S.ui.lq = e.target.value; $('#llist').innerHTML = loansListHTML(); }); }
  };
};
ACT.lF = a => { S.ui.lf = a.dataset.k; render(); };

/* ---------- create loan ---------- */
function loanDraft() {
  return { id: V('l_id'), borrowerId: V('l_borrower'), amount: parseFloat(V('l_amount').replace(/,/g, '')) || 0, currency: S.f.cur, date: V('l_date') || iso(TODAY), interestType: S.f.itype, rate: parseFloat(V('l_rate')) || 0,
    durationMonths: parseFloat(V('l_months')) || 0, frequency: S.f.freq, customDays: parseInt(V('l_custom'), 10) || 10, firstPayment: V('l_first') || V('l_date') || iso(TODAY), fee: parseFloat(V('l_fee')) || 0, collateral: V('l_coll'), notes: V('l_notes'), status: 'open' };
}
function defaultFirst(d) { const base = parseISO(d.date); return iso(d.frequency === 'monthly' ? addMonths(base, 1) : addDays(base, stepDays(d))); }
function updCalc(src) {
  const d = loanDraft();
  if (src === 'cur') { $('#u_amount').textContent = d.currency === 'KHR' ? '៛' : '$'; $('#u_fee').textContent = d.currency === 'KHR' ? '៛' : '$'; }
  if ((src === 'date' || src === 'freq' || src === 'custom' || src === 'init') && !S.f.fpManual) { $('#l_first').value = defaultFirst(d); d.firstPayment = V('l_first'); }
  $('#g_l_custom').style.display = d.frequency === 'custom' ? '' : 'none';
  $('#g_l_rate').style.display = d.interestType === 'none' ? 'none' : '';
  const ok = d.amount > 0 && d.durationMonths > 0; const c = ok ? calcLoan(d) : { principal: 0, interest: 0, total: 0, installment: 0, n: 0, maturity: d.firstPayment };
  const set = (id, v) => { const e = $('#' + id); if (e) e.textContent = v; };
  set('c_p', M(c.principal, d.currency)); set('c_i', M(c.interest, d.currency)); set('c_t', M(c.total, d.currency)); set('c_inst', ok ? M(c.installment, d.currency) : '—'); set('c_n', c.n || '—');
  set('bar_inst', ok ? `${c.n} × ${M(c.installment, d.currency)}` : '—');
  $('#l_maturity').value = ok ? c.maturity : '';
  S.f.calc = ok ? c : null;
}
SCREENS.loanForm = (bid) => {
  const st = DB.settings; S.dirty = false;
  S.f = { cur: st.defaultCur, itype: st.defType, freq: st.defFreq, fpManual: false };
  const bs = DB.borrowers.map(b => [b.id, `${nm(b)} (${b.id})`]);
  const id = 'LN-' + TODAY.getFullYear() + '-' + String(DB.seq.ln).padStart(3, '0');
  return {
    title: T('បង្កើតប្រាក់កម្ចី', 'Create loan'), back: true,
    body: `<form class="formwrap" onsubmit="return false" novalidate>
    <div class="card">${SEL('l_borrower', T('អ្នកខ្ចី', 'Borrower'), [['', T('— ជ្រើសរើសអ្នកខ្ចី —', '— Select borrower —')], ...bs], bid || '', { req: 1, icon: 'user' })}
    ${F('l_id', T('លេខសម្គាល់កម្ចី', 'Loan ID'), { v: id, ro: 1 })}
    <div class="fg"><label>${T('រូបិយប័ណ្ណ', 'Currency')}</label>${OPT('cur', [['USD', 'USD ($)'], ['KHR', 'KHR (៛)']], st.defaultCur)}</div>
    ${F('l_amount', T('ចំនួនទឹកប្រាក់កម្ចី', 'Loan amount'), { mode: 'decimal', ph: '500', req: 1, unit: '<span id="u_amount">' + (st.defaultCur === 'KHR' ? '៛' : '$') + '</span>' })}
    ${F('l_date', T('ថ្ងៃចេញប្រាក់', 'Loan date'), { type: 'date', v: iso(TODAY), req: 1 })}</div>
    <div class="card"><div class="b" style="color:var(--navy);margin-bottom:10px">${T('ការប្រាក់ និងរយៈពេល', 'Interest & duration')}</div>
    <div class="fg"><label>${T('ប្រភេទការប្រាក់', 'Interest type')}</label>${OPT('itype', [['flat', T('ថេរ', 'Flat')], ['declining', T('តាមសមតុល្យ', 'Declining')], ['none', T('គ្មាន', 'None')]], st.defType)}</div>
    ${F('l_rate', T('អត្រាការប្រាក់ (ក្នុង ១ ខែ)', 'Interest rate (per month)'), { mode: 'decimal', v: st.defRate, unit: '%' })}
    ${F('l_months', T('រយៈពេលកម្ចី', 'Loan duration'), { mode: 'decimal', v: 6, unit: T('ខែ', 'months'), req: 1 })}
    <div class="fg"><label>${T('ការបង់ប្រាក់', 'Payment frequency')}</label>${OPT('freq', [['daily', T('រាល់ថ្ងៃ', 'Daily')], ['weekly', T('រាល់សប្តាហ៍', 'Weekly')], ['biweekly', T('រាល់ ២ សប្តាហ៍', 'Every 2 weeks')], ['monthly', T('រាល់ខែ', 'Monthly')], ['custom', T('កំណត់ខ្លួនឯង', 'Custom')]], st.defFreq, 1)}</div>
    ${F('l_custom', T('រាល់ប៉ុន្មានថ្ងៃម្តង', 'Every how many days'), { mode: 'numeric', v: 10, unit: T('ថ្ងៃ', 'days') })}
    ${F('l_first', T('ថ្ងៃបង់ដំបូង', 'First payment date'), { type: 'date', req: 1 })}
    ${F('l_maturity', T('ថ្ងៃផុតកំណត់', 'Maturity date'), { type: 'date', ro: 1, hint: T('គណនាដោយស្វ័យប្រវត្តិ', 'Calculated automatically') })}
    ${F('l_fee', T('ថ្លៃសេវា / រដ្ឋបាល (ប្រសិនបើមាន)', 'Service / admin fee (if any)'), { mode: 'decimal', v: st.defFee || '', ph: '0', unit: '<span id="u_fee">' + (st.defaultCur === 'KHR' ? '៛' : '$') + '</span>' })}</div>
    <div class="hero" id="calcBox"><div class="b gold" style="margin-bottom:8px">${I('chart', 'sm').replace('class="ic sm"', 'class="ic sm" style="display:inline;vertical-align:-3px"')} ${T('ការគណនា (គំរូ)', 'Calculation (simulated)')}</div>
     <div class="grid2" style="gap:8px"><div><div class="lab small">${T('ប្រាក់ដើម', 'Principal')}</div><div class="b" id="c_p">—</div></div><div><div class="lab small">${T('ការប្រាក់', 'Interest')}</div><div class="b" id="c_i">—</div></div>
     <div><div class="lab small">${T('សរុបត្រូវបង់', 'Total repayment')}</div><div class="b gold" id="c_t" style="font-size:19px">—</div></div><div><div class="lab small">${T('ចំនួនដង', 'Installments')}</div><div class="b" id="c_n">—</div></div></div>
     <hr style="border-color:rgba(255,255,255,.2)"><div class="row between"><span class="lab">${T('ប្រាក់បង់ម្តងៗ', 'Per installment')}</span><span class="b gold" id="c_inst" style="font-size:20px">—</span></div>
     <button type="button" class="btn sm" data-act="prevSched" style="margin-top:10px;width:100%;background:rgba(255,255,255,.14)">${I('list', 'sm')} ${T('មើលកាលវិភាគបង់ប្រាក់', 'Preview schedule')}</button>
     <p class="tiny" style="opacity:.75;margin:8px 0 0">${T('នេះជាការគណនាសាកល្បងប៉ុណ្ណោះ មិនមែនជាដំបូន្មានផ្នែកច្បាប់ ឬគណនេយ្យទេ។', 'Simulated estimate only. Not legal or accounting advice.')}</p></div>
    <div class="card">${TA('l_coll', T('ការធានា / កំណត់ចំណាំទ្រព្យធានា', 'Collateral / guarantee notes'), '', T('ឧ. សៀវភៅដី ម៉ូតូ…', 'e.g. land title, motorbike…'))}${TA('l_notes', T('កំណត់ចំណាំទូទៅ', 'General notes'), '')}</div></form>`,
    bar: `<div class="row between small" style="margin-bottom:8px"><span class="mute">${T('បង់ម្តងៗ', 'Installments')}</span><b id="bar_inst">—</b></div><div class="btnrow"><button class="btn ghost" data-act="back">${T('បោះបង់', 'Cancel')}</button><button class="btn gold" style="flex:2" data-act="saveLoan">${I('check', 'sm')} ${T('បង្កើតកម្ចី', 'Create loan')}</button></div>`,
    bind() {
      S.onOpt = (g) => { updCalc(g === 'cur' ? 'cur' : g === 'freq' ? 'freq' : 'x'); };
      $$('#content input,#content select').forEach(el => el.addEventListener('input', () => { if (el.id === 'l_first') S.f.fpManual = true; updCalc(el.id === 'l_date' ? 'date' : el.id === 'l_custom' ? 'custom' : 'x'); }));
      updCalc('init'); S.dirty = false;
    }
  };
};
ACT.prevSched = () => {
  const d = loanDraft(); if (!S.f.calc) return toast(T('សូមបញ្ចូលចំនួនទឹកប្រាក់ និងរយៈពេលសិន', 'Enter amount and duration first'));
  const c = S.f.calc;
  ovOpen(`<div class="sheet"><h3>${T('កាលវិភាគបង់ប្រាក់ (គំរូ)', 'Payment schedule (preview)')}</h3><div class="small mute" style="margin-bottom:8px">${c.n} ${T('ដង', 'installments')} · ${T('សរុប', 'total')} ${M(c.total, d.currency)}</div>
  ${c.rows.slice(0, 24).map(r => `<div class="row between small" style="padding:8px 0;border-bottom:1px solid var(--line)"><span class="b" style="width:28px">#${r.no}</span><span class="grow">${fmtDate(r.due)}</span><b>${M(r.total, d.currency)}</b></div>`).join('')}${c.n > 24 ? `<p class="small mute center">… ${T(`និងបន្ថែម ${c.n - 24} ដងទៀត`, `and ${c.n - 24} more`)}</p>` : ''}<button class="btn" style="margin-top:12px" data-act="ovClose">${T('បិទ', 'Close')}</button></div>`);
};
ACT.saveLoan = () => {
  clearErrs(); const d = loanDraft(); let bad = 0;
  if (!d.borrowerId) { setErr('l_borrower', T('សូមជ្រើសរើសអ្នកខ្ចី', 'Please select a borrower')); bad = 1; }
  if (!(d.amount > 0)) { setErr('l_amount', T('សូមបញ្ចូលចំនួនទឹកប្រាក់ធំជាង ០', 'Enter an amount greater than 0')); bad = 1; }
  else if (d.currency === 'USD' && d.amount > 100000) { setErr('l_amount', T('ចំនួនធំពេក សូមពិនិត្យម្តងទៀត', 'Amount too large, please check')); bad = 1; }
  if (d.interestType !== 'none' && (d.rate < 0 || d.rate > 30)) { setErr('l_rate', T('អត្រាត្រូវនៅចន្លោះ ០ ដល់ ៣០%', 'Rate must be between 0 and 30%')); bad = 1; }
  if (!(d.durationMonths > 0)) { setErr('l_months', T('សូមបញ្ចូលរយៈពេល', 'Enter a duration')); bad = 1; }
  if (!V('l_date')) { setErr('l_date', T('សូមជ្រើសថ្ងៃ', 'Pick a date')); bad = 1; }
  if (!V('l_first')) { setErr('l_first', T('សូមជ្រើសថ្ងៃបង់ដំបូង', 'Pick the first payment date')); bad = 1; }
  else if (V('l_first') < V('l_date')) { setErr('l_first', T('ថ្ងៃបង់ដំបូងត្រូវក្រោយថ្ងៃចេញប្រាក់', 'First payment must be after the loan date')); bad = 1; }
  if (bad) return focusFirstErr();
  confirmDlg({ icon: 'loan', title: T('បង្កើតប្រាក់កម្ចី?', 'Create this loan?'), msg: `${nm(borrowerOf(d.borrowerId))} · ${M(d.amount, d.currency)} · ${S.f.calc.n} ${T('ដង', 'installments')}`, ok: T('បង្កើត', 'Create'), fn: () => {
    d.maturity = S.f.calc.maturity; DB.loans.push(d); DB.seq.ln++; saveDB(); S.dirty = false; ovClose(); S.stack.pop(); go('loanDetail', d.id); toast(T('បានបង្កើតប្រាក់កម្ចី', 'Loan created'));
  } });
};

/* ---------- schedule rendering ---------- */
function schedHTML(v, filter) {
  const rows = v.rows.filter(r => !filter || filter === 'all' || (filter === 'unpaid' ? r.status !== 'paid' : filter === 'paid' ? r.status === 'paid' : r.status === filter));
  if (!rows.length) return emptyBlock('list', T('គ្មានទិន្នន័យ', 'Nothing here'), '');
  const cu = v.loan.currency;
  return rows.map(r => {
    const click = r.status !== 'paid' && v.status !== 'cancelled' ? `data-go="payForm" data-a="${v.loan.id}|${r.no}"` : '';
    return `<${click ? 'button' : 'div'} class="inst ${r.status}" ${click}>
    <div class="row"><span class="no">${r.no}</span><div class="grow"><div class="b">${fmtDate(r.due)}</div>${r.status === 'overdue' ? `<div class="late">${T(`យឺត ${r.daysLate} ថ្ងៃ`, `${r.daysLate} days overdue`)}</div>` : `<div class="tiny mute">${WD[S.lang][D(r.due).getDay()]}</div>`}</div>${bd(r.status)}</div>
    <div class="kv"><div><small>${T('ប្រាក់ដើម', 'Principal')}</small><b>${M(r.principal, cu)}</b></div><div><small>${T('ការប្រាក់', 'Interest')}</small><b>${M(r.interest, cu)}</b></div><div><small>${T('សរុបត្រូវបង់', 'Total due')}</small><b>${M(r.total, cu)}</b></div>
    <div><small>${T('បានបង់', 'Paid')}</small><b style="color:var(--green)">${M(r.paid, cu)}</b></div><div class="${r.status === 'overdue' ? 'hl' : ''}" style="grid-column:span 2"><small>${T('នៅសល់', 'Remaining')}</small><b>${M(r.remaining, cu)}</b></div></div></${click ? 'button' : 'div'}>`;
  }).join('');
}
SCREENS.schedule = (id) => {
  const v = loanView(DB.loans.find(l => l.id === id)); const f = S.ui.sf || 'all';
  const fs = [['all', T('ទាំងអស់', 'All')], ['unpaid', T('មិនទាន់បង់', 'Unpaid')], ['overdue', T('យឺត', 'Overdue')], ['paid', T('បានបង់', 'Paid')]];
  return { title: T('កាលវិភាគបង់ប្រាក់', 'Repayment schedule'), back: true,
    body: `<div class="card"><div class="row between"><b>${v.loan.id}</b><span class="small mute">${esc(nm(borrowerOf(v.loan.borrowerId)))}</span></div><div class="row between small mute"><span>${v.n} ${T('ដង', 'installments')}</span><span>${T('សរុប', 'Total')} ${M(v.total, v.loan.currency)}</span></div></div>
    <div class="chips">${fs.map(([k, l]) => `<button class="chip ${f === k ? 'on' : ''}" data-act="sF" data-k="${k}">${l}</button>`).join('')}</div>${schedHTML(v, f)}`,
    bar: v.next && v.status !== 'cancelled' ? `<button class="btn gold" data-go="payForm" data-a="${v.loan.id}|${v.next.no}">${I('check', 'sm')} ${T('កត់ត្រាការបង់ប្រាក់', 'Record payment')}</button>` : '' };
};
ACT.sF = a => { S.ui.sf = a.dataset.k; render(); };

/* ---------- loan detail ---------- */
SCREENS.loanDetail = (id) => {
  const loan = DB.loans.find(l => l.id === id); if (!loan) return { title: '', back: true, body: emptyBlock('loan', T('រកមិនឃើញ', 'Not found')) };
  const v = loanView(loan), b = borrowerOf(loan.borrowerId), cu = loan.currency; const tb = S.ui.ldTab || 'sched';
  const canAct = v.status === 'active' || v.status === 'overdue';
  return {
    title: loan.id, back: true,
    body: `<div class="hero"><div class="row between"><span class="lab">${T('ប្រាក់កម្ចី', 'Loan amount')}</span>${bd(v.status === 'paid' ? 'paid' : v.status, loanStLabel(v.status))}</div>
     <div class="big">${M(v.principal, cu)}</div>
     <button class="row" data-go="borrowerDetail" data-a="${b.id}" style="color:#fff;margin:4px 0 12px;text-align:left">${avatar(b, 'sm')}<div><div class="b">${esc(nm(b))}</div><div class="small" style="opacity:.8">${esc(b.phone)}</div></div></button>
     <div class="prog"><i style="width:${v.progress}%"></i></div><div class="row between small" style="margin-top:6px"><span>${T('បានបង់', 'Paid')} ${v.progress}%</span><span>${M(v.paid, cu)} / ${M(v.total, cu)}</span></div></div>
     ${v.status === 'overdue' ? `<div class="alert red">${I('warn')}<div><b>${T(`យឺត ${v.maxLate} ថ្ងៃ`, `${v.maxLate} days overdue`)}</b><div class="small">${T('ប្រាក់យឺតសរុប', 'Overdue amount')}: <b>${M(v.overdueAmount, cu)}</b></div></div></div>` : ''}
     ${v.status === 'cancelled' ? `<div class="alert gold">${I('info')}<div>${T('ប្រាក់កម្ចីនេះត្រូវបានលុបចោល។', 'This loan was cancelled.')}</div></div>` : ''}
     ${v.status === 'paid' ? `<div class="alert blue">${I('check')}<div>${T('ប្រាក់កម្ចីនេះបានបង់ចប់រួចរាល់។', 'This loan is fully paid.')}</div></div>` : ''}
     ${v.next && canAct ? `<div class="card" style="border:1.5px solid ${v.next.status === 'overdue' ? 'var(--red)' : 'var(--gold)'}"><div class="row between"><div><div class="small mute">${T('ការបង់ប្រាក់បន្ទាប់', 'Next payment')}</div><div class="b" style="font-size:20px;color:var(--navy)">${M(v.next.remaining, cu)}</div><div class="small">${fmtDate(v.next.due)}</div></div>${bd(v.next.status)}</div><button class="btn gold" style="margin-top:10px" data-go="payForm" data-a="${loan.id}|${v.next.no}">${I('check', 'sm')} ${T('កត់ត្រាការបង់ប្រាក់', 'Record payment')}</button></div>` : ''}
     <div class="card"><dl class="dl"><dt>${T('ការប្រាក់សរុប', 'Interest')}</dt><dd>${M(v.interest, cu)} <span class="mute small">(${loan.interestType === 'none' ? '0' : loan.rate}%/${T('ខែ', 'mo')})</span></dd><dt>${T('ប្រភេទការប្រាក់', 'Interest type')}</dt><dd>${ITYPE_L()[loan.interestType]}</dd><dt>${T('រយៈពេល', 'Duration')}</dt><dd>${loan.durationMonths} ${T('ខែ', 'months')}</dd><dt>${T('ការបង់', 'Frequency')}</dt><dd>${FREQ_L()[loan.frequency]} · ${v.n}×</dd><dt>${T('ថ្ងៃចេញប្រាក់', 'Loan date')}</dt><dd>${fmtDate(loan.date)}</dd><dt>${T('ថ្ងៃផុតកំណត់', 'Maturity')}</dt><dd>${fmtDate(v.maturity)}</dd><dt>${T('សរុបត្រូវបង់', 'Total repayment')}</dt><dd>${M(v.total, cu)}</dd><dt>${T('បានបង់', 'Paid')}</dt><dd style="color:var(--green)">${M(v.paid, cu)}</dd><dt>${T('នៅសល់', 'Remaining')}</dt><dd>${M(v.remaining, cu)}</dd><dt>${T('ប្រាក់យឺត', 'Overdue')}</dt><dd style="color:${v.overdueAmount ? 'var(--red)' : 'inherit'}">${M(v.overdueAmount, cu)}</dd>${loan.fee ? `<dt>${T('ថ្លៃសេវា', 'Service fee')}</dt><dd>${M(loan.fee, cu)}</dd>` : ''}</dl></div>
     <div class="seg">${[['sched', T('កាលវិភាគ', 'Schedule')], ['pays', T('ប្រវត្តិបង់', 'Payments')], ['notes', T('កំណត់ចំណាំ', 'Notes')]].map(([k, l]) => `<button class="${tb === k ? 'on' : ''}" data-act="ldTab" data-k="${k}">${l}</button>`).join('')}</div>
     ${tb === 'sched' ? `${schedHTML(v, 'all')}<button class="btn soft" data-go="schedule" data-a="${loan.id}">${I('list', 'sm')} ${T('មើលកាលវិភាគពេញអេក្រង់', 'Open full schedule')}</button>` : ''}
     ${tb === 'pays' ? (v.pays.length ? `<div class="group">${v.pays.slice().sort((a, c) => c.date.localeCompare(a.date)).map(p => `<button class="li" data-go="receipt" data-a="${p.id}"><div class="ico" style="background:var(--green-t);color:var(--green)">${I('check')}</div><div class="grow"><div class="b">${M(p.amount, p.currency)}</div><div class="small mute">${fmtDate(p.date)} · ${T('លើកទី', 'Inst.')} ${p.no} · ${METHOD_L()[p.method]}</div></div>${bd(p.type === 'partial' ? 'partial' : 'paid', p.type === 'partial' ? T('បង់ខ្លះ', 'Partial') : T('បង់ពេញ', 'Full'))}</button>`).join('')}</div>` : emptyBlock('receipt', T('មិនទាន់មានការបង់ប្រាក់', 'No payments yet'), T('ការបង់ប្រាក់ដែលបានកត់ត្រានឹងបង្ហាញនៅទីនេះ។', 'Recorded payments will appear here.'))) : ''}
     ${tb === 'notes' ? `<div class="card"><div class="b">${T('ការធានា', 'Collateral')}</div><div class="mute" style="margin-bottom:10px">${esc(loan.collateral || '—')}</div><div class="b">${T('កំណត់ចំណាំ', 'Notes')}</div><div class="mute">${esc(loan.notes || '—')}</div></div>` : ''}
     ${canAct ? `<div style="height:8px"></div><button class="btn dangerO" data-act="cancelLoan" data-id="${loan.id}">${I('x', 'sm')} ${T('លុបចោលប្រាក់កម្ចី', 'Cancel loan')}</button>` : ''}`
  };
};
ACT.ldTab = a => { S.ui.ldTab = a.dataset.k; render(); };
ACT.cancelLoan = a => {
  const l = DB.loans.find(x => x.id === a.dataset.id);
  confirmDlg({ icon: 'warn', danger: true, title: T('លុបចោលប្រាក់កម្ចី?', 'Cancel this loan?'), msg: T('ស្ថានភាពនឹងប្តូរទៅ "បានលុបចោល" ហើយមិនត្រូវបានរាប់ក្នុងបញ្ជីត្រូវប្រមូលទៀតទេ។', 'Status becomes "Cancelled" and it will no longer be counted as collectible.'), ok: T('លុបចោល', 'Cancel loan'), cancel: T('រក្សាទុក', 'Keep'), fn: () => { l.status = 'cancelled'; saveDB(); ovClose(); render(); toast(T('បានលុបចោល', 'Loan cancelled')); } });
};

/* ---------- payments tab ---------- */
function weekStart() { const d = new Date(TODAY); const wd = (d.getDay() + 6) % 7; return addDays(d, -wd); }
function periodRange(p) {
  const T0 = TODAY;
  if (p === 'today') return [T0, T0];
  if (p === 'week') return [weekStart(), addDays(weekStart(), 6)];
  if (p === 'month') return [new Date(T0.getFullYear(), T0.getMonth(), 1), new Date(T0.getFullYear(), T0.getMonth() + 1, 0)];
  if (p === 'custom') { const a = S.ui.rf ? parseISO(S.ui.rf) : new Date(T0.getFullYear(), T0.getMonth(), 1), b = S.ui.rt ? parseISO(S.ui.rt) : T0; return [a, b]; }
  return [new Date(2000, 0, 1), new Date(2100, 0, 1)];
}
function payHistHTML() {
  const f = S.ui.pf || 'all', [a, z] = periodRange(f);
  const ps = DB.payments.filter(p => { const d = parseISO(p.date); return d >= a && d <= z; }).sort((x, y) => y.date.localeCompare(x.date) || y.id.localeCompare(x.id));
  if (!ps.length) return emptyBlock('receipt', T('មិនទាន់មានការបង់ប្រាក់', 'No payments'), T('មិនមានការបង់ប្រាក់ក្នុងរយៈពេលនេះទេ។', 'No payments in this period.'));
  const tot = ps.reduce((s, p) => s + toUSD(p.amount, p.currency), 0); let last = '', out = `<div class="alert blue">${I('coin')}<div>${T('ទទួលបានសរុប', 'Collected')}: <b>${MU(tot)}</b> · ${ps.length} ${T('ដង', 'payments')}</div></div>`;
  ps.slice(0, 60).forEach(p => {
    if (p.date !== last) { out += `<div class="sec" style="margin-top:12px"><h2 style="font-size:15px">${fmtDateW(p.date)}</h2></div>`; last = p.date; }
    const l = DB.loans.find(x => x.id === p.loanId), b = borrowerOf(l.borrowerId);
    out += `<button class="card" data-go="receipt" data-a="${p.id}" style="width:100%;text-align:left;padding:10px 12px;margin-bottom:8px"><div class="row">${avatar(b, 'sm')}<div class="grow"><div class="b ell">${esc(nm(b))}</div><div class="small mute ell">${p.loanId} · ${T('លើកទី', 'Inst.')} ${p.no} · ${METHOD_L()[p.method]}</div></div><div class="right"><div class="b" style="color:var(--green)">${M(p.amount, p.currency)}</div>${bd(p.type === 'partial' ? 'partial' : 'paid', p.type === 'partial' ? T('បង់ខ្លះ', 'Partial') : T('បង់ពេញ', 'Full'))}</div></div></button>`;
  });
  return out;
}
SCREENS.payments = () => {
  const seg = S.ui.pseg || 'due', items = dueItems().filter(x => x.d <= 30); const f = S.ui.pf || 'all';
  return {
    title: T('ការបង់ប្រាក់', 'Payments'), fab: `<button class="fab tabs" data-go="payForm" aria-label="record">${I('plus', 'lg')}</button>`,
    body: `<button class="btn gold" data-go="payForm" style="margin-bottom:12px">${I('check', 'sm')} ${T('កត់ត្រាការបង់ប្រាក់', 'Record payment')}</button>
    <div class="seg"><button class="${seg === 'due' ? 'on' : ''}" data-act="pseg" data-k="due">${T('ត្រូវបង់', 'To collect')} (${items.length})</button><button class="${seg === 'hist' ? 'on' : ''}" data-act="pseg" data-k="hist">${T('ប្រវត្តិ', 'History')}</button></div>
    ${seg === 'due' ? (items.length ? items.map(x => dueCard(x)).join('') : emptyBlock('check', T('គ្មានអ្វីត្រូវប្រមូល', 'Nothing to collect'), T('គ្មានការបង់ប្រាក់ក្នុង ៣០ ថ្ងៃខាងមុខ។', 'No payments in the next 30 days.')))
      : `<div class="chips">${[['all', T('ទាំងអស់', 'All')], ['today', T('ថ្ងៃនេះ', 'Today')], ['week', T('សប្តាហ៍នេះ', 'This week')], ['month', T('ខែនេះ', 'This month')]].map(([k, l]) => `<button class="chip ${f === k ? 'on' : ''}" data-act="pF" data-k="${k}">${l}</button>`).join('')}</div>${payHistHTML()}`}
    <div style="height:64px"></div>`
  };
};
ACT.pseg = a => { S.ui.pseg = a.dataset.k; render(); };
ACT.pF = a => { S.ui.pf = a.dataset.k; render(); };

/* ---------- record payment ---------- */
function openLoansOf(bid) { return allViews().filter(v => v.loan.borrowerId === bid && (v.status === 'active' || v.status === 'overdue')); }
SCREENS.payForm = (arg) => {
  let bid = '', lid = '', no = '';
  if (arg && arg.startsWith('b:')) bid = arg.slice(2); else if (arg) { [lid, no] = arg.split('|'); const l = DB.loans.find(x => x.id === lid); if (l) bid = l.borrowerId; }
  S.f = { ptype: 'full', initL: lid, initN: no }; S.dirty = false;
  const bs = DB.borrowers.filter(b => openLoansOf(b.id).length);
  if (!bs.length) return { title: T('កត់ត្រាការបង់ប្រាក់', 'Record payment'), back: true, body: emptyBlock('loan', T('គ្មានប្រាក់កម្ចីសកម្ម', 'No active loans'), T('សូមបង្កើតប្រាក់កម្ចីសិន មុននឹងកត់ត្រាការបង់ប្រាក់។', 'Create a loan first before recording payments.'), `<div style="margin-top:14px"><button class="btn" data-go="loanForm">${T('បង្កើតប្រាក់កម្ចី', 'Create loan')}</button></div>`) };
  return {
    title: T('កត់ត្រាការបង់ប្រាក់', 'Record payment'), back: true,
    body: `<form class="formwrap" onsubmit="return false" novalidate><div class="card">
    ${SEL('p_borrower', T('អ្នកខ្ចី', 'Borrower'), [['', T('— ជ្រើសរើសអ្នកខ្ចី —', '— Select borrower —')], ...bs.map(b => [b.id, `${nm(b)} (${b.phone})`])], bid, { req: 1, icon: 'user' })}
    ${SEL('p_loan', T('ប្រាក់កម្ចី', 'Loan'), [['', '—']], '', { req: 1, icon: 'loan' })}
    ${SEL('p_inst', T('លើកទី / ការបង់ត្រូវដល់', 'Installment / due'), [['', '—']], '', { req: 1, icon: 'calendar' })}
    <div id="payInfo"></div></div>
    <div class="card"><div class="fg"><label>${T('ប្រភេទការបង់', 'Payment type')}</label>${OPT('ptype', [['full', T('បង់ពេញ', 'Full payment')], ['partial', T('បង់ផ្នែកខ្លះ', 'Partial payment')]], 'full')}</div>
    ${F('p_amount', T('ចំនួនទឹកប្រាក់ដែលបានបង់', 'Amount paid'), { mode: 'decimal', req: 1, unit: '<span id="p_unit">$</span>' })}
    ${F('p_cur', T('រូបិយប័ណ្ណ', 'Currency'), { ro: 1, hint: T('ស្របតាមប្រាក់កម្ចី', 'Same as the loan') })}
    ${F('p_date', T('ថ្ងៃបង់', 'Payment date'), { type: 'date', v: iso(TODAY), max: iso(TODAY), req: 1 })}
    ${SEL('p_method', T('វិធីបង់', 'Payment method'), [['cash', METHOD_L().cash], ['bank', METHOD_L().bank], ['wallet', METHOD_L().wallet]], 'cash')}
    ${TA('p_note', T('កំណត់ចំណាំ', 'Note'), '')}
    <p class="hint">${T('សាកល្បង៖ មិនមានការតភ្ជាប់ទៅការទូទាត់ ឬធនាគារពិតទេ — គ្រាន់តែកត់ត្រា។', 'Demo: no real payment or bank connection — record keeping only.')}</p></div></form>`,
    bar: `<div class="btnrow"><button class="btn ghost" data-act="back">${T('បោះបង់', 'Cancel')}</button><button class="btn green" style="flex:2" data-act="savePay">${I('check', 'sm')} ${T('រក្សាទុកការបង់ប្រាក់', 'Save payment')}</button></div>`,
    bind() {
      const fillLoans = () => {
        const b = V('p_borrower'), ls = b ? openLoansOf(b) : []; const sel = $('#p_loan'); const keep = S.f.initL || sel.value;
        sel.innerHTML = (ls.length === 1 ? '' : `<option value="">${T('— ជ្រើសរើសកម្ចី —', '— Select loan —')}</option>`) + ls.map(v => `<option value="${v.loan.id}">${v.loan.id} · ${M(v.principal, v.loan.currency)} · ${T('នៅសល់', 'left')} ${M(v.remaining, v.loan.currency)}</option>`).join('');
        if (keep && ls.some(v => v.loan.id === keep)) sel.value = keep; S.f.initL = ''; fillInst();
      };
      const fillInst = () => {
        const lid = V('p_loan'), sel = $('#p_inst'); const l = DB.loans.find(x => x.id === lid);
        if (!l) { sel.innerHTML = `<option value="">—</option>`; $('#payInfo').innerHTML = ''; $('#p_cur').value = ''; $('#p_amount').value = ''; return; }
        const v = loanView(l), rows = v.rows.filter(r => r.status !== 'paid');
        sel.innerHTML = rows.map(r => `<option value="${r.no}">${T('លើកទី', 'Inst.')} ${r.no} · ${fmtDateS(r.due)} · ${T('នៅសល់', 'left')} ${M(r.remaining, l.currency)} · ${ST()[r.status]}</option>`).join('');
        const want = S.f.initN || (v.next && v.next.no); if (want && rows.some(r => String(r.no) === String(want))) sel.value = want; S.f.initN = '';
        $('#p_cur').value = l.currency === 'KHR' ? 'KHR (៛)' : 'USD ($)'; $('#p_unit').textContent = l.currency === 'KHR' ? '៛' : '$';
        $('#payInfo').innerHTML = `<div class="alert ${v.status === 'overdue' ? 'red' : 'blue'}" style="margin:0">${I(v.status === 'overdue' ? 'warn' : 'info')}<div class="small">${T('នៅសល់សរុប', 'Total left')}: <b>${M(v.remaining, l.currency)}</b>${v.overdueAmount ? ` · ${T('យឺត', 'overdue')}: <b>${M(v.overdueAmount, l.currency)}</b>` : ''}</div></div>`;
        autoAmt();
      };
      const autoAmt = () => {
        const l = DB.loans.find(x => x.id === V('p_loan')); if (!l) return; const row = loanView(l).rows.find(r => String(r.no) === V('p_inst')); const a = $('#p_amount'); const full = S.f.ptype === 'full';
        a.readOnly = full; a.parentElement.classList.toggle('dis', full);
        if (full && row) a.value = row.remaining; else if (!full) { a.value = ''; a.focus({ preventScroll: true }); }
      };
      S.onOpt = g => { if (g === 'ptype') autoAmt(); };
      $('#p_borrower').addEventListener('change', () => { S.f.initL = ''; S.f.initN = ''; fillLoans(); });
      $('#p_loan').addEventListener('change', () => { S.f.initN = ''; fillInst(); });
      $('#p_inst').addEventListener('change', autoAmt);
      fillLoans(); S.dirty = false;
    }
  };
};
ACT.savePay = () => {
  clearErrs(); let bad = 0;
  const l = DB.loans.find(x => x.id === V('p_loan'));
  if (!V('p_borrower')) { setErr('p_borrower', T('សូមជ្រើសរើសអ្នកខ្ចី', 'Select a borrower')); bad = 1; }
  else if (!l) { setErr('p_loan', T('សូមជ្រើសរើសប្រាក់កម្ចី', 'Select a loan')); bad = 1; }
  else if (!V('p_inst')) { setErr('p_inst', T('សូមជ្រើសរើសការបង់', 'Select an installment')); bad = 1; }
  if (!bad) {
    const row = loanView(l).rows.find(r => String(r.no) === V('p_inst')); const amt = parseFloat(V('p_amount').replace(/,/g, '')); const eps = EPS(l.currency);
    if (!(amt > 0)) { setErr('p_amount', T('សូមបញ្ចូលចំនួនទឹកប្រាក់ធំជាង ០', 'Enter an amount greater than 0')); bad = 1; }
    else if (amt > row.remaining + eps) { setErr('p_amount', T(`ចំនួនលើសពីប្រាក់នៅសល់ (${M(row.remaining, l.currency)})`, `More than remaining (${M(row.remaining, l.currency)})`)); bad = 1; }
    else if (S.f.ptype === 'partial' && amt >= row.remaining - eps) { setErr('p_amount', T('នេះគឺជាការបង់ពេញ សូមជ្រើស "បង់ពេញ"', 'This covers the full amount — choose "Full payment"')); bad = 1; }
    if (!V('p_date')) { setErr('p_date', T('សូមជ្រើសថ្ងៃ', 'Pick a date')); bad = 1; } else if (V('p_date') > iso(TODAY)) { setErr('p_date', T('មិនអាចជាថ្ងៃអនាគត', 'Cannot be a future date')); bad = 1; }
    if (!bad) {
      const p = { id: 'PM-' + String(DB.seq.pm).padStart(4, '0'), loanId: l.id, no: row.no, date: V('p_date'), amount: amt, currency: l.currency, type: amt >= row.remaining - eps ? 'full' : 'partial', method: V('p_method'), note: V('p_note') };
      DB.seq.pm++; DB.payments.push(p); saveDB(); S.dirty = false; S.stack.pop(); go('receipt', p.id); return;
    }
  }
  focusFirstErr();
};

/* ---------- receipt ---------- */
SCREENS.receipt = (id) => {
  const p = DB.payments.find(x => x.id === id); if (!p) return { title: '', back: true, body: emptyBlock('receipt', T('រកមិនឃើញ', 'Not found')) };
  const l = DB.loans.find(x => x.id === p.loanId), b = borrowerOf(l.borrowerId), v = loanView(l), cu = l.currency;
  const rc = 'RC-' + p.date.slice(0, 4) + '-' + p.id.slice(3);
  const nextTxt = v.status === 'paid' ? T('បានបង់ចប់ 🎉', 'Fully paid 🎉') : v.next ? `${fmtDate(v.next.due)} · ${M(v.next.remaining, cu)}` : '—';
  return {
    title: T('បង្កាន់ដៃ', 'Receipt'), back: true,
    body: `<div class="receipt"><div class="wm">DEMO</div><div class="okc">${I('check', 'lg')}</div><div class="center b" style="font-size:19px;color:var(--green)">${T('កត់ត្រាបានជោគជ័យ', 'Payment recorded')}</div><div class="center mute small">${rc}</div>
     <div class="center b" style="font-size:34px;margin:10px 0 2px;color:var(--navy)">${M(p.amount, cu)}</div><div class="center">${bd(p.type === 'partial' ? 'partial' : 'paid', p.type === 'partial' ? T('បង់ខ្លះ', 'Partial payment') : T('បង់ពេញ', 'Full payment'))}</div><div class="dash"></div>
     <dl class="dl"><dt>${T('អ្នកខ្ចី', 'Borrower')}</dt><dd>${esc(nm(b))}</dd><dt>${T('លេខកម្ចី', 'Loan ID')}</dt><dd>${l.id}</dd><dt>${T('លើកទី', 'Installment')}</dt><dd>${p.no} / ${v.n}</dd><dt>${T('ថ្ងៃបង់', 'Date')}</dt><dd>${fmtDate(p.date)}</dd><dt>${T('វិធីបង់', 'Method')}</dt><dd>${METHOD_L()[p.method]}</dd></dl><div class="dash"></div>
     <dl class="dl"><dt>${T('សមតុល្យនៅសល់', 'Remaining balance')}</dt><dd style="font-size:17px">${M(v.remaining, cu)}</dd><dt>${T('ការបង់បន្ទាប់', 'Next payment')}</dt><dd>${nextTxt}</dd></dl>${p.note ? `<div class="dash"></div><div class="small mute">${esc(p.note)}</div>` : ''}<div style="height:10px"></div></div>
     <button class="btn gold" data-act="shareRc" data-id="${p.id}">${I('share', 'sm')} ${T('ចែករំលែកបង្កាន់ដៃ', 'Share receipt')}</button>
     <div class="btnrow" style="margin-top:8px"><button class="btn ghost" data-go="loanDetail" data-a="${l.id}">${T('មើលប្រាក់កម្ចី', 'View loan')}</button><button class="btn soft" data-act="rcDone">${T('រួចរាល់', 'Done')}</button></div>`
  };
};
ACT.rcDone = () => root('payments');
ACT.shareRc = () => ovOpen(`<div class="sheet"><h3>${T('ចែករំលែកបង្កាន់ដៃ', 'Share receipt')}</h3><p class="small mute">${T('សាកល្បង៖ មិនបានផ្ញើអ្វីទេ។', 'Demo: nothing is actually sent.')}</p>${[['send', 'Telegram'], ['phone', 'SMS'], ['image', T('រក្សាទុកជារូបភាព', 'Save as image')], ['share', T('កម្មវិធីផ្សេងទៀត…', 'More apps…')]].map(([ic, l]) => `<button class="sheetopt" data-act="fakeShare" data-l="${esc(l)}">${I(ic)} ${l}</button>`).join('')}<button class="btn ghost" style="margin-top:10px" data-act="ovClose">${T('បិទ', 'Close')}</button></div>`);
ACT.fakeShare = a => { ovClose(); toast(T(`(សាកល្បង) បានចែករំលែកតាម ${a.dataset.l}`, `(Demo) Shared via ${a.dataset.l}`)); };
