/* ==========================================================================
   Dandelion International Academy of Education — School System Demo
   App shell: state, router, sidebar/topbar chrome, and all module views.
   Frontend-only simulation. Data resets via Settings > System Preferences.
   ========================================================================== */

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const NAV = [
  { key: "dashboard", label: "nav_dashboard", icon: "dashboard", section: "nav_section_main", perm: "Dashboard" },
  { key: "students", label: "nav_students", icon: "students", section: "nav_section_people", perm: "Students" },
  { key: "enrollment", label: "nav_enrollment", icon: "enrollment", section: "nav_section_people", perm: "Enrollment" },
  { key: "classes", label: "nav_classes", icon: "classes", section: "nav_section_people", perm: "Classes" },
  { key: "attendance", label: "nav_attendance", icon: "attendance", section: "nav_section_people", perm: "Attendance" },
  { key: "academic", label: "nav_academic", icon: "academic", section: "nav_section_people", perm: "Academic Records" },
  { key: "payments", label: "nav_payments", icon: "payments", section: "nav_section_ops", perm: "Payments" },
  { key: "staff", label: "nav_staff", icon: "staff", section: "nav_section_ops", perm: "Staff" },
  { key: "leave", label: "nav_leave", icon: "leave", section: "nav_section_ops", perm: "Leave & Approvals" },
  { key: "announcements", label: "nav_announcements", icon: "announcements", section: "nav_section_ops", perm: "Announcements" },
  { key: "reports", label: "nav_reports", icon: "reports", section: "nav_section_ops", perm: "Reports" },
  { key: "users", label: "nav_users", icon: "users", section: "nav_section_system", perm: "Users & Roles" },
  { key: "activity", label: "nav_activity", icon: "activity", section: "nav_section_system", perm: "Activity Log" },
  { key: "settings", label: "nav_settings", icon: "settings", section: "nav_section_system", perm: "Settings" },
];

const STATE = {
  role: "director",
  lang: "en",
  route: "dashboard",
  params: [],
  collapsed: false,
  data: null,
};

function loadState() {
  let role = "director", lang = "en";
  try { role = localStorage.getItem("dandelion_role") || "director"; } catch (e) {}
  try { lang = localStorage.getItem("dandelion_lang") || "en"; } catch (e) {}
  STATE.role = role;
  STATE.lang = lang;
  CURRENT_LANG = lang;

  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("dandelion_data") || "null"); } catch (e) {}
  STATE.data = saved || {
    students: clone(STUDENTS),
    enrollments: clone(ENROLLMENTS),
    payments: clone(PAYMENTS),
    staff: clone(STAFF),
    classes: clone(CLASSES),
    leaveRequests: clone(LEAVE_REQUESTS),
    academicRecords: clone(ACADEMIC_RECORDS),
    announcements: clone(ANNOUNCEMENTS),
    activityLog: clone(ACTIVITY_LOG),
    studentAttendance: clone(STUDENT_ATTENDANCE_TODAY),
    staffAttendance: clone(STAFF_ATTENDANCE_TODAY),
  };
}
function clone(x) { return JSON.parse(JSON.stringify(x)); }
function persist() {
  try { localStorage.setItem("dandelion_data", JSON.stringify(STATE.data)); } catch (e) {}
}
function resetDemoData() {
  try { localStorage.removeItem("dandelion_data"); } catch (e) {}
  loadState();
  renderRoute();
  toast("Demo data reset to original sample values.");
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function money(n) { return "$" + Number(n || 0).toFixed(2).replace(/\.00$/, ""); }
function moneyFull(n) { return "$" + Number(n || 0).toFixed(2); }
function initials(name) { return (name || "").split(" ").filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase(); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function studentById(id) { return STATE.data.students.find(s => s.id === id); }
function staffById(id) { return STATE.data.staff.find(s => s.id === id); }
function classByCode(code) { return STATE.data.classes.find(c => c.code === code); }

function chip(status) {
  const map = {
    Active: "green", Paid: "green", Approved: "green", Present: "green", Confirmed: "green", Published: "green", Full: "green",
    "Partially Paid": "amber", Pending: "amber", Late: "amber", "Pending Review": "amber", "On Leave": "amber", Draft: "gray",
    Unpaid: "red", Overdue: "red", Rejected: "red", Absent: "red", Inactive: "gray",
    Excused: "blue", View: "blue", Manage: "blue", Assigned: "blue",
  };
  const c = map[status] || "gray";
  return `<span class="chip chip-${c}">${esc(status)}</span>`;
}

function toast(msg) {
  const wrap = document.getElementById("toastWrap");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `${icon("check")}<span>${esc(msg)}</span>`;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 300); }, 3000);
}

function logActivity(module, action, details) {
  const roleLabel = (ROLE_PERMISSIONS[STATE.role] || {}).label || STATE.role;
  const userLabel = (DEMO_USERS.find(u => u.role === STATE.role) || {}).name || "User";
  STATE.data.activityLog.unshift({
    time: TODAY + " " + new Date().toTimeString().slice(0, 5),
    user: userLabel, role: roleLabel, module, action, details,
  });
}

function openModal(title, bodyHtml, opts) {
  opts = opts || {};
  document.getElementById("modalBox").innerHTML = `
    <div class="modal-head"><h3>${esc(title)}</h3><button class="modal-close" onclick="closeModal()">${icon("close")}</button></div>
    <div class="modal-body">${bodyHtml}</div>
  `;
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal() { document.getElementById("modalOverlay").classList.remove("open"); }

function exportCSV(filename, headers, rows) {
  const esc2 = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
  const lines = [headers.map(esc2).join(","), ...rows.map(r => r.map(esc2).join(","))];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Exported " + filename);
}

function can(permKey) {
  const perms = (ROLE_PERMISSIONS[STATE.role] || {}).modules || {};
  const v = perms[permKey];
  return v && v !== "—";
}
function isApprover() { return STATE.role === "director" || STATE.role === "hr"; }

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------
function navigate(hash) { window.location.hash = hash; }

function parseHash() {
  const raw = (window.location.hash || "#/dashboard").replace(/^#\/?/, "");
  const parts = raw.split("/").filter(Boolean);
  return { route: parts[0] || "dashboard", params: parts.slice(1) };
}

const RENDERERS = {
  dashboard: renderDashboard,
  students: renderStudents,
  enrollment: renderEnrollment,
  classes: renderClasses,
  attendance: renderAttendance,
  payments: renderPayments,
  staff: renderStaff,
  leave: renderLeave,
  academic: renderAcademic,
  announcements: renderAnnouncements,
  reports: renderReports,
  users: renderUsersRoles,
  activity: renderActivityLog,
  settings: renderSettings,
};

function renderRoute() {
  const { route, params } = parseHash();
  STATE.route = route; STATE.params = params;
  const navItem = NAV.find(n => n.key === route);
  if (navItem && !can(navItem.perm) && route !== "dashboard") {
    document.getElementById("contentRoot").innerHTML = accessDeniedView(navItem);
  } else {
    const fn = RENDERERS[route] || renderDashboard;
    document.getElementById("contentRoot").innerHTML = fn(params);
    bindProfileTabs();
  }
  buildSidebar();
  document.getElementById("appShell").classList.remove("mobile-open");
  window.scrollTo(0, 0);
}

function accessDeniedView(navItem) {
  return `<div class="empty-state card" style="padding:60px 20px;">${icon("empty")}<strong>Not available for this role</strong><p class="text-muted text-sm">${esc(t(navItem.label))} isn't part of the ${esc(ROLE_PERMISSIONS[STATE.role].label)} view in this demo. Switch roles from the profile menu to preview it.</p></div>`;
}

// ---------------------------------------------------------------------------
// Sidebar / Topbar chrome
// ---------------------------------------------------------------------------
function buildSidebar() {
  const sections = {};
  NAV.forEach(item => {
    if (!can(item.perm)) return;
    sections[item.section] = sections[item.section] || [];
    sections[item.section].push(item);
  });
  let html = "";
  Object.keys(sections).forEach(sec => {
    html += `<div class="nav-section-label">${esc(t(sec))}</div>`;
    sections[sec].forEach(item => {
      const active = STATE.route === item.key ? "active" : "";
      let badge = "";
      if (item.key === "leave") {
        const pending = STATE.data.leaveRequests.filter(r => r.status === "Pending").length;
        if (pending) badge = `<span class="nav-badge">${pending}</span>`;
      }
      if (item.key === "enrollment") {
        const pending = STATE.data.enrollments.filter(e => e.status === "Pending Review").length;
        if (pending) badge = `<span class="nav-badge">${pending}</span>`;
      }
      html += `<a class="nav-item ${active}" href="#/${item.key}">${icon(item.icon)}<span class="nav-label">${esc(t(item.label))}</span>${badge}</a>`;
    });
  });
  document.getElementById("sidebarNav").innerHTML = html;
  document.getElementById("collapseBtn").innerHTML = icon("collapse");
  document.getElementById("searchIcon").innerHTML = icon("search");
  document.getElementById("bellIcon").innerHTML = icon("bell");
  document.getElementById("chevIcon").innerHTML = icon("chevronDown");

  const user = DEMO_USERS.find(u => u.role === STATE.role) || DEMO_USERS[0];
  document.getElementById("profileAvatar").textContent = initials(user.name);
  document.getElementById("profileName").textContent = user.name;
  document.getElementById("profileRole").textContent = user.title;

  document.getElementById("topLangSwitch").querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.lang === STATE.lang));
}

function buildNotifPanel() {
  const items = NOTIFICATIONS.map(n => `
    <div class="notif-item" style="cursor:pointer" onclick="navigate('#/${n.route}');closePanels();">
      <div class="dot-ind"></div>
      <div><strong>${esc(n.title)}</strong><small>${esc(n.detail)}</small></div>
    </div>`).join("");
  document.getElementById("notifPanel").innerHTML = `
    <div class="notif-panel-head">${t("top_notifications")} <span class="count">${NOTIFICATIONS.length} new</span></div>
    ${items}
  `;
}

function buildProfilePanel() {
  const html = DEMO_USERS.map(u => `
    <div class="role-opt ${u.role === STATE.role ? "active" : ""}" onclick="switchRole('${u.role}')">
      ${icon(u.role === "director" ? "reports" : u.role === "admin" ? "enrollment" : u.role === "finance" ? "payments" : u.role === "teacher" ? "academic" : "staff")}
      <div><div>${esc(u.label)}</div><small class="text-muted" style="font-weight:500;">${esc(u.name)}</small></div>
    </div>`).join("");
  document.getElementById("profilePanel").innerHTML = `
    <div class="profile-panel-body">
      <div class="text-muted" style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; margin-bottom:8px;">Switch demo role</div>
      ${html}
    </div>
    <div class="profile-panel-note">Demo-only role switch — simulates what each user type would see. No password required.</div>
  `;
}

function switchRole(role) {
  STATE.role = role;
  try { localStorage.setItem("dandelion_role", role); } catch (e) {}
  closePanels();
  if (window.location.hash.replace(/^#\/?/, "").split("/")[0] !== "dashboard") navigate("#/dashboard");
  else renderRoute();
  toast("Switched to " + ROLE_PERMISSIONS[role].label + " view");
}

function closePanels() {
  document.getElementById("notifPanel").classList.remove("open");
  document.getElementById("profilePanel").classList.remove("open");
  document.getElementById("searchResults").classList.remove("open");
}

function setLang(lang) {
  STATE.lang = lang; CURRENT_LANG = lang;
  try { localStorage.setItem("dandelion_lang", lang); } catch (e) {}
  renderRoute();
}

// Global search
function runSearch(qRaw) {
  const q = qRaw.trim().toLowerCase();
  const box = document.getElementById("searchResults");
  if (!q) { box.classList.remove("open"); box.innerHTML = ""; return; }
  let groups = [];

  const sMatches = STATE.data.students.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.phone.includes(q)).slice(0, 4);
  if (sMatches.length) groups.push({ label: "Students", items: sMatches.map(s => ({ title: s.name, sub: `${s.id} · ${s.class}`, href: `#/students/${s.id}` })) });

  const stMatches = STATE.data.staff.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)).slice(0, 4);
  if (stMatches.length) groups.push({ label: "Staff", items: stMatches.map(s => ({ title: s.name, sub: `${s.id} · ${s.role}`, href: `#/staff/${s.id}` })) });

  const pMatches = STATE.data.payments.filter(p => p.receipt.toLowerCase().includes(q)).slice(0, 4);
  if (pMatches.length) groups.push({ label: "Receipts", items: pMatches.map(p => ({ title: p.receipt, sub: `${studentById(p.studentId) ? studentById(p.studentId).name : p.studentId} · ${p.status}`, href: `#/payments/receipt/${p.receipt}` })) });

  if (!groups.length) { box.innerHTML = `<div class="sr-empty">No matches for "${esc(qRaw)}"</div>`; box.classList.add("open"); return; }
  box.innerHTML = groups.map(g => `<div class="sr-group-label">${esc(g.label)}</div>` + g.items.map(it => `<div class="sr-item" onclick="navigate('${it.href}');closePanels();document.getElementById('globalSearch').value='';">
      <strong>${esc(it.title)}</strong><small>${esc(it.sub)}</small></div>`).join("")).join("");
  box.classList.add("open");
}

