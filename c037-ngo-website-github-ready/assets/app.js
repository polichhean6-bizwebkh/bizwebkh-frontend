/* C037 NGO Demo — Public Website Logic (vanilla JS, no build step) */

const STR = {
  en: {
    nav: { home:"Home", about:"About Us", programs:"Our Programs", projects:"Projects", news:"News & Updates", publications:"Publications", team:"Our Team", gallery:"Gallery", partners:"Partners", contact:"Contact Us" },
    ctaLearn:"Learn About Our Work", ctaPrograms:"View Our Programs",
    impactHeading:"Our Impact So Far", impactSub:"Sample figures for demonstration purposes only — final statistics to be confirmed by the client.",
    featProgHeading:"Our Programs", featProgSub:"We work across six focus areas to support lasting, community-led change.",
    featProjHeading:"Current Projects", featProjSub:"A look at projects underway across Cambodia.",
    latestNewsHeading:"Latest News & Updates", latestNewsSub:"Stories and updates from our work in the field.",
    storyHeading:"Community Impact Story",
    partnersHeading:"Our Partners", partnersSub:"We are proud to work alongside government, development partners and civil society.",
    ctaBandTitle:"Interested in Partnering or Supporting Our Work?", ctaBandSub:"Get in touch to learn more about how we work with communities, donors and partners.",
    ctaBandBtn:"Contact Us",
    viewAll:"View All", learnMore:"Learn More", readMore:"Read More", projectDetails:"Project Details", download:"Download",
    allFilter:"All",
    aboutKicker:"About Us", aboutTitle:"Who We Are",
    missionT:"Mission", visionT:"Vision", valuesT:"Core Values", backgroundT:"Organizational Background", governanceT:"Governance & Leadership", timelineT:"Our Milestones",
    programsKicker:"What We Do", programsTitle:"Our Programs", programsSub:"Explore the focus areas through which we support communities.",
    focusAreas:"Key Focus Areas",
    projectsKicker:"Our Work", projectsTitle:"Projects", projectsSub:"Browse current, completed and upcoming projects across provinces.",
    filterStatus:"Status", filterProvince:"Province", filterProgram:"Program",
    newsKicker:"Stories", newsTitle:"News & Updates", newsSub:"Latest news, events, announcements and community stories.",
    pubKicker:"Resources", pubTitle:"Publications & Reports", pubSub:"Annual reports, strategic plans, research and policy documents.",
    teamKicker:"Our People", teamTitle:"Our Team", teamSub:"Meet the governance, leadership and staff who guide our work.",
    galleryKicker:"Photo Gallery", galleryTitle:"Gallery", gallerySub:"Moments from our programs, training and community activities.",
    partnersPageKicker:"Collaboration", partnersPageTitle:"Our Partners", partnersPageSub:"Organizations we work alongside to deliver impact.",
    contactKicker:"Get In Touch", contactTitle:"Contact Us", contactSub:"We'd love to hear from you — reach out with questions, partnership ideas or feedback.",
    address:"Address", phone:"Phone", email:"Email", hours:"Office Hours",
    formName:"Full Name", formOrg:"Organization", formEmail:"Email", formPhone:"Phone", formSubject:"Subject", formMessage:"Message", formSend:"Send Message",
    formNote:"This is a demo form. No message will actually be sent.",
    footerAbout:"A demo NGO website built to showcase how the future public site and CMS dashboard will work together.",
    footerQuick:"Quick Links", footerContact:"Contact", footerFollow:"Follow Us",
    demoBanner:"Website Demo for Client Review — Sample Content Only",
    all:"All Categories",
  },
  km: {
    nav: { home:"ទំព័រដើម", about:"អំពីយើង", programs:"កម្មវិធីរបស់យើង", projects:"គម្រោង", news:"ព័ត៌មាន", publications:"ការបោះពុម្ពផ្សាយ", team:"ក្រុមការងារ", gallery:"វិចិត្រសាល", partners:"ដៃគូ", contact:"ទាក់ទង" },
    ctaLearn:"ស្វែងយល់អំពីការងាររបស់យើង", ctaPrograms:"មើលកម្មវិធីរបស់យើង",
    impactHeading:"ផលប៉ះពាល់របស់យើង", impactSub:"តួលេខគំរូសម្រាប់បង្ហាញប៉ុណ្ណោះ — តួលេខផ្លូវការនឹងត្រូវបញ្ជាក់ដោយអតិថិជន។",
    featProgHeading:"កម្មវិធីរបស់យើង", featProgSub:"យើងធ្វើការលើផ្នែកសំខាន់ៗចំនួន៦ ដើម្បីគាំទ្រការផ្លាស់ប្ដូរប្រកបដោយចីរភាព។",
    featProjHeading:"គម្រោងបច្ចុប្បន្ន", featProjSub:"ទិដ្ឋភាពនៃគម្រោងកំពុងអនុវត្តនៅទូទាំងកម្ពុជា។",
    latestNewsHeading:"ព័ត៌មានថ្មីៗ", latestNewsSub:"រឿងរ៉ាវ និងព័ត៌មានពីការងាររបស់យើងនៅតំបន់។",
    storyHeading:"រឿងផលប៉ះពាល់សហគមន៍",
    partnersHeading:"ដៃគូរបស់យើង", partnersSub:"យើងមានមោទនភាពធ្វើការជាមួយរដ្ឋាភិបាល ដៃគូអភិវឌ្ឍន៍ និងសង្គមស៊ីវិល។",
    ctaBandTitle:"ចាប់អារម្មណ៍ចង់ធ្វើជាដៃគូ ឬគាំទ្រការងាររបស់យើងឬ?", ctaBandSub:"ទាក់ទងមកយើងដើម្បីស្វែងយល់បន្ថែម។",
    ctaBandBtn:"ទាក់ទងយើង",
    viewAll:"មើលទាំងអស់", learnMore:"ស្វែងយល់បន្ថែម", readMore:"អានបន្ថែម", projectDetails:"ព័ត៌មានលម្អិតគម្រោង", download:"ទាញយក",
    allFilter:"ទាំងអស់",
    aboutKicker:"អំពីយើង", aboutTitle:"តើយើងជានរណា",
    missionT:"បេសកកម្ម", visionT:"ចក្ខុវិស័យ", valuesT:"គុណតម្លៃស្នូល", backgroundT:"ប្រវត្តិអង្គការ", governanceT:"អភិបាលកិច្ច និងភាពជាអ្នកដឹកនាំ", timelineT:"សមិទ្ធផលសំខាន់ៗ",
    programsKicker:"អ្វីដែលយើងធ្វើ", programsTitle:"កម្មវិធីរបស់យើង", programsSub:"ស្វែងយល់ពីផ្នែកសំខាន់ៗដែលយើងគាំទ្រសហគមន៍។",
    focusAreas:"ផ្នែកសំខាន់ៗ",
    projectsKicker:"ការងាររបស់យើង", projectsTitle:"គម្រោង", projectsSub:"រកមើលគម្រោងបច្ចុប្បន្ន បានបញ្ចប់ និងនាពេលខាងមុខ។",
    filterStatus:"ស្ថានភាព", filterProvince:"ខេត្ត", filterProgram:"កម្មវិធី",
    newsKicker:"រឿងរ៉ាវ", newsTitle:"ព័ត៌មាន", newsSub:"ព័ត៌មានថ្មីៗ ព្រឹត្តិការណ៍ សេចក្ដីប្រកាស និងរឿងសហគមន៍។",
    pubKicker:"ធនធាន", pubTitle:"ការបោះពុម្ពផ្សាយ", pubSub:"របាយការណ៍ប្រចាំឆ្នាំ ផែនការយុទ្ធសាស្ត្រ និងឯកសារស្រាវជ្រាវ។",
    teamKicker:"បុគ្គលិករបស់យើង", teamTitle:"ក្រុមការងារ", teamSub:"ស្គាល់អភិបាលកិច្ច ភាពជាអ្នកដឹកនាំ និងបុគ្គលិក។",
    galleryKicker:"វិចិត្រសាលរូបភាព", galleryTitle:"វិចិត្រសាល", gallerySub:"ភាពជាក់ស្ដែងពីកម្មវិធី ការបណ្ដុះបណ្ដាល និងសកម្មភាពសហគមន៍។",
    partnersPageKicker:"កិច្ចសហការ", partnersPageTitle:"ដៃគូរបស់យើង", partnersPageSub:"អង្គការដែលយើងធ្វើការជាមួយ។",
    contactKicker:"ទាក់ទងមកយើង", contactTitle:"ទាក់ទងយើង", contactSub:"យើងចង់ស្ដាប់មតិយោបល់ សំណួរ ឬគំនិតជាដៃគូពីអ្នក។",
    address:"អាសយដ្ឋាន", phone:"ទូរស័ព្ទ", email:"អ៊ីមែល", hours:"ម៉ោងធ្វើការ",
    formName:"ឈ្មោះពេញ", formOrg:"អង្គភាព", formEmail:"អ៊ីមែល", formPhone:"ទូរស័ព្ទ", formSubject:"ប្រធានបទ", formMessage:"សារ", formSend:"ផ្ញើសារ",
    formNote:"នេះជាទម្រង់គំរូ។ សារនឹងមិនត្រូវបានផ្ញើពិតប្រាកដទេ។",
    footerAbout:"គេហទំព័រគំរូអង្គការមិនស្វែងរកប្រាក់ចំណេញ ដើម្បីបង្ហាញពីរបៀបដែលគេហទំព័រ និងផ្ទាំងគ្រប់គ្រងខ្លឹមសារនឹងធ្វើការជាមួយគ្នា។",
    footerQuick:"តំណភ្ជាប់រហ័ស", footerContact:"ទាក់ទង", footerFollow:"តាមដានយើង",
    demoBanner:"គេហទំព័រគំរូសម្រាប់ការត្រួតពិនិត្យរបស់អតិថិជន — ខ្លឹមសារគំរូប៉ុណ្ណោះ",
    all:"ប្រភេទទាំងអស់",
  }
};

