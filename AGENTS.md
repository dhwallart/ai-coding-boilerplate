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

When the user says "Start": collect project details via `ask_user_question`, then fill `.docs/project/specialization.md` and `.docs/project/brand.md`.

### Step 1 — Project basics (ask_user_question, 4 questions)

Call `ask_user_question` with these 4 questions at once:

**Q1** — "What should your project be called? (Use 'Other' to enter a custom name)"
- TaskFlow
- MyApp

**Q2** — "What kind of product are you building?"
- Web App / SaaS
- E-Commerce / Marketplace
- Dashboard / internal tool
- AI-powered / Automation

**Q3** — "Who will use the product?"
- Consumers (B2C)
- Businesses & Teams (B2B)
- Internal team / Admins
- Developers / technical users

**Q4** — "What should the product mainly achieve?"
- Save time & costs / Automate
- Generate revenue / Sell
- Make data visible / Analyse
- Manage users / Build a platform

### Step 2 — Tech details (ask_user_question, 3 questions)

Call `ask_user_question` with these 3 questions:

**Q1** — "Where does the data come from / how does the backend work?"
- Own database (e.g. Supabase, Postgres)
- Connect external API (REST / GraphQL)
- No backend needed (static / client-side)
- Not decided yet

**Q2** — "How will users log in?"
- No login needed (publicly accessible)
- Email + Password
- OAuth (Google, GitHub, ...)
- API Key / Token

**Q3** — "Where should the app run later?"
- Vercel (recommended for Next.js)
- Self-hosted / VPS
- Docker / Kubernetes
- Not decided yet

### Step 3 — Brand & visual details (ask_user_question, 3 questions)

Call `ask_user_question` with these 3 questions:

**Q1** — "How should the product look and feel?"
- Clean & minimal — lots of whitespace, simple shapes
- Bold & energetic — strong colors, expressive typography
- Professional & trustworthy — corporate, structured
- Playful & friendly — rounded shapes, warm tones

**Q2** — "What color palette fits the brand best?"
- Blues & greys — calm, tech, trustworthy
- Greens & teals — growth, health, sustainability
- Purples & violets — creative, premium, innovative
- Warm tones (orange, red, yellow) — energetic, approachable
- Monochrome / neutral — timeless, flexible

**Q3** — "Do you need a logo?"
- Yes — generate a logo as part of setup
- No — we already have a logo
- Not sure yet — skip for now

### Step 4 — Fill specialization.md and brand.md

Open `.docs/project/specialization.md` and replace all `<PLACEHOLDER>` values with the collected answers. Derive missing values from context. Do not write back any `<...>` placeholders.

Then open `.docs/project/brand.md` and fill all placeholders using the brand and visual answers collected in Step 3:
- `<BRAND_NAME>` — from project name (Step 1, Q1)
- `<COLOR_DIRECTION>` — from primary color direction answer
- `<LOGO_STYLE>` — derive from visual style answer
- `<SHAPE_LANGUAGE>` — derive from visual style answer
- Leave remaining placeholders with a sensible derived default rather than leaving `<...>` syntax.

### Step 5 — Validate & launch

1. Run: `npm run ai:check-specialization`
2. If successful: confirm to the user that the project is ready.
3. Run `npm run dev` in the background.
4. Wait ~3 seconds, then detect the actual port Next.js chose:
   ```bash
   ss -tlnp 2>/dev/null | grep -oP '(?<=:)\d+' | grep -E '^300[0-9]$' | head -1
   ```
   If that returns nothing, fall back to `3000`.
5. Open the detected URL in the browser:
   - Linux: `xdg-open http://localhost:<PORT>`
   - macOS: `open http://localhost:<PORT>`
   - Windows: `start http://localhost:<PORT>`
6. Tell the user: **"Your app is running at http://localhost:PORT"** (use the actual port)
7. Ask: "What should the first feature of your app be?"

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
| First project | `.docs/ai/first-project-planning.md` |
| Specialization | `.docs/project/specialization.md` |
| Brand brief | `.docs/project/brand.md` |
| Best practices | `.docs/ai/best-practices.md` |
