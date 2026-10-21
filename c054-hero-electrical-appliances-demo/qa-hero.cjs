const {chromium} = require('C:/Users/Hi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs'), path = require('path'), assert = require('assert/strict'), crypto = require('crypto');
const files = ['susi-shopfront.jpg','susi-honda-dream-promo.jpg','susi-store-interior.jpg','sosi-oil-poster.jpg','fsd-battery-promo.jpg','bussan-battery-promo.jpg','sushi-battery-promo.jpg'];
const source = ['10-05-40','19-32-07','19-32-20','19-32-29','19-32-33','19-32-37','19-32-40'];
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
files.forEach((f,i) => assert.equal(hash(path.join(__dirname,'assets',f)),hash(path.join(__dirname,'../Images from Client/New Images from Client/photo_2026-10-19_'+source[i]+'.jpg'))));
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 for(const [name,width,height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('#promotions').count(),0);
  assert.equal(await page.locator('.hero-slide').count(),7);
  assert.equal(await page.locator('.product-card').count(),7);
  let stageHeight;
  for(let i=0;i<7;i++){
   await page.locator('.hero-dot').nth(i).click();
   await page.locator('.hero-slide:not([hidden]) img').evaluate(img=>img.decode());
   assert.equal(await page.locator('.hero-slide:not([hidden])').getAttribute('data-slide'),String(i));
   const size=await page.locator('#home').boundingBox();
   stageHeight ??= size.height; assert.equal(size.height,stageHeight);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   assert.equal(await page.locator('.hero-slide:not([hidden]) img').evaluate(img=>getComputedStyle(img).objectFit),'contain');
   if(i===0||i===3){
    await page.evaluate(()=>{document.activeElement.blur();window.scrollTo({top:0,behavior:'instant'})});
    await page.waitForTimeout(400);
    await page.screenshot({path:path.join(__dirname,'preview','hero-'+name+(i===0?'-landscape':'-portrait')+'.png')});
   }
  }
  await page.locator('.hero-next').click();assert.equal(await page.locator('.hero-slide-count').innerText(),'01 / 07');
  await page.locator('.hero-prev').click();assert.equal(await page.locator('.hero-slide-count').innerText(),'07 / 07');
  await page.keyboard.press('Home');assert.equal(await page.locator('.hero-slide-count').innerText(),'01 / 07');
  await page.locator('.hero-slides').evaluate(el=>{
   for(const [type,x,y] of [['touchstart',250,100],['touchend',100,105]]) {
    el.dispatchEvent(new TouchEvent(type,{changedTouches:[new Touch({identifier:1,target:el,clientX:x,clientY:y})]}));
   }
  });
  assert.equal(await page.locator('.hero-slide-count').innerText(),'02 / 07');
  await page.locator('.hero-copy a[href="#products"]').click();
  assert.equal(new URL(page.url()).hash,'#products');
  await page.locator('[data-product="BUSSAN"]').click();
  assert((await page.locator('#inquiry-selection').innerText()).includes('BUSSAN'));
  await page.evaluate(()=>document.querySelector('[data-lang="km"]').click());
  assert.equal(await page.locator('html').getAttribute('lang'),'km');
  assert.equal(await page.locator('.hero-next').getAttribute('aria-label'),'រូបភាពបន្ទាប់');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.evaluate(()=>document.querySelector('[data-lang="en"]').click());
  if(width===390){
   await page.locator('.menu-toggle').click();
   await page.locator('#navigation a[href="#about"]').click();
   assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  }
  for(const img of await page.locator('img').elementHandles()) {
   if(await img.isVisible()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
  }
  await page.locator('.hero-dot').first().click();
  await page.evaluate(()=>{document.activeElement.blur();window.scrollTo({top:0,behavior:'instant'})});
  await page.waitForTimeout(400);
  await page.screenshot({path:path.join(__dirname,'preview','homepage-carousel-'+name+'.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  console.log(name+': all seven slides, image loads, stable height, controls, swipe, language, navigation and inquiry passed');
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
