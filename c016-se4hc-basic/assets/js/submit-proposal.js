const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedExtensions = [".pdf", ".xls", ".xlsx"];
const allowedTypes = ["application/pdf", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

function value(id) { return document.getElementById(id).value.trim(); }
function readableSize(bytes) { return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`; }
function validateFile(file, optional = false) {
  if (!file) return optional ? null : "Please upload a proposal document.";
  const lower = file.name.toLowerCase();
  const extOk = allowedExtensions.some((ext) => lower.endsWith(ext));
  const typeOk = allowedTypes.includes(file.type) || file.type === "";
  if (!extOk || !typeOk) return "Only PDF, XLS, and XLSX files are accepted.";
  if (file.size > MAX_FILE_SIZE) return "Each file must be 10MB or smaller.";
  return null;
}
function fileMeta(prefix, file) {
  return {
    [`${prefix}Name`]: file ? file.name : "",
    [`${prefix}Type`]: file ? (file.type || "application/octet-stream") : "",
    [`${prefix}Size`]: file ? file.size : 0,
    [`${prefix}Blob`]: file || null
  };
}
function bindFileLabel(inputId, labelId) {
  const input = document.getElementById(inputId);
  const label = document.getElementById(labelId);
  input.addEventListener("change", () => {
    const file = input.files[0];
    label.textContent = file ? `${file.name} (${readableSize(file.size)})` : "No file selected";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindFileLabel("proposalFile", "proposalFileName");
  bindFileLabel("supportingFile", "supportingFileName");
  const form = document.getElementById("proposalForm");
  const error = document.getElementById("formError");
  const successBox = document.getElementById("successBox");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    const proposalFile = document.getElementById("proposalFile").files[0];
    const supportingFile = document.getElementById("supportingFile").files[0];
    const fileError = validateFile(proposalFile) || validateFile(supportingFile, true);
    if (fileError) { error.textContent = fileError; return; }
    try {
      const proposalCode = await BasicProposalDB.nextCode();
      const record = {
        id: crypto.randomUUID(),
        proposalCode,
        submittedAt: new Date().toISOString(),
        schoolName: value("schoolName"),
        schoolCode: value("schoolCode"),
        province: value("province"),
        district: value("district"),
        directorName: value("directorName"),
        phone: value("phone"),
        email: value("email"),
        projectTitle: value("projectTitle"),
        projectType: value("projectType"),
        requestedBudget: Number(value("requestedBudget")),
        implementationYear: value("implementationYear"),
        summary: value("summary"),
        expectedResults: value("expectedResults"),
        status: "New",
        ...fileMeta("proposalFile", proposalFile),
        ...fileMeta("supportingFile", supportingFile)
      };
      await BasicProposalDB.add(record);
      document.getElementById("proposalCode").textContent = proposalCode;
      document.getElementById("receiptSchool").textContent = record.schoolName;
      document.getElementById("receiptProject").textContent = record.projectTitle;
      document.getElementById("receiptDate").textContent = formatDate(record.submittedAt);
      successBox.style.display = "block";
      form.reset();
      document.getElementById("proposalFileName").textContent = "No file selected";
      document.getElementById("supportingFileName").textContent = "No file selected";
      successBox.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      console.error(err);
      error.textContent = "Could not save this demo submission in this browser.";
    }
  });
  document.getElementById("anotherBtn").addEventListener("click", () => {
    successBox.style.display = "none";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
