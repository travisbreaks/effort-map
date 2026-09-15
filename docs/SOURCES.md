# Sources and limits

## Personal field study

The twelve task cases come from Travis’s September 2026 routing record. They describe
where he starts and the conditions under which he changes. No matched model trials
establish that these are the best settings for someone else’s work. The prose uses
his first-person perspective inside the map.

Recovered on September 12 from a complete September 10 V4 HTML snapshot. Original
SHA-256: `aa2f27705d3b5e0d1337f0ade5e6c12be2a9f9d2509b6c4f2f58db66cea50260`.
The recovery copied the snapshot; it did not move or modify its source. This edition
extracts the data, supplies a reproducible build and text fallback, clarifies selection,
and adds evaluation materials. Original private paths remain outside shared files.

## Product facts checked September 12, 2026

| Fact used here | Primary source |
| --- | --- |
| Astra’s API accepts Low through Max; Sol also accepts None. | [Astra specification](https://developers.openai.com/api/docs/models/gpt-6-astra), [Sol specification](https://developers.openai.com/api/docs/models/gpt-5.6-sol) |
| ChatGPT’s menus vary by plan and rollout; Light is a product label. API support does not promise a visible client setting. | [ChatGPT models and Power](https://learn.chatgpt.com/docs/models) |
| Fable 5.1 and Opus 5 support Low, Medium, High, Extra High, and Max. Anthropic starts both at High and advises evaluating changes. Effort is not a fixed token budget or a reliable response-length control. | [Claude effort](https://platform.claude.com/docs/en/build-with-claude/effort) |
| Fable’s adaptive thinking is always on; Opus can disable thinking at High or below. | [Fable overview](https://platform.claude.com/docs/en/models/fable-5-1/overview), [Opus overview](https://platform.claude.com/docs/en/models/opus-5/overview) |
| ChatGPT Work Ultra can proactively delegate on eligible accounts and models. Current local Codex delegation requires a request or applicable project/skill instruction. | [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) |
| Claude Code Ultracode combines Extra High with dynamic workflows. It is a product mode, not another API effort level. | [Claude Code model configuration](https://code.claude.com/docs/en/model-config) |

Equal effort labels do not establish equal compute or capability across models. A
product mode, the model, available tools, and permissions are separate controls. The
map does not detect or change the settings in your actual assistant.

## Rechecked and extended September 14, 2026

The September 12 table above was reread against the same primary pages. Nothing in it
had changed. The facts below were added on September 14 and are the basis of the page
section on what effort means at each vendor.

| Fact used here | Primary source |
| --- | --- |
| Astra states `reasoning.effort supports low, medium, high, xhigh, and max`, and publishes no default. Sol publishes Medium as its default. | [Astra specification](https://developers.openai.com/api/docs/models/gpt-6-astra), [Sol specification](https://developers.openai.com/api/docs/models/gpt-5.6-sol) |
| Anthropic effort covers all output tokens, including tool calls and their arguments, so lower effort also means fewer and terser tool calls. High is the default and is identical to omitting the parameter. Effort is a behavioral signal, not a strict token budget, and not every model supporting Max supports Extra High. | [Claude effort](https://platform.claude.com/docs/en/build-with-claude/effort) |
| On Opus 5, thinking cannot be disabled at Extra High or Max: those requests return a 400 error. Fable 5.1 and Opus 5 accept a per-message effort change mid-conversation, in beta. | [Claude effort](https://platform.claude.com/docs/en/build-with-claude/effort) |
| The Codex level selector numbers Ultra as its sixth entry, above Max. The documented Astra rollout of the ChatGPT Power options ends at Astra Extra High, so one client can omit both ends of that ladder. | [ChatGPT models and Power](https://learn.chatgpt.com/docs/models) |
| `ultra` is an accepted subagent `model_reasoning_effort` value, while the Astra model specification does not list it. The same word is an effort value in the agent-configuration namespace and a product mode in the client, and is not a sixth level on the model. | [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents), [Astra specification](https://developers.openai.com/api/docs/models/gpt-6-astra) |
| Ultracode sends Extra High and plans a dynamic workflow per substantive task. | [Claude Code model configuration](https://code.claude.com/docs/en/model-config) |

Artificial Analysis lists five Astra effort variants and stops at Max. No published
independent benchmark measures Ultra or Ultracode, which is why
[the orchestration trial](../evals/orchestration-trial.md) is a design rather than a
result. Read September 14, 2026:
[Astra effort variants](https://artificialanalysis.ai/models/releases/gpt-6-astra).

The five Astra values on that page match the September 8 snapshot below exactly. That
recheck covers one of four model rows and does not revalidate the rest of the table.

Eighteen sentences behind these two tables are pinned in
[the watch baseline](../data/watch-baseline.json) and compared weekly by
`scripts/watch.mjs`, which names the claim each one protects and reports when the
published wording moves or stops matching. The watcher reads wording. It does not
verify model behavior, and a page can change a fact in a sentence no probe pins.

## Historical benchmark, kept separate

The optional table preserves the original September 8 Artificial Analysis Intelligence
Index v4.3 snapshot. It records index scores and estimated USD per index task, with
Fable’s default fallback configuration. These numbers were **not independently
rechecked during recovery**. They are not current prices, a workload-specific ranking,
or a conversion to ChatGPT/Claude subscription usage.

Original references: [OpenAI provider table](https://artificialanalysis.ai/providers/openai),
[Anthropic provider table](https://artificialanalysis.ai/providers/anthropic), and
[index methodology](https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index).
Before using the snapshot in a new comparison, retrieve a current source and record
its date and configuration. Never silently replace a historical number.

[Project home](../README.md)
