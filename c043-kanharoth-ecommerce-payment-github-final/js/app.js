/* =======================================================
   C043 - Kanharoth E-Commerce Demo — Shared App Logic
   Cart state is kept in localStorage ("c043_cart") for demo purposes only.
   No real transactions, no real payment data is ever stored or transmitted.
   ======================================================= */

const CART_KEY = "c043_cart";
const ORDERS_KEY = "c043_orders_demo"; // orders placed during this demo session

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
function removeFromCart(productId){
  saveCart(getCart().filter(i=>i.id!==productId));
}
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

/* ---------- Floating mini-cart (widget itself is injected by layout.js) ---------- */
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
    const label = getLang()==="km" ? (count===1 ? "មុខទំនិញ" : "មុខទំនិញ") : (count===1 ? "Item" : "Items");
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
    // force reflow so the animation can restart on consecutive adds
    void el.offsetWidth;
    el.classList.add("bump");
    setTimeout(()=> el.classList.remove("bump"), 700);
  }
}
document.addEventListener("langchanged", updateFloatingCart);

/* ---------- Demo order storage (per-browser, presentation only) ---------- */
function getDemoOrders(){
  try{ return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }catch(e){ return []; }
}
function saveDemoOrder(order){
  const list = getDemoOrders();
  list.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
}
function getDemoOrder(id){
  return getDemoOrders().find(o=>o.id===id);
}
function nextOrderId(){
  const n = 2000 + getDemoOrders().length + 1;
  return "ORD-" + n;
}

/* ---------- Header / mobile nav / language wiring (runs on every page) ----------
   The header/footer are injected asynchronously by layout.js (after this file's
   own DOMContentLoaded callback may already have run), so all header-related
   interactions are bound with delegated listeners on `document` rather than by
   querying `.lang-switch` / `.mobile-toggle` directly on DOMContentLoaded. */
document.addEventListener("DOMContentLoaded", updateCartCount);

document.addEventListener("click", e=>{
  const langBtn = e.target.closest(".lang-switch button");
  if (langBtn){ setLang(langBtn.dataset.lang); return; }

  const mobileToggle = e.target.closest(".mobile-toggle");
  if (mobileToggle){
    const mainNav = document.querySelector("nav.main-nav");
    if (!mainNav) return;
    mainNav.classList.toggle("mobile-open");
    mainNav.style.display = mainNav.classList.contains("mobile-open") ? "flex" : "";
    if (mainNav.classList.contains("mobile-open")){
      mainNav.style.position="absolute"; mainNav.style.top="100%"; mainNav.style.left="0";
      mainNav.style.right="0"; mainNav.style.background="#fff"; mainNav.style.flexDirection="column";
      mainNav.style.padding="16px 20px"; mainNav.style.borderTop="1px solid var(--line)";
      mainNav.style.boxShadow="var(--shadow)";
    }
    return;
  }
});

// Delegated listener: the header (and its search form) is injected asynchronously
// by layout.js, so we bind this at the document level instead of querying for
// .search-bar directly on DOMContentLoaded (which can run before the header exists).
document.addEventListener("submit", e=>{
  const searchForm = e.target.closest(".search-bar");
  if (!searchForm) return;
  e.preventDefault();
  const q = searchForm.querySelector("input").value.trim();
  location.href = (location.pathname.includes("/shop/") ? "index.html" : "shop/index.html") + "?q=" + encodeURIComponent(q);
});

/* ---------- Utility: query param ---------- */
function qparam(name){
  return new URLSearchParams(location.search).get(name);
}

/* ---------- Utility: star/badge label for product tag ---------- */
function badgeLabel(badge){
  if (badge==="new") return {cls:"new", text: getLang()==="km" ? "ថ្មី" : "New"};
  if (badge==="sale") return {cls:"sale", text: getLang()==="km" ? "បញ្ចុះតម្លៃ" : "Sale"};
  return null;
}
function stockInfo(stock){
  if (stock<=0) return {cls:"out", text:t("stock_out")};
  if (stock<=5) return {cls:"low", text:t("stock_low")};
  return {cls:"in", text:t("stock_in")};
}
