# AI Coding Boilerplate

Minimal starter for AI-assisted product development with:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Generic multi-role agent setup (`requirements`, `architecture`, `designer`, `frontend`, `backend`, `qa`, `devops`)

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
4. If design/branding is in scope, fill `.docs/project/brand.md`.
5. Create first feature spec in `.features/`.

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
│   └── project/                     # Specialization + brand placeholders
├── .features/                       # Feature specs
├── .github/workflows/ci.yml         # Minimal CI pipeline
├── public/.output/                  # Generated design assets + metadata
└── src/                             # Next.js application code
```

## Scripts

- `npm run dev` - Start dev server
- `npm run lint` - Run lint
- `npm run typecheck` - Run TypeScript type checks
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run ai:check-specialization` - Fail if placeholders still exist in specialization doc
- `npm run design:logo -- --prompt \"...\" --name logo-v1` - Generate logo into `public/.output/brand/logos`
- `npm run design:image -- --type hero --prompt \"...\" --name hero-v1` - Generate image into a typed folder
- `npm run design:asset -- --prompt \"...\" --name test-v1 --dry-run` - Generate test placeholder without API key

## Design Output Structure

- `public/.output/brand/logos/`
- `public/.output/brand/icons/`
- `public/.output/marketing/images/`
- `public/.output/marketing/heroes/`
- `public/.output/marketing/social/`
- `public/.output/_meta/prompts/`
- `public/.output/_meta/manifests/`
