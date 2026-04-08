# GuestLens Now — MVP Build Checklist (Phase 1 Aligned)

Use this checklist to implement against the locked spec in `docs/guestlens-now-phase-1-spec.md`.

## Product positioning
- [ ] GuestLens Now clearly positioned as same-day/instant version
- [ ] Full premium custom GuestLens clearly positioned as distinct higher-tier offering
- [ ] Homepage CTA follows locked copy direction

## Host offer
- [ ] Host price shown as $49.99
- [ ] Host receives instant event creation + unique event link
- [ ] Host success/share page includes Copy Link + Text Guests actions
- [ ] Prewritten guest invite message included
- [ ] Retention message shown: “Photos are available for 14 days. Download before they expire.”

## Guest challenge flow
- [ ] Event page is challenge-first with upload visible
- [ ] Guest can upload without login before unlock
- [ ] Challenge item completion states update correctly
- [ ] Progress updates after each upload
- [ ] Upload #1 and #2 return to challenge flow without paywall

## Guest unlock flow
- [ ] Unlock shown after upload #3
- [ ] Unlock message indicates 3 moments captured + social curiosity prompt
- [ ] Unlock form collects full name, email, and phone number
- [ ] Guest unlock payment set to $0.99
- [ ] Post-unlock includes full gallery and download access
- [ ] Returning unlocked guest can access gallery again

## Host gallery and downloads
- [ ] Host can view gallery
- [ ] Host can download all photos
- [ ] Host can download individual photos
- [ ] MVP private host link approach acceptable

## Retention and reminder rules
- [ ] Retention period set to 14 days
- [ ] Day 10 reminder requirement documented in implementation plan
- [ ] Day 14 expiration requirement documented in implementation plan
- [ ] Retention messaging surfaced on host success + gallery + relevant guest areas

## Data and communications
- [ ] Paid guest unlock requires full name, email, phone
- [ ] Unlock data mapped to participation and upload activity
- [ ] Transactional vs marketing communication paths separated in design
- [ ] Marketing unsubscribe requirement documented for future implementation

## Explicit non-goals / out of scope
- [ ] No real Stripe integration in this phase
- [ ] No real backend persistence in this phase
- [ ] No real Supabase/file storage/Twilio in this phase
- [ ] No full auth/dashboard systems in this phase
- [ ] No legal/privacy-policy implementation details in this phase

## Pre-implementation handoff quality checks
- [ ] Product rules reviewed and locked
- [ ] Open ambiguities documented with owner decisions
- [ ] Engineering tasks mapped directly to locked decisions
