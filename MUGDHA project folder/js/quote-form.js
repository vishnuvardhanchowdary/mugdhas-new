/* ============================================
   MUGDHA CONSTRUCTIONS LLP — Quote Form
   Multi-step form with validation & transitions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const steps = form.querySelectorAll('.form-step');
  const progressSteps = form.querySelectorAll('.progress-step');
  const prevBtns = form.querySelectorAll('.prev-btn');
  const nextBtns = form.querySelectorAll('.next-btn');
  const submitBtn = form.querySelector('button[type="submit"]');
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.remove('active');
      if (i === index) {
        step.classList.add('active');
      }
    });

    progressSteps.forEach((step, i) => {
      step.classList.remove('active', 'completed');
      if (i < index) {
        step.classList.add('completed');
      } else if (i === index) {
        step.classList.add('active');
      }
    });

    // Toggle prev/next buttons visibility
    prevBtns.forEach(btn => {
      btn.style.visibility = index === 0 ? 'hidden' : 'visible';
    });

    nextBtns.forEach(btn => {
      btn.style.display = index === steps.length - 1 ? 'none' : 'inline-flex';
    });

    if (submitBtn) {
      submitBtn.style.display = index === steps.length - 1 ? 'inline-flex' : 'none';
    }

    currentStep = index;
  }

  function validateStep(index) {
    const step = steps[index];
    const requiredFields = step.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      removeError(field);

      if (!field.value.trim()) {
        showError(field, 'This field is required');
        isValid = false;
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        isValid = false;
      } else if (field.type === 'tel' && !isValidPhone(field.value)) {
        showError(field, 'Please enter a valid 10-digit phone number');
        isValid = false;
      }
    });

    // Check radio groups
    const radioGroups = step.querySelectorAll('.radio-group[data-required]');
    radioGroups.forEach(group => {
      const checked = group.querySelector('input[type="radio"]:checked');
      if (!checked) {
        // attach error to the group container
        showError(group, 'Please select an option');
        isValid = false;
      }
    });

    return isValid;
  }

  function showError(field, message) {
    field.classList.add('error');
    const errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    errorEl.style.cssText = 'color: #E57373; font-size: 0.75rem; margin-top: 4px; display: block;';
    field.parentNode.appendChild(errorEl);
  }

  function removeError(field) {
    field.classList.remove('error');
    const existing = field.parentNode.querySelector('.form-error');
    if (existing) existing.remove();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[6-9]\d{9}$/.test(phone.replace(/[\s\-\+]/g, '').replace(/^91/, ''));
  }

  // Next button
  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
      }
    });
  });

  // Previous button
  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Show success state
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
      form.style.display = 'none';
      successMessage.style.display = 'block';
    }

    // Track submission
    if (typeof trackEvent === 'function') {
      trackEvent('form_submit', 'Quote Form');
    }

    console.log('[Quote Form] Submission:', data);
  });

  // Pre-select service from URL parameter if present
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const serviceMap = {
      'plot-owner': 'Plot Owner Construction',
      'new-home': 'New Home Buyer',
      'land-dev': 'Land Development Partnership',
      'renovation': 'Home Renovation',
      'hvac': 'HVAC Services'
    };
    const targetValue = serviceMap[serviceParam];
    if (targetValue) {
      const radio = form.querySelector(`input[name="service"][value="${targetValue}"]`);
      if (radio) {
        radio.checked = true;
      }
    }
  }

  // Initialize
  showStep(0);

  // Smooth scroll into form if parameter present
  if (serviceParam) {
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
      setTimeout(() => {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }
});
