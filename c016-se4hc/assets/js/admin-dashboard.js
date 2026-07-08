let proposals = [];

const statuses = ["New", "Reviewing", "Revise", "Approved", "Rejected"];
const docKeys = [
  ["proposalForm", "Proposal Form", "ទម្រង់សំណើ"],
  ["budgetTemplate", "Budget Template", "គំរូថវិកា"],
  ["annualWorkPlan", "Annual Work Plan", "ផែនការប្រចាំឆ្នាំ"],
  ["schoolApprovalLetter", "School Approval Letter", "លិខិតអនុម័តសាលា"],
  ["supportingEvidence", "Supporting Evidence", "ភស្តុតាងគាំទ្រ"]
];

const kh = {
  summary: "សង្ខេបសំណើ",
  files: "ឯកសារដែលបានបញ្ចូល",
  review: "ការពិនិត្យ និងសេចក្តីសម្រេច",
  notes: "កំណត់ចំណាំ Admin",
  submitted: "បានដាក់សំណើ",
  screening: "ពិនិត្យឯកសារ",
  reviewing: "កំពុងពិនិត្យ",
  decision: "សេចក្តីសម្រេច",
  revisionRequired: "ត្រូវកែសម្រួល",
  approved: "អនុម័ត",
  rejected: "បដិសេធ",
  view: "មើល",
  del: "លុប",
  close: "បិទ",
  print: "បោះពុម្ពសង្ខេប",
  saveReview: "រក្សាទុកការពិនិត្យ",
  saveNote: "រក្សាទុកកំណត់ចំណាំ",
  downloadProposal: "ទាញយកឯកសារសំណើ",
  downloadSupporting: "ទាញយកឯកសារគាំទ្រ",
  noFile: "មិនមានឯកសារ",
  complete: "គ្រប់",
  missing: "ខ្វះ",
  total: "សរុប",
  lastSaved: "កំណត់ចំណាំដែលបានរក្សាទុកចុងក្រោយ"
};

const en = {
  summary: "Proposal Summary",
  files: "Uploaded Files",
  review: "Review & Decision",
  notes: "Admin Notes",
  submitted: "Submitted",
  screening: "Screening",
  reviewing: "Reviewing",
  decision: "Decision",
  revisionRequired: "Revision Required",
  approved: "Approved",
  rejected: "Rejected",
  view: "View",
  del: "Delete",
  close: "Close",
  print: "Print Summary",
  saveReview: "Save Review",
  saveNote: "Save Note",
  downloadProposal: "Download Proposal File",
  downloadSupporting: "Download Supporting File",
  noFile: "No file",
  complete: "Complete",
  missing: "Missing",
  total: "Total",
  lastSaved: "Last saved note"
};

function msg(key) {
  return (getLang() === "kh" ? kh : en)[key] || key;
}

function ensureReviewFields(item) {
  item.priority ||= "Normal";
  item.relevanceScore ??= "";
  item.innovationScore ??= "";
  item.budgetScore ??= "";
  item.sustainabilityScore ??= "";
  item.revisionMessage ||= "";
  item.adminNote ||= "";
  item.documentChecklist ||= {
    proposalForm: !!item.proposalFileName,
    budgetTemplate: false,
    annualWorkPlan: false,
    schoolApprovalLetter: false,
    supportingEvidence: !!item.supportingFileName
  };
  return item;
}

function totalScore(item) {
  const fields = ["relevanceScore", "innovationScore", "budgetScore", "sustainabilityScore"];
  const values = fields.map((field) => Number(item[field] || 0));
  const hasAny = fields.some((field) => item[field] !== "" && item[field] !== undefined && item[field] !== null);
  return hasAny ? values.reduce((sum, value) => sum + value, 0) : "";
}

function documentsComplete(item) {
  const checklist = ensureReviewFields(item).documentChecklist;
  return docKeys.every(([key]) => checklist[key]);
}

function progressInfo(status) {
  const map = {
    New: { pct: 25, key: "submitted", className: "New" },
    Reviewing: { pct: 60, key: "reviewing", className: "Reviewing" },
    Revise: { pct: 70, key: "revisionRequired", className: "Revise" },
    Approved: { pct: 100, key: "approved", className: "Approved" },
    Rejected: { pct: 100, key: "rejected", className: "Rejected" }
  };
  return map[status] || map.New;
}

