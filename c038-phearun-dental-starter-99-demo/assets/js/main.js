/* Static navigation and inquiry preview only. No data is sent or stored. */
document.documentElement.classList.add('js-enabled');
const inquiryForm = document.querySelector('#inquiry-form');
const inquiryStatus = document.querySelector('#inquiry-status');
inquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  inquiryStatus.textContent = 'Demo complete — nothing was sent. This form is a preview and is not connected to the clinic yet.';
  inquiryStatus.hidden = false;
  inquiryStatus.focus();
});
// Enable only after the no-send submit handler is attached. Without JS, the form stays disabled.
document.querySelector('#inquiry-fields').disabled = false;
inquiryForm.addEventListener('input', () => { inquiryStatus.hidden = true; });
document.querySelectorAll('[data-contact-placeholder]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#footer-contact-status').textContent =
      link.dataset.contactPlaceholder + ' details are awaiting clinic confirmation. This demo link is not connected yet.';
  });
});
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 801px)').addEventListener('change', () => closeMenu());
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll('a').forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
