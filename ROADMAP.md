# Roadmap

What is still open after 2.0. Items are ordered by priority within each section; the project owner decides what is done and when. What is done is in `CHANGELOG.md`, how it works in `CLAUDE.md`.

## Maintenance

- **Node.js 26** becomes the Active LTS in October 2026: update `.nvmrc`, the CI workflow and, if needed, `engines` together (see "Node.js version" in `CLAUDE.md`), and lift the `@types/node` ignore rule in `.github/dependabot.yml`.

## Features

Planned for the next feature release, in `RELEASE-PLAN.md`:

- The necklace shall have its own discrete configuration switch, which should default to `false` (continuous).
- A new challenge (new necklace to cut), shall be available through a "roll the dice" (ideally animated) button, which could be placed left to the fairness meter.
