# Modernization Plan

> **Done:** phases 0 to 8 were carried out from v0.4.14 to v1.0.0 (2026-09-27). The notes marked *Done*, *Decided* or *Changed* below record where the work deviated from the plan; what remains is in `ROADMAP.md`.

This plan carries the overhaul of Climate Helix (`~/dev/climate-helix`, v0.7 → v2.1.0 between 2026-09-16 and 2026-09-27, 81 commits) over to Necklace Splitting. Climate Helix grew out of this project (same `SVGToggleButton`, `ThemesSwitcher`, `ScreenCapture`, `Imprint`, `ClassMutationObserver`, lil-gui settings, `deploy.sh`), so most of its newer modules can be ported rather than rewritten.

Work through the phases in order. Each step is one commit with a version bump and a changelog entry; the owner approves every commit. The early phases build a safety net (current dependencies, type checking, tests, CI) before the refactors and features that depend on it.

## Starting point (v0.4.13, last touched 2025-05)

- ~2,300 lines: `main.ts`, `Settings.ts` (lil-gui, 8 folders), `Sphere.ts` (Three.js, OrbitControls, GLSL shaders via `vite-plugin-glsl`), `Necklace.ts` (2D canvas), `NecklaceModel.ts` (the logic), UI helpers. Everything flat in `src/`, one `style.css` plus `lil-gui.css`.
- Outdated: Vite 6.3 (current 8.3), three 0.170 (0.186), `@vitejs/plugin-basic-ssl` 1 (2), `@types/node` 20. No `.nvmrc`, no `engines`.
- No `tsconfig.json`, no type check, no tests, no CI, no Dependabot, no `CLAUDE.md`, no skills.
- `Imprint.ts` loads `./imprint-gen` with `/* @vite-ignore */` - the exact bug Climate Helix fixed in 4d51c83 / 36f3a16 (works in dev, chunk missing on GitHub Pages).
- Render loop runs `requestAnimationFrame` continuously (battery drain), `html2canvas` is bundled up front, rebuilt sphere geometry is probably not disposed (check `CREATE_SPHERE`).
- `CHANGELOG.md` headings are `## v0.4.13` without date or commit; `BUILD.md` repeats `deploy.sh`; README images live in `src/images/`.
- Duplicate entries in `dependencies` and `devDependencies` (`crypto-js`, `html2canvas`, `@fontsource/dejavu-sans`); `@types/stats` possibly unused.

## Phase 0: Project instructions and conventions (patch)

1. `CLAUDE.md` modeled on Climate Helix: overview, commands, Node version, versioning, "ask before commit", source layout, conventions, deployment, change validation. Keep it current with every later phase.
2. Node: `.nvmrc` with `24`, `engines.node` `>=22.12.0`, the "Node.js version" note (revisit with Node 26 LTS in October 2026).
3. Versioning rule: every commit is a version (`z` fixes/refactors/tests/docs, `y` features, `x` owner only). Commit messages `type: summary (vX.Y.Z)`.
4. Changelog format `## vX.Y.Z · YYYY-MM-DD · [hash](commit URL)`; backfill dates and hashes of old entries from the commits that set each version in `package.json`. Write entries for users; "No functional change." for internal versions.
5. `gotchas.md` with the dynamic-import lesson; fold `BUILD.md` into `CLAUDE.md`/README and remove it.
6. `.claude/skills/release/` adapted from Climate Helix (version, changelog, validation, working tree check, approval).

## Phase 1: Dependencies (patch, one commit per risky upgrade)

1. Tidy `package.json`: runtime deps only `three`, `crypto-js`, `html2canvas`, `@fontsource/dejavu-sans`; the rest dev. Drop unused `@types/stats` if confirmed.
2. three 0.170 → 0.186: import controls and lil-gui from `three/addons/...` instead of `three/examples/jsm/...`; check shader/material and color-management changes on the sphere visually.
3. Vite 6 → 8, `@vitejs/plugin-basic-ssl` 2, `vite-plugin-pwa` 1.3. **Risk:** `vite-plugin-glsl` 1.6 declares a peer on `esbuild >= 0.25`, which Vite 8 (Rolldown) no longer brings along. Either add `esbuild` as a dev dependency or replace the plugin with `?raw` imports plus a small `#include` resolver - decide after a trial build.
4. Scripts as in Climate Helix: `dev` (`vite --host`, HTTPS), `dev:http` (`VITE_HTTPS=false`), replace `expose`.
5. Fix the imprint import: static/analyzable import (as in Climate Helix `src/imprint/Imprint.ts`), verify the chunk in `dist/assets/` and on the `/necklace-splitting/` base path.

## Phase 2: Type checking (patch)

`tsconfig.json` copied from Climate Helix (`noEmit`, `moduleResolution: bundler`, `strict: false` to start), `typecheck` script, `glsl.d.ts`/`vite-env.d.ts` included. Fix the errors it finds; tightening `strict` later is optional.

## Phase 3: Tests (patch per phase, `TESTING.md` tracks them)

1. **Vitest, pure logic.** `NecklaceModel` is the core and fully testable: configuration by number and by string, segment lengths from a point (x², y², z²), thief assignment by sign, the linear-time solution finder (a real bug was fixed here in 9ca5be0 - add a regression test), octant numbering. Extract pure math out of `Sphere.ts`/`Necklace.ts` where it hides.
2. **happy-dom components:** `SVGToggleButton`, `Imprint` (with the private module mocked), later the settings controls and persistence.
3. **Playwright e2e** (Chromium and Firefox) against `vite preview`: app loads without console errors, settings change the view, theme switch, imprint opens/closes with X and Escape. A `VITE_E2E` build with fewer sphere segments keeps WebGL in headless browsers fast; rebuild normally afterwards so `deploy.sh` never ships the test build.

