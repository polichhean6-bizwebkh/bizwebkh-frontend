'use strict';
// CLIENT CONFIGURATION: only insert verified property contact details here.
// The quotation contains BizWeb KH's contacts, not the hotel's. Do not reuse them.
const CONFIG = Object.freeze({
  email: '', phone: '', telegramUsername: '',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kampot%2C%20Cambodia',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Kampot%2C%20Cambodia&z=12&output=embed'
});
const rooms = [
  {name:'Deluxe Double Room',kh:'បន្ទប់គ្រែធំ Deluxe',description:'A soft landing for two, with warm tones and room to unwind.',descriptionKh:'កន្លែងសម្រាកដ៏កក់ក្ដៅ សម្រាប់ការធ្វើដំណើរជាគូ។',guests:'2 guests',guestsKh:'ភ្ញៀវ ២ នាក់',bed:'1 double bed',bedKh:'គ្រែធំ ១',photos:['bedroom-double','bathroom','lounge','terrace','bedroom-warm']},
  {name:'Twin Room',kh:'បន្ទប់គ្រែតែមួយពីរ',description:'Shared adventures, a space of your own. A comfortable choice for friends.',descriptionKh:'ជម្រើសសម្រាប់មិត្តភក្តិ ដែលធ្វើដំណើរជាមួយគ្នា។',guests:'2 guests',guestsKh:'ភ្ញៀវ ២ នាក់',bed:'2 single beds',bedKh:'គ្រែតែមួយ ២',photos:['bedroom-twin','bathroom-stone','terrace','bedroom-light']},
  {name:'Family Room',kh:'បន្ទប់គ្រួសារ',description:'A welcoming place for little adventures and time together.',descriptionKh:'កន្លែងដ៏កក់ក្ដៅ សម្រាប់ចំណាយពេលជាមួយគ្រួសារ។',guests:'Up to 4 guests',guestsKh:'ភ្ញៀវរហូតដល់ ៤ នាក់',bed:'2 double beds',bedKh:'គ្រែធំ ២',photos:['bedroom-family','bathroom','lounge','courtyard']},
  {name:'Boutique Suite',kh:'បន្ទប់ស្វីត',description:'A little extra space to settle in and make the most of slow days.',descriptionKh:'កន្លែងសម្រាកដ៏ទូលាយ សម្រាប់រីករាយជាមួយថ្ងៃស្ងប់ស្ងាត់។',guests:'2 guests',guestsKh:'ភ្ញៀវ ២ នាក់',bed:'1 double bed',bedKh:'គ្រែធំ ១',photos:['bedroom-suite','bathroom-stone','lounge','terrace','bedroom-light']}
];
const photos = [
  {id:'bedroom-warm',category:'Rooms',title:'A softer start',kh:'ព្រឹកដ៏ស្រស់ស្រាយ'},
  {id:'terrace',category:'Property',title:'Tropical days',kh:'ថ្ងៃសម្រាក'},
  {id:'breakfast',category:'Breakfast',title:'Slow mornings',kh:'ព្រឹកដ៏ស្ងប់ស្ងាត់'},
  {id:'bedroom-double',category:'Rooms',title:'Room to unwind',kh:'កន្លែងសម្រាក'},
  {id:'lounge',category:'Lounge',title:'A quiet corner',kh:'ជ្រុងស្ងប់ស្ងាត់'},
  {id:'courtyard',category:'Garden',title:'Time outdoors',kh:'ពេលវេលានៅខាងក្រៅ'},
  {id:'bedroom-twin',category:'Rooms',title:'Stay together',kh:'ស្នាក់នៅជាមួយគ្នា'},
  {id:'kampot-river',category:'Kampot',title:'Along the Kampot river',kh:'មាត់ព្រែកកំពត'},
  {id:'bedroom-suite',category:'Rooms',title:'Make yourself at home',kh:'មានអារម្មណ៍ដូចនៅផ្ទះ'},
  {id:'kampot-town',category:'Kampot',title:'The charm of Kampot',kh:'ភាពទាក់ទាញនៃកំពត'},
  {id:'bathroom',category:'Rooms',title:'The little details',kh:'ភាពលម្អិតតូចៗ'},
  {id:'kampot-pepper',category:'Kampot',title:'A taste of the region',kh:'រសជាតិក្នុងតំបន់'}
];
const destinations = [
  {id:'kampot-river',name:'Kampot Riverside',kh:'មាត់ព្រែកកំពត',description:'Watch the light change and take the day as it comes.',descriptionKh:'គយគន់ទេសភាព និងរីករាយជាមួយខ្យល់បរិសុទ្ធ។'},
  {id:'kampot-bokor',name:'Bokor National Park',kh:'ឧទ្យានជាតិបូកគោ',description:'Green hills, mountain air, and a different perspective.',descriptionKh:'ភ្នំបៃតង ខ្យល់ត្រជាក់ និងទេសភាពដ៏ស្រស់ស្អាត។'},
  {id:'kampot-town',name:'Kampot Old Town',kh:'ក្រុងកំពត',description:'Colourful streets, local cafés, and everyday stories.',descriptionKh:'ផ្លូវដ៏ទាក់ទាញ ហាងកាហ្វេ និងជីវិតប្រចាំថ្ងៃ។'},
  {id:'kampot-salt',name:'The Salt Fields',kh:'ស្រែអំបិល',description:'Open skies above one of Kampot’s working landscapes.',descriptionKh:'ផ្ទៃមេឃធំទូលាយ និងទេសភាពស្រែអំបិលកំពត។'},
  {id:'kampot-pepper',name:'Pepper Farms',kh:'ចម្ការម្រេច',description:'Discover a flavour that is part of Kampot’s identity.',descriptionKh:'ស្វែងយល់ពីរសជាតិម្រេចដ៏ល្បីរបស់កំពត។'}
];
const categories = {All:'ទាំងអស់',Rooms:'បន្ទប់',Property:'បរិយាកាស',Garden:'សួនច្បារ',Breakfast:'អាហារពេលព្រឹក',Lounge:'កន្លែងសម្រាក',Kampot:'កំពត'};
const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => [...root.querySelectorAll(s)];
let language = 'en', activeCategory = 'All', currentGallery = [], currentIndex = 0, activeRoom = null, returnFocus = null;
const t = (en,kh) => language === 'km' ? kh : en;
const img = (id,alt,size='800') => `<img src="assets/images/${id}-${size}.webp" srcset="assets/images/${id}-400.webp 400w, assets/images/${id}-800.webp 800w, assets/images/${id}.webp 1600w" sizes="(max-width:700px) 90vw, (max-width:980px) 44vw, 26vw" width="800" height="600" loading="lazy" alt="${alt}">`;

