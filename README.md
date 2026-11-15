# Postcaly skills

Connect your AI assistant to [Postcaly](https://postcaly.com), the social media scheduler. Ask it to plan your
week, write posts in your voice, find your next free posting time, schedule posts and add pictures from a link,
straight into your Postcaly workspace.

> **Early preview.** Agent access is open to invited testers first. Ask for access at info@postcaly.com.
> More: [postcaly.com/ai](https://postcaly.com/ai)

## The connector

Every assistant uses the same address:

```
https://app.postcaly.com/mcp
```

You sign in to Postcaly, choose a workspace and tick what the assistant may do. Publishing straight away is off
unless you tick it, every action is listed under Activity, and you can disconnect at any time in Postcaly,
Settings, AI agents.

## Install

| Assistant | How |
|---|---|
| **Claude, Claude Cowork** | Settings, Connectors, Add custom connector, paste the address above |
| **ChatGPT** | Settings, Apps and Connectors, Developer mode, Create, paste the address above |
| **Claude Code** | `claude mcp add --transport http postcaly https://app.postcaly.com/mcp`, or the plugin: `/plugin marketplace add postcaly/skills` then `/plugin install postcaly@postcaly` |
| **Codex** | `codex mcp add postcaly --url https://app.postcaly.com/mcp` |
| **Cursor** | [Add to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=postcaly&config=eyJ1cmwiOiAiaHR0cHM6Ly9hcHAucG9zdGNhbHkuY29tL21jcCJ9), or add `{"mcpServers":{"postcaly":{"url":"https://app.postcaly.com/mcp"}}}` to `.cursor/mcp.json` |
| **Gemini CLI** | `gemini extensions install https://github.com/postcaly/skills` (or add `https://app.postcaly.com/mcp` as an MCP server) |
| **Any agent with skills** (OpenClaw, Paperclip, Hermes, nanoclaw…) | `npx skills add postcaly/skills` |
| **Agents on your own computer** | the `postcaly` command line, below |

## Command line

Needs Node 18 or later and a Postcaly API key (Settings, AI agents, API keys).

```
npm install -g github:postcaly/skills     # or run once with: npx -y github:postcaly/skills <command>
postcaly login                             # paste your key; it is stored only on this computer
postcaly channels
postcaly posts --from 2026-11-16T00:00:00Z --to 2026-11-23T00:00:00Z
postcaly next-slot
postcaly draft --text "Our winter hours: 9 to 5" --channels <channel-id>
postcaly call schedule_post --json '{"text":"Open late on Friday","channelIds":["<id>"],"nextUsualTime":true}'
```

`POSTCALY_API_KEY` can be used instead of `postcaly login`.

## What the assistant can do

See your channels, posts, usual times and plan; check a post against each network's rules; save drafts;
schedule, move, change or delete posts that have not gone out; add pictures and videos from a link and describe
them; and publish straight away only when you allowed it. Your plan's limits and each network's rules always
apply. If your workspace is set to Drafts only, everything arrives as a draft for your team.

## In this repository

- `skills/postcaly/SKILL.md`: instructions for the assistant.
- `plugins/postcaly/`: the Claude Code plugin (skill plus connector); `.claude-plugin/marketplace.json` lists it.
- `gemini-extension.json` + `GEMINI.md`: the Gemini CLI extension.
- `cli/postcaly.mjs`: the command line (no dependencies).

No Postcaly app code lives here. MIT licence.

## Help

info@postcaly.com · [postcaly.com/ai](https://postcaly.com/ai)
