/* =======================================================
   C043 - Kanharoth Cosmetics Demo — Demo Data
   All data below is FAKE / DEMO data for presentation only.
   Option 1 scope: catalog + CMS/Admin + Telegram inquiry only.
   Telegram inquiry and order confirmation only.
   ======================================================= */

/* ---------- Categories ---------- */
const CATEGORIES = [
  {id:"skincare", key:"cat_skincare", shape:"dropper"},
  {id:"haircare", key:"cat_haircare", shape:"bottle"},
  {id:"bodycare", key:"cat_bodycare", shape:"jar"},
  {id:"accessories", key:"cat_accessories", shape:"pouch"},
];

/* ---------- Products with prepared real photography ---------- */
const PRODUCTS = [
  {id:"P001", name:"Rose Glow Facial Cleanser", nameKm:"សាប៊ូលាងមុខ Rose Glow", category:"skincare", shape:"tube", price:11.5, sale:null, badge:"new", desc:"A gentle gel cleanser with rose extract that lifts away impurities while keeping skin soft and balanced.", sku:"SK-1001", stock:32, photo:"img03.jpg"},
  {id:"P002", name:"Brightening Essence Toner", nameKm:"តូនិចធ្វើឲ្យស Brightening Essence", category:"skincare", shape:"bottle", price:14.9, sale:12.9, badge:"sale", desc:"An alcohol-free toner with niacinamide that refines pores and evens out skin tone with daily use.", sku:"SK-1002", stock:18, photo:"img16.jpg"},
  {id:"P003", name:"Hydrating Skin Serum", nameKm:"សេរ៉ូមផ្តល់សំណើម Hydrating Skin Serum", category:"skincare", shape:"dropper", price:19.9, sale:null, badge:"best", desc:"A lightweight hyaluronic acid serum that delivers deep hydration and a naturally dewy finish.", sku:"SK-1003", stock:26, photo:"img02.jpg"},
  {id:"P004", name:"Velvet Moisture Day Cream", nameKm:"ក្រែមថែរក្សាសំណើម Velvet Moisture", category:"skincare", shape:"jar", price:16.5, sale:null, badge:null, desc:"A silky day cream that locks in moisture for up to 24 hours without feeling heavy on the skin.", sku:"SK-1004", stock:21, photo:"img14.jpg"},
  {id:"P005", name:"Daily UV Defense SPF 50", nameKm:"ក្រែមការពារកម្តៅថ្ងៃ SPF 50", category:"skincare", shape:"bottle", price:15.9, sale:null, badge:"best", desc:"A lightweight, non-greasy sunscreen with SPF 50 PA+++ that layers beautifully under makeup.", sku:"SK-1005", stock:4, photo:"img12.jpg"},
  {id:"P006", name:"Overnight Repair Sleeping Mask", nameKm:"ម៉ាស់ថែរក្សាមុខពេលយប់", category:"skincare", shape:"jar", price:18.9, sale:15.9, badge:"sale", desc:"A restorative overnight mask that visibly smooths and replenishes skin while you sleep.", sku:"SK-1006", stock:15, photo:"img05.jpg"},
  {id:"P007", name:"Calming Centella Gel Cream", nameKm:"ក្រែម Centella សម្រាប់ស្បែកប្រតិកម្ម", category:"skincare", shape:"jar", price:13.9, sale:null, badge:"new", desc:"A soothing gel-cream with centella asiatica that calms redness and comforts sensitive skin.", sku:"SK-1007", stock:23, photo:"img17.jpg"},
  {id:"P008", name:"Vitamin C Radiance Drops", nameKm:"សេរ៉ូម Vitamin C ធ្វើឲ្យមុខភ្លឺថ្លា", category:"skincare", shape:"dropper", price:21.5, sale:null, badge:null, desc:"A brightening vitamin C concentrate that helps fade dullness and even out skin tone over time.", sku:"SK-1008", stock:3, photo:"img18.jpg"},
  {id:"P009", name:"Silk Repair Shampoo", nameKm:"ស្ពៃស្ក់ជួសជុល Silk Repair", category:"haircare", shape:"bottle", price:10.9, sale:null, badge:"best", desc:"A nourishing shampoo that repairs damaged strands and leaves hair soft, smooth and manageable.", sku:"HC-2001", stock:29, photo:"img13.jpg"},
  {id:"P010", name:"Silk Repair Conditioner", nameKm:"ក្រែមបន្ទន់សក់ Silk Repair", category:"haircare", shape:"bottle", price:10.9, sale:null, badge:null, desc:"A rich conditioner formulated to pair with Silk Repair Shampoo for deeply nourished hair.", sku:"HC-2002", stock:27, photo:"img04.jpg"},
  {id:"P011", name:"Argan Oil Hair Serum", nameKm:"ប្រេងសក់ Argan Oil Serum", category:"haircare", shape:"dropper", price:13.5, sale:11.5, badge:"sale", desc:"A lightweight finishing serum with argan oil that tames frizz and adds a healthy shine.", sku:"HC-2003", stock:19, photo:"img06.jpg"},
  {id:"P012", name:"Scalp Detox Clarifying Shampoo", nameKm:"ស្ពៃស្ក់សម្អាតស្បែកក្បាល", category:"haircare", shape:"bottle", price:12.9, sale:null, badge:"new", desc:"A clarifying shampoo that gently removes buildup and refreshes the scalp between washes.", sku:"HC-2004", stock:17, photo:"img07.jpg"},
  {id:"P013", name:"Rose Water Hair Mist", nameKm:"ទឹកអប់សក់ Rose Water Mist", category:"haircare", shape:"spray", price:9.9, sale:null, badge:null, desc:"A refreshing leave-in mist that softens hair and leaves a delicate rose scent throughout the day.", sku:"HC-2005", stock:2, photo:"img19.jpg"},
  {id:"P014", name:"Keratin Smooth Hair Mask", nameKm:"ម៉ាស់សក់ Keratin Smooth", category:"haircare", shape:"jar", price:14.5, sale:null, badge:null, desc:"A weekly deep-conditioning mask with keratin that restores softness to dry or damaged hair.", sku:"HC-2006", stock:20, photo:"img05.jpg"},
  {id:"P015", name:"Velvet Moisture Body Lotion", nameKm:"ក្រែមលាបខ្លួន Velvet Moisture", category:"bodycare", shape:"bottle", price:12.5, sale:null, badge:"best", desc:"A fast-absorbing body lotion that leaves skin feeling silky-soft without a greasy residue.", sku:"BC-3001", stock:24, photo:"img11.jpg"},
  {id:"P016", name:"Shea Butter Body Cream", nameKm:"ក្រែម Shea Butter សម្រាប់ខ្លួន", category:"bodycare", shape:"jar", price:15.5, sale:13.5, badge:"sale", desc:"A rich, whipped body cream with shea butter for deeply nourished, comfortable skin all day.", sku:"BC-3002", stock:16, photo:"img20.jpg"},
  {id:"P017", name:"Brightening Body Wash", nameKm:"សាប៊ូងូតទឹកធ្វើឲ្យស្បែកភ្លឺថ្លា", category:"bodycare", shape:"bottle", price:9.5, sale:null, badge:null, desc:"A creamy body wash with niacinamide that gently cleanses while brightening skin tone.", sku:"BC-3003", stock:30, photo:"img09.jpg"},
  {id:"P018", name:"Coconut Milk Body Scrub", nameKm:"ក្រែមខាត់ស្បែក Coconut Milk", category:"bodycare", shape:"jar", price:13.9, sale:null, badge:"new", desc:"A gentle exfoliating scrub that buffs away dullness, leaving skin smooth and radiant.", sku:"BC-3004", stock:14, photo:"img08.jpg"},
  {id:"P019", name:"Rose Hand Cream Duo", nameKm:"ក្រែមលាបដៃ Rose Hand Cream", category:"bodycare", shape:"tube", price:8.9, sale:null, badge:null, desc:"A pair of travel-friendly hand creams with rose extract, perfect for on-the-go hydration.", sku:"BC-3005", stock:4, photo:"img03.jpg"},
  {id:"P022", name:"Rose Gold Facial Roller", nameKm:"ឧបករណ៍កួច Rose Gold Roller", category:"accessories", shape:"stick", price:11.9, sale:null, badge:"best", desc:"A cooling facial roller that helps de-puff and promote a relaxed, radiant complexion.", sku:"AC-4003", stock:12, photo:"img15.jpg"},
];
/* Only products backed by prepared real photography appear in the customer catalog. */
PRODUCTS.forEach(p=>{
  p.img = "images/" + p.photo;
  p.images = [p.img];
});

