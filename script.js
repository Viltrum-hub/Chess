document.querySelectorAll('[data-reading], .reading-toggle').forEach(control => control.remove());
document.documentElement.classList.remove('large-reading');
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
  window.matchMedia('(min-width:901px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
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
(() => {
  const canvas = document.createElement('canvas');
  canvas.className = 'ambient-particles';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const context = canvas.getContext('2d');
  if (!context) { canvas.remove(); return; }
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, particles = [], frame = 0, previous = 0;
  const draw = (step = 0) => {
    context.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x = (p.x + p.vx * step + width) % width;
      p.y = (p.y + p.vy * step + height) % height;
      context.fillStyle = p.color;
      context.beginPath();
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      context.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance >= 120) continue;
        context.strokeStyle = `rgba(84,225,236,${0.12 * (1 - distance / 120)})`;
        context.lineWidth = 0.7;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  };
  const tick = time => {
    frame = 0;
    if (document.hidden || motion.matches) return;
    if (time - previous >= 33) {
      const step = previous ? Math.min((time - previous) / 33, 2) : 1;
      previous = time;
      draw(step);
    }
    frame = window.requestAnimationFrame(tick);
  };
  const resume = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    draw();
    if (!document.hidden && !motion.matches) frame = window.requestAnimationFrame(tick);
  };
  const resize = () => {
    width = Math.max(1, window.innerWidth);
    height = Math.max(1, window.innerHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(width < 740 ? 30 : 65, Math.max(20, Math.round(width * height / 22000)));
    particles = Array.from({length: count}, (_, i) => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      radius: 0.8 + Math.random() * 1.3,
      color: i % 4 === 0 ? 'rgba(161,138,251,0.5)' : 'rgba(84,225,236,0.45)'
    }));
    resume();
  };
  let resizeFrame = 0;
  window.addEventListener('resize', () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(resize);
  }, {passive: true});
  document.addEventListener('visibilitychange', resume);
  motion.addEventListener('change', resume);
  resize();
})();

(() => {
  const dashboard = document.querySelector('.research-dashboard');
  if (!dashboard) return;
  const tablist = dashboard.querySelector('[role="tablist"]');
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const activate = (tab, moveFocus = false) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (moveFocus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      activate(tabs[target], true);
    });
  });
  activate(tabs[0]);
  tablist.hidden = false;
})();
