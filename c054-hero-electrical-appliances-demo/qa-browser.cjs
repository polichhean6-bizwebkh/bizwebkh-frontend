const { chromium } = require('C:\\Users\\Hi\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\node_modules\\playwright');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const outputDir = path.join(root, 'preview');
fs.mkdirSync(outputDir, { recursive: true });

async function checkLayout(page, label) {
  const contact = await page.locator('#contact').innerText();
  if (!contact.includes('Mr. SP Cambodia') || !contact.includes('Tay Ninh')) throw new Error('Office/factory details missing');
  if (await page.locator('#contact a[href="tel:+855882939595"]').count() !== 1) throw new Error('Telephone link mismatch');
  if (await page.locator('#contact a[href="https://t.me/HERO_BATTERY"]').count() !== 1) throw new Error('Telegram link mismatch');
  const expected = [
    ['fsd-battery-promo.jpg', 'FSD Battery', 'Japanese Technology', '5Ah–200Ah'],
    ['bussan-battery-promo.jpg', 'BUSSAN Battery', 'Korean Technology', '40Ah–150Ah'],
    ['sushi-battery-promo.jpg', 'SUSHI Battery', 'Japanese Technology', '40Ah–150Ah'],
    ['susi-honda-dream-promo.jpg', 'SUSI Motorcycle Oil', 'Japanese Technology', '800ml, 1000ml'],
    ['sosi-oil-poster.jpg', 'SOSI Motorcycle Oil', 'Japanese Technology', '800ml, 1000ml']
  ];
  for (const [file, ...copy] of expected) {
    const card = page.locator('.promo-card').filter({has: page.locator('img[src="assets/' + file + '"]')});
    const text = await card.innerText();
    if (copy.some(value => !text.includes(value))) throw new Error('Brand mapping mismatch: ' + file);
  }
  const state = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('main > section')].map(el => el.id).filter(Boolean);
    const boxes = [...document.querySelectorAll('.promo-card')].map(el => {
      const card = el.getBoundingClientRect();
      const img = el.querySelector('img');
      return { width: card.width, height: img.getBoundingClientRect().height, loaded: img.complete && img.naturalWidth > 0, fit: getComputedStyle(img).objectFit };
    });
    return { sections, boxes, overflow: document.documentElement.scrollWidth > innerWidth };
  });
  if (state.sections.join(',') !== 'home,about,categories,products,more-products,promotions,why-us,quality,contact') throw new Error('Unexpected section order');
  if (state.overflow || state.boxes.some(box => !box.loaded || box.height !== 240 || box.fit !== 'contain')) throw new Error(`${label}: image sizing or overflow failure`);
  if (Math.max(...state.boxes.map(box => box.width)) - Math.min(...state.boxes.map(box => box.width)) > 1) throw new Error(`${label}: inconsistent card widths`);
  console.log(label, JSON.stringify(state));
  const buttons = page.locator('.brand-image-button');
  if (await buttons.count() !== 5) throw new Error('Expected five image controls');
  for (let i = 0; i < 5; i++) {
    await buttons.nth(i).click();
    await page.locator('.brand-lightbox img').evaluate(img => img.decode());
    if (!await page.locator('.brand-lightbox').isVisible()) throw new Error('Viewer did not open');
    if (i === 0) await page.screenshot({path: path.join(outputDir, 'brand-viewer-' + label + '.png')});
    if (i % 3 === 0) await page.keyboard.press('Escape');
    else if (i % 3 === 1) await page.locator('.brand-lightbox-close').click();
    else await page.locator('.brand-lightbox').click({position:{x:2,y:2}});
    if (await page.locator('.brand-lightbox').isVisible()) throw new Error('Viewer failed to close');
    if (!await buttons.nth(i).evaluate(el => el === document.activeElement)) throw new Error('Focus not restored');
  }
  const height = await page.locator('.contact-photo img').evaluate(img => img.getBoundingClientRect().height);
  if (height > 400) throw new Error('Store image too tall');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator('#contact').screenshot({path:path.join(outputDir, 'store-' + label + '.png')});
  await page.evaluate(() => document.activeElement.blur());
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const imageHandles = await page.locator('main img, .logo img').elementHandles();
  for (const image of imageHandles) {
    await image.scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(250);
  const imageState = await page.locator('main img, .logo img').evaluateAll(images => images.map(img => ({ src: img.getAttribute('src'), complete: img.complete, width: img.naturalWidth })));
  const missing = imageState.filter(image => !image.complete || !image.width);
  if (missing.length) throw new Error(`Missing image assets: ${missing.map(image => image.src).join(', ')}`);

  await checkLayout(page, 'desktop');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(outputDir, 'hero-promotions-desktop.png'), fullPage: true });
  await page.locator('#promotions').screenshot({ path: path.join(outputDir, 'promotions-detail-desktop.png') });

  await page.locator('.lang-btn[data-lang="km"]').click();
  if (await page.locator('html').getAttribute('lang') !== 'km') throw new Error('Khmer language toggle did not apply.');
  await page.locator('.lang-btn[data-lang="en"]').click();
  await page.locator('a[data-product="BUSSAN"]').first().click();
  if (await page.locator('#inquiry-selection').isHidden()) throw new Error('Product inquiry interaction did not show its message.');
  const navTarget = await page.locator('#contact').boundingBox();
  if (!navTarget) throw new Error('Contact navigation target is unavailable.');

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
  await mobile.evaluate(() => document.fonts.ready);
  const mobileImages = await mobile.locator('main img, .logo img').elementHandles();
  for (const image of mobileImages) {
    await image.scrollIntoViewIfNeeded();
  }
  await mobile.waitForTimeout(250);
  const missingMobile = await mobile.locator('main img, .logo img').evaluateAll(images => images.filter(img => !img.complete || !img.naturalWidth).map(img => img.getAttribute('src')));
  if (missingMobile.length) throw new Error(`Missing mobile image assets: ${missingMobile.join(', ')}`);
  await checkLayout(mobile, 'mobile');
  await mobile.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await mobile.waitForTimeout(350);
  await mobile.screenshot({ path: path.join(outputDir, 'hero-promotions-mobile.png'), fullPage: true });
  await mobile.locator('#promotions').screenshot({ path: path.join(outputDir, 'promotions-detail-mobile.png') });
  await page.setViewportSize({ width: 768, height: 1024 });
  await checkLayout(page, 'tablet');
  await page.locator('#promotions').screenshot({ path: path.join(outputDir, 'promotions-detail-tablet.png') });

  console.log(JSON.stringify({ imagesChecked: imageState.length, desktop: 'preview/hero-promotions-desktop.png', mobile: 'preview/hero-promotions-mobile.png' }));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