let LANG = "en";
let DATA = CMS.load();
let GAL_FILTER = "All";
let NEWS_FILTER = "All";
let PROJ_FILTER = { status:"All", program:"All", province:"All" };
let LIGHTBOX_IDX = 0;

function t(key){ return STR[LANG][key]; }
function f(item, base){ // language-aware field getter e.g. f(item,'title')
  if (LANG === "km" && item[base+"Kh"]) return item[base+"Kh"];
  return item[base];
}
function fmtDate(d){
  try{ return new Date(d).toLocaleDateString(LANG==="km"?"km-KH":"en-US", {year:"numeric",month:"short",day:"numeric"}); }catch(e){return d;}
}
function byOrder(a,b){ return (a.order||0)-(b.order||0); }
function published(arr){ return arr.filter(x=>x.status!=="Draft"); }

function programTitle(id){
  const p = DATA.programs.find(p=>p.id===id);
  return p ? f(p,'title') : id;
}

/* ---------------- Header / Footer / Nav ---------------- */
/* Maps Admin Dashboard > Menu Management item ids to public site pages,
   so reordering/hiding a menu item there is reflected here (demo). */
const MENU_PAGE_MAP = { m1:'home', m2:'about', m3:'programs', m4:'projects', m5:'news', m6:'publications', m7:'team', m8:'gallery', m9:'partners', m10:'contact' };
function renderChrome(){
  document.getElementById('demoBanner').textContent = t('demoBanner');
  const menuOrder = (DATA.menu||[]).slice().sort((a,b)=>(a.order||0)-(b.order||0));
  const navItems = menuOrder.length
    ? menuOrder.filter(m=>m.visible!==false && MENU_PAGE_MAP[m.id]).map(m=>MENU_PAGE_MAP[m.id])
    : ['home','about','programs','projects','news','publications','team','gallery','partners','contact'];
  const navHtml = navItems.map(k=>`<a data-page="${k}" class="nav-link">${t('nav')[k]}</a>`).join('');
  document.getElementById('mainNav').innerHTML = navHtml;
  document.getElementById('mobileNav').innerHTML = navHtml;
  document.querySelectorAll('.lang-switch button').forEach(b=>b.classList.toggle('active', b.dataset.lang===LANG));
  document.documentElement.lang = LANG === 'km' ? 'km' : 'en';
  document.body.classList.toggle('kh', LANG==='km');
  renderFooter();
  bindNavClicks();
}