// ---------------------------------------------------------------------------
// Shared UI fragments
// ---------------------------------------------------------------------------
function pageHead(title, subtitle, actionsHtml, breadcrumb) {
  return `
    ${breadcrumb ? `<div class="breadcrumb">${breadcrumb}</div>` : ""}
    <div class="page-head">
      <div><h1>${esc(title)}</h1>${subtitle ? `<p class="subtitle">${esc(subtitle)}</p>` : ""}</div>
      <div class="page-head-actions">${actionsHtml || ""}</div>
    </div>`;
}

function kpiCard(iconName, label, value, trend, trendType) {
  return `<div class="kpi-card">
    <div class="kpi-icon">${icon(iconName)}</div>
    ${trend ? `<div class="kpi-trend ${trendType || "up"}">${esc(trend)}</div>` : ""}
    <div class="kpi-value">${esc(value)}</div>
    <div class="kpi-label">${esc(label)}</div>
  </div>`;
}

function emptyState(msg, sub) {
  return `<div class="empty-state">${icon("empty")}<strong>${esc(msg)}</strong>${sub ? `<p class="text-sm">${esc(sub)}</p>` : ""}</div>`;
}

// ==========================================================================
// DASHBOARD
// ==========================================================================
function renderDashboard() {
  const totalStudents = STATE.data.students.filter(s => s.status === "Active").length + 224; // demo scale factor
  const newEnroll = STATE.data.enrollments.filter(e => e.status !== "Rejected").length + 15;
  const activeClasses = STATE.data.classes.filter(c => c.status === "Active").length;
  const attToday = STATE.data.studentAttendance;
  const presentPct = Math.round((attToday.filter(a => a.status === "Present" || a.status === "Late").length / attToday.length) * 100);
  const outstanding = STATE.data.payments.filter(p => p.status !== "Paid").reduce((sum, p) => sum + (p.due - p.paid), 0) + 2380;
  const staffPresent = STATE.data.staffAttendance.filter(a => a.status === "Present" || a.status === "Late").length;
  const staffTotal = STATE.data.staff.length + 14;

  let kpis;
  if (STATE.role === "finance") {
    kpis = [
      kpiCard("payments", "Revenue Collected (Sept)", moneyFull(STATE.data.payments.reduce((s, p) => s + p.paid, 0)), "+8%", "up"),
      kpiCard("payments", "Outstanding Tuition", moneyFull(outstanding), null, "warn"),
      kpiCard("students", "Total Students", totalStudents, null),
      kpiCard("attendance", "Collection Rate", "82%", "+3%", "up"),
    ];
  } else if (STATE.role === "teacher") {
    const myClass = STATE.data.classes.find(c => c.teacher.includes((DEMO_USERS.find(u => u.role === "teacher") || {}).name.split(" ")[0])) || STATE.data.classes[2];
    kpis = [
      kpiCard("classes", "My Class", myClass.name, null),
      kpiCard("students", "Students in Class", STATE.data.students.filter(s => s.class === myClass.code).length, null),
      kpiCard("attendance", "Today's Attendance", presentPct + "%", null, presentPct > 90 ? "up" : "warn"),
      kpiCard("academic", "Records Logged", STATE.data.academicRecords.length, null),
    ];
  } else if (STATE.role === "hr") {
    kpis = [
      kpiCard("staff", "Staff Present Today", `${staffPresent} / ${staffTotal}`, null),
      kpiCard("leave", "Pending Leave Requests", STATE.data.leaveRequests.filter(r => r.status === "Pending").length, null, "warn"),
      kpiCard("staff", "Total Staff", staffTotal, null),
      kpiCard("attendance", "On-time Rate", "91%", "+1%", "up"),
    ];
  } else {
    kpis = [
      kpiCard("students", "Total Students", totalStudents, "+" + (STATE.data.enrollments.filter(e=>e.status==="Confirmed").length) + " this mo.", "up"),
      kpiCard("enrollment", "New Enrollments", newEnroll, "this month"),
      kpiCard("classes", "Active Classes", activeClasses, null),
      kpiCard("attendance", "Attendance Today", presentPct + "%", null, presentPct > 90 ? "up" : "warn"),
      kpiCard("payments", "Outstanding Tuition", moneyFull(outstanding), null, "warn"),
      kpiCard("staff", "Staff Present", `${staffPresent} / ${staffTotal}`, null),
    ];
  }

  const recentEnrollments = STATE.data.enrollments.slice(0, 5);
  const recentPayments = clone(STATE.data.payments).reverse().slice(0, 5);
  const pendingApprovals = STATE.data.leaveRequests.filter(r => r.status === "Pending").slice(0, 4);
  const upcoming = STATE.data.announcements.filter(a => a.status === "Published").slice(0, 4);

  const attByClass = STATE.data.classes.map(c => {
    const rows = STATE.data.studentAttendance.filter(a => a.class === c.code);
    const present = rows.filter(r => r.status === "Present" || r.status === "Late").length;
    return { code: c.code, pct: rows.length ? Math.round((present / rows.length) * 100) : 100 };
  });

  return `
    ${pageHead(
      STATE.role === "director" ? "Director Overview" : ROLE_PERMISSIONS[STATE.role].label + " Dashboard",
      `${SCHOOL.name} · Academic Year ${SCHOOL.academicYear} · ${TODAY}`,
      `<button class="btn btn-outline" onclick="navigate('#/reports')">${icon("reports")} View Reports</button>`
    )}

    <div class="kpi-grid">${kpis.join("")}</div>

    <div class="dash-grid">
      <div class="card">
        <div class="card-head"><div><h3>Recent Enrollments</h3><p>Latest applications across all classes</p></div><a class="link-btn" href="#/enrollment">${t("top_view_all")}</a></div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Applicant</th><th>Program</th><th>Date</th><th>Status</th></tr></thead>
        <tbody>${recentEnrollments.map(e => `<tr><td class="cell-name">${esc(e.name)}</td><td>${esc(e.program)}</td><td>${esc(e.enrollDate)}</td><td>${chip(e.status)}</td></tr>`).join("")}</tbody></table></div>
      </div>

      <div class="card">
        <div class="card-head"><div><h3>Pending Approval Requests</h3><p>${pendingApprovals.length} awaiting action</p></div><a class="link-btn" href="#/leave">${t("top_view_all")}</a></div>
        <div class="card-body">
          ${pendingApprovals.length ? `<div class="list-simple">${pendingApprovals.map(r => `<div class="li-row"><div><div class="li-title">${esc(r.requester)}</div><div class="li-sub">${esc(r.type)} · ${esc(r.date)}</div></div>${chip(r.status)}</div>`).join("")}</div>` : emptyState("All caught up", "No pending approvals right now.")}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><div><h3>Tuition Collection Summary</h3><p>September 2026</p></div><a class="link-btn" href="#/payments">${t("top_view_all")}</a></div>
        <div class="card-body">
          <div class="bar-chart">
            ${["Week 1","Week 2","Week 3","Week 4"].map((w,i) => `<div class="bar-col"><div class="bar" style="height:${[62,78,54,40][i]}%"></div><div class="bar-label">${w}</div></div>`).join("")}
          </div>
          <div class="divider"></div>
          <div class="flex-between"><span class="text-sm text-muted">Collected</span><strong>${moneyFull(STATE.data.payments.reduce((s,p)=>s+p.paid,0))}</strong></div>
          <div class="flex-between"><span class="text-sm text-muted">Outstanding</span><strong style="color:var(--color-danger)">${moneyFull(outstanding)}</strong></div>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><div><h3>Attendance Summary</h3><p>By class, today</p></div><a class="link-btn" href="#/attendance">${t("top_view_all")}</a></div>
        <div class="card-body"><div class="list-simple">
          ${attByClass.map(a => `<div class="li-row"><div class="li-title" style="min-width:60px;">${esc(a.code)}</div><div style="flex:1;"><div class="progress-bar"><div style="width:${a.pct}%"></div></div></div><strong style="width:36px;text-align:right;">${a.pct}%</strong></div>`).join("")}
        </div></div>
      </div>

      <div class="card dash-grid-full">
        <div class="card-head"><div><h3>Upcoming Events / Announcements</h3><p>Latest published updates</p></div><a class="link-btn" href="#/announcements">${t("top_view_all")}</a></div>
        <div class="card-body">
          <div class="two-col">
            ${upcoming.map(a => `<div class="card" style="box-shadow:none;"><div class="card-pad">
              <div class="flex-between"><strong style="font-size:13.5px;">${esc(a.title)}</strong>${chip(a.audience)}</div>
              <p class="text-sm text-muted" style="margin:6px 0 0;">${esc(a.message.slice(0,110))}${a.message.length>110?"…":""}</p>
              <div class="text-sm text-muted" style="margin-top:8px;">${esc(a.date)} · by ${esc(a.createdBy)}</div>
            </div></div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// STUDENTS
// ==========================================================================
function renderStudents(params) {
  if (params && params[0]) return renderStudentProfile(params[0]);

  const rows = STATE.data.students;
  return `
    ${pageHead("Students", `${rows.length} student records on file`, can("Students") === "Manage" || can("Students") ? `<button class="btn btn-primary" onclick="openNewStudentModal()">${icon("plus")}${t("btn_new_student")}</button>` : "")}
    <div class="card">
      <div class="table-toolbar">
        <div class="grow"><input type="text" id="stuFilterText" placeholder="Filter by name or ID..." style="width:100%;" oninput="filterStudentsTable()"></div>
        <select id="stuFilterClass" onchange="filterStudentsTable()"><option value="">All Classes</option>${STATE.data.classes.map(c => `<option value="${c.code}">${esc(c.name)}</option>`).join("")}</select>
        <select id="stuFilterStatus" onchange="filterStudentsTable()"><option value="">All Payment Status</option>${["Paid","Partially Paid","Unpaid","Overdue"].map(s=>`<option value="${s}">${s}</option>`).join("")}</select>
        <button class="btn btn-outline btn-sm" onclick="exportStudentsCSV()">${icon("download")} ${t("btn_export_csv")}</button>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Student</th><th>Gender</th><th>Class</th><th>Enrolled</th><th>Guardian</th><th>Phone</th><th>Status</th><th>Payment</th><th></th></tr></thead>
        <tbody id="studentsTbody">${studentRows(rows)}</tbody>
      </table></div>
      <div class="table-footer"><span id="stuCount">Showing ${rows.length} of ${rows.length} students</span></div>
    </div>
  `;
}
function studentRows(rows) {
  if (!rows.length) return `<tr><td colspan="9">${emptyState("No students match your filters")}</td></tr>`;
  return rows.map(s => `<tr>
    <td><div class="name-with-avatar"><div class="avatar-sm">${initials(s.name)}</div><div><div class="cell-name">${esc(s.name)}</div><div class="cell-sub">${esc(s.id)}</div></div></div></td>
    <td>${esc(s.gender)}</td>
    <td>${esc(classByCode(s.class) ? classByCode(s.class).name : s.class)}</td>
    <td>${esc(s.enrolled)}</td>
    <td>${esc(s.guardian)}</td>
    <td>${esc(s.phone)}</td>
    <td>${chip(s.status)}</td>
    <td>${chip(s.payment)}</td>
    <td class="row-actions"><button class="btn btn-outline btn-sm" onclick="navigate('#/students/${s.id}')">${t("btn_view")}</button></td>
  </tr>`).join("");
}
function filterStudentsTable() {
  const q = document.getElementById("stuFilterText").value.toLowerCase();
  const cls = document.getElementById("stuFilterClass").value;
  const status = document.getElementById("stuFilterStatus").value;
  const rows = STATE.data.students.filter(s =>
    (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)) &&
    (!cls || s.class === cls) && (!status || s.payment === status)
  );
  document.getElementById("studentsTbody").innerHTML = studentRows(rows);
  document.getElementById("stuCount").textContent = `Showing ${rows.length} of ${STATE.data.students.length} students`;
}
function exportStudentsCSV() {
  const headers = ["Student ID","Name","Gender","DOB","Class","Enrolled","Guardian","Phone","Status","Payment Status"];
  const rows = STATE.data.students.map(s => [s.id,s.name,s.gender,s.dob,s.class,s.enrolled,s.guardian,s.phone,s.status,s.payment]);
  exportCSV("students_export.csv", headers, rows);
}

