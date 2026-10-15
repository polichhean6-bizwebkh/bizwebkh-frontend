/* C067 Mini CRM Demo — LOCAL DEMO ONLY (localStorage). Not production-secure. */
(function () {
  'use strict';
  const D = window.C067;
  const KEY = 'c067_demo_db_v1', SKEY = 'c067_demo_session_v1';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const DEFAULT_LOGO = 'assets/logo.svg';

  /* ---------- icons ---------- */
  const IC = {
    search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>', plus: '<path d="M5 12h14M12 5v14"/>',
    gear: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><path d="M2 2l20 20"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    brief: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
    down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    back: '<path d="M15 18l-6-6 6-6"/>', cam: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    cloud: '<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>', check: '<path d="M20 6L9 17l-5-5"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>', warn: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    map: '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z"/><path d="M8 2v16M16 6v16"/>', chev: '<path d="M9 18l6-6-6-6"/>', home: '<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>'
  };
  const ic = (n, extra) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true"${extra || ''}>${IC[n] || ''}</svg>`;

  /* ---------- storage ---------- */
  let db, session = null;
  function load() {
    try { const r = localStorage.getItem(KEY); if (r) { const o = JSON.parse(r); if (o && o.members && o.partners && o.settings) return o; } } catch (e) { }
    return D.seed();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); return true; }
    catch (e) { toast('ទំហំផ្ទុកក្នុងឧបករណ៍ពេញ សូមប្រើរូបភាពតូចជាងនេះ', 'bad'); return false; }
  }
  function loadSession() { try { const s = JSON.parse(localStorage.getItem(SKEY)); return s && (s.role === 'admin' || s.role === 'user') ? s : null; } catch (e) { return null; } }
  const isAdmin = () => !!session && session.role === 'admin';
  const S = () => db.settings;

  /* ---------- utils ---------- */
  const KHN = '០១២៣៤៥៦៧៨៩', KHM = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
  const khd = s => String(s).replace(/\d/g, d => KHN[d]);
  function fmtDate(s) { if (!s) return ''; const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); if (!m) return esc(s); return khd(+m[3]) + ' ' + KHM[+m[2] - 1] + ' ' + khd(m[1]); }
  const nf = n => Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });
  const money = (n, c) => `<span class="num">${nf(n)} ${esc(c)}</span>`;
  const fullName = r => `${r.family || ''} ${r.given || ''}`.trim();
  const ptLabel = k => (D.PTYPES.find(p => p.k === k) || {}).l || '';
  const inLabel = k => (D.INTERESTS.find(p => p.k === k) || {}).l || '';
  const loc = r => [r.geoVillage && 'ភូមិ' + r.geoVillage, r.geoCommune, r.geoDistrict].filter(Boolean).join(' · ');
  const isUrl = s => /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(s);
  const telHref = p => 'tel:' + String(p || '').replace(/[^\d+]/g, '');
  function nextId(list, prefix) {
    let mx = 0; list.forEach(x => { const m = /(\d+)$/.exec(x.id); if (m) mx = Math.max(mx, +m[1]); });
    return prefix + String(mx + 1).padStart(3, '0');
  }
  function toast(msg, type) {
    const t = document.createElement('div'); t.className = 'toast ' + (type || 'ok'); t.textContent = msg; t.setAttribute('role', 'status');
    $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3200);
  }
  function resizeImage(file, max, cb) {
    if (!file || !/^image\//.test(file.type)) { toast('សូមជ្រើសរើសឯកសាររូបភាព', 'bad'); return; }
    const rd = new FileReader();
    rd.onload = () => {
      const im = new Image();
      im.onload = () => {
        const sc = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas');
        c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); cb(c.toDataURL('image/jpeg', .8));
      };
      im.onerror = () => toast('មិនអាចអានរូបភាពនេះបានទេ', 'bad'); im.src = rd.result;
    };
    rd.readAsDataURL(file);
  }

  /* ---------- layers ---------- */
  const layers = [];
  function pushLayer(render, o) {
    o = o || {};
    const el = document.createElement('div'); el.className = 'layer ' + (o.cls || '');
    el.innerHTML = '<div class="sheet" role="dialog" aria-modal="true"></div>';
    const L = { el, render, live: !!o.live, closable: o.closable !== false, paint() { $('.sheet', el).innerHTML = render(); } };
    L.paint(); el.addEventListener('mousedown', e => { if (e.target === el && L.closable) popLayer(L); });
    $('#layers').appendChild(el); layers.push(L); document.body.style.overflow = 'hidden'; return L;
  }
  function popLayer(L) {
    L = L || layers[layers.length - 1]; if (!L) return; L.el.remove();
    const i = layers.indexOf(L); if (i > -1) layers.splice(i, 1); if (!layers.length) document.body.style.overflow = '';
  }
  const closeAll = () => { while (layers.length) popLayer(); };
  const repaint = () => layers.forEach(l => { if (l.live) l.paint(); });
  const layerOf = el => { const e = el.closest('.layer'); return layers.find(l => l.el === e); };
  function dialog(o, onOk) {
    const L = pushLayer(() => `<div class="dialog"><div class="di ${o.tone || ''}">${ic(o.icon || 'warn')}</div><h3>${esc(o.title)}</h3><p>${esc(o.msg || '')}</p>
      <div class="dbtn">${o.cancel === false ? '' : `<button class="btn ghost" data-act="dlg-cancel">${esc(o.cancelText || 'បោះបង់')}</button>`}<button class="btn ${o.btn || 'red'}" data-act="dlg-ok">${esc(o.okText || 'យល់ព្រម')}</button></div></div>`, { cls: 'dlg' });
    L.onOk = onOk; return L;
  }
  const confirmBox = (title, msg, okText, onOk) => dialog({ title, msg, okText, icon: 'warn' }, onOk);

  /* ---------- state ---------- */
  const ui = { tab: 'home', q: '', f: { district: '', commune: '', position: '', ptype: '', interest: '', kind: '' } };
  let draft = null;
  const activeFilters = () => Object.values(ui.f).filter(Boolean).length;

  /* ---------- app shell ---------- */
  function logoSrc() { return S().logo || DEFAULT_LOGO; }
  function renderApp() {
    document.title = S().appName + ' — Demo';
    const app = $('#app');
    if (!session) { app.innerHTML = loginHtml(); return; }
    app.innerHTML = homeHtml(); renderList();
  }
  function loginHtml() {
    return `<div class="login"><div class="login-card">
      <div class="login-logo"><img src="${esc(logoSrc())}" alt="Logo"><h1>${esc(S().appName)}</h1><p>ប្រចាំខេត្ត${esc(S().province)}</p><span class="demo-tag">កំណែសាកល្បង (Demo)</span></div>
      <div id="login-err" class="alert bad hidden" role="alert"></div>
      <div class="field"><label class="lb" for="lg-u">ឈ្មោះអ្នកប្រើប្រាស់</label><input class="inp" id="lg-u" autocomplete="off" autocapitalize="off" placeholder="បញ្ចូលឈ្មោះអ្នកប្រើប្រាស់"></div>
      <div class="field"><label class="lb" for="lg-p">ពាក្យសម្ងាត់</label><div class="pw"><input class="inp" id="lg-p" type="password" autocomplete="off" placeholder="បញ្ចូលពាក្យសម្ងាត់"><button type="button" data-act="togglepw" aria-label="បង្ហាញ/លាក់ពាក្យសម្ងាត់">${ic('eye')}</button></div></div>
      <button class="btn gold block" data-act="login">${ic('lock')} ចូលប្រព័ន្ធ</button>
      <section class="demo-acc" aria-label="គណនីសម្រាប់សាកល្បង Demo">
        <h2>គណនីសម្រាប់សាកល្បង Demo</h2>
        <div class="role-card admin"><div class="rc-top"><b>Admin — សិទ្ធិគ្រប់គ្រងពេញលេញ</b></div>
          <div class="rc-cred num"><span>Username: <code>Admin</code></span><span>Password: <code>${esc(S().adminPass)}</code></span></div>
          <p>អាចមើល បន្ថែម កែប្រែ លុប និងគ្រប់គ្រង Settings</p>
          <button class="btn sm block" data-act="demo-login" data-v="admin">${ic('shield')} ចូលជា Admin</button></div>
        <div class="role-card user"><div class="rc-top"><b>User View — មើលទិន្នន័យតែប៉ុណ្ណោះ</b></div>
          <div class="rc-cred num"><span>Username: <code>user369</code></span><span>Password: <code>${esc(S().userPass)}</code></span></div>
          <p>អាចមើល និងស្វែងរកទិន្នន័យ ប៉ុន្តែមិនអាចបន្ថែម កែប្រែ ឬលុប</p>
          <button class="btn sm blue block" data-act="demo-login" data-v="user">${ic('eye')} ចូលជា User View</button></div>
        <p class="demo-note">គណនីខាងលើសម្រាប់សាកល្បង Demo ប៉ុណ្ណោះ។ ប្រព័ន្ធពិតនឹងមិនបង្ហាញ Password នៅលើផ្ទាំង Login ទេ។</p>
      </section>
    </div><p class="foot-note">ប្រព័ន្ធគ្រប់គ្រងសមាជិក និងដៃគូសហការ · រៀបចំដោយ BizWeb KH</p></div>`;
  }
  function doLogin() {
    const u = $('#lg-u').value.trim(), p = $('#lg-p').value, er = $('#login-err');
    const fail = m => { er.textContent = m; er.classList.remove('hidden'); };
    if (!u || !p) return fail('សូមបំពេញឈ្មោះអ្នកប្រើប្រាស់ និងពាក្យសម្ងាត់');
    let role = null;
    if (u.toLowerCase() === 'admin' && p === S().adminPass) role = 'admin';
    else if (u.toLowerCase() === 'user369' && p === S().userPass) role = 'user';
    if (!role) return fail('ឈ្មោះអ្នកប្រើប្រាស់ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ សូមព្យាយាមម្ដងទៀត');
    session = { role }; try { localStorage.setItem(SKEY, JSON.stringify(session)); } catch (e) { }
    ui.tab = 'home'; ui.q = ''; clearFilters(true); renderApp();
    toast(role === 'admin' ? 'ស្វាគមន៍ Admin' : 'ស្វាគមន៍ User View');
  }
  function doLogout() { session = null; try { localStorage.removeItem(SKEY); } catch (e) { } closeAll(); renderApp(); }

  function counts() {
    const c = { m: db.members.length, p: db.partners.length };
    D.PTYPES.forEach(t => c[t.k] = db.partners.filter(p => p.ptype === t.k).length); return c;
  }
  function homeHtml() {
    const c = counts(), adm = isAdmin(), home = ui.tab === 'home';
    const kp = (cls, num, lab, act, on) => `<button class="kp ${cls} ${on ? 'on' : ''}" data-act="kpi" data-v="${act}"><b class="num">${num}</b><span>${lab}</span></button>`;
    const nv = (act, v, icon, lab, on) => `<button class="nv ${on ? 'on' : ''}" data-act="${act}" ${v ? `data-v="${v}"` : ''} ${on ? 'aria-current="page"' : ''}>${ic(icon)}<span>${lab}</span></button>`;
    return `<header class="top"><div class="wrap top-in">
        <img class="logo" src="${esc(logoSrc())}" alt="Logo"><div class="ttl"><h1>${esc(S().appName)}</h1><p>ប្រចាំខេត្ត${esc(S().province)} <span class="pill gold">BTB</span> <span class="pill glass">${adm ? 'Admin' : 'User View'}</span></p></div>
        <button class="icon-btn" data-act="logout" aria-label="ចាកចេញ">${ic('out')}</button></div></header>
      <main class="wrap main">
        ${home ? `<section class="kpis" aria-label="សង្ខេប">
          ${kp('tot', c.m, 'សមាជិកសរុប', 'm', false)}${kp('tot', c.p, 'ដៃគូសហការសរុប', 'p', false)}
          ${D.PTYPES.map(t => kp('', c[t.k], t.l, t.k, ui.f.ptype === t.k)).join('')}
        </section>
        ${adm ? `<div class="addrow"><button class="btn big" data-act="add-member">${ic('plus')} បន្ថែមសមាជិក</button><button class="btn gold big" data-act="add-partner">${ic('plus')} បន្ថែមដៃគូ</button></div>` : ''}` : ''}
        <div class="stick"><div class="bar-row"><div class="searchbox">${ic('search')}<input class="inp" id="q" type="search" value="${esc(ui.q)}" placeholder="ស្វែងរក ID ឈ្មោះ ទូរស័ព្ទ ភូមិ…" aria-label="ស្វែងរក"></div>
          <button class="btn ghost fbtn" data-act="filter" aria-label="តម្រង">${ic('filter')}${activeFilters() ? `<span class="fbadge num">${activeFilters()}</span>` : ''}</button></div></div>
        <div id="listwrap"></div>
      </main>
      ${adm ? `<button class="fab" data-act="fab" aria-label="បន្ថែមថ្មី">${ic('plus')}</button>` : ''}
      <nav class="bnav" aria-label="ម៉ឺនុយចម្បង"><div class="bnav-in">
        ${nv('tab', 'home', 'home', 'ទំព័រដើម', ui.tab === 'home')}${nv('tab', 'members', 'users', 'សមាជិក', ui.tab === 'members')}${nv('tab', 'partners', 'brief', 'ដៃគូ', ui.tab === 'partners')}${nv('focus-search', '', 'search', 'ស្វែងរក', false)}${adm ? nv('settings', '', 'gear', 'ការកំណត់', false) : ''}
      </div></nav>`;
  }

  /* ---------- list ---------- */
  function hay(r, kind) {
    const a = [r.id, fullName(r), (r.given || '') + ' ' + (r.family || ''), r.phone, String(r.phone || '').replace(/\D/g, ''), r.geoVillage, r.geoCommune, r.geoDistrict, r.addrVillage, r.addrCommune, r.addrDistrict];
    if (kind === 'm') a.push(r.occupation, r.role, r.position); else a.push(r.bizName, r.bizType, r.address, ptLabel(r.ptype));
    return a.join(' ').toLowerCase();
  }
  function filtered() {
    const q = ui.q.trim().toLowerCase(), f = ui.f, qd = /^[\d\s+-]+$/.test(q) ? q.replace(/\D/g, '') : '';
    const ok = (r, kind) => {
      if (q && !(hay(r, kind).includes(q) || (qd.length > 2 && hay(r, kind).includes(qd)))) return false;
      if (f.kind && f.kind !== kind) return false;
      if (f.district && r.geoDistrict !== f.district) return false;
      if (f.commune && r.geoCommune !== f.commune) return false;
      if (f.interest && !((kind === 'm' ? r.interests : r.sectors) || []).includes(f.interest)) return false;
      if (f.position && (kind !== 'm' || r.position !== f.position)) return false;
      if (f.ptype && (kind !== 'p' || r.ptype !== f.ptype)) return false;
      return true;
    };
    const ms = ui.tab === 'partners' ? [] : db.members.filter(r => ok(r, 'm')), ps = ui.tab === 'members' ? [] : db.partners.filter(r => ok(r, 'p'));
    return { ms, ps };
  }
  const avatar = (r, cls) => r.photo ? `<img class="av ${cls || ''}" src="${esc(r.photo)}" alt="">` : `<div class="av ${cls || ''}">${esc(Array.from(r.given || r.bizName || '?')[0])}</div>`;
  const tags = (arr, big) => (arr && arr.length) ? `<div class="tags">${arr.map(k => `<span class="tag t-${k}">${esc(inLabel(k))}</span>`).join('')}</div>` : '';
  const shortLoc = r => r.geoCommune || r.geoDistrict || '';
  function memberCard(m) {
    return `<div class="card" role="button" tabindex="0" data-act="view-m" data-id="${esc(m.id)}">${avatar(m)}<div class="bd"><h3>${esc(fullName(m))}</h3>
      <div class="m2"><span class="cid num">${esc(m.id)}</span><span>${esc(m.position)}</span></div>
      <div class="m2 m3"><span class="num ph2">${esc(m.phone)}</span><span class="lc">${esc(shortLoc(m))}</span></div></div>
      <a class="callbtn" data-act="call" href="${esc(telHref(m.phone))}" aria-label="ហៅទូរស័ព្ទ">${ic('phone')}</a></div>`;
  }
  function partnerCard(p) {
    return `<div class="card" role="button" tabindex="0" data-act="view-p" data-id="${esc(p.id)}">${avatar(p, 'f')}<div class="bd"><h3>${esc(p.bizName)}</h3>
      <div class="m2"><span class="cid num">${esc(p.id)}</span><span>${esc(ptLabel(p.ptype))}</span></div>
      <div class="m2 m3"><span class="num ph2">${esc(p.phone)}</span><span class="lc">${esc(shortLoc(p))}</span></div></div>
      <a class="callbtn" data-act="call" href="${esc(telHref(p.phone))}" aria-label="ហៅទូរស័ព្ទ">${ic('phone')}</a></div>`;
  }
  function renderList() {
    const w = $('#listwrap'); if (!w) return;
    const { ms, ps } = filtered(), total = ms.length + ps.length, searching = ui.q.trim() || activeFilters();
    const lab = ui.tab === 'members' ? 'សមាជិក' : ui.tab === 'partners' ? 'ដៃគូសហការ' : (searching ? 'លទ្ធផល' : 'ថ្មីៗ');
    let h = `<div class="count"><span>${lab}៖ <b class="num">${ui.tab === 'home' && !searching ? '' : total}</b></span><span class="crow">${searching ? `<button class="btn sm ghost" data-act="clear-all">សម្អាត Filter</button>` : ''}${ui.tab === 'home' ? `<button class="link" data-act="export">${ic('down')} នាំចេញ</button>` : ''}</span></div>`;
    if (!total) {
      const msg = ui.tab === 'partners' ? ['រកមិនឃើញដៃគូសហការ', 'មិនមានដៃគូសហការត្រូវនឹងការស្វែងរក ឬតម្រងរបស់អ្នកទេ'] : ui.tab === 'members' ? ['រកមិនឃើញសមាជិក', 'មិនមានសមាជិកត្រូវនឹងការស្វែងរក ឬតម្រងរបស់អ្នកទេ'] : ['រកមិនឃើញទិន្នន័យ', 'សូមព្យាយាមស្វែងរកដោយពាក្យផ្សេង ឬសម្អាត Filter'];
      h += `<div class="empty">${ic('search')}<b>${msg[0]}</b><p>${msg[1]}</p></div>`;
    } else if (ui.tab === 'home' && !searching) {
      const sec = (title, arr, v, card) => arr.length ? `<div class="sec-h"><b>${title}</b><button class="link" data-act="tab" data-v="${v}">មើលទាំងអស់ (${arr.length}) ${ic('chev')}</button></div><div class="list">${arr.slice(0, 4).map(card).join('')}</div>` : '';
      h += sec('សមាជិក', ms, 'members', memberCard) + sec('ដៃគូសហការ', ps, 'partners', partnerCard);
    } else h += `<div class="list">${ms.map(memberCard).join('')}${ps.map(partnerCard).join('')}</div>`;
    w.innerHTML = h;
  }
  function clearFilters(silent) {
    ui.f = { district: '', commune: '', position: '', ptype: '', interest: '', kind: '' };
    if (!silent) { ui.q = ''; renderApp(); }
  }

  /* ---------- filter panel ---------- */
  const optList = (arr, cur, ph) => `<option value="">${ph}</option>` + arr.map(v => `<option value="${esc(v.k || v)}" ${(v.k || v) === cur ? 'selected' : ''}>${esc(v.l || v)}</option>`).join('');
  function filterHtml() {
    const f = ui.f, communes = f.district ? D.GEO[f.district] : [].concat(...Object.values(D.GEO));
    const sel = (lab, key, opts, ph) => `<div class="field"><label class="lb">${lab}</label><select class="inp" data-fil="${key}">${optList(opts, f[key], ph)}</select></div>`;
    const { ms, ps } = filtered();
    return `<div class="grab"></div><div class="sh-head"><h2>ស្វែងរក និងតម្រង</h2><button class="icon-btn" data-act="close" aria-label="បិទ">${ic('x')}</button></div>
      <div class="sh-body">
        ${sel('ប្រភេទ (សមាជិក / ដៃគូ)', 'kind', [{ k: 'm', l: 'សមាជិក' }, { k: 'p', l: 'ដៃគូសហការ' }], 'ទាំងអស់')}
        ${sel('ក្រុង/ស្រុក', 'district', Object.keys(D.GEO), 'ទាំងអស់')}
        ${sel('ឃុំ/សង្កាត់', 'commune', communes, 'ទាំងអស់')}
        ${sel('តួនាទី / ឋានៈ (សមាជិក)', 'position', D.POSITIONS, 'ទាំងអស់')}
        ${sel('ប្រភេទដៃគូ', 'ptype', D.PTYPES, 'ទាំងអស់')}
        ${sel('ចំណាប់អារម្មណ៍ / វិស័យ', 'interest', D.INTERESTS, 'ទាំងអស់')}
      </div>
      <div class="sh-foot"><button class="btn ghost" data-act="clear-filters">សម្អាត Filter</button><button class="btn gold" data-act="close">មើលលទ្ធផល (${ms.length + ps.length})</button></div>`;
  }

  /* ---------- detail ---------- */
  const kv = (l, v, raw) => `<div class="kv"><dt>${l}</dt><dd>${v ? (raw ? v : esc(v)) : '—'}</dd></div>`;
  const dsec = (n, t, body) => `<section class="dsec"><h4><i class="num">${n}</i>${t}</h4><dl>${body}</dl></section>`;
  function quick(r) {
    return `<div class="qa"><a class="btn blue ${r.phone ? '' : 'off'}" href="${esc(telHref(r.phone))}">${ic('phone')}Call</a>
      <a class="btn ${r.facebook ? '' : 'off'}" href="${esc(r.facebook || '#')}" target="_blank" rel="noopener noreferrer">${ic('fb')}Facebook</a>
      <a class="btn green ${r.mapUrl ? '' : 'off'}" href="${esc(r.mapUrl || '#')}" target="_blank" rel="noopener noreferrer">${ic('pin')}Google Maps</a></div>`;
  }
  const adminBar = (k, id) => isAdmin() ? `<div class="sh-foot"><button class="btn ghost" data-act="edit-${k}" data-id="${esc(id)}">${ic('edit')} កែប្រែ</button><button class="btn red" data-act="del-${k}" data-id="${esc(id)}">${ic('trash')} លុប</button></div>` : '';
  function memberDetail(id) {
    return () => {
      const m = db.members.find(x => x.id === id); if (!m) return `<div class="sh-body"><div class="empty">${ic('search')}<b>រកមិនឃើញសមាជិក</b></div></div>`;
      return `<div class="sh-head"><h2>ព័ត៌មានសមាជិក</h2><button class="icon-btn" data-act="close" aria-label="បិទ">${ic('x')}</button></div>
      <div class="sh-body">
        <div class="hero">${avatar(m)}<span class="cid num">${esc(m.id)}</span><h2>${esc(fullName(m))}</h2><p>${esc(m.position)}</p></div>
        ${quick(m)}
        ${dsec(1, 'Profile', kv('ID / អត្តលេខ', m.id) + kv('ថ្នាក់', m.level) + kv('ក្រុង/ស្រុក', m.geoDistrict) + kv('ឃុំ/សង្កាត់', m.geoCommune) + kv('ភូមិ', m.geoVillage))}
        ${dsec(2, 'ព័ត៌មានមូលដ្ឋាន', kv('នាមត្រកូល', m.family) + kv('នាមខ្លួន', m.given) + kv('ភេទ', m.gender) + kv('លេខអត្តសញ្ញាណប័ណ្ណ', m.idCard) + kv('មុខរបរបច្ចុប្បន្ន', m.occupation) + kv('ថ្ងៃចុះឈ្មោះ', fmtDate(m.regDate), 1))}
        ${dsec(3, 'ឋានៈ និងតួនាទី', kv('ឋានៈ', m.position) + kv('តួនាទី', m.role))}
        <section class="dsec"><h4><i class="num">4</i>ចំណាប់អារម្មណ៍</h4>${m.interests && m.interests.length ? tags(m.interests) : '<div class="kv"><dd>—</dd></div>'}</section>
        ${dsec(5, 'អាសយដ្ឋាន និងទីតាំង', kv('ភូមិ', m.addrVillage) + kv('ឃុំ/សង្កាត់', m.addrCommune) + kv('ក្រុង/ស្រុក', m.addrDistrict) + kv('ខេត្ត', m.addrProvince) + (m.mapUrl ? `<div class="kv"><dd style="text-align:left;width:100%"><a class="btn green sm block" href="${esc(m.mapUrl)}" target="_blank" rel="noopener noreferrer">${ic('pin')} បើកមើលទីតាំងលើ Google Maps</a></dd></div>` : ''))}
        ${dsec(6, 'ទំនាក់ទំនង', kv('លេខទូរស័ព្ទ', m.phone) + kv('Facebook', m.facebook))}
        ${dsec(7, 'អ្នកណែនាំ', kv('អ្នកណែនាំចូលជាសមាជិក', m.referrer))}
        ${dsec(8, 'អ្នកបន្តវេន / អ្នកទំនាក់ទំនង', kv('ឈ្មោះ', m.sucName) + kv('ត្រូវជា', m.sucRel) + kv('លេខទំនាក់ទំនង', m.sucPhone))}
      </div>${adminBar('m', m.id)}`;
    };
  }
  function partnerDetail(id) {
    return () => {
      const p = db.partners.find(x => x.id === id); if (!p) return `<div class="sh-body"><div class="empty">${ic('search')}<b>រកមិនឃើញដៃគូ</b></div></div>`;
      const items = p.items || [];
      return `<div class="sh-head"><h2>ព័ត៌មានដៃគូសហការ</h2><button class="icon-btn" data-act="close" aria-label="បិទ">${ic('x')}</button></div>
      <div class="sh-body">
        <div class="hero ${p.cover ? 'cv' : ''}" ${p.cover ? `style="background-image:url('${esc(p.cover)}')"` : ''}>${avatar(p, 'f')}<span class="cid num">${esc(p.id)}</span><h2>${esc(p.bizName)}</h2><p>${esc(ptLabel(p.ptype))} · ${esc(fullName(p))}</p></div>
        ${quick(p)}
        ${dsec(1, 'ព័ត៌មានអាជីវកម្ម', kv('Partner ID', p.id) + kv('ប្រភេទដៃគូ', ptLabel(p.ptype)) + kv('ឈ្មោះអាជីវកម្ម', p.bizName) + kv('ប្រភេទអាជីវកម្ម', p.bizType))}
        ${dsec(2, 'ម្ចាស់អាជីវកម្ម', kv('នាមត្រកូល', p.family) + kv('នាមខ្លួន', p.given) + kv('ភេទ', p.gender) + kv('លេខអត្តសញ្ញាណប័ណ្ណ', p.idCard))}
        ${dsec(3, 'ទីតាំងភូមិសាស្ត្រ', kv('ក្រុង/ស្រុក', p.geoDistrict) + kv('ឃុំ/សង្កាត់', p.geoCommune) + kv('ភូមិ', p.geoVillage))}
        <section class="dsec"><h4><i class="num">4</i>វិស័យអាជីវកម្ម</h4>${p.sectors && p.sectors.length ? tags(p.sectors) : '<div class="kv"><dd>—</dd></div>'}</section>
        ${dsec(5, 'អាសយដ្ឋាន និងទំនាក់ទំនង', kv('អាសយដ្ឋានបច្ចុប្បន្ន', p.address) + kv('លេខទូរស័ព្ទ', p.phone) + kv('Facebook', p.facebook) + (p.mapUrl ? `<div class="kv"><dd style="text-align:left;width:100%"><a class="btn green sm block" href="${esc(p.mapUrl)}" target="_blank" rel="noopener noreferrer">${ic('pin')} បើកមើលទីតាំងលើ Google Maps</a></dd></div>` : ''))}
        ${dsec(6, 'កិច្ចសហការ', kv('អ្នកណែនាំចូលជាសមាជិក', p.referrer) + kv('ថ្ងៃចុះ MOU', fmtDate(p.mouDate), 1))}
        ${dsec(7, 'អ្នកបន្តវេន / អ្នកទំនាក់ទំនង', kv('ឈ្មោះ', p.sucName) + kv('ត្រូវជា', p.sucRel) + kv('លេខទំនាក់ទំនង', p.sucPhone))}
        <section class="dsec"><h4><i class="num">8</i>ផលិតផល / កសិផល / សេវាកម្ម <span class="pill gold num" style="margin-left:auto">${items.length}</span></h4>
          ${isAdmin() ? `<button class="btn gold block sm" data-act="add-item" data-id="${esc(p.id)}">${ic('plus')} + បន្ថែមផលិតផល/សេវាកម្ម</button>` : ''}
          ${items.length ? items.map(it => `<div class="item"><h5>${esc(it.name)}</h5><div class="pr"><span>ឯកត្តា៖ <b>${esc(it.unit)}</b></span><span>តម្លៃលក់ចេញ៖ <b>${money(it.price, it.cur)}</b></span><span>កម្រៃជើងសារ៖ <b>${money(it.comm || 0, it.commCur)}</b></span></div>
            <div class="pr"><span>អ្នកនាំចូល៖ <b>${esc(it.importer) || '—'}</b></span></div>
            ${isAdmin() ? `<div class="ia"><button class="btn ghost sm" data-act="edit-item" data-id="${esc(p.id)}" data-it="${esc(it.id)}">${ic('edit')} កែប្រែ</button><button class="btn ghost sm" style="color:var(--red)" data-act="del-item" data-id="${esc(p.id)}" data-it="${esc(it.id)}">${ic('trash')} លុប</button></div>` : ''}</div>`).join('')
          : `<div class="empty" style="box-shadow:none;padding:18px 8px">${ic('box')}<b>មិនទាន់មានផលិតផល ឬសេវាកម្មនៅឡើយ</b>${isAdmin() ? '<p>ចុចប៊ូតុងខាងលើដើម្បីបន្ថែម</p>' : ''}</div>`}
        </section>
      </div>${adminBar('p', p.id)}`;
    };
  }

  /* ---------- form builders ---------- */
  const V = (o, k) => esc(o && o[k] != null ? o[k] : '');
  function fld(label, name, o, opt) {
    opt = opt || {};
    return `<div class="field"><label class="lb" for="f-${name}">${label}${opt.req ? ' <span class="req">*</span>' : ''}</label>
      <input class="inp ${opt.cls || ''}" id="f-${name}" type="${opt.type || 'text'}" value="${V(o, name)}" placeholder="${esc(opt.ph || '')}" ${opt.mode ? `inputmode="${opt.mode}"` : ''} autocomplete="off"><span class="err" id="e-${name}"></span></div>`;
  }
  function sel(label, name, opts, cur, opt) {
    opt = opt || {};
    return `<div class="field"><label class="lb" for="f-${name}">${label}${opt.req ? ' <span class="req">*</span>' : ''}</label>
      <select class="inp" id="f-${name}" ${opt.geo ? `data-geo="${opt.geo}"` : ''}><option value="">— ជ្រើសរើស —</option>${opts.map(v => `<option value="${esc(v.k || v)}" ${(v.k || v) === cur ? 'selected' : ''}>${esc(v.l || v)}</option>`).join('')}</select><span class="err" id="e-${name}"></span></div>`;
  }
  const chk = (name, cur) => `<div class="checks">${D.INTERESTS.map(i => `<label><input type="checkbox" name="${name}" value="${i.k}" ${(cur || []).includes(i.k) ? 'checked' : ''}><span>${esc(i.l)}</span></label>`).join('')}</div>`;
  const fc = (n, t, body) => `<section class="fcard"><h4><i class="num">${n}</i>${t}</h4>${body}</section>`;
  function upl(key, label, src, o, cover) {
    return `<div class="field"><label class="lb">${label}</label><div class="${cover ? '' : 'upl'}">
      ${cover ? `<div class="cover" id="prev-${key}">${src ? `<img src="${esc(src)}" alt="">` : ic('cam')}</div>` : `<div id="prev-${key}">${src ? `<img class="av" src="${esc(src)}" alt="">` : `<div class="av">${ic('cam')}</div>`}</div>`}
      <div class="upl-btns" ${cover ? 'style="flex-direction:row;margin-top:8px"' : ''}><span class="btn ghost sm filebtn" style="${cover ? 'flex:1' : ''}">${ic('cam')} ជ្រើសរើសរូបថត<input type="file" accept="image/*" data-img="${key}" aria-label="${label}"></span>
      <button class="btn ghost sm" data-act="rm-img" data-v="${key}" ${cover ? 'style="flex:1"' : ''}>លុបរូប</button></div></div></div>`;
  }
  function geoSel(o, pre) {
    const d = (o && o[pre + 'District']) || '';
    return sel('ក្រុង/ស្រុក', pre + 'District', Object.keys(D.GEO), d, { req: 1, geo: pre }) +
      sel('ឃុំ/សង្កាត់', pre + 'Commune', d ? D.GEO[d] : [], (o && o[pre + 'Commune']) || '') + fld('ភូមិ', pre + 'Village', o, { ph: 'ឈ្មោះភូមិ' });
  }
  const formShell = (title, body, saveAct, id) => `<div class="sh-head"><button class="icon-btn" data-act="close" aria-label="ត្រឡប់ក្រោយ">${ic('back')}</button><h2>${title}</h2></div>
    <div class="sh-body" id="formbody">${body}</div><div class="sh-foot"><button class="btn ghost" data-act="close">បោះបង់</button><button class="btn gold" data-act="${saveAct}" data-id="${esc(id || '')}">${ic('check')} រក្សាទុក</button></div>`;

  function memberForm(m) {
    const n = !m; m = m || { level: 'ភូមិ', addrProvince: S().province, regDate: new Date().toISOString().slice(0, 10), interests: [] };
    draft = { kind: 'm', photo: m.photo || null };
    return () => formShell(n ? 'បន្ថែមសមាជិកថ្មី' : 'កែប្រែសមាជិក',
      `<div class="alert info">${ic('info')} ព័ត៌មានទាំងអស់នៅក្នុង Demo នេះត្រូវបានរក្សាទុកតែក្នុងឧបករណ៍នេះប៉ុណ្ណោះ។ ចំណុចដែលមានសញ្ញា <span class="req">*</span> ត្រូវតែបំពេញ។</div>` +
      fc(1, 'រូបថត Profile', upl('photo', 'រូបថត Profile', m.photo)) +
      fc(2, 'ថ្នាក់ភូមិសាស្ត្រ', sel('ថ្នាក់', 'level', D.LEVELS, m.level) + geoSel(m, 'geo')) +
      fc(3, 'ព័ត៌មានផ្ទាល់ខ្លួន', fld('ID / អត្តលេខ', 'id', n ? { id: nextId(db.members, 'MBTB-') } : m, { req: 1, cls: 'num' }) +
        `<div class="row2">${fld('នាមត្រកូល', 'family', m, { req: 1 })}${fld('នាមខ្លួន', 'given', m, { req: 1 })}</div>` + sel('ភេទ', 'gender', ['ប្រុស', 'ស្រី'], m.gender, { req: 1 }) +
        fld('លេខអត្តសញ្ញាណប័ណ្ណ', 'idCard', m, { mode: 'numeric', cls: 'num' }) + fld('មុខរបរបច្ចុប្បន្ន', 'occupation', m)) +
      fc(4, 'ឋានៈ និងតួនាទី', sel('ឋានៈ', 'position', D.POSITIONS, m.position, { req: 1 }) + fld('តួនាទី', 'role', m)) +
      fc(5, 'អាសយដ្ឋានបច្ចុប្បន្ន', fld('ភូមិ', 'addrVillage', m) + fld('ឃុំ/សង្កាត់', 'addrCommune', m) + fld('ក្រុង/ស្រុក', 'addrDistrict', m) + fld('ខេត្ត', 'addrProvince', m) +
        fld('Google Maps / Location Link', 'mapUrl', m, { type: 'url', ph: 'https://maps.google.com/…', mode: 'url' })) +
      fc(6, 'សមាជិកភាព', fld('អ្នកណែនាំចូលជាសមាជិក', 'referrer', m) + fld('ថ្ងៃចុះឈ្មោះជាសមាជិក', 'regDate', m, { type: 'date' })) +
      fc(7, 'ចំណាប់អារម្មណ៍ (អាចជ្រើសរើសច្រើន)', chk('interests', m.interests)) +
      fc(8, 'ទំនាក់ទំនង', fld('លេខទូរស័ព្ទ', 'phone', m, { req: 1, type: 'tel', mode: 'tel', cls: 'num', ph: '012 345 678' }) + fld('Facebook Link', 'facebook', m, { type: 'url', ph: 'https://facebook.com/…', mode: 'url' })) +
      fc(9, 'អ្នកបន្តវេន / អ្នកទំនាក់ទំនង', fld('ឈ្មោះអ្នកបន្តវេន', 'sucName', m) + fld('ត្រូវជា', 'sucRel', m, { ph: 'ឧ. កូនស្រី' }) + fld('លេខទំនាក់ទំនង', 'sucPhone', m, { type: 'tel', mode: 'tel', cls: 'num' })),
      'save-m', n ? '' : m.id);
  }
  function partnerForm(p) {
    const n = !p; p = p || { sectors: [] };
    draft = { kind: 'p', photo: p.photo || null, cover: p.cover || null };
    return () => formShell(n ? 'បន្ថែមដៃគូសហការថ្មី' : 'កែប្រែដៃគូសហការ',
      `<div class="alert info">${ic('info')} ${n ? 'បន្ទាប់ពីរក្សាទុក អ្នកអាចបន្ថែមផលិតផល / សេវាកម្មរបស់ដៃគូនៅក្នុងទំព័រព័ត៌មានលម្អិត។' : 'ការកែប្រែផលិតផល/សេវាកម្ម ធ្វើនៅក្នុងទំព័រព័ត៌មានលម្អិតរបស់ដៃគូ។'}</div>` +
      fc(1, 'រូបភាព', upl('photo', 'រូបថតម្ចាស់អាជីវកម្ម', p.photo) + upl('cover', 'រូបភាពគម្របអាជីវកម្ម (Cover)', p.cover, 0, 1)) +
      fc(2, 'ប្រភេទដៃគូ', sel('ប្រភេទដៃគូ', 'ptype', D.PTYPES, p.ptype, { req: 1 })) +
      fc(3, 'ទីតាំងភូមិសាស្ត្រ', geoSel(p, 'geo')) +
      fc(4, 'ព័ត៌មានអាជីវកម្ម', fld('Partner ID', 'id', n ? { id: nextId(db.partners, 'PTBTB-') } : p, { req: 1, cls: 'num' }) + fld('ឈ្មោះប្រើក្នុងអាជីវកម្ម', 'bizName', p, { req: 1 }) + fld('ប្រភេទអាជីវកម្ម', 'bizType', p, { ph: 'ឧ. ផ្គត់ផ្គង់គ្រាប់ពូជ' })) +
      fc(5, 'ម្ចាស់អាជីវកម្ម', `<div class="row2">${fld('នាមត្រកូល', 'family', p, { req: 1 })}${fld('នាមខ្លួន', 'given', p, { req: 1 })}</div>` + sel('ភេទ', 'gender', ['ប្រុស', 'ស្រី'], p.gender, { req: 1 }) + fld('លេខអត្តសញ្ញាណប័ណ្ណ', 'idCard', p, { mode: 'numeric', cls: 'num' })) +
      fc(6, 'វិស័យអាជីវកម្ម (អាចជ្រើសរើសច្រើន)', chk('sectors', p.sectors)) +
      fc(7, 'អាសយដ្ឋាន និងទំនាក់ទំនង', fld('អាសយដ្ឋានបច្ចុប្បន្ន', 'address', p) + fld('Google Maps Link', 'mapUrl', p, { type: 'url', ph: 'https://maps.google.com/…', mode: 'url' }) +
        fld('លេខទូរស័ព្ទ', 'phone', p, { req: 1, type: 'tel', mode: 'tel', cls: 'num', ph: '012 345 678' }) + fld('Facebook Link', 'facebook', p, { type: 'url', ph: 'https://facebook.com/…', mode: 'url' })) +
      fc(8, 'កិច្ចសហការ', fld('អ្នកណែនាំចូលជាសមាជិក', 'referrer', p) + fld('ថ្ងៃចុះ MOU', 'mouDate', p, { type: 'date' })) +
      fc(9, 'អ្នកបន្តវេន / អ្នកទំនាក់ទំនង', fld('ឈ្មោះអ្នកបន្តវេន', 'sucName', p) + fld('ត្រូវជា', 'sucRel', p) + fld('លេខទំនាក់ទំនង', 'sucPhone', p, { type: 'tel', mode: 'tel', cls: 'num' })),
      'save-p', n ? '' : p.id);
  }

  /* ---------- form read / validate / save ---------- */
  const g = n => { const e = $('#f-' + n); return e ? e.value.trim() : ''; };
  function setErrors(errs) {
    $$('.err').forEach(e => e.textContent = ''); $$('.inp.invalid').forEach(e => e.classList.remove('invalid'));
    const ks = Object.keys(errs);
    ks.forEach(k => { const e = $('#e-' + k); if (e) e.textContent = errs[k]; const i = $('#f-' + k); if (i) i.classList.add('invalid'); });
    if (ks.length) { const i = $('#f-' + ks[0]); if (i) { i.scrollIntoView({ block: 'center', behavior: 'smooth' }); i.focus({ preventScroll: true }); } toast('សូមពិនិត្យព័ត៌មានដែលបានបំពេញ ម្ដងទៀត', 'bad'); }
    return !ks.length;
  }
  function validate(r, kind, editId) {
    const e = {}, list = kind === 'm' ? db.members : db.partners;
    if (!r.geoDistrict) e.geoDistrict = 'សូមជ្រើសរើសក្រុង/ស្រុក';
    if (!r.id) e.id = 'សូមបំពេញ ID'; else if (list.some(x => x.id.toLowerCase() === r.id.toLowerCase() && x.id !== editId)) e.id = 'ID នេះមានរួចហើយ សូមប្រើ ID ផ្សេង';
    if (!r.family) e.family = 'សូមបំពេញនាមត្រកូល';
    if (!r.given) e.given = 'សូមបំពេញនាមខ្លួន';
    if (!r.gender) e.gender = 'សូមជ្រើសរើសភេទ';
    if (kind === 'm' && !r.position) e.position = 'សូមជ្រើសរើសឋានៈ';
    if (kind === 'p') { if (!r.ptype) e.ptype = 'សូមជ្រើសរើសប្រភេទដៃគូ'; if (!r.bizName) e.bizName = 'សូមបំពេញឈ្មោះអាជីវកម្ម'; }
    const ph = /^\+?[\d\s-]{8,16}$/;
    if (!r.phone) e.phone = 'សូមបំពេញលេខទូរស័ព្ទ'; else if (!ph.test(r.phone)) e.phone = 'លេខទូរស័ព្ទមិនត្រឹមត្រូវ (ឧ. 012 345 678)';
    if (r.sucPhone && !ph.test(r.sucPhone)) e.sucPhone = 'លេខទូរស័ព្ទមិនត្រឹមត្រូវ';
    ['mapUrl', 'facebook'].forEach(k => { if (r[k] && !isUrl(r[k])) e[k] = 'តំណភ្ជាប់មិនត្រឹមត្រូវ (ត្រូវចាប់ផ្ដើមដោយ https://)'; });
    return e;
  }
  const checked = n => $$(`input[name="${n}"]:checked`).map(x => x.value);
  function saveMember(editId) {
    if (!isAdmin()) return;
    const r = { id: g('id'), photo: draft.photo, level: g('level') || 'ភូមិ', geoDistrict: g('geoDistrict'), geoCommune: g('geoCommune'), geoVillage: g('geoVillage'), family: g('family'), given: g('given'), gender: g('gender'), idCard: g('idCard'), occupation: g('occupation'), position: g('position'), role: g('role'), addrVillage: g('addrVillage'), addrCommune: g('addrCommune'), addrDistrict: g('addrDistrict'), addrProvince: g('addrProvince'), mapUrl: g('mapUrl'), referrer: g('referrer'), regDate: g('regDate'), interests: checked('interests'), phone: g('phone'), facebook: g('facebook'), sucName: g('sucName'), sucRel: g('sucRel'), sucPhone: g('sucPhone') };
    if (!setErrors(validate(r, 'm', editId))) return;
    if (editId) { const i = db.members.findIndex(x => x.id === editId); db.members[i] = Object.assign({}, db.members[i], r); }
    else db.members.unshift(r);
    if (!save()) return;
    popLayer(); repaint(); renderApp(); toast(editId ? 'បានកែប្រែព័ត៌មានសមាជិកដោយជោគជ័យ' : 'បានរក្សាទុកសមាជិកថ្មីដោយជោគជ័យ');
  }
  function savePartner(editId) {
    if (!isAdmin()) return;
    const r = { id: g('id'), photo: draft.photo, cover: draft.cover, ptype: g('ptype'), geoDistrict: g('geoDistrict'), geoCommune: g('geoCommune'), geoVillage: g('geoVillage'), bizType: g('bizType'), bizName: g('bizName'), family: g('family'), given: g('given'), gender: g('gender'), idCard: g('idCard'), sectors: checked('sectors'), address: g('address'), mapUrl: g('mapUrl'), phone: g('phone'), facebook: g('facebook'), referrer: g('referrer'), mouDate: g('mouDate'), sucName: g('sucName'), sucRel: g('sucRel'), sucPhone: g('sucPhone') };
    if (!setErrors(validate(r, 'p', editId))) return;
    let id = r.id;
    if (editId) { const i = db.partners.findIndex(x => x.id === editId); db.partners[i] = Object.assign({}, db.partners[i], r); }
    else { r.items = []; db.partners.unshift(r); }
    if (!save()) return;
    popLayer(); repaint(); renderApp(); toast(editId ? 'បានកែប្រែព័ត៌មានដៃគូដោយជោគជ័យ' : 'បានរក្សាទុកដៃគូថ្មីដោយជោគជ័យ');
    if (!editId) pushLayer(partnerDetail(id), { live: true, cls: 'full' });
  }

  /* ---------- items ---------- */
  function itemForm(pid, it) {
    const n = !it; it = it || { cur: 'USD', commCur: 'USD' };
    return () => `<div class="sh-head"><button class="icon-btn" data-act="close" aria-label="បិទ">${ic('x')}</button><h2>${n ? 'បន្ថែមផលិតផល/សេវាកម្ម' : 'កែប្រែផលិតផល/សេវាកម្ម'}</h2></div>
      <div class="sh-body">${fld('ឈ្មោះផលិតផល / កសិផល / សេវាកម្ម', 'name', it, { req: 1 }) + fld('ឯកត្តា', 'unit', it, { ph: 'ឧ. គីឡូក្រាម, បាវ, ដប' })}
        <div class="row2">${fld('តម្លៃលក់ចេញ / 1 ឯកត្តា', 'price', it, { req: 1, type: 'number', mode: 'decimal', cls: 'num' })}${sel('រូបិយប័ណ្ណ', 'cur', ['USD', 'KHR'], it.cur)}</div>
        <div class="row2">${fld('កម្រៃជើងសារ', 'comm', it, { type: 'number', mode: 'decimal', cls: 'num' })}${sel('រូបិយប័ណ្ណកម្រៃ', 'commCur', ['USD', 'KHR'], it.commCur)}</div>
        ${fld('ឈ្មោះអ្នកនាំចូល', 'importer', it)}</div>
      <div class="sh-foot"><button class="btn ghost" data-act="close">បោះបង់</button><button class="btn gold" data-act="save-item" data-id="${esc(pid)}" data-it="${esc(it.id || '')}">${ic('check')} រក្សាទុក</button></div>`;
  }
  function saveItem(pid, itId) {
    if (!isAdmin()) return;
    const p = db.partners.find(x => x.id === pid); if (!p) return;
    const e = {}, price = g('price'), comm = g('comm');
    if (!g('name')) e.name = 'សូមបំពេញឈ្មោះផលិតផល / សេវាកម្ម';
    if (price === '' || isNaN(+price) || +price < 0) e.price = 'សូមបំពេញតម្លៃជាលេខ (មិនអាចតិចជាង 0)';
    if (comm !== '' && (isNaN(+comm) || +comm < 0)) e.comm = 'កម្រៃជើងសារត្រូវជាលេខ (មិនអាចតិចជាង 0)';
    if (!setErrors(e)) return;
    const rec = { id: itId || 'IT' + Date.now(), name: g('name'), unit: g('unit'), price: +price, cur: g('cur') || 'USD', comm: comm === '' ? 0 : +comm, commCur: g('commCur') || 'USD', importer: g('importer') };
    p.items = p.items || [];
    if (itId) { const i = p.items.findIndex(x => x.id === itId); p.items[i] = rec; } else p.items.push(rec);
    if (!save()) return; popLayer(); repaint(); renderList(); toast(itId ? 'បានកែប្រែផលិតផល/សេវាកម្មដោយជោគជ័យ' : 'បានបន្ថែមផលិតផល/សេវាកម្មដោយជោគជ័យ');
  }

  /* ---------- settings ---------- */
  const settingsMenu = () => `<div class="sh-head"><h2>ការកំណត់</h2><button class="icon-btn" data-act="close" aria-label="បិទ">${ic('x')}</button></div>
    <div class="sh-body"><div class="menu">
      <button class="mi" data-act="set-app"><span class="ic">${ic('cam')}</span><span style="flex:1"><b>ព័ត៌មានកម្មវិធី</b><small>Logo · ឈ្មោះកម្មវិធី · ខេត្ត</small></span>${ic('chev')}</button>
      <button class="mi" data-act="set-pass"><span class="ic">${ic('lock')}</span><span style="flex:1"><b>គ្រប់គ្រងអ្នកប្រើប្រាស់</b><small>ប្តូរពាក្យសម្ងាត់ Admin និង User View</small></span>${ic('chev')}</button>
      <button class="mi" data-act="set-google"><span class="ic">${ic('cloud')}</span><span style="flex:1"><b>Google Sheets & Drive</b><small>ការភ្ជាប់មូលដ្ឋានទិន្នន័យ (នឹងមកនៅពេលក្រោយ)</small></span>${ic('chev')}</button>
    </div><button class="resetlink" data-act="reset-tap">Demo v1.0 · BizWeb KH</button></div>`;
  function appForm() {
    draft = { logo: S().logo };
    return () => `<div class="sh-head"><button class="icon-btn" data-act="close" aria-label="ត្រឡប់ក្រោយ">${ic('back')}</button><h2>ព័ត៌មានកម្មវិធី</h2></div>
      <div class="sh-body">${fc(1, 'Logo កម្មវិធី', `<div class="upl"><div id="prev-logo"><img class="av" src="${esc(S().logo || DEFAULT_LOGO)}" alt=""></div><div class="upl-btns"><span class="btn ghost sm filebtn">${ic('cam')} ប្ដូរ Logo<input type="file" accept="image/*" data-img="logo" aria-label="ប្ដូរ Logo"></span><button class="btn ghost sm" data-act="rm-img" data-v="logo">ប្រើ Logo លំនាំដើម</button></div></div>`)}
        ${fc(2, 'ឈ្មោះ និងខេត្ត', fld('ឈ្មោះកម្មវិធី', 'appName', S(), { req: 1 }) + fld('ខេត្ត', 'province', S(), { req: 1 }))}</div>
      <div class="sh-foot"><button class="btn ghost" data-act="close">បោះបង់</button><button class="btn gold" data-act="save-app">${ic('check')} រក្សាទុក</button></div>`;
  }
  function passForm() {
    const pw = (id, lab) => `<div class="field"><label class="lb" for="f-${id}">${lab}</label><div class="pw"><input class="inp" id="f-${id}" type="password" autocomplete="off"><button type="button" data-act="togglepw" aria-label="បង្ហាញ/លាក់">${ic('eye')}</button></div><span class="err" id="e-${id}"></span></div>`;
    return () => `<div class="sh-head"><button class="icon-btn" data-act="close" aria-label="ត្រឡប់ក្រោយ">${ic('back')}</button><h2>ប្តូរពាក្យសម្ងាត់</h2></div>
      <div class="sh-body"><div class="alert warn">${ic('warn')} ពាក្យសម្ងាត់ក្នុង Demo នេះរក្សាទុកក្នុងឧបករណ៍ប៉ុណ្ណោះ មិនមានសុវត្ថិភាពដូចប្រព័ន្ធពិតទេ។ ពាក្យសម្ងាត់ថ្មីត្រូវមានយ៉ាងតិច ៨ តួអក្សរ។</div>
        ${fc(1, 'ពាក្យសម្ងាត់ Admin', pw('adminCur', 'ពាក្យសម្ងាត់បច្ចុប្បន្ន') + pw('adminNew', 'ពាក្យសម្ងាត់ថ្មី') + pw('adminNew2', 'បញ្ជាក់ពាក្យសម្ងាត់ថ្មី') + `<button class="btn block" data-act="save-pass" data-v="admin">ប្តូរពាក្យសម្ងាត់ Admin</button>`)}
        ${fc(2, 'ពាក្យសម្ងាត់ User View', pw('userNew', 'ពាក្យសម្ងាត់ថ្មី') + pw('userNew2', 'បញ្ជាក់ពាក្យសម្ងាត់ថ្មី') + `<button class="btn block" data-act="save-pass" data-v="user">ប្តូរពាក្យសម្ងាត់ User View</button>`)}</div>`;
  }
  const SCRIPT_TPL = `// TEMPLATE ONLY — NOT CONNECTED (C067 demo)\n// Future production: Apps Script Web App for spreadsheet "8020_369_5P_Database"\n// Tabs: Members, Partners, Partner_Items, Settings\n// Drive folder: 8020_App_Assets\nfunction doGet(e) { /* TODO: read rows -> JSON (after server-side auth) */ }\nfunction doPost(e) { /* TODO: verify token + role, validate input, write rows */ }`;
  function googleForm() {
    return () => `<div class="sh-head"><button class="icon-btn" data-act="close" aria-label="ត្រឡប់ក្រោយ">${ic('back')}</button><h2>Google Sheets & Drive</h2></div>
      <div class="sh-body"><div class="fcard"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"><b style="color:var(--navy)">ស្ថានភាពការភ្ជាប់</b><span class="status">● Demo / Not Connected</span></div>
        <p style="color:var(--muted);margin-top:6px">នេះគ្រាន់តែជាការបង្ហាញប្លង់ប៉ុណ្ណោះ។ គ្មានការភ្ជាប់ទៅ Google ពិតប្រាកដនៅក្នុង Demo នេះទេ។</p></div>
        ${fc(1, 'Google Sheets', `<div class="kv"><dt>Spreadsheet (គម្រោង)</dt><dd class="num">8020_369_5P_Database</dd></div><div class="tags" style="margin:8px 0"><span class="tag">Members</span><span class="tag">Partners</span><span class="tag">Partner_Items</span><span class="tag">Settings</span></div>`)}
        ${fc(2, 'Google Drive', `<div class="kv"><dt>Folder (គម្រោង)</dt><dd class="num">8020_App_Assets</dd></div>`)}
        ${fc(3, 'Apps Script API', fld('Google Web App URL (Apps Script API)', 'sheetUrl', S(), { type: 'url', ph: 'https://script.google.com/macros/s/…', mode: 'url' }) +
          `<button class="btn ghost block" data-act="save-url" style="margin-bottom:8px">រក្សាទុក URL (មិនភ្ជាប់ពិត)</button><button class="btn block" data-act="sync" style="margin-bottom:8px">${ic('cloud')} Sync to Google Sheet</button><button class="btn ghost block" data-act="copy-tpl">${ic('copy')} Copy Apps Script Template</button>`)}</div>`;
  }
  function copyText(t) {
    const done = () => toast('បានចម្លង Apps Script Template (គំរូប៉ុណ្ណោះ)');
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(done, fallback); else fallback();
    function fallback() { const a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(a); a.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (e) { } a.remove(); ok ? done() : toast('មិនអាចចម្លងដោយស្វ័យប្រវត្តិបានទេ', 'bad'); }
  }
  function savePass(who) {
    if (!isAdmin()) return;
    const e = {}, np = g(who + 'New'), np2 = g(who + 'New2');
    if (who === 'admin' && $('#f-adminCur').value !== S().adminPass) e.adminCur = 'ពាក្យសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ';
    if (np.length < 8) e[who + 'New'] = 'ពាក្យសម្ងាត់ថ្មីត្រូវមានយ៉ាងតិច ៨ តួអក្សរ';
    if (np2 !== np) e[who + 'New2'] = 'ពាក្យសម្ងាត់បញ្ជាក់មិនដូចគ្នា';
    if (!setErrors(e)) return;
    S()[who === 'admin' ? 'adminPass' : 'userPass'] = np; if (!save()) return;
    $$('input[type=password]').forEach(i => i.value = ''); toast('បានប្តូរពាក្យសម្ងាត់ដោយជោគជ័យ');
  }

  /* ---------- events ---------- */
  let resetTaps = 0, resetTimer;
  document.addEventListener('click', ev => {
    const b = ev.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act, id = b.dataset.id, v = b.dataset.v;
    const adminOnly = ['fab', 'qadd-m', 'qadd-p', 'add-member', 'add-partner', 'edit-m', 'edit-p', 'del-m', 'del-p', 'add-item', 'edit-item', 'del-item', 'settings', 'save-m', 'save-p', 'save-item', 'save-app', 'save-pass', 'set-app', 'set-pass', 'set-google', 'sync', 'save-url', 'copy-tpl', 'reset-tap', 'dlg-ok'];
    if (adminOnly.includes(a) && !isAdmin() && a !== 'dlg-ok') { toast('User View មិនមានសិទ្ធិធ្វើសកម្មភាពនេះទេ', 'bad'); return; }
    switch (a) {
      case 'togglepw': { const i = b.parentElement.querySelector('input'); const show = i.type === 'password'; i.type = show ? 'text' : 'password'; b.innerHTML = ic(show ? 'eyeoff' : 'eye'); break; }
      case 'login': doLogin(); break;
      case 'demo-login': $('#lg-u').value = v === 'admin' ? 'Admin' : 'user369'; $('#lg-p').value = v === 'admin' ? S().adminPass : S().userPass; doLogin(); break;
      case 'logout': dialog({ title: 'ចាកចេញពីប្រព័ន្ធ', msg: 'តើអ្នកពិតជាចង់ចាកចេញពីប្រព័ន្ធមែនទេ?', okText: 'ចាកចេញ', icon: 'out', tone: 'b', btn: 'red' }, doLogout); break;
      case 'dlg-cancel': popLayer(layerOf(b)); break;
      case 'dlg-ok': { const L = layerOf(b); popLayer(L); if (L && L.onOk) L.onOk(); break; }
      case 'close': popLayer(layerOf(b)); if (layers.length === 0) renderApp(); break;
      case 'tab': ui.tab = v; if (v === 'members') ui.f.ptype = ''; if (v === 'partners') ui.f.position = ''; renderApp(); window.scrollTo(0, 0); break;
      case 'call': break;
      case 'focus-search': { const st = $('.stick'); if (st) st.scrollIntoView({ block: 'start' }); const q = $('#q'); if (q) q.focus(); break; }
      case 'fab': pushLayer(() => `<div class="sh-head"><h2>បន្ថែមថ្មី</h2><button class="icon-btn" data-act="close" aria-label="បិទ">${ic('x')}</button></div><div class="sh-body qadd"><button class="btn big block" data-act="qadd-m">${ic('users')} បន្ថែមសមាជិក</button><button class="btn gold big block" data-act="qadd-p">${ic('brief')} បន្ថែមដៃគូសហការ</button></div>`); break;
      case 'qadd-m': popLayer(layerOf(b)); pushLayer(memberForm(), { cls: 'full', closable: false }); break;
      case 'qadd-p': popLayer(layerOf(b)); pushLayer(partnerForm(), { cls: 'full', closable: false }); break;
      case 'chip': ui.f.ptype = ui.f.ptype === v ? '' : v; if (ui.f.ptype) ui.f.position = ''; renderApp(); break;
      case 'kpi': clearFilters(true); if (v === 'm') ui.tab = 'members'; else if (v === 'p') ui.tab = 'partners'; else { ui.tab = 'partners'; ui.f.ptype = v; } renderApp(); window.scrollTo(0, 0); break;
      case 'filter': pushLayer(filterHtml, { cls: '' }).live = false; break;
      case 'clear-filters': clearFilters(true); layerOf(b).paint(); renderApp(); break;
      case 'clear-all': ui.q = ''; clearFilters(false); break;
      case 'export': dialog({ title: 'នាំចេញទិន្នន័យ (Export)', msg: 'មុខងារនេះនឹងត្រូវបង្កើតនៅពេលបង្កើតប្រព័ន្ធពិត (Excel / Google Sheets)។ ក្នុង Demo នេះមិនទាន់ដំណើរការទេ។', okText: 'យល់ហើយ', cancel: false, icon: 'info', tone: 'b', btn: '' }); break;
      case 'view-m': pushLayer(memberDetail(id), { live: true }); break;
      case 'view-p': pushLayer(partnerDetail(id), { live: true }); break;
      case 'add-member': pushLayer(memberForm(), { cls: 'full', closable: false }); break;
      case 'add-partner': pushLayer(partnerForm(), { cls: 'full', closable: false }); break;
      case 'edit-m': pushLayer(memberForm(db.members.find(x => x.id === id)), { cls: 'full', closable: false }); break;
      case 'edit-p': pushLayer(partnerForm(db.partners.find(x => x.id === id)), { cls: 'full', closable: false }); break;
      case 'save-m': saveMember(id); break;
      case 'save-p': savePartner(id); break;
      case 'del-m': case 'del-p': {
        const mem = a === 'del-m', r = (mem ? db.members : db.partners).find(x => x.id === id); if (!r) break;
        dialog({ title: 'លុប' + (mem ? 'សមាជិក' : 'ដៃគូសហការ'), msg: `តើអ្នកពិតជាចង់លុប "${mem ? fullName(r) : r.bizName}" (${r.id}) មែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។`, okText: 'លុប', icon: 'trash' }, () => {
          if (!isAdmin()) return; if (mem) db.members = db.members.filter(x => x.id !== id); else db.partners = db.partners.filter(x => x.id !== id);
          save(); closeAll(); renderApp(); toast('បានលុបដោយជោគជ័យ');
        }); break;
      }
      case 'add-item': pushLayer(itemForm(id), { closable: false }); break;
      case 'edit-item': { const p = db.partners.find(x => x.id === id); pushLayer(itemForm(id, p.items.find(i => i.id === b.dataset.it)), { closable: false }); break; }
      case 'save-item': saveItem(id, b.dataset.it); break;
      case 'del-item': dialog({ title: 'លុបផលិតផល/សេវាកម្ម', msg: 'តើអ្នកពិតជាចង់លុបមុខនេះមែនទេ?', okText: 'លុប', icon: 'trash' }, () => {
        const p = db.partners.find(x => x.id === id); if (!p || !isAdmin()) return; p.items = p.items.filter(i => i.id !== b.dataset.it); save(); repaint(); renderList(); toast('បានលុបដោយជោគជ័យ'); }); break;
      case 'rm-img': if (v === 'logo') { draft.logo = null; $('#prev-logo').innerHTML = `<img class="av" src="${DEFAULT_LOGO}" alt="">`; }
        else { draft[v] = null; $('#prev-' + v).innerHTML = v === 'cover' ? ic('cam') : `<div class="av">${ic('cam')}</div>`; } break;
      case 'settings': pushLayer(settingsMenu, { cls: 'full' }); break;
      case 'set-app': pushLayer(appForm(), { cls: 'full', closable: false }); break;
      case 'set-pass': pushLayer(passForm(), { cls: 'full', closable: false }); break;
      case 'set-google': pushLayer(googleForm(), { cls: 'full', closable: false }); break;
      case 'save-app': {
        const e = {}; if (!g('appName')) e.appName = 'សូមបំពេញឈ្មោះកម្មវិធី'; if (!g('province')) e.province = 'សូមបំពេញឈ្មោះខេត្ត'; if (!setErrors(e)) break;
        S().appName = g('appName'); S().province = g('province'); S().logo = draft.logo || null; if (!save()) break; popLayer(); renderApp(); toast('បានរក្សាទុកការកំណត់ដោយជោគជ័យ'); break;
      }
      case 'save-pass': savePass(v); break;
      case 'save-url': { const u = g('sheetUrl'); if (u && !isUrl(u)) { setErrors({ sheetUrl: 'តំណភ្ជាប់មិនត្រឹមត្រូវ (ត្រូវចាប់ផ្ដើមដោយ https://)' }); break; } setErrors({}); S().sheetUrl = u; save(); toast('បានរក្សាទុក URL (មិនមានការភ្ជាប់ពិតទេ)'); break; }
      case 'sync': dialog({ title: 'មិនទាន់ភ្ជាប់', msg: 'មុខងារនេះនឹងត្រូវភ្ជាប់នៅពេលបង្កើតប្រព័ន្ធពិត', okText: 'យល់ហើយ', cancel: false, icon: 'info', tone: 'b', btn: '' }); break;
      case 'copy-tpl': copyText(SCRIPT_TPL); break;
      case 'reset-tap': resetTaps++; clearTimeout(resetTimer); resetTimer = setTimeout(() => resetTaps = 0, 1500);
        if (resetTaps >= 5) { resetTaps = 0; dialog({ title: 'Reset Demo Data', msg: 'ទិន្នន័យ Demo ទាំងអស់ត្រូវបានស្ដារទៅដើមវិញ ហើយអ្នកនឹងចាកចេញ។ បន្ត?', okText: 'Reset', icon: 'warn' }, () => { try { localStorage.removeItem(KEY); localStorage.removeItem(SKEY); } catch (e) { } location.reload(); }); } break;
    }
  });
  document.addEventListener('input', e => { if (e.target.id === 'q') { ui.q = e.target.value; renderList(); } });
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.target.id === 'lg-u' || e.target.id === 'lg-p')) doLogin();
    if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('card')) e.target.click();
    if (e.key === 'Escape') { const L = layers[layers.length - 1]; if (L && L.closable) popLayer(L); }
  });
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.geo) {
      const c = $('#f-' + t.dataset.geo + 'Commune'), d = t.value;
      c.innerHTML = '<option value="">— ជ្រើសរើស —</option>' + (d ? D.GEO[d] : []).map(x => `<option>${esc(x)}</option>`).join('');
    }
    if (t.dataset.fil) {
      const k = t.dataset.fil; ui.f[k] = t.value;
      if (k === 'district') ui.f.commune = '';
      if (k === 'ptype' && t.value) { ui.f.position = ''; if (ui.f.kind === 'm') ui.f.kind = ''; if (ui.tab === 'members') ui.tab = 'home'; }
      if (k === 'position' && t.value) { ui.f.ptype = ''; if (ui.f.kind === 'p') ui.f.kind = ''; if (ui.tab === 'partners') ui.tab = 'home'; }
      layerOf(t).paint(); renderApp();
    }
    if (t.dataset.img) {
      const key = t.dataset.img, f = t.files && t.files[0]; t.value = '';
      resizeImage(f, key === 'cover' ? 900 : 400, url => {
        draft[key] = url;
        $('#prev-' + key).innerHTML = key === 'cover' ? `<img src="${url}" alt="">` : `<img class="av" src="${url}" alt="">`;
      });
    }
  });

  /* ---------- boot ---------- */
  function boot() {
    db = load(); session = loadSession();
    $('#splash-img').src = logoSrc(); $('#splash-title').textContent = S().appName;
    setTimeout(() => { $('#splash').remove(); renderApp(); }, 1200);
  }
  boot();
})();
