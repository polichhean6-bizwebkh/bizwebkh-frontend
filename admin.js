/* =======================================================
   C043 - Kanharoth E-Commerce Demo — Admin Dashboard Logic
   All admin edits are stored in localStorage for THIS browser only.
   This is a demo CMS/admin — no real backend or database is connected.
   ======================================================= */

/* ---------- Local admin state (persisted per-browser) ---------- */
const LS_PRODUCTS = "c043_admin_products";
const LS_CATEGORIES = "c043_admin_categories";
const LS_ORDER_OVERRIDES = "c043_order_overrides";
const LS_SETTINGS = "c043_admin_settings";

function loadOrInit(key, seed){
  try{
    const stored = JSON.parse(localStorage.getItem(key));
    if (stored) return stored;
  }catch(e){}
  localStorage.setItem(key, JSON.stringify(seed));
  return JSON.parse(JSON.stringify(seed));
}
function persist(key, data){ localStorage.setItem(key, JSON.stringify(data)); }

let adminProducts = loadOrInit(LS_PRODUCTS, PRODUCTS.map(p=>({...p, status:"active"})));
let adminCategories = loadOrInit(LS_CATEGORIES, CATEGORIES.map(c=>({...c, active:true})));
let orderOverrides = loadOrInit(LS_ORDER_OVERRIDES, {});

function getAllOrders(){
  const combined = [...ORDERS, ...getDemoOrders()];
  return combined.map(o=>{
    const ov = orderOverrides[o.id];
    return ov ? {...o, ...ov} : o;
  }).sort((a,b)=> new Date(b.date) - new Date(a.date));
}
function updateOrderStatus(id, field, value){
  orderOverrides[id] = {...(orderOverrides[id]||{}), [field]: value};
  persist(LS_ORDER_OVERRIDES, orderOverrides);
  // keep demo orders (this-session) localStorage copy in sync too
  const demo = getDemoOrders();
  const idx = demo.findIndex(o=>o.id===id);
  if (idx>-1){ demo[idx][field] = value; localStorage.setItem(ORDERS_KEY, JSON.stringify(demo)); }
}
function getAllPayments(){
  return getAllOrders().map((o,i)=>({
    id: "PAY-" + o.id.replace("ORD-",""),
    orderId: o.id, customer: o.customer, method: o.payment, amount: o.total, status: o.paymentStatus, date: o.date
  }));
}

/* ---------- Sidebar navigation ---------- */
const PANEL_TITLES = {
  dashboard:"admin_dashboard", products:"admin_products", categories:"admin_categories",
  orders:"admin_orders", payments:"admin_payments", settings:"admin_settings"
};
function showPanel(name){
  document.querySelectorAll(".admin-panel-section").forEach(s=> s.classList.add("admin-hidden"));
  document.getElementById("panel-"+name).classList.remove("admin-hidden");
  document.querySelectorAll("#admin-nav button").forEach(b=> b.classList.toggle("active", b.dataset.panel===name));
  document.getElementById("panel-title").setAttribute("data-i18n", PANEL_TITLES[name]);
  applyI18n();
  renderPanel(name);
  document.getElementById("admin-sidebar").classList.remove("open");
}
function renderPanel(name){
  if (name==="dashboard") renderDashboard();
  if (name==="products") renderProducts();
  if (name==="categories") renderCategories();
  if (name==="orders") renderOrders();
  if (name==="payments") renderPayments();
}

/* ---------- Badge helpers ---------- */
function statusBadge(s){ return `<span class="badge b-${s}">${statusLabel(s)}</span>`; }
function payBadge(s){ return `<span class="badge b-${s}">${payLabel(s)}</span>`; }
function methodTag(m){
  if (m==="khqr") return "KHQR — Demo";
  if (m==="cod") return getLang()==="km" ? "សាច់ប្រាក់" : "Cash (COD)";
  return getLang()==="km" ? "ផ្ទេរប្រាក់ធនាគារ" : "Bank Transfer";
}
function avatar(name){ return `<span class="avatar-sm">${name.split(" ").map(w=>w[0]).slice(0,2).join("")}</span>`; }

