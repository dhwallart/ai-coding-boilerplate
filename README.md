# AI Coding Boilerplate

A starter project for building a product with an AI assistant.

## Requirements

Node.js (includes npm) — download at https://nodejs.org/en/download/

## Getting Started

1. Tell the agent: `Start`
2. Answer the questions.
3. The agent sets everything up and opens your app automatically.

## What Gets Filled In (One Time)

- `.docs/project/specialization.md` — your project description (the agent fills this)
- `.features/` — feature specs live here (see `example.feature.md`)

Optional, only if you want brand or design work:

- `.docs/project/brand.md` — your visual/brand brief

## Design Assets (Optional)

1. Copy `.env.example` to `.env`
2. Add your `OPENAI_API_KEY`

```bash
npm run design:logo -- --prompt "Minimal geometric logo" --name logo-v1
```

Design files are saved in `public/assets/img/`.

## Troubleshooting

If you see placeholder errors, run:

```bash
npm run ai:check-specialization
```
