/* ============================================
   MUGDHA CONSTRUCTIONS LLP — Plot Counter
   Animated count-up for plot availability
   ============================================ */

function initPlotCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => {
    if (prefersReduced) {
      counter.textContent = counter.getAttribute('data-count-to');
    } else {
      counter.textContent = '0';
      observer.observe(counter);
    }
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count-to'), 10);
  const duration = 1500; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// Init plot progress bars
function initPlotBars() {
  const bars = document.querySelectorAll('.plot-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        entry.target.style.width = targetWidth + '%';
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', () => {
  initPlotCounters();
  initPlotBars();
});
