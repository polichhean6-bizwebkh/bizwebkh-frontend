const TELEGRAM_USERNAME = "Timespace89";
const TELEGRAM_URL = "https://t.me/Timespace89";
const MAPS_URL = "https://share.google/z2ObmME8C6EP1CiOD";

const translations = {
  en: {
    "nav.home": "Home",
    "nav.overview": "Overview",
    "nav.video": "Video",
    "nav.residence": "Residence",
    "nav.wyndhamHotel": "Wyndham Hotel",
    "nav.penthouse": "Penthouse",
    "nav.amenities": "Amenities",
    "nav.floorPlans": "Floor Plans",
    "nav.bookingProcess": "Booking Process",
    "nav.dueDiligence": "Due Diligence",
    "nav.location": "Location",
    "nav.contact": "Contact",
    "nav.more": "More",
    "buttons.phoneNumber": "092 523 534",
    "buttons.exploreProject": "Explore Project",
    "buttons.requestResidence": "Request Residence Details",
    "buttons.requestHotel": "Request Hotel Unit Details",
    "buttons.requestPenthouse": "Request Penthouse Details",
    "buttons.watchVideo": "Play Video",
    "buttons.watchOnYoutube": "Watch on YouTube",
    "buttons.viewDocument": "View Document",
    "buttons.openMaps": "Open Google Maps",
    "buttons.telegram": "Telegram",
    "buttons.callSales": "Call Sales",
    "buttons.email": "Email",
    "hero.eyebrow": "Premium mixed-use destination",
    "hero.title": "CEO Center",
    "hero.subtitle": "A Premium Mixed-Use Landmark in Phnom Penh",
    "hero.text": "Premium residences, hotel units, office spaces, and penthouse opportunities in a landmark mixed-use development.",
    "hero.price": "Starting from $16x,xxx",
    "hero.panelLabel": "Project Scope",
    "hero.panelTitle": "Residences + Hotel + Offices + Penthouse",
    "hero.panelText": "A one-page introduction for buyers, renters, investors, office tenants, and agents.",
    "overview.eyebrow": "Project overview",
    "overview.title": "A strategic address for living, business, hospitality, and investment.",
    "overview.text": "CEO Center brings multiple property uses together in one premium Phnom Penh destination, supported by strong building visuals, international positioning, and flexible inquiry paths.",
    "overview.card1Title": "Mixed-Use Landmark",
    "overview.card1Text": "A corporate-luxury destination combining lifestyle, hospitality, and business functions.",
    "overview.card2Title": "Wyndham Hotel Units",
    "overview.card2Text": "Hotel-style units connected to the Wyndham hospitality concept.",
    "overview.card3Title": "Premium Residences",
    "overview.card3Text": "Residence options for city living, long-term stay, and ownership inquiry.",
    "overview.card4Title": "Penthouse Opportunity",
    "overview.card4Text": "Upper-level residence options for buyers seeking privacy and elevated city views.",
    "overview.card5Title": "Central Phnom Penh Location",
    "overview.card5Text": "Strategically positioned near key government, shopping, and business destinations.",
    "video.eyebrow": "Project video",
    "video.title": "Project Video",
    "video.text": "Watch a short overview of CEO Center and its surrounding development vision.",
    "video.fallbackText": "Video not playing here?",
    "residence.eyebrow": "Residence",
    "residence.title": "Premium residence options for modern city living.",
    "residence.text": "Choose from thoughtfully planned private residences designed for comfortable city living, investment, and long-term value.",
    "residence.roomTitle": "Residence Room Types",
    "residence.roomText": "Choose from thoughtfully planned private residences designed for comfortable city living, investment, and long-term value.",
    "residence.type1": "1-Bedroom Residence",
    "residence.type1Text": "A private residence option for city living and long-term stay.",
    "residence.type2": "2-Bedroom Residence",
    "residence.type2Text": "A larger residence option for families, couples, or investment inquiry.",
    "residence.type3": "Family Residence",
    "residence.type3Text": "A flexible residence category with details available after confirmation.",
    "hotel.eyebrow": "Wyndham Hotel",
    "hotel.title": "Hotel-style units for managed stay opportunities.",
    "hotel.text": "Hotel-style units designed for hospitality, convenience, and managed stay opportunities within the CEO Center development.",
    "hotel.roomTitle": "Wyndham Hotel Room Types",
    "hotel.roomText": "Hotel-style units designed for hospitality, convenience, and managed stay opportunities within the CEO Center development.",
    "hotel.type1": "Hotel Unit",
    "hotel.type1Text": "A hotel-style unit for hospitality-focused inquiry.",
    "hotel.type2": "Premium Hotel Unit",
    "hotel.type2Text": "A premium unit category with details subject to sales confirmation.",
    "hotel.type3": "Managed Stay Unit",
    "hotel.type3Text": "A managed stay option for buyers and investors seeking convenience.",
    "penthouse.eyebrow": "Penthouse",
    "penthouse.title": "Exclusive upper-level residence opportunities.",
    "penthouse.text": "An exclusive upper-level residence option offering premium space, privacy, and elevated city views.",
    "penthouse.note": "Details, layout, availability, and pricing are available upon request.",
    "penthouse.cardTitle": "Upper-Level Residence",
    "penthouse.cardText": "Penthouse information can be reviewed with the sales team based on confirmed availability.",
    "common.details": "Details, availability, and pricing are available upon request.",
    "amenities.eyebrow": "Amenities",
    "amenities.title": "Facilities designed for lifestyle and business convenience.",
    "amenities.text": "A premium amenity mix supports daily living, hospitality, professional work, and resident services.",
    "amenities.featureLabel": "Featured Amenity",
    "amenities.lobby": "Hotel Lobby / Reception",
    "amenities.lobbyText": "A polished arrival experience for residents, hotel guests, buyers, and business visitors.",
    "amenities.pool": "Swimming Pool",
    "amenities.gym": "Gym",
    "amenities.skybar": "Sky Bar",
    "amenities.wine": "Wine & Cigar Lounge",
    "amenities.spa": "SPA",
    "amenities.restaurant": "Western Restaurant",
    "amenities.business": "Business Center",
    "amenities.conference": "International Conference Center",
    "amenities.parking": "Parking",
    "amenities.smart": "Smart Service",
    "plans.eyebrow": "Floor plans",
    "plans.title": "Floor Plans & Unit Layouts",
    "plans.text": "Click each category to view available unit layouts. Raw PDF downloads are not published on this website.",
    "plans.residence": "Residence Layout",
    "plans.residenceText": "Apartment layout options for lifestyle and ownership inquiry.",
    "plans.hotel": "Hotel Unit Layout",
    "plans.hotelText": "Hotel-style unit plans for managed property interest.",
    "plans.office": "Office Layout",
    "plans.officeText": "Office space layouts for business and investment review.",
    "plans.penthouse": "Penthouse Layout",
    "plans.penthouseText": "Penthouse layout information is available for serious buyer review.",
    "plans.modalKicker": "Available unit layouts",
    "plans.layoutLabel": "Layout",
    "booking.eyebrow": "Booking process",
    "booking.title": "Payment Plan",
    "booking.text": "A clear payment structure for interested buyers and investors.",
    "booking.colInstalment": "Instalment",
    "booking.colMilestone": "Milestone",
    "booking.colPayment": "Payment",
    "booking.step1Title": "Booking Deposit",
    "booking.step1Milestone": "Upon reservation",
    "booking.step1Payment": "USD 2,000",
    "booking.step2Title": "Upon SPA Signing",
    "booking.step2Milestone": "Within 30 days of booking",
    "booking.step2Payment": "30%",
    "booking.step3Title": "First Installment",
    "booking.step3Milestone": "Per construction milestone",
    "booking.step3Payment": "30%",
    "booking.step4Title": "Second Installment",
    "booking.step4Milestone": "Per construction milestone",
    "booking.step4Payment": "30%",
    "booking.step5Title": "Handover",
    "booking.step5Milestone": "Upon key collection",
    "booking.step5Payment": "10%",
    "booking.note": "Final terms, payment schedule, and availability are subject to confirmation by the sales team.",
    "diligence.eyebrow": "Due diligence",
    "diligence.title": "Due Diligence",
    "diligence.text": "Review key company and project documents prepared for buyer and investor reference.",
    "diligence.card1": "Patent Document",
    "diligence.card2": "MOC / Company Registration",
    "diligence.card3": "Developer License",
    "diligence.card4": "Construction Permit",
    "diligence.card1Text": "Official document available for buyer and investor review.",
    "diligence.card2Text": "Company registration document available for review.",
    "diligence.card3Text": "Project developer license available for review.",
    "diligence.card4Text": "Construction permit document available for review.",
    "location.eyebrow": "Location",
    "location.title": "Strategically located in Phnom Penh City Center.",
    "location.text": "CEO Center is strategically located in Phnom Penh City Center, close to key business, shopping, government, and lifestyle destinations.",
    "location.point1": "Phnom Penh City Center",
    "location.point2": "Near Olympia Shopping Mall",
    "location.point3": "Near Prime Minister's Office",
    "location.cardTitle": "Central Phnom Penh",
    "location.cardText": "A connected address for residents, businesses, investors, and hotel guests.",
    "contact.eyebrow": "Contact / inquiry",
    "contact.title": "Send an Inquiry",
    "contact.text": "Tell us what you are interested in, and the CEO Center sales team will follow up with more details.",
    "contact.phoneLabel": "Phone:",
    "contact.telegramLabel": "Telegram:",
    "contact.emailLabel": "Email:",
    "form.name": "Name",
    "form.phone": "Phone",
    "form.interested": "Interested In",
    "form.message": "Message",
    "form.submit": "Send Inquiry via Telegram",
    "form.optionResidence": "Residence",
    "form.optionHotel": "Wyndham Hotel",
    "form.optionPenthouse": "Penthouse",
    "form.optionFloorPlans": "Floor Plans",
    "form.optionBooking": "Booking Process",
    "form.optionDocuments": "Due Diligence Documents",
    "footer.line": "Premium mixed-use landmark in Phnom Penh.",
    "footer.demo": "Website by BizWeb KH."
  },
  kh: {
    "nav.home": "ទំព័រដើម",
    "nav.overview": "ទិដ្ឋភាពទូទៅ",
    "nav.video": "វីដេអូ",
    "nav.residence": "លំនៅដ្ឋាន",
    "nav.wyndhamHotel": "សណ្ឋាគារ Wyndham",
    "nav.penthouse": "Penthouse",
    "nav.amenities": "បរិក្ខារ",
    "nav.floorPlans": "ប្លង់",
    "nav.bookingProcess": "ដំណើរការកក់",
    "nav.dueDiligence": "ឯកសារពិនិត្យ",
    "nav.location": "ទីតាំង",
    "nav.contact": "ទំនាក់ទំនង",
    "nav.more": "ផ្សេងៗ",
    "buttons.phoneNumber": "092 523 534",
    "buttons.exploreProject": "មើលគម្រោង",
    "buttons.requestResidence": "ស្នើព័ត៌មានលំនៅដ្ឋាន",
    "buttons.requestHotel": "ស្នើព័ត៌មានបន្ទប់សណ្ឋាគារ",
    "buttons.requestPenthouse": "ស្នើព័ត៌មាន Penthouse",
    "buttons.watchVideo": "ចាក់វីដេអូ",
    "buttons.watchOnYoutube": "មើលនៅលើ YouTube",
    "buttons.viewDocument": "មើលឯកសារ",
    "buttons.openMaps": "បើក Google Maps",
    "buttons.telegram": "Telegram",
    "buttons.callSales": "ហៅផ្នែកលក់",
    "buttons.email": "អ៊ីមែល",
    "hero.eyebrow": "គោលដៅអចលនទ្រព្យពហុមុខងារ",
    "hero.title": "CEO Center",
    "hero.subtitle": "អគារពហុមុខងារលំដាប់ប្រណីតនៅភ្នំពេញ",
    "hero.text": "លំនៅដ្ឋានលំដាប់ខ្ពស់ បន្ទប់សណ្ឋាគារ ការិយាល័យ និងឱកាស Penthouse ក្នុងអគារពហុមុខងារលេចធ្លោ។",
    "hero.price": "ចាប់ផ្តើមពី $16x,xxx",
    "hero.panelLabel": "វិសាលភាពគម្រោង",
    "hero.panelTitle": "លំនៅដ្ឋាន + សណ្ឋាគារ + ការិយាល័យ + Penthouse",
    "hero.panelText": "ការណែនាំមួយទំព័រសម្រាប់អ្នកទិញ អ្នកជួល អ្នកវិនិយោគ អ្នកជួលការិយាល័យ និងភ្នាក់ងារ។",
    "overview.eyebrow": "ទិដ្ឋភាពគម្រោង",
    "overview.title": "អាសយដ្ឋានយុទ្ធសាស្ត្រសម្រាប់ការរស់នៅ អាជីវកម្ម សណ្ឋាគារ និងវិនិយោគ។",
    "overview.text": "CEO Center រួមបញ្ចូលមុខងារអចលនទ្រព្យច្រើនប្រភេទក្នុងទីតាំងលំដាប់ខ្ពស់មួយនៅភ្នំពេញ។",
    "overview.card1Title": "អគារពហុមុខងារ",
    "overview.card1Text": "គោលដៅលំដាប់ក្រុមហ៊ុន ដែលរួមបញ្ចូលជីវិតរស់នៅ សណ្ឋាគារ និងអាជីវកម្ម។",
    "overview.card2Title": "បន្ទប់សណ្ឋាគារ Wyndham",
    "overview.card2Text": "បន្ទប់បែបសណ្ឋាគារដែលភ្ជាប់ជាមួយគំនិតសេវាកម្ម Wyndham។",
    "overview.card3Title": "លំនៅដ្ឋានលំដាប់ខ្ពស់",
    "overview.card3Text": "ជម្រើសលំនៅដ្ឋានសម្រាប់រស់នៅក្នុងទីក្រុង និងស្នើសុំព័ត៌មានកម្មសិទ្ធិ។",
    "overview.card4Title": "ឱកាស Penthouse",
    "overview.card4Text": "ជម្រើសលំនៅដ្ឋានជាន់លើសម្រាប់ភាពឯកជន និងទិដ្ឋភាពទីក្រុង។",
    "overview.card5Title": "ទីតាំងកណ្ដាលភ្នំពេញ",
    "overview.card5Text": "ស្ថិតនៅជិតគោលដៅរដ្ឋាភិបាល ផ្សារទំនើប និងអាជីវកម្មសំខាន់ៗ។",
    "video.eyebrow": "វីដេអូគម្រោង",
    "video.title": "វីដេអូគម្រោង",
    "video.text": "មើលទិដ្ឋភាពខ្លីអំពី CEO Center និងចក្ខុវិស័យអភិវឌ្ឍន៍ជុំវិញ។",
    "video.fallbackText": "វីដេអូមិនដំណើរការនៅទីនេះទេ?",
    "residence.eyebrow": "លំនៅដ្ឋាន",
    "residence.title": "ជម្រើសលំនៅដ្ឋានលំដាប់ខ្ពស់សម្រាប់ជីវិតទីក្រុង។",
    "residence.text": "ជ្រើសរើសលំនៅដ្ឋានឯកជនដែលបានរៀបចំសម្រាប់ការរស់នៅ ការវិនិយោគ និងតម្លៃរយៈពេលវែង។",
    "residence.roomTitle": "ប្រភេទបន្ទប់លំនៅដ្ឋាន",
    "residence.roomText": "ជ្រើសរើសលំនៅដ្ឋានឯកជនដែលបានរៀបចំសម្រាប់ការរស់នៅ និងតម្លៃវិនិយោគរយៈពេលវែង។",
    "residence.type1": "លំនៅដ្ឋាន 1 បន្ទប់គេង",
    "residence.type1Text": "ជម្រើសលំនៅដ្ឋានឯកជនសម្រាប់ជីវិតទីក្រុង និងស្នាក់នៅរយៈពេលវែង។",
    "residence.type2": "លំនៅដ្ឋាន 2 បន្ទប់គេង",
    "residence.type2Text": "ជម្រើសធំជាង សម្រាប់គ្រួសារ គូស្វាមីភរិយា ឬការវិនិយោគ។",
    "residence.type3": "លំនៅដ្ឋានគ្រួសារ",
    "residence.type3Text": "ប្រភេទលំនៅដ្ឋានបត់បែន ដែលព័ត៌មានលម្អិតអាចបញ្ជាក់ពេលក្រោយ។",
    "hotel.eyebrow": "សណ្ឋាគារ Wyndham",
    "hotel.title": "បន្ទប់បែបសណ្ឋាគារសម្រាប់ឱកាសស្នាក់នៅគ្រប់គ្រង។",
    "hotel.text": "បន្ទប់បែបសណ្ឋាគារដែលរៀបចំសម្រាប់សេវាសណ្ឋាគារ ភាពងាយស្រួល និងឱកាសស្នាក់នៅគ្រប់គ្រង។",
    "hotel.roomTitle": "ប្រភេទបន្ទប់សណ្ឋាគារ Wyndham",
    "hotel.roomText": "បន្ទប់បែបសណ្ឋាគារដែលរៀបចំសម្រាប់សេវាសណ្ឋាគារ និងឱកាសស្នាក់នៅគ្រប់គ្រង។",
    "hotel.type1": "បន្ទប់សណ្ឋាគារ",
    "hotel.type1Text": "បន្ទប់បែបសណ្ឋាគារសម្រាប់ការសាកសួរផ្នែកសេវាសណ្ឋាគារ។",
    "hotel.type2": "បន្ទប់សណ្ឋាគារលំដាប់ខ្ពស់",
    "hotel.type2Text": "ប្រភេទបន្ទប់លំដាប់ខ្ពស់ ដែលព័ត៌មានត្រូវបញ្ជាក់ដោយក្រុមលក់។",
    "hotel.type3": "បន្ទប់ស្នាក់នៅគ្រប់គ្រង",
    "hotel.type3Text": "ជម្រើសស្នាក់នៅគ្រប់គ្រងសម្រាប់អ្នកទិញ និងអ្នកវិនិយោគ។",
    "penthouse.eyebrow": "Penthouse",
    "penthouse.title": "ឱកាសលំនៅដ្ឋានជាន់លើផ្តាច់មុខ។",
    "penthouse.text": "ជម្រើសលំនៅដ្ឋានជាន់លើដែលផ្តល់កន្លែងប្រណីត ភាពឯកជន និងទិដ្ឋភាពទីក្រុង។",
    "penthouse.note": "ព័ត៌មានលម្អិត ប្លង់ ភាពទំនេរ និងតម្លៃ អាចស្នើសុំបាន។",
    "penthouse.cardTitle": "លំនៅដ្ឋានជាន់លើ",
    "penthouse.cardText": "ព័ត៌មាន Penthouse អាចពិនិត្យជាមួយក្រុមលក់តាមភាពទំនេរដែលបានបញ្ជាក់។",
    "common.details": "ព័ត៌មានលម្អិត ភាពទំនេរ និងតម្លៃ អាចស្នើសុំបាន។",
    "amenities.eyebrow": "បរិក្ខារ",
    "amenities.title": "បរិក្ខារសម្រាប់ជីវិតរស់នៅ និងភាពងាយស្រួលអាជីវកម្ម។",
    "amenities.text": "បរិក្ខារលំដាប់ខ្ពស់គាំទ្រការរស់នៅ សណ្ឋាគារ ការងារ និងសេវាកម្មអ្នករស់នៅ។",
    "amenities.featureLabel": "បរិក្ខារពិសេស",
    "amenities.lobby": "Lobby / Reception សណ្ឋាគារ",
    "amenities.lobbyText": "បទពិសោធន៍ទទួលភ្ញៀវប្រកបដោយភាពរលូនសម្រាប់អ្នករស់នៅ ភ្ញៀវសណ្ឋាគារ អ្នកទិញ និងភ្ញៀវអាជីវកម្ម។",
    "amenities.pool": "អាងហែលទឹក",
    "amenities.gym": "កន្លែងហាត់ប្រាណ",
    "amenities.skybar": "Sky Bar",
    "amenities.wine": "Wine & Cigar Lounge",
    "amenities.spa": "SPA",
    "amenities.restaurant": "ភោជនីយដ្ឋានបែបលោកខាងលិច",
    "amenities.business": "មជ្ឈមណ្ឌលអាជីវកម្ម",
    "amenities.conference": "មជ្ឈមណ្ឌលសន្និសីទអន្តរជាតិ",
    "amenities.parking": "ចំណតរថយន្ត",
    "amenities.smart": "សេវាឆ្លាតវៃ",
    "plans.eyebrow": "ប្លង់",
    "plans.title": "ប្លង់ជាន់ និងប្លង់យូនីត",
    "plans.text": "ចុចលើប្រភេទនីមួយៗដើម្បីមើលប្លង់យូនីតដែលមាន។ គេហទំព័រនេះមិនផ្សព្វផ្សាយ PDF សម្រាប់ទាញយកទេ។",
    "plans.residence": "ប្លង់លំនៅដ្ឋាន",
    "plans.residenceText": "ជម្រើសប្លង់អាផាតមិនសម្រាប់ការរស់នៅ និងការស្នើសុំ។",
    "plans.hotel": "ប្លង់បន្ទប់សណ្ឋាគារ",
    "plans.hotelText": "ប្លង់បន្ទប់បែបសណ្ឋាគារ សម្រាប់ការវិនិយោគ។",
    "plans.office": "ប្លង់ការិយាល័យ",
    "plans.officeText": "ប្លង់ការិយាល័យសម្រាប់អាជីវកម្ម និងការវិនិយោគ។",
    "plans.penthouse": "ប្លង់ Penthouse",
    "plans.penthouseText": "ព័ត៌មានប្លង់ Penthouse មានសម្រាប់អ្នកទិញដែលចាប់អារម្មណ៍ពិតប្រាកដ។",
    "plans.modalKicker": "ប្លង់យូនីតដែលមាន",
    "plans.layoutLabel": "ប្លង់",
    "booking.eyebrow": "ដំណើរការកក់",
    "booking.title": "ផែនការទូទាត់",
    "booking.text": "រចនាសម្ព័ន្ធទូទាត់ច្បាស់លាស់សម្រាប់អ្នកទិញ និងអ្នកវិនិយោគ។",
    "booking.colInstalment": "ដំណាក់កាល",
    "booking.colMilestone": "ពេលវេលា",
    "booking.colPayment": "ការទូទាត់",
    "booking.step1Title": "ប្រាក់កក់",
    "booking.step1Milestone": "ពេលកក់",
    "booking.step1Payment": "USD 2,000",
    "booking.step2Title": "ពេលចុះ SPA",
    "booking.step2Milestone": "ក្នុងរយៈពេល 30 ថ្ងៃបន្ទាប់ពីកក់",
    "booking.step2Payment": "30%",
    "booking.step3Title": "ការទូទាត់ដំណាក់កាលទី 1",
    "booking.step3Milestone": "តាមដំណាក់កាលសាងសង់",
    "booking.step3Payment": "30%",
    "booking.step4Title": "ការទូទាត់ដំណាក់កាលទី 2",
    "booking.step4Milestone": "តាមដំណាក់កាលសាងសង់",
    "booking.step4Payment": "30%",
    "booking.step5Title": "ប្រគល់យូនីត",
    "booking.step5Milestone": "ពេលទទួលសោ",
    "booking.step5Payment": "10%",
    "booking.note": "លក្ខខណ្ឌចុងក្រោយ កាលវិភាគទូទាត់ និងភាពទំនេរ អាស្រ័យលើការបញ្ជាក់ពីក្រុមលក់។",
    "diligence.eyebrow": "ឯកសារពិនិត្យ",
    "diligence.title": "Due Diligence",
    "diligence.text": "ពិនិត្យឯកសារក្រុមហ៊ុន និងគម្រោងសំខាន់ៗ ដែលរៀបចំសម្រាប់អ្នកទិញ និងអ្នកវិនិយោគ។",
    "diligence.card1": "ឯកសារ Patent",
    "diligence.card2": "MOC / ការចុះបញ្ជីក្រុមហ៊ុន",
    "diligence.card3": "អាជ្ញាប័ណ្ណអភិវឌ្ឍន៍",
    "diligence.card4": "លិខិតអនុញ្ញាតសាងសង់",
    "diligence.card1Text": "ឯកសារផ្លូវការសម្រាប់អ្នកទិញ និងអ្នកវិនិយោគពិនិត្យ។",
    "diligence.card2Text": "ឯកសារចុះបញ្ជីក្រុមហ៊ុនសម្រាប់ពិនិត្យ។",
    "diligence.card3Text": "អាជ្ញាប័ណ្ណអ្នកអភិវឌ្ឍន៍គម្រោងសម្រាប់ពិនិត្យ។",
    "diligence.card4Text": "លិខិតអនុញ្ញាតសាងសង់សម្រាប់ពិនិត្យ។",
    "location.eyebrow": "ទីតាំង",
    "location.title": "ស្ថិតនៅទីតាំងយុទ្ធសាស្ត្រកណ្ដាលភ្នំពេញ។",
    "location.text": "CEO Center ស្ថិតនៅកណ្ដាលភ្នំពេញ ជិតគោលដៅអាជីវកម្ម ផ្សារទំនើប រដ្ឋាភិបាល និងជីវិតរស់នៅ។",
    "location.point1": "កណ្ដាលទីក្រុងភ្នំពេញ",
    "location.point2": "ជិត Olympia Shopping Mall",
    "location.point3": "ជិតការិយាល័យនាយករដ្ឋមន្ត្រី",
    "location.cardTitle": "កណ្ដាលភ្នំពេញ",
    "location.cardText": "អាសយដ្ឋានភ្ជាប់សម្រាប់អ្នករស់នៅ អាជីវកម្ម អ្នកវិនិយោគ និងភ្ញៀវសណ្ឋាគារ។",
    "contact.eyebrow": "ទំនាក់ទំនង / សាកសួរ",
    "contact.title": "ផ្ញើសំណួរ",
    "contact.text": "ប្រាប់យើងពីអ្វីដែលអ្នកចាប់អារម្មណ៍ ហើយក្រុមលក់ CEO Center នឹងទាក់ទងត្រឡប់ជាមួយព័ត៌មានលម្អិត។",
    "contact.phoneLabel": "ទូរស័ព្ទ៖",
    "contact.telegramLabel": "Telegram៖",
    "contact.emailLabel": "អ៊ីមែល៖",
    "form.name": "ឈ្មោះ",
    "form.phone": "ទូរស័ព្ទ",
    "form.interested": "ចាប់អារម្មណ៍លើ",
    "form.message": "សារ",
    "form.submit": "ផ្ញើសំណួរតាម Telegram",
    "form.optionResidence": "លំនៅដ្ឋាន",
    "form.optionHotel": "សណ្ឋាគារ Wyndham",
    "form.optionPenthouse": "Penthouse",
    "form.optionFloorPlans": "ប្លង់",
    "form.optionBooking": "ដំណើរការកក់",
    "form.optionDocuments": "ឯកសារ Due Diligence",
    "footer.line": "អគារពហុមុខងារលំដាប់ខ្ពស់នៅភ្នំពេញ។",
    "footer.demo": "Website by BizWeb KH."
  },
  zh: {
    "nav.home": "首页",
    "nav.overview": "概览",
    "nav.video": "视频",
    "nav.residence": "住宅",
    "nav.wyndhamHotel": "温德姆酒店",
    "nav.penthouse": "顶层住宅",
    "nav.amenities": "配套",
    "nav.floorPlans": "户型图",
    "nav.bookingProcess": "预订流程",
    "nav.dueDiligence": "尽调资料",
    "nav.location": "位置",
    "nav.contact": "联系",
    "nav.more": "更多",
    "buttons.phoneNumber": "092 523 534",
    "buttons.exploreProject": "了解项目",
    "buttons.requestResidence": "索取住宅资料",
    "buttons.requestHotel": "索取酒店单位资料",
    "buttons.requestPenthouse": "索取顶层住宅资料",
    "buttons.watchVideo": "播放视频",
    "buttons.watchOnYoutube": "在 YouTube 观看",
    "buttons.viewDocument": "查看文件",
    "buttons.openMaps": "打开 Google Maps",
    "buttons.telegram": "Telegram",
    "buttons.callSales": "致电销售",
    "buttons.email": "邮件",
    "hero.eyebrow": "高端综合体项目",
    "hero.title": "CEO Center",
    "hero.subtitle": "金边高端综合地标",
    "hero.text": "集合高端住宅、酒店单位、办公空间与顶层住宅机会的地标综合体项目。",
    "hero.price": "起价 $16x,xxx",
    "hero.panelLabel": "项目范围",
    "hero.panelTitle": "住宅 + 酒店 + 办公 + 顶层住宅",
    "hero.panelText": "面向买家、租客、投资者、办公租户和代理的一页式项目介绍。",
    "overview.eyebrow": "项目概览",
    "overview.title": "集居住、商务、酒店与投资于一体的战略地址。",
    "overview.text": "CEO Center 在金边核心位置整合多种物业形态，以强建筑形象、国际化定位和清晰咨询路径呈现。",
    "overview.card1Title": "综合地标",
    "overview.card1Text": "融合生活方式、酒店服务与商务功能的高端目的地。",
    "overview.card2Title": "温德姆酒店单位",
    "overview.card2Text": "连接温德姆酒店服务概念的酒店式单位。",
    "overview.card3Title": "高端住宅",
    "overview.card3Text": "适合城市生活、长期居住和置业咨询的住宅选择。",
    "overview.card4Title": "顶层住宅机会",
    "overview.card4Text": "面向追求隐私与城市景观买家的高楼层住宅选择。",
    "overview.card5Title": "金边中心位置",
    "overview.card5Text": "靠近政府、购物和商务核心目的地。",
    "video.eyebrow": "项目视频",
    "video.title": "项目视频",
    "video.text": "观看 CEO Center 与周边发展愿景的简短介绍。",
    "video.fallbackText": "视频无法在此播放？",
    "residence.eyebrow": "住宅",
    "residence.title": "面向现代城市生活的高端住宅选择。",
    "residence.text": "可选择规划完善的私人住宅，适合舒适城市生活、投资和长期价值。",
    "residence.roomTitle": "住宅户型类型",
    "residence.roomText": "可选择规划完善的私人住宅，适合舒适城市生活、投资和长期价值。",
    "residence.type1": "一房住宅",
    "residence.type1Text": "适合城市生活和长期居住的私人住宅选择。",
    "residence.type2": "两房住宅",
    "residence.type2Text": "适合家庭、情侣或投资咨询的较大住宅选择。",
    "residence.type3": "家庭住宅",
    "residence.type3Text": "灵活住宅类别，具体资料以最终确认为准。",
    "hotel.eyebrow": "温德姆酒店",
    "hotel.title": "面向托管住宿机会的酒店式单位。",
    "hotel.text": "位于 CEO Center 内，面向酒店服务、便利性与托管住宿机会打造的酒店式单位。",
    "hotel.roomTitle": "温德姆酒店房型",
    "hotel.roomText": "位于 CEO Center 内，面向酒店服务、便利性与托管住宿机会打造的酒店式单位。",
    "hotel.type1": "酒店单位",
    "hotel.type1Text": "适合酒店服务类咨询的酒店式单位。",
    "hotel.type2": "高级酒店单位",
    "hotel.type2Text": "高级单位类别，具体信息以销售团队确认为准。",
    "hotel.type3": "托管住宿单位",
    "hotel.type3Text": "适合买家和投资者关注便利托管的住宿选择。",
    "penthouse.eyebrow": "顶层住宅",
    "penthouse.title": "专属高楼层住宅机会。",
    "penthouse.text": "专属高楼层住宅选择，提供更高规格空间、隐私和城市景观。",
    "penthouse.note": "详情、布局、可售情况和价格可按需咨询。",
    "penthouse.cardTitle": "高楼层住宅",
    "penthouse.cardText": "顶层住宅资料可根据确认的可售情况向销售团队咨询。",
    "common.details": "详情、可售情况和价格可按需咨询。",
    "amenities.eyebrow": "配套设施",
    "amenities.title": "服务生活与商务便利的高端设施。",
    "amenities.text": "丰富配套支持日常生活、酒店体验、专业办公和业主服务。",
    "amenities.featureLabel": "精选配套",
    "amenities.lobby": "酒店大堂 / 接待",
    "amenities.lobbyText": "为住户、酒店客人、买家和商务访客打造的高端到达体验。",
    "amenities.pool": "游泳池",
    "amenities.gym": "健身房",
    "amenities.skybar": "空中酒吧",
    "amenities.wine": "红酒雪茄会所",
    "amenities.spa": "SPA",
    "amenities.restaurant": "西餐厅",
    "amenities.business": "商务中心",
    "amenities.conference": "国际会议中心",
    "amenities.parking": "停车场",
    "amenities.smart": "智慧服务",
    "plans.eyebrow": "户型图",
    "plans.title": "平面图与单位户型",
    "plans.text": "点击每个类别查看可用单位户型。本网站不公开原始 PDF 下载。",
    "plans.residence": "住宅户型",
    "plans.residenceText": "适合生活与置业咨询的公寓布局。",
    "plans.hotel": "酒店单位户型",
    "plans.hotelText": "适合托管物业关注的酒店式单位布局。",
    "plans.office": "办公户型",
    "plans.officeText": "适合商务与投资评估的办公空间布局。",
    "plans.penthouse": "顶层住宅户型",
    "plans.penthouseText": "顶层住宅户型资料可供认真买家查看。",
    "plans.modalKicker": "可用单位户型",
    "plans.layoutLabel": "户型",
    "booking.eyebrow": "预订流程",
    "booking.title": "付款计划",
    "booking.text": "为买家和投资者提供清晰的付款结构。",
    "booking.colInstalment": "分期",
    "booking.colMilestone": "节点",
    "booking.colPayment": "付款",
    "booking.step1Title": "预订定金",
    "booking.step1Milestone": "预订时",
    "booking.step1Payment": "USD 2,000",
    "booking.step2Title": "签署 SPA 时",
    "booking.step2Milestone": "预订后 30 天内",
    "booking.step2Payment": "30%",
    "booking.step3Title": "第一期付款",
    "booking.step3Milestone": "按施工节点",
    "booking.step3Payment": "30%",
    "booking.step4Title": "第二期付款",
    "booking.step4Milestone": "按施工节点",
    "booking.step4Payment": "30%",
    "booking.step5Title": "交付",
    "booking.step5Milestone": "领取钥匙时",
    "booking.step5Payment": "10%",
    "booking.note": "最终条款、付款计划和可售情况以销售团队确认为准。",
    "diligence.eyebrow": "尽调资料",
    "diligence.title": "尽调资料",
    "diligence.text": "查看为买家和投资者参考准备的重点公司与项目文件。",
    "diligence.card1": "Patent 文件",
    "diligence.card2": "MOC / 公司注册",
    "diligence.card3": "开发商许可证",
    "diligence.card4": "施工许可",
    "diligence.card1Text": "可供买家和投资者审阅的官方文件。",
    "diligence.card2Text": "可供审阅的公司注册文件。",
    "diligence.card3Text": "可供审阅的项目开发商许可证。",
    "diligence.card4Text": "可供审阅的施工许可文件。",
    "location.eyebrow": "位置",
    "location.title": "战略性位于金边市中心。",
    "location.text": "CEO Center 位于金边市中心，靠近重要商务、购物、政府和生活目的地。",
    "location.point1": "金边市中心",
    "location.point2": "靠近 Olympia Shopping Mall",
    "location.point3": "靠近总理府",
    "location.cardTitle": "金边中心",
    "location.cardText": "连接住户、企业、投资者和酒店客人的核心地址。",
    "contact.eyebrow": "联系 / 咨询",
    "contact.title": "发送咨询",
    "contact.text": "请告诉我们您感兴趣的内容，CEO Center 销售团队将跟进并提供更多资料。",
    "contact.phoneLabel": "电话：",
    "contact.telegramLabel": "Telegram：",
    "contact.emailLabel": "邮箱：",
    "form.name": "姓名",
    "form.phone": "电话",
    "form.interested": "感兴趣内容",
    "form.message": "留言",
    "form.submit": "通过 Telegram 发送咨询",
    "form.optionResidence": "住宅",
    "form.optionHotel": "温德姆酒店",
    "form.optionPenthouse": "顶层住宅",
    "form.optionFloorPlans": "户型图",
    "form.optionBooking": "预订流程",
    "form.optionDocuments": "尽调资料",
    "footer.line": "金边高端综合地标。",
    "footer.demo": "Website by BizWeb KH."
  }
};

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".more-menu").forEach((menu) => menu.removeAttribute("open"));
  });
});