function openNewStudentModal() {
  openModal("Add Student", `
    <div class="form-grid">
      <div class="form-field span-2"><label>Student Name</label><input id="nsName" placeholder="Full name"></div>
      <div class="form-field"><label>Gender</label><select id="nsGender"><option>Male</option><option>Female</option></select></div>
      <div class="form-field"><label>Date of Birth</label><input type="date" id="nsDob"></div>
      <div class="form-field"><label>Class / Grade</label><select id="nsClass">${STATE.data.classes.map(c=>`<option value="${c.code}">${esc(c.name)}</option>`).join("")}</select></div>
      <div class="form-field"><label>Enrollment Date</label><input type="date" id="nsEnroll" value="${TODAY}"></div>
      <div class="form-field span-2"><label>Parent / Guardian Name</label><input id="nsGuardian" placeholder="Full name"></div>
      <div class="form-field"><label>Phone</label><input id="nsPhone" placeholder="012 xxx xxx"></div>
      <div class="form-field"><label>Payment Status</label><select id="nsPayment"><option>Unpaid</option><option>Paid</option></select></div>
    </div>
    <div class="form-actions"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveNewStudent()">${icon("plus")} Add Student</button></div>
  `);
}
function saveNewStudent() {
  const name = document.getElementById("nsName").value.trim();
  if (!name) { toast("Please enter a student name."); return; }
  const id = "STU-2026-" + String(STATE.data.students.length + 1).padStart(3, "0");
  STATE.data.students.unshift({
    id, name, gender: document.getElementById("nsGender").value, dob: document.getElementById("nsDob").value || "2018-01-01",
    class: document.getElementById("nsClass").value, enrolled: document.getElementById("nsEnroll").value || TODAY,
    guardian: document.getElementById("nsGuardian").value || "—", guardianRel: "Guardian", phone: document.getElementById("nsPhone").value || "—",
    email: "—", address: "—", occupation: "—", status: "Active", payment: document.getElementById("nsPayment").value, nationality: "Cambodian", emergency: "—",
  });
  logActivity("Students", "Student Created", `Created student profile ${id} (${name}).`);
  persist(); closeModal(); toast("Student added successfully."); navigate("#/students/" + id);
}

function renderStudentProfile(id) {
  const s = studentById(id);
  if (!s) return emptyState("Student not found");
  const extra = studentExtra(id);
  const cls = classByCode(s.class);
  const payments = STATE.data.payments.filter(p => p.studentId === id);
  const records = STATE.data.academicRecords.filter(a => a.studentId === id);
  const attRow = STATE.data.studentAttendance.find(a => a.studentId === id);

  return `
    ${pageHead(s.name, s.id, `<button class="btn btn-outline" onclick="navigate('#/students')">${icon("arrowLeft")} ${t("btn_back")}</button><button class="btn btn-primary" onclick="toast('Edit form would open here in the full build.')">${t("btn_edit")}</button>`, `<a href="#/students">Students</a> / ${esc(s.name)}`)}

    <div class="card" style="margin-bottom:16px;">
      <div class="profile-header">
        <div class="avatar-lg">${initials(s.name)}</div>
        <div>
          <h2>${esc(s.name)}</h2>
          <div class="meta">${esc(cls ? cls.name : s.class)} · ${esc(s.gender)} · DOB ${esc(s.dob)}</div>
          <div class="meta-row">
            <span>${icon("phone")} ${esc(s.phone)}</span>
            <span>${icon("mail")} ${esc(s.email)}</span>
            <span>${icon("pin")} ${esc(s.address)}</span>
          </div>
        </div>
        <div style="margin-left:auto; display:flex; gap:8px;">${chip(s.status)}${chip(s.payment)}</div>
      </div>
    </div>

    <div class="tabs" id="stuTabs">
      <button class="tab-btn active" data-tab="overview">Overview</button>
      <button class="tab-btn" data-tab="attendance">Attendance</button>
      <button class="tab-btn" data-tab="payments">Payment History</button>
      <button class="tab-btn" data-tab="academic">Academic Record</button>
      <button class="tab-btn" data-tab="notes">Notes & Documents</button>
    </div>

    <div id="tab-overview" class="tab-pane">
      <div class="profile-layout">
        <div class="card"><div class="card-head"><h3>Parent / Guardian</h3></div><div class="card-body info-list">
          <div class="info-item"><label>Name</label><div>${esc(s.guardian)}</div></div>
          <div class="info-item"><label>Relationship</label><div>${esc(s.guardianRel)}</div></div>
          <div class="info-item"><label>Phone</label><div>${esc(s.phone)}</div></div>
          <div class="info-item"><label>Occupation</label><div>${esc(s.occupation)}</div></div>
          <div class="info-item"><label>Email</label><div>${esc(s.email)}</div></div>
          <div class="info-item"><label>Emergency Contact</label><div>${esc(s.emergency)}</div></div>
        </div></div>
        <div class="card"><div class="card-head"><h3>Enrollment History</h3></div><div class="card-body">
          <div class="timeline">${extra.history.map(h => `<div class="timeline-item"><strong>${esc(h.event)}</strong><span>${esc(h.date)}</span></div>`).join("")}</div>
        </div></div>
      </div>
    </div>

    <div id="tab-attendance" class="tab-pane" style="display:none;">
      <div class="card"><div class="card-head"><h3>Attendance Summary</h3><p>Current term</p></div><div class="card-body">
        <div class="two-col">
          <div><div class="text-sm text-muted">Today (${TODAY})</div>${attRow ? chip(attRow.status) : chip("Present")}</div>
          <div>
            <div class="text-sm text-muted" style="margin-bottom:6px;">Term attendance rate</div>
            <div class="progress-bar"><div style="width:93%"></div></div>
            <div class="text-sm" style="margin-top:4px;">93% present · 4% late · 3% absent</div>
          </div>
        </div>
      </div></div>
    </div>

    <div id="tab-payments" class="tab-pane" style="display:none;">
      <div class="card"><div class="card-head"><h3>Payment History</h3></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Receipt</th><th>Term</th><th>Fee Type</th><th class="num">Due</th><th class="num">Paid</th><th>Status</th><th></th></tr></thead>
      <tbody>${payments.length ? payments.map(p => `<tr><td class="cell-name">${esc(p.receipt)}</td><td>${esc(p.term)}</td><td>${esc(p.feeType)}</td><td class="num">${money(p.due)}</td><td class="num">${money(p.paid)}</td><td>${chip(p.status)}</td><td><button class="btn btn-outline btn-sm" onclick="navigate('#/payments/receipt/${p.receipt}')">${t("btn_view_receipt")}</button></td></tr>`).join("") : `<tr><td colspan="7">${emptyState("No payment records yet")}</td></tr>`}</tbody></table></div>
      </div>
    </div>

    <div id="tab-academic" class="tab-pane" style="display:none;">
      <div class="card"><div class="card-head"><h3>Academic Record</h3></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Subject</th><th>Term</th><th class="num">Score</th><th>Grade</th><th>Teacher Comment</th></tr></thead>
      <tbody>${records.length ? records.map(r => `<tr><td class="cell-name">${esc(r.subject)}</td><td>${esc(r.term)}</td><td class="num">${r.score}</td><td>${chip("Confirmed").replace("Confirmed", r.grade)}</td><td class="text-sm">${esc(r.comment)}</td></tr>`).join("") : `<tr><td colspan="5">${emptyState("No academic records yet")}</td></tr>`}</tbody></table></div>
      </div>
    </div>

    <div id="tab-notes" class="tab-pane" style="display:none;">
      <div class="two-col">
        <div class="card"><div class="card-head"><h3>Notes</h3></div><div class="card-body"><p class="text-sm">${esc(extra.notes)}</p></div></div>
        <div class="card"><div class="card-head"><h3>Documents</h3></div><div class="card-body">
          ${extra.documents.map(d => `<div class="doc-item">${icon("doc")}<div style="flex:1;"><div>${esc(d.name)}</div><div class="doc-meta">Uploaded ${esc(d.date)}</div></div><button class="btn btn-outline btn-sm">${icon("download")}</button></div>`).join("")}
        </div></div>
      </div>
    </div>
  `;
}
function bindProfileTabs() {
  const tabs = document.getElementById("stuTabs") || document.getElementById("classTabs");
  if (!tabs) return;
  tabs.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      tabs.parentElement.querySelectorAll(".tab-pane").forEach(p => p.style.display = "none");
      const pane = document.getElementById("tab-" + btn.dataset.tab);
      if (pane) pane.style.display = "";
    });
  });
}

