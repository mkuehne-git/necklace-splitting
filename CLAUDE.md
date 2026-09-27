# Necklace Splitting

## Overview

Necklace Splitting is a Vite-powered TypeScript and Three.js web app that visualizes the [necklace splitting problem](https://en.wikipedia.org/wiki/Necklace_splitting_problem) and its connection to the Borsuk-Ulam theorem: every point (x, y, z) on a sphere is a pair of cuts of a two-colored necklace, with segment lengths (x², y², z²) and the signs choosing the thief. A 2D canvas shows the necklace and the current cut. The app can be installed as a PWA and is deployed to GitHub Pages at `/necklace-splitting/`.

Climate Helix (`~/dev/climate-helix`) grew out of this project and shares several UI modules. `MODERNIZATION.md` is the plan for bringing its later improvements over here; work through it in order and keep this file current as each phase lands.

## Development Commands

Run these commands from the repository root:

```sh
npm install        # install dependencies
npm run imprint    # generate the private src/imprint-gen.js from imprint.config.json
npm run dev        # start the Vite development server (HTTPS, reachable from the network, e.g. a phone)
npm run dev:http   # the same over HTTP, when the local HTTPS certificate is rejected
npm run build      # create a production build in dist/
npm run serve      # preview the production build
npm run typecheck  # check the TypeScript types (tsc; the build does not)
npm test           # run the unit tests (Vitest)
npm run test:watch # run the unit tests in watch mode
npm run test:e2e   # build and run the Playwright end-to-end tests (Chromium, Firefox)
```

### Node.js version

The project uses the current Active LTS release of Node.js: Node 24 (24.21.0 locally as of September 2026). Climate Helix ran on the out-of-support Node 23 until npm crashed while installing Vitest; keep the version current here too.

- `.nvmrc` selects Node 24 for `nvm use`; `engines` in `package.json` states the minimum (22.12, which Vite 8 and Vitest need).
- The CI workflow's `node-version` (`.github/workflows/ci.yml`) must match `.nvmrc`.
- When adding or upgrading a dev dependency, check its `engines` field against that version.
- Revisit this when a newer LTS starts (Node 26 in October 2026) and when the used one reaches end of life: update `.nvmrc`, the workflow and, if needed, `engines` together.

The development server uses HTTPS with a local self-signed certificate. If the browser cannot trust that certificate, use `npm run dev:http` and open `http://127.0.0.1:5173/` instead.

`tsconfig.json` is for type checking only (`noEmit`, `strict` off); Vite builds without checking types. Unit tests live in `test/` and run with `npm test`; end-to-end tests live in `e2e/` and run with `npm run test:e2e` (after UI changes; it leaves a test build in `dist/`, so run `npm run build` afterwards). `TESTING.md` describes them. There is no lint script.

## Versioning

The app follows semantic versioning (`x.y.z`). Fixes, refactors, tests and docs increase `z`; new features increase `y`. Increases to `x` are decided by the project owner.

Every commit is a version, including test-, docs- and refactor-only commits: update the version in `package.json` (and `package-lock.json`, with `npm version X.Y.Z --no-git-tag-version`) and add an entry to `CHANGELOG.md` before creating a commit.

Changelog entries are headed `## vX.Y.Z · YYYY-MM-DD`. When the next version is added, the previous entry (the version committed at `HEAD`) gets its short hash as a link: `## vX.Y.Z · YYYY-MM-DD · [abc1234](https://github.com/mkuehne-git/necklace-splitting/commit/abc1234)`, from `git rev-parse --short=7 HEAD`. A commit cannot contain its own hash, so the newest entry stays without one. v0.1.0 and v0.2.0 predate the repository and have neither date nor hash; v0.2.4's changes are listed under v0.3.0. Write entries for users of the app: what changed and why it matters, with fixed bugs named by their symptom. Say "No functional change." for test, docs and refactor-only versions.

The `release` skill (`.claude/skills/release/`) covers the full routine: version, changelog, validation, working tree check and commit.

## Git Workflow

The project owner approves commits per phase of `MODERNIZATION.md`: within a phase the owner has approved, commit each step as it is done; at the end of a phase, stop and ask before starting the next one. Outside that plan, ask before every commit. Do not push or deploy unless asked.

Commit messages are `type: summary (vX.Y.Z)` with `type` one of `feat`, `fix`, `test`, `docs`, `refactor`, `chore`, followed by a body that explains what changed and why. Stage files by name, never `src/imprint-gen.js` or `dist/`.

## Source Layout

`src/` is grouped by area: `sphere/` (the 3D view and its shaders), `necklace/` (the model and the necklace view), `settings/` (the values and the lil-gui panel), `ui/` (buttons, theme, screen capture), `imprint/`, plus `icons/`, `css/` and `mjs/`. `main.ts` and `Enums.ts` stay at the top. The private `src/imprint-gen.js` stays at the top of `src/` too: CI and `npm run imprint` expect it there. The README images are in `docs/images/`, not in `src/`.

- `src/main.ts` sets up the app: settings, theme switcher, model, sphere, necklace, screen capture and the version label.
- `src/necklace/NecklaceModel.ts` is the logic: the necklace configuration (from a number, lowest bit first, or from the bits of a string's characters), and the segment lengths and thief assignment for a cut. The shaders (`src/sphere/shaders/functions.glsl`) compute the same split for every point of the sphere; change both together.
- `src/sphere/Sphere.ts` is the 3D view: renderer, camera, `OrbitControls`, the sphere mesh with its GLSL shaders (`src/sphere/shaders/`, loaded through `vite-plugin-glsl`), the solution band, the raycast gauge that picks the cut under the pointer, and the render loop. The loop draws only when something changed (`#needsRender`: camera, pointer, size, theme, sphere, material or visibility) and every frame while the rotation animation runs: set the flag when adding anything else that changes the picture. The pointer is hit-tested before drawing. `Resizer.ts` fits renderer and camera to the window; `Stats.ts` is the optional FPS monitor.
- `src/necklace/Necklace.ts` draws the necklace and the current cut on a 2D canvas. `src/necklace/NecklaceComponent.ts` is the base class of both views (container, canvas, model, theme observer).
- `src/settings/settingsValues.ts` holds `SETTINGS` with its defaults, the showcase names (`MODES`), `EPS` and `MAX_JEWELS`; import them from there, not from `Settings.ts`, which loads lil-gui. `src/settings/Settings.ts` builds the lil-gui panel (the showcases, Necklace, View with Sphere/Other Controls/Color/Animation, Screen capture, Imprint). Settings are not remembered across reloads. `src/settings/SettingsButton.ts` is the gear button that opens it; `src/css/lil-gui.css` themes it.
- `src/Enums.ts` holds the `Events` used between modules and the `Showcase` identifiers.
- `src/ui/` holds `SVGToggleButton.ts` (the icon buttons), `ThemesSwitcher.ts`, `ScreenCapture.ts` (html2canvas) and `ClassMutationObserver.ts`; `src/imprint/Imprint.ts` shows the imprint.
- `src/icons/` holds the SVG icons as TypeScript modules.
- `src/css/` holds the styles, one file per area: `base.css` (theme variables for light and dark, the page, the version label), `necklace.css`, `overlays.css` (the imprint), `toggle-buttons.css` (imported by `SVGToggleButton.ts`) and `lil-gui.css` (imported by `Settings.ts`). `style.css` imports the first three in cascade order and is imported first thing in `main.ts`, not linked from `index.html`: Vite resolves the `@import`s only for CSS imported from code.
- `src/mjs/create-imprint.mjs` (`npm run imprint`) encrypts the imprint text from `imprint.config.json` into `src/imprint-gen.js`. That file is private and gitignored; never stage it. `src/imprint/Imprint.ts` imports it so that Vite bundles it as its own chunk, which means the build fails without it: run `npm run imprint` once after cloning (without `imprint.config.json` it writes a stub, and the app shows no imprint).
- `vite.config.ts` configures the production base path, HTTPS development support (off with `VITE_HTTPS=false`), the GLSL plugin, PWA generation (`registerType: 'autoUpdate'`) and `APP_VERSION`.

## Implementation Conventions

- Follow the existing TypeScript style and keep changes focused on the owning module.
- Use the existing `Events` mechanism for communication between settings, theme changes, the model and the views.
- Reuse the existing Three.js, lil-gui and PWA dependencies rather than adding parallel abstractions.
- Keep static assets in `public/` and import them using the project's existing Vite asset patterns.
- Preserve the PWA base path and offline behavior when modifying `vite.config.ts` or asset URLs.
- Do not edit generated output in `dist/` or `dev-dist/` as a source change; regenerate it with the build when needed.

## Continuous Integration

`.github/workflows/ci.yml` runs on every push to `main` and every pull request: `npm ci`, a stub `src/imprint-gen.js`, `npm run typecheck`, `npm test` and `npm run build`. It does not deploy and does not run the end-to-end tests. Dependabot (`.github/dependabot.yml`) opens weekly pull requests for npm, in groups (runtime, build tooling including `vite-plugin-glsl`, test tooling), and for the GitHub Actions; CI checks each of them. A Dependabot pull request still needs a version bump and changelog entry before it is merged (see Versioning).

## Deployment

`deploy.sh` builds the app and force-pushes the contents of `dist/` to the `gh-pages` branch of `mkuehne-git/necklace-splitting`. Review the generated build and remote configuration before running it, and run it only when asked. A production build sets the base path to `/necklace-splitting/`; local development uses `/`. Before a deployment, build from the locked dependencies (`npm ci`) and run `npm run imprint`, otherwise the deployed app has no imprint. Check afterwards that `package-lock.json` has no uncommitted changes.

Dynamic imports of local modules must remain analyzable by Vite. Do not use `@vite-ignore` for modules that need to be bundled for GitHub Pages, and verify that production builds emit their chunks under the `/necklace-splitting/` base path. `gotchas.md` collects such lessons.

## Change Validation

At minimum:

1. Run `npm run typecheck`, `npm test` and `npm run build`; after UI changes also `npm run test:e2e`, then `npm run build` again.
2. Run `npm run dev` and open the reported URL.
3. Exercise the affected interaction in both light and dark themes where relevant: the sphere (rotate, hover gauge), the necklace canvas, the settings panel, the showcases, screen capture and the imprint.
4. Check browser console errors and verify that the PWA/service worker still registers for build-related changes.
