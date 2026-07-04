const TELEGRAM_USERNAME = "TELEGRAM_USERNAME"; // Replace TELEGRAM_USERNAME with official CEO Center Telegram username.
const MAPS_URL = "https://share.google/z2ObmME8C6EP1CiOD";

const translations = {
  en: {
    "nav.home": "Home",
    "nav.overview": "Overview",
    "nav.residences": "Residences",
    "nav.hotel": "Wyndham Hotel",
    "nav.offices": "Offices",
    "nav.amenities": "Amenities",
    "nav.location": "Location",
    "nav.contact": "Contact",
    "buttons.contactSales": "Contact Sales",
    "buttons.exploreProject": "Explore Project",
    "buttons.askResidences": "Ask About Residences",
    "buttons.askHotel": "Ask About Hotel Units",
    "buttons.askOffices": "Ask About Offices",
    "buttons.requestPlans": "Request Floor Plans",
    "buttons.openMaps": "Open Google Maps",
    "buttons.telegram": "Telegram",
    "buttons.callSales": "Call Sales",
    "hero.eyebrow": "Premium mixed-use destination",
    "hero.title": "CEO Center",
    "hero.subtitle": "A Premium Mixed-Use Landmark in Phnom Penh",
    "hero.text": "Discover residences, Wyndham hotel units, smart offices, lifestyle amenities, and investment opportunities in one strategic destination.",
    "hero.panelLabel": "Project Scope",
    "hero.panelTitle": "Residences + Hotel + Offices",
    "hero.panelText": "A one-page introduction for buyers, renters, investors, office tenants, and agents.",
    "overview.eyebrow": "Project overview",
    "overview.title": "A strategic address for living, business, hospitality, and investment.",
    "overview.text": "CEO Center brings multiple property uses together in one premium Phnom Penh destination, supported by strong building visuals, international positioning, and flexible inquiry paths.",
    "overview.card1Title": "Mixed-Use Landmark",
    "overview.card1Text": "A corporate-luxury destination combining lifestyle, hospitality, and business functions.",
    "overview.card2Title": "Wyndham Hotel Units",
    "overview.card2Text": "Hotel-style units connected to the Wyndham hospitality concept.",
    "overview.card3Title": "Premium Residences",
    "overview.card3Text": "Residence options for city living, long-term stay, and ownership inquiry.",
    "overview.card4Title": "Smart Office Units",
    "overview.card4Text": "Flexible office spaces for companies and professional investors.",
    "overview.card5Title": "Central Phnom Penh Location",
    "overview.card5Text": "Strategically positioned near key government, shopping, and business destinations.",
    "residences.eyebrow": "Residences",
    "residences.title": "Premium residence options for modern city living.",
    "residences.text": "Premium residence options designed for city living, long-term stay, and investment opportunities.",
    "hotel.eyebrow": "Wyndham Hotel Units",
    "hotel.title": "Hotel-style units for managed property opportunities.",
    "hotel.text": "Hotel-style units supported by the Wyndham hospitality concept, suitable for buyers and investors seeking managed property opportunities.",
    "offices.eyebrow": "Office Units",
    "offices.title": "A professional business address in Phnom Penh.",
    "offices.text": "Flexible office spaces positioned for companies, entrepreneurs, and investors seeking a professional business address in Phnom Penh.",
    "common.pricing": "Pricing and availability are available upon request.",
    "amenities.eyebrow": "Amenities",
    "amenities.title": "Facilities designed for lifestyle and business convenience.",
    "amenities.text": "A premium amenity mix supports daily living, hospitality, professional work, and resident services.",
    "amenities.pool": "Swimming Pool",
    "amenities.gym": "Gym",
    "amenities.skybar": "Sky Bar",
    "amenities.wine": "Wine & Cigar Lounge",
    "amenities.spa": "SPA",
    "amenities.restaurant": "Western Restaurant",
    "amenities.business": "Business Center",
    "amenities.conference": "International Conference Center",
    "amenities.parking": "Parking",
    "amenities.smart": "Smart Service",
    "plans.eyebrow": "Floor plans preview",
    "plans.title": "Floor Plans & Unit Layouts",
    "plans.text": "Floor plans can be shared after inquiry. Request the latest layouts for residences, Wyndham hotel units, or office spaces.",
    "plans.residence": "Residence Layouts",
    "plans.residenceText": "Apartment layout options for lifestyle and ownership inquiry.",
    "plans.hotel": "Wyndham Hotel Layouts",
    "plans.hotelText": "Hotel-style unit plans for managed property interest.",
    "plans.office": "Office Layouts",
    "plans.officeText": "Office space layouts for business and investment review.",
    "gallery.eyebrow": "Gallery",
    "gallery.title": "Selected visuals from CEO Center.",
    "gallery.text": "A focused gallery of exterior, residence, hotel, office, and city-view images.",
    "location.eyebrow": "Location",
    "location.title": "Strategically located in Phnom Penh City Center.",
    "location.text": "CEO Center is strategically located in Phnom Penh City Center, close to key business, shopping, government, and lifestyle destinations.",
    "location.point1": "Phnom Penh City Center",
    "location.point2": "Near Olympia Shopping Mall",
    "location.point3": "Near Prime Minister's Office",
    "location.cardTitle": "Central Phnom Penh",
    "location.cardText": "A connected address for residents, businesses, investors, and hotel guests.",
    "contact.eyebrow": "Contact / inquiry",
    "contact.title": "Speak with the CEO Center sales team.",
    "contact.text": "Send your inquiry by Telegram-ready message or call the sales team after the official phone number is confirmed.",
    "contact.phone": "Phone number to be confirmed",
    "form.name": "Name",
    "form.phone": "Phone",
    "form.customerType": "Customer Type",
    "form.interested": "Interested In",
    "form.message": "Message",
    "form.submit": "Generate Telegram Message",
    "footer.line": "Premium mixed-use landmark in Phnom Penh.",
    "footer.demo": "One-page demo website."
  },
  kh: {
    "nav.home": "ទំព័រដើម",
    "nav.overview": "ទិដ្ឋភាពទូទៅ",
    "nav.residences": "លំនៅដ្ឋាន",
    "nav.hotel": "សណ្ឋាគារ Wyndham",
    "nav.offices": "ការិយាល័យ",
    "nav.amenities": "បរិក្ខារ",
    "nav.location": "ទីតាំង",
    "nav.contact": "ទំនាក់ទំនង",
    "buttons.contactSales": "ទាក់ទងផ្នែកលក់",
    "buttons.exploreProject": "មើលគម្រោង",
    "buttons.askResidences": "សួរអំពីលំនៅដ្ឋាន",
    "buttons.askHotel": "សួរអំពីបន្ទប់សណ្ឋាគារ",
    "buttons.askOffices": "សួរអំពីការិយាល័យ",
    "buttons.requestPlans": "ស្នើសុំប្លង់",
    "buttons.openMaps": "បើក Google Maps",
    "buttons.telegram": "Telegram",
    "buttons.callSales": "ហៅផ្នែកលក់",
    "hero.eyebrow": "គោលដៅអចលនទ្រព្យពហុមុខងារ",
    "hero.title": "CEO Center",
    "hero.subtitle": "អគារពហុមុខងារលំដាប់ប្រណីតនៅភ្នំពេញ",
    "hero.text": "ស្វែងយល់ពីលំនៅដ្ឋាន បន្ទប់សណ្ឋាគារ Wyndham ការិយាល័យឆ្លាតវៃ បរិក្ខាររស់នៅ និងឱកាសវិនិយោគក្នុងទីតាំងយុទ្ធសាស្ត្រ។",
    "hero.panelLabel": "វិសាលភាពគម្រោង",
    "hero.panelTitle": "លំនៅដ្ឋាន + សណ្ឋាគារ + ការិយាល័យ",
    "hero.panelText": "ការណែនាំមួយទំព័រសម្រាប់អ្នកទិញ អ្នកជួល អ្នកវិនិយោគ អ្នកជួលការិយាល័យ និងភ្នាក់ងារ។",
    "overview.eyebrow": "ទិដ្ឋភាពគម្រោង",
    "overview.title": "អាសយដ្ឋានយុទ្ធសាស្ត្រសម្រាប់ការរស់នៅ អាជីវកម្ម សណ្ឋាគារ និងវិនិយោគ។",
    "overview.text": "CEO Center រួមបញ្ចូលមុខងារអចលនទ្រព្យច្រើនប្រភេទក្នុងទីតាំងលំដាប់ខ្ពស់មួយនៅភ្នំពេញ។",
    "overview.card1Title": "អគារពហុមុខងារ",
    "overview.card1Text": "គោលដៅលំដាប់ក្រុមហ៊ុន ដែលរួមបញ្ចូលជីវិតរស់នៅ សណ្ឋាគារ និងអាជីវកម្ម។",
    "overview.card2Title": "បន្ទប់សណ្ឋាគារ Wyndham",
    "overview.card2Text": "បន្ទប់បែបសណ្ឋាគារដែលភ្ជាប់ជាមួយគំនិតសេវាកម្ម Wyndham។",
    "overview.card3Title": "លំនៅដ្ឋានលំដាប់ខ្ពស់",
    "overview.card3Text": "ជម្រើសលំនៅដ្ឋានសម្រាប់រស់នៅក្នុងទីក្រុង និងស្នើសុំព័ត៌មានកម្មសិទ្ធិ។",
    "overview.card4Title": "ការិយាល័យឆ្លាតវៃ",
    "overview.card4Text": "ទីតាំងការិយាល័យសម្រាប់ក្រុមហ៊ុន និងអ្នកវិនិយោគអាជីព។",
    "overview.card5Title": "ទីតាំងកណ្ដាលភ្នំពេញ",
    "overview.card5Text": "ស្ថិតនៅជិតគោលដៅរដ្ឋាភិបាល ផ្សារទំនើប និងអាជីវកម្មសំខាន់ៗ។",
    "residences.eyebrow": "លំនៅដ្ឋាន",
    "residences.title": "ជម្រើសលំនៅដ្ឋានលំដាប់ខ្ពស់សម្រាប់ជីវិតទីក្រុង។",
    "residences.text": "ជម្រើសលំនៅដ្ឋានសម្រាប់រស់នៅក្នុងទីក្រុង ស្នាក់នៅរយៈពេលវែង និងឱកាសវិនិយោគ។",
    "hotel.eyebrow": "បន្ទប់សណ្ឋាគារ Wyndham",
    "hotel.title": "បន្ទប់បែបសណ្ឋាគារសម្រាប់ឱកាសអចលនទ្រព្យគ្រប់គ្រង។",
    "hotel.text": "បន្ទប់បែបសណ្ឋាគារដែលគាំទ្រដោយគំនិតសេវាកម្ម Wyndham សម្រាប់អ្នកទិញ និងអ្នកវិនិយោគ។",
    "offices.eyebrow": "ការិយាល័យ",
    "offices.title": "អាសយដ្ឋានអាជីវកម្មប្រកបដោយវិជ្ជាជីវៈនៅភ្នំពេញ។",
    "offices.text": "ទីតាំងការិយាល័យបត់បែនសម្រាប់ក្រុមហ៊ុន សហគ្រិន និងអ្នកវិនិយោគ។",
    "common.pricing": "តម្លៃ និងភាពទំនេរ អាចស្នើសុំបាន។",
    "amenities.eyebrow": "បរិក្ខារ",
    "amenities.title": "បរិក្ខារសម្រាប់ជីវិតរស់នៅ និងភាពងាយស្រួលអាជីវកម្ម។",
    "amenities.text": "បរិក្ខារលំដាប់ខ្ពស់គាំទ្រការរស់នៅ សណ្ឋាគារ ការងារ និងសេវាកម្មអ្នករស់នៅ។",
    "amenities.pool": "អាងហែលទឹក",
    "amenities.gym": "កន្លែងហាត់ប្រាណ",
    "amenities.skybar": "Sky Bar",
    "amenities.wine": "Wine & Cigar Lounge",
    "amenities.spa": "SPA",
    "amenities.restaurant": "ភោជនីយដ្ឋានបែបលោកខាងលិច",
    "amenities.business": "មជ្ឈមណ្ឌលអាជីវកម្ម",
    "amenities.conference": "មជ្ឈមណ្ឌលសន្និសីទអន្តរជាតិ",
    "amenities.parking": "ចំណតរថយន្ត",
    "amenities.smart": "សេវាឆ្លាតវៃ",
    "plans.eyebrow": "មើលប្លង់ជាមុន",
    "plans.title": "ប្លង់ជាន់ និងប្លង់យូនីត",
    "plans.text": "ប្លង់អាចចែករំលែកបន្ទាប់ពីស្នើសុំព័ត៌មាន។",
    "plans.residence": "ប្លង់លំនៅដ្ឋាន",
    "plans.residenceText": "ជម្រើសប្លង់អាផាតមិនសម្រាប់ការរស់នៅ និងការស្នើសុំ។",
    "plans.hotel": "ប្លង់សណ្ឋាគារ Wyndham",
    "plans.hotelText": "ប្លង់បន្ទប់បែបសណ្ឋាគារ សម្រាប់ការវិនិយោគ។",
    "plans.office": "ប្លង់ការិយាល័យ",
    "plans.officeText": "ប្លង់ការិយាល័យសម្រាប់អាជីវកម្ម និងការវិនិយោគ។",
    "gallery.eyebrow": "វិចិត្រសាល",
    "gallery.title": "រូបភាពជ្រើសរើសពី CEO Center។",
    "gallery.text": "រូបភាពខ្លីៗនៃអគារ លំនៅដ្ឋាន សណ្ឋាគារ ការិយាល័យ និងទិដ្ឋភាពទីក្រុង។",
    "location.eyebrow": "ទីតាំង",
    "location.title": "ស្ថិតនៅទីតាំងយុទ្ធសាស្ត្រកណ្ដាលភ្នំពេញ។",
    "location.text": "CEO Center ស្ថិតនៅកណ្ដាលភ្នំពេញ ជិតគោលដៅអាជីវកម្ម ផ្សារទំនើប រដ្ឋាភិបាល និងជីវិតរស់នៅ។",
    "location.point1": "កណ្ដាលទីក្រុងភ្នំពេញ",
    "location.point2": "ជិត Olympia Shopping Mall",
    "location.point3": "ជិតការិយាល័យនាយករដ្ឋមន្ត្រី",
    "location.cardTitle": "កណ្ដាលភ្នំពេញ",
    "location.cardText": "អាសយដ្ឋានភ្ជាប់សម្រាប់អ្នករស់នៅ អាជីវកម្ម អ្នកវិនិយោគ និងភ្ញៀវសណ្ឋាគារ។",
    "contact.eyebrow": "ទំនាក់ទំនង / សាកសួរ",
    "contact.title": "និយាយជាមួយក្រុមលក់ CEO Center។",
    "contact.text": "ផ្ញើសំណួរតាមសារ Telegram ឬទូរស័ព្ទទៅក្រុមលក់បន្ទាប់ពីលេខផ្លូវការត្រូវបានបញ្ជាក់។",
    "contact.phone": "លេខទូរស័ព្ទត្រូវបញ្ជាក់",
    "form.name": "ឈ្មោះ",
    "form.phone": "ទូរស័ព្ទ",
    "form.customerType": "ប្រភេទអតិថិជន",
    "form.interested": "ចាប់អារម្មណ៍លើ",
    "form.message": "សារ",
    "form.submit": "បង្កើតសារ Telegram",
    "footer.line": "អគារពហុមុខងារលំដាប់ខ្ពស់នៅភ្នំពេញ។",
    "footer.demo": "គេហទំព័រ demo មួយទំព័រ។"
  },
  zh: {
    "nav.home": "首页",
    "nav.overview": "项目概览",
    "nav.residences": "公寓住宅",
    "nav.hotel": "温德姆酒店",
    "nav.offices": "办公空间",
    "nav.amenities": "配套设施",
    "nav.location": "位置",
    "nav.contact": "联系",
    "buttons.contactSales": "联系销售",
    "buttons.exploreProject": "了解项目",
    "buttons.askResidences": "咨询公寓",
    "buttons.askHotel": "咨询酒店单位",
    "buttons.askOffices": "咨询办公室",
    "buttons.requestPlans": "索取户型图",
    "buttons.openMaps": "打开 Google Maps",
    "buttons.telegram": "Telegram",
    "buttons.callSales": "致电销售",
    "hero.eyebrow": "高端综合体项目",
    "hero.title": "CEO Center",
    "hero.subtitle": "金边高端综合地标",
    "hero.text": "集住宅、温德姆酒店单位、智慧办公、生活配套与投资机会于一体的战略性目的地。",
    "hero.panelLabel": "项目范围",
    "hero.panelTitle": "住宅 + 酒店 + 办公",
    "hero.panelText": "面向买家、租客、投资者、办公租户和代理的一页式项目介绍。",
    "overview.eyebrow": "项目概览",
    "overview.title": "集居住、商务、酒店与投资于一体的战略地址。",
    "overview.text": "CEO Center 在金边核心位置整合多种物业形态，以强建筑形象、国际化定位和清晰咨询路径呈现。",
    "overview.card1Title": "综合地标",
    "overview.card1Text": "融合生活方式、酒店服务与商务功能的高端目的地。",
    "overview.card2Title": "温德姆酒店单位",
    "overview.card2Text": "连接温德姆酒店服务概念的酒店式单位。",
    "overview.card3Title": "高端住宅",
    "overview.card3Text": "适合城市生活、长期居住和置业咨询的住宅选择。",
    "overview.card4Title": "智慧办公单位",
    "overview.card4Text": "适合企业和专业投资者的灵活办公空间。",
    "overview.card5Title": "金边中心位置",
    "overview.card5Text": "靠近政府、购物和商务核心目的地。",
    "residences.eyebrow": "公寓住宅",
    "residences.title": "面向现代城市生活的高端住宅选择。",
    "residences.text": "适合城市居住、长期停留和投资机会的高端住宅产品。",
    "hotel.eyebrow": "温德姆酒店单位",
    "hotel.title": "面向托管物业机会的酒店式单位。",
    "hotel.text": "由温德姆酒店服务概念支持，适合买家和投资者关注托管物业机会。",
    "offices.eyebrow": "办公空间",
    "offices.title": "金边专业商务地址。",
    "offices.text": "为公司、创业者和投资者打造的灵活办公空间。",
    "common.pricing": "价格和可售情况可按需咨询。",
    "amenities.eyebrow": "配套设施",
    "amenities.title": "服务生活与商务便利的高端设施。",
    "amenities.text": "丰富配套支持日常生活、酒店体验、专业办公和业主服务。",
    "amenities.pool": "游泳池",
    "amenities.gym": "健身房",
    "amenities.skybar": "空中酒吧",
    "amenities.wine": "红酒雪茄会所",
    "amenities.spa": "SPA",
    "amenities.restaurant": "西餐厅",
    "amenities.business": "商务中心",
    "amenities.conference": "国际会议中心",
    "amenities.parking": "停车场",
    "amenities.smart": "智慧服务",
    "plans.eyebrow": "户型预览",
    "plans.title": "平面图与单位户型",
    "plans.text": "户型图可在咨询后提供。可索取住宅、温德姆酒店单位或办公空间的最新布局。",
    "plans.residence": "住宅户型",
    "plans.residenceText": "适合生活与置业咨询的公寓布局。",
    "plans.hotel": "温德姆酒店户型",
    "plans.hotelText": "适合托管物业关注的酒店式单位布局。",
    "plans.office": "办公户型",
    "plans.officeText": "适合商务与投资评估的办公空间布局。",
    "gallery.eyebrow": "图库",
    "gallery.title": "CEO Center 精选视觉。",
    "gallery.text": "精选外观、住宅、酒店、办公和城市景观图片。",
    "location.eyebrow": "位置",
    "location.title": "战略性位于金边市中心。",
    "location.text": "CEO Center 位于金边市中心，靠近重要商务、购物、政府和生活目的地。",
    "location.point1": "金边市中心",
    "location.point2": "靠近 Olympia Shopping Mall",
    "location.point3": "靠近总理府",
    "location.cardTitle": "金边中心",
    "location.cardText": "连接住户、企业、投资者和酒店客人的核心地址。",
    "contact.eyebrow": "联系 / 咨询",
    "contact.title": "联系 CEO Center 销售团队。",
    "contact.text": "可生成 Telegram 咨询消息；正式电话确认后可直接致电销售团队。",
    "contact.phone": "电话号码待确认",
    "form.name": "姓名",
    "form.phone": "电话",
    "form.customerType": "客户类型",
    "form.interested": "感兴趣内容",
    "form.message": "留言",
    "form.submit": "生成 Telegram 消息",
    "footer.line": "金边高端综合地标。",
    "footer.demo": "一页式 demo 网站。"
  }
};

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const setLanguage = (lang) => {
  const dictionary = translations[lang] || translations.en;
  document.documentElement.lang = lang === "kh" ? "km" : lang === "zh" ? "zh" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
  localStorage.setItem("ceo-center-language", lang);
};

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem("ceo-center-language") || "en");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

