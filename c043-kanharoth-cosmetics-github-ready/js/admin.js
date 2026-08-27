/* =======================================================
   C043 - Kanharoth Cosmetics Demo — Simplified Admin (CMS + Orders)
   Option 1 scope: Dashboard + Products + Categories + Orders + Settings.
   Orders track fulfillment status only (New → Completed).
   All data is a localStorage-backed COPY of js/data.js — editing here does
   not change the public site in this demo build. For demo purposes only.
   ======================================================= */

const ADMIN_KEY = "c043cos_admin_data_v2";
const ADMIN_SETTINGS_KEY = "c043cos_admin_settings_v1";
const LOW_STOCK_THRESHOLD = 5;

function loadAdminData(){
  try{
    const raw = localStorage.getItem(ADMIN_KEY);
    if (raw) return JSON.parse(raw);
  }catch(e){}
  const seeded = {
    products: PRODUCTS.map(p=>({
      id: p.id, name: p.name, nameKm: p.nameKm, category: p.category,
      price: p.price, sale: p.sale, stock: (typeof p.stock === "number" ? p.stock : 20),
      status: "active", desc: p.desc, sku: p.sku, img: p.img
    })),
    categories: CATEGORIES.map(c=>({ id: c.id, name: { en: I18N.en[c.key], km: I18N.km[c.key] }, key: c.key, status: "active" })),
    orders: ORDERS.map(o=>({ ...o }))
  };
  saveAdminData(seeded);
  return seeded;
}
function saveAdminData(data){ localStorage.setItem(ADMIN_KEY, JSON.stringify(data)); }

let adminData = loadAdminData();
let currentSection = "dashboard";
let editingProductId = null;
let editingCategoryId = null;

function loadAdminSettings(){
  try{ return JSON.parse(localStorage.getItem(ADMIN_SETTINGS_KEY)) || {}; }catch(e){ return {}; }
}
function renderSettings(){
  const settings = loadAdminSettings();
  document.getElementById("settings-store-name").value = settings.storeName || "Kanharoth Cosmetics";
  document.getElementById("settings-telegram").value = settings.telegram || "@" + TELEGRAM_CONFIG.directUsername;
  document.getElementById("settings-group-link").value = settings.groupLink || TELEGRAM_CONFIG.groupLink;
}
function saveSettings(){
  const settings = {
    storeName: document.getElementById("settings-store-name").value.trim(),
    telegram: document.getElementById("settings-telegram").value.trim(),
    groupLink: document.getElementById("settings-group-link").value.trim()
  };
  localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings));
  showToast(t("save"));
}

/* ---------- Navigation ---------- */
function showSection(name){
  currentSection = name;
  document.querySelectorAll(".admin-nav button").forEach(b=> b.classList.toggle("active", b.dataset.section===name));
  document.querySelectorAll(".admin-section").forEach(s=> s.classList.toggle("admin-hidden", s.id !== "sec-"+name));
  const titles = { dashboard: t("admin_dashboard"), products: t("admin_products"), categories: t("admin_categories"), orders: t("admin_orders"), settings: t("admin_settings") };
  document.getElementById("admin-page-title").textContent = titles[name] || "";
  document.querySelector(".admin-sidebar")?.classList.remove("open");
  if (name==="dashboard") renderDashboard();
  if (name==="products") renderProductsTable();
  if (name==="categories") renderCategoriesTable();
  if (name==="orders") renderOrdersTable();
  if (name==="settings") renderSettings();
}

