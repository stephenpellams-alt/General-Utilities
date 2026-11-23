# claude-mods

Six small Claude Code mods: an input router, an effort optimizer, a subagent model selector, a cache clock, a handoff command and efficient browser usage guidance. Each is an independent plugin in this marketplace and can be installed on its own.

## Install

At the prompt of a terminal session (replace `stephenpellams-alt/General-Utilities` with this repository):

```
/plugin install input-router --marketplace stephenpellams-alt/General-Utilities
```

From a shell:

```
claude plugin install input-router --marketplace stephenpellams-alt/General-Utilities
```

Mods: `input-router`, `effort-optimizer`, `subagent-model-selector`, `cache-clock`, `handoff`, `efficient-browser-usage`.

## What they do

- **input-router**: sorts prompts into browse, research, quick or code, shows it in the status line and hints the model.
- **effort-optimizer**: low effort for short prompts, high for debug/design/refactor work.
- **subagent-model-selector**: Haiku for Explore, web-fetch and guide agents; Sonnet for others; inherits for Plan and long prompts.
- **cache-clock**: status line countdown assuming a one-hour prompt cache.
- **handoff**: `/handoff [focus]` writes `HANDOFF.md` in the working directory.
- **efficient-browser-usage**: adds browser-efficiency guidance when browser tools exist.
