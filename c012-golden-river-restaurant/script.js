const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");
const form = document.querySelector("#demoForm");
const formStatus = document.querySelector("#formStatus");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("is-open");
  nav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("is-open");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const imageSrc = item.dataset.full;
    const imageAlt = item.querySelector("img").alt;
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "assets/golden-river-sunset.png";
  document.body.classList.remove("nav-open");
};

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thank you. This is a demo form. Final website can connect to Telegram, Messenger, or email.";
  form.reset();
});
