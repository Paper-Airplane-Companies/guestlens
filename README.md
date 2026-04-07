# GuestLens

GuestLens is a static website prototype for an interactive event photo experience platform.

## Current state

This repository currently ships static HTML/CSS pages and templates:
- `index.html` (marketing landing page)
- `contact.html` (booking inquiry page)
- `events/event-template.html` (template for new event pages)
- `events/kennedy-cooper-graduation.html` (example event page)

Some flows are intentionally placeholders and require integration before production use:
- `contact.html` uses a placeholder form action (`action="#"`).
- `events/event-template.html` uses placeholder CTA links (`href="#"`) for upload/gallery actions.

## Local development

Open `index.html` directly in a browser, or serve the repository with any static file server.

## Quality checks

Run the static checks locally:

```bash
python3 scripts/check_site.py
```

The check script validates:
1. basic HTML lint requirements,
2. internal link and anchor integrity,
3. `target="_blank"` link hardening (`rel="noopener noreferrer"`).
