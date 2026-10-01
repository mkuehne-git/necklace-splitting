# Roadmap

What is still open after 2.0. Items are ordered by priority within each section; the project owner decides what is done and when. What is done is in `CHANGELOG.md`, how it works in `CLAUDE.md`.

## Maintenance

- **Node.js 26** becomes the Active LTS in October 2026: update `.nvmrc`, the CI workflow and, if needed, `engines` together (see "Node.js version" in `CLAUDE.md`), and lift the `@types/node` ignore rule in `.github/dependabot.yml`.

## Features

Planned for the next feature release, in `RELEASE-PLAN.md`:

- The necklace shall have its own discrete configuration switch, which should default to `false` (continuous).
- A new challenge (new necklace to cut), shall be available through a "roll the dice" (ideally animated) button, which could be placed left to the fairness meter.
- The layout looks a bit cramped. I think the sphere can move up a bit (10%), the fairness meter can be made a little smaller (5%), the gap between meter and necklace can be bigger, and the height of the necklace control can be increased a little (so that there is more space between thief A and thief B).
