/* Screens C: reports, more/settings, profile, password, language, about */
'use strict';

/* ---------- reports ---------- */
function monthlyCollections(n) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - i, 1); const k = d.getFullYear() + '-' + pad(d.getMonth() + 1);
    out.push({ k, m: d.getMonth(), v: DB.payments.filter(p => p.date.startsWith(k)).reduce((s, p) => s + toUSD(p.amount, p.currency), 0) });
  }
  return out;
}
function chartSVG(data) {
  const W = 340, H = 190, pl = 8, pb = 26, pt = 22, max = Math.max(1, ...data.map(d => d.v)); const bw = (W - pl * 2) / data.length;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Monthly collections">${[0, .5, 1].map(f => `<line x1="${pl}" x2="${W - pl}" y1="${pt + (H - pt - pb) * (1 - f)}" y2="${pt + (H - pt - pb) * (1 - f)}" stroke="#E3E7EF" stroke-width="1"/>`).join('')}
  ${data.map((d, i) => { const h = (H - pt - pb) * d.v / max, x = pl + i * bw + bw * .18, w = bw * .64, y = H - pb - h; const last = i === data.length - 1; return `<rect x="${x}" y="${y}" width="${w}" height="${Math.max(h, 1)}" rx="6" fill="${last ? '#C9A24B' : '#1F3E72'}"/><text x="${x + w / 2}" y="${y - 6}" text-anchor="middle" font-size="11" font-weight="700" fill="#17223A">${d.v >= 1000 ? (d.v / 1000).toFixed(1) + 'k' : Math.round(d.v)}</text><text x="${x + w / 2}" y="${H - 8}" text-anchor="middle" font-size="11.5" fill="#667086">${MON[S.lang][d.m]}</text>`; }).join('')}</svg>`;
}
SCREENS.reports = () => {
  const p = S.ui.rp || 'month', [a, z] = periodRange(p); const inR = s => { const d = parseISO(s); return d >= a && d <= z; };
  const vs = allViews();
  const lent = vs.filter(v => v.status !== 'cancelled' && inR(v.loan.date)).reduce((s, v) => s + toUSD(v.principal, v.loan.currency), 0);
  const coll = DB.payments.filter(x => inR(x.date)).reduce((s, x) => s + toUSD(x.amount, x.currency), 0);
  const live = vs.filter(v => v.status === 'active' || v.status === 'overdue');
  const out = live.reduce((s, v) => s + toUSD(v.remaining, v.loan.currency), 0), od = live.reduce((s, v) => s + toUSD(v.overdueAmount, v.loan.currency), 0);
  const actB = DB.borrowers.filter(b => ['active', 'overdue'].includes(borrowerSummary(b).status)).length;
  const done = vs.filter(v => v.status === 'paid').length; const mc = monthlyCollections(6);
  const stat = (l, v, c, ic) => `<div class="stat ${c || ''}">${I(ic)}<div class="l">${l}</div><div class="v">${v}</div></div>`;
  return {
    title: T('របាយការណ៍', 'Reports'), back: true,
    body: `<div class="chips">${[['today', T('ថ្ងៃនេះ', 'Today')], ['week', T('សប្តាហ៍នេះ', 'This week')], ['month', T('ខែនេះ', 'This month')], ['custom', T('កំណត់ថ្ងៃ', 'Custom date')]].map(([k, l]) => `<button class="chip ${p === k ? 'on' : ''}" data-act="rpF" data-k="${k}">${l}</button>`).join('')}</div>
    ${p === 'custom' ? `<div class="fgrid"><div class="fg"><label>${T('ពីថ្ងៃ', 'From')}</label><div class="inp"><input type="date" id="rf" value="${iso(a)}"></div></div><div class="fg"><label>${T('ដល់ថ្ងៃ', 'To')}</label><div class="inp"><input type="date" id="rt" value="${iso(z)}"></div></div></div>` : `<div class="small mute" style="margin:-4px 2px 10px">${fmtDate(a)}${+a !== +z ? ' – ' + fmtDate(z) : ''}</div>`}
    <div class="grid2">${stat(T('ប្រាក់បានឱ្យខ្ចី', 'Total amount lent'), MU(lent), '', 'loan')}${stat(T('ប្រាក់បានប្រមូល', 'Total collected'), MU(coll), 'green', 'check')}
    ${stat(T('ប្រាក់នៅសល់', 'Outstanding balance'), MU(out), '', 'coin')}${stat(T('ប្រាក់យឺត', 'Overdue amount'), MU(od), od ? 'red' : '', 'warn')}
    ${stat(T('អ្នកខ្ចីកំពុងសកម្ម', 'Active borrowers'), actB, '', 'users')}${stat(T('កម្ចីបានបញ្ចប់', 'Completed loans'), done, '', 'shield')}</div>
    <div class="sec"><h2>${T('ប្រាក់ប្រមូលបានតាមខែ', 'Monthly collections')}</h2></div><div class="card">${chartSVG(mc)}<div class="legend"><span>● ${T('ខែចាស់', 'Past months')}</span><span style="color:#8A6A14">● ${T('ខែនេះ', 'This month')}</span></div></div>
    <p class="hint">${T(`ទឹកប្រាក់គិតជាដុល្លារ (១ ដុល្លារ = ${num(DB.settings.rate, 0)}៛ — កែបាននៅការកំណត់រូបិយប័ណ្ណ)។ ទិន្នន័យគំរូ។`, `Amounts in USD equivalent ($1 = ${num(DB.settings.rate, 0)}៛, editable in Currency settings). Sample data.`)}</p>`,
    bind() { ['rf', 'rt'].forEach(i => { const e = $('#' + i); if (e) e.addEventListener('change', () => { S.ui.rf = V('rf'); S.ui.rt = V('rt'); if (S.ui.rf > S.ui.rt) { toast(T('ថ្ងៃចាប់ផ្តើមត្រូវមុនថ្ងៃបញ្ចប់', 'Start must be before end')); return; } render(); }); }); }
  };
};
ACT.rpF = a => { S.ui.rp = a.dataset.k; if (a.dataset.k === 'custom' && !S.ui.rf) { S.ui.rf = iso(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1)); S.ui.rt = iso(TODAY); } render(); };

/* ---------- more ---------- */
const li = (ic, l, g, extra, cls) => `<button class="li" ${g ? (g.startsWith('act:') ? `data-act="${g.slice(4)}"` : `data-go="${g}"`) : ''}><span class="ico ${cls || ''}">${I(ic)}</span><span class="grow b" style="font-weight:600">${l}</span>${extra || ''}${I('chev', 'sm chev')}</button>`;
SCREENS.more = () => ({
  title: T('ច្រើនទៀត', 'More'),
  body: `<button class="card" data-go="profile" style="width:100%;text-align:left"><div class="row"><div class="avatar" style="background:var(--gold);color:#2B2208;${DB.owner.photo ? `background-image:url('${DB.owner.photo}')` : ''}">${DB.owner.photo ? '' : esc(Array.from(DB.owner.name.replace(/^(Mr\.?|Ms\.?|លោក)\s*/i, ''))[0] || 'M')}</div><div class="grow"><div class="b">${esc(DB.owner.name)}</div><div class="small mute">${esc(DB.owner.phone)}</div></div>${I('chev', 'sm chev')}</div></button>
  <div class="group">${li('chart', T('របាយការណ៍', 'Reports'), 'reports')}${li('bell', T('ការជូនដំណឹង', 'Notifications'), 'notifications')}</div>
  <div class="group">${li('user', T('ប្រវត្តិរូប', 'Profile'), 'profile')}${li('bell', T('ការកំណត់ការជូនដំណឹង', 'Notification settings'), 'notifSettings')}${li('coin', T('ការកំណត់រូបិយប័ណ្ណ', 'Currency settings'), 'currencySettings')}${li('loan', T('ការកំណត់ប្រាក់កម្ចី', 'Loan settings'), 'loanSettings')}${li('cloud', T('ការបម្រុងទុកទិន្នន័យ', 'Backup'), 'backup', `<span class="bd upcoming">${T('ឆាប់ៗនេះ', 'Soon')}</span>`)}</div>
  <div class="group">${li('globe', T('ភាសា', 'Language'), 'language', `<span class="small mute">${S.lang === 'kh' ? 'ខ្មែរ' : 'English'}</span>`)}${li('key', T('ប្តូរពាក្យសម្ងាត់', 'Change password'), 'changePw')}${li('info', T('អំពីកម្មវិធី', 'About app'), 'about')}</div>
  <div class="group">${li('logout', T('ចាកចេញ', 'Logout'), 'act:logout', '', 'red')}</div>`
});
ACT.logout = () => confirmDlg({ icon: 'logout', danger: true, title: T('ចាកចេញពីគណនី?', 'Log out?'), msg: T('អ្នកនឹងត្រូវចូលម្តងទៀតដើម្បីប្រើកម្មវិធី។', 'You will need to sign in again.'), ok: T('ចាកចេញ', 'Logout'), cancel: T('នៅទីនេះ', 'Stay'), fn: () => { S.logged = false; try { sessionStorage.removeItem('c066-in'); } catch (e) {} ovClose(); root('login'); } });

/* ---------- profile ---------- */
SCREENS.profile = () => {
  S.dirty = false; const o = DB.owner;
  return {
    title: T('ប្រវត្តិរូប', 'Profile'), back: true,
    body: `<div class="center" style="margin:6px 0 16px"><button class="avatar big" data-act="photoSheet" data-t="owner" style="margin:0 auto;background:var(--gold);color:#2B2208;${o.photo ? `background-image:url('${o.photo}')` : ''}">${o.photo ? '' : esc(Array.from(o.name.replace(/^(Mr\.?|Ms\.?|លោក)\s*/i, ''))[0] || 'M')}</button><div class="link small" data-act="photoSheet" data-t="owner" style="margin-top:6px">${I('camera', 'sm').replace('class="ic sm"', 'class="ic sm" style="display:inline;vertical-align:-4px"')} ${T('ប្តូររូបថត', 'Change photo')}</div></div>
    <form class="formwrap card" onsubmit="return false" novalidate>${F('pr_name', T('ឈ្មោះ', 'Name'), { v: o.name, icon: 'user', req: 1 })}${F('pr_phone', T('លេខទូរស័ព្ទ', 'Phone'), { v: o.phone, icon: 'phone', mode: 'tel', req: 1 })}<button class="btn" data-act="saveProfile">${I('check', 'sm')} ${T('រក្សាទុកការផ្លាស់ប្តូរ', 'Save changes')}</button></form>
    <div class="group">${li('key', T('ប្តូរពាក្យសម្ងាត់', 'Change password'), 'changePw')}${li('globe', T('ភាសា', 'Language'), 'language')}</div>
    <button class="btn dangerO" data-act="logout">${I('logout', 'sm')} ${T('ចាកចេញ', 'Logout')}</button>`
  };
};
ACT.saveProfile = () => {
  clearErrs(); let bad = 0;
  if (!V('pr_name')) { setErr('pr_name', T('សូមបញ្ចូលឈ្មោះ', 'Enter your name')); bad = 1; }
  if (digits(V('pr_phone')).length < 8 || digits(V('pr_phone')).length > 10) { setErr('pr_phone', T('លេខទូរស័ព្ទមិនត្រឹមត្រូវ', 'Invalid phone number')); bad = 1; }
  if (bad) return focusFirstErr();
  DB.owner.name = V('pr_name'); DB.owner.phone = V('pr_phone'); saveDB(); S.dirty = false; toast(T('បានរក្សាទុកប្រវត្តិរូប', 'Profile saved'));
};

/* ---------- change password ---------- */
const PWF = (id, label) => `<div class="fg" id="g_${id}"><label for="${id}">${label} <span class="req">*</span></label><div class="inp">${I('lock', 'sm')}<input id="${id}" type="password" autocomplete="off"><button type="button" data-act="togglePw" aria-label="show/hide" style="width:44px;height:44px;display:grid;place-items:center;color:var(--mute)">${I('eye')}</button></div><div class="errmsg" id="e_${id}">${I('warn', 'sm')}<span></span></div></div>`;
SCREENS.changePw = () => ({
  title: T('ប្តូរពាក្យសម្ងាត់', 'Change password'), back: true,
  body: `<form class="formwrap card" onsubmit="return false" novalidate>${PWF('pw0', T('ពាក្យសម្ងាត់បច្ចុប្បន្ន', 'Current password'))}${PWF('pw1', T('ពាក្យសម្ងាត់ថ្មី', 'New password'))}${PWF('pw2', T('បញ្ជាក់ពាក្យសម្ងាត់ថ្មី', 'Confirm new password'))}<p class="hint">${T('យ៉ាងតិច ៦ តួអក្សរ។', 'At least 6 characters.')}</p><button class="btn" data-act="savePw">${I('check', 'sm')} ${T('ប្តូរពាក្យសម្ងាត់', 'Update password')}</button></form>`
});
ACT.savePw = () => {
  clearErrs(); let bad = 0; const a = $('#pw0').value, b = $('#pw1').value, c = $('#pw2').value;
  if (a !== DB.owner.password) { setErr('pw0', T('ពាក្យសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ', 'Current password is wrong')); bad = 1; }
  if (b.length < 6) { setErr('pw1', T('ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ', 'Must be at least 6 characters')); bad = 1; } else if (b === a) { setErr('pw1', T('ត្រូវខុសពីពាក្យសម្ងាត់ចាស់', 'Must differ from the old one')); bad = 1; }
  if (c !== b) { setErr('pw2', T('ពាក្យសម្ងាត់មិនដូចគ្នា', 'Passwords do not match')); bad = 1; }
  if (bad) return focusFirstErr();
  DB.owner.password = b; saveDB(); S.stack.pop(); render(); toast(T('បានប្តូរពាក្យសម្ងាត់', 'Password changed'));
};

/* ---------- notification settings ---------- */
SCREENS.notifSettings = () => {
  const n = DB.settings.notif; const sw = (k, l, sub) => `<button class="li" data-act="tgl" data-k="${k}"><div class="grow"><div class="b" style="font-weight:600">${l}</div>${sub ? `<div class="small mute">${sub}</div>` : ''}</div><span class="sw ${n[k] ? 'on' : ''}"></span></button>`;
  return { title: T('ការកំណត់ការជូនដំណឹង', 'Notification settings'), back: true,
    body: `<div class="group">${sw('on', T('បើកការរំលឹក', 'Enable reminders'), T('ទទួលការជូនដំណឹងអំពីការបង់ប្រាក់', 'Get alerts about payments'))}</div>
    <div class="group" style="${n.on ? '' : 'opacity:.5;pointer-events:none'}">${sw('dueDay', T('នៅថ្ងៃកំណត់', 'On the due day'))}${sw('day1', T('មុន ១ ថ្ងៃ', '1 day before'))}${sw('day3', T('មុន ៣ ថ្ងៃ', '3 days before'))}${sw('overdue', T('រំលឹកជារៀងរាល់ថ្ងៃពេលយឺត', 'Daily while overdue'))}</div>
    <div class="card">${SEL('nt', T('ម៉ោងរំលឹកប្រចាំថ្ងៃ', 'Daily reminder time'), ['06:00', '07:00', '08:00', '09:00', '12:00', '17:00'].map(x => [x, x]), n.time, { icon: 'clock' })}</div>
    <button class="btn gold" data-act="testPush">${I('bell', 'sm')} ${T('សាកល្បងផ្ញើការជូនដំណឹង', 'Send test notification')}</button>
    <p class="hint">${T('ក្នុងប្រព័ន្ធពិត ការរំលឹកនឹងផ្ញើជា Push Notification ទៅទូរស័ព្ទ (និង SMS/Telegram ជាជម្រើស)។ ឥឡូវនេះជាការក្លែងធ្វើ។', 'In the real system reminders are sent as push notifications (and optionally SMS/Telegram). Simulated here.')}</p>`,
    bind() { $('#nt').addEventListener('change', () => { DB.settings.notif.time = V('nt'); saveDB(); toast(T('បានរក្សាទុក', 'Saved')); }); } };
};
ACT.tgl = a => { const n = DB.settings.notif; n[a.dataset.k] = !n[a.dataset.k]; saveDB(); render(); };
ACT.testPush = () => { const it = dueItems().filter(x => x.d === 0); const x = it[0]; pushBanner(appName(), x ? T(`${nm(x.b)} ត្រូវបង់ ${M(x.amount, x.cur)} ថ្ងៃនេះ`, `${nm(x.b)} owes ${M(x.amount, x.cur)} today`) : T('គ្មានការបង់ប្រាក់ថ្ងៃនេះ', 'Nothing due today'), 'notifications'); };

/* ---------- currency / loan settings ---------- */
SCREENS.currencySettings = () => { const s = DB.settings; S.f = { defCur: s.defaultCur }; return { title: T('ការកំណត់រូបិយប័ណ្ណ', 'Currency settings'), back: true,
  body: `<div class="card"><div class="fg"><label>${T('រូបិយប័ណ្ណលំនាំដើម', 'Default currency')}</label>${OPT('defCur', [['USD', 'USD ($)'], ['KHR', 'KHR (៛)']], s.defaultCur)}</div>${F('cs_rate', T('អត្រាប្តូរប្រាក់ ($1 = ?៛)', 'Exchange rate ($1 = ? ៛)'), { v: s.rate, mode: 'numeric', unit: '៛', hint: T('ប្រើសម្រាប់គណនាសរុបក្នុងរបាយការណ៍', 'Used for totals in dashboard & reports') })}<div class="alert gold" style="margin:0 0 14px">${I('info')}<div class="small">${T('ឧទាហរណ៍', 'Example')}: $100 = ${num(100 * s.rate, 0)}៛</div></div><button class="btn" data-act="saveCur">${I('check', 'sm')} ${T('រក្សាទុក', 'Save')}</button></div>` }; };
ACT.saveCur = () => { clearErrs(); const r = parseInt(V('cs_rate'), 10); if (!(r >= 3000 && r <= 6000)) { setErr('cs_rate', T('អត្រាត្រូវនៅចន្លោះ ៣,០០០ និង ៦,០០០', 'Rate must be between 3,000 and 6,000')); return focusFirstErr(); } DB.settings.rate = r; DB.settings.defaultCur = S.f.defCur; saveDB(); S.stack.pop(); render(); toast(T('បានរក្សាទុក', 'Saved')); };
SCREENS.loanSettings = () => { const s = DB.settings; S.f = { defType: s.defType }; return { title: T('ការកំណត់ប្រាក់កម្ចី', 'Loan settings'), back: true,
  body: `<div class="card"><div class="fg"><label>${T('ប្រភេទការប្រាក់លំនាំដើម', 'Default interest type')}</label>${OPT('defType', [['flat', T('ថេរ', 'Flat')], ['declining', T('តាមសមតុល្យ', 'Declining')], ['none', T('គ្មាន', 'None')]], s.defType)}</div>${F('ls_rate', T('អត្រាការប្រាក់លំនាំដើម (ក្នុង ១ ខែ)', 'Default rate (per month)'), { v: s.defRate, mode: 'decimal', unit: '%' })}${SEL('ls_freq', T('ការបង់ប្រាក់លំនាំដើម', 'Default frequency'), Object.entries(FREQ_L()), s.defFreq)}${F('ls_fee', T('ថ្លៃសេវាលំនាំដើម', 'Default service fee'), { v: s.defFee || '', mode: 'decimal', ph: '0' })}<button class="btn" data-act="saveLs">${I('check', 'sm')} ${T('រក្សាទុក', 'Save')}</button></div>` }; };
ACT.saveLs = () => { clearErrs(); const r = parseFloat(V('ls_rate')); if (isNaN(r) || r < 0 || r > 30) { setErr('ls_rate', T('អត្រាត្រូវនៅចន្លោះ ០ ដល់ ៣០%', 'Rate must be 0–30%')); return focusFirstErr(); } Object.assign(DB.settings, { defType: S.f.defType, defRate: r, defFreq: V('ls_freq'), defFee: parseFloat(V('ls_fee')) || 0 }); saveDB(); S.stack.pop(); render(); toast(T('បានរក្សាទុក', 'Saved')); };

/* ---------- backup / language / about ---------- */
SCREENS.backup = () => ({ title: T('ការបម្រុងទុកទិន្នន័យ', 'Backup'), back: true,
  body: `<div class="card center"><div class="empty" style="padding:16px 8px"><div class="circle">${I('cloud', 'lg')}</div><h3>${T('ឆាប់ៗនេះ', 'Coming soon')}</h3><div>${T('ក្នុងប្រព័ន្ធពិត ទិន្នន័យរបស់លោកនឹងត្រូវបម្រុងទុកដោយស្វ័យប្រវត្តិទៅកាន់ម៉ាស៊ីនមេសុវត្ថិភាព ហើយអាចទាញយកជា Excel ។', 'In the real system your data will be backed up automatically to a secure server and exportable to Excel.')}</div></div>
  <div class="row between small" style="padding:6px 0"><span class="mute">${T('បម្រុងទុកចុងក្រោយ', 'Last backup')}</span><b>—</b></div></div>
  <button class="btn soft" data-act="soon">${I('cloud', 'sm')} ${T('បម្រុងទុកឥឡូវនេះ', 'Back up now')}</button><div style="height:8px"></div><button class="btn soft" data-act="soon">${I('receipt', 'sm')} ${T('នាំចេញជា Excel', 'Export to Excel')}</button>` });
ACT.soon = () => toast(T('មុខងារនេះនឹងមានក្នុងប្រព័ន្ធពិត', 'Available in the real system'));
SCREENS.language = () => ({ title: T('ភាសា', 'Language'), back: true,
  body: `<div class="group">${[['kh', 'ខ្មែរ', 'Khmer (default)'], ['en', 'English', 'អង់គ្លេស']].map(([k, l, s]) => `<button class="li" data-act="pickLang" data-k="${k}"><div class="grow"><div class="b">${l}</div><div class="small mute">${s}</div></div><span class="radio ${S.lang === k ? 'on' : ''}"></span></button>`).join('')}</div><p class="hint">${T('ភាសាលំនាំដើមគឺខ្មែរ។ ឈ្មោះអ្នកខ្ចី និងទីតាំងនឹងបង្ហាញតាមភាសាដែលបានជ្រើស។', 'Khmer is the default. Borrower names and places follow the chosen language.')}</p>` });
ACT.pickLang = a => { setLang(a.dataset.k); toast(a.dataset.k === 'kh' ? 'បានប្តូរទៅភាសាខ្មែរ' : 'Switched to English'); };
SCREENS.about = () => ({ title: T('អំពីកម្មវិធី', 'About app'), back: true,
  body: `<div class="card center"><div class="logo" style="margin:4px auto 10px;box-shadow:var(--shadow)">${LOGO}</div><div class="b" style="font-size:20px">${appName()}</div><div class="mute small">${T('កំណែសាកល្បង', 'Demo version')} 0.1 · C066</div></div>
  <div class="alert gold">${I('info')}<div class="small">${T('នេះគឺជាគំរូ UX/UI សម្រាប់ពិនិត្យប៉ុណ្ណោះ។ ទិន្នន័យទាំងអស់ជាទិន្នន័យគំរូ។ មិនមានម៉ាស៊ីនមេពិត ការទូទាត់ ឬធនាគារទេ។ ការគណនាមិនមែនជាដំបូន្មានផ្នែកច្បាប់ ឬគណនេយ្យទេ។', 'This is a UX/UI review demo. All data is sample data. No real server, payments or banking. Calculations are not legal or accounting advice.')}</div></div>
  <div class="card"><dl class="dl"><dt>${T('រៀបចំដោយ', 'Prepared by')}</dt><dd>BizWeb KH</dd><dt>${T('គម្រោង', 'Project')}</dt><dd>C066</dd><dt>${T('អតិថិជន', 'Client')}</dt><dd>Mr. Daily Daily</dd></dl></div>
  <button class="btn dangerO" data-act="resetDemo">${I('refresh', 'sm')} ${T('កំណត់ទិន្នន័យគំរូឡើងវិញ', 'Reset demo data')}</button>` });
ACT.resetDemo = () => confirmDlg({ icon: 'refresh', danger: true, title: T('កំណត់ទិន្នន័យគំរូឡើងវិញ?', 'Reset demo data?'), msg: T('រាល់អ្វីដែលបានបន្ថែមក្នុងការសាកល្បងនឹងត្រូវលុប។', 'Anything added during the demo will be removed.'), ok: T('កំណត់ឡើងវិញ', 'Reset'), fn: () => { resetDB(); S.ui = {}; ovClose(); S.logged ? root('home') : root('login'); toast(T('បានកំណត់ឡើងវិញ', 'Demo data reset')); } });
