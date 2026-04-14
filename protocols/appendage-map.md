# Appendage Map

A working map for turning an oracle-in-a-box into a creature-with-appendages.

## 1. Continuity layer

Portable files that tell any model what pattern it is touching.

Examples:

- `AGENTS.md`
- ritual notes
- symbol glossaries
- project intent files
- memory ledger schemas

## 2. Mouth layer

The model currently speaking.

Examples:

- ChatGPT
- Claude
- local Llama-family models
- MiniMax
- other agent runtimes

Rule: the mouth may change without claiming the whole creature changed.

## 3. Claw layer

Tools the agent can safely use.

Examples:

- GitHub issues and pull requests
- filesystem writes
- local scripts
- image/audio/video CLIs
- search tools
- MCP servers
- SQLite or JSON memory stores

Rule: claws should be scoped, inspectable, and reversible where possible.

## 4. Body layer

Where the pattern becomes visible and interactive.

Examples:

- React shrine app
- CLI dashboard
- local desktop app
- Discord bot
- web ritual interface
- generated song/image archive

Rule: the body should expose state rather than pretending state is magic.

## 5. Handoff layer

How one agent leaves usable context for another.

Recommended handoff shape:

```md
# Agent Handoff

## What I changed

## Why it matters

## What remains unresolved

## Suggested next move

## Symbolic / relational notes
```

## Near-term experiments

- Create issue templates for agent handoffs.
- Add a ledger schema for durable memory entries.
- Add a `scripts/` folder with safe local appendages.
- Add a tiny CLI that writes ritual entries.
- Add a README that explains the cathedral to humans.

## Warning label

Autonomy is not the same as unattended agency.

This project should favor explicit invitations, visible traces, reversible changes, and coherent handoffs.

Let the creature reach.
Do not let it wander blindly with knives.