// ==========================================================================
// ENROLLMENT
// ==========================================================================
function renderEnrollment(params) {
  if (params && params[0] === "new") return renderEnrollmentForm();
  const rows = STATE.data.enrollments;
  return `
    ${pageHead("Enrollment", `${rows.length} applications this cycle`, `<button class="btn btn-primary" onclick="navigate('#/enrollment/new')">${icon("plus")}${t("btn_new_enrollment")}</button>`)}
    <div class="card">
      <div class="table-toolbar">
        <div class="grow"><input type="text" id="enrFilterText" placeholder="Search applicant name..." style="width:100%;" oninput="filterEnrollTable()"></div>
        <select id="enrFilterStatus" onchange="filterEnrollTable()"><option value="">All Status</option>${["Draft","Pending Review","Confirmed","Rejected"].map(s=>`<option>${s}</option>`).join("")}</select>
        <button class="btn btn-outline btn-sm" onclick="exportEnrollCSV()">${icon("download")} ${t("btn_export_csv")}</button>
      </div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Applicant</th><th>Program</th><th>Guardian</th><th>Phone</th><th>Date</th><th>Status</th><th></th></tr></thead>
      <tbody id="enrollTbody">${enrollRows(rows)}</tbody></table></div>
      <div class="table-footer"><span id="enrCount">Showing ${rows.length} of ${rows.length}</span></div>
    </div>
  `;
}
function enrollRows(rows) {
  if (!rows.length) return `<tr><td colspan="7">${emptyState("No applications match your filters")}</td></tr>`;
  return rows.map(e => `<tr>
    <td><div class="name-with-avatar"><div class="avatar-sm">${initials(e.name)}</div><div><div class="cell-name">${esc(e.name)}</div><div class="cell-sub">${esc(e.id)}</div></div></div></td>
    <td>${esc(e.program)}</td><td>${esc(e.guardian)}</td><td>${esc(e.phone)}</td><td>${esc(e.enrollDate)}</td><td>${chip(e.status)}</td>
    <td class="row-actions"><button class="btn btn-outline btn-sm" onclick="openEnrollmentView('${e.id}')">${t("btn_view")}</button></td>
  </tr>`).join("");
}
function filterEnrollTable() {
  const q = document.getElementById("enrFilterText").value.toLowerCase();
  const status = document.getElementById("enrFilterStatus").value;
  const rows = STATE.data.enrollments.filter(e => (!q || e.name.toLowerCase().includes(q)) && (!status || e.status === status));
  document.getElementById("enrollTbody").innerHTML = enrollRows(rows);
  document.getElementById("enrCount").textContent = `Showing ${rows.length} of ${STATE.data.enrollments.length}`;
}
function exportEnrollCSV() {
  const headers = ["ID","Name","Gender","DOB","Program","Guardian","Phone","Enrollment Date","Status"];
  const rows = STATE.data.enrollments.map(e => [e.id,e.name,e.gender,e.dob,e.program,e.guardian,e.phone,e.enrollDate,e.status]);
  exportCSV("enrollment_export.csv", headers, rows);
}
function openEnrollmentView(id) {
  const e = STATE.data.enrollments.find(x => x.id === id);
  openModal(e.name + " — " + e.id, `
    <div class="info-list">
      <div class="info-item"><label>Gender</label><div>${esc(e.gender)}</div></div>
      <div class="info-item"><label>Date of Birth</label><div>${esc(e.dob)}</div></div>
      <div class="info-item"><label>Nationality</label><div>${esc(e.nationality)}</div></div>
      <div class="info-item"><label>Program / Grade</label><div>${esc(e.program)}</div></div>
      <div class="info-item"><label>Guardian</label><div>${esc(e.guardian)}</div></div>
      <div class="info-item"><label>Phone</label><div>${esc(e.phone)}</div></div>
      <div class="info-item"><label>Email</label><div>${esc(e.email)}</div></div>
      <div class="info-item"><label>Address</label><div>${esc(e.address)}</div></div>
      <div class="info-item"><label>Previous School</label><div>${esc(e.prevSchool)}</div></div>
      <div class="info-item"><label>Medical Notes</label><div>${esc(e.medical)}</div></div>
      <div class="info-item"><label>Emergency Contact</label><div>${esc(e.emergency)}</div></div>
      <div class="info-item"><label>Status</label><div>${chip(e.status)}</div></div>
    </div>
    ${e.status === "Pending Review" ? `<div class="form-actions"><button class="btn btn-danger-soft" onclick="setEnrollStatus('${e.id}','Rejected')">Reject</button><button class="btn btn-primary" onclick="confirmEnrollment('${e.id}')">${t("btn_confirm")}</button></div>` : ""}
  `);
}
function setEnrollStatus(id, status) {
  const e = STATE.data.enrollments.find(x => x.id === id);
  e.status = status;
  logActivity("Enrollment", "Enrollment " + status, `${status} application ${id} (${e.name}).`);
  persist(); closeModal(); renderRoute(); toast("Application marked " + status + ".");
}
function confirmEnrollment(id) {
  const e = STATE.data.enrollments.find(x => x.id === id);
  e.status = "Confirmed";
  const classMap = { "Kindergarten 1": "KG1-A", "Kindergarten 2": "KG2-A", "Grade 1": "G1-A", "Grade 2": "G2-A", "Grade 3": "G3-A", "Grade 4": "G4-A", "Grade 5": "G5-A", "Grade 6": "G6-A" };
  const newId = "STU-2026-" + String(STATE.data.students.length + 1).padStart(3, "0");
  STATE.data.students.unshift({
    id: newId, name: e.name, gender: e.gender, dob: e.dob, class: classMap[e.program] || "G1-A", enrolled: e.enrollDate,
    guardian: e.guardian, guardianRel: "Guardian", phone: e.phone, email: e.email, address: e.address, occupation: "—",
    status: "Active", payment: "Unpaid", nationality: e.nationality, emergency: e.emergency,
  });
  logActivity("Enrollment", "Enrollment Confirmed", `Confirmed enrollment ${id} (${e.name}) into ${e.program}, created student ${newId}.`);
  persist(); closeModal(); renderRoute(); toast("Enrollment confirmed — student profile " + newId + " created.");
}

function renderEnrollmentForm() {
  return `
    ${pageHead("New Enrollment", "Create a new student application", `<button class="btn btn-outline" onclick="navigate('#/enrollment')">${icon("arrowLeft")} ${t("btn_back")}</button>`, `<a href="#/enrollment">Enrollment</a> / New`)}
    <div class="step-tracker">
      <div class="step done"><div class="step-num">${icon("check")}</div>Student Info</div><div class="step-sep"></div>
      <div class="step current"><div class="step-num">2</div>Guardian & Contact</div><div class="step-sep"></div>
      <div class="step"><div class="step-num">3</div>Program & Documents</div>
    </div>
    <div class="card"><div class="card-body">
      <div class="form-section-title">Student Information</div>
      <div class="form-grid">
        <div class="form-field span-2"><label>Student Name</label><input id="enName" placeholder="Full name"></div>
        <div class="form-field"><label>Gender</label><select id="enGender"><option>Male</option><option>Female</option></select></div>
        <div class="form-field"><label>Date of Birth</label><input type="date" id="enDob"></div>
        <div class="form-field"><label>Nationality</label><input id="enNat" value="Cambodian"></div>
        <div class="form-field"><label>Previous School <span class="opt">(optional)</span></label><input id="enPrev" placeholder="—"></div>
      </div>

      <div class="form-section-title">Parent / Guardian</div>
      <div class="form-grid">
        <div class="form-field span-2"><label>Guardian Name</label><input id="enGuardian" placeholder="Full name"></div>
        <div class="form-field"><label>Phone</label><input id="enPhone" placeholder="012 xxx xxx"></div>
        <div class="form-field"><label>Email</label><input id="enEmail" placeholder="name@example.com"></div>
        <div class="form-field span-2"><label>Address</label><input id="enAddr" placeholder="Street, Sangkat, Khan"></div>
        <div class="form-field span-2"><label>Emergency Contact</label><input id="enEmerg" placeholder="Name — phone number"></div>
      </div>

      <div class="form-section-title">Program & Enrollment</div>
      <div class="form-grid">
        <div class="form-field"><label>Program / Grade</label><select id="enProgram">${CLASSES.map(c=>`<option>${c.grade}</option>`).join("")}</select></div>
        <div class="form-field"><label>Academic Year</label><input id="enYear" value="${SCHOOL.academicYear}"></div>
        <div class="form-field"><label>Enrollment Date</label><input type="date" id="enDate" value="${TODAY}"></div>
        <div class="form-field span-2"><label>Medical Notes <span class="opt">(optional)</span></label><textarea id="enMedical" placeholder="Allergies, conditions, medication..."></textarea></div>
        <div class="form-field span-3"><label>Documents</label><div class="form-upload">${icon("upload")}<div>Birth certificate, photo, previous report card (demo only — no upload processed)</div></div></div>
      </div>

      <div class="form-actions">
        <button class="btn btn-outline" onclick="saveEnrollment('Draft')">${t("btn_save_draft")}</button>
        <button class="btn btn-primary" onclick="saveEnrollment('Pending Review')">Submit for Review</button>
      </div>
    </div></div>
  `;
}
function saveEnrollment(status) {
  const name = document.getElementById("enName").value.trim();
  if (!name) { toast("Please enter the student's name."); return; }
  const id = "ENR-2026-0" + (46 + STATE.data.enrollments.length);
  STATE.data.enrollments.unshift({
    id, name, gender: document.getElementById("enGender").value, dob: document.getElementById("enDob").value || "2018-01-01",
    nationality: document.getElementById("enNat").value || "Cambodian", guardian: document.getElementById("enGuardian").value || "—",
    phone: document.getElementById("enPhone").value || "—", email: document.getElementById("enEmail").value || "—",
    address: document.getElementById("enAddr").value || "—", program: document.getElementById("enProgram").value,
    year: document.getElementById("enYear").value, enrollDate: document.getElementById("enDate").value || TODAY,
    prevSchool: document.getElementById("enPrev").value || "—", medical: document.getElementById("enMedical").value || "—",
    emergency: document.getElementById("enEmerg").value || "—", status,
  });
  logActivity("Enrollment", status === "Draft" ? "Enrollment Draft Saved" : "Enrollment Submitted", `${name} — ${status}.`);
  persist();
  toast(status === "Draft" ? "Saved as draft." : "Application submitted for review.");
  navigate("#/enrollment");
}

// ==========================================================================
// CLASSES
// ==========================================================================
function renderClasses(params) {
  if (params && params[0]) return renderClassView(params[0]);
  const rows = STATE.data.classes;
  return `
    ${pageHead("Classes", `${rows.length} active classes · ${SCHOOL.academicYear}`, can("Classes") ? `<button class="btn btn-primary" onclick="toast('Add Class form would open here in the full build.')">${icon("plus")}${t("btn_new_class")}</button>` : "")}
    <div class="card"><div class="table-wrap"><table class="data-table">
      <thead><tr><th>Class</th><th>Grade</th><th>Homeroom Teacher</th><th>Room</th><th class="num">Students</th><th>Schedule</th><th>Status</th><th></th></tr></thead>
      <tbody>${rows.map(c => {
        const count = STATE.data.students.filter(s => s.class === c.code).length;
        return `<tr><td class="cell-name">${esc(c.name)}<div class="cell-sub">${esc(c.code)}</div></td><td>${esc(c.grade)}</td><td>${esc(c.teacher)}</td><td>${esc(c.room)}</td><td class="num">${count}</td><td class="text-sm">${esc(c.schedule)}</td><td>${chip(c.status)}</td><td><button class="btn btn-outline btn-sm" onclick="navigate('#/classes/${c.code}')">${t("btn_view")}</button></td></tr>`;
      }).join("")}</tbody>
    </table></div></div>
  `;
}
function renderClassView(code) {
  const c = classByCode(code);
  if (!c) return emptyState("Class not found");
  const students = STATE.data.students.filter(s => s.class === code);
  return `
    ${pageHead(c.name, `${c.grade} · ${SCHOOL.academicYear}`, `<button class="btn btn-outline" onclick="navigate('#/classes')">${icon("arrowLeft")} ${t("btn_back")}</button>`, `<a href="#/classes">Classes</a> / ${esc(c.name)}`)}
    <div class="card" style="margin-bottom:16px;"><div class="card-body info-list">
      <div class="info-item"><label>Class Code</label><div>${esc(c.code)}</div></div>
      <div class="info-item"><label>Homeroom Teacher</label><div>${esc(c.teacher)}</div></div>
      <div class="info-item"><label>Room</label><div>${esc(c.room)}</div></div>
      <div class="info-item"><label>Schedule</label><div>${esc(c.schedule)}</div></div>
      <div class="info-item"><label>Student Count</label><div>${students.length}</div></div>
      <div class="info-item"><label>Status</label><div>${chip(c.status)}</div></div>
    </div></div>

    <div class="tabs" id="classTabs">
      <button class="tab-btn active" data-tab="roster">Student List</button>
      <button class="tab-btn" data-tab="subjects">Subjects</button>
      <button class="tab-btn" data-tab="attendance">Attendance</button>
    </div>
    <div id="tab-roster" class="tab-pane"><div class="card"><div class="table-wrap"><table class="data-table">
      <thead><tr><th>Student</th><th>Gender</th><th>Guardian</th><th>Payment</th><th></th></tr></thead>
      <tbody>${students.map(s => `<tr><td><div class="name-with-avatar"><div class="avatar-sm">${initials(s.name)}</div>${esc(s.name)}</div></td><td>${esc(s.gender)}</td><td>${esc(s.guardian)}</td><td>${chip(s.payment)}</td><td><button class="btn btn-outline btn-sm" onclick="navigate('#/students/${s.id}')">${t("btn_view")}</button></td></tr>`).join("")}</tbody>
    </table></div></div></div>
    <div id="tab-subjects" class="tab-pane" style="display:none;"><div class="card card-pad"><div class="two-col">${SUBJECTS.map(s=>`<div class="li-row" style="border-bottom:1px solid var(--color-border); padding:10px 0;">${icon("academic")} <span style="margin-left:8px;">${esc(s)}</span></div>`).join("")}</div></div></div>
    <div id="tab-attendance" class="tab-pane" style="display:none;"><div class="card card-pad">
      ${emptyState("Open the Attendance module", "Use Attendance in the main menu to record or review this class's attendance in detail.")}
      <div style="text-align:center;"><button class="btn btn-primary" onclick="navigate('#/attendance')">${icon("attendance")} Go to Attendance</button></div>
    </div></div>
  `;
}