function renderFooter(){
  const c = DATA.contact;
  document.getElementById('footerContent').innerHTML = `
    <div class="footer-grid">
      <div>
        <h5>${f(DATA.meta,'orgName')}</h5>
        <p>${t('footerAbout')}</p>
      </div>
      <div>
        <h5>${t('footerQuick')}</h5>
        <a data-page="about" class="nav-link" style="display:block;">${t('nav').about}</a>
        <a data-page="programs" class="nav-link" style="display:block;">${t('nav').programs}</a>
        <a data-page="projects" class="nav-link" style="display:block;">${t('nav').projects}</a>
        <a data-page="news" class="nav-link" style="display:block;">${t('nav').news}</a>
      </div>
      <div>
        <h5>${t('footerContact')}</h5>
        <p>${c.address}</p>
        <p>${c.phone}</p>
        <p>${c.email}</p>
      </div>
      <div>
        <h5>${t('footerFollow')}</h5>
        <a href="${c.facebook}" target="_blank" style="display:block;">Facebook</a>
        <a href="${c.telegram}" target="_blank" style="display:block;">Telegram</a>
        <a href="${c.linkedin}" target="_blank" style="display:block;">LinkedIn</a>
        <a href="${c.youtube}" target="_blank" style="display:block;">YouTube</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 ${f(DATA.meta,'orgName')} · Demo site — sample content only</span>
      <span>Built for client review — C037</span>
    </div>`;
  bindNavClicks();
}

function bindNavClicks(){
  document.querySelectorAll('[data-page]').forEach(el=>{
    el.onclick = (e)=>{ e.preventDefault(); goTo(el.dataset.page); document.getElementById('mobileNav').classList.remove('open'); };
  });
}

function setActiveNav(page){
  document.querySelectorAll('.nav-link').forEach(a=> a.classList.toggle('active', a.dataset.page===page));
}

/* ---------------- Router ---------------- */
function goTo(page){
  location.hash = page;
}
function renderPage(){
  const page = (location.hash||'#home').replace('#','') || 'home';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el = document.getElementById('page-'+page);
  (el||document.getElementById('page-home')).classList.add('active');
  setActiveNav(page);
  window.scrollTo({top:0,behavior:'instant'});
  const renderers = {home:renderHome, about:renderAbout, programs:renderPrograms, projects:renderProjects, news:renderNews, publications:renderPublications, team:renderTeam, gallery:renderGallery, partners:renderPartners, contact:renderContact};
  (renderers[page]||renderHome)();
}

