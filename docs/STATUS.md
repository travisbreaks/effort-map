# Current state

September 12, 2026. The effort map is published: this repository is public, and the
page is live at [travismakes.org/effort-map](https://travismakes.org/effort-map/).

## What is live

- The V4 field-study map, recovered on September 12 into its own project. All twelve
  original task cases and their starting alternatives are retained.
- Four documented ladders expose twenty-one selectable model/effort combinations.
- The page distinguishes a task’s recommendation from manual exploration and keeps
  the full selected task title visible on narrow screens.
- The build produces a portable HTML page and a complete Markdown map from shared data.
- This repository’s own Cloudflare Worker serves `/effort-map` on travismakes.org and
  www.travismakes.org through two routes. The rest of the site is served by a separate
  Worker and is unaffected.
- Twenty draft routing fixtures and a matched comparison worksheet are prepared.
- Vendor facts were checked against primary documentation on September 12. The old
  benchmark table is clearly historical and not reverified.

## Verification

Before publication the build and portable checks passed, and the build was confirmed
deterministic: rebuilding produced byte-identical generated files.

The downloadable page was checked in Chrome at 1280 and 390 pixels: no page errors, no
network requests of any kind, and no horizontal overflow. With JavaScript disabled the
plain-text table opens natively, and all twelve rows match the data file.

The deployed page was checked in Chrome at 1280, 390, and 320 pixels. It returned 200
with no page or console errors and no horizontal overflow. Selecting each of the twelve
tasks showed its authored starting model. With JavaScript disabled the plain-text table
matched the data file for all twelve rows. The bare `/effort-map` address redirects to
`/effort-map/` on both hostnames, the security headers match the rest of the site, and
the Worker’s workers.dev address is disabled.

The hosted page makes one kind of request beyond itself: Cloudflare Web Analytics, which
Cloudflare injects on travismakes.org pages. The downloadable file makes none.

The recovery work on September 12 also exercised all twenty-one settings at 1280, 768,
390, and 320 pixels, keyboard activation, light and dark rendering, and reduced motion.
Those receipts are local and are not part of this repository. No screen-reader or
independent user trial and no model-performance evaluation has run.

## Remaining decisions

1. Review the twenty draft fixture labels.
2. Run matched effort trials before presenting the personal map as validated advice.
3. Decide whether typed-task recommendations add enough value to warrant an AI backend.
   That optional runtime still needs explicit budget, credentials, and deployment review.
4. Decide whether the hosted page should keep the site’s Cloudflare Web Analytics.
5. Add an index card for the map on the travismakes.org homepage, which lives in a
   separate site repository.
