(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) closeMenu();
  });
  window.matchMedia('(min-width:741px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
  const reading = document.querySelector('[data-reading]');
  const setReading = enabled => {
    document.documentElement.classList.toggle('large-reading', enabled);
    reading.setAttribute('aria-pressed', String(enabled));
    reading.setAttribute('aria-label', enabled ? 'Restaurar tamaño de texto' : 'Ampliar texto para lectura');
  };
  try { setReading(localStorage.getItem('biomed-reading') === 'large'); } catch (_) { /* Storage may be unavailable. */ }
  reading.addEventListener('click', () => {
    const enabled = reading.getAttribute('aria-pressed') !== 'true';
    setReading(enabled);
    try { localStorage.setItem('biomed-reading', enabled ? 'large' : 'normal'); } catch (_) { /* Reading remains functional. */ }
  });
  document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
  const progress = document.querySelector('.reading-progress');
  let scheduled = false;
  const updateProgress = () => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 0}%`;
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateProgress); }
  }, {passive:true});
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();

// Progressive enhancement: content stays visible without JS or observer support.
(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      observer.unobserve(entry.target);
    });
  }, {rootMargin: '0px 0px 40px 0px', threshold: 0.05});
  document.querySelectorAll('[data-reveal]').forEach(section => {
    const box = section.getBoundingClientRect();
    if (box.top > window.innerHeight && box.height < window.innerHeight * 2) {
      section.classList.add('reveal-ready', 'reveal-pending');
      observer.observe(section);
    }
  });
})();
