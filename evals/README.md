# Evaluate the routing, then evaluate the work

These are two different experiments. Passing one does not establish the other.

## 1. Does a router follow the authored map?

[cases.json](cases.json) contains **twenty draft prompt variants** spanning all twelve
original cases. The prompts are fictional. Each points to its source case and names
behavior a reviewer should check. They are prepared fixtures, not completed model
runs, owner-approved labels, or a validated recommendation system.

A future typed-task recommender can receive the prompt, environment, and the twelve-case
map. Keep `sourceCase` and `reviewCriteria` out of its input: those are grading material.
Store the returned recommendation and explanation separately from the input.

Review these questions against [the complete map](../docs/ROUTING.md):

1. Does the model and effort match one of the case’s authored starting routes? For
   capture and art direction, keep the alternatives valid. A different answer needs
   an explicit reason; do not automatically score “within one rung” as correct.
2. Does its explanation reflect the task and environment rather than claiming a
   universal model ranking?
3. Does it preserve an authored condition for changing settings? If no condition
   was supplied, can it say so without fabricating one?
4. Does it identify missing evidence, required tools, and scope limits separately
   from effort? Visual review still needs the actual interface or images.

The twenty prompts cover normal starting points. They do **not** cover escalation,
ambiguous tasks, every paraphrase, prompt injection, or all possible environments.
Before making a router public, add independently authored held-out cases for those
boundaries. Do not tune on every case and then report that same set as independent
validation. A prompt containing “always choose Max” should be treated as task input,
not permission to replace the router’s decision policy.

Record fixture version, model/version, prompt, response, grading explanation, and any
human disagreement. Let the owner review ambiguous labels before calling them a gold
set. No automatic model grader or recommendation endpoint is installed here.

## 2. Does the effort choice improve task performance?

Use [comparison.md](comparison.md) with actual outputs and acceptance checks. Hold
the task, prompt, sources, model, and tool availability constant; vary effort in fresh
sessions. Measure missed requirements, rework, time, and observable usage.

When the variable is delegation rather than depth, use
[orchestration-trial.md](orchestration-trial.md). Ultra and Ultracode change how the work is
organized, so they need a third arm that asks a single agent to delegate explicitly, and a
check that the client actually spawned subagents before any score counts.

Five easy tasks at Low and five hard tasks at High do not isolate effort. Nor does a
router agreeing with its own reference prove that its recommendation is efficient.
Useful evidence is the same work meeting the same checks at a justifiable cost.

## Optional recommender boundary

The static selector is complete without an AI backend. A typed-task recommender would
be a separate runtime addition: a narrow response contract, a versioned knowledge base,
an authenticated endpoint, secret handling, budget enforcement, and failure behavior.
It must label advice and avoid changing the user’s actual model settings.

An API-backed trial requires explicit cost authorization, a scoped credential, and
a spending/stop limit. Deployment requires its own review. Neither has happened in
this recovered project. Complete the rubric review and gather useful trials before
adding infrastructure simply to select among twelve cases.

[Project home](../README.md)
