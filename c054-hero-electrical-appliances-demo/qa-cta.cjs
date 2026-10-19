const { chromium } = require('C:/Users/Hi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const assert = require('assert/strict');

function luminance(rgb) {
  return rgb.map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4)
    .reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
}
async function contrast(button, state) {
  await button.page().waitForTimeout(250);
  const colors = await button.evaluate(el => {
    const s = getComputedStyle(el);
    return { text: s.color, background: s.backgroundColor, icon: getComputedStyle(el.querySelector('svg')).color };
  });
  const a = luminance(colors.text.match(/\d+/g).slice(0, 3).map(Number));
  const b = luminance(colors.background.match(/\d+/g).slice(0, 3).map(Number));
  const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  assert(ratio >= 4.5, state + ' contrast too low');
  assert.equal(colors.icon, colors.text);
  console.log(state, ratio.toFixed(2) + ':1', colors);
}
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  for (const [label, width, height] of [['desktop',1440,1000],['mobile',390,844]]) {
    const page = await browser.newPage({viewport:{width,height}});
    await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
    await page.evaluate(() => document.fonts.ready);
    const cta = page.locator('.bottom-cta');
    const button = cta.locator('a[href^="https://wa.me/"]');
    await cta.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    assert.equal(await cta.locator('.button').count(),2);
    assert.equal(await button.getAttribute('href'),'https://wa.me/message/BPZNOTL7IDFHB1');
    assert.equal(await cta.locator('a[href="https://t.me/HERO_BATTERY"]').count(),1);
    assert.equal(await page.locator('.facebook-pending').count(),0);
    assert.equal(await page.locator('body').innerText().then(t => t.includes('Link pending')),false);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.mouse.move(0,0);
    await contrast(button,label+' normal');
    await cta.screenshot({path:path.join(__dirname,'preview','cta-'+label+'-normal.png')});
    await button.hover();
    await contrast(button,label+' hover');
    await cta.screenshot({path:path.join(__dirname,'preview','cta-'+label+'-hover.png')});
    await page.mouse.down();
    await contrast(button,label+' active');
    // Move off the link before release to avoid opening the external messenger.
    await page.mouse.move(0,0);
    await page.mouse.up();
    await page.keyboard.press('Tab');
    await button.focus();
    assert(await button.evaluate(el => el.matches(':focus-visible')));
    await contrast(button,label+' focus');
    await page.evaluate(() => document.querySelector('[data-lang="km"]').click());
    assert.equal(await cta.locator('.button').count(),2);
    assert.equal(await page.locator('.facebook-pending').count(),0);
    await page.close();
  }
  await browser.close();
})().catch(e => {console.error(e);process.exit(1)});
