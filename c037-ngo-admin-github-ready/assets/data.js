/* ==========================================================================
   C037 — NGO Website + CMS Dashboard DEMO
   SHARED SAMPLE DATA
   ------------------------------------------------------------------------
   This file contains 100% placeholder / demo content for client review.
   No real organization name, logo, address, phone, email, registration
   number, donor, partner, statistic, or history is represented here.
   All content shown here can be edited from the Admin Dashboard demo.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   Image handling — every photo below is requested by descriptive NGO/
   community-development keywords (never by guessing a single fixed photo
   ID), and every <img> rendered anywhere in either app also carries a
   local onerror fallback (see FALLBACK_IMG / imgTag below) so a slow or
   unreachable network connection can NEVER show a broken-image icon.
   --------------------------------------------------------------------------- */
function flickr(w, h, tags, lock) {
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(tags)}?lock=${lock}`;
}

const IMG = {
  hero:        flickr(1600, 900, "cambodia,community,volunteer", 101),
  hero2:       flickr(1600, 900, "school,cambodia,children", 102),
  community1:  flickr(900, 600, "community,meeting,cambodia", 103),
  education:   flickr(900, 600, "classroom,children,school", 104),
  environment: flickr(900, 600, "treeplanting,volunteer,forest", 105),
  livelihood:  flickr(900, 600, "farmer,agriculture,rural", 106),
  health:      flickr(900, 600, "healthcare,clinic,community", 107),
  youth:       flickr(900, 600, "youth,grouptraining,workshop", 108),
  communitydev:flickr(900, 600, "village,construction,community", 109),
  village:     flickr(900, 600, "rural,village,southeastasia", 110),
  meeting:     flickr(900, 600, "meeting,ngo,workshop", 111),
  field:       flickr(900, 600, "farmer,ricefield,agriculture", 112),
  training:    flickr(900, 600, "training,teacher,workshop", 113),
  landscape:   flickr(1200, 700, "cambodia,countryside,ricefield", 114),
  group:       flickr(900, 600, "volunteers,groupphoto,community", 115),
  forest:      flickr(900, 600, "forest,tree,reforestation", 116),
};

/* Local, network-independent fallback (light teal card with a simple photo
   icon) — used automatically if any remote sample image fails to load. */
const FALLBACK_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'>
     <rect width='100%' height='100%' fill='#e4f0ee'/>
     <g fill='#0f5c52' opacity='0.55'>
       <rect x='370' y='250' width='160' height='115' rx='10' fill='none' stroke='#0f5c52' stroke-width='8'/>
       <circle cx='410' cy='285' r='14' fill='#0f5c52'/>
       <path d='M370 345 L430 300 L470 330 L530 285 L530 365 L370 365 Z'/>
     </g>
     <text x='50%' y='420' font-family='Inter,Arial,sans-serif' font-size='20' fill='#0f5c52' text-anchor='middle' opacity='0.7'>Sample NGO Image</text>
   </svg>`
);

/* Renders a consistent <img> tag with lazy loading + guaranteed fallback.
   `extra` accepts any additional raw attributes, e.g. inline style="...". */
