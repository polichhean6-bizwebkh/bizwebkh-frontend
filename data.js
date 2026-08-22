/* =======================================================
   C043 - Kanharoth E-Commerce Demo — Demo Data
   All data below is FAKE / DEMO data for presentation only.
   ======================================================= */

/* ---------- Placeholder image generator (no external images needed) ---------- */
const CAT_COLORS = {
  home:        {bg:"#fbe9d9", fg:"#b8611f", icon:"🏠"},
  kitchen:     {bg:"#fdeceb", fg:"#c0392b", icon:"🍳"},
  beauty:      {bg:"#f1ecfb", fg:"#7a4fc9", icon:"💄"},
  electronics: {bg:"#e9f2fb", fg:"#2563a8", icon:"🔌"},
  accessories: {bg:"#e9f9ef", fg:"#1f9d55", icon:"👜"},
  other:       {bg:"#fff6df", fg:"#b98900", icon:"🎁"},
};
function placeholderImg(category, label){
  const c = CAT_COLORS[category] || CAT_COLORS.other;
  const initials = (label||"").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <rect width='400' height='400' fill='${c.bg}'/>
    <text x='200' y='185' font-size='90' text-anchor='middle' font-family='Arial'>${c.icon}</text>
    <text x='200' y='260' font-size='34' text-anchor='middle' font-family='Arial, sans-serif' font-weight='700' fill='${c.fg}'>${initials}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* ---------- Categories ---------- */
const CATEGORIES = [
  {id:"home", key:"cat_home", icon:"🏠"},
  {id:"kitchen", key:"cat_kitchen", icon:"🍳"},
  {id:"beauty", key:"cat_beauty", icon:"💄"},
  {id:"electronics", key:"cat_electronics", icon:"🔌"},
  {id:"accessories", key:"cat_accessories", icon:"👜"},
  {id:"other", key:"cat_other", icon:"🎁"},
];

/* ---------- Products (25) ---------- */
const PRODUCTS = [
  {id:"P001", name:"Bamboo Storage Basket Set (3pcs)", nameKm:"កញ្ជើឫស្សីសម្រាប់ដាក់របស់ (៣ក្បាល)", category:"home", price:14.5, sale:null, stock:32, badge:"new", desc:"Handwoven bamboo baskets, great for organizing shelves and closets.", sku:"HM-1001"},
  {id:"P002", name:"Cotton Throw Pillow Cover", nameKm:"ស្រោមខ្នើយកប្បាស", category:"home", price:5.9, sale:4.5, stock:60, badge:"sale", desc:"Soft cotton cushion cover, machine washable, 45x45cm.", sku:"HM-1002"},
  {id:"P003", name:"LED Desk Lamp with USB Charging", nameKm:"អំពូលតុ LED មានច្រក USB", category:"home", price:16.9, sale:null, stock:18, badge:null, desc:"Adjustable brightness LED lamp with built-in USB charging port.", sku:"HM-1003"},
  {id:"P004", name:"Wall Clock Minimalist Design", nameKm:"នាឡិកាជញ្ជាំងម៉ូតសាមញ្ញ", category:"home", price:9.9, sale:null, stock:4, badge:"low", desc:"Silent quartz wall clock, 30cm diameter, modern design.", sku:"HM-1004"},
  {id:"P005", name:"Non-Stick Frying Pan 28cm", nameKm:"ខ្ទះមិនស្អិត ២៨សម", category:"kitchen", price:12.5, sale:10.9, stock:25, badge:"sale", desc:"Durable non-stick coating, suitable for gas and induction stoves.", sku:"KT-2001"},
  {id:"P006", name:"Stainless Steel Knife Set (5pcs)", nameKm:"កាំបិតដែកអ៊ីណុក ៥ ដើម", category:"kitchen", price:19.9, sale:null, stock:22, badge:null, desc:"Sharp stainless steel kitchen knives with wooden block stand.", sku:"KT-2002"},
  {id:"P007", name:"Electric Rice Cooker 1.8L", nameKm:"ឆ្នាំងអង្ករអគ្គិសនី ១.៨លីត្រ", category:"kitchen", price:24.0, sale:null, stock:15, badge:"new", desc:"Automatic keep-warm function, non-stick inner pot, 1.8L capacity.", sku:"KT-2003"},
  {id:"P008", name:"Glass Food Storage Set (5pcs)", nameKm:"ប្រអប់ដាក់ម្ហូបកញ្ចក់ ៥ ដើម", category:"kitchen", price:15.5, sale:null, stock:0, badge:"out", desc:"Airtight glass containers, microwave and oven safe.", sku:"KT-2004"},
  {id:"P009", name:"Bamboo Cutting Board", nameKm:"ក្តារកាត់ឫស្សី", category:"kitchen", price:6.5, sale:null, stock:40, badge:null, desc:"Eco-friendly bamboo cutting board, knife-friendly surface.", sku:"KT-2005"},
  {id:"P010", name:"Facial Cleanser Gentle Foam 150ml", nameKm:"ជែលលាងមុខទន់ភ្លន់ ១៥០មល", category:"beauty", price:7.9, sale:6.9, stock:50, badge:"sale", desc:"Gentle daily facial cleanser suitable for sensitive skin.", sku:"BT-3001"},
  {id:"P011", name:"Vitamin C Brightening Serum", nameKm:"សេរ៉ូម Vitamin C ធ្វើឲ្យស", category:"beauty", price:13.9, sale:null, stock:28, badge:"new", desc:"Brightening serum with Vitamin C for radiant skin.", sku:"BT-3002"},
  {id:"P012", name:"Herbal Shampoo 400ml", nameKm:"ស្ពៃស្ក់ជាមួយសារធាតុរុក្ខជាតិ ៤០០មល", category:"beauty", price:5.5, sale:null, stock:65, badge:null, desc:"Natural herbal shampoo for daily use, all hair types.", sku:"BT-3003"},
  {id:"P013", name:"Sunscreen SPF50 PA+++", nameKm:"ក្រែមការពារកម្តៅថ្ងៃ SPF50", category:"beauty", price:9.5, sale:null, stock:3, badge:"low", desc:"Lightweight sunscreen, non-greasy formula, SPF50 PA+++.", sku:"BT-3004"},
  {id:"P014", name:"Lip Balm Set (3 colors)", nameKm:"ក្រែមលាបបបូរមាត់ (៣ពណ៌)", category:"beauty", price:6.9, sale:5.5, stock:34, badge:"sale", desc:"Moisturizing tinted lip balm set, 3 shades included.", sku:"BT-3005"},
  {id:"P015", name:"Wireless Bluetooth Earbuds", nameKm:"កាស Bluetooth ឥតខ្សែ", category:"electronics", price:22.9, sale:18.9, stock:20, badge:"sale", desc:"Bluetooth 5.3, noise isolation, 20-hour battery with charging case.", sku:"EL-4001"},
  {id:"P016", name:"Power Bank 10000mAh", nameKm:"ថ្មបញ្ចូលចល័ត ១០០០០mAh", category:"electronics", price:15.9, sale:null, stock:30, badge:null, desc:"Fast-charging power bank with dual USB output.", sku:"EL-4002"},
  {id:"P017", name:"Smart LED Bulb (WiFi)", nameKm:"អំពូល LED ឆ្លាតវៃ (WiFi)", category:"electronics", price:8.9, sale:null, stock:26, badge:"new", desc:"App-controlled smart bulb, 16 million colors, voice control ready.", sku:"EL-4003"},
  {id:"P018", name:"Portable Bluetooth Speaker", nameKm:"ឧបករណ៍បំពងសំឡេង Bluetooth ចល័ត", category:"electronics", price:19.5, sale:null, stock:12, badge:null, desc:"Waterproof portable speaker with 10-hour playtime.", sku:"EL-4004"},
  {id:"P019", name:"Phone Tripod Stand with Remote", nameKm:"ជើងសទ្ធរទូរស័ព្ទមានឧបករណ៍បញ្ជាពីចម្ងាយ", category:"electronics", price:11.9, sale:9.9, stock:2, badge:"low", desc:"Adjustable tripod stand with Bluetooth remote shutter, great for content creators.", sku:"EL-4005"},
  {id:"P020", name:"Leather Crossbody Bag", nameKm:"កាបូបស្ពាយស្បែក", category:"accessories", price:26.0, sale:null, stock:16, badge:"new", desc:"Premium PU leather crossbody bag with adjustable strap.", sku:"AC-5001"},
  {id:"P021", name:"Men's Canvas Belt", nameKm:"ខ្សែក្រវាត់បុរស Canvas", category:"accessories", price:8.5, sale:null, stock:38, badge:null, desc:"Durable canvas belt with alloy buckle, adjustable length.", sku:"AC-5002"},
  {id:"P022", name:"Sunglasses UV400 Protection", nameKm:"វែនតារំបាំងកញ្ចក់ UV400", category:"accessories", price:10.9, sale:8.9, stock:24, badge:"sale", desc:"Stylish unisex sunglasses with full UV400 protection.", sku:"AC-5003"},
  {id:"P023", name:"Stainless Steel Watch", nameKm:"នាឡិកាដៃដែកអ៊ីណុក", category:"accessories", price:29.9, sale:null, stock:9, badge:null, desc:"Classic stainless steel wristwatch, water resistant.", sku:"AC-5004"},
  {id:"P024", name:"Kids Backpack Cartoon Print", nameKm:"កាបូបសិស្សលាយកាតូន", category:"other", price:12.9, sale:null, stock:20, badge:"new", desc:"Lightweight school backpack for kids, cute cartoon prints.", sku:"OT-6001"},
  {id:"P025", name:"Reusable Shopping Bag Set (3pcs)", nameKm:"កាបូបទិញឥវ៉ាន់កែច្នៃប្រើឡើងវិញ ៣ ដើម", category:"other", price:4.9, sale:null, stock:70, badge:null, desc:"Foldable eco-friendly shopping bags, machine washable.", sku:"OT-6002"},
];
PRODUCTS.forEach(p=>{
  p.img = placeholderImg(p.category, p.name);
  p.images = [p.img, placeholderImg(p.category, p.name), placeholderImg(p.category, p.name)];
});

/* ---------- Demo customers (8) ---------- */
const CUSTOMERS = [
  {id:"C01", name:"Sok Dara", phone:"012 345 678", email:"sok.dara@example.com", province:"Phnom Penh"},
  {id:"C02", name:"Chan Sreymom", phone:"016 789 234", email:"srey.mom@example.com", province:"Siem Reap"},
  {id:"C03", name:"Pich Vibol", phone:"017 456 890", email:"vibol.p@example.com", province:"Battambang"},
  {id:"C04", name:"Heng Sopha", phone:"098 234 567", email:"sopha.h@example.com", province:"Phnom Penh"},
  {id:"C05", name:"Ly Chenda", phone:"070 112 233", email:"chenda.ly@example.com", province:"Kandal"},
  {id:"C06", name:"Kim Sovann", phone:"011 998 776", email:"sovann.kim@example.com", province:"Kampong Cham"},
  {id:"C07", name:"Ros Panha", phone:"093 456 112", email:"panha.ros@example.com", province:"Phnom Penh"},
  {id:"C08", name:"Meas Bopha", phone:"015 667 890", email:"bopha.meas@example.com", province:"Sihanoukville"},
];

/* ---------- Provinces ---------- */
const PROVINCES = ["Phnom Penh","Siem Reap","Battambang","Kandal","Kampong Cham","Kampong Speu","Sihanoukville","Kampot","Takeo","Prey Veng","Other"];

/* ---------- Order status flow ---------- */
const ORDER_STATUSES = ["new","confirmed","preparing","completed","cancelled"];
const PAYMENT_STATUSES = ["pending","paid","failed"];

/* ---------- Demo orders (13) generated from products/customers ---------- */
function buildDemoOrders(){
  const seed = [
    {id:"ORD-1001", cust:"C01", items:[["P015",1],["P016",2]], pay:"khqr", payStatus:"paid", status:"completed", day:-9},
    {id:"ORD-1002", cust:"C02", items:[["P005",1]], pay:"cod", payStatus:"pending", status:"new", day:-1},
    {id:"ORD-1003", cust:"C03", items:[["P010",2],["P014",1]], pay:"khqr", payStatus:"paid", status:"completed", day:-3},
    {id:"ORD-1004", cust:"C04", items:[["P020",1]], pay:"khqr", payStatus:"paid", status:"confirmed", day:-2},
    {id:"ORD-1005", cust:"C05", items:[["P003",1],["P004",1]], pay:"bank", payStatus:"pending", status:"new", day:0},
    {id:"ORD-1006", cust:"C06", items:[["P007",1]], pay:"khqr", payStatus:"failed", status:"cancelled", day:-6},
    {id:"ORD-1007", cust:"C07", items:[["P022",1],["P023",1]], pay:"khqr", payStatus:"paid", status:"preparing", day:-1},
    {id:"ORD-1008", cust:"C08", items:[["P001",2]], pay:"cod", payStatus:"pending", status:"confirmed", day:-2},
    {id:"ORD-1009", cust:"C01", items:[["P017",3]], pay:"khqr", payStatus:"paid", status:"completed", day:-14},
    {id:"ORD-1010", cust:"C02", items:[["P006",1],["P009",1]], pay:"khqr", payStatus:"paid", status:"preparing", day:-1},
    {id:"ORD-1011", cust:"C03", items:[["P011",1],["P013",1]], pay:"bank", payStatus:"paid", status:"completed", day:-4},
    {id:"ORD-1012", cust:"C05", items:[["P024",1],["P025",2]], pay:"khqr", payStatus:"pending", status:"new", day:0},
    {id:"ORD-1013", cust:"C06", items:[["P018",1]], pay:"khqr", payStatus:"paid", status:"completed", day:-11},
  ];
  const productMap = Object.fromEntries(PRODUCTS.map(p=>[p.id,p]));
  const custMap = Object.fromEntries(CUSTOMERS.map(c=>[c.id,c]));
  return seed.map(o=>{
    const cust = custMap[o.cust];
    const items = o.items.map(([pid,qty])=>{
      const p = productMap[pid];
      const price = p.sale || p.price;
      return {id:p.id, name:p.name, nameKm:p.nameKm, qty, price, img:p.img};
    });
    const subtotal = items.reduce((s,i)=>s+i.price*i.qty,0);
    const delivery = o.pay==="cod" ? 1.5 : 1.0;
    const total = +(subtotal+delivery).toFixed(2);
    const d = new Date(); d.setDate(d.getDate()+o.day);
    return {
      id:o.id, customer:cust.name, phone:cust.phone, email:cust.email, province:cust.province,
      address: (o.cust.charCodeAt(1)%2===0?"#12, St. 240, ":"House 45, St. 63, ") + cust.province,
      items, subtotal:+subtotal.toFixed(2), delivery, total,
      payment:o.pay, paymentStatus:o.payStatus, status:o.status,
      date: d.toISOString(), note: ""
    };
  });
}
const ORDERS = buildDemoOrders();

/* ---------- Demo payments derived from orders ---------- */
function buildDemoPayments(){
  return ORDERS.map((o,i)=>({
    id:"PAY-"+(2001+i),
    orderId:o.id,
    customer:o.customer,
    method:o.payment,
    amount:o.total,
    status:o.paymentStatus,
    date:o.date
  }));
}
const PAYMENTS = buildDemoPayments();

/* ---------- Helpers ---------- */
function money(n){ return "$" + Number(n).toFixed(2); }
function fmtDate(iso, lang){
  const d = new Date(iso);
  return d.toLocaleDateString(lang==="km" ? "en-GB" : "en-US", {year:"numeric", month:"short", day:"2-digit"});
}
function statusLabel(s){ return t("status_"+s); }
function payLabel(s){ return t("pay_"+s); }
