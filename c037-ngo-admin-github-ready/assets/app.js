/* C037 NGO Demo — Admin Dashboard Logic (vanilla JS, no build step, no backend) */

let DATA = CMS.load();
let LANG = "en";
let CUR = "dashboard";
let FILTERS = { projStatus:"All", projProgram:"All", projProvince:"All", newsStatus:"All", newsCat:"All", galCat:"All" };

const NAV = [
  { id:"dashboard", label:"Dashboard", ic:"🏠" },
  { id:"pages", label:"Pages", ic:"📄" },
  { id:"programs", label:"Programs", ic:"🧩" },
  { id:"projects", label:"Projects", ic:"📁" },
  { id:"news", label:"News & Updates", ic:"📰" },
  { id:"publications", label:"Publications", ic:"📚" },
  { id:"team", label:"Team", ic:"👥" },
  { id:"gallery", label:"Gallery", ic:"🖼️" },
  { id:"partners", label:"Partners", ic:"🤝" },
  { id:"contact", label:"Contact Information", ic:"☎️" },
  { id:"homepage", label:"Homepage Settings", ic:"🏡" },
  { id:"menu", label:"Menu Management", ic:"☰" },
  { id:"media", label:"Media Library", ic:"🗂️" },
  { id:"settings", label:"Settings", ic:"⚙️" },
];
const PAGE_TITLES = Object.fromEntries(NAV.map(n=>[n.id,n.label]));

function save(){ CMS.save(DATA); }
function uid(p){ return p+"-"+Math.random().toString(36).slice(2,8); }
function statusPill(s){ return `<span class="status-pill status-${s}">${s}</span>`; }
function byOrder(a,b){ return (a.order||0)-(b.order||0); }

/* ---------------- Toast / Confirm ---------------- */
let toastTimer;
function toast(msg){
  const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),3000);
}
function confirmDialog(title, msg, onYes){
  document.getElementById('confirmRoot').innerHTML = `
    <div class="confirm-overlay open">
      <div class="confirm-card">
        <h4>${title}</h4>
        <p>${msg}</p>
        <div class="confirm-actions">
          <button class="btn btn-outline" onclick="document.getElementById('confirmRoot').innerHTML=''">Cancel</button>
          <button class="btn btn-danger" id="confirmYesBtn">Delete</button>
        </div>
      </div>
    </div>`;
  document.getElementById('confirmYesBtn').onclick = ()=>{ onYes(); document.getElementById('confirmRoot').innerHTML=''; };
}

/* ---------------- Modal ---------------- */
function openModal(title, bodyHtml, footHtml){
  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay open">
      <div class="modal-card">
        <div class="modal-head"><h3>${title}</h3><button onclick="closeModal()">✕</button></div>
        <div class="modal-body">${bodyHtml}</div>
        <div class="modal-foot">${footHtml}</div>
      </div>
    </div>`;
}
function closeModal(){ document.getElementById('modalRoot').innerHTML=''; }

/* ---------------- Sidebar / Router ---------------- */
function renderSidebar(){
  document.getElementById('sidebarNav').innerHTML = NAV.map(n=>`
    <div class="side-link ${CUR===n.id?'active':''}" data-nav="${n.id}"><span class="ic">${n.ic}</span>${n.label}</div>`).join('');
  document.querySelectorAll('[data-nav]').forEach(el=>{
    el.onclick = ()=>{ CUR = el.dataset.nav; document.getElementById('sidebar').classList.remove('open'); route(); };
  });
}
const ROUTES = {
  dashboard: renderDashboard, pages: renderPages, programs: renderPrograms, projects: renderProjects,
  news: renderNews, publications: renderPublications, team: renderTeam, gallery: renderGallery,
  partners: renderPartners, contact: renderContact, homepage: renderHomepageSettings, menu: renderMenu,
  media: renderMedia, settings: renderSettings,
};
function route(){
  document.getElementById('pageHeading').textContent = PAGE_TITLES[CUR];
  renderSidebar();
  (ROUTES[CUR]||renderDashboard)();
}

/* ================= DASHBOARD ================= */
function renderDashboard(){
  const kpis = [
    { label:"Published Pages", val: DATA.pages.filter(p=>p.status==="Published").length, ic:"📄" },
    { label:"Active Programs", val: DATA.programs.filter(p=>p.status==="Published").length, ic:"🧩" },
    { label:"Ongoing Projects", val: DATA.projects.filter(p=>p.status==="Ongoing").length, ic:"📁" },
    { label:"News Articles", val: DATA.news.filter(n=>n.status==="Published").length, ic:"📰" },
    { label:"Publications", val: DATA.publications.filter(p=>p.status==="Published").length, ic:"📚" },
    { label:"Gallery Images", val: DATA.gallery.length, ic:"🖼️" },
  ];
  const recent = [...DATA.pages.map(p=>({t:p.title,d:p.updated,by:p.updatedBy,type:"Page"})),
    ...DATA.news.slice(0,3).map(n=>({t:n.title,d:n.date,by:"Content Editor",type:"News"}))]
    .sort((a,b)=> new Date(b.d)-new Date(a.d)).slice(0,6);
  const drafts = [...DATA.pages.filter(p=>p.status==="Draft").map(p=>({t:p.title,type:"Page"})),
    ...DATA.programs.filter(p=>p.status==="Draft").map(p=>({t:p.title,type:"Program"})),
    ...DATA.news.filter(n=>n.status==="Draft").map(n=>({t:n.title,type:"News"})),
    ...DATA.publications.filter(p=>p.status==="Draft").map(p=>({t:p.title,type:"Publication"}))];

  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="kpi-grid">
      ${kpis.map(k=>`<div class="kpi-card"><div class="kpi-icon">${k.ic}</div><div class="kpi-val">${k.val}</div><div class="kpi-label">${k.label}</div></div>`).join('')}
    </div>
    <div class="panel-grid">
      <div class="panel">
        <h3>Recent Updates</h3>
        ${recent.map(r=>`<div class="list-row"><span>${r.t}</span><span class="muted">${r.type} · ${r.d}</span></div>`).join('') || '<p class="muted">No recent updates.</p>'}
      </div>
      <div class="panel">
        <h3>Draft Content</h3>
        ${drafts.map(d=>`<div class="list-row"><span>${d.t}</span><span class="muted">${d.type}</span></div>`).join('') || '<p class="muted">No drafts.</p>'}
      </div>
    </div>`;
}

