/* ==========================================================================
   Little Learners — single consolidated EN/KM translation system.
   All translatable UI text lives in the `translations` object below.
   Elements are tagged in index.html with:
     data-i18n="key"        -> sets textContent
     data-i18n-html="key"   -> sets innerHTML (only where inline tags like <em>/<strong> are needed)
     data-i18n-ph="key"     -> sets the placeholder attribute
     data-i18n-aria="key"   -> sets the aria-label attribute
     data-i18n-attr="content" data-i18n="key" -> sets the given attribute (used for <meta>)
   ========================================================================== */
(() => {
  const translations = {
    en: {
      'meta.title': 'Little Learners Cambodia | Daycare &amp; Preschool in Phnom Penh',
      'meta.description': "Little Learners Daycare and Preschool offers caring early-learning programs for babies, toddlers, and preschool children across three branches in Phnom Penh, Cambodia.",
      'meta.ogDescription': 'A caring place for children to learn, play, grow, and build strong early foundations.',

      'a11y.skip': 'Skip to content',
      'a11y.backTop': 'Back to top',
      'a11y.closeGallery': 'Close gallery',
      'a11y.galleryImage': 'Gallery image',

      'topbar.branches': '✦ Three branches in Phnom Penh',
      'topbar.phoneLabel': 'Phone / Telegram:',

      'nav.aria': 'Main navigation',
      'nav.home': 'Home',
      'nav.ceo': 'CEO Message',
      'nav.programs': 'Programs',
      'nav.curriculum': 'Curriculum',
      'nav.activities': 'Activities',
      'nav.roadmap': 'Roadmap',
      'nav.fees': 'Fees',
      'nav.partners': 'Partners',
      'nav.contact': 'Contact',
      'nav.enroll': 'Enroll Your Child',
      'menu.open': 'Open menu',

      'hero.eyebrow': 'DAYCARE &amp; PRESCHOOL IN PHNOM PENH',
      'hero.title': 'A Happy Place to <em>Learn, Play</em> and <em>Grow</em>',
      'hero.lead': "Little Learners offers excellent daycare and preschool to help working parents care for their children's health and learning.",
      'hero.ctaEnroll': 'Ask About Enrollment',
      'hero.ctaExplore': 'Explore Our Programs',
      'hero.chipTeachers': '♡ Caring Teachers',
      'hero.chipSafe': '✦ Safe Learning Spaces',
      'hero.playBadge': 'Learn<br>&amp; play <b>✦</b>',

      'ceo.eyebrow': 'CEO MESSAGE',
      'ceo.heading': 'CEO <em>Message</em>',
      'ceo.body': 'At Little Learners Daycare &amp; Preschool, we always believe we are <strong>much more than just a daycare</strong>. Our main mission is to empower women who continue chasing their dream careers even after marriage and motherhood. We stand here to inspiring and show the world that having a child is not the end of our journey, but a new beginning filled with purpose. We can be both strong, independence and building the future we dream of, with the support from Little Learners that we work closely with parents to take care each child&rsquo;s full development&mdash;whether it is building positive behavior, emotional maturity, improving communication, healthy, intelligent and more independent. Everything we do reflects our belief that early childhood is the foundation that decides future success. Keep going. You are a powerful woman, and I believe that your children are proud of you.',

      'programs.eyebrow': 'OUR PROGRAMS',
      'programs.heading': 'Nurturing kids with strong early <em>education foundations</em>',
      'programs.p1.title': 'Baby-care',
      'programs.p1.desc': 'Provide safe and nurturing care for infants (aged 3 months to 2 years), ensuring their well-being through attentive care, learning, and daily affection.',
      'programs.p2.title': 'Early Preschool',
      'programs.p2.desc': 'For children (aged 2–3 years), the focus is on learning through play, enhancing social and communication skills, encouraging exploration of the surrounding environment, and developing pencil-holding and early drawing skills.',
      'programs.p3.title': 'Preschool (3 languages)',
      'programs.p3.desc': 'For children (aged 3–5), the program fosters foundational literacy and numeracy skills across three languages (Khmer English and Chinese) and encourages self-reliance and the ability to perform certain tasks independently, ensuring they enter Grade 1 with confidence.',
      'programs.p4.title': 'Weekend Program',
      'programs.p4.desc': 'For kids from Busy Parents (Sat–Sun, 7:00 AM – 5:00 PM) for just $15/day! Includes 3 meals, air-conditioned classrooms, fun arts activities, and loving with attentive care.',
      'programs.p5.title': 'Karate Class',
      'programs.p5.desc': 'For kids (aged 4–12) to help them achieve good health, a strong physique, high discipline, and a courageous spirit.',
      'programs.p6.title': 'Nanny Training',
      'programs.p6.desc': 'Designed for new mothers, housekeepers, and teacher assistants, this 30-hour course features theory, practical application, an exam, and a certificate upon completion.',

      'curriculum.eyebrow': 'OUR TRILINGUAL CURRICULUM',
      'curriculum.heading': 'Our <em>Trilingual</em> Curriculum',
      'curriculum.body': 'Little Learners Preschool provides a comprehensive trilingual curriculum combining Khmer, English, and Chinese instruction tailored to global educational standards. Our structured syllabus incorporates the MoEYS national core curriculum, Singapore&rsquo;s Nurturing Early Learners framework, Oxford Phonics World for foundational English literacy, and Easy Steps to Chinese alongside YCT (Youth Chinese Test) alignment. Designed to build early cognitive skills, language mastery, and social development, our textbooks ensure every child receives a strong, well-rounded academic foundation that meets both national standards and recognized international benchmarks.',

      'activities.heading': 'Our <em>Activities</em>',
      'roadmap.heading': 'Our Academic <em>Roadmap</em>',
      'fees.heading': 'Tuition &amp; <em>Fees</em>',
      'partners.heading': 'Our <em>Partners</em>',
      'partnerLogos.heading': 'Our <em>Partners</em>',

      'contact.heading': '<em>Contact</em> Us',
      'contact.headOffice': 'Head Office',
      'contact.headOfficeNumber': 'Head Office Number',
      'contact.telegram': 'Telegram',

      'enroll.eyebrow': 'START YOUR JOURNEY',
      'enroll.heading': 'Ready to Learn,<br><em>Play and Grow?</em>',
      'enroll.body': 'Contact Little Learners to ask about programs, branch availability, and enrollment.',

      'form.parentName': 'Parent&rsquo;s Name',
      'form.yourName': 'Your name',
      'form.phone': 'Phone Number',
      'form.childAge': 'Child&rsquo;s Age',
      'form.selectAge': 'Select age',
      'form.under2': 'Under 2 Years',
      'form.age23': '2–3 Years',
      'form.age3plus': 'Age 3+',
      'form.branch': 'Preferred Branch',
      'form.selectBranch': 'Select branch',
      'form.branchSmc': 'Stung Mean Chey',
      'form.branchPt': 'Phsar Thmey',
      'form.branchTtp': 'TTP',
      'form.branchRequired': 'Please select a branch.',
      'form.message': 'Message',
      'form.messagePh': 'Tell us how we can help',
      'form.success': 'Thank you! We’re opening Telegram so you can send your inquiry to that branch.',

      'footer.about': 'Little Learners Daycare and Preschool provides caring early-childhood programs across three Phnom Penh branches.',
      'footer.explore': 'Explore',
      'footer.ourPrograms': 'Our Programs',
      'footer.ourBranches': 'Our Branches',
      'footer.letsTalk': 'Let&rsquo;s Talk',
      'footer.copyright': '© 2026 Little Learners Daycare and Preschool'
    },
    km: {
      'meta.title': 'Little Learners Cambodia | ទារកដ្ឋាន និងមត្តេយ្យសិក្សានៅភ្នំពេញ',
      'meta.description': 'Little Learners ផ្តល់កម្មវិធីថែទាំ និងអប់រំកុមារដំបូង សម្រាប់ទារក កុមារតូច និងកុមារមត្តេយ្យ តាមរយៈសាខាចំនួន ៣ នៅរាជធានីភ្នំពេញ។',
      'meta.ogDescription': 'កន្លែងដែលយកចិត្តទុកដាក់សម្រាប់កុមារ រៀន លេង លូតលាស់ និងកសាងមូលដ្ឋានគ្រឹះដ៏រឹងមាំ។',

      'a11y.skip': 'រំលងទៅមាតិកា',
      'a11y.backTop': 'ត្រឡប់ទៅខាងលើ',
      'a11y.closeGallery': 'បិទកម្រងរូបភាព',
      'a11y.galleryImage': 'រូបភាពក្នុងកម្រង',

      'topbar.branches': '✦ សាខាចំនួន ៣ នៅរាជធានីភ្នំពេញ',
      'topbar.phoneLabel': 'ទូរស័ព្ទ / តេលេក្រាម៖',

      'nav.aria': 'ម៉ឺនុយចម្បង',
      'nav.home': 'ទំព័រដើម',
      'nav.ceo': 'សារ CEO',
      'nav.programs': 'កម្មវិធីសិក្សា',
      'nav.curriculum': 'កម្មវិធីសិក្សា ៣ ភាសា',
      'nav.activities': 'សកម្មភាព',
      'nav.roadmap': 'ដំណើរការសិក្សា',
      'nav.fees': 'តម្លៃសិក្សា',
      'nav.partners': 'ដៃគូសហការ',
      'nav.contact': 'ទំនាក់ទំនង',
      'nav.enroll': 'ចុះឈ្មោះកូន',
      'menu.open': 'បើកម៉ឺនុយ',

      'hero.eyebrow': 'ទារកដ្ឋាន និងមត្តេយ្យសិក្សានៅរាជធានីភ្នំពេញ',
      'hero.title': 'ទីកន្លែងដ៏រីករាយសម្រាប់<em>ការរៀន និងការលេង</em> និង<em>ការលូតលាស់</em>',
      'hero.lead': 'Little Learners ផ្តល់សេវាកម្មថែទាំកុមារ និងសាលាមត្តេយ្យដែលមានគុណភាពខ្ពស់ ដើម្បីជួយសម្រួលដល់ឪពុកម្តាយដែលកំពុងបំពេញការងារ ក្នុងការថែទាំសុខភាព និងការរៀនសូត្ររបស់កូនៗ។',
      'hero.ctaEnroll': 'សាកសួរអំពីការចុះឈ្មោះ',
      'hero.ctaExplore': 'ស្វែងយល់ពីកម្មវិធីសិក្សា',
      'hero.chipTeachers': '♡ គ្រូបង្រៀនយកចិត្តទុកដាក់',
      'hero.chipSafe': '✦ បរិយាកាសសិក្សាមានសុវត្ថិភាព',
      'hero.playBadge': 'រៀន<br>និងលេង <b>✦</b>',

      'ceo.eyebrow': 'សារ CEO',
      'ceo.heading': '<em>សារ</em> CEO',
      'ceo.body': 'នៅទារកដ្ឋាន និងសាលាមត្តេយ្យ Little Learners យើងតែងតែជឿជាក់ថា <strong>យើងមិនមែនត្រឹមតែជាកន្លែងមើលថែក្មេងនោះទេ</strong>។ បេសកកម្មចម្បងរបស់យើង គឺការផ្តល់កម្លាំងចិត្តដល់ស្ត្រីដែលបន្តដេញតាមក្តីស្រមៃ និងការងាររបស់ពួកគេ បើទោះបីជាបានរៀបការ និងមានកូនហើយក៏ដោយ។ យើងឈរនៅទីនេះដើម្បីបំផុសគំនិត និងបង្ហាញពិភពលោកថា ការមានកូនមិនមែនជាទីបញ្ចប់នៃដំណើររបស់យើងនោះទេ ប៉ុន្តែជាការចាប់ផ្តើមថ្មីដែលពេញដោយគោលបំណង។ យើងអាចជានារីដ៏ខ្លាំង មានឯករាជភាព និងកសាងអនាគតដែលយើងស្រមៃចង់បាន ដោយមានការគាំទ្រពី Little Learners ដែលធ្វើការយ៉ាងជិតស្និទ្ធជាមួយមាតាបិតា ដើម្បីមើលថែការអភិវឌ្ឍគ្រប់ជ្រុងជ្រោយរបស់កុមារម្នាក់ៗ—មិនថាតែការសាងអាកប្បកិរិយាវិជ្ជមាន ភាពចាស់ទុំខាងផ្លូវចិត្ត ការកែលម្អការប្រាស្រ័យទាក់ទង សុខភាព ភាពឆ្លាតវៃ និងភាពមានឯករាជ្យលើខ្លួនឯងនោះទេ។ គ្រប់យ៉ាងដែលយើងធ្វើ គឺឆ្លុះបញ្ចាំងជំនឿជាក់របស់យើងថា កុមារភាពដំបូងគឺជាគ្រឹះដ៏សំខាន់ដែលកំណត់ជោគជ័យនាពេលអនាគត។ សូមខិតខំបន្តទៅមុខទៀត! អ្នកគឺជាស្ត្រីដ៏មានអំណាចម្នាក់ ហើយខ្ញុំជឿជាក់ថាកូនៗរបស់អ្នកពិតជាមានមោទនភាពចំពោះអ្នក។',

      'programs.eyebrow': 'កម្មវិធីសិក្សារបស់យើង',
      'programs.heading': 'ថែទាំកុមារឱ្យមាន<em>មូលដ្ឋានគ្រឹះនៃការអប់រំដំបូង</em>ដ៏រឹងមាំ',
      'programs.p1.title': 'កម្មវិធីទារកដ្ឋាន',
      'programs.p1.desc': 'ផ្តល់ការថែទាំទារក (អាយុ ៣ខែ - ២ឆ្នាំ) ប្រកបដោយសុវត្ថិភាព និងសុខុមាលភាព ចិញ្ចឹមបីបាច់ថែទាំប្រកបដោយការយកចិត្តទុកដាក់ ការរៀន និងសេចក្តីស្រឡាញ់ប្រចាំថ្ងៃ។',
      'programs.p2.title': 'កម្មវិធីត្រៀមមត្តេយ្យសិក្សា',
      'programs.p2.desc': 'សម្រាប់កុមារ (អាយុ ២ឆ្នាំ - ៣ឆ្នាំ) ផ្តោតលើការរៀនតាមរយៈការលេង បង្កើនជំនាញសង្គម និងការទំនាក់ទំនង លើកទឹកចិត្តការស្វែងយល់អំពីបរិស្ថានជុំវិញខ្លួន និងអភិវឌ្ឍជំនាញចាប់កាន់ខ្មៅដៃ និងការគូរគំនូរដំបូង។',
      'programs.p3.title': 'កម្មវិធីមត្តេយ្យសិក្សា (៣ភាសា)',
      'programs.p3.desc': 'សម្រាប់កុមារ (អាយុ ៣ឆ្នាំ - ៥ឆ្នាំ) កម្មវិធីជំរុញអក្ខរកម្ម និងគណិតវិទ្យាមូលដ្ឋានលើទាំង ៣ភាសា (ខ្មែរ អង់គ្លេស និងចិន) និងលើកទឹកចិត្តឱ្យកុមារមានឯករាជ្យភាព អាចធ្វើកិច្ចការមួយចំនួនដោយខ្លួនឯង ដើម្បីត្រៀមខ្លួនចូលថ្នាក់ទី១ ប្រកបដោយទំនុកចិត្ត។',
      'programs.p4.title': 'កម្មវិធីចុងសប្តាហ៍',
      'programs.p4.desc': 'សម្រាប់កូនរបស់ឪពុកម្តាយដែលមានការងារមមាញឹក (ថ្ងៃសៅរ៍-អាទិត្យ ម៉ោង ៧:០០ ព្រឹក ដល់ ៥:០០ ល្ងាច) ក្នុងតម្លៃត្រឹមតែ ១៥ដុល្លារក្នុងមួយថ្ងៃ! រួមបញ្ចូលអាហារ ៣ពេល បន្ទប់រៀនមានម៉ាស៊ីនត្រជាក់ សកម្មភាពសិល្បៈសប្បាយៗ និងការថែទាំប្រកបដោយក្តីស្រឡាញ់ និងយកចិត្តទុកដាក់។',
      'programs.p5.title': 'កម្មវិធីក្បាច់គុនកាំរាតេ',
      'programs.p5.desc': 'សម្រាប់កុមារ (អាយុ ៤ - ១២ឆ្នាំ) ដើម្បីជួយឱ្យកុមារមានសុខភាពល្អ រាងកាយរឹងមាំ វិន័យខ្ពស់ និងស្មារតីក្លាហាន។',
      'programs.p6.title': 'កម្មវិធីបណ្តុះបណ្តាលអ្នកមើលថែក្មេង',
      'programs.p6.desc': 'រៀបចំឡើងសម្រាប់ម្តាយថ្មីៗ អ្នកបម្រើការងារផ្ទះ និងជំនួយការគ្រូបង្រៀន វគ្គបណ្តុះបណ្តាលរយៈពេល ៣០ម៉ោងនេះ រួមមានទ្រឹស្តី ការអនុវត្តជាក់ស្តែង ការប្រឡង និងវិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គ។',

      'curriculum.eyebrow': 'កម្មវិធីសិក្សាបីភាសា',
      'curriculum.heading': 'កម្មវិធីសិក្សា<em>បីភាសា</em>',
      'curriculum.body': 'សាលាមត្តេយ្យ Little Learners ផ្តល់ជូននូវកម្មវិធីសិក្សាបីភាសា (ខ្មែរ អង់គ្លេស ចិន) ប្រកបដោយគុណភាព ស្របតាមស្តង់ដារអប់រំអន្តរជាតិ។ កម្មវិធីសិក្សារបស់យើងត្រូវបានរៀបចំយ៉ាងច្បាស់លាស់ ដោយផ្អែកលើកម្មវិធីសិក្សាតម្រង់ទិសរបស់ក្រសួងអប់រំ យុវជន និងកីឡា, ក្របខណ្ឌ Nurturing Early Learners របស់ប្រទេសសិង្ហបុរី, សៀវភៅ Oxford Phonics World សម្រាប់ភាសាអង់គ្លេស, ព្រមទាំង Easy Steps to Chinese និងប្រព័ន្ធប្រឡង YCT សម្រាប់ភាសាចិន។ សៀវភៅសិក្សាទាំងនេះជួយពង្រឹងសមត្ថភាពភាសា ការគិត និងការអភិវឌ្ឍខ្លួនរបស់កុមារ ឱ្យមានមូលដ្ឋានគ្រឹះដ៏រឹងមាំ និងមានសមត្ថភាពខ្ពស់។',

      'activities.heading': '<em>សកម្មភាព</em>របស់យើង',
      'roadmap.heading': '<em>ដំណើរការសិក្សា</em>របស់យើង',
      'fees.heading': '<em>តម្លៃសិក្សា</em>',
      'partners.heading': '<em>ដៃគូសហការ</em>របស់យើង',
      'partnerLogos.heading': '<em>ដៃគូសហការ</em>របស់យើង',

      'contact.heading': '<em>ទំនាក់ទំនង</em>យើង',
      'contact.headOffice': 'ការិយាល័យកណ្តាល',
      'contact.headOfficeNumber': 'លេខទូរស័ព្ទការិយាល័យកណ្តាល',
      'contact.telegram': 'តេលេក្រាម',

      'enroll.eyebrow': 'ចាប់ផ្តើមដំណើររបស់អ្នក',
      'enroll.heading': 'ត្រៀមខ្លួនរួចរាល់ហើយឬនៅ<br><em>សម្រាប់ការរៀន ការលេង និងការលូតលាស់?</em>',
      'enroll.body': 'ទាក់ទង Little Learners ដើម្បីសាកសួរអំពីកម្មវិធីសិក្សា សាខាដែលមាន និងការចុះឈ្មោះចូលរៀន។',

      'form.parentName': 'ឈ្មោះមាតាបិតា / អាណាព្យាបាល',
      'form.yourName': 'បញ្ចូលឈ្មោះរបស់អ្នក',
      'form.phone': 'លេខទូរស័ព្ទ',
      'form.childAge': 'អាយុកុមារ',
      'form.selectAge': 'ជ្រើសរើសអាយុ',
      'form.under2': 'អាយុក្រោម ២ឆ្នាំ',
      'form.age23': 'អាយុ ២–៣ឆ្នាំ',
      'form.age3plus': 'អាយុលើសពី ៣ឆ្នាំ',
      'form.branch': 'សាខាដែលចង់ជ្រើសរើស',
      'form.selectBranch': 'ជ្រើសរើសសាខា',
      'form.branchSmc': 'ស្ទឹងមានជ័យ',
      'form.branchPt': 'ផ្សារធំថ្មី',
      'form.branchTtp': 'ទួលទំពូង',
      'form.branchRequired': 'សូមជ្រើសរើសសាខា។',
      'form.message': 'សារ',
      'form.messagePh': 'សូមប្រាប់យើងពីព័ត៌មានដែលអ្នកចង់សាកសួរ',
      'form.success': 'សូមអរគុណ! កំពុងបើក Telegram ដើម្បីឱ្យអ្នកផ្ញើសំណួររបស់អ្នកទៅសាខានោះ។',

      'footer.about': 'Little Learners ផ្តល់កម្មវិធីថែទាំ និងអប់រំកុមារដំបូងប្រកបដោយក្តីស្រឡាញ់ តាមរយៈសាខាចំនួន ៣ នៅរាជធានីភ្នំពេញ។',
      'footer.explore': 'ស្វែងយល់បន្ថែម',
      'footer.ourPrograms': 'កម្មវិធីសិក្សា',
      'footer.ourBranches': 'សាខារបស់យើង',
      'footer.letsTalk': 'ទាក់ទងមកយើង',
      'footer.copyright': '© ២០២៦ Little Learners Daycare and Preschool'
    }
  };

  const storageKey = 'littleLearnersLanguage';
  let current = 'en';

  const t = key => {
    const dict = translations[current] || translations.en;
    return (key in dict) ? dict[key] : (translations.en[key] !== undefined ? translations.en[key] : key);
  };

  // Decodes HTML entities (&amp; &rsquo; etc.) for use as plain text — the
  // translation strings above may contain entities for readability, but
  // textContent/setAttribute do not decode them automatically.
  const decodeEntities = str => {
    const box = document.createElement('textarea');
    box.innerHTML = str;
    return box.value;
  };

  const applyTranslations = () => {
    document.documentElement.lang = current;
    document.body.classList.remove('lang-en', 'lang-kh');
    document.body.classList.add(current === 'km' ? 'lang-kh' : 'lang-en');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (el.hasAttribute('data-i18n-attr')) {
        el.setAttribute(el.getAttribute('data-i18n-attr'), decodeEntities(t(key)));
      } else {
        el.textContent = decodeEntities(t(key));
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = decodeEntities(t(el.dataset.i18nPh)); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', decodeEntities(t(el.dataset.i18nAria))); });

    document.title = decodeEntities(t('meta.title'));

    document.querySelectorAll('[data-language]').forEach(button => {
      const selected = button.dataset.language === current;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });

    window.littleLearnersLanguage = current;
    window.fitNav?.();
  };

  const setLanguage = lang => {
    current = lang === 'km' ? 'km' : 'en';
    localStorage.setItem(storageKey, current);
    applyTranslations();
  };

  const prepare = () => {
    document.querySelectorAll('[data-language]').forEach(button => {
      button.addEventListener('click', () => setLanguage(button.dataset.language));
    });

    const form = document.querySelector('.enroll-form');
    // Branch -> Telegram number (international format, no leading 0/plus).
    const branchTelegram = { smc: '85598998271', pt: '85593998271', ttp: '85587998271' };

    form?.addEventListener('submit', e => {
      e.preventDefault();
      const branchSelect = form.querySelector('[name="branch"]');
      const branchKey = branchSelect ? branchSelect.value : '';

      if (!branchKey || !branchTelegram[branchKey]) {
        if (branchSelect) {
          branchSelect.setCustomValidity(t('form.branchRequired'));
          branchSelect.reportValidity();
          branchSelect.addEventListener('change', () => branchSelect.setCustomValidity(''), { once: true });
        }
        return;
      }
      if (branchSelect) branchSelect.setCustomValidity('');

      const fieldValue = name => decodeEntities((form.querySelector(`[name="${name}"]`)?.value || '').trim());
      const dash = '-';
      const parent = fieldValue('parent') || dash;
      const phone = fieldValue('phone') || dash;
      const messageText = fieldValue('message') || dash;
      const ageSelect = form.querySelector('[name="age"]');
      const age = (ageSelect && ageSelect.value) ? ageSelect.options[ageSelect.selectedIndex].textContent.trim() : dash;
      const branchLabel = branchSelect.options[branchSelect.selectedIndex].textContent.trim();

      const lines = current === 'km' ? [
        'សួស្តី Little Learners,', '',
        'ខ្ញុំចង់សាកសួរព័ត៌មានអំពីការចុះឈ្មោះចូលរៀន។', '',
        `ឈ្មោះអាណាព្យាបាល៖ ${parent}`,
        `លេខទូរស័ព្ទ៖ ${phone}`,
        `អាយុកុមារ៖ ${age}`,
        `សាខាដែលចង់សាកសួរ៖ ${branchLabel}`,
        `សារ៖ ${messageText}`, '',
        'សូមអរគុណ។'
      ] : [
        'Hello Little Learners,', '',
        'I would like to ask about enrollment.', '',
        `Parent's Name: ${parent}`,
        `Phone Number: ${phone}`,
        `Child's Age: ${age}`,
        `Preferred Branch: ${branchLabel}`,
        `Message: ${messageText}`, '',
        'Thank you.'
      ];

      const telegramUrl = `https://t.me/+${branchTelegram[branchKey]}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(telegramUrl, '_blank', 'noopener');

      const status = form.querySelector('.form-message');
      if (status) status.textContent = t('form.success');
      form.reset();
    });

    const requested = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem(storageKey);
    setLanguage(requested === 'km' || requested === 'en' ? requested : (saved === 'km' || saved === 'en' ? saved : 'en'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', prepare);
  else prepare();
})();
