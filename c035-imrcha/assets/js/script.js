/* =========================================================
   IMR-CHA — Website Script
   BizWeb KH Starter Website Package
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     Translations
  --------------------------------------------------------- */
  var translations = {
    /* English is the source text written directly in index.html.
       It is captured automatically on load (see captureEnglish) so the
       page copy and the EN/KM switch can never drift apart. */
    en: {},

    /* Khmer: only strings with an approved Khmer translation are listed.
       Any element whose key is missing here stays in English when the
       Khmer language is selected. Add Khmer text here (and a matching
       data-i18n attribute in index.html) once official translations exist. */
    km: {
      nav_home: "ទំព័រដើម", nav_about: "អំពីយើង", nav_work: "កម្មវិធី", nav_serve: "អ្នកដែលយើងបម្រើ", nav_gallery: "វិចិត្រសាល", nav_involved: "ធ្វើជាដៃគូ", nav_contact: "ទំនាក់ទំនង",

      hero_btn_discover: "ស្វែងយល់អំពីកិច្ចការរបស់យើង",

      about_eyebrow: "អំពីយើង", about_title: "យើងជានរណា",

      focus_eyebrow: "កិច្ចការរបស់យើង",

      featured_title: "នាំសេវាសុខភាពចូលទៅជិតសហគមន៍", featured_btn: "ស្វែងយល់បន្ថែម",

      how_title: "របៀបដែលយើងធ្វើការ",

      gallery_eyebrow: "វិចិត្រសាល",

      gcap1: "សកម្មភាពពេទ្យចល័តតាមសហគមន៍", gcap2: "ការពិនិត្យសុខភាពកុមារ", gcap3: "ការពិគ្រោះសុខភាពជូនសហគមន៍", gcap4: "កម្មវិធីអប់រំសុខភាព", gcap5: "ការចែកជំនួយផ្នែកវេជ្ជសាស្ត្រ", gcap6: "ការផ្តល់ថ្នាំ និងសម្ភារៈសុខាភិបាល", gcap7: "ការចុះជួយសហគមន៍", gcap8: "អ្នកស្ម័គ្រចិត្តជួយគ្រួសារ",

      involved_eyebrow: "ចូលរួម", inv_btn: "ទាក់ទងយើង",

      contact_eyebrow: "ទំនាក់ទំនង", contact_title: "ទាក់ទងយើង", contact_sub: "យើងរីករាយនឹងទទួលបានដំណឹងពីអ្នក។ សូមទាក់ទងតាមព័ត៌មានលម្អិតដែលបានផ្តល់។",

      form_name: "ឈ្មោះពេញ", form_email: "អ៊ីមែល", form_phone: "លេខទូរស័ព្ទ", form_subject: "ប្រធានបទ", form_message: "សារ", form_submit: "ផ្ញើ", form_success: "សូមអរគុណ។ សាររបស់អ្នកត្រូវបានទទួលក្នុងការសាកល្បងនេះ។", form_demo_note: "នេះគ្រាន់តែជាការសាកល្បងផ្នែកខាងមុខប៉ុណ្ណោះ។ គ្មានសារត្រូវបានផ្ញើ ឬរក្សាទុកឡើយ។",

      info_address_title: "អាសយដ្ឋាន", info_phone_title: "ទូរស័ព្ទ", info_email_title: "អ៊ីមែល", info_web_title: "គេហទំព័រ",

      footer_links_title: "តំណភ្ជាប់រហ័ស", footer_contact_title: "ទំនាក់ទំនង"
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

  function captureEnglish() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!(key in translations.en)) translations.en[key] = el.textContent;
    });
  }

  function initLanguage() {
    captureEnglish();
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
    var contactLink = document.getElementById("modalContactLink");
    if (contactLink) contactLink.addEventListener("click", close);
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
