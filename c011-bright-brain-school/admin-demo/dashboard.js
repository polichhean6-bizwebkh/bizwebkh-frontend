const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector(".menu-toggle");
const navButtons = document.querySelectorAll("[data-panel]");
const panels = document.querySelectorAll(".panel");
const toast = document.querySelector(".toast");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modalTitle");
const modalForm = document.querySelector("#modalForm");
const modalClose = document.querySelector(".modal-close");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

function showPanel(panelId) {
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.panel === panelId));
  sidebar.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.panel));
});

document.querySelectorAll("[data-panel-link]").forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.panelLink));
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
}

document.addEventListener("click", (event) => {
  if (window.innerWidth <= 980 && sidebar.classList.contains("open")) {
    if (!event.target.closest(".sidebar") && !event.target.closest(".menu-toggle")) {
      sidebar.classList.remove("open");
    }
  }
});

const forms = {
  news: {
    title: "News & Event Form",
    fields: [
      ["Title", "School Assembly"],
      ["Category", "Activities"],
      ["Short Description", "Sample update text for school activities.", "textarea"],
      ["Image", "../assets/image-01.png"],
      ["Status", "Published"]
    ],
    message: "Demo only. Final dashboard can save this content to database."
  },
  program: {
    title: "Program Content Form",
    fields: [
      ["Program Name", "Kindergarten / Early Learning"],
      ["Short Description", "Early confidence, classroom routines, and playful learning.", "textarea"],
      ["Detail Content", "Program details can be customized after official confirmation.", "textarea"]
    ],
    message: "Demo only. Final dashboard can save this content to database."
  }
};

function openModal(type) {
  const config = forms[type] || forms.news;
  modalTitle.textContent = config.title;
  modalForm.innerHTML = "";
  config.fields.forEach(([label, value, kind]) => {
    const wrapper = document.createElement("label");
    wrapper.textContent = label;
    const field = document.createElement(kind === "textarea" ? "textarea" : "input");
    field.value = value;
    wrapper.appendChild(field);
    modalForm.appendChild(wrapper);
  });
  const save = document.createElement("button");
  save.className = "btn green";
  save.type = "submit";
  save.textContent = "Save";
  modalForm.appendChild(save);
  modalForm.dataset.message = config.message;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.openModal));
});

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  showToast(modalForm.dataset.message || "Demo only. Final dashboard can save this content to database.");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});

document.querySelectorAll("[data-demo-message]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.demoMessage));
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Demo only. Final dashboard can update website information after backend setup.");
  });
});

const galleryTabs = document.querySelectorAll("[data-gallery-filter]");
const galleryItems = document.querySelectorAll(".gallery-grid [data-category]");

galleryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.galleryFilter;
    galleryTabs.forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");
    galleryItems.forEach((item) => {
      item.style.display = filter === "all" || item.dataset.category.includes(filter) ? "" : "none";
    });
  });
});
