# Roadmap

What remains after the modernization (`MODERNIZATION.md`, phases 0 to 8, v0.4.14 to v0.12.x). Items are ordered by priority within each section; the project owner decides what is done and when.

## Waiting for the owner

1. **The Borsuk-Ulam shape with Discrete.** Since v1.2.0 the shape is the octants' geometry, and it follows *Discrete*. A discrete g is piecewise constant: triangles within one value collapse to vertical lines, and what shows are the walls across the jumps, which depend on the mesh. The owner decides after looking at it whether the shape keeps following *Discrete* or always uses the continuous split.

## Maintenance

- **Node.js 26** becomes the Active LTS in October 2026: update `.nvmrc`, the CI workflow and, if needed, `engines` together (see "Node.js version" in `CLAUDE.md`).
- **Dependabot pull requests** need a version bump and a changelog entry before they are merged (every commit is a version).
- **Strict TypeScript.** `strict` is off in `tsconfig.json`; turning it on reports 25 errors (v0.12.1), 13 of them in `src/sphere/Sphere.ts` (fields set in `initializeCanvas`, not the constructor), the others in `NecklaceModel.ts`, `ScreenCapture.ts`, `Stats.ts`, `NecklaceComponent.ts`, `ThemesSwitcher.ts` and `Imprint.ts`. Worth doing in one patch, file by file, with the type check as the test.

## Code

- **The split calculation exists twice**: in the model (`NecklaceModel.ts`, tested) and in the shader (`functions.glsl`, drawn). A change to one must be made in the other. A test could compare them, for example by rendering a few known points and reading the pixels.
- **End-to-end tests in CI**: they run locally only (`npm run test:e2e`). Running them in GitHub Actions would need the Playwright browsers there and a stub imprint (the imprint tests skip themselves then).
