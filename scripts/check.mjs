import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const data = JSON.parse(read('data/map.json'));
const fixtures = JSON.parse(read('evals/cases.json'));
const allowed = {sol:[0,1,2,3,4,5], astra:[1,2,3,4,5], opus:[1,2,3,4,5], fable:[1,2,3,4,5]};
// Authored routes are a policy contract. Change deliberately, not as a side effect of UI work.
const original = {
  t1:[['sol',1],['sol',2]], t2:[['sol',3]], t3:[['astra',2]], t4:[['astra',3]],
  t5:[['sol',3],['astra',2]], t6:[['astra',2]], t7:[['astra',4]], t8:[['astra',4]],
  t9:[['opus',2]], t10:[['opus',3]], t11:[['fable',3]], t12:[['fable',4]]
};
assert.deepEqual(Object.keys(data.tasks), Object.keys(original));
assert.deepEqual(data.models.map(m => m.id), Object.keys(allowed));
for (const m of data.models) assert.equal(m.first, allowed[m.id][0]);
for (const [id,t] of Object.entries(data.tasks)) {
  assert.equal(typeof t.title, 'string');
  assert.ok(t.title.length > 0 && data.ENV[t.env]);
  assert.deepEqual(t.routes.map(rt => [rt.m, rt.r]), original[id], id + ' starting routes changed');
  for (const rt of [...t.routes, t.up, t.down].filter(rt => rt?.m)) assert.ok(allowed[rt.m]?.includes(rt.r), id + ' unsupported route');
}
assert.equal(fixtures.cases.length, 20);
assert.equal(new Set(fixtures.cases.map(c => c.id)).size, 20);
assert.equal(new Set(fixtures.cases.map(c => c.sourceCase)).size, 12);
for (const c of fixtures.cases) {
  assert.equal(c.environment, data.tasks[c.sourceCase]?.env);
  assert.ok(c.prompt && c.reviewCriteria.length > 0);
}
execFileSync(process.execPath, ['scripts/build.mjs', '--check'], {cwd:root, stdio:'inherit'});
const html = read('site/index.html');
for (const block of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(block[1]);
assert.equal((html.match(/<option value="t\d+"/g) || []).length, 12);
assert.ok(html.includes('<noscript>') && html.includes('All twelve task cases'));
assert.ok(!/\b(?:src|href)=["'](?:\/[^/]|https?:\/\/fonts\.)/.test(html), 'Root-relative asset or external font');
assert.ok(!/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/.test(html), 'Unexpected network runtime');
for (const file of ['README.md','AGENTS.md','docs/ROUTING.md','docs/SOURCES.md','docs/STATUS.md','evals/README.md','evals/comparison.md']) {
  const text = read(file);
  assert.ok(!/\/Users\/|\/Volumes\/|[\u2013\u2014]/.test(text), 'Private path or dash style in ' + file);
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    if (/^https?:/.test(match[1])) continue;
    assert.ok(fs.existsSync(path.resolve(root, path.dirname(file), match[1].split('#')[0])), 'Broken link in ' + file + ': ' + match[1]);
  }
}
console.log('PASS: 12 preserved routes, 21 supported sockets, 20 draft fixtures covering all cases, generated files, browser script syntax, and local documentation links.');
console.log('These checks do not establish model quality, independent usability, or deployment.');
