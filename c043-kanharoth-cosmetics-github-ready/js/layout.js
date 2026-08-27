/* =======================================================
   C043 - Kanharoth Cosmetics Demo — Shared Header / Footer / Floating Cart
   All pages live flat in the same folder, so every link below is a plain
   relative filename (e.g. "products.html") — safe for root or subfolder
   hosting alike, with no "../" path math needed.
   Usage: <div id="site-header" data-active="home"></div>
          <div id="site-footer"></div>
   ======================================================= */

function renderHeader(activePage){
  const el = document.getElementById("site-header");
  if (!el) return;
  el.innerHTML = `
  <div class="demo-banner"><b>${''}</b><span data-i18n="foot_demo_note">This website is a DEMO for client presentation purposes only</span></div>
  <div class="topbar">
    <div class="container">
      <span data-i18n="topbar_tagline">Quality Beauty Products • Nationwide Delivery</span>
      <div class="flex items-center gap-12">
        <a href="${telegramGroupLink ? telegramGroupLink() : '#'}" target="_blank" rel="noopener">${typeof icon==='function'?icon('send'):''} <span data-i18n="topbar_contact">Message us on Telegram</span></a>
        <div class="lang-switch">
          <button data-lang="km">ខ្មែរ</button>
          <button data-lang="en">EN</button>
        </div>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="header-row">
      <a href="index.html" class="logo">
        <span class="mark">KC</span>
        <span>
          <span data-i18n="brand_name">Kanharoth Cosmetics</span>
          <span class="sub" data-i18n="brand_sub">Beauty & Skincare</span>
        </span>
      </a>
      <nav class="main-nav">
        <a href="index.html" ${activePage==='home'?'class="active"':''} data-i18n="nav_home">Home</a>
        <a href="products.html" ${activePage==='products'?'class="active"':''} data-i18n="nav_products">Products</a>
        <a href="about.html" ${activePage==='about'?'class="active"':''} data-i18n="nav_about">About</a>
        <a href="contact.html" ${activePage==='contact'?'class="active"':''} data-i18n="nav_contact">Contact</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn-plain search-toggle" aria-label="Search">${icon('search')}</button>
        <a href="cart.html" class="icon-btn-plain cart-btn" aria-label="Cart">
          ${icon('cart')}
          <span class="count cart-count">0</span>
        </a>
        <button class="mobile-toggle" aria-label="Menu">${icon('menu')}</button>
      </div>
    </div>
    <div class="search-panel">
      <div class="container">
        <form>
          <input type="text" data-i18n-ph="search_ph" placeholder="Search products...">
          <button type="submit" aria-label="Search">${icon('search')}</button>
        </form>
      </div>
    </div>
  </header>`;
}

function renderFooter(){
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div>
        <div class="logo" style="margin-bottom:14px;">
          <span class="mark">KC</span>
          <span style="color:#fff;" data-i18n="brand_name">Kanharoth Cosmetics</span>
        </div>
        <p data-i18n="foot_about">Kanharoth Cosmetics offers quality skincare and beauty essentials for your everyday routine.</p>
        <div class="social-row">
          <a href="${telegramGroupLink()}" target="_blank" rel="noopener" title="Telegram">${icon('send')}</a>
          <a href="#" title="Facebook">${icon('facebook')}</a>
          <a href="#" title="Instagram">${icon('instagram')}</a>
        </div>
      </div>
      <div>
        <h4 data-i18n="foot_contact">Contact</h4>
        <ul>
          <li class="footer-contact-item">${icon('mapPin')} St. 271, Phnom Penh, Cambodia</li>
          <li class="footer-contact-item">${icon('phone')} 016 234 567</li>
          <li class="footer-contact-item">${icon('mail')} hello@kanharothcosmetics.demo</li>
          <li class="footer-contact-item">${icon('send')} Telegram: @${TELEGRAM_CONFIG.directUsername}</li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="foot_links">Quick Links</h4>
        <ul>
          <li><a href="index.html" data-i18n="foot_link_home">Home</a></li>
          <li><a href="products.html" data-i18n="foot_link_products">Products</a></li>
          <li><a href="cart.html" data-i18n="foot_link_cart">Cart</a></li>
          <li><a href="about.html" data-i18n="foot_link_about">About</a></li>
          <li><a href="contact.html" data-i18n="foot_link_contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="sec_categories">Shop by Category</h4>
        <ul id="footer-cats"></ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Kanharoth Cosmetics — <span data-i18n="foot_rights">All rights reserved. Client presentation demo.</span></span>
      <span>C043 · Demo build for Ms. Kanharoth Heang</span>
    </div>
  </footer>`;
  const catList = document.getElementById("footer-cats");
  if (catList && typeof CATEGORIES !== "undefined"){
    catList.innerHTML = CATEGORIES.map(c=>`<li><a href="products.html?cat=${c.id}" data-i18n="${c.key}"></a></li>`).join("");
  }
}

function renderFloatingCart(){
  if (document.getElementById("floating-cart")) return;
  const el = document.createElement("div");
  el.id = "floating-cart";
  el.className = "floating-cart";
  el.innerHTML = `
    <a href="cart.html" class="fc-link">
      <span class="fc-icon">${icon('cart')}<span class="fc-count">0</span></span>
      <span class="fc-info">
        <span class="fc-items-text">0 <span data-i18n="cart">Cart</span></span>
        <span class="fc-subtotal">$0.00</span>
      </span>
      <span class="btn btn-primary btn-sm fc-view" data-i18n="view_cart">View Cart</span>
    </a>
  `;
  document.body.appendChild(el);
}

document.addEventListener("DOMContentLoaded", ()=>{
  const hdr = document.getElementById("site-header");
  const active = (hdr && hdr.dataset.active) || "";
  renderHeader(active);
  renderFooter();
  renderFloatingCart();
  applyI18n();
  updateCartCount();
  updateFloatingCart();
});
