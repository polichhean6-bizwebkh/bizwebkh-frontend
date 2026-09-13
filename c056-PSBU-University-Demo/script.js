const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });

/* ---------- Language switching (KH default, ENG optional) ---------- */
const root = document.documentElement;
const langButtons = document.querySelectorAll('[data-lang-btn]');

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyLanguage(lang) {
  document.querySelectorAll('[data-i18n-km]').forEach(node => {
    const value = lang === 'en' ? node.getAttribute('data-i18n-en') : node.getAttribute('data-i18n-km');
    if (value == null) return;
    node.innerHTML = value.split('|').map(escapeHtml).join('<br>');
  });
  document.querySelectorAll('[data-i18n-aria-km]').forEach(node => {
    const value = lang === 'en' ? node.getAttribute('data-i18n-aria-en') : node.getAttribute('data-i18n-aria-km');
    if (value != null) node.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-alt-km]').forEach(node => {
    node.alt = lang === 'en' ? node.dataset.altEn : node.dataset.altKm;
  });
  document.querySelectorAll('.subject-secondary').forEach(node => {
    node.textContent = lang === 'en' ? node.dataset.secondaryKm : node.dataset.secondaryEn;
    node.lang = lang === 'en' ? 'km' : 'en';
  });
  document.title = lang === 'en' ? 'Educational Science | PSBU' : 'វិទ្យាសាស្ត្រអប់រំ | PSBU';
  document.querySelector('meta[name="description"]').content = lang === 'en'
    ? 'Explore Educational Science at Preah Sihamoniraja Buddhist University: study subjects, student activities, and admission inquiries through Telegram.'
    : 'ផ្នែកវិទ្យាសាស្ត្រអប់រំ នៃពុទ្ធិកសាកលវិទ្យាល័យព្រះសីហមុនីរាជា។ ស្វែងយល់ពីមុខវិជ្ជាសិក្សា សកម្មភាព និងការចុះឈ្មោះតាម Telegram។';
  root.setAttribute('lang', lang);
  root.setAttribute('data-lang', lang);
  langButtons.forEach(button => {
    const active = button.dataset.langBtn === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('psbu-lang', lang); } catch (error) { /* storage unavailable */ }
}

langButtons.forEach(button => {
  button.addEventListener('click', () => applyLanguage(button.dataset.langBtn));
});

let savedLang = 'km';
try { savedLang = localStorage.getItem('psbu-lang') || 'km'; } catch (error) { savedLang = 'km'; }
applyLanguage(savedLang === 'en' ? 'en' : 'km');

/* ---------- Gallery lightbox ---------- */
const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('.gallery-item').forEach(button => {
  button.addEventListener('click', () => {
    const source = button.querySelector('img');
    const lang = root.getAttribute('data-lang') === 'en' ? 'en' : 'km';
    lightbox.querySelector('img').src = source.src;
    lightbox.querySelector('img').alt = source.alt;
    lightbox.querySelector('p').textContent = lang === 'en' ? button.dataset.captionEn : button.dataset.captionKm;
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  });
});
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => { document.body.style.overflow = ''; });

/* ---------- Active nav section indicator ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) nav.querySelectorAll('a').forEach(link => {
      const active = link.hash === '#' + entry.target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -60% 0px' });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));

const header = document.querySelector('header');
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 20); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
window.matchMedia('(min-width: 1001px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.about-photo, .about-copy, .program-layout, .value-grid article, .highlights-grid article, .admission-inner, .contact-details').forEach(node => {
    node.classList.add('reveal-ready');
    reveal.observe(node);
  });
}