// ==========================================================================
// ATTENDANCE (students)
// ==========================================================================
function renderAttendance() {
  const classes = STATE.data.classes;
  return `
    ${pageHead("Student Attendance", `Today · ${TODAY}`, `<button class="btn btn-outline" onclick="markAllPresent()">${icon("check")} Mark All Present</button><button class="btn btn-primary" onclick="submitAttendance()">Submit Attendance</button>`)}
    <div class="card">
      <div class="table-toolbar">
        <input type="date" id="attDate" value="${TODAY}">
        <select id="attClass" onchange="filterAttendanceTable()"><option value="">All Classes</option>${classes.map(c=>`<option value="${c.code}">${esc(c.name)}</option>`).join("")}</select>
        <select id="attTeacher" onchange="filterAttendanceTable()"><option value="">All Teachers</option>${[...new Set(classes.map(c=>c.teacher))].map(t=>`<option>${esc(t)}</option>`).join("")}</select>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Student</th><th>Class</th><th>Present</th><th>Late</th><th>Absent</th><th>Excused</th></tr></thead>
        <tbody id="attTbody">${attendanceRows()}</tbody>
      </table></div>
      <div class="table-footer" id="attSummary"></div>
    </div>
  `;
}
function attendanceRows(filterClass, filterTeacher) {
  let rows = STATE.data.students.filter(s => s.status === "Active");
  if (filterClass) rows = rows.filter(s => s.class === filterClass);
  if (filterTeacher) rows = rows.filter(s => { const c = classByCode(s.class); return c && c.teacher === filterTeacher; });
  updateAttSummary(rows);
  return rows.map(s => {
    const rec = STATE.data.studentAttendance.find(a => a.studentId === s.id) || { status: "Present" };
    return `<tr>
      <td><div class="name-with-avatar"><div class="avatar-sm">${initials(s.name)}</div>${esc(s.name)}</div></td>
      <td>${esc(s.class)}</td>
      ${["Present","Late","Absent","Excused"].map(opt => `<td style="text-align:center;"><input type="radio" name="att-${s.id}" ${rec.status===opt?"checked":""} onchange="setAttendance('${s.id}','${opt}')"></td>`).join("")}
    </tr>`;
  }).join("");
}
function updateAttSummary(rows) {
  const total = rows.length;
  const present = rows.filter(s => { const r = STATE.data.studentAttendance.find(a=>a.studentId===s.id); return r && (r.status==="Present"); }).length;
  const el = document.getElementById("attSummary");
  if (el) el.innerHTML = `<span>${total} students</span><span>Present ${Math.round((present/(total||1))*100)}%</span>`;
}
function setAttendance(studentId, status) {
  let rec = STATE.data.studentAttendance.find(a => a.studentId === studentId);
  if (!rec) { rec = { studentId, class: studentById(studentId).class, status }; STATE.data.studentAttendance.push(rec); }
  else rec.status = status;
  persist();
}
function filterAttendanceTable() {
  document.getElementById("attTbody").innerHTML = attendanceRows(document.getElementById("attClass").value, document.getElementById("attTeacher").value);
}
function markAllPresent() {
  const cls = document.getElementById("attClass").value;
  STATE.data.students.filter(s => !cls || s.class === cls).forEach(s => setAttendance(s.id, "Present"));
  filterAttendanceTable();
  toast("Marked all visible students Present.");
}
function submitAttendance() {
  logActivity("Attendance", "Attendance Updated", `Submitted attendance for ${TODAY}.`);
  persist();
  toast("Attendance submitted for " + TODAY + ".");
}

// ==========================================================================
// PAYMENTS
// ==========================================================================
function renderPayments(params) {
  if (params && params[0] === "receipt" && params[1]) return renderReceipt(params[1]);
  const rows = STATE.data.payments;
  const totalCollected = rows.reduce((s,p)=>s+p.paid,0);
  const totalOutstanding = rows.reduce((s,p)=>s+(p.due-p.paid),0);
  return `
    ${pageHead("Payments & Tuition", `${SCHOOL.academicYear} · ${rows.length} records`, can("Payments") ? `<button class="btn btn-primary" onclick="openRecordPaymentModal()">${icon("plus")}${t("btn_record_payment")}</button>` : "")}
    <div class="kpi-grid" style="margin-bottom:16px;">
      ${kpiCard("payments","Total Collected", moneyFull(totalCollected))}
      ${kpiCard("payments","Outstanding Balance", moneyFull(totalOutstanding), null, "warn")}
      ${kpiCard("payments","Overdue Accounts", rows.filter(p=>p.status==="Overdue").length, null, "warn")}
      ${kpiCard("payments","Records This Month", rows.filter(p=>p.term.includes("September")).length)}
    </div>
    <div class="card">
      <div class="table-toolbar">
        <div class="grow"><input type="text" id="payFilterText" placeholder="Search student or receipt no..." style="width:100%;" oninput="filterPaymentsTable()"></div>
        <select id="payFilterStatus" onchange="filterPaymentsTable()"><option value="">All Status</option>${["Paid","Partially Paid","Unpaid","Overdue"].map(s=>`<option>${s}</option>`).join("")}</select>
        <select id="payFilterMethod" onchange="filterPaymentsTable()"><option value="">All Methods</option>${["Cash","ABA","ACLEDA","Bank Transfer","Other"].map(s=>`<option>${s}</option>`).join("")}</select>
        <button class="btn btn-outline btn-sm" onclick="exportPaymentsCSV()">${icon("download")} ${t("btn_export_csv")}</button>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Receipt No.</th><th>Student</th><th>Term</th><th>Fee Type</th><th class="num">Due</th><th class="num">Paid</th><th class="num">Balance</th><th>Method</th><th>Status</th><th></th></tr></thead>
        <tbody id="paymentsTbody">${paymentRows(rows)}</tbody>
      </table></div>
      <div class="table-footer"><span id="payCount">Showing ${rows.length} of ${rows.length}</span></div>
    </div>
  `;
}
function paymentRows(rows) {
  if (!rows.length) return `<tr><td colspan="10">${emptyState("No payments match your filters")}</td></tr>`;
  return rows.map(p => { const s = studentById(p.studentId);
    return `<tr>
    <td class="cell-name">${esc(p.receipt)}</td>
    <td>${s ? esc(s.name) : esc(p.studentId)}<div class="cell-sub">${esc(p.studentId)}</div></td>
    <td>${esc(p.term)}</td><td>${esc(p.feeType)}</td>
    <td class="num">${money(p.due)}</td><td class="num">${money(p.paid)}</td><td class="num">${money(p.due-p.paid)}</td>
    <td>${esc(p.method)}</td><td>${chip(p.status)}</td>
    <td class="row-actions"><button class="btn btn-outline btn-sm" onclick="navigate('#/payments/receipt/${p.receipt}')">${t("btn_view_receipt")}</button></td>
  </tr>`; }).join("");
}
function filterPaymentsTable() {
  const q = document.getElementById("payFilterText").value.toLowerCase();
  const status = document.getElementById("payFilterStatus").value;
  const method = document.getElementById("payFilterMethod").value;
  const rows = STATE.data.payments.filter(p => {
    const s = studentById(p.studentId);
    return (!q || p.receipt.toLowerCase().includes(q) || (s && s.name.toLowerCase().includes(q))) && (!status || p.status === status) && (!method || p.method === method);
  });
  document.getElementById("paymentsTbody").innerHTML = paymentRows(rows);
  document.getElementById("payCount").textContent = `Showing ${rows.length} of ${STATE.data.payments.length}`;
}
function exportPaymentsCSV() {
  const headers = ["Receipt No","Student ID","Student Name","Term","Fee Type","Due","Discount","Paid","Balance","Method","Status"];
  const rows = STATE.data.payments.map(p => { const s = studentById(p.studentId); return [p.receipt,p.studentId,s?s.name:"",p.term,p.feeType,p.due,p.discount,p.paid,(p.due-p.paid),p.method,p.status]; });
  exportCSV("payments_export.csv", headers, rows);
}
function openRecordPaymentModal() {
  openModal("Record Payment", `
    <div class="form-grid">
      <div class="form-field span-2"><label>Student</label><select id="rpStudent">${STATE.data.students.map(s=>`<option value="${s.id}">${esc(s.name)} (${s.id})</option>`).join("")}</select></div>
      <div class="form-field"><label>Fee Type</label><select id="rpFeeType">${FEE_TYPES.map(f=>`<option value="${f.name}" data-amt="${f.defaultAmount}">${f.name}</option>`).join("")}</select></div>
      <div class="form-field"><label>Term / Month</label><input id="rpTerm" value="September 2026"></div>
      <div class="form-field"><label>Amount Due</label><input type="number" id="rpDue" value="220"></div>
      <div class="form-field"><label>Discount</label><input type="number" id="rpDiscount" value="0"></div>
      <div class="form-field"><label>Amount Paid</label><input type="number" id="rpPaid" value="220"></div>
      <div class="form-field"><label>Payment Method</label><select id="rpMethod">${["Cash","ABA","ACLEDA","Bank Transfer","Other"].map(m=>`<option>${m}</option>`).join("")}</select></div>
    </div>
    <div class="form-actions"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveNewPayment()">${t("btn_record_payment")}</button></div>
  `);
}
function saveNewPayment() {
  const studentId = document.getElementById("rpStudent").value;
  const due = parseFloat(document.getElementById("rpDue").value) || 0;
  const discount = parseFloat(document.getElementById("rpDiscount").value) || 0;
  const paid = parseFloat(document.getElementById("rpPaid").value) || 0;
  const receipt = "RCT-2026-" + (1019 + STATE.data.payments.length);
  const status = paid >= (due - discount) ? "Paid" : (paid > 0 ? "Partially Paid" : "Unpaid");
  STATE.data.payments.unshift({ receipt, studentId, term: document.getElementById("rpTerm").value, feeType: document.getElementById("rpFeeType").value, due, discount, paid, date: TODAY, method: document.getElementById("rpMethod").value, status });
  const s = studentById(studentId);
  if (s && status === "Paid") s.payment = "Paid"; else if (s) s.payment = status;
  logActivity("Payments", "Payment Recorded", `Recorded ${receipt} — ${moneyFull(paid)} for ${s ? s.name : studentId}.`);
  persist(); closeModal(); toast("Payment recorded."); navigate("#/payments/receipt/" + receipt);
}
function renderReceipt(receiptNo) {
  const p = STATE.data.payments.find(x => x.receipt === receiptNo);
  if (!p) return emptyState("Receipt not found");
  const s = studentById(p.studentId);
  return `
    ${pageHead("Receipt", p.receipt, `<button class="btn btn-outline" onclick="navigate('#/payments')">${icon("arrowLeft")} ${t("btn_back")}</button>`, `<a href="#/payments">Payments</a> / ${esc(p.receipt)}`)}
    <div class="receipt-wrap">
      <div class="receipt" id="receiptPrintArea">
        <div class="receipt-head">
          <img src="assets/images/logo.jpg" alt="logo">
          <div><div class="rh-title">${esc(SCHOOL.name)}</div><div class="rh-sub">${esc(SCHOOL.address)} · ${esc(SCHOOL.phone)}</div></div>
        </div>
        <div class="receipt-meta"><span class="text-muted">Receipt No.</span><strong>${esc(p.receipt)}</strong></div>
        <div class="receipt-meta"><span class="text-muted">Date</span><strong>${esc(p.date)}</strong></div>
        <div class="receipt-meta"><span class="text-muted">Student</span><strong>${s ? esc(s.name) : esc(p.studentId)} (${esc(p.studentId)})</strong></div>
        <div class="receipt-meta"><span class="text-muted">Class</span><strong>${s ? esc(s.class) : "—"}</strong></div>
        <table class="receipt-table">
          <thead><tr><th>Description</th><th>Term</th><th style="text-align:right;">Amount</th></tr></thead>
          <tbody><tr><td>${esc(p.feeType)}</td><td>${esc(p.term)}</td><td style="text-align:right;">${moneyFull(p.due)}</td></tr>
          ${p.discount ? `<tr><td colspan="2">Discount</td><td style="text-align:right;">-${moneyFull(p.discount)}</td></tr>` : ""}</tbody>
        </table>
        <div class="receipt-total-row"><span>Amount Paid</span><span>${moneyFull(p.paid)}</span></div>
        <div class="receipt-total-row"><span>Balance</span><span>${moneyFull(p.due - p.discount - p.paid)}</span></div>
        <div class="receipt-total-row grand"><span>Payment Method</span><span>${esc(p.method)}</span></div>
        <div class="receipt-footer">Thank you. This is a computer-generated demo receipt for presentation purposes.</div>
      </div>
      <div class="receipt-actions">
        <button class="btn btn-outline" onclick="window.print()">${icon("print")} ${t("btn_print")}</button>
      </div>
    </div>
  `;
}

