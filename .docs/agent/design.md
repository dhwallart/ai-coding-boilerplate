# Design Practices

## Goal
Provide a repeatable workflow for visual direction and AI-generated assets.

## Inputs
- Product context from `.docs/project/specialization.md`
- Brand brief from `.docs/project/brand.md`

## Generation rules
- Generate only into `public/.output/`.
- Keep logical folders by asset type (logo, hero, social, icon).
- Keep prompt and manifest files for each generated image.

## Prompt quality
- Mention style, composition, mood, color direction, and use case.
- Keep prompts deterministic where possible.
- Iterate with versioned names (`logo-v1`, `logo-v2`).

## Handoff
- Designer delivers short rationale + selected file paths.
- Frontend Developer integrates selected files into UI.
