# GuestLens Now — Phase 1 Product Definition (Locked)

## Repo context snapshot (for alignment)

### Current homepage messaging
- Homepage positions GuestLens as a premium event experience and includes a distinct GuestLens Now CTA for same-day use.
- Messaging direction already emphasizes:
  - “Instant Event”
  - “Need something for tonight?”
  - quick launch + memory capture + guest engagement
  - upgrade path to full custom experience

### Current GuestLens Now flow
- Current static prototype flow exists in:
  - `start.html` (host setup + simulated payment)
  - `events/instant-event.html` (challenge-first guest flow, unlock step, gallery mock)
  - `assets/guestlens-now.js` (localStorage-backed state + mock logic)
- This is intentionally MVP/prototype behavior and not production-grade backend/payment/auth/storage.

### Existing docs/planning files
- `README.md`
- `TASK_PROPOSALS.md`
- This spec file and companion MVP checklist (`docs/guestlens-now-mvp-checklist.md`)

### Current routes and naming conventions
- Flat static routes (`index.html`, `contact.html`, `start.html`)
- Event pages under `events/`
- Shared styles/scripts under `assets/`
- Product term: **GuestLens Now** for instant same-day version

---

## 1) Product summary (locked)

GuestLens Now is the **fast, same-day** version of GuestLens.

It is for hosts who need a quick and simple way to capture memories and keep guests engaged without full premium custom setup.

GuestLens Now is **not** the full premium GuestLens experience. It is the instant version:
- faster to launch
- less customized
- designed for impulse and last-minute events

Premium/custom GuestLens remains the more elevated, personalized product.

---

## 2) Host purchase offer (locked)

### Price
- Host price: **$49.99**

### Host receives
- instant event creation
- unique event link
- host success/share page
- copy link action
- text guests action
- prewritten guest invite message
- full gallery access
- full download access

### Storage and required host messaging
- Photo storage period: **14 days**
- Required product/UI message:
  - **“Photos are available for 14 days. Download before they expire.”**

### Positioning requirement
GuestLens Now must be presented as:
- a fast memory-capture + engagement tool
- not the full premium custom experience
- still valuable and premium-feeling for same-day use

---

## 3) Guest experience (locked)

### Entry state
Guest opens event link and sees:
- event page
- challenge and upload visible immediately
- challenge as primary focus
- upload available without login

### Challenge flow
- challenge-first layout
- guest taps challenge item
- sees short prompt
- uploads for that moment
- challenge item marked complete
- progress updates after upload

### Progress behavior
- After upload #1 and #2:
  - return to challenge flow
  - no paywall

### Unlock trigger
- After upload #3, show unlock screen

### Unlock messaging requirement
Must communicate:
- guest has captured 3 moments
- can now see what everyone else captured

Suggested direction:
- **“You’ve captured 3 moments. See what everyone else captured.”**

### Unlock requirements
Guest must provide:
- full name
- email address
- phone number

Guest must:
- create account or lightweight unlock identity
- pay **$0.99**

### Post-unlock access
- full gallery viewing
- download access
- ability to return later

Rule:
- guests cannot view full gallery for free.

---

## 4) Host experience (locked)

After purchase:
- event created immediately
- host sees success/share page
- host receives shareable event link
- host receives prewritten guest invite message
- host has a “Text Guests” action

### MVP rules
- manual guest phone-number entry is **not required** for MVP
- MVP sharing is **link-first**
- bulk SMS sending can come later
- host access can use a private host link in MVP
- full host login/dashboard can come later

---

## 5) Host download experience (locked)

Host should be able to:
- view gallery
- download all photos
- download individual photos

### MVP approach
- private host link is acceptable
- full authenticated host dashboard is later

### Long-term direction
- full host dashboard
- gallery management
- persistent host access

---

## 6) Storage, expiration, and reminder rules (locked)

### Retention
- Photo storage duration: **14 days**
- Day 10: reminder email sent
- Day 14: photos expire

### Timeline
- Day 0: event created
- Day 10: reminder email sent
- Day 14: photos expire

### Reminder email requirements
- short
- action-focused
- direct gallery/download link

Suggested subject:
- **“Your GuestLens photos expire soon”**

Suggested body direction:
- **“Your event photos will expire in 4 days. Download your memories before they’re gone.”**

### UI retention messaging placement requirements
Surface retention copy in:
- host success page
- host gallery page
- guest page / unlock-related area where relevant

Suggested UI copy:
- **“Photos are available for 14 days. You’ll get a reminder before they expire.”**

Out-of-scope note:
- actual email delivery implementation is out of Phase 1 scope, but requirement is locked.

---

## 7) Monetization summary (locked)

- Host pays **$49.99** for GuestLens Now
- Guests may optionally pay **$0.99** to unlock full gallery after engagement
- Guest unlock occurs after 3rd upload
- Model objective: reward engagement first, then monetize curiosity and gallery access

---

## 8) Data collection & communication rules (locked)

### Required guest unlock data
- full name
- email address
- phone number

### Data association
Collected data links to:
- guest account / unlock identity
- event participation
- upload activity

### Allowed communication use
- transactional communications
- event-related communications
- future GuestLens marketing communications

### Compliance/product communication requirements
- marketing emails must support unsubscribe
- transactional emails are separate from marketing
- guest data collection is required for paid unlock
- unsubscribe capability for marketing is required in future implementation
- consent/privacy policy detail implementation is deferred to later phases

Explicit non-goal:
- do **not** define non-compliant “no unsubscribe” marketing behavior.

Out-of-scope note:
- full legal/privacy policy implementation details are out of Phase 1 scope.

---

## 9) Homepage positioning notes (locked guidance)

GuestLens Now CTA must communicate:
- tonight/same-day/last-minute utility
- memory capture + guest engagement value
- clear distinction from full premium custom experience
- polished, intentional premium feel

Guidance copy:
- badge: **Instant Event**
- headline: **Need something for tonight?**
- main: **GuestLens Now is the fast way to capture memories and keep guests engaged — no planning required.**
- supporting: **Perfect for last-minute events. Upgrade anytime for the full custom experience.**
- button: **Start an Event Now**

This is product guidance; no broad homepage redesign required in Phase 1.

---

## 10) Host flow summary (locked)

1. Host chooses GuestLens Now
2. Host purchases for $49.99
3. Event is created instantly
4. Host sees success/share screen
5. Host copies link or uses text guests action
6. Guests participate
7. Host accesses gallery and downloads photos
8. Host receives reminder email on Day 10
9. Photos expire on Day 14

---

## 11) Guest flow summary (locked)

1. Guest opens event link
2. Guest sees challenge-first page with upload visible
3. Guest uploads photos without login
4. Challenge progress updates
5. After 3rd upload, unlock screen appears
6. Guest provides name, email, and phone number
7. Guest pays $0.99
8. Guest gains gallery and download access

---

## 12) Out of scope for Phase 1 (locked)

- real Stripe integration
- real backend persistence
- real Supabase implementation
- real file storage implementation
- real Twilio SMS sending
- full authentication system
- full host dashboard auth
- real email delivery system
- legal/privacy policy implementation details
- full gallery moderation tools

---

## 13) Implementation notes

- Keep Phase 1 implementation practical and modular.
- Preserve current static prototype architecture while enforcing product rules.
- Prioritize clarity of flow, requirements, and future backend integration boundaries.

