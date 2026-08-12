/* ==========================================================================
   MicroSure Cambodia — Admin Dashboard Demo Logic
   Front-end only simulation. All data lives in this browser's localStorage.
   ========================================================================== */

const DEMO_USER = { username:"admin", password:"demo123" };

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmtDate(iso){ try{ return new Date(iso+'T00:00:00').toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}); }catch(e){ return iso; } }
function showToast(msg){
  let t = document.querySelector('.toast');
  if(!t){ t = document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove('show'), 2600);
}
function uid(prefix){ return prefix + '-' + Math.random().toString(36).slice(2,8); }

/* ---------------- Login ---------------- */
function initLogin(){
  const form = document.getElementById('login-form');
  const err = document.getElementById('login-error');
  const session = sessionStorage.getItem('msc_admin_session');
  if(session === 'active'){ showApp(); }

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value.trim();
    if(u === DEMO_USER.username && p === DEMO_USER.password){
      sessionStorage.setItem('msc_admin_session','active');
      showApp();
    } else {
      err.textContent = 'Incorrect username or password. Try admin / demo123.';
      err.classList.add('show');
    }
  });

  document.getElementById('logout-btn').addEventListener('click', ()=>{
    sessionStorage.removeItem('msc_admin_session');
    document.getElementById('app-shell').classList.remove('active');
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('login-form').reset();
  });
}
function showApp(){
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-shell').classList.add('active');
  renderAll();
  switchView('dashboard');
}

/* ---------------- Sidebar / view switching ---------------- */
function initSidebar(){
  document.querySelectorAll('.sidebar nav button[data-view]').forEach(btn=>{
    btn.addEventListener('click', ()=> switchView(btn.dataset.view));
  });
  document.getElementById('sidebar-toggle').addEventListener('click', ()=>{
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('nav-scrim').classList.toggle('open');
  });
  document.getElementById('nav-scrim').addEventListener('click', ()=>{
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('nav-scrim').classList.remove('open');
  });
}
function switchView(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+view).classList.add('active');
  document.querySelectorAll('.sidebar nav button[data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  document.getElementById('view-title').textContent = document.querySelector(`.sidebar nav button[data-view="${view}"]`).dataset.label;
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('nav-scrim').classList.remove('open');
  renderAll();
}

/* ---------------- Render everything ---------------- */
function renderAll(){
  renderDashboardHome();
  renderPages();
  renderProducts();
  renderPromotions();
  renderNews();
  renderFaq();
  renderGallery();
  renderHomepageForm();
  renderMedia();
  renderContactForm();
  renderSettingsForm();
}

/* ---------------- Dashboard Home ---------------- */
function renderDashboardHome(){
  const c = getContent(), m = getMeta();
  document.getElementById('stat-products').textContent = c.products.length;
  document.getElementById('stat-news').textContent = c.news.filter(n=>n.status!=='Draft'? true: true).length;
  document.getElementById('stat-promotions').textContent = c.promotions.filter(p=>p.status==='active').length;
  document.getElementById('stat-faq').textContent = c.faq.length;
  document.getElementById('stat-gallery').textContent = c.gallery.length;

  const icons = {page:'📄', promo:'🏷️', news:'📰', contact:'☎️'};
  document.getElementById('activity-list').innerHTML = m.activity.map(a=>`
    <div class="activity-item">
      <div class="ic">${icons[a.type]||'📄'}</div>
      <div><div>${esc(a.text)}</div><div class="when">${esc(a.when)}</div></div>
    </div>`).join('');
}

/* ---------------- Modal helper ---------------- */
function openEditorModal(title, bodyHtml, onSave){
  let overlay = document.getElementById('editor-modal');
  overlay.querySelector('.modal-head h3').textContent = title;
  overlay.querySelector('.modal-body').innerHTML = bodyHtml;
  overlay.classList.add('open');
  const saveBtn = overlay.querySelector('.modal-save');
  const newSaveBtn = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
  newSaveBtn.addEventListener('click', ()=>{
    if(onSave(overlay.querySelector('.modal-body')) !== false){
      overlay.classList.remove('open');
    }
  });
}
function closeModal(){ document.getElementById('editor-modal').classList.remove('open'); }
function initModal(){
  const overlay = document.getElementById('editor-modal');
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
}

