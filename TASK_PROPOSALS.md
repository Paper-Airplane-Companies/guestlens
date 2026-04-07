# Codebase Task Proposals

## 1) Typo Fix Task: Standardize brand capitalization in README
- **Issue found:** The README title uses lowercase `guestlens`, while the site consistently uses `GuestLens` branding.
- **Evidence:** `README.md` line 1 vs page titles/logos in `index.html` and `contact.html`.
- **Proposed task:** Change README heading from `# guestlens` to `# GuestLens` and keep naming consistent in docs.
- **Why it matters:** Prevents brand inconsistency and avoids copy/paste drift into marketing materials.
- **Acceptance criteria:** README heading matches brand casing used in HTML titles and logos.

## 2) Bug Fix Task: Harden external links opened in new tabs
- **Issue found:** External links in `events/kennedy-cooper-graduation.html` use `target="_blank"` without `rel="noopener noreferrer"`.
- **Evidence:** Upload and album anchors on lines 33-34 and CTA on line 87.
- **Proposed task:** Add `rel="noopener noreferrer"` to every external anchor that uses `target="_blank"` across event pages/templates.
- **Why it matters:** Prevents reverse-tabnabbing and improves security baseline.
- **Acceptance criteria:** No `target="_blank"` anchors exist without `rel="noopener noreferrer"`.

## 3) Documentation Discrepancy Task: Clarify current implementation scope in README
- **Issue found:** The README describes the product at a high level but omits that core flows are placeholders (e.g., contact form `action="#"` and template links `href="#"`).
- **Evidence:** Placeholder form/action and event links in `contact.html` and `events/event-template.html`.
- **Proposed task:** Expand README with a short “Current state” section noting this is a static prototype and listing which integrations are TODO.
- **Why it matters:** Aligns contributor/operator expectations and reduces confusion during deployments.
- **Acceptance criteria:** README includes explicit notes about placeholder form handling and template CTA links.

## 4) Test Improvement Task: Add automated static site checks in CI
- **Issue found:** There are currently no tests/checks for HTML validity, link health, or security attributes.
- **Evidence:** Repository has only static assets/pages and no test tooling configuration.
- **Proposed task:** Add a lightweight CI workflow that runs:
  1. an HTML validator/linter,
  2. a broken-link checker,
  3. a custom check to fail on `target="_blank"` without `rel="noopener noreferrer"`.
- **Why it matters:** Catches regressions in static pages before publish.
- **Acceptance criteria:** CI fails on invalid HTML/broken links/missing rel attributes and passes on current corrected pages.
