# C049 — Dandelion Online Learning & Teaching System
## UX/UI + User-Flow Review of the Current Demo

*Documentation only — no files were modified, no functionality was changed or invented. Everything below reflects what is actually built in `c049-dandelion-online-learning-demo/` today, verified directly against the source files (`index.html`, `assets/css/style.css`, `assets/js/data.js`, `assets/js/app.js`, `assets/js/views-shared.js`, `assets/js/views-admin.js`, `assets/js/views-teacher.js`, `assets/js/views-student.js`).*

---

## 1. Executive Summary

C049 is a **frontend-only demo** of an Online Learning & Teaching System for Dandelion International Academy of Education, built as a single-page application (vanilla HTML/CSS/JS, hash-based routing, no framework, no backend). It runs entirely in the browser by opening `index.html` — there is no server, no real authentication, no database, and no live video.

**What it's designed to show a client:** how three types of users — Admin, Teacher, Student — would experience an online class portal: browsing classes, joining a (mock) live class, publishing/consuming lessons and homework, grading, attendance, announcements, and basic reporting.

**Primary users:** School Admin staff, Teachers, Students (with one fixed demo identity per role — Admin Office, Ms. Lina, and Sok Dara — rather than a real multi-account login system).

**Main learning use cases covered:** viewing a class timetable, joining a live class session, watching/reading a published lesson and marking it done, submitting homework with a file and comment, receiving a teacher's score and written feedback, tracking personal attendance, and reading school announcements.

**Current demo capability, in one line:** every module named in the original brief exists as a working, clickable screen with realistic (but fixed/seeded) sample data, and several of them are genuinely interactive — actions taken (submit homework, grade a submission, mark attendance, create a lesson/assignment/live class, post an announcement) are written to browser `localStorage` and immediately reflected across role views and the Activity Log, without a page reload. Nothing here is wired to a real backend, real video provider, or real payment system, and none of that is simulated as if it were real.

---

## 2. User Roles

There are exactly **three roles**, switched instantly from a pill control in the top bar (`Admin / Teacher / Student`). There is no login screen — switching roles is an explicit demo convenience, not an authentication flow.

| | **Admin** | **Teacher** | **Student** |
|---|---|---|---|
| Demo identity | "Admin Office" (generic) | Ms. Lina (English teacher, homeroom of Grade 5A) | Sok Dara (Grade 5A) |
| Dashboard | KPI-driven school overview | Personal teaching overview | Personal learning overview |
| Nav items | 11 | 9 | 10 |
| Can create/edit demo data | Students, Classes (buttons present, save is simulated — see §24), Announcements (fully functional) | Live Classes, Lessons, Assignments, Attendance, Announcements (all fully functional) | Homework submissions, "mark lesson complete" (fully functional) |
| Restrictions | No Settings page for Teacher/Student roles at all — it's Admin-only. Teacher/Student cannot see other classes' rosters, other teachers' assignments, or system-wide reports. | Scoped to "my classes" (only classes where Ms. Lina teaches a subject or is homeroom teacher — currently just Grade 5A) everywhere except announcements, which are global. | Scoped entirely to Sok Dara's own class (Grade 5A) and own submissions/grades/attendance. |

Because each role has exactly one hard-coded demo identity (`DEMO.CURRENT_TEACHER_ID = "t-lina"`, `DEMO.CURRENT_STUDENT_ID = "s-dara"`), the Teacher and Student experiences cannot currently be previewed as any other teacher or student — switching the role always returns to Ms. Lina or Sok Dara.

---

## 3. Navigation Map (exact, as implemented)

**Admin** (`#/admin/...`): Dashboard · Students · Teachers · Classes · Subjects · Schedule · Announcements · Reports · Users & Roles · Activity Log · Settings

**Teacher** (`#/teacher/...`): Dashboard · My Classes · Live Classes · Lessons · Assignments · Submissions · Attendance · Student Progress · Announcements
*(No Settings item for Teacher.)*

**Student** (`#/student/...`): Dashboard · My Classes · Live Classes · Lessons · Homework · Submitted Work · Grades / Feedback · Announcements · Calendar · Profile

This matches the brief's module list exactly — nothing extra was added, nothing was dropped.

