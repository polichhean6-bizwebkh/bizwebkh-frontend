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
      headline: 'Engine care.<br>Battery power.<br><em>Ready for the road.</em>',
      description: 'Supporting motorcycle and car owners with engine oil and battery products in Phnom Penh.',
      exploreProducts: 'Explore Products',
      contactUs: 'Contact Us',
      note: 'Dongkor, Phnom Penh, Cambodia',
      captionLabel: 'YOUR VEHICLE. YOUR EVERYDAY.',
      captionText: 'Talk to HERO. Find your next essential.'
    },
    benefit: { carBatteries: 'Car batteries', motorcycleOil: 'Motorcycle oil', directInquiries: 'Direct product inquiries' },
    about: {
      eyebrow: 'ABOUT HERO',
      heading: 'Local connections.<br>Everyday essentials.',
      p1: 'HERO Engine Oil & Batteries offers car batteries and motorcycle engine oil for customers in Phnom Penh.',
      p2: 'Explore BUSSAN, SUBUTA and SUSHI car batteries, plus SOSI motorcycle oil. Contact our team for product information and current availability.',
      link: 'Connect with HERO'
    },
    categories: { eyebrow: 'OUR PRODUCT CATEGORIES', heading: 'Engine oil. Car batteries.<br>One place to start.', exploreBrands: 'Explore our brands', exploreProducts: 'Explore products' },
    categoryNames: { carBattery: 'Car Battery', motorcycleOil: 'Motorcycle Oil' },
    categoryDesc: { carBattery: 'Explore car batteries from BUSSAN, SUBUTA and SUSHI.', motorcycleOil: 'Discover SOSI engine oil for your motorcycle.' },
    productsSection: {
      eyebrow: 'THE HERO RANGE',
      heading: 'Find your brand.<br>Ask us for the details.',
      sub: 'Car batteries and motorcycle oil from our current selection.',
      groupsLabel: 'PRODUCT GROUPS',
      askForDetails: 'Ask for Details',
      askForDetailsAria: (brand, category) => `Ask for details about ${brand} ${category}`,
      demoNote: 'Contact HERO to confirm individual models, product details and availability.'
    },
    why: {
      eyebrow: 'WHY CHOOSE HERO',
      heading: 'Easy to explore.<br>Easy to get in touch.',
      item1Title: 'Everyday Vehicle Essentials', item1Desc: 'Car batteries and motorcycle engine oil for your everyday vehicle needs.',
      item2Title: 'Convenient Contact', item2Desc: 'Reach HERO directly through Telegram or WhatsApp. Find our page on Facebook.',
      item3Title: 'Local Service', item3Desc: 'Located in Dongkor, Phnom Penh, with opening hours from 8:00 AM to 5:00 PM.',
      item4Title: 'Customer Support', item4Desc: 'Contact HERO for product information and current availability.'
    },
    quality: {
      eyebrow: 'PRODUCT & SERVICE SUPPORT',
      heading: 'A clearer choice<br>starts with a conversation.',
      p: 'Tell us what you need. HERO can provide more information about the products you’re interested in.',
      askHero: 'Ask HERO',
      panelLabel: 'BEFORE YOU CHOOSE',
      step1Title: 'Share your vehicle details', step1Desc: 'Let us know your motorcycle or car model and the product you’re looking for.',
      step2Title: 'Ask about the product', step2Desc: 'Request photos, product information and availability directly from HERO.',
      step3Title: 'Confirm support terms', step3Desc: 'Ask HERO about any applicable warranty or after-sales support before purchase.'
    },
    contact: {
      eyebrow: 'STORE INFORMATION',
      heading: 'Visit us in<br>Dongkor, Phnom Penh.',
      addressLabel: 'Address', hoursLabel: 'Opening Hours', facebookPageLabel: 'Facebook Page',
      panelEyebrow: 'LET’S TALK', panelHeading: 'Contact HERO directly.', panelP: 'Choose Telegram or WhatsApp to ask about products and availability.',
      linkPending: 'Link pending',
      facebookNote: 'Facebook: HERO Engine Oil & Batteries.<br>Page link to be added when confirmed.',
      inquiryPrefix: 'Ask HERO about:'
    },
    bottomCta: { eyebrow: 'YOUR NEXT STEP', heading: 'Need engine oil or a battery?', p: 'Contact HERO Engine Oil & Batteries for product availability and more information.', facebookPending: 'Facebook · Link pending' },
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
      headline: 'ថែទាំម៉ាស៊ីនល្អ។<br>អាគុយមានថាមពល។<br><em>ត្រៀមរួចរាល់សម្រាប់ការធ្វើដំណើរ។</em>',
      description: 'HERO ផ្តល់ជូនប្រេងម៉ាស៊ីនម៉ូតូ និងអាគុយរថយន្ត សម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃនៅភ្នំពេញ។',
      exploreProducts: 'មើលផលិតផល',
      contactUs: 'ទាក់ទងមកយើង',
      note: 'Dongkor, Phnom Penh, Cambodia',
      captionLabel: 'យានយន្តរបស់អ្នក។ រាល់ថ្ងៃរបស់អ្នក។',
      captionText: 'និយាយជាមួយ HERO។ ស្វែងរកផលិតផលដែលអ្នកត្រូវការបន្ទាប់។'
    },
    benefit: { carBatteries: 'អាគុយរថយន្ត', motorcycleOil: 'ប្រេងម៉ាស៊ីនម៉ូតូ', directInquiries: 'សាកសួរផលិតផលដោយផ្ទាល់' },
    about: {
      eyebrow: 'អំពី HERO',
      heading: 'សេវាកម្មក្នុងតំបន់។<br>ផលិតផលចាំបាច់សម្រាប់យានយន្តប្រចាំថ្ងៃ។',
      p1: 'HERO ប្រេងម៉ាស៊ីន និងអាគុយ ផ្តល់ជូនអាគុយរថយន្ត និងប្រេងម៉ាស៊ីនម៉ូតូ សម្រាប់អតិថិជននៅភ្នំពេញ។',
      p2: 'ស្វែងរកអាគុយរថយន្ត BUSSAN, SUBUTA និង SUSHI ព្រមទាំងប្រេងម៉ាស៊ីនម៉ូតូ SOSI។ ទាក់ទងក្រុមការងាររបស់យើងសម្រាប់ព័ត៌មានផលិតផល និងស្តុកដែលមាន។',
      link: 'ទាក់ទង HERO'
    },
    categories: { eyebrow: 'ប្រភេទផលិតផលរបស់យើង', heading: 'ប្រេងម៉ាស៊ីន និងអាគុយរថយន្ត<br>រកបាននៅកន្លែងតែមួយ។', exploreBrands: 'មើលម៉ាកទាំងអស់', exploreProducts: 'មើលផលិតផល' },
    categoryNames: { carBattery: 'អាគុយរថយន្ត', motorcycleOil: 'ប្រេងម៉ាស៊ីនម៉ូតូ' },
    categoryDesc: { carBattery: 'អាគុយរថយន្តសម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃ និងម៉ូដែលយានយន្តផ្សេងៗ។', motorcycleOil: 'ប្រេងម៉ាស៊ីនម៉ូតូសម្រាប់ការថែទាំ និងការប្រើប្រាស់ប្រចាំថ្ងៃ។' },
    productsSection: {
      eyebrow: 'ជួរផលិតផល HERO',
      heading: 'ស្វែងរកម៉ាកដែលអ្នកចង់បាន<br>សាកសួរព័ត៌មានលម្អិតជាមួយ HERO។',
      sub: 'អាគុយរថយន្ត និងប្រេងម៉ាស៊ីនម៉ូតូ ដែលមានស្តុកឥឡូវនេះ។',
      groupsLabel: 'ក្រុមផលិតផល',
      askForDetails: 'សាកសួរព័ត៌មានលម្អិត',
      askForDetailsAria: (brand, category) => `សាកសួរព័ត៌មានលម្អិតអំពី ${brand} ${category}`,
      demoNote: 'ទាក់ទង HERO ដើម្បីបញ្ជាក់ម៉ូដែល ព័ត៌មានលម្អិត និងស្តុកដែលមាន។'
    },
    why: {
      eyebrow: 'ហេតុអ្វីជ្រើសរើស HERO',
      heading: 'ងាយស្រួលស្វែងរក។<br>ងាយស្រួលទាក់ទង។',
      item1Title: 'ផលិតផលចាំបាច់សម្រាប់យានយន្តប្រចាំថ្ងៃ', item1Desc: 'អាគុយរថយន្ត និងប្រេងម៉ាស៊ីនម៉ូតូ សម្រាប់តម្រូវការយានយន្តប្រចាំថ្ងៃរបស់អ្នក។',
      item2Title: 'ទំនាក់ទំនងងាយស្រួល', item2Desc: 'អាចសាកសួរព័ត៌មាន និងស្តុកផលិតផលតាម Telegram ឬ WhatsApp បានយ៉ាងងាយស្រួល។',
      item3Title: 'សេវាកម្មក្នុងតំបន់', item3Desc: 'HERO មានទីតាំងនៅដង្កោ រាជធានីភ្នំពេញ និងបម្រើអតិថិជនក្នុងតំបន់។',
      item4Title: 'ការគាំទ្រអតិថិជន', item4Desc: 'សាកសួរព័ត៌មានផលិតផល និងការណែនាំមុនពេលជ្រើសរើសទិញ។'
    },
    quality: {
      eyebrow: 'ការគាំទ្រផលិតផល និងសេវាកម្ម',
      heading: 'ជ្រើសរើសបានត្រឹមត្រូវ<br>ចាប់ផ្តើមពីការសាកសួរ។',
      p: 'ប្រាប់យើងពីអ្វីដែលអ្នកត្រូវការ ហើយ HERO នឹងផ្តល់ព័ត៌មានបន្ថែមអំពីផលិតផលដែលអ្នកចាប់អារម្មណ៍។',
      askHero: 'សួរ HERO',
      panelLabel: 'មុននឹងសម្រេចចិត្ត',
      step1Title: 'ប្រាប់ព័ត៌មានអំពីយានយន្តរបស់អ្នក', step1Desc: 'ប្រាប់យើងពីម៉ូដែលម៉ូតូ ឬរថយន្តរបស់អ្នក និងផលិតផលដែលអ្នកកំពុងស្វែងរក។',
      step2Title: 'សាកសួរអំពីផលិតផល', step2Desc: 'សុំរូបភាព ព័ត៌មានផលិតផល និងស្តុកដែលមានដោយផ្ទាល់ពី HERO។',
      step3Title: 'បញ្ជាក់ព័ត៌មានគាំទ្រ', step3Desc: 'សួរ HERO អំពីការធានា ឬសេវាកម្មគាំទ្របន្ទាប់ពីការទិញ មុននឹងសម្រេចចិត្ត។'
    },
    contact: {
      eyebrow: 'ព័ត៌មានហាង',
      heading: 'មកកាន់ហាងរបស់យើងនៅ<br>ដង្កោ រាជធានីភ្នំពេញ។',
      addressLabel: 'អាសយដ្ឋាន', hoursLabel: 'ម៉ោងបើកបម្រើ', facebookPageLabel: 'ទំព័រ Facebook',
      panelEyebrow: 'តោះនិយាយគ្នា', panelHeading: 'ទាក់ទង HERO ដោយផ្ទាល់', panelP: 'សាកសួរព័ត៌មានផលិតផល ស្តុកដែលមាន និងព័ត៌មានបន្ថែមតាម Telegram ឬ WhatsApp។',
      linkPending: 'តំណភ្ជាប់មិនទាន់មាន',
      facebookNote: 'Facebook៖ HERO Engine Oil & Batteries។<br>តំណភ្ជាប់ទំព័រនឹងបន្ថែមនៅពេលបញ្ជាក់។',
      inquiryPrefix: 'សួរ HERO អំពី៖'
    },
    bottomCta: { eyebrow: 'ជំហានបន្ទាប់របស់អ្នក', heading: 'កំពុងស្វែងរកប្រេងម៉ាស៊ីន ឬអាគុយ?', p: 'ទាក់ទង HERO ដើម្បីសាកសួរព័ត៌មាន និងស្តុកផលិតផល។', facebookPending: 'Facebook · តំណភ្ជាប់មិនទាន់មាន' },
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
  { key: 'carBattery', image: 'bussan-car-battery.jpg', primaryBrand: 'BUSSAN', brands: ['BUSSAN', 'SUBUTA', 'SUSHI'], icon: 'vehicle' },
  { key: 'motorcycleOil', image: 'sosi-oil-trio.jpg', primaryBrand: 'SOSI', brands: ['SOSI'], icon: 'drop' }
];
const products = [
  { brand: 'BUSSAN', categoryKey: 'carBattery', icon: 'vehicle', image: 'bussan-car-battery.jpg' },
  { brand: 'SUBUTA', categoryKey: 'carBattery', icon: 'vehicle', image: 'subuta-car-battery.jpg' },
  { brand: 'SUSHI', categoryKey: 'carBattery', icon: 'vehicle', image: 'sushi-car-battery.jpg' },
  { brand: 'SOSI', categoryKey: 'motorcycleOil', icon: 'drop', image: 'sosi-oil-single.jpg' }
];

