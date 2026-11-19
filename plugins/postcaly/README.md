# Postcaly plugin

Connects your AI assistant to [Postcaly](https://postcaly.com), the social media scheduler, so it can plan,
draft and schedule posts in your Postcaly workspace. Works in Cursor and Claude Code.

## What it contains

- `mcp.json` (Cursor) and `.mcp.json` (Claude Code): the remote Postcaly connector at
  `https://app.postcaly.com/mcp`.
- `skills/postcaly/SKILL.md`: guidance for the assistant on how to use the connector well.
- `assets/logo.svg`: the Postcaly logo.

## Setup

No API keys or settings are needed. The first time the assistant uses Postcaly, a browser window opens: sign
in to Postcaly (OAuth 2.1), choose a workspace and tick what the assistant may do. You need a Postcaly account
with a confirmed email address; agent access is included on every plan.

## Usage

Ask things like:

- "What is scheduled on my Postcaly calendar this week?"
- "Draft a LinkedIn and X post about our winter opening hours."
- "Schedule this post at my next usual posting time."

Publishing straight away is off unless you allow it, and a workspace set to Drafts only receives everything as
drafts. Every action is listed under Activity, and you can disconnect at any time in Postcaly: Settings, AI
agents.

## Support

- Guide: https://postcaly.com/agents/cursor
- Email: info@postcaly.com
- Privacy: https://postcaly.com/privacy
- Terms: https://postcaly.com/terms

Licensed under MIT (see `LICENSE` at the repository root). Postcaly is a product of Postcaly Ltd.
