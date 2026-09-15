# Does orchestration beat depth?

Ultra and Ultracode are product modes, not rungs on a model's effort ladder. Ultra runs
maximum reasoning and lets the assistant delegate to subagents on its own. Ultracode sends
Extra High and plans dynamic workflows. Published sources cannot tell you whether either
one produces better work, because no independent benchmark measures them: Artificial
Analysis scores Astra at five effort levels and stops at Max. This is a design for finding
out on your own work.

Use [comparison.md](comparison.md) for one model at two effort levels. Use this file when
the variable is delegation rather than depth.

## Before you can run this

Confirm each item and write down what you saw. Any one of them missing invalidates the
comparison rather than producing a negative result.

- **Both settings are selectable in one client.** The Codex level selector lists Low,
  Medium, High, Extra high, Max, and Ultra. The ChatGPT composer lists Light through Max
  depending on model, and the documented Astra rollout of the Power options ends at Astra
  Extra High. So the ChatGPT model picker may not offer either end of this comparison.
- **Ultra is actually available to the account.** It is documented as limited to eligible
  accounts and supported models.
- **The same model backs every arm.** An arm that silently changes model measures the model.
- **The same tools, permissions, and network access in every arm.** A subagent that can
  reach a source the single agent cannot is measuring retrieval, not orchestration.

## Choose a task that can actually divide

Before looking at any setting, write down three or more subtasks whose outputs can be
checked separately and that do not need each other's results. If you cannot, the task is
not divisible, and the trial will measure coordination overhead on work that never needed
splitting. That is a real finding about the task, not about Ultra.

## Arms

Run three, not two. Two arms cannot separate delegation from proactive delegation.

| Arm | ChatGPT and Codex | Claude Code |
| --- | --- | --- |
| A. Depth alone | Max | Extra High |
| B. Depth plus a request to delegate | Max, with an explicit instruction to split the work across subagents | Extra High, with the same explicit instruction |
| C. The product mode | Ultra | Ultracode |

Hold effort constant between B and C on the Claude side: Ultracode sends Extra High, so
comparing it against Max would vary effort and orchestration at once and tell you nothing
about either.

Arm B is the arm that matters. If B matches C, the mode is selling you something you could
have asked for in a sentence.

## Manipulation check, before any grading

Record the number of subagents each arm actually spawned. Subagent activity is visible in
the ChatGPT desktop app, Codex CLI, and the IDE extension, and Claude Code reports the
workflow it planned.

If arm C spawned none, the trial is void. Do not score it. Documented local Codex releases
delegate when you ask directly or when an applicable project or skill instruction requests
it, so a local client can decline to delegate proactively even with the mode selected. A
void trial is a fact about the client, and worth writing down as one.

## Trial 1: seeded recall, for an objective score

Fan-out claims breadth. Breadth is measurable.

1. Copy a real body of work into `.local/trials/<date>/`, which stays out of the repository.
2. Plant a fixed set of independently verifiable defects across separate files: a wrong
   boundary condition, a stale link, a contradicted claim, an unhandled case, a silent
   overwrite. Record a manifest with file, line, and why each one is wrong.
3. Give every arm the same prompt and the same acceptance checks. Do not mention the count.
4. Score recall (planted defects found), precision (reported problems that are real), and
   the cost and elapsed time of each arm.

Run this first. If fan-out cannot win on breadth with a known key, it will not win on work
whose key you do not have.

## Trial 2: a real task, for the decision you actually make

Repeat with one genuine task from your own routing record, graded against acceptance checks
written before the run, using the measurement table in [comparison.md](comparison.md). Grade
the final artifact only, with the transcript withheld from the grader: delegation is visible
in a transcript and will bias the grade.

## Pre-register the prediction

Write the expected result before the first run, so the trial can contradict you.

- Which arm do you expect to win, on which check, and by how much?
- What result would you refuse to believe without a repeat?
- What is the stop condition in time or spend?

## What each result changes

- **C beats A and B.** Proactive delegation adds something you cannot request. Keep the mode
  for divisible work, and say which kinds of work in the map.
- **B matches C.** The mode is a convenience. The routing rule becomes ask for delegation,
  not buy the mode.
- **A matches both.** The task was not divisible, or coordination cost what fan-out saved.
  Record the task shape, because that is the useful part.
- **A beats both.** Fragmentation is costing quality on this task type. That is the strongest
  reason to leave the top of the ladder alone.

Any of these changes step nine of the short routing list, which currently sends divisible
work to explicit delegation, Ultra, or Ultracode without evidence ranking them.

## What this cannot tell you

One task on one account on one date. Rollout stage, plan, and client all vary, and both
vendors change these modes without notice. A result here is a local observation about your
work, not a measurement of Ultra, of Ultracode, or of a model.

[Sources and limits](../docs/SOURCES.md) · [How to compare settings](README.md) · [Project home](../README.md)
