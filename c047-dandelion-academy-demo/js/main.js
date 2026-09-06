// Dandelion International Academy of Education — Demo site interactivity

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Nav active-section highlighting ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const navSections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (navSections.length) {
    const setActive = (id) => {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    navSections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ---------- Mobile nav ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navScrim = document.querySelector('.nav-scrim');

  const closeMenu = () => {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    navScrim.classList.remove('active');
    document.body.style.overflow = '';
  };
  const openMenu = () => {
    menuToggle.classList.add('active');
    mobileNav.classList.add('active');
    navScrim.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.contains('active') ? closeMenu() : openMenu();
  });
  navScrim.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- Smooth anchor navigation ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 84;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Gallery lightbox ---------- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const img = galleryItems[currentIndex];
    lightboxImg.src = img.getAttribute('src');
    lightboxImg.alt = img.getAttribute('alt') || '';
  };

  galleryItems.forEach((img, index) => {
    img.closest('.gallery-item').addEventListener('click', () => {
      showImage(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(currentIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  /* ---------- Contact form (UI demo only, no backend) ---------- */
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Inquiry Sent ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        form.reset();
      }, 2400);
    });
  }
});
