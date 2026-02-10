# AI Coding Boilerplate

Minimal starter for AI-assisted product development with:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Generic multi-role agent setup (`requirements`, `architecture`, `frontend`, `backend`, `qa`, `devops`)

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## First Project Planning (important)

This repo ships with placeholders to keep it reusable.

1. Open `.docs/project/specialization.md`.
2. Replace every `<PLACEHOLDER>` with your real project context.
3. Run `npm run ai:check-specialization`.
4. Create first feature spec in `.features/`.

Guide: `.docs/ai/first-project-planning.md`.

## Agent Entry Points

- Main routing doc: `CLAUDE.md`
- Agent profiles: `.claude/agents/`
- Agent knowledge map: `.docs/agent/index.md`
- Workflow: `.docs/ai/workflow.md`

## Project Structure

```text
.
├── .claude/agents/                  # Role instructions
├── .docs/
│   ├── agent/                       # Cross-cutting rules and practices
│   ├── ai/                          # Workflow and planning guidance
│   └── project/specialization.md    # Replace placeholders at kickoff
├── .features/                       # Feature specs
├── .github/workflows/ci.yml         # Minimal CI pipeline
└── src/                             # Next.js application code
```

## Scripts

- `npm run dev` - Start dev server
- `npm run lint` - Run lint
- `npm run typecheck` - Run TypeScript type checks
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run ai:check-specialization` - Fail if placeholders still exist in specialization doc
