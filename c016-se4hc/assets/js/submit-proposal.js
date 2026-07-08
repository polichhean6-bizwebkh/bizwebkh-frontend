const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedExtensions = [".pdf", ".xls", ".xlsx"];
const allowedTypes = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

function validateFile(file, optional = false) {
  if (!file) return optional ? null : "Please upload a proposal file.";
  const lowerName = file.name.toLowerCase();
  const hasAllowedExtension = allowedExtensions.some((ext) => lowerName.endsWith(ext));
  const hasAllowedType = allowedTypes.includes(file.type) || file.type === "";
  if (!hasAllowedExtension || !hasAllowedType) return "Only PDF, XLS, and XLSX files are accepted.";
  if (file.size > MAX_FILE_SIZE) return "Each file must be 10MB or smaller.";
  return null;
}

function value(id) {
  return document.getElementById(id).value.trim();
}

function fileMeta(prefix, file) {
  if (!file) {
    return {
      [`${prefix}Name`]: "",
      [`${prefix}Type`]: "",
      [`${prefix}Size`]: 0,
      [`${prefix}Blob`]: null
    };
  }
  return {
    [`${prefix}Name`]: file.name,
    [`${prefix}Type`]: file.type || "application/octet-stream",
    [`${prefix}Size`]: file.size,
    [`${prefix}Blob`]: file
  };
}

function readableSize(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
  const form = document.getElementById("proposalForm");
  const error = document.getElementById("formError");
  const successBox = document.getElementById("successBox");
  const codeNode = document.getElementById("proposalCode");
  bindFileLabel("proposalFile", "proposalFileName");
  bindFileLabel("supportingFile", "supportingFileName");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    const proposalFile = document.getElementById("proposalFile").files[0];
    const supportingFile = document.getElementById("supportingFile").files[0];
    const proposalError = validateFile(proposalFile);
    const supportingError = validateFile(supportingFile, true);
    if (proposalError || supportingError) {
      error.textContent = proposalError || supportingError;
      return;
    }

    try {
      const proposalCode = await ProposalDB.nextProposalCode();
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
        priority: "Normal",
        adminNote: "",
        revisionMessage: "",
        relevanceScore: "",
        innovationScore: "",
        budgetScore: "",
        sustainabilityScore: "",
        documentChecklist: {
          proposalForm: true,
          budgetTemplate: false,
          annualWorkPlan: false,
          schoolApprovalLetter: false,
          supportingEvidence: !!supportingFile
        },
        notificationStatus: "Demo notification only",
        ...fileMeta("proposalFile", proposalFile),
        ...fileMeta("supportingFile", supportingFile)
      };
      await ProposalDB.add(record);
      codeNode.textContent = proposalCode;
      document.getElementById("receiptSchool").textContent = record.schoolName;
      document.getElementById("receiptProject").textContent = record.projectTitle;
      document.getElementById("receiptDate").textContent = formatDate(record.submittedAt);
      successBox.style.display = "block";
      form.reset();
      document.getElementById("proposalFileName").textContent = "No file selected";
      document.getElementById("supportingFileName").textContent = "No file selected";
      successBox.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      error.textContent = "Could not save this demo proposal. Please try again in this browser.";
      console.error(err);
    }
  });

  document.getElementById("anotherBtn").addEventListener("click", () => {
    successBox.style.display = "none";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
