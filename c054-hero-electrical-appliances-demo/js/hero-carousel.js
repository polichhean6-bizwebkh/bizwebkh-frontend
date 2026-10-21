'use strict';
(() => {
  const hero = document.querySelector('.hero-carousel');
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const dots = [...hero.querySelectorAll('.hero-dot')];
  const count = hero.querySelector('.hero-slide-count');
  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.classList.toggle('is-current', i === current);
      if (i === current) slide.querySelector('img').loading = 'eager';
      dots[i].setAttribute('aria-pressed', String(i === current));
    });
    count.textContent = String(current + 1).padStart(2, '0') + ' / 07';
  }
  hero.querySelector('.hero-prev').addEventListener('click', () => show(current - 1));
  hero.querySelector('.hero-next').addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  hero.querySelector('.hero-controls').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    show(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
    dots[current].focus();
  });
  let start;
  const stage = hero.querySelector('.hero-slides');
  stage.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0];
    start = {x:touch.clientX,y:touch.clientY};
  }, {passive:true});
  stage.addEventListener('touchend', event => {
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(touch.clientY - start.y)) show(current + (dx < 0 ? 1 : -1));
    start = null;
  }, {passive:true});
  function language() {
    const km = document.documentElement.lang === 'km';
    hero.setAttribute('aria-label', km ? 'ម៉ាកផលិតផល HERO' : 'HERO brands');
    hero.querySelector('.hero-prev').setAttribute('aria-label', km ? 'រូបភាពមុន' : 'Previous banner');
    hero.querySelector('.hero-next').setAttribute('aria-label', km ? 'រូបភាពបន្ទាប់' : 'Next banner');
    hero.querySelector('.hero-dots').setAttribute('aria-label', km ? 'ជ្រើសរើសរូបភាព' : 'Select banner');
  }
  new MutationObserver(language).observe(document.documentElement, {attributes:true,attributeFilter:['lang']});
  language();
})();
