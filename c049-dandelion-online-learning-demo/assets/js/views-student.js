/* ==========================================================================
   STUDENT views — demo identity: Sok Dara (s-dara)
   ========================================================================== */
(function () {
  const { STATE, route, esc, initials, statusBadge, typeBadge, fmtDate, toast, openModal, closeModal, persist, logActivity, pushNotification } = APP;
  const SID = DEMO.CURRENT_STUDENT_ID;

  function me() { return DEMO.studentById(SID); }
  function myClass() { return DEMO.classById(me().classId); }
  function mySubmissions() { return STATE.submissions.filter(s => s.studentId === SID); }
  function myAssignments() { return STATE.assignments.filter(a => a.classId === myClass().id); }

  /* ---------------- Dashboard ---------------- */
  route("#/student/dashboard", () => {
    const s = me(); const c = myClass();
    const live = STATE.liveClasses.filter(l => l.classId === c.id);
    const nextLive = live.filter(l => l.status !== "Completed").sort((a,b) => a.date.localeCompare(b.date))[0];
    const dueSoon = myAssignments().filter(a => {
      const sub = STATE.submissions.find(x => x.assignmentId === a.id && x.studentId === SID);
      return (!sub || sub.status === "Not Submitted") && a.status === "Published";
    });
    const lessonsThisWeek = STATE.lessons.filter(l => l.classId === c.id && l.status === "Published");
    const feedbackItems = mySubmissions().filter(s => s.status === "Reviewed").slice(0, 3);
    const recentLessons = lessonsThisWeek.slice(0, 4);

    return `
      <div class="welcome-banner">
        <div><h2>Welcome back, ${esc(s.name.split(" ")[0])} 👋</h2><p>${esc(c.name)} · ${esc(s.grade)} · Keep up the great work!</p></div>
        <div class="wb-illustration">🎒</div>
      </div>
      <div class="kpi-grid kpi-grid-5">
        ${kpi("Next Live Class", nextLive ? nextLive.subject : "None", "📡", nextLive ? nextLive.time : "")}
        ${kpi("Homework Due", dueSoon.length, "📚", "this week")}
        ${kpi("Lessons This Week", lessonsThisWeek.length, "📘", esc(c.name))}
        ${kpi("Attendance", s.attendancePct + "%", "✅", "last 30 days")}
        ${kpi("New Feedback", feedbackItems.length, "💬", "from teachers")}
      </div>
      <div class="grid-2">
        <div class="stack">
          <div class="card"><div class="card-head"><h3>My Classes</h3><a href="#/student/classes" class="link">See all</a></div>
            <div class="card-body no-pad"><div class="card-list-item"><div style="flex:1;"><div style="font-weight:700;">${esc(c.name)}</div><div class="text-muted" style="font-size:11.5px;">Homeroom: ${esc(DEMO.teacherById(c.homeroomTeacherId).name)}</div></div><a href="#/class/${c.id}/overview?back=${encodeURIComponent("#/student/classes")}" class="btn btn-outline btn-sm">Open</a></div></div></div>
          <div class="card"><div class="card-head"><h3>Upcoming Live Classes</h3><a href="#/student/live" class="link">See all</a></div>
            <div class="card-body no-pad">${live.filter(l=>l.status!=="Completed").map(l => window.ADMIN_liveRow(l)).join("") || `<div class="empty-state">No upcoming live classes.</div>`}</div></div>
          <div class="card"><div class="card-head"><h3>Recent Lessons</h3><a href="#/student/lessons" class="link">See all</a></div>
            <div class="card-body no-pad">${recentLessons.map(window.SHARED_lessonRow).join("") || `<div class="empty-state">No lessons yet.</div>`}</div></div>
        </div>
        <div class="stack">
          <div class="card"><div class="card-head"><h3>Homework Due Soon</h3><a href="#/student/homework" class="link">See all</a></div>
            <div class="card-body no-pad">${dueSoon.map(a => `<div class="card-list-item"><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(a.title)}</div><div class="text-muted" style="font-size:11.5px;">${esc(a.subject)} · Due ${fmtDate(a.dueDate)}</div></div><a href="#/student/homework/${a.id}" class="btn btn-primary btn-sm">Open</a></div>`).join("") || `<div class="empty-state">All caught up 🎉</div>`}</div></div>
          <div class="card"><div class="card-head"><h3>Recent Teacher Feedback</h3><a href="#/student/grades" class="link">See all</a></div>
            <div class="card-body no-pad">${feedbackItems.map(sub => { const a = DEMO.assignmentById(sub.assignmentId); return `<div class="card-list-item"><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(a.title)}</div><div class="text-muted" style="font-size:11.5px;">"${esc(sub.feedback)}"</div></div><span class="badge badge-green">${sub.score}/${sub.maxScore}</span></div>`; }).join("") || `<div class="empty-state">No feedback yet.</div>`}</div></div>
          <div class="card"><div class="card-head"><h3>Announcements</h3><a href="#/student/announcements" class="link">See all</a></div>
            <div class="card-body no-pad">${STATE.announcements.slice(0,3).map(a => `<div class="card-list-item"><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(a.title)}</div><div class="text-muted" style="font-size:11.5px;">${fmtDate(a.date)}</div></div></div>`).join("")}</div></div>
        </div>
      </div>
    `;
  });
  function kpi(label, value, icon, sub) { return `<div class="kpi-card"><div class="kpi-icon">${icon}</div><div class="kpi-label">${label}</div><div class="kpi-value" style="font-size:18px;">${esc(value)}</div><div class="kpi-sub">${esc(sub)}</div></div>`; }

  /* ---------------- My Classes ---------------- */
  route("#/student/classes", () => {
    const c = myClass();
    const subjects = Object.entries(c.subjectTeachers);
    return `
      <div class="page-head"><div><h1>My Classes</h1><div class="subtitle">${esc(c.name)} · ${esc(c.grade)}</div></div></div>
      <div class="grid-3">${subjects.map(([subj, tid]) => {
        const t = DEMO.teacherById(tid);
        const lessons = STATE.lessons.filter(l => l.classId === c.id && l.subject === subj && l.status === "Published");
        const total = lessons.length || 1;
        const done = (STATE.completedLessons[SID] || []).filter(id => lessons.some(l => l.id === id)).length;
        const pct = Math.round((done / total) * 100);
        const sched = DEMO.SCHEDULE.find(s => s.classId === c.id && s.subject === subj);
        const live = STATE.liveClasses.find(l => l.classId === c.id && l.subject === subj && l.status !== "Completed");
        return `<div class="class-card">
          <span class="subject-tag">${esc(subj)}</span>
          <h3>${esc(subj)}</h3>
          <div class="meta-row">👩‍🏫 ${esc(t.name)}</div>
          <div class="meta-row">🏫 ${esc(c.name)}</div>
          <div class="meta-row">🗓️ Next: ${sched ? esc(sched.day + " " + sched.time) : "—"}</div>
          <div class="progress-wrap"><div class="progress-label"><span>Progress</span><span>${pct}%</span></div><div class="progress-bar"><span style="width:${pct}%"></span></div></div>
          ${live ? `<a href="#/video/${live.id}" class="btn btn-primary btn-block">Join Class</a>` : `<a href="#/class/${c.id}/overview?back=${encodeURIComponent("#/student/classes")}" class="btn btn-outline btn-block">View Class</a>`}
        </div>`;
      }).join("")}</div>
    `;
  });

  /* ---------------- Live Classes ---------------- */
  route("#/student/live", () => {
    const live = STATE.liveClasses.filter(l => l.classId === myClass().id);
    return `
      <div class="page-head"><div><h1>Live Classes</h1><div class="subtitle">Join your scheduled online classes</div></div></div>
      <div class="grid-3">${live.map(window.SHARED_liveClassCard).join("") || `<div class="empty-state">No live classes scheduled.</div>`}</div>
    `;
  });

  /* ---------------- Lessons ---------------- */
  route("#/student/lessons", () => {
    const lessons = STATE.lessons.filter(l => l.classId === myClass().id && l.status === "Published");
    const completed = STATE.completedLessons[SID] || [];
    return `
      <div class="page-head"><div><h1>Lessons</h1><div class="subtitle">${esc(myClass().name)} · Published lessons from your teachers</div></div></div>
      <div class="card"><div class="card-body no-pad">
        ${lessons.map(l => `<div class="card-list-item">
          <div class="avatar-ring" style="width:36px;height:36px;font-size:12px;">${esc(l.subject.slice(0,2).toUpperCase())}</div>
          <div style="flex:1;min-width:0;"><div style="font-weight:600;font-size:13.5px;">${esc(l.title)}</div><div class="text-muted" style="font-size:12px;">${esc(l.subject)} · ${fmtDate(l.date)}</div></div>
          ${completed.includes(l.id) ? `<span class="badge badge-green">✓ Completed</span>` : ""}
          <a href="#/lesson/${l.id}" class="btn btn-outline btn-sm">Open</a>
        </div>`).join("") || `<div class="empty-state">No lessons published yet.</div>`}
      </div></div>
    `;
  });

  /* ---------------- Homework ---------------- */
  route("#/student/homework", () => {
    const assignments = myAssignments().filter(a => a.status === "Published");
    return `
      <div class="page-head"><div><h1>Homework</h1><div class="subtitle">Assignments for ${esc(myClass().name)}</div></div></div>
      <div class="card"><div class="table-wrap"><table class="data-table">
        <thead><tr><th>Assignment</th><th>Subject</th><th>Due Date</th><th>Status</th><th></th></tr></thead>
        <tbody>${assignments.map(a => {
          const sub = STATE.submissions.find(x => x.assignmentId === a.id && x.studentId === SID);
          const status = sub ? sub.status : "Not Submitted";
          return `<tr><td class="cell-name">${esc(a.title)}</td><td>${esc(a.subject)}</td><td>${fmtDate(a.dueDate)}</td><td>${statusBadge(status)}</td><td><a href="#/student/homework/${a.id}" class="btn btn-outline btn-sm">Open</a></td></tr>`;
        }).join("")}</tbody>
      </table></div></div>
    `;
  });

  route("#/student/homework/:id", (p) => {
    const a = STATE.assignments.find(x => x.id === p.id);
    if (!a) return `<div class="empty-state">Assignment not found.</div>`;
    const t = DEMO.teacherById(a.teacherId);
    const sub = STATE.submissions.find(x => x.assignmentId === a.id && x.studentId === SID);
    const status = sub ? sub.status : "Not Submitted";
    const canSubmit = status === "Not Submitted" || status === "Late";
    return `
      <div class="crumbs"><a href="#/student/homework">Homework</a><span class="sep">/</span>${esc(a.title)}</div>
      <div class="page-head"><div><h1>${esc(a.title)}</h1><div class="subtitle">${esc(a.subject)} · Teacher: ${esc(t.name)}</div></div><div class="actions">${statusBadge(status)}</div></div>
      <div class="grid-2">
        <div class="card"><div class="card-head"><h3>Instructions</h3></div><div class="card-body">
          <p style="font-size:13.5px;line-height:1.6;">${esc(a.instructions)}</p>
          <div class="divider"></div>
          <div class="grid-3" style="margin-bottom:0;">
            <div><div class="text-muted" style="font-size:11.5px;">Due Date</div><div style="font-weight:700;margin-top:4px;">${fmtDate(a.dueDate)}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Max Score</div><div style="font-weight:700;margin-top:4px;">${a.maxScore}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Attachment</div><div style="font-weight:700;margin-top:4px;">${a.attachFile ? "📎 " + esc(a.attachFile) : "—"}</div></div>
          </div>
        </div></div>
        <div class="card"><div class="card-head"><h3>${canSubmit ? "Submit Your Work" : "Your Submission"}</h3></div><div class="card-body">
          ${canSubmit ? `
            <div class="form-field" style="margin-bottom:12px;"><label>Upload File</label><input type="file" id="hwFile" /></div>
            <div class="form-field" style="margin-bottom:16px;"><label>Add Comment (optional)</label><textarea id="hwComment" placeholder="Add a note for your teacher..."></textarea></div>
            <button class="btn btn-primary btn-block" id="submitHwBtn" data-aid="${a.id}">Submit Assignment</button>
          ` : `
            <div class="grid-3" style="margin-bottom:0;">
              <div><div class="text-muted" style="font-size:11.5px;">Submitted At</div><div style="font-weight:700;margin-top:4px;">${esc(sub.submittedAt)}</div></div>
              <div><div class="text-muted" style="font-size:11.5px;">File</div><div style="font-weight:700;margin-top:4px;">${esc(sub.file)}</div></div>
              <div><div class="text-muted" style="font-size:11.5px;">Status</div><div style="margin-top:4px;">${statusBadge(status)}</div></div>
            </div>
            ${sub.comment ? `<div class="divider"></div><div class="text-muted" style="font-size:11.5px;">Your Comment</div><p style="font-size:13px;margin-top:6px;">${esc(sub.comment)}</p>` : ""}
            ${sub.status === "Reviewed" ? `<div class="divider"></div><div class="text-muted" style="font-size:11.5px;">Score</div><div style="font-weight:800;font-size:20px;color:var(--green-700);margin-top:4px;">${sub.score} / ${sub.maxScore}</div><div class="text-muted" style="font-size:11.5px;margin-top:10px;">Feedback</div><p style="font-size:13px;margin-top:6px;">${esc(sub.feedback)}</p>` : `<p class="text-muted" style="font-size:12.5px;margin-top:14px;">Waiting for your teacher to review this submission.</p>`}
          `}
        </div></div>
      </div>
    `;
  });
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "submitHwBtn") {
      const aid = e.target.dataset.aid;
      const fileInput = document.getElementById("hwFile");
      const fileName = (fileInput && fileInput.files && fileInput.files[0]) ? fileInput.files[0].name : "sok-dara-submission.pdf";
      const comment = document.getElementById("hwComment").value.trim();
      const a = STATE.assignments.find(x => x.id === aid);
      const isLate = new Date("2026-09-06") > new Date(a.dueDate);
      let sub = STATE.submissions.find(x => x.assignmentId === aid && x.studentId === SID);
      const payload = { status: isLate ? "Late" : "Submitted", submittedAt: APP.nowStr(), file: fileName, comment, score: null, grade: null, feedback: null, maxScore: a.maxScore };
      if (sub) Object.assign(sub, payload);
      else { sub = Object.assign({ id: "sub-" + Date.now(), assignmentId: aid, studentId: SID }, payload); STATE.submissions.push(sub); }
      persist();
      logActivity(me().name, "Student", "Assignments", "Submitted homework", `${a.title} (${DEMO.classById(a.classId).name})`);
      toast("Assignment submitted!");
      APP.navigate();
    }
  });

  /* ---------------- Submitted Work ---------------- */
  route("#/student/submitted", () => {
    const subs = mySubmissions().filter(s => s.status !== "Not Submitted");
    return `
      <div class="page-head"><div><h1>Submitted Work</h1><div class="subtitle">Everything you have handed in</div></div></div>
      <div class="card"><div class="table-wrap"><table class="data-table">
        <thead><tr><th>Assignment</th><th>Subject</th><th>Submitted At</th><th>Status</th><th>Score</th></tr></thead>
        <tbody>${subs.map(s => { const a = DEMO.assignmentById(s.assignmentId); return `<tr><td class="cell-name">${esc(a.title)}</td><td>${esc(a.subject)}</td><td class="cell-sub">${esc(s.submittedAt)}</td><td>${statusBadge(s.status)}</td><td>${s.score !== null ? s.score + "/" + s.maxScore : "—"}</td></tr>`; }).join("") || `<tr><td colspan="5" class="empty-state">No submissions yet.</td></tr>`}</tbody>
      </table></div></div>
    `;
  });

  /* ---------------- Grades / Feedback ---------------- */
  route("#/student/grades", () => {
    const subs = mySubmissions().filter(s => s.status === "Reviewed");
    return `
      <div class="page-head"><div><h1>Grades &amp; Feedback</h1><div class="subtitle">Reviewed assignments with teacher feedback</div></div></div>
      <div class="stack">
        ${subs.map(s => { const a = DEMO.assignmentById(s.assignmentId); return `
          <div class="card"><div class="card-body">
            <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">
              <div><div style="font-weight:700;font-size:14.5px;">${esc(a.title)}</div><div class="text-muted" style="font-size:12px;margin-top:2px;">${esc(a.subject)} · ${fmtDate(s.submittedAt.split(" ")[0])}</div></div>
              <div style="text-align:right;"><div style="font-weight:800;font-size:18px;color:var(--green-700);">${s.score}/${s.maxScore}</div><div class="badge badge-green">${esc(s.grade)}</div></div>
            </div>
            <div class="divider"></div>
            <div class="text-muted" style="font-size:11.5px;">Teacher Feedback</div>
            <p style="font-size:13px;margin-top:6px;">${esc(s.feedback)}</p>
          </div></div>`; }).join("") || `<div class="empty-state">No grades yet — keep submitting your homework!</div>`}
      </div>
    `;
  });

  /* ---------------- Announcements ---------------- */
  route("#/student/announcements", () => window.ANNOUNCEMENTS_VIEW("student"));

  /* ---------------- Calendar ---------------- */
  route("#/student/calendar", () => calendarView());
  function calendarView() {
    // Simple fixed month grid for September 2026 (demo "today" = Sept 6, 2026)
    const year = 2026, month = 8; // 0-indexed: September
    const first = new Date(year, month, 1);
    const startDow = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const events = {}; // dateStr -> [{label, type}]
    function add(dateStr, label, type) { (events[dateStr] = events[dateStr] || []).push({ label, type }); }
    STATE.liveClasses.filter(l => l.classId === myClass().id).forEach(l => add(l.date, l.subject + " Live", "live"));
    myAssignments().forEach(a => add(a.dueDate, a.title, "hw"));
    STATE.announcements.forEach(a => add(a.date, a.title, "ann"));
    add("2026-09-21", "Mid-Term Break Starts", "event");
    add("2026-09-15", "Parent-Teacher Meeting", "event");

    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const dow = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let html = `<div class="page-head"><div><h1>Calendar</h1><div class="subtitle">September 2026 · ${esc(myClass().name)}</div></div></div>`;
    html += `<div class="cal-grid">`;
    dow.forEach(d => html += `<div class="cal-dow">${d}</div>`);
    cells.forEach(d => {
      if (!d) { html += `<div class="cal-cell other-month"></div>`; return; }
      const dateStr = `2026-09-${String(d).padStart(2,"0")}`;
      const isToday = dateStr === "2026-09-06";
      const evs = events[dateStr] || [];
      html += `<div class="cal-cell ${isToday ? "today" : ""} ${evs.length ? "has-event" : ""}"><div class="cal-date">${d}</div>${evs.slice(0,3).map(e => `<div class="cal-event ev-${e.type}">${esc(e.label)}</div>`).join("")}</div>`;
    });
    html += `</div>`;
    html += `<div class="cal-legend">
      <div class="lg-item"><span class="lg-dot" style="background:var(--danger)"></span> Live Classes</div>
      <div class="lg-item"><span class="lg-dot" style="background:var(--warning)"></span> Homework Deadlines</div>
      <div class="lg-item"><span class="lg-dot" style="background:var(--info)"></span> Announcements</div>
      <div class="lg-item"><span class="lg-dot" style="background:var(--green-600)"></span> School Events</div>
    </div>`;
    return html;
  }

  /* ---------------- Profile ---------------- */
  route("#/student/profile", () => {
    const s = me(); const c = myClass();
    const subs = mySubmissions();
    return `
      <div class="page-head"><div style="display:flex;gap:14px;align-items:center;"><div class="avatar-ring" style="width:56px;height:56px;font-size:18px;">${initials(s.name)}</div>
        <div><h1>${esc(s.name)}</h1><div class="subtitle">${esc(s.grade)} · ${esc(c.name)} · ${esc(s.id.toUpperCase())}</div></div></div></div>
      <div class="tabs"><span class="tab-btn active">Profile</span><span class="tab-btn">Attendance</span><span class="tab-btn">Assignments</span><span class="tab-btn">Grades</span></div>
      <div class="grid-2">
        <div class="card"><div class="card-head"><h3>Profile Info</h3></div><div class="card-body">
          <div class="grid-3" style="margin-bottom:0;">
            <div><div class="text-muted" style="font-size:11.5px;">Student ID</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(s.id.toUpperCase())}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Email</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(s.email)}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Phone</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(s.phone)}</div></div>
            <div style="margin-top:14px;"><div class="text-muted" style="font-size:11.5px;">Guardian</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${esc(s.guardian)}</div></div>
            <div style="margin-top:14px;"><div class="text-muted" style="font-size:11.5px;">Enrollment Date</div><div style="font-weight:600;margin-top:4px;font-size:13px;">${fmtDate(s.enrollmentDate)}</div></div>
            <div style="margin-top:14px;"><div class="text-muted" style="font-size:11.5px;">Attendance</div><div style="font-weight:700;margin-top:4px;font-size:13px;color:var(--green-700);">${s.attendancePct}%</div></div>
          </div>
        </div></div>
        <div class="card"><div class="card-head"><h3>Assignment History</h3></div><div class="card-body no-pad">
          ${subs.map(sub => { const a = DEMO.assignmentById(sub.assignmentId); return `<div class="card-list-item"><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(a.title)}</div><div class="text-muted" style="font-size:11.5px;">${esc(a.subject)}</div></div>${statusBadge(sub.status)}</div>`; }).join("") || `<div class="empty-state">No assignment history yet.</div>`}
        </div></div>
      </div>
    `;
  });

})();
