(function () {
  var PAGES = ['home', 'about', 'services', 'location', 'contact'];
  var DEFAULT_PAGE = 'home';

  function getPageFromHash() {
    var hash = (window.location.hash || '').replace('#', '').trim();
    return PAGES.indexOf(hash) !== -1 ? hash : DEFAULT_PAGE;
  }

  function pageTitle(page) {
    var names = {
      home: 'LL Fitness — Home',
      about: 'LL Fitness — About Us',
      services: 'LL Fitness — Services',
      location: 'LL Fitness — Location',
      contact: 'LL Fitness — Contact'
    };
    return names[page] || 'LL Fitness';
  }

  function showPage(page) {
    PAGES.forEach(function (p) {
      var section = document.getElementById('view-' + p);
      if (section) section.classList.toggle('hidden', p !== page);
    });

    document.querySelectorAll('[data-nav]').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-nav') === page);
    });

    var nav = document.getElementById('mainNav');
    if (nav) nav.classList.remove('open');

    window.scrollTo(0, 0);
    document.title = pageTitle(page);

    // Re-arm entrance animations for the page that just became visible
    armEntranceAnimations();
  }

  function navigate(page) {
    if (window.location.hash === '#' + page) {
      showPage(page);
    } else {
      window.location.hash = page;
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-nav]');
    if (el) {
      e.preventDefault();
      navigate(el.getAttribute('data-nav'));
    }
  });

  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.getElementById('mainNav').classList.toggle('open');
    });
  }

  window.addEventListener('hashchange', function () {
    showPage(getPageFromHash());
  });

  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('show', window.scrollY > 500);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('formNote');
      if (note) {
        note.textContent = 'Demo only — form submission is not connected to a backend.';
      }
    });
  }

  /* ---------- Entrance animations ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observer = null;

  function armEntranceAnimations() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    document.body.classList.add('anim-ready');

    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }

    var activePage = document.querySelector('main > section:not(.hidden)');
    var scope = activePage || document;
    var targets = scope.querySelectorAll('[data-animate]:not(.in-view)');

    targets.forEach(function (el, i) {
      // small, capped stagger so groups of cards feel cohesive but not slow
      var delay = Math.min(i % 6, 5) * 60;
      el.style.transitionDelay = delay + 'ms';
      observer.observe(el);
    });
  }

  showPage(getPageFromHash());
})();