let currentLanguage = localStorage.getItem("ceo-center-language") || "en";
const getDictionary = () => translations[currentLanguage] || translations.en;

const setLanguage = (lang) => {
  currentLanguage = translations[lang] ? lang : "en";
  const dictionary = getDictionary();
  document.documentElement.lang = currentLanguage === "kh" ? "km" : currentLanguage === "zh" ? "zh" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLanguage);
  });
  localStorage.setItem("ceo-center-language", currentLanguage);
};

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(currentLanguage);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

document.querySelectorAll("main section[id]").forEach((section) => navObserver.observe(section));

// If YouTube embed is blocked, replace this iframe behavior with a local MP4 file provided by the client.
document.querySelectorAll(".video-card").forEach((card) => {
  card.querySelector(".video-trigger")?.addEventListener("click", () => {
    const src = card.dataset.videoSrc;
    if (!src || card.classList.contains("loaded")) return;
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "CEO Center project video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    card.innerHTML = "";
    card.appendChild(iframe);
    card.classList.add("loaded");
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector("img");

const openImageLightbox = (src, alt = "Preview") => {
  if (!lightbox || !lightboxImage || !src) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
};

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    openImageLightbox(button.dataset.lightbox, button.querySelector("img")?.alt || "Preview");
  });
});

lightbox?.querySelector("button")?.addEventListener("click", () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.querySelector("button").click();
});