/* ================= PAGES ================= */
function renderPages(){
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar"><div></div><button class="btn btn-primary" onclick="editPage(null)">+ Add Page</button></div>
    <table class="dt"><thead><tr><th>Page Title</th><th>Language</th><th>Status</th><th>Last Updated</th><th>Updated By</th><th>Actions</th></tr></thead>
    <tbody>${DATA.pages.map(p=>`
      <tr><td><strong>${p.title}</strong><div class="muted">${p.slug}</div></td><td>${p.lang}</td><td>${statusPill(p.status)}</td><td>${p.updated}</td><td>${p.updatedBy}</td>
      <td><div class="action-icons">
        <button title="Edit" onclick="editPage('${p.id}')">✏️</button>
        <button title="Preview" onclick="toast('Preview: opens the live page on the public site (demo).')">👁️</button>
        <button title="Duplicate" onclick="duplicatePage('${p.id}')">📄</button>
        <button title="${p.status==='Published'?'Unpublish':'Publish'}" onclick="togglePageStatus('${p.id}')">${p.status==='Published'?'⏸️':'✅'}</button>
      </div></td></tr>`).join('')}</tbody></table>`;
}
function duplicatePage(id){
  const p = DATA.pages.find(x=>x.id===id); if(!p) return;
  DATA.pages.push({...p, id: uid('page'), title: p.title+" (Copy)", status:"Draft", updated: today(), updatedBy:"You"});
  save(); renderPages(); toast('Page duplicated (demo).');
}
function togglePageStatus(id){
  const p = DATA.pages.find(x=>x.id===id); p.status = p.status==='Published'?'Draft':'Published'; p.updated=today();
  save(); renderPages(); toast(`Page ${p.status==='Published'?'published':'unpublished'} (demo).`);
}
function today(){ return new Date().toISOString().slice(0,10); }
function editPage(id){
  const isNew = !id;
  const p = isNew ? { id: uid('page'), title:"", slug:"", hero:IMG.hero, intro:"", content:"", status:"Draft", lang:"EN", updated: today(), updatedBy:"You" } : DATA.pages.find(x=>x.id===id);
  openModal(isNew?"Add Page":"Edit Page", `
    <div class="form-field"><label>Page Title</label><input id="f_title" value="${p.title}"></div>
    <div class="form-field"><label>Slug</label><input id="f_slug" value="${p.slug}"></div>
    <div class="form-field"><label>Hero Image</label>
      <div class="upload-box" onclick="document.getElementById('f_hero_file').click()">Click to simulate image upload</div>
      <input type="file" id="f_hero_file" accept="image/*" style="display:none" onchange="previewUpload(this,'heroPrev')">
      <img id="heroPrev" class="upload-preview" src="${p.hero}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
    </div>
    <div class="form-field"><label>Intro Text</label><textarea id="f_intro">${p.intro}</textarea></div>
    <div class="form-field"><label>Main Content</label><textarea id="f_content" style="min-height:130px;">${p.content}</textarea></div>
    <div class="form-field"><label>Status</label><select id="f_status"><option ${p.status==='Draft'?'selected':''}>Draft</option><option ${p.status==='Published'?'selected':''}>Published</option></select></div>
  `, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePage('${p.id}',${isNew})">Save Page</button>`);
}
function savePage(id,isNew){
  const vals = { title:val('f_title'), slug:val('f_slug'), hero:document.getElementById('heroPrev').src, intro:val('f_intro'), content:val('f_content'), status:val('f_status'), updated: today(), updatedBy:"You" };
  if(isNew){ DATA.pages.push({ id, lang:"EN", ...vals }); } else { Object.assign(DATA.pages.find(p=>p.id===id), vals); }
  save(); closeModal(); renderPages(); toast('Page saved (demo — not published to a real server).');
}
function val(id){ return document.getElementById(id).value; }
function previewUpload(input, imgId){
  if(input.files && input.files[0]){ document.getElementById(imgId).src = URL.createObjectURL(input.files[0]); toast('Image preview updated (demo upload).'); }
}

