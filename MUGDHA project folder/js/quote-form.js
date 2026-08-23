/* ============================================
   MUGDHA CONSTRUCTIONS LLP — Quote Form
   Multi-step form with validation & transitions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const steps = form.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const prevBtns = form.querySelectorAll('.prev-btn');
  const nextBtns = form.querySelectorAll('.next-btn');
  const submitBtn = form.querySelector('button[type="submit"]');
  let currentStep = 0;

  function showStep(index) {
    if (index < 0 || index >= steps.length) return;

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
    if (!step) return true;
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
        showError(group, 'Please select an option');
        isValid = false;
      }
    });

    return isValid;
  }

  function showError(field, message) {
    field.classList.add('error');
    const existing = field.parentNode.querySelector('.form-error');
    if (existing) existing.remove();
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

  // Allow direct tab clicking on progress steps
  progressSteps.forEach((progressStep, i) => {
    progressStep.style.cursor = 'pointer';
    progressStep.setAttribute('role', 'button');
    progressStep.setAttribute('tabindex', '0');

    const handleTabClick = () => {
      showStep(i);
    };

    progressStep.addEventListener('click', handleTabClick);
    progressStep.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTabClick();
      }
    });
  });

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

    // Check validation for all steps
    let invalidStep = -1;
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        if (invalidStep === -1) invalidStep = i;
      }
    }

    if (invalidStep !== -1) {
      showStep(invalidStep);
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // UI loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    // Live email dispatch to Sales@mugdhas.com via FormSubmit API
    const targetEmail = 'Sales@mugdhas.com';

    fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Quote Request from ${data.name || 'Website Visitor'}`,
        _template: 'table',
        Name: data.name || 'Not provided',
        Phone: data.phone || 'Not provided',
        Email: data.email || 'Not provided',
        Location: data.location || 'Not provided',
        Service: data.service || 'Not specified',
        Description: data.description || 'N/A',
        Budget: data.budget || 'Not specified',
        Timeline: data.timeline || 'Not specified'
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log('[Quote Form] Sent to Sales@mugdhas.com:', result);
    })
    .catch(err => {
      console.warn('[Quote Form] Delivery API call attempted:', err);
    })
    .finally(() => {
      // Show success message
      const successMessage = document.getElementById('form-success');
      if (successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
      }

      if (typeof trackEvent === 'function') {
        trackEvent('form_submit', 'Quote Form');
      }
    });
  });

  // Determine starting step based on URL parameters / hash
  const urlParams = new URLSearchParams(window.location.search);
  const hash = (window.location.hash || '').toLowerCase();
  const serviceParam = urlParams.get('service');
  const projectParam = urlParams.get('project');
  const tabParam = urlParams.get('tab');
  const stepParam = urlParams.get('step');

  let initialStep = 0;

  if (serviceParam) {
    const serviceMap = {
      'plot-owner': 'Plot Owner Construction',
      'new-home': 'New Home Buyer',
      'land-dev': 'Land Development Partnership',
      'renovation': 'Home Renovation',
      'hvac': 'HVAC Services'
    };
    const targetValue = serviceMap[serviceParam] || serviceParam;
    const radio = form.querySelector(`input[name="service"][value="${targetValue}"]`);
    if (radio) {
      radio.checked = true;
    }
    initialStep = 1; // Step 2 (Service)
  }

  if (projectParam) {
    const descField = form.querySelector('#description');
    if (descField && !descField.value) {
      descField.value = `Inquiry regarding project: ${projectParam}`;
    }
    initialStep = 2; // Step 3 (Project)
  }

  if (tabParam === 'service' || stepParam === '2' || hash === '#service' || hash === '#step-2') {
    initialStep = 1;
  } else if (tabParam === 'project' || stepParam === '3' || hash === '#project' || hash === '#step-3') {
    initialStep = 2;
  }

  // Initialize form to initialStep
  showStep(initialStep);

  // Smooth scroll into form if parameter or hash present
  if (serviceParam || projectParam || tabParam || stepParam || hash.includes('step') || hash.includes('service') || hash.includes('project')) {
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
      setTimeout(() => {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }
});
