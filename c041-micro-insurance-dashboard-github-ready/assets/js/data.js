/* ==========================================================================
   MicroSure Cambodia — Dashboard Demo Default Content
   Mirrors the website demo's default content model so both demos can share
   the same localStorage key ("msc_content") when hosted on the same origin
   (e.g. GitHub Pages). All content below is sample data for demonstration.
   ========================================================================== */

/* Local images only — same optimized SVG set used by the public website,
   so nothing here depends on third-party image services. */
const IMG = {
  heroHome: "assets/images/hero-home.svg",
  familyAsian: "assets/images/family-protection.svg",
  smallBusiness: "assets/images/small-business.svg",
  farmer: "assets/images/farmer-agriculture.svg",
  motorbikeRider: "assets/images/motorbike-rider.svg",
  healthCheckup: "assets/images/health-checkup.svg",
  communityLife: "assets/images/community-outreach.svg",
  consultation: "assets/images/consultation.svg",
  customerService: "assets/images/customer-service.svg",
  whyChooseUs: "assets/images/why-choose-us.svg",
};

const DEFAULT_CONTENT = {
  brand: {
    name: "MicroSure Cambodia",
    tagline: "Protection Made Simple",
    phone: "+855 23 900 123",
    telegram: "@MicroSureKH",
    email: "hello@microsurekh.demo",
    address: "3rd Floor, Street 271, Sangkat Toul Tumpoung, Phnom Penh, Cambodia",
    hours: "Monday – Friday, 8:00 AM – 5:30 PM (closed on public holidays)",
    facebook: "facebook.com/MicroSureCambodiaDemo",
    mapUrl: "https://www.google.com/maps?q=Phnom+Penh,Cambodia&output=embed"
  },
  homepage: {
    heroTitle: "Protection Made Simple for Everyday Life",
    heroSubtitle: "Affordable protection designed for individuals, families and small businesses across Cambodia.",
    heroImage: IMG.heroHome,
    ctaText: "Explore Insurance Plans",
    featuredProductIds: ["personal-accident","family-protection","motorbike-cover","business-protection"],
    featuredPromotionId: "promo-newyear",
    featuredNewsIds: ["news-1","news-2","news-3"]
  },
  products: [
    { id:"personal-accident", name:"Personal Accident Insurance", category:"Personal", image: IMG.motorbikeRider, shortDesc:"Everyday protection against unexpected accidents and injuries for individuals.", highlights:["Covers accidental injury & hospitalization","Simple enrollment, no medical exam","Affordable monthly contribution"], eligibility:"Individuals aged 18–60. Sample eligibility for demo purposes.", cta:"Ask About This Plan", status:"Published" },
    { id:"family-protection", name:"Family Protection Plan", category:"Family", image: IMG.familyAsian, shortDesc:"A shared protection plan that gives your whole family peace of mind.", highlights:["Covers spouse & children","Flexible household contribution","Friendly local support team"], eligibility:"Families with up to 5 members. Sample eligibility for demo purposes.", cta:"Ask About This Plan", status:"Published" },
    { id:"health-support", name:"Health Support Plan", category:"Health", image: IMG.healthCheckup, shortDesc:"Basic support toward clinic visits and everyday health needs.", highlights:["Support toward outpatient visits","Partner clinic network (sample)","Easy renewal each year"], eligibility:"Open to individuals and families. Sample eligibility for demo purposes.", cta:"Ask About This Plan", status:"Published" },
    { id:"business-protection", name:"Micro Business Protection", category:"Business", image: IMG.smallBusiness, shortDesc:"Helping small business and market vendors recover from unexpected setbacks.", highlights:["Covers small shop & stall owners","Support after fire, theft or damage","Designed for micro-entrepreneurs"], eligibility:"Registered and informal small businesses. Sample eligibility for demo purposes.", cta:"Ask About This Plan", status:"Published" },
    { id:"motorbike-cover", name:"Motorbike Accident Cover", category:"Personal", image: IMG.motorbikeRider, shortDesc:"Everyday coverage built for Cambodia's motorbike riders and commuters.", highlights:["Accident-related injury support","Affordable daily-life protection","Fast, friendly claims guidance"], eligibility:"Licensed motorbike riders. Sample eligibility for demo purposes.", cta:"Ask About This Plan", status:"Published" },
    { id:"agriculture-protection", name:"Agriculture / Farmer Protection", category:"Agriculture", image: IMG.farmer, shortDesc:"Support designed around the realities of farming families and rural livelihoods.", highlights:["Built for farming households","Seasonal contribution options","Local community support network"], eligibility:"Farming individuals & households. Sample eligibility for demo purposes.", cta:"Ask About This Plan", status:"Hidden" }
  ],
  promotions: [
    { id:"promo-newyear", title:"Khmer New Year Family Protection Offer", image: IMG.communityLife, description:"Enroll a Family Protection Plan this season and receive a reduced first-term contribution. Sample promotional content for demo purposes.", start:"2026-04-01", end:"2026-04-30", status:"active" },
    { id:"promo-harvest", title:"Harvest Season Farmer Protection Campaign", image: IMG.farmer, description:"An upcoming outreach campaign to introduce Agriculture Protection to farming communities in Kampong Cham and Battambang. Sample content for demo purposes.", start:"2026-10-01", end:"2026-11-15", status:"upcoming" },
    { id:"promo-launch", title:"Community Launch Week Offer", image: IMG.consultation, description:"Our original community launch promotion, offered when MicroSure Cambodia first introduced Personal Accident coverage. Sample archived campaign for demo purposes.", start:"2025-11-01", end:"2025-11-30", status:"expired" }
  ],
  news: [
    { id:"news-1", title:"MicroSure Cambodia Expands Community Outreach to Kampong Speu", category:"Community", date:"2026-07-18", image: IMG.communityLife, excerpt:"Our team visited rural communities to share information about affordable protection options for families and small businesses.", content:"Our outreach team spent the week meeting with families, market vendors and farming households in Kampong Speu province. Sample article content for demonstration purposes.", status:"Published" },
    { id:"news-2", title:"Understanding Your Coverage: A Simple Guide for New Customers", category:"Education", date:"2026-06-30", image: IMG.consultation, excerpt:"A plain-language explainer to help everyday customers understand how protection plans work before they enroll.", content:"Many first-time customers have questions about how coverage works day to day. Sample article content for demonstration purposes.", status:"Published" },
    { id:"news-3", title:"MicroSure Cambodia Joins Local Business Association Event", category:"Company News", date:"2026-06-12", image: IMG.smallBusiness, excerpt:"Representatives joined a small business association event in Phnom Penh to discuss protection options for micro-entrepreneurs.", content:"Small business owners across Phnom Penh gathered to discuss common risks facing market vendors and shop owners. Sample article content for demonstration purposes.", status:"Published" },
    { id:"news-4", title:"Five Tips Before You Ride: Everyday Safety for Motorbike Commuters", category:"Safety", date:"2026-05-22", image: IMG.motorbikeRider, excerpt:"Simple daily habits that can help keep motorbike commuters safer on the road.", content:"From helmet checks to route planning, small daily habits can make a real difference. Sample article content for demonstration purposes.", status:"Draft" }
  ],
  faq: [
    { q:"What is Personal Accident Insurance and who is it for?", a:"It is everyday protection that supports individuals if they experience an accidental injury. Sample demo answer.", cat:"General Insurance", status:"Published" },
    { q:"Do I need a medical exam to enroll?", a:"No medical exam is required for most of our sample plans shown in this demo.", cat:"General Insurance", status:"Published" },
    { q:"What does my coverage actually include?", a:"Coverage varies by plan and is summarized on each product page.", cat:"Coverage", status:"Published" },
    { q:"Can I cover my whole family under one plan?", a:"Yes — the Family Protection Plan is designed to cover a household of up to five members.", cat:"Coverage", status:"Published" },
    { q:"How do I start a claim?", a:"For this demo, claims guidance is informational only.", cat:"Claims", status:"Published" },
    { q:"What documents are typically needed for a claim?", a:"Typical sample documents may include a completed claim form and valid ID.", cat:"Claims", status:"Published" },
    { q:"How much does coverage cost?", a:"Pricing will be confirmed directly with the client's team.", cat:"Payments / Premium Information", status:"Draft" },
    { q:"How can I reach customer support?", a:"You can reach our sample support team by phone, Telegram or email.", cat:"Contact & Support", status:"Published" }
  ],
  gallery: [
    { id:"g1", image: IMG.communityLife, caption:"Community outreach session in Kampong Speu", category:"Outreach" },
    { id:"g2", image: IMG.consultation, caption:"One-on-one consultation with a local family", category:"Consultation" },
    { id:"g3", image: IMG.smallBusiness, caption:"Meeting with market vendors in Phnom Penh", category:"Outreach" },
    { id:"g4", image: IMG.farmer, caption:"Farmer protection awareness visit", category:"Outreach" },
    { id:"g5", image: IMG.customerService, caption:"Our support team at the service desk", category:"Team" },
    { id:"g6", image: IMG.whyChooseUs, caption:"Team briefing before a community event", category:"Team" }
  ]
};