function imgTag(src, alt, cls, extra) {
  const safeAlt = (alt || "NGO demo image").replace(/"/g, "&quot;");
  return `<img src="${src}" alt="${safeAlt}" class="${cls || ''}" loading="lazy" ${extra || ''} onerror="this.onerror=null;this.src='${FALLBACK_IMG}';">`;
}

function avatar(seed) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&background=0f5c52&color=fff&size=256&font-size=0.36&rounded=true&bold=true`;
}

/* Partner "logos" are drawn as clean monogram marks (no external image
   dependency at all, so they always render crisply — appropriate for a
   demo where real partner logos are not yet available). */
const MONO_COLORS = ["#0f5c52", "#146b60", "#c97a1f", "#3a6b8a", "#7a5a9e", "#5a7a3e"];
function monogram(name, colorIndex) {
  const initials = name.replace(/\(.*?\)/g, "").trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const bg = MONO_COLORS[colorIndex % MONO_COLORS.length];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='140'>
     <rect width='100%' height='100%' rx='14' fill='${bg}'/>
     <text x='50%' y='58%' font-family='Inter,Arial,sans-serif' font-size='40' font-weight='700' fill='#ffffff' text-anchor='middle' dominant-baseline='middle'>${initials}</text>
     <text x='50%' y='82%' font-family='Inter,Arial,sans-serif' font-size='11' letter-spacing='1' fill='#ffffff' opacity='0.8' text-anchor='middle'>SAMPLE LOGO</text>
   </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const SEED_DATA = {
  meta: {
    orgName: "[NGO Name — Placeholder for Client Review]",
    orgNameKh: "[ឈ្មោះអង្គការ — សម្រាប់ពិនិត្យ]",
    tagline: "Working with communities for lasting change",
    taglineKh: "ធ្វើការជាមួយសហគមន៍ដើម្បីការផ្លាស់ប្ដូរប្រកបដោយចីរភាព",
  },

  homepage: {
    heroTitle: "Building Stronger Communities Across Cambodia",
    heroTitleKh: "កសាងសហគមន៍ដ៏រឹងមាំនៅទូទាំងកម្ពុជា",
    heroSubtitle: "We work alongside communities, government and partners to improve education, livelihoods, health and the environment. (Demo sample text — to be replaced with official content.)",
    heroSubtitleKh: "យើងធ្វើការជាមួយសហគមន៍ រដ្ឋាភិបាល និងដៃគូ ដើម្បីលើកកម្ពស់ការអប់រំ ជីវភាព សុខភាព និងបរិស្ថាន។ (អត្ថបទគំរូ — នឹងជំនួសដោយអត្ថបទផ្លូវការ)",
    heroImage: IMG.hero,
    ctaPrimary: "Learn About Our Work",
    ctaSecondary: "View Our Programs",
    impactStats: [
      { label: "Communities Reached", labelKh: "សហគមន៍ដែលបានជួយ", value: "120+" },
      { label: "Projects Completed", labelKh: "គម្រោងបានបញ្ចប់", value: "48" },
      { label: "Provinces Covered", labelKh: "ខេត្តគ្របដណ្ដប់", value: "9" },
      { label: "Beneficiaries Supported", labelKh: "អ្នកទទួលផលបានជួយ", value: "35,000+" },
    ],
    featuredProgramIds: ["prog-education", "prog-livelihood", "prog-health"],
    featuredProjectIds: ["proj-1", "proj-3", "proj-5"],
    featuredNewsIds: ["news-1", "news-2", "news-3"],
    impactStory: {
      title: "From Training to Income: A Community Story",
      titleKh: "ពីការបណ្ដុះបណ្ដាលរហូតដល់ចំណូល៖ រឿងរបស់សហគមន៍",
      body: "\"Sample impact story placeholder — real testimonials and case studies from the field will be added once existing content is reviewed and approved.\"",
      image: IMG.community1,
    },
  },

  pages: [
    { id: "page-home", title: "Home", slug: "/", lang: "EN/KH", status: "Published", updated: "2026-08-01", updatedBy: "Content Editor" },
    { id: "page-about", title: "About Us", slug: "/about", lang: "EN/KH", status: "Published", updated: "2026-07-28", updatedBy: "Admin" },
    { id: "page-contact", title: "Contact Us", slug: "/contact", lang: "EN/KH", status: "Published", updated: "2026-07-20", updatedBy: "Content Editor" },
    { id: "page-governance", title: "Governance", slug: "/about/governance", lang: "EN", status: "Draft", updated: "2026-07-15", updatedBy: "Admin" },
  ],

  about: {
    whoWeAre: "Sample placeholder text describing who the organization is, its founding purpose and community focus. Final wording to be supplied by the client.",
    mission: "To work in partnership with communities to improve education, health, livelihoods and the environment. (Demo sample — not official.)",
    vision: "A Cambodia where every community has the opportunity to thrive. (Demo sample — not official.)",
    values: [
      { title: "Integrity", desc: "Sample value description — placeholder text." },
      { title: "Community-Centered", desc: "Sample value description — placeholder text." },
      { title: "Partnership", desc: "Sample value description — placeholder text." },
      { title: "Accountability", desc: "Sample value description — placeholder text." },
    ],
    background: "Sample organizational background paragraph. This section will be replaced with the client's verified history and registration details.",
    governance: "Sample governance description outlining the Board and management structure. To be confirmed by client.",
    timeline: [
      { year: "20XX", text: "Sample milestone — organization established (placeholder)." },
      { year: "20XX", text: "Sample milestone — first community program launched (placeholder)." },
      { year: "20XX", text: "Sample milestone — expanded to additional provinces (placeholder)." },
      { year: "20XX", text: "Sample milestone — reached sample number of beneficiaries (placeholder)." },
    ],
  },

  programs: [
    { id: "prog-education", order: 1, status: "Published", title: "Education", titleKh: "អប់រំ", image: IMG.education,
      desc: "Supporting access to quality education for children and youth in rural communities.",
      descKh: "គាំទ្រការទទួលបានការអប់រំប្រកបដោយគុណភាពសម្រាប់កុមារ និងយុវជននៅតំបន់ជនបទ។",
      focus: ["School infrastructure", "Teacher training", "Scholarships", "Literacy programs"] },
    { id: "prog-community", order: 2, status: "Published", title: "Community Development", titleKh: "អភិវឌ្ឍន៍សហគមន៍", image: IMG.communitydev,
      desc: "Strengthening local leadership and infrastructure through participatory community planning.",
      descKh: "ពង្រឹងភាពជាអ្នកដឹកនាំមូលដ្ឋាន និងហេដ្ឋារចនាសម្ព័ន្ធតាមរយៈផែនការសហគមន៍។",
      focus: ["Local governance", "Water & sanitation", "Infrastructure", "Community savings groups"] },
    { id: "prog-environment", order: 3, status: "Published", title: "Environment", titleKh: "បរិស្ថាន", image: IMG.environment,
      desc: "Promoting sustainable natural resource management and climate resilience.",
      descKh: "លើកកម្ពស់ការគ្រប់គ្រងធនធានធម្មជាតិប្រកបដោយចីរភាព និងភាពធន់នឹងអាកាសធាតុ។",
      focus: ["Reforestation", "Climate resilience", "Waste management", "Conservation education"] },
    { id: "prog-livelihood", order: 4, status: "Published", title: "Livelihood", titleKh: "ជីវភាព", image: IMG.livelihood,
      desc: "Building household income through skills training and market access support.",
      descKh: "កសាងចំណូលគ្រួសារតាមរយៈការបណ្ដុះបណ្ដាលជំនាញ និងការគាំទ្រទីផ្សារ។",
      focus: ["Vocational training", "Agriculture", "Small business support", "Market linkage"] },
    { id: "prog-health", order: 5, status: "Published", title: "Health & Wellbeing", titleKh: "សុខភាព និងសុខុមាលភាព", image: IMG.health,
      desc: "Improving access to basic healthcare, nutrition and hygiene education.",
      descKh: "កែលម្អការទទួលបានសេវាសុខភាពមូលដ្ឋាន អាហារូបត្ថម្ភ និងអនាម័យ។",
      focus: ["Maternal & child health", "Nutrition", "Hygiene promotion", "Health referrals"] },
    { id: "prog-youth", order: 6, status: "Draft", title: "Youth Development", titleKh: "អភិវឌ្ឍន៍យុវជន", image: IMG.youth,
      desc: "Empowering young people with leadership skills and civic engagement opportunities.",
      descKh: "ផ្តល់អំណាចដល់យុវជនជាមួយជំនាញភាពជាអ្នកដឹកនាំ និងឱកាសចូលរួមក្នុងសង្គម។",
      focus: ["Leadership training", "Civic engagement", "Life skills", "Mentorship"] },
  ],

  projects: [
    { id: "proj-1", title: "Rural School Improvement Project", program: "prog-education", province: "Siem Reap", status: "Ongoing",
      start: "2025-01-15", end: "2026-12-31", image: IMG.education, partner: "[Partner — Placeholder]", donor: "[Donor — Placeholder]",
      desc: "Sample project improving classroom facilities and learning materials for primary schools.",
      results: ["6 classrooms renovated (sample)", "1,200 students supported (sample)", "40 teachers trained (sample)"] },
    { id: "proj-2", title: "Clean Water Access Initiative", program: "prog-community", province: "Kampong Cham", status: "Completed",
      start: "2023-03-01", end: "2024-09-30", image: IMG.communitydev, partner: "[Partner — Placeholder]", donor: "[Donor — Placeholder]",
      desc: "Sample project providing clean water access points to underserved villages.",
      results: ["15 water points installed (sample)", "3,000 residents served (sample)"] },
    { id: "proj-3", title: "Community Forestry & Reforestation", program: "prog-environment", province: "Kratie", status: "Ongoing",
      start: "2025-06-01", end: "2027-05-31", image: IMG.forest, partner: "[Partner — Placeholder]", donor: "[Donor — Placeholder]",
      desc: "Sample project supporting community-led reforestation and forest protection.",
      results: ["25 hectares replanted (sample)", "8 community forestry groups formed (sample)"] },
    { id: "proj-4", title: "Women's Livelihood & Savings Groups", program: "prog-livelihood", province: "Battambang", status: "Ongoing",
      start: "2024-11-01", end: "2026-10-31", image: IMG.livelihood, partner: "[Partner — Placeholder]", donor: "[Donor — Placeholder]",
      desc: "Sample project building income opportunities through savings groups and skills training.",
      results: ["30 savings groups formed (sample)", "500 women trained (sample)"] },
    { id: "proj-5", title: "Maternal & Child Health Outreach", program: "prog-health", province: "Ratanakiri", status: "Upcoming",
      start: "2026-10-01", end: "2028-09-30", image: IMG.health, partner: "[Partner — Placeholder]", donor: "[Donor — Placeholder]",
      desc: "Sample project expanding maternal and child health services in remote communities.",
      results: [] },
    { id: "proj-6", title: "Youth Leadership Camp", program: "prog-youth", province: "Kampot", status: "Completed",
      start: "2024-05-01", end: "2024-08-31", image: IMG.youth, partner: "[Partner — Placeholder]", donor: "[Donor — Placeholder]",
      desc: "Sample project engaging youth leaders through training camps and civic projects.",
      results: ["150 youth participants (sample)", "6 community projects led by youth (sample)"] },
    { id: "proj-7", title: "Village Road & Sanitation Upgrade", program: "prog-community", province: "Pursat", status: "Ongoing",
      start: "2025-02-01", end: "2026-11-30", image: IMG.village, partner: "[Partner — Placeholder]", donor: "[Donor — Placeholder]",
      desc: "Sample infrastructure project improving rural access roads and household sanitation.",
      results: ["12km of road improved (sample)", "200 latrines built (sample)"] },
    { id: "proj-8", title: "Sustainable Farming Techniques Training", program: "prog-livelihood", province: "Preah Vihear", status: "Upcoming",
      start: "2026-11-01", end: "2027-10-31", image: IMG.field, partner: "[Partner — Placeholder]", donor: "[Donor — Placeholder]",
      desc: "Sample upcoming project introducing climate-smart agriculture techniques to farmers.",
      results: [] },
  ],

  news: [
    { id: "news-1", title: "New School Facilities Completed in Siem Reap", titleKh: "សម្ភារៈសាលារៀនថ្មីត្រូវបានបញ្ចប់នៅសៀមរាប", category: "News",
      date: "2026-07-20", image: IMG.education, excerpt: "Sample news excerpt about newly completed classroom facilities supporting local students.",
      body: "Full sample article body placeholder. This section demonstrates how a news article renders on the public website, and can be fully edited from the Admin Dashboard.", tags: ["education", "siem reap"], status: "Published" },
    { id: "news-2", title: "Annual Community Partner Forum 2026", titleKh: "វេទិកាដៃគូសហគមន៍ប្រចាំឆ្នាំ ២០២៦", category: "Events",
      date: "2026-06-15", image: IMG.meeting, excerpt: "Sample event recap bringing together government, NGO and community partners.",
      body: "Full sample article body placeholder describing the annual forum event.", tags: ["events", "partners"], status: "Published" },
    { id: "news-3", title: "Youth Skills Training Program Expanded", titleKh: "កម្មវិធីបណ្ដុះបណ្ដាលជំនាញយុវជនត្រូវបានពង្រីក", category: "Announcements",
      date: "2026-05-10", image: IMG.youth, excerpt: "Sample announcement about the expansion of the youth skills training program to new provinces (placeholder).",
      body: "Full sample article body placeholder about the youth skills training program expansion.", tags: ["youth", "training"], status: "Published" },
    { id: "news-4", title: "Rural Clean Water Project Reaches New Communities", titleKh: "គម្រោងទឹកស្អាតជនបទឈានដល់សហគមន៍ថ្មី", category: "Community Stories",
      date: "2026-04-02", image: IMG.village, excerpt: "Sample community story about clean water access reaching additional rural villages (placeholder).",
      body: "Full sample article body placeholder for a community story about clean water access.", tags: ["water", "community"], status: "Published" },
    { id: "news-5", title: "Reforestation Campaign Reaches Major Milestone", titleKh: "យុទ្ធនាការដាំដើមឈើសម្រេចគោលដៅសំខាន់", category: "News",
      date: "2026-03-18", image: IMG.forest, excerpt: "Sample update on the community reforestation project's progress (placeholder).",
      body: "Full sample article body placeholder about the reforestation milestone.", tags: ["environment"], status: "Draft" },
    { id: "news-6", title: "Community Health Outreach Program", titleKh: "កម្មវិធីផ្សព្វផ្សាយសុខភាពសហគមន៍", category: "Events",
      date: "2026-03-22", image: IMG.health, excerpt: "Sample recap of a community health outreach and hygiene promotion activity (placeholder).",
      body: "Full sample article body placeholder for the community health outreach program.", tags: ["health", "community"], status: "Published" },
  ],

  publications: [
    { id: "pub-1", title: "Annual Report 2025", category: "Annual Reports", year: "2025", desc: "Sample annual report summarizing programs, projects and finances (placeholder).", status: "Published", lang: "EN" },
    { id: "pub-2", title: "Strategic Plan 2026–2028", category: "Strategic Plans", year: "2026", desc: "Sample strategic plan outlining priorities for the next three years (placeholder).", status: "Published", lang: "EN/KH" },
    { id: "pub-3", title: "Community Needs Assessment Report", category: "Research Reports", year: "2025", desc: "Sample research report on community needs across target provinces (placeholder).", status: "Published", lang: "EN" },
    { id: "pub-4", title: "Policy Brief: Rural Water Access", category: "Policy Briefs", year: "2024", desc: "Sample policy brief with recommendations on rural water access (placeholder).", status: "Published", lang: "EN" },
    { id: "pub-5", title: "Education Project Completion Report", category: "Project Reports", year: "2024", desc: "Sample project report summarizing outcomes of a completed education project (placeholder).", status: "Draft", lang: "EN" },
    { id: "pub-6", title: "Financial Transparency Summary", category: "Other Publications", year: "2025", desc: "Sample summary of financial transparency practices (placeholder).", status: "Published", lang: "EN/KH" },
  ],

  team: [
    { id: "team-1", name: "[Name — Placeholder]", position: "Board Chair", dept: "Board", photo: avatar("Board Chair"), bio: "Sample bio placeholder describing background and role on the Board.", order: 1, status: "Published" },
    { id: "team-2", name: "[Name — Placeholder]", position: "Board Member", dept: "Board", photo: avatar("Board Member"), bio: "Sample bio placeholder describing background and role on the Board.", order: 2, status: "Published" },
    { id: "team-3", name: "[Name — Placeholder]", position: "Board Member", dept: "Board", photo: avatar("Board Member Two"), bio: "Sample bio placeholder describing background and role on the Board.", order: 3, status: "Published" },
    { id: "team-4", name: "[Name — Placeholder]", position: "Executive Director", dept: "Management", photo: avatar("Executive Director"), bio: "Sample bio placeholder describing the Executive Director's experience.", order: 4, status: "Published" },
    { id: "team-5", name: "[Name — Placeholder]", position: "Program Manager — Education", dept: "Management", photo: avatar("PM Education"), bio: "Sample bio placeholder for the Education Program Manager.", order: 5, status: "Published" },
    { id: "team-6", name: "[Name — Placeholder]", position: "Program Manager — Livelihood", dept: "Management", photo: avatar("PM Livelihood"), bio: "Sample bio placeholder for the Livelihood Program Manager.", order: 6, status: "Published" },
    { id: "team-7", name: "[Name — Placeholder]", position: "Program Manager — Health", dept: "Management", photo: avatar("PM Health"), bio: "Sample bio placeholder for the Health Program Manager.", order: 7, status: "Published" },
    { id: "team-8", name: "[Name — Placeholder]", position: "Field Officer", dept: "Staff", photo: avatar("Field Officer 1"), bio: "Sample bio placeholder for a field-based staff member.", order: 8, status: "Published" },
    { id: "team-9", name: "[Name — Placeholder]", position: "Field Officer", dept: "Staff", photo: avatar("Field Officer 2"), bio: "Sample bio placeholder for a field-based staff member.", order: 9, status: "Published" },
    { id: "team-10", name: "[Name — Placeholder]", position: "Finance Officer", dept: "Staff", photo: avatar("Finance Officer"), bio: "Sample bio placeholder for the Finance Officer.", order: 10, status: "Draft" },
    { id: "team-11", name: "[Name — Placeholder]", position: "Communications Officer", dept: "Staff", photo: avatar("Comms Officer"), bio: "Sample bio placeholder for the Communications Officer.", order: 11, status: "Published" },
  ],

  gallery: [
    { id: "g1", category: "Community Activities", image: IMG.community1, caption: "Sample: Community meeting (placeholder)" },
    { id: "g2", category: "Training", image: IMG.training, caption: "Sample: Skills training session (placeholder)" },
    { id: "g3", category: "Events", image: IMG.meeting, caption: "Sample: Annual forum event (placeholder)" },
    { id: "g4", category: "Field Visits", image: IMG.field, caption: "Sample: Field monitoring visit (placeholder)" },
    { id: "g5", category: "Partner Activities", image: IMG.group, caption: "Sample: Partner collaboration (placeholder)" },
    { id: "g6", category: "Community Activities", image: IMG.village, caption: "Sample: Village outreach (placeholder)" },
    { id: "g7", category: "Training", image: IMG.education, caption: "Sample: Teacher training (placeholder)" },
    { id: "g8", category: "Field Visits", image: IMG.forest, caption: "Sample: Reforestation site visit (placeholder)" },
    { id: "g9", category: "Events", image: IMG.landscape, caption: "Sample: World Water Day (placeholder)" },
    { id: "g10", category: "Community Activities", image: IMG.communitydev, caption: "Sample: Community infrastructure work (placeholder)" },
    { id: "g11", category: "Partner Activities", image: IMG.livelihood, caption: "Sample: Livelihood training with partners (placeholder)" },
    { id: "g12", category: "Training", image: IMG.health, caption: "Sample: Health & hygiene training (placeholder)" },
  ],

  partners: [
    { id: "p1", name: "Government Partner (Sample)", category: "Government", logo: monogram("Government Partner", 0), website: "#", order: 1, status: "Published" },
    { id: "p2", name: "Provincial Administration (Sample)", category: "Government", logo: monogram("Provincial Administration", 1), website: "#", order: 2, status: "Published" },
    { id: "p3", name: "Development Partner (Sample)", category: "Development Partners", logo: monogram("Development Partner", 2), website: "#", order: 3, status: "Published" },
    { id: "p4", name: "Education Partner (Sample)", category: "Development Partners", logo: monogram("Education Partner", 3), website: "#", order: 4, status: "Published" },
    { id: "p5", name: "Community Partner (Sample)", category: "NGOs", logo: monogram("Community Partner", 4), website: "#", order: 5, status: "Published" },
    { id: "p6", name: "Partner NGO (Sample)", category: "NGOs", logo: monogram("Partner NGO", 5), website: "#", order: 6, status: "Published" },
    { id: "p7", name: "Private Sector Partner (Sample)", category: "Private Sector", logo: monogram("Private Sector Partner", 0), website: "#", order: 7, status: "Published" },
    { id: "p8", name: "Corporate Partner (Sample)", category: "Private Sector", logo: monogram("Corporate Partner", 2), website: "#", order: 8, status: "Published" },
  ],

  contact: {
    orgName: "[NGO Name — Placeholder]",
    address: "Sample Street, Phnom Penh, Cambodia (sample address)",
    phone: "+855 XX XXX XXX (sample number)",
    email: "info@example-ngo.org (sample email)",
    hours: "Monday – Friday, 8:00 AM – 5:00 PM",
    mapUrl: "https://www.google.com/maps?q=Phnom+Penh&output=embed",
    facebook: "https://facebook.com/placeholder",
    telegram: "https://t.me/placeholder",
    linkedin: "https://linkedin.com/company/placeholder",
    youtube: "https://youtube.com/@placeholder",
  },

  menu: [
    { id: "m1", label: "Home", order: 1, visible: true },
    { id: "m2", label: "About", order: 2, visible: true },
    { id: "m3", label: "Programs", order: 3, visible: true },
    { id: "m4", label: "Projects", order: 4, visible: true },
    { id: "m5", label: "News", order: 5, visible: true },
    { id: "m6", label: "Publications", order: 6, visible: true },
    { id: "m7", label: "Team", order: 7, visible: true },
    { id: "m8", label: "Gallery", order: 8, visible: true },
    { id: "m9", label: "Partners", order: 9, visible: true },
    { id: "m10", label: "Contact", order: 10, visible: true },
  ],

  media: [
    { id: "md1", name: "hero-community.jpg", type: "JPG", size: "412 KB", date: "2026-07-28", url: IMG.hero },
    { id: "md2", name: "education-classroom.jpg", type: "JPG", size: "356 KB", date: "2026-07-20", url: IMG.education },
    { id: "md3", name: "reforestation-site.jpg", type: "JPG", size: "298 KB", date: "2026-06-15", url: IMG.forest },
    { id: "md4", name: "annual-report-2025.pdf", type: "PDF", size: "2.1 MB", date: "2026-05-10", url: "#" },
    { id: "md5", name: "partner-forum.jpg", type: "JPG", size: "388 KB", date: "2026-06-15", url: IMG.meeting },
    { id: "md6", name: "livelihood-training.jpg", type: "JPG", size: "301 KB", date: "2026-04-02", url: IMG.livelihood },
  ],

};

/* ---------------- Storage layer (shared, localStorage-backed) ---------------- */
const CMS_KEY = "c037_ngo_cms_demo_v3";

const CMS = {
  load() {
    try {
      const raw = localStorage.getItem(CMS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore corrupt storage */ }
    const fresh = JSON.parse(JSON.stringify(SEED_DATA));
    localStorage.setItem(CMS_KEY, JSON.stringify(fresh));
    return fresh;
  },
  save(data) {
    localStorage.setItem(CMS_KEY, JSON.stringify(data));
  },
  reset() {
    const fresh = JSON.parse(JSON.stringify(SEED_DATA));
    localStorage.setItem(CMS_KEY, JSON.stringify(fresh));
    return fresh;
  },
};
