/* Ecoflo Initiative — Main JS */

(function () {
  'use strict';

  // --- Hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on mobile link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Close mobile nav on outside click ---
  document.addEventListener('click', (e) => {
    if (mobileNav && hamburger &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // --- Animated stat counters ---
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-target]');

  if ('IntersectionObserver' in window && counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
  } else {
    // Fallback — just show final values
    counters.forEach(el => {
      el.textContent = parseInt(el.dataset.target, 10).toLocaleString() + (el.dataset.suffix || '');
    });
  }

  // --- Nav shadow on scroll ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(36,36,90,0.12)'
        : 'none';
    }, { passive: true });
  }

})();
