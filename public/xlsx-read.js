/* Minimal XLSX reader — no dependencies.

   Unzips with the platform's DecompressionStream (deflate-raw) and parses
   the sheet XML with DOMParser. Enough to read a workbook produced by
   Excel, Sheets or LibreOffice; not a general-purpose implementation.

   Returns { names: [...], sheets: { <name>: rows } } where rows is a
   two-dimensional array of strings and numbers, blanks as ''. */

(() => {
'use strict';

const DEC = new TextDecoder();

/* ------------------------------------------------------------------ unzip */
async function inflate(bytes, method) {
  if (method === 0) return bytes;
  if (method !== 8) throw new Error('unsupported compression method ' + method);
  if (typeof DecompressionStream === 'undefined')
    throw new Error('this browser cannot unzip — try Chrome or Safari 16.4+');
  const ds = new DecompressionStream('deflate-raw');
  const stream = new Blob([bytes]).stream().pipeThrough(ds);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function unzip(buffer) {
  const u8 = new Uint8Array(buffer);
  const dv = new DataView(buffer);

  // end of central directory: scan backwards for the signature
  let eocd = -1;
  for (let i = u8.length - 22; i >= 0 && i > u8.length - 70000; i--) {
    if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip file');

  const count = dv.getUint16(eocd + 10, true);
  let p = dv.getUint32(eocd + 16, true);
  const out = {};

  for (let n = 0; n < count; n++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const method = dv.getUint16(p + 10, true);
    const compSize = dv.getUint32(p + 20, true);
    const nameLen = dv.getUint16(p + 28, true);
    const extraLen = dv.getUint16(p + 30, true);
    const commentLen = dv.getUint16(p + 32, true);
    const localOff = dv.getUint32(p + 42, true);
    const name = DEC.decode(u8.subarray(p + 46, p + 46 + nameLen));

    const lNameLen = dv.getUint16(localOff + 26, true);
    const lExtraLen = dv.getUint16(localOff + 28, true);
    const start = localOff + 30 + lNameLen + lExtraLen;
    out[name] = { method, data: u8.subarray(start, start + compSize) };

    p += 46 + nameLen + extraLen + commentLen;
  }

  const files = {};
  for (const [name, e] of Object.entries(out)) {
    files[name] = DEC.decode(await inflate(e.data, e.method));
  }
  return files;
}

/* ------------------------------------------------------------------ parse */
const parseXml = s => new DOMParser().parseFromString(s, 'application/xml');

function colIndex(ref) {
  let n = 0;
  for (let i = 0; i < ref.length; i++) {
    const c = ref.charCodeAt(i);
    if (c < 65 || c > 90) break;
    n = n * 26 + (c - 64);
  }
  return n - 1;
}

function sharedStrings(xml) {
  if (!xml) return [];
  const doc = parseXml(xml);
  return [...doc.getElementsByTagName('si')].map(si => {
    // concatenate every <t>, which is how rich text is stored
    return [...si.getElementsByTagName('t')].map(t => t.textContent).join('');
  });
}

function sheetRows(xml, strings) {
  const doc = parseXml(xml);
  const rows = [];
  for (const row of doc.getElementsByTagName('row')) {
    const r = parseInt(row.getAttribute('r') || '0', 10) - 1;
    const arr = rows[r] || (rows[r] = []);
    for (const c of row.getElementsByTagName('c')) {
      const ref = c.getAttribute('r') || '';
      const ci = ref ? colIndex(ref) : arr.length;
      const t = c.getAttribute('t');
      let v = '';
      if (t === 'inlineStr') {
        v = [...c.getElementsByTagName('t')].map(x => x.textContent).join('');
      } else {
        const vEl = c.getElementsByTagName('v')[0];
        const raw = vEl ? vEl.textContent : '';
        if (t === 's') v = strings[parseInt(raw, 10)] ?? '';
        else if (raw === '') v = '';
        else { const num = Number(raw); v = isFinite(num) && raw.trim() !== '' ? num : raw; }
      }
      arr[ci] = v;
    }
  }
  for (let i = 0; i < rows.length; i++) {
    if (!rows[i]) rows[i] = [];
    for (let j = 0; j < rows[i].length; j++) if (rows[i][j] === undefined) rows[i][j] = '';
  }
  return rows;
}

async function parse(buffer) {
  const files = await unzip(buffer);
  const wbXml = files['xl/workbook.xml'];
  if (!wbXml) throw new Error('no workbook part — is this really an .xlsx?');

  // sheet name -> target path, via the workbook relationships
  const rels = {};
  const relXml = files['xl/_rels/workbook.xml.rels'];
  if (relXml) {
    for (const r of parseXml(relXml).getElementsByTagName('Relationship')) {
      rels[r.getAttribute('Id')] = r.getAttribute('Target').replace(/^\/?xl\//, '').replace(/^\.\//, '');
    }
  }
  const strings = sharedStrings(files['xl/sharedStrings.xml']);

  const names = [], sheets = {};
  const sheetEls = [...parseXml(wbXml).getElementsByTagName('sheet')];
  sheetEls.forEach((el, i) => {
    const name = el.getAttribute('name');
    const rid = el.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id')
             || el.getAttribute('r:id');
    let path = rels[rid] ? 'xl/' + rels[rid] : `xl/worksheets/sheet${i + 1}.xml`;
    if (!files[path]) path = `xl/worksheets/sheet${i + 1}.xml`;
    names.push(name);
    sheets[name] = files[path] ? sheetRows(files[path], strings) : [];
  });

  return { names, sheets };
}

window.XLSXRead = { parse };
})();