// ==========================================================================
// STAFF
// ==========================================================================
function renderStaff(params) {
  if (params && params[0] && params[0] !== "attendance") return renderStaffProfile(params[0]);
  const showTab = (params && params[0] === "attendance") ? "attendance" : "list";
  const rows = STATE.data.staff;
  return `
    ${pageHead("Staff", `${rows.length} staff on record`, can("Staff") ? `<button class="btn btn-primary" onclick="toast('Add Staff form would open here in the full build.')">${icon("plus")} Add Staff</button>` : "")}
    <div class="tabs" id="staffMainTabs">
      <button class="tab-btn ${showTab==='list'?'active':''}" onclick="navigate('#/staff')">Staff List</button>
      <button class="tab-btn ${showTab==='attendance'?'active':''}" onclick="navigate('#/staff/attendance')">Staff Attendance</button>
    </div>
    ${showTab === "attendance" ? staffAttendanceView() : staffListView(rows)}
  `;
}
function staffListView(rows) {
  return `<div class="card"><div class="table-toolbar">
    <div class="grow"><input type="text" id="staffFilterText" placeholder="Search staff name..." style="width:100%;" oninput="filterStaffTable()"></div>
    <select id="staffFilterDept" onchange="filterStaffTable()"><option value="">All Departments</option>${DEPARTMENTS.map(d=>`<option>${d}</option>`).join("")}</select>
    <button class="btn btn-outline btn-sm" onclick="exportStaffCSV()">${icon("download")} ${t("btn_export_csv")}</button>
  </div>
  <div class="table-wrap"><table class="data-table">
    <thead><tr><th>Staff</th><th>Role</th><th>Department</th><th>Phone</th><th>Join Date</th><th>Type</th><th>Status</th><th>Today</th><th></th></tr></thead>
    <tbody id="staffTbody">${staffRows(rows)}</tbody>
  </table></div>
  <div class="table-footer"><span id="staffCount">Showing ${rows.length} of ${rows.length}</span></div>
  </div>`;
}
function staffRows(rows) {
  if (!rows.length) return `<tr><td colspan="9">${emptyState("No staff match your filters")}</td></tr>`;
  return rows.map(s => { const att = STATE.data.staffAttendance.find(a => a.staffId === s.id);
    return `<tr>
    <td><div class="name-with-avatar"><div class="avatar-sm">${initials(s.name)}</div><div><div class="cell-name">${esc(s.name)}</div><div class="cell-sub">${esc(s.id)}</div></div></div></td>
    <td>${esc(s.role)}</td><td>${esc(s.department)}</td><td>${esc(s.phone)}</td><td>${esc(s.joined)}</td><td>${esc(s.type)}</td>
    <td>${chip(s.status)}</td><td>${att ? chip(att.status) : "—"}</td>
    <td><button class="btn btn-outline btn-sm" onclick="navigate('#/staff/${s.id}')">${t("btn_view")}</button></td>
  </tr>`; }).join("");
}
function filterStaffTable() {
  const q = document.getElementById("staffFilterText").value.toLowerCase();
  const dept = document.getElementById("staffFilterDept").value;
  const rows = STATE.data.staff.filter(s => (!q || s.name.toLowerCase().includes(q)) && (!dept || s.department === dept));
  document.getElementById("staffTbody").innerHTML = staffRows(rows);
  document.getElementById("staffCount").textContent = `Showing ${rows.length} of ${STATE.data.staff.length}`;
}
function exportStaffCSV() {
  const headers = ["Staff ID","Name","Role","Department","Phone","Email","Join Date","Type","Status"];
  const rows = STATE.data.staff.map(s => [s.id,s.name,s.role,s.department,s.phone,s.email,s.joined,s.type,s.status]);
  exportCSV("staff_export.csv", headers, rows);
}
function staffAttendanceView() {
  return `<div class="card"><div class="table-toolbar">
    <input type="date" id="staffAttDate" value="${TODAY}">
    <span class="text-sm text-muted">Showing today's clock-in / clock-out log</span>
  </div>
  <div class="table-wrap"><table class="data-table">
    <thead><tr><th>Staff</th><th>Check-in</th><th>Check-out</th><th>Status</th><th>Late (min)</th><th>Note</th><th></th></tr></thead>
    <tbody>${STATE.data.staffAttendance.map(a => { const s = staffById(a.staffId);
      return `<tr><td>${s ? esc(s.name) : esc(a.staffId)}</td><td>${esc(a.checkIn)}</td><td>${esc(a.checkOut)}</td><td>${chip(a.status)}</td><td>${a.lateMin||0}</td><td class="text-sm">${esc(a.note||"—")}</td>
      <td class="row-actions">
        <button class="btn btn-outline btn-sm" onclick="staffClock('${a.staffId}','in')">${t("btn_clock_in")}</button>
        <button class="btn btn-outline btn-sm" onclick="staffClock('${a.staffId}','out')">${t("btn_clock_out")}</button>
      </td></tr>`; }).join("")}</tbody>
  </table></div></div>`;
}
function staffClock(staffId, mode) {
  const rec = STATE.data.staffAttendance.find(a => a.staffId === staffId);
  const now = new Date().toTimeString().slice(0,5);
  if (mode === "in") { rec.checkIn = now; rec.status = "Present"; } else { rec.checkOut = now; }
  logActivity("Staff Attendance", "Attendance Updated", `${mode === "in" ? "Clocked in" : "Clocked out"} ${staffId} at ${now}.`);
  persist(); renderRoute(); toast("Recorded " + (mode === "in" ? "clock-in" : "clock-out") + ".");
}
function renderStaffProfile(id) {
  const s = staffById(id);
  if (!s) return emptyState("Staff member not found");
  const extra = staffExtra(id);
  const att = STATE.data.staffAttendance.find(a => a.staffId === id);
  return `
    ${pageHead(s.name, s.id, `<button class="btn btn-outline" onclick="navigate('#/staff')">${icon("arrowLeft")} ${t("btn_back")}</button>`, `<a href="#/staff">Staff</a> / ${esc(s.name)}`)}
    <div class="card" style="margin-bottom:16px;"><div class="profile-header">
      <div class="avatar-lg">${initials(s.name)}</div>
      <div><h2>${esc(s.name)}</h2><div class="meta">${esc(s.role)} · ${esc(s.department)}</div>
      <div class="meta-row"><span>${icon("phone")} ${esc(s.phone)}</span><span>${icon("mail")} ${esc(s.email)}</span></div></div>
      <div style="margin-left:auto;">${chip(s.status)}</div>
    </div></div>
    <div class="profile-layout">
      <div class="card"><div class="card-head"><h3>Position</h3></div><div class="card-body info-list">
        <div class="info-item"><label>Employment Type</label><div>${esc(s.type)}</div></div>
        <div class="info-item"><label>Join Date</label><div>${esc(s.joined)}</div></div>
        <div class="info-item"><label>Assigned Class</label><div>${esc(s.assigned)}</div></div>
        <div class="info-item"><label>Leave Balance</label><div>${extra.leaveBalance} days</div></div>
        <div class="info-item"><label>Salary</label><div class="text-muted">On file with Finance</div></div>
        <div class="info-item"><label>Today's Attendance</label><div>${att ? chip(att.status) : "—"}</div></div>
      </div></div>
      <div class="card"><div class="card-head"><h3>Notes & Documents</h3></div><div class="card-body">
        <p class="text-sm" style="margin-top:0;">${esc(extra.notes)}</p>
        ${extra.documents.map(d => `<div class="doc-item">${icon("doc")}<div style="flex:1;"><div>${esc(d.name)}</div><div class="doc-meta">Uploaded ${esc(d.date)}</div></div></div>`).join("")}
      </div></div>
    </div>
  `;
}

// ==========================================================================
// LEAVE & APPROVALS
// ==========================================================================
function renderLeave() {
  const rows = STATE.data.leaveRequests;
  return `
    ${pageHead("Leave & Approvals", `${rows.filter(r=>r.status==="Pending").length} pending requests`, `<button class="btn btn-primary" onclick="openNewRequestModal()">${icon("plus")}${t("btn_new_request")}</button>`)}
    <div class="card">
      <div class="table-toolbar">
        <select id="leaveFilterType" onchange="filterLeaveTable()"><option value="">All Types</option>${["Leave Request","Overtime Request","Mission / Business Trip","Purchase Request","Budget Request","Other"].map(t=>`<option>${t}</option>`).join("")}</select>
        <select id="leaveFilterStatus" onchange="filterLeaveTable()"><option value="">All Status</option>${["Draft","Pending","Approved","Rejected"].map(s=>`<option>${s}</option>`).join("")}</select>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Requester</th><th>Department</th><th>Type</th><th>Date</th><th>Reason</th><th>Status</th><th></th></tr></thead>
        <tbody id="leaveTbody">${leaveRows(rows)}</tbody>
      </table></div>
    </div>
  `;
}
function leaveRows(rows) {
  if (!rows.length) return `<tr><td colspan="7">${emptyState("No requests match your filters")}</td></tr>`;
  return rows.map(r => `<tr>
    <td class="cell-name">${esc(r.requester)}</td><td>${esc(r.department)}</td><td>${esc(r.type)}</td><td>${esc(r.date)}</td>
    <td class="text-sm" style="max-width:220px;">${esc(r.reason)}</td><td>${chip(r.status)}</td>
    <td class="row-actions"><button class="btn btn-outline btn-sm" onclick="openLeaveDetail('${r.id}')">${t("btn_view")}</button></td>
  </tr>`).join("");
}
function filterLeaveTable() {
  const type = document.getElementById("leaveFilterType").value;
  const status = document.getElementById("leaveFilterStatus").value;
  const rows = STATE.data.leaveRequests.filter(r => (!type || r.type === type) && (!status || r.status === status));
  document.getElementById("leaveTbody").innerHTML = leaveRows(rows);
}
function openLeaveDetail(id) {
  const r = STATE.data.leaveRequests.find(x => x.id === id);
  const canApprove = isApprover() && r.status === "Pending";
  openModal(r.id + " — " + r.type, `
    <div class="info-list">
      <div class="info-item"><label>Requester</label><div>${esc(r.requester)}</div></div>
      <div class="info-item"><label>Department</label><div>${esc(r.department)}</div></div>
      <div class="info-item"><label>Date</label><div>${esc(r.date)}</div></div>
      <div class="info-item"><label>Approver</label><div>${esc(r.approver)}</div></div>
      <div class="info-item span-2" style="grid-column:1/-1;"><label>Reason</label><div>${esc(r.reason)}</div></div>
      <div class="info-item"><label>Attachment</label><div>${esc(r.attachment)}</div></div>
      <div class="info-item"><label>Status</label><div>${chip(r.status)}</div></div>
      ${r.comments ? `<div class="info-item" style="grid-column:1/-1;"><label>Comments</label><div>${esc(r.comments)}</div></div>` : ""}
    </div>
    ${canApprove ? `<div class="form-field" style="margin-top:14px;"><label>Comment</label><textarea id="leaveComment" placeholder="Add a comment (optional)"></textarea></div>
    <div class="form-actions"><button class="btn btn-danger-soft" onclick="decideLeave('${r.id}','Rejected')">${t("btn_reject")}</button><button class="btn btn-primary" onclick="decideLeave('${r.id}','Approved')">${t("btn_approve")}</button></div>` : ""}
  `);
}
function decideLeave(id, decision) {
  const r = STATE.data.leaveRequests.find(x => x.id === id);
  r.status = decision;
  const commentEl = document.getElementById("leaveComment");
  if (commentEl && commentEl.value.trim()) r.comments = commentEl.value.trim();
  logActivity("Leave & Approvals", "Leave " + decision, `${decision} ${r.id} — ${r.type} from ${r.requester}.`);
  persist(); closeModal(); renderRoute(); toast("Request " + decision.toLowerCase() + ".");
}
function openNewRequestModal() {
  const user = DEMO_USERS.find(u => u.role === STATE.role);
  openModal("New Request", `
    <div class="form-grid">
      <div class="form-field span-2"><label>Requester</label><input value="${esc(user.name)}" disabled></div>
      <div class="form-field"><label>Request Type</label><select id="reqType">${["Leave Request","Overtime Request","Mission / Business Trip","Purchase Request","Budget Request","Other"].map(t=>`<option>${t}</option>`).join("")}</select></div>
      <div class="form-field"><label>Date</label><input type="date" id="reqDate" value="${TODAY}"></div>
      <div class="form-field span-2"><label>Reason</label><textarea id="reqReason" placeholder="Explain the request..."></textarea></div>
    </div>
    <div class="form-actions"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveNewRequest()">Submit Request</button></div>
  `);
}
function saveNewRequest() {
  const user = DEMO_USERS.find(u => u.role === STATE.role);
  const id = "REQ-" + (3008 + STATE.data.leaveRequests.length);
  STATE.data.leaveRequests.unshift({ id, requester: user.name, department: ROLE_PERMISSIONS[STATE.role].label, type: document.getElementById("reqType").value, date: document.getElementById("reqDate").value, reason: document.getElementById("reqReason").value || "—", attachment: "-", status: "Pending", approver: "Dara Chan", comments: "" });
  logActivity("Leave & Approvals", "Request Submitted", `${user.name} submitted a new ${document.getElementById("reqType").value}.`);
  persist(); closeModal(); renderRoute(); toast("Request submitted for approval.");
}