/* ---------------- Pages Management ---------------- */
function renderPages(){
  const m = getMeta();
  document.getElementById('pages-table').innerHTML = m.pages.map(p=>`
    <tr>
      <td data-label="Page">${esc(p.name)}</td>
      <td data-label="Status"><span class="status-pill ${p.status.toLowerCase()}">${esc(p.status)}</span></td>
      <td data-label="Last Updated">${fmtDate(p.updated)}</td>
      <td data-label="Action" class="row-actions">
        <button class="btn btn-outline btn-sm" onclick="editPage('${p.id}')">Edit</button>
        <button class="btn btn-outline btn-sm" onclick="showToast('Preview would open ${esc(p.name)} on the live website (demo).')">Preview</button>
      </td>
    </tr>`).join('');
}
function editPage(id){
  const m = getMeta();
  const page = m.pages.find(p=>p.id===id);
  const pc = m.pageContent[id] || {title:page.name, heading:'', body:'', image:''};
  openEditorModal('Edit Page — '+page.name, `
    <img class="thumb-preview" src="${pc.image}" id="pe-preview">
    <div class="form-group"><label>Page Title</label><input id="pe-title" value="${esc(pc.title)}"></div>
    <div class="form-group"><label>Heading</label><input id="pe-heading" value="${esc(pc.heading)}"></div>
    <div class="form-group"><label>Description / Content</label><textarea id="pe-body" rows="4">${esc(pc.body)}</textarea></div>
    <div class="form-group"><label>Featured Image URL</label><input id="pe-image" value="${esc(pc.image)}" onchange="document.getElementById('pe-preview').src=this.value"></div>
  `, (body)=>{
    pc.title = body.querySelector('#pe-title').value;
    pc.heading = body.querySelector('#pe-heading').value;
    pc.body = body.querySelector('#pe-body').value;
    pc.image = body.querySelector('#pe-image').value;
    m.pageContent[id] = pc;
    page.updated = new Date().toISOString().slice(0,10);
    saveMeta(m);
    logActivity(`Page "${page.name}" updated`, 'page');
    showToast('Page saved.');
    renderPages(); renderDashboardHome();
  });
}

