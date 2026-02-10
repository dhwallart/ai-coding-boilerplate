# AI Design Workflow

## Standard sequence
1. Fill `.docs/project/brand.md` placeholders.
2. Draft prompt candidates.
3. Generate first batch with `--dry-run` or live API.
4. Generate final candidates.
5. Select and hand off asset paths.

## Commands
```bash
# Dry run
npm run design:logo -- --prompt "Minimal geometric logo for ..." --name logo-v1 --dry-run

# Live generation
npm run design:logo -- --prompt "Minimal geometric logo for ..." --name logo-v1
npm run design:image -- --type hero --prompt "Editorial hero image ..." --name hero-v1
```

## Output layout
- `public/.output/brand/logos/`
- `public/.output/brand/icons/`
- `public/.output/marketing/images/`
- `public/.output/marketing/heroes/`
- `public/.output/marketing/social/`
- `public/.output/_meta/prompts/`
- `public/.output/_meta/manifests/`