const floorPlanData = {
  residence: {
    titleKey: "plans.residence",
    images: [
      "assets/images/floor-plans/residence-01.jpg",
      "assets/images/floor-plans/residence-02.jpg",
      "assets/images/floor-plans/residence-03.jpg",
      "assets/images/floor-plans/residence-04.jpg",
      "assets/images/floor-plans/residence-05.jpg",
      "assets/images/floor-plans/residence-06.jpg"
    ]
  },
  hotel: {
    titleKey: "plans.hotel",
    images: [
      "assets/images/floor-plans/hotel-01.jpg",
      "assets/images/floor-plans/hotel-02.jpg",
      "assets/images/floor-plans/hotel-03.jpg"
    ]
  },
  office: {
    titleKey: "plans.office",
    images: [
      "assets/images/floor-plans/office-01.jpg",
      "assets/images/floor-plans/office-02.jpg",
      "assets/images/floor-plans/office-03.jpg",
      "assets/images/floor-plans/office-04.jpg",
      "assets/images/floor-plans/office-05.jpg",
      "assets/images/floor-plans/office-06.jpg",
      "assets/images/floor-plans/office-07.jpg"
    ]
  },
  penthouse: {
    titleKey: "plans.penthouse",
    layouts: [
      {
        label: "Penthouse Layout 01",
        image: "assets/images/plan-penthouse.jpg"
      }
    ]
  }
};

