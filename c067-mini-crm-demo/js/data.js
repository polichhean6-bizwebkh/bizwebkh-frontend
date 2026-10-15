/* C067 Mini CRM Demo — constants + SAMPLE DEMO DATA (all fictional) */
window.C067 = (function () {
  const GEO = {
    'ក្រុងបាត់ដំបង': ['សង្កាត់ទួលតាឯក', 'សង្កាត់ស្វាយប៉ោ', 'សង្កាត់រតនៈ', 'សង្កាត់ចំការសំរោង', 'សង្កាត់វត្តគរ', 'សង្កាត់ព្រែកព្រះស្ដេច'],
    'ស្រុកសង្កែ': ['ឃុំអន្លង់វិល', 'ឃុំនរា', 'ឃុំតាប៉ុន', 'ឃុំរកា', 'ឃុំកំពង់ព្រះ'],
    'ស្រុកបវេល': ['ឃុំបវេល', 'ឃុំខ្នាចរមាស', 'ឃុំឡៅ', 'ឃុំព្រៃខ្ពស់'],
    'ស្រុកថ្មគោល': ['ឃុំបឹងព្រីង', 'ឃុំក្រពើរមាស', 'ឃុំព្រៃរំដេង'],
    'ស្រុកឯកភ្នំ': ['ឃុំឯកភ្នំ', 'ឃុំព្រែកខ្ពប', 'ឃុំព្រះព្រហ្ម']
  };
  const POSITIONS = ['ការិយាល័យកណ្ដាល', 'ការិយាល័យតាមស្រុក', 'ប្រធាន', 'អនុប្រធានទី១', 'អនុប្រធានទី២', 'បុគ្គលិក'];
  const LEVELS = ['ក្រុង/ស្រុក', 'ឃុំ/សង្កាត់', 'ភូមិ'];
  const INTERESTS = [
    { k: 'biz', l: 'អាជីវកម្ម' }, { k: 'realestate', l: 'អចលនទ្រព្យ' }, { k: 'agri', l: 'កសិកម្ម' },
    { k: 'edu', l: 'អប់រំ & បណ្ដុះបណ្ដាល' }, { k: 'health', l: 'សុខភាព & សម្រស់' }
  ];
  const PTYPES = [
    { k: 'supplier', l: 'អ្នកផ្គត់ផ្គង់' }, { k: 'direct', l: 'អ្នកលក់ផ្ទាល់' },
    { k: 'service', l: 'អ្នកផ្ដល់សេវាកម្ម' }, { k: 'reseller', l: 'អ្នកយកលក់បន្ត' }
  ];

  function seed() {
    const M = (n, o) => Object.assign({
      id: 'MBTB-' + String(n).padStart(3, '0'), photo: null, level: 'ភូមិ', addrProvince: 'បាត់ដំបង',
      mapUrl: 'https://www.google.com/maps?q=13.0957,103.2022', facebook: '', sucName: '', sucRel: '', sucPhone: ''
    }, o);
    const members = [
      M(1, { geoDistrict: 'ក្រុងបាត់ដំបង', geoCommune: 'សង្កាត់ទួលតាឯក', geoVillage: 'ទួលតាឯក', level: 'ក្រុង/ស្រុក', family: 'ហេង', given: 'ពិសិដ្ឋ', gender: 'ប្រុស', position: 'ប្រធាន', role: 'ប្រធានសម្ព័ន្ធខេត្ត', idCard: '010123456', occupation: 'ម្ចាស់អាជីវកម្មលក់ដុំ', addrVillage: 'ទួលតាឯក', addrCommune: 'សង្កាត់ទួលតាឯក', addrDistrict: 'ក្រុងបាត់ដំបង', referrer: '—', regDate: '2024-01-15', interests: ['biz', 'realestate'], phone: '012 345 101', facebook: 'https://facebook.com/demo.heng.pisith', sucName: 'ហេង វិឆ្ឆិកា', sucRel: 'កូនស្រី', sucPhone: '096 345 102' }),
      M(2, { geoDistrict: 'ក្រុងបាត់ដំបង', geoCommune: 'សង្កាត់ស្វាយប៉ោ', geoVillage: 'ស្វាយប៉ោ១', family: 'ជា', given: 'សុខា', gender: 'ស្រី', position: 'អនុប្រធានទី១', role: 'ទទួលបន្ទុកសមាជិកភាព', idCard: '010234567', occupation: 'គ្រូបង្រៀន', addrVillage: 'ស្វាយប៉ោ១', addrCommune: 'សង្កាត់ស្វាយប៉ោ', addrDistrict: 'ក្រុងបាត់ដំបង', referrer: 'ហេង ពិសិដ្ឋ', regDate: '2024-02-03', interests: ['edu', 'health'], phone: '011 456 202', facebook: 'https://facebook.com/demo.chea.sokha', sucName: 'ជា សុវណ្ណ', sucRel: 'ស្វាមី', sucPhone: '011 456 203' }),
      M(3, { geoDistrict: 'ស្រុកសង្កែ', geoCommune: 'ឃុំអន្លង់វិល', geoVillage: 'អន្លង់វិល', family: 'ឈឹម', given: 'វណ្ណា', gender: 'ប្រុស', position: 'អនុប្រធានទី២', role: 'ទទួលបន្ទុកកសិកម្ម', idCard: '010345678', occupation: 'កសិករ និងអ្នកលក់ស្រូវ', addrVillage: 'អន្លង់វិល', addrCommune: 'ឃុំអន្លង់វិល', addrDistrict: 'ស្រុកសង្កែ', referrer: 'ហេង ពិសិដ្ឋ', regDate: '2024-03-20', interests: ['agri', 'biz'], phone: '015 567 303', facebook: '', sucName: 'ឈឹម ស្រីលីន', sucRel: 'កូនស្រី', sucPhone: '015 567 304' }),
      M(4, { geoDistrict: 'ក្រុងបាត់ដំបង', geoCommune: 'សង្កាត់រតនៈ', geoVillage: 'រតនៈ', family: 'ម៉ម', given: 'សុភាព', gender: 'ស្រី', position: 'ការិយាល័យកណ្ដាល', role: 'លេខាធិការ', idCard: '010456789', occupation: 'បុគ្គលិកការិយាល័យ', addrVillage: 'រតនៈ', addrCommune: 'សង្កាត់រតនៈ', addrDistrict: 'ក្រុងបាត់ដំបង', referrer: 'ជា សុខា', regDate: '2024-05-08', interests: ['biz'], phone: '017 678 404', facebook: 'https://facebook.com/demo.mom.sopheap', sucName: 'ម៉ម សុភ័ណ្ឌ', sucRel: 'បងប្រុស', sucPhone: '017 678 405' }),
      M(5, { geoDistrict: 'ស្រុកបវេល', geoCommune: 'ឃុំបវេល', geoVillage: 'បវេលកណ្ដាល', family: 'ទេព', given: 'រតនា', gender: 'ប្រុស', position: 'ការិយាល័យតាមស្រុក', role: 'តំណាងស្រុកបវេល', idCard: '010567890', occupation: 'ម្ចាស់ហាងលក់ឧបករណ៍កសិកម្ម', addrVillage: 'បវេលកណ្ដាល', addrCommune: 'ឃុំបវេល', addrDistrict: 'ស្រុកបវេល', referrer: 'ឈឹម វណ្ណា', regDate: '2024-06-12', interests: ['agri', 'biz'], phone: '070 789 505', facebook: 'https://facebook.com/demo.tep.rothana', sucName: 'ទេព ស្រីមុំ', sucRel: 'ភរិយា', sucPhone: '070 789 506' }),
      M(6, { geoDistrict: 'ស្រុកថ្មគោល', geoCommune: 'ឃុំបឹងព្រីង', geoVillage: 'បឹងព្រីងលើ', family: 'លី', given: 'ស្រីនាង', gender: 'ស្រី', position: 'បុគ្គលិក', role: 'អ្នកសម្របសម្រួលភូមិ', idCard: '010678901', occupation: 'អ្នកលក់គ្រឿងសម្អាង', addrVillage: 'បឹងព្រីងលើ', addrCommune: 'ឃុំបឹងព្រីង', addrDistrict: 'ស្រុកថ្មគោល', referrer: 'ម៉ម សុភាព', regDate: '2024-08-01', interests: ['health'], phone: '085 890 606', facebook: '', sucName: 'លី សុភ័ក្ត្រ', sucRel: 'ម្ដាយ', sucPhone: '085 890 607' }),
      M(7, { geoDistrict: 'ស្រុកឯកភ្នំ', geoCommune: 'ឃុំឯកភ្នំ', geoVillage: 'ឯកភ្នំ', level: 'ឃុំ/សង្កាត់', family: 'សុង', given: 'វិចិត្រ', gender: 'ប្រុស', position: 'បុគ្គលិក', role: 'អ្នកសម្របសម្រួលឃុំ', idCard: '010789012', occupation: 'ជាងសាងសង់', addrVillage: 'ឯកភ្នំ', addrCommune: 'ឃុំឯកភ្នំ', addrDistrict: 'ស្រុកឯកភ្នំ', referrer: 'ហេង ពិសិដ្ឋ', regDate: '2024-09-18', interests: ['realestate'], phone: '092 901 707', facebook: 'https://facebook.com/demo.song.vichet', sucName: 'សុង ដារ៉ា', sucRel: 'កូនប្រុស', sucPhone: '092 901 708' }),
      M(8, { geoDistrict: 'ក្រុងបាត់ដំបង', geoCommune: 'សង្កាត់ចំការសំរោង', geoVillage: 'ចំការសំរោង', family: 'គាត', given: 'ស្រីពៅ', gender: 'ស្រី', position: 'បុគ្គលិក', role: 'អ្នកបណ្ដុះបណ្ដាល', idCard: '010890123', occupation: 'គ្រូបណ្ដុះបណ្ដាល', addrVillage: 'ចំការសំរោង', addrCommune: 'សង្កាត់ចំការសំរោង', addrDistrict: 'ក្រុងបាត់ដំបង', referrer: 'ជា សុខា', regDate: '2025-01-10', interests: ['edu'], phone: '098 012 808', facebook: 'https://facebook.com/demo.keat.sreypov', sucName: 'គាត ពិសី', sucRel: 'បងស្រី', sucPhone: '098 012 809' }),
      M(9, { geoDistrict: 'ស្រុកសង្កែ', geoCommune: 'ឃុំនរា', geoVillage: 'នរាត្បូង', family: 'ពៅ', given: 'ដារ៉ា', gender: 'ប្រុស', position: 'ការិយាល័យតាមស្រុក', role: 'តំណាងស្រុកសង្កែ', idCard: '010901234', occupation: 'អ្នកប្រមូលទិញកសិផល', addrVillage: 'នរាត្បូង', addrCommune: 'ឃុំនរា', addrDistrict: 'ស្រុកសង្កែ', referrer: 'ឈឹម វណ្ណា', regDate: '2025-03-25', interests: ['agri', 'biz'], phone: '096 123 909', facebook: '', sucName: 'ពៅ សុធារី', sucRel: 'ភរិយា', sucPhone: '096 123 910' }),
      M(10, { geoDistrict: 'ស្រុកបវេល', geoCommune: 'ឃុំខ្នាចរមាស', geoVillage: 'ខ្នាចរមាស', family: 'កែវ', given: 'សុវណ្ណារី', gender: 'ស្រី', position: 'បុគ្គលិក', role: 'អ្នកសម្របសម្រួលភូមិ', idCard: '011012345', occupation: 'ជាងកាត់ដេរ', addrVillage: 'ខ្នាចរមាស', addrCommune: 'ឃុំខ្នាចរមាស', addrDistrict: 'ស្រុកបវេល', referrer: 'ទេព រតនា', regDate: '2025-07-02', interests: ['biz', 'health'], phone: '069 234 010', facebook: 'https://facebook.com/demo.kev.sovannary', sucName: 'កែវ សុភ័ក្ត្រ', sucRel: 'កូនប្រុស', sucPhone: '069 234 011' })
    ];

    let iid = 0;
    const I = (name, unit, price, cur, comm, commCur, importer) => ({ id: 'IT' + (++iid), name, unit, price, cur, comm, commCur, importer });
    const P = (n, o) => Object.assign({
      id: 'PTBTB-' + String(n).padStart(3, '0'), photo: null, cover: null, addrNote: '',
      mapUrl: 'https://www.google.com/maps?q=13.0957,103.2022', facebook: '', sucName: '', sucRel: '', sucPhone: ''
    }, o);
    const partners = [
      P(1, { ptype: 'supplier', geoDistrict: 'ស្រុកសង្កែ', geoCommune: 'ឃុំអន្លង់វិល', geoVillage: 'អន្លង់វិល', bizType: 'ផ្គត់ផ្គង់គ្រាប់ពូជ និងជីកសិកម្ម', bizName: 'ហាងគ្រាប់ពូជ ស្រែសំបូរ', family: 'ឡុង', given: 'សំអូន', gender: 'ប្រុស', idCard: '020123456', sectors: ['agri', 'biz'], address: 'ផ្លូវជាតិលេខ ៥ ភូមិអន្លង់វិល ឃុំអន្លង់វិល ស្រុកសង្កែ ខេត្តបាត់ដំបង', phone: '012 700 111', facebook: 'https://facebook.com/demo.srey.sombo', referrer: 'ឈឹម វណ្ណា', mouDate: '2025-02-14', sucName: 'ឡុង សុភ័ក្ត្រា', sucRel: 'កូនស្រី', sucPhone: '012 700 112',
        items: [I('គ្រាប់ពូជស្រូវ សែនក្រអូប', 'គីឡូក្រាម', 2500, 'KHR', 200, 'KHR', 'ហាងគ្រាប់ពូជ ស្រែសំបូរ'), I('ជីលាយ ១៦-១៦-៨', 'បាវ (៥០គក)', 28, 'USD', 1, 'USD', 'ក្រុមហ៊ុននាំចូលជីភ្នំពេញ'), I('ថ្នាំសម្លាប់ស្មៅ', 'ដប', 6.5, 'USD', 0.5, 'USD', 'ក្រុមហ៊ុននាំចូលជីភ្នំពេញ')] }),
      P(2, { ptype: 'direct', geoDistrict: 'ក្រុងបាត់ដំបង', geoCommune: 'សង្កាត់ស្វាយប៉ោ', geoVillage: 'ស្វាយប៉ោ២', bizType: 'កែច្នៃ និងលក់អង្ករ', bizName: 'អង្ករក្រអូប បាត់ដំបង សុវណ្ណភូមិ', family: 'ស៊ូ', given: 'ចន្ទា', gender: 'ស្រី', idCard: '020234567', sectors: ['agri', 'biz'], address: 'ផ្លូវលេខ ១ ភូមិស្វាយប៉ោ២ សង្កាត់ស្វាយប៉ោ ក្រុងបាត់ដំបង', phone: '011 700 222', facebook: 'https://facebook.com/demo.battambang.rice', referrer: 'ជា សុខា', mouDate: '2025-03-01', sucName: 'ស៊ូ វិសាល', sucRel: 'ស្វាមី', sucPhone: '011 700 223',
        items: [I('អង្ករក្រអូប ប្រណីត', 'បាវ (២៥គក)', 32, 'USD', 2, 'USD', 'ស៊ូ ចន្ទា'), I('អង្ករសាម៉ី', 'គីឡូក្រាម', 3200, 'KHR', 300, 'KHR', 'ស៊ូ ចន្ទា'), I('កន្ទក់ស្រូវ', 'បាវ', 18000, 'KHR', 1000, 'KHR', 'ស៊ូ ចន្ទា')] }),
      P(3, { ptype: 'service', geoDistrict: 'ក្រុងបាត់ដំបង', geoCommune: 'សង្កាត់ចំការសំរោង', geoVillage: 'ចំការសំរោង', bizType: 'មជ្ឈមណ្ឌលបណ្ដុះបណ្ដាល', bizName: 'មជ្ឈមណ្ឌលចំណេះដឹងថ្មី', family: 'វ៉ាន់', given: 'សុធា', gender: 'ស្រី', idCard: '020345678', sectors: ['edu'], address: 'ផ្លូវលេខ ៣ ភូមិចំការសំរោង សង្កាត់ចំការសំរោង ក្រុងបាត់ដំបង', phone: '098 700 333', facebook: 'https://facebook.com/demo.new.knowledge', referrer: 'គាត ស្រីពៅ', mouDate: '2025-05-20', sucName: 'វ៉ាន់ សុវីរ៉ា', sucRel: 'បងប្រុស', sucPhone: '098 700 334',
        items: [I('វគ្គភាសាអង់គ្លេស កម្រិតមូលដ្ឋាន', 'ខែ', 25, 'USD', 3, 'USD', 'មជ្ឈមណ្ឌលចំណេះដឹងថ្មី'), I('វគ្គកុំព្យូទ័រ និងអ៊ីនធឺណិត', 'វគ្គ', 40, 'USD', 5, 'USD', 'មជ្ឈមណ្ឌលចំណេះដឹងថ្មី')] }),
      P(4, { ptype: 'reseller', geoDistrict: 'ស្រុកបវេល', geoCommune: 'ឃុំបវេល', geoVillage: 'បវេលកណ្ដាល', bizType: 'លក់ផលិតផលសុខភាព និងសម្រស់', bizName: 'សម្រស់ធម្មជាតិ បវេល', family: 'ហ៊ុន', given: 'ស្រីរ័ត្ន', gender: 'ស្រី', idCard: '020456789', sectors: ['health', 'biz'], address: 'ផ្សារបវេល ភូមិបវេលកណ្ដាល ឃុំបវេល ស្រុកបវេល', phone: '085 700 444', facebook: 'https://facebook.com/demo.natural.beauty', referrer: 'ទេព រតនា', mouDate: '2025-06-11', sucName: 'ហ៊ុន សុភាព', sucRel: 'ម្ដាយ', sucPhone: '085 700 445',
        items: [I('ប្រេងដូងធម្មជាតិ', 'ដប (២៥០មល)', 12000, 'KHR', 1500, 'KHR', 'ហាងគ្រឿងសម្អាងភ្នំពេញ'), I('សាប៊ូធម្មជាតិ', 'ដុំ', 1.5, 'USD', 0.2, 'USD', 'ហាងគ្រឿងសម្អាងភ្នំពេញ'), I('តែឱសថបំប៉ន', 'កញ្ចប់', 4, 'USD', 0.5, 'USD', 'ហាងគ្រឿងសម្អាងភ្នំពេញ')] }),
      P(5, { ptype: 'service', geoDistrict: 'ក្រុងបាត់ដំបង', geoCommune: 'សង្កាត់រតនៈ', geoVillage: 'រតនៈ', bizType: 'ភ្នាក់ងារអចលនទ្រព្យ', bizName: 'ដីល្អ បាត់ដំបង អចលនទ្រព្យ', family: 'ជិន', given: 'ពិសាល', gender: 'ប្រុស', idCard: '020567890', sectors: ['realestate'], address: 'មហាវិថីសាមគ្គី ភូមិរតនៈ សង្កាត់រតនៈ ក្រុងបាត់ដំបង', phone: '017 700 555', facebook: 'https://facebook.com/demo.dee.laor', referrer: 'សុង វិចិត្រ', mouDate: '2025-08-30', sucName: 'ជិន ស្រីល័ក្ខ', sucRel: 'ភរិយា', sucPhone: '017 700 556',
        items: [I('ដីលំនៅដ្ឋាន តាមបណ្ដោយផ្លូវជាតិ', 'ម៉ែត្រការ៉េ', 120, 'USD', 3, 'USD', 'ជិន ពិសាល'), I('សេវាកម្មជួយលក់ទិញដី', 'ប្រតិបត្តិការ', 0, 'USD', 2, 'USD', 'ជិន ពិសាល')] }),
      P(6, { ptype: 'supplier', geoDistrict: 'ស្រុកថ្មគោល', geoCommune: 'ឃុំបឹងព្រីង', geoVillage: 'បឹងព្រីងលើ', bizType: 'ផ្គត់ផ្គង់ផលិតផលកសិកម្ម', bizName: 'កសិដ្ឋានផ្លែឈើ បឹងព្រីង', family: 'ប៉ែន', given: 'សារ៉ាន់', gender: 'ប្រុស', idCard: '020678901', sectors: ['agri'], address: 'ភូមិបឹងព្រីងលើ ឃុំបឹងព្រីង ស្រុកថ្មគោល ខេត្តបាត់ដំបង', phone: '070 700 666', facebook: '', referrer: 'លី ស្រីនាង', mouDate: '2025-09-15', sucName: 'ប៉ែន សុខគន្ធា', sucRel: 'កូនស្រី', sucPhone: '070 700 667',
        items: [I('ស្វាយកែវរមៀត', 'គីឡូក្រាម', 2.2, 'USD', 0.2, 'USD', 'ប៉ែន សារ៉ាន់'), I('ក្រូចថ្លុង', 'គីឡូក្រាម', 5000, 'KHR', 500, 'KHR', 'ប៉ែន សារ៉ាន់'), I('ត្រសក់ស្រស់', 'គីឡូក្រាម', 1800, 'KHR', 200, 'KHR', 'ប៉ែន សារ៉ាន់')] })
    ];

    return {
      v: 1, members, partners,
      settings: { appName: 'សម្ព័ន្ធក្លឹប 80/20 369 5P', province: 'បាត់ដំបង', logo: null, adminPass: 'admin123456', userPass: 'user8020369', sheetUrl: '' }
    };
  }
  return { GEO, POSITIONS, LEVELS, INTERESTS, PTYPES, seed };
})();
