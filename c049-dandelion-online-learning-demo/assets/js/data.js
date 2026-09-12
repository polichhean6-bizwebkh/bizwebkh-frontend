/* ==========================================================================
   Dandelion International Academy of Education
   Online Learning & Teaching System — DEMO DATA
   All data below is fictional sample data for demonstration purposes only.
   ========================================================================== */

const DEMO = (function () {

  const SUBJECTS = [
    { id: "sub-eng", name: "English" },
    { id: "sub-mat", name: "Mathematics" },
    { id: "sub-sci", name: "Science" },
    { id: "sub-ict", name: "ICT" }
  ];

  const TEACHERS = [
    { id: "t-lina",  name: "Ms. Lina",   department: "Languages",     subjects: ["English"],           email: "lina.chan@dandelion.edu.kh",   phone: "012 345 671", classes: ["c-5a"] },
    { id: "t-sokha", name: "Mr. Sokha",  department: "Mathematics",   subjects: ["Mathematics"],        email: "sokha.pov@dandelion.edu.kh",   phone: "012 345 672", classes: ["c-5a", "c-6a"] },
    { id: "t-dara",  name: "Ms. Dara",   department: "Science",       subjects: ["Science"],            email: "dara.meas@dandelion.edu.kh",   phone: "012 345 673", classes: ["c-5b"] },
    { id: "t-vuthy", name: "Mr. Vuthy",  department: "ICT",           subjects: ["ICT"],                email: "vuthy.san@dandelion.edu.kh",   phone: "012 345 674", classes: ["c-5a", "c-5b", "c-6a"] },
    { id: "t-sreymom", name: "Ms. Sreymom", department: "Languages",  subjects: ["English"],            email: "sreymom.uk@dandelion.edu.kh",  phone: "012 345 675", classes: ["c-5b", "c-6a"] },
    { id: "t-piseth", name: "Mr. Piseth", department: "Mathematics",  subjects: ["Mathematics"],        email: "piseth.horn@dandelion.edu.kh", phone: "012 345 676", classes: ["c-5b"] },
    { id: "t-channary", name: "Ms. Channary", department: "Science",  subjects: ["Science"],            email: "channary.ly@dandelion.edu.kh", phone: "012 345 677", classes: ["c-6a"] },
    { id: "t-ratha", name: "Mr. Ratha",  department: "Admin & IT Support", subjects: ["ICT"],           email: "ratha.keo@dandelion.edu.kh",   phone: "012 345 678", classes: [] }
  ];

  const CLASSES = [
    { id: "c-5a", name: "Grade 5A", grade: "Grade 5", homeroomTeacherId: "t-lina",
      subjectTeachers: { English: "t-lina", Mathematics: "t-sokha", Science: "t-dara", ICT: "t-vuthy" },
      studentIds: ["s-dara", "s-chantha", "s-sreyneang", "s-david", "s-anna", "s-panha", "s-vanna"] },
    { id: "c-5b", name: "Grade 5B", grade: "Grade 5", homeroomTeacherId: "t-dara",
      subjectTeachers: { English: "t-sreymom", Mathematics: "t-piseth", Science: "t-dara", ICT: "t-vuthy" },
      studentIds: ["s-sokun", "s-molika", "s-kimhouy", "s-lina2", "s-borey"] },
    { id: "c-6a", name: "Grade 6A", grade: "Grade 6", homeroomTeacherId: "t-sokha",
      subjectTeachers: { English: "t-sreymom", Mathematics: "t-sokha", Science: "t-channary", ICT: "t-vuthy" },
      studentIds: ["s-ratanak", "s-sophea", "s-nika", "s-samnang", "s-chenda", "s-tola"] }
  ];

  const STUDENTS = [
    { id: "s-dara",      name: "Sok Dara",       grade: "Grade 5", classId: "c-5a", guardian: "Sok Vibol",      phone: "017 200 101", email: "dara.sok@student.dandelion.edu.kh",      status: "Active", enrollmentDate: "2024-09-02", attendancePct: 96 },
    { id: "s-chantha",   name: "Chantha Lim",    grade: "Grade 5", classId: "c-5a", guardian: "Lim Sophal",     phone: "017 200 102", email: "chantha.lim@student.dandelion.edu.kh",   status: "Active", enrollmentDate: "2024-09-02", attendancePct: 94 },
    { id: "s-sreyneang", name: "Sreyneang Kim",  grade: "Grade 5", classId: "c-5a", guardian: "Kim Sopheak",    phone: "017 200 103", email: "sreyneang.kim@student.dandelion.edu.kh", status: "Active", enrollmentDate: "2024-09-02", attendancePct: 98 },
    { id: "s-david",     name: "David Chen",     grade: "Grade 5", classId: "c-5a", guardian: "Chen Wei",       phone: "017 200 104", email: "david.chen@student.dandelion.edu.kh",    status: "Active", enrollmentDate: "2025-01-13", attendancePct: 89 },
    { id: "s-anna",      name: "Anna Lee",       grade: "Grade 5", classId: "c-5a", guardian: "Lee Min",        phone: "017 200 105", email: "anna.lee@student.dandelion.edu.kh",      status: "Active", enrollmentDate: "2024-09-02", attendancePct: 92 },
    { id: "s-panha",     name: "Panha Sok",      grade: "Grade 5", classId: "c-5a", guardian: "Sok Chan",       phone: "017 200 106", email: "panha.sok@student.dandelion.edu.kh",     status: "Active", enrollmentDate: "2024-09-02", attendancePct: 90 },
    { id: "s-vanna",     name: "Vanna Chhay",    grade: "Grade 5", classId: "c-5a", guardian: "Chhay Rith",     phone: "017 200 107", email: "vanna.chhay@student.dandelion.edu.kh",   status: "Active", enrollmentDate: "2024-09-02", attendancePct: 87 },
    { id: "s-sokun",     name: "Sokun Heng",     grade: "Grade 5", classId: "c-5b", guardian: "Heng Bora",      phone: "017 200 108", email: "sokun.heng@student.dandelion.edu.kh",    status: "Active", enrollmentDate: "2024-09-02", attendancePct: 95 },
    { id: "s-molika",    name: "Molika Ouk",     grade: "Grade 5", classId: "c-5b", guardian: "Ouk Sarath",     phone: "017 200 109", email: "molika.ouk@student.dandelion.edu.kh",    status: "Active", enrollmentDate: "2024-09-02", attendancePct: 93 },
    { id: "s-kimhouy",   name: "Kimhouy Nov",    grade: "Grade 5", classId: "c-5b", guardian: "Nov Dara",       phone: "017 200 110", email: "kimhouy.nov@student.dandelion.edu.kh",   status: "Active", enrollmentDate: "2024-09-02", attendancePct: 91 },
    { id: "s-lina2",     name: "Lina Prom",      grade: "Grade 5", classId: "c-5b", guardian: "Prom Vichet",    phone: "017 200 111", email: "lina.prom@student.dandelion.edu.kh",     status: "Active", enrollmentDate: "2024-09-02", attendancePct: 97 },
    { id: "s-borey",     name: "Borey Suon",     grade: "Grade 5", classId: "c-5b", guardian: "Suon Chenda",    phone: "017 200 112", email: "borey.suon@student.dandelion.edu.kh",    status: "Active", enrollmentDate: "2024-09-02", attendancePct: 82 },
    { id: "s-ratanak",   name: "Ratanak Chea",   grade: "Grade 6", classId: "c-6a", guardian: "Chea Somaly",    phone: "017 200 113", email: "ratanak.chea@student.dandelion.edu.kh",  status: "Active", enrollmentDate: "2023-09-04", attendancePct: 96 },
    { id: "s-sophea",    name: "Sophea Ly",      grade: "Grade 6", classId: "c-6a", guardian: "Ly Vibol",       phone: "017 200 114", email: "sophea.ly@student.dandelion.edu.kh",     status: "Active", enrollmentDate: "2023-09-04", attendancePct: 94 },
    { id: "s-nika",      name: "Nika Sar",       grade: "Grade 6", classId: "c-6a", guardian: "Sar Piseth",     phone: "017 200 115", email: "nika.sar@student.dandelion.edu.kh",      status: "Active", enrollmentDate: "2023-09-04", attendancePct: 99 },
    { id: "s-samnang",   name: "Samnang Ith",    grade: "Grade 6", classId: "c-6a", guardian: "Ith Sokha",      phone: "017 200 116", email: "samnang.ith@student.dandelion.edu.kh",   status: "Active", enrollmentDate: "2023-09-04", attendancePct: 88 },
    { id: "s-chenda",    name: "Chenda Pich",    grade: "Grade 6", classId: "c-6a", guardian: "Pich Ratha",     phone: "017 200 117", email: "chenda.pich@student.dandelion.edu.kh",   status: "Active", enrollmentDate: "2023-09-04", attendancePct: 90 },
    { id: "s-tola",      name: "Tola Yin",       grade: "Grade 6", classId: "c-6a", guardian: "Yin Sotheara",   phone: "017 200 118", email: "tola.yin@student.dandelion.edu.kh",      status: "Inactive", enrollmentDate: "2023-09-04", attendancePct: 76 }
  ];

  // The "logged in" demo identities used when previewing Student / Teacher roles
  const CURRENT_STUDENT_ID = "s-dara";
  const CURRENT_TEACHER_ID = "t-lina";

  const LESSONS = [
    { id: "les-1", title: "Reading Comprehension: Short Stories", subject: "English", classId: "c-5a", teacherId: "t-lina", date: "2026-09-08", description: "Understanding narrative structure through short fiction.", objective: "Students will identify plot, characters and setting in a short story.", videoLink: "demo://video/eng-lesson-12", pdf: "reading-comprehension-unit4.pdf", worksheet: "worksheet-unit4-short-stories.pdf", homeworkId: "a-eng-1", status: "Published" },
    { id: "les-2", title: "Fractions: Adding & Subtracting", subject: "Mathematics", classId: "c-5a", teacherId: "t-sokha", date: "2026-09-05", description: "Working with fractions that share and do not share denominators.", objective: "Students will add and subtract fractions with unlike denominators.", videoLink: "demo://video/math-lesson-9", pdf: "fractions-unit3.pdf", worksheet: "worksheet-fractions.pdf", homeworkId: "a-mat-1", status: "Published" },
    { id: "les-3", title: "States of Matter", subject: "Science", classId: "c-5a", teacherId: "t-dara", date: "2026-09-04", description: "Solids, liquids and gases and how they change state.", objective: "Students will describe how matter changes between physical states.", videoLink: "demo://video/sci-lesson-7", pdf: "states-of-matter.pdf", worksheet: "worksheet-states-of-matter.pdf", homeworkId: "a-sci-1", status: "Published" },
    { id: "les-4", title: "Intro to Spreadsheets", subject: "ICT", classId: "c-5a", teacherId: "t-vuthy", date: "2026-09-03", description: "Basic spreadsheet navigation, cells and simple formulas.", objective: "Students will create a simple spreadsheet using formulas for sums.", videoLink: "demo://video/ict-lesson-5", pdf: "intro-spreadsheets.pdf", worksheet: "worksheet-spreadsheets.pdf", homeworkId: null, status: "Published" },
    { id: "les-5", title: "Grammar: Past Tense Verbs", subject: "English", classId: "c-5a", teacherId: "t-lina", date: "2026-09-11", description: "Regular and irregular past tense verb forms.", objective: "Students will correctly use past tense verbs in writing.", videoLink: "demo://video/eng-lesson-13", pdf: "past-tense-verbs.pdf", worksheet: "worksheet-past-tense.pdf", homeworkId: null, status: "Draft" },
    { id: "les-6", title: "Multiplying Decimals", subject: "Mathematics", classId: "c-5b", teacherId: "t-piseth", date: "2026-09-05", description: "Decimal multiplication with real-world examples.", objective: "Students will multiply decimal numbers accurately.", videoLink: "demo://video/math-lesson-10", pdf: "decimals-unit3.pdf", worksheet: "worksheet-decimals.pdf", homeworkId: "a-mat-2", status: "Published" },
    { id: "les-7", title: "The Water Cycle", subject: "Science", classId: "c-6a", teacherId: "t-channary", date: "2026-09-04", description: "Evaporation, condensation and precipitation.", objective: "Students will explain the stages of the water cycle.", videoLink: "demo://video/sci-lesson-8", pdf: "water-cycle.pdf", worksheet: "worksheet-water-cycle.pdf", homeworkId: "a-sci-2", status: "Published" }
  ];

  const ASSIGNMENTS = [
    { id: "a-eng-1", title: "Short Story Response — Chapter Questions", classId: "c-5a", subject: "English", teacherId: "t-lina", instructions: "Read 'The Kind Fisherman' and answer the five comprehension questions in full sentences. Attach your answers as a PDF or Word document.", attachFile: "chapter-questions-worksheet.pdf", publishedDate: "2026-09-01", dueDate: "2026-09-08", maxScore: 100, allowLate: true, status: "Published" },
    { id: "a-mat-1", title: "Fractions Practice Set 3", classId: "c-5a", subject: "Mathematics", teacherId: "t-sokha", instructions: "Complete all 20 problems on adding and subtracting fractions. Show your working clearly.", attachFile: "fractions-practice-set-3.pdf", publishedDate: "2026-08-30", dueDate: "2026-09-06", maxScore: 50, allowLate: true, status: "Published" },
    { id: "a-sci-1", title: "States of Matter — Lab Observation Sheet", classId: "c-5a", subject: "Science", teacherId: "t-dara", instructions: "Complete the observation sheet from the home experiment (ice melting) and upload a photo of your results table.", attachFile: "lab-observation-sheet.pdf", publishedDate: "2026-08-29", dueDate: "2026-09-05", maxScore: 30, allowLate: false, status: "Published" },
    { id: "a-eng-2", title: "Vocabulary Quiz — Unit 4", classId: "c-5a", subject: "English", teacherId: "t-lina", instructions: "Complete the vocabulary matching quiz for Unit 4 words.", attachFile: "vocab-quiz-unit4.pdf", publishedDate: "2026-08-20", dueDate: "2026-08-27", maxScore: 20, allowLate: false, status: "Published" },
    { id: "a-mat-2", title: "Decimals Word Problems", classId: "c-5b", subject: "Mathematics", teacherId: "t-piseth", instructions: "Solve the six word problems involving decimal multiplication.", attachFile: "decimal-word-problems.pdf", publishedDate: "2026-09-01", dueDate: "2026-09-09", maxScore: 40, allowLate: true, status: "Published" },
    { id: "a-sci-2", title: "Water Cycle Diagram", classId: "c-6a", subject: "Science", teacherId: "t-channary", instructions: "Draw and label a full water cycle diagram, then explain each stage in 2-3 sentences.", attachFile: "water-cycle-template.pdf", publishedDate: "2026-08-31", dueDate: "2026-09-07", maxScore: 30, allowLate: true, status: "Published" }
  ];

  // Submissions for the demo student (Sok Dara) plus classmates, so Teacher > Submissions has volume
  const SUBMISSIONS = [
    { id: "sub-1", assignmentId: "a-eng-2", studentId: "s-dara", status: "Reviewed", submittedAt: "2026-08-26 19:12", file: "dara-vocab-quiz-unit4.pdf", comment: "Done! Let me know if #7 is right.", score: 18, maxScore: 20, grade: "A", feedback: "Great work, Dara. Just double-check the spelling of 'necessary' next time." },
    { id: "sub-2", assignmentId: "a-sci-1", studentId: "s-dara", status: "Reviewed", submittedAt: "2026-09-04 20:41", file: "dara-lab-observation.jpg", comment: "The ice took about 40 minutes to fully melt.", score: 27, maxScore: 30, grade: "A-", feedback: "Nice observations. Try to record the exact time at each interval next time." },
    { id: "sub-3", assignmentId: "a-mat-1", studentId: "s-dara", status: "Submitted", submittedAt: "2026-09-06 08:03", file: "dara-fractions-set-3.pdf", comment: "I found problem 14 tricky.", score: null, maxScore: 50, grade: null, feedback: null },
    { id: "sub-4", assignmentId: "a-eng-1", studentId: "s-dara", status: "Not Submitted", submittedAt: null, file: null, comment: null, score: null, maxScore: 100, grade: null, feedback: null },
    { id: "sub-5", assignmentId: "a-eng-1", studentId: "s-chantha", status: "Submitted", submittedAt: "2026-09-05 16:20", file: "chantha-chapter-questions.docx", comment: "", score: null, maxScore: 100, grade: null, feedback: null },
    { id: "sub-6", assignmentId: "a-eng-1", studentId: "s-sreyneang", status: "Reviewed", submittedAt: "2026-09-03 18:05", file: "sreyneang-chapter-questions.pdf", comment: "", score: 95, maxScore: 100, grade: "A", feedback: "Excellent, thoughtful answers." },
    { id: "sub-7", assignmentId: "a-eng-1", studentId: "s-david", status: "Late", submittedAt: "2026-09-09 09:15", file: "david-chapter-questions.pdf", comment: "Sorry this is late, I was sick.", score: null, maxScore: 100, grade: null, feedback: null },
    { id: "sub-8", assignmentId: "a-eng-1", studentId: "s-anna", status: "Not Submitted", submittedAt: null, file: null, comment: null, score: null, maxScore: 100, grade: null, feedback: null },
    { id: "sub-9", assignmentId: "a-eng-1", studentId: "s-panha", status: "Not Submitted", submittedAt: null, file: null, comment: null, score: null, maxScore: 100, grade: null, feedback: null },
    { id: "sub-10", assignmentId: "a-eng-1", studentId: "s-vanna", status: "Submitted", submittedAt: "2026-09-06 07:40", file: "vanna-chapter-questions.pdf", comment: "", score: null, maxScore: 100, grade: null, feedback: null },
    { id: "sub-11", assignmentId: "a-mat-1", studentId: "s-chantha", status: "Reviewed", submittedAt: "2026-09-04 20:00", file: "chantha-fractions-set-3.pdf", comment: "", score: 44, maxScore: 50, grade: "A-", feedback: "Well done, watch your regrouping in Q12." }
  ];

  const LIVE_CLASSES = [
    { id: "lv-1", subject: "English", classId: "c-5a", teacherId: "t-lina", date: "2026-09-06", time: "10:00 AM", durationMin: 45, status: "Live" },
    { id: "lv-2", subject: "Mathematics", classId: "c-5a", teacherId: "t-sokha", date: "2026-09-06", time: "11:00 AM", durationMin: 45, status: "Upcoming" },
    { id: "lv-3", subject: "Science", classId: "c-5a", teacherId: "t-dara", date: "2026-09-06", time: "01:30 PM", durationMin: 40, status: "Upcoming" },
    { id: "lv-4", subject: "ICT", classId: "c-5a", teacherId: "t-vuthy", date: "2026-09-06", time: "02:30 PM", durationMin: 40, status: "Upcoming" },
    { id: "lv-5", subject: "Mathematics", classId: "c-5b", teacherId: "t-piseth", date: "2026-09-06", time: "09:00 AM", durationMin: 45, status: "Completed" },
    { id: "lv-6", subject: "Science", classId: "c-6a", teacherId: "t-channary", date: "2026-09-06", time: "10:30 AM", durationMin: 45, status: "Completed" },
    { id: "lv-7", subject: "English", classId: "c-5a", teacherId: "t-lina", date: "2026-09-10", time: "10:00 AM", durationMin: 45, status: "Upcoming" },
    { id: "lv-8", subject: "English", classId: "c-5a", teacherId: "t-lina", date: "2026-09-03", time: "10:00 AM", durationMin: 45, status: "Completed" }
  ];

  // Attendance records: one entry per class per date per subject period
  const ATTENDANCE = [
    { classId: "c-5a", subject: "English", date: "2026-09-06", records: {
      "s-dara": "Present", "s-chantha": "Present", "s-sreyneang": "Present", "s-david": "Late",
      "s-anna": "Present", "s-panha": "Absent", "s-vanna": "Present" } },
    { classId: "c-5a", subject: "English", date: "2026-09-05", records: {
      "s-dara": "Present", "s-chantha": "Present", "s-sreyneang": "Present", "s-david": "Present",
      "s-anna": "Excused", "s-panha": "Present", "s-vanna": "Present" } },
    { classId: "c-5a", subject: "Mathematics", date: "2026-09-05", records: {
      "s-dara": "Present", "s-chantha": "Present", "s-sreyneang": "Late", "s-david": "Present",
      "s-anna": "Present", "s-panha": "Present", "s-vanna": "Absent" } },
    { classId: "c-5b", subject: "Mathematics", date: "2026-09-06", records: {
      "s-sokun": "Present", "s-molika": "Present", "s-kimhouy": "Present", "s-lina2": "Present", "s-borey": "Late" } },
    { classId: "c-6a", subject: "Science", date: "2026-09-06", records: {
      "s-ratanak": "Present", "s-sophea": "Present", "s-nika": "Present", "s-samnang": "Absent",
      "s-chenda": "Present", "s-tola": "Absent" } }
  ];

  const SCHEDULE = [
    { day: "Monday",    time: "08:00 - 08:45", subject: "English",      classId: "c-5a", teacherId: "t-lina",   type: "Online" },
    { day: "Monday",    time: "09:00 - 09:45", subject: "Mathematics",  classId: "c-5a", teacherId: "t-sokha",  type: "Online" },
    { day: "Monday",    time: "10:00 - 10:45", subject: "Science",      classId: "c-5b", teacherId: "t-dara",   type: "In-Person" },
    { day: "Tuesday",   time: "08:00 - 08:45", subject: "Mathematics",  classId: "c-6a", teacherId: "t-sokha",  type: "In-Person" },
    { day: "Tuesday",   time: "09:00 - 09:45", subject: "ICT",          classId: "c-5a", teacherId: "t-vuthy",  type: "Online" },
    { day: "Tuesday",   time: "10:00 - 10:45", subject: "English",      classId: "c-5b", teacherId: "t-sreymom",type: "Online" },
    { day: "Wednesday", time: "08:00 - 08:45", subject: "Science",      classId: "c-5a", teacherId: "t-dara",   type: "Online" },
    { day: "Wednesday", time: "09:00 - 09:45", subject: "English",      classId: "c-6a", teacherId: "t-sreymom",type: "Online" },
    { day: "Wednesday", time: "10:00 - 10:45", subject: "Mathematics",  classId: "c-5b", teacherId: "t-piseth", type: "In-Person" },
    { day: "Thursday",  time: "08:00 - 08:45", subject: "English",      classId: "c-5a", teacherId: "t-lina",   type: "Online" },
    { day: "Thursday",  time: "09:00 - 09:45", subject: "Science",      classId: "c-6a", teacherId: "t-channary",type: "In-Person" },
    { day: "Thursday",  time: "10:00 - 10:45", subject: "ICT",          classId: "c-5b", teacherId: "t-vuthy",  type: "Online" },
    { day: "Friday",    time: "08:00 - 08:45", subject: "Mathematics",  classId: "c-5a", teacherId: "t-sokha",  type: "Online" },
    { day: "Friday",    time: "09:00 - 09:45", subject: "ICT",          classId: "c-6a", teacherId: "t-vuthy",  type: "Online" },
    { day: "Friday",    time: "10:00 - 10:45", subject: "English",      classId: "c-5b", teacherId: "t-sreymom",type: "In-Person" }
  ];

  const ANNOUNCEMENTS = [
    { id: "an-1", title: "Mid-Term Break Schedule", message: "School will be closed from 21–23 September for mid-term break. Online lessons will resume on 24 September as normal.", date: "2026-09-05", audience: "All Students", attachment: null, postedBy: "Admin Office" },
    { id: "an-2", title: "English Homework Posted — Grade 5A", message: "A new assignment 'Short Story Response' has been posted for Grade 5A. Due 8 September.", date: "2026-09-01", audience: "Specific Class", attachment: "chapter-questions-worksheet.pdf", postedBy: "Ms. Lina" },
    { id: "an-3", title: "Parent-Teacher Meeting (Online)", message: "Online parent-teacher meetings will be held on 15 September. Booking links will be shared by homeroom teachers.", date: "2026-08-29", audience: "All Students", attachment: null, postedBy: "Admin Office" },
    { id: "an-4", title: "Staff Meeting — Thursday 3PM", message: "All teaching staff please join the weekly staff meeting via the staff room link.", date: "2026-09-02", audience: "Teachers", attachment: null, postedBy: "Admin Office" },
    { id: "an-5", title: "New Uniform Guidelines", message: "Please review the updated uniform guidelines document attached for the new term.", date: "2026-08-25", audience: "All Students", attachment: "uniform-guidelines-2026.pdf", postedBy: "Admin Office" }
  ];

  const NOTIFICATIONS = [
    { id: "n-1", text: "New English homework posted for Grade 5A", time: "5 minutes ago", read: false },
    { id: "n-2", text: "Science class starts in 30 minutes", time: "20 minutes ago", read: false },
    { id: "n-3", text: "Ms. Lina reviewed your Vocabulary Quiz submission", time: "2 hours ago", read: false },
    { id: "n-4", text: "New school announcement: Mid-Term Break Schedule", time: "1 day ago", read: true },
    { id: "n-5", text: "Homework deadline tomorrow: Fractions Practice Set 3", time: "1 day ago", read: true }
  ];

  const ACTIVITY_LOG = [
    { datetime: "2026-09-06 08:03", user: "Sok Dara", role: "Student", module: "Assignments", action: "Submitted homework", details: "Fractions Practice Set 3 (Grade 5A)" },
    { datetime: "2026-09-05 20:41", user: "Ms. Dara", role: "Teacher", module: "Submissions", action: "Reviewed submission", details: "Sok Dara — States of Matter Lab (Score 27/30)" },
    { datetime: "2026-09-05 16:20", user: "Chantha Lim", role: "Student", module: "Assignments", action: "Submitted homework", details: "Short Story Response (Grade 5A)" },
    { datetime: "2026-09-05 09:10", user: "Mr. Sokha", role: "Teacher", module: "Attendance", action: "Updated attendance", details: "Grade 5A — Mathematics (6 Present, 1 Late)" },
    { datetime: "2026-09-04 14:00", user: "Admin Office", role: "Admin", module: "Classes", action: "Created class", details: "Grade 6A — Term 2 schedule added" },
    { datetime: "2026-09-01 09:00", user: "Ms. Lina", role: "Teacher", module: "Assignments", action: "Created assignment", details: "Short Story Response — Chapter Questions" },
    { datetime: "2026-08-29 11:20", user: "Admin Office", role: "Admin", module: "Announcements", action: "Posted announcement", details: "Parent-Teacher Meeting (Online)" }
  ];

  const REPORTS = [
    { id: "rep-1", name: "Learning Activity", description: "Lesson views, time spent, and engagement by class." },
    { id: "rep-2", name: "Attendance", description: "Attendance rates by class, grade and date range." },
    { id: "rep-3", name: "Assignment Completion", description: "On-time vs late vs missing submissions by class." },
    { id: "rep-4", name: "Student Performance", description: "Average scores by subject and grade." },
    { id: "rep-5", name: "Teacher Activity", description: "Lessons, assignments and reviews completed by teacher." },
    { id: "rep-6", name: "Class Summary", description: "Overall snapshot of a single class: roster, schedule, performance." }
  ];

  const FUTURE_ADDONS = [
    "Parent Portal", "Parent Mobile App", "Student Mobile App", "Real embedded video classroom",
    "Zoom / Google Meet integration", "Recorded lesson storage", "Online Exams", "Certificates",
    "E-Learning course library", "AI Tutor", "Chat / Messaging", "SMS notifications",
    "KHQR / online payment", "SCORM / LTI integration"
  ];

  const KPIS = {
    totalStudents: 248,
    totalTeachers: 26,
    activeClasses: 18,
    liveClassesToday: 6,
    assignmentsDue: 14,
    avgAttendance: 92
  };

  // ---- Helper lookups ----
  function studentById(id) { return STUDENTS.find(s => s.id === id); }
  function teacherById(id) { return TEACHERS.find(t => t.id === id); }
  function classById(id) { return CLASSES.find(c => c.id === id); }
  function subjectTeacherName(classId, subject) {
    const c = classById(classId);
    if (!c) return "";
    const tid = c.subjectTeachers[subject];
    const t = teacherById(tid);
    return t ? t.name : "";
  }
  function assignmentById(id) { return ASSIGNMENTS.find(a => a.id === id); }
  function lessonById(id) { return LESSONS.find(l => l.id === id); }
  function liveClassById(id) { return LIVE_CLASSES.find(l => l.id === id); }
  function submissionsForAssignment(aid) { return SUBMISSIONS.filter(s => s.assignmentId === aid); }
  function submissionFor(aid, sid) { return SUBMISSIONS.find(s => s.assignmentId === aid && s.studentId === sid); }
  function classesForTeacher(tid) { return CLASSES.filter(c => Object.values(c.subjectTeachers).includes(tid) || c.homeroomTeacherId === tid); }
  function studentsInClass(cid) { const c = classById(cid); return c ? c.studentIds.map(studentById) : []; }

  return {
    SUBJECTS, TEACHERS, CLASSES, STUDENTS, LESSONS, ASSIGNMENTS, SUBMISSIONS, ATTENDANCE,
    LIVE_CLASSES, SCHEDULE, ANNOUNCEMENTS, NOTIFICATIONS, ACTIVITY_LOG, REPORTS,
    FUTURE_ADDONS, KPIS, CURRENT_STUDENT_ID, CURRENT_TEACHER_ID,
    studentById, teacherById, classById, subjectTeacherName, assignmentById,
    lessonById, liveClassById, submissionsForAssignment, submissionFor,
    classesForTeacher, studentsInClass
  };
})();
