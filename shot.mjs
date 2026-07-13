import { chromium } from 'playwright-core';
const OUT = process.argv[2];
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));

await p.goto('http://localhost:3100/con-gai', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
await p.screenshot({ path: OUT + '/baby-1-hero.png' });

const H = await p.evaluate(() => document.body.scrollHeight);
console.log('Chiều cao trang: ' + H + 'px');

for (const [i, y] of [900, 2000, 3200, 4400].entries()) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `${OUT}/baby-${i + 2}-y${y}.png` });
}
console.log(errs.length ? 'LỖI CONSOLE:\n' + errs.join('\n') : 'Không có lỗi console.');
await b.close();