function matchesFilters(item) {
  ensureReviewFields(item);
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const status = document.getElementById("statusFilter").value;
  const type = document.getElementById("typeFilter").value;
  const year = document.getElementById("yearFilter").value;
  const province = document.getElementById("provinceFilter").value.trim().toLowerCase();
  const haystack = [item.proposalCode, item.schoolName, item.schoolCode, item.projectTitle].join(" ").toLowerCase();
  return (!query || haystack.includes(query)) &&
    (!status || item.status === status) &&
    (!type || item.projectType === type) &&
    (!year || item.implementationYear === year) &&
    (!province || String(item.province || "").toLowerCase().includes(province));
}

function filteredProposals() {
  return proposals.filter(matchesFilters);
}

function renderCounts() {
  document.getElementById("totalCount").textContent = proposals.length;
  document.getElementById("newCount").textContent = proposals.filter((p) => p.status === "New").length;
  document.getElementById("reviewingCount").textContent = proposals.filter((p) => p.status === "Reviewing").length;
  document.getElementById("approvedCount").textContent = proposals.filter((p) => p.status === "Approved").length;
  document.getElementById("reviseCount").textContent = proposals.filter((p) => p.status === "Revise").length;
  document.getElementById("rejectedCount").textContent = proposals.filter((p) => p.status === "Rejected").length;

  const budget = proposals.reduce((sum, p) => sum + Number(p.requestedBudget || 0), 0);
  const scored = proposals.map(totalScore).filter((score) => score !== "");
  const avg = scored.length ? Math.round(scored.reduce((sum, score) => sum + Number(score), 0) / scored.length) : "-";
  const provinces = new Set(proposals.map((p) => String(p.province || "").trim()).filter(Boolean));
  document.getElementById("budgetTotal").textContent = formatCurrency(budget);
  document.getElementById("avgScore").textContent = avg === "-" ? "-" : `${avg}/80`;
  document.getElementById("provinceCount").textContent = provinces.size;
  document.getElementById("docsCompleteCount").textContent = proposals.filter(documentsComplete).length;
}

function typeBadge(type) {
  const short = {
    "STEM Project / Action Research": "STEM",
    "Remedial Program": "Remedial",
    "Student Study Club / Peer Support": "Study Club",
    "Combined Project": "Combined"
  }[type] || type || "-";
  return `<span class="type-badge">${short}</span>`;
}

function progressCell(status) {
  const info = progressInfo(status);
  return `
    <div class="progress-cell">
      <div class="progress-label"><span>${msg(info.key)}</span><strong>${info.pct}%</strong></div>
      <div class="mini-progress"><span class="status-${info.className}" style="width:${info.pct}%"></span></div>
    </div>`;
}

function renderTable() {
  const rows = document.getElementById("proposalRows");
  const list = filteredProposals();
  rows.innerHTML = list.map((item) => {
    ensureReviewFields(item);
    return `
      <tr>
        <td><strong>${item.proposalCode}</strong></td>
        <td>${item.schoolName}<br><span class="help">${item.schoolCode || ""}</span></td>
        <td>${typeBadge(item.projectType)}</td>
        <td>${formatCurrency(item.requestedBudget)}</td>
        <td><span class="status-badge status-${item.status}">${statusLabel(item.status)}</span></td>
        <td>${progressCell(item.status)}</td>
        <td>${formatDate(item.submittedAt)}</td>
        <td>
          <button class="btn btn-small btn-primary" data-action="view" data-id="${item.id}">${msg("view")}</button>
          <button class="btn btn-small btn-danger" data-action="delete" data-id="${item.id}">${msg("del")}</button>
        </td>
      </tr>`;
  }).join("");
  document.getElementById("emptyState").style.display = list.length ? "none" : "block";
  renderCounts();
}

async function refresh() {
  proposals = (await ProposalDB.getAll()).map(ensureReviewFields);
  renderTable();
}

