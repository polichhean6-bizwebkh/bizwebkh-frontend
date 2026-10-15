/* Boot + desktop review panel */
'use strict';
function jump(key) {
  const needLogin = key !== 'splash' && key !== 'login';
  if (needLogin && !S.logged) { S.logged = true; try { sessionStorage.setItem('c066-in', '1'); } catch (e) {} }
  S.ui.nf = 'all';
  const firstPay = DB.payments.slice(-1)[0];
  const M2 = {
    splash: () => root('splash'), login: () => { S.logged = false; try { sessionStorage.removeItem('c066-in'); } catch (e) {} root('login'); },
    home: () => root('home'), borrowers: () => root('borrowers'), borrowerForm: () => { root('borrowers'); go('borrowerForm'); }, borrowerDetail: () => { root('borrowers'); go('borrowerDetail', 'BR-0003'); },
    loans: () => root('loans'), loanForm: () => { root('loans'); go('loanForm'); }, loanDetail: () => { root('loans'); go('loanDetail', 'LN-2026-004'); }, schedule: () => { root('loans'); go('loanDetail', 'LN-2026-003'); go('schedule', 'LN-2026-003'); },
    payments: () => root('payments'), payForm: () => { root('payments'); go('payForm', 'LN-2026-003|3'); }, receipt: () => { root('payments'); go('receipt', firstPay.id); },
    notifications: () => { root('home'); go('notifications'); }, reports: () => { root('more'); go('reports'); }, profile: () => { root('more'); go('profile'); }, more: () => root('more'),
    notifSettings: () => { root('more'); go('notifSettings'); }, currencySettings: () => { root('more'); go('currencySettings'); }, loanSettings: () => { root('more'); go('loanSettings'); }, backup: () => { root('more'); go('backup'); },
    language: () => { root('more'); go('language'); }, changePw: () => { root('more'); go('changePw'); }, about: () => { root('more'); go('about'); }, logout: () => { root('more'); ACT.logout(); }
  };
  ovClose(); (M2[key] || M2.home)();
}
function syncSide() {
  const cs = getComputedStyle(document.documentElement); const w = cs.getPropertyValue('--pw').trim().replace('px', ''), h = cs.getPropertyValue('--ph').trim().replace('px', '');
  $$('#side [data-size]').forEach(b => b.classList.toggle('on', b.dataset.size === w + 'x' + h));
  $$('#side [data-slang]').forEach(b => b.classList.toggle('on', b.dataset.slang === S.lang));
}
const SCREEN_LIST = [['splash', '1 · Splash'], ['login', '2 · Login'], ['home', '3 · Home dashboard'], ['borrowers', '4 · Borrower list'], ['borrowerForm', '5 · Add borrower'], ['borrowerDetail', '6 · Borrower detail'], ['loans', '7 · Loan list'], ['loanForm', '8 · Create loan'], ['loanDetail', '9 · Loan detail'], ['schedule', '10 · Repayment schedule'], ['payments', '11 · Payments tab'], ['payForm', '12 · Record payment'], ['receipt', '13 · Payment receipt'], ['notifications', '14 · Due notifications'], ['reports', '15 · Reports'], ['profile', '16 · Profile'], ['more', '17 · More / Settings'], ['notifSettings', '18 · Notification settings'], ['currencySettings', '19 · Currency settings'], ['loanSettings', '20 · Loan settings'], ['backup', '21 · Backup (placeholder)'], ['language', '22 · Language switch'], ['changePw', '23 · Change password'], ['about', '24 · About'], ['logout', '25 · Logout confirmation']];
function buildSide() {
  $('#side').innerHTML = `<h2>C066 · Loan Book</h2><div class="mute" style="margin-bottom:6px">Mr. Daily Daily · UX/UI demo</div><span class="pill">Demo · sample data only</span>
  <h3>Phone size</h3><div class="row">${[['360x800', '360×800'], ['390x844', '390×844'], ['412x915', '412×915']].map(([v, l]) => `<button class="s" data-size="${v}">${l}</button>`).join('')}</div>
  <h3>Language</h3><div class="row"><button class="s" data-slang="kh">ខ្មែរ</button><button class="s" data-slang="en">English</button></div>
  <h3>Jump to screen</h3><div class="jump">${SCREEN_LIST.map(([k, l]) => `<button data-jump="${k}">${l}</button>`).join('')}</div>
  <h3>Demo data</h3><button class="s" data-sreset="1" style="border:1px solid var(--line);border-radius:10px;padding:5px 10px">Reset sample data</button>`;
}
function tickClock() { const d = new Date(); $('#clock').textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()); }

document.addEventListener('click', e => { const p = e.target.closest('#push'); if (p) { p.classList.remove('show'); if (p.dataset.target) { go(p.dataset.target); } } }, true);
window.addEventListener('DOMContentLoaded', () => {
  buildSide(); tickClock(); setInterval(tickClock, 30000);
  root('splash');
});
