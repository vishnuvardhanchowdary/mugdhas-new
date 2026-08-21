/* ============================================
   MUGDHA CONSTRUCTIONS LLP — Main JS
   Navigation, scroll, animations, mobile bar
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initGoldDividers();
  initWhatsAppFAB();
  initSmoothScroll();
  setActiveNav();
});

/* ── Header Scroll Behavior ── */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.nav-overlay');

  if (!toggle || !nav) return;

  function closeMenu() {
    toggle.classList.remove('open');
    nav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      toggle.classList.add('open');
      nav.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ── Scroll Reveal (Intersection Observer) ── */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Show everything immediately
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      el.classList.add('in-view');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // One-time trigger
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-stagger, .fade-in').forEach(el => {
    observer.observe(el);
  });
}

/* ── Gold Divider Draw-In ── */
function initGoldDividers() {
  const dividers = document.querySelectorAll('.gold-divider--animate');
  if (!dividers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  dividers.forEach(d => observer.observe(d));
}

/* ── WhatsApp FAB ── */
function initWhatsAppFAB() {
  const fab = document.querySelector('.whatsapp-fab');
  if (!fab) return;

  fab.addEventListener('click', () => {
    fab.classList.add('interacted');
    trackEvent('whatsapp_click', 'WhatsApp FAB');
  });
}

/* ── Smooth Scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}

/* ── Set Active Nav Link ── */
function setActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === 'index.html' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Track Events (analytics-ready) ── */
function trackEvent(eventName, eventLabel) {
  // Google Analytics 4 integration point
  if (typeof gtag === 'function') {
    gtag('event', eventName, {
      event_label: eventLabel,
    });
  }
  console.log(`[Analytics] ${eventName}: ${eventLabel}`);
}

/* ── Track Call Clicks ── */
document.addEventListener('click', (e) => {
  const callLink = e.target.closest('a[href^="tel:"]');
  if (callLink) {
    trackEvent('call_click', callLink.getAttribute('href'));
  }

  const waLink = e.target.closest('a[href*="wa.me"], a[href*="whatsapp"]');
  if (waLink) {
    trackEvent('whatsapp_click', 'Link Click');
  }
});