/* ---------------- HOME ---------------- */
function renderHome(){
  const h = DATA.homepage;
  const stats = h.impactStats.map(s=>`
    <div><div class="stat-num">${s.value}</div><div class="stat-label">${LANG==='km'?s.labelKh:s.label}</div></div>`).join('');
  const feProgs = h.featuredProgramIds.map(id=>DATA.programs.find(p=>p.id===id)).filter(Boolean);
  const feProjs = h.featuredProjectIds.map(id=>DATA.projects.find(p=>p.id===id)).filter(Boolean);
  const feNews = h.featuredNewsIds.map(id=>DATA.news.find(n=>n.id===id)).filter(Boolean);

  document.getElementById('page-home').innerHTML = `
    <section class="hero" style="background-image:url('${h.heroImage}')">
      <div class="hero-content">
        <span class="badge-demo">DEMO CONTENT</span>
        <h1>${LANG==='km'?h.heroTitleKh:h.heroTitle}</h1>
        <p>${LANG==='km'?h.heroSubtitleKh:h.heroSubtitle}</p>
        <div class="hero-ctas">
          <a class="btn btn-outline" data-page="about">${t('ctaLearn')}</a>
          <a class="btn btn-primary" data-page="programs" style="background:var(--accent);">${t('ctaPrograms')}</a>
        </div>
      </div>
    </section>

    <section class="stats-strip">
      <div class="container">
        <div class="stats-grid">${stats}</div>
        <div class="stat-demo-note">* Sample figures for demonstration purposes only.</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('programsKicker')}</span>
        <h2 class="section-title">${t('featProgHeading')}</h2>
        <p class="section-sub">${t('featProgSub')}</p>
        <div class="grid grid-3">
          ${feProgs.map(programCard).join('')}
        </div>
        <div class="mt-40 text-center"><a class="btn btn-ghost" data-page="programs">${t('viewAll')} →</a></div>
      </div>
    </section>

    <section class="section" style="background:#fff;">
      <div class="container">
        <span class="section-kicker">${t('projectsKicker')}</span>
        <h2 class="section-title">${t('featProjHeading')}</h2>
        <p class="section-sub">${t('featProjSub')}</p>
        <div class="grid grid-3">
          ${feProjs.map(projectCard).join('')}
        </div>
        <div class="mt-40 text-center"><a class="btn btn-ghost" data-page="projects">${t('viewAll')} →</a></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('newsKicker')}</span>
        <h2 class="section-title">${t('latestNewsHeading')}</h2>
        <p class="section-sub">${t('latestNewsSub')}</p>
        <div class="grid grid-3">
          ${feNews.map(newsCard).join('')}
        </div>
        <div class="mt-40 text-center"><a class="btn btn-ghost" data-page="news">${t('viewAll')} →</a></div>
      </div>
    </section>

    <section class="section" style="background:#fff;">
      <div class="container split">
        ${imgTag(h.impactStory.image, "Community impact story", "", 'style="border-radius:14px;box-shadow:var(--shadow);width:100%;height:340px;object-fit:cover;"')}
        <div>
          <span class="section-kicker">${t('storyHeading')}</span>
          <h2 class="section-title">${LANG==='km'?h.impactStory.titleKh:h.impactStory.title}</h2>
          <p style="color:var(--ink-soft);">${h.impactStory.body}</p>
          <span class="badge-demo">DEMO STORY</span>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="container">
        <h3 class="text-center" style="color:var(--teal-900);margin-bottom:26px;">${t('partnersHeading')}</h3>
        <div class="grid grid-4">
          ${DATA.partners.filter(p=>p.status!=='Draft').slice(0,8).map(p=>`<div class="partner-card">${imgTag(p.logo,p.name,'partner-mark')}<div class="partner-name">${p.name}</div></div>`).join('')}
        </div>
        <p class="text-center" style="font-size:12px;color:var(--ink-soft);margin-top:16px;">Sample partner logos for demo only.</p>
      </div>
    </section>

    <section class="section" style="background:linear-gradient(135deg,var(--teal-900),var(--teal-800));color:#fff;text-align:center;">
      <div class="container">
        <h2 style="font-size:30px;margin-bottom:10px;">${t('ctaBandTitle')}</h2>
        <p style="color:#cfe4e0;max-width:560px;margin:0 auto 26px;">${t('ctaBandSub')}</p>
        <a class="btn btn-outline" data-page="contact">${t('ctaBandBtn')}</a>
      </div>
    </section>
  `;
  bindNavClicks();
}

function programCard(p){
  return `<div class="card">
    ${imgTag(p.image, f(p,'title'), 'card-img')}
    <div class="card-body">
      <div class="card-eyebrow">${t('programsKicker')}</div>
      <h3 class="card-title">${f(p,'title')}</h3>
      <p class="card-desc">${f(p,'desc')}</p>
      <div class="chip-row">${p.focus.slice(0,3).map(x=>`<span class="chip">${x}</span>`).join('')}</div>
      <a class="card-link" data-page="programs">${t('learnMore')} →</a>
    </div>
  </div>`;
}