**Shared routes** (reached by clicking through from any role's list pages, not from the sidebar itself): Class Detail (`#/class/:id/:tab`), Live Class Detail (`#/live/:id`), Video Classroom (`#/video/:id`), Lesson Detail (`#/lesson/:id`), and drill-down detail pages for a Student (`#/admin/students/:id`) and Teacher (`#/admin/teachers/:id`) reached from Admin's list views.

All navigation is a single URL hash change handled by one router (`app.js`), so the browser back/forward buttons work, and every page can be deep-linked or refreshed without losing your place (state is re-derived from `localStorage` + the hash on every load).

---

## 4. Module-by-Module UX Summary

### 4.1 Student Dashboard
Order top to bottom: a green **welcome banner** ("Welcome back, Sok 👋" + class/grade line + a backpack emoji), a row of **5 KPI cards** (Next Live Class, Homework Due, Lessons This Week, Attendance, New Feedback), then a **two-column body**: left column = My Classes → Upcoming Live Classes → Recent Lessons; right column = Homework Due Soon → Recent Teacher Feedback → Announcements. All numbers are computed live from the current data set (e.g. "Homework Due" counts assignments with no submission yet), not static text. There is no explicit "Quick Actions" block on the student dashboard (that pattern exists on Teacher only) — the brief asked for one implicitly via the "Main sections" list, and it's effectively covered by the direct action buttons inside each card (Open / Join) instead of a separate action bar.

### 4.2 Teacher Dashboard
A welcome banner ("Welcome back, Ms. Lina 👋") is immediately followed by a **row of 5 outline-button quick actions** (Create Live Class, Create Lesson, Create Assignment, Mark Attendance, Post Announcement) — each is a real link to the relevant module (not yet a one-step inline creation from the dashboard itself). Below that, a two-column body: left = My Classes → Today's Schedule → Assignments to Review (with a direct "Review" button per row); right = Upcoming Live Classes → Students Needing Attention (any student in her classes with attendance under 90%, e.g. Vanna Chhay/Borey Suon in the seed data) → Recent Announcements.

### 4.3 Admin Dashboard
A **6-card KPI row**: Total Students (248), Total Teachers (26), Active Classes (18), Live Classes Today (6), Assignments Due (14), Avg. Attendance (92%) — these are fixed constants from the brief, not computed from the (smaller) sample roster, so they intentionally represent "the whole school" while the detail screens show a realistic working subset (18 students, 8 teachers, 3 classes). Below: Today's Live Classes, Recent Assignments, Student Activity (left) and Upcoming Schedule, Recent Announcements, Quick Actions grid (right).

### 4.4 My Classes Flow
**Student:** Dashboard → My Classes → shows one card **per subject** (English/Mathematics/Science/ICT) rather than one card per class, since the student is only in one class — each card shows subject teacher, class, next scheduled time, a lesson-completion progress bar, and either "Join Class" (if that subject has a live session right now) or "View Class" → opens the shared Class Detail page with tabs **Overview / Lessons / Live Classes / Assignments / Attendance / Students**.

**Teacher:** Dashboard → My Classes → one card per class she teaches (currently just Grade 5A) → "View Class" → same shared Class Detail page with the same 6 tabs. There is no teacher-only class-management form (add/remove student, edit schedule) inside Class Detail — it's a read-only overview + tab-based content browser for both roles.

### 4.5 Live Class Flow — demo classroom only
**Student:** Live Classes list (or a live card on the Dashboard) → "Join Live Class" → **Video Classroom mock screen**: dark theme, "🟠 Demo Classroom" badge, class title, a running **timer** (starts at 00:00 and counts up in real seconds), a participant count, one large teacher tile (initials avatar) and a scrollable rail of student thumbnail tiles (a couple shown as muted with a 🔇 badge). Controls at the bottom: **Microphone** and **Camera** buttons toggle a visual on/off state and fire a toast ("Turned off (demo)"); **Screen Share**, **Chat**, **Participants** buttons are present but inert (decorative only — no click handler); **Leave** returns to the role's Live Classes list. A caption under the screen explicitly states: *"This is a demo classroom UI only — no real audio, video, or screen sharing is connected."*

**Teacher:** same Video Classroom screen, reached via "Create Live Class" (opens a modal with Class/Subject/Date/Time fields, writes a new live-class record) or by clicking an existing session's "Join Live Class" button. There is no separate "Start Class" step for the teacher — creating or opening a session and clicking Join both land on the identical mock room.

There is also a **"View Details" / Live Class Detail** page (`#/live/:id`) reachable from class-card and dashboard rows, showing session info (teacher, duration, class) and a static participant list, with its own "Join Live Class" button into the same mock room.

### 4.6 Lesson Flow
**Teacher:** Lessons list → "+ Create Lesson" modal with fields Title, Subject, Class, Lesson Date, Status (Draft/Published), Description, Learning Objective, Video Link, PDF/File, Worksheet. Saving adds it to the top of the list, logs an Activity Log entry, and — only if published — pushes a notification ("New lesson posted: …"). There is no separate "assign related homework" picker inside the lesson form; that link only exists on lessons that were pre-seeded with a `homeworkId`.

**Student:** Class Detail → Lessons tab, or sidebar → Lessons → shows only lessons with Status = Published for her class → "Open" → Lesson Detail page: video placeholder (▶️ icon, labeled "Recorded lesson placeholder — demo only"), Learning Objective, Lesson Notes, a Materials card (PDF + Worksheet, each with a "Download" button that shows a toast saying the demo file isn't downloadable), a Related Homework card when one is linked, and a **"Mark as Completed"** button that toggles to "✓ Marked as Completed" and updates the per-subject progress bar on My Classes.

### 4.7 Assignment / Homework Flow
**Teacher:** Assignments list → "+ Create Assignment" modal (Title, Class, Subject, Instructions, Attach File, Max Score, Published/Due Date, Allow Late checkbox) → publishing logs activity and pushes a notification, then redirects straight to the Assignments list. Assignment Detail page shows a 4-card status breakdown (Not Submitted / Submitted / Late / Reviewed counts) and a per-student submission list with "Review" buttons.

**Student:** Homework list → open one → Instructions + due date + max score + attachment shown; if not yet (or late-eligible to) submit: a file input, an optional comment box, and "Submit Assignment" — submitting computes Submitted vs Late automatically by comparing today's simulated date (2026‑09‑06) to the due date, stores the filename/comment/timestamp, and immediately flips the page into the read-only "already submitted" view.

**Teacher review:** Submissions list (all classes, with status-count KPIs and a status filter) or Assignment Detail → "Review" → a two-column page: submission details + student comment on the left, a **Score / Grade / Teacher Feedback** form on the right → "Return to Student" sets status to Reviewed, logs activity, pushes a notification, and redirects to the Assignment Detail page.

**Student result:** Grades / Feedback page lists every Reviewed submission with score, letter grade, and the exact feedback text the teacher typed — verified live in this session's earlier QA pass to update correctly end-to-end.

**Exact statuses implemented:** `Not Submitted`, `Submitted`, `Late`, `Reviewed` — matching the brief precisely, each with its own colored badge (red / blue / amber / green).

### 4.8 Attendance Flow
**Teacher:** Attendance → pick a class card → per-student row with four toggle buttons **Present / Late / Absent / Excused** (color-coded on selection) pre-filled from any existing record for "today" (2026‑09‑06) → "Save Attendance" writes/updates one record per class+date+subject and logs the activity.

**Student:** No dedicated "Attendance" nav item for Student (per the brief, attendance is folded into the Dashboard KPI card and the Profile page) — both show a single **attendance percentage** (a static seeded value per student, e.g. Sok Dara = 96%), not a day-by-day log; the day-by-day records only exist in the Class Detail → Attendance tab and Teacher's Attendance module.

**Admin:** No admin-specific attendance summary screen exists yet (see §12/Gaps) — Admin's Reports module lists an "Attendance" report *type* (title + description only, no rendered report body — see §4.10), and per-class attendance records are viewable via Admin → Classes → class → Attendance tab (reusing the same shared Class Detail component teachers use).

### 4.9 Grades & Feedback
Purely assignment-based — score/maxScore, a letter grade string (teacher-typed, not calculated), and free-text feedback, shown on the Student's Grades/Feedback page (grouped as one card per reviewed assignment, most-recent teacher-entered order isn't sorted specially — it follows submission array order) and duplicated in summary form on the Student Profile page. No cumulative GPA or trend chart exists, matching the brief's explicit "do not build a complex GPA system."

### 4.10 Reports (Admin only)
Exactly the 6 named in the brief — Learning Activity, Attendance, Assignment Completion, Student Performance, Teacher Activity, Class Summary — each rendered as a card with a name + one-line description and three buttons: **View**, **Print**, **Export CSV**. All three buttons currently just fire a toast ("Demo report preview" / "Demo only — printing disabled" / "Demo only — export disabled"). A filter bar above the cards (date range, grade, class, subject) is visually present but not wired to filter anything, since there is no report body to filter yet.

### 4.11 Announcements & Notifications
**Creation** (Admin and Teacher only): a modal with Title, Message, Audience (All Students / Specific Grade / Specific Class / Teachers), and an Attachment filename field. Posting adds it to the top of a single shared announcements list, logs activity, and pushes a bell notification.

**Display:** the same announcements feed is shown, unfiltered by audience, on Admin/Teacher/Student's own "Announcements" page and as a 3-item preview on each dashboard — i.e. audience targeting is captured as data on the announcement but not currently used to filter who sees it.

**Notification bell:** a badge dot appears when any notification is unread; opening the panel marks all as read. Seeded examples match the brief precisely: "New English homework posted…", "Science class starts in 30 minutes", "Teacher reviewed your assignment", plus dynamically pushed ones from live actions taken during the session (new lesson, new assignment, new live class, new announcement, submission reviewed).

### 4.12 Student Profile
Student ID, Name, Grade, Class, Email, Phone, Guardian, Enrollment Date, Attendance % — plus an "Assignment History" list with per-submission status badges. Tabs for Profile/Attendance/Assignments/Grades are drawn but only "Profile" is functional; the other three tab buttons are static labels with no click behavior (see §24).

### 4.13 Teacher Profile
Reached only from Admin → Teachers → a teacher row (there's no "My Profile" link in the Teacher role's own sidebar). Shows Name, Department, Subjects, Email, Phone, and a Classes list with "View" links into Class Detail. Same non-functional tab-row pattern as Student Profile (Overview/Classes/Assignments/Attendance tabs are visual only).

### 4.14 Activity Log
A flat, most-recent-first table (Date/Time, User, Role, Module, Action, Details), seeded with 7 realistic entries and **actively appended to** by nearly every write action in the demo (student submits homework, teacher reviews a submission, teacher marks attendance, teacher creates a lesson/assignment/live class, anyone posts an announcement, student marks a lesson complete). This is one of the more fully "real" feeling modules because it's driven by genuine session state rather than only static seed data.

---

## 5. Student Flow (current, verified)

1. Land on **Dashboard** — see next live class, homework due, and feedback at a glance.
2. Click into **Live Classes** or a dashboard card → **Join Live Class** → mock Video Classroom (timer running, mic/camera toggle for show) → **Leave**.
3. Open **Lessons** → pick a published lesson → view objective/notes/materials → **Mark as Completed** (progress bar updates on My Classes).
4. Open **Homework** → pick an assignment → **Upload File** + optional comment → **Submit Assignment** (status becomes Submitted or Late automatically).
5. Later, after a teacher reviews it, check **Grades / Feedback** → see score, grade, and the teacher's written comment.
6. Browse **Announcements** and **Calendar** for school-wide context; check **Profile** for personal record.

Every step above was exercised live in this session and behaved as described.

## 6. Teacher Flow (current, verified)

1. **Dashboard** → see today's schedule, assignments to review, and students falling behind attendance.
2. **My Classes → View Class** → browse the class's Overview/Lessons/Live/Assignments/Attendance/Students tabs.
3. **Create Lesson** (modal, Draft or Published).
4. **Create Assignment** (modal) → appears instantly in Assignments and in Submissions.
5. **Mark Attendance** for a class → Present/Late/Absent/Excused per student → Save.
6. **Submissions** (or Assignment Detail) → **Review** a specific student's work → enter Score/Grade/Feedback → **Return to Student**.
7. **Post Announcement** to the shared feed.

## 7. Admin Flow (current, verified)

1. **Dashboard** → school-wide KPIs, today's live sessions, recent assignments/announcements.
2. **Students / Teachers** → filterable lists → drill into a profile page.
3. **Classes** → grid of class cards → **View Class** → same shared Class Detail tabs teachers see (read-only for Admin).
4. **Subjects / Schedule** → static curriculum and weekly timetable views.
5. **Reports** → 6 report type cards (View/Print/Export are simulated, no rendered report body).
6. **Users & Roles** → a flat list combining the Admin identity, all 8 teachers, and the one demo student, each with a "Manage" button that only shows a toast.
7. **Activity Log** → full chronological history of everything done in the current session (plus seed history).
8. **Settings** → school info, notification toggles (visual only), the "Future Add-ons" list, and a note that live video is not connected and would later integrate with Zoom/Google Meet/an embedded provider.

---

## 8. Live Class Flow (detail)

Already covered in §4.5. To restate the control inventory precisely, since the brief asked for it explicitly:

| Control | Behavior today |
|---|---|
| Microphone | Toggles a visual "off" state + toast, no audio |
| Camera | Toggles a visual "off" state + toast, no video |
| Screen Share | Button renders, no click behavior |
| Chat | Button renders, no click behavior |
| Participants | Button renders, no click behavior (a static list is shown elsewhere, on the Live Class Detail page, not inside the classroom itself) |
| Leave | Navigates back to the caller's role-appropriate Live Classes list |

The screen is explicitly and visibly labeled as a demo (banner + on-screen badge + caption), so there is no risk of it reading as a real video integration to a client watching the demo.

## 9. Homework Flow (detail)

Already covered fully in §4.7 — restated here only to confirm the exact status vocabulary and where each status is set:

- **Not Submitted** — default state, no submission record exists yet, or a placeholder record with this status was seeded.
- **Submitted** — student submitted before the due date.
- **Late** — student submitted after the due date (computed automatically by comparing to the assignment's `dueDate`, using the demo's fixed "today" of 2026‑09‑06).
- **Reviewed** — teacher has returned a score, grade, and feedback.

---

## 10. Current UX/UI Design System Assessment

**Sidebar:** fixed-width (264px), white background, brand mark (Dandelion logo image reused from C048 + wordmark) at top, role-aware nav list in the middle, a small "Role View" pill + version tag at the bottom. Collapses to an off-canvas drawer (hamburger toggle) under 900px viewport width.

**Top bar:** sticky, contains a global search box (students/teachers/classes/subjects/assignments, with a live dropdown of grouped results), the role-switch pill, a notification bell with unread-count dot, and a user chip (initials avatar + name). The search box is hidden entirely below 900px — there is currently no mobile-friendly way to search.

**Cards, tables, badges:** one consistent visual language throughout — soft-shadow white cards with a light border, a KPI-card variant, a class-card variant (for class/subject browsing grids), a uniform `data-table` style for all list screens, and a single badge component reused everywhere for status (green/red/amber/blue/gray) so "Present," "Published," "Reviewed," and "Active" all read the same way across modules.

**Forms & modals:** every "create" action (Live Class, Lesson, Assignment, Announcement, Student) opens the same modal component with a consistent two-column form-grid, and every save path both writes to state and gives a toast confirmation.

**Video classroom:** a deliberately distinct dark theme (vs. the light app shell) with its own control-bar styling — visually reads as "a different kind of screen," which is good for clearly separating the mock classroom experience from the rest of the app.

**Color/typography:** a single green/white/neutral palette (Inter font, Noto Sans Khmer loaded for future Khmer text support though no Khmer copy is currently used anywhere in the UI), consistent spacing scale, and a demo banner (dark green, permanently visible) reminding the viewer at all times that this is a demo.

**Responsive behavior:** grid layouts collapse in defined steps at 1180px / 900px / 640px; verified in this session's QA pass at both 1440px desktop and 390px mobile widths with no horizontal overflow or broken layout (one earlier mobile KPI-grid overflow issue was already caught and fixed in the previous build session).

**Overall assessment (descriptive, not a redesign):** the system reads as clean, modern, and internally consistent — a client would not mistake this for an unfinished or inconsistent prototype. Its "demo-ness" is intentionally visible (the persistent banner, the toast messages saying "demo only," the classroom badge) rather than being disguised as production-ready, which is appropriate for a sales/planning demo but is itself a UX signal worth being aware of if any part of this is ever shown to end users rather than the client's decision-makers.

---

## 11. Data Relationship Map (conceptual, as implemented in `data.js`)

```
Teacher ──teaches──> Subject (via Class.subjectTeachers)
Teacher ──homeroom of──> Class
Class ──has many──> Student (Class.studentIds)
Class ──has many──> Lesson, Assignment, LiveClass, ScheduleEntry, AttendanceRecord
Subject ──appears in──> Class.subjectTeachers, Lesson.subject, Assignment.subject, ScheduleEntry.subject

Lesson ──belongs to──> Class, Subject, Teacher
Lesson ──optionally links to──> Assignment (Lesson.homeworkId)

Assignment ──belongs to──> Class, Subject, Teacher
Assignment ──has many──> Submission (one per Student, created on submit)

Submission ──belongs to──> Assignment + Student
Submission ──carries──> status, file, comment, score, grade, feedback  (Grade & Feedback = fields ON Submission, not a separate entity)

AttendanceRecord ──belongs to──> Class + Subject + date, ──contains──> {studentId: status} map

LiveClass ──belongs to──> Class, Subject, Teacher

Announcement ──stands alone──> (audience field is descriptive metadata only, not an enforced relationship)

Notification, ActivityLog entry ──stand alone──> (free-text records, not linked back to source entities by ID)
```

Every entity is looked up by simple ID (`s-dara`, `t-lina`, `c-5a`, etc.) through helper functions in `data.js` (`studentById`, `teacherById`, `classById`, `classesForTeacher`, `studentsInClass`, …) — there is no normalized "foreign key" enforcement beyond these lookups, which is appropriate for a static demo data file but is exactly the layer a real backend/database would need to formalize.

---

## 12. Gaps / Duplication / Confusing Areas *(observations only — nothing here has been changed)*

- **Non-functional profile tabs.** Student Profile and Teacher Profile both render four tab buttons (Profile/Attendance/Assignments/Grades, or Overview/Classes/Assignments/Attendance) but only the first is wired — the other three look clickable and are not. This is the single most likely thing a client will click and notice doesn't respond.
- **Simulated saves with no visible difference from real ones.** "Add Student" (Admin) and "Add Class"/"Add Teacher"/"Add Subject" buttons open either a real form (Add Student) or nothing but a toast, and even the Add Student form's "Save" only shows a toast + activity-log line without actually adding a row to the Students table. A client demoing this live could be confused about why the new student doesn't appear in the list afterward, unlike Lessons/Assignments/Live Classes/Announcements, which do get added to their lists.
- **Reports have no report body.** All 6 reports are described but none render an actual table/chart when "View" is clicked — only a toast. This is a bigger gap than the others because Reports was called out as its own top-level module in the brief.
- **Attendance has no Admin-level summary view.** The brief asked for "Admin: show class attendance summary" — today an Admin can only see attendance by opening a specific Class's Attendance tab (which shows raw per-date records, not a summarized rate), there's no rollup screen.
- **Announcement audience targeting isn't enforced.** Selecting "Specific Grade" or "Specific Class" when posting doesn't actually filter who sees the announcement afterward — all announcements show to everyone in every role's feed. This may read as a bug in a live demo if a client posts a "Teachers only" announcement and then switches to Student and still sees it.
- **Single fixed identity per role.** Because Teacher = only Ms. Lina and Student = only Sok Dara, there's no way to show, e.g., Mr. Sokha's Mathematics teacher view or another student's homework — anything involving "a different teacher" or "a different student" currently has to be described rather than clicked through live.
- **No Admin attendance/marks editing, no Teacher "My Profile," no Student "My Class" beyond the one class** — these aren't failures against the brief (the brief didn't require them), just natural single-tenant limitations worth naming before deciding what C048 integration should solve.
- **Calendar is a fixed month.** The Student Calendar view is hard-coded to September 2026 with no prev/next month navigation — it cannot be browsed to another month.
- **Search is desktop-only.** The global search box is hidden below 900px width with no mobile alternative (not even a search icon that opens it), so mobile users currently have no way to search at all.
- **"Demo-looking" UI is deliberate, not accidental.** Every non-functional button reachable in the demo (file downloads, report export, print, screen share/chat in the classroom, Users & Roles "Manage") shows a clear "(demo only)" toast rather than silently doing nothing — this is good practice for a sales demo and should probably be preserved in spirit as the product moves toward more real functionality, so users are never left wondering if something is broken vs. simply not built yet.
- **No back-navigation gap found** — Class Detail, Lesson Detail, Assignment Detail, and Review pages all carry a breadcrumb trail back to their originating list, and the "back" target is even passed through the URL (`?back=`) for Class Detail so it returns to the correct role's class list rather than a hardcoded one. This is a strength, not a gap, but is called out here since the brief asked specifically to check for missing back-navigation.

