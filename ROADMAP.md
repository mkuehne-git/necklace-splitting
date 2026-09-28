# Roadmap

What remains after the modernization (`MODERNIZATION.md`, phases 0 to 8, v0.4.14 to v0.12.x). Items are ordered by priority within each section; the project owner decides what is done and when.

## Waiting for the owner

1. **German wording.** The owner revised the German info page (`src/i18n/info/info.de.html`, v1.0.1 to v1.0.2) and renamed "Bereich eines Diebs" to "Ungeteilte Oktanten" (v1.0.3). The German settings texts (`src/i18n/de.ts`) have not been reviewed as a whole yet; terms that were uncertain: "Oktanten-Abstand", "Anzeige" (the gauge). Ask the owner which passages are wrong rather than guessing; the style is the informal "du", as in Climate Helix.
2. **OrbitControls or TrackballControls** (decision 4 in `MODERNIZATION.md`). Climate Helix switched to trackball controls for free rotation. With OrbitControls the sphere cannot be turned over its poles, but the up direction stays stable, which suits the raycast gauge. Open; the app keeps OrbitControls until decided.
3. **The Borsuk-Ulam shape's mesh artifacts** (decision 5). The shape moves each vertex of the sphere to g(x), which does not preserve the mesh (see the note in the README). A proper shape would need its own geometry. Out of scope unless wanted as a feature.

## Maintenance

- **Node.js 26** becomes the Active LTS in October 2026: update `.nvmrc`, the CI workflow and, if needed, `engines` together (see "Node.js version" in `CLAUDE.md`).
- **Dependabot pull requests** need a version bump and a changelog entry before they are merged (every commit is a version).
- **Strict TypeScript.** `strict` is off in `tsconfig.json`; turning it on reports 25 errors (v0.12.1), 13 of them in `src/sphere/Sphere.ts` (fields set in `initializeCanvas`, not the constructor), the others in `NecklaceModel.ts`, `ScreenCapture.ts`, `Stats.ts`, `NecklaceComponent.ts`, `ThemesSwitcher.ts` and `Imprint.ts`. Worth doing in one patch, file by file, with the type check as the test.

## Code

- **The split calculation exists twice**: in the model (`NecklaceModel.ts`, tested) and in the shader (`functions.glsl`, drawn). A change to one must be made in the other. A test could compare them, for example by rendering a few known points and reading the pixels.
- **Unused shader code**: the octant number (`displace_octant` in `sphere.vert`) is computed but not used, and octant `000` gets the number 1. `isOnSphere` ignores its `oct` parameter. Remove or use it.
- **Unused images**: `docs/images/necklace-line-segments.png` and `docs/images/favicon.png` are not referenced; keep or delete them.
- **End-to-end tests in CI**: they run locally only (`npm run test:e2e`). Running them in GitHub Actions would need the Playwright browsers there and a stub imprint (the imprint tests skip themselves then).
