/* ==========================================================================
   Dandelion Online Learning & Teaching System — DEMO APP
   Vanilla JS single-page app: hash router + localStorage-backed demo state.
   No backend, no real video, no real payment. Frontend demo only.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     0. Local mutable state (seeded from DEMO, persisted to localStorage
        so demo interactions — submit homework, grade, attendance, etc. —
        survive a page refresh within this browser).
     --------------------------------------------------------------------- */
  const LS_KEY = "dandelion_ols_demo_state_v1";

  function loadState() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch (e) { saved = null; }
    const base = {
      role: "admin",
      submissions: JSON.parse(JSON.stringify(DEMO.SUBMISSIONS)),
      lessons: JSON.parse(JSON.stringify(DEMO.LESSONS)),
      assignments: JSON.parse(JSON.stringify(DEMO.ASSIGNMENTS)),
      liveClasses: JSON.parse(JSON.stringify(DEMO.LIVE_CLASSES)),
      announcements: JSON.parse(JSON.stringify(DEMO.ANNOUNCEMENTS)),
      attendance: JSON.parse(JSON.stringify(DEMO.ATTENDANCE)),
      activityLog: JSON.parse(JSON.stringify(DEMO.ACTIVITY_LOG)),
      notifications: JSON.parse(JSON.stringify(DEMO.NOTIFICATIONS)),
      completedLessons: {}, // { studentId: [lessonId, ...] }
    };
    if (!saved) return base;
    // shallow-merge saved over base so new demo fields introduced later still exist
    return Object.assign({}, base, saved);
  }

  let STATE = loadState();

  function persist() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(STATE)); } catch (e) { /* ignore quota errors in demo */ }
  }

  function logActivity(user, role, module, action, details) {
    STATE.activityLog.unshift({
      datetime: nowStr(), user, role, module, action, details
    });
    persist();
  }

  function pushNotification(text) {
    STATE.notifications.unshift({ id: "n-" + Date.now(), text, time: "Just now", read: false });
    persist();
  }

  function nowStr() {
    const d = new Date();
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  /* ---------------------------------------------------------------------
     1. Small render helpers
     --------------------------------------------------------------------- */
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const esc = (s) => (s === null || s === undefined) ? "" : String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function initials(name) {
    return (name || "").split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }

  function statusBadge(status) {
    const map = {
      "Present": "badge-green", "Reviewed": "badge-green", "Published": "badge-green", "Active": "badge-green", "Completed": "badge-gray", "Excused": "badge-blue",
      "Late": "badge-amber", "Submitted": "badge-blue", "Upcoming": "badge-blue", "Draft": "badge-gray",
      "Absent": "badge-red", "Not Submitted": "badge-red", "Inactive": "badge-red",
      "Live": "badge-red"
    };
    const cls = map[status] || "badge-gray";
    const pulse = status === "Live" ? " style=\"animation:none\"" : "";
    return `<span class="badge ${cls}"><span class="badge-dot"></span>${esc(status)}</span>`;
  }

  function typeBadge(type) {
    return type === "Online" ? `<span class="badge badge-blue">Online</span>` : `<span class="badge badge-gray">In-Person</span>`;
  }

  function fmtDate(dstr) {
    if (!dstr) return "—";
    const d = new Date(dstr + "T00:00:00");
    if (isNaN(d)) return dstr;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function toast(msg, icon) {
    let t = $("#toastEl");
    if (!t) { t = el(`<div class="toast" id="toastEl"></div>`); document.body.appendChild(t); }
    t.innerHTML = `<span class="t-check">${icon || "✓"}</span> ${esc(msg)}`;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function openModal(title, bodyHtml, opts) {
    opts = opts || {};
    const root = $("#modalRoot");
    root.innerHTML = "";
    const box = el(`
      <div class="modal-backdrop">
        <div class="modal-box ${opts.wide ? "wide" : ""}">
          <div class="modal-head"><h3>${esc(title)}</h3><button class="modal-close" id="modalCloseBtn">✕</button></div>
          <div class="modal-body">${bodyHtml}</div>
        </div>
      </div>`);
    root.appendChild(box);
    box.addEventListener("click", (e) => { if (e.target === box) closeModal(); });
    $("#modalCloseBtn", box).addEventListener("click", closeModal);
    return box;
  }
  function closeModal() { $("#modalRoot").innerHTML = ""; }

  /* ---------------------------------------------------------------------
     2. Navigation configuration per role
     --------------------------------------------------------------------- */
  const ICONS = {
    dashboard: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/></svg>`,
    students: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 8l10 5 10-5-10-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M6 10.5V16c0 1 2.5 3 6 3s6-2 6-3v-5.5" stroke="currentColor" stroke-width="2"/></svg>`,
    teachers: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="2"/></svg>`,
    classes: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 9h18M8 4v14" stroke="currentColor" stroke-width="2"/></svg>`,
    subjects: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" stroke-width="2"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" stroke-width="2"/></svg>`,
    schedule: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" stroke-width="2"/></svg>`,
    announcements: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 11v2a2 2 0 002 2h1l3 4V5L6 9H5a2 2 0 00-2 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 8a4 4 0 010 8" stroke="currentColor" stroke-width="2"/></svg>`,
    reports: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    users: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.5" stroke="currentColor" stroke-width="2"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="7" r="2.5" stroke="currentColor" stroke-width="2"/><path d="M15.5 14.2c2.7.3 4.5 2 4.5 4.6" stroke="currentColor" stroke-width="2"/></svg>`,
    activity: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 12h4l2 7 4-14 2 7h6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    settings: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 13a7.97 7.97 0 000-2l2-1.5-2-3.5-2.4 1a8 8 0 00-1.7-1L15 3h-4l-.3 2.5a8 8 0 00-1.7 1l-2.4-1-2 3.5L6.6 11a8 8 0 000 2l-2 1.5 2 3.5 2.4-1a8 8 0 001.7 1L11 21h4l.3-2.5a8 8 0 001.7-1l2.4 1 2-3.5-2-1.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    live: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 10l6-3.5v11L16 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    lessons: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 4.5C4 3.7 4.7 3 5.5 3H16a4 4 0 014 4v13.5a.5.5 0 01-.5.5H7a3 3 0 01-3-3V4.5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 17.5A2.5 2.5 0 016.5 15H20" stroke="currentColor" stroke-width="2"/></svg>`,
    assignments: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 3h6v3H9z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M6 5h12v15a1 1 0 01-1 1H7a1 1 0 01-1-1V5z" stroke="currentColor" stroke-width="2"/><path d="M9 11h6M9 15h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    submissions: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 15V3m0 0l4 4m-4-4L8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    attendance: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" stroke-width="2"/></svg>`,
    progress: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    homework: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 13h6M9 17h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    grades: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 15a6 6 0 100-12 6 6 0 000 12z" stroke="currentColor" stroke-width="2"/><path d="M8.5 14L7 21l5-2 5 2-1.5-7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    calendar: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    profile: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" stroke-width="2"/></svg>`,
  };

  const NAV = {
    admin: [
      { label: "Dashboard", icon: "dashboard", path: "#/admin/dashboard" },
      { label: "Students", icon: "students", path: "#/admin/students" },
      { label: "Teachers", icon: "teachers", path: "#/admin/teachers" },
      { label: "Classes", icon: "classes", path: "#/admin/classes" },
      { label: "Subjects", icon: "subjects", path: "#/admin/subjects" },
      { label: "Schedule", icon: "schedule", path: "#/admin/schedule" },
      { label: "Announcements", icon: "announcements", path: "#/admin/announcements" },
      { label: "Reports", icon: "reports", path: "#/admin/reports" },
      { label: "Users & Roles", icon: "users", path: "#/admin/users" },
      { label: "Activity Log", icon: "activity", path: "#/admin/activity" },
      { label: "Settings", icon: "settings", path: "#/admin/settings" },
    ],
    teacher: [
      { label: "Dashboard", icon: "dashboard", path: "#/teacher/dashboard" },
      { label: "My Classes", icon: "classes", path: "#/teacher/classes" },
      { label: "Live Classes", icon: "live", path: "#/teacher/live" },
      { label: "Lessons", icon: "lessons", path: "#/teacher/lessons" },
      { label: "Assignments", icon: "assignments", path: "#/teacher/assignments" },
      { label: "Submissions", icon: "submissions", path: "#/teacher/submissions" },
      { label: "Attendance", icon: "attendance", path: "#/teacher/attendance" },
      { label: "Student Progress", icon: "progress", path: "#/teacher/progress" },
      { label: "Announcements", icon: "announcements", path: "#/teacher/announcements" },
    ],
    student: [
      { label: "Dashboard", icon: "dashboard", path: "#/student/dashboard" },
      { label: "My Classes", icon: "classes", path: "#/student/classes" },
      { label: "Live Classes", icon: "live", path: "#/student/live" },
      { label: "Lessons", icon: "lessons", path: "#/student/lessons" },
      { label: "Homework", icon: "homework", path: "#/student/homework" },
      { label: "Submitted Work", icon: "submissions", path: "#/student/submitted" },
      { label: "Grades / Feedback", icon: "grades", path: "#/student/grades" },
      { label: "Announcements", icon: "announcements", path: "#/student/announcements" },
      { label: "Calendar", icon: "calendar", path: "#/student/calendar" },
      { label: "Profile", icon: "profile", path: "#/student/profile" },
    ]
  };

  function currentUserLabel() {
    if (STATE.role === "admin") return { name: "Admin Office", sub: "Administrator" };
    if (STATE.role === "teacher") { const t = DEMO.teacherById(DEMO.CURRENT_TEACHER_ID); return { name: t.name, sub: t.department }; }
    const s = DEMO.studentById(DEMO.CURRENT_STUDENT_ID); return { name: s.name, sub: s.grade + " · " + DEMO.classById(s.classId).name };
  }

  /* ---------------------------------------------------------------------
     3. Shell render (sidebar, topbar) — re-rendered on role change
     --------------------------------------------------------------------- */
  function renderShell() {
    const items = NAV[STATE.role];
    $("#navList").innerHTML = items.map(i => `
      <a href="${i.path}" class="nav-item" data-path="${i.path}">${ICONS[i.icon] || ""}<span>${i.label}</span></a>
    `).join("");
    $("#sidebarRoleBadge").textContent = STATE.role[0].toUpperCase() + STATE.role.slice(1) + " View";

    $$(".role-opt").forEach(b => b.classList.toggle("active", b.dataset.role === STATE.role));

    const u = currentUserLabel();
    $("#userChip").innerHTML = `<div class="avatar">${initials(u.name)}</div><span class="uname">${esc(u.name)}</span>`;

    renderNotifications();
  }

  function renderNotifications() {
    const unread = STATE.notifications.filter(n => !n.read).length;
    $("#notifDot").classList.toggle("show", unread > 0);
    $("#notifPanel").innerHTML = `
      <div class="notif-panel-header">Notifications</div>
      ${STATE.notifications.slice(0, 8).map(n => `
        <div class="notif-item ${n.read ? "read" : ""}">
          <span class="n-dot"></span>
          <div><div>${esc(n.text)}</div><small>${esc(n.time)}</small></div>
        </div>`).join("") || `<div class="empty-state">No notifications</div>`}
    `;
  }

  function highlightActiveNav() {
    const hash = location.hash || items0path();
    $$(".nav-item").forEach(a => a.classList.toggle("active", hash.indexOf(a.dataset.path) === 0));
  }
  function items0path() { return "#/" + STATE.role + "/dashboard"; }

  /* ---------------------------------------------------------------------
     4. Router
     --------------------------------------------------------------------- */
  const routes = []; // {pattern: RegExp, keys: [...], handler}

  function route(pattern, handler) {
    const keys = [];
    const rx = new RegExp("^" + pattern.replace(/:[^/]+/g, (m) => { keys.push(m.slice(1)); return "([^/]+)"; }) + "$");
    routes.push({ rx, keys, handler });
  }

  function navigate() {
    let hash = location.hash;
    if (!hash || hash === "#" || hash === "#/") hash = items0path();
    // keep role in sync with the URL's namespace (admin/teacher/student) when possible
    const seg = hash.replace("#/", "").split("/")[0];
    if (["admin", "teacher", "student"].includes(seg)) STATE.role = seg;

    renderShell();

    for (const r of routes) {
      const m = hash.match(r.rx);
      if (m) {
        const params = {};
        r.keys.forEach((k, i) => params[k] = decodeURIComponent(m[i + 1]));
        try {
          $("#view").innerHTML = "";
          const out = r.handler(params);
          if (typeof out === "string") $("#view").innerHTML = out;
          else if (out instanceof Node) $("#view").appendChild(out);
        } catch (err) {
          console.error(err);
          $("#view").innerHTML = notFoundView("Something went wrong rendering this page.");
        }
        highlightActiveNav();
        window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
        closeSidebarMobile();
        return;
      }
    }
    $("#view").innerHTML = notFoundView("Page not found.");
  }

  function notFoundView(msg) {
    return `<div class="empty-state" style="padding:80px 20px;"><div class="e-icon">🔍</div><h3>${esc(msg)}</h3><p class="text-muted" style="margin-top:6px;">Use the sidebar to navigate the demo.</p></div>`;
  }

  window.addEventListener("hashchange", navigate);

  /* ---------------------------------------------------------------------
     5. Global chrome interactions (role switch, sidebar, search, notif)
     --------------------------------------------------------------------- */
  function switchRole(role) {
    STATE.role = role;
    persist();
    location.hash = items0path();
    navigate();
  }

  $("#roleSwitch").addEventListener("click", (e) => {
    const b = e.target.closest(".role-opt");
    if (b) switchRole(b.dataset.role);
  });

  $("#menuToggle").addEventListener("click", () => {
    $("#sidebar").classList.add("open");
    $("#sidebarOverlay").classList.add("show");
  });
  $("#sidebarOverlay").addEventListener("click", closeSidebarMobile);
  function closeSidebarMobile() { $("#sidebar").classList.remove("open"); $("#sidebarOverlay").classList.remove("show"); }

  $("#notifBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    $("#notifPanel").classList.toggle("open");
    if ($("#notifPanel").classList.contains("open")) {
      STATE.notifications.forEach(n => n.read = true);
      persist();
      renderNotifications();
      $("#notifPanel").classList.add("open");
    }
  });
  document.addEventListener("click", () => { $("#notifPanel").classList.remove("open"); $("#searchResults").classList.remove("open"); });

  /* ---- Global search ---- */
  $("#globalSearch").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const box = $("#searchResults");
    if (!q) { box.classList.remove("open"); return; }
    const results = [];
    DEMO.STUDENTS.filter(s => s.name.toLowerCase().includes(q)).slice(0, 4).forEach(s => results.push({ group: "Students", label: s.name, sub: s.grade + " · " + DEMO.classById(s.classId).name, path: `#/admin/students/${s.id}` }));
    DEMO.TEACHERS.filter(t => t.name.toLowerCase().includes(q)).slice(0, 4).forEach(t => results.push({ group: "Teachers", label: t.name, sub: t.department, path: `#/admin/teachers/${t.id}` }));
    DEMO.CLASSES.filter(c => c.name.toLowerCase().includes(q)).slice(0, 4).forEach(c => results.push({ group: "Classes", label: c.name, sub: c.grade, path: `#/admin/classes/${c.id}` }));
    DEMO.SUBJECTS.filter(s => s.name.toLowerCase().includes(q)).slice(0, 4).forEach(s => results.push({ group: "Subjects", label: s.name, sub: "Subject", path: `#/admin/subjects` }));
    STATE.assignments.filter(a => a.title.toLowerCase().includes(q)).slice(0, 4).forEach(a => results.push({ group: "Assignments", label: a.title, sub: a.subject + " · " + DEMO.classById(a.classId).name, path: `#/teacher/assignments/${a.id}` }));

    if (!results.length) { box.innerHTML = `<div class="search-empty">No results for "${esc(q)}"</div>`; box.classList.add("open"); return; }
    let html = "";
    let lastGroup = null;
    results.forEach(r => {
      if (r.group !== lastGroup) { html += `<div class="search-result-group-label">${r.group}</div>`; lastGroup = r.group; }
      html += `<div class="search-result-item" data-path="${r.path}"><strong>${esc(r.label)}</strong><small>${esc(r.sub)}</small></div>`;
    });
    box.innerHTML = html;
    box.classList.add("open");
  });
  $("#searchResults").addEventListener("click", (e) => {
    const item = e.target.closest(".search-result-item");
    if (item) { location.hash = item.dataset.path; $("#globalSearch").value = ""; $("#searchResults").classList.remove("open"); }
  });
  $("#globalSearch").addEventListener("click", (e) => e.stopPropagation());

  /* Expose small utility namespace used by view modules appended below */
  window.APP = {
    STATE, persist, logActivity, pushNotification, nowStr,
    el, $, $$, esc, initials, statusBadge, typeBadge, fmtDate, toast, openModal, closeModal, route, navigate
  };

})();