## Phase 4: CI and Dependabot (patch)

- `.github/workflows/ci.yml` from Climate Helix: Node 24, `npm ci`, stub `src/imprint-gen.js` (matching this project's export), typecheck, test, build. No deploy.
- `.github/dependabot.yml`: npm (groups: runtime, build-tooling incl. `vite-plugin-glsl`, test-tooling) and github-actions, weekly.

## Phase 5: Structure (patch, no functional change)

- Group `src/` by area: `sphere/` (Sphere, shaders), `necklace/` (Necklace, NecklaceModel, NecklaceComponent), `settings/`, `ui/` (buttons, ScreenCapture, ThemesSwitcher, Resizer, ClassMutationObserver), `imprint/`, `icons/`, `css/`. README images to `docs/images/`.
- Split `style.css` per area, imported from `main.ts` (Vite resolves `@import`s only for CSS imported from code).
- Split `Settings.ts` into values/defaults, sections and the settings state (as `settingsValues.ts`, `settingsSections.ts`, `Settings.ts`); keep `main.ts` a thin setup.
  *Decided 2026-09-27:* only the values moved (`settingsValues.ts`, v0.4.27); the rest of `Settings.ts` is lil-gui panel code that step 4 of phase 7 replaces, and `main.ts` is already thin.

## Phase 6: Performance and battery (patch)

- Render on demand (`#needsRender` as in `HelixScene.ts`): draw on control changes, pointer moves (the raycast gauge), settings/theme changes and while the rotation animation runs; stop otherwise.
- Free old geometry/material on sphere rebuilds (`disposeMesh`).
  *Found 2026-09-27:* `Sphere.ts` already frees both; v0.4.34 adds end-to-end tests that would catch a leak.
- Load `html2canvas` on first use (screen capture, imprint).

## Phase 7: Features (minor versions)

Ported from Climate Helix in this order; each is a self-contained step.

1. **PWA update flow** (`src/ui/PwaUpdate.ts`): prompt instead of silent `autoUpdate`, status toast, "Check for updates".
2. **Overlay page** (`OverlayPage.ts`) for the imprint: X at a fixed position, Escape closes. Accessible names for icon buttons.
3. **Remembered settings** (`PersistentState.ts`, key `necklace-splitting.state`, validated fields, debounced writes) and **Restore defaults**. Worth it here: the necklace configuration, showcase and view options are lost on every reload today.
4. **Native settings panel** replacing lil-gui (`SettingsPanel.ts`, `settingsControls.ts`, `settings.css`), footer with Imprint, Check for updates, Restore defaults, changelog. Fixes the `h` shortcut, which today keeps its own visible/hidden flag and gets out of step with the gear button.
   *Changed in v0.12.0:* the owner removed the showcases other than the necklace, and with them the showcase control.
   *Done in v0.8.0:* the texts are in a message catalog from the start (`src/i18n/en.ts`), for step 7; the footer has no changelog link until step 5. Needs control types Climate Helix lacks: number/text inputs for the configuration number and string, a select or segmented control for the four showcases.
5. **Changelog view and What's new** (`src/changelog/`), needs the Phase 0 changelog format and `changelogCommit` in `vite.config.ts`.
6. **Info panel** (optional, new here): the README's explanation of the mapping, the solution band, octants and the Borsuk-Ulam view, in the app behind an info button.
   *Done in v0.10.0* as a full page (like the changelog) behind an info button in the top-right row, since the text is longer than Climate Helix's.
7. **Localization English/German** (optional, `src/i18n/` with catalogs and `t()`): needs step 4 first, since lil-gui labels are hard to translate.
   *Done in v0.11.0*, with the informal "du" as in Climate Helix; the owner reviewed the German wording in v1.0.1 to v1.0.5.

## Phase 8: Documentation (patch, then a major version if the owner wants one)

- README revised for the new UI; screenshots scripted with Playwright (`npm run screenshots`, `screenshots` skill) into `docs/images/`.
- `ROADMAP.md` for what remains; `CLAUDE.md` validation section updated to the tests that now exist.

## Lessons from Climate Helix to apply throughout

- Keep dynamic imports analyzable; never `@vite-ignore` a module that must ship to GitHub Pages.
- Service-worker caching can serve stale content fetched at runtime; prefer static imports or `?raw` for bundled text.
- Firefox renders differently at times - test there, not only in Chromium.
- Hover tooltips stick on touch devices; check on a phone.
- Canvas text (html2canvas, labels) needs fonts force-loaded before drawing.
- Node versions go out of support quietly (npm crashed on Node 23); keep `.nvmrc`, CI and `engines` in step.
- The e2e build must not be left in `dist/` before a deploy.

## Decisions for the owner

Decided 2026-09-27: the owner accepted the plan with its recommendations - copy the Climate Helix modules (1) and replace lil-gui after Phase 6 (2). Also decided 2026-09-27: yes to the info panel and to German (3), so the native settings panel is built with translatable texts. Item 4 was decided 2026-09-28: OrbitControls stay, see `ROADMAP.md`. Item 5 is open.

1. **Share code or copy it?** The common UI modules could live in a shared package, but for two small apps copying the Climate Helix versions and letting them diverge is simpler. Recommendation: copy.
2. **Replace lil-gui?** It is the largest step (8 folders, ~40 controls) and the prerequisite for localization. Recommendation: yes, after Phase 6.
3. **German localization and an in-app info panel** - wanted?
4. **OrbitControls or TrackballControls?** Climate Helix switched for free rotation; for a sphere with a raycast gauge, OrbitControls may stay the better fit. Decided: they stay.
5. **The Borsuk-Ulam shape's mesh artifacts** (README note) are out of scope here unless wanted as a later feature.
