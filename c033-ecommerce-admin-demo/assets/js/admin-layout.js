/* ==========================================================================
   C033 Demo | Sokha Admin Dashboard — Shared Layout (login gate, sidebar, topbar)
   Front-end demo only. Simulated authentication via localStorage.
   ========================================================================== */
const ADMIN_CRED = {email:'admin@c033demo.com', password:'demo123'};
const ADMIN_AUTH_KEY = 'adm_auth';

let toastTimer;
function toast(msg, icon){
  let el = document.getElementById('toast');
  if(!el){ el = document.createElement('div'); el.id='toast'; el.className='toast'; el.innerHTML='<i class="bi bi-check-circle-fill"></i><span id="toastMsg"></span>'; document.body.appendChild(el); }
  document.getElementById('toastMsg').textContent = msg;
  el.querySelector('i').className = 'bi ' + (icon||'bi-check-circle-fill');
  el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.classList.remove('show'), 2600);
}
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }
document.addEventListener('click', e=>{
  if(e.target.matches('[data-close]')) closeModal(e.target.closest('[data-close]').dataset.close);
  if(e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

const SIDEBAR_ITEMS = [
  {page:'overview', label:'Overview', icon:'bi-speedometer2', href:'index.html'},
  {page:'products', label:'Products', icon:'bi-box-seam', href:'products.html'},
  {page:'categories', label:'Categories', icon:'bi-tags', href:'categories.html'},
  {page:'brands', label:'Brands', icon:'bi-award', href:'brands.html'},
  {page:'inventory', label:'Inventory', icon:'bi-boxes', href:'inventory.html'},
  {page:'orders', label:'Orders', icon:'bi-receipt', href:'orders.html'},
  {page:'preorders', label:'Pre-Orders', icon:'bi-hourglass-split', href:'preorders.html'},
  {page:'customers', label:'Customers', icon:'bi-people', href:'customers.html'},
  {page:'loyalty', label:'Loyalty', icon:'bi-gem', href:'loyalty.html'},
  {page:'promotions', label:'Promotions', icon:'bi-megaphone', href:'promotions.html'},
  {page:'shipping', label:'Shipping Zones', icon:'bi-truck', href:'shipping.html'},
  {page:'payments', label:'Payments', icon:'bi-credit-card', href:'payments.html'},
  {page:'reports', label:'Reports', icon:'bi-bar-chart', href:'reports.html'},
  {page:'content', label:'Website Content', icon:'bi-layout-text-window', href:'content.html'},
  {page:'notifications', label:'Notifications', icon:'bi-bell', href:'notifications.html'},
  {page:'settings', label:'Settings', icon:'bi-gear', href:'settings.html'}
];

function renderAdminShell(activePage){
  const root = document.getElementById('admin-root');
  if(!root) return;
  root.innerHTML = `
    <div class="login-wrap" id="loginScreen">
      <div class="login-card">
        <div class="login-logo"><span class="logo-badge"><i class="bi bi-flower1"></i></span><b>Sokha Admin</b></div>
        <p class="sub">Beauty &amp; Wellness Admin Dashboard — Project C033 (Front-End Demo)</p>
        <div class="notice-box"><i class="bi bi-info-circle"></i> Demo login — Email: <b>admin@c033demo.com</b> / Password: <b>demo123</b>. Simulated authentication only, not production-secure.</div>
        <div class="form-row"><label>Email</label><input id="adminEmail" value="admin@c033demo.com"></div>
        <div class="form-row"><label>Password</label><input id="adminPassword" type="password" value="demo123"></div>
        <button class="btn btn-primary btn-block" id="adminLoginBtn">Login to Dashboard</button>
      </div>
    </div>
    <div class="app-shell" id="appShell">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-brand"><span class="logo-badge"><i class="bi bi-flower1"></i></span><div><b>Sokha Admin</b><small>PROJECT C033 DEMO</small></div></div>
        <nav class="sidebar-nav">
          ${SIDEBAR_ITEMS.map(n=>`<a href="${n.href}" class="${n.page===activePage?'active':''}"><i class="bi ${n.icon}"></i>${n.label}</a>`).join('')}
          <div class="sidebar-section-label">Session</div>
          <a href="#" id="adminLogoutBtn"><i class="bi bi-box-arrow-right"></i>Logout</a>
        </nav>
      </aside>
      <div class="main-area">
        <div class="demo-banner">Front-end demonstration only. All figures, orders, customers and payments shown are <b>sample data</b>. Project C033 — BizWeb KH.</div>
        <div class="topbar">
          <button class="sidebar-toggle" id="sidebarToggle"><i class="bi bi-list"></i></button>
          <div class="topbar-search"><i class="bi bi-search"></i><input id="topbarSearch" placeholder="Search orders, products, customers..."></div>
          <div class="topbar-right">
            <div class="topbar-icon"><i class="bi bi-bell"></i><span class="dot"></span></div>
            <div class="admin-profile"><div class="avatar">SA</div><span>Sokha Admin</span></div>
          </div>
        </div>
        <div class="content" id="content"></div>
      </div>
    </div>`;

  document.getElementById('adminLoginBtn').addEventListener('click', ()=>{
    const email = document.getElementById('adminEmail').value.trim();
    const pass = document.getElementById('adminPassword').value;
    if(email===ADMIN_CRED.email && pass===ADMIN_CRED.password){
      localStorage.setItem(ADMIN_AUTH_KEY, '1');
      document.getElementById('loginScreen').classList.remove('show');
      if(typeof onAdminReady==='function') onAdminReady();
    } else {
      toast('Invalid demo credentials. Use admin@c033demo.com / demo123', 'bi-exclamation-triangle');
    }
  });
  document.getElementById('adminLogoutBtn').addEventListener('click', e=>{
    e.preventDefault(); localStorage.removeItem(ADMIN_AUTH_KEY);
    document.getElementById('loginScreen').classList.add('show');
  });
  document.getElementById('sidebarToggle').addEventListener('click', ()=>document.getElementById('sidebar').classList.toggle('open'));
  document.getElementById('topbarSearch').addEventListener('keydown', e=>{
    if(e.key!=='Enter') return;
    const val = e.target.value.trim(); if(!val) return;
    window.location.href = 'orders.html?q=' + encodeURIComponent(val);
  });

  if(localStorage.getItem(ADMIN_AUTH_KEY)==='1'){
    if(typeof onAdminReady==='function') onAdminReady();
  } else {
    document.getElementById('loginScreen').classList.add('show');
  }
}
