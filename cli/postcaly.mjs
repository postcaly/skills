#!/usr/bin/env node
// postcaly: a small command-line client for Postcaly's MCP server (https://app.postcaly.com/mcp).
// No dependencies; Node 18+. Authenticates with a Postcaly API key (Settings, AI agents, API keys).
//
//   postcaly login                     save an API key (asked for, never echoed)
//   postcaly tools                     list what this key can do
//   postcaly channels                  connected social channels
//   postcaly posts [--from ISO] [--to ISO] [--status scheduled]
//   postcaly next-slot                 the next free usual posting time
//   postcaly draft --text "..." --channels id1,id2 [--media id1,id2]
//   postcaly call <tool> [--json '{"arg":"value"}'] [--name value ...]
//   postcaly logout
//
// Environment: POSTCALY_API_KEY overrides the saved key; POSTCALY_URL overrides the server address.

import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync, chmodSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

const VERSION = '0.2.0';
const CONFIG_DIR = join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), 'postcaly');
const CONFIG = join(CONFIG_DIR, 'config.json');
const KEY_SHAPE = /^pc_live_[A-Za-z0-9_-]{43}$/;

function readConfig() {
  try { return JSON.parse(readFileSync(CONFIG, 'utf8')); } catch { return {}; }
}
function serverUrl() {
  return (process.env.POSTCALY_URL || readConfig().url || 'https://app.postcaly.com/mcp').replace(/\/$/, '');
}
function apiKey() {
  const key = process.env.POSTCALY_API_KEY || readConfig().key;
  if (!key) fail('No API key. Run "postcaly login" or set POSTCALY_API_KEY.');
  return key;
}
function fail(message, code = 1) {
  process.stderr.write(`postcaly: ${message}\n`);
  process.exit(code);
}

let nextId = 1;
async function rpc(method, params) {
  let response;
  try {
    response = await fetch(serverUrl(), {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json', authorization: `Bearer ${apiKey()}`, 'mcp-protocol-version': '2025-06-18' },
      body: JSON.stringify({ jsonrpc: '2.0', id: nextId++, method, ...(params ? { params } : {}) }),
    });
  } catch (error) {
    fail(`could not reach ${serverUrl()}: ${error.message}`);
  }
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { fail(`unexpected answer from the server (HTTP ${response.status}).`); }
  if (data.error) fail(data.error.message || `request failed (HTTP ${response.status}).`, response.status === 401 ? 3 : 1);
  return data.result;
}

async function callTool(name, args = {}) {
  const result = await rpc('tools/call', { name, arguments: args });
  if (result?.isError) fail(result.content?.map((part) => part.text).join('\n') || 'the tool refused the request.', 2);
  return result?.structuredContent ?? result;
}

/** --name value / --name=value flags; comma lists for --channels and --media. */
function flags(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const [rawName, inline] = arg.slice(2).split(/=(.*)/s, 2);
    const value = inline !== undefined ? inline : argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
    out[rawName] = value;
  }
  return out;
}
const list = (value) => (value ? String(value).split(',').map((item) => item.trim()).filter(Boolean) : undefined);
const print = (value) => process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stderr, terminal: true });
  const muted = { write: rl.output.write.bind(rl.output) };
  rl._writeToOutput = (text) => { if (text.includes(question)) muted.write(text); };
  return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); process.stderr.write('\n'); resolve(answer.trim()); }));
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const opts = flags(rest);
  switch (command) {
    case 'login': {
      const key = opts.key || (await ask('Paste your Postcaly API key (starts with pc_live_): '));
      if (!KEY_SHAPE.test(key)) fail('that does not look like a Postcaly API key.');
      mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
      writeFileSync(CONFIG, JSON.stringify({ ...readConfig(), key, ...(opts.url ? { url: opts.url } : {}) }, null, 2), { mode: 0o600 });
      chmodSync(CONFIG, 0o600);
      process.env.POSTCALY_API_KEY = key;
      const { workspaces } = await callTool('list_workspaces');
      process.stderr.write(`Saved. This key belongs to workspace: ${workspaces?.[0]?.name ?? 'unknown'}\n`);
      return;
    }
    case 'logout':
      if (existsSync(CONFIG)) rmSync(CONFIG);
      process.stderr.write('Removed the saved key.\n');
      return;
    case 'tools': {
      const { tools } = await rpc('tools/list');
      for (const tool of tools) process.stdout.write(`${tool.name.padEnd(24)} ${tool.title ?? ''}\n`);
      return;
    }
    case 'channels':
      return print(await callTool('list_channels'));
    case 'posts':
      return print(await callTool('list_posts', { ...(opts.from ? { from: opts.from } : {}), ...(opts.to ? { to: opts.to } : {}), ...(opts.status ? { status: opts.status } : {}), ...(opts.drafts ? { includeDrafts: true } : {}) }));
    case 'next-slot':
      return print(await callTool('find_next_free_slot'));
    case 'draft':
      if (!opts.text && !opts.media) fail('give --text and/or --media.');
      return print(await callTool('create_draft', { text: opts.text ?? '', channelIds: list(opts.channels) ?? [], ...(opts.media ? { mediaIds: list(opts.media) } : {}) }));
    case 'call': {
      const [tool, ...more] = rest;
      if (!tool) fail('usage: postcaly call <tool> [--json \'{...}\'] [--name value]');
      const named = flags(more);
      const args = named.json ? JSON.parse(named.json) : Object.fromEntries(Object.entries(named).filter(([name]) => name !== 'json'));
      return print(await callTool(tool, args));
    }
    case 'version':
    case '--version':
      process.stdout.write(`${VERSION}\n`);
      return;
    default:
      process.stdout.write(`postcaly ${VERSION}: Postcaly from the command line.

  postcaly login                 save your API key (Settings, AI agents, API keys)
  postcaly tools                 what this key can do
  postcaly channels              connected social channels
  postcaly posts [--from ISO --to ISO --status scheduled --drafts]
  postcaly next-slot             the next free usual posting time
  postcaly draft --text "..." --channels id1,id2 [--media id1]
  postcaly call <tool> --json '{"...": "..."}'
  postcaly logout

POSTCALY_API_KEY and POSTCALY_URL override the saved settings.
`);
  }
}

main().catch((error) => fail(error.message));
