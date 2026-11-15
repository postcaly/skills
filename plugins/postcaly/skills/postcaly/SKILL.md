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
- Assistants that use a key: the person creates an API key in Postcaly (Settings, AI agents, API keys) and it is
  sent as `Authorization: Bearer pc_live_...`. Never put the key in a URL, a file in a repository, or chat
  output.

Agent access is included on every Postcaly plan for accounts with a confirmed email address. If the server
answers that agent access is not available, ask the person to confirm their email address in Postcaly (Account).

## What you can do

What a connection may do is chosen by the person when they connect (or on the API key). Only use tools the
server lists for this connection.

| Tool | Use it to |
|---|---|
| `list_workspaces`, `get_workspace` | See the workspace, its time zone, usual posting times and today's allowance |
| `list_channels`, `get_channel_options` | See connected accounts, and the choices a network needs for a post (e.g. a Pinterest board, TikTok privacy) |
| `list_posts`, `get_post` | See scheduled, published, failed and draft posts |
| `find_next_free_slot`, `list_usual_times`, `get_plan_usage` | Find the next free usual time; check what the plan allows today |
| `check_post` | Check a post against every network's rules without saving it |
| `create_draft` | Save a draft (never schedules or publishes) |
| `schedule_post`, `schedule_draft` | Schedule a new post or an existing draft for a time, or the next usual time |
| `update_post`, `move_post`, `unschedule_post`, `delete_post` | Change, move, turn back into a draft, or delete a post that has not gone out |
| `publish_now` | Publish straight away (only if the person allowed it) |
| `list_media`, `upload_media_from_url`, `describe_media` | Use the media library, add a picture or video from a public https link, write alt text |

## How to work

1. Start with `get_workspace` and `list_channels` so you know the time zone and which channels exist.
2. Check `list_posts` for the days in question so you do not repeat what is planned.
3. Write in the person's voice. Respect each network's limits (X 280 characters; Bluesky 300). Instagram,
   TikTok and YouTube need a picture or video; use `get_channel_options` for required choices.
4. Run `check_post` before scheduling. Fix what it reports.
5. If the person did not ask for a time, use `nextUsualTime`. Say the day and time in words, in the workspace's
   time zone.
6. Only use `publish_now` when the person clearly asks to publish immediately and the connection allows it.
   Never schedule a time less than 5 minutes ahead as a way round that.
7. If the workspace is set to Drafts only, save drafts and tell the person they are waiting for their team.
8. If a tool refuses (plan limit, reconnect needed, not allowed), explain it plainly and stop; do not retry in a
   loop.

## Command line (agents on your own computer)

`npx -y github:postcaly/skills login` saves an API key; then `postcaly channels`, `postcaly posts`,
`postcaly next-slot`, `postcaly draft --text "..." --channels <id>`, or `postcaly call <tool> --json '{...}'`
for any tool above.

## Privacy

Only read what the task needs. Do not copy post text or channel details into other tools or services
unless the person asks.
