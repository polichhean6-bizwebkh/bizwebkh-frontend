/* =======================================================
   C043 - Kanharoth E-Commerce Demo — Shared Header / Footer
   Usage: <div id="site-header" data-root="../"></div>
          <div id="site-footer" data-root="../"></div>
   data-root = relative path back to the site root (e.g. "" for /index.html, "../" for /shop/index.html)
   ======================================================= */

function renderHeader(root, activePage){
  const el = document.getElementById("site-header");
  if (!el) return;
  el.innerHTML = `
  <div class="demo-banner"><b>DEMO</b> — <span data-i18n="foot_demo_note">This website is a DEMO for client presentation purposes only</span></div>
  <div class="topbar">
    <div class="container">
      <span data-i18n="topbar_tagline">Fast Delivery • Nationwide Cambodia</span>
      <div class="flex items-center gap-12">
        <a href="tel:+855123456789">📞 016 234 567</a>
        <div class="lang-switch">
          <button data-lang="km">ខ្មែរ</button>
          <button data-lang="en">EN</button>
        </div>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="header-row">
      <a href="${root}index.html" class="logo">
        <span class="mark">KS</span>
        <span>
          <span data-i18n="brand_name">Kanharoth Shop</span>
          <span class="sub" data-i18n="brand_sub">Online Retail Store</span>
        </span>
      </a>
      <form class="search-bar">
        <input type="text" data-i18n-ph="search_ph" placeholder="Search products...">
        <button type="submit" aria-label="Search">🔍</button>
      </form>
      <nav class="main-nav">
        <a href="${root}shop/index.html" ${activePage==='shop'?'class="active"':''} data-i18n="nav_shop">All Products</a>
        <a href="${root}shop/index.html?promo=1" data-i18n="nav_promo">Promotions</a>
        <a href="${root}index.html#contact" data-i18n="nav_contact">Contact</a>
      </nav>
      <div class="header-actions">
        <button class="mobile-toggle" aria-label="Menu">☰</button>
        <a href="${root}cart/index.html" class="cart-btn">
          🛒 <span class="hide-mobile" data-i18n="cart">Cart</span>
          <span class="count cart-count">0</span>
        </a>
      </div>
    </div>
    <div class="categories-strip">
      <div class="container">
        <a href="${root}shop/index.html?cat=home" data-i18n="cat_home">Home & Living</a>
        <a href="${root}shop/index.html?cat=kitchen" data-i18n="cat_kitchen">Kitchen</a>
        <a href="${root}shop/index.html?cat=beauty" data-i18n="cat_beauty">Personal Care</a>
        <a href="${root}shop/index.html?cat=electronics" data-i18n="cat_electronics">Electronics</a>
        <a href="${root}shop/index.html?cat=accessories" data-i18n="cat_accessories">Accessories</a>
        <a href="${root}shop/index.html?cat=other" data-i18n="cat_other">Other</a>
      </div>
    </div>
  </header>`;
}

function renderFooter(root){
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
  <footer class="site-footer" id="contact">
    <div class="container">
      <div>
        <div class="logo" style="margin-bottom:12px;">
          <span class="mark">KS</span>
          <span style="color:#fff;font-weight:800;" data-i18n="brand_name">Kanharoth Shop</span>
        </div>
        <p data-i18n="foot_about">Kanharoth Shop offers quality, affordable products for Cambodian families, delivered nationwide.</p>
        <div class="social-row">
          <a href="#" title="Telegram">✈️</a>
          <a href="#" title="Facebook">📘</a>
        </div>
      </div>
      <div>
        <h4 data-i18n="foot_contact">Contact</h4>
        <ul>
          <li>📍 St. 271, Phnom Penh, Cambodia</li>
          <li>📞 016 234 567</li>
          <li>✉️ hello@kanharothshop.demo</li>
          <li>✈️ Telegram: @kanharothshop</li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="foot_links">Quick Links</h4>
        <ul>
          <li><a href="${root}index.html" data-i18n="foot_link_home">Home</a></li>
          <li><a href="${root}shop/index.html" data-i18n="foot_link_shop">Shop</a></li>
          <li><a href="${root}cart/index.html" data-i18n="foot_link_cart">Cart</a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="foot_policy">Policies</h4>
        <ul>
          <li><a href="#" data-i18n="foot_policy_return">Return &amp; Exchange</a></li>
          <li><a href="#" data-i18n="foot_policy_shipping">Shipping Policy</a></li>
          <li><a href="#" data-i18n="foot_policy_privacy">Privacy Policy</a></li>
          <li><a href="#" data-i18n="foot_policy_terms">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Kanharoth Shop — <span data-i18n="foot_rights">All rights reserved. Client presentation demo.</span></span>
      <span>C043 · Demo build for Ms. Kanharoth Heang</span>
    </div>
  </footer>`;
}

/* ---------- Floating mini-cart ----------
   Shown on browsing pages (home / shop / product) after the customer adds an
   item, so they get quick feedback + a way to jump to checkout without being
   redirected away from what they were browsing. Hidden on cart/checkout/
   payment/order-success since the cart is already the main content there. */
const FLOATING_CART_HIDDEN_ON = ["/cart/", "/checkout/", "/payment/", "/order-success/", "/admin/"];
function shouldShowFloatingCart(){
  return !FLOATING_CART_HIDDEN_ON.some(seg => location.pathname.includes(seg));
}
function renderFloatingCart(root){
  if (!shouldShowFloatingCart()) return;
  if (document.getElementById("floating-cart")) return;
  const el = document.createElement("div");
  el.id = "floating-cart";
  el.className = "floating-cart";
  el.innerHTML = `
    <a href="${root}cart/index.html" class="fc-link">
      <span class="fc-icon">🛒<span class="fc-count">0</span></span>
      <span class="fc-info">
        <span class="fc-items-text">0 <span data-i18n="cart">Cart</span></span>
        <span class="fc-subtotal">$0.00</span>
      </span>
      <span class="btn btn-primary btn-sm fc-view" data-i18n="cart_checkout">View Cart</span>
    </a>
  `;
  document.body.appendChild(el);
}

document.addEventListener("DOMContentLoaded", ()=>{
  const hdr = document.getElementById("site-header");
  const ftr = document.getElementById("site-footer");
  const root = (hdr && hdr.dataset.root) || (ftr && ftr.dataset.root) || "";
  const active = (hdr && hdr.dataset.active) || "";
  renderHeader(root, active);
  renderFooter(root);
  renderFloatingCart(root);
  applyI18n();
  updateCartCount();
  updateFloatingCart();
});
