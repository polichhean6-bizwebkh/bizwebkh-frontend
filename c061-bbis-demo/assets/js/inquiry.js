'use strict';
(() => {
  const form = document.querySelector('#inquiry-form');
  const fields = [...form.querySelectorAll('input, textarea')];
  const status = document.querySelector('#inquiry-status');
  let attempted = false;
  let statusKey = '';
  const normalizeDigits = value => value.replace(/[០-៩]/g, digit => String(digit.charCodeAt(0) - 0x17e0));
  function errorFor(field) {
    const value = field.value.trim();
    if (field.required && !value) return field.id === 'inquiry-phone' ? 'inquiryPhoneRequired' : field.id === 'inquiry-parent' ? 'inquiryParentRequired' : 'inquiryProgramRequired';
    if (field.id === 'inquiry-phone' && value) {
      const phone = normalizeDigits(value).replace(/[\s().-]/g, '');
      // Cambodian local or +855 format; other international numbers are also accepted.
      const valid = /^0[1-9]\d{7,8}$/.test(phone) || /^\+855[1-9]\d{7,8}$/.test(phone) || (/^\+(?!855)[1-9]\d{6,14}$/.test(phone));
      if (!valid) return 'inquiryPhoneInvalid';
    }
    if (value.length > field.maxLength) return 'inquiryTooLong';
    return '';
  }
  function validate(field) {
    const key = errorFor(field);
    const error = document.querySelector('#' + field.id + '-error');
    field.setAttribute('aria-invalid', String(Boolean(key)));
    error.textContent = key ? translate(key) : '';
    error.hidden = !key;
    return !key;
  }
  function clear() {
    form.reset();
    fields.forEach(field => {
      field.value = '';
      field.removeAttribute('aria-invalid');
      const error = document.querySelector('#' + field.id + '-error');
      error.textContent = ''; error.hidden = true;
    });
    attempted = false;
  }
  // No endpoint, network request, analytics, browser storage, or URL serialization.
  form.addEventListener('submit', event => {
    event.preventDefault();
    attempted = true;
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      statusKey = 'inquiryValidationSummary';
      status.textContent = translate(statusKey);
      fields.find(field => field.getAttribute('aria-invalid') === 'true').focus();
      return;
    }
    clear();
    statusKey = 'inquiryDemoSuccess';
    status.textContent = translate(statusKey);
    status.focus();
  });
  fields.forEach(field => {
    field.addEventListener('blur', () => { if (field.value || attempted) validate(field); });
    field.addEventListener('input', () => {
      if (attempted || field.hasAttribute('aria-invalid')) validate(field);
      if (statusKey === 'inquiryDemoSuccess') { statusKey = ''; status.textContent = ''; }
    });
  });
  document.addEventListener('bbis:languagechange', () => {
    fields.forEach(field => { if (field.hasAttribute('aria-invalid')) validate(field); });
    if (statusKey) status.textContent = translate(statusKey);
  });
  window.addEventListener('pagehide', () => { clear(); statusKey = ''; status.textContent = ''; });
  // Disabled in the saved HTML so no-JavaScript use cannot accidentally submit.
  clear();
  form.querySelector('fieldset').disabled = false;
  form.querySelector('button').disabled = false;
})();