/* ---------- Dashboard ---------- */
function renderDashboard(){
  const total = adminData.products.length;
  const lowStock = adminData.products.filter(p=>p.stock <= LOW_STOCK_THRESHOLD).length;
  const totalOrders = adminData.orders.length;
  const newOrders = adminData.orders.filter(o=>o.status==="new").length;
  const confirmedOrders = adminData.orders.filter(o=>o.status==="confirmed").length;
  const preparingOrders = adminData.orders.filter(o=>o.status==="preparing").length;

  document.getElementById("kpi-orders-total-val").textContent = totalOrders;
  document.getElementById("kpi-orders-new-val").textContent = newOrders;
  document.getElementById("kpi-orders-confirmed-val").textContent = confirmedOrders;
  document.getElementById("kpi-orders-preparing-val").textContent = preparingOrders;
  document.getElementById("kpi-products-val").textContent = total;
  document.getElementById("kpi-low-stock-val").textContent = lowStock;

  const recentBody = document.getElementById("recent-orders-body");
  recentBody.innerHTML = adminData.orders.slice(0,6).map(o=>`
    <tr>
      <td>${o.id}</td>
      <td>${o.name}</td>
      <td>${o.items.length} <span data-i18n="admin_products" style="font-size:.72rem;color:var(--ink-faint);"></span></td>
      <td>${money(o.total)}</td>
      <td><span class="badge ${statusBadgeClass(o.status)}">${t('status_'+o.status)}</span></td>
    </tr>`).join("");

  const lowStockBody = document.getElementById("low-stock-body");
  const lowStockList = adminData.products.filter(p=>p.stock <= LOW_STOCK_THRESHOLD);
  lowStockBody.innerHTML = lowStockList.length ? lowStockList.map(p=>`
    <tr>
      <td><span class="avatar-sm"><img src="${p.img}" alt=""></span>${getLang()==="km" ? p.nameKm : p.name}</td>
      <td>${categoryLabel(p.category)}</td>
      <td><span class="badge b-inactive" style="color:var(--primary);">${p.stock} <span data-i18n="low_stock_warning"></span></span></td>
    </tr>`).join("") : `<tr><td colspan="3" style="color:var(--ink-faint);text-align:center;padding:20px;">—</td></tr>`;
  applyI18n();
}
function statusBadgeClass(status){
  if (status==="completed") return "b-active";
  if (status==="cancelled") return "b-inactive";
  return "b-active";
}

/* ---------- Products ---------- */
function categoryLabel(catId){
  const c = adminData.categories.find(x=>x.id===catId);
  if (!c) return catId;
  return getLang()==="km" ? c.name.km : c.name.en;
}
function categoryOptionsHtml(selected){
  return adminData.categories.map(c=> `<option value="${c.id}" ${c.id===selected?"selected":""}>${getLang()==="km" ? c.name.km : c.name.en}</option>`).join("");
}

function renderProductsTable(){
  const q = (document.getElementById("prod-search")?.value || "").toLowerCase();
  const catFilter = document.getElementById("prod-cat-filter")?.value || "";
  let list = adminData.products.slice();
  if (q) list = list.filter(p=> (p.name+" "+p.nameKm).toLowerCase().includes(q));
  if (catFilter) list = list.filter(p=> p.category===catFilter);

  const body = document.getElementById("products-table-body");
  body.innerHTML = list.map(p=>`
    <tr>
      <td><span class="avatar-sm"><img src="${p.img}" alt=""></span>${getLang()==="km" ? p.nameKm : p.name}<div style="font-size:.68rem;color:var(--ink-faint);">${p.sku}</div></td>
      <td>${categoryLabel(p.category)}</td>
      <td>${money(p.sale || p.price)}${p.sale ? ` <span style="text-decoration:line-through;color:var(--ink-faint);font-size:.76rem;">${money(p.price)}</span>` : ""}</td>
      <td>${p.stock <= LOW_STOCK_THRESHOLD ? `<span style="color:var(--primary);font-weight:800;">${p.stock}</span>` : p.stock}</td>
      <td><span class="badge ${p.status==='active'?'b-active':'b-inactive'}">${p.status==='active' ? t('activate') : t('deactivate')}</span></td>
      <td>
        <button type="button" class="icon-btn prod-edit-btn" data-id="${p.id}">${icon('tag')} <span data-i18n="edit">Edit</span></button>
        <button type="button" class="icon-btn prod-toggle-btn" data-id="${p.id}">${p.status==='active' ? icon('x') : icon('check')} <span>${p.status==='active' ? t('deactivate') : t('activate')}</span></button>
        <button type="button" class="icon-btn prod-delete-btn" data-id="${p.id}">${icon('trash')} <span data-i18n="delete">Delete</span></button>
      </td>
    </tr>`).join("");

  const catSel = document.getElementById("prod-cat-filter");
  if (catSel && !catSel._built){
    catSel._built = true;
    catSel.innerHTML = `<option value="" data-i18n="filter_all_cat">All Categories</option>` + categoryOptionsHtml();
  }
  applyI18n();
}

