# PWS Console Site — Architecture

## Purpose
`pwsconsole.com` is the public-facing product, download, support, privacy, and setup website for PWS Console.

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
- `/privacy/` — Privacy policy selector
- `/privacy/apple/` — Apple Devices Privacy Policy
- `/privacy/fire-tv/` — Fire TV Privacy Policy
- `/beta/` — Legacy Apple-download landing page that directs visitors to the App Store

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

`/privacy/` is the durable public privacy landing page for PWS Console. It links to platform-specific policies while generic site navigation and footers continue to use this stable selector URL.

`/privacy/apple/` preserves the existing Apple-device policy and documents the Build 4 privacy boundary, including optional Weather Underground configuration, iPhone Keychain credential storage, location use, third-party weather-data requests, App Group and WatchConnectivity sharing, on-device cached data, and the absence of PWS Console advertising or cross-app advertising tracking.

`/privacy/fire-tv/` is the durable Fire TV storefront-policy URL. It describes the locally stored Home ZIP, approximate-location lookup, direct third-party weather/mapping requests, absence of Fire TV location permission, accounts, advertising, behavioral analytics, and cross-application tracking.

Public privacy and support inquiries use `support@pwsconsole.com`.

The policy intentionally identifies Weather Underground where the user supplies provider-specific credentials while describing other weather-data services generically to avoid creating a brittle provider-link directory.

## Public support boundary

`/support/` is the durable public support destination for PWS Console and uses `support@pwsconsole.com`.

PWS Console support covers the application and its integrations, including Local Weather, radar, Apple Watch, widgets, complications, and connecting Weather Underground Station configuration to the app.

PWS Console does not provide support for third-party weather-station hardware, sensors, calibration, station networking, or a station's upstream delivery of observations to Weather Underground. Those issues remain with the station manufacturer or weather-data provider.

## Public setup documentation boundary

`/setup/` is the durable public Getting Started destination for configuring and using PWS Console across iPhone, iPad, Apple Watch, widgets, complications, and Fire TV. It explains the optional Station integration, Apple-device location and ZIP-fallback behavior, Fire TV Home ZIP setup and essential remote navigation, refresh expectations, downstream credential isolation, and safe support reporting.

PWS Console documentation covers how users configure and operate PWS Console. It does not attempt to provide general personal-weather-station hardware, sensor calibration, networking, Weather Underground account, or upstream station-publishing instructions. Weather Underground may be linked as an external resource where directly relevant to configuring the PWS Console integration; the Setup page uses only its top-level public site rather than depending on a fragile account-specific path.

## Public download boundary

Apple navigation and download calls to action use the canonical public App Store listing: `https://apps.apple.com/us/app/pws-console/id6808379047`. The former `/beta/` route remains available as a legacy Apple-download landing page so existing external links no longer imply that the Apple app is pre-release.

Fire TV is publicly released and remains represented by the durable `/fire-tv/` product page. The website intentionally has no Amazon Appstore download/storefront link: Fire TV users discover and install through the TV/Amazon ecosystem.

## Homepage ecosystem carousel hero

The homepage product hero is an intentionally client-side, static-asset presentation of the current Apple ecosystem. It does not introduce a server-side runtime or a dependency on the private PWS Console application.

The hero:
- Uses the approved atmospheric/weather visual treatment as a static background asset.
- Presents iPad, iPhone, and Apple Watch as independently positioned device assets rather than baking the entire hero into one image.
- Uses HTML for promotional copy so messaging remains accessible, responsive, searchable, and independently editable.
- Rotates the three device assets through front/left/right carousel positions with a deliberate pause at each featured device.
- Uses a localized animated radar treatment within the Apple Watch presentation while the Watch is featured.
- Honors `prefers-reduced-motion` by suppressing nonessential hero animation.
- Keeps carousel behavior entirely in public-site CSS/JavaScript with no configuration or application-state controls.

The carousel structure is intentionally extensible. A future Desktop client or other supported platform can be added as another carousel stop without redesigning the homepage information architecture. Platforms should not be added to the public carousel until their distribution is real and appropriate to advertise.

The hero artwork is product-presentation material. It must not expose private station locations, credentials, home-server addresses, or other developer/user-specific data.

## Public Fire TV surface

`/fire-tv/` is the durable public product and support reference for PWS Console on Amazon Fire TV. It describes the Home ZIP weather experience, forecasts, animated NOAA/NWS radar, severe-weather alerts, and remote-friendly interface without exposing station configuration, credentials, private runtime data, home-server addresses, or administrative controls.

Fire TV is a first-class primary-navigation destination, alongside the existing Features destination for the Apple-device feature area. Fire TV-specific privacy context links directly to `/privacy/fire-tv/`; generic Privacy links resolve to `/privacy/`.

The supplied Fire TV device artwork is a static presentation asset in the same client-side carousel as iPad, iPhone, and Apple Watch. It is not generated, transformed, or connected to live application data by the site. The four-stop carousel preserves its responsive and `prefers-reduced-motion` behavior.

## Public licensing boundary

`/licensing/` is the durable public software-licensing destination for PWS Console. PWS Console source code uses the PolyForm Noncommercial License 1.0.0 where expressly applied. Commercial use requires separate permission.

The public License page is linked from Support, Privacy, and the site-wide static footer rather than adding another primary-navigation pill.

PWS Console branding and third-party components are treated separately from the PWS Console software license. Third-party software, services, libraries, artwork, data, and other components retain their applicable licenses, terms, and attribution requirements. Public licensing language must not imply that a community fork is an official PWS Console distribution.
