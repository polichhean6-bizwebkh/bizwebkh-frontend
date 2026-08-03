/* ==========================================================================
   C033 Demo | Sokha Admin Dashboard — Shared Demo Data
   Front-end demo only. No real backend, database or API.
   ========================================================================== */
function fmt(n){ return '$' + (Math.round((n||0)*100)/100).toFixed(2); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function rand(min,max){ return Math.floor(min + Math.random()*(max-min)); }
function svgThumb(seed, hue){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="hsl(${hue},45%,80%)"/><circle cx="50" cy="42" r="18" fill="hsl(${hue},45%,95%)"/><rect x="28" y="62" width="44" height="24" rx="6" fill="hsl(${hue},45%,95%)"/></svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}
function slugPill(status){ return status.toLowerCase().replace(/[^a-z]/g,''); }
function statusPillHTML(status){ return `<span class="status-pill pill-${slugPill(status)}">${status}</span>`; }
function downloadCSV(filename, rows){
  const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  toast('Demo CSV exported: ' + filename, 'bi-download');
}
function load(key, fallback){ try{ const v = JSON.parse(localStorage.getItem(key)); return (v===null||v===undefined) ? fallback : v; }catch(e){ return fallback; } }
function save(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

const CATEGORIES = ['Supplements','Vitamins','Skincare','Makeup','Hair Care','Personal Care','Wellness','Beauty Accessories'];
const BRANDS = ['PureGlow','VitaCore','Botanica','GlowLab','NutriWell','CosmeChic','HerbaPure','DermaPlus'];
const HUES = {Supplements:35, Vitamins:15, Skincare:28, Makeup:340, 'Hair Care':25, 'Personal Care':45, Wellness:120, 'Beauty Accessories':255};
const PRODUCT_NAMES = [
  'Hydrating Vitamin C Serum','Nourishing Night Repair Cream','Gentle Foaming Cleanser','Soothing Aloe Toner','Retinol Renewal Night Oil',
  'Matte Finish Foundation','Velvet Matte Lipstick','Everyday Eyeshadow Palette','Long-Wear Liquid Eyeliner','Radiance Setting Powder',
  'Daily Multivitamin Complex','Vitamin C 1000mg Tablets','Vitamin D3 + K2 Drops','Prenatal Care Vitamins','Collagen Beauty Powder',
  'Omega-3 Fish Oil Softgels','Probiotic Digestive Support','Herbal Sleep Support Capsules','Biotin Hair Growth Capsules','Argan Oil Repair Shampoo',
  'Silk Smooth Hair Serum','Deep Conditioning Hair Mask','Gentle Body Wash — Jasmine','Whitening Roll-On Deodorant','Signature Eau de Parfum',
  'Fresh Citrus Body Mist','Herbal Detox Tea Blend','Calming Lavender Essential Oil','Electrolyte Hydration Mix','Premium Makeup Brush Set (8pc)',
  'Reusable Facial Cleansing Puffs','Compact Beauty Mirror'
];
function catForIndex(i){ return CATEGORIES[i % CATEGORIES.length]; }

let PRODUCTS = load('adm_products', PRODUCT_NAMES.map((name,i)=>{
  const cat = catForIndex(i); const price = +(8+Math.random()*30).toFixed(2); const hasPromo = Math.random()<0.3; const isPre = (i%5===4);
  return {
    id:'P'+(200+i), sku:'C033-'+(200+i), name, category:cat, brand:BRANDS[i%BRANDS.length],
    type: isPre?'Pre-Order':'Standard', price, promoPrice: hasPromo ? +(price*0.8).toFixed(2) : null,
    cost:+(price*0.45).toFixed(2), weight:+(0.1+Math.random()*0.5).toFixed(2), stock: isPre?0:rand(0,120), lowStockAlert:10,
    status: i%11===0?'Archived':(i%7===0?'Draft':'Active'), image: svgThumb(name, HUES[cat]),
    dateUpdated:`2026-0${rand(6,8)}-${String(rand(1,28)).padStart(2,'0')}`, points: Math.round(price),
    preorder: isPre ? {openDate:'2026-07-2'+(i%9), closeDate:'2026-08-2'+(i%9), expected:'September 2026', deposit:'30% Deposit'} : null
  };
}));

const CUSTOMER_NAMES = ['Sreymom Ros','Dara Phan','Chenda Vong','Sopheak Meas','Bopha Chan','Vichet Sok','Kunthea Lim','Ratanak Heng','Sopha Keo','Malis Chhun','Vanna Sam','Rithy Ouk','Sokunthea Pich','Chanthou Mao','Piseth Long'];
let CUSTOMERS = load('adm_customers', CUSTOMER_NAMES.map((name,i)=>{
  const spend = +(30+Math.random()*900).toFixed(2); const points = Math.round(spend);
  return {
    id:'CUST-'+(1000+i), name, phone:'012 '+rand(100,999)+' '+rand(100,999), email:name.toLowerCase().replace(' ','.')+'@example.com',
    orders: rand(1,18), spending:spend, points, tier: points>=4000?'Platinum':points>=1500?'Gold':points>=500?'Silver':'Member',
    lastOrder:`2026-0${rand(6,8)}-${String(rand(1,28)).padStart(2,'0')}`, status: i%9===0?'Inactive':'Active', address:`#${rand(1,200)}, St ${rand(50,400)}, Phnom Penh`
  };
}));

const STATUS_FLOW = ['Pending','Payment Confirmed','Processing','Packed','Shipped','Out for Delivery','Delivered'];
const ALL_ORDER_STATUS = STATUS_FLOW.concat(['Cancelled','Refunded']);
const ZONES = [
  {key:'pp-central', name:'Phnom Penh Central', areas:'Daun Penh, Chamkarmon, 7 Makara', baseFee:1.5, perKg:0.4, freeThreshold:35, eta:'1–2 days', status:'Active'},
  {key:'pp-outer', name:'Phnom Penh Outer District', areas:'Sen Sok, Por Sen Chey, Meanchey', baseFee:2.0, perKg:0.5, freeThreshold:0, eta:'2–3 days', status:'Active'},
  {key:'kandal', name:'Kandal', areas:'Ta Khmau, Kien Svay, Koh Thom', baseFee:2.5, perKg:0.6, freeThreshold:0, eta:'2–4 days', status:'Active'},
  {key:'provincial', name:'Provincial City', areas:'Siem Reap, Battambang, Kampong Cham', baseFee:3.5, perKg:0.8, freeThreshold:0, eta:'3–5 days', status:'Active'},
  {key:'remote', name:'Remote Province', areas:'Mondulkiri, Ratanakiri, Preah Vihear', baseFee:5.0, perKg:1.2, freeThreshold:0, eta:'5–7 days', status:'Active'}
];
const PAY_METHODS = ['KHQR','Visa','Mastercard','Cash on Delivery'];

function genOrders(n){
  const arr = [];
  for(let i=0;i<n;i++){
    const d = new Date(); d.setDate(d.getDate()-rand(0,29));
    const status = STATUS_FLOW[rand(0,7)];
    const finalStatus = Math.random()<0.06 ? 'Cancelled' : (Math.random()<0.04 ? 'Refunded' : status);
    const cust = CUSTOMERS[rand(0,CUSTOMERS.length)]; const zone = ZONES[rand(0,ZONES.length)];
    const subtotal = +(10+Math.random()*80).toFixed(2); const fee = +(zone.baseFee+zone.perKg*1.2).toFixed(2); const pay = PAY_METHODS[rand(0,4)];
    arr.push({
      orderNo:'C033-2026'+String(rand(6,8)).padStart(2,'0')+String(rand(1,28)).padStart(2,'0')+'-'+String(100+i),
      date:d.toISOString().slice(0,10), customer:cust.name, phone:cust.phone, items: rand(1,4), payment:pay,
      payStatus: finalStatus==='Cancelled'?'Failed':(finalStatus==='Refunded'?'Refunded':'Paid'),
      zone:zone.name, fee, subtotal, total:+(subtotal+fee).toFixed(2), status:finalStatus,
      tracking:'DEMO-TRK-'+rand(10000,99999), note:'', history:[{status:'Pending', date:d.toISOString().slice(0,10)}]
    });
  }
  arr.push({orderNo:'C033-20260803-001', date:'2026-08-03', customer:'Demo Customer', phone:'012 345 678', items:2,
    payment:'KHQR', payStatus:'Paid', zone:'Phnom Penh Central', fee:2.3, subtotal:55.9, total:58.2, status:'Shipped',
    tracking:'DEMO-TRK-88213', note:'Handle with care', history:[{status:'Pending',date:'2026-08-03'},{status:'Payment Confirmed',date:'2026-08-03'},{status:'Shipped',date:'2026-08-04'}]});
  return arr;
}
let ORDERS = load('adm_orders', genOrders(42));

const PREORDER_STATUS = ['Upcoming','Open','Closed','Awaiting Stock','Ready to Fulfil','Completed','Cancelled'];
let PREORDERS = load('adm_preorders', PRODUCTS.filter(p=>p.type==='Pre-Order').map((p,i)=>({
  product:p.name, customer: CUSTOMERS[i%CUSTOMERS.length].name, open:p.preorder?p.preorder.openDate:'2026-07-20', close:p.preorder?p.preorder.closeDate:'2026-08-20',
  expectedStock:p.preorder?p.preorder.expected:'September 2026', reservations:rand(2,40), qtyReserved:rand(2,60),
  depositCollected:+(rand(50,900)).toFixed(2), remainingBalance:+(rand(100,1200)).toFixed(2), status: PREORDER_STATUS[rand(0,PREORDER_STATUS.length)]
})));

let LOYALTY_TXNS = load('adm_loyalty_txns', CUSTOMERS.slice(0,10).map(c=>({date:`2026-0${rand(6,8)}-${String(rand(1,28)).padStart(2,'0')}`, customer:c.name, desc:'Purchase reward', pts:'+'+rand(10,120)})));
let PROMOTIONS = load('adm_promos', [
  {name:'Beauty Month Sale', code:'BEAUTY30', discount:'Up to 30%', start:'2026-08-01', end:'2026-08-31', status:'Active'},
  {name:'New Customer Welcome', code:'WELCOME10', discount:'10% off first order', start:'2026-07-01', end:'2026-12-31', status:'Active'},
  {name:'Vitamins Bundle Deal', code:'VITA2FOR1', discount:'Buy 2 Get 1 Free', start:'2026-06-15', end:'2026-07-31', status:'Expired'}
]);
let NOTIFICATIONS = load('adm_notifications', [
  {time:'09:12 AM', type:'Order', msg:'New order C033-20260803-045 placed by Sreymom Ros'},
  {time:'08:47 AM', type:'Stock', msg:'Low stock alert: Velvet Matte Lipstick (6 units left)'},
  {time:'08:20 AM', type:'Payment', msg:'Payment confirmed for order C033-20260803-041'},
  {time:'Yesterday', type:'Pre-Order', msg:'Pre-order window closing soon: Retinol Renewal Night Oil'},
  {time:'Yesterday', type:'Loyalty', msg:'Customer Dara Phan reached Gold tier'}
]);
let NOTIF_SETTINGS = load('adm_notif_settings', {orders:true, customers:true, promo:false});
let STORE_SETTINGS = load('adm_store_settings', {
  name:'Sokha Beauty & Wellness', currency:'USD ($)', supportEmail:'hello@sokhabeauty-demo.com', supportPhone:'+855 12 345 678',
  loyaltyPerDollar:1, loyaltyRedeemRate:100, paymentMethods:{khqr:true, visa:true, mastercard:true, cod:true}
});

function persistAll(){
  save('adm_products', PRODUCTS); save('adm_orders', ORDERS); save('adm_customers', CUSTOMERS); save('adm_preorders', PREORDERS);
  save('adm_loyalty_txns', LOYALTY_TXNS); save('adm_promos', PROMOTIONS); save('adm_notifications', NOTIFICATIONS);
  save('adm_notif_settings', NOTIF_SETTINGS); save('adm_store_settings', STORE_SETTINGS);
}
