const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const drops = document.querySelectorAll(".drop > button");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

drops.forEach((button) => {
  button.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 920px)").matches) {
      button.parentElement.classList.toggle("open");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".drop") && !event.target.closest(".nav-toggle")) {
    document.querySelectorAll(".drop.open").forEach((drop) => drop.classList.remove("open"));
  }
});

const revealItems = document.querySelectorAll(".reveal");

revealItems.forEach((item) => {
  const group = item.parentElement ? Array.from(item.parentElement.querySelectorAll(".reveal")) : [];
  const index = Math.max(0, group.indexOf(item));
  item.style.setProperty("--reveal-delay", `${Math.min(index * 80, 320)}ms`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const filterButtons = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    galleryItems.forEach((item) => {
      item.style.display = filter === "all" || item.dataset.category.includes(filter) ? "" : "none";
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox button");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    if (!lightbox || !lightboxImage || !img) return;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add("open");
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", () => lightbox.classList.remove("open"));
if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.classList.remove("open");
  });
}

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle("visible", window.scrollY > 420);
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const form = document.querySelector("[data-demo-form]");
const message = document.querySelector("[data-form-message]");

if (form && message) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = "Thank you. This is a demo form. Final website can connect to Telegram or email.";
    form.reset();
  });
}
