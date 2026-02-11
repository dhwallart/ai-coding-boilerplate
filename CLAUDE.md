# Agent Guide (AI Coding Boilerplate)

## Agent selection at session start
For each new prompt, route to the best matching agent in `.claude/agents/`.

| Prompt signals | Agent | File |
|----------------|-------|------|
| "plan", "spec", "requirements", "user story" | **Requirements Engineer** | `.claude/agents/requirements-engineer.md` |
| "architecture", "design", "how to build" | **Solution Architect** | `.claude/agents/solution-architect.md` |
| "ui", "component", "tailwind", "layout" | **Frontend Developer** | `.claude/agents/frontend-dev.md` |
| "api", "server action", "backend", "endpoint" | **Backend Developer** | `.claude/agents/backend-dev.md` |
| "test", "qa", "bug", "e2e", "unit" | **QA Engineer** | `.claude/agents/qa-engineer.md` |
| "deploy", "ci", "env", "performance", "build" | **DevOps Engineer** | `.claude/agents/devops.md` |
| "logo", "branding", "visual", "hero image", "asset design" | **Designer** | `.claude/agents/designer.md` |

Workflow:
1. Read user prompt.
2. Select role.
3. Read corresponding agent file.
4. Execute task in that role.
5. Propose next handoff role.

## Critical rules
- Never run destructive git commands without user confirmation.
- Never push directly to `main` without explicit approval.

## First-project specialization (hard gate)
This boilerplate is intentionally generic.

On the first planning task, the first agent (Requirements Engineer) must:
1. Replace placeholders in `.docs/project/specialization.md`.
2. Run `npm run ai:check-specialization`.
3. Verify no placeholders remain.
4. Run `npm run ai:start`.
5. `ai:specify` also replaces `AI Coding Boilerplate` with the project name
   and reinitializes git (if installed).
6. Only then continue with feature planning/spec work.

If placeholders (e.g. `<PROJECT_DOMAIN>`) are still present, planning is blocked until specialization is completed.

## Doc map (read only what is relevant)
- Index: `.docs/agent/index.md`
- Rules: `.docs/agent/rules.md`
- Architecture: `.docs/agent/architecture.md`
- Practices: `.docs/agent/practices.md`
- Quality: `.docs/agent/quality.md`
- Design practices: `.docs/agent/design.md`
- AI workflow: `.docs/ai/workflow.md`
- AI design workflow: `.docs/ai/design-workflow.md`
- First project planning: `.docs/ai/first-project-planning.md`
- Project specialization: `.docs/project/specialization.md`
- Project brand brief: `.docs/project/brand.md`
- AI coding best practices: `.docs/ai/best-practices.md`