const planModal = document.getElementById("planModal");
const planModalTitle = document.getElementById("planModalTitle");
const planModalKicker = document.getElementById("planModalKicker");
const planModalGrid = document.getElementById("planModalGrid");

const closePlanModal = () => {
  planModal?.classList.remove("open");
  planModal?.setAttribute("aria-hidden", "true");
};

const openPlanModal = (category) => {
  const plan = floorPlanData[category];
  if (!plan || !planModal || !planModalTitle || !planModalGrid) return;
  const dictionary = getDictionary();
  const title = dictionary[plan.titleKey] || translations.en[plan.titleKey] || "Floor Plan";
  planModalTitle.textContent = title;
  if (planModalKicker) planModalKicker.textContent = dictionary["plans.modalKicker"] || translations.en["plans.modalKicker"];
  planModalGrid.innerHTML = "";

  const layouts = plan.layouts || plan.images.map((image, index) => ({
    image,
    label: `${title} ${String(index + 1).padStart(2, "0")}`
  }));

  layouts.forEach((layout, index) => {
    const number = String(index + 1).padStart(2, "0");
    const src = layout.image;
    const label = layout.label || `${title} ${number}`;
    const button = document.createElement("button");
    button.className = "plan-layout-card";
    button.type = "button";
    const img = document.createElement("img");
    img.src = src;
    img.alt = label;
    const caption = document.createElement("span");
    caption.textContent = label;
    button.append(img, caption);
    button.addEventListener("click", () => openImageLightbox(src, label));
    planModalGrid.appendChild(button);
  });

  planModal.classList.add("open");
  planModal.setAttribute("aria-hidden", "false");
};