const DEFAULT_META = {
  pages: [
    { id:"home", name:"Home", status:"Published", updated:"2026-08-05" },
    { id:"about", name:"About Us", status:"Published", updated:"2026-07-28" },
    { id:"benefits-claims", name:"Benefits / Claims Information", status:"Published", updated:"2026-07-20" },
    { id:"contact", name:"Contact Us", status:"Published", updated:"2026-08-01" }
  ],
  pageContent: {
    home: { title:"Home", heading:"Protection Made Simple for Everyday Life", body:"Affordable protection designed for individuals, families and small businesses across Cambodia.", image: IMG.heroHome },
    about: { title:"About Us", heading:"About MicroSure Cambodia", body:"Simple, honest protection built around everyday Cambodian life.", image:"assets/images/hero-about.svg" },
    "benefits-claims": { title:"Benefits & Claims Information", heading:"Understanding Your Protection", body:"An informational overview of how coverage works. This page does not process real claims.", image:"assets/images/hero-benefits.svg" },
    contact: { title:"Contact Us", heading:"Reach Our Friendly Team", body:"We're happy to answer your questions about coverage.", image:"assets/images/hero-contact.svg" }
  },
  media: [
    { name:"hero-motorbike-family.jpg", url: IMG.heroHome, date:"2026-08-05", size:"412 KB" },
    { name:"family-protection.jpg", url: IMG.familyAsian, date:"2026-07-30", size:"388 KB" },
    { name:"market-vendor.jpg", url: IMG.smallBusiness, date:"2026-07-22", size:"301 KB" },
    { name:"farmer-field.jpg", url: IMG.farmer, date:"2026-07-15", size:"355 KB" },
    { name:"motorbike-rider.jpg", url: IMG.motorbikeRider, date:"2026-07-10", size:"290 KB" },
    { name:"clinic-checkup.jpg", url: IMG.healthCheckup, date:"2026-07-02", size:"334 KB" },
    { name:"community-outreach.jpg", url: IMG.communityLife, date:"2026-06-28", size:"402 KB" },
    { name:"advisor-consultation.jpg", url: IMG.consultation, date:"2026-06-20", size:"270 KB" }
  ],
  settings: {
    websiteName: "MicroSure Cambodia",
    defaultLanguage: "English",
    khmerEnabled: true,
    englishEnabled: true,
    seoTitle: "MicroSure Cambodia — Protection Made Simple",
    metaDescription: "Affordable, simple insurance protection for individuals, families and small businesses in Cambodia."
  },
  activity: [
    { text:"Homepage hero image updated", when:"2026-08-10 3:14 PM", type:"page" },
    { text:"Promotion \"Khmer New Year Family Protection Offer\" published", when:"2026-08-08 11:02 AM", type:"promo" },
    { text:"News article \"MicroSure Cambodia Expands Community Outreach\" added", when:"2026-08-05 9:40 AM", type:"news" },
    { text:"Contact information updated", when:"2026-08-01 4:22 PM", type:"contact" }
  ]
};

function getContent(){
  try{ return deepMerge(DEFAULT_CONTENT, JSON.parse(localStorage.getItem('msc_content')||'{}')); }
  catch(e){ return DEFAULT_CONTENT; }
}
function saveContent(content){
  localStorage.setItem('msc_content', JSON.stringify(content));
}
function getMeta(){
  try{ return deepMerge(DEFAULT_META, JSON.parse(localStorage.getItem('msc_meta')||'{}')); }
  catch(e){ return DEFAULT_META; }
}
function saveMeta(meta){
  localStorage.setItem('msc_meta', JSON.stringify(meta));
}
function deepMerge(base, override){
  if(!override || typeof override !== 'object') return base;
  const out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
  Object.keys(override).forEach(k=>{
    if(Array.isArray(override[k])) out[k] = override[k];
    else if(typeof override[k] === 'object' && override[k] !== null && typeof base[k] === 'object') out[k] = deepMerge(base[k], override[k]);
    else out[k] = override[k];
  });
  return out;
}
function logActivity(text, type){
  const meta = getMeta();
  meta.activity.unshift({ text, when: new Date().toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}), type: type||'page' });
  meta.activity = meta.activity.slice(0,12);
  saveMeta(meta);
}
