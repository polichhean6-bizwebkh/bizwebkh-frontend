/* Temporary presentation brand, logo, colors and content. Replace after client confirmation.
   Local demonstration only: no database, authentication, payment or external API. */
const DB = (() => {
 const key='brew-bite-c064-v1';
 const categories=['Coffee','Iced Coffee','Tea','Smoothies','Soft Drinks','Breakfast','Bakery','Snacks','Main Food'];
 const rows=[['Iced Latte','Iced Coffee',2.75,'iced','Our signature espresso, silky milk and ice. A beautifully balanced everyday favorite.'],['Hot Latte','Coffee',2.75,'latte','Rich espresso folded into steamed milk with a soft microfoam finish.'],['Butter Croissant','Bakery',2,'bakery','Golden, flaky layers of buttery pastry, baked fresh each morning.'],['Iced Americano','Iced Coffee',2.25,'americano','A double shot of espresso poured over chilled water and ice.'],['Caramel Macchiato','Iced Coffee',3.50,'iced','Espresso and vanilla milk, finished with a ribbon of caramel.'],['Cappuccino','Coffee',2.75,'latte','Equal parts espresso, steamed milk and velvety foam.'],['Matcha Latte','Tea',3.25,'matcha','Earthy green tea whisked smooth and served with chilled milk.'],['Lemon Tea','Tea',2.25,'tea','Bright black tea with fresh lemon and a touch of sweetness.'],['Passion Smoothie','Smoothies',3.50,'smoothie','Tropical passion fruit blended with ice for a tangy refresh.'],['Sparkling Lime','Soft Drinks',1.75,'tea','Bubbly soda with fresh lime, served over ice.'],['Avocado Toast','Breakfast',4.50,'toast','Smashed avocado on sourdough with tomato and toasted seeds.'],['Club Sandwich','Snacks',4.75,'sandwich','Toasted bread layered with chicken, lettuce and tomato.'],['Vegetable Fried Rice','Main Food',4.50,'rice','Wok-tossed rice with garden vegetables and a fried egg.'],['Chicken Pasta','Main Food',5.50,'pasta','Tender chicken and pasta in a comforting tomato sauce.']];
 const seed=()=>({products:rows.map((r,i)=>({id:'p'+i,name:r[0],category:r[1],price:r[2],image:'../assets/images/'+r[3]+'.jpg',description:r[4],drink:i<2||i>2&&i<10,active:true,soldOut:false,sizes:true,sugar:true,ice:i!==1&&i!==5,extras:true})),categories:categories.map(name=>({name,active:true})),orders:[{id:'BB-1042',customer:'Sophea Chan',phone:'012 345 678',type:'Pick Up',payment:'Cash',status:'New',created:new Date().toISOString(),items:[{name:'Iced Latte',qty:2,price:2.75,options:'Regular · 50% sugar · Normal Ice'},{name:'Butter Croissant',qty:1,price:2,options:''}],total:7.50,fee:0,note:'Less sweet please.'},{id:'BB-1041',customer:'Dara Sok',phone:'015 246 810',type:'Delivery',address:'Street 240, Phnom Penh',landmark:'Near the bookshop',payment:'KHQR (simulated)',status:'Preparing',created:new Date(Date.now()-900000).toISOString(),items:[{name:'Caramel Macchiato',qty:1,price:3.5,options:'Regular · 50% sugar · Normal Ice'},{name:'Club Sandwich',qty:1,price:4.75,options:''}],total:9.75,fee:1.5,note:'Call when arriving.'},{id:'BB-1040',customer:'Lina Kim',phone:'016 112 233',type:'Pick Up',payment:'Cash',status:'Ready',created:new Date(Date.now()-1600000).toISOString(),items:[{name:'Hot Latte',qty:1,price:2.75,options:'Regular · 50% sugar'}],total:2.75,fee:0,note:''}],promotions:[{id:'promo1',name:'Morning Coffee',discount:10,start:'2026-10-01',end:'2026-10-31',active:true}],settings:{name:'Brew & Bite Café',phone:'023 456 789',address:'Street 240, Phnom Penh',hours:'Every day · 7:00 AM – 8:00 PM',currency:'USD',pickup:true,delivery:true,fee:1.5,logo:''}});
 let state;try{state=JSON.parse(localStorage.getItem(key))||seed()}catch{state=seed()}
 // Add the two fixed banner slots to existing demo storage without resetting orders or menu edits.
 const bannerDefaults=[
  {id:'promotion',type:'Promotion',title:'10% OFF MORNING COFFEE',description:'Enjoy selected coffee before 10:00 AM.',image:'../assets/images/hero.jpg',cta:'View Promotion',target:'category:Coffee',active:true},
  {id:'new-drink',type:'New Drink',title:'New Arrival – Matcha Latte',description:'Fresh matcha and creamy milk, chilled for a refreshing new favorite.',image:'../assets/images/matcha.jpg',cta:'Try New Drink',target:'product:p6',active:true}
 ];
 function migrateBanners(){
  state.banners=bannerDefaults.map(d=>({...d,...(Array.isArray(state.banners)?state.banners.find(b=>b.id===d.id):null),id:d.id,type:d.type}));
  if(!state.bannerHeadlineVersion){
   const promotion=state.banners.find(b=>b.id==='promotion');
   // Upgrade only the original sample copy; keep custom admin promotions intact.
   if(promotion.title==='Morning Coffee Deal'){
    promotion.title=bannerDefaults[0].title;
    if(promotion.description==='Enjoy 10% off selected coffee before 10:00 AM.')promotion.description=bannerDefaults[0].description;
   }
   state.bannerHeadlineVersion=1;
  }
 }
 migrateBanners();
 return {get:()=>state,save:()=>{try{localStorage.setItem(key,JSON.stringify(state));return true}catch{toast('Browser storage is full or unavailable. Changes may not persist.');return false}},reload:()=>{try{state=JSON.parse(localStorage.getItem(key))||state;migrateBanners()}catch{}},key};
})();
const $=s=>document.querySelector(s), money=n=>'$'+Number(n).toFixed(2), esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={bag:'<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',cup:'<path d="M4 8h13v7a6 6 0 0 1-12 0V8m13 1h2a3 3 0 0 1 0 6h-2M4 22h14M8 2v3m5-3v3"/>',chart:'<path d="M4 3v18h18M8 17v-5m5 5V7m5 10V4"/>',settings:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',tag:'<path d="M3 3h9l9 9-9 9-9-9V3Z"/><circle cx="8" cy="8" r="1"/>',arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>'};
function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.grid}</svg>`}
function brand(){return `<a class="brand" href="../index.html"><img src="${esc(DB.get().settings.logo||'../assets/favicon.svg')}" alt="">${esc(DB.get().settings.name)}<span>COFFEE & GOOD COMPANY</span></a>`}
let toastTimer;function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3200)}
function showModal(content){$('#modal').innerHTML=`<button class="close" aria-label="Close dialog" onclick="closeModal()">×</button>${content}`;if(!$('#modal').open)$('#modal').showModal()}
function closeModal(){$('#modal').close()}
document.addEventListener('click',e=>{if(e.target===$('#modal')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal()}});
const statusClass=s=>s.toLowerCase().replaceAll(' ','-');
const orderSteps=o=>o.type==='Delivery'?['New','Preparing','Ready','Out for Delivery','Delivered']:['New','Preparing','Ready','Completed'];
const statusLabel=(s,type)=>s==='New'?'Order Received':s==='Ready'&&type==='Delivery'?'Ready for Delivery':s;

