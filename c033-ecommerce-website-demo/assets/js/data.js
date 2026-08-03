/* ==========================================================================
   C033 Demo | Sokha Beauty & Wellness — Shared Demo Data
   Front-end demo only. No real backend, database or API.
   ========================================================================== */

/* ---------- Image fallback (never show a broken image) ---------- */
const FALLBACK_HUES = {
  Supplements:['#C6A25D','#8a6a33'], Vitamins:['#E8C9C6','#a9645f'], Skincare:['#F4DCC9','#b98247'],
  Makeup:['#E8C9C6','#8a3f45'], 'Hair Care':['#D9C7B8','#6b4a2f'], 'Personal Care':['#EFE3D3','#7a6a4f'],
  Wellness:['#CBD9C6','#3f5f45'], 'Beauty Accessories':['#D6D4F0','#4a4a8a'], default:['#EFE3D3','#8a6a33']
};
function svgPlaceholder(label, cat){
  const c = FALLBACK_HUES[cat] || FALLBACK_HUES.default;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c[0]}"/><stop offset="100%" stop-color="${c[1]}"/></linearGradient></defs>
    <rect width="500" height="500" fill="url(#g)"/><circle cx="250" cy="200" r="70" fill="rgba(255,255,255,.35)"/>
    <rect x="150" y="290" width="200" height="110" rx="18" fill="rgba(255,255,255,.28)"/>
    <text x="250" y="450" font-family="Poppins,Arial" font-size="22" fill="#fff" text-anchor="middle" opacity=".9">${label}</text></svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}
function imgFallback(el, cat){ el.onerror = null; el.src = svgPlaceholder(cat || 'Sokha Demo', cat); }

/* ---------- Categories / Brands ---------- */
const CATEGORIES = [
  {key:'supplements', name:'Supplements', icon:'bi-capsule'},
  {key:'vitamins', name:'Vitamins', icon:'bi-egg-fried'},
  {key:'skincare', name:'Skincare', icon:'bi-droplet'},
  {key:'makeup', name:'Makeup', icon:'bi-palette'},
  {key:'haircare', name:'Hair Care', icon:'bi-magic'},
  {key:'personalcare', name:'Personal Care', icon:'bi-basket'},
  {key:'wellness', name:'Wellness', icon:'bi-heart-pulse'},
  {key:'accessories', name:'Beauty Accessories', icon:'bi-bag-heart'}
];
const CAT_NAME = {}; CATEGORIES.forEach(c=>CAT_NAME[c.key]=c.name);
const BRANDS = ['PureGlow','VitaCore','Botanica','GlowLab','NutriWell','CosmeChic','HerbaPure','DermaPlus'];

const IMG = {
  skincare1:'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=75',
  skincare2:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=75',
  skincare3:'https://images.unsplash.com/photo-1512207736890-6ffed5679394?auto=format&fit=crop&w=700&q=75',
  skincare4:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=75',
  makeup1:'https://images.unsplash.com/photo-1585232004423-99396105a1a9?auto=format&fit=crop&w=700&q=75',
  makeup2:'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=700&q=75',
  makeup3:'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=700&q=75',
  makeup4:'https://images.unsplash.com/photo-1585652757141-8250b39d7261?auto=format&fit=crop&w=700&q=75',
  supp1:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=75',
  supp2:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=75',
  supp3:'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=700&q=75',
  supp4:'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=700&q=75',
  hair1:'https://images.unsplash.com/photo-1590156206657-6a08cdc0b0dd?auto=format&fit=crop&w=700&q=75',
  perfume1:'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=700&q=75',
  perfume2:'https://images.unsplash.com/photo-1600428877878-1a0fd85beda8?auto=format&fit=crop&w=700&q=75',
  cream1:'https://images.unsplash.com/photo-1583241800698-9c2e0104c9b7?auto=format&fit=crop&w=700&q=75',
  cosm1:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=75'
};
function img(key,cat){ return IMG[key] || svgPlaceholder(cat,cat); }

let _pid = 100;
function P(o){
  _pid++;
  const rating = o.rating || (4 + Math.round(Math.random()*10)/10);
  return Object.assign({
    id:'P'+_pid, sku:'C033-'+_pid, rating: Math.min(rating,5), reviews: 8+Math.floor(Math.random()*180),
    weight: o.weight || 0.3, points: Math.round((o.promoPrice||o.price)*1),
    images:[o.image, o.image2||o.image], stock: o.stock===undefined ? (10+Math.floor(Math.random()*80)) : o.stock,
    description: o.description || 'A carefully formulated product designed to support your daily beauty and wellness routine.',
    benefits: o.benefits || ['Daily nutrition support','Beauty care routine essential','Convenient everyday use'],
    ingredients: o.ingredients || 'See product packaging for full ingredient list. Consult a qualified professional before use if pregnant, nursing, or under medical care.',
    usage: o.usage || 'Use as directed on packaging. Consult a qualified professional where appropriate.',
    deliveryEstimate:'2–5 business days depending on delivery zone (demo estimate)'
  }, o);
}

