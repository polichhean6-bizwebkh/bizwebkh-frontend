/* ==========================================================================
   TEACHER views — demo identity: Ms. Lina (t-lina)
   ========================================================================== */
(function () {
  const { STATE, route, esc, initials, statusBadge, typeBadge, fmtDate, toast, openModal, closeModal, persist, logActivity, pushNotification } = APP;
  const TID = DEMO.CURRENT_TEACHER_ID;

  function myClasses() { return DEMO.classesForTeacher(TID); }
  function myClassIds() { return myClasses().map(c => c.id); }

  /* ---------------- Dashboard ---------------- */
  route("#/teacher/dashboard", () => {
    const t = DEMO.teacherById(TID);
    const classes = myClasses();
    const todaySched = DEMO.SCHEDULE.filter(s => s.teacherId === TID);
    const myAssignments = STATE.assignments.filter(a => a.teacherId === TID);
    const toReview = STATE.submissions.filter(s => myAssignments.some(a => a.id === s.assignmentId) && (s.status === "Submitted" || s.status === "Late"));
    const myLive = STATE.liveClasses.filter(l => l.teacherId === TID);
    const needingAttention = DEMO.STUDENTS.filter(s => classes.some(c => c.id === s.classId) && s.attendancePct < 90);

    return `
      <div class="welcome-banner">
        <div><h2>Welcome back, ${esc(t.name)} 👋</h2><p>${esc(t.department)} · Teaching ${classes.length} classes this term</p></div>
        <div class="wb-illustration">🌼</div>
      </div>
      <div class="page-head" style="margin-top:-6px;"><div></div>
        <div class="actions">
          ${qa2("📡", "Create Live Class", "#/teacher/live")}
          ${qa2("📘", "Create Lesson", "#/teacher/lessons")}
          ${qa2("📝", "Create Assignment", "#/teacher/assignments")}
          ${qa2("✅", "Mark Attendance", "#/teacher/attendance")}
          ${qa2("📣", "Post Announcement", "#/teacher/announcements")}
        </div>
      </div>
      <div class="grid-2">
        <div class="stack">
          <div class="card"><div class="card-head"><h3>My Classes</h3><a href="#/teacher/classes" class="link">See all</a></div>
            <div class="card-body no-pad">${classes.map(c => `<div class="card-list-item"><div style="flex:1;"><div style="font-weight:600;font-size:13.5px;">${esc(c.name)}</div><div class="text-muted" style="font-size:11.5px;">${c.studentIds.length} students</div></div><a href="#/class/${c.id}/overview?back=${encodeURIComponent("#/teacher/classes")}" class="btn btn-outline btn-sm">View Class</a></div>`).join("")}</div></div>
          <div class="card"><div class="card-head"><h3>Today's Schedule</h3></div>
            <div class="card-body no-pad">${todaySched.map(s => `<div class="card-list-item"><div style="width:100px;font-weight:700;font-size:12px;color:var(--ink-500);">${esc(s.time)}</div><div style="flex:1;">${esc(s.subject)} · ${esc(DEMO.classById(s.classId).name)}</div>${typeBadge(s.type)}</div>`).join("") || `<div class="empty-state">No sessions today.</div>`}</div></div>
          <div class="card"><div class="card-head"><h3>Assignments to Review</h3><a href="#/teacher/submissions" class="link">Open Submissions</a></div>
            <div class="card-body no-pad">${toReview.slice(0, 5).map(s => { const a = DEMO.assignmentById(s.assignmentId); const st = DEMO.studentById(s.studentId); return `<div class="card-list-item"><div class="avatar-ring" style="width:30px;height:30px;font-size:11px;">${initials(st.name)}</div><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(st.name)}</div><div class="text-muted" style="font-size:11.5px;">${esc(a.title)}</div></div>${statusBadge(s.status)}<a href="#/teacher/assignments/${a.id}/review/${s.studentId}" class="btn btn-outline btn-sm">Review</a></div>`; }).join("") || `<div class="empty-state">Nothing to review 🎉</div>`}</div></div>
        </div>
        <div class="stack">
          <div class="card"><div class="card-head"><h3>Upcoming Live Classes</h3><a href="#/teacher/live" class="link">See all</a></div>
            <div class="card-body no-pad">${myLive.filter(l => l.status !== "Completed").map(l => window.ADMIN_liveRow(l)).join("") || `<div class="empty-state">No upcoming sessions.</div>`}</div></div>
          <div class="card"><div class="card-head"><h3>Students Needing Attention</h3></div>
            <div class="card-body no-pad">${needingAttention.map(s => `<div class="card-list-item"><div class="avatar-ring" style="width:30px;height:30px;font-size:11px;">${initials(s.name)}</div><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(s.name)}</div><div class="text-muted" style="font-size:11.5px;">${esc(DEMO.classById(s.classId).name)}</div></div><span class="badge badge-amber">${s.attendancePct}% attendance</span></div>`).join("") || `<div class="empty-state">All students on track.</div>`}</div></div>
          <div class="card"><div class="card-head"><h3>Recent Announcements</h3><a href="#/teacher/announcements" class="link">See all</a></div>
            <div class="card-body no-pad">${STATE.announcements.slice(0, 3).map(a => `<div class="card-list-item"><div style="flex:1;"><div style="font-weight:600;font-size:13px;">${esc(a.title)}</div><div class="text-muted" style="font-size:11.5px;">${fmtDate(a.date)}</div></div></div>`).join("")}</div></div>
        </div>
      </div>
    `;
  });
  function qa2(icon, label, path) { return `<a href="${path}" class="btn btn-outline btn-sm">${icon} ${label}</a>`; }

  /* ---------------- My Classes ---------------- */
  route("#/teacher/classes", () => `
    <div class="page-head"><div><h1>My Classes</h1><div class="subtitle">Classes you teach this term</div></div></div>
    <div class="grid-3">${myClasses().map(c => {
      const subjectsTaught = Object.entries(c.subjectTeachers).filter(([, tid]) => tid === TID).map(([subj]) => subj);
      const sched = DEMO.SCHEDULE.filter(s => s.classId === c.id && s.teacherId === TID)[0];
      return `<div class="class-card">
        <span class="subject-tag">${esc(subjectsTaught.join(", ") || "Homeroom")}</span>
        <h3>${esc(c.name)}</h3>
        <div class="meta-row">🎓 ${c.studentIds.length} students</div>
        <div class="meta-row">🗓️ ${sched ? esc(sched.day + " " + sched.time) : "See schedule"}</div>
        <a href="#/class/${c.id}/overview?back=${encodeURIComponent("#/teacher/classes")}" class="btn btn-outline btn-block">View Class</a>
      </div>`;
    }).join("")}</div>
  `);

  /* ---------------- Live Classes ---------------- */
  route("#/teacher/live", () => {
    const live = STATE.liveClasses.filter(l => l.teacherId === TID);
    return `
      <div class="page-head"><div><h1>Live Classes</h1><div class="subtitle">Demo classroom sessions — no real video connected</div></div>
      <div class="actions"><button class="btn btn-primary" id="createLiveBtn">+ Create Live Class</button></div></div>
      <div class="grid-3">${live.map(window.SHARED_liveClassCard).join("") || `<div class="empty-state">No live classes scheduled.</div>`}</div>
    `;
  });
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "createLiveBtn") {
      openModal("Create Live Class (Demo)", `
        <div class="form-grid">
          <div class="form-field"><label>Class</label><select id="lvClass">${myClasses().map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}</select></div>
          <div class="form-field"><label>Subject</label><select id="lvSubject">${DEMO.SUBJECTS.map(s=>`<option>${s.name}</option>`).join("")}</select></div>
          <div class="form-field"><label>Date</label><input type="date" id="lvDate" value="2026-09-10" /></div>
          <div class="form-field"><label>Time</label><input id="lvTime" placeholder="e.g. 10:00 AM" value="10:00 AM" /></div>
        </div>
        <div class="form-actions"><button class="btn btn-outline" onclick="APP.closeModal()">Cancel</button><button class="btn btn-primary" id="saveLiveBtn">Create</button></div>
      `);
    }
    if (e.target && e.target.id === "saveLiveBtn") {
      const classId = document.getElementById("lvClass").value;
      const subject = document.getElementById("lvSubject").value;
      const date = document.getElementById("lvDate").value;
      const time = document.getElementById("lvTime").value || "10:00 AM";
      STATE.liveClasses.unshift({ id: "lv-" + Date.now(), subject, classId, teacherId: TID, date, time, durationMin: 45, status: "Upcoming" });
      persist();
      logActivity(DEMO.teacherById(TID).name, "Teacher", "Live Classes", "Created live class", `${subject} — ${DEMO.classById(classId).name}`);
      pushNotification(`${subject} live class scheduled for ${fmtDate(date)}`);
      closeModal(); toast("Live class created"); APP.navigate();
    }
  });

  /* ---------------- Lessons ---------------- */
  route("#/teacher/lessons", () => {
    const lessons = STATE.lessons.filter(l => l.teacherId === TID);
    return `
      <div class="page-head"><div><h1>Lessons</h1><div class="subtitle">Manage lessons for your classes</div></div>
      <div class="actions"><button class="btn btn-primary" id="createLessonBtn">+ Create Lesson</button></div></div>
      <div class="card"><div class="card-body no-pad">${lessons.map(window.SHARED_lessonRow).join("") || `<div class="empty-state">No lessons yet.</div>`}</div></div>
    `;
  });
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "createLessonBtn") {
      openModal("Create Lesson", `
        <div class="form-grid">
          <div class="form-field full"><label>Lesson Title</label><input id="lsTitle" placeholder="e.g. Adjectives and Adverbs" /></div>
          <div class="form-field"><label>Subject</label><select id="lsSubject">${DEMO.SUBJECTS.map(s=>`<option>${s.name}</option>`).join("")}</select></div>
          <div class="form-field"><label>Class</label><select id="lsClass">${myClasses().map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}</select></div>
          <div class="form-field"><label>Lesson Date</label><input type="date" id="lsDate" value="2026-09-12" /></div>
          <div class="form-field"><label>Status</label><select id="lsStatus"><option>Draft</option><option>Published</option></select></div>
          <div class="form-field full"><label>Description</label><textarea id="lsDesc" placeholder="Short description of the lesson"></textarea></div>
          <div class="form-field full"><label>Learning Objective</label><input id="lsObj" placeholder="Students will be able to..." /></div>
          <div class="form-field"><label>Video Link</label><input id="lsVideo" placeholder="demo://video/..." /></div>
          <div class="form-field"><label>PDF / File</label><input id="lsPdf" placeholder="filename.pdf" /></div>
          <div class="form-field"><label>Worksheet</label><input id="lsWorksheet" placeholder="worksheet.pdf" /></div>
        </div>
        <div class="form-actions"><button class="btn btn-outline" onclick="APP.closeModal()">Cancel</button><button class="btn btn-primary" id="saveLessonBtn">Save Lesson</button></div>
      `);
    }
    if (e.target && e.target.id === "saveLessonBtn") {
      const title = document.getElementById("lsTitle").value.trim() || "Untitled Lesson";
      const subject = document.getElementById("lsSubject").value;
      const classId = document.getElementById("lsClass").value;
      const date = document.getElementById("lsDate").value;
      const status = document.getElementById("lsStatus").value;
      const description = document.getElementById("lsDesc").value.trim() || "No description provided.";
      const objective = document.getElementById("lsObj").value.trim() || "—";
      const videoLink = document.getElementById("lsVideo").value.trim() || "demo://video/new-lesson";
      const pdf = document.getElementById("lsPdf").value.trim() || "lesson-material.pdf";
      const worksheet = document.getElementById("lsWorksheet").value.trim() || "worksheet.pdf";
      STATE.lessons.unshift({ id: "les-" + Date.now(), title, subject, classId, teacherId: TID, date, description, objective, videoLink, pdf, worksheet, homeworkId: null, status });
      persist();
      logActivity(DEMO.teacherById(TID).name, "Teacher", "Lessons", status === "Published" ? "Published lesson" : "Saved lesson draft", title);
      if (status === "Published") pushNotification(`New lesson posted: ${title}`);
      closeModal(); toast("Lesson saved"); APP.navigate();
    }
  });

  /* ---------------- Assignments ---------------- */
  route("#/teacher/assignments", () => {
    const assignments = STATE.assignments.filter(a => a.teacherId === TID);
    return `
      <div class="page-head"><div><h1>Assignments</h1><div class="subtitle">Homework and coursework you have set</div></div>
      <div class="actions"><button class="btn btn-primary" id="createAssignBtn">+ Create Assignment</button></div></div>
      <div class="table-wrap"><div class="card"><table class="data-table">
        <thead><tr><th>Title</th><th>Class</th><th>Due</th><th>Submitted</th><th>Status</th><th></th></tr></thead>
        <tbody>${assignments.map(a => {
          const subs = STATE.submissions.filter(s => s.assignmentId === a.id);
          const submittedCount = subs.filter(s => s.status !== "Not Submitted").length;
          return `<tr><td class="cell-name">${esc(a.title)}</td><td>${esc(DEMO.classById(a.classId).name)}</td><td>${fmtDate(a.dueDate)}</td><td>${submittedCount}/${subs.length || DEMO.classById(a.classId).studentIds.length}</td><td>${statusBadge(a.status)}</td><td><a href="#/teacher/assignments/${a.id}" class="btn btn-outline btn-sm">View</a></td></tr>`;
        }).join("")}</tbody>
      </table></div></div>
    `;
  });
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "createAssignBtn") {
      openModal("Create Assignment", `
        <div class="form-grid">
          <div class="form-field full"><label>Assignment Title</label><input id="asTitle" placeholder="e.g. Reading Response — Chapter 5" /></div>
          <div class="form-field"><label>Class</label><select id="asClass">${myClasses().map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}</select></div>
          <div class="form-field"><label>Subject</label><select id="asSubject">${DEMO.SUBJECTS.map(s=>`<option>${s.name}</option>`).join("")}</select></div>
          <div class="form-field full"><label>Instructions</label><textarea id="asInstr" placeholder="What should students do?"></textarea></div>
          <div class="form-field"><label>Attach File</label><input id="asFile" placeholder="worksheet.pdf" /></div>
          <div class="form-field"><label>Max Score</label><input id="asMax" type="number" value="100" /></div>
          <div class="form-field"><label>Published Date</label><input type="date" id="asPub" value="2026-09-06" /></div>
          <div class="form-field"><label>Due Date</label><input type="date" id="asDue" value="2026-09-13" /></div>
          <div class="form-field full checkbox-row"><input type="checkbox" id="asLate" /> <label for="asLate">Allow Late Submission</label></div>
        </div>
        <div class="form-actions"><button class="btn btn-outline" onclick="APP.closeModal()">Cancel</button><button class="btn btn-primary" id="saveAssignBtn">Publish Assignment</button></div>
      `);
    }
    if (e.target && e.target.id === "saveAssignBtn") {
      const title = document.getElementById("asTitle").value.trim() || "Untitled Assignment";
      const classId = document.getElementById("asClass").value;
      const subject = document.getElementById("asSubject").value;
      const instructions = document.getElementById("asInstr").value.trim() || "No instructions provided.";
      const attachFile = document.getElementById("asFile").value.trim() || null;
      const maxScore = Number(document.getElementById("asMax").value) || 100;
      const publishedDate = document.getElementById("asPub").value;
      const dueDate = document.getElementById("asDue").value;
      const allowLate = document.getElementById("asLate").checked;
      const id = "a-" + Date.now();
      STATE.assignments.unshift({ id, title, classId, subject, teacherId: TID, instructions, attachFile, publishedDate, dueDate, maxScore, allowLate, status: "Published" });
      persist();
      logActivity(DEMO.teacherById(TID).name, "Teacher", "Assignments", "Created assignment", title);
      pushNotification(`New ${subject} homework posted: ${title}`);
      closeModal(); toast("Assignment published"); location.hash = "#/teacher/assignments";
    }
  });

  route("#/teacher/assignments/:id", (p) => {
    const a = STATE.assignments.find(x => x.id === p.id);
    if (!a) return `<div class="empty-state">Assignment not found.</div>`;
    const c = DEMO.classById(a.classId);
    const subs = c.studentIds.map(sid => STATE.submissions.find(s => s.assignmentId === a.id && s.studentId === sid) || { studentId: sid, status: "Not Submitted", score: null, maxScore: a.maxScore });
    const counts = { "Not Submitted": 0, "Submitted": 0, "Late": 0, "Reviewed": 0 };
    subs.forEach(s => counts[s.status] = (counts[s.status] || 0) + 1);
    return `
      <div class="crumbs"><a href="#/teacher/assignments">Assignments</a><span class="sep">/</span>${esc(a.title)}</div>
      <div class="page-head"><div><h1>${esc(a.title)}</h1><div class="subtitle">${esc(a.subject)} · ${esc(c.name)} · Due ${fmtDate(a.dueDate)}</div></div>
      <div class="actions">${statusBadge(a.status)}</div></div>
      <div class="grid-4" style="margin-bottom:22px;">
        ${Object.entries(counts).map(([k, v]) => `<div class="kpi-card"><div class="kpi-label">${k}</div><div class="kpi-value">${v}</div></div>`).join("")}
      </div>
      <div class="grid-2">
        <div class="card"><div class="card-head"><h3>Instructions</h3></div><div class="card-body">
          <p style="font-size:13.5px;line-height:1.6;">${esc(a.instructions)}</p>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
            ${a.attachFile ? `<span class="badge badge-gray">📎 ${esc(a.attachFile)}</span>` : ""}
            <span class="badge badge-gray">Max Score: ${a.maxScore}</span>
            <span class="badge ${a.allowLate ? "badge-blue" : "badge-red"}">${a.allowLate ? "Late Allowed" : "No Late Submissions"}</span>
          </div>
        </div></div>
        <div class="card"><div class="card-head"><h3>Submissions</h3></div><div class="card-body no-pad">
          ${subs.map(s => { const st = DEMO.studentById(s.studentId); return `<div class="card-list-item"><div class="avatar-ring" style="width:30px;height:30px;font-size:11px;">${initials(st.name)}</div><div style="flex:1;">${esc(st.name)}</div>${statusBadge(s.status)}${s.status !== "Not Submitted" ? `<a href="#/teacher/assignments/${a.id}/review/${s.studentId}" class="btn btn-outline btn-sm">Review</a>` : ""}</div>`; }).join("")}
        </div></div>
      </div>
    `;
  });

  route("#/teacher/assignments/:id/review/:sid", (p) => {
    const a = STATE.assignments.find(x => x.id === p.id);
    const s = STATE.submissions.find(x => x.assignmentId === p.id && x.studentId === p.sid);
    const st = DEMO.studentById(p.sid);
    if (!a || !st) return `<div class="empty-state">Submission not found.</div>`;
    const sub = s || { status: "Not Submitted", score: null, feedback: null, file: null, comment: null, submittedAt: null };
    return `
      <div class="crumbs"><a href="#/teacher/assignments/${a.id}">${esc(a.title)}</a><span class="sep">/</span>${esc(st.name)}</div>
      <div class="page-head"><div><h1>Review Submission</h1><div class="subtitle">${esc(a.title)} · ${esc(st.name)}</div></div><div class="actions">${statusBadge(sub.status)}</div></div>
      <div class="grid-2">
        <div class="stack">
          <div class="card"><div class="card-head"><h3>Submission</h3></div><div class="card-body">
            <div class="grid-3" style="margin-bottom:0;">
              <div><div class="text-muted" style="font-size:11.5px;">Student</div><div style="font-weight:700;margin-top:4px;">${esc(st.name)}</div></div>
              <div><div class="text-muted" style="font-size:11.5px;">Submitted At</div><div style="font-weight:700;margin-top:4px;">${esc(sub.submittedAt || "—")}</div></div>
              <div><div class="text-muted" style="font-size:11.5px;">File</div><div style="font-weight:700;margin-top:4px;">${esc(sub.file || "—")}</div></div>
            </div>
            <div class="divider"></div>
            <div class="text-muted" style="font-size:11.5px;">Student Comment</div>
            <p style="font-size:13px;margin-top:6px;">${esc(sub.comment) || "<span class='text-muted'>No comment left.</span>"}</p>
          </div></div>
        </div>
        <div class="card"><div class="card-head"><h3>Grade & Feedback</h3></div><div class="card-body">
          <div class="form-grid">
            <div class="form-field"><label>Score (out of ${a.maxScore})</label><input type="number" id="revScore" value="${sub.score ?? ""}" max="${a.maxScore}" /></div>
            <div class="form-field"><label>Grade</label><input id="revGrade" value="${esc(sub.grade || "")}" placeholder="e.g. A-" /></div>
            <div class="form-field full"><label>Teacher Feedback</label><textarea id="revFeedback" placeholder="Write feedback for the student...">${esc(sub.feedback || "")}</textarea></div>
          </div>
          <div class="form-actions"><button class="btn btn-primary btn-block" id="returnToStudentBtn" data-aid="${a.id}" data-sid="${p.sid}">Return to Student</button></div>
        </div></div>
      </div>
    `;
  });
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "returnToStudentBtn") {
      const aid = e.target.dataset.aid, sid = e.target.dataset.sid;
      const score = Number(document.getElementById("revScore").value) || 0;
      const grade = document.getElementById("revGrade").value.trim() || "—";
      const feedback = document.getElementById("revFeedback").value.trim() || "Good effort.";
      let sub = STATE.submissions.find(x => x.assignmentId === aid && x.studentId === sid);
      const a = STATE.assignments.find(x => x.id === aid);
      if (!sub) { sub = { id: "sub-" + Date.now(), assignmentId: aid, studentId: sid, status: "Submitted", submittedAt: APP.nowStr(), file: "submission.pdf", comment: "" }; STATE.submissions.push(sub); }
      sub.score = score; sub.grade = grade; sub.feedback = feedback; sub.maxScore = a.maxScore; sub.status = "Reviewed";
      persist();
      logActivity(DEMO.teacherById(TID).name, "Teacher", "Submissions", "Reviewed submission", `${DEMO.studentById(sid).name} — ${a.title} (Score ${score}/${a.maxScore})`);
      pushNotification("Teacher reviewed your assignment");
      toast("Feedback returned to student");
      location.hash = `#/teacher/assignments/${aid}`;
    }
  });

  /* ---------------- Submissions (all classes) ---------------- */
  route("#/teacher/submissions", () => {
    const myAssignments = STATE.assignments.filter(a => a.teacherId === TID);
    const rows = [];
    myAssignments.forEach(a => { DEMO.classById(a.classId).studentIds.forEach(sid => {
      const s = STATE.submissions.find(x => x.assignmentId === a.id && x.studentId === sid) || { studentId: sid, status: "Not Submitted", score: null };
      rows.push({ a, s });
    }); });
    const counts = { "Not Submitted": 0, "Submitted": 0, "Late": 0, "Reviewed": 0 };
    rows.forEach(r => counts[r.s.status] = (counts[r.s.status] || 0) + 1);
    return `
      <div class="page-head"><div><h1>Submissions</h1><div class="subtitle">All student submissions across your assignments</div></div></div>
      <div class="grid-4" style="margin-bottom:22px;">${Object.entries(counts).map(([k,v]) => `<div class="kpi-card"><div class="kpi-label">${k}</div><div class="kpi-value">${v}</div></div>`).join("")}</div>
      <div class="filter-bar">
        <select id="subStatusFilter"><option value="">All Statuses</option><option>Not Submitted</option><option>Submitted</option><option>Late</option><option>Reviewed</option></select>
      </div>
      <div class="card"><div class="table-wrap"><table class="data-table" id="subsTable">
        <thead><tr><th>Student</th><th>Assignment</th><th>Class</th><th>Status</th><th>Score</th><th></th></tr></thead>
        <tbody>${rows.map(({a, s}) => { const st = DEMO.studentById(s.studentId); return `<tr data-status="${s.status}"><td class="cell-name">${esc(st.name)}</td><td>${esc(a.title)}</td><td>${esc(DEMO.classById(a.classId).name)}</td><td>${statusBadge(s.status)}</td><td>${s.score !== null && s.score !== undefined ? s.score + "/" + a.maxScore : "—"}</td><td>${s.status !== "Not Submitted" ? `<a href="#/teacher/assignments/${a.id}/review/${s.studentId}" class="btn btn-outline btn-sm">Review</a>` : `<span class="text-muted" style="font-size:12px;">—</span>`}</td></tr>`; }).join("")}</tbody>
      </table></div></div>
    `;
  });
  document.addEventListener("change", (e) => {
    if (e.target.id === "subStatusFilter") {
      const v = e.target.value;
      APP.$$("#subsTable tbody tr").forEach(tr => tr.style.display = (!v || tr.dataset.status === v) ? "" : "none");
    }
  });

  /* ---------------- Attendance ---------------- */
  route("#/teacher/attendance", () => {
    const classes = myClasses();
    return `
      <div class="page-head"><div><h1>Attendance</h1><div class="subtitle">Mark attendance for your classes</div></div></div>
      <div class="grid-3">${classes.map(c => `<div class="class-card"><span class="subject-tag">${esc(c.grade)}</span><h3>${esc(c.name)}</h3><div class="meta-row">🎓 ${c.studentIds.length} students</div><a href="#/teacher/attendance/${c.id}" class="btn btn-primary btn-block">Mark Attendance</a></div>`).join("")}</div>
    `;
  });
  route("#/teacher/attendance/:classId", (p) => {
    const c = DEMO.classById(p.classId);
    const students = DEMO.studentsInClass(p.classId);
    const today = "2026-09-06";
    const existing = STATE.attendance.find(a => a.classId === p.classId && a.date === today);
    const records = existing ? existing.records : {};
    return `
      <div class="crumbs"><a href="#/teacher/attendance">Attendance</a><span class="sep">/</span>${esc(c.name)}</div>
      <div class="page-head"><div><h1>Mark Attendance — ${esc(c.name)}</h1><div class="subtitle">${fmtDate(today)}</div></div></div>
      <div class="card"><div class="card-body no-pad">
        ${students.map(s => `
          <div class="card-list-item" data-student="${s.id}">
            <div class="avatar-ring" style="width:32px;height:32px;font-size:11px;">${initials(s.name)}</div>
            <div style="flex:1;font-weight:600;font-size:13.5px;">${esc(s.name)}</div>
            <div class="attendance-grid" style="flex:0 0 auto;width:340px;">
              ${["Present","Late","Absent","Excused"].map(st => `<button class="att-opt ${records[s.id] === st ? "sel-" + st.toLowerCase() : ""}" data-status="${st}">${st}</button>`).join("")}
            </div>
          </div>`).join("")}
      </div></div>
      <div class="form-actions"><button class="btn btn-primary" id="saveAttendanceBtn" data-class="${p.classId}">Save Attendance</button></div>
    `;
  });
  document.addEventListener("click", (e) => {
    const opt = e.target.closest(".att-opt");
    if (opt) {
      const row = opt.closest(".card-list-item");
      APP.$$(".att-opt", row).forEach(b => b.className = "att-opt");
      opt.classList.add("sel-" + opt.dataset.status.toLowerCase());
    }
    if (e.target && e.target.id === "saveAttendanceBtn") {
      const classId = e.target.dataset.class;
      const records = {};
      APP.$$(`[data-student]`).forEach(row => {
        const sel = row.querySelector(".att-opt[class*='sel-']");
        if (sel) records[row.dataset.student] = sel.dataset.status;
      });
      const today = "2026-09-06";
      let rec = STATE.attendance.find(a => a.classId === classId && a.date === today);
      const sched = DEMO.SCHEDULE.find(s => s.classId === classId && s.teacherId === TID);
      if (!rec) { rec = { classId, subject: sched ? sched.subject : "General", date: today, records: {} }; STATE.attendance.unshift(rec); }
      rec.records = records;
      persist();
      logActivity(DEMO.teacherById(TID).name, "Teacher", "Attendance", "Updated attendance", `${DEMO.classById(classId).name} — ${Object.keys(records).length} students marked`);
      toast("Attendance saved"); location.hash = "#/teacher/attendance";
    }
  });

  /* ---------------- Student Progress ---------------- */
  route("#/teacher/progress", () => {
    const classes = myClasses();
    return `
      <div class="page-head"><div><h1>Student Progress</h1><div class="subtitle">Performance overview across your classes</div></div></div>
      ${classes.map(c => `
        <div class="card" style="margin-bottom:16px;"><div class="card-head"><h3>${esc(c.name)}</h3></div>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th>Student</th><th>Attendance</th><th>Assignments Completed</th><th>Avg. Score</th><th>Status</th></tr></thead>
          <tbody>${DEMO.studentsInClass(c.id).map(s => {
            const subs = STATE.submissions.filter(x => x.studentId === s.id && x.score !== null && x.score !== undefined);
            const avg = subs.length ? Math.round(subs.reduce((sum, x) => sum + (x.score / x.maxScore) * 100, 0) / subs.length) : null;
            const total = STATE.assignments.filter(a => a.classId === c.id).length;
            const done = STATE.submissions.filter(x => x.studentId === s.id && x.status !== "Not Submitted" && STATE.assignments.find(a=>a.id===x.assignmentId && a.classId===c.id)).length;
            return `<tr><td class="cell-name">${esc(s.name)}</td><td>${s.attendancePct}%</td><td>${done}/${total}</td><td>${avg !== null ? avg + "%" : "—"}</td><td>${avg === null ? statusBadge("Draft") : avg >= 85 ? `<span class="badge badge-green">On Track</span>` : avg >= 70 ? `<span class="badge badge-amber">Monitor</span>` : `<span class="badge badge-red">Needs Support</span>`}</td></tr>`;
          }).join("")}</tbody>
        </table></div></div>
      `).join("")}
    `;
  });

  /* ---------------- Announcements ---------------- */
  route("#/teacher/announcements", () => window.ANNOUNCEMENTS_VIEW("teacher"));

})();
