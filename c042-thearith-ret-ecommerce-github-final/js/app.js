/* =========================================================
   C042 – Thearith Home & Living | Customer Website Logic
   Demo only: in-memory cart, no backend, no payments.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- STATE ---------- */
  let cart = []; // { id, qty }
  let activeCategory = "all";
  let searchTerm = "";
  let priceFilter = "all";
  let availabilityFilter = "all";
  let sortMode = "latest";
  let orderChannel = null; // 'telegram' | 'facebook'
  let orderRefCounter = 1;
  let pdCurrentId = null;

  const money = formatPrice;

  /* ---------- DOM SHORTCUTS ---------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  /* ---------- CATEGORY GRID ---------- */
  function renderCategories() {
    const grid = $("#categoryGrid");
    const countFor = (catId) => PRODUCTS.filter((p) => p.category === catId).length;
    grid.innerHTML = CATEGORIES.map(
      (c) => `
      <button class="category-card" data-cat="${c.id}">
        <img src="${c.icon}" alt="${c.name}">
        <span>${c.name}</span>
        <small>${countFor(c.id)} items</small>
      </button>`
    ).join("");

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".category-card");
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      syncFilterUI();
      document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
      renderProducts();
    });

    // footer category list
    $("#footerCategoryList").innerHTML = CATEGORIES.slice(0, 6)
      .map((c) => `<li><a href="#products" data-cat-link="${c.id}">${c.name}</a></li>`)
      .join("");
    $("#footerCategoryList").addEventListener("click", (e) => {
      const a = e.target.closest("[data-cat-link]");
      if (!a) return;
      e.preventDefault();
      activeCategory = a.dataset.catLink;
      syncFilterUI();
      renderProducts();
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });

    // populate filter select
    const sel = $("#filterCategory");
    CATEGORIES.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.name;
      sel.appendChild(opt);
    });
  }

  function syncFilterUI() {
    $("#filterCategory").value = activeCategory;
    $$(".category-card").forEach((el) => el.classList.toggle("active", el.dataset.cat === activeCategory));
  }

  /* ---------- PRODUCT CARD TEMPLATE ---------- */
  function badgeHTML(product) {
    const map = { sale: ["Sale", "badge-sale"], new: ["New", "badge-new"], bestseller: ["Best Seller", "badge-bestseller"] };
    return product.badges.map((b) => `<span class="badge ${map[b][1]}">${map[b][0]}</span>`).join("");
  }

  function productCardHTML(p) {
    const stock = getStockStatus(p.stock);
    const inCart = cart.find((c) => c.id === p.id);
    const qty = inCart ? inCart.qty : 1;
    const disabled = p.stock <= 0;
    return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-thumb" data-action="open-detail" data-id="${p.id}">
        <div class="badge-row">${badgeHTML(p)}</div>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="stock-pill ${stock.cls}">${stock.label}</span>
      </div>
      <div class="product-body">
        <span class="product-cat">${getCategoryName(p.category)}</span>
        <h3 class="product-name" data-action="open-detail" data-id="${p.id}">${p.name}</h3>
        <div class="price-row">
          <span class="price-now">${money(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : ""}
        </div>
        <div class="qty-row">
          <div class="qty-control" data-id="${p.id}">
            <button type="button" data-action="dec" ${disabled ? "disabled" : ""}>−</button>
            <input type="text" value="${qty}" inputmode="numeric" data-qty-input readonly>
            <button type="button" data-action="inc" ${disabled ? "disabled" : ""}>+</button>
          </div>
          <button class="add-btn" data-action="add" data-id="${p.id}" ${disabled ? "disabled" : ""}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            ${disabled ? "Unavailable" : "Add"}
          </button>
        </div>
      </div>
    </article>`;
  }

  const cardQty = {}; // pending qty selection per product before adding to cart

  function getPendingQty(id) {
    return cardQty[id] || 1;
  }

  /* ---------- FILTER / SORT / RENDER MAIN GRID ---------- */
  function getFilteredProducts() {
    let list = PRODUCTS.slice();

    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || getCategoryName(p.category).toLowerCase().includes(q));
    }

    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      list = list.filter((p) => p.price >= min && p.price <= max);
    }

    if (availabilityFilter !== "all") {
      list = list.filter((p) => {
        const s = getStockStatus(p.stock).cls;
        return s === availabilityFilter;
      });
    }

    switch (sortMode) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "popular": list.sort((a, b) => (b.badges.includes("bestseller") ? 1 : 0) - (a.badges.includes("bestseller") ? 1 : 0)); break;
      default: list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    return list;
  }

  function renderProducts() {
    const grid = $("#productGrid");
    const list = getFilteredProducts();
    $("#resultCount").textContent = `${list.length} product${list.length !== 1 ? "s" : ""} found`;

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h3>No products found</h3>
          <p>Try a different search term or reset your filters.</p>
        </div>`;
      return;
    }
    grid.innerHTML = list.map(productCardHTML).join("");
  }

  function renderBestSellers() {
    const list = PRODUCTS.filter((p) => p.badges.includes("bestseller"));
    $("#bestSellerGrid").innerHTML = list.map(productCardHTML).join("");
  }

  function renderNewArrivals() {
    const list = PRODUCTS.slice().sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 4);
    $("#newArrivalGrid").innerHTML = list.map(productCardHTML).join("");
  }

  function renderAllProductGrids() {
    renderProducts();
    renderBestSellers();
    renderNewArrivals();
  }

  /* ---------- DELEGATED CLICK HANDLING FOR ALL GRIDS ---------- */
  function handleGridClick(e) {
    const qtyBtn = e.target.closest("[data-action='inc'],[data-action='dec']");
    const addBtn = e.target.closest("[data-action='add']");
    const detailTrigger = e.target.closest("[data-action='open-detail']");

    if (qtyBtn) {
      const wrap = qtyBtn.closest(".qty-control");
      const id = wrap.dataset.id;
      const product = PRODUCTS.find((p) => p.id === id);
      let q = getPendingQty(id);
      if (qtyBtn.dataset.action === "inc") q = Math.min(q + 1, product.stock || 99);
      else q = Math.max(1, q - 1);
      cardQty[id] = q;
      wrap.querySelector("[data-qty-input]").value = q;
      return;
    }

    if (addBtn) {
      const id = addBtn.dataset.id;
      addToCart(id, getPendingQty(id));
      addBtn.classList.add("added");
      const original = addBtn.innerHTML;
      addBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg> Added`;
      setTimeout(() => { addBtn.classList.remove("added"); addBtn.innerHTML = original; }, 1100);
      return;
    }

    if (detailTrigger) {
      openProductDetail(detailTrigger.dataset.id);
    }
  }

  ["#productGrid", "#bestSellerGrid", "#newArrivalGrid"].forEach((sel) => {
    document.addEventListener("click", (e) => {
      if (e.target.closest(sel)) handleGridClick(e);
    });
  });

  /* ---------- CART LOGIC ---------- */
  function addToCart(id, qty) {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product || product.stock <= 0) return;
    const existing = cart.find((c) => c.id === id);
    const maxQty = product.stock;
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, maxQty);
    } else {
      cart.push({ id, qty: Math.min(qty, maxQty) });
    }
    updateCartUI();
    showToast(`${product.name} added to your order`);
  }

  function setQty(id, qty) {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    const product = PRODUCTS.find((p) => p.id === id);
    if (qty <= 0) {
      cart = cart.filter((c) => c.id !== id);
    } else {
      item.qty = Math.min(qty, product.stock);
    }
    updateCartUI();
  }

  function removeFromCart(id) {
    cart = cart.filter((c) => c.id !== id);
    updateCartUI();
  }

  function cartCount() {
    return cart.reduce((sum, c) => sum + c.qty, 0);
  }

  function cartTotal() {
    return cart.reduce((sum, c) => {
      const p = PRODUCTS.find((pr) => pr.id === c.id);
      return sum + (p ? p.price * c.qty : 0);
    }, 0);
  }

  function updateCartUI() {
    const count = cartCount();
    [$("#cartBadge"), $("#fabCartBadge")].forEach((el) => {
      el.textContent = count;
      el.classList.toggle("show", count > 0);
    });
    $("#drawerTitle").textContent = `My Order (${count})`;
    renderDrawer();
  }

  function bumpBadge() {
    [$("#cartBadge"), $("#fabCartBadge")].forEach((el) => {
      el.classList.remove("bump");
      void el.offsetWidth;
      el.classList.add("bump");
    });
  }

  function renderDrawer() {
    const body = $("#drawerBody");
    const footer = $("#drawerFooter");
    if (!cart.length) {
      body.innerHTML = `
        <div class="drawer-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <h3 style="color:#111827;font-size:16px;margin-bottom:6px;">Your order is empty</h3>
          <p>Browse products and tap "Add" to build your order.</p>
        </div>`;
      footer.style.display = "none";
      return;
    }
    footer.style.display = "block";
    body.innerHTML = cart
      .map((c) => {
        const p = PRODUCTS.find((pr) => pr.id === c.id);
        return `
        <div class="order-item" data-id="${c.id}">
          <img src="${p.image}" alt="${p.name}">
          <div class="order-item-info">
            <h5>${p.name}</h5>
            <div class="unit-price">${money(p.price)} each</div>
            <div class="order-item-bottom">
              <div class="qty-control" data-id="${c.id}">
                <button type="button" data-drawer-action="dec">−</button>
                <input type="text" value="${c.qty}" data-qty-input readonly>
                <button type="button" data-drawer-action="inc">+</button>
              </div>
              <span class="order-item-subtotal">${money(p.price * c.qty)}</span>
            </div>
            <button class="remove-btn" data-remove="${c.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Remove
            </button>
          </div>
        </div>`;
      })
      .join("");

    $("#drawerTotal").textContent = money(cartTotal());
  }

  $("#drawerBody").addEventListener("click", (e) => {
    const incDec = e.target.closest("[data-drawer-action]");
    const removeBtn = e.target.closest("[data-remove]");
    if (incDec) {
      const wrap = incDec.closest(".qty-control");
      const id = wrap.dataset.id;
      const item = cart.find((c) => c.id === id);
      const delta = incDec.dataset.drawerAction === "inc" ? 1 : -1;
      setQty(id, item.qty + delta);
    } else if (removeBtn) {
      removeFromCart(removeBtn.dataset.remove);
      showToast("Item removed from order");
    }
  });

  /* ---------- DRAWER OPEN/CLOSE ---------- */
  function openDrawer() {
    $("#drawerOverlay").classList.add("open");
    $("#orderDrawer").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    $("#drawerOverlay").classList.remove("open");
    $("#orderDrawer").classList.remove("open");
    document.body.style.overflow = "";
  }
  $("#cartBtn").addEventListener("click", openDrawer);
  $("#fabCartBtn").addEventListener("click", openDrawer);
  $("#drawerCloseBtn").addEventListener("click", closeDrawer);
  $("#drawerOverlay").addEventListener("click", closeDrawer);

  /* ---------- ORDER TEXT GENERATION ---------- */
  function buildOrderText() {
    const ref = `ORD-DEMO-${String(orderRefCounter).padStart(3, "0")}`;
    let lines = [`Hello, I would like to order the following products:`, ``];
    cart.forEach((c, i) => {
      const p = PRODUCTS.find((pr) => pr.id === c.id);
      lines.push(`${i + 1}. ${p.name}`);
      lines.push(`   Qty: ${c.qty}`);
      if (c.qty > 1) {
        lines.push(`   Price: ${money(p.price)} × ${c.qty} = ${money(p.price * c.qty)}`);
      } else {
        lines.push(`   Price: ${money(p.price)}`);
      }
      lines.push(``);
    });
    lines.push(`Estimated Total: ${money(cartTotal())}`);
    lines.push(`Order Reference: ${ref}`);
    lines.push(`Website: ${window.location.href.split("#")[0]}`);
    lines.push(``);
    lines.push(`Please confirm availability and delivery details.`);
    return { text: lines.join("\n"), ref };
  }

  function openOrderSummary(channel) {
    if (!cart.length) {
      showToast("Your order is empty — add a product first");
      return;
    }
    orderChannel = channel;
    const { text } = buildOrderText();
    $("#orderTextBox").textContent = text;
    $("#orderSummaryTitle").textContent = channel === "telegram" ? "Order Summary — Telegram" : "Order Summary — Facebook";
    $("#copyFeedback").classList.remove("show");
    $("#goTelegramBtn").style.display = channel === "telegram" ? "inline-flex" : "none";
    $("#goFacebookBtn").style.display = channel === "facebook" ? "inline-flex" : "none";
    $("#orderSummaryModal").classList.add("open");
  }

  function closeOrderSummary() {
    $("#orderSummaryModal").classList.remove("open");
  }

  $("#orderTelegramBtn").addEventListener("click", () => openOrderSummary("telegram"));
  $("#orderFacebookBtn").addEventListener("click", () => openOrderSummary("facebook"));
  $("#orderSummaryClose").addEventListener("click", closeOrderSummary);
  $("#orderSummaryModal").addEventListener("click", (e) => { if (e.target.id === "orderSummaryModal") closeOrderSummary(); });

  $("#copyOrderBtn").addEventListener("click", async () => {
    const text = $("#orderTextBox").textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // fallback for environments without clipboard API
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    $("#copyFeedback").classList.add("show");
  });

  $("#goTelegramBtn").addEventListener("click", () => {
    const { text } = buildOrderText();
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    orderRefCounter++;
    finishOrderDemo();
  });

  $("#goFacebookBtn").addEventListener("click", () => {
    window.open(STORE_INFO.facebook, "_blank");
    orderRefCounter++;
    finishOrderDemo();
  });

  function finishOrderDemo() {
    showToast("Order text ready — paste it into the chat to confirm your order");
  }

  /* Wire every telegram/facebook link across the page to the same demo flow */
  function wireOrderLinks() {
    const telegramSelectors = ["#mobileTelegramLink", "#contactTelegramLink", "#footerTelegramLink"];
    const facebookSelectors = ["#mobileFacebookLink", "#footerFacebookLink"];
    telegramSelectors.forEach((sel) => {
      const el = $(sel);
      if (el) el.addEventListener("click", (e) => { e.preventDefault(); closeMobileNav(); openDrawer(); setTimeout(() => openOrderSummary("telegram"), cart.length ? 0 : 0); });
    });
    facebookSelectors.forEach((sel) => {
      const el = $(sel);
      if (el) el.addEventListener("click", (e) => { e.preventDefault(); closeMobileNav(); openDrawer(); setTimeout(() => openOrderSummary("facebook"), cart.length ? 0 : 0); });
    });
  }

  /* ---------- PRODUCT DETAIL MODAL ---------- */
  function openProductDetail(id) {
    const p = PRODUCTS.find((pr) => pr.id === id);
    if (!p) return;
    pdCurrentId = id;
    const stock = getStockStatus(p.stock);
    const disabled = p.stock <= 0;
    $("#pdGrid").innerHTML = `
      <div>
        <div class="pd-main-img"><img src="${p.image}" alt="${p.name}" id="pdMainImg"></div>
        <div class="pd-thumbs">
          <div class="active"><img src="${p.image}" alt="thumb 1"></div>
          <div><img src="${p.image}" alt="thumb 2" style="filter:hue-rotate(15deg);"></div>
          <div><img src="${p.image}" alt="thumb 3" style="filter:hue-rotate(-15deg);"></div>
        </div>
      </div>
      <div class="pd-info">
        <span class="product-cat">${getCategoryName(p.category)}</span>
        <h2>${p.name}</h2>
        <div class="pd-price-row">
          <span class="price-now">${money(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : ""}
        </div>
        <div class="pd-stock"><span class="stock-pill ${stock.cls}" style="position:static;">${stock.label}</span></div>
        <p class="pd-desc">${p.description}</p>
        <div class="pd-features">
          <h4>Key Features</h4>
          <ul>${p.features.map((f) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/></svg>${f}</li>`).join("")}</ul>
        </div>
        <div class="pd-actions">
          <div class="qty-control" data-id="${p.id}" data-pd="1">
            <button type="button" data-action="pd-dec" ${disabled ? "disabled" : ""}>−</button>
            <input type="text" value="1" data-qty-input readonly>
            <button type="button" data-action="pd-inc" ${disabled ? "disabled" : ""}>+</button>
          </div>
          <button class="btn btn-primary btn-lg" id="pdAddBtn" ${disabled ? "disabled" : ""}>${disabled ? "Unavailable" : "Add to Order"}</button>
        </div>
      </div>`;
    $("#productDetailModal").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeProductDetail() {
    $("#productDetailModal").classList.remove("open");
    document.body.style.overflow = "";
  }
  $("#pdModalClose").addEventListener("click", closeProductDetail);
  $("#productDetailModal").addEventListener("click", (e) => { if (e.target.id === "productDetailModal") closeProductDetail(); });

  $("#pdGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='pd-inc'],[data-action='pd-dec']");
    if (btn) {
      const input = document.querySelector("[data-pd] [data-qty-input]");
      const product = PRODUCTS.find((p) => p.id === pdCurrentId);
      let q = parseInt(input.value, 10);
      q = btn.dataset.action === "pd-inc" ? Math.min(q + 1, product.stock) : Math.max(1, q - 1);
      input.value = q;
    }
    const addBtn = e.target.closest("#pdAddBtn");
    if (addBtn) {
      const input = document.querySelector("[data-pd] [data-qty-input]");
      addToCart(pdCurrentId, parseInt(input.value, 10));
      closeProductDetail();
    }
  });

  /* ---------- MOBILE NAV ---------- */
  function openMobileNav() { $("#mobileNav").classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeMobileNav() { $("#mobileNav").classList.remove("open"); document.body.style.overflow = ""; }
  $("#hamburgerBtn").addEventListener("click", openMobileNav);
  $("#mobileNavClose").addEventListener("click", closeMobileNav);
  $("#mobileNavBackdrop").addEventListener("click", closeMobileNav);
  $$(".mnav-link").forEach((a) => a.addEventListener("click", closeMobileNav));

  /* ---------- TOAST ---------- */
  let toastTimer;
  function showToast(msg) {
    clearTimeout(toastTimer);
    $("#toastMsg").textContent = msg;
    $("#toast").classList.add("show");
    toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2200);
  }

  /* ---------- SEARCH / FILTER WIRE-UP ---------- */
  function debounce(fn, delay) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  }

  $("#productSearch").addEventListener("input", debounce((e) => { searchTerm = e.target.value; renderProducts(); }, 200));
  $("#headerSearch").addEventListener("input", debounce((e) => {
    searchTerm = e.target.value;
    $("#productSearch").value = searchTerm;
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    renderProducts();
  }, 250));
  $("#mobileSearch").addEventListener("input", debounce((e) => {
    searchTerm = e.target.value;
    $("#productSearch").value = searchTerm;
  }, 250));
  $("#mobileSearch").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      closeMobileNav();
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
      renderProducts();
    }
  });

  $("#filterCategory").addEventListener("change", (e) => { activeCategory = e.target.value; syncFilterUI(); renderProducts(); });
  $("#filterPrice").addEventListener("change", (e) => { priceFilter = e.target.value; renderProducts(); });
  $("#filterAvailability").addEventListener("change", (e) => { availabilityFilter = e.target.value; renderProducts(); });
  $("#sortBy").addEventListener("change", (e) => { sortMode = e.target.value; renderProducts(); });
  $("#resetFilters").addEventListener("click", () => {
    activeCategory = "all"; searchTerm = ""; priceFilter = "all"; availabilityFilter = "all"; sortMode = "latest";
    $("#productSearch").value = ""; $("#headerSearch").value = ""; $("#filterPrice").value = "all";
    $("#filterAvailability").value = "all"; $("#sortBy").value = "latest";
    syncFilterUI();
    renderProducts();
  });

  /* ---------- HEADER SCROLL ACTIVE LINK (basic) ---------- */
  $$(".main-nav a").forEach((a) => {
    a.addEventListener("click", () => {
      $$(".main-nav a").forEach((l) => l.classList.remove("active"));
      a.classList.add("active");
    });
  });

  /* ---------- INIT ---------- */
  function init() {
    renderCategories();
    renderAllProductGrids();
    wireOrderLinks();
    updateCartUI();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
