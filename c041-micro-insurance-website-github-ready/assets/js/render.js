/* ==========================================================================
   MicroSure Cambodia — Dynamic Content Rendering
   Reads from getContent() (data.js) which merges DEFAULT_CONTENT with any
   localStorage overrides saved by the Dashboard demo (key: msc_content).
   ========================================================================== */

function productCardHTML(p, opts){
  opts = opts || {};
  return `
  <div class="product-card">
    <div class="thumb-wrap"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"></div>
    <div class="body">
      <span class="tag">${esc(p.category)}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.shortDesc)}</p>
      ${opts.showPoints !== false ? `<ul class="points">${p.highlights.slice(0,3).map(h=>`<li>${esc(h)}</li>`).join('')}</ul>` : ''}
      <div class="actions">
        <button class="btn btn-ghost btn-sm" onclick="showProductModal('${p.id}')">View Details</button>
        <a class="btn btn-primary btn-sm" href="contact.html?product=${encodeURIComponent(p.name)}">Ask About This Plan</a>
      </div>
    </div>
  </div>`;
}

function showProductModal(id){
  const c = getContent();
  const p = c.products.find(x=>x.id===id);
  if(!p) return;
  openModal(`
    <img src="${p.image}" alt="${esc(p.name)}">
    <div class="modal-body">
      <span class="tag">${esc(p.category)}</span>
      <h2>${esc(p.name)}</h2>
      <p>${esc(p.shortDesc)}</p>
      <h4>Key Coverage Highlights</h4>
      <ul class="points">${p.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul>
      <h4>Eligibility / Notes</h4>
      <p style="font-size:.85rem;">${esc(p.eligibility)}</p>
      <span class="demo-tag">Sample content for demonstration</span>
      <div class="actions" style="margin-top:10px;">
        <a class="btn btn-primary" href="contact.html?product=${encodeURIComponent(p.name)}">${esc(p.cta)}</a>
      </div>
    </div>
  `);
}

function newsCardHTML(n){
  return `
  <div class="news-card">
    <div class="thumb-wrap"><img src="${n.image}" alt="${esc(n.title)}" loading="lazy"><span class="cat-badge">${esc(n.category)}</span></div>
    <div class="body">
      <div class="date">${fmtDate(n.date)}</div>
      <h3>${esc(n.title)}</h3>
      <p>${esc(n.excerpt)}</p>
      <button class="btn btn-ghost btn-sm" onclick="showNewsModal('${n.id}')">Read More</button>
    </div>
  </div>`;
}
function showNewsModal(id){
  const c = getContent();
  const n = c.news.find(x=>x.id===id);
  if(!n) return;
  openModal(`
    <img src="${n.image}" alt="${esc(n.title)}">
    <div class="modal-body">
      <span class="tag">${esc(n.category)}</span>
      <h2>${esc(n.title)}</h2>
      <div class="date" style="margin-bottom:14px;">${fmtDate(n.date)}</div>
      <p>${esc(n.content)}</p>
      <span class="demo-tag">Sample content for demonstration</span>
    </div>
  `);
}

function promoCardHTML(p){
  const labels = {active:'Active', upcoming:'Upcoming', expired:'Past Campaign'};
  return `
  <div class="promo-card">
    <div class="thumb-wrap"><img src="${p.image}" alt="${esc(p.title)}" loading="lazy">
      <span class="status-badge ${p.status}">${labels[p.status]}</span>
    </div>
    <div class="body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      <p style="font-size:.8rem;color:var(--muted);">${fmtDate(p.start)} — ${fmtDate(p.end)}</p>
    </div>
  </div>`;
}

function galleryItemHTML(g, idx){
  return `<div class="g-item" data-cat="${esc(g.category)}" onclick="openLightbox(window.__galleryItems, ${idx})">
    <img src="${g.image}" alt="${esc(g.caption)}" loading="lazy">
    <div class="cap">${esc(g.caption)}</div>
  </div>`;
}

function faqItemHTML(f){
  return `<div class="accordion-item">
    <div class="accordion-q"><span>${esc(f.q)}</span><span class="plus">+</span></div>
    <div class="accordion-a"><p>${esc(f.a)}</p></div>
  </div>`;
}

