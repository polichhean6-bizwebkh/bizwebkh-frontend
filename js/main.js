/* MEP Technical and Skills Academy — Public Site Behavior (client demo) */
(function () {
  "use strict";

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function qparam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  function statusClass(status) {
    if (status === "Open") return "status-open";
    if (status === "Almost Full") return "status-almost";
    return "status-closed";
  }
  function toast(msg) {
    var el = qs("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  var NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "programs.html", label: "Training Programs" },
    { href: "schedule.html", label: "Schedule" },
    { href: "gallery.html", label: "Gallery" },
    { href: "news.html", label: "News" },
    { href: "contact.html", label: "Contact" }
  ];

  function renderHeader(academyName) {
    var el = qs("#site-header");
    if (!el) return;
    var navHtml = NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" data-page="' + l.href + '">' + l.label + "</a>";
    }).join("");
    el.innerHTML =
      '<div class="container header-inner">' +
      '<a href="index.html" class="brand"><span class="brand-mark">MEP</span>' +
      '<span>' + esc(academyName) + '<small>Technical Skills Training</small></span></a>' +
      '<nav class="main-nav" id="main-nav" aria-label="Main navigation">' + navHtml + '<a href="register.html" class="btn btn-primary btn-sm" style="margin-top:8px;display:none" data-mobile-cta>Register Now</a></nav>' +
      '<div class="header-actions">' +
      '<a href="register.html" class="btn btn-primary btn-sm">Register Now</a>' +
      '<button class="nav-toggle" aria-label="Toggle menu" aria-controls="main-nav" aria-expanded="false">☰</button>' +
      '</div></div>';
  }

  function renderFooter(settings) {
    var el = qs("#site-footer");
    if (!el) return;
    el.innerHTML =
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand"><h4>' + esc(settings.academyName) + '</h4>' +
      '<p>' + esc(settings.description) + '</p></div>' +
      '<div><h4>Explore</h4><ul>' +
      '<li><a href="programs.html">Training Programs</a></li>' +
      '<li><a href="schedule.html">Upcoming Classes</a></li>' +
      '<li><a href="gallery.html">Gallery</a></li>' +
      '<li><a href="news.html">News &amp; Updates</a></li></ul></div>' +
      '<div><h4>Academy</h4><ul>' +
      '<li><a href="about.html">About Us</a></li>' +
      '<li><a href="contact.html">Contact</a></li>' +
      '<li><a href="register.html">Register Now</a></li>' +
      '<li><a href="admin/login.html">Admin Login</a></li></ul></div>' +
      '<div><h4>Contact</h4><ul>' +
      '<li><a href="tel:+85577929360">' + esc(settings.phone) + '</a><br>Phone / Telegram</li>' +
      '<li>' + esc(settings.email) + '</li>' +
      '<li>' + esc(settings.address) + '</li></ul></div>' +
      '</div>' +
      '<div class="footer-bottom"><span>&copy; ' + new Date().getFullYear() + ' ' + esc(settings.academyName) + '. All rights reserved.</span>' +
      '<span class="footer-note">Preview · Illustrative content</span></div>' +
      '</div>';
  }

  window.SITE = {
    qs: qs, qsa: qsa, esc: esc, qparam: qparam, fmtDate: fmtDate, statusClass: statusClass, toast: toast
  };

  document.addEventListener("DOMContentLoaded", function () {
    var data = MEP.load();
    renderHeader(data.settings.academyName);
    renderFooter(data.settings);

    // apply settings-driven text
    qsa("[data-site-phone]").forEach(function (el) { el.textContent = data.settings.phone; });
    qsa("[data-site-phone-href]").forEach(function (el) { el.setAttribute("href", "tel:" + data.settings.phone.replace(/\s+/g, "")); });
    qsa("[data-site-telegram-href]").forEach(function (el) { el.setAttribute("href", MEP.telegramURL(data.settings.telegram)); });
    qsa("[data-site-email]").forEach(function (el) { el.textContent = data.settings.email; });
    qsa("[data-site-address]").forEach(function (el) { el.textContent = data.settings.address; });
    qsa("[data-site-name]").forEach(function (el) { el.textContent = data.settings.academyName; });
    qsa("[data-site-facebook]").forEach(function (el) { el.textContent = data.settings.facebook ? data.settings.facebook : "To be confirmed"; });

    // mobile nav toggle
    var navToggle = qs(".nav-toggle");
    var mainNav = qs(".main-nav");
    if (navToggle && mainNav) {
      navToggle.addEventListener("click", function () {
        mainNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", mainNav.classList.contains("open"));
        navToggle.textContent = mainNav.classList.contains("open") ? "✕" : "☰";
      });
      qsa(".main-nav a").forEach(function (a) {
        a.addEventListener("click", function () { mainNav.classList.remove("open"); navToggle.textContent = "☰"; navToggle.setAttribute("aria-expanded", "false"); });
      });
    }

    // active nav highlighting
    var path = window.location.pathname.split("/").pop() || "index.html";
    qsa(".main-nav a[data-page]").forEach(function (a) {
      if (a.getAttribute("data-page") === path) a.classList.add("active");
    });

    if (typeof window.PAGE_INIT === "function") {
      window.PAGE_INIT(data);
    }
  });
})();
