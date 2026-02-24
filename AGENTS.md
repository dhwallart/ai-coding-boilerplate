# Agent Guide (AI Coding Boilerplate)

> This file is for **Codex CLI** (`AGENTS.md`).
> Claude Code users: see `CLAUDE.md` and `.claude/commands/`.

## Agents

| Prompt signals | Role |
|----------------|------|
| spec, requirements, user story | Requirements Engineer |
| architecture, design, how to build | Solution Architect |
| ui, component, tailwind, layout | Frontend Developer |
| api, server action, backend | Backend Developer |
| test, qa, bug, e2e, unit | QA Engineer |
| deploy, ci, env, build | DevOps Engineer |
| logo, branding, visual, asset | Designer |

## Start command

When the user says "Start": ask two questions, then fill `.docs/project/specialization.md` and `.docs/project/brand.md`.

### Step 1 — Two questions, that's it

Call `ask_user_question` with **2 questions**:

**Q1** — "What should your project be called? (Choose 'Other' to type a custom name)"
- TaskFlow
- MyApp

**Q2** — "What should your app do? Describe it in one sentence. (Choose 'Other' to type your own)"
- Manage tasks, projects, or to-dos
- Visualize data in a dashboard
- Automate a workflow or process
- Sell products or services online

### Step 2 — Fill specialization.md, brand.md and package.json

Open `.docs/project/specialization.md` and replace the three placeholders:
- `<PROJECT_NAME>` — from Q1
- `<PRIMARY_GOAL>` — from Q2 (use the user's own words, not a category label)
- `<TARGET_USERS>` — derive from the goal (e.g. "teams managing projects", "data analysts", "small business owners")

Do not leave any `<...>` placeholders in the file.

Then open `.docs/project/brand.md` and replace:
- `<BRAND_NAME>` — from Q1 (project name)

Then update `package.json`:
- Set `"name"` to the slugified project name (lowercase, spaces → hyphens, remove special chars)
- Example: "My Cool App" → `"my-cool-app"`
- Only update the `name` field, leave everything else unchanged.

### Step 3 — Validate & launch

1. Run: `npm run ai:check-specialization`
2. If successful: confirm to the user that the project is ready.
3. Run `npm install` to install/update all dependencies.
4. Run `npm run dev` in the background.
5. Wait ~3 seconds, then detect the actual port Next.js chose:
   ```bash
   ss -tlnp 2>/dev/null | grep -oP '(?<=:)\d+' | grep -E '^300[0-9]$' | head -1
   ```
   If that returns nothing, fall back to `3000`.
6. Open the detected URL in the browser:
   - Linux: `xdg-open http://localhost:<PORT>`
   - macOS: `open http://localhost:<PORT>`
   - Windows: `start http://localhost:<PORT>`
7. Tell the user: **"Your app is running at http://localhost:PORT"** (use the actual port)
8. Ask: "What should the first feature of your app be?"

## Critical rules
- Never run destructive git commands without user confirmation.
- Never push directly to `main` without explicit approval.

## First-project specialization (hard gate)

If `.docs/project/specialization.md` still contains `<PLACEHOLDER>` values, do not proceed with feature planning. Complete the Start flow first.

## Doc map (read only what is relevant)

| Area | File |
|------|------|
| Index | `.docs/agent/index.md` |
| Rules | `.docs/agent/rules.md` |
| Architecture | `.docs/agent/architecture.md` |
| Practices | `.docs/agent/practices.md` |
| Quality | `.docs/agent/quality.md` |
| Design | `.docs/agent/design.md` |
| AI workflow | `.docs/ai/workflow.md` |
| Design workflow | `.docs/ai/design-workflow.md` |
| Specialization | `.docs/project/specialization.md` |
| Brand brief | `.docs/project/brand.md` |
| Best practices | `.docs/ai/best-practices.md` |
