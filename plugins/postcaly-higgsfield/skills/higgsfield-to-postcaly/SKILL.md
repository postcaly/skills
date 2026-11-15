---
name: higgsfield-to-postcaly
description: Make an image or video with Higgsfield and turn it into a checked, scheduled social media post in Postcaly. Use when the user wants to create visual content for social media and post or schedule it (YouTube, X, LinkedIn, Threads, Bluesky and more).
---

# Higgsfield to Postcaly

Two connectors work together here:

- **Higgsfield** (`https://mcp.higgsfield.ai/mcp`) makes the picture or video. It needs the person's
  Higgsfield account with a paid plan, and every generation uses their Higgsfield credits.
- **Postcaly** (`https://app.postcaly.com/mcp`) checks the post against each network's rules, stores
  the media and schedules the post. The person chose one workspace and its permissions when they connected.

Both connectors sign in with the person's own account. Never ask for, store or print passwords or keys.

## The flow

1. **Agree the post first.** Ask (or confirm) which channels, the message, the format (image or video,
   shape such as 9:16 for Shorts, 1:1 or 4:5 for feeds, 16:9 for YouTube) and when it should go out.
   Use Postcaly `list_channels` and `find_next_free_slot` to offer real channels and a real time.
2. **Check the limits before generating.** Call Postcaly `get_channel_options` and `check_post` with the
   draft text and the planned media type, so you know each network's length, size and duration limits
   before spending Higgsfield credits.
3. **Say what it will cost, then generate.** Tell the person that Higgsfield will use credits and which
   model and length you plan to use. Only generate after they agree. Use Higgsfield's tools to make
   the image or video.
4. **Hand the file to Postcaly.** Take the finished file's public `https://` link from Higgsfield and call
   Postcaly `upload_media_from_url`. Pictures up to 8 MB and videos up to 50 MB can be added this way;
   for a bigger video, tell the person to download it from Higgsfield and upload it in Postcaly.
   Then call `describe_media` to add a short description (alt text) of what is shown.
5. **Check, then save.** Run `check_post` again with the media attached. Fix anything it reports. Then
   either `create_draft` (when the person wants to review it in Postcaly) or `schedule_post` for the time
   they confirmed. Repeat the time and channels back before scheduling.
6. **Report back** with the post's channels and time, and that it is in their Postcaly calendar.

## Rules

- Never call `publish_now` unless the person clearly asks to publish straight away, and only if that
  permission was granted when they connected.
- Do not change or delete posts that are already published. That stays with a person in Postcaly.
- Generated people, logos and brands must respect Higgsfield's terms and each network's rules on
  AI-generated content. If a network asks for an AI-content label, tell the person.
- If either connector says it is not connected or access is not allowed, explain which one and how to
  reconnect it, instead of guessing.

## Example requests

- "Make a 10-second vertical video of steam rising from a fresh coffee for our café, then schedule it to
  YouTube Shorts and Threads for my next free time."
- "Create a square image announcing our Saturday market and save it as a Bluesky and LinkedIn draft."
- "Turn this product photo into a short animated clip and schedule it for Friday at 18:00 on X."

More: https://postcaly.com/agents/higgsfield