/* ================= DASHBOARD ================= */
function renderDashboard(){
  const orders = getAllOrders();
  const payments = getAllPayments();
  const revenue = orders.filter(o=>o.paymentStatus==="paid").reduce((s,o)=>s+o.total,0);
  const kpis = [
    ["kpi_total_orders", orders.length, "📦"],
    ["kpi_new_orders", orders.filter(o=>o.status==="new").length, "🆕"],
    ["kpi_paid_orders", orders.filter(o=>o.paymentStatus==="paid").length, "✅"],
    ["kpi_pending_payments", orders.filter(o=>o.paymentStatus==="pending").length, "⏳"],
    ["kpi_revenue", money(revenue), "💰"],
    ["kpi_products", adminProducts.length, "🛍️"],
  ];
  document.getElementById("kpi-grid").innerHTML = kpis.map(k=>`
    <div class="kpi-card">
      <div class="label" data-i18n="${k[0]}"></div>
      <div class="value">${k[2]} ${k[1]}</div>
    </div>`).join("");

  const dOrders = document.getElementById("dash-orders");
  dOrders.querySelector("thead") ? null : null;
  dOrders.innerHTML = `<thead><tr><th data-i18n="col_order_id"></th><th data-i18n="col_customer"></th><th data-i18n="col_amount"></th><th data-i18n="col_order_status"></th></tr></thead>
    <tbody>${orders.slice(0,6).map(o=>`<tr><td><b>${o.id}</b></td><td>${o.customer}</td><td>${money(o.total)}</td><td>${statusBadge(o.status)}</td></tr>`).join("")}</tbody>`;

  const dPay = document.getElementById("dash-payments");
  dPay.innerHTML = `<thead><tr><th data-i18n="col_payment_id"></th><th data-i18n="col_customer"></th><th data-i18n="col_method"></th><th data-i18n="col_pay_status"></th></tr></thead>
    <tbody>${payments.slice(0,6).map(p=>`<tr><td><b>${p.id}</b></td><td>${p.customer}</td><td>${methodTag(p.method)}</td><td>${payBadge(p.status)}</td></tr>`).join("")}</tbody>`;

  const low = adminProducts.filter(p=>p.stock<=5 && p.status==="active").sort((a,b)=>a.stock-b.stock);
  const dLow = document.getElementById("dash-lowstock");
  dLow.innerHTML = `<thead><tr><th data-i18n="col_product"></th><th data-i18n="col_category"></th><th data-i18n="col_stock"></th><th data-i18n="col_price"></th></tr></thead>
    <tbody>${low.map(p=>`<tr><td>${avatar(p.name)}${p.name}</td><td><span data-i18n="cat_${p.category}"></span></td><td style="color:${p.stock===0?'var(--danger)':'var(--warn)'};font-weight:700;">${p.stock}</td><td>${money(p.sale||p.price)}</td></tr>`).join("") || `<tr><td colspan="4" style="text-align:center;color:var(--ink-faint);">—</td></tr>`}</tbody>`;
  applyI18n();
}

