const body = document.body;
const navPanel = document.querySelector('.nav-panel');
const menu = document.querySelector('.menu-toggle');
const backToTop = document.querySelector('.back-to-top');

menu.addEventListener('click', () => {
  const open = navPanel.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-panel a').forEach((link) => link.addEventListener('click', () => {
  navPanel.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
}));

function openModal(id) {
  const modal = document.getElementById(id);
  const iframe = modal.querySelector('iframe[data-youtube-src]');
  if (iframe && !iframe.src) iframe.src = iframe.dataset.youtubeSrc;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  const iframe = modal.querySelector('iframe[data-youtube-src]');
  if (iframe) iframe.src = '';
  body.classList.remove('modal-open');
}

document.querySelectorAll('[data-video-open]').forEach((button) => button.addEventListener('click', () => openModal('video-modal')));
document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  const modal = document.getElementById('gallery-modal');
  modal.querySelector('img').src = item.dataset.image;
  modal.querySelector('img').alt = item.querySelector('img').alt;
  modal.querySelector('figcaption').textContent = item.dataset.caption;
  openModal('gallery-modal');
}));
document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', () => closeModal(button.closest('.modal'))));
document.querySelectorAll('.modal').forEach((modal) => modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal(modal);
}));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') document.querySelectorAll('.modal.is-open').forEach(closeModal);
});

document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.gallery-item').forEach((item) => item.classList.toggle('is-hidden', filter !== 'all' && !item.dataset.gallery.includes(filter)));
}));

document.querySelectorAll('[data-res-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-res-filter]').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const filter = button.dataset.resFilter;
  document.querySelectorAll('[data-unit-type]').forEach((row) => {
    row.hidden = filter !== 'all' && row.dataset.unitType !== filter;
  });
}));

document.querySelectorAll('[data-plan-tab]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-plan-tab]').forEach((item) => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.plan-panel').forEach((panel) => {
    const active = panel.id === button.dataset.planTab;
    panel.classList.toggle('is-active', active);
    panel.hidden = !active;
  });
}));

document.getElementById('inquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-status').textContent = 'Demo inquiry received. A live form destination will be added after client confirmation.';
  event.currentTarget.reset();
});

document.querySelector('[data-map-placeholder]').addEventListener('click', () => {
  alert('Google Maps link will be added once confirmed by the client.');
});

function updateBackToTop() {
  backToTop.classList.toggle('is-visible', window.scrollY > 600);
}

window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
updateBackToTop();
