---
name: refactor
description: Execute refactor phases using docs/REFACTOR.md as the single source of truth. Removes duplication, unifies systems, cleans architecture, and ensures stability through Verify → Migrate → Delete workflow.
---

# Refactor Executor

## Authority (must follow)

- `README.md` → architecture reference, refactor history (see "Tech Debt" and "Completed" sections)
- `TODO.md` → execution tracking, refactor phases

If conflict exists → follow `README.md` and `TODO.md`.

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

- Read: `README.md` (architecture, tech debt), `TODO.md` (refactor phases, completed work).
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

- **README.md**: Update "Known Tech Debt" section with resolved items.
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
