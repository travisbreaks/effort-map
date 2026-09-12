# Working on the effort map

Read README.md, docs/STATUS.md, and the relevant source before editing. Keep the
twelve authored cases and their alternatives intact unless the owner requests a
policy change. Personal routing, vendor facts, and measured results are separate.

Edit data/map.json and src/template.html; regenerate site/index.html and
docs/ROUTING.md with node scripts/build.mjs. Run node scripts/check.mjs and inspect
the browser at desktop and phone widths after interaction or layout changes.

Keep private source paths, conversation exports, credentials, and local evidence in
the ignored .local directory. Use fictional evaluation prompts. Do not copy internal
coordination notes into shared documentation. Do not present synthetic checks as
independent model evaluations.

Commit, push, PR creation, and deployment require the owner's explicit approval.
No paid model calls or account configuration are part of the static build.