function renderRooms(){
  $('#rooms-grid').innerHTML=rooms.map((r,i)=>`<article class="room-card"><button class="room-image" data-view-room="${i}" aria-label="${t('View','មើល')} ${t(r.name,r.kh)}">${img(r.photos[0],t(r.name,r.kh))}<span class="room-number">0${i+1}</span><span class="photo-label">▧ &nbsp; ${r.photos.length} ${t('photos','រូបភាព')}</span></button><div class="room-info"><h3>${t(r.name,r.kh)}</h3><p>${t(r.description,r.descriptionKh)}</p><div class="room-spec"><span>♧ &nbsp; ${t(r.guests,r.guestsKh)}</span><span>▱ &nbsp; ${t(r.bed,r.bedKh)}</span></div><div class="room-actions"><button data-view-room="${i}">${t('View room','មើលបន្ទប់')} &nbsp; ↗</button><button data-inquire="${i}">${t('Inquire','សាកសួរ')} →</button></div></div></article>`).join('');
}
function renderGallery(){
  $('#gallery-filters').innerHTML=Object.entries(categories).map(([en,kh])=>`<button data-category="${en}" aria-pressed="${en===activeCategory}">${t(en,kh)}</button>`).join('');
  const list=activeCategory==='All'?photos:photos.filter(p=>p.category===activeCategory);
  $('#gallery-grid').classList.toggle('filtered',activeCategory!=='All');
  $('#gallery-grid').innerHTML=list.map(p=>`<button class="gallery-item" data-photo="${p.id}" aria-label="${t('Enlarge','មើលរូបភាព')} ${t(p.title,p.kh)}">${img(p.id,t(p.title,p.kh))}<span>${t(p.title,p.kh)}</span></button>`).join('');
}
function renderDestinations(){
  $('#destination-grid').innerHTML=destinations.map((p,i)=>`<article class="destination-card"><button data-destination="${i}" aria-label="${t('View','មើល')} ${t(p.name,p.kh)}">${img(p.id,t(p.name,p.kh))}</button><h3><span class="place-no">0${i+1} / ${t('DISCOVER','ស្វែងយល់')}</span>${t(p.name,p.kh)}</h3><p>${t(p.description,p.descriptionKh)}</p></article>`).join('');
}
function setLanguage(lang){
  language=lang; document.documentElement.lang=lang;
  $$('[data-kh]').forEach(el=>{if(!el.dataset.en) el.dataset.en=el.innerHTML;el.innerHTML=lang==='km'?el.dataset.kh:el.dataset.en;});
  $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
  document.title=t('Kampot Haven Boutique | A Peaceful Stay in Kampot, Cambodia','Kampot Haven Boutique | ស្នាក់នៅខេត្តកំពត ប្រទេសកម្ពុជា');
  $('.menu-toggle').setAttribute('aria-label',t('Toggle navigation','បើកឬបិទម៉ឺនុយ'));
  renderRooms(); renderGallery(); renderDestinations();
  try{localStorage.setItem('kampot-language',lang);}catch{}
}
function roomInquiry(index){
  $('#room-select').value=rooms[index].name;
  if($('#photo-dialog').open) $('#photo-dialog').close();
  location.hash='contact';
  setTimeout(()=>$('#inquiry-form input[name=name]').focus({preventScroll:true}),250);
}
function openGallery(items,index,title,description,room=null){
  currentGallery=items; currentIndex=index; activeRoom=room; returnFocus=document.activeElement;
  $('#dialog-title').textContent=title; $('#dialog-description').textContent=description;
  $('#dialog-inquire').hidden=room===null;
  $('#dialog-kicker').textContent=t('A CLOSER LOOK','មើលកាន់តែច្បាស់');
  $('.close-dialog').setAttribute('aria-label',t('Close gallery','បិទរូបភាព'));
  $('.prev').setAttribute('aria-label',t('Previous photo','រូបភាពមុន'));
  $('.next').setAttribute('aria-label',t('Next photo','រូបភាពបន្ទាប់'));
  $('#photo-thumbnails').innerHTML=items.map((p,i)=>`<button data-slide="${i}" aria-label="${t('Photo','រូបភាព')} ${i+1}"><img src="assets/images/${p.id}-400.webp" alt="" width="100" height="70"></button>`).join('');
  updatePhoto(); $('#photo-dialog').showModal(); document.body.style.overflow='hidden';
}
function updatePhoto(){
  const p=currentGallery[currentIndex];
  $('#dialog-image').src=`assets/images/${p.id}.webp`; $('#dialog-image').alt=p.title;
  $('#photo-counter').textContent=`${currentIndex+1} / ${currentGallery.length}`;
  $$('#photo-thumbnails button').forEach((b,i)=>b.setAttribute('aria-current',String(i===currentIndex)));
  const next=new Image();next.src=`assets/images/${currentGallery[(currentIndex+1)%currentGallery.length].id}.webp`;
}
function movePhoto(delta){currentIndex=(currentIndex+delta+currentGallery.length)%currentGallery.length; updatePhoto();}
document.addEventListener('click',event=>{
  const el=event.target.closest('button,a');if(!el)return;
  if(el.dataset.lang){setLanguage(el.dataset.lang);return;}
  if(el.dataset.viewRoom!==undefined){const i=Number(el.dataset.viewRoom),r=rooms[i];openGallery(r.photos.map((id,n)=>({id,title:`${t(r.name,r.kh)} · ${t('Photo','រូបភាព')} ${n+1}`})),0,t(r.name,r.kh),t(r.description,r.descriptionKh),i);}
  if(el.dataset.inquire!==undefined)roomInquiry(Number(el.dataset.inquire));
  if(el.dataset.category){activeCategory=el.dataset.category;renderGallery();$(`[data-category="${activeCategory}"]`).focus({preventScroll:true});}
  if(el.dataset.photo){const list=(activeCategory==='All'?photos:photos.filter(p=>p.category===activeCategory)).map(p=>({id:p.id,title:t(p.title,p.kh)}));openGallery(list,list.findIndex(p=>p.id===el.dataset.photo),t('Life around the boutique','រូបភាពជុំវិញកន្លែងស្នាក់នៅ'),t('A collection of quiet moments.','រូបភាពនៃពេលវេលាស្ងប់ស្ងាត់។'));}
  if(el.dataset.destination!==undefined){const i=Number(el.dataset.destination),p=destinations[i];openGallery(destinations.map(p=>({id:p.id,title:t(p.name,p.kh)})),i,t('Discover Kampot','ស្វែងយល់ពីកំពត'),t(p.description,p.descriptionKh));}
  if(el.dataset.slide!==undefined){currentIndex=Number(el.dataset.slide);updatePhoto();}
  if(el.matches('nav a')){$('#navigation').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');}
  if(el.dataset.contact && !contactUrl(el.dataset.contact)){event.preventDefault();location.hash='contact';showToast(t('Direct contact details will be available soon. You can prepare your inquiry below.','ព័ត៌មានទំនាក់ទំនងនឹងមាននៅពេលក្រោយ។ អ្នកអាចរៀបចំសារសាកសួរខាងក្រោម។'));}
});
$('.menu-toggle').addEventListener('click',()=>{const open=$('#navigation').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(open));});
$('.close-dialog').addEventListener('click',()=>$('#photo-dialog').close());
$('#photo-dialog').addEventListener('close',()=>{document.body.style.overflow='';returnFocus?.focus({preventScroll:true});});
$('#photo-dialog').addEventListener('click',e=>{if(e.target===$('#photo-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('.prev').addEventListener('click',()=>movePhoto(-1));$('.next').addEventListener('click',()=>movePhoto(1));
document.addEventListener('keydown',e=>{if($('#photo-dialog').open){if(e.key==='ArrowLeft'){e.preventDefault();movePhoto(-1);}if(e.key==='ArrowRight'){e.preventDefault();movePhoto(1);}}else if(e.key==='Escape'){$('#navigation').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');}});
let touchStart=null;
$('.photo-stage').addEventListener('touchstart',e=>{touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};},{passive:true});
$('.photo-stage').addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))movePhoto(dx<0?1:-1);touchStart=null;},{passive:true});
$('#dialog-inquire').addEventListener('click',()=>{if(activeRoom!==null)roomInquiry(activeRoom);});
function contactUrl(method){if(method==='email'&&CONFIG.email)return `mailto:${CONFIG.email}`;if(method==='telegram'&&CONFIG.telegramUsername)return `https://t.me/${CONFIG.telegramUsername.replace(/^@/,'')}`;if(method==='phone'&&CONFIG.phone)return `tel:${CONFIG.phone.replace(/\s/g,'')}`;return '';}
$$('[data-contact]').forEach(a=>{const url=contactUrl(a.dataset.contact);if(url)a.href=url;});
$$('.map-link').forEach(a=>a.href=CONFIG.mapsUrl);$('#load-map').addEventListener('click',()=>{const frame=$('#location-map');frame.src=CONFIG.mapEmbedUrl;frame.hidden=false;$('.map-preview').hidden=true;});
const form=$('#inquiry-form'), checkin=form.elements.checkin, checkout=form.elements.checkout;
function localDate(date){const d=new Date(date.getTime()-date.getTimezoneOffset()*60000);return d.toISOString().slice(0,10);}
checkin.min=localDate(new Date());checkout.min=checkin.min;
function validateDates(){checkout.setCustomValidity('');if(checkin.value){const next=new Date(checkin.value+'T12:00:00');next.setDate(next.getDate()+1);checkout.min=localDate(next);}if(checkout.value&&checkin.value&&checkout.value<=checkin.value)checkout.setCustomValidity(t('Check-out must be after check-in.','ថ្ងៃចាកចេញត្រូវនៅក្រោយថ្ងៃចូលស្នាក់នៅ។'));}
checkin.addEventListener('change',validateDates);checkout.addEventListener('change',validateDates);
form.addEventListener('input',()=>{$('#inquiry-result').hidden=true;});
form.addEventListener('submit',e=>{
  e.preventDefault();validateDates();if(!form.reportValidity())return;
  const d=Object.fromEntries(new FormData(form));
  const message=[t('Stay inquiry — Kampot Haven Boutique','សាកសួរការស្នាក់នៅ — Kampot Haven Boutique'),' ',`${t('Name','ឈ្មោះ')}: ${d.name.trim()}`,`${t('Email','អ៊ីមែល')}: ${d.email.trim()}`,`${t('Phone / Telegram','ទូរស័ព្ទ / Telegram')}: ${d.phone.trim()||'—'}`,`${t('Country','ប្រទេស')}: ${d.country.trim()||'—'}`,`${t('Check-in','ថ្ងៃចូល')}: ${d.checkin}`,`${t('Check-out','ថ្ងៃចេញ')}: ${d.checkout}`,`${t('Guests','ចំនួនភ្ញៀវ')}: ${d.guests}`,`${t('Room interest','បន្ទប់ដែលចាប់អារម្មណ៍')}: ${d.room}`,`${t('Preferred contact','មធ្យោបាយទំនាក់ទំនង')}: ${d.method}`,`\n${t('Message','សារ')}: ${d.message.trim()||'—'}`,`\n${t('Please let me know the availability, rates, and exact property location.','សូមប្រាប់អំពីបន្ទប់ទំនេរ តម្លៃ និងទីតាំងជាក់លាក់។')}`].join('\n');
  $('#prepared-message').value=message;$('#inquiry-result').hidden=false;
  const url=contactUrl(d.method),link=$('#open-contact');link.hidden=!url;
  if(url){
    link.href=d.method==='email'?`${url}?subject=${encodeURIComponent('Stay inquiry — '+d.checkin)}&body=${encodeURIComponent(message)}`:`${url}?text=${encodeURIComponent(message)}`;
    link.textContent=t(`Open ${d.method==='email'?'email app':'Telegram'} ↗`,d.method==='email'?'បើកអ៊ីមែល ↗':'បើក Telegram ↗');
    $('#inquiry-status').textContent=t('Your message is ready. Open your contact app below and send it there. Nothing has been sent from this website.','សាររបស់អ្នករួចរាល់។ សូមបើកកម្មវិធីទំនាក់ទំនងខាងក្រោម ដើម្បីផ្ញើ។ គេហទំព័រនេះមិនទាន់ផ្ញើសារទេ។');
  }else{
    $('#inquiry-status').textContent=t('Your message is ready to copy. The property’s direct contact details are not available yet. Nothing has been sent, and no reservation has been made.','សាររបស់អ្នករួចរាល់សម្រាប់ចម្លង។ ព័ត៌មានទំនាក់ទំនងផ្ទាល់មិនទាន់មានទេ។ មិនមានសារណាមួយត្រូវបានផ្ញើ ឬការកក់ត្រូវបានធ្វើឡើយ។');
  }
  $('#inquiry-result').scrollIntoView({behavior:'smooth',block:'nearest'});
});
let toastTimer;
function showToast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,6000);}
$('#copy-message').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#prepared-message').value);showToast(t('Message copied. Nothing has been sent.','បានចម្លងសារ។ មិនទាន់បានផ្ញើទេ។'));}catch{$('#prepared-message').focus();$('#prepared-message').select();showToast(t('Select and copy the prepared message.','សូមជ្រើសរើស និងចម្លងសារ។'));}});
$('#year').textContent=new Date().getFullYear();
let saved='en';try{saved=localStorage.getItem('kampot-language')||'en';}catch{}
setLanguage(saved==='km'?'km':'en');
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.1});$$('.reveal').forEach(el=>{el.classList.add('js-reveal');observer.observe(el);});}