function downloadBlob(blob, filename) {
  if (!blob) return alert("No file stored for this sample proposal.");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function detailItem(label, value) {
  return `<div class="detail-item"><strong>${label}</strong><span>${value || "-"}</span></div>`;
}

function fileSize(bytes) {
  if (!bytes) return "-";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function workflowHtml(status) {
  const info = progressInfo(status);
  const activeSteps = status === "New"
    ? ["submitted"]
    : status === "Reviewing"
      ? ["submitted", "screening", "reviewing"]
      : ["submitted", "screening", "reviewing", "decision"];
  const finalLabel = status === "Revise" ? "revisionRequired" : status === "Approved" ? "approved" : status === "Rejected" ? "rejected" : "decision";
  const steps = [
    ["submitted", msg("submitted")],
    ["screening", msg("screening")],
    ["reviewing", msg("reviewing")],
    ["decision", msg(finalLabel)]
  ];
  return `
    <div class="workflow-detail">
      ${steps.map(([key, label]) => `<span class="${activeSteps.includes(key) ? `active status-${info.className}` : ""}">${label}</span>`).join("")}
    </div>`;
}

function scoreInput(id, label, value) {
  return `<div class="field"><label>${label} /20</label><input id="${id}" type="number" min="0" max="20" value="${value}"></div>`;
}

function statusOptions(current) {
  return statuses.map((status) => `<option ${current === status ? "selected" : ""}>${status}</option>`).join("");
}

function openDetail(rawItem) {
  const item = ensureReviewFields(rawItem);
  const score = totalScore(item);
  const docsDone = documentsComplete(item);
  document.getElementById("modalTitle").textContent = item.proposalCode;
  document.getElementById("modalBody").innerHTML = `
    <div class="modal-tabs">
      <button class="modal-tab active" data-tab="summary" type="button">${msg("summary")}</button>
      <button class="modal-tab" data-tab="files" type="button">${msg("files")}</button>
      <button class="modal-tab" data-tab="review" type="button">${msg("review")}</button>
      <button class="modal-tab" data-tab="notes" type="button">${msg("notes")}</button>
    </div>
    <div class="tab-panel active" data-panel="summary">
      <div class="modal-section-title">${msg("summary")}</div>
      <div class="detail-grid">
        ${detailItem("Proposal ID", item.proposalCode)}
        ${detailItem("School Name", item.schoolName)}
        ${detailItem("School Code", item.schoolCode)}
        ${detailItem("Province", item.province)}
        ${detailItem("District", item.district)}
        ${detailItem("Director", item.directorName)}
        ${detailItem("Phone", item.phone)}
        ${detailItem("Email", item.email)}
        ${detailItem("Project Title", item.projectTitle)}
        ${detailItem("Project Type", item.projectType)}
        ${detailItem("Budget", formatCurrency(item.requestedBudget))}
        ${detailItem("Year", item.implementationYear)}
        ${detailItem("Submitted Date", formatDate(item.submittedAt))}
        ${detailItem("Status", statusLabel(item.status))}
        ${detailItem("Priority", item.priority)}
        ${detailItem("Documents", docsDone ? msg("complete") : msg("missing"))}
      </div>
    </div>
    <div class="tab-panel" data-panel="files">
      <div class="modal-section-title">${msg("files")}</div>
      <div class="file-list">
        <div class="file-row">
          <div>${detailItem("Proposal File", item.proposalFileName || msg("noFile"))}${detailItem("Size / Type", `${fileSize(item.proposalFileSize)} · ${item.proposalFileType || "-"}`)}</div>
          ${item.proposalFileName ? `<button class="btn btn-secondary" data-action="download-proposal" data-id="${item.id}" type="button">${msg("downloadProposal")}</button>` : ""}
        </div>
        <div class="file-row">
          <div>${detailItem("Supporting File", item.supportingFileName || msg("noFile"))}${detailItem("Size / Type", `${fileSize(item.supportingFileSize)} · ${item.supportingFileType || "-"}`)}</div>
          ${item.supportingFileName ? `<button class="btn btn-secondary" data-action="download-supporting" data-id="${item.id}" type="button">${msg("downloadSupporting")}</button>` : ""}
        </div>
      </div>
    </div>
    <div class="tab-panel" data-panel="review">
      <div class="modal-section-title">${msg("review")}</div>
      <div class="review-decision-grid">
        <div class="field"><label>Current Status</label><select id="statusInput">${statusOptions(item.status)}</select></div>
        <div class="score-total"><span>${msg("total")}</span><strong id="scoreTotal">${score === "" ? "0" : score}/80</strong></div>
      </div>
      ${workflowHtml(item.status)}
      <div class="form-section">
        <h2>Document Checklist</h2>
        <div class="check-grid">
          ${docKeys.map(([key, enLabel, khLabel]) => `<label><input type="checkbox" data-doc="${key}" ${item.documentChecklist[key] ? "checked" : ""}> ${getLang() === "kh" ? khLabel : enLabel}</label>`).join("")}
        </div>
      </div>
      <div class="form-section">
        <h2>Score</h2>
        <div class="score-grid">
          ${scoreInput("relevanceScore", "Relevance", item.relevanceScore)}
          ${scoreInput("innovationScore", "Innovation", item.innovationScore)}
          ${scoreInput("budgetScore", "Budget", item.budgetScore)}
          ${scoreInput("sustainabilityScore", "Sustainability", item.sustainabilityScore)}
        </div>
      </div>
      <div class="form-section">
        <div class="field full"><label>Revision Request Message</label><textarea id="revisionMessage">${item.revisionMessage || ""}</textarea></div>
      </div>
      <div class="hero-actions modal-actions">
        <button class="btn btn-primary" data-action="save-review" data-id="${item.id}" type="button">${msg("saveReview")}</button>
        <button class="btn btn-secondary" data-action="print-summary" type="button">${msg("print")}</button>
        ${item.proposalFileName ? `<button class="btn btn-secondary" data-action="download-proposal" data-id="${item.id}" type="button">${msg("downloadProposal")}</button>` : ""}
        <button class="btn btn-secondary" data-action="close-modal" type="button">${msg("close")}</button>
      </div>
    </div>
    <div class="tab-panel" data-panel="notes">
      <div class="modal-section-title">${msg("notes")}</div>
      <div class="note-preview"><strong>${msg("lastSaved")}</strong><p>${item.adminNote || "-"}</p></div>
      <div class="field full"><label>Internal admin note</label><textarea id="adminNote">${item.adminNote || ""}</textarea></div>
      <div class="hero-actions modal-actions">
        <button class="btn btn-primary" data-action="save-note" data-id="${item.id}" type="button">${msg("saveNote")}</button>
        <button class="btn btn-secondary" data-action="close-modal" type="button">${msg("close")}</button>
      </div>
    </div>
  `;
  document.getElementById("detailModal").classList.add("open");
}

function closeDetail() {
  document.getElementById("detailModal").classList.remove("open");
}

function bindModalTabs(event) {
  const tabButton = event.target.closest(".modal-tab");
  if (!tabButton) return;
  const modal = document.getElementById("modalBody");
  modal.querySelectorAll(".modal-tab").forEach((btn) => btn.classList.toggle("active", btn === tabButton));
  modal.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tabButton.dataset.tab));
}

