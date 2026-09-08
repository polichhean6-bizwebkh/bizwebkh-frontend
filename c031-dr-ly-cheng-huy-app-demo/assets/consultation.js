/* Frontend-only consultation state. Deliberately memory-only: no patient data is persisted. */
var consultation = { draft:null, appointments:[], selected:null, tab:'upcoming', video:{app:false,telegram:false}, sequence:0 };
var consultationMethods = { app:'On-App Consulting', telegram:'Telegram Consulting' };
var consultationSteps = { app:['Payment Required','Paid','Confirmed','Scheduled','Completed'], telegram:['Requested','Awaiting Payment','Payment Confirmed','Consultation Scheduled','Completed'] };
var manualPaymentText = 'Payment will be arranged manually via Telegram before the consultation starts.';
function flowEscape(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function(c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function flowIcon(name) {
  if(name==='telegram') return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.8 3.4 3.1 10.2c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.1c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.2-2.2 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.2c.3-1.2-.5-1.8-1.4-1.3ZM9 12.8 19.4 6.2c.5-.3.9-.1.5.3l-8.6 7.8-.3 3.2-2-4.7Z"/></svg>';
  var paths = { app:'<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9H13a8.5 8.5 0 0 1 8 8v.5Z"/>', telegram:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>', video:'<rect x="3" y="6" width="12" height="12" rx="3"/><path d="m15 10 6-3v10l-6-3"/>', check:'<path d="m5 12 4 4L19 6"/>' };
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>';
}
function flowRow(label,value) { return '<div class="summary-row"><span class="s-label">'+flowEscape(label)+'</span><span class="s-val">'+flowEscape(value)+'</span></div>'; }
function flowButton(label,action,style) { return '<button type="button" class="'+(style || 'btn-primary')+'" onclick="'+action+'">'+label+'</button>'; }
function flowContent(id,html) { document.querySelector('#'+id+' .screen-content').innerHTML=html; }
function flowDate(value) { return new Date(value+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}); }
function flowToday() { return new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Phnom_Penh',year:'numeric',month:'2-digit',day:'2-digit'}); }
function flowToggle(method,value,draft) {
  return '<button type="button" class="video-row" role="switch" aria-label="Add Video Call'+(draft?'':' — '+consultationMethods[method])+'" aria-checked="'+value+'" onclick="flowToggleVideo(\''+method+'\','+!!draft+',this)">'+flowIcon('video')+'<span class="video-copy"><strong>Add Video Call</strong><small>Add face-to-face video consultation</small></span><span class="switch-word">'+(value?'ON':'OFF')+'</span><span class="switch-track"></span></button>';
}
function flowToggleVideo(method,draft,el) {
  var value=el.getAttribute('aria-checked')!=='true';
  if(draft) consultation.draft.video=value; else consultation.video[method]=value;
  el.setAttribute('aria-checked',String(value)); el.querySelector('.switch-word').textContent=value?'ON':'OFF';
  if(draft) document.getElementById('flow-video-description').textContent=value?'Video Call: Yes':'Video Call: No — chat consultation';
}
function renderConsultationMethods() {
  flowContent('screen-online-consulting','<p class="flow-lead">Choose how you would like to consult with Dr. Ly Cheng Huy.</p>'+['app','telegram'].map(function(method) {
    var app=method==='app';
    return '<section class="method-card channel-card"><span class="flow-icon '+method+'">'+flowIcon(method)+'</span><h2>'+consultationMethods[method]+'</h2><p>'+(app?'Consult directly inside the app.':'Consult with Dr. Ly Cheng Huy through Telegram.')+'</p>'+flowButton('View Details <span aria-hidden="true">→</span>',"showScreen('screen-"+method+"-consulting-detail')",'btn-secondary')+'</section>';
  }).join(''));
}
function renderConsultationMethodDetail(method) {
  var app=method==='app';
  flowContent('screen-'+method+'-consulting-detail','<div class="method-head"><span class="flow-icon '+method+'">'+flowIcon(method)+'</span><div><h2>'+consultationMethods[method]+'</h2><p>About this consultation</p></div></div><p class="flow-lead">'+(app?'Consult directly with Dr. Ly Cheng Huy inside the app.':'Consult with Dr. Ly Cheng Huy through Telegram.')+'</p><section class="method-card detail-options"><h2>Consultation options</h2>'+flowToggle(method,consultation.video[method],false)+'<p class="flow-demo">'+(app?'Turn on video for a face-to-face consultation.':'Turn on video if you prefer a Telegram video consultation.')+'</p></section><section class="method-card detail-payment"><h2>Payment</h2><p>'+(app?'Instant payment via KHQR':'Payment arranged manually via Telegram before consultation.')+'</p><h3>Booking confirmation</h3><p>'+(app?'Confirmed after successful payment.':'Confirmed after payment verification.')+'</p><div class="detail-fee"><span>Consultation Fee</span><strong>$15.00</strong></div></section>'+flowButton(app?'Book On-App Consultation':'Request Telegram Consultation',"startGuestBookingWithType('"+method+"')")+'<p class="flow-demo">No account needed · Demo fee, with or without video.</p>');
}
function startGuestBooking() { showScreen('screen-online-consulting'); }
function startGuestBookingWithType(type) {
  var method=/telegram/i.test(type)?'telegram':'app';
  if(consultation.draft && consultation.draft.method===method && !consultation.appointments.some(function(a){return a.ref===consultation.draft.ref;})) {
    consultation.draft.video=consultation.video[method]; consultation.draft.step=1; showScreen('screen-book-consultation'); return;
  }
  consultation.draft={method:method,video:consultation.video[method],date:flowToday(),time:'',name:'',phone:'',email:'',telegram:'',note:'',step:1,ref:null,payment:method==='app'?'Payment Required':'Not paid',status:method==='app'?'Payment Required':'Not submitted'};
  showScreen('screen-book-consultation');
}
function flowSaveFields() {
  var d=consultation.draft;
  ['date','time','name','phone','email','telegram','note'].forEach(function(key) { var el=document.getElementById('flow-'+key); if(el) d[key]=el.value.trim(); });
}
function flowField(key,label,type,required) {
  var d=consultation.draft;
  return '<div class="field-group"><label class="field-label" for="flow-'+key+'">'+label+'</label><input class="field-input" id="flow-'+key+'" type="'+type+'" '+(required?'required ':'')+(type==='date'?'min="'+flowToday()+'" ':'')+'value="'+flowEscape(d[key])+'"></div>';
}
function renderBooking() {
  var d=consultation.draft; if(!d) return;
  var app=d.method==='app';
  var html='<div class="flow-step">Step '+d.step+' of 3 · '+['Date & time','Contact details','Review'][d.step-1]+'</div><h1 class="flow-heading">'+consultationMethods[d.method]+'</h1>';
  if(d.step===1) {
    html+='<p class="flow-lead">'+(app?'Choose your consultation date and time.':'Choose a preferred time. The team will verify availability via Telegram.')+'</p>'+'<p class="flow-demo" id="flow-video-description">'+(d.video?'Video Call: Yes':'Video Call: No — chat consultation')+'</p><form id="flow-form" onsubmit="event.preventDefault();bookNext()">'+flowField('date',app?'Date':'Preferred Date','date',true)+'<label class="field-label" for="flow-time">'+(app?'Time':'Preferred Time')+' · Cambodia (UTC+7)</label><select class="field-input" id="flow-time" required><option value="">Select a time</option>'+['9:00 AM','9:30 AM','10:30 AM','1:00 PM','3:00 PM','4:00 PM'].map(function(t){return '<option '+(d.time===t?'selected ':'')+'>'+t+'</option>';}).join('')+'</select><p class="flow-demo">30-minute session · Demo availability</p><p id="flow-error" class="flow-error" role="alert"></p><button class="btn-primary" type="submit">Continue</button></form>';
  } else if(d.step===2) {
    html+='<p class="flow-lead">Guest booking — provide your contact details. No account creation required.</p><form id="flow-form" onsubmit="event.preventDefault();bookNext()">'+flowField('name','Full Name','text',true)+flowField('phone','Phone Number','tel',true)+flowField('email','Email (optional)','email',false)+(app?'':flowField('telegram','Telegram Username / Phone','text',true))+'<div class="field-group"><label class="field-label" for="flow-note">Brief Reason / Consultation Note</label><textarea class="field-input" id="flow-note" required maxlength="1000">'+flowEscape(d.note)+'</textarea></div><p id="flow-error" class="flow-error" role="alert"></p><button class="btn-primary" type="submit">Review '+(app?'Consultation':'Request')+'</button></form>';
  } else {
    html+='<p class="flow-lead">'+(app?'Review your details. Payment is required to confirm this booking.':'Review your request. Your preferred slot is subject to confirmation.')+'</p>'+flowSummary(d,true)+'<div class="payment-note '+d.method+'">'+(app?'Pay $15.00 now using demo KHQR. Booking becomes confirmed only after payment success.':manualPaymentText)+'</div>'+flowBadges(d)+flowButton(app?'Pay Now · $15.00':'Submit Consultation Request','goToPayment()');
  }
  flowContent('screen-book-consultation',html);
}
function bookGoStep(step) { if(consultation.draft) { consultation.draft.step=Math.min(3,Math.max(1,step)); renderBooking(); } }
function bookNext() {
  var form=document.getElementById('flow-form'); if(form && !form.reportValidity()) return;
  flowSaveFields(); var d=consultation.draft;
  var error='';
  if(d.step===1 && (!d.date || d.date<flowToday() || !d.time)) error='Choose a current or future date and an available time.';
  if(d.step===1 && !error && flowSlotDate(d)<=new Date()) error='This time has already passed. Please choose a later date or time.';
  if(d.step===2 && (!d.name || d.phone.replace(/\D/g,'').length<7 || !d.note || (d.method==='telegram' && !d.telegram))) error='Enter your name, a valid phone number, consultation note'+(d.method==='telegram'?' and Telegram username or phone.':'.');
  if(error) { document.getElementById('flow-error').textContent=error; return; }
  bookGoStep(d.step+1); document.querySelector('#screen-book-consultation .screen-scroll').scrollTop=0;
}
function flowSlotDate(d) { var parts=d.time.match(/(\d+):(\d+) (AM|PM)/); if(!parts) return new Date(NaN); return new Date(d.date+'T'+String((+parts[1]%12)+(parts[3]==='PM'?12:0)).padStart(2,'0')+':'+parts[2]+':00+07:00'); }
function bookBack() { if(!consultation.draft) showScreen('screen-online-consulting'); else if(consultation.draft.step===1) { flowSaveFields(); consultation.video[consultation.draft.method]=consultation.draft.video; showScreen('screen-'+consultation.draft.method+'-consulting-detail'); } else { flowSaveFields(); bookGoStep(consultation.draft.step-1); } }
function flowSummary(d,contact) {
  return '<div class="card">'+flowRow('Consultation Method',consultationMethods[d.method])+flowRow('Video Call',d.video?'Yes':'No')+flowRow(d.method==='telegram'?'Preferred Date':'Date',flowDate(d.date))+flowRow('Time',d.time+' · UTC+7')+flowRow('Consultation Fee','$15.00')+flowRow('Total','$15.00')+(contact?flowRow('Name',d.name)+flowRow('Phone',d.phone)+(d.email?flowRow('Email',d.email):'')+(d.method==='telegram'?flowRow('Telegram',d.telegram):'')+flowRow('Consultation Note',d.note):'')+'</div>';
}
function flowBadges(d) { return '<div class="flow-badges"><span class="flow-badge '+(/Required|Awaiting/.test(d.payment)?'pending':'')+'">'+flowEscape(d.payment)+'</span><span class="flow-badge '+(/Requested|Awaiting/.test(d.status)?'pending':'')+'">'+flowEscape(d.status)+'</span></div>'; }
function currentBookingRef() { var d=consultation.draft; if(!d.ref) d.ref='DLC-'+(d.method==='app'?'APP':'TG')+'-'+d.date.replaceAll('-','')+'-'+String(++consultation.sequence).padStart(3,'0'); return d.ref; }
function goToPayment() {
  var d=consultation.draft; if(!d || d.step!==3) return;
  if(d.method==='telegram') {
    d.payment='Awaiting Payment'; d.status='Requested'; currentBookingRef(); flowStoreBooking(); showScreen('screen-booking-success');
  } else { currentBookingRef(); showScreen('screen-khqr'); }
}
function openKhqr() { goToPayment(); }
function flowQrPlaceholder() {
  var cells=''; for(var y=0;y<25;y++) for(var x=0;x<25;x++) {
    if((x<8&&y<8)||(x>16&&y<8)||(x<8&&y>16)) continue;
    if((x*7+y*11+x*y)%5<2) cells+='<rect x="'+(x+2)+'" y="'+(y+2)+'" width="1" height="1"/>';
  }
  return '<svg viewBox="0 0 29 29" role="img" aria-label="Decorative demo QR placeholder, not scannable"><rect width="29" height="29" fill="white"/><g fill="#14213d">'+cells+[ [2,2],[20,2],[2,20] ].map(function(p){return '<rect x="'+p[0]+'" y="'+p[1]+'" width="7" height="7"/><rect x="'+(p[0]+1)+'" y="'+(p[1]+1)+'" width="5" height="5" fill="white"/><rect x="'+(p[0]+2)+'" y="'+(p[1]+2)+'" width="3" height="3"/>';}).join('')+'</g><rect x="6" y="11" width="17" height="7" fill="white"/><text x="14.5" y="15.5" text-anchor="middle" font-family="sans-serif" font-size="3" font-weight="bold" fill="#e32736">DEMO</text></svg>';
}
function renderKhqr() {
  var d=consultation.draft;
  flowContent('screen-khqr','<div class="flow-step">Payment required</div><h1 class="flow-heading">Pay with KHQR</h1><p class="flow-lead">Complete demo payment to confirm your on-app consultation.</p>'+flowSummary(d,false)+'<div class="qr-card"><div class="qr-banner">KHQR</div><div class="qr-body"><p>Dr Ly Cheng Huy · Demo merchant</p><strong>$15.00 <small>USD</small></strong>'+flowQrPlaceholder()+'<p>QR placeholder · Not scannable<br>No money will be transferred.</p></div></div>'+flowRow('Booking Reference',currentBookingRef())+'<p class="flow-demo">Demo only. “I Have Paid” simulates a successful payment; no banking service is connected.</p>'+flowButton('I Have Paid / Confirm Payment','simulatePayment()')+flowButton('Back to Review',"showScreen('screen-book-consultation')",'btn-ghost'));
}
function flowStoreBooking() {
  var d=consultation.draft; if(!consultation.appointments.some(function(a){return a.ref===d.ref;})) consultation.appointments.unshift(Object.assign({},d));
  consultation.selected=d.ref; consultation.tab='upcoming';
}
function simulatePayment() {
  var d=consultation.draft;
  if(!d || d.method!=='app' || !d.ref || d.step!==3 || !document.getElementById('screen-khqr').classList.contains('active')) return;
  d.payment='Paid'; d.status='Confirmed'; flowStoreBooking(); showScreen('screen-booking-success');
}
function renderConsultationSuccess() {
  var d=consultation.appointments.find(function(a){return a.ref===consultation.selected;}); if(!d) return;
  var app=d.method==='app';
  flowContent('screen-booking-success','<div class="flow-success"><span class="flow-icon">'+flowIcon('check')+'</span><h1>'+(app?'Payment Successful':'Request Sent')+'</h1><p>'+(app?'Booking Confirmed. Your demo payment was successful.':'Your consultation request has been sent. Awaiting Payment.')+'</p></div>'+flowBadges(d)+flowSummary(d,false)+flowRow('Booking Reference',d.ref)+(app?'':'<div class="payment-note telegram">'+manualPaymentText+' Your preferred time will be confirmed after payment verification.</div>'+flowButton('Open Telegram','openConsultationTelegram()'))+flowButton('View Appointment',"openConsultationAppointment('"+d.ref+"')")+flowButton('My Appointments',"showScreen('screen-my-appointments')",'btn-secondary')+'<p class="flow-demo">Demo bookings are kept for this page session only.</p>');
}
function renderConsultationAppointments() {
  var list=consultation.appointments.filter(function(a){return (a.status==='Completed')===(consultation.tab==='past');});
  document.querySelectorAll('#appt-tabs .seg-item').forEach(function(el,i){el.classList.toggle('active',(i===1)===(consultation.tab==='past'));});
  flowContent('screen-my-appointments','<p class="flow-lead">Your consultation bookings and requests.</p>'+(list.length?list.map(function(d){return '<button class="flow-appt" type="button" onclick="openConsultationAppointment(\''+d.ref+'\')"><strong>'+consultationMethods[d.method]+'</strong><p>'+ (d.video?'Video Call':'No Video')+'<br>'+flowDate(d.date)+' · '+d.time+'</p>'+flowBadges(d)+'<p>View details →</p></button>';}).join(''):'<div class="card"><h2 class="flow-heading">No '+consultation.tab+' appointments</h2><p class="flow-lead">Your '+(consultation.tab==='past'?'completed consultations':'bookings and requests')+' will appear here.</p></div>')+flowButton('Book Consultation',"showScreen('screen-online-consulting')")+'<p class="flow-demo">Frontend demo · Bookings reset when you reload.</p>');
}
function apptTab(which) { consultation.tab=which; renderConsultationAppointments(); }
function openConsultationAppointment(ref) { consultation.selected=ref; showScreen('screen-appointment-detail'); }
function selectedConsultation() { return consultation.appointments.find(function(a){return a.ref===consultation.selected;}); }
function renderConsultationDetail() {
  var d=selectedConsultation();
  if(!d) { flowContent('screen-appointment-detail','<h1 class="flow-heading">Select an appointment</h1><p class="flow-lead">Book a consultation to view its payment and booking status.</p>'+flowButton('My Appointments',"showScreen('screen-my-appointments')")); return; }
  var app=d.method==='app', states=consultationSteps[d.method];
  var index=app?states.indexOf(d.status):(d.status==='Requested'?1:states.indexOf(d.status));
  var actions=app?(['Confirmed','Scheduled'].includes(d.status)?flowButton('Join Consultation','joinConsultation()'):''):(d.status!=='Completed'?flowButton('Open Telegram','openConsultationTelegram()'):'');
  flowContent('screen-appointment-detail','<div class="method-head"><span class="flow-icon '+d.method+'">'+flowIcon(d.method)+'</span><div><h2>Dr Ly Cheng Huy</h2><p>'+consultationMethods[d.method]+'</p></div></div>'+flowSummary(d,true)+'<div class="card">'+flowRow('Payment Status',d.payment)+flowRow('Booking Status',d.status)+flowRow('Booking Reference',d.ref)+'</div>'+(!app?'<div class="payment-note telegram">'+manualPaymentText+'</div>':'')+actions+'<h2 class="section-title">Consultation progress</h2><ol class="flow-timeline">'+states.map(function(s,i){return '<li class="'+(i<=index?'reached ':'')+(i===index?'current':'')+'">'+s+(i===index?' · Current':'')+'</li>';}).join('')+'</ol>'+(index<4?'<details><summary>Preview demo status progression</summary><p class="flow-demo">Reviewer control only. Simulates '+(!app&&index===1?'manual payment verification by the team':'the next consultation status')+'.</p>'+flowButton('Simulate '+states[index+1],'advanceConsultationStatus()','btn-secondary')+'</details>':'')+'<p class="flow-demo">Demo only · No payment, messaging or video backend connected.</p>');
}
function advanceConsultationStatus() {
  var d=selectedConsultation(); if(!d) return;
  var states=consultationSteps[d.method],index=d.method==='telegram'&&d.status==='Requested'?1:states.indexOf(d.status);
  if(index<0 || index>=4) return;
  d.status=states[index+1]; if(d.method==='telegram'&&index===1) d.payment='Payment Confirmed';
  renderConsultationDetail();
}
function openConsultationTelegram() {
  var d=selectedConsultation(); if(!d || d.method!=='telegram') return;
  showScreen('screen-consultation-room');
  flowContent('screen-consultation-room','<span class="flow-icon telegram">'+flowIcon('telegram')+'</span><h1 class="flow-heading">Telegram demo</h1><p class="flow-lead">A verified Telegram link has not been added yet. In the live app, this button will open the doctor’s Telegram conversation.</p><div class="card">'+flowRow('Your Telegram',d.telegram)+flowRow('Booking Reference',d.ref)+'</div><div class="payment-note telegram">'+manualPaymentText+'</div>'+flowButton('Back to Appointment',"openConsultationAppointment('"+d.ref+"')"));
}
function joinConsultation() {
  var d=selectedConsultation(); if(!d || d.method!=='app' || !['Confirmed','Scheduled'].includes(d.status) || d.payment!=='Paid') return;
  showScreen('screen-consultation-room');
  flowContent('screen-consultation-room','<span class="flow-icon">'+flowIcon(d.video?'video':'app')+'</span><h1 class="flow-heading">'+(d.video?'Video consultation':'Chat consultation')+'</h1><p class="flow-lead">Your demo consultation room with Dr Ly Cheng Huy.</p>'+flowSummary(d,false)+'<div class="payment-note">'+(d.video?'Video is enabled for this appointment. Camera and microphone are not connected in this preview.':'Video is off. This appointment uses in-app chat.')+'</div><p class="flow-demo">Room preview only — no live messages or calls are sent.</p>'+flowButton('Back to Appointment',"openConsultationAppointment('"+d.ref+"')"));
}
/* Integrate with the existing screen router and preserve the original navigation. */
var baseConsultationShowScreen=showScreen;
showScreen=function(id) {
  if(id==='screen-payment') id='screen-khqr';
  if(id==='screen-book-consultation' && consultation.draft && consultation.appointments.some(function(a){return a.ref===consultation.draft.ref;})) { consultation.selected=consultation.draft.ref; id='screen-appointment-detail'; }
  if(id==='screen-book-consultation' && !consultation.draft) id='screen-online-consulting';
  if(id==='screen-khqr' && (!consultation.draft || consultation.draft.method!=='app' || consultation.draft.step!==3)) id=consultation.draft?'screen-book-consultation':'screen-online-consulting';
  if(id==='screen-khqr' && consultation.draft.payment==='Paid') id='screen-booking-success';
  if(id==='screen-booking-success' && !selectedConsultation()) id='screen-online-consulting';
  if(id==='screen-online-consulting') renderConsultationMethods();
  if(id==='screen-app-consulting-detail') renderConsultationMethodDetail('app');
  if(id==='screen-telegram-consulting-detail') renderConsultationMethodDetail('telegram');
  if(id==='screen-book-consultation') renderBooking();
  if(id==='screen-khqr') renderKhqr();
  if(id==='screen-booking-success') renderConsultationSuccess();
  if(id==='screen-my-appointments') renderConsultationAppointments();
  if(id==='screen-appointment-detail') renderConsultationDetail();
  baseConsultationShowScreen(id);
};
