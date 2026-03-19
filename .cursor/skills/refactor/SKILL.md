---
name: refactor
description: Execute refactor phases using docs/REFACTOR.md as the single source of truth. Removes duplication, unifies systems, cleans architecture, and ensures stability through Verify → Migrate → Delete workflow.
---

# Refactor Executor

## Authority (must follow)

- `docs/REFACTOR.md` → scope, phases, rules
- `README.md` → architecture reference
- `TODO.md` → execution tracking

If conflict exists → follow `docs/REFACTOR.md`.

**Note:** If the project has `docs/REFACTOR_PLAN.md` and no `REFACTOR.md`, treat `REFACTOR_PLAN.md` as the refactor source of truth.

---

## Default Behavior

- Execute autonomously.
- Ask only if:
  - a required decision is missing, or
  - an action is unsafe without clarification.
- Always choose the safest reversible action.

---

## Core Principles

- One system per feature.
- No duplicate logic.
- Prefer rewrite over patch when needed.
- Do not introduce parallel systems.
- Keep architecture consistent.

---

## Mandatory Workflow

### 1. Load Context

- Read: `docs/REFACTOR.md` (or `docs/REFACTOR_PLAN.md` if REFACTOR.md is absent), `README.md`, `TODO.md`.
- Identify: current phase and next phase to execute.

### 2. Plan (update TODO.md)

- Create or update the TODO list.
- Map tasks to: files, routes, functions.
- Rules: only one task in progress; mark complete immediately when done.

### 3. Execute (strict order)

**A. Remove duplicates**

- Detect duplicate: routes, services, components, APIs.
- Keep the canonical version.
- Migrate logic.
- Delete the others.

**B. Rewrite messy logic**

- Rewrite if: hard to maintain, duplicated, or risky to patch.
- Preserve behavior.

**C. Unify routes**

- Align with REFACTOR.md.
- Remove legacy routes after verification.
- Ensure a single entry per feature.

**D. Delete unused code**

- Remove: unused files, dead imports, orphan logic.
- Only after verification.

### 4. Verify Loop (until clean)

Run (use `npm` if `pnpm` is not in the project):

- `pnpm install` or `npm ci` (or `npm install`)
- `pnpm run build` or `npm run build`
- `pnpm run lint` or `npm run lint`

If any command errors: fix, re-run, repeat until clean.

### 5. Document

Update:

- **docs/REFACTOR.md** (or REFACTOR_PLAN.md): progress tracker, change log, decisions.
- **TODO.md**: completed tasks, next tasks, blockers.

---

## Safety Rules

- Never delete before verification.
- Never create duplicate pathways.
- Never break the core system.
- Avoid irreversible actions unless clearly safe.

---

## Output

Return:

- Phase executed.
- Tasks completed.
- Duplicates removed.
- Route changes.
- Build + lint status.
- Next step.