const PRODUCTS = [
  P({name:'Hydrating Vitamin C Serum', category:'skincare', brand:'PureGlow', type:'standard', price:24.5, promoPrice:19.9, image:img('skincare1','skincare'), badges:['sale'], weight:0.25, description:'A lightweight brightening serum for daily beauty care routines.'}),
  P({name:'Nourishing Night Repair Cream', category:'skincare', brand:'DermaPlus', type:'standard', price:32, image:img('skincare2','skincare'), badges:['best'], weight:0.35}),
  P({name:'Gentle Foaming Cleanser', category:'skincare', brand:'PureGlow', type:'standard', price:16, image:img('cream1','skincare'), badges:['new'], weight:0.3}),
  P({name:'Soothing Aloe Toner', category:'skincare', brand:'Botanica', type:'standard', price:14.5, image:img('skincare3','skincare'), weight:0.4}),
  P({name:'Retinol Renewal Night Oil', category:'skincare', brand:'DermaPlus', type:'preorder', price:38, image:img('skincare4','skincare'), badges:['pre'], weight:0.2, stock:0,
     preorder:{openDate:'2026-07-15', closeDate:'2026-08-20', expectedAvailability:'Mid September 2026', estimatedDelivery:'20–30 days after availability', depositLabel:'30% Deposit (Demo)', limitedBatch:'Limited to first 150 reservations (demo)'}}),
  P({name:'Matte Finish Foundation', category:'makeup', brand:'CosmeChic', type:'standard', price:22, promoPrice:17.5, image:img('makeup1','makeup'), badges:['sale'], weight:0.25}),
  P({name:'Velvet Matte Lipstick', category:'makeup', brand:'CosmeChic', type:'standard', price:12, image:img('makeup4','makeup'), badges:['best'], weight:0.1, stock:6}),
  P({name:'Everyday Eyeshadow Palette', category:'makeup', brand:'CosmeChic', type:'standard', price:26, image:img('makeup3','makeup'), badges:['new'], weight:0.3}),
  P({name:'Long-Wear Liquid Eyeliner', category:'makeup', brand:'GlowLab', type:'standard', price:9.5, image:img('makeup2','makeup'), weight:0.05}),
  P({name:'Radiance Setting Powder', category:'makeup', brand:'GlowLab', type:'preorder', price:19, image:img('cosm1','makeup'), badges:['pre'], weight:0.15, stock:0,
     preorder:{openDate:'2026-08-01', closeDate:'2026-08-25', expectedAvailability:'Late September 2026', estimatedDelivery:'25–35 days after availability', depositLabel:'Full Payment (Demo)', limitedBatch:'Limited first-batch import (demo)'}}),
  P({name:'Daily Multivitamin Complex', category:'vitamins', brand:'VitaCore', type:'standard', price:18, image:img('supp1','vitamins'), badges:['best'], weight:0.4, description:'Daily nutrition support formulated with essential vitamins.'}),
  P({name:'Vitamin C 1000mg Tablets', category:'vitamins', brand:'VitaCore', type:'standard', price:12.5, image:img('supp2','vitamins'), weight:0.35}),
  P({name:'Vitamin D3 + K2 Drops', category:'vitamins', brand:'NutriWell', type:'standard', price:15, image:img('supp3','vitamins'), badges:['new'], weight:0.2}),
  P({name:'Prenatal Care Vitamins', category:'vitamins', brand:'VitaCore', type:'standard', price:21, image:img('supp4','vitamins'), weight:0.4, description:'Daily nutrition support for prenatal wellness routines. Consult a qualified professional before use.'}),
  P({name:'Collagen Beauty Powder', category:'supplements', brand:'NutriWell', type:'standard', price:29, promoPrice:23.9, image:img('supp1','supplements'), badges:['sale'], weight:0.5}),
  P({name:'Omega-3 Fish Oil Softgels', category:'supplements', brand:'VitaCore', type:'standard', price:17.5, image:img('supp2','supplements'), badges:['best'], weight:0.45}),
  P({name:'Probiotic Digestive Support', category:'supplements', brand:'NutriWell', type:'standard', price:20, image:img('supp3','supplements'), weight:0.3}),
  P({name:'Herbal Sleep Support Capsules', category:'supplements', brand:'HerbaPure', type:'preorder', price:16.5, image:img('supp4','supplements'), badges:['pre'], weight:0.25, stock:0,
     preorder:{openDate:'2026-07-20', closeDate:'2026-08-18', expectedAvailability:'Early September 2026', estimatedDelivery:'15–25 days after availability', depositLabel:'50% Deposit (Demo)', limitedBatch:'Limited batch of 200 units (demo)'}}),
  P({name:'Biotin Hair Growth Capsules', category:'haircare', brand:'HerbaPure', type:'standard', price:19.5, image:img('hair1','haircare'), badges:['best'], weight:0.3}),
  P({name:'Argan Oil Repair Shampoo', category:'haircare', brand:'Botanica', type:'standard', price:13.5, image:img('hair1','haircare'), weight:0.5}),
  P({name:'Silk Smooth Hair Serum', category:'haircare', brand:'Botanica', type:'standard', price:15.9, image:img('hair1','haircare'), badges:['new'], weight:0.15}),
  P({name:'Deep Conditioning Hair Mask', category:'haircare', brand:'Botanica', type:'standard', price:18, image:img('hair1','haircare'), weight:0.4}),
  P({name:'Gentle Body Wash — Jasmine', category:'personalcare', brand:'PureGlow', type:'standard', price:8.5, image:img('cream1','personalcare'), weight:0.6}),
  P({name:'Whitening Roll-On Deodorant', category:'personalcare', brand:'PureGlow', type:'standard', price:6, image:img('cream1','personalcare'), weight:0.2}),
  P({name:'Signature Eau de Parfum', category:'personalcare', brand:'CosmeChic', type:'standard', price:34, promoPrice:27.9, image:img('perfume1','personalcare'), badges:['sale'], weight:0.3}),
  P({name:'Fresh Citrus Body Mist', category:'personalcare', brand:'CosmeChic', type:'standard', price:11, image:img('perfume2','personalcare'), badges:['new'], weight:0.25}),
  P({name:'Herbal Detox Tea Blend', category:'wellness', brand:'HerbaPure', type:'standard', price:9.9, image:img('supp3','wellness'), weight:0.2, description:'A calming herbal blend to complement a daily wellness routine.'}),
  P({name:'Calming Lavender Essential Oil', category:'wellness', brand:'Botanica', type:'standard', price:13, image:img('supp4','wellness'), badges:['best'], weight:0.15}),
  P({name:'Electrolyte Hydration Mix', category:'wellness', brand:'NutriWell', type:'preorder', price:14.5, image:img('supp1','wellness'), badges:['pre'], weight:0.3, stock:0,
     preorder:{openDate:'2026-08-05', closeDate:'2026-09-01', expectedAvailability:'Early October 2026', estimatedDelivery:'20–30 days after availability', depositLabel:'30% Deposit (Demo)', limitedBatch:'Limited seasonal batch (demo)'}}),
  P({name:'Premium Makeup Brush Set (8pc)', category:'accessories', brand:'CosmeChic', type:'standard', price:22, image:img('makeup1','accessories'), weight:0.35}),
  P({name:'Reusable Facial Cleansing Puffs', category:'accessories', brand:'PureGlow', type:'standard', price:7.5, image:img('cream1','accessories'), badges:['new'], weight:0.1}),
  P({name:'Compact Beauty Mirror', category:'accessories', brand:'GlowLab', type:'standard', price:9, image:img('cosm1','accessories'), weight:0.2})
];
function findProduct(id){ return PRODUCTS.find(p=>p.id===id); }