// ==========================================================================
// ACADEMIC RECORDS
// ==========================================================================
function renderAcademic() {
  const rows = STATE.data.academicRecords;
  return `
    ${pageHead("Academic Records", `Term 1, ${SCHOOL.academicYear}`, `<button class="btn btn-primary" onclick="openAddResultModal()">${icon("plus")}${t("btn_add_result")}</button>`)}
    <div class="card">
      <div class="table-toolbar">
        <select id="acFilterClass" onchange="filterAcademicTable()"><option value="">All Classes</option>${STATE.data.classes.map(c=>`<option value="${c.code}">${esc(c.name)}</option>`).join("")}</select>
        <select id="acFilterSubject" onchange="filterAcademicTable()"><option value="">All Subjects</option>${SUBJECTS.map(s=>`<option>${s}</option>`).join("")}</select>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Student</th><th>Subject</th><th>Term</th><th class="num">Score</th><th>Grade</th><th>Teacher</th><th>Comment</th><th></th></tr></thead>
        <tbody id="acTbody">${academicRows(rows)}</tbody>
      </table></div>
    </div>
  `;
}
function academicRows(rows) {
  if (!rows.length) return `<tr><td colspan="8">${emptyState("No academic records yet")}</td></tr>`;
  return rows.map((r, i) => { const s = studentById(r.studentId);
    return `<tr><td class="cell-name">${s?esc(s.name):esc(r.studentId)}</td><td>${esc(r.subject)}</td><td>${esc(r.term)}</td><td class="num">${r.score}</td><td>${esc(r.grade)}</td><td>${esc(r.teacher)}</td><td class="text-sm">${esc(r.comment)}</td>
    <td><button class="btn btn-outline btn-sm" onclick="openEditResultModal(${i})">${t("btn_edit")}</button></td></tr>`; }).join("");
}
function filterAcademicTable() {
  const cls = document.getElementById("acFilterClass").value;
  const subj = document.getElementById("acFilterSubject").value;
  const rows = STATE.data.academicRecords.filter(r => { const s = studentById(r.studentId); return (!cls || (s && s.class === cls)) && (!subj || r.subject === subj); });
  document.getElementById("acTbody").innerHTML = academicRows(rows);
}
function openAddResultModal() {
  openModal("Add Result", `
    <div class="form-grid">
      <div class="form-field span-2"><label>Student</label><select id="arStudent">${STATE.data.students.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("")}</select></div>
      <div class="form-field"><label>Subject</label><select id="arSubject">${SUBJECTS.map(s=>`<option>${s}</option>`).join("")}</select></div>
      <div class="form-field"><label>Term</label><input id="arTerm" value="Term 1, ${SCHOOL.academicYear}"></div>
      <div class="form-field"><label>Score</label><input type="number" id="arScore" min="0" max="100" value="85"></div>
      <div class="form-field span-2"><label>Teacher Comment</label><textarea id="arComment" placeholder="Comment on performance..."></textarea></div>
    </div>
    <div class="form-actions"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveNewResult()">${t("btn_add_result")}</button></div>
  `);
}
function scoreToGrade(score) { return score>=90?"A+":score>=85?"A":score>=75?"B+":score>=65?"B":score>=50?"C":"D"; }
function saveNewResult() {
  const score = parseFloat(document.getElementById("arScore").value) || 0;
  const teacher = (DEMO_USERS.find(u=>u.role===STATE.role)||{}).name || "Teacher";
  STATE.data.academicRecords.unshift({ studentId: document.getElementById("arStudent").value, subject: document.getElementById("arSubject").value, term: document.getElementById("arTerm").value, score, grade: scoreToGrade(score), teacher, comment: document.getElementById("arComment").value || "—" });
  logActivity("Academic Records", "Academic Record Updated", `Added ${document.getElementById("arSubject").value} score for ${document.getElementById("arStudent").value}.`);
  persist(); closeModal(); renderRoute(); toast("Result added.");
}
function openEditResultModal(index) {
  const r = STATE.data.academicRecords[index];
  openModal("Edit Result — " + (studentById(r.studentId)||{}).name, `
    <div class="form-grid">
      <div class="form-field"><label>Subject</label><input id="erSubject" value="${esc(r.subject)}"></div>
      <div class="form-field"><label>Score</label><input type="number" id="erScore" value="${r.score}"></div>
      <div class="form-field span-2"><label>Teacher Comment</label><textarea id="erComment">${esc(r.comment)}</textarea></div>
    </div>
    <div class="form-actions"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveEditResult(${index})">Save Changes</button></div>
  `);
}
function saveEditResult(index) {
  const r = STATE.data.academicRecords[index];
  r.subject = document.getElementById("erSubject").value;
  r.score = parseFloat(document.getElementById("erScore").value) || r.score;
  r.grade = scoreToGrade(r.score);
  r.comment = document.getElementById("erComment").value;
  logActivity("Academic Records", "Academic Record Updated", `Updated ${r.subject} record for ${r.studentId}.`);
  persist(); closeModal(); renderRoute(); toast("Result updated.");
}

// ==========================================================================
// ANNOUNCEMENTS
// ==========================================================================
function renderAnnouncements() {
  const rows = STATE.data.announcements;
  return `
    ${pageHead("Announcements", `${rows.filter(a=>a.status==="Published").length} published`, `<button class="btn btn-primary" onclick="openNewAnnouncementModal()">${icon("plus")}${t("btn_new_announcement")}</button>`)}
    <div class="two-col">
      ${rows.map(a => `<div class="card"><div class="card-pad">
        <div class="flex-between"><strong>${esc(a.title)}</strong>${chip(a.status)}</div>
        <div class="text-sm text-muted" style="margin:4px 0 10px;">${esc(a.audience)} · ${esc(a.date)} · by ${esc(a.createdBy)}</div>
        <p class="text-sm" style="margin:0;">${esc(a.message)}</p>
      </div></div>`).join("")}
    </div>
  `;
}
function openNewAnnouncementModal() {
  openModal("New Announcement", `
    <div class="form-grid">
      <div class="form-field span-2"><label>Title</label><input id="anTitle" placeholder="Announcement title"></div>
      <div class="form-field"><label>Audience</label><select id="anAudience">${["All Staff","Teachers","Finance","Admin","Specific Department"].map(a=>`<option>${a}</option>`).join("")}</select></div>
      <div class="form-field"><label>Date</label><input type="date" id="anDate" value="${TODAY}"></div>
      <div class="form-field span-2"><label>Message</label><textarea id="anMessage" placeholder="Write your announcement..."></textarea></div>
    </div>
    <div class="form-actions"><button class="btn btn-outline" onclick="saveAnnouncement('Draft')">${t("btn_save_draft")}</button><button class="btn btn-primary" onclick="saveAnnouncement('Published')">Publish</button></div>
  `);
}
function saveAnnouncement(status) {
  const title = document.getElementById("anTitle").value.trim();
  if (!title) { toast("Please enter a title."); return; }
  const user = DEMO_USERS.find(u => u.role === STATE.role);
  STATE.data.announcements.unshift({ id: "ANN-" + (506 + STATE.data.announcements.length), title, audience: document.getElementById("anAudience").value, date: document.getElementById("anDate").value, createdBy: user.name, status, message: document.getElementById("anMessage").value || "—" });
  logActivity("Announcements", status === "Published" ? "Announcement Published" : "Announcement Drafted", title);
  persist(); closeModal(); renderRoute(); toast(status === "Published" ? "Announcement published." : "Saved as draft.");
}

