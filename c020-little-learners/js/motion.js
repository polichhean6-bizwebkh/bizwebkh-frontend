(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const heroCopy = document.querySelector('.hero-copy');
  const heroArt = document.querySelector('.hero-art');
  requestAnimationFrame(() => { heroCopy?.classList.add('hero-in'); heroArt?.classList.add('hero-in'); });
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  const groups = [
    ['.trust-grid', '.trust-grid article'], ['#programs .section-head', '#programs .section-head'], ['#programs .program-card', '#programs .program-card'],
    ['.care-image', '.care-image'], ['.care-copy', '.care-copy'], ['.development .center-head', '.development .center-head'], ['.development-grid article', '.development-grid article'],
    ['.why-grid > div', '.why-grid > div'], ['.team-copy', '.team-copy'], ['.team-photo', '.team-photo'], ['.branches .section-head', '.branches .section-head'],
    ['.branch-grid article', '.branch-grid article'], ['.gallery .center-head', '.gallery .center-head'], ['.gallery-item', '.gallery-item'], ['.routine-grid > div', '.routine-grid > div'],
    ['.enroll-copy', '.enroll-copy'], ['.enroll-form', '.enroll-form'], ['.footer-grid > div', '.footer-grid > div']
  ];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('revealed'); observer.unobserve(entry.target);
  }), { threshold: .15, rootMargin: '0px 0px -24px' });
  groups.forEach(([container, selector]) => document.querySelectorAll(selector).forEach((el, index) => {
    el.classList.add('motion-reveal');
    if (selector !== container) { el.classList.add('stagger-child'); el.style.setProperty('--stagger', index % 6); }
    if (el.classList.contains('care-image') || el.classList.contains('team-copy')) el.classList.add('reveal-left');
    if (el.classList.contains('care-copy') || el.classList.contains('team-photo')) el.classList.add('reveal-right');
    if (el.classList.contains('gallery-item')) el.classList.add('reveal-scale');
    observer.observe(el);
  }));
  const routine = document.querySelector('.routine');
  if (routine) new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { routine.classList.add('timeline-live'); } }), { threshold: .18 }).observe(routine);

  const lightbox = document.querySelector('.lightbox');
  const gallery = [...document.querySelectorAll('.gallery-item')];
  if (lightbox && gallery.length) {
    let current = 0;
    const swap = index => { current = (index + gallery.length) % gallery.length; const image = gallery[current].querySelector('img'); const target = lightbox.querySelector('img'); target.style.opacity = '0'; setTimeout(() => { target.src = gallery[current].href; target.alt = image.alt; target.style.opacity = '1'; }, 120); };
    const prev = document.createElement('button'), next = document.createElement('button');
    prev.className = 'lightbox-nav prev'; prev.setAttribute('aria-label', 'Previous image'); prev.textContent = '‹';
    next.className = 'lightbox-nav next'; next.setAttribute('aria-label', 'Next image'); next.textContent = '›';
    lightbox.append(prev, next); prev.addEventListener('click', e => { e.stopPropagation(); swap(current - 1); }); next.addEventListener('click', e => { e.stopPropagation(); swap(current + 1); });
    gallery.forEach((item, index) => item.addEventListener('click', () => { current = index; }));
    document.addEventListener('keydown', e => { if (!lightbox.classList.contains('open')) return; if (e.key === 'ArrowLeft') swap(current - 1); if (e.key === 'ArrowRight') swap(current + 1); });
  }
  if (reduced) document.querySelectorAll('.motion-reveal').forEach(el => el.classList.add('revealed'));
})();
