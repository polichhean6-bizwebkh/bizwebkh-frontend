const LOCATIONS=['Phnom Penh','Kandal','Siem Reap','Battambang','Sihanoukville','Kampot','Kep','Other'];
const TYPES=['Land','House','Villa','Condo','Apartment','Flat','Commercial','Office','Warehouse','Factory','Hotel / Guesthouse','Resort','Plantation / Farm Land','Other'];
const FEATURES=['Parking','Security','Swimming Pool','Garden','Balcony','Air Conditioning','Furnished','Electricity','Water Supply','Main Road Access','Commercial Access'];
const seedRows=[
['Courtyard villa in Sen Sok','Sale','Villa','Phnom Penh','Sen Sok',385000,320,4,5,'hero'],
['A bright city home in BKK1','Rent','Condo','Phnom Penh','BKK1',850,78,2,2,'apartment'],
['Room to grow in Siem Reap','Sale','Land','Siem Reap','Prasat Bakong',98000,1200,0,0,'land'],
['Logistics space near National Road 4','Lease','Warehouse','Kandal','Angk Snuol',2800,1200,0,2,'warehouse'],
['A new address for your business','Rent','Commercial','Phnom Penh','Toul Kork',2400,280,0,4,'office'],
['Modern family home in Chroy Changvar','Sale','House','Phnom Penh','Chroy Changvar',245000,210,4,4,'house'],
['Garden land on the edge of the city','Sale','Land','Phnom Penh','Prek Pnov',168000,800,0,0,'land'],
['Light-filled apartment near the river','Rent','Apartment','Kampot','Kampot City',450,85,2,2,'apartment'],
['Flexible office in the city centre','Lease','Office','Phnom Penh','Daun Penh',1200,110,0,2,'office'],
['A peaceful villa near the coast','Sale','Villa','Kep','Kep City',310000,380,3,4,'hero'],
['A comfortable home in Battambang','Sale','Flat','Battambang','Svay Por',89000,105,3,3,'house'],
['Furnished coastal apartment','Rent','Condo','Sihanoukville','Sangkat 4',650,65,1,1,'apartment'],
['Roadside land with open views','Lease','Land','Kandal','Ta Khmau',700,1800,0,0,'land'],
['Family house with private parking','Rent','House','Siem Reap','Sala Kamreuk',600,180,3,3,'house'],
['Commercial workspace in Sen Sok','Lease','Factory','Phnom Penh','Sen Sok',3200,1600,0,3,'warehouse'],
['Green farmland near Kampot','Sale','Plantation / Farm Land','Kampot','Tuek Chhou',145000,5000,0,0,'land']];
const SEED=seedRows.map((r,i)=>({id:'C057-'+String(1001+i),title:r[0],purpose:r[1],type:r[2],location:r[3],district:r[4],price:r[5],area:r[6],landArea:r[6],buildingArea:r[7]?Math.round(r[6]*.8):0,beds:r[7],baths:r[8],images:['assets/'+r[9]+'.jpg'],unit:r[1]==='Sale'?'Total':'Per month',floors:r[7]?2:1,parking:r[7]?2:0,year:2021,features:r[2]==='Land'?['Electricity','Water Supply','Main Road Access']:['Parking','Security','Air Conditioning',...(r[9]==='hero'?['Swimming Pool','Garden']:[])],description:`${r[0]} offers ${r[6].toLocaleString()} sqm in ${r[4]}, ${r[3]}. ${r[7]?'The practical layout includes '+r[7]+' bedrooms, comfortable living spaces and natural light throughout.':'A flexible space with convenient road access for your next project.'} Nearby local amenities make everyday access easy. Arrange a viewing to explore the space and discuss terms directly with the listing representative.`,owner:'Sokha Chea',phone:'Sample contact',email:'sokha@example.com',telegram:'',whatsapp:'',status:'Active',ownerId:i<3?'demo':'sample-'+i,created:Date.UTC(2026,8,12-i),sample:true}));