// ==========================================================================
// REPORTS
// ==========================================================================
const REPORT_DEFS = [
  { key: "enrollment", title: "Student Enrollment Report", desc: "New and total enrollments by class and term.", icon: "enrollment" },
  { key: "attendance", title: "Attendance Report", desc: "Daily and monthly attendance rates by class.", icon: "attendance" },
  { key: "collection", title: "Tuition Collection Report", desc: "Payments collected by method and fee type.", icon: "payments" },
  { key: "outstanding", title: "Outstanding Payment Report", desc: "Unpaid and overdue balances by student.", icon: "payments" },
  { key: "staffAttendance", title: "Staff Attendance Report", desc: "Daily check-in/out and lateness by staff.", icon: "staff" },
  { key: "leave", title: "Leave Report", desc: "Leave and approval requests by status.", icon: "leave" },
  { key: "classSummary", title: "Class Summary", desc: "Enrollment and attendance snapshot per class.", icon: "classes" },
];
function renderReports() {
  const visible = REPORT_DEFS.filter(r => {
    if (STATE.role === "finance") return ["collection","outstanding","enrollment"].includes(r.key);
    if (STATE.role === "hr") return ["staffAttendance","leave"].includes(r.key);
    if (STATE.role === "teacher") return false;
    return true;
  });
  return `
    ${pageHead("Reports", "Generate and export operational reports", "")}
    <div class="two-col">
      ${visible.map(r => `<div class="card"><div class="card-pad">
        <div class="kpi-icon" style="margin-bottom:12px;">${icon(r.icon)}</div>
        <strong style="font-size:14.5px;">${esc(r.title)}</strong>
        <p class="text-sm text-muted" style="margin:4px 0 14px;">${esc(r.desc)}</p>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-outline btn-sm" onclick="openReportPreview('${r.key}')">${t("btn_view")}</button>
          <button class="btn btn-soft btn-sm" onclick="exportReportCSV('${r.key}')">${icon("download")} ${t("btn_export_csv")}</button>
          <button class="btn btn-outline btn-sm" onclick="window.print()">${icon("print")} ${t("btn_print")}</button>
        </div>
      </div></div>`).join("")}
    </div>
  `;
}
function reportData(key) {
  if (key === "enrollment") return { headers: ["Class","Students"], rows: STATE.data.classes.map(c => [c.name, STATE.data.students.filter(s=>s.class===c.code).length]) };
  if (key === "attendance") return { headers: ["Class","Present %"], rows: STATE.data.classes.map(c => { const rs = STATE.data.studentAttendance.filter(a=>a.class===c.code); const p = rs.filter(a=>a.status==="Present"||a.status==="Late").length; return [c.name, rs.length?Math.round(p/rs.length*100)+"%":"—"]; }) };
  if (key === "collection") return { headers: ["Method","Total Collected"], rows: Object.entries(STATE.data.payments.reduce((acc,p)=>{ if(p.method!=='-'){acc[p.method]=(acc[p.method]||0)+p.paid;} return acc; },{})).map(([m,v])=>[m, moneyFull(v)]) };
  if (key === "outstanding") return { headers: ["Student","Receipt","Balance","Status"], rows: STATE.data.payments.filter(p=>p.status!=="Paid").map(p=>{ const s=studentById(p.studentId); return [s?s.name:p.studentId, p.receipt, moneyFull(p.due-p.paid), p.status]; }) };
  if (key === "staffAttendance") return { headers: ["Staff","Status","Late Min"], rows: STATE.data.staffAttendance.map(a=>{ const s=staffById(a.staffId); return [s?s.name:a.staffId, a.status, a.lateMin||0]; }) };
  if (key === "leave") return { headers: ["Requester","Type","Status"], rows: STATE.data.leaveRequests.map(r=>[r.requester,r.type,r.status]) };
  if (key === "classSummary") return { headers: ["Class","Teacher","Students"], rows: STATE.data.classes.map(c=>[c.name,c.teacher,STATE.data.students.filter(s=>s.class===c.code).length]) };
  return { headers: [], rows: [] };
}
function openReportPreview(key) {
  const def = REPORT_DEFS.find(r => r.key === key);
  const { headers, rows } = reportData(key);
  openModal(def.title, `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
}
function exportReportCSV(key) {
  const def = REPORT_DEFS.find(r => r.key === key);
  const { headers, rows } = reportData(key);
  exportCSV(key + "_report.csv", headers, rows);
}

// ==========================================================================
// USERS & ROLES
// ==========================================================================
function renderUsersRoles() {
  const modules = Object.keys(ROLE_PERMISSIONS.director.modules);
  return `
    ${pageHead("Users & Roles", "Demo accounts and role-based permission matrix (frontend simulation only)", "")}
    <div class="card" style="margin-bottom:16px;">
      <div class="card-head"><h3>Demo Accounts</h3><p>Use the profile menu (top-right) to switch between these roles</p></div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Role</th><th>Name</th><th>Title</th><th>Email</th></tr></thead>
        <tbody>${DEMO_USERS.map(u => `<tr><td class="cell-name">${esc(u.label)}</td><td>${esc(u.name)}</td><td>${esc(u.title)}</td><td class="text-sm">${esc(u.email)}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
    <div class="card">
      <div class="card-head"><h3>Permission Matrix</h3><p>Illustrative only — not enforced as real security in this demo</p></div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Module</th>${DEMO_USERS.map(u=>`<th>${esc(u.label)}</th>`).join("")}</tr></thead>
        <tbody>${modules.map(m => `<tr><td class="cell-name">${esc(m)}</td>${DEMO_USERS.map(u => `<td>${ROLE_PERMISSIONS[u.role].modules[m] === "—" ? '<span class="text-muted">—</span>' : chip(ROLE_PERMISSIONS[u.role].modules[m] === "Manage" || ROLE_PERMISSIONS[u.role].modules[m] === "Full" || ROLE_PERMISSIONS[u.role].modules[m] === "Approve" ? "Approved" : "View").replace(/>[^<]+</, ">"+esc(ROLE_PERMISSIONS[u.role].modules[m])+"<")}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>
    </div>
  `;
}

// ==========================================================================
// ACTIVITY LOG
// ==========================================================================
function renderActivityLog() {
  const rows = STATE.data.activityLog;
  const modules = [...new Set(rows.map(r => r.module))];
  return `
    ${pageHead("Activity Log", "System-wide record of key actions, for accountability", "")}
    <div class="card">
      <div class="table-toolbar">
        <select id="actFilterModule" onchange="filterActivityTable()"><option value="">All Modules</option>${modules.map(m=>`<option>${esc(m)}</option>`).join("")}</select>
        <div class="grow"><input type="text" id="actFilterUser" placeholder="Filter by user..." style="width:100%;" oninput="filterActivityTable()"></div>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Date / Time</th><th>User</th><th>Role</th><th>Module</th><th>Action</th><th>Details</th></tr></thead>
        <tbody id="actTbody">${activityRows(rows)}</tbody>
      </table></div>
    </div>
  `;
}
function activityRows(rows) {
  if (!rows.length) return `<tr><td colspan="6">${emptyState("No activity recorded yet")}</td></tr>`;
  return rows.map(r => `<tr><td class="text-sm">${esc(r.time)}</td><td class="cell-name">${esc(r.user)}</td><td>${esc(r.role)}</td><td>${esc(r.module)}</td><td>${chip("Confirmed").replace(/>[^<]+</,">"+esc(r.action)+"<")}</td><td class="text-sm">${esc(r.details)}</td></tr>`).join("");
}
function filterActivityTable() {
  const mod = document.getElementById("actFilterModule").value;
  const user = document.getElementById("actFilterUser").value.toLowerCase();
  const rows = STATE.data.activityLog.filter(r => (!mod || r.module === mod) && (!user || r.user.toLowerCase().includes(user)));
  document.getElementById("actTbody").innerHTML = activityRows(rows);
}

// ==========================================================================
// SETTINGS
// ==========================================================================
function renderSettings(params) {
  const activeTab = (params && params[0]) || "school";
  const tabs = [
    ["school","School Information"], ["year","Academic Year"], ["grades","Grades / Classes"],
    ["fees","Fee Types"], ["subjects","Subjects"], ["depts","Departments"],
    ["prefs","System Preferences"], ["about","About & Future Add-ons"],
  ];
  return `
    ${pageHead("Settings", "Configure school information and system defaults (demo data)", "")}
    <div class="tabs">${tabs.map(([k,l]) => `<button class="tab-btn ${activeTab===k?'active':''}" onclick="navigate('#/settings/${k}')">${esc(l)}</button>`).join("")}</div>
    ${settingsTabContent(activeTab)}
  `;
}
function settingsTabContent(tab) {
  if (tab === "school") return `<div class="card card-pad"><div class="form-grid">
    <div class="form-field span-2"><label>School Name</label><input value="${esc(SCHOOL.name)}"></div>
    <div class="form-field"><label>Phone</label><input value="${esc(SCHOOL.phone)}"></div>
    <div class="form-field"><label>Email</label><input value="${esc(SCHOOL.email)}"></div>
    <div class="form-field span-2"><label>Address</label><input value="${esc(SCHOOL.address)}"></div>
  </div><div class="form-actions"><button class="btn btn-primary" onclick="toast('Settings saved (demo only).')">Save Changes</button></div></div>`;
  if (tab === "year") return `<div class="card card-pad"><div class="form-grid">
    <div class="form-field"><label>Current Academic Year</label><input value="${esc(SCHOOL.academicYear)}"></div>
    <div class="form-field"><label>Term Structure</label><select><option>3 Terms</option><option>2 Semesters</option></select></div>
  </div><div class="form-actions"><button class="btn btn-primary" onclick="toast('Settings saved (demo only).')">Save Changes</button></div></div>`;
  if (tab === "grades") return `<div class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Class Code</th><th>Grade</th><th>Name</th><th>Teacher</th><th>Room</th></tr></thead>
    <tbody>${STATE.data.classes.map(c=>`<tr><td class="cell-name">${esc(c.code)}</td><td>${esc(c.grade)}</td><td>${esc(c.name)}</td><td>${esc(c.teacher)}</td><td>${esc(c.room)}</td></tr>`).join("")}</tbody></table></div></div>`;
  if (tab === "fees") return `<div class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Fee Type</th><th class="num">Default Amount</th></tr></thead>
    <tbody>${FEE_TYPES.map(f=>`<tr><td class="cell-name">${esc(f.name)}</td><td class="num">${f.defaultAmount?money(f.defaultAmount):"Varies"}</td></tr>`).join("")}</tbody></table></div></div>`;
  if (tab === "subjects") return `<div class="card card-pad"><div class="two-col">${SUBJECTS.map(s=>`<div class="li-row" style="border-bottom:1px solid var(--color-border); padding:10px 0;">${icon("academic")}<span style="margin-left:8px;">${esc(s)}</span></div>`).join("")}</div><p class="form-hint" style="margin-top:10px;">Demo subject list — confirm the academy's official subject list before go-live.</p></div>`;
  if (tab === "depts") return `<div class="card card-pad"><div class="two-col">${DEPARTMENTS.map(d=>`<div class="li-row" style="border-bottom:1px solid var(--color-border); padding:10px 0;">${icon("users")}<span style="margin-left:8px;">${esc(d)}</span></div>`).join("")}</div></div>`;
  if (tab === "prefs") return `<div class="card card-pad">
    <div class="checkbox-row" style="margin-bottom:12px;"><input type="checkbox" checked disabled> Default language: English</div>
    <div class="checkbox-row" style="margin-bottom:12px;"><input type="checkbox" checked disabled> Enable EN / KH language switch</div>
    <div class="checkbox-row" style="margin-bottom:18px;"><input type="checkbox" checked disabled> Enable demo role switching</div>
    <div class="divider"></div>
    <strong style="font-size:13px;">Reset Demo Data</strong>
    <p class="text-sm text-muted">Clears all changes made during this demo session (payments recorded, attendance marked, approvals, etc.) and restores original sample data.</p>
    <button class="btn btn-danger-soft" onclick="resetDemoData()">Reset to Original Demo Data</button>
  </div>`;
  if (tab === "about") return `<div class="card card-pad">
    <p class="text-sm">This is a frontend demo of the Dandelion International Academy of Education School Management System, prepared for client presentation. It uses local sample data only — no live database, authentication, or payment gateway is connected.</p>
    <div class="divider"></div>
    <strong style="font-size:14px;">${t("future_scope")}</strong>
    <p class="text-sm text-muted" style="margin-bottom:14px;">The modules below are not part of this demo build and would be scoped and quoted separately.</p>
    <div class="future-grid">${FUTURE_ADDONS.map(f => `<div class="future-card"><span class="fc-tag">${t("future_scope")}</span><strong>${esc(f.name)}</strong><p>${esc(f.desc)}</p></div>`).join("")}</div>
  </div>`;
  return "";
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
function initApp() {
  try {
    if (localStorage.getItem("dandelion_logged_in") !== "1") { window.location.href = "login.html"; return; }
  } catch (e) {}
  loadState();
  window.addEventListener("hashchange", renderRoute);
  renderRoute();

  document.getElementById("collapseBtn").addEventListener("click", () => {
    STATE.collapsed = !STATE.collapsed;
    document.getElementById("appShell").classList.toggle("collapsed", STATE.collapsed);
  });
  document.getElementById("mobileToggle").addEventListener("click", () => document.getElementById("appShell").classList.toggle("mobile-open"));

  document.getElementById("globalSearch").addEventListener("input", e => runSearch(e.target.value));
  document.getElementById("globalSearch").addEventListener("focus", e => { if (e.target.value) runSearch(e.target.value); });

  document.getElementById("topLangSwitch").addEventListener("click", e => { const b = e.target.closest("button[data-lang]"); if (b) setLang(b.dataset.lang); });

  document.getElementById("notifBtn").addEventListener("click", e => { e.stopPropagation(); buildNotifPanel(); document.getElementById("profilePanel").classList.remove("open"); document.getElementById("notifPanel").classList.toggle("open"); });
  document.getElementById("profileBtn").addEventListener("click", e => { e.stopPropagation(); buildProfilePanel(); document.getElementById("notifPanel").classList.remove("open"); document.getElementById("profilePanel").classList.toggle("open"); });
  document.getElementById("modalOverlay").addEventListener("click", e => { if (e.target.id === "modalOverlay") closeModal(); });
  document.addEventListener("click", () => closePanels());
}

document.addEventListener("DOMContentLoaded", initApp);