function clampScore(value) {
  if (value === "") return "";
  return Math.max(0, Math.min(20, Number(value)));
}

async function saveReview(id) {
  const item = ensureReviewFields(await ProposalDB.get(id));
  const modal = document.getElementById("modalBody");
  item.status = document.getElementById("statusInput").value;
  item.relevanceScore = clampScore(document.getElementById("relevanceScore").value);
  item.innovationScore = clampScore(document.getElementById("innovationScore").value);
  item.budgetScore = clampScore(document.getElementById("budgetScore").value);
  item.sustainabilityScore = clampScore(document.getElementById("sustainabilityScore").value);
  item.revisionMessage = document.getElementById("revisionMessage").value.trim();
  item.documentChecklist = {};
  docKeys.forEach(([key]) => {
    item.documentChecklist[key] = !!modal.querySelector(`[data-doc="${key}"]`)?.checked;
  });
  await ProposalDB.put(item);
  await refresh();
  openDetail(item);
}

async function saveNote(id) {
  const item = ensureReviewFields(await ProposalDB.get(id));
  item.adminNote = document.getElementById("adminNote").value.trim();
  await ProposalDB.put(item);
  await refresh();
  openDetail(item);
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportCsv() {
  const header = ["Proposal ID", "School Name", "School Code", "Province", "Project Type", "Requested Budget", "Year", "Status", "Total Score", "Submitted Date", "Admin Note", "Revision Request"];
  const rows = filteredProposals().map((p) => [p.proposalCode, p.schoolName, p.schoolCode, p.province, p.projectType, p.requestedBudget, p.implementationYear, p.status, totalScore(p), p.submittedAt, p.adminNote, p.revisionMessage].map(csvEscape).join(","));
  const blob = new Blob([[header.map(csvEscape).join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, "se4hc-proposals-export.csv");
}

async function seedSamples() {
  const existing = await ProposalDB.getAll();
  for (const item of existing) {
    if (String(item.schoolCode || "").startsWith("SAMPLE-")) {
      await ProposalDB.delete(item.id);
    }
  }
  const samples = [
    ["STEM Solar Learning Project", "New", "Priority", "STEM Project / Action Research", "វិទ្យាល័យសម្ដេច ហ៊ុន សែន", "Kampong Cham", 2950, [18, 17, 16, 17], "High potential STEM classroom activity."],
    ["Grade 10 Mathematics Remedial Program", "Reviewing", "Normal", "Remedial Program", "វិទ្យាល័យព្រះសីហនុ", "Prey Veng", 1800, [15, 13, 18, 15], "Reviewing implementation schedule."],
    ["Student STEM Study Club", "Approved", "Normal", "Student Study Club / Peer Support", "វិទ្យាល័យបាត់ដំបង", "Battambang", 1200, [19, 16, 18, 18], "Approved for demonstration."],
    ["Science Action Research Classroom Project", "Revise", "Priority", "STEM Project / Action Research", "វិទ្យាល័យកំពង់ឆ្នាំង", "Kampong Chhnang", 2600, [14, 15, 12, 13], "Needs stronger monitoring indicators."],
    ["Community STEM Innovation Fair", "Rejected", "Normal", "Combined Project", "វិទ្យាល័យសៀមរាប", "Siem Reap", 3000, [10, 12, 9, 11], "Rejected sample for status display."]
  ];
  let index = 0;
  for (const [title, status, priority, type, school, province, budget, score, note] of samples) {
    index += 1;
    const proposalCode = await ProposalDB.nextProposalCode();
    await ProposalDB.add({
      id: crypto.randomUUID(),
      proposalCode,
      submittedAt: new Date(Date.now() - index * 86400000).toISOString(),
      schoolName: school,
      schoolCode: `SAMPLE-00${index}`,
      province,
      district: "Demo District",
      directorName: "Demo Director",
      phone: "012 000 000",
      email: "school@example.edu.kh",
      projectTitle: title,
      projectType: type,
      requestedBudget: budget,
      implementationYear: index < 4 ? "2027" : "2028",
      summary: "Sample proposal record for client dashboard demonstration.",
      expectedResults: "Improved STEM participation, stronger remedial support, and better school-based innovation.",
      status,
      priority,
      relevanceScore: score[0],
      innovationScore: score[1],
      budgetScore: score[2],
      sustainabilityScore: score[3],
      documentChecklist: {
        proposalForm: true,
        budgetTemplate: index !== 4,
        annualWorkPlan: true,
        schoolApprovalLetter: index !== 5,
        supportingEvidence: index <= 3
      },
      revisionMessage: status === "Revise" ? "Please revise the budget details and add clearer monitoring indicators." : "",
      proposalFileName: "",
      proposalFileType: "",
      proposalFileSize: 0,
      proposalFileBlob: null,
      supportingFileName: "",
      supportingFileType: "",
      supportingFileSize: 0,
      supportingFileBlob: null,
      notificationStatus: "Demo notification only",
      adminNote: note
    });
  }
  await refresh();
}

document.addEventListener("DOMContentLoaded", async () => {
  await refresh();
  ["searchInput", "statusFilter", "typeFilter", "yearFilter", "provinceFilter"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderTable);
  });
  document.getElementById("exportBtn").addEventListener("click", exportCsv);
  document.getElementById("seedBtn").addEventListener("click", seedSamples);
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("se4hcAdminDemoLoggedIn");
    window.location.href = "admin-login.html";
  });
  document.querySelectorAll("[data-status-link]").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("statusFilter").value = link.dataset.statusLink;
      renderTable();
    });
  });
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => setTimeout(renderTable, 0));
  });
  document.getElementById("closeModal").addEventListener("click", closeDetail);
  document.getElementById("detailModal").addEventListener("click", (event) => {
    if (event.target.id === "detailModal") closeDetail();
    bindModalTabs(event);
  });
  document.body.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const id = button.dataset.id;
    const item = id ? proposals.find((proposal) => proposal.id === id) || await ProposalDB.get(id) : null;
    if (button.dataset.action === "view") openDetail(item);
    if (button.dataset.action === "download-proposal") downloadBlob(item.proposalFileBlob, item.proposalFileName);
    if (button.dataset.action === "download-supporting") downloadBlob(item.supportingFileBlob, item.supportingFileName);
    if (button.dataset.action === "delete" && confirm("Delete this proposal from the demo dashboard?")) {
      await ProposalDB.delete(id);
      await refresh();
    }
    if (button.dataset.action === "save-review") await saveReview(id);
    if (button.dataset.action === "save-note") await saveNote(id);
    if (button.dataset.action === "print-summary") window.print();
    if (button.dataset.action === "close-modal") closeDetail();
  });
});