function projectCard(p){
  return `<div class="card">
    ${imgTag(p.image, p.title, 'card-img')}
    <div class="card-body">
      <div class="card-eyebrow">${programTitle(p.program)} · ${p.province}</div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="chip-row"><span class="status-pill status-${p.status}">${p.status}</span></div>
      <a class="card-link" href="javascript:void(0)" onclick="openProjectModal('${p.id}')">${t('projectDetails')} →</a>
    </div>
  </div>`;
}

function newsCard(n){
  return `<div class="card">
    ${imgTag(n.image, n.title, 'card-img')}
    <div class="card-body">
      <div class="card-eyebrow">${n.category} · ${fmtDate(n.date)}</div>
      <h3 class="card-title">${LANG==='km'?n.titleKh:n.title}</h3>
      <p class="card-desc">${n.excerpt}</p>
      <a class="card-link" href="javascript:void(0)" onclick="openNewsModal('${n.id}')">${t('readMore')} →</a>
    </div>
  </div>`;
}

/* ---------------- ABOUT ---------------- */
function renderAbout(){
  const a = DATA.about;
  document.getElementById('page-about').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('aboutKicker')}</span>
        <h1 class="section-title">${t('aboutTitle')}</h1>
        <p class="section-sub">${a.whoWeAre}</p>
        <div class="grid grid-2" style="margin-bottom:40px;">
          <div class="value-card"><h4>${t('missionT')}</h4><p style="color:var(--ink-soft);">${a.mission}</p></div>
          <div class="value-card"><h4>${t('visionT')}</h4><p style="color:var(--ink-soft);">${a.vision}</p></div>
        </div>
        <h3 style="color:var(--teal-900);">${t('valuesT')}</h3>
        <div class="grid grid-4" style="margin:18px 0 44px;">
          ${a.values.map(v=>`<div class="value-card"><h4>${v.title}</h4><p style="color:var(--ink-soft);font-size:14px;">${v.desc}</p></div>`).join('')}
        </div>
        <div class="split" style="margin-bottom:44px;">
          <div>
            <h3 style="color:var(--teal-900);">${t('backgroundT')}</h3>
            <p style="color:var(--ink-soft);">${a.background}</p>
            <h3 style="color:var(--teal-900);margin-top:24px;">${t('governanceT')}</h3>
            <p style="color:var(--ink-soft);">${a.governance}</p>
          </div>
          ${imgTag(IMG.meeting, "Governance meeting", "", 'style="border-radius:14px;box-shadow:var(--shadow);width:100%;height:300px;object-fit:cover;"')}
        </div>
        <h3 style="color:var(--teal-900);margin-bottom:20px;">${t('timelineT')}</h3>
        <div class="timeline">
          ${a.timeline.map(tl=>`<div class="timeline-item"><div class="timeline-year">${tl.year}</div><div style="color:var(--ink-soft);">${tl.text}</div></div>`).join('')}
        </div>
      </div>
    </section>`;
  bindNavClicks();
}

/* ---------------- PROGRAMS ---------------- */
function renderPrograms(){
  document.getElementById('page-programs').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('programsKicker')}</span>
        <h1 class="section-title">${t('programsTitle')}</h1>
        <p class="section-sub">${t('programsSub')}</p>
        <div class="grid grid-3">
          ${published(DATA.programs).sort(byOrder).map(p=>`
            <div class="card">
              ${imgTag(p.image, f(p,'title'), 'card-img')}
              <div class="card-body">
                <h3 class="card-title">${f(p,'title')}</h3>
                <p class="card-desc">${f(p,'desc')}</p>
                <div style="font-size:12px;font-weight:700;color:var(--teal-800);margin-bottom:8px;">${t('focusAreas')}</div>
                <div class="chip-row">${p.focus.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
                <a class="card-link" data-page="projects">${t('learnMore')} →</a>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>`;
  bindNavClicks();
}

/* ---------------- PROJECTS ---------------- */
function renderProjects(){
  const statuses = ["All","Ongoing","Completed","Upcoming"];
  const provinces = ["All", ...new Set(DATA.projects.map(p=>p.province))];
  const programs = ["All", ...DATA.programs.map(p=>p.id)];
  document.getElementById('page-projects').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('projectsKicker')}</span>
        <h1 class="section-title">${t('projectsTitle')}</h1>
        <p class="section-sub">${t('projectsSub')}</p>
        <div style="margin-bottom:10px;font-size:12.5px;font-weight:700;color:var(--teal-800);">${t('filterStatus')}</div>
        <div class="filter-bar" id="statusFilters">
          ${statuses.map(s=>`<button class="filter-chip ${PROJ_FILTER.status===s?'active':''}" data-f="status" data-v="${s}">${s==='All'?t('allFilter'):s}</button>`).join('')}
        </div>
        <div style="margin-bottom:10px;font-size:12.5px;font-weight:700;color:var(--teal-800);">${t('filterProvince')}</div>
        <div class="filter-bar" id="provinceFilters">
          ${provinces.map(s=>`<button class="filter-chip ${PROJ_FILTER.province===s?'active':''}" data-f="province" data-v="${s}">${s==='All'?t('allFilter'):s}</button>`).join('')}
        </div>
        <div id="projectGrid" class="grid grid-3"></div>
      </div>
    </section>`;
  document.querySelectorAll('#statusFilters .filter-chip, #provinceFilters .filter-chip').forEach(btn=>{
    btn.onclick = ()=>{ PROJ_FILTER[btn.dataset.f] = btn.dataset.v; renderProjects(); };
  });
  const list = DATA.projects.filter(p=>
    (PROJ_FILTER.status==='All'||p.status===PROJ_FILTER.status) &&
    (PROJ_FILTER.province==='All'||p.province===PROJ_FILTER.province)
  );
  document.getElementById('projectGrid').innerHTML = list.length ? list.map(projectCard).join('') : `<p style="color:var(--ink-soft);">No projects match this filter (demo data).</p>`;
  bindNavClicks();
}

