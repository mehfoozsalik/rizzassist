import fs from 'fs';
import path from 'path';

const roots = ['app', 'components', 'lib', 'public', 'data'];
const exts = new Set(['.tsx', '.ts', '.txt', '.json']);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === '.next') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (exts.has(path.extname(ent.name))) out.push(p);
  }
  return out;
}

function humanizeDashes(text) {
  let s = text;

  // Protect lines that document the em-dash ban (keep the character for the instruction).
  const protectedBlocks = [];
  s = s.replace(/^[^\n]*(Never use em dashes|em dashes \(|en dashes \()[^\n]*$/gm, (match) => {
    const token = `__PROTECTED_DASH_${protectedBlocks.length}__`;
    protectedBlocks.push(match);
    return token;
  });

  // Title / label style: "Rizz Assist — AI ..." -> "Rizz Assist: AI ..."
  s = s.replace(/([A-Za-z0-9)])\s*—\s*([A-Z])/g, '$1: $2');

  // Clause separator with surrounding spaces
  s = s.replace(/\s*—\s*/g, ', ');
  s = s.replace(/—/g, ', ');

  // Numeric ranges with en dash: 3–5 -> 3-5
  s = s.replace(/(\d)\s*–\s*(\d)/g, '$1-$2');
  s = s.replace(/\s*–\s*/g, ', ');
  s = s.replace(/–/g, '-');

  // Only clean doubled commas (do NOT collapse indentation spaces)
  s = s.replace(/,[ \t]*,+/g, ',');

  protectedBlocks.forEach((block, i) => {
    s = s.replace(`__PROTECTED_DASH_${i}__`, block);
  });

  return s;
}

const files = roots.flatMap((r) => (fs.existsSync(r) ? walk(r) : []));
let changed = 0;

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  if (!/[—–]/.test(before)) continue;
  const after = humanizeDashes(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
    console.log('updated', path.relative(process.cwd(), file));
  }
}

console.log('files_changed', changed);
