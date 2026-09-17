// Basic, browser-local inquiry management. No customer account or messaging service.
const inquiryStatuses = ['New', 'Contacted', 'Closed'];
function inquiryDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? esc(value) : new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Phnom_Penh'
  }).format(date);
}
function inquiryStatusOptions(value) {
  return inquiryStatuses.map(s => `<option ${s === value ? 'selected' : ''}>${s}</option>`).join('');
}
function drawInquiries() {
  document.querySelector('#main').innerHTML = title('Inquiries', 'Website inquiries, ready for a personal response.') + `
    <section class="panel inquiries-panel">
      <div class="table-toolbar">
        <label class="search">⌕ <input id="inquiry-search" aria-label="Search inquiries" placeholder="Search name, contact, service or destination…" value="${esc(query)}"></label>
        <select id="inquiry-filter" aria-label="Filter inquiries by status">${['All', ...inquiryStatuses].map(s => `<option ${status === s ? 'selected' : ''}>${s}</option>`).join('')}</select>
        <span class="subtle" id="inquiry-count" role="status"></span>
      </div>
      <div id="inquiry-records"></div>
    </section><p class="hint">Sample inquiries and local demo submissions only. Times shown in Cambodia time. No messages are sent from this demo.</p>`;
  document.querySelector('#inquiry-search').oninput = e => { query = e.target.value; inquiryRows(); };
  document.querySelector('#inquiry-filter').onchange = e => { status = e.target.value; inquiryRows(); };
  inquiryRows();
}
function inquiryRows() {
  const term = query.trim().toLowerCase();
  const rows = db.inquiries.filter(x => (status === 'All' || x.status === status) &&
    ['name', 'phone', 'email', 'service', 'destination'].some(k => String(x[k] || '').toLowerCase().includes(term)))
    .sort((a, b) => new Date(b.submitted) - new Date(a.submitted));
  document.querySelector('#inquiry-count').textContent = `${rows.length} ${rows.length === 1 ? 'inquiry' : 'inquiries'}`;
  const target = document.querySelector('#inquiry-records');
  if (!rows.length) {
    target.innerHTML = `<div class="empty"><h2>${db.inquiries.length ? 'No matching inquiries' : 'No inquiries yet'}</h2><p>${db.inquiries.length ? 'Try another search or status filter.' : 'Submit a demo inquiry from either website contact page to see it here.'}</p></div>`;
    return;
  }
  target.innerHTML = `<div class="table-scroll" tabindex="0" role="region" aria-label="Customer inquiries table, scroll horizontally for more columns"><table class="inquiry-table">
    <thead><tr><th>Name</th><th>Phone / Telegram<br>Email</th><th>Service interested in<br>Destination / Visa type</th><th>Message</th><th>Submitted date</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${rows.map(x => `<tr>
      <td><strong>${esc(x.name)}</strong></td>
      <td><span>${esc(x.phone)}</span><span class="inquiry-secondary">${esc(x.email)}</span></td>
      <td><span>${esc(x.service)}</span><span class="inquiry-secondary">${esc(x.destination)}</span></td>
      <td><p class="inquiry-excerpt">${esc(x.message)}</p></td>
      <td><time datetime="${esc(x.submitted)}">${inquiryDate(x.submitted)}</time></td>
      <td><span class="pill inquiry-${x.status.toLowerCase()}">${esc(x.status)}</span></td>
      <td><div class="row-actions inquiry-actions"><button data-view-inquiry="${esc(x.id)}">View</button><button class="danger" data-delete-inquiry="${esc(x.id)}">Delete</button></div>
        <select class="inquiry-status-select" data-status-inquiry="${esc(x.id)}" aria-label="Change status for ${esc(x.name)}">${inquiryStatusOptions(x.status)}</select></td>
    </tr>`).join('')}</tbody></table></div><div class="table-footer">Showing ${rows.length} of ${db.inquiries.length} inquiries<span>Saved only in this browser</span></div>`;
  target.querySelectorAll('[data-view-inquiry]').forEach(b => b.onclick = () => viewInquiry(b.dataset.viewInquiry));
  target.querySelectorAll('[data-status-inquiry]').forEach(s => s.onchange = () => setInquiryStatus(s.dataset.statusInquiry, s.value));
  target.querySelectorAll('[data-delete-inquiry]').forEach(b => b.onclick = () => {
    const x = db.inquiries.find(r => r.id === b.dataset.deleteInquiry);
    confirmation('Delete inquiry?', `Remove the local inquiry from ${x.name}? This cannot be undone.`, () => {
      db = read();
      db.inquiries = db.inquiries.filter(r => r.id !== x.id);
      commit('Inquiry deleted');
      drawInquiries();
    });
  });
}
function setInquiryStatus(id, nextStatus) {
  if (!inquiryStatuses.includes(nextStatus)) return false;
  db = read();
  const entry = db.inquiries.find(x => x.id === id);
  if (!entry) { toast('This inquiry is no longer available.'); drawInquiries(); return false; }
  entry.status = nextStatus;
  const saved = commit('Inquiry status changed to ' + nextStatus);
  drawInquiries();
  return saved;
}
function viewInquiry(id) {
  db = read();
  const x = db.inquiries.find(r => r.id === id);
  if (!x) { toast('This inquiry is no longer available.'); drawInquiries(); return; }
  const detail = (label, value, cls = '') => `<div class="${cls}"><dt>${label}</dt><dd>${esc(value)}</dd></div>`;
  const d = showDialog(`<form id="inquiry-detail-form">
    <div class="modal-head"><div><span class="eyebrow">CUSTOMER / INQUIRIES</span><h2 id="inquiry-dialog-title">Inquiry details</h2></div><button type="button" data-close aria-label="Close inquiry detail">×</button></div>
    <div class="modal-body inquiry-detail">
      <h3>Customer information</h3><dl>${detail('Name', x.name)}${detail('Phone / Telegram', x.phone)}${detail('Email', x.email, 'wide')}</dl>
      <h3>Inquiry information</h3><dl>${detail('Service interested in', x.service)}${detail('Destination / Visa type', x.destination)}${detail('Message', x.message, 'wide inquiry-message')}${detail('Submitted date · Cambodia time', inquiryDate(x.submitted))}<div><dt>Status</dt><dd><span class="pill inquiry-${x.status.toLowerCase()}">${esc(x.status)}</span></dd></div></dl>
      <label>Change status<select name="inquiryStatus">${inquiryStatusOptions(x.status)}</select></label>
    </div><div class="modal-footer"><button type="button" class="secondary" data-close>Close</button><button type="submit" class="primary">Change status</button></div></form>`);
  d.setAttribute('aria-labelledby', 'inquiry-dialog-title');
  d.addEventListener('close', () => d.removeAttribute('aria-labelledby'), {once: true});
  d.querySelector('form').onsubmit = e => {
    e.preventDefault();
    if (setInquiryStatus(id, new FormData(e.target).get('inquiryStatus'))) d.close();
  };
}
