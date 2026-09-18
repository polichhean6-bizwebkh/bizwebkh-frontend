'use strict';
const icons={battery:'M5 7V4h4v3m6 0V4h4v3M3 7h18v14H3V7Zm4 7h4m6-2v4m-2-2h4',drop:'M12 3C10 7 5 11 5 15a7 7 0 0 0 14 0c0-4-5-8-7-12Z',layers:'m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5',facebook:'M14 22v-9h3l1-4h-4V7c0-1 1-2 2-2h2V1h-3c-4 0-6 2-6 6v2H6v4h3v9',vehicle:'M3 16v-5l2-6h14l2 6v5M3 11h18M5 16v3M19 16v3M6 14h2M16 14h2',arrow:'M5 12h14m-6-6 6 6-6 6','arrow-up':'M12 19V5m-6 6 6-6 6 6',check:'m5 12 4 4L19 6',menu:'M4 6h16M4 12h16M4 18h16',shield:'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-6',chat:'M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5Z',tool:'m14 6 4-4a6 6 0 0 1-7 8L4 18a2 2 0 0 0 3 3l8-8a6 6 0 0 0 7-7l-4 4-4-4Z',home:'m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7',tag:'M3 3h8l10 10-8 8L3 11V3Zm4 4h.01',phone:'M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C9 21 3 15 3 5a2 2 0 0 1 2-2Z',send:'m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2',pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',clock:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2',info:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 11v6M12 7h.01'};
const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${icons[name]||icons.arrow}"/></svg>`;

/* ---------------------------------------------------------------------
   Bilingual content dictionary (EN / KM).
   Brand names, product names, phone numbers, Telegram/WhatsApp/Facebook
   names, URLs, and the street address are intentionally identical in
   both languages and are NOT looked up here.
--------------------------------------------------------------------- */
const dict = {
  en: {
    skip: 'Skip to content',
    topbar: { tagline: 'ENGINE OIL & BATTERIES · PHNOM PENH', hours: '8:00 AM – 5:00 PM' },
    header: { logoAria: 'HERO Engine Oil & Batteries home', brandTagline: 'ENGINE OIL & BATTERIES' },
    nav: { home: 'Home', about: 'About', products: 'Products', whyHero: 'Why HERO', contact: 'Contact', contactCta: 'Contact Us', openMenu: 'Open navigation', closeMenu: 'Close navigation' },
    hero: {
      photoAria: 'Illustrative stock photograph of automotive service work',
      eyebrow: 'HERO ENGINE OIL & BATTERIES',
      headline: 'Engine care.<br>Battery power.<br>Ready for the road.',
      description: 'Motorcycle oil and car batteries for everyday drivers and riders in Phnom Penh.',
      exploreProducts: 'Explore Products',
      contactUs: 'Contact Us',
      note: 'Dongkor, Phnom Penh, Cambodia',
      captionLabel: 'YOUR VEHICLE. YOUR EVERYDAY.',
      captionText: 'Talk to HERO. Find your next essential.'
    },
    benefit: { carBatteries: 'Car batteries', motorcycleOil: 'Motorcycle oil', directInquiries: 'Direct product inquiries' },
    about: {
      eyebrow: 'ABOUT HERO',
      heading: 'Japanese technology.<br>Reliable everyday support.',
      p1: 'HERO Engine Oil & Batteries offers car batteries and motorcycle engine oil selected for everyday driving and riding needs.',
      p2: 'Explore our current range of BUSSAN, SUBUTA and SUSHI car batteries, together with SOSI and SUSI motorcycle oil.',
      p3: 'Contact HERO for product availability, specifications and assistance choosing the right product for your vehicle.',
      link: 'Connect with HERO'
    },
    categories: { eyebrow: 'OUR PRODUCT CATEGORIES', heading: 'Engine oil. Car batteries.<br>One place to start.', exploreBrands: 'Explore our brands', exploreProducts: 'Explore Products' },
    categoryNames: { carBattery: 'Car Battery', motorcycleOil: 'Motorcycle Oil' },
    categoryDesc: { carBattery: 'Explore available BUSSAN, SUBUTA and SUSHI car batteries.', motorcycleOil: 'Explore SOSI and SUSI motorcycle engine oil.' },
    productsSection: {
      eyebrow: 'THE HERO RANGE',
      heading: 'Find your brand.<br>Ask us for the details.',
      sub: 'Current car battery and motorcycle oil selection available from HERO.',
      groupsLabel: 'PRODUCT GROUPS',
      askForDetails: 'Ask for Details',
      askForDetailsAria: (brand, category) => `Ask for details about ${brand} ${category}`,
      demoNote: 'Contact HERO to confirm individual models, product details and availability.'
    },
    gallery: {
      eyebrow: 'ALSO FROM HERO',
      heading: 'More oil options.<br>Find the right oil for your bike.',
      sub: 'Additional motorcycle oil variants are available from HERO. Contact us to confirm the right grade and current availability.'
    },
    why: {
      eyebrow: 'WHY CHOOSE HERO',
      heading: 'Easy to explore.<br>Easy to get in touch.',
      item1Title: 'Everyday Vehicle Essentials', item1Desc: 'Car batteries and motorcycle engine oil for your everyday vehicle needs.',
      item2Title: 'Convenient Contact', item2Desc: 'Contact HERO directly through Telegram or WhatsApp for product information.',
      item3Title: 'Local Service', item3Desc: 'Serving customers in Dongkor, Phnom Penh.',
      item4Title: 'Customer Support', item4Desc: 'Ask HERO about specifications, availability and product suitability.'
    },
    quality: {
      eyebrow: 'PRODUCT & SERVICE SUPPORT',
      heading: 'A clearer choice<br>starts with a conversation.',
      p: 'Tell us what vehicle you use and what product you need. HERO can help you check current availability and suitable options.',
      askHero: 'Ask HERO',
      panelLabel: 'BEFORE YOU CHOOSE',
      step1Title: 'Share your vehicle details', step1Desc: 'Tell us your motorcycle or car model and the product you are looking for.',
      step2Title: 'Ask about the product', step2Desc: 'Request product information, specifications and current availability.',
      step3Title: 'Confirm before purchase', step3Desc: 'Confirm the exact model, specification and availability before purchase.'
    },
    contact: {
      eyebrow: 'STORE INFORMATION',
      heading: 'Visit us in<br>Dongkor, Phnom Penh.',
      addressLabel: 'Address', hoursLabel: 'Opening Hours', facebookPageLabel: 'Facebook Page',
      panelEyebrow: 'LET’S TALK', panelHeading: 'Contact HERO directly.', panelP: 'Reach HERO through Telegram or WhatsApp for product enquiries and availability.',
      linkPending: 'Link pending',
      facebookNote: 'Facebook: HERO Engine Oil & Batteries.<br>Page link to be added when confirmed.',
      inquiryPrefix: 'Ask HERO about:'
    },
    bottomCta: { eyebrow: 'YOUR NEXT STEP', heading: 'Need engine oil or a battery?', p: 'Contact HERO for current product availability and more information.', facebookPending: 'Facebook · Link pending' },
    footer: { backTop: 'Back to top', websiteBy: 'Website by BizWeb KH' },
    meta: { title: 'HERO Engine Oil & Batteries | Dongkor, Phnom Penh' }
  },
  km: {
    skip: 'រំលងទៅមាតិកា',
    topbar: { tagline: 'ប្រេងម៉ាស៊ីន និងអាគុយ · PHNOM PENH', hours: '8:00 AM – 5:00 PM' },
    header: { logoAria: 'ទំព័រដើម HERO ប្រេងម៉ាស៊ីន និងអាគុយ', brandTagline: 'ប្រេងម៉ាស៊ីន និងអាគុយ' },
    nav: { home: 'ទំព័រដើម', about: 'អំពីយើង', products: 'ផលិតផល', whyHero: 'ហេតុអ្វីជ្រើសរើស HERO', contact: 'ទំនាក់ទំនង', contactCta: 'ទាក់ទងមកយើង', openMenu: 'បើកម៉ឺនុយ', closeMenu: 'បិទម៉ឺនុយ' },
    hero: {
      photoAria: 'រូបភាពគំរូការងារសេវាកម្មរថយន្ត',
      eyebrow: 'HERO ប្រេងម៉ាស៊ីន និងអាគុយ',
      headline: 'ថែទាំម៉ាស៊ីន<br>ថាមពលអាគុយ<br>ត្រៀមខ្លួនសម្រាប់គ្រប់ដំណើរ',
      description: 'ប្រេងម៉ាស៊ីនម៉ូតូ និងអាគុយរថយន្ត សម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃនៅភ្នំពេញ។',
      exploreProducts: 'មើលផលិតផល',
      contactUs: 'ទាក់ទងយើង',
      note: 'Dongkor, Phnom Penh, Cambodia',
      captionLabel: 'យានយន្តរបស់អ្នក។ រាល់ថ្ងៃរបស់អ្នក។',
      captionText: 'និយាយជាមួយ HERO។ ស្វែងរកផលិតផលដែលអ្នកត្រូវការបន្ទាប់។'
    },
    benefit: { carBatteries: 'អាគុយរថយន្ត', motorcycleOil: 'ប្រេងម៉ាស៊ីនម៉ូតូ', directInquiries: 'សាកសួរផលិតផលដោយផ្ទាល់' },
    about: {
      eyebrow: 'អំពី HERO',
      heading: 'បច្ចេកវិទ្យាជប៉ុន<br>គុណភាពដែលអាចទុកចិត្តបាន',
      p1: 'HERO Engine Oil & Batteries ផ្តល់ជូនអាគុយរថយន្ត និងប្រេងម៉ាស៊ីនម៉ូតូ សម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃ។',
      p2: 'ស្វែងរកជម្រើសអាគុយ BUSSAN, SUBUTA និង SUSHI រួមជាមួយប្រេងម៉ាស៊ីនម៉ូតូ SOSI និង SUSI។',
      p3: 'សូមទាក់ទង HERO ដើម្បីសួរអំពីស្តុកផលិតផល លក្ខណៈបច្ចេកទេស និងការជ្រើសរើសផលិតផលដែលសមស្របសម្រាប់យានយន្តរបស់អ្នក។',
      link: 'ទាក់ទង HERO'
    },
    categories: { eyebrow: 'ប្រភេទផលិតផល', heading: 'ប្រេងម៉ាស៊ីន និងអាគុយរថយន្ត<br>ងាយស្រួលស្វែងរកក្នុងកន្លែងតែមួយ', exploreBrands: 'មើលម៉ាកទាំងអស់', exploreProducts: 'មើលផលិតផល' },
    categoryNames: { carBattery: 'អាគុយរថយន្ត', motorcycleOil: 'ប្រេងម៉ាស៊ីនម៉ូតូ' },
    categoryDesc: { carBattery: 'អាគុយរថយន្ត BUSSAN, SUBUTA និង SUSHI។', motorcycleOil: 'ប្រេងម៉ាស៊ីនម៉ូតូ SOSI និង SUSI។' },
    productsSection: {
      eyebrow: 'ជួរផលិតផល HERO',
      heading: 'ជ្រើសរើសម៉ាកដែលអ្នកត្រូវការ<br>សួរព័ត៌មានបន្ថែមពី HERO',
      sub: 'ជម្រើសអាគុយរថយន្ត និងប្រេងម៉ាស៊ីនម៉ូតូដែលមាននៅ HERO។',
      groupsLabel: 'ក្រុមផលិតផល',
      askForDetails: 'សាកសួរព័ត៌មានលម្អិត',
      askForDetailsAria: (brand, category) => `សាកសួរព័ត៌មានលម្អិតអំពី ${brand} ${category}`,
      demoNote: 'ទាក់ទង HERO ដើម្បីបញ្ជាក់ម៉ូដែល ព័ត៌មានលម្អិត និងស្តុកដែលមាន។'
    },
    gallery: {
      eyebrow: 'ផលិតផលបន្ថែមពី HERO',
      heading: 'ជម្រើសប្រេងម៉ាស៊ីនបន្ថែម<br>សម្រាប់ម៉ូតូរបស់អ្នក',
      sub: 'មានជម្រើសប្រេងម៉ាស៊ីនម៉ូតូបន្ថែម។ សូមទាក់ទង HERO ដើម្បីសួរអំពីកម្រិតប្រេង និងស្តុកបច្ចុប្បន្ន។'
    },
    why: {
      eyebrow: 'ហេតុអ្វីជ្រើសរើស HERO',
      heading: 'ងាយស្រួលស្វែងរក<br>ងាយស្រួលទាក់ទង',
      item1Title: 'ផលិតផលសម្រាប់យានយន្តប្រចាំថ្ងៃ', item1Desc: 'អាគុយរថយន្ត និងប្រេងម៉ាស៊ីនម៉ូតូសម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃ។',
      item2Title: 'ទាក់ទងបានងាយ', item2Desc: 'ទាក់ទង HERO តាម Telegram ឬ WhatsApp ដើម្បីសួរព័ត៌មានផលិតផល។',
      item3Title: 'សេវាកម្មក្នុងតំបន់', item3Desc: 'បម្រើអតិថិជននៅដង្កោ រាជធានីភ្នំពេញ។',
      item4Title: 'ជំនួយព័ត៌មានផលិតផល', item4Desc: 'សួរអំពីម៉ូដែល លក្ខណៈបច្ចេកទេស និងស្តុកផលិតផល។'
    },
    quality: {
      eyebrow: 'ការគាំទ្រផលិតផល និងសេវាកម្ម',
      heading: 'ជ្រើសរើសផលិតផលកាន់តែងាយ<br>ដោយចាប់ផ្តើមពីការសួរព័ត៌មាន',
      p: 'ប្រាប់ HERO អំពីម៉ូតូ ឬរថយន្តរបស់អ្នក និងផលិតផលដែលអ្នកកំពុងស្វែងរក ដើម្បីសួរព័ត៌មាន និងស្តុកបច្ចុប្បន្ន។',
      askHero: 'សួរ HERO',
      panelLabel: 'មុននឹងសម្រេចចិត្ត',
      step1Title: 'ប្រាប់ព័ត៌មានអំពីយានយន្តរបស់អ្នក', step1Desc: 'ប្រាប់យើងពីម៉ូដែលម៉ូតូ ឬរថយន្តរបស់អ្នក និងផលិតផលដែលអ្នកកំពុងស្វែងរក។',
      step2Title: 'សាកសួរអំពីផលិតផល', step2Desc: 'សុំព័ត៌មានផលិតផល លក្ខណៈបច្ចេកទេស និងស្តុកបច្ចុប្បន្ន។',
      step3Title: 'បញ្ជាក់មុនពេលទិញ', step3Desc: 'បញ្ជាក់ម៉ូដែល លក្ខណៈបច្ចេកទេស និងស្តុកឲ្យបានច្បាស់មុននឹងទិញ។'
    },
    contact: {
      eyebrow: 'ព័ត៌មានហាង',
      heading: 'មកជួបយើងនៅដង្កោ<br>រាជធានីភ្នំពេញ',
      addressLabel: 'អាសយដ្ឋាន', hoursLabel: 'ម៉ោងបើកបម្រើ', facebookPageLabel: 'ទំព័រ Facebook',
      panelEyebrow: 'តោះនិយាយគ្នា', panelHeading: 'ទាក់ទង HERO ដោយផ្ទាល់', panelP: 'ទាក់ទងតាម Telegram ឬ WhatsApp ដើម្បីសួរអំពីផលិតផល និងស្តុកបច្ចុប្បន្ន។',
      linkPending: 'តំណភ្ជាប់មិនទាន់មាន',
      facebookNote: 'Facebook៖ HERO Engine Oil & Batteries។<br>តំណភ្ជាប់ទំព័រនឹងបន្ថែមនៅពេលបញ្ជាក់។',
      inquiryPrefix: 'សួរ HERO អំពី៖'
    },
    bottomCta: { eyebrow: 'ជំហានបន្ទាប់របស់អ្នក', heading: 'ត្រូវការប្រេងម៉ាស៊ីន ឬអាគុយ?', p: 'ទាក់ទង HERO ដើម្បីសួរព័ត៌មាន និងស្តុកផលិតផលបច្ចុប្បន្ន។', facebookPending: 'Facebook · តំណភ្ជាប់មិនទាន់មាន' },
    footer: { backTop: 'ត្រឡប់ទៅលើ', websiteBy: 'Website by BizWeb KH' },
    meta: { title: 'HERO ប្រេងម៉ាស៊ីន និងអាគុយ | Dongkor, Phnom Penh' }
  }
};

function t(lang, path) {
  const parts = path.split('.');
  let node = dict[lang];
  for (const p of parts) { node = node && node[p]; }
  if (node === undefined) { node = dict.en; for (const p of parts) { node = node && node[p]; } }
  return node;
}

const LANG_KEY = 'heroLang';
let currentLang = localStorage.getItem(LANG_KEY) === 'km' ? 'km' : 'en';
let lastInquiry = null; // { brand, categoryKey }

const categories = [
  { key: 'carBattery', image: 'bussan-car-battery.png', primaryBrand: 'BUSSAN', brands: ['BUSSAN', 'SUBUTA', 'SUSHI'], icon: 'vehicle' },
  { key: 'motorcycleOil', image: 'sosi-oil-trio.png', primaryBrand: 'SOSI', brands: ['SOSI', 'SUSI'], icon: 'drop' }
];
/* Primary HERO Range: one card per brand, each with its exact product code/grade
   as printed on the supplied product image. */
const products = [
  { brand: 'BUSSAN', categoryKey: 'carBattery', icon: 'vehicle', image: 'bussan-car-battery.png', code: 'SMF-85D31L', spec: '12V 80Ah' },
  { brand: 'SUBUTA', categoryKey: 'carBattery', icon: 'vehicle', image: 'subuta-car-battery.png', code: '38B20MF', spec: '12V 40Ah' },
  { brand: 'SUSHI', categoryKey: 'carBattery', icon: 'vehicle', image: 'sushi-car-battery.png', code: 'MF40B20', spec: '12V 40Ah' },
  { brand: 'SOSI', categoryKey: 'motorcycleOil', icon: 'drop', image: 'sosi-oil-single.png', code: '20W-50', spec: '0.8L' }
];
/* Supporting gallery: additional oil variants, shown in their own block below
   The HERO Range rather than mixed into the primary 4-brand grid. */
const galleryItems = [
  { brand: 'SOSI', categoryKey: 'motorcycleOil', icon: 'drop', image: 'sosi-oil-trio.png', code: '20W-50', spec: '0.8L' },
  { brand: 'SUSI', categoryKey: 'motorcycleOil', icon: 'drop', image: 'susi-oil-10w40.png', code: '10W-40', spec: '0.8L' },
  { brand: 'SUSI', categoryKey: 'motorcycleOil', icon: 'drop', image: 'susi-oil-20w50.png', code: '20W-50', spec: '0.8L' }
];

function renderCategories(lang) {
  document.querySelector('#category-grid').innerHTML = categories.map(category => {
    const name = t(lang, `categoryNames.${category.key}`);
    const alt = lang === 'km' ? `${name} ${category.primaryBrand}` : `${category.primaryBrand} ${name}`;
    return `<a class="category-card reveal" href="#products"><div class="category-image"><img src="assets/${category.image}" alt="${alt}" width="1000" height="1000" loading="lazy"></div><div class="category-content"><h3>${name}</h3><p>${t(lang, `categoryDesc.${category.key}`)}</p><div class="category-brands">${category.brands.map(brand => `<span>${brand}</span>`).join('')}</div><span class="category-link">${t(lang, 'categories.exploreProducts')} ${icon('arrow')}</span></div></a>`;
  }).join('');
}

function productCardHtml(lang, product) {
  const categoryName = t(lang, `categoryNames.${product.categoryKey}`);
  const alt = lang === 'km' ? `${categoryName} ${product.brand} ${product.code}` : `${product.brand} ${categoryName} ${product.code}`;
  const ariaLabel = t(lang, 'productsSection.askForDetailsAria')(product.brand, categoryName);
  return `<article class="product-card reveal"><div class="brand-card-top">${icon(product.icon)}<span>${categoryName}</span></div><div class="catalog-photo"><img src="assets/${product.image}" alt="${alt}" width="1000" height="1000" loading="lazy"></div><div class="product-body"><h3>${product.brand}</h3><p>${categoryName}</p><p class="product-code">${product.code} · ${product.spec}</p><a class="ask-price" href="#contact" data-product="${product.brand}" data-category-key="${product.categoryKey}" data-code="${product.code}" aria-label="${ariaLabel}">${t(lang, 'productsSection.askForDetails')} ${icon('arrow')}</a></div></article>`;
}

function renderProducts(lang) {
  document.querySelector('#product-grid').innerHTML = products.map(p => productCardHtml(lang, p)).join('');
  document.querySelector('#gallery-grid').innerHTML = galleryItems.map(p => productCardHtml(lang, p)).join('');
  bindProductLinks();
}

function bindProductLinks() {
  document.querySelectorAll('[data-product]').forEach(link => link.addEventListener('click', () => {
    lastInquiry = { brand: link.dataset.product, categoryKey: link.dataset.categoryKey, code: link.dataset.code };
    showInquiry();
  }));
}

function showInquiry() {
  if (!lastInquiry) return;
  const selection = document.querySelector('#inquiry-selection');
  const categoryName = t(currentLang, `categoryNames.${lastInquiry.categoryKey}`);
  const codeSuffix = lastInquiry.code ? ` (${lastInquiry.code})` : '';
  selection.textContent = `${t(currentLang, 'contact.inquiryPrefix')} ${lastInquiry.brand}${codeSuffix} — ${categoryName}`;
  selection.hidden = false;
}

function applyStaticTranslations(lang) {
  document.documentElement.lang = lang === 'km' ? 'km' : 'en';
  document.title = t(lang, 'meta.title');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(lang, el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(lang, el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split('|').forEach(pair => {
      const [attr, path] = pair.split(':');
      el.setAttribute(attr, t(lang, path));
    });
  });
  const menu = document.querySelector('.menu-toggle');
  if (menu) {
    const isOpen = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-label', isOpen ? t(lang, 'nav.closeMenu') : t(lang, 'nav.openMenu'));
  }
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });
}

function render(lang) {
  currentLang = lang;
  applyStaticTranslations(lang);
  renderCategories(lang);
  renderProducts(lang);
  if (lastInquiry) showInquiry();
}

function setLang(lang) {
  if (lang !== 'en' && lang !== 'km') return;
  localStorage.setItem(LANG_KEY, lang);
  render(lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

/* Initial render in the saved (or default English) language. */
render(currentLang);

document.querySelectorAll('[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon); });
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', t(currentLang, 'nav.openMenu'));
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? t(currentLang, 'nav.closeMenu') : t(currentLang, 'nav.openMenu'));
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); }
});
document.addEventListener('click', e => { if (!e.target.closest('.nav-wrap')) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.why-grid article,.quality-panel').forEach(el => observer.observe(el));
}
