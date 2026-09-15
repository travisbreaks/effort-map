# Current state

September 14, 2026. The effort map is published: this repository is public, and the
page is live at [travismakes.org/effort-map](https://travismakes.org/effort-map/).
The live page is the September 14 build, deployed as Worker version `7af44ba5` and
verified on both hostnames the same night.

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

## Added September 14

- A page section on what effort means at each vendor: OpenAI scopes effort to reasoning
  and varies the range by model; Anthropic scopes it to every output token including tool
  calls, defaults to High, and calls it a behavioral signal rather than a token budget.
- The orchestration section now states that both clients show six rungs over a five-rung
  API, that `ultra` is an effort value in the subagent configuration namespace rather than
  a sixth level on Astra, and that no independent benchmark measures Ultra or Ultracode.
- `scripts/watch.mjs` and a weekly workflow compare eighteen pinned vendor sentences with
  [the baseline](../data/watch-baseline.json). Both failure paths were exercised: a changed
  value and a sentence that stops matching each report and exit non-zero.
- [The orchestration trial](../evals/orchestration-trial.md) is designed and not run. It
  has three arms, because two cannot separate delegation from proactive delegation, and it
  voids itself if the client never spawns a subagent.
- Every row of the September 12 fact table was reread against its cited page. Nothing had
  changed. The Astra benchmark row was rechecked against Artificial Analysis and matches
  the September 8 snapshot exactly.

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

The September 14 build was checked in headless Chrome against a local preview at 320,
390, and 1280 pixels, with the two changed sections expanded. The viewport override was
confirmed applied at each width, because an earlier run silently measured 500 pixels three
times. Document width equalled viewport width at all three, with no horizontal overflow and
no console errors, warnings, or exceptions. Both failure paths of `scripts/watch.mjs` were
exercised deliberately: a changed stored value and a probe whose sentence stops matching
each report the affected claim and exit non-zero.

The deployed copy was then checked. Both `travismakes.org/effort-map/` and the `www`
address returned 200 with bodies byte-identical to `site/index.html`, the bare path
redirected to the trailing slash on both, the security headers were present, and headless
Chrome at 320, 390, and 1280 pixels showed no horizontal overflow and no console errors.

Not verified for the September 14 build: real phone hardware, Safari, Firefox, and a
screen reader.

The recovery work on September 12 also exercised all twenty-one settings at 1280, 768,
390, and 320 pixels, keyboard activation, light and dark rendering, and reduced motion.
Those receipts are local and are not part of this repository. No screen-reader or
independent user trial and no model-performance evaluation has run.

## Remaining decisions

1. Review the twenty draft fixture labels.
2. Run matched effort trials before presenting the personal map as validated advice.
   The orchestration arm of this is now designed; running it needs a client that offers
   both Max and Ultra, which the documented ChatGPT Power menu for Astra does not.
3. Decide whether typed-task recommendations add enough value to warrant an AI backend.
   That optional runtime still needs explicit budget, credentials, and deployment review.
4. Decide whether the hosted page should keep the site’s Cloudflare Web Analytics.
5. Add an index card for the map on the travismakes.org homepage, which lives in a
   separate site repository.
