/* ==========================================================================
   Dandelion International Academy of Education — School System Demo
   Sample / demo data only. No real student or staff records.
   ========================================================================== */

const SCHOOL = {
  name: "Dandelion International Academy of Education",
  shortName: "Dandelion Academy",
  academicYear: "2026 – 2027",
  address: "Phnom Penh, Cambodia",
  phone: "+855 12 345 678",
  email: "info@dandelionacademy.edu.kh",
};

const CLASSES = [
  { code: "KG1-A", grade: "Kindergarten 1", name: "KG1 - Sunflower", teacher: "Ms. Sokha Ly", room: "Room 101", year: "2026-2027", schedule: "Mon–Fri, 7:30–11:30", status: "Active" },
  { code: "KG2-A", grade: "Kindergarten 2", name: "KG2 - Daisy", teacher: "Ms. Lina Chan", room: "Room 102", year: "2026-2027", schedule: "Mon–Fri, 7:30–11:30", status: "Active" },
  { code: "G1-A", grade: "Grade 1", name: "Grade 1A - Maple", teacher: "Mr. Ratha Sok", room: "Room 201", year: "2026-2027", schedule: "Mon–Fri, 7:00–15:30", status: "Active" },
  { code: "G2-A", grade: "Grade 2", name: "Grade 2A - Birch", teacher: "Ms. Sreyneang Kim", room: "Room 202", year: "2026-2027", schedule: "Mon–Fri, 7:00–15:30", status: "Active" },
  { code: "G3-A", grade: "Grade 3", name: "Grade 3A - Cedar", teacher: "Mr. Vichet Meas", room: "Room 203", year: "2026-2027", schedule: "Mon–Fri, 7:00–15:30", status: "Active" },
  { code: "G4-A", grade: "Grade 4", name: "Grade 4A - Willow", teacher: "Ms. Channary Ouk", room: "Room 301", year: "2026-2027", schedule: "Mon–Fri, 7:00–15:30", status: "Active" },
  { code: "G5-A", grade: "Grade 5", name: "Grade 5A - Palm", teacher: "Mr. Dara Sun", room: "Room 302", year: "2026-2027", schedule: "Mon–Fri, 7:00–15:30", status: "Active" },
  { code: "G6-A", grade: "Grade 6", name: "Grade 6A - Bamboo", teacher: "Ms. Anna Lee", room: "Room 303", year: "2026-2027", schedule: "Mon–Fri, 7:00–15:30", status: "Active" },
];

const SUBJECTS = ["English", "Mathematics", "Science", "Khmer", "Chinese", "Art", "ICT", "Physical Education"];

const FEE_TYPES = [
  { name: "Enrollment Fee", defaultAmount: 150 },
  { name: "Tuition Fee", defaultAmount: 220 },
  { name: "Books", defaultAmount: 45 },
  { name: "Uniform", defaultAmount: 35 },
  { name: "Transportation", defaultAmount: 40 },
  { name: "Activity Fee", defaultAmount: 20 },
  { name: "Other", defaultAmount: 0 },
];

const DEPARTMENTS = ["Academic", "Administration", "Finance", "Human Resources", "Facilities"];

