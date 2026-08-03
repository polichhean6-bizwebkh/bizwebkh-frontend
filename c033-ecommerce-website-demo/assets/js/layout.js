/* ==========================================================================
   C033 Demo | Sokha Beauty & Wellness — Shared Layout, State & Cart Logic
   Renders header/footer on every page and exposes cart/wishlist/loyalty
   helpers used by page-specific scripts. Front-end demo only — all data is
   simulated via localStorage / in-memory arrays.
   ========================================================================== */

const LS = { cart:'c033w_cart', wishlist:'c033w_wishlist', loyalty:'c033w_loyalty', auth:'c033w_auth', orders:'c033w_orders', addresses:'c033w_addresses' };
function load(key, fallback){ try{ const v = JSON.parse(localStorage.getItem(key)); return (v===null||v===undefined) ? fallback : v; }catch(e){ return fallback; } }
function save(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

let cart = load(LS.cart, []);
let wishlist = load(LS.wishlist, []);
let loyalty = load(LS.loyalty, {points:120, history:[
  {date:'2026-07-10', desc:'Purchase — Order C033-20260710-004', pts:'+45'},
  {date:'2026-07-22', desc:'Purchase — Order C033-20260722-011', pts:'+75'}
]});
let auth = load(LS.auth, {loggedIn:false, name:'', email:''});
let addresses = load(LS.addresses, [
  {label:'Home', name:'Demo Customer', phone:'012 345 678', address:'#12, St 214', province:'Phnom Penh', district:'Chamkarmon', commune:'Tonle Bassac', zone:'pp-central'}
]);
let orders = load(LS.orders, [
  {
    orderNo: SAMPLE_ORDER_NO, date:'2026-08-03', customer:'Demo Customer', phone:'012 345 678',
    address:'#12, St 214, Tonle Bassac, Chamkarmon, Phnom Penh', courier:'Demo Express Logistics',
    trackingCode:'DEMO-TRK-88213', eta:'2026-08-06', status:'Shipped', paymentMethod:'KHQR', paymentStatus:'Paid',
    items:[{name:'Hydrating Vitamin C Serum', qty:1, price:19.9},{name:'Daily Multivitamin Complex', qty:2, price:18}],
    subtotal:55.9, shipping:2.3, discount:0, total:58.2, pointsEarned:56,
    timeline:{placed:true, confirmed:true, processing:true, packed:true, shipped:true, outfordelivery:false, delivered:false}
  }
]);
function persistState(){ save(LS.cart,cart); save(LS.wishlist,wishlist); save(LS.loyalty,loyalty); save(LS.auth,auth); save(LS.orders,orders); save(LS.addresses,addresses); }

/* ---------------- Toast ---------------- */
let toastTimer;
function toast(msg, icon){
  let el = document.getElementById('toast');
  if(!el){
    el = document.createElement('div'); el.id='toast'; el.className='toast';
    el.innerHTML = '<i class="bi bi-check-circle-fill"></i><span id="toastMsg"></span>';
    document.body.appendChild(el);
  }
  document.getElementById('toastMsg').textContent = msg;
  el.querySelector('i').className = 'bi ' + (icon||'bi-check-circle-fill');
  el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.classList.remove('show'), 2600);
}

