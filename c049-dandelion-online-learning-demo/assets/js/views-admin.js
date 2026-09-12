/* ==========================================================================
   ADMIN views
   ========================================================================== */
(function () {
  const { STATE, route, el, esc, initials, statusBadge, typeBadge, fmtDate, toast, openModal, closeModal, persist, logActivity, pushNotification } = APP;

  /* ---------------- Dashboard ---------------- */
  route("#/admin/dashboard", () => {
    const k = DEMO.KPIS;
    const todayLive = STATE.liveClasses.filter(l => l.date === "2026-09-06");
    const recentAssign = STATE.assignments.slice(-4).reverse();
    const upcoming = DEMO.SCHEDULE.slice(0, 5);

    return `
      <div class="page-head"><div><h1>Admin Dashboard</h1><div class="subtitle">School-wide overview · Dandelion International Academy of Education</div></div>
      <div class="actions"><a href="#/admin/reports" class="btn btn-outline">View Reports</a><a href="#/admin/announcements" class="btn btn-primary">Post Announcement</a></div></div>

      <div class="kpi-grid">
        ${kpi("Total Students", k.totalStudents, "🎓", "+12 this term")}
        ${kpi("Total Teachers", k.totalTeachers, "👩‍🏫", "2 new hires")}
        ${kpi("Active Classes", k.activeClasses, "🏫", "3 grades")}
        ${kpi("Live Classes Today", k.liveClassesToday, "📡", todayLive.filter(l=>l.status==="Live").length + " live now")}
        ${kpi("Assignments Due", k.assignmentsDue, "📚", "this week")}
        ${kpi("Avg. Attendance", k.avgAttendance + "%", "✅", "last 30 days")}
      </div>

      <div class="grid-2">
        <div class="stack">
          <div class="card">
            <div class="card-head"><h3>Today's Live Classes</h3><a href="#/admin/schedule" class="link">View schedule</a></div>
            <div class="card-body no-pad">
              ${todayLive.map(l => liveRow(l)).join("") || `<div class="empty-state">No live classes today.</div>`}
            </div>
          </div>
          <div class="card">
            <div class="card-head"><h3>Recent Assignments</h3><a href="#/admin/reports" class="link">Assignment Completion report</a></div>
            <div class="card-body no-pad">
              ${recentAssign.map(a => `<div class="card-list-item"><div class="avatar-ring" style="width:32px;height:32px;font-size:11px;">${esc(a.subject.slice(0,2).toUpperCase())}</div><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(a.title)}</div><div class="text-muted" style="font-size:11.5px;">${esc(DEMO.classById(a.classId).name)} · Due ${fmtDate(a.dueDate)}</div></div>${statusBadge(a.status)}</div>`).join("")}
            </div>
          </div>
          <div class="card">
            <div class="card-head"><h3>Student Activity</h3></div>
            <div class="card-body no-pad">
              ${STATE.activityLog.filter(a => a.role === "Student").slice(0, 4).map(a => activityRow(a)).join("")}
            </div>
          </div>
        </div>
        <div class="stack">
          <div class="card">
            <div class="card-head"><h3>Upcoming Schedule</h3><a href="#/admin/schedule" class="link">Full timetable</a></div>
            <div class="card-body no-pad">
              ${upcoming.map(s => `<div class="card-list-item"><div style="width:56px;font-size:11.5px;font-weight:700;color:var(--ink-500);">${esc(s.time.split(" - ")[0])}</div><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(s.subject)} · ${esc(DEMO.classById(s.classId).name)}</div><div class="text-muted" style="font-size:11.5px;">${esc(s.day)} · ${esc(DEMO.teacherById(s.teacherId).name)}</div></div>${typeBadge(s.type)}</div>`).join("")}
            </div>
          </div>
          <div class="card">
            <div class="card-head"><h3>Recent Announcements</h3><a href="#/admin/announcements" class="link">See all</a></div>
            <div class="card-body no-pad">
              ${STATE.announcements.slice(0, 3).map(a => `<div class="card-list-item"><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(a.title)}</div><div class="text-muted" style="font-size:11.5px;">${fmtDate(a.date)} · ${esc(a.audience)}</div></div></div>`).join("")}
            </div>
          </div>
          <div class="card">
            <div class="card-head"><h3>Quick Actions</h3></div>
            <div class="card-body">
              <div class="quick-actions" style="grid-template-columns:repeat(2,1fr);">
                ${qa("👥", "Add Student", "#/admin/students")}
                ${qa("🏫", "Add Class", "#/admin/classes")}
                ${qa("📣", "Announcement", "#/admin/announcements")}
                ${qa("📊", "View Reports", "#/admin/reports")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  function kpi(label, value, icon, sub) {
    return `<div class="kpi-card"><div class="kpi-icon">${icon}</div><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${esc(sub)}</div></div>`;
  }
  function qa(icon, label, path) { return `<a href="${path}" class="qa-btn"><span class="qa-icon">${icon}</span>${label}</a>`; }
  function liveRow(l) {
    const c = DEMO.classById(l.classId); const t = DEMO.teacherById(l.teacherId);
    return `<div class="card-list-item"><div style="width:70px;font-size:11.5px;font-weight:700;color:var(--ink-500);">${esc(l.time)}</div><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(l.subject)} — ${esc(c.name)}</div><div class="text-muted" style="font-size:11.5px;">${esc(t.name)}</div></div>${statusBadge(l.status)}</div>`;
  }
  function activityRow(a) {
    return `<div class="card-list-item"><div class="avatar-ring" style="width:30px;height:30px;font-size:10.5px;">${initials(a.user)}</div><div style="flex:1;"><div style="font-size:12.5px;font-weight:600;">${esc(a.action)}</div><div class="text-muted" style="font-size:11px;">${esc(a.details)}</div></div><div class="text-muted" style="font-size:10.5px;">${a.datetime.split(" ")[1] || ""}</div></div>`;
  }
  window.ADMIN_liveRow = liveRow;
  window.ADMIN_activityRow = activityRow;

  /* ---------------- Students ---------------- */
  route("#/admin/students", () => studentsListView());
  function studentsListView() {
    return `
      <div class="page-head"><div><h1>Students</h1><div class="subtitle">${DEMO.STUDENTS.length} students shown (demo sample of ${DEMO.KPIS.totalStudents} total)</div></div>
      <div class="actions"><button class="btn btn-primary" id="addStudentBtn">+ Add Student</button></div></div>
      <div class="filter-bar">
        <select id="filterGrade"><option value="">All Grades</option><option>Grade 5</option><option>Grade 6</option></select>
        <select id="filterClass"><option value="">All Classes</option>${DEMO.CLASSES.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
        <input type="text" id="filterName" placeholder="Search by name..." />
      </div>
      <div class="card"><div class="table-wrap"><table class="data-table" id="studentsTable">
        <thead><tr><th>Student ID</th><th>Name</th><th>Grade</th><th>Class</th><th>Guardian</th><th>Phone</th><th>Status</th><th></th></tr></thead>
        <tbody>${DEMO.STUDENTS.map(studentRow).join("")}</tbody>
      </table></div></div>
    `;
  }
  function studentRow(s) {
    return `<tr data-name="${s.name.toLowerCase()}" data-grade="${s.grade}" data-class="${s.classId}">
      <td class="cell-sub">${s.id.toUpperCase()}</td>
      <td class="cell-name">${esc(s.name)}</td>
      <td>${esc(s.grade)}</td>
      <td>${esc(DEMO.classById(s.classId).name)}</td>
      <td>${esc(s.guardian)}</td>
      <td>${esc(s.phone)}</td>
      <td>${statusBadge(s.status)}</td>
      <td class="row-actions"><a href="#/admin/students/${s.id}" class="btn btn-outline btn-sm">View</a></td>
    </tr>`;
  }
  document.addEventListener("input", (e) => {
    if (["filterGrade", "filterClass", "filterName"].includes(e.target.id)) {
      const grade = document.getElementById("filterGrade").value;
      const cls = document.getElementById("filterClass").value;
      const name = document.getElementById("filterName").value.toLowerCase();
      APP.$$("#studentsTable tbody tr").forEach(tr => {
        const ok = (!grade || tr.dataset.grade === grade) && (!cls || tr.dataset.class === cls) && (!name || tr.dataset.name.includes(name));
        tr.style.display = ok ? "" : "none";
      });
    }
  });
  document.addEventListener("change", (e) => { if (["filterGrade", "filterClass"].includes(e.target.id)) e.target.dispatchEvent(new Event("input", { bubbles: true })); });
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "addStudentBtn") {
      openModal("Add Student (Demo)", `
        <div class="form-grid">
          <div class="form-field"><label>Full Name</label><input placeholder="e.g. Kunthea Sam" /></div>
          <div class="form-field"><label>Grade</label><select><option>Grade 5</option><option>Grade 6</option></select></div>
          <div class="form-field"><label>Class</label><select>${DEMO.CLASSES.map(c=>`<option>${c.name}</option>`).join("")}</select></div>
          <div class="form-field"><label>Guardian Name</label><input placeholder="e.g. Sam Vibol" /></div>
          <div class="form-field"><label>Phone</label><input placeholder="017 xxx xxx" /></div>
          <div class="form-field"><label>Email</label><input placeholder="student@dandelion.edu.kh" /></div>
        </div>
        <div class="form-actions"><button class="btn btn-outline" onclick="APP.closeModal()">Cancel</button><button class="btn btn-primary" id="saveStudentBtn">Save Student</button></div>
      `);
    }
    if (e.target && e.target.id === "saveStudentBtn") {
      closeModal(); toast("Student added (demo only — not saved permanently)");
      logActivity("Admin Office", "Admin", "Students", "Created student", "New student record (demo)");
    }
  });

  route("#/admin/students/:id", (p) => {
    const s = DEMO.studentById(p.id);
    if (!s) return `<div class="empty-state">Student not found.</div>`;
    const subs = STATE.submissions.filter(x => x.studentId === s.id);
    return `
      <div class="crumbs"><a href="#/admin/students">Students</a><span class="sep">/</span>${esc(s.name)}</div>
      <div class="page-head">
        <div style="display:flex;gap:14px;align-items:center;"><div class="avatar-ring" style="width:52px;height:52px;font-size:16px;">${initials(s.name)}</div>
          <div><h1>${esc(s.name)}</h1><div class="subtitle">${esc(s.grade)} · ${esc(DEMO.classById(s.classId).name)} · ${esc(s.id.toUpperCase())}</div></div></div>
        <div class="actions"><button class="btn btn-outline">Edit</button></div>
      </div>
      <div class="tabs"><span class="tab-btn active">Profile</span><span class="tab-btn">Attendance</span><span class="tab-btn">Assignments</span><span class="tab-btn">Grades</span></div>
      <div class="grid-2">
        <div class="card"><div class="card-head"><h3>Profile</h3></div><div class="card-body">
          <div class="grid-3" style="margin-bottom:0;">
            <div><div class="text-muted" style="font-size:11.5px;">Email</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(s.email)}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Phone</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(s.phone)}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Guardian</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(s.guardian)}</div></div>
            <div style="margin-top:14px;"><div class="text-muted" style="font-size:11.5px;">Enrollment Date</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${fmtDate(s.enrollmentDate)}</div></div>
            <div style="margin-top:14px;"><div class="text-muted" style="font-size:11.5px;">Status</div><div style="margin-top:4px;">${statusBadge(s.status)}</div></div>
            <div style="margin-top:14px;"><div class="text-muted" style="font-size:11.5px;">Attendance</div><div style="font-weight:700;margin-top:4px;font-size:13px;color:var(--green-700);">${s.attendancePct}%</div></div>
          </div>
        </div></div>
        <div class="card"><div class="card-head"><h3>Assignments & Grades</h3></div><div class="card-body no-pad">
          ${subs.map(sub => { const a = DEMO.assignmentById(sub.assignmentId); return `<div class="card-list-item"><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(a.title)}</div><div class="text-muted" style="font-size:11.5px;">${esc(a.subject)}</div></div>${sub.score !== null ? `<span style="font-weight:700;font-size:13px;">${sub.score}/${sub.maxScore}</span>` : statusBadge(sub.status)}</div>`; }).join("") || `<div class="empty-state">No submissions yet.</div>`}
        </div></div>
      </div>
    `;
  });

  /* ---------------- Teachers ---------------- */
  route("#/admin/teachers", () => `
    <div class="page-head"><div><h1>Teachers</h1><div class="subtitle">${DEMO.TEACHERS.length} teachers shown (demo sample of ${DEMO.KPIS.totalTeachers} total)</div></div>
    <div class="actions"><button class="btn btn-primary" onclick="APP.toast('Demo only')">+ Add Teacher</button></div></div>
    <div class="card"><div class="table-wrap"><table class="data-table">
      <thead><tr><th>Name</th><th>Department</th><th>Subjects</th><th>Classes</th><th>Email</th><th></th></tr></thead>
      <tbody>${DEMO.TEACHERS.map(t => `<tr><td class="cell-name">${esc(t.name)}</td><td>${esc(t.department)}</td><td>${t.subjects.join(", ")}</td><td>${t.classes.map(cid=>DEMO.classById(cid).name).join(", ") || "—"}</td><td class="cell-sub">${esc(t.email)}</td><td><a href="#/admin/teachers/${t.id}" class="btn btn-outline btn-sm">View</a></td></tr>`).join("")}</tbody>
    </table></div></div>
  `);

  route("#/admin/teachers/:id", (p) => {
    const t = DEMO.teacherById(p.id);
    if (!t) return `<div class="empty-state">Teacher not found.</div>`;
    const classes = DEMO.classesForTeacher(t.id);
    return `
      <div class="crumbs"><a href="#/admin/teachers">Teachers</a><span class="sep">/</span>${esc(t.name)}</div>
      <div class="page-head"><div style="display:flex;gap:14px;align-items:center;"><div class="avatar-ring" style="width:52px;height:52px;font-size:16px;">${initials(t.name)}</div>
        <div><h1>${esc(t.name)}</h1><div class="subtitle">${esc(t.department)} · ${esc(t.subjects.join(", "))}</div></div></div>
        <div class="actions"><button class="btn btn-outline">Edit</button></div></div>
      <div class="tabs"><span class="tab-btn active">Overview</span><span class="tab-btn">Classes</span><span class="tab-btn">Assignments</span><span class="tab-btn">Attendance</span></div>
      <div class="grid-2">
        <div class="card"><div class="card-head"><h3>Contact</h3></div><div class="card-body">
          <div class="grid-3" style="margin-bottom:0;">
            <div><div class="text-muted" style="font-size:11.5px;">Email</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(t.email)}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Phone</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(t.phone)}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Department</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(t.department)}</div></div>
          </div>
        </div></div>
        <div class="card"><div class="card-head"><h3>Classes</h3></div><div class="card-body no-pad">
          ${classes.map(c => `<div class="card-list-item"><div style="flex:1;">${esc(c.name)}</div><a href="#/admin/classes/${c.id}" class="btn btn-outline btn-sm">View</a></div>`).join("") || `<div class="empty-state">No classes assigned.</div>`}
        </div></div>
      </div>
    `;
  });

  /* ---------------- Classes ---------------- */
  route("#/admin/classes", () => `
    <div class="page-head"><div><h1>Classes</h1><div class="subtitle">${DEMO.CLASSES.length} active classes</div></div>
    <div class="actions"><button class="btn btn-primary" onclick="APP.toast('Demo only')">+ Add Class</button></div></div>
    <div class="grid-3">${DEMO.CLASSES.map(c => `
      <div class="class-card">
        <span class="subject-tag">${esc(c.grade)}</span>
        <h3>${esc(c.name)}</h3>
        <div class="meta-row">👩‍🏫 Homeroom: ${esc(DEMO.teacherById(c.homeroomTeacherId).name)}</div>
        <div class="meta-row">🎓 ${c.studentIds.length} students</div>
        <a href="#/admin/classes/${c.id}" class="btn btn-outline btn-block">View Class</a>
      </div>`).join("")}</div>
  `);
  route("#/admin/classes/:id", (p) => window.CLASS_DETAIL_VIEW(p.id, "#/admin/classes", "overview"));

  /* ---------------- Subjects ---------------- */
  route("#/admin/subjects", () => `
    <div class="page-head"><div><h1>Subjects</h1><div class="subtitle">Core curriculum subjects offered online</div></div>
    <div class="actions"><button class="btn btn-primary" onclick="APP.toast('Demo only')">+ Add Subject</button></div></div>
    <div class="grid-4">${DEMO.SUBJECTS.map(s => {
      const teacherCount = DEMO.TEACHERS.filter(t => t.subjects.includes(s.name)).length;
      const classCount = DEMO.CLASSES.filter(c => Object.keys(c.subjectTeachers).includes(s.name)).length;
      return `<div class="class-card"><span class="subject-tag">Subject</span><h3>${esc(s.name)}</h3><div class="meta-row">👩‍🏫 ${teacherCount} teachers</div><div class="meta-row">🏫 ${classCount} classes</div></div>`;
    }).join("")}</div>
  `);

  /* ---------------- Schedule ---------------- */
  route("#/admin/schedule", () => scheduleView());
  function scheduleView() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return `
      <div class="page-head"><div><h1>Class Schedule</h1><div class="subtitle">Weekly timetable across all classes</div></div>
      <div class="actions"><button class="btn btn-primary" onclick="APP.toast('Demo only')">+ Add Session</button></div></div>
      <div class="filter-bar">
        <select id="schedClassFilter"><option value="">All Classes</option>${DEMO.CLASSES.map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}</select>
      </div>
      ${days.map(day => `
        <div class="card" style="margin-bottom:14px;">
          <div class="card-head"><h3>${day}</h3></div>
          <div class="card-body no-pad" data-day="${day}">
            ${DEMO.SCHEDULE.filter(s => s.day === day).map(s => `
              <div class="card-list-item" data-class="${s.classId}">
                <div style="width:100px;font-size:12px;font-weight:700;color:var(--ink-500);">${esc(s.time)}</div>
                <div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(s.subject)} · ${esc(DEMO.classById(s.classId).name)}</div><div class="text-muted" style="font-size:11.5px;">${esc(DEMO.teacherById(s.teacherId).name)}</div></div>
                ${typeBadge(s.type)}
                ${s.type === "Online" ? `<button class="btn btn-outline btn-sm" onclick="APP.toast('Demo only — join from Live Classes')">Join</button>` : ""}
              </div>`).join("") || `<div class="empty-state">No sessions.</div>`}
          </div>
        </div>`).join("")}
    `;
  }
  document.addEventListener("change", (e) => {
    if (e.target.id === "schedClassFilter") {
      const v = e.target.value;
      APP.$$("[data-day] [data-class]").forEach(row => row.style.display = (!v || row.dataset.class === v) ? "" : "none");
    }
  });

  /* ---------------- Announcements ---------------- */
  route("#/admin/announcements", () => announcementsView("admin"));
  function announcementsView(role) {
    const canPost = role === "admin" || role === "teacher";
    return `
      <div class="page-head"><div><h1>Announcements</h1><div class="subtitle">School and class-wide communication</div></div>
      ${canPost ? `<div class="actions"><button class="btn btn-primary" id="postAnnBtn">+ Post Announcement</button></div>` : ""}</div>
      <div class="stack">
        ${STATE.announcements.map(a => `
          <div class="card"><div class="card-body">
            <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">
              <div><div style="font-weight:700;font-size:14.5px;">${esc(a.title)}</div>
              <div class="text-muted" style="font-size:12px;margin-top:2px;">${fmtDate(a.date)} · Posted by ${esc(a.postedBy)} · Audience: ${esc(a.audience)}</div></div>
            </div>
            <p style="margin-top:10px;font-size:13.5px;line-height:1.6;">${esc(a.message)}</p>
            ${a.attachment ? `<div style="margin-top:10px;"><span class="badge badge-gray">📎 ${esc(a.attachment)}</span></div>` : ""}
          </div></div>`).join("")}
      </div>
    `;
  }
  window.ANNOUNCEMENTS_VIEW = announcementsView;
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "postAnnBtn") {
      openModal("Post Announcement", `
        <div class="form-grid">
          <div class="form-field full"><label>Title</label><input id="annTitle" placeholder="e.g. Term Break Notice" /></div>
          <div class="form-field full"><label>Message</label><textarea id="annMsg" placeholder="Write the announcement..."></textarea></div>
          <div class="form-field"><label>Audience</label><select id="annAud"><option>All Students</option><option>Specific Grade</option><option>Specific Class</option><option>Teachers</option></select></div>
          <div class="form-field"><label>Attachment (optional)</label><input placeholder="filename.pdf" id="annAttach" /></div>
        </div>
        <div class="form-actions"><button class="btn btn-outline" onclick="APP.closeModal()">Cancel</button><button class="btn btn-primary" id="saveAnnBtn">Post</button></div>
      `);
    }
    if (e.target && e.target.id === "saveAnnBtn") {
      const title = document.getElementById("annTitle").value.trim() || "Untitled Announcement";
      const msg = document.getElementById("annMsg").value.trim() || "(no message)";
      const aud = document.getElementById("annAud").value;
      const attach = document.getElementById("annAttach").value.trim() || null;
      STATE.announcements.unshift({ id: "an-" + Date.now(), title, message: msg, date: "2026-09-06", audience: aud, attachment: attach, postedBy: STATE.role === "teacher" ? DEMO.teacherById(DEMO.CURRENT_TEACHER_ID).name : "Admin Office" });
      persist();
      logActivity(STATE.role === "teacher" ? DEMO.teacherById(DEMO.CURRENT_TEACHER_ID).name : "Admin Office", STATE.role[0].toUpperCase()+STATE.role.slice(1), "Announcements", "Posted announcement", title);
      pushNotification("New school announcement: " + title);
      closeModal(); toast("Announcement posted"); APP.navigate();
    }
  });

  /* ---------------- Reports ---------------- */
  route("#/admin/reports", () => `
    <div class="page-head"><div><h1>Reports</h1><div class="subtitle">Demo reports — export and print are simulated</div></div></div>
    <div class="filter-bar">
      <input type="date" value="2026-08-01" /> <input type="date" value="2026-09-06" />
      <select><option>All Grades</option><option>Grade 5</option><option>Grade 6</option></select>
      <select><option>All Classes</option>${DEMO.CLASSES.map(c=>`<option>${c.name}</option>`).join("")}</select>
      <select><option>All Subjects</option>${DEMO.SUBJECTS.map(s=>`<option>${s.name}</option>`).join("")}</select>
    </div>
    <div class="grid-3">
      ${DEMO.REPORTS.map(r => `
        <div class="card"><div class="card-body">
          <div style="font-weight:700;font-size:14.5px;margin-bottom:6px;">${esc(r.name)}</div>
          <p class="text-muted" style="font-size:12.5px;line-height:1.5;margin-bottom:16px;">${esc(r.description)}</p>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-outline btn-sm" style="flex:1;" onclick="APP.toast('Demo report preview')">View</button>
            <button class="btn btn-outline btn-sm" onclick="APP.toast('Demo only — printing disabled')">Print</button>
            <button class="btn btn-outline btn-sm" onclick="APP.toast('Demo only — export disabled')">Export CSV</button>
          </div>
        </div></div>`).join("")}
    </div>
  `);

  /* ---------------- Users & Roles ---------------- */
  route("#/admin/users", () => {
    const users = [
      { name: "Admin Office", role: "Admin", email: "admin@dandelion.edu.kh", status: "Active" },
      ...DEMO.TEACHERS.map(t => ({ name: t.name, role: "Teacher", email: t.email, status: "Active" })),
      { name: "Sok Dara", role: "Student", email: "dara.sok@student.dandelion.edu.kh", status: "Active" }
    ];
    return `
      <div class="page-head"><div><h1>Users & Roles</h1><div class="subtitle">System accounts and permission levels</div></div>
      <div class="actions"><button class="btn btn-primary" onclick="APP.toast('Demo only')">+ Invite User</button></div></div>
      <div class="card"><div class="table-wrap"><table class="data-table">
        <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Status</th><th></th></tr></thead>
        <tbody>${users.map(u => `<tr><td class="cell-name">${esc(u.name)}</td><td><span class="badge badge-gray">${esc(u.role)}</span></td><td class="cell-sub">${esc(u.email)}</td><td>${statusBadge(u.status)}</td><td><button class="btn btn-outline btn-sm" onclick="APP.toast('Demo only')">Manage</button></td></tr>`).join("")}</tbody>
      </table></div></div>
    `;
  });

  /* ---------------- Activity Log ---------------- */
  route("#/admin/activity", () => `
    <div class="page-head"><div><h1>Activity Log</h1><div class="subtitle">System-wide action history (most recent first)</div></div></div>
    <div class="card"><div class="table-wrap"><table class="data-table">
      <thead><tr><th>Date/Time</th><th>User</th><th>Role</th><th>Module</th><th>Action</th><th>Details</th></tr></thead>
      <tbody>${STATE.activityLog.map(a => `<tr><td class="cell-sub">${esc(a.datetime)}</td><td class="cell-name">${esc(a.user)}</td><td><span class="badge badge-gray">${esc(a.role)}</span></td><td>${esc(a.module)}</td><td>${esc(a.action)}</td><td class="cell-sub">${esc(a.details)}</td></tr>`).join("")}</tbody>
    </table></div></div>
  `);

  /* ---------------- Settings ---------------- */
  route("#/admin/settings", () => `
    <div class="page-head"><div><h1>Settings</h1><div class="subtitle">School configuration (demo)</div></div></div>
    <div class="settings-list">
      <div class="card"><div class="card-head"><h3>General</h3></div>
        <div class="settings-row"><span>School Name</span><span class="text-muted">Dandelion International Academy of Education</span></div>
        <div class="settings-row"><span>Academic Year</span><span class="text-muted">2026 – 2027</span></div>
        <div class="settings-row"><span>Language</span><span class="text-muted">English / ខ្មែរ (Khmer)</span></div>
      </div>
      <div class="card"><div class="card-head"><h3>Notifications</h3></div>
        <div class="settings-row"><span>New homework alerts</span><button class="toggle on"></button></div>
        <div class="settings-row"><span>Live class reminders</span><button class="toggle on"></button></div>
        <div class="settings-row"><span>Weekly report email to parents</span><button class="toggle"></button></div>
      </div>
      <div class="card"><div class="card-head"><h3>Future Add-ons <span class="badge badge-amber" style="margin-left:8px;">Optional / Future Scope</span></h3></div>
        <div class="card-body">
          <p class="text-muted" style="font-size:12.5px;margin-bottom:14px;">These are not part of the current demo or production scope — listed here for future planning discussion with the client.</p>
          <div class="future-list">
            ${DEMO.FUTURE_ADDONS.map(f => `<div class="future-item">✨ ${esc(f)}<span class="fi-tag">Future</span></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="card"><div class="card-head"><h3>Live Class Video Provider</h3></div><div class="card-body">
        <p style="font-size:13px;line-height:1.6;">This demo uses a mock classroom UI with no real video connection. In production, live classes can later integrate with <strong>Zoom</strong>, <strong>Google Meet</strong>, or an embedded video API/provider. This is <strong>not included</strong> in the current demo scope.</p>
      </div></div>
    </div>
  `);

})();
