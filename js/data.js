/* ==========================================================================
   MEP Technical and Skills Academy — Demo Data Layer
   --------------------------------------------------------------------------
   CLIENT DEMO NOTE (internal): Everything in this file is sample content
   generated for a client-facing demonstration. It is stored in the browser's
   localStorage so the Public Website and the Admin Dashboard stay in sync
   during a demo session. Nothing here touches a real server, database or
   authentication system. Replace with BizWeb CMS Core data on production
   build-out.
   ========================================================================== */

(function (global) {
  "use strict";

  var STORAGE_KEY = "mepAcademyDemoData_v1";
  var SESSION_KEY = "mepAcademyDemoSession_v1";

  // Locally stored technical stock photography; see IMAGE-SOURCES.md.
  var IMG = {
    hero: "assets/images/hero-bg.jpg",
    heroAlt: "assets/images/hero-bg.jpg",
    electrical: "assets/images/course-electrical.jpg",
    plumbing: "assets/images/course-plumbing.jpg",
    hvac: "assets/images/course-hvac.jpg",
    mechanical: "assets/images/course-mechanical.jpg",
    mep: "assets/images/course-mep.jpg",
    cad: "assets/images/course-cad.jpg",
    safety: "assets/images/course-safety.jpg",
    maintenance: "assets/images/course-maintenance.jpg",
    about: "assets/images/about.jpg",
    workshop1: "assets/images/gallery-workshop-1.jpg",
    workshop2: "assets/images/gallery-workshop-2.jpg",
    classroom1: "assets/images/gallery-classroom-1.jpg",
    classroom2: "assets/images/gallery-classroom-2.jpg",
    practical1: "assets/images/gallery-practical-1.jpg",
    practical2: "assets/images/gallery-practical-2.jpg",
    student1: "assets/images/gallery-student-1.jpg",
    student2: "assets/images/gallery-student-2.jpg",
    news1: "assets/images/news-intake.jpg",
    news2: "assets/images/news-workshop.jpg",
    news3: "assets/images/news-autocad.jpg",
    news4: "assets/images/news-spotlight.jpg"
  };

  function seedData() {
    return {
      settings: {
        academyName: "MEP Technical and Skills Academy",
        siteTitle: "MEP Technical and Skills Academy | Practical Technical Training",
        description: "Practical technical training designed to develop hands-on skills for students, technicians and working professionals in Cambodia.",
        phone: "077 929 360",
        telegram: "077 929 360",
        email: "",
        address: "",
        facebook: "",
        metaTitle: "MEP Technical and Skills Academy",
        metaDescription: "Practical technical training in electrical, plumbing, HVAC, mechanical and MEP fundamentals.",
        logoText: "MEP Academy"
      },

      courses: [
        {
          id: "c1",
          name: "Electrical Installation",
          category: "Electrical",
          shortDescription: "Foundational to intermediate electrical wiring and installation practices for residential and commercial settings.",
          fullDescription: "This hands-on program introduces students to safe and practical electrical installation work, covering wiring systems, circuit protection, and everyday troubleshooting used across residential and light commercial buildings.",
          duration: "8 weeks",
          level: "Beginner to Intermediate",
          image: IMG.electrical,
          outcomes: ["Read and interpret basic electrical drawings", "Install and terminate wiring safely", "Test and troubleshoot common circuit faults", "Follow workplace electrical safety procedures"],
          requirements: ["Basic literacy in Khmer or English", "Minimum age 16", "Interest in hands-on technical work"],
          modules: ["Electrical Safety Fundamentals", "Wiring & Circuit Basics", "Distribution Boards & Protection", "Practical Installation Workshop", "Testing & Troubleshooting"],
          trainingMethod: "Classroom instruction combined with hands-on workshop practice",
          status: "Published"
        },
        {
          id: "c2",
          name: "Plumbing Systems",
          category: "Plumbing",
          shortDescription: "Practical training in water supply, drainage and basic plumbing installation and repair techniques.",
          fullDescription: "Students learn the fundamentals of plumbing systems used in residential and commercial buildings, including pipe fitting, water supply lines, drainage, and common maintenance tasks.",
          duration: "6 weeks",
          level: "Beginner",
          image: IMG.plumbing,
          outcomes: ["Identify plumbing system components", "Perform basic pipe fitting and joining", "Diagnose common leaks and blockages", "Apply safe working practices on site"],
          requirements: ["Basic literacy in Khmer or English", "Minimum age 16"],
          modules: ["Plumbing System Overview", "Pipes, Fittings & Tools", "Water Supply Installation", "Drainage Systems", "Maintenance & Repair Practice"],
          trainingMethod: "Hands-on workshop training with guided practice sessions",
          status: "Published"
        },
        {
          id: "c3",
          name: "HVAC / Air Conditioning",
          category: "HVAC",
          shortDescription: "Introduction to air conditioning and ventilation systems, covering installation, servicing and basic repair.",
          fullDescription: "This program covers the essentials of HVAC systems commonly used in Cambodian homes and businesses, with a strong focus on practical servicing, installation support, and routine maintenance skills.",
          duration: "10 weeks",
          level: "Intermediate",
          image: IMG.hvac,
          outcomes: ["Understand refrigeration cycle basics", "Assist with AC unit installation", "Perform routine servicing and cleaning", "Identify common performance issues"],
          requirements: ["Basic technical aptitude", "Minimum age 17", "Prior electrical basics recommended"],
          modules: ["Refrigeration Fundamentals", "AC Unit Components", "Installation Support Practice", "Servicing & Maintenance", "Fault Finding Basics"],
          trainingMethod: "Workshop-based practical training with equipment demonstrations",
          status: "Published"
        },
        {
          id: "c4",
          name: "Mechanical Systems",
          category: "Mechanical",
          shortDescription: "Core mechanical skills covering hand tools, machine basics, and mechanical maintenance fundamentals.",
          fullDescription: "A practical introduction to mechanical systems and maintenance work, designed for students and technicians who want a solid foundation in mechanical tooling, assembly and basic repair.",
          duration: "8 weeks",
          level: "Beginner to Intermediate",
          image: IMG.mechanical,
          outcomes: ["Use hand and power tools safely", "Understand basic mechanical assemblies", "Perform routine mechanical maintenance", "Read simple mechanical drawings"],
          requirements: ["Minimum age 16", "Interest in mechanical/technical work"],
          modules: ["Workshop Safety & Tools", "Mechanical Fundamentals", "Assembly & Fastening Practice", "Maintenance Routines", "Practical Project"],
          trainingMethod: "Practical workshop sessions with instructor guidance",
          status: "Published"
        },
        {
          id: "c5",
          name: "Building MEP Fundamentals",
          category: "MEP",
          shortDescription: "An overview program covering Mechanical, Electrical and Plumbing systems as they work together in buildings.",
          fullDescription: "Designed for students and junior technicians who want a broad understanding of how MEP systems function together inside a modern building, this course blends theory with site-oriented examples.",
          duration: "12 weeks",
          level: "Intermediate",
          image: IMG.mep,
          outcomes: ["Describe how MEP systems interact in buildings", "Read basic MEP layout drawings", "Understand coordination between trades", "Apply basic site safety practices"],
          requirements: ["Basic technical background helpful", "Minimum age 18"],
          modules: ["Introduction to Building Systems", "Electrical Systems Overview", "Mechanical Systems Overview", "Plumbing Systems Overview", "Coordination & Site Practices"],
          trainingMethod: "Classroom sessions with site-based case studies",
          status: "Published"
        },
        {
          id: "c6",
          name: "AutoCAD / Technical Drawing",
          category: "Design",
          shortDescription: "Practical AutoCAD training for producing and reading technical and MEP-related drawings.",
          fullDescription: "This course builds practical drafting skills using AutoCAD, focused on technical and building-services drawings, so students can produce and interpret plans used in real construction and technical projects.",
          duration: "6 weeks",
          level: "Beginner to Intermediate",
          image: IMG.cad,
          outcomes: ["Navigate the AutoCAD interface confidently", "Create basic 2D technical drawings", "Apply layers, dimensions and annotations", "Produce simple MEP layout drawings"],
          requirements: ["Basic computer literacy", "Own laptop recommended"],
          modules: ["AutoCAD Interface & Tools", "2D Drawing Fundamentals", "Dimensioning & Annotation", "Technical Drawing Practice", "MEP Layout Basics"],
          trainingMethod: "Computer lab sessions with guided exercises",
          status: "Published"
        },
        {
          id: "c7",
          name: "Workplace Safety",
          category: "Safety",
          shortDescription: "Essential workplace safety training for technical and construction-site environments.",
          fullDescription: "A foundational safety course covering the practices, hazard awareness, and procedures technicians need before working on active technical or construction sites.",
          duration: "2 weeks",
          level: "Beginner",
          image: IMG.safety,
          outcomes: ["Identify common workplace hazards", "Apply correct use of PPE", "Understand basic emergency procedures", "Follow site safety documentation practices"],
          requirements: ["No prior experience required"],
          modules: ["Hazard Awareness", "Personal Protective Equipment", "Safe Work Procedures", "Emergency Response Basics"],
          trainingMethod: "Classroom instruction with practical demonstrations",
          status: "Published"
        },
        {
          id: "c8",
          name: "Technical Maintenance",
          category: "Maintenance",
          shortDescription: "Practical maintenance skills for buildings and technical equipment, covering routine upkeep and troubleshooting.",
          fullDescription: "This course prepares students for maintenance-technician roles by covering routine inspection, preventive maintenance and basic troubleshooting across electrical, mechanical and plumbing systems.",
          duration: "8 weeks",
          level: "Intermediate",
          image: IMG.maintenance,
          outcomes: ["Perform routine preventive maintenance checks", "Log and report maintenance issues", "Apply basic troubleshooting across systems", "Work safely in occupied buildings"],
          requirements: ["Basic technical background recommended", "Minimum age 18"],
          modules: ["Preventive Maintenance Principles", "Electrical Maintenance Basics", "Mechanical Maintenance Basics", "Plumbing Maintenance Basics", "Reporting & Documentation"],
          trainingMethod: "Blended classroom and on-site practice",
          status: "Published"
        }
      ],

      intakes: [
        { id: "i1", courseId: "c1", name: "October 2026 Intake", startDate: "2026-10-05", endDate: "2026-11-27", days: "Mon / Wed / Fri", startTime: "18:00", endTime: "20:00", maxStudents: 20, enrolled: 14, location: "Main Training Center, Room A", trainer: "Trainer to be confirmed", status: "Open" },
        { id: "i2", courseId: "c2", name: "October 2026 Intake", startDate: "2026-10-12", endDate: "2026-11-20", days: "Tue / Thu", startTime: "17:30", endTime: "20:00", maxStudents: 18, enrolled: 16, location: "Main Training Center, Workshop 2", trainer: "Trainer to be confirmed", status: "Almost Full" },
        { id: "i3", courseId: "c3", name: "November 2026 Intake", startDate: "2026-11-02", endDate: "2027-01-11", days: "Mon / Wed / Fri", startTime: "18:00", endTime: "20:30", maxStudents: 16, enrolled: 16, location: "Main Training Center, Workshop 1", trainer: "Trainer to be confirmed", status: "Closed" },
        { id: "i4", courseId: "c4", name: "October 2026 Intake", startDate: "2026-10-19", endDate: "2026-12-12", days: "Sat / Sun", startTime: "08:00", endTime: "11:00", maxStudents: 20, enrolled: 9, location: "Main Training Center, Workshop 2", trainer: "Trainer to be confirmed", status: "Open" },
        { id: "i5", courseId: "c5", name: "November 2026 Intake", startDate: "2026-11-09", endDate: "2027-01-30", days: "Tue / Thu / Sat", startTime: "17:00", endTime: "19:30", maxStudents: 25, enrolled: 7, location: "Main Training Center, Room B", trainer: "Trainer to be confirmed", status: "Open" },
        { id: "i6", courseId: "c6", name: "October 2026 Intake", startDate: "2026-10-06", endDate: "2026-11-14", days: "Mon / Wed", startTime: "18:00", endTime: "20:00", maxStudents: 15, enrolled: 5, location: "Computer Lab", trainer: "Trainer to be confirmed", status: "Open" },
        { id: "i7", courseId: "c7", name: "September 2026 Intake", startDate: "2026-09-28", endDate: "2026-10-10", days: "Mon - Fri", startTime: "09:00", endTime: "11:00", maxStudents: 30, enrolled: 30, location: "Main Training Center, Room A", trainer: "Trainer to be confirmed", status: "Closed" },
        { id: "i8", courseId: "c8", name: "November 2026 Intake", startDate: "2026-11-16", endDate: "2027-01-09", days: "Mon / Wed / Fri", startTime: "17:30", endTime: "19:30", maxStudents: 20, enrolled: 3, location: "Main Training Center, Workshop 1", trainer: "Trainer to be confirmed", status: "Open" }
      ],

      registrations: [
        { id: "REG-2026-1001", name: "Sokha Chan", gender: "Male", dob: "2001-04-12", phone: "012 345 671", telegram: "012345671", email: "sokha.c@example.com", occupation: "Student", courseId: "c1", intakeId: "i1", notes: "Interested in weekend batch if available.", status: "Confirmed", submittedAt: "2026-08-20T09:12:00" },
        { id: "REG-2026-1002", name: "Dara Pich", gender: "Male", dob: "1998-11-03", phone: "012 345 672", telegram: "", email: "dara.pich@example.com", occupation: "Technician", courseId: "c2", intakeId: "i2", notes: "", status: "Confirmed", submittedAt: "2026-08-21T14:05:00" },
        { id: "REG-2026-1003", name: "Sreymom Hong", gender: "Female", dob: "2003-02-17", phone: "012 345 673", telegram: "012345673", email: "", occupation: "Student", courseId: "c6", intakeId: "i6", notes: "First time using AutoCAD.", status: "Contacted", submittedAt: "2026-08-24T10:30:00" },
        { id: "REG-2026-1004", name: "Vibol Sok", gender: "Male", dob: "1995-07-22", phone: "012 345 674", telegram: "012345674", email: "vibol.s@example.com", occupation: "Employee", courseId: "c3", intakeId: "i3", notes: "", status: "Cancelled", submittedAt: "2026-08-01T08:45:00" },
        { id: "REG-2026-1005", name: "Channary Leng", gender: "Female", dob: "2000-09-09", phone: "012 345 675", telegram: "", email: "channary.l@example.com", occupation: "Business Owner", courseId: "c5", intakeId: "i5", notes: "Wants to learn MEP for own construction business.", status: "New", submittedAt: "2026-09-01T16:20:00" },
        { id: "REG-2026-1006", name: "Rithy Meas", gender: "Male", dob: "1999-01-30", phone: "012 345 676", telegram: "012345676", email: "", occupation: "Technician", courseId: "c1", intakeId: "i1", notes: "", status: "Contacted", submittedAt: "2026-09-02T11:00:00" },
        { id: "REG-2026-1007", name: "Sopheak Ly", gender: "Male", dob: "2002-05-14", phone: "012 345 677", telegram: "012345677", email: "sopheak.ly@example.com", occupation: "Student", courseId: "c4", intakeId: "i4", notes: "", status: "New", submittedAt: "2026-09-03T13:15:00" },
        { id: "REG-2026-1008", name: "Kunthea Roeun", gender: "Female", dob: "1997-12-08", phone: "012 345 678", telegram: "", email: "kunthea.r@example.com", occupation: "Employee", courseId: "c8", intakeId: "i8", notes: "Works at a property management company.", status: "New", submittedAt: "2026-09-04T09:50:00" },
        { id: "REG-2026-1009", name: "Piseth Ouk", gender: "Male", dob: "2000-03-27", phone: "012 345 679", telegram: "012345679", email: "", occupation: "Student", courseId: "c7", intakeId: "i7", notes: "", status: "Confirmed", submittedAt: "2026-08-15T15:40:00" },
        { id: "REG-2026-1010", name: "Molika Tep", gender: "Female", dob: "1996-06-19", phone: "012 345 680", telegram: "012345680", email: "molika.t@example.com", occupation: "Other", courseId: "c5", intakeId: "i5", notes: "Referred by a friend who attended last intake.", status: "Contacted", submittedAt: "2026-09-05T10:10:00" },
        { id: "REG-2026-1011", name: "Bunthoeun Nhem", gender: "Male", dob: "1994-10-11", phone: "012 345 681", telegram: "", email: "", occupation: "Technician", courseId: "c2", intakeId: "i2", notes: "", status: "New", submittedAt: "2026-09-06T08:25:00" },
        { id: "REG-2026-1012", name: "Chanlina Sar", gender: "Female", dob: "2004-01-05", phone: "012 345 682", telegram: "012345682", email: "chanlina.s@example.com", occupation: "Student", courseId: "c6", intakeId: "i6", notes: "", status: "New", submittedAt: "2026-09-07T17:00:00" }
      ],

      news: [
        { id: "n1", title: "October 2026 Intake Now Open for Electrical & Mechanical Programs", category: "Announcement", image: IMG.news1, excerpt: "Registration is now open for our upcoming October intake across several technical training programs.", content: "We are pleased to announce that registration is now open for the October 2026 intake, covering our Electrical Installation and Mechanical Systems programs. Seats are limited, and interested students are encouraged to register early through our website or by contacting our team directly.", publishDate: "2026-09-01", status: "Published" },
        { id: "n2", title: "Hands-On Workshop Day Draws Strong Student Turnout", category: "Workshop", image: IMG.news2, excerpt: "Current students took part in a full day of practical workshop exercises across multiple technical stations.", content: "Our recent workshop day gave current students the opportunity to rotate through practical exercise stations covering wiring, basic plumbing, and mechanical assembly tasks, reinforcing classroom learning with hands-on practice.", publishDate: "2026-08-22", status: "Published" },
        { id: "n3", title: "New AutoCAD Training Track Added to Program Lineup", category: "Announcement", image: IMG.news3, excerpt: "A new AutoCAD / Technical Drawing course has been added to help students build practical drafting skills.", content: "In response to growing interest from students and local employers, we have introduced a new AutoCAD / Technical Drawing training track. The course focuses on practical drafting skills relevant to technical and MEP-related work.", publishDate: "2026-08-10", status: "Published" },
        { id: "n4", title: "Student Practical Activity: Reading Technical Plans", category: "Student Activity", image: IMG.news4, excerpt: "A guided exercise in reading drawings, identifying components and planning a safe sequence of work.", content: "Students work through a technical drawing together, identify the tools required and explain the steps before starting practical work. Instructor feedback helps connect drawing interpretation with safe workshop habits.", publishDate: "2026-07-28", status: "Published" },
        { id: "n5", title: "Academy Schedule Update", category: "Academy Announcement", image: IMG.news1, excerpt: "Check the training schedule for current intake dates and available seats.", content: "Evening and weekend study options vary by program. Review the intake schedule and contact the academy before making travel arrangements.", publishDate: "2026-09-10", status: "Published" }
      ],

      gallery: [
        { id: "g1", title: "Wiring Practice Station", category: "Workshop", image: IMG.workshop1, order: 1, published: true },
        { id: "g2", title: "Mechanical Assembly Exercise", category: "Workshop", image: IMG.workshop2, order: 2, published: true },
        { id: "g3", title: "Classroom Theory Session", category: "Classroom", image: IMG.classroom1, order: 3, published: true },
        { id: "g4", title: "Technical Drawing Class", category: "Classroom", image: IMG.classroom2, order: 4, published: true },
        { id: "g5", title: "Practical Electrical Training", category: "Practical Training", image: IMG.practical1, order: 5, published: true },
        { id: "g6", title: "Hands-On HVAC Practice", category: "Practical Training", image: IMG.practical2, order: 6, published: true },
        { id: "g7", title: "Student Group Activity", category: "Student Activities", image: IMG.student1, order: 7, published: true },
        { id: "g8", title: "Technical Team Exercise", category: "Student Activities", image: IMG.student2, order: 8, published: true }
      ],

      pages: {
        home: { pageTitle: "Home", heroTitle: "Build Practical Skills for Your Professional Future", subtitle: "Practical technical training designed to develop hands-on skills for students, technicians and working professionals.", content: "", cta: "Register Now", seoTitle: "MEP Technical and Skills Academy", seoDescription: "Practical technical training in electrical, plumbing, HVAC, mechanical and MEP fundamentals.", status: "Published" },
        about: { pageTitle: "About", heroTitle: "About MEP Technical and Skills Academy", subtitle: "Practical training built around real technical skills.", content: "MEP Technical and Skills Academy focuses on practical, hands-on training for students, technicians and working professionals across core technical trades. Our approach centers on workshop-based learning, giving students the opportunity to build real, applicable skills alongside classroom instruction.", cta: "Register Now", seoTitle: "About MEP Technical and Skills Academy", seoDescription: "Learn about our mission and training approach.", status: "Published" },
        contact: { pageTitle: "Contact", heroTitle: "Get in Touch", subtitle: "Talk to our team about courses, schedules and registration.", content: "", cta: "Contact Us", seoTitle: "Contact MEP Technical and Skills Academy", seoDescription: "Contact details for MEP Technical and Skills Academy.", status: "Published" }
      },

      media: [
        { id: "m1", filename: "electrical-training.jpg", type: "image/jpeg", size: "214 KB", uploaded: "2026-08-01", url: IMG.electrical },
        { id: "m2", filename: "plumbing-workshop.jpg", type: "image/jpeg", size: "198 KB", uploaded: "2026-08-01", url: IMG.plumbing },
        { id: "m3", filename: "hvac-training.jpg", type: "image/jpeg", size: "231 KB", uploaded: "2026-08-02", url: IMG.hvac },
        { id: "m4", filename: "mechanical-systems.jpg", type: "image/jpeg", size: "205 KB", uploaded: "2026-08-02", url: IMG.mechanical },
        { id: "m5", filename: "mep-fundamentals.jpg", type: "image/jpeg", size: "220 KB", uploaded: "2026-08-03", url: IMG.mep },
        { id: "m6", filename: "autocad-class.jpg", type: "image/jpeg", size: "189 KB", uploaded: "2026-08-03", url: IMG.cad },
        { id: "m7", filename: "workshop-station.jpg", type: "image/jpeg", size: "176 KB", uploaded: "2026-08-05", url: IMG.workshop1 },
        { id: "m8", filename: "classroom-session.jpg", type: "image/jpeg", size: "192 KB", uploaded: "2026-08-05", url: IMG.classroom1 }
      ],

      admin: { email: "admin@mepacademy-demo.kh", password: "admin123" },

      nextRegNumber: 1013
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        var seeded = seedData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
        return seeded;
      }
      var data = JSON.parse(raw);
      if (!data.assetRevision) {
        var seed = seedData();
        ['courses','news','gallery','media'].forEach(function(key){
          (data[key] || []).forEach(function(item){
            var field = key === 'media' ? 'url' : 'image';
            var original = seed[key].find(function(x){return x.id === item.id;});
            if (original && (!item[field] || /\.svg$|^https?:/.test(item[field]))) item[field] = original[field];
          });
        });
        if (data.settings.email === 'info@mepacademy-demo.kh') data.settings.email = '';
        if (/address to be confirmed/i.test(data.settings.address)) data.settings.address = '';
        if (data.pages.home.cta === 'Explore Courses') data.pages.home.cta = 'Register Now';
        data.assetRevision = 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      return data;
    } catch (e) {
      var fallback = seedData();
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback)); } catch (e2) {}
      return fallback;
    }
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { throw new Error('Browser storage is full or unavailable. Your changes were not saved.'); }
  }

  function reset() {
    var seeded = seedData();
    save(seeded);
    return seeded;
  }

  function uid(prefix) {
    return prefix + "_" + Math.random().toString(36).slice(2, 9);
  }

  function isLoggedIn() {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  }

  function setLoggedIn(val) {
    if (val) sessionStorage.setItem(SESSION_KEY, "true");
    else sessionStorage.removeItem(SESSION_KEY);
  }

  global.MEP = {
    IMG: IMG,
    load: load,
    save: save,
    reset: reset,
    uid: uid,
    isLoggedIn: isLoggedIn,
    setLoggedIn: setLoggedIn
  };
})(window);
