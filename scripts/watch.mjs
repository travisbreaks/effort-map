// Watch the vendor documentation this map depends on.
//
// Each probe pins one published sentence to a regular expression. A probe that
// changes means the vendor changed a fact; a probe that stops matching means the
// page was restructured and the fact needs a human read. Both are reported.
// This script is the only part of the project that uses the network. It is never
// run by the build or by scripts/check.mjs, and it holds no credentials.
//
//   node scripts/watch.mjs            compare the live pages with the baseline
//   node scripts/watch.mjs --update   record the live pages as the new baseline

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const baselineFile = path.join(root, 'data/watch-baseline.json');
const agent = 'effort-map-doc-watch/1.0 (+https://github.com/travisbreaks/effort-map)';

const SOURCES = {
  astra: 'https://developers.openai.com/api/docs/models/gpt-6-astra',
  sol: 'https://developers.openai.com/api/docs/models/gpt-5.6-sol',
  chatgpt: 'https://learn.chatgpt.com/docs/models',
  subagents: 'https://learn.chatgpt.com/docs/agent-configuration/subagents',
  effort: 'https://platform.claude.com/docs/en/build-with-claude/effort.md',
  claudecode: 'https://code.claude.com/docs/en/model-config.md'
};

// Every probe states which claim on the map it protects.
const PROBES = [
  {id: 'astra-effort-enum', source: 'astra', protects: 'Astra ladder starts at Low and ends at Max',
   pattern: /[Rr]easoning\.effort supports:? ([^.]+)\./},
  {id: 'sol-effort-enum', source: 'sol', protects: 'Sol is the one model here whose API accepts None',
   pattern: /[Rr]easoning\.effort supports:? ([^.]+)\./},
  {id: 'codex-level-ladder', source: 'chatgpt', protects: 'Six client rungs, the sixth being orchestration',
   pattern: /(Low Fast responses with lighter reasoning .{0,400}?automatic task delegation)/},
  {id: 'chatgpt-ultra-mode', source: 'chatgpt', protects: 'Ultra organizes work rather than deepening one run',
   pattern: /Ultra mode goes beyond a single-agent run\. ([^›]{0,240}?across subagents\.)/},
  {id: 'chatgpt-astra-power-options', source: 'chatgpt', protects: 'An app menu can show fewer levels than the API',
   pattern: /the Astra rollout updates the Power options to ([^.]+)\./},
  {id: 'subagents-ultra-availability', source: 'subagents', protects: 'Ultra is gated, and is maximum reasoning plus delegation',
   pattern: /Ultra is available only to ([^.]+)\. It uses ([^.]+)\./},
  {id: 'subagents-intelligence-levels', source: 'subagents', protects: 'The composer levels differ from the API enum',
   pattern: /Available intelligence levels can include ([^.]+)\./},
  {id: 'subagents-effort-values', source: 'subagents', protects: 'ultra is an effort value in the agent-configuration namespace',
   pattern: /Reasoning effort \( model_reasoning_effort \) (.{0,240}?)\shigh :/},
  {id: 'subagents-inheritance', source: 'subagents', protects: 'Subagents inherit the parent model and effort',
   pattern: /the subagent inherits ([^.]+)\./},
  {id: 'codex-delegation-trigger', source: 'subagents', protects: 'A client can withhold behavior the setting name implies',
   pattern: /Current local Codex releases (.{0,200}?)\.(?=\s+[A-Z])/},
  {id: 'anthropic-effort-models', source: 'effort', protects: 'Which Claude models accept effort at all',
   pattern: /Supported models: (.+?)-\s*Platforms:/},
  {id: 'anthropic-default-effort', source: 'effort', protects: 'High is the documented Anthropic default',
   pattern: /By default, Claude uses ([^.]+)\./},
  {id: 'anthropic-high-equivalence', source: 'effort', protects: 'High is exactly the same as omitting the parameter',
   pattern: /Setting `effort` to `"high"` produces ([^.]+)\./},
  {id: 'anthropic-effort-scope', source: 'effort', protects: 'Anthropic effort covers all output tokens, not only thinking',
   pattern: /The effort parameter affects \*\*all tokens\*\* in the response, including: (.{0,160}?)Because effort applies/},
  {id: 'anthropic-xhigh-gap', source: 'effort', protects: 'The Anthropic ladder is not uniform across every model',
   pattern: /(Not every model that supports `max` supports `xhigh`\.)/},
  {id: 'anthropic-behavioral-signal', source: 'effort', protects: 'Effort is not a token budget',
   pattern: /Effort is a behavioral signal, ([^.]+)\./},
  {id: 'opus5-thinking-lock', source: 'effort', protects: 'Opus 5 refuses disabled thinking at the top two rungs',
   pattern: /On Claude Opus 5, thinking cannot be disabled at `xhigh` or `max` effort: ([^.]+)\./},
  {id: 'claude-code-ultracode', source: 'claudecode', protects: 'Ultracode is Extra High plus workflows, not a sixth API rung',
   pattern: /ultracode[^|]*\|\s*([^|]*(?:workflow|xhigh)[^|]*)\|/i}
];

