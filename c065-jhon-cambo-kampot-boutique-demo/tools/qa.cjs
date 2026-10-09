const {chromium}=require('C:/Users/Hi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');const path=require('path');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const page=await browser.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const results=[];const base='http://127.0.0.1:8766';
 for(const width of [1440,1280,768,390]){
  await page.setViewportSize({width,height:900});await page.goto(base,{waitUntil:'domcontentloaded'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(600);
  for(const lang of ['en','km']){
   await page.locator(`[data-lang="${lang}"]`).click();
   for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=750){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(35);}
   await page.waitForTimeout(300);
   const scan=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),forbidden:/\b(demo|sample|placeholder|test)\b/i.test(document.body.innerText)}));
   results.push({width,lang,...scan});
   await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(500);
   if(width===1440||width===390){await page.screenshot({path:path.join(__dirname,`qa-${width}-${lang}.png`),fullPage:true});await page.screenshot({path:path.join(__dirname,`qa-hero-${width}-${lang}.png`)});}
  }
 }
 await page.locator('[data-lang="en"]').click();
 for(let i=0;i<4;i++){
  await page.locator(`[data-view-room="${i}"]`).first().click();
  const sources=[];const heights=[];let count=Number((await page.locator('#photo-counter').textContent()).split('/')[1]);
  for(let j=0;j<count;j++){sources.push(await page.locator('#dialog-image').getAttribute('src'));heights.push((await page.locator('.photo-stage').boundingBox()).height);await page.locator('.next').click();}
  if(new Set(sources).size!==count)throw Error('Duplicate room photos');
  if(new Set(heights).size!==1)throw Error('Gallery shifts');
  await page.keyboard.press('ArrowRight');if(!(await page.locator('#photo-counter').textContent()).startsWith('2'))throw Error('Keyboard arrow failed');
  await page.keyboard.press('Escape');if(await page.locator('#photo-dialog').isVisible())throw Error('Escape failed');
 }
 await page.locator('[data-view-room="0"]').first().click();
 await page.locator('.photo-stage').evaluate(el=>{for(const [type,x] of [['touchstart',280],['touchend',70]]){const touch=new Touch({identifier:1,target:el,clientX:x,clientY:150});el.dispatchEvent(new TouchEvent(type,{changedTouches:[touch],bubbles:true}));}});
 if(!(await page.locator('#photo-counter').textContent()).startsWith('2'))throw Error('Swipe failed');
 await page.screenshot({path:path.join(__dirname,'qa-room-mobile.png')});await page.keyboard.press('Escape');
 await page.locator('[data-category="Kampot"]').click();if(await page.locator('.gallery-item').count()!==3)throw Error('Filter failed');
 await page.locator('.gallery-item').first().click();await page.locator('.prev').click();await page.locator('.close-dialog').click();
 await page.locator('[data-inquire="2"]').click();if(await page.locator('#room-select').inputValue()!=='Family Room')throw Error('Room inquiry failed');
 await page.locator('[name="name"]').fill('Review Guest');await page.locator('[name="email"]').fill('review@example.com');await page.locator('[name="checkin"]').fill('2027-04-15');await page.locator('[name="checkout"]').fill('2027-04-14');
 await page.locator('.submit').click();if(await page.locator('#inquiry-result').isVisible())throw Error('Invalid dates accepted');
 await page.locator('[name="checkout"]').fill('2027-04-18');await page.locator('[name="message"]').fill('Please confirm your location.');await page.locator('.submit').click();
 const message=await page.locator('#prepared-message').inputValue();if(!message.includes('Review Guest')||!message.includes('Family Room')||!message.includes('2027-04-18'))throw Error('Message incomplete');
 if(!(await page.locator('#inquiry-status').textContent()).includes('Nothing has been sent'))throw Error('Misleading inquiry state');
 await page.locator('[value="telegram"]').check();await page.locator('.submit').click();if(await page.locator('#open-contact').isVisible())throw Error('Invented Telegram contact');
 await page.locator('.menu-toggle').click();if(!(await page.locator('#navigation').isVisible()))throw Error('Mobile menu failed');await page.locator('#navigation a[href="#gallery"]').click();if(await page.locator('#navigation').isVisible())throw Error('Menu did not close');
 await page.locator('#load-map').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(__dirname,'qa-map-mobile.png')});
 await page.locator('#load-map').click();if(!(await page.locator('#location-map').getAttribute('src')).includes('Kampot'))throw Error('Map loader failed');
 const missingAnchors=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).map(a=>a.href));if(missingAnchors.length)throw Error('Broken anchors');
 await page.goto(base+'/photo-credits.html',{waitUntil:'domcontentloaded'});if(!(await page.locator('h1').textContent()).includes('Photography'))throw Error('Credits page failed');
 if(errors.length)throw Error(errors.join('\n'));
 if(results.some(r=>r.overflow||r.broken.length||r.forbidden))throw Error(JSON.stringify(results));
 fs.writeFileSync(path.join(__dirname,'qa-results.json'),JSON.stringify({results,interactionChecks:'All passed',errors},null,2));
 console.log(JSON.stringify({results,interactionChecks:'All passed',errors},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
