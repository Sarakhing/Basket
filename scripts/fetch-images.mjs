/* Build step. Pulls the produce photography and the two typefaces into the
   deployment so the app has no third-party runtime dependency.

   Why self-host the fonts: a farmer's first load may happen with no usable
   connection. Anything fetched from another origin at runtime is a screen
   that renders wrong exactly when it matters most. */

import { writeFile, readFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';

const PUB = join(process.cwd(), 'public');
const IMG = join(PUB, 'img');
const FONT = join(PUB, 'fonts');

/* ------------------------------------------------------------- produce */
const BASE = 'https://www.figma.com/api/mcp/asset/';
const IMAGES = {
  cassava: 'f59aa002-222a-4963-bf91-856c2c67ed2b.png',
  maize:   '04724ef8-ecf0-42f9-a575-119d43ef2d11.png',
  yam:     '21aba3bb-63bc-4001-8407-73548798980a.png',
  pepper:  '6dbe0e2f-5872-43e5-9e22-f61744d41773.png',
  tomato:  'cff4ce79-a642-40e3-b82d-8e6a6a58aeea.png',
  okra:    'bf9db93d-0f1e-453a-a8d3-9d61f57fd0e5.png',
  hero:    '6c90d31f-f14b-4d1a-8d01-c1b67550eca9.png',
};

await mkdir(IMG, { recursive: true });
let got = 0, kept = 0, missed = [];
for (const [name, file] of Object.entries(IMAGES)) {
  const dest = join(IMG, name + '.png');
  try { await access(dest); kept++; continue; } catch {}
  try {
    const r = await fetch(BASE + file);
    if (!r.ok) throw new Error('HTTP ' + r.status);
    await writeFile(dest, Buffer.from(await r.arrayBuffer()));
    got++;
  } catch (e) { missed.push(`${name} (${e.message})`); }
}
console.log(`images: ${got} fetched, ${kept} already present` + (missed.length ? `, MISSING: ${missed.join(', ')}` : ''));
if (missed.length) console.warn('  → tiles fall back to a plain block; re-export from Figma and commit to public/img/');

/* --------------------------------------------------------------- fonts */
const CSS_URL = 'https://fonts.googleapis.com/css2'
  + '?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700'
  + '&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

await mkdir(FONT, { recursive: true });
try {
  const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();
  const urls = [...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map(m => m[1]);
  let out = css;
  let n = 0;
  for (const u of [...new Set(urls)]) {
    const name = 'f' + (n++) + '.woff2';
    const dest = join(FONT, name);
    try { await access(dest); } catch {
      const r = await fetch(u, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + u);
      await writeFile(dest, Buffer.from(await r.arrayBuffer()));
    }
    out = out.split(u).join('fonts/' + name);
  }
  await writeFile(join(PUB, 'fonts.css'), out);
  console.log(`fonts: ${n} files self-hosted`);
} catch (e) {
  console.warn('fonts: could not self-host (' + e.message + ') — falling back to the Google stylesheet');
  await writeFile(join(PUB, 'fonts.css'),
    `@import url('${CSS_URL}');\n/* self-hosting failed at build time; this falls back to the CDN */\n`);
}

/* Keep the service worker's precache list honest about the font files. */
try {
  const swPath = join(PUB, 'sw.js');
  const sw = await readFile(swPath, 'utf8');
  const { readdir } = await import('node:fs/promises');
  const files = (await readdir(FONT).catch(() => [])).map(f => `'fonts/${f}'`);
  const list = ["'fonts.css'", ...files].join(', ');
  await writeFile(swPath, sw.replace('/*FONTS*/', list));
  console.log('service worker: font precache updated');
} catch (e) { console.warn('service worker: ' + e.message); }