---

## 13. C048 Integration Readiness

**Principle to confirm:** C048 (School Management System) should own the single source of truth for institutional/master data; C049 (Online Learning) should own only what's specific to the *online teaching and learning activity itself*.

**What C049 should NOT continue to own independently, once linked to C048:**
- Student master records (name, grade, guardian, phone, enrollment date, status) — currently hard-coded in C049's `data.js` (`STUDENTS` array) and would become duplicated, driftable data the moment C048 has its own version of the same students.
- Teacher master records (name, department, contact info) — same issue, currently in C049's `TEACHERS` array.
- Class/roster definitions (which students belong to Grade 5A, who the homeroom teacher is, which teacher teaches which subject in which class) — currently in C049's `CLASSES` array (`studentIds`, `subjectTeachers`, `homeroomTeacherId`).
- Subject catalog, academic year/term structure.

**What C049 should keep owning independently** (its own domain, not duplicated in C048): Lessons, Live Classes, Assignments, Submissions, per-session Attendance records tied to online class delivery, learning-specific Announcements, and Activity Log entries generated by online-learning actions. These are the entities `data.js` models as genuinely separate from roster data (`LESSONS`, `LIVE_CLASSES`, `ASSIGNMENTS`, `SUBMISSIONS`, `ATTENDANCE`) and none of them logically belong in a school administration system.

