# PWS Console Site — Architecture

## Purpose
`pwsconsole.com` is the public-facing product, support, privacy, setup, and beta website for PWS Console.

## Source of truth
- GitHub repository: `branson78/PWSConsoleSite`
- Default branch: `main`
- Cloudflare deploys from GitHub.
- GitHub `main` is authoritative.

## Hosting
- Cloudflare Workers Static Assets.
- No home-server origin.
- No Cloudflare Tunnel dependency.
- No server-side application runtime.
- No database.
- No login.
- No PWS credentials or private PWS Console runtime data.

## Domains
- Canonical production URL: `https://pwsconsole.com`
- `https://www.pwsconsole.com` permanently redirects to the root domain through a Cloudflare Redirect Rule.
- `app.pwsconsole.com` remains a separate PWS Console application hostname and is not part of this public website.

## Visual system
The site intentionally mirrors the native PWS Console shell and design vocabulary.

The initial web design tokens are derived directly from `PWSConsoleMobile/Shared/PWSTheme.swift`:
- Background: `#0F1115`
- Card: `#1B1F2A`
- Border: `#2D3340`
- Text: `#F2F2F2`
- Label: `#AEB6C2`
- Muted: `#9DA6B2`
- Accent blue: `#6FB6FF`
- Temperature green: `#72E39C`
- Heat red: `#F05A5A`
- Cold blue: `#73B7FF`
- Precipitation blue: `#8FC5FF`

The web header intentionally follows the desktop PWS Console shell more closely than the mobile shell:
- Desktop-derived header proportions adapted for a public-facing product site.
- Approved PWS Console logo artwork centered as the primary brand element with a secondary product subtitle.
- Centered pill-style navigation derived from the desktop `.nav-links` treatment.
- Right-side status area derived from the desktop `.header-status` pattern.
- Dark card surfaces with one-pixel borders remain shared with desktop and mobile clients.

The homepage includes one anonymous live Hook Echo radar demonstration. PWS Console Desktop already embeds the hosted Hook Echo viewer through an iframe, so the website reuses the proven public viewer boundary rather than inventing a new radar integration. The demo is centered on New York City and contains no user, developer, or home-station location data.

## Initial structure
- `/` — Overview
- `/features/` — Features
- `/setup/` — Getting Started / Station setup
- `/support/` — Support
- `/privacy/` — Privacy
- `/beta/` — External TestFlight beta

## Security boundary
The site is intentionally public and is not protected by Cloudflare Access.

The site must remain static unless a future requirement explicitly justifies server-side functionality. Any future capability that accepts user data, credentials, authentication, configuration changes, or administrative actions requires a fresh architecture and security review before implementation.

The site must never expose or embed:
- Weather Underground API credentials.
- User Station configuration.
- Private PWS Console API data.
- Home-server addresses or administrative endpoints.
- App/runtime state-changing controls.

## Deployment
A GitHub push to `main` triggers Cloudflare deployment. Changes should be reviewed locally before commit. `_TechnicalDebt.md` and this architecture document are reviewed before each milestone commit.


## Homepage layout refinement
The desktop public site uses a wider maximum content width than the mobile-first shell so content extends closer to browser edges on large displays.

The live Hook Echo preview is intentionally placed in the first-screen content region, right-aligned beside a 2x2 block of smaller feature cards. This keeps the motion visible on initial desktop page load without letting the radar dominate the page. On narrower screens the layout collapses to a single column.


## Public privacy and support surface

`/privacy/` is the durable public Privacy Policy URL for PWS Console. It documents the Build 4 privacy boundary, including optional Weather Underground configuration, iPhone Keychain credential storage, location use, third-party weather-data requests, App Group and WatchConnectivity sharing, on-device cached data, and the absence of PWS Console advertising or cross-app advertising tracking.

Public privacy and support inquiries use `support@pwsconsole.com`.

The policy intentionally identifies Weather Underground where the user supplies provider-specific credentials while describing other weather-data services generically to avoid creating a brittle provider-link directory.

## Public support boundary

`/support/` is the durable public support destination for PWS Console and uses `support@pwsconsole.com`.

PWS Console support covers the application and its integrations, including Local Weather, radar, Apple Watch, widgets, complications, and connecting Weather Underground Station configuration to the app.

PWS Console does not provide support for third-party weather-station hardware, sensors, calibration, station networking, or a station's upstream delivery of observations to Weather Underground. Those issues remain with the station manufacturer or weather-data provider.

## Public setup documentation boundary

`/setup/` is the durable public Getting Started destination for configuring and using PWS Console across iPhone, iPad, Apple Watch, widgets, and complications. It explains the optional Station integration, device-location and ZIP-fallback behavior, refresh expectations, downstream credential isolation, and safe support reporting.

PWS Console documentation covers how users configure and operate PWS Console. It does not attempt to provide general personal-weather-station hardware, sensor calibration, networking, Weather Underground account, or upstream station-publishing instructions. Weather Underground may be linked as an external resource where directly relevant to configuring the PWS Console integration; the Setup page uses only its top-level public site rather than depending on a fragile account-specific path.

## Public beta boundary

`/beta/` is the durable public TestFlight enrollment landing page for external-beta participation, requested test coverage, and credential-safe feedback guidance. Its public copy is deliberately independent of a specific application build number or Apple review state. The public enrollment URL is `https://testflight.apple.com/join/P2BB8tDE`.
