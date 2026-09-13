(function(){
  'use strict';
  var admin=/\/admin\//.test(location.pathname), prefix=admin?'../':'';
  MEP.imageURL=function(value){
    var path=String(value||'').replace(/^\.\.\//,'');
    if(!/^assets\/images\/[\w.-]+\.(jpg|jpeg|png|webp|svg)$/i.test(path)) path='assets/images/course-maintenance.jpg';
    return prefix+path.replace(/\.svg$/,'.jpg');
  };
  MEP.telegramURL=function(value){var phone=String(value||'').replace(/[^\d+]/g,'');if(phone.startsWith('0'))phone='+855'+phone.slice(1);return 'https://t.me/'+phone;};
  // Handle missing or older image paths without exposing a broken-image icon.
  document.addEventListener('error',function(event){var img=event.target;if(img.tagName==='IMG' && !img.dataset.recovered){img.dataset.recovered='true';img.src=prefix+'assets/images/course-maintenance.jpg';}},true);
  var originalSave=MEP.save;
  MEP.save=function(data){
    ['courses','news','gallery','media'].forEach(function(key){(data[key]||[]).forEach(function(item){var field=key==='media'?'url':'image';item[field]=MEP.imageURL(item[field]).replace(/^\.\.\//,'');});});
    originalSave(data);
  };
  document.addEventListener('DOMContentLoaded',function(){
    var serial=0;
    var settings=MEP.load().settings;
    var pageKey=({'index.html':'home','about.html':'about','contact.html':'contact'})[location.pathname.split('/').pop()||'index.html'];
    var pageContent=MEP.load().pages[pageKey];
    if(!admin && pageContent){
      if(pageContent.seoTitle) document.title=pageContent.seoTitle;
      var meta=document.querySelector('meta[name=description]');if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta);}meta.content=pageContent.seoDescription||settings.metaDescription;
      if(pageKey!=='about' && pageContent.content){var text=document.createElement('p');text.className='page-editor-content';text.textContent=pageContent.content;document.querySelector('.hero-copy,.page-hero .container')?.appendChild(text);}
    }
    function enhance(){
      document.querySelectorAll('.field,.a-field').forEach(function(field){var input=field.querySelector('input:not([type=hidden]),select,textarea'),label=field.querySelector('label');if(input&&label&&!label.htmlFor){if(!input.id)input.id='field-'+(++serial);label.htmlFor=input.id;}});
      document.querySelectorAll('img').forEach(function(img){if(!img.alt)img.alt='Technical training equipment';});
      document.querySelectorAll('.a-modal-close').forEach(function(b){b.setAttribute('aria-label','Close dialog');});
      document.querySelectorAll('.a-search,.a-select').forEach(function(el){if(!el.getAttribute('aria-label'))el.setAttribute('aria-label',el.placeholder||el.options?.[0]?.text||'Filter');});
    }
    enhance();
    new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});
    document.querySelectorAll('[data-site-email],[data-site-address],[data-site-facebook]').forEach(function(el){if(!el.textContent.trim()||el.textContent==='To be confirmed'){var item=el.closest('.contact-item');if(item)item.remove();}});
    var menu=document.querySelector('.nav-toggle');
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){
        document.querySelectorAll('.a-modal-overlay.open').forEach(function(el){ADMIN.closeModal(el.id);});
        var nav=document.querySelector('.main-nav.open');if(nav){nav.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false');menu.focus();}
        var side=document.querySelector('.a-sidebar.open');if(side)side.classList.remove('open');
      }
      var modal=document.querySelector('.a-modal-overlay.open');
      if(e.key==='Tab'&&modal){var nodes=Array.from(modal.querySelectorAll('button,input:not([type=hidden]),textarea,select,a[href]')).filter(function(x){return !x.disabled&&x.offsetParent!==null;});var first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
    });
    var sideToggle=document.getElementById('a-sidebar-toggle');if(sideToggle){sideToggle.setAttribute('aria-label','Toggle sidebar');sideToggle.addEventListener('click',function(){sideToggle.setAttribute('aria-expanded',document.getElementById('a-sidebar').classList.contains('open'));});document.addEventListener('click',function(e){var sidebar=document.getElementById('a-sidebar');if(sidebar.classList.contains('open')&&!sidebar.contains(e.target)&&!sideToggle.contains(e.target))sidebar.classList.remove('open');});}
    document.querySelectorAll('.gallery-grid').forEach(function(grid){var dialog=document.createElement('dialog');dialog.className='photo-dialog';dialog.innerHTML='<button type="button" aria-label="Close image">✕</button><img alt=""><p></p>';document.body.appendChild(dialog);dialog.querySelector('button').onclick=function(){dialog.close();};dialog.addEventListener('click',function(e){if(e.target===dialog)dialog.close();});grid.addEventListener('click',function(e){var item=e.target.closest('.gallery-item');if(!item)return;var img=item.querySelector('img');dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.querySelector('p').textContent=img.alt;dialog.showModal();});});
    var dob=document.querySelector('[name=dob]');if(dob)dob.max=new Date().toISOString().slice(0,10);
    document.querySelectorAll('[name=phone],[name=telegram]').forEach(function(el){el.inputMode='tel';el.autocomplete='tel';});
    document.querySelectorAll('[name=email]').forEach(function(el){el.autocomplete='email';});
    document.querySelectorAll('input[name=name]').forEach(function(el){el.autocomplete='name';});
    // Validate image edits before saving, keeping the static preview self-contained.
    if(admin){document.addEventListener('click',function(e){var button=e.target.closest('[id^=btn-save]');if(!button)return;var modal=button.closest('.a-modal');var form=modal&&modal.querySelector('form');if(!form)return;if(!form.reportValidity()){e.preventDefault();e.stopImmediatePropagation();return;}
      var field=form.querySelector('[name=image],[name=url]');if(field&&field.value.trim()){var path=field.value.trim();if(!/^assets\/images\/[\w.-]+\.(jpg|jpeg|png|webp)$/i.test(path)){e.preventDefault();e.stopImmediatePropagation();ADMIN.toast('Choose a local image from assets/images/.');return;}if(button.dataset.verifiedImage!==path){e.preventDefault();e.stopImmediatePropagation();var image=new Image();image.onload=function(){button.dataset.verifiedImage=path;button.click();};image.onerror=function(){ADMIN.toast('This image could not be loaded. Check its local path.');};image.src='../'+path;return;}}
      if(form.elements.namedItem('maxStudents')){var max=Number(form.elements.namedItem('maxStudents').value),used=Number(form.elements.namedItem('enrolled').value);if(max<1||used<0||used>max||form.elements.namedItem('endDate').value<form.elements.namedItem('startDate').value||form.elements.namedItem('endTime').value<=form.elements.namedItem('startTime').value){e.preventDefault();e.stopImmediatePropagation();ADMIN.toast('Check the date range, class times and seat capacity.');}}
    },true);}
  });
})();
