/* ==========================================================================
   MicroSure Cambodia — Default Demo Content
   This is sample data only, used to power the CMS-style demo.
   The Dashboard demo can override this via localStorage key "msc_content".
   ========================================================================== */

/* All images are local files under assets/images/ (lightweight SVG illustrations)
   so nothing depends on third-party image services that can go down or block
   requests. Paths are relative — safe for local file:// use and GitHub Pages. */
const IMG = {
  heroHome: "assets/images/hero-home.svg",
  heroAbout: "assets/images/hero-about.svg",
  heroProducts: "assets/images/hero-products.svg",
  heroBenefits: "assets/images/hero-benefits.svg",
  heroPromotions: "assets/images/hero-promotions.svg",
  heroNews: "assets/images/hero-news.svg",
  heroFaq: "assets/images/hero-faq.svg",
  heroGallery: "assets/images/hero-gallery.svg",
  heroContact: "assets/images/hero-contact.svg",

  familyAsian: "assets/images/family-protection.svg",
  smallBusiness: "assets/images/small-business.svg",
  farmer: "assets/images/farmer-agriculture.svg",
  motorbikeRider: "assets/images/motorbike-rider.svg",
  workers: "assets/images/small-business.svg",
  healthCheckup: "assets/images/health-checkup.svg",
  accidentSupport: "assets/images/motorbike-rider.svg",
  propertyProtect: "assets/images/small-business.svg",
  communityLife: "assets/images/community-outreach.svg",
  consultation: "assets/images/consultation.svg",
  customerService: "assets/images/customer-service.svg",
  whyChooseUs: "assets/images/why-choose-us.svg",
  friendlySupport: "assets/images/thumb-friendly-support.svg",
  affordable: "assets/images/thumb-affordable.svg",
  simpleCoverage: "assets/images/thumb-simple-coverage.svg",
  communityDesign: "assets/images/thumb-community-design.svg",
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
    {
      id: "personal-accident",
      name: "Personal Accident Insurance",
      category: "Personal",
      image: IMG.motorbikeRider,
      shortDesc: "Everyday protection against unexpected accidents and injuries for individuals.",
      highlights: ["Covers accidental injury & hospitalization", "Simple enrollment, no medical exam", "Affordable monthly contribution"],
      eligibility: "Individuals aged 18–60. Sample eligibility for demo purposes.",
      cta: "Ask About This Plan",
      status: "Published"
    },
    {
      id: "family-protection",
      name: "Family Protection Plan",
      category: "Family",
      image: IMG.familyAsian,
      shortDesc: "A shared protection plan that gives your whole family peace of mind.",
      highlights: ["Covers spouse & children", "Flexible household contribution", "Friendly local support team"],
      eligibility: "Families with up to 5 members. Sample eligibility for demo purposes.",
      cta: "Ask About This Plan",
      status: "Published"
    },
    {
      id: "health-support",
      name: "Health Support Plan",
      category: "Health",
      image: IMG.healthCheckup,
      shortDesc: "Basic support toward clinic visits and everyday health needs.",
      highlights: ["Support toward outpatient visits", "Partner clinic network (sample)", "Easy renewal each year"],
      eligibility: "Open to individuals and families. Sample eligibility for demo purposes.",
      cta: "Ask About This Plan",
      status: "Published"
    },
    {
      id: "business-protection",
      name: "Micro Business Protection",
      category: "Business",
      image: IMG.smallBusiness,
      shortDesc: "Helping small business and market vendors recover from unexpected setbacks.",
      highlights: ["Covers small shop & stall owners", "Support after fire, theft or damage", "Designed for micro-entrepreneurs"],
      eligibility: "Registered and informal small businesses. Sample eligibility for demo purposes.",
      cta: "Ask About This Plan",
      status: "Published"
    },
    {
      id: "motorbike-cover",
      name: "Motorbike Accident Cover",
      category: "Personal",
      image: IMG.motorbikeRider,
      shortDesc: "Everyday coverage built for Cambodia's motorbike riders and commuters.",
      highlights: ["Accident-related injury support", "Affordable daily-life protection", "Fast, friendly claims guidance"],
      eligibility: "Licensed motorbike riders. Sample eligibility for demo purposes.",
      cta: "Ask About This Plan",
      status: "Published"
    },
    {
      id: "agriculture-protection",
      name: "Agriculture / Farmer Protection",
      category: "Agriculture",
      image: IMG.farmer,
      shortDesc: "Support designed around the realities of farming families and rural livelihoods.",
      highlights: ["Built for farming households", "Seasonal contribution options", "Local community support network"],
      eligibility: "Farming individuals & households. Sample eligibility for demo purposes.",
      cta: "Ask About This Plan",
      status: "Published"
    }
  ],

  promotions: [
    {
      id: "promo-newyear",
      title: "Khmer New Year Family Protection Offer",
      image: IMG.communityLife,
      description: "Enroll a Family Protection Plan this season and receive a reduced first-term contribution. Sample promotional content for demo purposes.",
      start: "2026-04-01",
      end: "2026-04-30",
      status: "active"
    },
    {
      id: "promo-harvest",
      title: "Harvest Season Farmer Protection Campaign",
      image: IMG.farmer,
      description: "An upcoming outreach campaign to introduce Agriculture Protection to farming communities in Kampong Cham and Battambang. Sample content for demo purposes.",
      start: "2026-10-01",
      end: "2026-11-15",
      status: "upcoming"
    },
    {
      id: "promo-launch",
      title: "Community Launch Week Offer",
      image: IMG.consultation,
      description: "Our original community launch promotion, offered when MicroSure Cambodia first introduced Personal Accident coverage. Sample archived campaign for demo purposes.",
      start: "2025-11-01",
      end: "2025-11-30",
      status: "expired"
    }
  ],

  news: [
    {
      id: "news-1",
      title: "MicroSure Cambodia Expands Community Outreach to Kampong Speu",
      category: "Community",
      date: "2026-07-18",
      image: IMG.communityLife,
      excerpt: "Our team visited rural communities to share information about affordable protection options for families and small businesses.",
      content: "Our outreach team spent the week meeting with families, market vendors and farming households in Kampong Speu province to explain how simple protection plans work and answer everyday questions about coverage. Sessions were held in local community halls with translation support and printed guides in Khmer. This is sample article content for demonstration purposes."
    },
    {
      id: "news-2",
      title: "Understanding Your Coverage: A Simple Guide for New Customers",
      category: "Education",
      date: "2026-06-30",
      image: IMG.consultation,
      excerpt: "A plain-language explainer to help everyday customers understand how protection plans work before they enroll.",
      content: "Many first-time customers have questions about how coverage works day to day. In this guide, our team breaks down enrollment, what documents are typically needed, and how to reach support when you need it. Sample article content for demonstration purposes."
    },
    {
      id: "news-3",
      title: "MicroSure Cambodia Joins Local Business Association Event",
      category: "Company News",
      date: "2026-06-12",
      image: IMG.smallBusiness,
      excerpt: "Representatives joined a small business association event in Phnom Penh to discuss protection options for micro-entrepreneurs.",
      content: "Small business owners across Phnom Penh gathered to discuss common risks facing market vendors and shop owners. MicroSure Cambodia shared how Micro Business Protection is designed with everyday entrepreneurs in mind. Sample article content for demonstration purposes."
    },
    {
      id: "news-4",
      title: "Five Tips Before You Ride: Everyday Safety for Motorbike Commuters",
      category: "Safety",
      date: "2026-05-22",
      image: IMG.motorbikeRider,
      excerpt: "Simple daily habits that can help keep motorbike commuters safer on the road.",
      content: "From helmet checks to route planning, small daily habits can make a real difference for motorbike commuters. This article shares simple, practical safety reminders alongside information about accident protection. Sample article content for demonstration purposes."
    }
  ],

  faq: [
    { q: "What is Personal Accident Insurance and who is it for?", a: "It is everyday protection that supports individuals if they experience an accidental injury. It is designed to be simple and affordable for ordinary customers. Sample demo answer.", cat: "General Insurance" },
    { q: "Do I need a medical exam to enroll?", a: "No medical exam is required for most of our sample plans shown in this demo. Actual requirements will be confirmed by the client's final product terms.", cat: "General Insurance" },
    { q: "What does my coverage actually include?", a: "Coverage varies by plan and is summarized on each product page under 'Key Coverage Highlights'. This demo shows sample coverage points only.", cat: "Coverage" },
    { q: "Can I cover my whole family under one plan?", a: "Yes — the Family Protection Plan is designed to cover a household of up to five members in this sample demo.", cat: "Coverage" },
    { q: "How do I start a claim?", a: "For this demo, claims guidance is informational only. Please see the Benefits / Claims Information page for a sample step-by-step overview.", cat: "Claims" },
    { q: "What documents are typically needed for a claim?", a: "Typical sample documents may include a completed claim form, valid ID, and supporting documentation. This is demo guidance only and not a live claims system.", cat: "Claims" },
    { q: "How much does coverage cost?", a: "Pricing will be confirmed directly with the client's team. This demo does not display or process real premium amounts.", cat: "Payments / Premium Information" },
    { q: "How do I pay my premium?", a: "Payment methods will be confirmed by the client. This demo does not include online payment processing.", cat: "Payments / Premium Information" },
    { q: "How can I reach customer support?", a: "You can reach our sample support team by phone, Telegram or email — details are on the Contact Us page.", cat: "Contact & Support" },
    { q: "Is this website able to process real purchases?", a: "No — this is a demonstration website only. Online purchase, checkout and payment features are outside the current package.", cat: "Contact & Support" }
  ],

  gallery: [
    { id:"g1", image: IMG.communityLife, caption: "Community outreach session in Kampong Speu", category: "Outreach" },
    { id:"g2", image: IMG.consultation, caption: "One-on-one consultation with a local family", category: "Consultation" },
    { id:"g3", image: IMG.smallBusiness, caption: "Meeting with market vendors in Phnom Penh", category: "Outreach" },
    { id:"g4", image: IMG.farmer, caption: "Farmer protection awareness visit", category: "Outreach" },
    { id:"g5", image: IMG.customerService, caption: "Our support team at the service desk", category: "Team" },
    { id:"g6", image: IMG.whyChooseUs, caption: "Team briefing before a community event", category: "Team" },
    { id:"g7", image: IMG.motorbikeRider, caption: "Safety awareness activity for commuters", category: "Awareness" },
    { id:"g8", image: IMG.familyAsian, caption: "Family day at a community awareness event", category: "Community" },
    { id:"g9", image: IMG.healthCheckup, caption: "Health awareness partnership visit", category: "Awareness" }
  ]
};

function getContent(){
  try{
    const stored = JSON.parse(localStorage.getItem('msc_content') || '{}');
    return deepMerge(DEFAULT_CONTENT, stored);
  }catch(e){
    return DEFAULT_CONTENT;
  }
}
function deepMerge(base, override){
  if(!override || typeof override !== 'object') return base;
  const out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
  Object.keys(override).forEach(k=>{
    if(Array.isArray(override[k])){
      out[k] = override[k];
    } else if(typeof override[k] === 'object' && override[k] !== null && typeof base[k] === 'object'){
      out[k] = deepMerge(base[k], override[k]);
    } else {
      out[k] = override[k];
    }
  });
  return out;
}