**What should sync automatically (one direction, C048 → C049):** student enrollment/class assignment, teacher-to-class/subject assignment, and student/teacher status changes (active/inactive/withdrawn) — so that when C048 assigns a new student to Grade 5A, that student's online class roster, homework list, and grade book in C049 populate without manual re-entry.

**Does the current C049 structure support this cleanly?** Reasonably well, structurally — every entity in `data.js` already references other entities purely by string ID (`classId`, `teacherId`, `studentId`, `subject` name) rather than embedding duplicated copies of the related record, which is exactly the shape a real foreign-key/API relationship would need. The practical gap is that today those IDs (`s-dara`, `t-lina`, `c-5a`) are invented locally in C049 rather than sourced from C048; a real integration would need C049's student/teacher/class *identity* to originate from C048 (e.g. C048's own IDs, or a shared ID scheme) rather than being redefined independently, which is the one structural change worth planning for before deeper feature work continues on this demo.

---

## 14. Enhancement Priorities *(ranked observations for your decision — not started, nothing built yet)*

1. **Decide the C048/C049 data boundary before adding more student/teacher/class screens** — every hour spent polishing Admin's Student/Teacher/Class CRUD in C049 in isolation is at risk of being redone once C048 becomes the source of truth for that same data (§13).
2. **Close the "looks clickable but isn't" gaps** most likely to be noticed in a live client walkthrough: Profile page tabs (§4.12/4.13), Add Student save not appending to the list, Reports "View" having no report body.
3. **Decide whether Admin needs its own attendance summary view**, since the brief called for one and it's currently only reachable indirectly through a class's raw attendance tab.
4. **Decide whether announcement audience targeting should actually filter the feed**, or whether that's acceptable to leave as descriptive-only for a demo.
5. **Decide whether multiple demo identities per role are worth adding** (e.g. let the demo presenter pick which teacher/student to preview) before this is used in front of a client who might ask "can I see it as a different teacher?"
6. Lower priority, cosmetic/scope items: calendar month navigation, mobile search access, wiring the decorative Screen Share/Chat/Participants buttons in the video classroom to at least a placeholder panel.

No changes have been made to any file as part of this review, and nothing has been deployed.