document.querySelectorAll("[data-plan-category]").forEach((button) => {
  button.addEventListener("click", () => openPlanModal(button.dataset.planCategory));
});

planModal?.querySelector(".plan-modal-close")?.addEventListener("click", closePlanModal);

planModal?.addEventListener("click", (event) => {
  if (event.target === planModal) closePlanModal();
});

const buildTelegramUrl = (message) => {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
};

const quickMessage = "Hello CEO Center, I would like to ask about the project.";
document.getElementById("telegramQuick")?.setAttribute("href", buildTelegramUrl(quickMessage));
document.getElementById("footerTelegram")?.setAttribute("href", buildTelegramUrl(quickMessage));

document.getElementById("inquiryForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const message = [
    "CEO Center Inquiry",
    `Customer Name: ${data.get("name") || ""}`,
    `Phone Number: ${data.get("phone") || ""}`,
    `Interest Type: ${data.get("interest") || ""}`,
    `Message: ${data.get("message") || ""}`
  ].join("\n");

  const output = document.getElementById("formOutput");
  if (output) {
    output.classList.add("show");
    output.innerHTML = "";
    const text = document.createElement("p");
    text.textContent = message;
    const link = document.createElement("a");
    link.className = "btn btn-primary";
    link.href = buildTelegramUrl(message);
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Send in Telegram";
    output.append(text, link);
    window.open(link.href, "_blank", "noopener");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