/* Render dispatch — called on DOMContentLoaded from each page if containers exist */
function renderDynamicContent(){
  const c = getContent();

  // Homepage featured products
  const featProd = document.getElementById('featured-products');
  if(featProd){
    const items = c.homepage.featuredProductIds.map(id=>c.products.find(p=>p.id===id)).filter(Boolean);
    featProd.innerHTML = items.map(p=>productCardHTML(p)).join('');
  }

  // Homepage featured promotion
  const featPromo = document.getElementById('featured-promotion');
  if(featPromo){
    const promo = c.promotions.find(p=>p.id===c.homepage.featuredPromotionId) || c.promotions[0];
    if(promo) featPromo.innerHTML = promoCardHTML(promo);
  }

  // Homepage featured news
  const featNews = document.getElementById('featured-news');
  if(featNews){
    const items = c.homepage.featuredNewsIds.map(id=>c.news.find(n=>n.id===id)).filter(Boolean);
    featNews.innerHTML = items.map(newsCardHTML).join('');
  }

  // Homepage FAQ preview
  const faqPreview = document.getElementById('faq-preview');
  if(faqPreview){
    faqPreview.innerHTML = c.faq.slice(0,5).map(faqItemHTML).join('');
  }

  // Homepage hero (data-driven so dashboard "Homepage" edits show up)
  const heroTitle = document.getElementById('hero-title');
  const heroSub = document.getElementById('hero-subtitle');
  const heroImg = document.getElementById('hero-image');
  const heroCta = document.getElementById('hero-cta-text');
  if(heroTitle) heroTitle.textContent = c.homepage.heroTitle;
  if(heroSub) heroSub.textContent = c.homepage.heroSubtitle;
  if(heroImg) heroImg.src = c.homepage.heroImage;
  if(heroCta) heroCta.textContent = c.homepage.ctaText;

  // Products page
  const allProducts = document.getElementById('all-products');
  if(allProducts){
    const renderList = (filter)=>{
      const items = filter && filter !== 'All' ? c.products.filter(p=>p.category===filter) : c.products;
      allProducts.innerHTML = items.map(p=>productCardHTML(p)).join('');
    };
    renderList(null);
    document.querySelectorAll('.product-filter').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.product-filter').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        renderList(btn.dataset.filter);
      });
    });
  }

  // Promotions page
  const allPromos = document.getElementById('all-promotions');
  if(allPromos){
    allPromos.innerHTML = c.promotions.map(promoCardHTML).join('');
  }

  // News page
  const allNews = document.getElementById('all-news');
  if(allNews){
    allNews.innerHTML = c.news.map(newsCardHTML).join('');
  }

  // FAQ page
  const allFaq = document.getElementById('all-faq');
  if(allFaq){
    const cats = ['All', ...new Set(c.faq.map(f=>f.cat))];
    const catWrap = document.getElementById('faq-cats');
    if(catWrap){
      catWrap.innerHTML = cats.map(cat=>`<button class="${cat==='All'?'active':''}" data-cat="${esc(cat)}">${esc(cat)}</button>`).join('');
    }
    const renderFaq = (cat)=>{
      const items = (!cat || cat==='All') ? c.faq : c.faq.filter(f=>f.cat===cat);
      allFaq.innerHTML = items.map(faqItemHTML).join('');
      initAccordions();
    };
    renderFaq(null);
    document.querySelectorAll('#faq-cats button').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('#faq-cats button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        renderFaq(btn.dataset.cat);
      });
    });
  }

  // Gallery page
  const galleryGrid = document.getElementById('gallery-grid');
  if(galleryGrid){
    window.__galleryItems = c.gallery;
    const renderGallery = (cat)=>{
      const items = (!cat || cat==='All') ? c.gallery : c.gallery.filter(g=>g.category===cat);
      window.__galleryItems = items;
      galleryGrid.innerHTML = items.map((g,i)=>galleryItemHTML(g,i)).join('');
    };
    renderGallery(null);
    const cats = ['All', ...new Set(c.gallery.map(g=>g.category))];
    const filterWrap = document.getElementById('gallery-filters');
    if(filterWrap){
      filterWrap.innerHTML = cats.map(cat=>`<button class="${cat==='All'?'active':''}" data-cat="${esc(cat)}">${esc(cat)}</button>`).join('');
      filterWrap.querySelectorAll('button').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          filterWrap.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
          renderGallery(btn.dataset.cat);
        });
      });
    }
  }

  // Contact page — prefill product interest from query string
  const productSelect = document.getElementById('product-interest');
  if(productSelect){
    productSelect.innerHTML = '<option value="">Select a product (optional)</option>' + c.products.map(p=>`<option>${esc(p.name)}</option>`).join('') + '<option>General Inquiry</option>';
    const params = new URLSearchParams(location.search);
    const preset = params.get('product');
    if(preset) productSelect.value = preset;
  }

  // Contact info blocks
  document.querySelectorAll('[data-contact]').forEach(el=>{
    const key = el.getAttribute('data-contact');
    if(c.brand[key]) el.textContent = c.brand[key];
  });
  const mapFrame = document.getElementById('map-frame');
  if(mapFrame) mapFrame.src = c.brand.mapUrl;
}

document.addEventListener('DOMContentLoaded', renderDynamicContent);
