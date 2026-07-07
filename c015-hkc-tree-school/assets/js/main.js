const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImg.src = button.dataset.lightbox;
    lightboxImg.alt = button.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.removeAttribute("src");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("name").trim();
  const phone = data.get("phone").trim();
  const program = data.get("program");
  const message = data.get("message").trim();
  const inquiry = `Hello HKC Tree International School, my name is ${name}. My phone number is ${phone}. I am interested in ${program}.${message ? ` Message: ${message}` : ""}`;

  formNote.textContent = "Thank you. Your inquiry message is ready. Please call 012 317 316 to speak with admissions.";
  window.location.href = `tel:012317316`;
  console.info(inquiry);
});
