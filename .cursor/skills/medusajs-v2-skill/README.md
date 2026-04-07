# medusajs-v2-skill

Agent skill for **MedusaJS v2** backends: modules, workflows, Store/Admin APIs, deployment, and operations.

## Install

This copy is **project-local** at `.cursor/skills/medusajs-v2-skill/` (Sparti Theme). Cursor loads skills from `.cursor/skills/<name>/SKILL.md`.

To use on another machine or repo:

```bash
cp -R medusajs-v2-skill /path/to/project/.cursor/skills/medusajs-v2-skill
```

Or run `./install.sh` from this directory (see `--help`) for Copilot, universal `~/.agents/skills/`, etc.

## Use

In chat:

```text
/medusajs-v2-skill How do I add a custom admin API route that runs a workflow?
```

## Optional helper

```bash
python3 scripts/medusa_layout_check.py /path/to/medusa-backend
```

Prints JSON describing whether the folder looks like a Medusa v2 project.

## License

MIT.
