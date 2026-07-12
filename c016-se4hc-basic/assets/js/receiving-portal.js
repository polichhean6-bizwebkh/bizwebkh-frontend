let submissions = [];

function downloadBlob(blob, filename) {
  if (!blob) return alert("No file stored for this sample submission.");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function fileSize(bytes) {
  if (!bytes) return "-";
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function filtered() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  return submissions.filter((item) => !q || [item.proposalCode, item.schoolName].join(" ").toLowerCase().includes(q));
}

function renderCounts() {
  document.getElementById("totalCount").textContent = submissions.length;
  document.getElementById("newCount").textContent = submissions.filter((x) => x.status === "New").length;
  document.getElementById("receivedCount").textContent = submissions.filter((x) => x.status === "Received").length;
}

function renderTable() {
  const list = filtered();
  document.getElementById("proposalRows").innerHTML = list.map((item) => `
    <tr>
      <td><strong>${item.proposalCode}</strong></td>
      <td>${item.schoolName}<br><span class="help">${item.schoolCode || ""}</span></td>
      <td>${item.projectTitle}</td>
      <td>${item.province}</td>
      <td>${formatDate(item.submittedAt)}</td>
      <td><span class="status-badge status-${item.status}">${statusLabel(item.status)}</span></td>
      <td>
        <button class="btn btn-small btn-primary" data-action="view" data-id="${item.id}">View Details</button>
        ${item.proposalFileName ? `<button class="btn btn-small btn-secondary" data-action="download-proposal" data-id="${item.id}">Proposal File</button>` : ""}
        ${item.supportingFileName ? `<button class="btn btn-small btn-secondary" data-action="download-supporting" data-id="${item.id}">Supporting File</button>` : ""}
        <button class="btn btn-small btn-green" data-action="mark" data-id="${item.id}">Mark as Received</button>
        <button class="btn btn-small btn-danger" data-action="delete" data-id="${item.id}">Delete Demo Record</button>
      </td>
    </tr>`).join("");
  document.getElementById("emptyState").style.display = list.length ? "none" : "block";
  renderCounts();
}

async function refresh() {
  submissions = await BasicProposalDB.getAll();
  renderTable();
}

function detailItem(label, value) {
  return `<div class="detail-item"><strong>${label}</strong><span>${value || "-"}</span></div>`;
}

function openDetail(item) {
  document.getElementById("modalTitle").textContent = item.proposalCode;
  document.getElementById("modalBody").innerHTML = `
    <div class="detail-grid">
      ${detailItem("Proposal ID", item.proposalCode)}
      ${detailItem("Submission date", formatDate(item.submittedAt))}
      ${detailItem("Status", statusLabel(item.status))}
      ${detailItem("School Name", item.schoolName)}
      ${detailItem("School Code", item.schoolCode)}
      ${detailItem("Province", item.province)}
      ${detailItem("District", item.district)}
      ${detailItem("Director", item.directorName)}
      ${detailItem("Phone", item.phone)}
      ${detailItem("Email", item.email)}
      ${detailItem("Project Title", item.projectTitle)}
      ${detailItem("Project Type", item.projectType)}
      ${detailItem("Requested Budget", formatCurrency(item.requestedBudget))}
      ${detailItem("Implementation Year", item.implementationYear)}
      ${detailItem("Proposal File", item.proposalFileName || "No file")}
      ${detailItem("Supporting File", item.supportingFileName || "No file")}
    </div>
    <div class="modal-section"><h3>Short Summary</h3><p>${item.summary || "-"}</p><h3>Expected Results</h3><p>${item.expectedResults || "-"}</p></div>
    <div class="modal-section"><h3>Uploaded files</h3><p>Proposal: ${item.proposalFileName || "No file"} (${fileSize(item.proposalFileSize)} / ${item.proposalFileType || "-"})</p><p>Supporting: ${item.supportingFileName || "No file"} (${fileSize(item.supportingFileSize)} / ${item.supportingFileType || "-"})</p><div class="file-actions">${item.proposalFileName ? `<button class="btn btn-secondary" data-action="download-proposal" data-id="${item.id}">Download Proposal File</button>` : ""}${item.supportingFileName ? `<button class="btn btn-secondary" data-action="download-supporting" data-id="${item.id}">Download Supporting File</button>` : ""}<button class="btn btn-green" data-action="mark" data-id="${item.id}">Mark as Received</button></div></div>
  `;
  document.getElementById("detailModal").classList.add("open");
}

async function markReceived(id) {
  const item = await BasicProposalDB.get(id);
  if (!item) return;
  item.status = "Received";
  await BasicProposalDB.put(item);
  await refresh();
  document.getElementById("detailModal").classList.remove("open");
}

async function loadSamples() {
  await BasicProposalDB.clearSamples();
  const samples = [
    ["STEM Solar Learning Project", "New", "វិទ្យាល័យសម្ដេច ហ៊ុន សែន", "Kampong Cham", 2950],
    ["Grade 10 Mathematics Remedial Program", "Received", "វិទ្យាល័យព្រះសីហនុ", "Prey Veng", 1800],
    ["Student STEM Study Club", "New", "វិទ្យាល័យបាត់ដំបង", "Battambang", 1200],
    ["Community STEM Innovation Fair", "Received", "វិទ្យាល័យសៀមរាប", "Siem Reap", 2500]
  ];
  let i = 0;
  for (const [projectTitle, status, schoolName, province, requestedBudget] of samples) {
    i += 1;
    await BasicProposalDB.add({
      id: crypto.randomUUID(),
      proposalCode: await BasicProposalDB.nextCode(),
      submittedAt: new Date(Date.now() - i * 86400000).toISOString(),
      schoolName,
      schoolCode: `BASIC-SAMPLE-00${i}`,
      province,
      district: "Demo District",
      directorName: "Demo Director",
      phone: "012 000 000",
      email: "school@example.edu.kh",
      projectTitle,
      projectType: i === 2 ? "Remedial Program" : "STEM Project / Action Research",
      requestedBudget,
      implementationYear: "2027",
      summary: "Sample submission for the basic receiving portal demo.",
      expectedResults: "SE4HC team can view the submission and download the attached documents in the production system.",
      status,
      proposalFileName: "",
      proposalFileType: "",
      proposalFileSize: 0,
      proposalFileBlob: null,
      supportingFileName: "",
      supportingFileType: "",
      supportingFileSize: 0,
      supportingFileBlob: null
    });
  }
  await refresh();
}

document.addEventListener("DOMContentLoaded", async () => {
  await refresh();
  document.getElementById("searchInput").addEventListener("input", renderTable);
  document.getElementById("sampleBtn").addEventListener("click", loadSamples);
  document.getElementById("clearBtn").addEventListener("click", async () => {
    if (!confirm("Clear all demo submissions from this browser?")) return;
    const all = await BasicProposalDB.getAll();
    await Promise.all(all.map((item) => BasicProposalDB.delete(item.id)));
    await refresh();
  });
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("se4hcBasicAdminLoggedIn");
    window.location.href = "admin-login.html";
  });
  document.getElementById("closeModal").addEventListener("click", () => document.getElementById("detailModal").classList.remove("open"));
  document.getElementById("detailModal").addEventListener("click", (event) => {
    if (event.target.id === "detailModal") document.getElementById("detailModal").classList.remove("open");
  });
  document.body.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const id = button.dataset.id;
    const item = submissions.find((x) => x.id === id) || await BasicProposalDB.get(id);
    if (button.dataset.action === "view") openDetail(item);
    if (button.dataset.action === "download-proposal") downloadBlob(item.proposalFileBlob, item.proposalFileName);
    if (button.dataset.action === "download-supporting") downloadBlob(item.supportingFileBlob, item.supportingFileName);
    if (button.dataset.action === "mark") await markReceived(id);
    if (button.dataset.action === "delete" && confirm("Delete this demo record?")) {
      await BasicProposalDB.delete(id);
      await refresh();
    }
  });
});
