/* =========================================================
   Dr Ly Cheng Huy — Clickable App Demo
   Screen navigation + interactive widgets
   ========================================================= */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  var target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    var scroller = target.querySelector('.screen-scroll');
    if (scroller) scroller.scrollTop = 0;
  }
  syncTabBar(id);
  window.scrollTo({ top: window.scrollY }); // no-op, keeps page position stable
}

/* ---------------- Tab bar sync ---------------- */
function syncTabBar(activeId) {
  var tabMap = {
    'screen-home': 'tab-home',
    'screen-consultation-intro': 'tab-consult',
    'screen-book-consultation': 'tab-consult',
    'screen-my-appointments': 'tab-consult',
    'screen-articles': 'tab-content',
    'screen-videos': 'tab-content',
    'screen-ebooks': 'tab-content',
    'screen-my-library': 'tab-library',
    'screen-profile': 'tab-profile'
  };
  document.querySelectorAll('.tab-item').forEach(function (t) {
    t.classList.remove('tab-active');
  });
  var key = tabMap[activeId];
  if (key) {
    document.querySelectorAll('.' + key).forEach(function (t) {
      t.classList.add('tab-active');
    });
  }
}

/* ---------------- Onboarding carousel ---------------- */
var obIndex = 0;
var obTotal = 3;
function obGoTo(i) {
  obIndex = Math.max(0, Math.min(obTotal - 1, i));
  document.querySelectorAll('.ob-slide').forEach(function (el, idx) {
    el.classList.toggle('active', idx === obIndex);
  });
  document.querySelectorAll('.ob-dots span').forEach(function (el, idx) {
    el.classList.toggle('active', idx === obIndex);
  });
  var nextBtn = document.getElementById('ob-next-btn');
  if (nextBtn) nextBtn.textContent = (obIndex === obTotal - 1) ? 'Get Started' : 'Next';
}
function obNext() {
  if (obIndex === obTotal - 1) {
    showScreen('screen-login');
    obIndex = 0;
    obGoTo(0);
  } else {
    obGoTo(obIndex + 1);
  }
}
function obSkip() {
  obIndex = 0;
  obGoTo(0);
  showScreen('screen-login');
}

/* ---------------- Booking wizard ---------------- */
var bookStep = 1;
var bookTotal = 5;
var bookChoice = { day: '22', time: '10:30 AM', type: 'Video Call' };

function bookGoStep(step) {
  bookStep = step;
  document.querySelectorAll('.wizard-step').forEach(function (el) {
    el.classList.toggle('active', parseInt(el.dataset.step, 10) === step);
  });
  document.querySelectorAll('#booking-steps .step-dot').forEach(function (el, idx) {
    var n = idx + 1;
    el.classList.remove('done', 'current');
    if (n < step) el.classList.add('done');
    else if (n === step) el.classList.add('current');
    el.textContent = n < step ? '✓' : n;
  });
  document.querySelectorAll('#booking-steps .step-line').forEach(function (el, idx) {
    el.classList.toggle('done', (idx + 1) < step);
  });
  if (step === 5) {
    document.getElementById('sum-day').textContent = 'Wed, Jul 22, 2026';
    document.getElementById('sum-time').textContent = bookChoice.time;
    document.getElementById('sum-type').textContent = bookChoice.type;
  }
}
function bookNext() { if (bookStep < bookTotal) bookGoStep(bookStep + 1); }
function bookBack() { if (bookStep > 1) bookGoStep(bookStep - 1); else showScreen('screen-consultation-intro'); }

function selectDay(el) {
  document.querySelectorAll('.day-chip').forEach(function (c) { c.classList.remove('selected'); });
  el.classList.add('selected');
}
function selectTime(el) {
  if (el.classList.contains('disabled')) return;
  document.querySelectorAll('.time-chip').forEach(function (c) { c.classList.remove('selected'); });
  el.classList.add('selected');
  bookChoice.time = el.dataset.time;
}
function selectType(el) {
  document.querySelectorAll('.type-card').forEach(function (c) { c.classList.remove('selected'); });
  el.classList.add('selected');
  bookChoice.type = el.dataset.type;
}

/* ---------------- Payment method select ---------------- */
function selectPayMethod(el, scope) {
  var group = document.querySelectorAll('#' + scope + ' .pay-method-card');
  group.forEach(function (c) { c.classList.remove('selected'); });
  el.classList.add('selected');
}

/* ---------------- Appointments tabs ---------------- */
function apptTab(which, el) {
  document.querySelectorAll('#appt-tabs .seg-item').forEach(function (t) { t.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.appt-panel').forEach(function (p) { p.style.display = 'none'; });
  document.getElementById('appt-panel-' + which).style.display = 'block';
}

/* ---------------- Settings toggles ---------------- */
function toggleSwitch(el) {
  el.classList.toggle('on');
}
function selectLang(el, scope) {
  document.querySelectorAll('#' + scope + ' .lang-pill').forEach(function (p) { p.classList.remove('selected'); });
  el.classList.add('selected');
}

/* ---------------- Init ---------------- */
document.addEventListener('DOMContentLoaded', function () {
  obGoTo(0);
  bookGoStep(1);
  showScreen('screen-splash');
  setTimeout(function () {
    if (document.getElementById('screen-splash').classList.contains('active')) {
      showScreen('screen-onboarding');
    }
  }, 2200);
});
