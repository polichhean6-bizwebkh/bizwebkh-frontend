document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Language switch ---------------- */
  var LANG_KEY = 'sampheap_lang';
  var langButtons = document.querySelectorAll('.lang-btn');
  var i18nEls = document.querySelectorAll('.i18n');

  function applyLang(lang) {
    document.body.classList.toggle('lang-km', lang === 'km');
    document.documentElement.setAttribute('lang', lang);
    i18nEls.forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.textContent = val;
    });
    langButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  var savedLang = 'en';
  try { savedLang = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
  applyLang(savedLang);

  /* ---------------- Sticky header shadow ---------------- */
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 12);
  });

  /* ---------------- Mobile menu ---------------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------------- Inquiry form prefill helpers ---------------- */
  var inquiryTypeSelect = document.getElementById('inquiryType');
  var selectedPackageInput = document.getElementById('selectedPackage');

  function goToInquiry(type, pkg) {
    if (type && inquiryTypeSelect) inquiryTypeSelect.value = type;
    if (selectedPackageInput) selectedPackageInput.value = pkg || '';
    var target = document.getElementById('inquiry');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('.pkg-inquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToInquiry(btn.getAttribute('data-type'), btn.getAttribute('data-package'));
    });
  });

  document.querySelectorAll('.svc-inquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToInquiry(btn.getAttribute('data-type'), '');
    });
  });

  document.querySelectorAll('.dest-inquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToInquiry('General Inquiry', '');
    });
  });

  /* ---------------- Inquiry form validation + demo submit ---------------- */
  var form = document.getElementById('inquiryForm');
  var successBox = document.getElementById('formSuccess');
  var errorBox = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var requiredFields = form.querySelectorAll('[required]');
      var valid = true;

      requiredFields.forEach(function (field) {
        if (!field.value || !field.value.trim()) {
          valid = false;
          field.classList.add('invalid');
        } else {
          field.classList.remove('invalid');
        }
      });

      var emailField = document.getElementById('email');
      if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        valid = false;
        emailField.classList.add('invalid');
      }

      if (!valid) {
        errorBox.hidden = false;
        successBox.hidden = true;
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      errorBox.hidden = true;
      successBox.hidden = false;
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.reset();
      requiredFields.forEach(function (field) { field.classList.remove('invalid'); });
    });

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () { field.classList.remove('invalid'); });
    });
  }

  /* ---------------- Gallery lightbox ---------------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var currentIndex = 0;

  function currentLang() {
    return document.body.classList.contains('lang-km') ? 'km' : 'en';
  }

  function openLightbox(index) {
    currentIndex = index;
    var item = galleryItems[index];
    var img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    var lang = currentLang();
    lightboxCaption.textContent = item.getAttribute('data-caption-' + lang) || item.getAttribute('data-caption-en');
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', function () {
    openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
  });
  if (lightboxNext) lightboxNext.addEventListener('click', function () {
    openLightbox((currentIndex + 1) % galleryItems.length);
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
    if (e.key === 'ArrowRight') openLightbox((currentIndex + 1) % galleryItems.length);
  });

});