/* ---------------- Insurance Products Management ---------------- */
function renderProducts(){
  const c = getContent();
  const search = (document.getElementById('product-search')||{}).value || '';
  const list = c.products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));
  document.getElementById('products-table').innerHTML = list.map(p=>`
    <tr>
      <td data-label="Image"><img class="row-thumb" src="${p.image}" alt=""></td>
      <td data-label="Name">${esc(p.name)}</td>
      <td data-label="Category">${esc(p.category)}</td>
      <td data-label="Description" style="max-width:220px;">${esc(p.shortDesc)}</td>
      <td data-label="Status"><span class="status-pill ${p.status.toLowerCase()}">${esc(p.status)}</span></td>
      <td data-label="Actions" class="row-actions">
        <button class="btn btn-outline btn-sm" onclick="editProduct('${p.id}')">Edit</button>
        <button class="btn btn-outline btn-sm" onclick="toggleProductStatus('${p.id}')">${p.status==='Published'?'Hide':'Publish'}</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">Delete</button>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px;">No products found.</td></tr>`;
}
function toggleProductStatus(id){
  const c = getContent();
  const p = c.products.find(x=>x.id===id);
  p.status = p.status==='Published' ? 'Hidden' : 'Published';
  saveContent(c);
  logActivity(`Product "${p.name}" ${p.status==='Published'?'published':'hidden'}`, 'page');
  showToast('Status updated.');
  renderProducts(); renderDashboardHome();
}
function deleteProduct(id){
  if(!confirm('Delete this product? This demo change is stored only in your browser.')) return;
  const c = getContent();
  const p = c.products.find(x=>x.id===id);
  c.products = c.products.filter(x=>x.id!==id);
  saveContent(c);
  logActivity(`Product "${p.name}" deleted`, 'page');
  showToast('Product deleted.');
  renderProducts(); renderDashboardHome();
}
function editProduct(id){
  const c = getContent();
  const isNew = !id;
  const p = isNew ? { id: uid('product'), name:'', category:'Personal', image:'assets/images/why-choose-us.svg', shortDesc:'', highlights:[], eligibility:'', cta:'Ask About This Plan', status:'Published' } : c.products.find(x=>x.id===id);
  openEditorModal(isNew ? 'Add Product' : 'Edit Product — '+p.name, `
    <img class="thumb-preview" src="${p.image}" id="pr-preview">
    <div class="form-row2">
      <div class="form-group"><label>Product Name</label><input id="pr-name" value="${esc(p.name)}"></div>
      <div class="form-group"><label>Category</label>
        <select id="pr-category">
          ${['Personal','Family','Health','Business','Agriculture'].map(cat=>`<option ${cat===p.category?'selected':''}>${cat}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group"><label>Featured Image URL</label><input id="pr-image" value="${esc(p.image)}" onchange="document.getElementById('pr-preview').src=this.value"></div>
    <div class="form-group"><label>Short Description</label><textarea id="pr-desc" rows="2">${esc(p.shortDesc)}</textarea></div>
    <div class="form-group"><label>Coverage Highlights (one per line)</label><textarea id="pr-highlights" rows="3">${esc((p.highlights||[]).join(String.fromCharCode(10)))}</textarea></div>
    <div class="form-group"><label>Eligibility / Notes</label><textarea id="pr-eligibility" rows="2">${esc(p.eligibility)}</textarea></div>
    <div class="form-row2">
      <div class="form-group"><label>CTA Wording</label><input id="pr-cta" value="${esc(p.cta)}"></div>
      <div class="form-group"><label>Publish Status</label>
        <select id="pr-status"><option ${p.status==='Published'?'selected':''}>Published</option><option ${p.status==='Hidden'?'selected':''}>Hidden</option></select>
      </div>
    </div>
  `, (body)=>{
    p.name = body.querySelector('#pr-name').value || 'Untitled Product';
    p.category = body.querySelector('#pr-category').value;
    p.image = body.querySelector('#pr-image').value;
    p.shortDesc = body.querySelector('#pr-desc').value;
    p.highlights = body.querySelector('#pr-highlights').value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    p.eligibility = body.querySelector('#pr-eligibility').value;
    p.cta = body.querySelector('#pr-cta').value;
    p.status = body.querySelector('#pr-status').value;
    if(isNew) c.products.push(p);
    saveContent(c);
    logActivity(`Product "${p.name}" ${isNew?'added':'updated'}`, 'page');
    showToast('Product saved.');
    renderProducts(); renderDashboardHome();
  });
}

/* ---------------- Promotions Management ---------------- */
function renderPromotions(){
  const c = getContent();
  document.getElementById('promotions-table').innerHTML = c.promotions.map(p=>`
    <tr>
      <td data-label="Image"><img class="row-thumb" src="${p.image}" alt=""></td>
      <td data-label="Title">${esc(p.title)}</td>
      <td data-label="Start">${fmtDate(p.start)}</td>
      <td data-label="End">${fmtDate(p.end)}</td>
      <td data-label="Status"><span class="status-pill ${p.status}">${p.status.charAt(0).toUpperCase()+p.status.slice(1)}</span></td>
      <td data-label="Actions" class="row-actions">
        <button class="btn btn-outline btn-sm" onclick="editPromotion('${p.id}')">Edit</button>
        <button class="btn btn-outline btn-sm" onclick="togglePromoStatus('${p.id}')">${p.status==='active'?'Unpublish':'Publish'}</button>
        <button class="btn btn-danger btn-sm" onclick="deletePromotion('${p.id}')">Delete</button>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px;">No promotions found.</td></tr>`;
}
function togglePromoStatus(id){
  const c = getContent();
  const p = c.promotions.find(x=>x.id===id);
  p.status = p.status==='active' ? 'expired' : 'active';
  saveContent(c);
  logActivity(`Promotion "${p.title}" ${p.status==='active'?'published':'unpublished'}`, 'promo');
  showToast('Status updated.');
  renderPromotions(); renderDashboardHome();
}
function deletePromotion(id){
  if(!confirm('Delete this promotion?')) return;
  const c = getContent();
  const p = c.promotions.find(x=>x.id===id);
  c.promotions = c.promotions.filter(x=>x.id!==id);
  saveContent(c);
  logActivity(`Promotion "${p.title}" deleted`, 'promo');
  showToast('Promotion deleted.');
  renderPromotions(); renderDashboardHome();
}
function editPromotion(id){
  const c = getContent();
  const isNew = !id;
  const p = isNew ? { id: uid('promo'), title:'', image:'assets/images/village-market.svg', description:'', start:new Date().toISOString().slice(0,10), end:new Date().toISOString().slice(0,10), status:'upcoming' } : c.promotions.find(x=>x.id===id);
  openEditorModal(isNew?'Add Promotion':'Edit Promotion — '+p.title, `
    <img class="thumb-preview" src="${p.image}" id="pm-preview">
    <div class="form-group"><label>Promotion Title</label><input id="pm-title" value="${esc(p.title)}"></div>
    <div class="form-group"><label>Image / Banner URL</label><input id="pm-image" value="${esc(p.image)}" onchange="document.getElementById('pm-preview').src=this.value"></div>
    <div class="form-group"><label>Description</label><textarea id="pm-desc" rows="3">${esc(p.description)}</textarea></div>
    <div class="form-row2">
      <div class="form-group"><label>Start Date</label><input type="date" id="pm-start" value="${p.start}"></div>
      <div class="form-group"><label>End Date</label><input type="date" id="pm-end" value="${p.end}"></div>
    </div>
    <div class="form-group"><label>Status</label>
      <select id="pm-status">
        <option value="active" ${p.status==='active'?'selected':''}>Active</option>
        <option value="upcoming" ${p.status==='upcoming'?'selected':''}>Upcoming</option>
        <option value="expired" ${p.status==='expired'?'selected':''}>Expired</option>
      </select>
    </div>
  `, (body)=>{
    p.title = body.querySelector('#pm-title').value || 'Untitled Promotion';
    p.image = body.querySelector('#pm-image').value;
    p.description = body.querySelector('#pm-desc').value;
    p.start = body.querySelector('#pm-start').value;
    p.end = body.querySelector('#pm-end').value;
    p.status = body.querySelector('#pm-status').value;
    if(isNew) c.promotions.push(p);
    saveContent(c);
    logActivity(`Promotion "${p.title}" ${isNew?'added':'updated'}`, 'promo');
    showToast('Promotion saved.');
    renderPromotions(); renderDashboardHome();
  });
}

/* ---------------- News Management ---------------- */
function renderNews(){
  const c = getContent();
  document.getElementById('news-table').innerHTML = c.news.map(n=>`
    <tr>
      <td data-label="Image"><img class="row-thumb" src="${n.image}" alt=""></td>
      <td data-label="Title">${esc(n.title)}</td>
      <td data-label="Category">${esc(n.category)}</td>
      <td data-label="Published">${fmtDate(n.date)}</td>
      <td data-label="Status"><span class="status-pill ${n.status.toLowerCase()}">${esc(n.status)}</span></td>
      <td data-label="Actions" class="row-actions">
        <button class="btn btn-outline btn-sm" onclick="editNews('${n.id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteNews('${n.id}')">Delete</button>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px;">No articles found.</td></tr>`;
}
function deleteNews(id){
  if(!confirm('Delete this article?')) return;
  const c = getContent();
  const n = c.news.find(x=>x.id===id);
  c.news = c.news.filter(x=>x.id!==id);
  saveContent(c);
  logActivity(`News article "${n.title}" deleted`, 'news');
  showToast('Article deleted.');
  renderNews(); renderDashboardHome();
}
function editNews(id){
  const c = getContent();
  const isNew = !id;
  const n = isNew ? { id: uid('news'), title:'', category:'Company News', date:new Date().toISOString().slice(0,10), image:'assets/images/hero-news.svg', excerpt:'', content:'', status:'Draft' } : c.news.find(x=>x.id===id);
  openEditorModal(isNew?'Add News Article':'Edit Article — '+n.title, `
    <img class="thumb-preview" src="${n.image}" id="ns-preview">
    <div class="form-group"><label>Title</label><input id="ns-title" value="${esc(n.title)}"></div>
    <div class="form-group"><label>Featured Image URL</label><input id="ns-image" value="${esc(n.image)}" onchange="document.getElementById('ns-preview').src=this.value"></div>
    <div class="form-group"><label>Excerpt</label><textarea id="ns-excerpt" rows="2">${esc(n.excerpt)}</textarea></div>
    <div class="form-group"><label>Article Content</label><textarea id="ns-content" rows="4">${esc(n.content)}</textarea></div>
    <div class="form-row2">
      <div class="form-group"><label>Category</label><input id="ns-category" value="${esc(n.category)}"></div>
      <div class="form-group"><label>Publish Date</label><input type="date" id="ns-date" value="${n.date}"></div>
    </div>
    <div class="form-group"><label>Status</label>
      <select id="ns-status"><option ${n.status==='Published'?'selected':''}>Published</option><option ${n.status==='Draft'?'selected':''}>Draft</option></select>
    </div>
  `, (body)=>{
    n.title = body.querySelector('#ns-title').value || 'Untitled Article';
    n.image = body.querySelector('#ns-image').value;
    n.excerpt = body.querySelector('#ns-excerpt').value;
    n.content = body.querySelector('#ns-content').value;
    n.category = body.querySelector('#ns-category').value;
    n.date = body.querySelector('#ns-date').value;
    n.status = body.querySelector('#ns-status').value;
    if(isNew) c.news.unshift(n);
    saveContent(c);
    logActivity(`News article "${n.title}" ${isNew?'added':'updated'}`, 'news');
    showToast('Article saved.');
    renderNews(); renderDashboardHome();
  });
}

/* ---------------- FAQ Management ---------------- */
function renderFaq(){
  const c = getContent();
  document.getElementById('faq-table').innerHTML = c.faq.map((f,i)=>`
    <tr>
      <td data-label="Question" style="max-width:280px;">${esc(f.q)}</td>
      <td data-label="Category">${esc(f.cat)}</td>
      <td data-label="Status"><span class="status-pill ${(f.status||'Published').toLowerCase()}">${esc(f.status||'Published')}</span></td>
      <td data-label="Actions" class="row-actions">
        <button class="btn btn-outline btn-sm" onclick="editFaq(${i})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteFaq(${i})">Delete</button>
      </td>
    </tr>`).join('') || `<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:30px;">No FAQs found.</td></tr>`;
}
function deleteFaq(i){
  if(!confirm('Delete this FAQ?')) return;
  const c = getContent();
  c.faq.splice(i,1);
  saveContent(c);
  logActivity('FAQ item deleted', 'page');
  showToast('FAQ deleted.');
  renderFaq(); renderDashboardHome();
}
function editFaq(i){
  const c = getContent();
  const isNew = i===undefined || i===null;
  const f = isNew ? { q:'', a:'', cat:'General Insurance', status:'Published' } : c.faq[i];
  openEditorModal(isNew?'Add FAQ':'Edit FAQ', `
    <div class="form-group"><label>Question</label><input id="fq-q" value="${esc(f.q)}"></div>
    <div class="form-group"><label>Answer</label><textarea id="fq-a" rows="3">${esc(f.a)}</textarea></div>
    <div class="form-row2">
      <div class="form-group"><label>Category</label>
        <select id="fq-cat">
          ${['General Insurance','Coverage','Claims','Payments / Premium Information','Contact & Support'].map(cat=>`<option ${cat===f.cat?'selected':''}>${cat}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Publish Status</label>
        <select id="fq-status"><option ${f.status==='Published'?'selected':''}>Published</option><option ${f.status==='Draft'?'selected':''}>Draft</option></select>
      </div>
    </div>
  `, (body)=>{
    f.q = body.querySelector('#fq-q').value || 'Untitled Question';
    f.a = body.querySelector('#fq-a').value;
    f.cat = body.querySelector('#fq-cat').value;
    f.status = body.querySelector('#fq-status').value;
    if(isNew) c.faq.push(f);
    saveContent(c);
    logActivity(`FAQ "${f.q}" ${isNew?'added':'updated'}`, 'page');
    showToast('FAQ saved.');
    renderFaq(); renderDashboardHome();
  });
}

/* ---------------- Gallery Management ---------------- */
function renderGallery(){
  const c = getContent();
  document.getElementById('gallery-manage-grid').innerHTML = c.gallery.map((g,i)=>`
    <div class="gm-item">
      <img src="${g.image}" alt="">
      <div class="gm-body">
        <div class="gm-cap">${esc(g.caption)}</div>
        <div class="gm-cat">${esc(g.category)}</div>
        <div class="row-actions" style="margin-top:8px;">
          <button class="btn btn-outline btn-sm" onclick="editGalleryItem(${i})">Edit</button>
          <button class="btn btn-outline btn-sm" onclick="moveGalleryItem(${i},-1)">↑</button>
          <button class="btn btn-outline btn-sm" onclick="moveGalleryItem(${i},1)">↓</button>
          <button class="btn btn-danger btn-sm" onclick="deleteGalleryItem(${i})">Delete</button>
        </div>
      </div>
    </div>`).join('') || `<p style="color:var(--muted);">No gallery images yet.</p>`;
}
function moveGalleryItem(i, dir){
  const c = getContent();
  const j = i+dir;
  if(j<0 || j>=c.gallery.length) return;
  [c.gallery[i], c.gallery[j]] = [c.gallery[j], c.gallery[i]];
  saveContent(c);
  renderGallery();
}
function deleteGalleryItem(i){
  if(!confirm('Delete this image?')) return;
  const c = getContent();
  c.gallery.splice(i,1);
  saveContent(c);
  logActivity('Gallery image deleted', 'page');
  showToast('Image deleted.');
  renderGallery(); renderDashboardHome();
}
function editGalleryItem(i){
  const c = getContent();
  const isNew = i===undefined || i===null;
  const g = isNew ? { id: uid('g'), image:'assets/images/community-outreach.svg', caption:'', category:'Outreach' } : c.gallery[i];
  openEditorModal(isNew?'Upload Image':'Edit Gallery Image', `
    <img class="thumb-preview" src="${g.image}" id="gl-preview">
    <div class="form-group"><label>Image URL (simulated upload)</label><input id="gl-image" value="${esc(g.image)}" onchange="document.getElementById('gl-preview').src=this.value"></div>
    <div class="form-group"><label>Caption</label><input id="gl-caption" value="${esc(g.caption)}"></div>
    <div class="form-group"><label>Category</label>
      <select id="gl-category">
        ${['Outreach','Consultation','Team','Awareness','Community'].map(cat=>`<option ${cat===g.category?'selected':''}>${cat}</option>`).join('')}
      </select>
    </div>
  `, (body)=>{
    g.image = body.querySelector('#gl-image').value;
    g.caption = body.querySelector('#gl-caption').value || 'Untitled photo';
    g.category = body.querySelector('#gl-category').value;
    if(isNew) c.gallery.push(g);
    saveContent(c);
    logActivity(`Gallery image "${g.caption}" ${isNew?'uploaded':'updated'}`, 'page');
    showToast('Gallery updated.');
    renderGallery(); renderDashboardHome();
  });
}

/* ---------------- Homepage Management ---------------- */
function renderHomepageForm(){
  const c = getContent();
  document.getElementById('hp-title').value = c.homepage.heroTitle;
  document.getElementById('hp-subtitle').value = c.homepage.heroSubtitle;
  document.getElementById('hp-image').value = c.homepage.heroImage;
  document.getElementById('hp-preview').src = c.homepage.heroImage;
  document.getElementById('hp-cta').value = c.homepage.ctaText;

  const prodWrap = document.getElementById('hp-featured-products');
  prodWrap.innerHTML = c.products.map(p=>`
    <label style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:.85rem;">
      <input type="checkbox" value="${p.id}" ${c.homepage.featuredProductIds.includes(p.id)?'checked':''}> ${esc(p.name)}
    </label>`).join('');

  const promoSel = document.getElementById('hp-featured-promo');
  promoSel.innerHTML = c.promotions.map(p=>`<option value="${p.id}" ${p.id===c.homepage.featuredPromotionId?'selected':''}>${esc(p.title)}</option>`).join('');

  const newsWrap = document.getElementById('hp-featured-news');
  newsWrap.innerHTML = c.news.map(n=>`
    <label style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:.85rem;">
      <input type="checkbox" value="${n.id}" ${c.homepage.featuredNewsIds.includes(n.id)?'checked':''}> ${esc(n.title)}
    </label>`).join('');
}
function initHomepageForm(){
  document.getElementById('hp-image').addEventListener('input', e=> document.getElementById('hp-preview').src = e.target.value);
  document.getElementById('homepage-form').addEventListener('submit', e=>{
    e.preventDefault();
    const c = getContent();
    c.homepage.heroTitle = document.getElementById('hp-title').value;
    c.homepage.heroSubtitle = document.getElementById('hp-subtitle').value;
    c.homepage.heroImage = document.getElementById('hp-image').value;
    c.homepage.ctaText = document.getElementById('hp-cta').value;
    c.homepage.featuredProductIds = Array.from(document.querySelectorAll('#hp-featured-products input:checked')).map(i=>i.value);
    c.homepage.featuredPromotionId = document.getElementById('hp-featured-promo').value;
    c.homepage.featuredNewsIds = Array.from(document.querySelectorAll('#hp-featured-news input:checked')).map(i=>i.value);
    saveContent(c);
    logActivity('Homepage settings updated', 'page');
    showToast('Homepage settings saved.');
    renderDashboardHome();
  });
}

/* ---------------- Media Library ---------------- */
function renderMedia(){
  const m = getMeta();
  document.getElementById('media-grid').innerHTML = m.media.map((f,i)=>`
    <div class="media-item">
      <img src="${f.url}" alt="">
      <div class="meta">
        <div class="fn">${esc(f.name)}</div>
        <div class="dt">${fmtDate(f.date)} · ${esc(f.size)}</div>
      </div>
      <div class="m-actions">
        <button class="btn btn-outline btn-sm" onclick="copyMediaUrl('${f.url}')">Copy</button>
        <button class="btn btn-danger btn-sm" onclick="deleteMedia(${i})">Delete</button>
      </div>
    </div>`).join('');
}
function copyMediaUrl(url){
  navigator.clipboard && navigator.clipboard.writeText(url).catch(()=>{});
  showToast('Image URL copied.');
}
function deleteMedia(i){
  if(!confirm('Delete this file from the media library?')) return;
  const m = getMeta();
  m.media.splice(i,1);
  saveMeta(m);
  showToast('File deleted.');
  renderMedia();
}
function initMediaUpload(){
  document.getElementById('media-upload-btn').addEventListener('click', ()=>{
    const m = getMeta();
    // Simulated upload — cycles through the local sample image set (no network dependency).
    const sample = ['assets/images/family-protection.svg','assets/images/small-business.svg','assets/images/motorbike-rider.svg','assets/images/farmer-agriculture.svg','assets/images/community-outreach.svg','assets/images/consultation.svg','assets/images/health-checkup.svg','assets/images/customer-service.svg'];
    const url = sample[Math.floor(Math.random()*sample.length)];
    m.media.unshift({ name:`upload-${Date.now()}.svg`, url, date:new Date().toISOString().slice(0,10), size:(Math.floor(Math.random()*300)+150)+' KB' });
    saveMeta(m);
    showToast('Image uploaded (demo).');
    renderMedia();
  });
}

/* ---------------- Contact Information ---------------- */
function renderContactForm(){
  const c = getContent();
  document.getElementById('ci-name').value = c.brand.name;
  document.getElementById('ci-phone').value = c.brand.phone;
  document.getElementById('ci-telegram').value = c.brand.telegram;
  document.getElementById('ci-email').value = c.brand.email;
  document.getElementById('ci-address').value = c.brand.address;
  document.getElementById('ci-hours').value = c.brand.hours;
  document.getElementById('ci-maps').value = c.brand.mapUrl;
  document.getElementById('ci-facebook').value = c.brand.facebook;
}
function initContactForm(){
  document.getElementById('contact-info-form').addEventListener('submit', e=>{
    e.preventDefault();
    const c = getContent();
    c.brand.name = document.getElementById('ci-name').value;
    c.brand.phone = document.getElementById('ci-phone').value;
    c.brand.telegram = document.getElementById('ci-telegram').value;
    c.brand.email = document.getElementById('ci-email').value;
    c.brand.address = document.getElementById('ci-address').value;
    c.brand.hours = document.getElementById('ci-hours').value;
    c.brand.mapUrl = document.getElementById('ci-maps').value;
    c.brand.facebook = document.getElementById('ci-facebook').value;
    saveContent(c);
    logActivity('Contact information updated', 'contact');
    showToast('Contact information saved.');
  });
}

/* ---------------- Settings ---------------- */
function renderSettingsForm(){
  const m = getMeta();
  document.getElementById('st-website-name').value = m.settings.websiteName;
  document.getElementById('st-default-lang').value = m.settings.defaultLanguage;
  document.getElementById('st-khmer').checked = m.settings.khmerEnabled;
  document.getElementById('st-english').checked = m.settings.englishEnabled;
  document.getElementById('st-seo-title').value = m.settings.seoTitle;
  document.getElementById('st-meta-desc').value = m.settings.metaDescription;
}
function initSettingsForm(){
  document.getElementById('settings-form').addEventListener('submit', e=>{
    e.preventDefault();
    const m = getMeta();
    m.settings.websiteName = document.getElementById('st-website-name').value;
    m.settings.defaultLanguage = document.getElementById('st-default-lang').value;
    m.settings.khmerEnabled = document.getElementById('st-khmer').checked;
    m.settings.englishEnabled = document.getElementById('st-english').checked;
    m.settings.seoTitle = document.getElementById('st-seo-title').value;
    m.settings.metaDescription = document.getElementById('st-meta-desc').value;
    saveMeta(m);
    logActivity('Website settings updated', 'page');
    showToast('Settings saved.');
  });
}

/* ---------------- Search/filter bindings ---------------- */
function initFilters(){
  const ps = document.getElementById('product-search');
  if(ps) ps.addEventListener('input', renderProducts);
}

/* ---------------- Init ---------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  initLogin();
  initSidebar();
  initModal();
  initHomepageForm();
  initContactForm();
  initSettingsForm();
  initMediaUpload();
  initFilters();

  document.getElementById('add-product-btn').addEventListener('click', ()=>editProduct(null));
  document.getElementById('add-promotion-btn').addEventListener('click', ()=>editPromotion(null));
  document.getElementById('add-news-btn').addEventListener('click', ()=>editNews(null));
  document.getElementById('add-faq-btn').addEventListener('click', ()=>editFaq(null));
  document.getElementById('add-gallery-btn').addEventListener('click', ()=>editGalleryItem(null));
});
