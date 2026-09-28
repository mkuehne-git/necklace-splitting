# Roadmap

What remains after the modernization (`MODERNIZATION.md`, phases 0 to 8, v0.4.14 to v0.12.x). Items are ordered by priority within each section; the project owner decides what is done and when.

## Waiting for the owner

1. **The Borsuk-Ulam shape's mesh artifacts** (decision 5). The shape moves each vertex of the sphere to g(x), which does not preserve the mesh (see the note in the README). A proper shape would need its own geometry. Out of scope unless wanted as a feature.

## Decided

- **OrbitControls stay** (decision 4 in `MODERNIZATION.md`, decided 2026-09-28). Climate Helix switched to TrackballControls because a helix gains from turning freely about every axis. A sphere does not: OrbitControls reach every point of it (straight down onto both poles), and the Rotate animation turns it about all three axes. OrbitControls keep the vertical axis vertical, so the axes and octants the explanation names stay where the viewer expects them. TrackballControls would let the view roll and tip over, and their momentum needs an update every frame, which works against drawing only on change (`#needsRender` in `Sphere.ts`). The pointer's hit test works the same with both.

## Maintenance

- **Node.js 26** becomes the Active LTS in October 2026: update `.nvmrc`, the CI workflow and, if needed, `engines` together (see "Node.js version" in `CLAUDE.md`).
- **Dependabot pull requests** need a version bump and a changelog entry before they are merged (every commit is a version).
- **Strict TypeScript.** `strict` is off in `tsconfig.json`; turning it on reports 25 errors (v0.12.1), 13 of them in `src/sphere/Sphere.ts` (fields set in `initializeCanvas`, not the constructor), the others in `NecklaceModel.ts`, `ScreenCapture.ts`, `Stats.ts`, `NecklaceComponent.ts`, `ThemesSwitcher.ts` and `Imprint.ts`. Worth doing in one patch, file by file, with the type check as the test.

## Code

- **The split calculation exists twice**: in the model (`NecklaceModel.ts`, tested) and in the shader (`functions.glsl`, drawn). A change to one must be made in the other. A test could compare them, for example by rendering a few known points and reading the pixels.
- **Unused shader code**: the octant number (`displace_octant` in `sphere.vert`) is computed but not used, and octant `000` gets the number 1. `isOnSphere` ignores its `oct` parameter. Remove or use it.
- **Unused images**: `docs/images/necklace-line-segments.png` and `docs/images/favicon.png` are not referenced; keep or delete them.
- **End-to-end tests in CI**: they run locally only (`npm run test:e2e`). Running them in GitHub Actions would need the Playwright browsers there and a stub imprint (the imprint tests skip themselves then).