function openProductModal(id){
  editingProductId = id || null;
  const p = id ? adminData.products.find(x=>x.id===id) : null;
  document.getElementById("modal-title").textContent = p ? t("edit") + " — " + p.name : t("add_product");
  document.getElementById("pf-name").value = p ? p.name : "";
  document.getElementById("pf-name-km").value = p ? p.nameKm : "";
  document.getElementById("pf-cat").innerHTML = categoryOptionsHtml(p ? p.category : "");
  document.getElementById("pf-price").value = p ? p.price : "";
  document.getElementById("pf-sale").value = p && p.sale ? p.sale : "";
  document.getElementById("pf-stock").value = p ? p.stock : 20;
  document.getElementById("pf-status").value = p ? p.status : "active";
  document.getElementById("pf-desc").value = p ? p.desc : "";
  document.getElementById("product-modal-backdrop").style.display = "flex";
}
function closeProductModal(){
  document.getElementById("product-modal-backdrop").style.display = "none";
  editingProductId = null;
}
function saveProductForm(){
  const name = document.getElementById("pf-name").value.trim();
  const nameKm = document.getElementById("pf-name-km").value.trim() || name;
  const category = document.getElementById("pf-cat").value;
  const price = parseFloat(document.getElementById("pf-price").value) || 0;
  const saleRaw = document.getElementById("pf-sale").value;
  const sale = saleRaw ? parseFloat(saleRaw) : null;
  const stock = parseInt(document.getElementById("pf-stock").value, 10) || 0;
  const status = document.getElementById("pf-status").value;
  const desc = document.getElementById("pf-desc").value.trim();
  if (!name || !category || !price){ showToast(t("field_required")); return; }

  if (editingProductId){
    const p = adminData.products.find(x=>x.id===editingProductId);
    Object.assign(p, { name, nameKm, category, price, sale, stock, status, desc });
  } else {
    const newId = "P" + String(Date.now()).slice(-6);
    adminData.products.unshift({
      id: newId, name, nameKm, category, price, sale, stock, status: "inactive", desc,
      sku: category.slice(0,2).toUpperCase() + "-" + Math.floor(1000+Math.random()*9000),
      /* The public demo catalog intentionally contains photography-only products.
         New CMS demo items remain internal until a real product photo is assigned. */
      img: "images/img01.jpg"
    });
  }
  saveAdminData(adminData);
  closeProductModal();
  renderProductsTable();
  renderDashboard();
  showToast(t("save"));
}
function toggleProductStatus(id){
  const p = adminData.products.find(x=>x.id===id);
  if (!p) return;
  p.status = p.status === "active" ? "inactive" : "active";
  saveAdminData(adminData);
  renderProductsTable();
  renderDashboard();
}
function deleteProduct(id){
  adminData.products = adminData.products.filter(x=>x.id!==id);
  saveAdminData(adminData);
  renderProductsTable();
  renderDashboard();
}

