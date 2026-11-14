# Postcaly skills

Connect your AI assistant to [Postcaly](https://postcaly.com), the social media scheduler: see your
channels and calendar, find the next free posting time, and have drafts written straight into your
Postcaly workspace.

> **Early preview.** Agent access is open to invited testers first. Everyone else will see it in
> Postcaly's Settings when it opens.

## The connector

Every assistant uses the same address:

```
https://app.postcaly.com/mcp
```

You sign in to Postcaly, choose a workspace and allow access. You can disconnect at any time in
Postcaly, Settings, AI agents.

## Install

**Any agent that supports skills** (Claude Code, Cursor, Codex, OpenClaw, Paperclip and others):

```
npx skills add postcaly/skills
```

**Claude Code plugin:**

```
/plugin marketplace add postcaly/skills
/plugin install postcaly@postcaly
```

**Claude Code, connector only:**

```
claude mcp add --transport http postcaly https://app.postcaly.com/mcp
```

**Claude and ChatGPT (web and desktop):** add `https://app.postcaly.com/mcp` as a custom connector.

## What is in this repository

- `skills/postcaly/SKILL.md`: instructions for the assistant.
- `plugins/postcaly/`: the Claude Code plugin (the skill plus the connector).
- `.claude-plugin/marketplace.json`: lets Claude Code install the plugin from this repository.

No Postcaly app code lives here.

## Help

info@postcaly.com · [postcaly.com](https://postcaly.com)
