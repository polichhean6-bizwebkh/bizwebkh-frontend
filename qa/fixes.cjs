const fs=require('fs');function edit(p,f){fs.writeFileSync(p,f(fs.readFileSync(p,'utf8')))}
edit('register.html',s=>s.replace('if (phone.length < 6) valid = false;','if (!/^\\+?[\\d\\s()-]{8,18}$/.test(phone)) valid = false;'));
edit('admin/profile.html',s=>s.replace('Full Dashboard Access (Demo)','Full Dashboard Access').replace('ADMIN.toast("Password updates are disabled in this demo environment.");',`var inputs=Array.from(document.querySelectorAll('input[type=password]'));
      var fresh=MEP.load();
      if(inputs[0].value!==fresh.admin.password){ADMIN.toast('Current password is incorrect.');return;}
      if(inputs[1].value.length<8||inputs[1].value!==inputs[2].value){ADMIN.toast('Use at least 8 characters and ensure the new passwords match.');return;}
      fresh.admin.password=inputs[1].value;MEP.save(fresh);inputs.forEach(function(i){i.value='';});ADMIN.toast('Preview password updated in this browser.');`));
edit('admin/login.html',s=>s.replace('Demo credentials —','Preview access —'));
edit('admin/courses.html',s=>s.replace('      if (delId) {','      if (delId && (d.intakes.some(function(i){return i.courseId===delId;}) || d.registrations.some(function(r){return r.courseId===delId;}))) { A.toast("This course has intakes or registrations. Unpublish it to retain those records."); return; }\n      if (delId) {'));
edit('admin/intakes.html',s=>s.replace('      if (delId) {','      if (delId && d.registrations.some(function(r){return r.intakeId===delId;})) { A.toast("This intake has registrations. Close it to retain those records."); return; }\n      if (delId) {').replace('      if (id) {\n        d.intakes',`      if(record.enrolled>=record.maxStudents) record.status='Closed';
      if (id) {
        d.intakes`));
edit('admin/registrations.html',s=>s.replace('          reg.status = btn.getAttribute("data-status");',`          var nextStatus=btn.getAttribute('data-status');
          var intake=dd.intakes.find(function(i){return i.id===reg.intakeId;});
          if(intake && reg.status==='Cancelled' && nextStatus!=='Cancelled'){
            if(intake.enrolled>=intake.maxStudents||intake.status==='Closed'){A.toast('This intake has no available places. Open an intake with capacity before restoring the registration.');return;}
            intake.enrolled++;
          } else if(intake && reg.status!=='Cancelled' && nextStatus==='Cancelled') { intake.enrolled=Math.max(0,intake.enrolled-1); }
          if(intake && intake.status!=='Closed') intake.status=intake.enrolled>=intake.maxStudents?'Closed':intake.maxStudents-intake.enrolled<=2?'Almost Full':'Open';
          reg.status = nextStatus;`));
// Pages expose functional fields; fixed structural links remain deliberate.
edit('admin/pages.html',s=>s.replace('<label>CTA Label</label><input type="text" name="cta">','<label>CTA Label (fixed navigation)</label><input type="text" name="cta" readonly>').replace('<select name="status"><option>Published</option><option>Draft</option></select>','<select name="status" disabled><option>Published</option><option>Draft</option></select>'));
edit('js/polish.js',s=>s.replace('    var serial=0;',`    var serial=0;
    var settings=MEP.load().settings;
    var pageKey=({'index.html':'home','about.html':'about','contact.html':'contact'})[location.pathname.split('/').pop()||'index.html'];
    var pageContent=MEP.load().pages[pageKey];
    if(!admin && pageContent){
      if(pageContent.seoTitle) document.title=pageContent.seoTitle;
      var meta=document.querySelector('meta[name=description]');if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta);}meta.content=pageContent.seoDescription||settings.metaDescription;
      if(pageKey!=='about' && pageContent.content){var text=document.createElement('p');text.className='page-editor-content';text.textContent=pageContent.content;document.querySelector('.hero-copy,.page-hero .container')?.appendChild(text);}
    }`));
fs.copyFileSync('assets/images/course-electrical.jpg','assets/images/hero-bg.jpg');fs.copyFileSync('assets/images/course-electrical.jpg','assets/images/news-workshop.jpg');