/* ================= PRODUCTS ================= */
function renderProducts(){
  const catFilter = document.getElementById("pr-cat-filter");
  if (!catFilter.dataset.filled){
    CATEGORIES.forEach(c=>{ const o=document.createElement("option"); o.value=c.id; o.setAttribute("data-i18n",c.key); catFilter.appendChild(o); });
    catFilter.dataset.filled = "1";
  }
  const q = (document.getElementById("pr-search").value||"").toLowerCase();
  const cat = catFilter.value;
  let list = adminProducts.filter(p=> (!q || p.name.toLowerCase().includes(q)) && (!cat || p.category===cat));

  const table = document.getElementById("products-table");
  table.innerHTML = `<thead><tr><th data-i18n="col_product"></th><th data-i18n="col_category"></th><th data-i18n="col_price"></th><th data-i18n="col_stock"></th><th data-i18n="col_status"></th><th data-i18n="col_action"></th></tr></thead>
  <tbody>${list.map(p=>{
    const stock = stockInfo(p.stock);
    return `<tr>
      <td>${avatar(p.name)}${p.name}</td>
      <td><span data-i18n="cat_${p.category}"></span></td>
      <td>${p.sale?`<b>${money(p.sale)}</b> <span style="text-decoration:line-through;color:var(--ink-faint);">${money(p.price)}</span>`:money(p.price)}</td>
      <td class="stock ${stock.cls}">${p.stock}</td>
      <td><span class="badge b-${p.status==='active'?'active':'inactive'}">${p.status==='active'?t('activate'):t('deactivate')}</span></td>
      <td>
        <button class="icon-btn" onclick="openProductModal('${p.id}')" data-i18n="edit"></button>
        <button class="icon-btn" onclick="toggleProductStatus('${p.id}')">${p.status==='active'?t('deactivate'):t('activate')}</button>
        <button class="icon-btn" style="color:var(--danger);" onclick="deleteProduct('${p.id}')" data-i18n="delete"></button>
      </td>
    </tr>`;
  }).join("") || `<tr><td colspan="6" style="text-align:center;color:var(--ink-faint);" data-i18n="no_results"></td></tr>`}</tbody>`;
  applyI18n();
}

function openProductModal(id){
  const p = id ? adminProducts.find(x=>x.id===id) : null;
  const isEdit = !!p;
  const catOptions = CATEGORIES.map(c=>`<option value="${c.id}" ${p&&p.category===c.id?'selected':''}>${t(c.key)}</option>`).join("");
  showModal(`
    <div class="m-head"><h3>${isEdit?t('edit'):t('add_product')}</h3><button class="close-x" onclick="closeModal()">✕</button></div>
    <div class="m-body">
      <div class="form-group" style="margin-bottom:12px;"><label data-i18n="admin_prod_form_name"></label><input type="text" id="pm-name" value="${p?p.name:''}"></div>
      <div class="form-row">
        <div class="form-group"><label data-i18n="admin_prod_form_cat"></label><select id="pm-cat">${catOptions}</select></div>
        <div class="form-group"><label data-i18n="admin_prod_form_status"></label>
          <select id="pm-status"><option value="active" ${!p||p.status==='active'?'selected':''}>${t('activate')}</option><option value="inactive" ${p&&p.status==='inactive'?'selected':''}>${t('deactivate')}</option></select>
        </div>
        <div class="form-group"><label data-i18n="admin_prod_form_price"></label><input type="number" step="0.1" id="pm-price" value="${p?p.price:''}"></div>
        <div class="form-group"><label data-i18n="admin_prod_form_sale"></label><input type="number" step="0.1" id="pm-sale" value="${p&&p.sale?p.sale:''}"></div>
        <div class="form-group"><label data-i18n="admin_prod_form_stock"></label><input type="number" id="pm-stock" value="${p?p.stock:0}"></div>
      </div>
      <div class="form-group" style="margin-bottom:12px;"><label data-i18n="admin_prod_form_desc"></label><textarea id="pm-desc" rows="3">${p?p.desc:''}</textarea></div>
      <div class="form-group"><label data-i18n="admin_prod_form_img"></label>
        <div style="display:flex;align-items:center;gap:10px;">
          <img id="pm-img-preview" src="${p?p.img:placeholderImg('other','New Product')}" style="width:56px;height:56px;border-radius:8px;object-fit:cover;border:1px solid var(--line);">
          <span style="font-size:.75rem;color:var(--ink-faint);">Auto-generated placeholder image (demo)</span>
        </div>
      </div>
    </div>
    <div class="m-foot"><button class="btn btn-outline" onclick="closeModal()" data-i18n="cancel"></button><button class="btn btn-primary" onclick="saveProduct('${p?p.id:''}')" data-i18n="save"></button></div>
  `);
  applyI18n();
}
function saveProduct(id){
  const name = document.getElementById("pm-name").value.trim();
  if (!name){ alert(t('field_required')); return; }
  const category = document.getElementById("pm-cat").value;
  const price = parseFloat(document.getElementById("pm-price").value)||0;
  const sale = parseFloat(document.getElementById("pm-sale").value)||null;
  const stock = parseInt(document.getElementById("pm-stock").value)||0;
  const status = document.getElementById("pm-status").value;
  const desc = document.getElementById("pm-desc").value.trim();
  const img = placeholderImg(category, name);
  if (id){
    const p = adminProducts.find(x=>x.id===id);
    Object.assign(p, {name, nameKm:name, category, price, sale, stock, status, desc, img, images:[img,img,img]});
  } else {
    const newId = "P" + String(1000+adminProducts.length+1);
    adminProducts.push({id:newId, name, nameKm:name, category, price, sale, stock, status, desc, sku:"NW-"+newId, img, images:[img,img,img], badge:"new"});
  }
  persist(LS_PRODUCTS, adminProducts);
  closeModal();
  renderProducts();
}
function toggleProductStatus(id){
  const p = adminProducts.find(x=>x.id===id);
  p.status = p.status==="active" ? "inactive" : "active";
  persist(LS_PRODUCTS, adminProducts);
  renderProducts();
}
function deleteProduct(id){
  if (!confirm(getLang()==="km" ? "តើអ្នកប្រាកដទេថាចង់លុបផលិតផលនេះ?" : "Are you sure you want to delete this product?")) return;
  adminProducts = adminProducts.filter(x=>x.id!==id);
  persist(LS_PRODUCTS, adminProducts);
  renderProducts();
}

