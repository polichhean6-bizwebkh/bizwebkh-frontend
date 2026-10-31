/* =========================================================
   IMR-CHA — Website Script
   BizWeb KH Starter Website Package
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     Translations
  --------------------------------------------------------- */
  var translations = { en: {}, km: {} };
  var STORAGE_KEY = "imrcha_lang";
  var languageRecords = [];
  var dynamicCopy = new Map();
  function translated(text) {
    return document.documentElement.lang === "km" ? (window.IMRCHA_KM[text] || text) : text;
  }
  function setCopy(element, english) {
    dynamicCopy.set(element, english);
    element.textContent = translated(english);
  }
  function applyLanguage(lang) {
    lang = lang === "km" ? "km" : "en";
    document.documentElement.lang = lang;
    languageRecords.forEach(function (record) {
      if (record.node.parentElement && dynamicCopy.has(record.node.parentElement)) return;
      var value = lang === "km" ? (window.IMRCHA_KM[record.original.trim()] || record.original.trim()) : record.original.trim();
      value = record.original.replace(record.original.trim(), value);
      if (record.attribute) record.node.setAttribute(record.attribute, value);
      else record.node.nodeValue = value;
    });
    dynamicCopy.forEach(function (english, element) { element.textContent = translated(english); });
    document.getElementById("langEn").classList.toggle("active", lang === "en");
    document.getElementById("langKm").classList.toggle("active", lang === "km");
    document.getElementById("langEn").setAttribute("aria-pressed", String(lang === "en"));
    document.getElementById("langKm").setAttribute("aria-pressed", String(lang === "km"));
    document.dispatchEvent(new Event("imrcha:language"));
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* language storage is optional */ }
  }
  function initLanguage() {
    // Cache original text nodes, not HTML: preserves links, emphasis, facts and exact English.
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.parentElement.closest("script,style,noscript") || !node.nodeValue.trim()) continue;
      languageRecords.push({ node: node, original: node.nodeValue });
    }
    document.querySelectorAll("[alt],[aria-label],[title]").forEach(function (element) {
      ["alt", "aria-label", "title"].forEach(function (attribute) {
        if (element.hasAttribute(attribute)) languageRecords.push({ node: element, attribute: attribute, original: element.getAttribute(attribute) });
      });
    });
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var key = element.getAttribute("data-i18n");
      translations.en[key] = element.textContent;
      translations.km[key] = window.IMRCHA_KM[element.textContent.trim()] || element.textContent;
    });
    var saved = "en";
    try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) {}
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
     Inquiry form (FormSubmit HTML POST with hosted spam verification)
  --------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    var button = form.querySelector('button[type="submit"]');
    var status = document.getElementById("inquiryStatus");
    var pending = false;
    var label = "Send Inquiry";
    var timer;

    function unlock() {
      pending = false;
      button.disabled = false;
      setCopy(button, "Send Inquiry");
      form.removeAttribute("aria-busy");
    }

    function validateFields() {
      form.querySelectorAll("input:not([type=hidden]),textarea").forEach(function (field) {
        field.setCustomValidity("");
        if (field.validity.valueMissing) field.setCustomValidity(translated("Please complete this required field."));
        else if (field.validity.typeMismatch) field.setCustomValidity(translated("Please enter a valid email address."));
      });
    }
    form.addEventListener("input", validateFields);
    form.addEventListener("invalid", validateFields, true);
    document.addEventListener("imrcha:language", validateFields);
    validateFields();

    form.addEventListener("submit", function (e) {
      if (pending) { e.preventDefault(); return; }
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      document.getElementById("inquiryReplyTo").value = form.elements.email.value.trim();
      document.getElementById("inquirySubmittedAt").value = new Date().toISOString();
      label = "Send Inquiry";
      pending = true;
      button.disabled = true;
      setCopy(button, "Opening…");
      form.setAttribute("aria-busy", "true");
      setCopy(status, "Complete verification and check the result in the FormSubmit tab. If it reports an error or does not open, your entries remain here. Check that result before trying again.");
      status.removeAttribute("data-state");
      status.hidden = false;
      // Allow the browser's native POST. FormSubmit handles CAPTCHA and
      // displays its actual result; cross-origin responses cannot be read here.
      // Never reset the form or claim delivery from a navigation event.
      clearTimeout(timer);
      timer = setTimeout(unlock, 10000);
    });
    window.addEventListener("pageshow", unlock);
  }

  function initCounterPrivacy() {
    var mount = document.getElementById("counterMount");
    var choices = document.getElementById("counterChoices");
    var withdraw = document.getElementById("counterWithdraw");
    var status = document.getElementById("counterStatus");
    var base = "https://s05.flagcounter.com/countxl/NzVZ/bg_0A4530/txt_FFFFFF/border_0A4530/columns_";
    var suffix = "/maxflags_10/viewers_3/labels_1/pageviews_0/flags_0/percent_0/";
    var activeImage = null;
    function disable() {
      if (activeImage) { activeImage.onload = null; activeImage.onerror = null; dynamicCopy.delete(activeImage); }
      mount.replaceChildren();
      activeImage = null;
      choices.hidden = false;
      withdraw.hidden = true;
      setCopy(status, "Counter disabled. Your choice does not affect access to this website or the inquiry form.");
    }
    document.getElementById("counterAllow").addEventListener("click", function () {
      if (activeImage) return;
      var link = document.createElement("a");
      link.href = "https://info.flagcounter.com/NzVZ";
      var picture = document.createElement("picture");
      var source = document.createElement("source");
      source.media = "(max-width: 640px)";
      source.srcset = base + "2" + suffix;
      var img = document.createElement("img");
      img.alt = translated("Flag Counter: recorded visitors by country");
      img.onerror = function () { setCopy(status, "The counter could not load. You can withdraw permission or try again later."); };
      picture.append(source, img);
      img.src = base + "3" + suffix;
      link.append(picture);
      activeImage = img;
      mount.append(link);
      choices.hidden = true;
      withdraw.hidden = false;
      setCopy(status, "Counter enabled for this page visit. You can withdraw permission below.");
      withdraw.focus();
    });
    document.getElementById("counterDecline").addEventListener("click", disable);
    withdraw.addEventListener("click", function () { disable(); document.getElementById("counterAllow").focus(); });
    document.addEventListener("imrcha:language", function () {
      if (activeImage) activeImage.alt = translated("Flag Counter: recorded visitors by country");
    });
    document.getElementById("privacyLink").addEventListener("click", function () {
      var notice = document.getElementById("visitorPrivacy");
      notice.open = true;
      notice.querySelector("summary").focus();
    });
    // Returning via browser history also defaults to no tracking; no persistent consent is inferred.
    window.addEventListener("pagehide", disable);
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
    initCounterPrivacy();
    initScrollAnimations();
  });
})();
