/* ==========================================================================
   Shared views: Class Detail, Live Class → Video Classroom mock, Calendar
   Used by more than one role.
   ========================================================================== */
(function () {
  const { STATE, route, el, esc, initials, statusBadge, typeBadge, fmtDate, toast, openModal, closeModal, persist, logActivity } = APP;

  /* ---------------- Class Detail (tabs) ---------------- */
  function classDetailView(classId, backPath, tab) {
    const c = DEMO.classById(classId);
    if (!c) return `<div class="empty-state">Class not found.</div>`;
    tab = tab || "overview";
    const students = DEMO.studentsInClass(classId);
    const lessons = STATE.lessons.filter(l => l.classId === classId);
    const live = STATE.liveClasses.filter(l => l.classId === classId);
    const assignments = STATE.assignments.filter(a => a.classId === classId);
    const nextLive = live.filter(l => l.status !== "Completed")[0];
    const homeroom = DEMO.teacherById(c.homeroomTeacherId);
    const recentAnn = STATE.announcements[0];

    const tabs = [
      ["overview", "Overview"], ["lessons", "Lessons"], ["live", "Live Classes"],
      ["assignments", "Assignments"], ["attendance", "Attendance"], ["students", "Students"]
    ];

    let body = "";
    if (tab === "overview") {
      body = `
        <div class="grid-2">
          <div class="stack">
            <div class="card">
              <div class="card-head"><h3>Class Overview</h3></div>
              <div class="card-body">
                <div class="grid-3" style="margin-bottom:0;">
                  <div><div class="text-muted" style="font-size:11.5px;">Homeroom Teacher</div><div style="font-weight:700;margin-top:4px;">${esc(homeroom ? homeroom.name : "—")}</div></div>
                  <div><div class="text-muted" style="font-size:11.5px;">Grade</div><div style="font-weight:700;margin-top:4px;">${esc(c.grade)}</div></div>
                  <div><div class="text-muted" style="font-size:11.5px;">Students</div><div style="font-weight:700;margin-top:4px;">${students.length}</div></div>
                </div>
                <div class="divider"></div>
                <div class="section-title" style="font-size:13px;">Subject Teachers</div>
                <div class="grid-4">
                  ${Object.entries(c.subjectTeachers).map(([subj, tid]) => `
                    <div class="card-list-item" style="padding:10px 0;border:none;">
                      <div class="avatar-ring" style="width:34px;height:34px;font-size:11px;">${initials(DEMO.teacherById(tid).name)}</div>
                      <div><div style="font-weight:600;font-size:12.5px;">${esc(subj)}</div><div class="text-muted" style="font-size:11.5px;">${esc(DEMO.teacherById(tid).name)}</div></div>
                    </div>`).join("")}
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-head"><h3>Current / Recent Lesson</h3></div>
              <div class="card-body no-pad">
                ${lessons.slice(0, 1).map(l => lessonRow(l)).join("") || `<div class="empty-state">No lessons yet.</div>`}
              </div>
            </div>
          </div>
          <div class="stack">
            <div class="card">
              <div class="card-head"><h3>Next Live Session</h3></div>
              <div class="card-body">
                ${nextLive ? liveClassMini(nextLive) : `<div class="empty-state">No upcoming live class.</div>`}
              </div>
            </div>
            <div class="card">
              <div class="card-head"><h3>Recent Announcement</h3></div>
              <div class="card-body">
                ${recentAnn ? `<div style="font-weight:700;font-size:13.5px;margin-bottom:4px;">${esc(recentAnn.title)}</div><p class="text-muted" style="font-size:12.5px;line-height:1.5;">${esc(recentAnn.message)}</p>` : `<div class="empty-state">No announcements.</div>`}
              </div>
            </div>
          </div>
        </div>`;
    } else if (tab === "lessons") {
      body = `<div class="card"><div class="card-body no-pad">${lessons.map(l => lessonRow(l)).join("") || `<div class="empty-state">No lessons for this class.</div>`}</div></div>`;
    } else if (tab === "live") {
      body = `<div class="grid-3">${live.map(l => liveClassCard(l)).join("") || `<div class="empty-state">No live classes scheduled.</div>`}</div>`;
    } else if (tab === "assignments") {
      body = `<div class="table-wrap"><table class="data-table"><thead><tr><th>Assignment</th><th>Subject</th><th>Due</th><th>Status</th><th></th></tr></thead><tbody>
        ${assignments.map(a => `<tr><td class="cell-name">${esc(a.title)}</td><td>${esc(a.subject)}</td><td>${fmtDate(a.dueDate)}</td><td>${statusBadge(a.status)}</td><td><a href="#/teacher/assignments/${a.id}" class="btn btn-outline btn-sm">View</a></td></tr>`).join("") || `<tr><td colspan="5" class="empty-state">No assignments yet.</td></tr>`}
      </tbody></table></div>`;
    } else if (tab === "attendance") {
      const records = STATE.attendance.filter(a => a.classId === classId);
      body = `<div class="stack">${records.map(r => `
        <div class="card">
          <div class="card-head"><h3>${esc(r.subject)} — ${fmtDate(r.date)}</h3></div>
          <div class="card-body no-pad">
            ${Object.entries(r.records).map(([sid, st]) => {
              const s = DEMO.studentById(sid);
              return `<div class="card-list-item"><div class="avatar-ring" style="width:32px;height:32px;font-size:11px;">${initials(s.name)}</div><div style="flex:1;">${esc(s.name)}</div>${statusBadge(st)}</div>`;
            }).join("")}
          </div>
        </div>`).join("") || `<div class="empty-state">No attendance recorded yet.</div>`}</div>`;
    } else if (tab === "students") {
      body = `<div class="table-wrap"><table class="data-table"><thead><tr><th>Name</th><th>Guardian</th><th>Attendance</th><th>Status</th><th></th></tr></thead><tbody>
        ${students.map(s => `<tr><td class="cell-name">${esc(s.name)}</td><td>${esc(s.guardian)}</td><td>${s.attendancePct}%</td><td>${statusBadge(s.status)}</td><td><a href="#/admin/students/${s.id}" class="btn btn-outline btn-sm">View</a></td></tr>`).join("")}
      </tbody></table></div>`;
    }

    return `
      <div class="crumbs"><a href="${backPath}">Classes</a><span class="sep">/</span>${esc(c.name)}</div>
      <div class="page-head">
        <div><h1>${esc(c.name)}</h1><div class="subtitle">${esc(c.grade)} · Homeroom: ${esc(homeroom ? homeroom.name : "—")} · ${students.length} students</div></div>
      </div>
      <div class="tabs">
        ${tabs.map(([key, label]) => `<a href="#/class/${classId}/${key}?back=${encodeURIComponent(backPath)}" class="tab-btn ${tab === key ? "active" : ""}">${label}</a>`).join("")}
      </div>
      ${body}
    `;
  }

  function lessonRow(l) {
    return `<div class="card-list-item">
      <div class="avatar-ring" style="width:36px;height:36px;font-size:12px;">${esc(l.subject.slice(0,2).toUpperCase())}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:13.5px;">${esc(l.title)}</div>
        <div class="text-muted" style="font-size:12px;">${esc(l.subject)} · ${fmtDate(l.date)}</div>
      </div>
      ${statusBadge(l.status)}
      <a href="#/lesson/${l.id}" class="btn btn-outline btn-sm">Open</a>
    </div>`;
  }

  function liveClassMini(l) {
    const c = DEMO.classById(l.classId);
    const t = DEMO.teacherById(l.teacherId);
    return `<div>
      <div style="display:flex;align-items:center;justify-content:between;gap:8px;margin-bottom:8px;">
        <div style="font-weight:700;font-size:14px;">${esc(l.subject)} — ${esc(c.name)}</div>
      </div>
      <div class="text-muted" style="font-size:12.5px;margin-bottom:4px;">Teacher: ${esc(t.name)}</div>
      <div class="text-muted" style="font-size:12.5px;margin-bottom:12px;">${fmtDate(l.date)} · ${esc(l.time)}</div>
      <div style="display:flex;gap:8px;align-items:center;">${statusBadge(l.status)}
        <a href="#/video/${l.id}" class="btn btn-primary btn-sm" style="margin-left:auto;">Join Live Class</a>
      </div>
    </div>`;
  }

  function liveClassCard(l) {
    const c = DEMO.classById(l.classId);
    const t = DEMO.teacherById(l.teacherId);
    return `<div class="class-card">
      <span class="subject-tag">${esc(l.subject)}</span>
      <h3>${esc(c.name)}</h3>
      <div class="meta-row">👩‍🏫 ${esc(t.name)}</div>
      <div class="meta-row">🗓️ ${fmtDate(l.date)} · ${esc(l.time)} (${l.durationMin} min)</div>
      <div style="display:flex;align-items:center;gap:8px;">${statusBadge(l.status)}</div>
      <div style="display:flex;gap:8px;">
        ${l.status !== "Completed" ? `<a href="#/video/${l.id}" class="btn btn-primary btn-sm" style="flex:1;">Join Live Class</a>` : `<span class="btn btn-outline btn-sm" style="flex:1;justify-content:center;opacity:.6;">Recording N/A</span>`}
        <a href="#/class/${l.classId}/live" class="btn btn-outline btn-sm">Details</a>
      </div>
    </div>`;
  }
  window.SHARED_liveClassCard = liveClassCard;
  window.SHARED_lessonRow = lessonRow;
  window.CLASS_DETAIL_VIEW = classDetailView;

  route("#/class/:id/:tab", (p) => classDetailView(p.id, guessBack(), p.tab));
  route("#/class/:id", (p) => classDetailView(p.id, guessBack(), "overview"));
  function guessBack() {
    const qs = location.hash.split("?")[1];
    if (qs) { const params = new URLSearchParams(qs); if (params.get("back")) return decodeURIComponent(params.get("back")); }
    return "#/" + STATE.role + "/classes";
  }

  /* ---------------- Live Class Detail (View Details button target) ---------------- */
  route("#/live/:id", (p) => {
    const l = DEMO.liveClassById(p.id) || STATE.liveClasses.find(x => x.id === p.id);
    if (!l) return `<div class="empty-state">Live class not found.</div>`;
    const c = DEMO.classById(l.classId); const t = DEMO.teacherById(l.teacherId);
    return `
      <div class="crumbs"><a href="#/${STATE.role}/live">Live Classes</a><span class="sep">/</span>${esc(l.subject)}</div>
      <div class="page-head"><div><h1>${esc(l.subject)} — ${esc(c.name)}</h1><div class="subtitle">${fmtDate(l.date)} · ${esc(l.time)}</div></div>
      <div class="actions">${statusBadge(l.status)}</div></div>
      <div class="grid-2">
        <div class="card"><div class="card-head"><h3>Session Info</h3></div><div class="card-body">
          <div class="grid-3" style="margin-bottom:0;">
            <div><div class="text-muted" style="font-size:11.5px;">Teacher</div><div style="font-weight:700;margin-top:4px;">${esc(t.name)}</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Duration</div><div style="font-weight:700;margin-top:4px;">${l.durationMin} minutes</div></div>
            <div><div class="text-muted" style="font-size:11.5px;">Class</div><div style="font-weight:700;margin-top:4px;">${esc(c.name)}</div></div>
          </div>
          <div class="divider"></div>
          <a href="#/video/${l.id}" class="btn btn-primary">Join Live Class</a>
        </div></div>
        <div class="card"><div class="card-head"><h3>Participants (demo)</h3></div><div class="card-body no-pad">
          ${DEMO.studentsInClass(l.classId).slice(0, 6).map(s => `<div class="card-list-item"><div class="avatar-ring" style="width:30px;height:30px;font-size:11px;">${initials(s.name)}</div><div style="flex:1;">${esc(s.name)}</div></div>`).join("")}
        </div></div>
      </div>`;
  });

  /* ---------------- Video classroom mock ---------------- */
  route("#/video/:id", (p) => {
    const l = DEMO.liveClassById(p.id) || STATE.liveClasses.find(x => x.id === p.id);
    if (!l) return `<div class="empty-state">Live class not found.</div>`;
    const c = DEMO.classById(l.classId); const t = DEMO.teacherById(l.teacherId);
    const students = DEMO.studentsInClass(l.classId);
    const backPath = STATE.role === "teacher" ? "#/teacher/live" : STATE.role === "student" ? "#/student/live" : "#/admin/dashboard";
    setTimeout(() => startTimer(), 0);
    return `
      <div class="crumbs"><a href="${backPath}">Live Classes</a><span class="sep">/</span>Video Classroom</div>
      <div class="video-screen">
        <div class="video-topbar">
          <div class="vt-left"><span class="demo-tag">● Demo Classroom</span> <span>${esc(l.subject)} — ${esc(c.name)}</span></div>
          <div class="vt-right"><span id="vidTimer">00:00</span><span>👥 ${students.length + 1} participants</span></div>
        </div>
        <div class="video-main">
          <div class="video-stage">
            <div class="avatar-lg">${initials(t.name)}</div>
            <div class="stage-label">${esc(t.name)} (Teacher) ${STATE.role === "teacher" ? "· You" : ""}</div>
          </div>
          <div class="video-thumbs">
            ${students.map((s, i) => `
              <div class="video-thumb ${i % 3 === 1 ? "muted" : ""}">
                <div class="avatar-sm">${initials(s.name)}</div>
                <div class="thumb-name">${esc(s.name.split(" ")[0])}${STATE.role === "student" && s.id === DEMO.CURRENT_STUDENT_ID ? " (You)" : ""}</div>
              </div>`).join("")}
          </div>
        </div>
        <div class="video-controls">
          <button class="vc-btn" id="micBtn" title="Microphone">🎤</button>
          <button class="vc-btn" id="camBtn" title="Camera">📷</button>
          <button class="vc-btn" title="Screen Share">🖥️</button>
          <button class="vc-btn" title="Chat">💬</button>
          <button class="vc-btn" title="Participants">👥</button>
          <a href="${backPath}" class="vc-btn leave">⏻ Leave</a>
        </div>
      </div>
      <p class="text-muted" style="text-align:center;margin-top:14px;font-size:12px;">This is a demo classroom UI only — no real audio, video, or screen sharing is connected.</p>
    `;
  });

  let timerHandle = null;
  function startTimer() {
    clearInterval(timerHandle);
    const elm = document.getElementById("vidTimer");
    if (!elm) return;
    let secs = 0;
    timerHandle = setInterval(() => {
      const t = document.getElementById("vidTimer");
      if (!t) { clearInterval(timerHandle); return; }
      secs++;
      const m = String(Math.floor(secs / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      t.textContent = `${m}:${s}`;
    }, 1000);
    ["micBtn", "camBtn"].forEach(id => {
      const b = document.getElementById(id);
      if (b) b.addEventListener("click", () => { b.classList.toggle("off"); toast(b.classList.contains("off") ? "Turned off (demo)" : "Turned on (demo)"); });
    });
  }

  /* ---------------- Lesson detail (shared by teacher preview + student view) ---------------- */
  route("#/lesson/:id", (p) => {
    const l = STATE.lessons.find(x => x.id === p.id);
    if (!l) return `<div class="empty-state">Lesson not found.</div>`;
    const t = DEMO.teacherById(l.teacherId);
    const hw = l.homeworkId ? STATE.assignments.find(a => a.id === l.homeworkId) : null;
    const isStudent = STATE.role === "student";
    const completedList = STATE.completedLessons[DEMO.CURRENT_STUDENT_ID] || [];
    const isDone = completedList.includes(l.id);
    const backPath = STATE.role === "teacher" ? `#/class/${l.classId}/lessons` : "#/student/lessons";

    return `
      <div class="crumbs"><a href="${backPath}">Lessons</a><span class="sep">/</span>${esc(l.title)}</div>
      <div class="page-head">
        <div><h1>${esc(l.title)}</h1><div class="subtitle">${esc(l.subject)} · ${esc(DEMO.classById(l.classId).name)} · Teacher: ${esc(t.name)}</div></div>
        <div class="actions">${statusBadge(l.status)}</div>
      </div>
      <div class="grid-2">
        <div class="stack">
          <div class="card"><div class="card-head"><h3>Lesson Video</h3></div><div class="card-body">
            <div style="background:#0e1613;border-radius:12px;height:220px;display:flex;align-items:center;justify-content:center;color:#cfe8d8;font-size:13px;gap:8px;flex-direction:column;">
              <div style="font-size:34px;">▶️</div>
              <div>Recorded lesson placeholder — demo only</div>
            </div>
          </div></div>
          <div class="card"><div class="card-head"><h3>Learning Objective</h3></div><div class="card-body">${esc(l.objective)}</div></div>
          <div class="card"><div class="card-head"><h3>Lesson Notes</h3></div><div class="card-body">${esc(l.description)}</div></div>
        </div>
        <div class="stack">
          <div class="card"><div class="card-head"><h3>Materials</h3></div><div class="card-body no-pad">
            <div class="card-list-item">📄 <div style="flex:1;">${esc(l.pdf)}</div><button class="btn btn-outline btn-sm" onclick="APP.toast('Demo file — download not available')">Download</button></div>
            <div class="card-list-item">📝 <div style="flex:1;">${esc(l.worksheet)}</div><button class="btn btn-outline btn-sm" onclick="APP.toast('Demo file — download not available')">Download</button></div>
          </div></div>
          ${hw ? `<div class="card"><div class="card-head"><h3>Related Homework</h3></div><div class="card-body">
            <div style="font-weight:700;font-size:13.5px;">${esc(hw.title)}</div>
            <div class="text-muted" style="font-size:12.5px;margin-top:4px;">Due ${fmtDate(hw.dueDate)}</div>
            <a href="#/student/homework/${hw.id}" class="btn btn-primary btn-sm" style="margin-top:12px;">Open Homework</a>
          </div></div>` : ""}
          ${isStudent ? `<div class="card"><div class="card-body">
            <button class="btn ${isDone ? "btn-outline" : "btn-primary"} btn-block" id="markDoneBtn">${isDone ? "✓ Marked as Completed" : "Mark as Completed"}</button>
          </div></div>` : ""}
        </div>
      </div>
    `;
  });

  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "markDoneBtn") {
      const id = location.hash.split("/")[2];
      const sid = DEMO.CURRENT_STUDENT_ID;
      STATE.completedLessons[sid] = STATE.completedLessons[sid] || [];
      if (!STATE.completedLessons[sid].includes(id)) {
        STATE.completedLessons[sid].push(id);
        persist();
        logActivity(DEMO.studentById(sid).name, "Student", "Lessons", "Marked lesson completed", DEMO.lessonById(id) ? DEMO.lessonById(id).title : id);
        toast("Lesson marked as completed");
        APP.navigate();
      }
    }
  });

})();