/* ================= CATEGORIES ================= */
function renderCategories(){
  const table = document.getElementById("categories-table");
  table.innerHTML = `<thead><tr><th data-i18n="admin_categories"></th><th data-i18n="col_status"></th><th data-i18n="col_action"></th></tr></thead>
  <tbody>${adminCategories.map(c=>`
    <tr>
      <td>${c.icon} <span data-i18n="${c.key}"></span></td>
      <td><span class="badge b-${c.active?'active':'inactive'}">${c.active?t('activate'):t('deactivate')}</span></td>
      <td><button class="icon-btn" onclick="toggleCategory('${c.id}')">${c.active?t('deactivate'):t('activate')}</button></td>
    </tr>`).join("")}</tbody>`;
  applyI18n();
}
function toggleCategory(id){
  const c = adminCategories.find(x=>x.id===id);
  c.active = !c.active;
  persist(LS_CATEGORIES, adminCategories);
  renderCategories();
}
document.addEventListener("click", e=>{
  if (e.target.id === "cat-add-btn"){
    const name = prompt(getLang()==="km" ? "ឈ្មោះប្រភេទថ្មី" : "New category name");
    if (name){
      adminCategories.push({id:"cat"+Date.now(), key:null, name, icon:"🏷️", active:true});
      persist(LS_CATEGORIES, adminCategories);
      renderCategories();
    }
  }
});

