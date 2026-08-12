/* ==========================================================================
   MicroSure Cambodia — Shared Site Behaviour
   ========================================================================== */

/* ---------- i18n (demo bilingual toggle) ---------- */
const I18N = {
  en: {
    nav_home:"Home", nav_about:"About Us", nav_products:"Insurance Products",
    nav_benefits:"Benefits & Claims", nav_promotions:"Promotions", nav_news:"News",
    nav_faq:"FAQ", nav_gallery:"Gallery", nav_contact:"Contact",
    top_help:"Need help? We're happy to guide you.",
    footer_quicklinks:"Quick Links", footer_products:"Insurance Products", footer_contact:"Contact",
    footer_rights:"Demo build for client presentation — content is sample only.",
    ask_plan:"Ask About This Plan", view_details:"View Details",
    read_more:"Read More", send_inquiry:"Send Inquiry"
  },
  km: {
    nav_home:"ទំព័រដើម", nav_about:"អំពីយើងខ្ញុំ", nav_products:"ផលិតផលធានារ៉ាប់រង",
    nav_benefits:"អត្ថប្រយោជន៍", nav_promotions:"ការផ្សព្វផ្សាយ", nav_news:"ព័ត៌មាន",
    nav_faq:"សំណួរញឹកញាប់", nav_gallery:"វិចិត្រសាល", nav_contact:"ទាក់ទង",
    top_help:"ត្រូវការជំនួយ? យើងខ្ញុំរីករាយក្នុងការណែនាំ។",
    footer_quicklinks:"តំណភ្ជាប់រហ័ស", footer_products:"ផលិតផលធានារ៉ាប់រង", footer_contact:"ទំនាក់ទំនង",
    footer_rights:"សាកល្បងសម្រាប់បទបង្ហាញអតិថិជន — ខ្លឹមសារគំរូតែប៉ុណ្ណោះ។",
    ask_plan:"សាកសួរអំពីគម្រោងនេះ", view_details:"មើលលម្អិត",
    read_more:"អានបន្ថែម", send_inquiry:"ផ្ញើសំណួរ"
  }
};

function setLang(lang){
  localStorage.setItem('msc_lang', lang);
  document.body.classList.toggle('lang-km', lang==='km');
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
  });
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}
function initLang(){
  const saved = localStorage.getItem('msc_lang') || 'en';
  setLang(saved);
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.addEventListener('click', ()=> setLang(b.dataset.lang));
  });
}

/* ---------- Mobile nav ---------- */
function initNav(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const scrim = document.querySelector('.nav-scrim');
  if(!toggle || !nav) return;
  const close = ()=>{ nav.classList.remove('open'); scrim && scrim.classList.remove('open'); };
  toggle.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    scrim && scrim.classList.toggle('open');
  });
  scrim && scrim.addEventListener('click', close);
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', close));

  const path = location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a[data-page]').forEach(a=>{
    if(a.getAttribute('data-page') === path) a.classList.add('active');
  });
}

/* ---------- Accordion (FAQ) ---------- */
function initAccordions(){
  document.querySelectorAll('.accordion-q').forEach(q=>{
    q.addEventListener('click', ()=>{
      const item = q.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });
}

/* ---------- Lightbox (Gallery) ---------- */
let LB_ITEMS = [], LB_INDEX = 0;
function openLightbox(items, index){
  LB_ITEMS = items; LB_INDEX = index;
  const lb = document.querySelector('.lightbox');
  renderLightbox();
  lb.classList.add('open');
}
function renderLightbox(){
  const lb = document.querySelector('.lightbox');
  const item = LB_ITEMS[LB_INDEX];
  lb.querySelector('img').src = item.image;
  lb.querySelector('.lb-cap').textContent = item.caption;
}
function initLightbox(){
  const lb = document.querySelector('.lightbox');
  if(!lb) return;
  lb.querySelector('.lb-close').addEventListener('click', ()=> lb.classList.remove('open'));
  lb.querySelector('.lb-next').addEventListener('click', ()=>{ LB_INDEX = (LB_INDEX+1) % LB_ITEMS.length; renderLightbox(); });
  lb.querySelector('.lb-prev').addEventListener('click', ()=>{ LB_INDEX = (LB_INDEX-1+LB_ITEMS.length) % LB_ITEMS.length; renderLightbox(); });
  lb.addEventListener('click', (e)=>{ if(e.target === lb) lb.classList.remove('open'); });
}

/* ---------- Modal (product detail) ---------- */
function openModal(html){
  let overlay = document.querySelector('.modal-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal-box"><button class="modal-close" aria-label="Close">&times;</button><div class="modal-inner"></div></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e=>{ if(e.target === overlay) overlay.classList.remove('open'); });
    overlay.querySelector('.modal-close').addEventListener('click', ()=> overlay.classList.remove('open'));
  }
  overlay.querySelector('.modal-inner').innerHTML = html;
  overlay.classList.add('open');
}

/* ---------- Inquiry form (demo only) ---------- */
function initForms(){
  document.querySelectorAll('form.demo-form').forEach(form=>{
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const success = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
      form.reset();
      if(success) success.classList.add('show');
      else alert('Thank you — your inquiry has been received. (Demo only, no data is sent.)');
    });
  });
}

/* ---------- Helpers ---------- */
function fmtDate(iso){
  const d = new Date(iso+'T00:00:00');
  return d.toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});
}
function esc(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

document.addEventListener('DOMContentLoaded', ()=>{
  initNav();
  initLang();
  initAccordions();
  initLightbox();
  initForms();
});
