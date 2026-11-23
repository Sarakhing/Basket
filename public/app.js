/* Basket — a digital agricultural marketplace for smallholder farmers.
   Single-file SPA, no build step. Screens render to HTML; interaction is
   delegated through data-act attributes.

   Three things worth knowing before reading on:
   1. Every visible string comes from window.STRINGS via t(). Language is a
      column in that table, swapped at runtime — nothing is rebuilt.
   2. Usability measurement is built in, not bolted on. Task completion,
      assists, errors and time are logged as events; the SUS is administered
      in-app; everything works offline and syncs later.
   3. The transaction screens are illustrative. No money moves. */

(() => {
'use strict';

/* ============================================================== constants */
const TASKS = [
  { id: 'T1', key: 'Register',       done: 'home' },
  { id: 'T2', key: 'Create listing', done: 'sell-done' },
  { id: 'T3', key: 'Find price',     done: 'price-detail' },
  { id: 'T4', key: 'Browse',         done: 'listing' },
  { id: 'T5', key: 'Contact',        done: 'contact' },
];
const CROPS = [
  { id: 'cassava', unit: 'bag',    price: 150000, market: 145000, low: 138000, high: 152000, trend:  4 },
  { id: 'maize',   unit: 'bag',    price:  98000, market:  98000, low:  92000, high: 104000, trend: -2 },
  { id: 'yam',     unit: 'bag',    price: 210000, market: 210000, low: 198000, high: 222000, trend:  6 },
  { id: 'pepper',  unit: 'basket', price:  62000, market:  62000, low:  55000, high:  70000, trend:  3 },
  { id: 'tomato',  unit: 'basket', price:  54000, market:  54000, low:  48000, high:  61000, trend: -8 },
  { id: 'okra',    unit: 'basket', price:  22000, market:  22000, low:  19000, high:  26000, trend:  1 },
];
const LISTINGS = [
  { id: 'l1', crop: 'cassava', qty: 12, unit: 'bag',    price: 150000, dist: '4.2 km', seller: 'Adeola', place: 'Eruwa' },
  { id: 'l2', crop: 'maize',   qty: 30, unit: 'bag',    price:  98000, dist: '2.8 km', seller: 'Bola',   place: 'Eruwa' },
  { id: 'l3', crop: 'tomato',  qty:  8, unit: 'basket', price:  54000, dist: '6.1 km', seller: 'Ngozi',  place: 'Lanlate' },
  { id: 'l4', crop: 'yam',     qty: 60, unit: 'bag',    price: 126000, dist: '7.4 km', seller: 'Sule',   place: 'Igbo-Ora' },
];
const MY_LISTINGS = [
  { crop: 'cassava', qty: 12, unit: 'bag',    price: 150000, status: 'published' },
  { crop: 'maize',   qty: 30, unit: 'bag',    price:  98000, status: 'sending'   },
  { crop: 'okra',    qty:  6, unit: 'basket', price:  22000, status: 'draft'     },
];
const ENQUIRIES = [
  { who: 'Chidi',  crop: 'cassava', msg: 'Is the 12 bags still available?', when: '2 min ago',  state: 'new' },
  { who: 'Fatima', crop: 'cassava', msg: 'Can you deliver to Ibadan?',      when: '1 hour ago', state: 'new' },
  { who: 'Tunde',  crop: 'maize',   msg: 'Called you — thank you',          when: 'Yesterday',  state: 'replied' },
];

/* ================================================================== icons */
const I = {
  back:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  spk:   '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 010 7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/></svg>',
  tick:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l5 5L19 7" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  tickL: '<svg width="46" height="46" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l5 5L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrow: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  home:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-6v-6H10v6H4a1 1 0 01-1-1v-9z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  tag:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 3h8l10 10-8 8L3 11V3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="7.5" cy="7.5" r="1.8" fill="currentColor"/></svg>',
  grid:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="2"/></svg>',
  me:    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  search:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  sliders:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M6 12h12M10 18h4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  phone: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a12 12 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" fill="currentColor"/></svg>',
  chat:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2z" stroke="currentColor" stroke-width="2"/></svg>',
  sms:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 5h18v12H8l-5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  lock:  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" stroke-width="2"/></svg>',
  del:   '<svg width="26" height="22" viewBox="0 0 28 24" fill="none"><path d="M9 3h15v18H9L2 12 9 3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13 9l6 6M19 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  chev:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  globe: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c5 6 5 12 0 18M12 3C7 9 7 15 12 21" stroke="currentColor" stroke-width="1.8"/></svg>',
};

/* ================================================================ storage */
const LS = {
  get(k, d) { try { const v = localStorage.getItem('basket.' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('basket.' + k, JSON.stringify(v)); } catch {} },
  del(k)    { try { localStorage.removeItem('basket.' + k); } catch {} },
};

/* ================================================================== state */
const S = {
  lang: LS.get('lang', 'en'),
  screen: 'lang',
  stack: [],
  role: 'farmer',
  draft: { crop: 'cassava', unit: 'bag', qty: 12, price: 150000 },
  entry: '',
  pick: null,
  filter: { crops: [], dist: '10 km', sort: 'nearest' },
  offer: { qty: 5, price: 148000 },
  session: LS.get('session', null),
  sessions: LS.get('sessions', []),
  susIndex: 0,
  susAnswers: [],
  langOpen: false,
  cfg: LS.get('cfg', { url: '', key: '' }),
  online: navigator.onLine,
};

/* =================================================================== i18n */
function t(key) {
  const row = window.STRINGS[key];
  if (!row) return key;
  return row[S.lang] || row.en || key;
}
const crop = id => t('crop.' + id);
const unitName = (u, n) => t('common.' + (n === 1 ? u : u + 's'));
const naira = n => '₦' + n.toLocaleString('en-NG');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ============================================================== telemetry */
function log(type, detail) {
  if (!S.session) return;
  S.session.events.push({ t: Date.now(), type, screen: S.screen, detail: detail || null });
  LS.set('session', S.session);
}
function startSession(meta) {
  S.session = {
    id: 'S' + Date.now().toString(36),
    code: meta.code, literacy: meta.literacy, phoneBefore: meta.phoneBefore,
    deviceProvided: meta.deviceProvided, lang: meta.lang,
    startedAt: Date.now(), endedAt: null,
    events: [], tasks: {}, sus: null, notes: '', synced: false,
  };
  S.session.tasks[TASKS[0].id] = { startedAt: Date.now(), assists: 0, errors: 0, state: 'running' };
  LS.set('session', S.session);
}
function currentTask() {
  if (!S.session) return null;
  for (const task of TASKS) {
    const r = S.session.tasks[task.id];
    if (r && r.state === 'running') return task;
  }
  return null;
}
function taskEvent(kind) {
  const task = currentTask(); if (!task) return;
  S.session.tasks[task.id][kind === 'assist' ? 'assists' : 'errors']++;
  log(kind, task.id); render();
}
function finishTask(state) {
  const task = currentTask(); if (!task) return;
  const rec = S.session.tasks[task.id];
  rec.state = state; rec.endedAt = Date.now();
  rec.seconds = Math.round((rec.endedAt - rec.startedAt) / 1000);
  rec.unaided = state === 'completed' && rec.assists === 0 && rec.errors === 0;
  log('task.' + state, task.id);
  const next = TASKS[TASKS.indexOf(task) + 1];
  if (next) S.session.tasks[next.id] = { startedAt: Date.now(), assists: 0, errors: 0, state: 'running' };
  LS.set('session', S.session);
}
function autoComplete(screen) {
  const task = currentTask();
  if (task && task.done === screen) finishTask('completed');
}
function endSession() {
  if (!S.session) return;
  S.session.endedAt = Date.now();
  S.sessions.unshift(S.session);
  LS.set('sessions', S.sessions);
  LS.del('session');
  const done = S.session; S.session = null;
  syncOne(done);
  return done;
}

/* --------------------------------------------------------- SUS and stats */
function susScore(answers) {
  if (!answers || answers.length !== 10) return null;
  let total = 0;
  answers.forEach((a, i) => { total += (i % 2 === 0) ? (a - 1) : (5 - a); });
  return Math.round(total * 2.5 * 10) / 10;
}
function stats(list) {
  const out = { n: list.length, sus: [], attempts: 0, completed: 0, unaided: 0, byTask: {}, byLit: {} };
  TASKS.forEach(t2 => out.byTask[t2.id] = { attempts: 0, completed: 0, unaided: 0, secs: [], errors: 0 });
  list.forEach(s => {
    const sc = susScore(s.sus); if (sc !== null) out.sus.push(sc);
    const lit = s.literacy || 'unknown';
    out.byLit[lit] = out.byLit[lit] || { n: 0, sus: [], unaided: 0, attempts: 0, errors: 0 };
    out.byLit[lit].n++;
    if (sc !== null) out.byLit[lit].sus.push(sc);
    TASKS.forEach(t2 => {
      const r = s.tasks && s.tasks[t2.id];
      if (!r || r.state === 'running') return;
      const b = out.byTask[t2.id];
      b.attempts++; out.attempts++; out.byLit[lit].attempts++;
      b.errors += r.errors || 0; out.byLit[lit].errors += r.errors || 0;
      if (r.state === 'completed') {
        b.completed++; out.completed++;
        if (typeof r.seconds === 'number') b.secs.push(r.seconds);
        if (r.unaided) { b.unaided++; out.unaided++; out.byLit[lit].unaided++; }
      }
    });
  });
  const mean = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
  out.meanSus = mean(out.sus);
  out.sdSus = out.sus.length > 1
    ? Math.sqrt(out.sus.reduce((acc, v) => acc + (v - out.meanSus) ** 2, 0) / (out.sus.length - 1)) : null;
  out.median = a => { if (!a.length) return null; const b = [...a].sort((x, y) => x - y); const m = b.length >> 1;
    return b.length % 2 ? b[m] : Math.round((b[m - 1] + b[m]) / 2); };
  return out;
}

/* ------------------------------------------------------- optional sync */
async function syncOne(sess) {
  if (!S.cfg.url || !S.cfg.key || !navigator.onLine) return false;
  try {
    const r = await fetch(S.cfg.url.replace(/\/$/, '') + '/rest/v1/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: S.cfg.key,
                 Authorization: 'Bearer ' + S.cfg.key, Prefer: 'return=minimal' },
      body: JSON.stringify({ session_id: sess.id, code: sess.code, literacy: sess.literacy,
        phone_before: sess.phoneBefore, device_provided: sess.deviceProvided, lang: sess.lang,
        started_at: new Date(sess.startedAt).toISOString(),
        ended_at: sess.endedAt ? new Date(sess.endedAt).toISOString() : null,
        sus_score: susScore(sess.sus), payload: sess }),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    sess.synced = true; LS.set('sessions', S.sessions); return true;
  } catch { return false; }
}
async function syncAll() {
  let n = 0;
  for (const s of S.sessions) if (!s.synced && await syncOne(s)) n++;
  return n;
}
/* ---------------------------------------------------- evaluation workbook
   Reproduces the project's own questionnaire workbook: a summary of SUS
   responses, a task-performance sheet, and one filled questionnaire per
   participant with the chosen box ticked. */
const LANG_NAME = { en: 'English', ha: 'Hausa', ig: 'Igbo', yo: 'Yoruba' };
const SCALE_HEAD = ['1\nStrongly disagree', '2\nDisagree', '3\nNeither agree nor disagree',
                    '4\nAgree', '5\nStrongly agree'];
const TITLE1 = 'FARMER USABILITY EVALUATION QUESTIONNAIRE';
const TITLE2 = 'User-Centered Design and Usability Evaluation of a Digital Agricultural '
             + 'Marketplace for Smallholder Farmers in Nigeria';

function participantRows(sess) {
  const ans = sess.sus || [];
  const d = new Date(sess.startedAt);
  const rows = [];
  rows[0] = [{ v: TITLE1, s: 1 }];
  rows[1] = [TITLE2];
  rows[2] = [];
  rows[3] = [{ v: 'PARTICIPANT INFORMATION', s: 1 }];
  rows[4] = ['Participant ID', sess.code || sess.id, '', 'Date', d.toISOString().slice(0, 10)];
  rows[5] = ['Preferred language', LANG_NAME[sess.lang] || sess.lang, '', 'Facilitator', sess.facilitator || ''];
  rows[6] = [];
  rows[7] = [{ v: 'HOW TO ANSWER', s: 1 }];
  rows[8] = ['Choose one answer for each statement. If needed, the facilitator can read each '
           + "statement aloud in the participant's preferred language and record the answer."];
  rows[9] = [];
  rows[10] = [{ v: 'No.', s: 2 }, { v: 'Statement', s: 2 }, ...SCALE_HEAD.map(h => ({ v: h, s: 2 }))];
  window.SUS_ITEMS.forEach((item, i) => {
    rows[11 + i] = [i + 1, { v: item, s: 3 },
      ...[1, 2, 3, 4, 5].map(n => (ans[i] === n ? '\u2713' : '\u2610'))];
  });
  rows[21] = [];
  rows[22] = [{ v: 'FACILITATOR NOTES (OPTIONAL)', s: 1 }];
  rows[23] = [{ v: sess.notes || '', s: 3 }];
  rows[24] = [];
  rows[25] = [];
  return rows;
}

function summaryRows(list) {
  const rows = [];
  rows[0] = [{ v: `SUS RESPONSES \u2014 ${list.length} PARTICIPANT${list.length === 1 ? '' : 'S'}`, s: 1 }];
  rows[1] = [];
  rows[2] = [{ v: 'Participant ID', s: 1 },
    ...[1,2,3,4,5,6,7,8,9,10].map(n => ({ v: 'Q' + n, s: 1 })),
    { v: 'SUS score', s: 1 }, { v: 'Language', s: 1 }];
  list.forEach((sess, i) => {
    const ans = sess.sus || [];
    const sc = susScore(sess.sus);
    rows[3 + i] = [sess.code || sess.id,
      ...[0,1,2,3,4,5,6,7,8,9].map(k => (typeof ans[k] === 'number' ? ans[k] : '')),
      sc === null ? '' : sc, LANG_NAME[sess.lang] || sess.lang];
  });
  return rows;
}

function taskRows(list) {
  const rows = [];
  rows[0] = [{ v: 'TASK PERFORMANCE', s: 1 }];
  rows[1] = [];
  const head = ['Participant ID', 'Literacy', 'Used smartphone before', 'Device provided', 'Language'];
  TASKS.forEach(t2 => head.push(t2.id + ' outcome', t2.id + ' time (s)', t2.id + ' assists', t2.id + ' errors'));
  head.push('Tasks completed', 'Completed unaided', 'Total assists', 'Total errors', 'SUS score', 'Session (min)');
  rows[2] = head.map(h => ({ v: h, s: 2 }));
  list.forEach((sess, i) => {
    const r = [sess.code || sess.id, sess.literacy, sess.phoneBefore, sess.deviceProvided,
               LANG_NAME[sess.lang] || sess.lang];
    let done = 0, unaided = 0, a = 0, e = 0;
    TASKS.forEach(t2 => {
      const rec = (sess.tasks || {})[t2.id] || {};
      r.push(rec.state || '', typeof rec.seconds === 'number' ? rec.seconds : '',
             rec.assists || 0, rec.errors || 0);
      if (rec.state === 'completed') done++;
      if (rec.unaided) unaided++;
      a += rec.assists || 0; e += rec.errors || 0;
    });
    const sc = susScore(sess.sus);
    r.push(done, unaided, a, e, sc === null ? '' : sc,
           sess.endedAt ? Math.max(1, Math.round((sess.endedAt - sess.startedAt) / 60000)) : '');
    rows[3 + i] = r;
  });
  return rows;
}

function buildWorkbook() {
  const list = S.sessions.slice().reverse();   // chronological, P01 first
  const sheets = [
    { name: `${list.length} Respondent Summary`, rows: summaryRows(list),
      widths: [16, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 12, 14] },
    { name: 'Task Performance', rows: taskRows(list),
      widths: [16, 13, 20, 16, 12].concat(Array(20).fill(12), [15, 16, 13, 12, 11, 13]) },
  ];
  list.forEach(sess => sheets.push({
    name: sess.code || sess.id, rows: participantRows(sess),
    widths: [6, 62, 16, 13, 24, 13, 16],
  }));
  return window.XLSX.build(sheets);
}

function saveBlob(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

function toCSV() {
  const head = ['session','code','literacy','phone_before','device_provided','lang','sus',
    ...TASKS.flatMap(t2 => [t2.id + '_state', t2.id + '_secs', t2.id + '_assists', t2.id + '_errors', t2.id + '_unaided'])];
  const rows = S.sessions.map(s => [s.id, s.code, s.literacy, s.phoneBefore, s.deviceProvided, s.lang, susScore(s.sus) ?? '',
    ...TASKS.flatMap(t2 => { const r = (s.tasks || {})[t2.id] || {};
      return [r.state || '', r.seconds ?? '', r.assists ?? '', r.errors ?? '', r.unaided ? 1 : 0]; })]);
  return [head, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
}

/* ================================================================ speech */
let speaking = false;
function speak(text) {
  log('audio', text.slice(0, 60));
  if (!('speechSynthesis' in window)) return flash();
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = { en: 'en-NG', ha: 'ha-NG', ig: 'ig-NG', yo: 'yo-NG' }[S.lang] || 'en';
    u.rate = 0.92;
    speaking = true; u.onend = () => { speaking = false; };
    speechSynthesis.speak(u);
  } catch { flash(); }
  flash();
}
function flash() {
  document.querySelectorAll('.spk').forEach(e => {
    e.classList.add('playing'); setTimeout(() => e.classList.remove('playing'), 1200);
  });
}

/* ============================================================ navigation */
function go(screen, opts) {
  opts = opts || {};
  if (!opts.replace && S.screen !== screen) S.stack.push(S.screen);
  S.screen = screen;
  log('nav', screen);
  autoComplete(screen);
  render();
  const sc = document.querySelector('.scroll'); if (sc) sc.scrollTop = 0;
}
function back() {
  const prev = S.stack.pop();
  if (prev) { S.screen = prev; log('back', prev); render(); }
}

/* =============================================================== partials */
const img = (id, cls) => {
  const k = cls === undefined ? '' : cls;
  return `<img class="${k}" src="img/${id}.png" alt="${esc(crop(id))}" loading="lazy"
    data-fallback="${k}" onerror="window.imgFallback(this)">`;
};
window.imgFallback = (el) => {
  const d = document.createElement('div');
  d.className = (el.getAttribute('data-fallback') || '') + ' ph';
  el.replaceWith(d);
};

const topbar = (opts) => {
  opts = opts || {};
  return `<div class="topbar">
    ${opts.back === false ? '' : `<button class="iconbtn" data-act="back" aria-label="${esc(t('common.back'))}">${I.back}</button>`}
    <div class="spacer"></div>
    ${opts.right || ''}
  </div>`;
};
const speakBtn = (text, size) =>
  `<button class="spk" data-act="say" data-arg="${esc(text)}" aria-label="${esc(t('common.listen'))}"${size ? ` style="width:${size}px;height:${size}px"` : ''}>${I.spk}</button>`;
const hearBar = (label, text) =>
  `<button class="hearbar" data-act="say" data-arg="${esc(text || label)}">
     <span class="spk">${I.spk}</span><span>${esc(label)}</span></button>`;
const dock = (...btns) => `<div class="dock">${btns.filter(Boolean).join('')}</div>`;
const btn = (label, act, kind, arg) =>
  `<button class="btn btn-${kind || 'primary'}" data-act="${act}"${arg !== undefined ? ` data-arg="${esc(arg)}"` : ''}>${esc(label)}</button>`;

function nav(active) {
  const items = [['home', I.home, t('common.home')], ['prices', I.tag, t('common.prices')],
                 ['browse', I.grid, t('common.browse')], ['profile', I.me, t('common.me')]];
  return `<div class="nav">${items.map(([id, ic, label]) =>
    `<button data-act="go" data-arg="${id}" class="${active === id ? 'on' : ''}">
       <span class="chip">${ic}</span><span>${esc(label)}</span></button>`).join('')}</div>`;
}
/* The language control is deliberately reachable from every screen. A farmer
   handed a phone mid-task should not have to go back to the start to be
   understood, and a panel member will want to switch wherever they happen
   to be standing in the app. */
function langFab() {
  if (S.screen === 'lang' || S.screen === 'admin') return '';
  const L = window.LANGS.find(x => x.code === S.lang) || window.LANGS[0];
  return `<button class="langfab" data-act="openlang" aria-label="${esc(t('profile.language'))}">
    ${I.globe}<span>${esc(L.code.toUpperCase())}</span></button>`;
}
function langSheet() {
  return `<div class="overlay" data-act="closelang">
    <div class="modal langsheet">
      <div class="grab"></div>
      <h1>${esc(t('lang.title'))}</h1>
      <div style="height:12px"></div>
      ${window.LANGS.map(L => `
        <button class="row ${S.lang === L.code ? 'sel' : ''}" data-act="setlang" data-arg="${L.code}">
          <span class="grow"><span class="ttl">${esc(L.name)}</span><br>
            <span class="sub2">${esc(L.native)}</span></span>
          ${S.lang === L.code
            ? `<span class="pill pill-clay"><i class="dot"></i>${esc(L.code.toUpperCase())}</span>`
            : `<span class="spk">${I.spk}</span>`}
        </button>`).join('')}
    </div>
  </div>`;
}

const statusPill = (st) => {
  const map = { published: ['pill-green', t('status.published')], sending: ['pill-ochre', t('status.sending')], draft: ['pill-grey', t('status.draft')] };
  const [cls, label] = map[st] || map.draft;
  return `<span class="pill ${cls}"><i class="dot"></i>${esc(label)}</span>`;
};

/* ================================================================ screens */
const V = {};

V.lang = () => `
  <div class="hero" style="background-image:url(img/hero.png)">
    <div class="on">
      <div class="display" style="font-size:42px">${esc(t('app.name'))}</div>
      <div style="opacity:.92;font-size:15px;font-weight:500">${esc(t('app.tagline'))}</div>
    </div>
  </div>
  <div class="sheet scroll pad">
    <h1>${esc(t('lang.title'))}</h1>
    <div style="height:10px"></div>
    ${window.LANGS.map(L => `
      <button class="row ${S.lang === L.code ? 'sel' : ''}" data-act="setlang" data-arg="${L.code}">
        <span class="grow"><span class="ttl">${esc(L.name)}</span><br><span class="sub2">${esc(L.native)}</span></span>
        <span class="spk">${I.spk}</span>
      </button>`).join('')}
  </div>
  ${dock(btn(t('common.continue'), 'go', 'primary', 'role'))}`;

V.role = () => `
  ${topbar()}
  <div class="scroll pad">
    <h1>${esc(t('role.title'))}</h1>
    <div style="height:12px"></div>
    ${[['farmer', 'role.sell', 'role.sell.sub', 'cassava'], ['buyer', 'role.buy', 'role.buy.sub', 'hero']].map(([r, k, sk, im]) => `
      <button class="card ${S.role === r ? 'sel' : ''}" style="width:100%;text-align:left;margin-bottom:14px;padding:8px"
              data-act="setrole" data-arg="${r}">
        <img src="img/${im}.png" alt="" style="width:100%;height:146px;object-fit:cover;border-radius:16px;display:block;background:var(--line)">
        <div style="padding:14px 10px 6px">
          <div style="font-size:20px;font-weight:700">${esc(t(k))}</div>
          <div class="sub">${esc(t(sk))}</div>
        </div>
      </button>`).join('')}
  </div>
  ${dock(btn(t('common.continue'), 'go', 'primary', 'phone'))}`;

const keypad = (okAct) => `
  <div class="keypad">
    ${['1','2','3','4','5','6','7','8','9'].map(n => {
      const sub = { '2':'ABC','3':'DEF','4':'GHI','5':'JKL','6':'MNO','7':'PQRS','8':'TUV','9':'WXYZ' }[n];
      return `<button class="key" data-act="digit" data-arg="${n}">${n}${sub ? `<small>${sub}</small>` : ''}</button>`;
    }).join('')}
    <button class="key key-del" data-act="digit" data-arg="del">${I.del}</button>
    <button class="key" data-act="digit" data-arg="0">0</button>
    <button class="key key-ok" data-act="${okAct}">${I.tickL.replace('46','26').replace('2.6','3')}</button>
  </div>`;

V.phone = () => `
  ${topbar()}
  <div class="scroll pad">
    <h1>${esc(t('phone.title'))}</h1>
    <p class="sub">${esc(t('phone.sub'))}</p>
    <div class="field" style="margin-top:18px">
      <span class="val">${esc(S.entry || '0803 456 789')}</span><span class="caret"></span>
      ${speakBtn(S.entry || '0803 456 789')}
    </div>
    ${keypad('go-verify')}
  </div>`;

V.verify = () => `
  ${topbar()}
  <div class="scroll pad">
    <h1>${esc(t('verify.title'))}</h1>
    <p class="sub">${esc(t('verify.sub'))}</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0">
      ${[0,1,2,3].map(i => {
        const d = (S.entry || '')[i];
        return `<div class="field" style="min-height:84px;justify-content:center;padding:0;${d ? '' : 'border-color:var(--line);border-width:1px'}">
          ${d ? `<span class="val" style="flex:0;text-align:center">${esc(d)}</span>`
              : (i === (S.entry || '').length ? '<span class="caret"></span>' : '')}</div>`;
      }).join('')}
    </div>
    <div class="center">${speakBtn('5 1 2 9')}</div>
    ${keypad('go-home')}
  </div>`;

V.home = () => {
  const near = CROPS.slice(1, 4);
  return `
  <div class="scroll pad has-nav">
    <div style="display:flex;align-items:center;gap:12px;padding:16px 52px 10px 0">
      <div class="grow" style="flex:1">
        <div class="sub" style="margin:0">Eruwa, Oyo State</div>
        <div class="display" style="font-size:30px">Adeola</div>
      </div>
      <div style="width:48px;height:48px;border-radius:24px;background:var(--clay-tint);display:grid;place-items:center;font-weight:700;color:var(--clay-dark)">A</div>
    </div>
    <button style="position:relative;display:block;width:100%;border-radius:22px;overflow:hidden;box-shadow:var(--shadow-lg);text-align:left"
            data-act="go" data-arg="sell-crop">
      <img src="img/cassava.png" alt="" style="width:100%;height:196px;object-fit:cover;display:block;background:var(--line)">
      <span style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,rgba(28,23,20,.85))"></span>
      <span style="position:absolute;left:20px;right:76px;bottom:18px;color:#fff">
        <span class="display" style="font-size:24px;display:block">${esc(t('home.sell'))}</span>
        <span style="font-size:13.5px;opacity:.9">${esc(t('home.sell.sub'))}</span></span>
      <span style="position:absolute;right:18px;bottom:22px;width:46px;height:46px;border-radius:23px;background:#fff;display:grid;place-items:center;color:var(--clay)">${I.arrow}</span>
    </button>
    <div class="grid2" style="margin-top:14px">
      <button class="card" style="text-align:left" data-act="go" data-arg="prices">
        <span style="color:var(--clay)">${I.tag}</span>
        <div style="font-weight:700;margin-top:8px">${esc(t('home.prices'))}</div>
        <div class="sub2" style="color:var(--muted);font-size:12.5px">${esc(crop('cassava'))} ${naira(145000)}</div>
      </button>
      <button class="card" style="text-align:left" data-act="go" data-arg="my-listings">
        <span style="color:var(--clay)">${I.grid}</span>
        <div style="font-weight:700;margin-top:8px">${esc(t('home.listings'))}</div>
        <div class="sub2" style="color:var(--muted);font-size:12.5px">1 · 2</div>
      </button>
    </div>
    <h2 style="margin-top:26px">${esc(t('home.near'))}</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
      ${near.map(c => `<button data-act="go" data-arg="prices" style="text-align:center">
        ${img(c.id, 'th-sq')}<div style="font-weight:700;font-size:13px;margin-top:6px">${esc(crop(c.id))}</div>
        <div style="font-size:12px;color:var(--muted)">${naira(c.market)}</div></button>`).join('')}
    </div>
    ${hearBar(t('home.hear'), t('home.sell') + '. ' + t('home.prices') + '. ' + t('home.listings'))}
  </div>
  ${nav('home')}`;
};

V['sell-crop'] = () => `
  ${topbar()}
  <div class="scroll pad has-dock">
    <div class="progress">${[1,2,3,4].map(i => `<i class="${i <= 1 ? 'on' : ''}"></i>`).join('')}</div>
    <h1>${esc(t('sell.crop.title'))}</h1>
    <div style="display:flex;align-items:center;gap:12px;margin:10px 0 18px">
      ${speakBtn(t('sell.crop.hint'))}<span class="sub" style="margin:0">${esc(t('sell.crop.hint'))}</span>
    </div>
    <div class="grid2">
      ${CROPS.map(c => `
        <button class="tile ${S.draft.crop === c.id ? 'sel' : ''}" data-act="pickcrop" data-arg="${c.id}">
          ${img(c.id)}
          <div class="nm">${esc(crop(c.id))}</div>
          <div class="nt">${esc(unitName(c.unit, 2))}</div>
          ${S.draft.crop === c.id ? `<span class="tick" style="color:#fff">${I.tick}</span>` : ''}
        </button>`).join('')}
    </div>
  </div>
  ${dock(btn(t('common.continue'), 'go', 'primary', 'sell-qty'))}`;

V['sell-qty'] = () => {
  const c = CROPS.find(x => x.id === S.draft.crop);
  const units = [['bag', 'bag'], ['basket', 'basket'], ['kilo', 'kilo']];
  return `
  ${topbar()}
  <div class="scroll pad has-dock">
    <div class="progress">${[1,2,3,4].map(i => `<i class="${i <= 2 ? 'on' : ''}"></i>`).join('')}</div>
    <h1>${esc(t('sell.qty.title'))}</h1>
    <div class="eyebrow">${esc(t('sell.qty.measure'))}</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
      ${units.map(([u]) => `
        <button class="card ${S.draft.unit === u ? 'sel' : ''}" style="text-align:center;padding:16px 8px"
                data-act="setunit" data-arg="${u}">
          <div style="font-weight:700;font-size:15px;color:${S.draft.unit === u ? 'var(--clay-dark)' : 'var(--ink)'}">${esc(t('common.' + u))}</div>
        </button>`).join('')}
    </div>
    <p class="note" style="margin-top:14px">${esc(t('sell.qty.note'))}</p>
    <div class="eyebrow">${esc(t('sell.qty.howmany'))}</div>
    <div class="stepper">
      <button data-act="qty" data-arg="-1">−</button>
      <div class="n">${S.draft.qty}</div>
      <button data-act="qty" data-arg="1">+</button>
    </div>
    ${hearBar('“' + S.draft.qty + ' ' + unitName(S.draft.unit, S.draft.qty) + ' ' + crop(c.id) + '”')}
  </div>
  ${dock(btn(t('common.continue'), 'go', 'primary', 'sell-price'))}`;
};

V['sell-price'] = () => {
  const c = CROPS.find(x => x.id === S.draft.crop);
  return `
  ${topbar()}
  <div class="scroll pad">
    <div class="progress">${[1,2,3,4].map(i => `<i class="${i <= 3 ? 'on' : ''}"></i>`).join('')}</div>
    <h1>${esc(t('sell.price.title'))}</h1>
    <p class="sub">${esc(t('sell.price.forone'))} ${esc(unitName(S.draft.unit, 1))}</p>
    <div class="field" style="margin-top:14px">
      <span class="val">${naira(S.draft.price)}</span>${speakBtn(naira(S.draft.price))}
    </div>
    <div class="banner banner-green" style="display:flex;align-items:center;gap:10px">
      <i style="width:10px;height:10px;border-radius:5px;background:var(--green);flex:none"></i>
      ${esc(t('sell.price.market'))}: ${naira(c.market)}
    </div>
    ${keypad('go-review')}
  </div>`;
};

V['sell-review'] = () => {
  const c = CROPS.find(x => x.id === S.draft.crop);
  return `
  ${topbar()}
  <div class="scroll pad has-dock">
    <div class="progress">${[1,2,3,4].map(() => '<i class="on"></i>').join('')}</div>
    <h1>${esc(t('sell.review.title'))}</h1>
    <div class="card" style="padding:10px;margin-top:12px">
      ${img(c.id, 'th-wide')}
      <div style="padding:14px 8px 6px">
        <div class="display" style="font-size:23px">${esc(crop(c.id))}</div>
        <div class="sub">${S.draft.qty} ${esc(unitName(S.draft.unit, S.draft.qty))}</div>
        <hr style="border:0;border-top:1px solid var(--line);margin:12px 0">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <span class="sub" style="margin:0">${esc(t('sell.review.priceone'))}</span>
          <span class="money" style="font-size:23px">${naira(S.draft.price)}</span>
        </div>
      </div>
    </div>
    ${hearBar(t('sell.review.hear'), crop(c.id) + ', ' + S.draft.qty + ' ' + unitName(S.draft.unit, S.draft.qty) + ', ' + naira(S.draft.price))}
    <div class="banner banner-ochre" style="display:flex;align-items:center;gap:10px">
      <i style="width:10px;height:10px;border-radius:5px;background:var(--muted);flex:none"></i>
      ${esc(t('sell.review.notyet'))}
    </div>
  </div>
  ${dock(btn(t('sell.publish'), 'go', 'primary', 'sell-done'), btn(t('sell.savelater'), 'go', 'secondary', 'my-listings'))}`;
};

V['sell-done'] = () => {
  const c = CROPS.find(x => x.id === S.draft.crop);
  return `
  <div class="hero" style="height:300px;background-image:url(img/${c.id}.png)">
    <div style="position:absolute;left:0;right:0;top:92px;z-index:2;text-align:center">
      <div style="width:92px;height:92px;border-radius:46px;background:#fff;display:inline-grid;place-items:center;color:var(--green);box-shadow:var(--shadow-lg)">${I.tickL}</div>
    </div>
    <div class="on" style="text-align:center;left:24px;right:24px;bottom:52px">
      <div class="display" style="font-size:28px">${esc(t('sell.done.title'))}</div>
    </div>
  </div>
  <div class="sheet scroll pad has-dock">
    <p class="sub center" style="font-size:15px">${esc(t('sell.done.sub'))}</p>
    <div class="banner banner-green" style="display:flex;align-items:center;gap:12px;margin-top:20px">
      <i style="width:20px;height:20px;border-radius:10px;background:var(--green);display:grid;place-items:center;color:#fff">${I.tick}</i>
      <b>${esc(t('status.published'))}</b>
    </div>
    ${hearBar(t('sell.review.hear'), t('sell.done.title') + '. ' + crop(c.id) + ', ' + naira(S.draft.price))}
  </div>
  ${dock(btn(t('sell.done.see'), 'go', 'primary', 'my-listings'), btn(t('sell.done.home'), 'go', 'secondary', 'home'))}`;
};

V.prices = () => `
  <div class="scroll pad has-nav">
    <div style="display:flex;align-items:flex-end;gap:12px;padding:16px 52px 4px 0">
      <div style="flex:1">
        <div class="display" style="font-size:29px">${esc(t('prices.title'))}</div>
        <div class="sub">${esc(t('prices.sub'))}</div>
      </div>
      ${speakBtn(t('prices.title'))}
    </div>
    <div style="height:10px"></div>
    ${CROPS.map(c => `
      <button class="row" data-act="price" data-arg="${c.id}">
        ${img(c.id, 'th-sm')}
        <span class="grow"><span class="ttl">${esc(crop(c.id))}</span><br>
          <span class="sub2">${esc(t('sell.price.forone'))} ${esc(unitName(c.unit, 1))}</span></span>
        <span style="text-align:right">
          <span class="money" style="font-size:17px">${naira(c.market)}</span><br>
          <span style="font-size:12.5px;font-weight:700;color:${c.trend >= 0 ? 'var(--green)' : 'var(--clay)'}">
            ${c.trend >= 0 ? '▲' : '▼'} ${Math.abs(c.trend)}%</span>
        </span>
      </button>`).join('')}
  </div>
  ${nav('prices')}`;

V['price-detail'] = () => {
  const c = CROPS.find(x => x.id === (S.pick || 'cassava'));
  return `
  <div class="hero" style="background-image:url(img/${c.id}.png)">
    <div class="on"><div class="display" style="font-size:31px">${esc(crop(c.id))}</div></div>
  </div>
  <div class="sheet scroll pad has-dock">
    ${topbar({ right: '' }).replace('<div class="topbar">', '<div class="topbar" style="padding-left:0;padding-top:0">')}
    <div class="display" style="font-size:42px">${naira(c.market)}</div>
    <p class="sub">${esc(t('sell.price.forone'))} ${esc(unitName(c.unit, 1))} · ${esc(t('prices.sub'))}</p>
    <div class="grid2" style="margin-top:16px">
      <div class="card center"><div class="sub2" style="color:var(--muted);font-size:12px">${esc(t('prices.lowest'))}</div>
        <div class="money" style="font-size:18px;margin-top:4px">${naira(c.low)}</div></div>
      <div class="card center"><div class="sub2" style="color:var(--muted);font-size:12px">${esc(t('prices.highest'))}</div>
        <div class="money" style="font-size:18px;margin-top:4px">${naira(c.high)}</div></div>
    </div>
    ${hearBar(t('prices.hear'), crop(c.id) + ', ' + naira(c.market))}
  </div>
  ${dock(btn(t('prices.sellmine'), 'go', 'primary', 'sell-crop'))}`;
};

V['my-listings'] = () => `
  <div class="scroll pad has-nav">
    <div style="padding:16px 52px 4px 0">
      <div class="display" style="font-size:29px">${esc(t('home.listings'))}</div>
    </div>
    <div style="height:10px"></div>
    ${MY_LISTINGS.map(l => `
      <button class="row" style="align-items:flex-start;flex-direction:column;gap:10px" data-act="open" data-arg="l1">
        <span style="display:flex;gap:14px;align-items:center;width:100%">
          ${img(l.crop, 'th-md')}
          <span class="grow"><span class="ttl">${esc(crop(l.crop))}</span><br>
            <span class="sub2">${l.qty} ${esc(unitName(l.unit, l.qty))} · ${naira(l.price)}</span></span>
        </span>
        <span style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          ${statusPill(l.status)}
          <span class="sub2">${esc(t('status.' + l.status + '.sub'))}</span>
        </span>
      </button>`).join('')}
  </div>
  ${nav('profile')}`;

V.browse = () => `
  <div class="scroll pad has-nav">
    <div style="padding:16px 52px 4px 0">
      <div class="display" style="font-size:29px">${esc(t('browse.title'))}</div>
      <div class="sub">${esc(t('browse.sub'))}</div>
    </div>
    <div style="display:flex;gap:10px;margin:14px 0">
      <button class="row" style="margin:0;flex:1;min-height:52px" data-act="go" data-arg="filter">
        <span style="color:var(--muted)">${I.search}</span>
        <span class="grow sub2" style="font-size:14px">${esc(t('browse.search'))}</span>
      </button>
      <button class="iconbtn" style="background:var(--clay-tint);border-color:transparent;color:var(--clay)" data-act="go" data-arg="filter">${I.sliders}</button>
    </div>
    <div class="grid2">
      ${LISTINGS.map(l => `
        <button class="card" style="padding:8px;text-align:left" data-act="open" data-arg="${l.id}">
          ${img(l.crop, 'th-wide')}
          <div style="padding:10px 6px 2px">
            <div style="font-weight:700;font-size:16px">${esc(crop(l.crop))}</div>
            <div class="sub2" style="color:var(--muted);font-size:12.5px">${l.qty} ${esc(unitName(l.unit, l.qty))} ${esc(t('browse.available'))}</div>
            <div class="money" style="color:var(--clay);font-size:17px;margin-top:4px">${naira(l.price)}</div>
            <div class="sub2" style="color:var(--muted);font-size:11.5px">${esc(l.dist)} ${esc(t('browse.away'))} · ${esc(l.seller)}</div>
          </div>
        </button>`).join('')}
    </div>
  </div>
  ${nav('browse')}`;

V.filter = () => `
  ${V.browse()}
  <div class="overlay" data-act="back">
    <div class="modal" data-stop="1">
      <div class="grab"></div>
      <h1>${esc(t('browse.filter'))}</h1>
      <div class="eyebrow">${esc(t('browse.crop'))}</div>
      <div class="chips">${CROPS.map(c => `
        <button class="chip-btn ${S.filter.crops.includes(c.id) ? 'on-clay' : ''}" data-act="togglecrop" data-arg="${c.id}">${esc(crop(c.id))}</button>`).join('')}</div>
      <div class="eyebrow">${esc(t('browse.howfar'))}</div>
      <div class="chips">${['5 km','10 km','25 km','Any'].map(d => `
        <button class="chip-btn ${S.filter.dist === d ? 'on' : ''}" data-act="setdist" data-arg="${d}">${d}</button>`).join('')}</div>
      <div class="eyebrow">${esc(t('browse.sortby'))}</div>
      <div class="chips">${[['nearest', t('browse.nearest')], ['cheapest', t('browse.cheapest')], ['newest', t('browse.newest')]].map(([k, label]) => `
        <button class="chip-btn ${S.filter.sort === k ? 'on' : ''}" data-act="setsort" data-arg="${k}">${esc(label)}</button>`).join('')}</div>
      <div style="height:20px"></div>
      ${btn(t('browse.show'), 'go', 'primary', 'browse')}
    </div>
  </div>`;

V.listing = () => {
  const l = LISTINGS.find(x => x.id === (S.pick || 'l1')) || LISTINGS[0];
  return `
  <div class="hero" style="height:330px;background-image:url(img/${l.crop}.png)">
    <div style="position:absolute;top:14px;left:24px;z-index:3">
      <button class="iconbtn" data-act="back">${I.back}</button></div>
  </div>
  <div class="sheet scroll pad has-dock">
    <div class="display" style="font-size:29px">${esc(crop(l.crop))}</div>
    <p class="sub">${l.qty} ${esc(unitName(l.unit, l.qty))} ${esc(t('browse.available'))}</p>
    <div class="money" style="font-size:32px;color:var(--clay)">${naira(l.price)}</div>
    <p class="sub">${esc(t('sell.price.forone'))} ${esc(unitName(l.unit, 1))}</p>
    <div class="row" style="margin-top:18px">
      <span style="width:52px;height:52px;border-radius:26px;background:var(--clay-tint);display:grid;place-items:center;font-weight:700;color:var(--clay-dark)">${esc(l.seller[0])}</span>
      <span class="grow"><span class="ttl">${esc(l.seller)}</span><br>
        <span class="sub2">${esc(l.place)} · ${esc(l.dist)} ${esc(t('browse.away'))}</span></span>
      ${speakBtn(l.seller + ', ' + l.place)}
    </div>
    ${hearBar(t('listing.hear'), crop(l.crop) + ', ' + l.qty + ' ' + unitName(l.unit, l.qty) + ', ' + naira(l.price))}
    <button class="row" style="border-style:dashed" data-act="go" data-arg="tx-offer">
      <span class="grow"><span class="ttl">${esc(t('tx.offer.title'))}</span><br>
      <span class="sub2">${esc(t('tx.illustrative'))}</span></span>${I.chev}
    </button>
  </div>
  ${dock(btn(t('listing.contact'), 'go', 'primary', 'contact'))}`;
};

V.contact = () => {
  const l = LISTINGS.find(x => x.id === (S.pick || 'l1')) || LISTINGS[0];
  const opts = [['contact.call', 'contact.call.sub', I.phone, 'var(--clay-tint)', 'var(--clay)'],
                ['contact.whatsapp', 'contact.whatsapp.sub', I.chat, 'var(--green-tint)', 'var(--green)'],
                ['contact.sms', 'contact.sms.sub', I.sms, 'var(--line)', 'var(--muted)']];
  return `
  ${V.listing()}
  <div class="overlay" data-act="back">
    <div class="modal" data-stop="1">
      <div class="grab"></div>
      <h1>${esc(t('contact.title'))}</h1>
      <div style="height:14px"></div>
      ${opts.map(([k, sk, ic, bg, fg], i) => `
        <button class="row ${i === 0 ? 'sel' : ''}" data-act="back">
          <span style="width:44px;height:44px;border-radius:14px;background:${bg};color:${fg};display:grid;place-items:center">${ic}</span>
          <span class="grow"><span class="ttl">${esc(t(k))}</span><br><span class="sub2">${esc(t(sk))}</span></span>
        </button>`).join('')}
      <p class="note center" style="margin-top:10px">${esc(t('contact.privacy'))}</p>
    </div>
  </div>`;
};

V.enquiries = () => `
  <div class="scroll pad has-nav">
    <div style="padding:16px 52px 4px 0">
      <div class="display" style="font-size:29px">${esc(t('enq.title'))}</div>
      <div class="sub">${esc(t('enq.sub'))}</div>
    </div>
    <div style="height:10px"></div>
    ${ENQUIRIES.map(e => `
      <div class="card ${e.state === 'new' ? 'sel' : ''}" style="margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="width:46px;height:46px;border-radius:23px;background:var(--line);display:grid;place-items:center;font-weight:700;color:var(--muted)">${esc(e.who[0])}</span>
          <span style="flex:1"><b>${esc(e.who)}</b><br><span class="sub2">${esc(t('sell.price.forone'))} ${esc(crop(e.crop))}</span></span>
          <span class="pill ${e.state === 'new' ? 'pill-clay' : 'pill-green'}">${esc(t('enq.' + e.state))}</span>
        </div>
        <p style="margin:12px 0 4px;font-size:14px">“${esc(e.msg)}”</p>
        <div class="sub2">${esc(e.when)}</div>
      </div>`).join('')}
  </div>
  ${nav('profile')}`;

V.profile = () => {
  const L = window.LANGS.find(x => x.code === S.lang);
  const rows = [
    [t('profile.language'), L.name, 'lang', I.globe],
    [t('profile.readaloud'), t('profile.on'), null, I.spk],
    [t('home.listings'), String(MY_LISTINGS.length), 'my-listings', I.grid],
    [t('enq.title'), String(ENQUIRIES.filter(e => e.state === 'new').length), 'enquiries', I.sms],
  ];
  return `
  <div class="scroll pad has-nav">
    <div style="padding:16px 52px 4px 0"><div class="display" style="font-size:29px">${esc(t('profile.title'))}</div></div>
    <div class="card" style="display:flex;align-items:center;gap:14px;margin:12px 0 18px">
      <span style="width:60px;height:60px;border-radius:30px;background:var(--clay-tint);display:grid;place-items:center;font-size:24px;font-weight:700;color:var(--clay-dark)">A</span>
      <span><b style="font-size:19px">Adeola</b><br><span class="sub2">0803 456 789 · Eruwa</span></span>
    </div>
    ${rows.map(([label, val, dest, ic]) => `
      <button class="row" ${dest ? `data-act="go" data-arg="${dest}"` : ''}>
        <span style="width:42px;height:42px;border-radius:14px;background:var(--clay-tint);color:var(--clay);display:grid;place-items:center">${ic}</span>
        <span class="grow ttl">${esc(label)}</span>
        <span class="sub2">${esc(val)}</span>${dest ? I.chev : ''}
      </button>`).join('')}
    <button class="row center" data-act="go" data-arg="session-setup" style="justify-content:center;color:var(--clay);font-weight:700">
      Facilitator — start a usability session</button>
  </div>
  ${nav('profile')}`;
};

/* --------------------------------------------------- transaction journey */
const txBanner = `<div class="banner banner-clay center"><b>${'Illustrative only'}</b> — no real money moves.</div>`;

V['tx-offer'] = () => {
  const l = LISTINGS.find(x => x.id === (S.pick || 'l1')) || LISTINGS[0];
  const total = S.offer.qty * S.offer.price;
  return `
  ${topbar()}
  <div class="scroll pad has-dock">
    <h1>${esc(t('tx.offer.title'))}</h1>
    ${txBanner}
    <div class="row">${img(l.crop, 'th-sm')}<span class="grow"><span class="ttl">${esc(crop(l.crop))}</span><br>
      <span class="sub2">${esc(l.seller)} · ${esc(l.place)}</span></span></div>
    <div class="eyebrow">${esc(t('sell.qty.howmany'))}</div>
    <div class="stepper">
      <button data-act="offerqty" data-arg="-1">−</button>
      <div class="n">${S.offer.qty}</div>
      <button data-act="offerqty" data-arg="1">+</button>
    </div>
    <div class="eyebrow">${esc(t('tx.offer.yourprice'))}</div>
    <div class="field"><span class="val">${naira(S.offer.price)}</span>${speakBtn(naira(S.offer.price))}</div>
    <div style="background:var(--ink);color:#fff;border-radius:20px;padding:18px 20px;margin-top:18px;display:flex;justify-content:space-between;align-items:flex-end">
      <span><span style="font-size:13px;opacity:.75">${esc(t('tx.offer.youpay'))}</span><br>
        <span class="display" style="font-size:28px">${naira(total)}</span></span>
      <span style="font-size:12px;opacity:.75">${S.offer.qty} × ${naira(S.offer.price)}</span>
    </div>
  </div>
  ${dock(btn(t('tx.offer.send'), 'go', 'primary', 'tx-received'))}`;
};

V['tx-received'] = () => {
  const total = S.offer.qty * S.offer.price;
  return `
  <div class="facil" style="background:var(--clay)">${esc(t('tx.recv.title'))}</div>
  <div class="scroll pad has-dock">
    <h1 style="margin-top:18px">${esc(t('tx.recv.title'))}</h1>
    ${txBanner}
    <div class="card sel">
      <div style="display:flex;gap:14px;align-items:center">
        ${img('cassava', 'th-md')}
        <div><div class="display" style="font-size:21px">${S.offer.qty} ${esc(unitName('bag', S.offer.qty))}</div>
        <div class="sub2">${esc(crop('cassava'))}</div></div>
      </div>
      <hr style="border:0;border-top:1px solid var(--line);margin:14px 0">
      <div class="srow"><span>${esc(t('sell.review.priceone'))}</span><span>${naira(S.offer.price)}</span></div>
      <div class="srow"><span>${esc(t('tx.recv.youget'))}</span>
        <span class="display" style="font-size:25px;color:var(--clay)">${naira(total)}</span></div>
    </div>
    ${hearBar(t('common.listen'), t('tx.recv.title') + '. ' + naira(total))}
  </div>
  ${dock(btn(t('tx.recv.accept'), 'go', 'green', 'tx-pay'), btn(t('tx.recv.decline'), 'back', 'secondary'))}`;
};

V['tx-pay'] = () => {
  const opts = [['tx.pay.cash', 'tx.pay.cash.sub', 'var(--clay-tint)', 'var(--clay)'],
                ['tx.pay.transfer', 'tx.pay.transfer.sub', 'var(--green-tint)', 'var(--green)'],
                ['tx.pay.ussd', 'tx.pay.ussd.sub', 'var(--line)', 'var(--muted)']];
  return `
  ${topbar()}
  <div class="scroll pad has-dock">
    <h1>${esc(t('tx.pay.title'))}</h1>
    ${txBanner}
    ${opts.map(([k, sk, bg, fg], i) => `
      <button class="row ${i === 0 ? 'sel' : ''}" data-act="go" data-arg="tx-transfer" style="align-items:flex-start;padding-top:16px">
        <span style="width:44px;height:44px;border-radius:14px;background:${bg};color:${fg};display:grid;place-items:center;flex:none">${I.lock}</span>
        <span class="grow"><span class="ttl">${esc(t(k))}</span><br><span class="sub2">${esc(t(sk))}</span></span>
        ${i === 0 ? `<span class="tick" style="position:static;color:#fff">${I.tick}</span>` : ''}
      </button>`).join('')}
    ${hearBar(t('common.listen'), t('tx.pay.cash') + '. ' + t('tx.pay.transfer') + '. ' + t('tx.pay.ussd'))}
  </div>
  ${dock(btn(t('common.continue'), 'go', 'primary', 'tx-transfer'))}`;
};

V['tx-transfer'] = () => {
  const total = S.offer.qty * S.offer.price;
  return `
  ${topbar()}
  <div class="scroll pad has-dock">
    <h1>${esc(t('tx.transfer.title'))} ${naira(total)}</h1>
    <p class="sub">${esc(t('tx.transfer.sub'))}</p>
    ${txBanner}
    <div style="background:var(--ink);color:#fff;border-radius:20px;padding:18px 20px">
      <div style="font-size:10px;letter-spacing:.12em;font-weight:700;opacity:.65">${esc(t('tx.transfer.acct'))}</div>
      <div style="display:flex;align-items:center;gap:12px;margin:6px 0 14px">
        <span style="font-size:25px;font-weight:700;letter-spacing:.06em;flex:1">8142907356</span>
        <button style="background:rgba(255,255,255,.14);border-radius:10px;padding:8px 14px;font-size:12px;font-weight:700;color:#fff">${esc(t('tx.transfer.copy'))}</button>
      </div>
      <hr style="border:0;border-top:1px solid rgba(255,255,255,.16);margin:0 0 12px">
      <div style="display:flex;justify-content:space-between;font-size:14px">
        <span><span style="opacity:.65;font-size:11px">${esc(t('tx.transfer.bank'))}</span><br><b>Wema Bank</b></span>
        <span style="text-align:right"><span style="opacity:.65;font-size:11px">${esc(t('tx.transfer.name'))}</span><br><b>Basket / Adeola</b></span>
      </div>
    </div>
    <div class="banner banner-green" style="display:flex;gap:12px;align-items:flex-start">
      <span style="flex:none;color:var(--green)">${I.lock}</span><span>${esc(t('tx.transfer.held'))}</span>
    </div>
    <div class="eyebrow">${esc(t('tx.transfer.nointernet'))}</div>
    <div class="row"><span class="grow"><b style="font-size:16px">*894*740000*8142907356#</b><br>
      <span class="sub2">${esc(t('tx.transfer.dial'))}</span></span></div>
    ${hearBar(t('common.listen'), '8 1 4 2 9 0 7 3 5 6')}
  </div>
  ${dock(btn(t('tx.transfer.sent'), 'go', 'primary', 'tx-held'))}`;
};

V['tx-held'] = () => {
  const total = S.offer.qty * S.offer.price;
  const steps = [[t('tx.held.step1'), 1], [t('tx.held.step2'), 0], [t('tx.held.step3'), 0]];
  return `
  ${topbar()}
  <div class="scroll pad has-dock">
    <h1>${esc(t('tx.held.title'))}</h1>
    ${txBanner}
    <div class="banner banner-green center" style="padding:22px">
      <div class="display" style="font-size:34px;color:var(--green)">${naira(total)}</div>
      <div style="font-size:13px">${esc(t('tx.held.sub'))}</div>
    </div>
    <div class="timeline">
      ${steps.map(([label, on]) => `
        <div class="tl ${on ? 'on' : ''}">
          <span class="bead" style="color:#fff">${on ? I.tick : ''}</span>
          <span><b style="color:${on ? 'var(--ink)' : 'var(--muted)'}">${esc(label)}</b></span>
        </div>`).join('')}
    </div>
    <div class="row"><span style="width:50px;height:50px;border-radius:25px;background:var(--clay-tint);display:grid;place-items:center;font-weight:700;color:var(--clay-dark)">A</span>
      <span class="grow"><span class="ttl">Adeola</span><br><span class="sub2">Eruwa · 4.2 km</span></span>
      <span style="width:44px;height:44px;border-radius:22px;background:var(--green);color:#fff;display:grid;place-items:center">${I.phone}</span></div>
  </div>
  ${dock(btn(t('tx.held.collected'), 'go', 'primary', 'tx-confirm'))}`;
};

V['tx-confirm'] = () => {
  const total = S.offer.qty * S.offer.price;
  return `
  <div class="facil" style="background:var(--clay)">${esc(t('tx.confirm.title'))}</div>
  <div class="scroll pad has-dock">
    <h1 style="margin-top:18px">${esc(t('tx.confirm.title'))}</h1>
    <p class="sub">${esc(t('tx.confirm.sub'))}</p>
    ${txBanner}
    <div class="card" style="padding:10px">
      ${img('cassava', 'th-wide')}
      <div style="padding:14px 8px 4px;display:flex;justify-content:space-between;align-items:flex-end">
        <span><b style="font-size:18px">${S.offer.qty} ${esc(unitName('bag', S.offer.qty))}</b><br>
          <span class="sub2">${esc(crop('cassava'))}</span></span>
        <span class="display" style="font-size:23px;color:var(--clay)">${naira(total)}</span>
      </div>
    </div>
    ${hearBar(t('common.listen'), t('tx.confirm.title'))}
  </div>
  ${dock(btn(t('tx.confirm.yes'), 'go', 'green', 'tx-receipt'), btn(t('tx.confirm.notyet'), 'back', 'secondary'))}`;
};

V['tx-receipt'] = () => {
  const total = S.offer.qty * S.offer.price;
  const rows = [[t('sell.crop.title').replace('?', ''), crop('cassava')],
    [t('sell.qty.howmany'), S.offer.qty + ' ' + unitName('bag', S.offer.qty)],
    [t('sell.review.priceone'), naira(S.offer.price)],
    [t('tx.offer.youpay'), naira(total)]];
  return `
  <div class="scroll pad has-dock">
    <div class="tick-circle" style="color:var(--green)">${I.tickL}</div>
    <div class="display center" style="font-size:29px">${naira(total)} ${esc(t('tx.receipt.paid'))}</div>
    <p class="sub center">${esc(t('tx.receipt.title'))}</p>
    ${txBanner}
    <div class="card">
      ${rows.map(([k, v]) => `<div class="srow"><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join('')}
      <hr class="dashed">
      <div class="center sub2">${esc(t('tx.receipt.ref'))} · BSK-7F2K-9034</div>
    </div>
    ${hearBar(t('tx.receipt.hear'), naira(total) + ' ' + t('tx.receipt.paid'))}
  </div>
  ${dock(btn(t('tx.receipt.share'), 'go', 'primary', 'tx-payments'), btn(t('common.done'), 'go', 'secondary', 'home'))}`;
};

V['tx-payments'] = () => {
  const total = S.offer.qty * S.offer.price;
  const list = [['Chidi', 'cassava', total, 'published'], ['Fatima', 'maize', 980000, 'sending'], ['Tunde', 'okra', 66000, 'published']];
  return `
  <div class="scroll pad has-nav">
    <div style="padding:16px 52px 4px 0"><div class="display" style="font-size:29px">${esc(t('tx.pay.title.short'))}</div></div>
    ${txBanner}
    <div style="background:var(--ink);color:#fff;border-radius:22px;padding:20px;box-shadow:var(--shadow-lg)">
      <div style="font-size:12px;opacity:.7">${esc(t('tx.pay.waiting'))}</div>
      <div class="display" style="font-size:34px;margin:4px 0 14px">${naira(total)}</div>
      <button style="background:#fff;color:var(--ink);border-radius:18px;padding:10px 18px;font-weight:700;font-size:13px">${esc(t('tx.pay.tobank'))}</button>
    </div>
    <div class="eyebrow">${esc(t('home.near'))}</div>
    ${list.map(([who, c, amt, st]) => `
      <div class="row">
        <span style="width:46px;height:46px;border-radius:23px;background:var(--line);display:grid;place-items:center;font-weight:700;color:var(--muted)">${esc(who[0])}</span>
        <span class="grow"><span class="ttl">${esc(who)}</span><br><span class="sub2">${esc(crop(c))}</span></span>
        <span style="text-align:right"><span class="money">${naira(amt)}</span><br>${statusPill(st)}</span>
      </div>`).join('')}
  </div>
  ${nav('profile')}`;
};

/* -------------------------------------------------------------- session */
let setup = { code: '', literacy: 'none', phoneBefore: 'no', deviceProvided: 'yes', lang: 'yo' };
const nextCode = () => 'P' + String(S.sessions.length + 1).padStart(2, '0');
/* The chips re-render the screen, so the field must write straight to state
   or a typed code is lost the moment the facilitator taps Literacy. */
window.setParticipantCode = (v) => { setup.code = v; };

V['session-setup'] = () => `
  <div class="facil"><i class="live"></i> FACILITATOR</div>
  ${topbar()}
  <div class="scroll pad has-dock">
    <h1>New session</h1>
    <p class="sub">Recorded against the participant code only. No names.</p>
    <div class="eyebrow">PARTICIPANT CODE</div>
    <div class="field" style="min-height:62px">
      <input id="pcode" class="val" style="border:0;outline:0;background:transparent;width:100%"
             placeholder="${esc(nextCode())}" value="${esc(setup.code)}" autocomplete="off"
             oninput="window.setParticipantCode(this.value)">
    </div>
    ${[['LITERACY', 'literacy', [['none','None'],['basic','Basic'],['functional','Functional'],['fluent','Fluent']]],
       ['USED A SMARTPHONE BEFORE', 'phoneBefore', [['yes','Yes'],['no','No']]],
       ['DEVICE PROVIDED BY US', 'deviceProvided', [['yes','Yes'],['no','No']]],
       ['LANGUAGE OF SESSION', 'lang', window.LANGS.map(L => [L.code, L.name])]].map(([label, field, opts]) => `
      <div class="eyebrow">${label}</div>
      <div class="chips">${opts.map(([v, lbl]) => `
        <button class="chip-btn ${setup[field] === v ? 'on' : ''}" data-act="setup" data-arg="${field}:${v}">${esc(lbl)}</button>`).join('')}</div>`).join('')}
    <div class="banner banner-ochre">These three are recorded separately so they can be told apart in analysis — in the first study they varied together and could not be.</div>
  </div>
  ${dock(btn('Start session', 'startsession', 'primary'))}`;

V.sus = () => {
  const i = S.susIndex;
  const scale = (window.SUS_SCALE[S.lang] || window.SUS_SCALE.en);
  const item = window.SUS_ITEMS[i];
  return `
  <div class="scroll pad">
    <div class="progress" style="margin-top:20px">${window.SUS_ITEMS.map((_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('')}</div>
    <p class="sub">Question ${i + 1} of 10</p>
    <h1>${esc(item)}</h1>
    ${hearBar(t('common.listen'), item)}
    <div style="height:6px"></div>
    ${[1,2,3,4,5].map(v => `
      <button class="row ${S.susAnswers[i] === v ? 'sel' : ''}" data-act="sus" data-arg="${v}">
        <span style="width:42px;height:42px;border-radius:21px;background:${S.susAnswers[i] === v ? 'var(--clay)' : 'var(--bg)'};color:${S.susAnswers[i] === v ? '#fff' : 'var(--muted)'};display:grid;place-items:center;font-weight:700">${v}</span>
        <span class="grow ttl">${esc(scale[v - 1])}</span>
      </button>`).join('')}
    <p class="note center">Read aloud in the participant’s language. Answered by voice or by tapping.</p>
  </div>`;
};

V['session-done'] = () => {
  const s = S.sessions[0];
  if (!s) return `<div class="scroll pad"><h1>No session</h1></div>`;
  const sc = susScore(s.sus);
  const done = TASKS.filter(x => (s.tasks[x.id] || {}).state === 'completed').length;
  const un = TASKS.filter(x => (s.tasks[x.id] || {}).unaided).length;
  const assists = TASKS.reduce((a, x) => a + ((s.tasks[x.id] || {}).assists || 0), 0);
  const errors = TASKS.reduce((a, x) => a + ((s.tasks[x.id] || {}).errors || 0), 0);
  const mins = Math.max(1, Math.round((s.endedAt - s.startedAt) / 60000));
  return `
  <div class="scroll pad has-dock">
    <div class="tick-circle" style="color:var(--green)">${I.tickL}</div>
    <div class="display center" style="font-size:30px">Thank you</div>
    <p class="sub center">E ṣé. That is everything we needed.</p>
    <div class="eyebrow">FACILITATOR SUMMARY — ${esc(s.code || s.id)}</div>
    <div class="card">
      ${[['SUS score', sc === null ? '—' : sc.toFixed(1)], ['Tasks completed', done + ' of 5'],
         ['Completed unaided', un + ' of 5'], ['Assists logged', assists],
         ['Errors logged', errors], ['Session length', mins + ' min'],
         ['Synced', s.synced ? 'Yes' : 'Not yet']]
        .map(([k, v]) => `<div class="srow"><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join('')}
    </div>
    <div class="eyebrow">FACILITATOR NOTES</div>
    <textarea id="snotes" rows="3" placeholder="What happened, in your words. Goes into the workbook."
      style="width:100%;padding:14px;border:1px solid var(--line);border-radius:14px;background:var(--surface);font:inherit;resize:vertical">${esc(s.notes || '')}</textarea>
    <div class="banner banner-ochre center">Not shown to the participant.</div>
  </div>
  ${dock(btn('Save and next participant', 'donenext', 'secondary'), btn('Open results', 'doneadmin', 'quiet'))}`;
};

/* ---------------------------------------------------------------- admin */
V.admin = () => {
  const st = stats(S.sessions);
  const pct = (a, b) => b ? Math.round(a / b * 1000) / 10 + '%' : '—';
  const lits = ['none', 'basic', 'functional', 'fluent'];
  const maxSus = 100;
  return `
  <div class="admin" style="background:var(--bg);min-height:100dvh">
    <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
      <div style="flex:1;min-width:200px">
        <div class="display" style="font-size:28px">${esc(t('app.name'))}</div>
        <div class="sub">Usability results · ${st.n} session${st.n === 1 ? '' : 's'} stored on this device</div>
      </div>
      <button class="btn btn-quiet" style="width:auto;min-height:44px" data-act="go" data-arg="home">Back to app</button>
      <button class="btn btn-quiet" style="width:auto;min-height:44px" data-act="sync">Sync</button>
      <button class="btn btn-quiet" style="width:auto;min-height:44px" data-act="csv">CSV</button>
      <button class="btn btn-primary" style="width:auto;min-height:44px" data-act="workbook">Export evaluation workbook</button>
    </div>
    <div class="kpis">
      ${[['Participants', st.n, 'sessions completed'],
         ['Mean SUS', st.meanSus === null ? '—' : st.meanSus.toFixed(1),
           st.sdSus === null ? 'needs 2+ sessions' : 'SD ' + st.sdSus.toFixed(1)],
         ['Tasks completed', pct(st.completed, st.attempts), st.completed + ' of ' + st.attempts + ' attempts'],
         ['Completed unaided', pct(st.unaided, st.attempts), 'the gap that matters']]
        .map(([k, v, n]) => `<div class="kpi"><div class="k">${esc(k.toUpperCase())}</div><div class="v">${esc(String(v))}</div><div class="n">${esc(n)}</div></div>`).join('')}
    </div>
    <div class="card" style="margin-bottom:20px">
      <h2>Completion by task</h2>
      <table><thead><tr><th>Task</th><th>Unaided</th><th>Completed</th><th>Median time</th><th>Errors</th></tr></thead><tbody>
        ${TASKS.map(task => { const b = st.byTask[task.id];
          return `<tr><td><b>${task.id}</b> ${esc(task.key)}</td>
            <td>${b.attempts ? b.unaided + ' (' + pct(b.unaided, b.attempts) + ')' : '—'}</td>
            <td>${b.attempts ? b.completed + ' / ' + b.attempts : '—'}</td>
            <td>${b.secs.length ? st.median(b.secs) + ' s' : '—'}</td>
            <td>${b.errors}</td></tr>`; }).join('')}
      </tbody></table>
    </div>
    <div class="card" style="margin-bottom:20px">
      <h2>SUS by literacy</h2>
      ${lits.map(l => { const b = st.byLit[l];
        const m = b && b.sus.length ? b.sus.reduce((x, y) => x + y, 0) / b.sus.length : null;
        return `<div style="display:flex;align-items:center;gap:12px;margin:10px 0">
          <span style="width:92px;font-size:13px;font-weight:700;text-transform:capitalize">${l}</span>
          <span style="flex:1;background:var(--line);border-radius:5px;height:10px;overflow:hidden">
            <span class="bar" style="display:block;width:${m ? (m / maxSus * 100) : 0}%;background:${m && m >= 68 ? 'var(--green)' : 'var(--clay)'}"></span></span>
          <span style="width:90px;text-align:right;font-size:13px">${m ? m.toFixed(1) : '—'} <span style="color:var(--muted)">n=${b ? b.n : 0}</span></span>
        </div>`; }).join('')}
      <p class="note">Benchmark is 68. With a single device and no sync this is only what has been recorded here.</p>
    </div>
    <div class="card" style="margin-bottom:20px">
      <h2>Sessions</h2>
      ${st.n === 0 ? '<p class="note">No sessions yet. Open the app, go to Me → Facilitator, and run one.</p>' : `
      <table><thead><tr><th>Code</th><th>Literacy</th><th>Phone</th><th>Device</th><th>Lang</th><th>SUS</th><th>Synced</th></tr></thead><tbody>
      ${S.sessions.map(s => `<tr><td><b>${esc(s.code || s.id)}</b></td><td>${esc(s.literacy)}</td>
        <td>${esc(s.phoneBefore)}</td><td>${esc(s.deviceProvided)}</td><td>${esc(s.lang)}</td>
        <td>${susScore(s.sus) === null ? '—' : susScore(s.sus).toFixed(1)}</td>
        <td>${s.synced ? 'Yes' : 'No'}</td></tr>`).join('')}
      </tbody></table>`}
    </div>
    <div class="card">
      <h2>Connect Supabase</h2>
      <p class="note">Optional. Sessions are saved on this device either way. Paste your project URL and <b>anon</b> key to sync — never the service role key.</p>
      <div style="display:grid;gap:10px;margin-top:12px">
        <input id="sburl" placeholder="https://xxxx.supabase.co" value="${esc(S.cfg.url)}"
               style="padding:14px;border:1px solid var(--line);border-radius:12px;background:var(--surface)">
        <input id="sbkey" placeholder="anon public key" value="${esc(S.cfg.key)}"
               style="padding:14px;border:1px solid var(--line);border-radius:12px;background:var(--surface)">
        <button class="btn btn-secondary" data-act="savecfg">Save</button>
      </div>
      <details style="margin-top:14px"><summary class="note" style="cursor:pointer">Table to create in Supabase</summary>
<pre style="font-size:11.5px;overflow-x:auto;background:var(--bg);padding:12px;border-radius:10px">create table sessions (
  id bigint generated always as identity primary key,
  session_id text unique,
  code text, literacy text,
  phone_before text, device_provided text, lang text,
  started_at timestamptz, ended_at timestamptz,
  sus_score numeric, payload jsonb,
  created_at timestamptz default now()
);
alter table sessions enable row level security;
create policy "insert" on sessions for insert to anon with check (true);</pre></details>
    </div>
  </div>`;
};

/* ================================================================ render */
function facilitatorBar() {
  if (!S.session) return '';
  const task = currentTask();
  if (!task) {
    return `<div class="facil"><i class="live"></i> ${esc(S.session.code || S.session.id)} — all tasks done
      <span style="flex:1"></span>
      <button data-act="tosus" style="background:#fff;color:var(--ink);border-radius:8px;padding:5px 12px;font-size:11px;font-weight:700">Start SUS</button></div>`;
  }
  const rec = S.session.tasks[task.id];
  const secs = Math.round((Date.now() - rec.startedAt) / 1000);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0');
  return `<div class="facil"><i class="live"></i> ${task.id} ${esc(task.key)}
    <span>${mm}:${ss}</span><span>A${rec.assists} E${rec.errors}</span>
    <span style="flex:1"></span>
    <button data-act="assist" style="background:rgba(255,255,255,.16);border-radius:8px;padding:5px 10px;font-size:11px;font-weight:700">+A</button>
    <button data-act="error" style="background:rgba(255,255,255,.16);border-radius:8px;padding:5px 10px;font-size:11px;font-weight:700">+E</button>
    <button data-act="abandon" style="background:rgba(255,255,255,.16);border-radius:8px;padding:5px 10px;font-size:11px;font-weight:700">Skip</button></div>`;
}

function render() {
  const el = document.getElementById('view');
  const fn = V[S.screen] || V.lang;
  const isAdmin = S.screen === 'admin';
  document.getElementById('shell').style.maxWidth = isAdmin ? 'none' : '420px';
  const facil = isAdmin ? '' : facilitatorBar();
  el.innerHTML = facil + fn() + (isAdmin ? '' : langFab())
    + (S.langOpen && !isAdmin ? langSheet() : '');
  document.getElementById('shell').classList.toggle('has-facil', !!facil);
  document.documentElement.lang = S.lang;
  const off = document.getElementById('offline');
  if (off) off.style.display = S.online ? 'none' : 'block';
}

/* =============================================================== actions */
const ACT = {
  back,
  go: (arg) => go(arg),
  open: (arg) => { S.pick = arg; go('listing'); },
  price: (arg) => { S.pick = arg; go('price-detail'); },
  setlang: (arg) => { S.lang = arg; S.langOpen = false; LS.set('lang', arg); log('lang', arg); render(); },
  openlang: () => { S.langOpen = true; log('lang.open'); render(); },
  closelang: () => { S.langOpen = false; render(); },
  setrole: (arg) => { S.role = arg; render(); },
  pickcrop: (arg) => { S.draft.crop = arg; const c = CROPS.find(x => x.id === arg);
    S.draft.unit = c.unit; S.draft.price = c.price; log('crop', arg); render(); },
  setunit: (arg) => { S.draft.unit = arg; render(); },
  qty: (arg) => { S.draft.qty = Math.max(1, S.draft.qty + Number(arg)); render(); },
  offerqty: (arg) => { S.offer.qty = Math.max(1, S.offer.qty + Number(arg)); render(); },
  togglecrop: (arg) => { const i = S.filter.crops.indexOf(arg);
    i < 0 ? S.filter.crops.push(arg) : S.filter.crops.splice(i, 1); render(); },
  setdist: (arg) => { S.filter.dist = arg; render(); },
  setsort: (arg) => { S.filter.sort = arg; render(); },
  digit: (arg) => {
    if (arg === 'del') S.entry = S.entry.slice(0, -1);
    else if (S.entry.length < (S.screen === 'verify' ? 4 : 11)) S.entry += arg;
    render();
  },
  'go-verify': () => { S.entry = ''; go('verify'); },
  'go-home': () => { S.entry = ''; go('home'); },
  'go-review': () => go('sell-review'),
  say: (arg) => speak(arg),
  setup: (arg) => { const [f, v] = arg.split(':'); setup[f] = v; if (f === 'lang') { S.lang = v; LS.set('lang', v); } render(); },
  startsession: () => {
    const input = document.getElementById('pcode');
    setup.code = ((input && input.value.trim()) || setup.code || '').trim() || nextCode();
    startSession(setup);
    S.susIndex = 0; S.susAnswers = [];
    S.stack = []; go('lang', { replace: true });
  },
  assist: () => taskEvent('assist'),
  error: () => taskEvent('error'),
  abandon: () => { finishTask('abandoned'); render(); },
  tosus: () => { S.susIndex = 0; S.susAnswers = []; go('sus'); },
  sus: (arg) => {
    S.susAnswers[S.susIndex] = Number(arg);
    log('sus', S.susIndex + ':' + arg);
    if (S.susIndex < 9) { S.susIndex++; render(); }
    else { S.session.sus = S.susAnswers.slice(); endSession(); go('session-done'); }
  },
  savecfg: () => {
    const u = document.getElementById('sburl'), k = document.getElementById('sbkey');
    S.cfg = { url: (u && u.value.trim()) || '', key: (k && k.value.trim()) || '' };
    LS.set('cfg', S.cfg);
    syncAll().then(n => alert(S.cfg.url ? `Saved. ${n} session${n === 1 ? '' : 's'} synced.` : 'Saved.'));
  },
  sync: () => syncAll().then(n => alert(`${n} session${n === 1 ? '' : 's'} synced.`)),
  csv: () => {
    saveBlob(new Blob([toCSV()], { type: 'text/csv;charset=utf-8' }),
      'basket-sessions-' + new Date().toISOString().slice(0, 10) + '.csv');
  },
  workbook: () => {
    if (!S.sessions.length) { alert('No sessions recorded on this device yet.'); return; }
    try { saveBlob(buildWorkbook(), 'Farmer_Usability_Evaluation_'
      + S.sessions.length + '_Respondents.xlsx'); }
    catch (err) { alert('Could not build the workbook: ' + err.message); }
  },
  savenote: () => {
    const el = document.getElementById('snotes');
    if (el && S.sessions[0]) { S.sessions[0].notes = el.value; LS.set('sessions', S.sessions); }
  },
  donenext: () => { ACT.savenote(); go('session-setup'); },
  doneadmin: () => { ACT.savenote(); go('admin'); },
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  // tapping inside a sheet must not trigger the scrim's dismiss action
  if (el.classList.contains('overlay') && e.target.closest('.modal')) return;
  const fn = ACT[el.dataset.act];
  if (fn) { e.preventDefault(); fn(el.dataset.arg); }
});

window.addEventListener('online',  () => { S.online = true;  render(); syncAll(); });
window.addEventListener('offline', () => { S.online = false; render(); });
setInterval(() => { if (S.session && currentTask() && S.screen !== 'admin') {
  const bar = document.querySelector('.facil'); if (bar) bar.outerHTML = facilitatorBar(); } }, 1000);

if (location.hash === '#admin') S.screen = 'admin';
window.addEventListener('hashchange', () => { if (location.hash === '#admin') go('admin'); });

render();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