function openProjectModal(id){
  const p = DATA.projects.find(x=>x.id===id);
  if(!p) return;
  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay open" onclick="if(event.target===this)closeModal()">
      <div class="modal-card">
        <div class="modal-wrap">
          ${imgTag(p.image, p.title, 'modal-img')}
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
          <span class="status-pill status-${p.status}">${p.status}</span>
          <h2 style="color:var(--teal-900);margin:12px 0 6px;">${p.title}</h2>
          <div class="modal-meta">
            <span class="meta-item">📍 ${p.province}</span>
            <span class="meta-item">🗂 ${programTitle(p.program)}</span>
            <span class="meta-item">📅 ${fmtDate(p.start)} – ${fmtDate(p.end)}</span>
            <span class="meta-item">🤝 ${p.partner}</span>
            <span class="meta-item">💰 ${p.donor}</span>
          </div>
          <p style="color:var(--ink-soft);">${p.desc}</p>
          ${p.results.length? `<h4 style="color:var(--teal-900);margin-top:18px;">Sample Project Results</h4><ul style="color:var(--ink-soft);">${p.results.map(r=>`<li>${r}</li>`).join('')}</ul>` : ''}
          <span class="badge-demo" style="margin-top:10px;">DEMO PROJECT DATA</span>
        </div>
      </div>
    </div>`;
}
function openNewsModal(id){
  const n = DATA.news.find(x=>x.id===id);
  if(!n) return;
  document.getElementById('modalRoot').innerHTML = `
    <div class="modal-overlay open" onclick="if(event.target===this)closeModal()">
      <div class="modal-card">
        <div class="modal-wrap">
          ${imgTag(n.image, n.title, 'modal-img')}
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="card-eyebrow">${n.category} · ${fmtDate(n.date)}</div>
          <h2 style="color:var(--teal-900);margin:6px 0 14px;">${LANG==='km'?n.titleKh:n.title}</h2>
          <p style="color:var(--ink-soft);">${n.body}</p>
          <div class="chip-row" style="margin-top:16px;">${n.tags.map(x=>`<span class="chip">#${x}</span>`).join('')}</div>
          <span class="badge-demo" style="margin-top:10px;">DEMO ARTICLE</span>
        </div>
      </div>
    </div>`;
}
function closeModal(){ document.getElementById('modalRoot').innerHTML=''; }

/* ---------------- NEWS ---------------- */
function renderNews(){
  const cats = ["All","News","Events","Announcements","Community Stories"];
  const featured = DATA.news.filter(n=>n.status!=='Draft')[0];
  document.getElementById('page-news').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('newsKicker')}</span>
        <h1 class="section-title">${t('newsTitle')}</h1>
        <p class="section-sub">${t('newsSub')}</p>
        ${featured? `<div class="card featured-news-card">
          ${imgTag(featured.image, featured.title, '', 'style="width:100%;height:100%;min-height:260px;object-fit:cover;"')}
          <div class="card-body" style="justify-content:center;">
            <div class="card-eyebrow">Featured · ${featured.category} · ${fmtDate(featured.date)}</div>
            <h2 class="card-title" style="font-size:22px;">${LANG==='km'?featured.titleKh:featured.title}</h2>
            <p class="card-desc">${featured.excerpt}</p>
            <a class="card-link" href="javascript:void(0)" onclick="openNewsModal('${featured.id}')">${t('readMore')} →</a>
          </div>
        </div>` : ''}
        <div class="filter-bar" id="newsFilters">
          ${cats.map(c=>`<button class="filter-chip ${NEWS_FILTER===c?'active':''}" data-v="${c}">${c==='All'?t('allFilter'):c}</button>`).join('')}
        </div>
        <div id="newsGrid" class="grid grid-3"></div>
      </div>
    </section>`;
  document.querySelectorAll('#newsFilters .filter-chip').forEach(btn=>{
    btn.onclick = ()=>{ NEWS_FILTER = btn.dataset.v; renderNews(); };
  });
  const list = DATA.news.filter(n=>n.status!=='Draft' && (NEWS_FILTER==='All'||n.category===NEWS_FILTER));
  document.getElementById('newsGrid').innerHTML = list.length ? list.map(newsCard).join('') : `<p style="color:var(--ink-soft);">No articles in this category (demo data).</p>`;
  bindNavClicks();
}

