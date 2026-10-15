/* Screens A: splash, login, home, notifications, borrowers */
'use strict';
const LOGO = `<svg width="60" height="60" viewBox="0 0 64 64"><rect x="8" y="12" width="48" height="40" rx="8" fill="#14284B"/><path d="M8 24h48" stroke="#C9A24B" stroke-width="4"/><circle cx="32" cy="38" r="8" fill="#C9A24B"/><path d="M32 33v10M29 36.5c0-1.3 1.3-2 3-2s3 .7 3 2-1.3 1.8-3 2.4-3 1.1-3 2.4 1.3 2 3 2 3-.7 3-2" fill="none" stroke="#14284B" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const appName = () => T('សៀវភៅកម្ចី', 'Loan Book');

/* ---------- splash ---------- */
SCREENS.splash = () => ({
  raw: `<div class="splash"><div class="logo">${LOGO}</div><h1>${appName()}</h1><p>${T('គ្រប់គ្រងប្រាក់កម្ចីរបស់អ្នកឱ្យងាយស្រួល', 'Manage your personal loans, simply')}</p><div class="spin"></div><p class="tiny" style="margin-top:20px;opacity:.6">DEMO · BizWeb KH · C066</p></div>`,
  bind() { setTimeout(() => { if (cur().n === 'splash') root(S.logged ? 'home' : 'login'); }, 1700); }
});

/* ---------- login ---------- */
SCREENS.login = () => ({
  raw: `<div class="login"><div class="top"><div class="lg"><button class="langbtn" data-act="langToggle">${I('globe', 'sm')} ${S.lang === 'kh' ? 'EN' : 'ខ្មែរ'}</button></div>
  <div class="logo" style="margin:0 auto 10px;width:80px;height:80px;border-radius:22px">${LOGO}</div><h1 style="margin:0;font-size:26px">${appName()}</h1><p style="margin:4px 0 0;opacity:.85">${T('ចូលគណនីរបស់អ្នក', 'Sign in to your account')}</p></div>
  <form class="form formwrap" id="loginForm" onsubmit="return false" novalidate>
  <div class="alert red" id="loginErr" style="display:none">${I('warn')}<div>${T('លេខទូរស័ព្ទ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។', 'Wrong phone or password. Please try again.')}</div></div>
  ${F('lu', T('ឈ្មោះអ្នកប្រើ / លេខទូរស័ព្ទ', 'Username / Phone'), { icon: 'user', ph: T('បញ្ចូលលេខទូរស័ព្ទ', 'Enter phone number'), mode: 'tel', req: 1 })}
  <div class="fg" id="g_lp"><label for="lp">${T('ពាក្យសម្ងាត់', 'Password')} <span class="req">*</span></label>
   <div class="inp">${I('lock', 'sm')}<input id="lp" type="password" placeholder="${T('បញ្ចូលពាក្យសម្ងាត់', 'Enter password')}" autocomplete="off"><button type="button" data-act="togglePw" aria-label="show/hide" style="width:44px;height:44px;display:grid;place-items:center;color:var(--mute)">${I('eye')}</button></div>
   <div class="errmsg" id="e_lp">${I('warn', 'sm')}<span></span></div></div>
  <button class="btn" data-act="doLogin" type="button">${T('ចូលគណនី', 'Login')}</button>
  <p class="center" style="margin:14px 0 0"><a class="link" data-act="forgot">${T('ភ្លេចពាក្យសម្ងាត់?', 'Forgot password?')}</a></p></form>
  <p class="center tiny mute" style="padding:0 20px 20px">${T('ឧបករណ៍សាកល្បងសម្រាប់ពិនិត្យ។ គ្មានទិន្នន័យពិតទេ។', 'Review demo. No real data.')}</p></div>`,
  bind() { $('#loginForm').addEventListener('keydown', e => { if (e.key === 'Enter') ACT.doLogin(); }); }
});
ACT.langToggle = () => setLang(S.lang === 'kh' ? 'en' : 'kh');
ACT.togglePw = a => { const i = a.parentElement.querySelector('input'); const show = i.type === 'password'; i.type = show ? 'text' : 'password'; a.innerHTML = I(show ? 'eyeoff' : 'eye'); };
ACT.forgot = () => infoDlg(T('ភ្លេចពាក្យសម្ងាត់', 'Forgot password'), T('មុខងារនេះជាគំរូ។ ក្នុងប្រព័ន្ធពិត យើងនឹងផ្ញើលេខកូដផ្ទៀងផ្ទាត់ទៅទូរស័ព្ទរបស់អ្នក។', 'Placeholder. In the real system a verification code will be sent to your phone.'), 'key');
ACT.doLogin = () => {
  clearErrs(); $('#loginErr').style.display = 'none';
  const u = V('lu'), p = $('#lp').value; let bad = 0;
  if (!u) { setErr('lu', T('សូមបញ្ចូលលេខទូរស័ព្ទ ឬឈ្មោះអ្នកប្រើ', 'Please enter your phone or username')); bad = 1; }
  if (!p) { setErr('lp', T('សូមបញ្ចូលពាក្យសម្ងាត់', 'Please enter your password')); bad = 1; }
  if (bad) return focusFirstErr();
  const okU = digits(u) === digits(DB.owner.phone) || u.toLowerCase() === 'admin';
  if (!okU || p !== DB.owner.password) { $('#loginErr').style.display = 'flex'; return; }
  S.logged = true; try { sessionStorage.setItem('c066-in', '1'); } catch (e) {}
  root('home'); setTimeout(announceDue, 1400);
};
function announceDue() {
  if (!S.logged) return;
  const it = dueItems(); const t = it.filter(x => x.d === 0).length, o = it.filter(x => x.d < 0).length;
  if (t + o) pushBanner(appName(), T(`ថ្ងៃនេះមាន ${t} ដល់ថ្ងៃ និង ${o} យឺត។ ចុចដើម្បីមើល។`, `${t} due today and ${o} overdue. Tap to view.`), 'notifications');
}

/* ---------- due card ---------- */
function dueCard(x, full) {
  const { b, v, r } = x; const st = r.status === 'upcoming' ? 'soon' : r.status;
  const when = x.d < 0 ? `<span class="late">${T(`យឺត ${-x.d} ថ្ងៃ`, `${-x.d} day${-x.d > 1 ? 's' : ''} overdue`)}</span>` : x.d === 0 ? `<span class="b" style="color:var(--blue)">${T('ថ្ងៃនេះ', 'Today')}</span>` : x.d === 1 ? `<span class="b" style="color:var(--amber)">${T('ស្អែក', 'Tomorrow')}</span>` : `<span class="mute small">${T(`ក្នុង ${x.d} ថ្ងៃ`, `in ${x.d} days`)}</span>`;
  return `<div class="due ${st}">
   <div class="row" data-go="loanDetail" data-a="${v.loan.id}" style="cursor:pointer">${avatar(b, 'sm')}<div class="grow"><div class="b ell">${esc(nm(b))}</div><div class="small mute ell">${esc(b.phone)} · ${v.loan.id}</div></div>
    <div class="right"><div class="amt">${M(x.amount, x.cur)}</div>${when}</div></div>
   <div class="row between small"><span class="mute">${I('calendar', 'sm')}</span><span class="grow">${fmtDate(r.due)} · ${T('លើកទី', 'Inst.')} ${r.no}/${v.n}</span>${bd(st === 'upcoming' ? 'soon' : st)}${r.paid > 0 ? bd('partial') : ''}</div>
   ${full ? `<div class="btnrow"><button class="btn xs ghost" data-act="tel" data-n="${esc(b.phone)}" data-name="${esc(nm(b))}">${I('phone', 'sm')} ${T('ហៅ', 'Call')}</button><button class="btn xs gold" data-go="payForm" data-a="${v.loan.id}|${r.no}">${I('check', 'sm')} ${T('កត់ត្រាបង់', 'Record')}</button><button class="btn xs soft" data-go="loanDetail" data-a="${v.loan.id}">${I('loan', 'sm')} ${T('មើល', 'View')}</button></div>`
     : `<div class="btnrow"><button class="btn xs ghost" data-act="tel" data-n="${esc(b.phone)}" data-name="${esc(nm(b))}">${I('phone', 'sm')} ${T('ហៅ', 'Call')}</button><button class="btn xs gold" data-go="payForm" data-a="${v.loan.id}|${r.no}">${I('check', 'sm')} ${T('កត់ត្រាបង់', 'Record')}</button></div>`}
  </div>`;
}
function emptyBlock(icon, title, msg, btn) {
  return `<div class="empty"><div class="circle">${I(icon, 'lg')}</div><h3>${title}</h3><div>${msg || ''}</div>${btn || ''}</div>`;
}

/* ---------- home ---------- */
SCREENS.home = () => {
  const items = dueItems(); const vs = allViews().filter(v => v.status !== 'cancelled');
  const lent = vs.reduce((s, v) => s + toUSD(v.principal, v.loan.currency), 0);
  const out = vs.reduce((s, v) => s + toUSD(v.remaining, v.loan.currency), 0);
  const ms = TODAY.getFullYear() + '-' + pad(TODAY.getMonth() + 1);
  const month = DB.payments.filter(p => p.date.startsWith(ms)).reduce((s, p) => s + toUSD(p.amount, p.currency), 0);
  const td = items.filter(x => x.d === 0), od = items.filter(x => x.d < 0);
  const tdAmt = td.reduce((s, x) => s + toUSD(x.amount, x.cur), 0), odAmt = od.reduce((s, x) => s + toUSD(x.amount, x.cur), 0);
  const seg = S.ui.homeSeg || 'today';
  const list = seg === 'today' ? td : seg === 'tomorrow' ? items.filter(x => x.d === 1) : items.filter(x => x.d >= 2 && x.d <= 7);
  const badge = td.length + od.length;
  const hello = T('សួស្តី', 'Hello');
  return {
    hdr: `<div class="hdr" style="padding-top:10px"><button class="row" data-go="profile" style="gap:10px;flex:1;min-width:0;text-align:left;color:#fff"><div class="avatar sm" style="background:var(--gold);color:#2B2208;${DB.owner.photo ? `background-image:url('${DB.owner.photo}')` : ''}">${DB.owner.photo ? '' : esc(Array.from(DB.owner.name.replace(/^(Mr\.?|Ms\.?|លោក)\s*/i, ''))[0] || 'M')}</div><div class="grow"><div class="small" style="opacity:.8">${hello}</div><div class="b ell">${esc(DB.owner.name)}</div></div></button>
      <button class="ib" data-act="langToggle" aria-label="language"><span class="b" style="font-size:13px">${S.lang === 'kh' ? 'EN' : 'ខ្មែរ'}</span></button>
      <button class="ib" data-go="notifications" aria-label="notifications">${I('bell')}${badge ? `<span class="badge-dot">${badge}</span>` : ''}</button></div>`,
    body: `
    ${od.length ? `<button class="alert red" data-go="notifications" data-a="overdue" style="width:100%;text-align:left">${I('warn')}<div class="grow"><b>${T(`មាន ${od.length} ការបង់យឺត`, `${od.length} overdue payment${od.length > 1 ? 's' : ''}`)}</b><div class="small">${T('សរុប', 'Total')} ${MU(odAmt)} · ${T('ចុចដើម្បីមើល', 'tap to view')}</div></div>${I('chev')}</button>` : ''}
    <div class="grid2">
      <div class="stat">${I('users')}<div class="l">${T('ចំនួនអ្នកខ្ចីសរុប', 'Total borrowers')}</div><div class="v">${DB.borrowers.length}</div><div class="s">${T('នាក់', 'people')}</div></div>
      <div class="stat">${I('loan')}<div class="l">${T('ប្រាក់កម្ចីសរុប', 'Total loaned')}</div><div class="v">${MU(lent)}</div><div class="s">${vs.length} ${T('កិច្ចសន្យា', 'loans')}</div></div>
      <div class="stat">${I('coin')}<div class="l">${T('ប្រាក់នៅសល់ត្រូវប្រមូល', 'Left to collect')}</div><div class="v">${MU(out)}</div><div class="s">${T('រួមទាំងការប្រាក់', 'incl. interest')}</div></div>
      <div class="stat green">${I('check')}<div class="l">${T('ប្រាក់ទទួលបានខែនេះ', 'Collected this month')}</div><div class="v">${MU(month)}</div><div class="s">${MON[S.lang][TODAY.getMonth()]}</div></div>
      <button class="stat blue" data-go="notifications" data-a="today">${I('calendar')}<div class="l">${T('ការបង់ប្រាក់ដល់ថ្ងៃនេះ', 'Due today')}</div><div class="v">${td.length} <span class="small mute">· ${MU(tdAmt)}</span></div><div class="s">${T('ចុចមើល', 'tap to view')}</div></button>
      <button class="stat ${od.length ? 'red' : ''}" data-go="notifications" data-a="overdue">${I('warn')}<div class="l">${T('ការបង់ប្រាក់យឺត', 'Overdue payments')}</div><div class="v">${od.length} <span class="small mute">· ${MU(odAmt)}</span></div><div class="s">${T('ចុចមើល', 'tap to view')}</div></button>
    </div>
    <div class="sec"><h2>${T('ធ្វើរហ័ស', 'Quick actions')}</h2></div>
    <div class="grid3">
      ${[['users', T('បន្ថែមអ្នកខ្ចី', 'Add borrower'), 'borrowerForm'], ['loan', T('បង្កើតប្រាក់កម្ចី', 'Create loan'), 'loanForm'], ['receipt', T('កត់ត្រាការបង់ប្រាក់', 'Record payment'), 'payForm']].map(([ic, l, g]) => `<button class="card" data-go="${g}" style="margin:0;padding:12px 6px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;font-weight:600;font-size:13.5px;line-height:1.4"><span style="width:46px;height:46px;border-radius:14px;background:var(--gold-tint);color:#8A6A14;display:grid;place-items:center">${I(ic, 'lg')}</span>${l}</button>`).join('')}
    </div>
    <div class="sec"><h2>${T('ការបង់ប្រាក់ជិតដល់ថ្ងៃកំណត់', 'Upcoming payments')}</h2><a data-go="notifications">${T('មើលទាំងអស់', 'View all')}</a></div>
    <div class="seg">${[['today', T('ថ្ងៃនេះ', 'Today'), td.length], ['tomorrow', T('ស្អែក', 'Tomorrow'), items.filter(x => x.d === 1).length], ['week', T('៧ ថ្ងៃ', 'Next 7 days'), items.filter(x => x.d >= 2 && x.d <= 7).length]].map(([k, l, n]) => `<button class="${seg === k ? 'on' : ''}" data-act="homeSeg" data-k="${k}">${l} (${n})</button>`).join('')}</div>
    ${list.length ? list.map(x => dueCard(x)).join('') : emptyBlock('check', T('គ្មានការបង់ប្រាក់', 'Nothing due'), T('មិនមានអ្នកត្រូវបង់ក្នុងរយៈពេលនេះទេ។', 'No payments due in this period.'))}`
  };
};
ACT.homeSeg = a => { S.ui.homeSeg = a.dataset.k; render(); };

/* ---------- notifications ---------- */
SCREENS.notifications = (arg, r) => {
  if (r && !r.init) { S.ui.nf = arg || 'all'; r.init = 1; }
  const f = S.ui.nf || 'all'; const items = dueItems();
  const G = [['today', T('ដល់ថ្ងៃនេះ', 'Due today'), items.filter(x => x.d === 0)], ['tomorrow', T('ដល់ស្អែក', 'Due tomorrow'), items.filter(x => x.d === 1)], ['week', T('ក្នុងសប្តាហ៍នេះ', 'Due this week'), items.filter(x => x.d >= 2 && x.d <= 7)], ['overdue', T('ការបង់យឺត', 'Overdue'), items.filter(x => x.d < 0).reverse()]];
  const order = f === 'all' ? [G[3], G[0], G[1], G[2]] : G.filter(g => g[0] === f);
  return {
    title: T('ការជូនដំណឹង', 'Notifications'), back: true, right: `<button class="ib" data-go="notifSettings" aria-label="settings">${I('gear')}</button>`,
    body: `<div class="chips">${[['all', T('ទាំងអស់', 'All')], ...G.map(g => [g[0], g[1]])].map(([k, l]) => { const n = k === 'all' ? 0 : G.find(g => g[0] === k)[2].length; return `<button class="chip ${f === k ? 'on' : ''}" data-act="nfF" data-k="${k}">${l}${k === 'overdue' && n ? `<span class="n">${n}</span>` : ''}</button>`; }).join('')}</div>
    <div class="alert blue">${I('bell')}<div class="small">${T('ក្នុងប្រព័ន្ធពិត ការជូនដំណឹងនឹងផ្ញើទៅទូរស័ព្ទរបស់លោកដោយស្វ័យប្រវត្តិ។ ឥឡូវនេះជាការក្លែងធ្វើ។', 'In the real system reminders will be pushed to your phone automatically. Simulated here.')}</div></div>
    ${order.map(([k, l, arr]) => `<div class="sec"><h2 ${k === 'overdue' ? 'style="color:var(--red)"' : ''}>${l} (${arr.length})</h2></div>${arr.length ? arr.map(x => dueCard(x, true)).join('') : `<div class="card flat center mute small">${T('គ្មាន', 'None')} ✓</div>`}`).join('')}`
  };
};
ACT.nfF = a => { S.ui.nf = a.dataset.k; render(); };

/* ---------- borrowers list ---------- */
function borrowerListHTML() {
  const q = (S.ui.bq || '').toLowerCase().trim(), f = S.ui.bf || 'all';
  const rows = DB.borrowers.map(b => ({ b, s: borrowerSummary(b) })).filter(({ b, s }) => {
    if (f !== 'all' && s.status !== f) return false;
    if (!q) return true;
    return [b.name, b.nameEn, b.phone, b.id, digits(b.phone)].some(x => String(x).toLowerCase().includes(q)) || (digits(q) && digits(b.phone).includes(digits(q)));
  });
  if (!rows.length) return emptyBlock('users', T('រកមិនឃើញអ្នកខ្ចី', 'No borrowers found'), T('សូមសាកល្បងពាក្យស្វែងរកផ្សេង ឬបន្ថែមអ្នកខ្ចីថ្មី។', 'Try another search or add a new borrower.'), `<div style="margin-top:14px"><button class="btn" data-go="borrowerForm">${I('plus', 'sm')} ${T('បន្ថែមអ្នកខ្ចី', 'Add borrower')}</button></div>`);
  return rows.map(({ b, s }) => `<button class="card" data-go="borrowerDetail" data-a="${b.id}" style="width:100%;text-align:left;display:block">
   <div class="row">${avatar(b)}<div class="grow"><div class="row between"><span class="b ell">${esc(nm(b))}</span>${bd(s.status === 'completed' ? 'completed' : s.status)}</div>
   <div class="small mute ell">${b.id} · ${esc(b.phone)}</div><div class="small mute ell">${I('pin', 'sm').replace('class="ic sm"', 'class="ic sm" style="display:inline;vertical-align:-3px"')} ${esc(loc(b))}</div></div></div>
   <div class="kv" style="grid-template-columns:1fr 1fr"><div><small>${T('កម្ចីកំពុងដំណើរការ', 'Active loans')}</small><b>${s.act.length}</b></div><div class="${s.status === 'overdue' ? 'hl' : ''}"><small>${T('នៅសល់', 'Remaining')}</small><b>${MU(s.remaining)}</b></div></div></button>`).join('');
}
SCREENS.borrowers = () => {
  const f = S.ui.bf || 'all'; const cnt = k => DB.borrowers.filter(b => borrowerSummary(b).status === k).length;
  return {
    title: T('អ្នកខ្ចី', 'Borrowers'), right: `<button class="ib" data-go="borrowerForm" aria-label="add">${I('plus')}</button>`,
    fab: `<button class="fab tabs" data-go="borrowerForm" aria-label="add">${I('plus', 'lg')}</button>`,
    body: `<div class="search">${I('search')}<input id="bq" value="${esc(S.ui.bq || '')}" placeholder="${T('ស្វែងរកឈ្មោះ លេខទូរស័ព្ទ ឬ ID', 'Search name, phone or ID')}"></div>
    <div class="chips">${[['all', T('ទាំងអស់', 'All'), DB.borrowers.length], ['active', T('កំពុងខ្ចី', 'Active'), cnt('active')], ['overdue', T('យឺត', 'Overdue'), cnt('overdue')], ['completed', T('បានបញ្ចប់', 'Completed'), cnt('completed')]].map(([k, l, n]) => `<button class="chip ${f === k ? 'on' : ''}" data-act="bF" data-k="${k}">${l} (${n})</button>`).join('')}</div>
    <div id="blist">${borrowerListHTML()}</div><div style="height:64px"></div>`,
    bind() { $('#bq').addEventListener('input', e => { S.ui.bq = e.target.value; $('#blist').innerHTML = borrowerListHTML(); }); }
  };
};
ACT.bF = a => { S.ui.bf = a.dataset.k; render(); };

/* ---------- borrower form ---------- */
function photoProcess(file, cb) {
  const fr = new FileReader();
  fr.onload = () => { const img = new Image(); img.onload = () => { const s = 240, c = document.createElement('canvas'); const k = Math.min(1, s / Math.max(img.width, img.height)); c.width = img.width * k; c.height = img.height * k; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); cb(c.toDataURL('image/jpeg', .8)); }; img.src = fr.result; };
  fr.readAsDataURL(file);
}
function photoSheet(target) {
  S.ui.photoTarget = target;
  ovOpen(`<div class="sheet"><h3>${T('រូបថត', 'Photo')}</h3><button class="sheetopt" data-act="pickCam">${I('camera')} ${T('ថតរូប (កាមេរ៉ា)', 'Take photo (camera)')}</button><button class="sheetopt" data-act="pickGal">${I('image')} ${T('ជ្រើសពីទូរស័ព្ទ', 'Choose from phone')}</button><button class="sheetopt" data-act="photoRm" style="color:var(--red)">${I('trash')} ${T('លុបរូបថត', 'Remove photo')}</button><button class="btn ghost" style="margin-top:10px" data-act="ovClose">${T('បោះបង់', 'Cancel')}</button>
  <p class="hint center">${T('សាកល្បង៖ ក្នុងកម្មវិធីពិត នឹងប្រើកាមេរ៉ា និងបណ្ដុំរូបភាពរបស់ទូរស័ព្ទ។', 'Demo: the real app will use the phone camera & gallery.')}</p></div>`);
}
function pickFile(capture) {
  const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; if (capture) i.setAttribute('capture', 'environment');
  i.onchange = () => { if (i.files[0]) photoProcess(i.files[0], d => { applyPhoto(d); }); };
  i.click(); ovClose();
}
function applyPhoto(d) {
  const t = S.ui.photoTarget;
  if (t === 'owner') { DB.owner.photo = d; saveDB(); render(); toast(T('បានប្តូររូបថត', 'Photo updated')); }
  else { S.f.photo = d; const p = $('#photoBox'); if (p) { p.style.backgroundImage = `url('${d}')`; p.innerHTML = ''; } S.dirty = true; }
}
ACT.pickCam = () => pickFile(true); ACT.pickGal = () => pickFile(false);
ACT.photoRm = () => { if (S.ui.photoTarget === 'owner') { DB.owner.photo = ''; saveDB(); } else { S.f.photo = ''; } ovClose(); render(); };
ACT.photoSheet = a => photoSheet(a.dataset.t);

SCREENS.borrowerForm = (id) => {
  const ex = id ? borrowerOf(id) : null; const b = ex || { id: 'BR-' + String(DB.seq.br).padStart(4, '0'), province: 'បាត់ដំបង', gender: 'F' };
  S.f = { gender: b.gender || 'F', photo: b.photo || '', editId: ex ? ex.id : '' }; S.dirty = false;
  const init = b.photo ? `style="background-image:url('${b.photo}')"` : '';
  return {
    title: ex ? T('កែព័ត៌មានអ្នកខ្ចី', 'Edit borrower') : T('បន្ថែមអ្នកខ្ចី', 'Add borrower'), back: true,
    body: `<form class="formwrap" onsubmit="return false" novalidate>
     <div class="center" style="margin-bottom:14px"><button type="button" id="photoBox" data-act="photoSheet" data-t="borrower" class="avatar big" style="margin:0 auto;${b.photo ? `background-image:url('${b.photo}');` : 'background:var(--navy-tint);color:var(--navy);'}">${b.photo ? '' : I('camera', 'lg')}</button><div class="small link" data-act="photoSheet" data-t="borrower" style="margin-top:6px">${T('បន្ថែមរូបថត', 'Add photo')}</div></div>
     <div class="card">${F('f_id', T('លេខសម្គាល់អ្នកខ្ចី', 'Borrower ID'), { v: b.id, ro: 1 })}
     ${F('f_name', T('នាមត្រកូល និងនាមខ្លួន', 'Full name'), { v: b.name || '', ph: T('ឧ. សុខ ដារ៉ា', 'e.g. Sok Dara'), req: 1, icon: 'user' })}
     ${F('f_nameEn', T('ឈ្មោះជាអក្សរឡាតាំង (ជម្រើស)', 'Name in English (optional)'), { v: b.nameEn || '', ph: 'Sok Dara' })}
     <div class="fg"><label>${T('ភេទ', 'Gender')}</label>${OPT('gender', [['M', T('ប្រុស', 'Male')], ['F', T('ស្រី', 'Female')]], b.gender || 'F')}</div>
     ${F('f_phone', T('លេខទូរស័ព្ទ', 'Phone'), { v: b.phone || '', mode: 'tel', ph: '012 345 678', req: 1, icon: 'phone' })}
     ${F('f_nid', T('លេខអត្តសញ្ញាណប័ណ្ណ', 'ID card number'), { v: b.nid || '', mode: 'numeric', ph: '010 123 456 78' })}
     ${F('f_job', T('មុខរបរ', 'Occupation'), { v: b.job || '', ph: T('ឧ. លក់ដូរ', 'e.g. Vendor') })}</div>
     <div class="card"><div class="b" style="margin-bottom:10px;color:var(--navy)">${T('អាសយដ្ឋាន', 'Address')}</div>
     ${F('f_village', T('ភូមិ', 'Village'), { v: b.village || '', req: 1 })}${F('f_commune', T('ឃុំ/សង្កាត់', 'Commune / Sangkat'), { v: b.commune || '', req: 1 })}
     ${F('f_district', T('ក្រុង/ស្រុក', 'City / District'), { v: b.district || '', req: 1 })}${F('f_province', T('ខេត្ត', 'Province'), { v: b.province || 'បាត់ដំបង' })}
     ${F('f_address', T('អាសយដ្ឋានបច្ចុប្បន្ន', 'Current address'), { v: b.address || '', ph: T('ផ្ទះលេខ ផ្លូវ…', 'House no., street…') })}
     ${F('f_map', T('តំណ Google Maps / ទីតាំង', 'Google Maps / location link'), { v: b.map || '', icon: 'pin', ph: 'https://maps.google.com/…', hint: T('ចម្លងតំណទីតាំងពី Google Maps មកដាក់', 'Paste the link from Google Maps') })}</div>
     <div class="card"><div class="b" style="margin-bottom:10px;color:var(--navy)">${T('អ្នកធានា', 'Guarantor')}</div>
     ${F('f_gname', T('ឈ្មោះអ្នកធានា', 'Guarantor name'), { v: b.guarantor || '' })}${F('f_gphone', T('លេខទូរស័ព្ទអ្នកធានា', 'Guarantor phone'), { v: b.gPhone || '', mode: 'tel' })}
     ${F('f_grel', T('ទំនាក់ទំនងជាមួយអ្នកខ្ចី', 'Relationship to borrower'), { v: b.gRel || '', ph: T('ឧ. ប្តី/ប្រពន្ធ', 'e.g. Spouse') })}</div>
     <div class="card">${TA('f_notes', T('កំណត់ចំណាំ', 'Notes'), b.notes)}</div></form>`,
    bar: `<div class="btnrow"><button class="btn ghost" data-act="back">${T('បោះបង់', 'Cancel')}</button><button class="btn gold" style="flex:2" data-act="saveBorrower">${I('check', 'sm')} ${T('រក្សាទុក', 'Save')}</button></div>`
  };
};
ACT.saveBorrower = () => {
  clearErrs(); let bad = 0;
  const need = (id, m) => { if (!V(id)) { setErr(id, m); bad = 1; } };
  need('f_name', T('សូមបញ្ចូលឈ្មោះ', 'Please enter the name'));
  if (!V('f_phone')) { setErr('f_phone', T('សូមបញ្ចូលលេខទូរស័ព្ទ', 'Please enter the phone')); bad = 1; } else if (digits(V('f_phone')).length < 8 || digits(V('f_phone')).length > 10) { setErr('f_phone', T('លេខទូរស័ព្ទមិនត្រឹមត្រូវ (៨-១០ ខ្ទង់)', 'Invalid phone (8–10 digits)')); bad = 1; }
  if (V('f_nid') && digits(V('f_nid')).length < 9) { setErr('f_nid', T('លេខអត្តសញ្ញាណប័ណ្ណខ្លីពេក', 'ID number too short')); bad = 1; }
  need('f_village', T('សូមបញ្ចូលភូមិ', 'Please enter village')); need('f_commune', T('សូមបញ្ចូលឃុំ/សង្កាត់', 'Please enter commune')); need('f_district', T('សូមបញ្ចូលក្រុង/ស្រុក', 'Please enter district'));
  if (V('f_gphone') && digits(V('f_gphone')).length < 8) { setErr('f_gphone', T('លេខទូរស័ព្ទអ្នកធានាមិនត្រឹមត្រូវ', 'Invalid guarantor phone')); bad = 1; }
  if (V('f_map') && !/^https?:\/\//i.test(V('f_map'))) { setErr('f_map', T('តំណត្រូវចាប់ផ្តើមដោយ https://', 'Link must start with https://')); bad = 1; }
  if (bad) return focusFirstErr();
  const dup = DB.borrowers.find(b => digits(b.phone) === digits(V('f_phone')) && b.id !== S.f.editId);
  const doSave = () => {
    const o = { name: V('f_name'), nameEn: V('f_nameEn') || V('f_name'), gender: S.f.gender, phone: V('f_phone'), nid: V('f_nid'), job: V('f_job'), village: V('f_village'), commune: V('f_commune'), district: V('f_district'), province: V('f_province'), address: V('f_address'), map: V('f_map'), guarantor: V('f_gname'), gPhone: V('f_gphone'), gRel: V('f_grel'), notes: V('f_notes'), photo: S.f.photo };
    let id = S.f.editId;
    if (id) Object.assign(borrowerOf(id), o); else { id = V('f_id'); DB.borrowers.push(Object.assign({ id, created: iso(TODAY) }, o)); DB.seq.br++; }
    saveDB(); S.dirty = false; ovClose(); S.stack.pop(); if (S.stack.length && cur().n === 'borrowerDetail') render(); else go('borrowerDetail', id); toast(T('បានរក្សាទុកអ្នកខ្ចី', 'Borrower saved'));
  };
  if (dup) return confirmDlg({ icon: 'warn', title: T('លេខទូរស័ព្ទស្ទួន', 'Duplicate phone'), msg: T(`លេខនេះមានរួចហើយសម្រាប់ ${nm(dup)}។ រក្សាទុកទាំងអស់?`, `This number already belongs to ${nm(dup)}. Save anyway?`), ok: T('រក្សាទុក', 'Save'), fn: doSave });
  doSave();
};

/* ---------- borrower detail ---------- */
SCREENS.borrowerDetail = (id) => {
  const b = borrowerOf(id); if (!b) return { title: '', back: true, body: emptyBlock('users', T('រកមិនឃើញ', 'Not found')) };
  const s = borrowerSummary(b); const hist = DB.payments.filter(p => s.vs.some(v => v.loan.id === p.loanId)).sort((a, c) => c.date.localeCompare(a.date));
  const loanRow = v => `<button class="li" data-go="loanDetail" data-a="${v.loan.id}" style="border-radius:0"><div class="grow"><div class="row between"><b>${v.loan.id}</b>${bd(v.status === 'paid' ? 'paid' : v.status, loanStLabel(v.status))}</div><div class="small mute">${M(v.principal, v.loan.currency)} · ${T('នៅសល់', 'left')} ${M(v.remaining, v.loan.currency)}</div><div class="prog light" style="height:6px;margin-top:6px"><i style="width:${v.progress}%"></i></div></div>${I('chev', 'sm chev')}</button>`;
  const map = b.map ? `<a class="btn xs soft" href="${esc(b.map)}" target="_blank" rel="noopener">${I('pin', 'sm')} ${T('ទីតាំង', 'Location')}</a>` : `<button class="btn xs soft" data-act="noMap">${I('pin', 'sm')} ${T('ទីតាំង', 'Location')}</button>`;
  return {
    title: T('ព័ត៌មានអ្នកខ្ចី', 'Borrower'), back: true, right: `<button class="ib" data-go="borrowerForm" data-a="${b.id}" aria-label="edit">${I('edit')}</button>`,
    body: `<div class="card center"><div style="display:flex;justify-content:center;margin-bottom:8px">${avatar(b, 'big')}</div><div class="b" style="font-size:19px">${esc(nm(b))}</div><div class="small mute">${b.id} · ${b.gender === 'M' ? T('ប្រុស', 'Male') : T('ស្រី', 'Female')} · ${esc(b.job || '')}</div><div style="margin:6px 0 12px">${bd(s.status)}</div>
     <div class="btnrow"><button class="btn xs ghost" data-act="tel" data-n="${esc(b.phone)}" data-name="${esc(nm(b))}">${I('phone', 'sm')} ${esc(b.phone)}</button>${map}</div></div>
     <div class="grid3"><div class="stat"><div class="l">${T('បានខ្ចីសរុប', 'Borrowed')}</div><div class="v" style="font-size:17px">${MU(s.borrowed)}</div></div><div class="stat green"><div class="l">${T('បានបង់សរុប', 'Paid')}</div><div class="v" style="font-size:17px">${MU(s.paid)}</div></div><div class="stat ${s.status === 'overdue' ? 'red' : ''}"><div class="l">${T('នៅសល់', 'Remaining')}</div><div class="v" style="font-size:17px">${MU(s.remaining)}</div></div></div>
     <div style="height:12px"></div><div class="btnrow" style="flex-wrap:wrap"><button class="btn gold" data-go="loanForm" data-a="${b.id}">${I('plus', 'sm')} ${T('បង្កើតប្រាក់កម្ចីថ្មី', 'New loan')}</button></div>
     <div class="btnrow" style="margin-top:8px"><button class="btn ghost" data-go="payForm" data-a="b:${b.id}">${I('check', 'sm')} ${T('កត់ត្រាការបង់ប្រាក់', 'Record payment')}</button><button class="btn soft" data-go="borrowerForm" data-a="${b.id}">${I('edit', 'sm')} ${T('កែព័ត៌មាន', 'Edit')}</button></div>
     <div class="sec"><h2>${T('ប្រាក់កម្ចីកំពុងដំណើរការ', 'Active loans')} (${s.act.length})</h2></div>
     ${s.act.length ? `<div class="group">${s.act.map(loanRow).join('')}</div>` : `<div class="card flat center mute small">${T('គ្មានប្រាក់កម្ចីកំពុងដំណើរការ', 'No active loans')}</div>`}
     <div class="sec"><h2>${T('ប្រាក់កម្ចីបានបញ្ចប់', 'Completed loans')} (${s.done.length})</h2></div>
     ${s.done.length ? `<div class="group">${s.done.map(loanRow).join('')}</div>` : `<div class="card flat center mute small">${T('មិនទាន់មាន', 'None yet')}</div>`}
     <div class="sec"><h2>${T('ប្រវត្តិបង់ប្រាក់', 'Repayment history')}</h2></div>
     ${hist.length ? `<div class="group">${hist.slice(0, 8).map(p => `<div class="li"><div class="ico" style="background:var(--green-t);color:var(--green)">${I('check')}</div><div class="grow"><div class="b">${M(p.amount, p.currency)}</div><div class="small mute">${fmtDate(p.date)} · ${p.loanId} · ${T('លើកទី', 'Inst.')} ${p.no}</div></div>${bd(p.type === 'partial' ? 'partial' : 'paid', p.type === 'partial' ? T('បង់ខ្លះ', 'Partial') : T('បង់ពេញ', 'Full'))}</div>`).join('')}</div>` : `<div class="card flat center mute small">${T('មិនទាន់មានការបង់ប្រាក់', 'No payments yet')}</div>`}
     <div class="sec"><h2>${T('ព័ត៌មានលម្អិត', 'Details')}</h2></div>
     <div class="card"><dl class="dl"><dt>${T('អត្តសញ្ញាណប័ណ្ណ', 'ID card')}</dt><dd>${esc(b.nid || '—')}</dd><dt>${T('ភូមិ', 'Village')}</dt><dd>${esc(S.lang === 'kh' ? b.village : b.villageEn || b.village)}</dd><dt>${T('ឃុំ/សង្កាត់', 'Commune')}</dt><dd>${esc(S.lang === 'kh' ? b.commune : b.communeEn || b.commune)}</dd><dt>${T('ក្រុង/ស្រុក', 'District')}</dt><dd>${esc(S.lang === 'kh' ? b.district : b.districtEn || b.district)}</dd><dt>${T('ខេត្ត', 'Province')}</dt><dd>${esc(b.province)}</dd>${b.address ? `<dt>${T('អាសយដ្ឋាន', 'Address')}</dt><dd>${esc(b.address)}</dd>` : ''}</dl></div>
     <div class="card"><div class="b" style="margin-bottom:8px">${T('អ្នកធានា', 'Guarantor')}</div><dl class="dl"><dt>${T('ឈ្មោះ', 'Name')}</dt><dd>${esc(b.guarantor || '—')}</dd><dt>${T('ទូរស័ព្ទ', 'Phone')}</dt><dd>${esc(b.gPhone || '—')}</dd><dt>${T('ទំនាក់ទំនង', 'Relation')}</dt><dd>${esc(b.gRel || '—')}</dd></dl>${b.gPhone ? `<button class="btn xs ghost" style="margin-top:10px;width:100%" data-act="tel" data-n="${esc(b.gPhone)}" data-name="${esc(b.guarantor)}">${I('phone', 'sm')} ${T('ហៅអ្នកធានា', 'Call guarantor')}</button>` : ''}</div>
     <div class="card"><div class="b" style="margin-bottom:4px">${T('កំណត់ចំណាំ', 'Notes')}</div><div class="mute">${esc(b.notes || T('គ្មានកំណត់ចំណាំ', 'No notes'))}</div></div>
     <button class="btn dangerO" data-act="delBorrower" data-id="${b.id}">${I('trash', 'sm')} ${T('លុបអ្នកខ្ចី', 'Delete borrower')}</button>`
  };
};
ACT.noMap = () => infoDlg(T('គ្មានតំណទីតាំង', 'No location link'), T('សូមកែព័ត៌មាន ហើយបន្ថែមតំណ Google Maps។', 'Edit the borrower and add a Google Maps link.'), 'pin');
ACT.delBorrower = a => {
  const b = borrowerOf(a.dataset.id), s = borrowerSummary(b);
  if (s.vs.length) return infoDlg(T('មិនអាចលុបបាន', 'Cannot delete'), T('អ្នកខ្ចីនេះមានប្រាក់កម្ចី។ ការលុបត្រូវបានបិទដើម្បីរក្សាកំណត់ត្រា។', 'This borrower has loans. Deleting is blocked to keep records safe.'), 'shield');
  confirmDlg({ icon: 'trash', danger: true, title: T('លុបអ្នកខ្ចី?', 'Delete borrower?'), msg: T(`លុប ${nm(b)} ចេញពីបញ្ជី។`, `Remove ${nm(b)} from the list.`), ok: T('លុប', 'Delete'), fn: () => { DB.borrowers = DB.borrowers.filter(x => x.id !== b.id); saveDB(); ovClose(); S.stack.pop(); render(); toast(T('បានលុប', 'Deleted')); } });
};