/* ---------- Categories ---------- */
function renderCategoriesTable(){
  const body = document.getElementById("categories-table-body");
  body.innerHTML = adminData.categories.map(c=>`
    <tr>
      <td>${getLang()==="km" ? c.name.km : c.name.en}</td>
      <td>${adminData.products.filter(p=>p.category===c.id).length}</td>
      <td><span class="badge ${c.status==='active'?'b-active':'b-inactive'}">${c.status==='active' ? t('activate') : t('deactivate')}</span></td>
      <td>
        <button type="button" class="icon-btn cat-edit-btn" data-id="${c.id}">${icon('tag')} <span data-i18n="edit">Edit</span></button>
        <button type="button" class="icon-btn cat-toggle-btn" data-id="${c.id}">${c.status==='active' ? icon('x') : icon('check')} <span>${c.status==='active' ? t('deactivate') : t('activate')}</span></button>
      </td>
    </tr>`).join("");
}
function openCategoryModal(id){
  editingCategoryId = id || null;
  const c = id ? adminData.categories.find(x=>x.id===id) : null;
  document.getElementById("cat-modal-title").textContent = c ? t("edit") : t("add_category");
  document.getElementById("cf-name-en").value = c ? c.name.en : "";
  document.getElementById("cf-name-km").value = c ? c.name.km : "";
  document.getElementById("cf-status").value = c ? c.status : "active";
  document.getElementById("category-modal-backdrop").style.display = "flex";
}
function closeCategoryModal(){
  document.getElementById("category-modal-backdrop").style.display = "none";
  editingCategoryId = null;
}
function saveCategoryForm(){
  const nameEn = document.getElementById("cf-name-en").value.trim();
  const nameKm = document.getElementById("cf-name-km").value.trim() || nameEn;
  const status = document.getElementById("cf-status").value;
  if (!nameEn){ showToast(t("field_required")); return; }
  if (editingCategoryId){
    const c = adminData.categories.find(x=>x.id===editingCategoryId);
    c.name = { en: nameEn, km: nameKm }; c.status = status;
  } else {
    const id = nameEn.toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,20) || ("cat"+Date.now());
    adminData.categories.push({ id, name: { en: nameEn, km: nameKm }, key: null, status });
  }
  saveAdminData(adminData);
  closeCategoryModal();
  renderCategoriesTable();
  renderDashboard();
  showToast(t("save"));
}

/* ---------- Orders (fulfillment status only) ---------- */
let orderFilterStatus = "";
let expandedOrderId = null;

