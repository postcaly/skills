---
name: postcaly
description: Plan, draft and schedule social media posts in Postcaly (app.postcaly.com) for X, Bluesky, LinkedIn, Threads, YouTube and more. Use when the user wants to see their connected social channels, check what is scheduled, find the next free posting time, or write a post into their Postcaly calendar.
---

# Postcaly

Postcaly is a social media scheduler: one post, written once, published to several social channels at
the times the workspace has chosen. This skill connects you to the person's Postcaly workspace through
Postcaly's MCP server.

## Connect

The Postcaly MCP server is at:

```
https://app.postcaly.com/mcp
```

- Assistants that support remote MCP with sign-in (Claude, ChatGPT, Cursor, Codex, Gemini CLI and
  others): add the address above as a custom connector. The person is asked to sign in to Postcaly,
  choose a workspace and allow access.
- Assistants that use a key: the person creates an API key in Postcaly (Settings, AI agents) and it is
  sent as `Authorization: Bearer pc_live_...`. Never put the key in a URL, a file in a repository, or chat
  output.

Access is in early preview for invited testers. If the server answers that agent access is not available,
tell the person it is not open on their account yet.

## What you can do

| Tool | Use it to |
|---|---|
| `list_workspaces`, `get_workspace` | See the workspace, its time zone, usual posting times and today's allowance |
| `list_channels` | See the connected social accounts and whether each needs reconnecting |
| `list_posts`, `get_post` | See scheduled, published, failed and draft posts |
| `find_next_free_slot` | Find the next usual posting time with room under the plan |
| `create_draft` | Save a new draft with text, channels and existing media |

Drafts never publish by themselves. The person reviews and schedules them in Postcaly. Scheduling and
publishing tools will be added later; only use the tools the server lists.

## How to work

1. Start with `get_workspace` and `list_channels` so you know the time zone and which channels exist.
2. Before writing, check `list_posts` for the days in question so you do not repeat what is planned.
3. Write in the person's voice. Keep each network's limits in mind (X: 280 characters; Bluesky: 300).
4. Save with `create_draft`, using channel ids from `list_channels`. Tell the person the draft is waiting
   in their Postcaly calendar and what you chose.
5. Times are in the workspace's time zone. Say the day and time in words.
6. If a tool refuses (plan limit, reconnect needed, not allowed), explain it plainly and stop; do not retry
   in a loop.

## Privacy

Only read what the task needs. Do not copy post text or channel details into other tools or services
unless the person asks.
