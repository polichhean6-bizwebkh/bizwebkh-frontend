const BASIC_LANG_KEY = "se4hcBasicLang";

function getLang() {
  return localStorage.getItem(BASIC_LANG_KEY) || "kh";
}

function setLang(lang) {
  localStorage.setItem(BASIC_LANG_KEY, lang);
  applyLanguage();
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

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(getLang() === "kh" ? "km-KH" : "en-US", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(value));
}

function statusLabel(status) {
  const labels = {
    New: { kh: "ថ្មី", en: "New" },
    Received: { kh: "បានទទួល", en: "Received" }
  };
  return (labels[status] || labels.New)[getLang()];
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => setLang(button.dataset.lang));
  });
  applyLanguage();
});