/* ================= PROGRAMS ================= */
function renderPrograms(){
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar"><div></div><button class="btn btn-primary" onclick="editProgram(null)">+ Add Program</button></div>
    <div class="grid grid-4">
      ${DATA.programs.sort(byOrder).map(p=>`
        <div class="item-card">
          <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
          <div class="ic-body">
            <h4>${p.title}</h4>
            <div class="muted">Order ${p.order} · Updated ${today()}</div>
            <div style="margin-top:6px;">${statusPill(p.status)}</div>
            <div class="ic-actions">
              <div class="action-icons">
                <button onclick="editProgram('${p.id}')">✏️</button>
                <button class="danger" onclick="deleteItem('programs','${p.id}', renderPrograms)">🗑️</button>
              </div>
              <div class="toggle ${p.status==='Published'?'on':''}" onclick="toggleStatus('programs','${p.id}',renderPrograms)"><div class="knob"></div></div>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
}
function toggleStatus(entity,id,cb){
  const item = DATA[entity].find(x=>x.id===id);
  item.status = item.status==='Published'?'Draft':'Published';
  save(); cb(); toast('Status updated (demo).');
}
function deleteItem(entity,id,cb){
  confirmDialog('Delete item?','This will remove the demo item from local sample data. This cannot be undone.', ()=>{
    DATA[entity] = DATA[entity].filter(x=>x.id!==id); save(); cb(); toast('Item deleted (demo).');
  });
}
function editProgram(id){
  const isNew = !id;
  const p = isNew ? { id:uid('prog'), title:"", titleKh:"", desc:"", descKh:"", image:IMG.communitydev, focus:[], order:DATA.programs.length+1, status:"Draft" } : DATA.programs.find(x=>x.id===id);
  openModal(isNew?"Add Program":"Edit Program", `
    <div class="form-row2">
      <div class="form-field"><label>Title</label><input id="f_title" value="${p.title}"></div>
      <div class="form-field"><label>Khmer Title</label><input id="f_titleKh" class="kh" value="${p.titleKh}"></div>
    </div>
    <div class="form-row2">
      <div class="form-field"><label>Description</label><textarea id="f_desc">${p.desc}</textarea></div>
      <div class="form-field"><label>Khmer Description</label><textarea id="f_descKh" class="kh">${p.descKh}</textarea></div>
    </div>
    <div class="form-field"><label>Featured Image</label>
      <div class="upload-box" onclick="document.getElementById('f_img_file').click()">Click to simulate image upload</div>
      <input type="file" id="f_img_file" accept="image/*" style="display:none" onchange="previewUpload(this,'imgPrev')">
      <img id="imgPrev" class="upload-preview" src="${p.image}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
    </div>
    <div class="form-field"><label>Focus Areas (comma separated)</label><input id="f_focus" value="${p.focus.join(', ')}"></div>
    <div class="form-row2">
      <div class="form-field"><label>Order</label><input id="f_order" type="number" value="${p.order}"></div>
      <div class="form-field"><label>Status</label><select id="f_status"><option ${p.status==='Draft'?'selected':''}>Draft</option><option ${p.status==='Published'?'selected':''}>Published</option></select></div>
    </div>
  `, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProgram('${p.id}',${isNew})">Save Program</button>`);
}
function saveProgram(id,isNew){
  const vals = { title:val('f_title'), titleKh:val('f_titleKh'), desc:val('f_desc'), descKh:val('f_descKh'), image:document.getElementById('imgPrev').src, focus: val('f_focus').split(',').map(s=>s.trim()).filter(Boolean), order:Number(val('f_order')), status:val('f_status') };
  if(isNew) DATA.programs.push({ id, ...vals }); else Object.assign(DATA.programs.find(p=>p.id===id), vals);
  save(); closeModal(); renderPrograms(); toast('Program saved (demo).');
}

/* ================= PROJECTS ================= */
function renderProjects(){
  const provinces = ["All", ...new Set(DATA.projects.map(p=>p.province))];
  const list = DATA.projects.filter(p=>
    (FILTERS.projStatus==="All"||p.status===FILTERS.projStatus) &&
    (FILTERS.projProgram==="All"||p.program===FILTERS.projProgram) &&
    (FILTERS.projProvince==="All"||p.province===FILTERS.projProvince));
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar">
      <div class="table-filters">
        <select class="select-sm" id="filtStatus">${["All","Ongoing","Completed","Upcoming"].map(s=>`<option ${FILTERS.projStatus===s?'selected':''}>${s}</option>`).join('')}</select>
        <select class="select-sm" id="filtProgram"><option value="All">All Programs</option>${DATA.programs.map(p=>`<option value="${p.id}" ${FILTERS.projProgram===p.id?'selected':''}>${p.title}</option>`).join('')}</select>
        <select class="select-sm" id="filtProvince">${provinces.map(p=>`<option ${FILTERS.projProvince===p?'selected':''}>${p}</option>`).join('')}</select>
      </div>
      <button class="btn btn-primary" onclick="editProject(null)">+ Add Project</button>
    </div>
    <table class="dt"><thead><tr><th>Project</th><th>Program</th><th>Location</th><th>Status</th><th>Dates</th><th>Actions</th></tr></thead>
    <tbody>${list.map(p=>`
      <tr><td><img class="row-thumb" src="${p.image}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;"> <strong style="margin-left:8px;">${p.title}</strong></td>
      <td>${(DATA.programs.find(x=>x.id===p.program)||{}).title||''}</td><td>${p.province}</td><td>${statusPill(p.status)}</td>
      <td class="muted">${p.start} → ${p.end}</td>
      <td><div class="action-icons"><button onclick="editProject('${p.id}')">✏️</button><button class="danger" onclick="deleteItem('projects','${p.id}',renderProjects)">🗑️</button></div></td></tr>`).join('') || `<tr><td colspan="6" class="muted">No projects match filters.</td></tr>`}</tbody></table>`;
  document.getElementById('filtStatus').onchange = e=>{ FILTERS.projStatus=e.target.value; renderProjects(); };
  document.getElementById('filtProgram').onchange = e=>{ FILTERS.projProgram=e.target.value; renderProjects(); };
  document.getElementById('filtProvince').onchange = e=>{ FILTERS.projProvince=e.target.value; renderProjects(); };
}
function editProject(id){
  const isNew = !id;
  const p = isNew ? { id:uid('proj'), title:"", program:DATA.programs[0].id, province:"", start:"", end:"", status:"Upcoming", desc:"", image:IMG.field, results:[], partner:"", donor:"" } : DATA.projects.find(x=>x.id===id);
  openModal(isNew?"Add Project":"Edit Project", `
    <div class="form-field"><label>Project Title</label><input id="f_title" value="${p.title}"></div>
    <div class="form-row2">
      <div class="form-field"><label>Program</label><select id="f_program">${DATA.programs.map(pr=>`<option value="${pr.id}" ${p.program===pr.id?'selected':''}>${pr.title}</option>`).join('')}</select></div>
      <div class="form-field"><label>Location / Province</label><input id="f_province" value="${p.province}"></div>
    </div>
    <div class="form-row2">
      <div class="form-field"><label>Start Date</label><input id="f_start" type="date" value="${p.start}"></div>
      <div class="form-field"><label>End Date</label><input id="f_end" type="date" value="${p.end}"></div>
    </div>
    <div class="form-field"><label>Status</label><select id="f_status">${["Ongoing","Completed","Upcoming"].map(s=>`<option ${p.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
    <div class="form-field"><label>Description</label><textarea id="f_desc">${p.desc}</textarea></div>
    <div class="form-field"><label>Featured Image</label>
      <div class="upload-box" onclick="document.getElementById('f_img_file').click()">Click to simulate image upload</div>
      <input type="file" id="f_img_file" accept="image/*" style="display:none" onchange="previewUpload(this,'imgPrev')">
      <img id="imgPrev" class="upload-preview" src="${p.image}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
    </div>
    <div class="form-field"><label>Project Results (comma separated, sample)</label><input id="f_results" value="${p.results.join('; ')}"></div>
    <div class="form-row2">
      <div class="form-field"><label>Partner</label><input id="f_partner" value="${p.partner}"></div>
      <div class="form-field"><label>Donor</label><input id="f_donor" value="${p.donor}"></div>
    </div>
  `, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProject('${p.id}',${isNew})">Save Project</button>`);
}
function saveProject(id,isNew){
  const vals = { title:val('f_title'), program:val('f_program'), province:val('f_province'), start:val('f_start'), end:val('f_end'), status:val('f_status'), desc:val('f_desc'), image:document.getElementById('imgPrev').src, results: val('f_results').split(';').map(s=>s.trim()).filter(Boolean), partner:val('f_partner'), donor:val('f_donor') };
  if(isNew) DATA.projects.push({ id, ...vals }); else Object.assign(DATA.projects.find(p=>p.id===id), vals);
  save(); closeModal(); renderProjects(); toast('Project saved (demo).');
}

/* ================= NEWS ================= */
function renderNews(){
  const cats = ["All","News","Events","Announcements","Community Stories"];
  const list = DATA.news.filter(n=> (FILTERS.newsStatus==="All"||n.status===FILTERS.newsStatus) && (FILTERS.newsCat==="All"||n.category===FILTERS.newsCat));
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar">
      <div class="table-filters">
        <select class="select-sm" id="filtNewsStatus">${["All","Draft","Published","Scheduled"].map(s=>`<option ${FILTERS.newsStatus===s?'selected':''}>${s}</option>`).join('')}</select>
        <select class="select-sm" id="filtNewsCat">${cats.map(c=>`<option ${FILTERS.newsCat===c?'selected':''}>${c}</option>`).join('')}</select>
      </div>
      <button class="btn btn-primary" onclick="editNews(null)">+ Add News</button>
    </div>
    <table class="dt"><thead><tr><th>Article</th><th>Category</th><th>Publish Date</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${list.map(n=>`
      <tr><td><img class="row-thumb" src="${n.image}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;"> <strong style="margin-left:8px;">${n.title}</strong></td>
      <td>${n.category}</td><td>${n.date}</td><td>${statusPill(n.status)}</td>
      <td><div class="action-icons"><button onclick="editNews('${n.id}')">✏️</button><button class="danger" onclick="deleteItem('news','${n.id}',renderNews)">🗑️</button></div></td></tr>`).join('') || `<tr><td colspan="5" class="muted">No articles match filters.</td></tr>`}</tbody></table>`;
  document.getElementById('filtNewsStatus').onchange = e=>{ FILTERS.newsStatus=e.target.value; renderNews(); };
  document.getElementById('filtNewsCat').onchange = e=>{ FILTERS.newsCat=e.target.value; renderNews(); };
}
function editNews(id){
  const isNew = !id;
  const n = isNew ? { id:uid('news'), title:"", titleKh:"", category:"News", date:today(), image:IMG.community1, excerpt:"", body:"", tags:[], status:"Draft" } : DATA.news.find(x=>x.id===id);
  openModal(isNew?"Add News":"Edit News", `
    <div class="form-row2">
      <div class="form-field"><label>Title</label><input id="f_title" value="${n.title}"></div>
      <div class="form-field"><label>Khmer Title</label><input id="f_titleKh" class="kh" value="${n.titleKh}"></div>
    </div>
    <div class="form-row2">
      <div class="form-field"><label>Category</label><select id="f_cat">${["News","Events","Announcements","Community Stories"].map(c=>`<option ${n.category===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="form-field"><label>Publish Date</label><input id="f_date" type="date" value="${n.date}"></div>
    </div>
    <div class="form-field"><label>Featured Image</label>
      <div class="upload-box" onclick="document.getElementById('f_img_file').click()">Click to simulate image upload</div>
      <input type="file" id="f_img_file" accept="image/*" style="display:none" onchange="previewUpload(this,'imgPrev')">
      <img id="imgPrev" class="upload-preview" src="${n.image}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
    </div>
    <div class="form-field"><label>Excerpt</label><textarea id="f_excerpt">${n.excerpt}</textarea></div>
    <div class="form-field"><label>Article Body</label><textarea id="f_body" style="min-height:120px;">${n.body}</textarea></div>
    <div class="form-row2">
      <div class="form-field"><label>Tags (comma separated)</label><input id="f_tags" value="${n.tags.join(', ')}"></div>
      <div class="form-field"><label>Status</label><select id="f_status">${["Draft","Published","Scheduled"].map(s=>`<option ${n.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
    </div>
  `, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveNews('${n.id}',${isNew})">Save Article</button>`);
}
function saveNews(id,isNew){
  const vals = { title:val('f_title'), titleKh:val('f_titleKh'), category:val('f_cat'), date:val('f_date'), image:document.getElementById('imgPrev').src, excerpt:val('f_excerpt'), body:val('f_body'), tags:val('f_tags').split(',').map(s=>s.trim()).filter(Boolean), status:val('f_status') };
  if(isNew) DATA.news.push({ id, ...vals }); else Object.assign(DATA.news.find(n=>n.id===id), vals);
  save(); closeModal(); renderNews(); toast('News article saved (demo).');
}

/* ================= PUBLICATIONS ================= */
function renderPublications(){
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar"><div></div><button class="btn btn-primary" onclick="editPub(null)">+ Upload Publication</button></div>
    <table class="dt"><thead><tr><th>Title</th><th>Category</th><th>Year</th><th>Language</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${DATA.publications.map(p=>`
      <tr><td>📄 <strong>${p.title}</strong></td><td>${p.category}</td><td>${p.year}</td><td>${p.lang}</td><td>${statusPill(p.status)}</td>
      <td><div class="action-icons"><button onclick="editPub('${p.id}')">✏️</button><button class="danger" onclick="deleteItem('publications','${p.id}',renderPublications)">🗑️</button></div></td></tr>`).join('')}</tbody></table>`;
}
function editPub(id){
  const isNew = !id;
  const p = isNew ? { id:uid('pub'), title:"", category:"Annual Reports", year:new Date().getFullYear().toString(), desc:"", cover:IMG.landscape, lang:"EN", status:"Draft" } : DATA.publications.find(x=>x.id===id);
  openModal(isNew?"Upload Publication":"Edit Publication", `
    <div class="form-field"><label>Title</label><input id="f_title" value="${p.title}"></div>
    <div class="form-row2">
      <div class="form-field"><label>Category</label><select id="f_cat">${["Annual Reports","Strategic Plans","Research Reports","Policy Briefs","Project Reports","Other Publications"].map(c=>`<option ${p.category===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="form-field"><label>Year</label><input id="f_year" value="${p.year}"></div>
    </div>
    <div class="form-field"><label>Description</label><textarea id="f_desc">${p.desc}</textarea></div>
    <div class="form-field"><label>Cover Image</label>
      <div class="upload-box" onclick="document.getElementById('f_img_file').click()">Click to simulate cover upload</div>
      <input type="file" id="f_img_file" accept="image/*" style="display:none" onchange="previewUpload(this,'imgPrev')">
      <img id="imgPrev" class="upload-preview" src="${p.cover||IMG.landscape}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
    </div>
    <div class="form-field"><label>PDF Upload</label><div class="upload-box" onclick="toast('Demo only — PDF upload is simulated, no file is stored.')">Click to simulate PDF upload (demo)</div></div>
    <div class="form-row2">
      <div class="form-field"><label>Language</label><select id="f_lang"><option ${p.lang==='EN'?'selected':''}>EN</option><option ${p.lang==='KH'?'selected':''}>KH</option><option ${p.lang==='EN/KH'?'selected':''}>EN/KH</option></select></div>
      <div class="form-field"><label>Status</label><select id="f_status"><option ${p.status==='Draft'?'selected':''}>Draft</option><option ${p.status==='Published'?'selected':''}>Published</option></select></div>
    </div>
  `, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePub('${p.id}',${isNew})">Save Publication</button>`);
}
function savePub(id,isNew){
  const vals = { title:val('f_title'), category:val('f_cat'), year:val('f_year'), desc:val('f_desc'), cover:document.getElementById('imgPrev').src, lang:val('f_lang'), status:val('f_status') };
  if(isNew) DATA.publications.push({ id, ...vals }); else Object.assign(DATA.publications.find(p=>p.id===id), vals);
  save(); closeModal(); renderPublications(); toast('Publication saved (demo).');
}

/* ================= TEAM ================= */
function renderTeam(){
  const groups = ["Board","Management","Staff"];
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar"><div></div><button class="btn btn-primary" onclick="editTeam(null)">+ Add Team Member</button></div>
    ${groups.map(g=>`
      <h4 style="color:var(--teal-900);margin:18px 0 10px;">${g}</h4>
      <div class="grid grid-4">
        ${DATA.team.filter(m=>m.dept===g).sort(byOrder).map(m=>`
          <div class="item-card">
            <img src="${m.photo}" alt="${m.name}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
            <div class="ic-body">
              <h4>${m.name}</h4>
              <div class="muted">${m.position}</div>
              <div style="margin-top:6px;">${statusPill(m.status)}</div>
              <div class="ic-actions">
                <div class="action-icons"><button onclick="editTeam('${m.id}')">✏️</button><button class="danger" onclick="deleteItem('team','${m.id}',renderTeam)">🗑️</button></div>
                <div class="toggle ${m.status==='Published'?'on':''}" onclick="toggleStatus('team','${m.id}',renderTeam)"><div class="knob"></div></div>
              </div>
            </div>
          </div>`).join('')}
      </div>`).join('')}`;
}
function editTeam(id){
  const isNew = !id;
  const m = isNew ? { id:uid('team'), name:"", position:"", dept:"Staff", photo:avatar("New Member"), bio:"", order:DATA.team.length+1, status:"Draft" } : DATA.team.find(x=>x.id===id);
  openModal(isNew?"Add Team Member":"Edit Team Member", `
    <div class="form-row2">
      <div class="form-field"><label>Name</label><input id="f_name" value="${m.name}"></div>
      <div class="form-field"><label>Position</label><input id="f_position" value="${m.position}"></div>
    </div>
    <div class="form-row2">
      <div class="form-field"><label>Department</label><select id="f_dept">${["Board","Management","Staff"].map(d=>`<option ${m.dept===d?'selected':''}>${d}</option>`).join('')}</select></div>
      <div class="form-field"><label>Display Order</label><input id="f_order" type="number" value="${m.order}"></div>
    </div>
    <div class="form-field"><label>Profile Photo</label>
      <div class="upload-box" onclick="document.getElementById('f_img_file').click()">Click to simulate photo upload</div>
      <input type="file" id="f_img_file" accept="image/*" style="display:none" onchange="previewUpload(this,'imgPrev')">
      <img id="imgPrev" class="upload-preview" src="${m.photo}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
    </div>
    <div class="form-field"><label>Biography</label><textarea id="f_bio">${m.bio}</textarea></div>
    <div class="form-field"><label>Status</label><select id="f_status"><option ${m.status==='Draft'?'selected':''}>Draft</option><option ${m.status==='Published'?'selected':''}>Published</option></select></div>
  `, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveTeam('${m.id}',${isNew})">Save Member</button>`);
}
function saveTeam(id,isNew){
  const vals = { name:val('f_name'), position:val('f_position'), dept:val('f_dept'), order:Number(val('f_order')), photo:document.getElementById('imgPrev').src, bio:val('f_bio'), status:val('f_status') };
  if(isNew) DATA.team.push({ id, ...vals }); else Object.assign(DATA.team.find(m=>m.id===id), vals);
  save(); closeModal(); renderTeam(); toast('Team member saved (demo).');
}

/* ================= GALLERY ================= */
function renderGallery(){
  const cats = ["All","Community Activities","Training","Events","Field Visits","Partner Activities"];
  const list = DATA.gallery.filter(g=>FILTERS.galCat==='All'||g.category===FILTERS.galCat);
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar">
      <select class="select-sm" id="filtGal">${cats.map(c=>`<option ${FILTERS.galCat===c?'selected':''}>${c}</option>`).join('')}</select>
      <button class="btn btn-primary" onclick="editGalleryItem(null)">+ Upload Images</button>
    </div>
    <p class="muted" style="margin-bottom:10px;">Drag cards to reorder (demo only — order is saved locally).</p>
    <div class="grid grid-4" id="galWrap">
      ${list.map(g=>`
        <div class="item-card drag-item" draggable="true" data-id="${g.id}">
          <img src="${g.image}" alt="${g.caption}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
          <div class="ic-body">
            <div class="muted">${g.category}</div>
            <h4 style="font-size:13px;">${g.caption}</h4>
            <div class="ic-actions">
              <div class="action-icons"><button onclick="editGalleryItem('${g.id}')">✏️</button><button class="danger" onclick="deleteItem('gallery','${g.id}',renderGallery)">🗑️</button></div>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
  document.getElementById('filtGal').onchange = e=>{ FILTERS.galCat=e.target.value; renderGallery(); };
  enableDragReorder('galWrap','gallery');
}
function enableDragReorder(containerId, entity){
  const container = document.getElementById(containerId);
  let dragEl;
  container.querySelectorAll('.drag-item').forEach(item=>{
    item.addEventListener('dragstart', ()=>{ dragEl=item; item.classList.add('dragging'); });
    item.addEventListener('dragend', ()=>{ item.classList.remove('dragging');
      const order = [...container.querySelectorAll('.drag-item')].map(x=>x.dataset.id);
      DATA[entity].sort((a,b)=> order.indexOf(a.id)-order.indexOf(b.id));
      save(); toast('Order updated (demo).');
    });
    item.addEventListener('dragover', e=>{
      e.preventDefault();
      const after = getDragAfter(container, e.clientY);
      if(!dragEl) return;
      if(after==null) container.appendChild(dragEl); else container.insertBefore(dragEl, after);
    });
  });
}
function getDragAfter(container, y){
  const els = [...container.querySelectorAll('.drag-item:not(.dragging)')];
  return els.reduce((closest, child)=>{
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height/2;
    if(offset < 0 && offset > closest.offset) return {offset, element: child};
    return closest;
  }, {offset:-Infinity}).element;
}
function editGalleryItem(id){
  const isNew = !id;
  const g = isNew ? { id:uid('g'), category:"Community Activities", image:IMG.community1, caption:"", alt:"" } : DATA.gallery.find(x=>x.id===id);
  openModal(isNew?"Upload Images":"Edit Image", `
    <div class="form-field"><label>Image</label>
      <div class="upload-box" onclick="document.getElementById('f_img_file').click()">Click to simulate multi-image upload</div>
      <input type="file" id="f_img_file" accept="image/*" style="display:none" onchange="previewUpload(this,'imgPrev')">
      <img id="imgPrev" class="upload-preview" src="${g.image}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
    </div>
    <div class="form-field"><label>Category</label><select id="f_cat">${["Community Activities","Training","Events","Field Visits","Partner Activities"].map(c=>`<option ${g.category===c?'selected':''}>${c}</option>`).join('')}</select></div>
    <div class="form-field"><label>Caption</label><input id="f_caption" value="${g.caption}"></div>
    <div class="form-field"><label>Alt Text</label><input id="f_alt" value="${g.alt||''}"></div>
  `, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveGalleryItem('${g.id}',${isNew})">Save</button>`);
}
function saveGalleryItem(id,isNew){
  const vals = { image:document.getElementById('imgPrev').src, category:val('f_cat'), caption:val('f_caption'), alt:val('f_alt') };
  if(isNew) DATA.gallery.push({ id, ...vals }); else Object.assign(DATA.gallery.find(g=>g.id===id), vals);
  save(); closeModal(); renderGallery(); toast('Image saved (demo).');
}

/* ================= PARTNERS ================= */
function renderPartners(){
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar"><div></div><button class="btn btn-primary" onclick="editPartner(null)">+ Add Partner</button></div>
    <table class="dt"><thead><tr><th>Logo</th><th>Partner Name</th><th>Category</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${DATA.partners.sort(byOrder).map(p=>`
      <tr><td><img class="row-thumb" src="${p.logo}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;"></td><td>${p.name}</td><td>${p.category}</td><td>${p.order}</td><td>${statusPill(p.status)}</td>
      <td><div class="action-icons"><button onclick="editPartner('${p.id}')">✏️</button><button class="danger" onclick="deleteItem('partners','${p.id}',renderPartners)">🗑️</button></div></td></tr>`).join('')}</tbody></table>`;
}
function editPartner(id){
  const isNew = !id;
  const p = isNew ? { id:uid('p'), name:"", category:"NGOs", logo:monogram("New Partner", 4), website:"#", order:DATA.partners.length+1, status:"Draft" } : DATA.partners.find(x=>x.id===id);
  openModal(isNew?"Add Partner":"Edit Partner", `
    <div class="form-field"><label>Partner Name</label><input id="f_name" value="${p.name}"></div>
    <div class="form-row2">
      <div class="form-field"><label>Category</label><select id="f_cat">${["Government","Development Partners","NGOs","Private Sector"].map(c=>`<option ${p.category===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="form-field"><label>Display Order</label><input id="f_order" type="number" value="${p.order}"></div>
    </div>
    <div class="form-field"><label>Logo</label>
      <div class="upload-box" onclick="document.getElementById('f_img_file').click()">Click to simulate logo upload</div>
      <input type="file" id="f_img_file" accept="image/*" style="display:none" onchange="previewUpload(this,'imgPrev')">
      <img id="imgPrev" class="upload-preview" style="height:90px;object-fit:contain;background:#f4f6f5;" src="${p.logo}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
    </div>
    <div class="form-row2">
      <div class="form-field"><label>Website</label><input id="f_web" value="${p.website}"></div>
      <div class="form-field"><label>Status</label><select id="f_status"><option ${p.status==='Draft'?'selected':''}>Draft</option><option ${p.status==='Published'?'selected':''}>Published</option></select></div>
    </div>
  `, `<button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePartner('${p.id}',${isNew})">Save Partner</button>`);
}
function savePartner(id,isNew){
  const vals = { name:val('f_name'), category:val('f_cat'), order:Number(val('f_order')), logo:document.getElementById('imgPrev').src, website:val('f_web'), status:val('f_status') };
  if(isNew) DATA.partners.push({ id, ...vals }); else Object.assign(DATA.partners.find(p=>p.id===id), vals);
  save(); closeModal(); renderPartners(); toast('Partner saved (demo).');
}

/* ================= CONTACT INFO ================= */
function renderContact(){
  const c = DATA.contact;
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="panel" style="max-width:680px;">
      <h3>Contact Information</h3>
      <div class="form-field"><label>Organization Name</label><input id="c_org" value="${c.orgName}"></div>
      <div class="form-field"><label>Office Address</label><input id="c_addr" value="${c.address}"></div>
      <div class="form-row2">
        <div class="form-field"><label>Phone</label><input id="c_phone" value="${c.phone}"></div>
        <div class="form-field"><label>Email</label><input id="c_email" value="${c.email}"></div>
      </div>
      <div class="form-field"><label>Google Maps URL</label><input id="c_map" value="${c.mapUrl}"></div>
      <div class="form-field"><label>Office Hours</label><input id="c_hours" value="${c.hours}"></div>
      <div class="form-row2">
        <div class="form-field"><label>Facebook</label><input id="c_fb" value="${c.facebook}"></div>
        <div class="form-field"><label>Telegram</label><input id="c_tg" value="${c.telegram}"></div>
      </div>
      <div class="form-row2">
        <div class="form-field"><label>LinkedIn</label><input id="c_li" value="${c.linkedin}"></div>
        <div class="form-field"><label>YouTube</label><input id="c_yt" value="${c.youtube}"></div>
      </div>
      <button class="btn btn-primary" onclick="saveContact()">Save Contact Information</button>
    </div>`;
}
function saveContact(){
  Object.assign(DATA.contact, { orgName:val('c_org'), address:val('c_addr'), phone:val('c_phone'), email:val('c_email'), mapUrl:val('c_map'), hours:val('c_hours'), facebook:val('c_fb'), telegram:val('c_tg'), linkedin:val('c_li'), youtube:val('c_yt') });
  save(); toast('Contact information saved — reflects on public website (demo).');
}

/* ================= HOMEPAGE SETTINGS ================= */
function renderHomepageSettings(){
  const h = DATA.homepage;
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="panel" style="max-width:720px;">
      <h3>Hero Section</h3>
      <div class="form-field"><label>Hero Title</label><input id="h_title" value="${h.heroTitle}"></div>
      <div class="form-field"><label>Hero Subtitle</label><textarea id="h_sub">${h.heroSubtitle}</textarea></div>
      <div class="form-field"><label>Hero Image</label>
        <div class="upload-box" onclick="document.getElementById('h_img_file').click()">Click to simulate image upload</div>
        <input type="file" id="h_img_file" accept="image/*" style="display:none" onchange="previewUpload(this,'heroPrev')">
        <img id="heroPrev" class="upload-preview" src="${h.heroImage}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">
      </div>
      <div class="form-row2">
        <div class="form-field"><label>Primary CTA Label</label><input id="h_cta1" value="${h.ctaPrimary}"></div>
        <div class="form-field"><label>Secondary CTA Label</label><input id="h_cta2" value="${h.ctaSecondary}"></div>
      </div>
    </div>
    <div class="panel" style="max-width:720px;">
      <h3>Impact Statistics (demo figures)</h3>
      ${h.impactStats.map((s,i)=>`
        <div class="form-row2">
          <div class="form-field"><label>Label ${i+1}</label><input data-stat="${i}" data-f="label" value="${s.label}"></div>
          <div class="form-field"><label>Value ${i+1}</label><input data-stat="${i}" data-f="value" value="${s.value}"></div>
        </div>`).join('')}
    </div>
    <div class="panel" style="max-width:720px;">
      <h3>Featured Content</h3>
      <p class="muted">Choose which items appear on the homepage.</p>
      <div class="form-field"><label>Featured Programs</label>
        <select id="h_feProg" multiple size="4">${DATA.programs.map(p=>`<option value="${p.id}" ${h.featuredProgramIds.includes(p.id)?'selected':''}>${p.title}</option>`).join('')}</select>
      </div>
      <div class="form-field"><label>Featured Projects</label>
        <select id="h_feProj" multiple size="4">${DATA.projects.map(p=>`<option value="${p.id}" ${h.featuredProjectIds.includes(p.id)?'selected':''}>${p.title}</option>`).join('')}</select>
      </div>
      <div class="form-field"><label>Featured News</label>
        <select id="h_feNews" multiple size="4">${DATA.news.map(n=>`<option value="${n.id}" ${h.featuredNewsIds.includes(n.id)?'selected':''}>${n.title}</option>`).join('')}</select>
      </div>
      <button class="btn btn-primary" onclick="saveHomepage()">Save Homepage Settings</button>
    </div>`;
}
function saveHomepage(){
  const h = DATA.homepage;
  h.heroTitle = val('h_title'); h.heroSubtitle = val('h_sub'); h.heroImage = document.getElementById('heroPrev').src;
  h.ctaPrimary = val('h_cta1'); h.ctaSecondary = val('h_cta2');
  document.querySelectorAll('[data-stat]').forEach(inp=>{ h.impactStats[inp.dataset.stat][inp.dataset.f] = inp.value; });
  h.featuredProgramIds = [...document.getElementById('h_feProg').selectedOptions].map(o=>o.value);
  h.featuredProjectIds = [...document.getElementById('h_feProj').selectedOptions].map(o=>o.value);
  h.featuredNewsIds = [...document.getElementById('h_feNews').selectedOptions].map(o=>o.value);
  save(); toast('Homepage settings saved — reflects on public website (demo).');
}

/* ================= MENU MANAGEMENT =================
   Kept basic on purpose: reorder items and show/hide them in the public
   site navigation. No page-builder or nested-menu functionality. */
function renderMenu(){
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="panel" style="max-width:560px;">
      <h3>Main Menu</h3>
      <p class="muted" style="margin-bottom:10px;">Drag items to reorder them, or use the switch to show/hide a menu item on the public website (demo).</p>
      <div id="menuWrap">
        ${DATA.menu.sort(byOrder).map(m=>`
          <div class="list-row drag-item" draggable="true" data-id="${m.id}" style="cursor:grab;">
            <span>☰ ${m.label}</span>
            <div class="toggle ${m.visible!==false?'on':''}" onclick="toggleMenuVisible('${m.id}')"><div class="knob"></div></div>
          </div>`).join('')}
      </div>
    </div>`;
  enableDragReorder('menuWrap','menu');
}
function toggleMenuVisible(id){
  const m = DATA.menu.find(x=>x.id===id);
  m.visible = m.visible===false ? true : false;
  save(); renderMenu(); toast(`Menu item ${m.visible?'shown':'hidden'} (demo).`);
}

/* ================= MEDIA LIBRARY ================= */
function renderMedia(){
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="table-toolbar">
      <div class="search-box" style="max-width:280px;"><span>🔍</span><input id="mediaSearch" placeholder="Search media..."></div>
      <button class="btn btn-primary" onclick="document.getElementById('mediaUploadFile').click()">+ Upload</button>
      <input type="file" id="mediaUploadFile" style="display:none" onchange="mediaUpload(this)">
    </div>
    <div class="grid grid-4" id="mediaGrid"></div>`;
  renderMediaGrid(DATA.media);
  document.getElementById('mediaSearch').oninput = (e)=>{
    const q = e.target.value.toLowerCase();
    renderMediaGrid(DATA.media.filter(m=>m.name.toLowerCase().includes(q)));
  };
}
function renderMediaGrid(list){
  document.getElementById('mediaGrid').innerHTML = list.map(m=>`
    <div class="item-card">
      ${m.type==='PDF' ? `<div style="height:130px;display:flex;align-items:center;justify-content:center;font-size:40px;background:#f4f6f5;">📄</div>` : `<img src="${m.url}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG;">`}
      <div class="ic-body">
        <h4 style="font-size:13px;word-break:break-all;">${m.name}</h4>
        <div class="muted">${m.type} · ${m.size}</div>
        <div class="muted">Uploaded ${m.date}</div>
      </div>
    </div>`).join('') || '<p class="muted">No files match your search.</p>';
}
function mediaUpload(input){
  if(input.files && input.files[0]){
    const file = input.files[0];
    DATA.media.unshift({ id:uid('md'), name:file.name, type:file.name.split('.').pop().toUpperCase(), size:(file.size/1024).toFixed(0)+" KB", date:today(), url:URL.createObjectURL(file) });
    save(); renderMedia(); toast('File uploaded to Media Library (demo — not stored on a server).');
  }
}

/* ================= SETTINGS ================= */
/* Kept intentionally basic — General site info, language toggle and social
   links only. Deeper settings (SEO tools, backups, role permissions, etc.)
   are outside the scope of this package and are not shown here. */
let SETTINGS_TAB = "General";
function renderSettings(){
  const tabs = ["General","Languages","Social Media"];
  document.getElementById('content').innerHTML = `
    <div class="content-banner">Admin Dashboard Demo – Sample Data Only</div>
    <div class="tabs">${tabs.map(tb=>`<div class="tab ${SETTINGS_TAB===tb?'active':''}" data-tab="${tb}">${tb}</div>`).join('')}</div>
    <div class="panel" style="max-width:680px;" id="settingsPanel"></div>`;
  document.querySelectorAll('.tab').forEach(el=> el.onclick = ()=>{ SETTINGS_TAB = el.dataset.tab; renderSettings(); });
  const panel = document.getElementById('settingsPanel');
  const views = {
    General: `<h3>General</h3><div class="form-field"><label>Site Name</label><input value="${DATA.meta.orgName}"></div><div class="form-field"><label>Tagline</label><input value="${DATA.meta.tagline}"></div><button class="btn btn-primary" onclick="toast('Settings saved (demo).')">Save</button>`,
    Languages: `<h3>Languages</h3><p class="muted">Enable/disable site languages.</p><div class="list-row"><span>English</span><div class="toggle on"><div class="knob"></div></div></div><div class="list-row"><span>Khmer (ខ្មែរ)</span><div class="toggle on"><div class="knob"></div></div></div>`,
    "Social Media": `<h3>Social Media</h3><div class="form-field"><label>Facebook</label><input value="${DATA.contact.facebook}"></div><div class="form-field"><label>Telegram</label><input value="${DATA.contact.telegram}"></div><div class="form-field"><label>LinkedIn</label><input value="${DATA.contact.linkedin}"></div><div class="form-field"><label>YouTube</label><input value="${DATA.contact.youtube}"></div><button class="btn btn-primary" onclick="toast('Social links saved (demo).')">Save</button>`,
  };
  panel.innerHTML = views[SETTINGS_TAB];
}

/* ================= Init ================= */
function init(){
  DATA = CMS.load();
  document.getElementById('profileName').textContent = "Kerena Khun";
  route();
  document.getElementById('hamburger').onclick = ()=> document.getElementById('sidebar').classList.toggle('open');
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.onclick = ()=>{ document.querySelectorAll('.lang-switch button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); LANG=b.dataset.lang; toast(LANG==='km'?'ភាសាត្រូវបានប្ដូរ (គំរូ)':'Language switched (demo — dashboard labels remain English for clarity).'); };
  });
  document.getElementById('notifBtn').onclick = ()=> toast('3 demo notifications: new draft article, 1 media upload, 1 project update.');
  document.getElementById('globalSearch').oninput = (e)=>{
    const q = e.target.value.toLowerCase();
    if(!q) return;
    const hit = [...DATA.pages,...DATA.programs,...DATA.projects,...DATA.news].find(x=> (x.title||'').toLowerCase().includes(q));
    if(hit) toast('Found: '+hit.title+' (demo search)');
  };
}
document.addEventListener('DOMContentLoaded', init);
