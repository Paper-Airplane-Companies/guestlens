# GuestLens

GuestLens is a mobile-first event photo experience built to replace messy DIY QR code systems with one simple, premium guest flow.

Instead of sending guests through multiple links, forms, albums, or confusing instructions, GuestLens gives each event one custom page where guests can read quick instructions, join a photo scavenger hunt, and upload photos from the event.

The core experience is:

**One QR code → One event page → One shared photo experience**

## Current State

This repository currently contains the static website prototype for GuestLens.

The site includes:

- `index.html`  
  Marketing landing page for explaining the GuestLens service

- `contact.html`  
  Booking inquiry page for potential clients

- `events/event-template.html`  
  Reusable event page template for creating new client event pages

- `events/kennedy-cooper-graduation.html`  
  Example event page showing how a live event experience can look

The current version is intentionally simple so the product can be tested, duplicated, and improved quickly before adding a full backend.

## MVP Notes

Some flows are currently placeholders and must be connected before production use:

- `contact.html` currently uses a placeholder form action: `action="#"`
- `events/event-template.html` currently uses placeholder CTA links: `href="#"`
- Upload and gallery buttons need to be connected to the selected photo collection system
- Event pages should be duplicated from the template and customized per client

For the MVP, GuestLens may use external tools such as Google Forms, Google Drive, Google Photos, or another upload service before a custom upload system is built.

## Local Development

Open `index.html` directly in a browser, or serve the repository with any static file server.

Example:

```bash
python3 -m http.server 8000