/* ---------------- PUBLICATIONS ---------------- */
function renderPublications(){
  document.getElementById('page-publications').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('pubKicker')}</span>
        <h1 class="section-title">${t('pubTitle')}</h1>
        <p class="section-sub">${t('pubSub')}</p>
        <div class="grid grid-3">
          ${DATA.publications.filter(p=>p.status!=='Draft').map(p=>`
            <div class="card">
              <div class="card-body">
                <div style="font-size:34px;">📄</div>
                <div class="card-eyebrow">${p.category} · ${p.year}</div>
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.desc}</p>
                <a class="btn btn-ghost btn-sm" href="javascript:void(0)" onclick="fakeDownload('${p.title.replace(/'/g,"")}')">⬇ ${t('download')} (PDF demo)</a>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>`;
  bindNavClicks();
}
function fakeDownload(title){ showToast((LANG==='km'?'ការទាញយកគំរូ៖ ':'Demo download: ')+title); }

/* ---------------- TEAM ---------------- */
function renderTeam(){
  const groups = [["Board","Board / Governance"],["Management","Executive & Program Management"],["Staff","Staff"]];
  document.getElementById('page-team').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('teamKicker')}</span>
        <h1 class="section-title">${t('teamTitle')}</h1>
        <p class="section-sub">${t('teamSub')}</p>
        ${groups.map(([dept,label])=>{
          const members = DATA.team.filter(m=>m.dept===dept && m.status!=='Draft').sort(byOrder);
          if(!members.length) return '';
          return `<h3 style="color:var(--teal-900);margin:30px 0 16px;">${label}</h3>
          <div class="grid grid-4">
            ${members.map(m=>`
              <div class="card">
                ${imgTag(m.photo, m.name, 'card-img', 'style="height:200px;object-fit:cover;"')}
                <div class="card-body">
                  <h4 style="margin:0 0 4px;color:var(--teal-900);">${m.name}</h4>
                  <div class="card-eyebrow" style="color:var(--teal-800);">${m.position}</div>
                  <p class="card-desc" style="font-size:13.5px;">${m.bio}</p>
                  <span class="badge-demo">SAMPLE PROFILE</span>
                </div>
              </div>`).join('')}
          </div>`;
        }).join('')}
      </div>
    </section>`;
  bindNavClicks();
}

/* ---------------- GALLERY ---------------- */
function renderGallery(){
  const cats = ["All","Community Activities","Training","Events","Field Visits","Partner Activities"];
  document.getElementById('page-gallery').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('galleryKicker')}</span>
        <h1 class="section-title">${t('galleryTitle')}</h1>
        <p class="section-sub">${t('gallerySub')}</p>
        <div class="filter-bar" id="galFilters">
          ${cats.map(c=>`<button class="filter-chip ${GAL_FILTER===c?'active':''}" data-v="${c}">${c==='All'?t('allFilter'):c}</button>`).join('')}
        </div>
        <div id="galleryGrid" class="gallery-grid"></div>
      </div>
    </section>`;
  document.querySelectorAll('#galFilters .filter-chip').forEach(btn=>{
    btn.onclick = ()=>{ GAL_FILTER = btn.dataset.v; renderGallery(); };
  });
  const list = DATA.gallery.filter(g=>GAL_FILTER==='All'||g.category===GAL_FILTER);
  document.getElementById('galleryGrid').innerHTML = list.map((g,i)=>`
    <div class="gallery-item" onclick="openLightbox('${g.id}')">
      ${imgTag(g.image, g.caption, '')}
      <div class="gallery-cap">${g.caption}</div>
    </div>`).join('');
  bindNavClicks();
}
function currentGalleryList(){ return DATA.gallery.filter(g=>GAL_FILTER==='All'||g.category===GAL_FILTER); }
function openLightbox(id){
  const list = currentGalleryList();
  LIGHTBOX_IDX = list.findIndex(g=>g.id===id);
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
}
function renderLightbox(){
  const list = currentGalleryList();
  const g = list[LIGHTBOX_IDX];
  document.getElementById('lightboxImg').src = g.image;
  document.getElementById('lightboxCap').textContent = g.caption + ` (${g.category})`;
}
function lightboxNav(dir){
  const list = currentGalleryList();
  LIGHTBOX_IDX = (LIGHTBOX_IDX + dir + list.length) % list.length;
  renderLightbox();
}
function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); }

