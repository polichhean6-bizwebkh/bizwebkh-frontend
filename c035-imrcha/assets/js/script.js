/* =========================================================
   IMRCHA — Website Demo Script
   BizWeb KH Starter Website Package
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     Translations
  --------------------------------------------------------- */
  var translations = {
    en: {
      nav_home: "Home", nav_about: "About Us", nav_work: "Our Work", nav_impact: "Impact",
      nav_gallery: "Gallery", nav_involved: "Get Involved", nav_contact: "Contact",

      hero_eyebrow: "Humanitarian & Medical Relief — Cambodia",
      hero_title: "Compassionate Medical Relief for Communities in Cambodia",
      hero_sub: "Supporting vulnerable families and communities through healthcare assistance, humanitarian relief, and community-based programs.",
      hero_btn_discover: "Discover Our Work",
      hero_btn_involved: "Get Involved",

      about_eyebrow: "About Us",
      about_title: "About IMRCHA",
      about_p1: "Islamic Medical Relief for Cambodia Humanity Association (IMRCHA) is presented here as a humanitarian organization dedicated to supporting medical relief, community health, and vulnerable families across Cambodia.",
      about_p2: "This website is a demonstration of how IMRCHA's mission, programs, and community work can be presented online. Specific details such as registration status, founding history, and official partnerships will be added once confirmed by the organization.",
      value1_title: "Compassion", value1_desc: "Treating every person with dignity, empathy, and genuine care.",
      value2_title: "Integrity", value2_desc: "Acting with honesty, transparency, and accountability in all we do.",
      value3_title: "Community Service", value3_desc: "Working alongside communities to identify needs and provide meaningful support.",

      focus_eyebrow: "Our Work",
      focus_title: "Our Focus Areas",
      focus_sub: "We focus our efforts where they are needed most, guided by community input and humanitarian principles.",
      focus1_title: "Medical Assistance", focus1_desc: "Connecting communities with essential medical support and basic healthcare guidance.",
      focus2_title: "Community Health", focus2_desc: "Promoting health awareness and preventive care through community-based education.",
      focus3_title: "Emergency Relief", focus3_desc: "Responding to urgent humanitarian needs with coordinated, community-focused assistance.",
      focus4_title: "Support for Vulnerable Families", focus4_desc: "Offering compassionate support to families facing hardship, illness, or displacement.",

      featured_eyebrow: "Featured Program",
      featured_title: "Bringing Healthcare Closer to Communities",
      featured_desc: "Our community-focused approach connects people with essential medical support, health education, and humanitarian assistance.",
      featured_btn: "Learn More",

      impact_eyebrow: "Impact",
      impact_title: "Our Impact",
      impact_sub: "Verified impact figures are being compiled. The categories below reflect the areas where IMRCHA focuses its efforts.",
      impact1_title: "Community Outreach", impact2_title: "Medical Support",
      impact3_title: "Volunteer Engagement", impact4_title: "Humanitarian Assistance",
      impact_placeholder: "Impact data to be updated",
      impact_placeholder2: "Program information coming soon",

      how_eyebrow: "Our Process",
      how_title: "How We Work",
      how1_title: "Identify Community Needs", how1_desc: "We listen to communities to understand their most pressing needs.",
      how2_title: "Coordinate Support", how2_desc: "We organize volunteers, resources, and partners to prepare an effective response.",
      how3_title: "Deliver Assistance", how3_desc: "We deliver medical, humanitarian, and community-based assistance directly to those in need.",
      how4_title: "Follow Up and Report", how4_desc: "We follow up with communities and reflect on outcomes to improve future support.",

      gallery_eyebrow: "Gallery",
      gallery_title: "Our Activities",
      gallery_sub: "A visual look at the kind of community and medical relief activities IMRCHA can showcase.",
      gcap1: "Community Medical Outreach", gcap2: "Child Health Checkup", gcap3: "Community Health Consultation", gcap4: "Health Education Session",
      gcap5: "Medical Aid Distribution", gcap6: "Medicine Support", gcap7: "Village Outreach", gcap8: "Volunteers Supporting Families",

      involved_eyebrow: "Get Involved",
      involved_title: "Get Involved",
      involved_sub: "There are several ways to support IMRCHA's mission and the communities we serve.",
      inv1_title: "Volunteer With Us", inv1_desc: "Offer your time and skills to support community and medical relief activities.",
      inv2_title: "Partner With Us", inv2_desc: "Collaborate with IMRCHA as an organization, clinic, or community partner.",
      inv3_title: "Support Our Activities", inv3_desc: "Reach out to learn how you can support IMRCHA's humanitarian activities.",
      inv_btn: "Contact Us",

      trans_eyebrow: "Transparency & Accountability",
      trans_title: "Our Commitment to Transparency",
      trans1_title: "Responsible Use of Resources", trans1_desc: "We are committed to using resources carefully and for their intended humanitarian purpose.",
      trans2_title: "Community Accountability", trans2_desc: "We aim to remain accountable to the communities and people we work with.",
      trans3_title: "Clear Communication", trans3_desc: "We strive to communicate our work honestly and clearly with all stakeholders.",
      trans4_title: "Ethical Humanitarian Service", trans4_desc: "We are guided by ethical principles in all humanitarian and medical relief activities.",
      trans_note: "Formal reports and certifications will be published here once available.",

      contact_eyebrow: "Contact",
      contact_title: "Contact Us",
      contact_sub: "We would love to hear from you. Reach out using the form below or the details provided.",
      form_name: "Full Name", form_email: "Email", form_phone: "Phone Number",
      form_subject: "Subject", form_message: "Message", form_submit: "Submit",
      form_success: "Thank you. Your message has been received in this demo.",
      form_demo_note: "This is a frontend demo only. No message is sent or stored.",
      info_address_title: "Address", info_address_val: "[Demo Placeholder] Phnom Penh area, Cambodia — exact address to be confirmed by client.",
      info_phone_title: "Phone", info_phone_val: "[Demo Placeholder] To be provided by client",
      info_email_title: "Email", info_email_val: "[Demo Placeholder] To be provided by client",
      info_hours_title: "Office Hours", info_hours_val: "[Demo Placeholder] Sunday – Thursday, 8:00 AM – 5:00 PM",
      info_social_title: "Social Media",
      map_note: "General map area shown for demonstration only — exact location to be confirmed.",

      footer_mission: "Supporting communities in Cambodia through medical assistance, humanitarian relief, and compassionate care.",
      footer_links_title: "Quick Links",
      footer_contact_title: "Contact",

      modal_title: "Bringing Healthcare Closer to Communities",
      modal_p1: "This featured program illustrates how IMRCHA can bring medical support and health education directly into communities that face barriers to accessing care.",
      modal_p2: "Detailed program information, schedules, and locations will be added once confirmed by the organization."
    },

    km: {
      nav_home: "ទំព័រដើម", nav_about: "អំពីយើង", nav_work: "កិច្ចការរបស់យើង", nav_impact: "ផលប៉ះពាល់",
      nav_gallery: "វិចិត្រសាល", nav_involved: "ចូលរួម", nav_contact: "ទំនាក់ទំនង",

      hero_eyebrow: "ជំនួយមនុស្សធម៌ និងវេជ្ជសាស្ត្រ — កម្ពុជា",
      hero_title: "ជំនួយវេជ្ជសាស្ត្រដោយក្តីមេត្តាករុណា សម្រាប់សហគមន៍នៅកម្ពុជា",
      hero_sub: "គាំទ្រគ្រួសារ និងសហគមន៍ដែលងាយរងគ្រោះ តាមរយៈជំនួយសុខភាព ជំនួយមនុស្សធម៌ និងកម្មវិធីផ្អែកលើសហគមន៍។",
      hero_btn_discover: "ស្វែងយល់អំពីកិច្ចការរបស់យើង",
      hero_btn_involved: "ចូលរួមជាមួយយើង",

      about_eyebrow: "អំពីយើង",
      about_title: "អំពី IMRCHA",
      about_p1: "សមាគមជំនួយវេជ្ជសាស្ត្រអ៊ីស្លាមសម្រាប់មនុស្សធម៌កម្ពុជា (IMRCHA) ត្រូវបានបង្ហាញនៅទីនេះថាជាអង្គការមនុស្សធម៌ ដែលឧទ្ទិសដល់ការគាំទ្រជំនួយវេជ្ជសាស្ត្រ សុខភាពសហគមន៍ និងគ្រួសារងាយរងគ្រោះនៅទូទាំងកម្ពុជា។",
      about_p2: "គេហទំព័រនេះជាការបង្ហាញសាកល្បង អំពីរបៀបដែលបេសកកម្ម កម្មវិធី និងកិច្ចការសហគមន៍របស់ IMRCHA អាចត្រូវបានបង្ហាញនៅលើអ៊ីនធឺណិត។ ព័ត៌មានលម្អិត ដូចជាស្ថានភាពចុះបញ្ជី ប្រវត្តិការបង្កើតឡើង និងភាពជាដៃគូផ្លូវការ នឹងត្រូវបានបន្ថែមនៅពេលអង្គការបញ្ជាក់។",
      value1_title: "សេចក្តីមេត្តាករុណា", value1_desc: "ប្រព្រឹត្តចំពោះមនុស្សគ្រប់រូបដោយសេចក្តីថ្លៃថ្នូរ ការយល់ចិត្ត និងការយកចិត្តទុកដាក់ពិតប្រាកដ។",
      value2_title: "សុចរិតភាព", value2_desc: "ធ្វើសកម្មភាពដោយភាពស្មោះត្រង់ តម្លាភាព និងការទទួលខុសត្រូវក្នុងកិច្ចការទាំងអស់។",
      value3_title: "សេវាកម្មសហគមន៍", value3_desc: "ធ្វើការជាមួយសហគមន៍ ដើម្បីកំណត់តម្រូវការ និងផ្តល់ការគាំទ្រប្រកបដោយអត្ថន័យ។",

      focus_eyebrow: "កិច្ចការរបស់យើង",
      focus_title: "វិស័យផ្តោតសំខាន់របស់យើង",
      focus_sub: "យើងផ្តោតកិច្ចខិតខំប្រឹងប្រែងទៅលើកន្លែងដែលត្រូវការបំផុត ដោយផ្អែកលើមតិយោបល់សហគមន៍ និងគោលការណ៍មនុស្សធម៌។",
      focus1_title: "ជំនួយវេជ្ជសាស្ត្រ", focus1_desc: "ភ្ជាប់សហគមន៍ជាមួយជំនួយវេជ្ជសាស្ត្រចាំបាច់ និងការណែនាំសុខភាពមូលដ្ឋាន។",
      focus2_title: "សុខភាពសហគមន៍", focus2_desc: "លើកកម្ពស់ការយល់ដឹងផ្នែកសុខភាព និងការថែទាំបង្ការតាមរយៈការអប់រំសហគមន៍។",
      focus3_title: "ជំនួយបន្ទាន់", focus3_desc: "ឆ្លើយតបទៅនឹងតម្រូវការមនុស្សធម៌បន្ទាន់ ដោយការសម្របសម្រួលជំនួយផ្តោតលើសហគមន៍។",
      focus4_title: "ការគាំទ្រគ្រួសារងាយរងគ្រោះ", focus4_desc: "ផ្តល់ការគាំទ្រដោយក្តីមេត្តាករុណា ដល់គ្រួសារដែលជួបការលំបាក ជំងឺ ឬការភៀសខ្លួន។",

      featured_eyebrow: "កម្មវិធីលេចធ្លោ",
      featured_title: "នាំសេវាសុខភាពចូលទៅជិតសហគមន៍",
      featured_desc: "វិធីសាស្ត្រផ្តោតលើសហគមន៍របស់យើង ភ្ជាប់មនុស្សជាមួយជំនួយវេជ្ជសាស្ត្រចាំបាច់ ការអប់រំសុខភាព និងជំនួយមនុស្សធម៌។",
      featured_btn: "ស្វែងយល់បន្ថែម",

      impact_eyebrow: "ផលប៉ះពាល់",
      impact_title: "ផលប៉ះពាល់របស់យើង",
      impact_sub: "តួលេខផលប៉ះពាល់ដែលបានផ្ទៀងផ្ទាត់កំពុងត្រូវបានប្រមូល។ ប្រភេទខាងក្រោមឆ្លុះបញ្ចាំងពីផ្នែកដែល IMRCHA ផ្តោតកិច្ចខិតខំប្រឹងប្រែង។",
      impact1_title: "ការផ្សព្វផ្សាយសហគមន៍", impact2_title: "ជំនួយវេជ្ជសាស្ត្រ",
      impact3_title: "ការចូលរួមរបស់អ្នកស្ម័គ្រចិត្ត", impact4_title: "ជំនួយមនុស្សធម៌",
      impact_placeholder: "ទិន្នន័យផលប៉ះពាល់ នឹងត្រូវធ្វើបច្ចុប្បន្នភាព",
      impact_placeholder2: "ព័ត៌មានកម្មវិធីនឹងមកដល់ឆាប់ៗនេះ",

      how_eyebrow: "ដំណើរការរបស់យើង",
      how_title: "របៀបដែលយើងធ្វើការ",
      how1_title: "កំណត់តម្រូវការសហគមន៍", how1_desc: "យើងស្តាប់សហគមន៍ដើម្បីយល់ពីតម្រូវការបន្ទាន់បំផុតរបស់ពួកគេ។",
      how2_title: "សម្របសម្រួលការគាំទ្រ", how2_desc: "យើងរៀបចំអ្នកស្ម័គ្រចិត្ត ធនធាន និងដៃគូ ដើម្បីរៀបចំការឆ្លើយតបប្រកបដោយប្រសិទ្ធភាព។",
      how3_title: "ផ្តល់ជំនួយ", how3_desc: "យើងផ្តល់ជំនួយវេជ្ជសាស្ត្រ មនុស្សធម៌ និងផ្អែកលើសហគមន៍ ដោយផ្ទាល់ដល់អ្នកដែលត្រូវការ។",
      how4_title: "តាមដាន និងរាយការណ៍", how4_desc: "យើងតាមដានជាមួយសហគមន៍ និងពិចារណាលើលទ្ធផល ដើម្បីកែលម្អការគាំទ្រនាពេលអនាគត។",

      gallery_eyebrow: "វិចិត្រសាល",
      gallery_title: "សកម្មភាពរបស់យើង",
      gallery_sub: "ទិដ្ឋភាពនៃប្រភេទសកម្មភាពសហគមន៍ និងជំនួយវេជ្ជសាស្ត្រ ដែល IMRCHA អាចបង្ហាញ។",
      gcap1: "សកម្មភាពពេទ្យចល័តតាមសហគមន៍", gcap2: "ការពិនិត្យសុខភាពកុមារ", gcap3: "ការពិគ្រោះសុខភាពជូនសហគមន៍", gcap4: "កម្មវិធីអប់រំសុខភាព",
      gcap5: "ការចែកជំនួយផ្នែកវេជ្ជសាស្ត្រ", gcap6: "ការផ្តល់ថ្នាំ និងសម្ភារៈសុខាភិបាល", gcap7: "ការចុះជួយសហគមន៍", gcap8: "អ្នកស្ម័គ្រចិត្តជួយគ្រួសារ",

      involved_eyebrow: "ចូលរួម",
      involved_title: "ចូលរួមជាមួយយើង",
      involved_sub: "មានវិធីជាច្រើនដើម្បីគាំទ្របេសកកម្ម និងសហគមន៍ដែល IMRCHA បម្រើ។",
      inv1_title: "ធ្វើជាអ្នកស្ម័គ្រចិត្ត", inv1_desc: "ផ្តល់ពេលវេលា និងជំនាញរបស់អ្នក ដើម្បីគាំទ្រសកម្មភាពសហគមន៍ និងជំនួយវេជ្ជសាស្ត្រ។",
      inv2_title: "ធ្វើជាដៃគូ", inv2_desc: "សហការជាមួយ IMRCHA ក្នុងនាមជាអង្គការ គ្លីនិក ឬដៃគូសហគមន៍។",
      inv3_title: "គាំទ្រសកម្មភាពរបស់យើង", inv3_desc: "ទាក់ទងមកយើង ដើម្បីស្វែងយល់ពីរបៀបគាំទ្រសកម្មភាពមនុស្សធម៌របស់ IMRCHA។",
      inv_btn: "ទាក់ទងយើង",

      trans_eyebrow: "តម្លាភាព និងគណនេយ្យភាព",
      trans_title: "ការប្តេជ្ញាចិត្តរបស់យើងចំពោះតម្លាភាព",
      trans1_title: "ការប្រើប្រាស់ធនធានប្រកបដោយទំនួលខុសត្រូវ", trans1_desc: "យើងប្តេជ្ញាប្រើប្រាស់ធនធានដោយប្រុងប្រយ័ត្ន និងសម្រាប់គោលបំណងមនុស្សធម៌ដែលមានបំណង។",
      trans2_title: "គណនេយ្យភាពចំពោះសហគមន៍", trans2_desc: "យើងមានគោលបំណងទទួលខុសត្រូវចំពោះសហគមន៍ និងមនុស្សដែលយើងធ្វើការជាមួយ។",
      trans3_title: "ការទំនាក់ទំនងច្បាស់លាស់", trans3_desc: "យើងខិតខំទំនាក់ទំនងអំពីកិច្ចការរបស់យើងដោយស្មោះត្រង់ និងច្បាស់លាស់ ជាមួយភាគីពាក់ព័ន្ធទាំងអស់។",
      trans4_title: "សេវាមនុស្សធម៌ប្រកបដោយក្រមសីលធម៌", trans4_desc: "យើងត្រូវបានដឹកនាំដោយគោលការណ៍សីលធម៌ក្នុងសកម្មភាពមនុស្សធម៌ និងជំនួយវេជ្ជសាស្ត្រទាំងអស់។",
      trans_note: "របាយការណ៍ផ្លូវការ និងវិញ្ញាបនបត្រ នឹងត្រូវបានផ្សព្វផ្សាយនៅទីនេះ នៅពេលមាន។",

      contact_eyebrow: "ទំនាក់ទំនង",
      contact_title: "ទាក់ទងយើង",
      contact_sub: "យើងរីករាយនឹងទទួលបានដំណឹងពីអ្នក។ សូមទាក់ទងតាមទម្រង់ខាងក្រោម ឬព័ត៌មានលម្អិតដែលបានផ្តល់។",
      form_name: "ឈ្មោះពេញ", form_email: "អ៊ីមែល", form_phone: "លេខទូរស័ព្ទ",
      form_subject: "ប្រធានបទ", form_message: "សារ", form_submit: "ផ្ញើ",
      form_success: "សូមអរគុណ។ សាររបស់អ្នកត្រូវបានទទួលក្នុងការសាកល្បងនេះ។",
      form_demo_note: "នេះគ្រាន់តែជាការសាកល្បងផ្នែកខាងមុខប៉ុណ្ណោះ។ គ្មានសារត្រូវបានផ្ញើ ឬរក្សាទុកឡើយ។",
      info_address_title: "អាសយដ្ឋាន", info_address_val: "[កន្លែងដាក់សាកល្បង] តំបន់ភ្នំពេញ កម្ពុជា — អាសយដ្ឋានពិតប្រាកដ រង់ចាំការបញ្ជាក់ពីអតិថិជន។",
      info_phone_title: "ទូរស័ព្ទ", info_phone_val: "[កន្លែងដាក់សាកល្បង] នឹងផ្តល់ដោយអតិថិជន",
      info_email_title: "អ៊ីមែល", info_email_val: "[កន្លែងដាក់សាកល្បង] នឹងផ្តល់ដោយអតិថិជន",
      info_hours_title: "ម៉ោងធ្វើការ", info_hours_val: "[កន្លែងដាក់សាកល្បង] អាទិត្យ – ព្រហស្បតិ៍ ម៉ោង ៨:០០ ព្រឹក – ៥:០០ ល្ងាច",
      info_social_title: "បណ្តាញសង្គម",
      map_note: "តំបន់ផែនទីទូទៅត្រូវបានបង្ហាញសម្រាប់គោលបំណងបង្ហាញតែប៉ុណ្ណោះ — ទីតាំងពិតប្រាកដ រង់ចាំការបញ្ជាក់។",

      footer_mission: "គាំទ្រសហគមន៍នៅកម្ពុជា តាមរយៈជំនួយវេជ្ជសាស្ត្រ ជំនួយមនុស្សធម៌ និងការថែទាំដោយក្តីមេត្តាករុណា។",
      footer_links_title: "តំណភ្ជាប់រហ័ស",
      footer_contact_title: "ទំនាក់ទំនង",

      modal_title: "នាំសេវាសុខភាពចូលទៅជិតសហគមន៍",
      modal_p1: "កម្មវិធីលេចធ្លោនេះបង្ហាញពីរបៀបដែល IMRCHA អាចនាំជំនួយវេជ្ជសាស្ត្រ និងការអប់រំសុខភាព ដោយផ្ទាល់ទៅកាន់សហគមន៍ដែលជួបឧបសគ្គក្នុងការទទួលបានការថែទាំ។",
      modal_p2: "ព័ត៌មានលម្អិតកម្មវិធី កាលវិភាគ និងទីតាំង នឹងត្រូវបានបន្ថែម នៅពេលអង្គការបញ្ជាក់។"
    }
  };

  var STORAGE_KEY = "imrcha_lang";

  /* ---------------------------------------------------------
     Language switching
  --------------------------------------------------------- */
  function applyLanguage(lang) {
    if (lang !== "en" && lang !== "km") lang = "en";
    document.documentElement.setAttribute("lang", lang === "km" ? "km" : "en");

    var dict = translations[lang];
    var nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.getElementById("langEn").classList.toggle("active", lang === "en");
    document.getElementById("langKm").classList.toggle("active", lang === "km");

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function initLanguage() {
    var saved = "en";
    try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) { /* ignore */ }
    applyLanguage(saved);

    document.getElementById("langEn").addEventListener("click", function () { applyLanguage("en"); });
    document.getElementById("langKm").addEventListener("click", function () { applyLanguage("km"); });
  }

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.getElementById("menuToggle");
    var nav = document.getElementById("mainNav");

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     Smooth scroll for "Support Our Mission" style anchors
     (all in-page anchor links already work via CSS scroll-behavior,
     this ensures sticky header offset is respected)
  --------------------------------------------------------- */
  function initAnchorOffset() {
    var header = document.getElementById("siteHeader");
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var headerH = header ? header.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  /* ---------------------------------------------------------
     Learn More modal
  --------------------------------------------------------- */
  function initModal() {
    var modal = document.getElementById("learnMoreModal");
    var openBtn = document.getElementById("learnMoreBtn");
    var closeBtn = document.getElementById("modalClose");

    function open() {
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }
    function close() {
      modal.hidden = true;
      document.body.style.overflow = "";
    }

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) close();
    });
  }

  /* ---------------------------------------------------------
     Gallery lightbox
  --------------------------------------------------------- */
  function initLightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    var overlay = document.getElementById("lightbox");
    var imgEl = document.getElementById("lightboxImg");
    var capEl = document.getElementById("lightboxCap");
    var closeBtn = document.getElementById("lightboxClose");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");
    var currentIndex = 0;

    function currentLang() {
      return document.documentElement.getAttribute("lang") === "km" ? "km" : "en";
    }

    function show(index) {
      currentIndex = (index + items.length) % items.length;
      var item = items[currentIndex];
      var img = item.querySelector("img");
      var key = item.getAttribute("data-caption-key");
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      capEl.textContent = translations[currentLang()][key] || img.alt;
    }

    function open(index) {
      show(index);
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
    }
    function close() {
      overlay.hidden = true;
      document.body.style.overflow = "";
    }

    items.forEach(function (item, index) {
      item.addEventListener("click", function () { open(index); });
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { show(currentIndex - 1); });
    nextBtn.addEventListener("click", function () { show(currentIndex + 1); });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function (e) {
      if (overlay.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(currentIndex - 1);
      if (e.key === "ArrowRight") show(currentIndex + 1);
    });
  }

  /* ---------------------------------------------------------
     Contact form (frontend demo only)
  --------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    var successMsg = document.getElementById("formSuccess");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      successMsg.hidden = false;
      form.reset();
      successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------------------------------------------------------
     Scroll reveal animations
  --------------------------------------------------------- */
  function initScrollAnimations() {
    var els = document.querySelectorAll("[data-animate]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initLanguage();
    initMobileMenu();
    initAnchorOffset();
    initModal();
    initLightbox();
    initContactForm();
    initScrollAnimations();
  });
})();
