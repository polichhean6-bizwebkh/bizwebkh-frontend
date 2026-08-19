/* =========================================================
   C042 – Thearith Home & Living | Admin Dashboard Logic
   Demo only: localStorage-backed state, no real backend/auth.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- AUTH GUARD (demo only) ---------- */
  if (sessionStorage.getItem("thl_admin_demo_logged_in") !== "1") {
    window.location.href = "index.html";
    return;
  }

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const money = formatPrice;

  const LS_PRODUCTS = "thl_admin_products_v1";
  const LS_CATEGORIES = "thl_admin_categories_v1";
  const LS_SETTINGS = "thl_admin_settings_v1";

  /* ---------- STATE (persisted to localStorage so admin edits behave like a real demo) ---------- */
  let products = loadJSON(LS_PRODUCTS, () => PRODUCTS.map((p) => ({ ...p })));
  let categories = loadJSON(LS_CATEGORIES, () => CATEGORIES.map((c) => ({ ...c })));
  let settings = loadJSON(LS_SETTINGS, () => ({ ...STORE_INFO }));

  function loadJSON(key, fallbackFn) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore corrupt demo storage */ }
    return fallbackFn();
  }
  function persist() {
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(products));
    localStorage.setItem(LS_CATEGORIES, JSON.stringify(categories));
    localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
  }

  function categoryName(id) {
    const c = categories.find((c) => c.id === id);
    return c ? c.name : id;
  }
  function stockStatus(stock) {
    if (stock <= 0) return { label: "Out of Stock", cls: "out" };
    if (stock <= 5) return { label: "Low Stock", cls: "low" };
    return { label: "In Stock", cls: "instock" };
  }

  /* ---------- SIDEBAR / VIEW ROUTING ---------- */
  const views = { dashboard: "Dashboard", products: "Products", categories: "Categories", settings: "Settings" };

  function showView(name) {
    Object.keys(views).forEach((v) => {
      $(`#view-${v}`).style.display = v === name ? "block" : "none";
    });
    $$(".sidebar-nav a[data-view]").forEach((a) => a.classList.toggle("active", a.dataset.view === name));
    $("#topbarTitle").textContent = views[name];
    closeSidebar();
    if (name === "dashboard") renderDashboard();
    if (name === "products") renderProductTable();
    if (name === "categories") renderCategoryGrid();
    if (name === "settings") fillSettingsForm();
  }

  $$(".sidebar-nav a[data-view]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      showView(a.dataset.view);
    });
  });

  $("#logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("thl_admin_demo_logged_in");
    window.location.href = "index.html";
  });

  /* ---------- MOBILE SIDEBAR ---------- */
  function openSidebar() { $("#sidebar").classList.add("open"); $("#sidebarBackdrop").classList.add("open"); }
  function closeSidebar() { $("#sidebar").classList.remove("open"); $("#sidebarBackdrop").classList.remove("open"); }
  $("#mobileMenuBtn").addEventListener("click", openSidebar);
  $("#sidebarClose").addEventListener("click", closeSidebar);
  $("#sidebarBackdrop").addEventListener("click", closeSidebar);

  /* ---------- TOP BAR DATE ---------- */
  $("#topbarDate").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  /* ---------- TOAST ---------- */
  let toastTimer;
  function showToast(msg) {
    clearTimeout(toastTimer);
    $("#toastMsg").textContent = msg;
    $("#toast").classList.add("show");
    toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2200);
  }

  /* ================= DASHBOARD ================= */
  function renderDashboard() {
    const total = products.length;
    const activeCount = products.filter((p) => p.status === "active").length;
    const outOfStock = products.filter((p) => p.stock <= 0).length;

    $("#statTotalProducts").textContent = total;
    $("#statCategories").textContent = categories.length;
    $("#statActive").textContent = activeCount;
    $("#statOutOfStock").textContent = outOfStock;

    const recent = products.slice().sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 5);
    $("#recentProductsTable tbody").innerHTML = recent.map((p) => `
      <tr>
        <td><div class="prod-cell"><img src="${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><small>${p.sku}</small></div></div></td>
        <td>${categoryName(p.category)}</td>
        <td>${money(p.price)}</td>
        <td>${formatDate(p.dateAdded)}</td>
      </tr>`).join("") || emptyRow(4, "No products yet");

    const low = products.filter((p) => p.stock <= 5).sort((a, b) => a.stock - b.stock).slice(0, 6);
    $("#lowStockTable tbody").innerHTML = low.map((p) => {
      const s = stockStatus(p.stock);
      return `
      <tr>
        <td><div class="prod-cell"><img src="${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><small>${p.sku}</small></div></div></td>
        <td>${categoryName(p.category)}</td>
        <td>${p.stock} units</td>
        <td><span class="status-pill ${s.cls}">${s.label}</span></td>
      </tr>`;
    }).join("") || emptyRow(4, "No low stock items 🎉");
  }

  function emptyRow(colspan, text) {
    return `<tr><td colspan="${colspan}" class="empty-cell">${text}</td></tr>`;
  }
  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  /* ================= PRODUCTS TABLE ================= */
  let prodSearch = "", prodCatFilter = "all", prodStatusFilter = "all";

  function populateCategorySelects() {
    const filterSel = $("#productAdminCategoryFilter");
    filterSel.innerHTML = `<option value="all">All Categories</option>` + categories.map((c) => `<option value="${c.id}">${c.name}</option>`).join("");
    const formSel = $("#pfCategory");
    formSel.innerHTML = categories.map((c) => `<option value="${c.id}">${c.name}</option>`).join("");
  }

  function getFilteredProducts() {
    let list = products.slice();
    if (prodSearch.trim()) {
      const q = prodSearch.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (prodCatFilter !== "all") list = list.filter((p) => p.category === prodCatFilter);
    if (prodStatusFilter !== "all") list = list.filter((p) => p.status === prodStatusFilter);
    return list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  function renderProductTable() {
    const list = getFilteredProducts();
    $("#productCountNote").textContent = `Showing ${list.length} of ${products.length} products — designed to scale to 100–200 products.`;
    $("#productTableBody").innerHTML = list.map((p) => {
      const s = stockStatus(p.stock);
      return `
      <tr data-id="${p.id}">
        <td><img src="${p.image}" alt="${p.name}" style="width:44px;height:44px;border-radius:8px;object-fit:cover;background:#f9fafb;"></td>
        <td><strong>${p.name}</strong><br><small style="color:var(--ink-500);">${p.sku}</small></td>
        <td>${categoryName(p.category)}</td>
        <td>${money(p.price)}${p.oldPrice ? ` <small style="color:var(--ink-500);text-decoration:line-through;">${money(p.oldPrice)}</small>` : ""}</td>
        <td><span class="status-pill ${s.cls}">${p.stock} · ${s.label}</span></td>
        <td><span class="status-pill ${p.status === "active" ? "active" : "hidden"}">${p.status === "active" ? "● Active" : "● Hidden"}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-action view" data-action="view" title="View"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
            <button class="icon-action edit" data-action="edit" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg></button>
            <button class="icon-action delete" data-action="delete" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
          </div>
        </td>
      </tr>`;
    }).join("") || `<tr>${emptyRow(7, "No products match your filters.")}</tr>`;
  }

  $("#productAdminSearch").addEventListener("input", debounce((e) => { prodSearch = e.target.value; renderProductTable(); }, 200));
  $("#productAdminCategoryFilter").addEventListener("change", (e) => { prodCatFilter = e.target.value; renderProductTable(); });
  $("#productAdminStatusFilter").addEventListener("change", (e) => { prodStatusFilter = e.target.value; renderProductTable(); });

  function debounce(fn, delay) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), delay); }; }

  $("#productTableBody").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const row = e.target.closest("tr[data-id]");
    const id = row.dataset.id;
    const action = btn.dataset.action;
    if (action === "view") openViewProduct(id);
    if (action === "edit") openProductForm(id);
    if (action === "delete") confirmDeleteProduct(id);
  });

  /* ---------- VIEW PRODUCT MODAL ---------- */
  function openViewProduct(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    const s = stockStatus(p.stock);
    $("#viewProductBody").innerHTML = `
      <div style="display:flex;gap:18px;flex-wrap:wrap;">
        <img src="${p.image}" alt="${p.name}" style="width:160px;height:120px;border-radius:12px;object-fit:cover;background:#f9fafb;flex-shrink:0;">
        <div style="flex:1;min-width:200px;">
          <h2 style="font-size:18px;margin-bottom:6px;">${p.name}</h2>
          <p style="font-size:13px;color:var(--ink-500);margin-bottom:10px;">SKU: ${p.sku} · ${categoryName(p.category)}</p>
          <p style="font-size:20px;font-weight:800;margin-bottom:6px;">${money(p.price)} ${p.oldPrice ? `<span style="font-size:13px;color:var(--ink-500);text-decoration:line-through;font-weight:600;">${money(p.oldPrice)}</span>` : ""}</p>
          <div style="display:flex;gap:8px;margin-bottom:10px;">
            <span class="status-pill ${s.cls}">${p.stock} units · ${s.label}</span>
            <span class="status-pill ${p.status === "active" ? "active" : "hidden"}">${p.status === "active" ? "Active" : "Hidden"}</span>
          </div>
        </div>
      </div>
      <p style="margin-top:16px;font-size:14px;color:var(--ink-700);">${p.description || "No description provided."}</p>
      ${p.features && p.features.length ? `<ul style="margin-top:12px;padding-left:18px;font-size:13.5px;color:var(--ink-700);">${p.features.map((f) => `<li style="margin-bottom:4px;">${f}</li>`).join("")}</ul>` : ""}
    `;
    $("#viewProductModal").classList.add("open");
  }
  $("#viewProductClose").addEventListener("click", () => $("#viewProductModal").classList.remove("open"));
  $("#viewProductModal").addEventListener("click", (e) => { if (e.target.id === "viewProductModal") $("#viewProductModal").classList.remove("open"); });

  /* ---------- ADD / EDIT PRODUCT FORM ---------- */
  const IMAGE_VARIANTS = (base) => [base, base, base]; // demo: reuse generated illustration as placeholder "photos"

  function renderImagePicker(mainImage) {
    const imgs = IMAGE_VARIANTS(mainImage);
    $("#pfImageRow").innerHTML = imgs.map((src, i) => `
      <div class="image-thumb ${i === 0 ? "active" : ""}" data-src="${src}" style="${i > 0 ? `filter:hue-rotate(${i * 20}deg);` : ""}">
        <img src="${src}" alt="preview ${i + 1}">
      </div>`).join("") + `
      <div class="image-add-btn" id="addImageBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        Upload
      </div>`;
    $("#pfImageRow").dataset.main = imgs[0];
  }

  $("#pfImageRow").addEventListener("click", (e) => {
    const thumb = e.target.closest(".image-thumb");
    const addBtn = e.target.closest("#addImageBtn");
    if (thumb) {
      $$(".image-thumb").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      $("#pfImageRow").dataset.main = thumb.dataset.src;
    } else if (addBtn) {
      showToast("Demo only — image upload is simulated (no file storage in this prototype)");
    }
  });

  function openProductForm(id) {
    const isEdit = !!id;
    $("#productModalTitle").textContent = isEdit ? "Edit Product" : "Add Product";
    populateCategorySelects();
    if (isEdit) {
      const p = products.find((x) => x.id === id);
      $("#pfId").value = p.id;
      $("#pfName").value = p.name;
      $("#pfSku").value = p.sku;
      $("#pfCategory").value = p.category;
      $("#pfPrice").value = p.price;
      $("#pfOldPrice").value = p.oldPrice || "";
      $("#pfStock").value = p.stock;
      $("#pfDescription").value = p.description || "";
      $("#pfFeatures").value = (p.features || []).join("\n");
      document.querySelector(`input[name="pfStatus"][value="${p.status}"]`).checked = true;
      renderImagePicker(p.image);
    } else {
      $("#productForm").reset();
      $("#pfId").value = "";
      renderImagePicker("assets/products/p01.svg");
    }
    $("#productModal").classList.add("open");
  }

  function closeProductForm() { $("#productModal").classList.remove("open"); }
  $("#openAddProductBtn").addEventListener("click", () => openProductForm(null));
  $("#productModalClose").addEventListener("click", closeProductForm);
  $("#productCancelBtn").addEventListener("click", closeProductForm);
  $("#productModal").addEventListener("click", (e) => { if (e.target.id === "productModal") closeProductForm(); });

  $("#productForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = $("#pfId").value;
    const features = $("#pfFeatures").value.split("\n").map((f) => f.trim()).filter(Boolean);
    const data = {
      name: $("#pfName").value.trim(),
      sku: $("#pfSku").value.trim(),
      category: $("#pfCategory").value,
      price: parseFloat($("#pfPrice").value) || 0,
      oldPrice: $("#pfOldPrice").value ? parseFloat($("#pfOldPrice").value) : null,
      stock: parseInt($("#pfStock").value, 10) || 0,
      description: $("#pfDescription").value.trim(),
      features,
      status: document.querySelector('input[name="pfStatus"]:checked').value,
      image: $("#pfImageRow").dataset.main || "assets/products/p01.svg",
    };

    if (id) {
      const idx = products.findIndex((p) => p.id === id);
      products[idx] = { ...products[idx], ...data };
      showToast("Product updated successfully");
    } else {
      const newId = "p" + Date.now();
      products.unshift({ id: newId, badges: [], dateAdded: new Date().toISOString().slice(0, 10), ...data });
      showToast("Product added successfully");
    }
    persist();
    closeProductForm();
    renderProductTable();
    renderDashboard();
  });

  /* ---------- DELETE (products & categories share one confirm modal) ---------- */
  let pendingDelete = null; // { type: 'product'|'category', id }

  function confirmDeleteProduct(id) {
    const p = products.find((x) => x.id === id);
    pendingDelete = { type: "product", id };
    $("#confirmTitle").textContent = "Delete Product";
    $("#confirmText").innerHTML = `Are you sure you want to delete <strong>${p.name}</strong>? This action cannot be undone in the live system.`;
    $("#confirmModal").classList.add("open");
  }
  function confirmDeleteCategory(id) {
    const c = categories.find((x) => x.id === id);
    const inUse = products.filter((p) => p.category === id).length;
    pendingDelete = { type: "category", id };
    $("#confirmTitle").textContent = "Delete Category";
    $("#confirmText").innerHTML = `Are you sure you want to delete <strong>${c.name}</strong>?${inUse ? ` <br><br>⚠️ ${inUse} product(s) currently use this category.` : ""}`;
    $("#confirmModal").classList.add("open");
  }
  $("#confirmClose").addEventListener("click", () => $("#confirmModal").classList.remove("open"));
  $("#confirmCancelBtn").addEventListener("click", () => $("#confirmModal").classList.remove("open"));
  $("#confirmModal").addEventListener("click", (e) => { if (e.target.id === "confirmModal") $("#confirmModal").classList.remove("open"); });
  $("#confirmOkBtn").addEventListener("click", () => {
    if (!pendingDelete) return;
    if (pendingDelete.type === "product") {
      products = products.filter((p) => p.id !== pendingDelete.id);
      persist();
      renderProductTable();
      renderDashboard();
      showToast("Product deleted");
    } else if (pendingDelete.type === "category") {
      categories = categories.filter((c) => c.id !== pendingDelete.id);
      persist();
      renderCategoryGrid();
      populateCategorySelects();
      renderDashboard();
      showToast("Category deleted");
    }
    pendingDelete = null;
    $("#confirmModal").classList.remove("open");
  });

  /* ================= CATEGORIES ================= */
  function renderCategoryGrid() {
    $("#categoryAdminGrid").innerHTML = categories.map((c) => {
      const count = products.filter((p) => p.category === c.id).length;
      return `
      <div class="cat-admin-card" data-id="${c.id}">
        <img src="${c.icon}" alt="${c.name}">
        <strong>${c.name}</strong>
        <span>${count} product${count !== 1 ? "s" : ""}</span>
        <div class="cat-admin-actions">
          <button class="btn btn-outline btn-sm" data-cat-action="edit">Edit</button>
          <button class="btn btn-danger btn-sm" data-cat-action="delete">Delete</button>
        </div>
      </div>`;
    }).join("");
  }

  $("#categoryAdminGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat-action]");
    if (!btn) return;
    const card = e.target.closest(".cat-admin-card");
    const id = card.dataset.id;
    if (btn.dataset.catAction === "edit") openCategoryForm(id);
    if (btn.dataset.catAction === "delete") confirmDeleteCategory(id);
  });

  function openCategoryForm(id) {
    $("#categoryModalTitle").textContent = id ? "Edit Category" : "Add Category";
    $("#cfId").value = id || "";
    $("#cfName").value = id ? categories.find((c) => c.id === id).name : "";
    $("#categoryModal").classList.add("open");
  }
  function closeCategoryForm() { $("#categoryModal").classList.remove("open"); }
  $("#openAddCategoryBtn").addEventListener("click", () => openCategoryForm(null));
  $("#categoryModalClose").addEventListener("click", closeCategoryForm);
  $("#categoryCancelBtn").addEventListener("click", closeCategoryForm);
  $("#categoryModal").addEventListener("click", (e) => { if (e.target.id === "categoryModal") closeCategoryForm(); });

  $("#categoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = $("#cfId").value;
    const name = $("#cfName").value.trim();
    if (id) {
      const cat = categories.find((c) => c.id === id);
      cat.name = name;
      showToast("Category updated");
    } else {
      const slug = "cat-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now().toString().slice(-4);
      categories.push({ id: slug, name, icon: "assets/categories/other.svg" });
      showToast("Category added");
    }
    persist();
    closeCategoryForm();
    renderCategoryGrid();
    populateCategorySelects();
    renderDashboard();
  });

  /* ================= SETTINGS ================= */
  function fillSettingsForm() {
    $("#setStoreName").value = settings.name || "";
    $("#setPhone").value = settings.phone || "";
    $("#setHours").value = settings.hours || "";
    $("#setTelegram").value = settings.telegram || "";
    $("#setFacebook").value = settings.facebook || "";
    $("#setAddress").value = settings.address || "";
  }

  $("#settingsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    settings = {
      ...settings,
      name: $("#setStoreName").value.trim(),
      phone: $("#setPhone").value.trim(),
      hours: $("#setHours").value.trim(),
      telegram: $("#setTelegram").value.trim(),
      facebook: $("#setFacebook").value.trim(),
      address: $("#setAddress").value.trim(),
    };
    persist();
    const msg = $("#settingsSavedMsg");
    msg.style.display = "inline";
    setTimeout(() => (msg.style.display = "none"), 2200);
    showToast("Store settings saved");
  });

  /* ---------- INIT ---------- */
  populateCategorySelects();
  renderDashboard();
})();