function renderCategories(lang) {
  document.querySelector('#category-grid').innerHTML = categories.map(category => {
    const name = t(lang, `categoryNames.${category.key}`);
    const kh = dict.km.categoryNames[category.key];
    const alt = lang === 'km' ? `${name} ${category.primaryBrand}` : `${category.primaryBrand} ${name}`;
    const khLabel = lang === 'en' ? `<p class="khmer-label" lang="km">${kh}</p>` : '';
    return `<a class="category-card reveal" href="#products"><div class="category-image"><img src="assets/${category.image}" alt="${alt}" width="1000" height="1000" loading="lazy"></div><div class="category-content"><h3>${name}</h3>${khLabel}<p>${t(lang, `categoryDesc.${category.key}`)}</p><div class="category-brands">${category.brands.map(brand => `<span>${brand}</span>`).join('')}</div><span class="category-link">${t(lang, 'categories.exploreProducts')} ${icon('arrow')}</span></div></a>`;
  }).join('');
}

function renderProducts(lang) {
  document.querySelector('#product-grid').innerHTML = products.map(product => {
    const categoryName = t(lang, `categoryNames.${product.categoryKey}`);
    const alt = lang === 'km' ? `${categoryName} ${product.brand}` : `${product.brand} ${categoryName}`;
    const ariaLabel = t(lang, 'productsSection.askForDetailsAria')(product.brand, categoryName);
    return `<article class="product-card reveal"><div class="brand-card-top">${icon(product.icon)}<span>${categoryName}</span></div><div class="catalog-photo"><img src="assets/${product.image}" alt="${alt}" width="1000" height="1000" loading="lazy"></div><div class="product-body"><h3>${product.brand}</h3><p>${categoryName}</p><a class="ask-price" href="#contact" data-product="${product.brand}" data-category-key="${product.categoryKey}" aria-label="${ariaLabel}">${t(lang, 'productsSection.askForDetails')} ${icon('arrow')}</a></div></article>`;
  }).join('');
  bindProductLinks();
}

function bindProductLinks() {
  document.querySelectorAll('[data-product]').forEach(link => link.addEventListener('click', () => {
    lastInquiry = { brand: link.dataset.product, categoryKey: link.dataset.categoryKey };
    showInquiry();
  }));
}

function showInquiry() {
  if (!lastInquiry) return;
  const selection = document.querySelector('#inquiry-selection');
  const categoryName = t(currentLang, `categoryNames.${lastInquiry.categoryKey}`);
  selection.textContent = `${t(currentLang, 'contact.inquiryPrefix')} ${lastInquiry.brand} — ${categoryName}`;
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