/* ================= ORDERS ================= */
function fillSelectOnce(sel, values, labelFn){
  if (sel.dataset.filled) return;
  values.forEach(v=>{ const o=document.createElement("option"); o.value=v; o.textContent=labelFn(v); sel.appendChild(o); });
  sel.dataset.filled = "1";
}
function renderOrders(){
  fillSelectOnce(document.getElementById("or-status-filter"), ORDER_STATUSES, statusLabel);
  fillSelectOnce(document.getElementById("or-pay-filter"), PAYMENT_STATUSES, payLabel);
  const q = (document.getElementById("or-search").value||"").toLowerCase();
  const statusF = document.getElementById("or-status-filter").value;
  const payF = document.getElementById("or-pay-filter").value;
  let list = getAllOrders().filter(o=>
    (!q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q)) &&
    (!statusF || o.status===statusF) && (!payF || o.paymentStatus===payF));

  const table = document.getElementById("orders-table");
  table.innerHTML = `<thead><tr>
    <th data-i18n="col_order_id"></th><th data-i18n="col_customer"></th><th data-i18n="col_phone"></th>
    <th data-i18n="col_items"></th><th data-i18n="col_amount"></th><th data-i18n="col_payment"></th>
    <th data-i18n="col_pay_status"></th><th data-i18n="col_order_status"></th><th data-i18n="col_date"></th><th data-i18n="col_action"></th>
  </tr></thead>
  <tbody>${list.map(o=>`
    <tr>
      <td><b>${o.id}</b></td><td>${o.customer}</td><td>${o.phone}</td>
      <td>${o.items.reduce((s,i)=>s+i.qty,0)}</td><td>${money(o.total)}</td>
      <td>${methodTag(o.payment)}</td><td>${payBadge(o.paymentStatus)}</td><td>${statusBadge(o.status)}</td>
      <td>${fmtDate(o.date, getLang())}</td>
      <td><button class="icon-btn" onclick="openOrderModal('${o.id}')" data-i18n="view"></button></td>
    </tr>`).join("") || `<tr><td colspan="10" style="text-align:center;color:var(--ink-faint);" data-i18n="no_results"></td></tr>`}</tbody>`;
  applyI18n();
}
function openOrderModal(id){
  const o = getAllOrders().find(x=>x.id===id);
  const itemsHtml = o.items.map(i=>`<div class="mini-cart-item"><span>${getLang()==='km'?i.nameKm:i.name} <span class="q">×${i.qty}</span></span><span>${money(i.price*i.qty)}</span></div>`).join("");
  showModal(`
    <div class="m-head"><h3 data-i18n="order_detail_title"></h3><button class="close-x" onclick="closeModal()">✕</button></div>
    <div class="m-body">
      <p><b>${o.id}</b> — ${fmtDate(o.date, getLang())}</p>
      <div class="two-col" style="margin-bottom:14px;">
        <div><span style="color:var(--ink-faint);font-size:.8rem;" data-i18n="col_customer"></span><br><b>${o.customer}</b><br>${o.phone}${o.email ? `<br>${o.email}` : ""}</div>
        <div><span style="color:var(--ink-faint);font-size:.8rem;">Delivery</span><br>${o.address}, ${o.province}</div>
      </div>
      ${o.note ? `<p style="font-size:.85rem;"><b>Note:</b> ${o.note}</p>` : ""}
      <h4 style="margin:14px 0 6px;font-size:.9rem;">Items</h4>
      ${itemsHtml}
      <div class="summary-row total"><span data-i18n="summary_total"></span><span>${money(o.total)}</span></div>
      <div class="form-row" style="margin-top:16px;">
        <div class="form-group"><label data-i18n="col_pay_status"></label>
          <select id="om-pay-status">${PAYMENT_STATUSES.map(s=>`<option value="${s}" ${o.paymentStatus===s?'selected':''}>${payLabel(s)}</option>`).join("")}</select>
        </div>
        <div class="form-group"><label data-i18n="col_order_status"></label>
          <select id="om-order-status">${ORDER_STATUSES.map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${statusLabel(s)}</option>`).join("")}</select>
        </div>
      </div>
    </div>
    <div class="m-foot"><button class="btn btn-outline" onclick="closeModal()" data-i18n="close"></button><button class="btn btn-primary" onclick="saveOrderStatus('${o.id}')" data-i18n="update_status"></button></div>
  `);
  applyI18n();
}
function saveOrderStatus(id){
  updateOrderStatus(id, "paymentStatus", document.getElementById("om-pay-status").value);
  updateOrderStatus(id, "status", document.getElementById("om-order-status").value);
  closeModal();
  renderOrders();
}

/* ================= PAYMENTS ================= */
function renderPayments(){
  fillSelectOnce(document.getElementById("pa-method-filter"), ["khqr","cod","bank"], m=>methodTag(m));
  fillSelectOnce(document.getElementById("pa-status-filter"), PAYMENT_STATUSES, payLabel);
  const q = (document.getElementById("pa-search").value||"").toLowerCase();
  const methodF = document.getElementById("pa-method-filter").value;
  const statusF = document.getElementById("pa-status-filter").value;
  let list = getAllPayments().filter(p=>
    (!q || p.id.toLowerCase().includes(q) || p.orderId.toLowerCase().includes(q) || p.customer.toLowerCase().includes(q)) &&
    (!methodF || p.method===methodF) && (!statusF || p.status===statusF));

  const table = document.getElementById("payments-table");
  table.innerHTML = `<thead><tr><th data-i18n="col_payment_id"></th><th data-i18n="col_order_id"></th><th data-i18n="col_customer"></th><th data-i18n="col_method"></th><th data-i18n="col_amount"></th><th data-i18n="col_status"></th><th data-i18n="col_date"></th></tr></thead>
  <tbody>${list.map(p=>`
    <tr><td><b>${p.id}</b></td><td>${p.orderId}</td><td>${p.customer}</td><td>${methodTag(p.method)}</td><td>${money(p.amount)}</td><td>${payBadge(p.status)}</td><td>${fmtDate(p.date,getLang())}</td></tr>`).join("") || `<tr><td colspan="7" style="text-align:center;color:var(--ink-faint);" data-i18n="no_results"></td></tr>`}</tbody>`;
  applyI18n();
}

document.addEventListener("click", e=>{
  if (e.target.id === "settings-save-btn"){
    const s = {
      storeName: document.getElementById("set-store-name").value,
      deliveryFee: document.getElementById("set-delivery-fee").value,
      phone: document.getElementById("set-phone").value,
      telegram: document.getElementById("set-telegram").value,
      fb: document.getElementById("set-fb").value,
      khqrMerchant: document.getElementById("set-khqr-merchant").value,
    };
    persist(LS_SETTINGS, s);
    e.target.textContent = "✓ " + t("save");
    setTimeout(()=> e.target.setAttribute("data-i18n","save"), 1200);
    applyI18n();
  }
});

/* ================= MODAL ================= */
function showModal(html){
  document.getElementById("modal-box").innerHTML = html;
  document.getElementById("modal-backdrop").classList.remove("admin-hidden");
}
function closeModal(){
  document.getElementById("modal-backdrop").classList.add("admin-hidden");
}
document.getElementById("modal-backdrop") && document.getElementById("modal-backdrop").addEventListener("click", e=>{
  if (e.target.id === "modal-backdrop") closeModal();
});

/* ================= INIT / EVENTS ================= */
document.addEventListener("DOMContentLoaded", ()=>{
  applyI18n();
  showPanel("dashboard");

  document.getElementById("admin-nav").addEventListener("click", e=>{
    const btn = e.target.closest("button[data-panel]");
    if (btn) showPanel(btn.dataset.panel);
  });
  // language switch buttons are bound via a delegated document-level click
  // listener in app.js (shared across all pages, including this one).

  const modalBackdrop = document.getElementById("modal-backdrop");
  modalBackdrop.addEventListener("click", e=>{ if (e.target.id === "modal-backdrop") closeModal(); });

  document.getElementById("pr-add-btn").addEventListener("click", ()=> openProductModal(null));
  ["pr-search","pr-cat-filter"].forEach(id=> document.getElementById(id).addEventListener("input", renderProducts));
  ["or-search","or-status-filter","or-pay-filter"].forEach(id=> document.getElementById(id).addEventListener("input", renderOrders));
  ["pa-search","pa-method-filter","pa-status-filter"].forEach(id=> document.getElementById(id).addEventListener("input", renderPayments));

  const sbToggle = document.getElementById("sidebar-toggle");
  if (sbToggle) sbToggle.addEventListener("click", ()=> document.getElementById("admin-sidebar").classList.toggle("open"));
});

document.addEventListener("langchanged", ()=>{
  const active = document.querySelector("#admin-nav button.active");
  if (active) renderPanel(active.dataset.panel);
});