// ---------------------------------------------------------------------------
// Students
// ---------------------------------------------------------------------------
const STUDENTS = [
  { id: "STU-2026-001", name: "Sok Dara", gender: "Male", dob: "2019-03-14", class: "KG1-A", enrolled: "2026-08-01", guardian: "Mr. Sopheak Sok", guardianRel: "Father", phone: "012 555 101", email: "sopheak.sok@example.com", address: "Sen Sok, Phnom Penh", occupation: "Business Owner", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mrs. Chantha Sok — 012 555 102" },
  { id: "STU-2026-002", name: "Chantha Lim", gender: "Female", dob: "2018-11-02", class: "KG2-A", enrolled: "2025-08-05", guardian: "Mrs. Sreymom Lim", guardianRel: "Mother", phone: "012 555 103", email: "sreymom.lim@example.com", address: "Toul Kork, Phnom Penh", occupation: "Teacher", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mr. Vibol Lim — 012 555 104" },
  { id: "STU-2026-003", name: "Sreyneang Kim", gender: "Female", dob: "2017-06-21", class: "G1-A", enrolled: "2024-08-03", guardian: "Mr. Bunthoeun Kim", guardianRel: "Father", phone: "012 555 105", email: "bunthoeun.kim@example.com", address: "Chamkarmon, Phnom Penh", occupation: "Engineer", status: "Active", payment: "Partially Paid", nationality: "Cambodian", emergency: "Mrs. Dalin Kim — 012 555 106" },
  { id: "STU-2026-004", name: "David Chen", gender: "Male", dob: "2017-02-09", class: "G1-A", enrolled: "2024-08-03", guardian: "Mr. Wei Chen", guardianRel: "Father", phone: "012 555 107", email: "wei.chen@example.com", address: "BKK1, Phnom Penh", occupation: "Trade Consultant", status: "Active", payment: "Paid", nationality: "Chinese", emergency: "Mrs. Mei Chen — 012 555 108" },
  { id: "STU-2026-005", name: "Anna Lee", gender: "Female", dob: "2016-09-30", class: "G2-A", enrolled: "2023-08-01", guardian: "Mr. James Lee", guardianRel: "Father", phone: "012 555 109", email: "james.lee@example.com", address: "Daun Penh, Phnom Penh", occupation: "NGO Director", status: "Active", payment: "Unpaid", nationality: "American", emergency: "Mrs. Sarah Lee — 012 555 110" },
  { id: "STU-2026-006", name: "Pisey Chhun", gender: "Male", dob: "2016-04-18", class: "G2-A", enrolled: "2023-08-01", guardian: "Mrs. Sophorn Chhun", guardianRel: "Mother", phone: "012 555 111", email: "sophorn.chhun@example.com", address: "Russey Keo, Phnom Penh", occupation: "Nurse", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mr. Piseth Chhun — 012 555 112" },
  { id: "STU-2026-007", name: "Ratanak Heng", gender: "Male", dob: "2015-12-05", class: "G3-A", enrolled: "2022-08-02", guardian: "Mr. Sarun Heng", guardianRel: "Father", phone: "012 555 113", email: "sarun.heng@example.com", address: "Sen Sok, Phnom Penh", occupation: "Civil Servant", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mrs. Kunthea Heng — 012 555 114" },
  { id: "STU-2026-008", name: "Sophea Prum", gender: "Female", dob: "2015-08-11", class: "G3-A", enrolled: "2022-08-02", guardian: "Mr. Vantha Prum", guardianRel: "Father", phone: "012 555 115", email: "vantha.prum@example.com", address: "Chroy Changvar, Phnom Penh", occupation: "Architect", status: "Active", payment: "Overdue", nationality: "Cambodian", emergency: "Mrs. Malis Prum — 012 555 116" },
  { id: "STU-2026-009", name: "Michael Tan", gender: "Male", dob: "2014-05-27", class: "G4-A", enrolled: "2021-08-01", guardian: "Mr. Kevin Tan", guardianRel: "Father", phone: "012 555 117", email: "kevin.tan@example.com", address: "BKK3, Phnom Penh", occupation: "Restaurateur", status: "Active", payment: "Paid", nationality: "Singaporean", emergency: "Mrs. Grace Tan — 012 555 118" },
  { id: "STU-2026-010", name: "Sreymom Chea", gender: "Female", dob: "2014-01-19", class: "G4-A", enrolled: "2021-08-01", guardian: "Mrs. Rina Chea", guardianRel: "Mother", phone: "012 555 119", email: "rina.chea@example.com", address: "Toul Kork, Phnom Penh", occupation: "Shop Owner", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mr. Sothy Chea — 012 555 120" },
  { id: "STU-2026-011", name: "Bora Sam", gender: "Male", dob: "2013-10-03", class: "G5-A", enrolled: "2020-08-03", guardian: "Mr. Chamroeun Sam", guardianRel: "Father", phone: "012 555 121", email: "chamroeun.sam@example.com", address: "Sen Sok, Phnom Penh", occupation: "IT Manager", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mrs. Sopheap Sam — 012 555 122" },
  { id: "STU-2026-012", name: "Emily Wong", gender: "Female", dob: "2013-07-15", class: "G5-A", enrolled: "2020-08-03", guardian: "Mr. Alan Wong", guardianRel: "Father", phone: "012 555 123", email: "alan.wong@example.com", address: "BKK1, Phnom Penh", occupation: "Bank Manager", status: "Active", payment: "Partially Paid", nationality: "Malaysian", emergency: "Mrs. Julie Wong — 012 555 124" },
  { id: "STU-2026-013", name: "Sophal Nov", gender: "Male", dob: "2012-02-28", class: "G6-A", enrolled: "2019-08-05", guardian: "Mr. Kimhouy Nov", guardianRel: "Father", phone: "012 555 125", email: "kimhouy.nov@example.com", address: "Chamkarmon, Phnom Penh", occupation: "Lawyer", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mrs. Sokunthea Nov — 012 555 126" },
  { id: "STU-2026-014", name: "Lina Pich", gender: "Female", dob: "2012-11-08", class: "G6-A", enrolled: "2019-08-05", guardian: "Mrs. Chanlina Pich", guardianRel: "Mother", phone: "012 555 127", email: "chanlina.pich@example.com", address: "Daun Penh, Phnom Penh", occupation: "Doctor", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mr. Vantha Pich — 012 555 128" },
  { id: "STU-2026-015", name: "Chanreaksmey Ouk", gender: "Female", dob: "2019-05-22", class: "KG1-A", enrolled: "2026-08-01", guardian: "Mr. Sovann Ouk", guardianRel: "Father", phone: "012 555 129", email: "sovann.ouk@example.com", address: "Russey Keo, Phnom Penh", occupation: "Accountant", status: "Active", payment: "Unpaid", nationality: "Cambodian", emergency: "Mrs. Bopha Ouk — 012 555 130" },
  { id: "STU-2026-016", name: "James Park", gender: "Male", dob: "2018-08-16", class: "KG2-A", enrolled: "2025-08-05", guardian: "Mr. Jin Park", guardianRel: "Father", phone: "012 555 131", email: "jin.park@example.com", address: "BKK1, Phnom Penh", occupation: "Trade Manager", status: "Active", payment: "Paid", nationality: "Korean", emergency: "Mrs. Soo Park — 012 555 132" },
  { id: "STU-2026-017", name: "Kunthea Sok", gender: "Female", dob: "2017-04-03", class: "G1-A", enrolled: "2024-08-03", guardian: "Mrs. Pisey Sok", guardianRel: "Mother", phone: "012 555 133", email: "pisey.sok@example.com", address: "Chroy Changvar, Phnom Penh", occupation: "Pharmacist", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mr. Sarath Sok — 012 555 134" },
  { id: "STU-2026-018", name: "Vibol Chan", gender: "Male", dob: "2016-01-30", class: "G2-A", enrolled: "2023-08-01", guardian: "Mr. Sokhom Chan", guardianRel: "Father", phone: "012 555 135", email: "sokhom.chan@example.com", address: "Sen Sok, Phnom Penh", occupation: "Freelancer", status: "Inactive", payment: "Unpaid", nationality: "Cambodian", emergency: "Mrs. Ratha Chan — 012 555 136" },
  { id: "STU-2026-019", name: "Sarah Kim", gender: "Female", dob: "2015-09-25", class: "G3-A", enrolled: "2022-08-02", guardian: "Mr. Daniel Kim", guardianRel: "Father", phone: "012 555 137", email: "daniel.kim@example.com", address: "BKK3, Phnom Penh", occupation: "Consultant", status: "Active", payment: "Paid", nationality: "Korean", emergency: "Mrs. Grace Kim — 012 555 138" },
  { id: "STU-2026-020", name: "Piseth Long", gender: "Male", dob: "2014-06-12", class: "G4-A", enrolled: "2021-08-01", guardian: "Mrs. Sophany Long", guardianRel: "Mother", phone: "012 555 139", email: "sophany.long@example.com", address: "Toul Kork, Phnom Penh", occupation: "Sales Manager", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mr. Bunna Long — 012 555 140" },
  { id: "STU-2026-021", name: "Nita Prom", gender: "Female", dob: "2013-03-07", class: "G5-A", enrolled: "2020-08-03", guardian: "Mr. Chetra Prom", guardianRel: "Father", phone: "012 555 141", email: "chetra.prom@example.com", address: "Chamkarmon, Phnom Penh", occupation: "Marketing Director", status: "Active", payment: "Partially Paid", nationality: "Cambodian", emergency: "Mrs. Malika Prom — 012 555 142" },
  { id: "STU-2026-022", name: "Andrew Sim", gender: "Male", dob: "2012-12-19", class: "G6-A", enrolled: "2019-08-05", guardian: "Mr. Robert Sim", guardianRel: "Father", phone: "012 555 143", email: "robert.sim@example.com", address: "BKK1, Phnom Penh", occupation: "Regional Manager", status: "Active", payment: "Paid", nationality: "Singaporean", emergency: "Mrs. Linda Sim — 012 555 144" },
  { id: "STU-2026-023", name: "Sreypov Meng", gender: "Female", dob: "2019-10-11", class: "KG1-A", enrolled: "2026-08-01", guardian: "Mrs. Chariya Meng", guardianRel: "Mother", phone: "012 555 145", email: "chariya.meng@example.com", address: "Sen Sok, Phnom Penh", occupation: "Designer", status: "Active", payment: "Paid", nationality: "Cambodian", emergency: "Mr. Sambo Meng — 012 555 146" },
  { id: "STU-2026-024", name: "Thida Roeun", gender: "Female", dob: "2017-07-08", class: "G1-A", enrolled: "2026-08-10", guardian: "Mr. Vireak Roeun", guardianRel: "Father", phone: "012 555 147", email: "vireak.roeun@example.com", address: "Russey Keo, Phnom Penh", occupation: "Engineer", status: "Active", payment: "Unpaid", nationality: "Cambodian", emergency: "Mrs. Sokha Roeun — 012 555 148" },
];

// per-student academic history / notes / documents keyed by student id
const STUDENT_EXTRA = {
  "STU-2026-003": {
    notes: "Excellent at storytelling; needs support with number recognition. Guardian requested extra reading materials.",
    documents: [ { name: "Birth Certificate.pdf", date: "2024-07-20" }, { name: "Immunization Record.pdf", date: "2024-07-20" }, { name: "Previous Report Card.pdf", date: "2024-07-22" } ],
    history: [
      { date: "2024-08-03", event: "Enrolled into Grade 1A" },
      { date: "2025-06-15", event: "Promoted to Grade 2A" },
      { date: "2026-06-10", event: "Promoted to Grade 1A (repeat placement per parent request)" },
    ],
  },
  "STU-2026-008": {
    notes: "Guardian informed of overdue tuition balance on 2026-08-28. Follow-up scheduled with Finance.",
    documents: [ { name: "Birth Certificate.pdf", date: "2022-07-18" }, { name: "Medical Form.pdf", date: "2022-07-18" } ],
    history: [
      { date: "2022-08-02", event: "Enrolled into Grade 1A" },
      { date: "2025-06-12", event: "Promoted to Grade 3A" },
    ],
  },
};
function studentExtra(id) {
  return STUDENT_EXTRA[id] || { notes: "No additional notes on file.", documents: [ { name: "Birth Certificate.pdf", date: "2025-01-10" }, { name: "Immunization Record.pdf", date: "2025-01-10" } ], history: [ { date: "Enrollment Date", event: "Enrolled" } ] };
}

// ---------------------------------------------------------------------------
// Enrollment pipeline (new applications, separate from confirmed STUDENTS)
// ---------------------------------------------------------------------------
const ENROLLMENTS = [
  { id: "ENR-2026-041", name: "Sokchea Nhem", gender: "Male", dob: "2019-02-14", nationality: "Cambodian", guardian: "Mr. Sopheak Nhem", phone: "012 666 201", email: "sopheak.nhem@example.com", address: "Sen Sok, Phnom Penh", program: "Kindergarten 1", year: "2026-2027", enrollDate: "2026-09-02", prevSchool: "—", medical: "No known allergies", emergency: "Mrs. Sina Nhem — 012 666 202", status: "Pending Review" },
  { id: "ENR-2026-042", name: "Bopha Sarath", gender: "Female", dob: "2015-08-30", nationality: "Cambodian", guardian: "Mrs. Kolab Sarath", phone: "012 666 203", email: "kolab.sarath@example.com", address: "Chamkarmon, Phnom Penh", program: "Grade 3", year: "2026-2027", enrollDate: "2026-09-01", prevSchool: "Westline Academy", medical: "Mild peanut allergy", emergency: "Mr. Rithy Sarath — 012 666 204", status: "Pending Review" },
  { id: "ENR-2026-043", name: "Tommy Yang", gender: "Male", dob: "2016-04-22", nationality: "Chinese", guardian: "Mr. Feng Yang", phone: "012 666 205", email: "feng.yang@example.com", address: "BKK1, Phnom Penh", program: "Grade 2", year: "2026-2027", enrollDate: "2026-08-29", prevSchool: "Sunrise International", medical: "No known allergies", emergency: "Mrs. Li Yang — 012 666 206", status: "Confirmed" },
  { id: "ENR-2026-044", name: "Molika Yin", gender: "Female", dob: "2013-01-05", nationality: "Cambodian", guardian: "Mr. Sothea Yin", phone: "012 666 207", email: "sothea.yin@example.com", address: "Toul Kork, Phnom Penh", program: "Grade 5", year: "2026-2027", enrollDate: "2026-08-25", prevSchool: "—", medical: "—", emergency: "Mrs. Rachana Yin — 012 666 208", status: "Draft" },
  { id: "ENR-2026-045", name: "Kevin Ith", gender: "Male", dob: "2018-12-01", nationality: "Cambodian", guardian: "Mrs. Sreyroth Ith", phone: "012 666 209", email: "sreyroth.ith@example.com", address: "Russey Keo, Phnom Penh", program: "Kindergarten 2", year: "2026-2027", enrollDate: "2026-08-20", prevSchool: "—", medical: "Mild asthma — inhaler kept with homeroom teacher", emergency: "Mr. Pheakdey Ith — 012 666 210", status: "Rejected" },
];

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------
const PAYMENTS = [
  { receipt: "RCT-2026-1001", studentId: "STU-2026-001", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 220, date: "2026-09-02", method: "ABA", status: "Paid" },
  { receipt: "RCT-2026-1002", studentId: "STU-2026-002", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 20, paid: 200, date: "2026-09-01", method: "Cash", status: "Paid" },
  { receipt: "RCT-2026-1003", studentId: "STU-2026-003", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 100, date: "2026-09-03", method: "ACLEDA", status: "Partially Paid" },
  { receipt: "RCT-2026-1004", studentId: "STU-2026-004", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 220, date: "2026-09-01", method: "Bank Transfer", status: "Paid" },
  { receipt: "RCT-2026-1005", studentId: "STU-2026-005", term: "August 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 0, date: "-", method: "-", status: "Unpaid" },
  { receipt: "RCT-2026-1006", studentId: "STU-2026-006", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 220, date: "2026-09-04", method: "ABA", status: "Paid" },
  { receipt: "RCT-2026-1007", studentId: "STU-2026-007", term: "September 2026", feeType: "Books", due: 45, discount: 0, paid: 45, date: "2026-09-02", method: "Cash", status: "Paid" },
  { receipt: "RCT-2026-1008", studentId: "STU-2026-008", term: "July 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 0, date: "-", method: "-", status: "Overdue" },
  { receipt: "RCT-2026-1009", studentId: "STU-2026-009", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 220, date: "2026-09-03", method: "ABA", status: "Paid" },
  { receipt: "RCT-2026-1010", studentId: "STU-2026-010", term: "September 2026", feeType: "Uniform", due: 35, discount: 0, paid: 35, date: "2026-09-01", method: "Cash", status: "Paid" },
  { receipt: "RCT-2026-1011", studentId: "STU-2026-011", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 220, date: "2026-09-02", method: "ACLEDA", status: "Paid" },
  { receipt: "RCT-2026-1012", studentId: "STU-2026-012", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 110, date: "2026-09-04", method: "Cash", status: "Partially Paid" },
  { receipt: "RCT-2026-1013", studentId: "STU-2026-013", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 220, date: "2026-09-01", method: "Bank Transfer", status: "Paid" },
  { receipt: "RCT-2026-1014", studentId: "STU-2026-014", term: "September 2026", feeType: "Transportation", due: 40, discount: 0, paid: 40, date: "2026-09-01", method: "Cash", status: "Paid" },
  { receipt: "RCT-2026-1015", studentId: "STU-2026-015", term: "August 2026", feeType: "Enrollment Fee", due: 150, discount: 0, paid: 0, date: "-", method: "-", status: "Unpaid" },
  { receipt: "RCT-2026-1016", studentId: "STU-2026-018", term: "June 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 0, date: "-", method: "-", status: "Overdue" },
  { receipt: "RCT-2026-1017", studentId: "STU-2026-021", term: "September 2026", feeType: "Tuition Fee", due: 220, discount: 0, paid: 150, date: "2026-09-05", method: "ABA", status: "Partially Paid" },
  { receipt: "RCT-2026-1018", studentId: "STU-2026-024", term: "September 2026", feeType: "Enrollment Fee", due: 150, discount: 0, paid: 0, date: "-", method: "-", status: "Unpaid" },
];

// ---------------------------------------------------------------------------
// Staff
// ---------------------------------------------------------------------------
const STAFF = [
  { id: "STF-101", name: "Sokha Ly", role: "Teacher", department: "Academic", phone: "012 700 101", email: "sokha.ly@dandelionacademy.edu.kh", joined: "2021-08-01", type: "Full-time", status: "Active", assigned: "KG1-A" },
  { id: "STF-102", name: "Dara Chan", role: "Director", department: "Administration", phone: "012 700 102", email: "dara.chan@dandelionacademy.edu.kh", joined: "2019-01-10", type: "Full-time", status: "Active", assigned: "—" },
  { id: "STF-103", name: "Sreyneang Vong", role: "Admin / Registrar", department: "Administration", phone: "012 700 103", email: "sreyneang.vong@dandelionacademy.edu.kh", joined: "2020-05-15", type: "Full-time", status: "Active", assigned: "—" },
  { id: "STF-104", name: "Ratha Sok", role: "Teacher", department: "Academic", phone: "012 700 104", email: "ratha.sok@dandelionacademy.edu.kh", joined: "2022-08-02", type: "Full-time", status: "Active", assigned: "G1-A" },
  { id: "STF-105", name: "Lina Chan", role: "Teacher", department: "Academic", phone: "012 700 105", email: "lina.chan@dandelionacademy.edu.kh", joined: "2022-08-02", type: "Full-time", status: "Active", assigned: "KG2-A" },
  { id: "STF-106", name: "Sreyneang Kim", role: "Teacher", department: "Academic", phone: "012 700 106", email: "sreyneang.kim@dandelionacademy.edu.kh", joined: "2021-08-01", type: "Full-time", status: "Active", assigned: "G2-A" },
  { id: "STF-107", name: "Vichet Meas", role: "Teacher", department: "Academic", phone: "012 700 107", email: "vichet.meas@dandelionacademy.edu.kh", joined: "2023-01-16", type: "Full-time", status: "Active", assigned: "G3-A" },
  { id: "STF-108", name: "Channary Ouk", role: "Teacher", department: "Academic", phone: "012 700 108", email: "channary.ouk@dandelionacademy.edu.kh", joined: "2020-08-03", type: "Full-time", status: "Active", assigned: "G4-A" },
  { id: "STF-109", name: "Dara Sun", role: "Teacher", department: "Academic", phone: "012 700 109", email: "dara.sun@dandelionacademy.edu.kh", joined: "2019-08-05", type: "Full-time", status: "On Leave", assigned: "G5-A" },
  { id: "STF-110", name: "Anna Lee", role: "Teacher", department: "Academic", phone: "012 700 110", email: "anna.lee@dandelionacademy.edu.kh", joined: "2018-08-06", type: "Full-time", status: "Active", assigned: "G6-A" },
  { id: "STF-111", name: "Piseth Ang", role: "Finance", department: "Finance", phone: "012 700 111", email: "piseth.ang@dandelionacademy.edu.kh", joined: "2021-03-01", type: "Full-time", status: "Active", assigned: "—" },
  { id: "STF-112", name: "Malis Reap", role: "Finance", department: "Finance", phone: "012 700 112", email: "malis.reap@dandelionacademy.edu.kh", joined: "2023-06-12", type: "Full-time", status: "Active", assigned: "—" },
  { id: "STF-113", name: "Bunna Hor", role: "HR", department: "Human Resources", phone: "012 700 113", email: "bunna.hor@dandelionacademy.edu.kh", joined: "2020-02-17", type: "Full-time", status: "Active", assigned: "—" },
  { id: "STF-114", name: "Sopheak Toch", role: "Facilities", department: "Facilities", phone: "012 700 114", email: "sopheak.toch@dandelionacademy.edu.kh", joined: "2019-11-04", type: "Full-time", status: "Active", assigned: "—" },
  { id: "STF-115", name: "Chenda Prak", role: "Teacher Assistant", department: "Academic", phone: "012 700 115", email: "chenda.prak@dandelionacademy.edu.kh", joined: "2024-08-01", type: "Part-time", status: "Active", assigned: "KG1-A" },
  { id: "STF-116", name: "Vantha Keo", role: "Facilities", department: "Facilities", phone: "012 700 116", email: "vantha.keo@dandelionacademy.edu.kh", joined: "2022-09-01", type: "Full-time", status: "Absent", assigned: "—" },
];

const STAFF_EXTRA = {
  "STF-109": { leaveBalance: 6, notes: "On approved medical leave until 2026-09-10.", documents: [ { name: "Employment Contract.pdf", date: "2019-08-01" } ] },
};
function staffExtra(id) {
  return STAFF_EXTRA[id] || { leaveBalance: 12, notes: "No additional notes on file.", documents: [ { name: "Employment Contract.pdf", date: "2022-01-01" }, { name: "NSSF Registration.pdf", date: "2022-01-05" } ] };
}

// ---------------------------------------------------------------------------
// Attendance (students) — sample day: 2026-09-06 (today)
// ---------------------------------------------------------------------------
const TODAY = "2026-09-06";

function seededStatus(seedIndex) {
  const pattern = ["Present", "Present", "Present", "Present", "Present", "Late", "Present", "Present", "Absent", "Present", "Present", "Excused"];
  return pattern[seedIndex % pattern.length];
}

const STUDENT_ATTENDANCE_TODAY = STUDENTS.map((s, i) => ({
  studentId: s.id,
  class: s.class,
  status: s.status === "Inactive" ? "Absent" : seededStatus(i + s.id.length),
}));

// ---------------------------------------------------------------------------
// Staff attendance — sample day: today
// ---------------------------------------------------------------------------
const STAFF_ATTENDANCE_TODAY = STAFF.map((st, i) => {
  if (st.status === "On Leave") return { staffId: st.id, checkIn: "-", checkOut: "-", status: "Leave", lateMin: 0, note: "Approved leave" };
  if (st.status === "Absent") return { staffId: st.id, checkIn: "-", checkOut: "-", status: "Absent", lateMin: 0, note: "No show, not yet confirmed" };
  const late = i % 5 === 0 ? 12 : 0;
  return { staffId: st.id, checkIn: late ? "7:12 AM" : "6:55 AM", checkOut: "4:05 PM", status: late ? "Late" : "Present", lateMin: late, note: "" };
});

// ---------------------------------------------------------------------------
// Leave & approval requests
// ---------------------------------------------------------------------------
const LEAVE_REQUESTS = [
  { id: "REQ-3001", requester: "Dara Sun", department: "Academic", type: "Leave Request", date: "2026-09-01 to 2026-09-10", reason: "Medical recovery after minor surgery.", attachment: "medical_note.pdf", status: "Approved", approver: "Dara Chan", comments: "Approved with substitute teacher assigned (Ms. Chenda Prak)." },
  { id: "REQ-3002", requester: "Vantha Keo", department: "Facilities", type: "Leave Request", date: "2026-09-06", reason: "Family emergency.", attachment: "-", status: "Pending", approver: "Bunna Hor", comments: "" },
  { id: "REQ-3003", requester: "Piseth Ang", department: "Finance", type: "Purchase Request", date: "2026-09-05", reason: "New receipt printer for Finance office.", attachment: "quotation_printer.pdf", status: "Pending", approver: "Dara Chan", comments: "" },
  { id: "REQ-3004", requester: "Channary Ouk", department: "Academic", type: "Mission / Business Trip", date: "2026-09-15", reason: "Teacher training workshop at MoEYS.", attachment: "invitation_letter.pdf", status: "Pending", approver: "Dara Chan", comments: "" },
  { id: "REQ-3005", requester: "Sreyneang Vong", department: "Administration", type: "Overtime Request", date: "2026-08-30", reason: "Enrollment season — extended office hours.", attachment: "-", status: "Approved", approver: "Dara Chan", comments: "Approved, 2 additional hours." },
  { id: "REQ-3006", requester: "Bunna Hor", department: "Human Resources", type: "Budget Request", date: "2026-09-02", reason: "Staff appreciation event budget.", attachment: "budget_plan.xlsx", status: "Rejected", approver: "Dara Chan", comments: "Deferred to next quarter, budget already allocated for Q3." },
  { id: "REQ-3007", requester: "Vichet Meas", department: "Academic", type: "Leave Request", date: "2026-09-12", reason: "Personal matters.", attachment: "-", status: "Draft", approver: "Dara Chan", comments: "" },
];

// ---------------------------------------------------------------------------
// Academic records
// ---------------------------------------------------------------------------
const ACADEMIC_RECORDS = [
  { studentId: "STU-2026-003", subject: "English", term: "Term 1, 2026-2027", score: 88, grade: "A", teacher: "Mr. Ratha Sok", comment: "Confident reader, participates actively in class discussion." },
  { studentId: "STU-2026-003", subject: "Mathematics", term: "Term 1, 2026-2027", score: 72, grade: "B", teacher: "Mr. Ratha Sok", comment: "Needs more practice with number recognition and counting." },
  { studentId: "STU-2026-004", subject: "English", term: "Term 1, 2026-2027", score: 95, grade: "A+", teacher: "Mr. Ratha Sok", comment: "Outstanding vocabulary and comprehension for grade level." },
  { studentId: "STU-2026-004", subject: "Science", term: "Term 1, 2026-2027", score: 90, grade: "A", teacher: "Mr. Ratha Sok", comment: "Curious and asks thoughtful questions during experiments." },
  { studentId: "STU-2026-013", subject: "Mathematics", term: "Term 1, 2026-2027", score: 91, grade: "A", teacher: "Ms. Anna Lee", comment: "Strong problem-solving skills, ready for advanced material." },
  { studentId: "STU-2026-013", subject: "Khmer", term: "Term 1, 2026-2027", score: 85, grade: "A", teacher: "Ms. Anna Lee", comment: "Good handwriting and comprehension." },
  { studentId: "STU-2026-014", subject: "Science", term: "Term 1, 2026-2027", score: 78, grade: "B+", teacher: "Ms. Anna Lee", comment: "Solid understanding, could improve on lab report detail." },
  { studentId: "STU-2026-022", subject: "ICT", term: "Term 1, 2026-2027", score: 93, grade: "A", teacher: "Ms. Anna Lee", comment: "Excellent grasp of basic coding concepts." },
];

// ---------------------------------------------------------------------------
// Announcements
// ---------------------------------------------------------------------------
const ANNOUNCEMENTS = [
  { id: "ANN-501", title: "Mid-Term Break Schedule", audience: "All Staff", date: "2026-09-05", createdBy: "Dara Chan", status: "Published", message: "The school will be closed from Sept 20–22 for the mid-term break. Classes resume Sept 23. Please plan lesson coverage accordingly." },
  { id: "ANN-502", title: "Finance: September Tuition Reminder", audience: "Finance", date: "2026-09-04", createdBy: "Piseth Ang", status: "Published", message: "Please follow up with guardians who have outstanding balances from July and August before the 15th." },
  { id: "ANN-503", title: "Teacher Training Workshop", audience: "Teachers", date: "2026-09-03", createdBy: "Bunna Hor", status: "Published", message: "MoEYS teacher training workshop on Sept 15. Interested teachers should submit a Mission Request through Leave & Approvals." },
  { id: "ANN-504", title: "New Student Orientation", audience: "Specific Department", date: "2026-09-02", createdBy: "Sreyneang Vong", status: "Published", message: "Orientation for newly enrolled students and parents will be held Sept 10, 8:00 AM in the main hall." },
  { id: "ANN-505", title: "Parent-Teacher Meeting (Draft)", audience: "All Staff", date: "2026-09-06", createdBy: "Dara Chan", status: "Draft", message: "Planning a parent-teacher meeting for late September — details to be confirmed." },
];

// ---------------------------------------------------------------------------
// Activity log
// ---------------------------------------------------------------------------
const ACTIVITY_LOG = [
  { time: "2026-09-06 08:14", user: "Sreyneang Vong", role: "Admin / Registrar", module: "Enrollment", action: "Enrollment Confirmed", details: "Confirmed enrollment ENR-2026-043 (Tommy Yang) into Grade 2A." },
  { time: "2026-09-06 08:02", user: "Piseth Ang", role: "Finance", module: "Payments", action: "Payment Recorded", details: "Recorded RCT-2026-1017 — $150 partial payment for Nita Prom (September 2026 Tuition)." },
  { time: "2026-09-05 16:40", user: "Ratha Sok", role: "Teacher", module: "Attendance", action: "Attendance Updated", details: "Submitted attendance for Grade 1A, 2026-09-05." },
  { time: "2026-09-05 15:10", user: "Dara Chan", role: "Director", module: "Leave & Approvals", action: "Leave Approved", details: "Approved REQ-3001 — Leave Request from Dara Sun." },
  { time: "2026-09-05 11:22", user: "Sreyneang Vong", role: "Admin / Registrar", module: "Students", action: "Student Created", details: "Created student profile STU-2026-024 (Thida Roeun)." },
  { time: "2026-09-04 14:05", user: "Bunna Hor", role: "HR", module: "Staff", action: "Staff Added", details: "Added new staff record STF-115 (Chenda Prak, Teacher Assistant)." },
  { time: "2026-09-04 09:47", user: "Anna Lee", role: "Teacher", module: "Academic Records", action: "Academic Record Updated", details: "Added Term 1 ICT score for STU-2026-022 (Andrew Sim)." },
  { time: "2026-09-03 13:30", user: "Piseth Ang", role: "Finance", module: "Payments", action: "Payment Recorded", details: "Recorded RCT-2026-1003 — $100 partial payment for Sreyneang Kim (September 2026 Tuition)." },
  { time: "2026-09-02 10:15", user: "Dara Chan", role: "Director", module: "Leave & Approvals", action: "Leave Approved", details: "Approved REQ-3005 — Overtime Request from Sreyneang Vong." },
  { time: "2026-09-01 09:00", user: "Sreyneang Vong", role: "Admin / Registrar", module: "Enrollment", action: "Enrollment Confirmed", details: "Confirmed enrollment for Sok Dara into KG1-A." },
];

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------
const NOTIFICATIONS = [
  { title: "3 Pending Leave Requests", detail: "Awaiting your approval in Leave & Approvals.", route: "leave" },
  { title: "5 Outstanding Tuition Accounts", detail: "Includes 2 overdue balances from July.", route: "payments" },
  { title: "2 New Enrollments Awaiting Review", detail: "Sokchea Nhem and Bopha Sarath need review.", route: "enrollment" },
  { title: "Attendance Not Submitted — Grade 5A", detail: "Today's attendance has not been recorded yet.", route: "attendance" },
];

// ---------------------------------------------------------------------------
// Users & roles (demo accounts)
// ---------------------------------------------------------------------------
const DEMO_USERS = [
  { role: "director", label: "School Director / Owner", name: "Dara Chan", title: "School Director", email: "dara.chan@dandelionacademy.edu.kh" },
  { role: "admin", label: "Admin / Registrar", name: "Sreyneang Vong", title: "Admin / Registrar", email: "sreyneang.vong@dandelionacademy.edu.kh" },
  { role: "finance", label: "Finance", name: "Piseth Ang", title: "Finance Officer", email: "piseth.ang@dandelionacademy.edu.kh" },
  { role: "teacher", label: "Teacher", name: "Ratha Sok", title: "Grade 1A Homeroom Teacher", email: "ratha.sok@dandelionacademy.edu.kh" },
  { role: "hr", label: "HR", name: "Bunna Hor", title: "HR Officer", email: "bunna.hor@dandelionacademy.edu.kh" },
];

const ROLE_PERMISSIONS = {
  director: { label: "Director", scope: "Full visibility across all modules and final approval authority.", modules: { "Dashboard": "Full", "Students": "View", "Enrollment": "View", "Classes": "View", "Attendance": "View", "Payments": "View", "Staff": "View", "Leave & Approvals": "Approve", "Academic Records": "View", "Announcements": "Create", "Reports": "Full", "Users & Roles": "Manage", "Activity Log": "View", "Settings": "Manage" } },
  admin: { label: "Admin / Registrar", scope: "Manages students, enrollment, and class records.", modules: { "Dashboard": "View", "Students": "Manage", "Enrollment": "Manage", "Classes": "Manage", "Attendance": "View", "Payments": "View", "Staff": "—", "Leave & Approvals": "Request", "Academic Records": "View", "Announcements": "Create", "Reports": "View", "Users & Roles": "—", "Activity Log": "View", "Settings": "—" } },
  finance: { label: "Finance", scope: "Handles tuition, receipts, and finance reporting.", modules: { "Dashboard": "View", "Students": "View", "Enrollment": "View", "Classes": "—", "Attendance": "—", "Payments": "Manage", "Staff": "—", "Leave & Approvals": "Request", "Academic Records": "—", "Announcements": "View", "Reports": "Finance only", "Users & Roles": "—", "Activity Log": "View", "Settings": "—" } },
  teacher: { label: "Teacher", scope: "Manages assigned classes, attendance, and academic records.", modules: { "Dashboard": "View", "Students": "Assigned classes", "Enrollment": "—", "Classes": "Assigned classes", "Attendance": "Manage", "Payments": "—", "Staff": "—", "Leave & Approvals": "Request", "Academic Records": "Manage", "Announcements": "View", "Reports": "—", "Users & Roles": "—", "Activity Log": "—", "Settings": "—" } },
  hr: { label: "HR", scope: "Manages staff records, attendance, and leave approvals for staff.", modules: { "Dashboard": "View", "Students": "—", "Enrollment": "—", "Classes": "—", "Attendance": "—", "Payments": "—", "Staff": "Manage", "Leave & Approvals": "Approve", "Academic Records": "—", "Announcements": "Create", "Reports": "HR only", "Users & Roles": "—", "Activity Log": "View", "Settings": "—" } },
};

// ---------------------------------------------------------------------------
// Future add-ons (Settings > About System)
// ---------------------------------------------------------------------------
const FUTURE_ADDONS = [
  { name: "Parent Portal", desc: "Guardians log in to view attendance, grades and pay tuition." },
  { name: "Student Portal", desc: "Student self-service login for schedules and results." },
  { name: "Mobile App", desc: "Native app for staff and parents." },
  { name: "Online Payment / KHQR", desc: "Direct KHQR and card payment collection." },
  { name: "SMS Notifications", desc: "Automated SMS for attendance and payment reminders." },
  { name: "QR Student ID", desc: "QR-based ID cards for check-in and library use." },
  { name: "Library Management", desc: "Book catalog, borrowing and returns tracking." },
  { name: "Transportation Management", desc: "Bus routes, driver assignment and tracking." },
  { name: "Inventory / Uniform / Books", desc: "Stock tracking for uniforms, books and supplies." },
  { name: "Payroll", desc: "Automated salary computation and payslips." },
  { name: "Biometric Attendance", desc: "Fingerprint / face check-in for staff and students." },
  { name: "Online Exam", desc: "Digital testing and auto-grading." },
];
