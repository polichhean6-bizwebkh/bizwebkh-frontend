/* Core: i18n helpers, icons, UI helpers, router. Bilingual text is written inline as T('ខ្មែរ','English'). */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const S = { lang: 'kh', logged: false, stack: [], ui: {}, f: {}, dirty: false, cb: null };
try { const l = localStorage.getItem('c066-lang'); if (l) S.lang = l; if (sessionStorage.getItem('c066-in') === '1') S.logged = true; } catch (e) {}
const T = (kh, en) => S.lang === 'kh' ? kh : en;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const MON = { kh: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'], en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] };
const WD = { kh: ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
const D = x => typeof x === 'string' ? parseISO(x) : x;
const fmtDate = x => { const d = D(x); return d.getDate() + ' ' + MON[S.lang][d.getMonth()] + ' ' + d.getFullYear(); };
const fmtDateS = x => { const d = D(x); return d.getDate() + ' ' + MON[S.lang][d.getMonth()]; };
const fmtDateW = x => { const d = D(x); return WD[S.lang][d.getDay()] + ' ' + fmtDate(d); };
const num = (v, dp) => Number(v).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: dp == null ? 2 : dp });
const M = (v, cur) => { v = Number(v) || 0; if (cur === 'KHR') return num(Math.round(v), 0) + '៛'; return '$' + num(v, 2); };
const MU = v => '$' + num(v, 0); // USD-equivalent summary