const normalize = (body, url) => {
  const text = url.endsWith('.md')
    ? body
    : body
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return text.replace(/\s+/g, ' ').trim();
};

const capture = match => match.slice(1).filter(part => part !== undefined)
  .map(part => part.replace(/\s+/g, ' ').trim()).join(' | ');

async function readSources() {
  const pages = {};
  for (const [id, url] of Object.entries(SOURCES)) {
    try {
      const response = await fetch(url, {headers: {'user-agent': agent, accept: '*/*'}, redirect: 'follow'});
      if (!response.ok) { pages[id] = {error: 'HTTP ' + response.status}; continue; }
      pages[id] = {text: normalize(await response.text(), url)};
    } catch (error) {
      pages[id] = {error: error.message};
    }
  }
  return pages;
}

const pages = await readSources();
const observed = {};
const unreachable = [];
for (const [id, page] of Object.entries(pages)) if (page.error) unreachable.push(id + ': ' + page.error);
for (const probe of PROBES) {
  const page = pages[probe.source];
  if (page.error) { observed[probe.id] = null; continue; }
  const match = probe.pattern.exec(page.text);
  observed[probe.id] = match ? capture(match) : null;
}

const checkedAt = new Date().toISOString().slice(0, 10); // UTC, so a CI run and a local run agree
if (process.argv.includes('--update')) {
  const missing = PROBES.filter(p => observed[p.id] === null).map(p => p.id);
  if (unreachable.length || missing.length) {
    console.error('Refusing to record an incomplete baseline.');
    if (unreachable.length) console.error('  Unreachable: ' + unreachable.join('; '));
    if (missing.length) console.error('  No match: ' + missing.join(', '));
    process.exit(2);
  }
  const record = {checkedUTC: checkedAt, sources: SOURCES, probes: Object.fromEntries(
    PROBES.map(p => [p.id, {protects: p.protects, source: p.source, value: observed[p.id]}]))};
  fs.writeFileSync(baselineFile, JSON.stringify(record, null, 2) + '\n');
  console.log('Recorded ' + PROBES.length + ' probes as of ' + checkedAt + ' UTC.');
  process.exit(0);
}

if (!fs.existsSync(baselineFile)) {
  console.error('No baseline. Run: node scripts/watch.mjs --update');
  process.exit(2);
}
const baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf8'));
const changed = [], vanished = [], added = [];
for (const probe of PROBES) {
  const before = baseline.probes[probe.id];
  const now = observed[probe.id];
  if (!before) { added.push(probe); continue; }
  if (now === null) { if (!pages[probe.source].error) vanished.push(probe); continue; }
  if (now !== before.value) changed.push({probe, before: before.value, now});
}

console.log('Baseline recorded ' + baseline.checkedUTC + ' UTC. Read ' + checkedAt + ' UTC.');
for (const item of changed) {
  console.log('\nCHANGED  ' + item.probe.id + '  (' + SOURCES[item.probe.source] + ')');
  console.log('  Protects: ' + item.probe.protects);
  console.log('  Was: ' + item.before);
  console.log('  Now: ' + item.now);
}
for (const probe of vanished) {
  console.log('\nNO MATCH ' + probe.id + '  (' + SOURCES[probe.source] + ')');
  console.log('  Protects: ' + probe.protects);
  console.log('  The page no longer contains this sentence. Read it and repin the probe.');
}
for (const probe of added) console.log('\nNEW      ' + probe.id + ' has no baseline entry.');
for (const line of unreachable) console.log('\nUNREACHABLE ' + line);

const problems = changed.length + vanished.length + added.length + unreachable.length;
if (!problems) {
  console.log('\nUnchanged: all ' + PROBES.length + ' probes match the baseline.');
  console.log('This checks published wording only. It does not verify model behavior or benchmark numbers.');
  process.exit(0);
}
console.log('\n' + problems + ' item(s) need a human read. Update the map if a fact moved, then run --update.');
process.exit(1);
