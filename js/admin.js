/* MEP Technical and Skills Academy — Admin Dashboard Behavior (client demo) */
(function () {
  "use strict";

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtDate(iso) {
    if (!iso) return "—";
    var d = new Date(iso.length > 10 ? iso : iso + "T00:00:00");
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  function fmtDateTime(iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) + " " +
      d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
  function badgeClass(status) {
    var map = {
      "Published": "a-badge-published", "Open": "a-badge-open", "Confirmed": "a-badge-confirmed",
      "Draft": "a-badge-draft", "New": "a-badge-new",
      "Almost Full": "a-badge-almost", "Contacted": "a-badge-contacted",
      "Closed": "a-badge-closed", "Cancelled": "a-badge-cancelled", "Unpublished": "a-badge-unpublished",
      "Completed": "a-badge-draft"
    };
    return "a-badge " + (map[status] || "a-badge-draft");
  }
  function toast(msg) {
    var el = qs(".a-toast");
    if (!el) { el = document.createElement("div"); el.className = "a-toast"; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  var NAV = [
    { group: "", items: [{ href: "index.html", label: "Dashboard", ic: "📊" }] },
    { group: "Training Management", items: [
      { href: "courses.html", label: "Courses", ic: "📘" },
      { href: "intakes.html", label: "Intakes / Schedule", ic: "🗓" },
      { href: "registrations.html", label: "Registrations", ic: "📝" }
    ]},
    { group: "Website Content", items: [
      { href: "pages.html", label: "Pages", ic: "📄" },
      { href: "news.html", label: "News", ic: "📰" },
      { href: "gallery.html", label: "Gallery", ic: "🖼" }
    ]},
    { group: "Media", items: [{ href: "media.html", label: "Media Library", ic: "🗂" }] },
    { group: "Settings", items: [{ href: "settings.html", label: "Site Settings", ic: "⚙️" }] },
    { group: "Account", items: [
      { href: "profile.html", label: "Profile", ic: "👤" },
      { href: "login.html", label: "Logout", ic: "🚪", action: "logout" }
    ]}
  ];

  function renderShell(pageTitle) {
    var current = window.location.pathname.split("/").pop() || "index.html";
    var sidebar = qs("#a-sidebar");
    var navHtml = NAV.map(function (grp) {
      var groupLabel = grp.group ? '<div class="a-nav-label">' + esc(grp.group) + '</div>' : "";
      var items = grp.items.map(function (item) {
        var activeClass = item.href === current ? " active" : "";
        var attrs = item.action ? ' data-action="' + item.action + '"' : "";
        return '<a href="' + item.href + '" class="' + activeClass.trim() + '"' + attrs + '><span class="ic">' + item.ic + '</span>' + item.label + "</a>";
      }).join("");
      return '<div class="a-nav-group">' + groupLabel + items + "</div>";
    }).join("");

    if (sidebar) {
      sidebar.innerHTML =
        '<div class="a-sidebar-brand"><div class="mark">MEP</div><div><strong>MEP Academy CMS</strong><span>BizWeb CMS Core</span></div></div>' +
        '<nav class="a-nav">' + navHtml + '</nav>';
    }

    var topTitle = qs("#a-page-title");
    if (topTitle) topTitle.textContent = pageTitle || "Dashboard";

    var userWrap = qs("#a-user-info");
    if (userWrap) {
      var data = MEP.load();
      userWrap.innerHTML = '<div class="avatar">A</div><div><strong>Admin</strong><div style="color:var(--a-muted);font-size:.76rem">' + esc(data.admin.email) + '</div></div>';
    }

    qsa('[data-action="logout"]').forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        MEP.setLoggedIn(false);
        window.location.href = "login.html";
      });
    });

    var toggle = qs("#a-sidebar-toggle");
    if (toggle && sidebar) {
      toggle.addEventListener("click", function () { sidebar.classList.toggle("open"); });
    }
  }

  function requireAuth() {
    if (!MEP.isLoggedIn()) {
      window.location.href = "login.html";
      return false;
    }
    return true;
  }

  function openModal(id) {
    var el = document.getElementById(id);
    if (el) { el._returnFocus=document.activeElement; el.classList.add('open'); document.body.style.overflow='hidden'; var modal=el.querySelector('.a-modal'); modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); var title=modal.querySelector('h3'); if(title) modal.setAttribute('aria-label',title.textContent); var first=el.querySelector('input:not([type=hidden]),select,textarea,button'); if(first) first.focus(); }
  }
  function closeModal(id) {
    var el = document.getElementById(id);
    if (el) { el.classList.remove('open'); document.body.style.overflow=''; if(el._returnFocus) el._returnFocus.focus(); }
  }

  window.ADMIN = {
    qs: qs, qsa: qsa, esc: esc, fmtDate: fmtDate, fmtDateTime: fmtDateTime, badgeClass: badgeClass,
    toast: toast, renderShell: renderShell, requireAuth: requireAuth, openModal: openModal, closeModal: closeModal
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (document.body.getAttribute("data-no-auth") === "true") {
      if (typeof window.PAGE_INIT === "function") window.PAGE_INIT(MEP.load());
      return;
    }
    if (!requireAuth()) return;
    var data = MEP.load();
    renderShell(document.body.getAttribute("data-page-title"));
    if (typeof window.PAGE_INIT === "function") window.PAGE_INIT(data);

    // click-outside-to-close for modals
    qsa(".a-modal-overlay").forEach(function (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal(overlay.id);
      });
    });
  });
})();
