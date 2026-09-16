# Contributing

Two kinds of change are welcome. One kind is not.

**A vendor fact moved.** Open an issue with a link to the primary documentation page
and the sentence that changed. The weekly [documentation watch](README.md#watch-the-vendor-facts)
catches most of these, but it reads wording, not behavior.

**A method or wording improvement.** Open a pull request against `main`. Edit
`data/map.json` or `src/template.html`, then run `node scripts/build.mjs` and
`node scripts/check.mjs` and commit the regenerated `site/index.html` and
`docs/ROUTING.md` with your change. CI fails when generated files are stale.

**The twelve task cases are one person's routing record.** They are not open to
edits, additions, or rerankings. To argue a different setting for one of them, run
the [matched comparison](evals/comparison.md) and open an issue with the result.

Plain punctuation only: the checks reject en and em dashes. No private paths,
conversation exports, or credentials in any file. Content is CC BY 4.0 and code is
MIT; see [LICENSE](LICENSE) and [LICENSE-CONTENT](LICENSE-CONTENT).