const ICONS = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14c2.6.2 4.5 2.1 4.5 5"/>',
  loan: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9.5v.01M18 14.5v.01"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  bell: '<path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  chev: '<path d="M9 5l7 7-7 7"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M3 3l18 18"/><path d="M10.6 6.2A9.8 9.8 0 0112 6c6.4 0 10 6 10 6a17 17 0 01-3.2 3.9M6.5 7.5C3.8 9.3 2 12 2 12s3.6 6 10 6c1.5 0 2.8-.3 4-.8"/><path d="M9.9 9.9a3 3 0 004.2 4.2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  camera: '<path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
  logout: '<path d="M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4"/><path d="M16 8l4 4-4 4M20 12H9"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
  warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 01-.5-9A6 6 0 0118 10a4 4 0 010 8z"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.6-.8-1.5-1.2-2.6-1.2-1.6 0-2.7.8-2.7 2 0 3 5.6 1.4 5.6 4.4 0 1.2-1.2 2-2.9 2-1.2 0-2.2-.5-2.9-1.4M12 6v2M12 16v2"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  book: '<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h11"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
  refresh: '<path d="M20 11a8 8 0 00-14-4M4 5v4h4M4 13a8 8 0 0014 4M20 19v-4h-4"/>',
  send: '<path d="M4 12l16-8-6 16-3-7z"/>',
  money: '<path d="M12 3v18M16.5 7.5c-.8-1.2-2.4-2-4.5-2-2.6 0-4.2 1.3-4.2 3.2 0 4.6 8.8 2.2 8.8 6.8 0 1.9-1.8 3.2-4.6 3.2-2.3 0-4-.8-5-2.2"/>'
};
const I = (n, c) => `<svg class="ic ${c || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

/* ---------- labels ---------- */
const ST = () => ({
  paid: T('ទូទាត់រួច', 'Paid'), soon: T('ជិតដល់ថ្ងៃ', 'Due soon'), today: T('ដល់ថ្ងៃនេះ', 'Due today'),
  overdue: T('យឺត', 'Overdue'), partial: T('បង់ខ្លះ', 'Partial'), upcoming: T('មិនទាន់ដល់', 'Upcoming'),
  active: T('កំពុងដំណើរការ', 'Active'), completed: T('បានបញ្ចប់', 'Completed'), cancelled: T('បានលុបចោល', 'Cancelled'), new: T('ថ្មី', 'New')
});
const loanStLabel = s => s === 'paid' ? T('បានបង់ចប់', 'Paid') : ST()[s];
const bd = (s, label) => `<span class="bd ${s}">${esc(label || ST()[s])}</span>`;
const FREQ_L = () => ({ daily: T('រាល់ថ្ងៃ', 'Daily'), weekly: T('រាល់សប្តាហ៍', 'Weekly'), biweekly: T('រាល់ ២ សប្តាហ៍', 'Every 2 weeks'), monthly: T('រាល់ខែ', 'Monthly'), custom: T('កំណត់ខ្លួនឯង', 'Custom') });
const ITYPE_L = () => ({ flat: T('ការប្រាក់ថេរ', 'Flat interest'), declining: T('ការប្រាក់តាមសមតុល្យ', 'Declining balance'), none: T('គ្មានការប្រាក់', 'No interest') });
const METHOD_L = () => ({ cash: T('ប្រាក់សុទ្ធ', 'Cash'), bank: T('ផ្ទេរតាមធនាគារ', 'Bank transfer'), wallet: T('កាបូបអេឡិចត្រូនិក', 'E-wallet') });

const nm = b => S.lang === 'kh' ? b.name : b.nameEn;
const loc = b => S.lang === 'kh' ? `${b.village} · ${b.commune} · ${b.district}` : `${b.villageEn || b.village} · ${b.communeEn || b.commune} · ${b.districtEn || b.district}`;
const COLORS = ['#1F3E72', '#8A6A14', '#0E7C86', '#6A4C93', '#B14A2B', '#2F7D4F', '#9C3F6E', '#3B5BA5'];
function avatar(b, cls) {
  const col = COLORS[(parseInt(b.id.replace(/\D/g, ''), 10) || 0) % COLORS.length];
  if (b.photo) return `<div class="avatar ${cls || ''}" style="background-image:url('${b.photo}')"></div>`;
  const w = (S.lang === 'kh' ? b.name : b.nameEn).trim().split(/\s+/); const last = w[w.length - 1];
  const ch = Array.from(last)[0] || '?';
  return `<div class="avatar ${cls || ''}" style="background:${col}">${esc(ch)}</div>`;
}
const digits = s => String(s || '').replace(/\D/g, '');

/* ---------- toast / push / overlays ---------- */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400); }
let pushT;
function pushBanner(title, msg, go) {
  const p = $('#push'); p.innerHTML = `<div class="ap">${I('book')}</div><div class="grow"><div class="b small">${esc(title)}</div><div class="small mute">${esc(msg)}</div></div><span class="tiny mute">${T('ឥឡូវ', 'now')}</span>`;
  p.dataset.target = go || ''; p.classList.add('show'); clearTimeout(pushT); pushT = setTimeout(() => p.classList.remove('show'), 7000);
}
function ovOpen(html, mid) { const o = $('#overlay'); o.innerHTML = html; o.className = 'show' + (mid ? ' mid' : ''); }
function ovClose() { const o = $('#overlay'); o.className = ''; o.innerHTML = ''; }
function confirmDlg({ icon = 'info', title, msg, ok, cancel, danger, fn }) {
  S.cb = fn;
  ovOpen(`<div class="dialog"><div class="ico ${danger ? 'red' : ''}">${I(icon, 'lg')}</div><h3>${esc(title)}</h3><p>${esc(msg)}</p>
  <div class="btnrow"><button class="btn ghost" data-act="ovClose">${esc(cancel || T('បោះបង់', 'Cancel'))}</button><button class="btn ${danger ? 'danger' : ''}" data-act="cbOk">${esc(ok || T('បាទ/ចាស', 'Yes'))}</button></div></div>`, true);
}
function infoDlg(title, msg, icon) {
  ovOpen(`<div class="dialog"><div class="ico">${I(icon || 'info', 'lg')}</div><h3>${esc(title)}</h3><p>${msg}</p><button class="btn" data-act="ovClose">${T('យល់ហើយ', 'OK')}</button></div>`, true);
}

/* ---------- form helpers ---------- */
const F = (id, label, o = {}) => `<div class="fg" id="g_${id}"><label for="${id}">${label}${o.req ? ' <span class="req">*</span>' : ''}</label>
 <div class="inp${o.ro ? ' dis' : ''}">${o.icon ? I(o.icon, 'sm') : ''}<input id="${id}" type="${o.type || 'text'}" value="${esc(o.v == null ? '' : o.v)}" placeholder="${esc(o.ph || '')}" ${o.mode ? `inputmode="${o.mode}"` : ''} ${o.ro ? 'readonly' : ''} ${o.max ? `max="${o.max}"` : ''} ${o.min ? `min="${o.min}"` : ''} autocomplete="off">${o.unit ? `<span class="unit">${o.unit}</span>` : ''}</div>
 ${o.hint ? `<div class="hint">${o.hint}</div>` : ''}<div class="errmsg" id="e_${id}">${I('warn', 'sm')}<span></span></div></div>`;
const SEL = (id, label, opts, val, o = {}) => `<div class="fg" id="g_${id}"><label for="${id}">${label}${o.req ? ' <span class="req">*</span>' : ''}</label>
 <div class="inp">${o.icon ? I(o.icon, 'sm') : ''}<select id="${id}">${opts.map(([v, l]) => `<option value="${esc(v)}" ${String(v) === String(val) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></div>
 <div class="errmsg" id="e_${id}">${I('warn', 'sm')}<span></span></div></div>`;
const TA = (id, label, v, ph) => `<div class="fg" id="g_${id}"><label for="${id}">${label}</label><div class="inp"><textarea id="${id}" placeholder="${esc(ph || '')}">${esc(v || '')}</textarea></div></div>`;
const OPT = (id, opts, val, wrap) => `<div class="opt${wrap ? ' wrap' : ''}" data-optgrp="${id}">${opts.map(([v, l]) => `<button type="button" class="${String(v) === String(val) ? 'on' : ''}" data-opt="${id}:${v}">${l}</button>`).join('')}</div>`;
const V = id => { const e = $('#' + id); return e ? e.value.trim() : ''; };
function setErr(id, msg) { const g = $('#g_' + id); if (!g) return; g.classList.add('err'); const s = $('#e_' + id + ' span'); if (s) s.textContent = msg; }
function clearErrs() { $$('.fg.err').forEach(g => g.classList.remove('err')); }
function focusFirstErr() { const g = $('.fg.err'); if (g) { g.scrollIntoView({ block: 'center', behavior: 'smooth' }); const i = $('input,select,textarea', g); if (i) i.focus({ preventScroll: true }); } }

/* ---------- router ---------- */
const SCREENS = {}; const ACT = {};
const TABS = ['home', 'borrowers', 'loans', 'payments', 'more'];
const cur = () => S.stack[S.stack.length - 1];
function go(n, a) { S.dirty = false; S.stack.push({ n, a }); render(); const c = $('#content'); if (c) c.scrollTop = 0; }
function replace(n, a) { S.dirty = false; S.stack[S.stack.length - 1] = { n, a }; render(); }
function root(n, a) { S.dirty = false; S.stack = [{ n, a }]; render(); }
function back() {
  if (S.dirty) return confirmDlg({ icon: 'warn', title: T('ចាកចេញដោយមិនរក្សាទុក?', 'Leave without saving?'), msg: T('ព័ត៌មានដែលអ្នកបានបញ្ចូលនឹងបាត់បង់។', 'What you typed will be lost.'), ok: T('ចាកចេញ', 'Leave'), cancel: T('នៅទីនេះ', 'Stay'), danger: true, fn: () => { S.dirty = false; ovClose(); back(); } });
  if (S.stack.length > 1) { S.stack.pop(); render(); }
}
function tab(n) { root(n); }

function render() {
  const r = cur(); if (!r) return;
  const scr = $('#screen'); const key = r.n + '|' + r.a; const old = $('#content');
  const keep = old && scr.dataset.key === key ? old.scrollTop : 0;
  const d = SCREENS[r.n](r.a, r) || {};
  S.bind = d.bind || null;
  let html;
  if (d.raw) html = d.raw;
  else {
    const isTab = TABS.includes(r.n);
    const hdr = d.hdr || `<div class="hdr">${(!isTab && S.stack.length > 1) || d.back ? `<button class="ib" data-act="back" aria-label="Back">${I('back')}</button>` : ''}<h1>${d.title || ''}</h1>${d.right || ''}</div>`;
    html = `${hdr}<div class="demo-ribbon">${T('ឧបករណ៍សាកល្បង — ទិន្នន័យគំរូ', 'DEMO — sample data only')}</div><div class="content ${d.nopad ? 'nopad' : ''}" id="content">${d.body}</div>${d.fab || ''}${d.bar ? `<div class="stickybar">${d.bar}</div>` : ''}${isTab ? tabbar(r.n) : ''}`;
  }
  scr.innerHTML = html; scr.dataset.key = key;
  const c = $('#content'); if (c && keep) c.scrollTop = keep;
  $('#sbar').className = d.raw ? '' : '';
  if (S.bind) S.bind();
  document.documentElement.lang = S.lang === 'kh' ? 'km' : 'en';
  syncSide();
}
function tabbar(on) {
  const t = [['home', 'home', T('ទំព័រដើម', 'Home')], ['borrowers', 'users', T('អ្នកខ្ចី', 'Borrowers')], ['loans', 'loan', T('ប្រាក់កម្ចី', 'Loans')], ['payments', 'receipt', T('ការបង់ប្រាក់', 'Payments')], ['more', 'more', T('ច្រើនទៀត', 'More')]];
  return `<nav class="tabbar">${t.map(([k, ic, l]) => `<button class="${on === k ? 'on' : ''}" data-tab="${k}"><span class="pillbg">${I(ic)}</span><span>${l}</span></button>`).join('')}</nav>`;
}
function setLang(l) { S.lang = l; try { localStorage.setItem('c066-lang', l); } catch (e) {} render(); }

/* ---------- global events ---------- */
document.addEventListener('click', e => {
  const ph = e.target.closest('#phone');
  const side = e.target.closest('#side');
  if (side) { const j = e.target.closest('[data-jump]'); if (j) jump(j.dataset.jump); const sl = e.target.closest('[data-slang]'); if (sl) setLang(sl.dataset.slang); const sz = e.target.closest('[data-size]'); if (sz) { const [w, h] = sz.dataset.size.split('x'); document.documentElement.style.setProperty('--pw', w + 'px'); document.documentElement.style.setProperty('--ph', h + 'px'); syncSide(); } if (e.target.closest('[data-sreset]')) ACT.resetDemo(); return; }
  if (!ph) return;
  const ov = $('#overlay');
  if (e.target === ov && ov.classList.contains('show')) { ovClose(); return; }
  const opt = e.target.closest('[data-opt]');
  if (opt) { const [g, v] = opt.dataset.opt.split(':'); S.f[g] = v; $$(`[data-optgrp="${g}"] button`).forEach(b => b.classList.toggle('on', b === opt)); S.dirty = true; if (S.onOpt) S.onOpt(g, v); return; }
  const t = e.target.closest('[data-tab]'); if (t) { tab(t.dataset.tab); return; }
  const a = e.target.closest('[data-act]');
  if (a) { e.stopPropagation(); const fn = ACT[a.dataset.act]; if (fn) fn(a, e); return; }
  const g = e.target.closest('[data-go]'); if (g) { if (g.dataset.go) go(g.dataset.go, g.dataset.a); return; }
});
document.addEventListener('input', e => { if (e.target.closest('#content form, #content .formwrap')) S.dirty = true; });
ACT.back = () => back();
ACT.ovClose = () => ovClose();
ACT.cbOk = () => { const f = S.cb; S.cb = null; if (f) f(); };
ACT.tel = a => { const n = digits(a.dataset.n); ovClose(); confirmCall(a.dataset.name, a.dataset.n); };
function confirmCall(name, phone) {
  ovOpen(`<div class="sheet"><h3>${T('ហៅទូរស័ព្ទ', 'Call')}</h3><div class="row" style="margin:10px 0 16px"><div class="ico" style="width:48px;height:48px;border-radius:50%;background:var(--green-t);color:var(--green);display:grid;place-items:center">${I('phone')}</div><div><div class="b">${esc(name)}</div><div class="mute">${esc(phone)}</div></div></div>
  <div class="btnrow"><button class="btn ghost" data-act="ovClose">${T('បោះបង់', 'Cancel')}</button><a class="btn green" href="tel:${digits(phone)}" data-act="ovClose">${I('phone', 'sm')} ${T('ហៅ', 'Call')}</a></div><p class="hint center" style="margin-top:8px">${T('សាកល្បង៖ នៅលើទូរស័ព្ទពិត វានឹងបើកកម្មវិធីហៅ។', 'Demo: on a real phone this opens the dialer.')}</p></div>`);
}
