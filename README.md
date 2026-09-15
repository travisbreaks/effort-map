# Effort map

**Match the thinking to the task.** A short method for choosing a model and effort
level: start with the lowest effort that reliably clears the work, raise it only for an
observed reason, diagnose a failed run before raising effort, and compare settings on
the same task against the same checks. Then one worked example: twelve of Travis
Bonnet’s real task cases, where you choose a task, see his starting model and effort,
and explore the available settings without changing that recommendation.

**Live:** [travismakes.org/effort-map](https://travismakes.org/effort-map/)

The worked example records a **September 2026 field study**. These are personal
starting points, not measured rankings. Higher effort cannot supply missing evidence,
grant permission, or guarantee a better result.

## Use it

Open the [live page](https://travismakes.org/effort-map/), or download `site/index.html`
and open it in a browser. The downloaded file is a portable page with embedded data and
no runtime dependencies, model calls, accounts, or network requests. Documentation links
open external websites when followed. GitHub displays HTML as source, so download the
file rather than viewing it here. The copy hosted on travismakes.org also loads the
Cloudflare Web Analytics beacon that Cloudflare injects on that site’s pages.

Read the [complete text map](docs/ROUTING.md) directly on GitHub. Use the
[comparison worksheet](evals/comparison.md) to test a setting on your own work.
The [evaluation guide](evals/README.md) separates routing consistency from task quality.

## Maintain it

Node.js 22 or newer is sufficient. There are no packages to install.

```sh
node scripts/build.mjs
node scripts/check.mjs
```

For a local browser preview:

```sh
python3 -m http.server 8768 --bind 127.0.0.1 --directory site
```

Then open `http://127.0.0.1:8768`. Stop the preview with Ctrl+C.

[Continuous integration](.github/workflows/check.yml) runs the build, confirms the
committed generated files are current, runs the checks, and packages the deployment.
It holds no secrets and does not deploy.

## Watch the vendor facts

Effort levels, model names, and client menus change without notice. `watch.mjs` fetches
the six vendor pages this map cites, compares eighteen pinned sentences against
[data/watch-baseline.json](data/watch-baseline.json), and reports each sentence that
moved or stopped matching. Every probe records which claim on the map it protects.

```sh
node scripts/watch.mjs
```

It exits non-zero when something moved. Read the page, change the map if a fact actually
changed, then record the new wording:

```sh
node scripts/watch.mjs --update
```

[A weekly workflow](.github/workflows/watch.yml) runs the comparison and fails when it
finds drift. This is the only part of the project that uses the network: the build, the
checks, and the page itself make no requests. It compares published wording only. It does
not verify model behavior, benchmark numbers, or what a client menu actually offers you.

## Deploy it

The page is served at `travismakes.org/effort-map/` by this repository’s own Cloudflare
Worker, using static assets only. [wrangler.jsonc](wrangler.jsonc) declares the routes and
explains why a route can share a hostname with the site’s own Worker.

```sh
node scripts/build.mjs
node scripts/check.mjs
node scripts/package.mjs
npx wrangler@4.131.1 deploy
```

`package.mjs` places the page at `dist/effort-map/index.html` beside the security headers
in [deploy/_headers](deploy/_headers). The deploy needs `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` in the environment; supply them from a secret manager rather than
typing them into shell history.

| File | Responsibility |
| --- | --- |
| [data/map.json](data/map.json) | Four model ladders, twelve authored cases, dated historical benchmark snapshot |
| [src/template.html](src/template.html) | Layout and browser interactions |
| [scripts/build.mjs](scripts/build.mjs) | Embed data and generate HTML plus the complete Markdown guide |
| [scripts/check.mjs](scripts/check.mjs) | Build, policy-preservation, fixture, and link checks |
| [scripts/package.mjs](scripts/package.mjs) | Assemble `dist/` for the Cloudflare deploy |
| [scripts/watch.mjs](scripts/watch.mjs) | Compare the cited vendor pages with the recorded baseline |
| [data/watch-baseline.json](data/watch-baseline.json) | Pinned vendor sentences, what each protects, and the date read |
| [site/index.html](site/index.html) | Generated portable deliverable; do not edit directly |
| [evals/cases.json](evals/cases.json) | Twenty draft prompt variants for evaluating a future router |
| [docs/SOURCES.md](docs/SOURCES.md) | Sources, dates, provenance, and limits |
| [docs/STATUS.md](docs/STATUS.md) | Current verified state and remaining decisions |
| [wrangler.jsonc](wrangler.jsonc) | Worker name, routes, and static asset settings |

## Status

A typed-task AI recommender was proposed in the earlier work but is **not
implemented** here. The existing twelve-case selector works without one. No matched
model trials have been run; see [docs/STATUS.md](docs/STATUS.md).

## License

Two licenses, split by what the material is:

- **Code** is under the [MIT License](LICENSE): `scripts/`, `src/template.html`,
  `wrangler.jsonc`, `deploy/`, and `.github/`.
- **Content** is under [Creative Commons Attribution 4.0](LICENSE-CONTENT): the field
  study and task cases in `data/map.json`, the guides in `docs/` and `evals/`, and this
  README. Reuse it with attribution to Travis Bonnet.

`site/index.html` is generated from both: its code is MIT and its text and data are
CC BY 4.0.
