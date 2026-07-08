const SE4HC_LANG_KEY = "se4hcLang";

const translations = {
  kh: {
    navHome: "ទំព័រដើម",
    navAbout: "អំពីគម្រោង",
    navFund: "មូលនិធិ STEM",
    navApply: "របៀបដាក់ពាក្យ",
    navDocs: "ឯកសារ",
    navSubmit: "ដាក់សំណើ",
    navContact: "ទំនាក់ទំនង",
    ctaSubmit: "ដាក់សំណើ",
    backHome: "ត្រឡប់ទៅទំព័រដើម",
    adminLogin: "ចូលគ្រប់គ្រង",
    logout: "ចាកចេញ",
    demoNotice: "នេះជាប្រព័ន្ធសាកល្បង។ ទិន្នន័យត្រូវបានរក្សាទុកតែនៅក្នុងកម្មវិធីរុករកនេះប៉ុណ្ណោះ។"
  },
  en: {
    navHome: "Home",
    navAbout: "About Project",
    navFund: "STEM Fund",
    navApply: "How to Apply",
    navDocs: "Documents",
    navSubmit: "Submit Proposal",
    navContact: "Contact",
    ctaSubmit: "Submit Proposal",
    backHome: "Back to Home",
    adminLogin: "Admin Login",
    logout: "Logout",
    demoNotice: "This is a demo system. Data is stored in this browser only."
  }
};

function getLang() {
  return localStorage.getItem(SE4HC_LANG_KEY) || "kh";
}

function setLang(lang) {
  localStorage.setItem(SE4HC_LANG_KEY, lang);
  applyLanguage();
}

function t(key) {
  const lang = getLang();
  return translations[lang][key] || translations.en[key] || key;
}

function applyLanguage() {
  const lang = getLang();
  document.documentElement.lang = lang === "kh" ? "km" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const kh = node.getAttribute("data-kh");
    const en = node.getAttribute("data-en");
    if (kh !== null && en !== null) node.textContent = lang === "kh" ? kh : en;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const kh = node.getAttribute("data-kh-placeholder");
    const en = node.getAttribute("data-en-placeholder");
    if (kh !== null && en !== null) node.placeholder = lang === "kh" ? kh : en;
  });
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
}

function initLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => setLang(button.dataset.lang));
  });
  applyLanguage();
}

function formatCurrency(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(number);
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(getLang() === "kh" ? "km-KH" : "en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(value));
}

function statusLabel(status) {
  const labels = {
    New: { kh: "ថ្មី", en: "New" },
    Reviewing: { kh: "កំពុងពិនិត្យ", en: "Reviewing" },
    Approved: { kh: "អនុម័ត", en: "Approved" },
    Revise: { kh: "កែសម្រួល", en: "Revise" },
    Rejected: { kh: "បដិសេធ", en: "Rejected" }
  };
  return (labels[status] || labels.New)[getLang()];
}

document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