/* Grouped hero photography — used for homepage hero showcase and About page visual */
const HERO_GROUP_IMAGE = "images/img01.jpg";
const ABOUT_GROUP_IMAGE = "images/img10.jpg";

/* ---------- Demo orders (admin only — fulfillment status tracking) ---------- */
const ORDER_STATUSES = ["new","confirmed","preparing","ready","completed","cancelled"];
function buildDemoOrders(){
  const byId = Object.fromEntries(PRODUCTS.map(p=>[p.id,p]));
  const raw = [
    {id:"ORD-1001", name:"Sokha Dara", phone:"012 345 678", date:"2026-08-20", note:"Please deliver after 5pm", status:"completed", items:[["P003",1],["P016",1]]},
    {id:"ORD-1002", name:"Chan Sreymom", phone:"@sreymom_cs", date:"2026-08-20", note:"", status:"completed", items:[["P009",2],["P010",2]]},
    {id:"ORD-1003", name:"Vanna Pich", phone:"016 778 231", date:"2026-08-21", note:"Gift wrap if possible", status:"completed", items:[["P005",1],["P002",1],["P022",1]]},
    {id:"ORD-1004", name:"Ratana Sok", phone:"@ratana.sok", date:"2026-08-22", note:"", status:"ready", items:[["P007",1]]},
    {id:"ORD-1005", name:"Sopheak Kim", phone:"017 902 456", date:"2026-08-22", note:"Call before delivery", status:"preparing", items:[["P013",1],["P011",1]]},
    {id:"ORD-1006", name:"Bopha Chea", phone:"@bopha_beauty", date:"2026-08-23", note:"", status:"preparing", items:[["P008",1],["P004",1]]},
    {id:"ORD-1007", name:"Dara Meas", phone:"012 556 890", date:"2026-08-23", note:"Leave with security guard", status:"confirmed", items:[["P015",2]]},
    {id:"ORD-1008", name:"Kunthea Ly", phone:"@kunthea.ly", date:"2026-08-24", note:"", status:"confirmed", items:[["P018",1],["P016",1]]},
    {id:"ORD-1009", name:"Sreyneang Vong", phone:"098 213 447", date:"2026-08-24", note:"Asked about Vitamin C serum first", status:"new", items:[["P008",1]]},
    {id:"ORD-1010", name:"Piseth Ouk", phone:"@piseth_o", date:"2026-08-25", note:"", status:"new", items:[["P022",1],["P001",1]]},
    {id:"ORD-1011", name:"Channary Him", phone:"011 674 328", date:"2026-08-25", note:"Wants delivery to Toul Kork", status:"new", items:[["P009",1],["P010",1],["P014",1]]},
    {id:"ORD-1012", name:"Maly Nou", phone:"@maly.nou", date:"2026-08-19", note:"Changed mind, cancelled", status:"cancelled", items:[["P006",1]]},
  ];
  return raw.map(o=>{
    const items = o.items.map(([pid,qty])=>{
      const p = byId[pid];
      const price = p ? (p.sale || p.price) : 0;
      return { productId: pid, name: p ? p.name : pid, nameKm: p ? p.nameKm : pid, qty, price, lineTotal: price*qty };
    });
    const total = items.reduce((s,i)=>s+i.lineTotal,0);
    return { ...o, items, total };
  });
}
const ORDERS = buildDemoOrders();

/* ---------- Helpers ---------- */
function money(n){ return "$" + Number(n).toFixed(2); }