/* ---------- Delivery zones ---------- */
const ZONES = [
  {key:'pp-central', name:'Phnom Penh Central', baseFee:1.5, perKg:0.4, eta:'1–2 days', freeThreshold:35},
  {key:'pp-outer', name:'Phnom Penh Outer District', baseFee:2.0, perKg:0.5, eta:'2–3 days', freeThreshold:0},
  {key:'kandal', name:'Kandal', baseFee:2.5, perKg:0.6, eta:'2–4 days', freeThreshold:0},
  {key:'provincial', name:'Provincial City', baseFee:3.5, perKg:0.8, eta:'3–5 days', freeThreshold:0},
  {key:'remote', name:'Remote Province', baseFee:5.0, perKg:1.2, eta:'5–7 days', freeThreshold:0}
];

/* ---------- Auth / loyalty / sample orders ---------- */
const DEMO_CUSTOMER = {email:'customer@c033demo.com', password:'demo123', name:'Demo Customer'};
const SAMPLE_ORDER_NO = 'C033-20260803-001';

function fmt(n){ return '$'+(Math.round((n||0)*100)/100).toFixed(2); }
function tierFor(pts){ if(pts>=4000) return 'Platinum'; if(pts>=1500) return 'Gold'; if(pts>=500) return 'Silver'; return 'Member'; }
function nextTierInfo(pts){
  const t=[[500,'Silver'],[1500,'Gold'],[4000,'Platinum']];
  for(const [th,name] of t){ if(pts<th) return {need:th-pts, name, pct:Math.round(pts/th*100)}; }
  return {need:0, name:'Platinum (Max Tier)', pct:100};
}