document.querySelectorAll("main section[id]").forEach((section) => navObserver.observe(section));

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector("img");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightbox?.querySelector("button")?.addEventListener("click", () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.querySelector("button").click();
});

const buildTelegramUrl = (message) => {
  if (TELEGRAM_USERNAME === "TELEGRAM_USERNAME") {
    return `https://t.me/share/url?url=${encodeURIComponent(MAPS_URL)}&text=${encodeURIComponent(message)}`;
  }
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
};

const quickMessage = "Hello CEO Center, I would like to ask about the project.";
document.getElementById("telegramQuick")?.setAttribute("href", buildTelegramUrl(quickMessage));
document.getElementById("footerTelegram")?.setAttribute("href", buildTelegramUrl(quickMessage));

document.getElementById("inquiryForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const message = [
    "CEO Center Inquiry",
    `Name: ${data.get("name") || ""}`,
    `Phone: ${data.get("phone") || ""}`,
    `Customer Type: ${data.get("customerType") || ""}`,
    `Interested In: ${data.get("interest") || ""}`,
    `Message: ${data.get("message") || ""}`
  ].join("\n");

  const output = document.getElementById("formOutput");
  if (output) {
    output.classList.add("show");
    output.innerHTML = "";
    const text = document.createElement("p");
    text.textContent = message;
    const link = document.createElement("a");
    link.className = "btn btn-primary";
    link.href = buildTelegramUrl(message);
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Open Telegram Message";
    output.append(text, link);
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
