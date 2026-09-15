# Compare two effort settings on the same work

Use this worksheet for actual task performance. The routing fixtures in this folder
answer a different question: whether a proposed router follows the authored map. For
Ultra and Ultracode, where the variable is delegation rather than depth, use
[orchestration-trial.md](orchestration-trial.md), then return here for the table.

## Define the trial before running it

- Task and exact prompt:
- Observable acceptance checks, including what must stay unchanged:
- Input files and their versions or hashes:
- Model and version, application/client, tools, permissions, speed setting:
- Lower effort A:
- Higher effort B:
- Number of paired trials planned:
- Budget or stop condition:

Use the same prompt and source snapshot in fresh sessions for A and B. Hold the
model and available tools constant. Alternate or randomize which setting runs first.
In a coding task, start from the same checkout in separate copies. Do not feed A’s
answer into B. Record actual retrieval and tool use; they may change with effort.

Grade outputs against the checks without showing the grader the setting when
practical. Repeat the paired trial before treating a difference as reliable.

| Measure | A | B |
| --- | --- | --- |
| Trial/run identifier and date | | |
| Acceptance checks passed / failed, with evidence | | |
| Missing requirements or unsupported claims | | |
| Unrequested changes or scope expansion | | |
| Missing or incorrectly used sources | | |
| Human corrections required | | |
| Elapsed time and interruptions | | |
| Tool calls and retries, if observable | | |
| Usage shown by the application, with units | | |
| API tokens and measured cost, only if actually available | | |

Write **unavailable** when usage is not exposed. Do not infer a subscription multiplier
from API prices. Save the prompts, outputs, checks, and grading disagreements with
each result; an agent’s report that it passed is not the check itself.

## Make a bounded decision

- Does either setting fail a required check?
- If both pass, does the higher setting save enough rework to justify its time/usage?
- If both fail, is the missing ingredient context, a clear requirement, a tool, or reasoning?
- What specific observation would cause you to change the starting setting?
- Which tasks and versions does this conclusion cover? What remains unknown?

Keep the lowest setting that reliably clears these checks. A small paired trial is a
useful local observation, not a general model ranking.