/* ---------------- Header / Footer / Nav ---------------- */
const NAV_ITEMS = [
  {page:'home', label:'Home', href:'index.html'},
  {page:'shop', label:'Shop', href:'shop.html'},
  {page:'shop', label:'Categories', href:'shop.html'},
  {page:'shop-new', label:'New Arrivals', href:'shop.html?filter=new'},
  {page:'shop-preorder', label:'Pre-Order', href:'shop.html?filter=preorder'},
  {page:'shop-promo', label:'Promotions', href:'shop.html?filter=promo'},
  {page:'tracking', label:'Track Order', href:'tracking.html'},
  {page:'loyalty', label:'Loyalty', href:'loyalty.html'},
  {page:'about', label:'About', href:'index.html#about'},
  {page:'contact', label:'Contact', href:'index.html#contact'}
];
function renderHeader(activePage){
  const header = document.getElementById('site-header');
  if(!header) return;
  header.innerHTML = `
    <div class="demo-banner">Front-end demonstration only. Products, customers, transactions, loyalty points, shipping calculations and payments are <b>sample data</b>. Project C033 — BizWeb KH.</div>
    <div class="announce-bar">✨ Free shipping in Phnom Penh Central for orders over $35 — Demo Promotion</div>
    <header class="site-header">
      <div class="container header-top">
        <button class="mobile-menu-btn" id="mobileMenuBtn"><i class="bi bi-list"></i></button>
        <a href="index.html" class="logo"><span class="logo-badge"><i class="bi bi-flower1"></i></span><span>Sokha<small>BEAUTY &amp; WELLNESS</small></span></a>
        <div class="search-bar"><input type="text" id="headerSearch" placeholder="Search skincare, vitamins, makeup..."><button id="headerSearchBtn"><i class="bi bi-search"></i></button></div>
        <div class="header-actions">
          <div class="loyalty-chip"><i class="bi bi-gem"></i> <span id="loyaltyPtsHeader">0</span> pts</div>
          <a class="action-item" href="login.html" title="Account"><i class="bi bi-person"></i>Account</a>
          <a class="action-item" href="profile.html?tab=wishlist" title="Wishlist"><i class="bi bi-heart"></i>Wishlist<span class="badge-count" id="wishlistCount">0</span></a>
          <a class="action-item" href="cart.html" title="Cart"><i class="bi bi-bag"></i>Cart<span class="badge-count" id="cartCount">0</span></a>
        </div>
      </div>
      <nav class="main-nav"><div class="container"><ul id="mainNavList">
        ${NAV_ITEMS.map(n=>`<li><a href="${n.href}" class="${n.page===activePage?'active':''}">${n.label}</a></li>`).join('')}
      </ul></div></nav>
    </header>`;
  document.getElementById('mobileMenuBtn').addEventListener('click', ()=>document.getElementById('mainNavList').classList.toggle('open'));
  document.getElementById('headerSearchBtn').addEventListener('click', ()=>doHeaderSearch());
  document.getElementById('headerSearch').addEventListener('keydown', e=>{ if(e.key==='Enter') doHeaderSearch(); });
  function doHeaderSearch(){
    const v = document.getElementById('headerSearch').value.trim();
    window.location.href = 'shop.html' + (v? ('?q='+encodeURIComponent(v)) : '');
  }
  refreshHeaderBadges();
}
function refreshHeaderBadges(){
  const cc = document.getElementById('cartCount'); if(cc) cc.textContent = cart.reduce((s,c)=>s+c.qty,0);
  const wc = document.getElementById('wishlistCount'); if(wc) wc.textContent = wishlist.length;
  const lp = document.getElementById('loyaltyPtsHeader'); if(lp) lp.textContent = loyalty.points;
}
function renderFooter(){
  const footer = document.getElementById('site-footer');
  if(!footer) return;
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <div class="logo" style="color:#fff"><span class="logo-badge"><i class="bi bi-flower1"></i></span><span>Sokha<small style="color:#a39c8f">BEAUTY &amp; WELLNESS</small></span></div>
          <p style="margin-top:14px; font-size:.83rem; color:#b7b1a7; max-width:280px">Premium skincare, cosmetics, vitamins and supplements — demo e-commerce experience for Cambodia.</p>
          <div class="social-row"><a href="#"><i class="bi bi-facebook"></i></a><a href="#"><i class="bi bi-instagram"></i></a><a href="#"><i class="bi bi-telegram"></i></a></div>
        </div>
        <div><h5>Shop</h5><ul><li><a href="shop.html">All Products</a></li><li><a href="shop.html?filter=new">New Arrivals</a></li><li><a href="shop.html?filter=preorder">Pre-Order</a></li><li><a href="shop.html?filter=promo">Promotions</a></li></ul></div>
        <div><h5>Support</h5><ul><li><a href="tracking.html">Track Order</a></li><li><a href="loyalty.html">Loyalty Programme</a></li><li><a href="index.html#contact">Contact Us</a></li><li><a href="login.html">My Account</a></li></ul></div>
        <div><h5>Company</h5><ul><li><a href="index.html#about">About Us</a></li><li><a href="#">Privacy Policy (Demo)</a></li><li><a href="#">Terms of Service (Demo)</a></li></ul></div>
      </div>
      <div class="container footer-bottom">© 2026 Sokha Beauty &amp; Wellness — Front-end demo built by BizWeb KH for project C033. Not a live store.</div>
    </footer>`;
}
document.addEventListener('DOMContentLoaded', function(){
  const active = document.body.dataset.page || 'home';
  renderHeader(active);
  renderFooter();
});

/* ---------------- Product card rendering (shared) ---------------- */
function stockLabel(p){
  if(p.type==='preorder') return {cls:'stock-low', text:'Pre-Order Available'};
  if(p.stock<=0) return {cls:'stock-out', text:'Out of Stock'};
  if(p.stock<=8) return {cls:'stock-low', text:'Low Stock ('+p.stock+' left)'};
  return {cls:'stock-in', text:'In Stock'};
}
function badgeHTML(p){
  let out='';
  (p.badges||[]).forEach(b=>{
    if(b==='new') out+='<span class="badge badge-new">New</span>';
    if(b==='best') out+='<span class="badge badge-best">Best Seller</span>';
    if(b==='sale') out+='<span class="badge badge-sale">Sale</span>';
    if(b==='pre') out+='<span class="badge badge-pre">Pre-Order</span>';
  });
  if(p.type!=='preorder' && p.stock>0 && p.stock<=8) out+='<span class="badge badge-low">Low Stock</span>';
  return out;
}
function starHTML(rating){ const full = Math.round(rating); let s=''; for(let i=0;i<5;i++) s += `<i class="bi ${i<full?'bi-star-fill':'bi-star'}"></i>`; return s; }
function productCard(p){
  const st = stockLabel(p);
  const inWishlist = wishlist.includes(p.id);
  return `<div class="prod-card" data-id="${p.id}">
    <a href="product.html?id=${p.id}" class="prod-media">
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="imgFallback(this,'${CAT_NAME[p.category]}')">
      <div class="prod-badges">${badgeHTML(p)}</div>
    </a>
    <div class="prod-quick">
      <button class="wish-btn ${inWishlist?'active':''}" title="Wishlist" data-action="wishlist" data-id="${p.id}"><i class="bi ${inWishlist?'bi-heart-fill':'bi-heart'}"></i></button>
    </div>
    <div class="prod-body">
      <div class="prod-cat">${CAT_NAME[p.category]}</div>
      <a href="product.html?id=${p.id}"><div class="prod-name">${p.name}</div></a>
      <div class="prod-rating">${starHTML(p.rating)} <span>${p.rating.toFixed(1)} (${p.reviews})</span></div>
      <div class="prod-price"><span class="price-now">${fmt(p.promoPrice||p.price)}</span>${p.promoPrice?`<span class="price-old">${fmt(p.price)}</span>`:''}</div>
      <div class="prod-stock ${st.cls}">${st.text}</div>
      <div class="prod-actions">
        ${p.type==='preorder'
          ? `<a class="btn btn-gold" href="product.html?id=${p.id}">Reserve Pre-Order</a>`
          : `<button class="btn btn-primary" data-action="addcart" data-id="${p.id}" ${p.stock<=0?'disabled':''}>${p.stock<=0?'Out of Stock':'Add to Cart'}</button>`}
      </div>
    </div>
  </div>`;
}
function renderGrid(elId, list){
  const el = document.getElementById(elId); if(!el) return;
  el.innerHTML = list.map(productCard).join('') || '<div class="empty-state"><i class="bi bi-emoji-frown"></i>No products found.</div>';
}
document.addEventListener('click', function(e){
  const btn = e.target.closest('[data-action]');
  if(!btn) return;
  const action = btn.dataset.action, id = btn.dataset.id;
  if(action==='addcart'){ addToCart(id,1); }
  if(action==='wishlist'){ toggleWishlist(id, btn); }
});

/* ---------------- Wishlist ---------------- */
function toggleWishlist(id, btn){
  const idx = wishlist.indexOf(id);
  if(idx>-1){ wishlist.splice(idx,1); toast('Removed from wishlist','bi-heart'); }
  else { wishlist.push(id); toast('Added to wishlist','bi-heart-fill'); }
  persistState(); refreshHeaderBadges();
  if(btn){ btn.classList.toggle('active'); const i=btn.querySelector('i'); if(i) i.className = 'bi ' + (wishlist.includes(id)?'bi-heart-fill':'bi-heart'); }
}

/* ---------------- Cart ---------------- */
function addToCart(id, qty){
  const p = findProduct(id); if(!p) return;
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty += qty; else cart.push({id, qty});
  persistState(); refreshHeaderBadges();
  toast(p.name + ' added to cart', 'bi-bag-check-fill');
}
function cartLines(){ return cart.map(c=>({p:findProduct(c.id), qty:c.qty})).filter(l=>l.p); }
function cartSubtotal(){ return cartLines().reduce((s,l)=>s+(l.p.promoPrice||l.p.price)*l.qty,0); }
function cartWeight(){ return cartLines().reduce((s,l)=>s+l.p.weight*l.qty,0); }

/* ---------------- Shipping calc ---------------- */
function shippingCalc(zoneKey, redeemPts, discount){
  const subtotal = cartSubtotal(); const weight = cartWeight();
  const zone = ZONES.find(z=>z.key===zoneKey) || ZONES[0];
  const weightFee = +(weight*zone.perKg).toFixed(2);
  let zoneFee = zone.baseFee, freeApplied=false;
  if(zone.freeThreshold && subtotal>=zone.freeThreshold){ zoneFee=0; freeApplied=true; }
  const loyaltyDiscount = (redeemPts||0)/100;
  const total = Math.max(0, subtotal+weightFee+zoneFee-(discount||0)-loyaltyDiscount);
  return {subtotal, weight, zone, weightFee, zoneFee, freeApplied, loyaltyDiscount, total};
}
function dateStr(){ const d=new Date(); return d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0'); }
function addDays(d,n){ const r=new Date(d); r.setDate(r.getDate()+n); return r.toISOString().slice(0,10); }
