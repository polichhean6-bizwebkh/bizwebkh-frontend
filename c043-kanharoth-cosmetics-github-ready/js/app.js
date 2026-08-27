/* =======================================================
   C043 - Kanharoth Cosmetics Demo — Shared App Logic
   Cart state lives in localStorage for demo purposes only. There is no
   transaction step in this build — the cart leads directly to Telegram
   for order confirmation.
   ======================================================= */

const CART_KEY = "c043cos_cart";

function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); updateFloatingCart(); }
function addToCart(productId, qty){
  qty = qty || 1;
  const cart = getCart();
  const existing = cart.find(i=>i.id===productId);
  if (existing) existing.qty += qty;
  else cart.push({id:productId, qty});
  saveCart(cart);
  showFloatingCart({bump:true});
}
function removeFromCart(productId){ saveCart(getCart().filter(i=>i.id!==productId)); }
function setCartQty(productId, qty){
  const cart = getCart();
  const item = cart.find(i=>i.id===productId);
  if (item){ item.qty = Math.max(1, qty); saveCart(cart); }
}
function cartCount(){ return getCart().reduce((s,i)=>s+i.qty,0); }
function cartDetailed(){
  const map = Object.fromEntries(PRODUCTS.map(p=>[p.id,p]));
  return getCart().map(i=>({...i, product: map[i.id]})).filter(i=>i.product);
}
function cartSubtotal(){
  return cartDetailed().reduce((s,i)=> s + (i.product.sale || i.product.price) * i.qty, 0);
}
function updateCartCount(){
  document.querySelectorAll(".cart-count").forEach(el=> el.textContent = cartCount());
}

/* ---------- Floating mini-cart (markup injected by layout.js) ---------- */
function updateFloatingCart(){
  const el = document.getElementById("floating-cart");
  if (!el) return;
  const count = cartCount();
  const subtotal = cartSubtotal();
  const countEl = el.querySelector(".fc-count");
  const itemsTextEl = el.querySelector(".fc-items-text");
  const subtotalEl = el.querySelector(".fc-subtotal");
  if (countEl) countEl.textContent = count;
  if (subtotalEl) subtotalEl.textContent = money(subtotal);
  if (itemsTextEl){
    const label = getLang()==="km" ? "មុខទំនិញ" : (count===1 ? "Item" : "Items");
    itemsTextEl.innerHTML = `${count} <span>${label}</span>`;
  }
  el.classList.toggle("visible", count > 0);
  document.body.classList.toggle("has-floating-cart", count > 0);
}
function showFloatingCart(opts){
  const el = document.getElementById("floating-cart");
  if (!el) return;
  updateFloatingCart();
  el.classList.add("visible");
  if (opts && opts.bump){
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
    setTimeout(()=> el.classList.remove("bump"), 700);
  }
}
document.addEventListener("langchanged", updateFloatingCart);
document.addEventListener("DOMContentLoaded", updateCartCount);

/* ---------- Header interactions (delegated — header is injected by layout.js
   possibly after this file's own DOMContentLoaded callback has run) ---------- */
document.addEventListener("click", e=>{
  const langBtn = e.target.closest(".lang-switch button");
  if (langBtn){ setLang(langBtn.dataset.lang); return; }

  const mobileToggle = e.target.closest(".mobile-toggle");
  if (mobileToggle){
    document.querySelector("nav.main-nav")?.classList.toggle("mobile-open");
    return;
  }

  const searchToggle = e.target.closest(".search-toggle");
  if (searchToggle){
    document.querySelector(".search-panel")?.classList.toggle("open");
    return;
  }
});

document.addEventListener("submit", e=>{
  const searchForm = e.target.closest(".search-panel form");
  if (!searchForm) return;
  e.preventDefault();
  const q = searchForm.querySelector("input").value.trim();
  // all pages live flat in the same folder, so this relative link works from any page
  location.href = "products.html?q=" + encodeURIComponent(q);
});

/* ---------- Utilities ---------- */
function qparam(name){ return new URLSearchParams(location.search).get(name); }
function badgeLabel(badge){
  if (badge==="new") return {cls:"new", text:t("badge_new")};
  if (badge==="sale") return {cls:"sale", text:t("badge_sale")};
  if (badge==="best") return {cls:"best", text:t("badge_best")};
  return null;
}
