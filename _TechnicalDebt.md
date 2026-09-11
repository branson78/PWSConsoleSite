# PWS Console Site — Technical Debt & Roadmap

This document is reviewed before each milestone commit. Completed active items are removed or moved to milestone history, intentionally deferred work is recorded, and priorities are adjusted as needed.

## Current state
- Public GitHub repository exists at `branson78/PWSConsoleSite`.
- Cloudflare Workers Static Assets deployment is configured from GitHub `main`.
- `pwsconsole.com` is the canonical production hostname.
- `www.pwsconsole.com` permanently redirects to the root domain.
- The public website is intentionally static and separate from `app.pwsconsole.com`.
- The first shell derives its colors/cards from the native PWS Console design system and now uses the desktop application's larger brand/header and pill-navigation proportions.
- The homepage includes an eagerly loaded anonymous Hook Echo live-radar card centered on New York City so live radar is visible on initial desktop page load; it does not depend on PWS Console private infrastructure.
- The homepage now includes an Apple-device ecosystem carousel hero using independently positioned iPad, iPhone, and Apple Watch assets, fading HTML copy, reduced-motion support, and localized Watch radar motion. The structure is designed to accept future distributable platforms without redesigning the homepage.

## P0 — Public-site shell and external beta readiness
- [ ] Physically review the widened shell and above-the-fold radar layout on desktop Safari, iPhone Safari, and iPad Safari.
- [ ] Confirm all public content contains no developer-specific station data or credentials.

## P1 — Product presentation
- [ ] Add curated screenshots for widgets and complications where they materially improve product presentation beyond the completed iPad/iPhone/Apple Watch carousel hero.
- [ ] Add concise feature walkthroughs without turning the site into a documentation portal.
- [ ] Review responsive layout at common phone/tablet/desktop widths.
- [ ] Review keyboard navigation, focus states, semantic headings, contrast, and reduced-motion behavior.
- [ ] Add social sharing metadata and an appropriate preview image.
- [ ] Add favicon / Apple touch icon from approved PWS Console artwork.
- [ ] Add canonical URL metadata.

## P2 — Longer-term polish
- [ ] Add lightweight analytics only if a concrete product need justifies the privacy tradeoff.
- [ ] Add search-engine indexing controls and sitemap after public copy stabilizes.
- [ ] Consider a changelog/release-notes page if external beta cadence makes it useful.
- [ ] Consider custom 404/other static error pages.
- [ ] Consider automated static accessibility/link checks if site complexity grows.

## Intentionally deferred
- Server-side forms or feedback ingestion.
- Accounts/authentication.
- Dynamic weather or live personal-station data on the marketing site.
- Any coupling to the private PWS Console application/runtime.
- Frameworks, package managers, build pipelines, or client JavaScript until a concrete requirement justifies them.
- Cloudflare Workers code/functions beyond static-asset delivery.

## Completed milestones

- 2026-09-10 — Apple ecosystem Carousel Hero v3.1 approved for the homepage with polished iPad/iPhone device assets, Apple Watch radar motion, fading HTML device copy, responsive/reduced-motion behavior, and an extensible carousel structure for future distributable platforms.

- 2026-09-09 — Durable public Beta landing page completed with active public TestFlight enrollment at `https://testflight.apple.com/join/P2BB8tDE`, build-independent testing expectations, requested iPhone/iPad/Watch/weather/radar/widget/complication coverage, and credential-safe feedback guidance through `support@pwsconsole.com` and the public Support page.

- 2026-09-08 — Durable public Setup guidance completed for location and ZIP fallback, optional user-owned Weather Underground Station configuration, iPhone Keychain credential isolation, Apple Watch, widgets and complications, refresh behavior, configuration changes, and credential-safe support reporting. The page remains focused on PWS Console rather than general station or provider setup.

- 2026-09-08 — Durable public Support page published around PWS Console app support, with `support@pwsconsole.com` as the support/beta contact and an explicit boundary excluding third-party weather-station hardware and upstream station troubleshooting.

- 2026-09-08 — Public Privacy Policy completed for the Build 4 Apple-client architecture, `support@pwsconsole.com` established as the public privacy/support contact, and approved PWS Console logo artwork adopted across the public-site header.

- 2026-09-08 — Public website shell established with desktop-derived header proportions, widened desktop layout, native PWS Console card styling, initial public-site routes, and an anonymous right-aligned Hook Echo radar preview visible in the initial desktop viewport.
- 2026-09-08 — Repository created, GitHub-connected Cloudflare Workers Static Assets deployment established, `pwsconsole.com` attached as the production custom domain, and `www` configured to redirect permanently to the canonical root hostname.