function renderOrdersTable(){
  const q = (document.getElementById("order-search")?.value || "").toLowerCase();
  let list = adminData.orders.slice();
  if (orderFilterStatus) list = list.filter(o=>o.status===orderFilterStatus);
  if (q) list = list.filter(o=> (o.id+" "+o.name+" "+o.phone).toLowerCase().includes(q));
  list.sort((a,b)=> b.date.localeCompare(a.date));

  const body = document.getElementById("orders-table-body");
  body.innerHTML = list.map(o=>{
    const itemsSummary = o.items.map(i=> `${getLang()==="km" ? i.nameKm : i.name} x${i.qty}`).join(", ");
    const expanded = expandedOrderId === o.id;
    return `
    <tr class="order-row" data-id="${o.id}" style="cursor:pointer;">
      <td><b>${o.id}</b></td>
      <td>${o.name}<div style="font-size:.7rem;color:var(--ink-faint);">${o.phone}</div></td>
      <td style="white-space:normal;max-width:260px;">${itemsSummary}</td>
      <td>${money(o.total)}</td>
      <td>${o.date}</td>
      <td>
        <select class="select-mini order-status-select" data-id="${o.id}" style="min-width:130px;">
          ${ORDER_STATUSES.map(s=>`<option value="${s}" ${s===o.status?"selected":""}>${t('status_'+s)}</option>`).join("")}
        </select>
      </td>
    </tr>
    ${expanded ? `<tr class="order-detail-row"><td colspan="6" style="background:var(--bg-soft);">
      <div style="padding:10px 6px;font-size:.82rem;color:var(--ink-soft);">
        <div style="margin-bottom:6px;"><b data-i18n="col_note">Note</b>: ${o.note || "—"}</div>
        <div><b data-i18n="col_products">Products</b>:
          <ul style="margin:6px 0 0 18px;">
            ${o.items.map(i=>`<li>${getLang()==="km" ? i.nameKm : i.name} — ${t('col_qty')}: ${i.qty} × ${money(i.price)} = ${money(i.lineTotal)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </td></tr>` : ""}`;
  }).join("") || `<tr><td colspan="6" style="text-align:center;color:var(--ink-faint);padding:24px;" data-i18n="no_results"></td></tr>`;

  const statusSel = document.getElementById("order-status-filter");
  if (statusSel && !statusSel._built){
    statusSel._built = true;
    statusSel.innerHTML = `<option value="">—</option>` + ORDER_STATUSES.map(s=>`<option value="${s}">${t('status_'+s)}</option>`).join("");
  }
  applyI18n();
}
function updateOrderStatus(orderId, newStatus){
  const o = adminData.orders.find(x=>x.id===orderId);
  if (!o) return;
  o.status = newStatus;
  saveAdminData(adminData);
  renderOrdersTable();
  renderDashboard();
  showToast(t("save"));
}

/* ---------- Events ---------- */
document.addEventListener("click", e=>{
  const navBtn = e.target.closest(".admin-nav button");
  if (navBtn){ showSection(navBtn.dataset.section); return; }

  const sidebarToggle = e.target.closest(".admin-sidebar-toggle");
  if (sidebarToggle){ document.querySelector(".admin-sidebar")?.classList.toggle("open"); return; }

  if (e.target.closest("#add-product-btn")){ openProductModal(null); return; }
  const editBtn = e.target.closest(".prod-edit-btn");
  if (editBtn){ openProductModal(editBtn.dataset.id); return; }
  const toggleBtn = e.target.closest(".prod-toggle-btn");
  if (toggleBtn){ toggleProductStatus(toggleBtn.dataset.id); return; }
  const delBtn = e.target.closest(".prod-delete-btn");
  if (delBtn){ if (confirm(t("delete")+"?")) deleteProduct(delBtn.dataset.id); return; }
  if (e.target.closest("#pf-save")){ saveProductForm(); return; }
  if (e.target.closest("#settings-save")){ saveSettings(); return; }
  if (e.target.closest("#pf-cancel") || e.target.closest("#product-modal-close")){ closeProductModal(); return; }

  if (e.target.closest("#add-category-btn")){ openCategoryModal(null); return; }
  const catEditBtn = e.target.closest(".cat-edit-btn");
  if (catEditBtn){ openCategoryModal(catEditBtn.dataset.id); return; }
  const catToggleBtn = e.target.closest(".cat-toggle-btn");
  if (catToggleBtn){
    const c = adminData.categories.find(x=>x.id===catToggleBtn.dataset.id);
    if (c){ c.status = c.status==="active" ? "inactive" : "active"; saveAdminData(adminData); renderCategoriesTable(); }
    return;
  }
  if (e.target.closest("#cf-save")){ saveCategoryForm(); return; }
  if (e.target.closest("#cf-cancel") || e.target.closest("#category-modal-close")){ closeCategoryModal(); return; }

  const orderRow = e.target.closest(".order-row");
  if (orderRow && !e.target.closest(".order-status-select")){
    const id = orderRow.dataset.id;
    expandedOrderId = expandedOrderId === id ? null : id;
    renderOrdersTable();
    return;
  }
});

document.addEventListener("input", e=>{
  if (e.target.id === "prod-search") renderProductsTable();
  if (e.target.id === "order-search") renderOrdersTable();
});
document.addEventListener("change", e=>{
  if (e.target.id === "prod-cat-filter") renderProductsTable();
  if (e.target.id === "order-status-filter"){ orderFilterStatus = e.target.value; renderOrdersTable(); }
  const statusSelect = e.target.closest(".order-status-select");
  if (statusSelect){ updateOrderStatus(statusSelect.dataset.id, statusSelect.value); }
});

document.addEventListener("DOMContentLoaded", ()=>{
  showSection("dashboard");
});
document.addEventListener("langchanged", ()=>{
  showSection(currentSection);
});
