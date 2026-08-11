document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Booking date picker rules ---------------- */
  var checkInInput = document.getElementById('checkInDate');
  var checkOutInput = document.getElementById('checkOutDate');

  function toDateInputValue(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  if (checkInInput && checkOutInput) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var todayStr = toDateInputValue(today);

    checkInInput.setAttribute('min', todayStr);
    checkOutInput.setAttribute('min', toDateInputValue(addDays(today, 1)));

    checkInInput.addEventListener('change', function () {
      if (!checkInInput.value) {
        checkOutInput.setAttribute('min', toDateInputValue(addDays(today, 1)));
        return;
      }
      var parts = checkInInput.value.split('-').map(Number);
      var checkInDate = new Date(parts[0], parts[1] - 1, parts[2]);
      var minCheckOut = addDays(checkInDate, 1);
      var minCheckOutStr = toDateInputValue(minCheckOut);

      checkOutInput.setAttribute('min', minCheckOutStr);

      if (checkOutInput.value && checkOutInput.value < minCheckOutStr) {
        checkOutInput.value = '';
      }
    });
  }

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

  /* ---------------- Booking form prefill helpers ---------------- */
  var packageInterestInput = document.getElementById('packageInterest');
  var messageInput = document.getElementById('message');

  function goToBooking(interest) {
    if (interest && packageInterestInput) {
      var matched = false;
      for (var i = 0; i < packageInterestInput.options.length; i++) {
        if (packageInterestInput.options[i].value === interest) { matched = true; break; }
      }
      if (matched) {
        packageInterestInput.value = interest;
      } else if (messageInput && !messageInput.value.trim()) {
        messageInput.value = 'Interest: ' + interest;
      }
    }
    var target = document.getElementById('contact-booking');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('.pkg-inquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToBooking(btn.getAttribute('data-package'));
    });
  });

  document.querySelectorAll('.room-inquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToBooking(btn.getAttribute('data-package'));
    });
  });

  document.querySelectorAll('.cafe-inquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToBooking('Caf\u00e9 & Night Bar');
    });
  });

  document.querySelectorAll('.svc-inquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToBooking(btn.getAttribute('data-type'));
    });
  });

  document.querySelectorAll('.dest-inquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToBooking('General Travel Information');
    });
  });

  /* ---------------- Inquiry form validation + booking channel handlers ---------------- */
  var form = document.getElementById('inquiryForm');
  var bookingStatus = document.getElementById('bookingStatus');
  var REQUIRED_BOOKING_FIELDS = ['fullName', 'email', 'whatsapp', 'checkInDate', 'checkOutDate', 'guests', 'packageInterest'];

  function fieldValue(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function clearBookingStatus() {
    if (bookingStatus) bookingStatus.hidden = true;
  }

  function showBookingStatus(message, type) {
    if (!bookingStatus) return;
    bookingStatus.textContent = message;
    bookingStatus.classList.remove('form-success', 'form-error');
    bookingStatus.classList.add(type === 'success' ? 'form-success' : 'form-error');
    bookingStatus.hidden = false;
    bookingStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function validateBookingForm() {
    var valid = true;
    var firstInvalid = null;

    REQUIRED_BOOKING_FIELDS.forEach(function (id) {
      var field = document.getElementById(id);
      if (!field) return;
      if (!field.value || !field.value.trim()) {
        valid = false;
        field.classList.add('invalid');
        if (!firstInvalid) firstInvalid = field;
      } else {
        field.classList.remove('invalid');
      }
    });

    var emailField = document.getElementById('email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      valid = false;
      emailField.classList.add('invalid');
      if (!firstInvalid) firstInvalid = emailField;
    }

    var checkInField = document.getElementById('checkInDate');
    var checkOutField = document.getElementById('checkOutDate');
    if (checkInField && checkOutField && checkInField.value && checkOutField.value && checkOutField.value <= checkInField.value) {
      valid = false;
      checkOutField.classList.add('invalid');
      if (!firstInvalid) firstInvalid = checkOutField;
    }

    return { valid: valid, firstInvalid: firstInvalid };
  }

  function runBookingValidation() {
    clearBookingStatus();
    var result = validateBookingForm();
    if (!result.valid) {
      var msg = currentLang() === 'km'
        ? 'សូមបំពេញព័ត៌មានកក់ចាំបាច់ទាំងអស់មុននឹងបន្ត។'
        : 'Please fill in all required booking information before continuing.';
      showBookingStatus(msg, 'error');
      if (result.firstInvalid) result.firstInvalid.focus();
      return false;
    }
    return true;
  }

  function buildBookingMessage() {
    var lines = [];
    lines.push('Booking Inquiry – Sampheap Guesthouse');
    lines.push('');
    lines.push('Name: ' + fieldValue('fullName'));
    lines.push('Phone: ' + fieldValue('whatsapp'));
    lines.push('Email: ' + fieldValue('email'));

    var country = fieldValue('country');
    if (country) lines.push('Country: ' + country);

    lines.push('Check-in: ' + fieldValue('checkInDate'));
    lines.push('Check-out: ' + fieldValue('checkOutDate'));
    lines.push('Guests: ' + fieldValue('guests'));

    var pkgSelect = document.getElementById('packageInterest');
    var pkgLabel = fieldValue('packageInterest');
    if (pkgSelect && pkgSelect.selectedIndex >= 0 && pkgSelect.options[pkgSelect.selectedIndex]) {
      pkgLabel = pkgSelect.options[pkgSelect.selectedIndex].textContent;
    }
    lines.push('Room / Package: ' + pkgLabel);

    var message = fieldValue('message');
    if (message) {
      lines.push('');
      lines.push('Message:');
      lines.push(message);
    }

    lines.push('');
    lines.push('Please confirm availability and booking details.');
    lines.push('Thank you.');

    return lines.join('\n');
  }

  if (form) {
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () { field.classList.remove('invalid'); });
      field.addEventListener('change', function () { field.classList.remove('invalid'); });
    });
  }

  var sendWhatsAppBtn = document.getElementById('sendWhatsApp');
  var sendTelegramBtn = document.getElementById('sendTelegram');
  var sendEmailBtn = document.getElementById('sendEmail');

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', function () {
      if (!runBookingValidation()) return;
      var message = buildBookingMessage();
      var url = 'https://wa.me/855976605605?text=' + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', function () {
      if (!runBookingValidation()) return;
      var message = buildBookingMessage();
      var subject = 'Booking Inquiry – Sampheap Guesthouse';
      var url = 'mailto:sampheapguesthouse@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);
      window.location.href = url;
    });
  }

  if (sendTelegramBtn) {
    sendTelegramBtn.addEventListener('click', function () {
      if (!runBookingValidation()) return;
      var message = buildBookingMessage();

      function openTelegram(copied) {
        window.open('https://t.me/+855976605605', '_blank', 'noopener');
        var msg;
        if (copied) {
          msg = currentLang() === 'km'
            ? 'ចម្លងព័ត៌មានកក់រួចរាល់។ សូមបិទភ្ជាប់វានៅក្នុង Telegram ដើម្បីផ្ញើ។'
            : 'Booking details copied. Paste them into Telegram to send.';
        } else {
          msg = currentLang() === 'km'
            ? 'កំពុងបើក Telegram — សូមចម្លងព័ត៌មានខាងក្រោមដោយផ្ទាល់ រួចបិទភ្ជាប់ក្នុងការសន្ទនា។'
            : 'Opening Telegram — please copy your booking details below and paste them into the chat.';
        }
        showBookingStatus(msg, 'success');
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(message).then(function () {
          openTelegram(true);
        }).catch(function () {
          openTelegram(false);
        });
      } else {
        openTelegram(false);
      }
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