/* ---------------- PARTNERS ---------------- */
function renderPartners(){
  const cats = ["Government","Development Partners","NGOs","Private Sector"];
  document.getElementById('page-partners').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('partnersPageKicker')}</span>
        <h1 class="section-title">${t('partnersPageTitle')}</h1>
        <p class="section-sub">${t('partnersPageSub')}</p>
        ${cats.map(c=>{
          const items = DATA.partners.filter(p=>p.category===c && p.status!=='Draft').sort(byOrder);
          if(!items.length) return '';
          return `<h3 style="color:var(--teal-900);margin:28px 0 14px;">${c}</h3>
          <div class="grid grid-4">${items.map(p=>`<a class="partner-card" href="${p.website}" target="_blank" title="${p.name}">${imgTag(p.logo,p.name,'partner-mark')}<div class="partner-name">${p.name}</div></a>`).join('')}</div>`;
        }).join('')}
        <p class="text-center" style="font-size:12px;color:var(--ink-soft);margin-top:20px;">Sample partner logos for demo only.</p>
      </div>
    </section>`;
  bindNavClicks();
}

/* ---------------- CONTACT ---------------- */
function renderContact(){
  const c = DATA.contact;
  document.getElementById('page-contact').innerHTML = `
    <section class="section">
      <div class="container">
        <span class="section-kicker">${t('contactKicker')}</span>
        <h1 class="section-title">${t('contactTitle')}</h1>
        <p class="section-sub">${t('contactSub')}</p>
        <div class="contact-grid">
          <div class="contact-panel">
            <div class="info-row"><div class="info-icon">📍</div><div><strong>${t('address')}</strong><br><span style="color:var(--ink-soft);">${c.address}</span></div></div>
            <div class="info-row"><div class="info-icon">📞</div><div><strong>${t('phone')}</strong><br><span style="color:var(--ink-soft);">${c.phone}</span></div></div>
            <div class="info-row"><div class="info-icon">✉️</div><div><strong>${t('email')}</strong><br><span style="color:var(--ink-soft);">${c.email}</span></div></div>
            <div class="info-row" style="margin-bottom:18px;"><div class="info-icon">🕘</div><div><strong>${t('hours')}</strong><br><span style="color:var(--ink-soft);">${c.hours}</span></div></div>
            <div class="map-placeholder"><iframe src="${c.mapUrl}" loading="lazy" title="Map location (demo)"></iframe></div>
          </div>
          <div class="contact-panel">
            <form id="contactForm" onsubmit="return submitContact(event)">
              <div class="form-field"><label>${t('formName')} *</label><input required type="text"></div>
              <div class="form-row2">
                <div class="form-field"><label>${t('formEmail')} *</label><input required type="email"></div>
                <div class="form-field"><label>${t('formPhone')}</label><input type="text"></div>
              </div>
              <div class="form-field"><label>${t('formSubject')}</label><input type="text"></div>
              <div class="form-field"><label>${t('formMessage')} *</label><textarea required></textarea></div>
              <button class="btn btn-primary" type="submit">${t('formSend')}</button>
              <p style="font-size:12.5px;color:var(--ink-soft);margin-top:10px;">${t('formNote')}</p>
            </form>
          </div>
        </div>
      </div>
    </section>`;
  bindNavClicks();
}
function submitContact(e){
  e.preventDefault();
  showToast(LANG==='km' ? 'សារគំរូបានផ្ញើ (ការសាកល្បង)' : 'Demo message "sent" — no real backend is connected.');
  e.target.reset();
  return false;
}

/* ---------------- Toast ---------------- */
let toastTimer;
function showToast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 3200);
}

/* ---------------- Init ---------------- */
function init(){
  DATA = CMS.load();
  document.getElementById('brandName').textContent = f(DATA.meta,'orgName');
  renderChrome();
  window.addEventListener('hashchange', renderPage);
  renderPage();

  document.getElementById('hamburger').onclick = ()=> document.getElementById('mobileNav').classList.toggle('open');
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.onclick = ()=>{ LANG = b.dataset.lang; renderChrome(); renderPage(); };
  });
  document.getElementById('lightboxClose').onclick = closeLightbox;
  document.getElementById('lightboxPrev').onclick = ()=>lightboxNav(-1);
  document.getElementById('lightboxNext').onclick = ()=>lightboxNav(1);
  document.getElementById('lightbox').addEventListener('click', (e)=>{ if(e.target.id==='lightbox') closeLightbox(); });
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape'){ closeLightbox(); closeModal(); }
    if(document.getElementById('lightbox').classList.contains('open')){
      if(e.key==='ArrowRight') lightboxNav(1);
      if(e.key==='ArrowLeft') lightboxNav(-1);
    }
  });

  // live-refresh if admin dashboard updates localStorage in another tab
  window.addEventListener('storage', (e)=>{
    if(e.key === CMS_KEY){ DATA = CMS.load(); renderChrome(); renderPage(); showToast(LANG==='km'?'ខ្លឹមសារបានធ្វើបច្ចុប្បន្នភាពពីផ្ទាំងគ្រប់គ្រង':'Content updated from Admin Dashboard'); }
  });
}
document.addEventListener('DOMContentLoaded', init);
