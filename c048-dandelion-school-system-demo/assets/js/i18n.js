/* ==========================================================================
   EN / KH string table. English is fully functional; Khmer strings are
   representative sample translations for demo purposes.
   ========================================================================== */

const I18N = {
  en: {
    nav_dashboard: "Dashboard", nav_students: "Students", nav_enrollment: "Enrollment",
    nav_classes: "Classes", nav_attendance: "Attendance", nav_payments: "Payments",
    nav_staff: "Staff", nav_leave: "Leave & Approvals", nav_academic: "Academic Records",
    nav_announcements: "Announcements", nav_reports: "Reports", nav_users: "Users & Roles",
    nav_activity: "Activity Log", nav_settings: "Settings",
    nav_section_main: "Main", nav_section_people: "People & Learning", nav_section_ops: "Operations", nav_section_system: "System",
    search_placeholder: "Search students, staff, receipts...",
    top_notifications: "Notifications", top_view_all: "View all",
    login_title: "Sign in to continue", login_lead: "Select a demo role to preview the dashboard as that user.",
    login_badge: "Demo access — no real login required",
    login_cta: "Continue to Dashboard",
    login_heading: "A calmer way to run your school's daily operations.",
    login_sub: "Students, enrollment, tuition, attendance, staff and approvals — in one place.",
    login_quote: "Demo build prepared for Dandelion International Academy of Education.",
    btn_view: "View", btn_edit: "Edit", btn_export_csv: "Export CSV", btn_print: "Print",
    btn_save_draft: "Save Draft", btn_confirm: "Confirm Enrollment", btn_record_payment: "Record Payment",
    btn_view_receipt: "View Receipt", btn_new_student: "Add Student", btn_new_enrollment: "New Enrollment",
    btn_new_class: "Add Class", btn_new_announcement: "New Announcement", btn_new_request: "New Request",
    btn_add_result: "Add Result", btn_clock_in: "Clock In", btn_clock_out: "Clock Out",
    btn_approve: "Approve", btn_reject: "Reject", btn_back: "Back",
    future_scope: "Optional / Future Scope",
  },
  kh: {
    nav_dashboard: "ទំព័រដើម", nav_students: "សិស្ស", nav_enrollment: "ការចុះឈ្មោះ",
    nav_classes: "ថ្នាក់រៀន", nav_attendance: "វត្តមាន", nav_payments: "ការទូទាត់ថ្លៃសិក្សា",
    nav_staff: "បុគ្គលិក", nav_leave: "ច្បាប់ឈប់សម្រាក", nav_academic: "លទ្ធផលសិក្សា",
    nav_announcements: "សេចក្តីជូនដំណឹង", nav_reports: "របាយការណ៍", nav_users: "អ្នកប្រើប្រាស់ និងតួនាទី",
    nav_activity: "កំណត់ត្រាសកម្មភាព", nav_settings: "ការកំណត់",
    nav_section_main: "ទំព័រចម្បង", nav_section_people: "សិស្ស និងការសិក្សា", nav_section_ops: "ប្រតិបត្តិការ", nav_section_system: "ប្រព័ន្ធ",
    search_placeholder: "ស្វែងរកសិស្ស បុគ្គលិក ឬបង្កាន់ដៃ...",
    top_notifications: "ការជូនដំណឹង", top_view_all: "មើលទាំងអស់",
    login_title: "ចូលដើម្បីបន្ត", login_lead: "ជ្រើសរើសតួនាទីសម្រាប់សាកល្បងប្រព័ន្ធ",
    login_badge: "ការចូលសាកល្បង — មិនត្រូវការគណនីពិត",
    login_cta: "បន្តទៅផ្ទាំងគ្រប់គ្រង",
    login_heading: "គ្រប់គ្រងសាលារៀនរបស់អ្នកឲ្យកាន់តែងាយស្រួល។",
    login_sub: "សិស្ស ការចុះឈ្មោះ ថ្លៃសិក្សា វត្តមាន បុគ្គលិក និងការអនុម័ត នៅកន្លែងតែមួយ។",
    login_quote: "ប្រព័ន្ធសាកល្បងសម្រាប់សាលា Dandelion International Academy of Education។",
    btn_view: "មើល", btn_edit: "កែសម្រួល", btn_export_csv: "នាំចេញ CSV", btn_print: "បោះពុម្ព",
    btn_save_draft: "រក្សាទុកសេចក្តីព្រាង", btn_confirm: "បញ្ជាក់ការចុះឈ្មោះ", btn_record_payment: "កត់ត្រាការទូទាត់",
    btn_view_receipt: "មើលបង្កាន់ដៃ", btn_new_student: "បន្ថែមសិស្ស", btn_new_enrollment: "ការចុះឈ្មោះថ្មី",
    btn_new_class: "បន្ថែមថ្នាក់", btn_new_announcement: "សេចក្តីជូនដំណឹងថ្មី", btn_new_request: "សំណើថ្មី",
    btn_add_result: "បន្ថែមលទ្ធផល", btn_clock_in: "ចូលធ្វើការ", btn_clock_out: "ចេញពីការងារ",
    btn_approve: "អនុម័ត", btn_reject: "បដិសេធ", btn_back: "ត្រឡប់ក្រោយ",
    future_scope: "ជម្រើសបន្ថែម / ដំណាក់កាលអនាគត",
  },
};

let CURRENT_LANG = "en";
function t(key) { return (I18N[CURRENT_LANG] && I18N[CURRENT_LANG][key]) || I18N.en[key] || key; }
