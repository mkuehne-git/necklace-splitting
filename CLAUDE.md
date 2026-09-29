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
npm run screenshots # retake the README screenshots in docs/images/ (dark theme)
```

### Node.js version

The project uses the current Active LTS release of Node.js: Node 24 (24.21.0 locally as of September 2026). Climate Helix ran on the out-of-support Node 23 until npm crashed while installing Vitest; keep the version current here too.

- `.nvmrc` selects Node 24 for `nvm use`; `engines` in `package.json` states the minimum (22.12, which Vite 8 and Vitest need).
- The CI workflow's `node-version` (`.github/workflows/ci.yml`) must match `.nvmrc`.
- When adding or upgrading a dev dependency, check its `engines` field against that version.
- Revisit this when a newer LTS starts (Node 26 in October 2026) and when the used one reaches end of life: update `.nvmrc`, the workflow and, if needed, `engines` together. `@types/node` stays on the used major version: `.github/dependabot.yml` ignores its major updates, so lift or move that rule with the switch.

The development server uses HTTPS with a local self-signed certificate. If the browser cannot trust that certificate, use `npm run dev:http` and open `http://127.0.0.1:5173/` instead. Over plain HTTP, only `localhost` and `127.0.0.1` have service workers (and with them the PWA update check); the network address does not.

`tsconfig.json` is for type checking only (`noEmit`, `strict` on since v1.2.2); Vite builds without checking types. Fields a component sets in `initializeCanvas` (called from its constructor through `domElement`) are declared with `!`. Unit tests live in `test/` and run with `npm test`; end-to-end tests live in `e2e/` and run with `npm run test:e2e` (after UI changes; it leaves a test build in `dist/`, so run `npm run build` afterwards). `TESTING.md` describes them. There is no lint script. After visible UI changes, retake the README screenshots with the `screenshots` skill (`.claude/skills/screenshots/`).

## Versioning

The app follows semantic versioning (`x.y.z`). Fixes, refactors, tests and docs increase `z`; new features increase `y`. Increases to `x` are decided by the project owner.

Every commit is a version, including test-, docs- and refactor-only commits: update the version in `package.json` (and `package-lock.json`, with `npm version X.Y.Z --no-git-tag-version`) and add an entry to `CHANGELOG.md` before creating a commit.

Changelog entries are headed `## vX.Y.Z · YYYY-MM-DD`. The app shows the changelog to its users (the changelog view and What's new), so write it for them. When the next version is added, the previous entry (the version committed at `HEAD`) gets its short hash as a link: `## vX.Y.Z · YYYY-MM-DD · [abc1234](https://github.com/mkuehne-git/necklace-splitting/commit/abc1234)`, from `git rev-parse --short=7 HEAD`. A commit cannot contain its own hash, so the newest entry stays without one. v0.1.0 and v0.2.0 predate the repository and have neither date nor hash; v0.2.4's changes are listed under v0.3.0. Write entries for users of the app: what changed and why it matters, with fixed bugs named by their symptom. Say "No functional change." for test, docs and refactor-only versions.

The `release` skill (`.claude/skills/release/`) covers the full routine: version, changelog, validation, working tree check and commit.

## Git Workflow

The project owner approves commits per phase of `MODERNIZATION.md`: within a phase the owner has approved, commit each step as it is done; at the end of a phase, stop and ask before starting the next one. Outside that plan, ask before every commit. Do not push or deploy unless asked.

Commit messages are `type: summary (vX.Y.Z)` with `type` one of `feat`, `fix`, `test`, `docs`, `refactor`, `chore`, followed by a body that explains what changed and why. Stage files by name, never `src/imprint-gen.js` or `dist/`.

## Source Layout

`src/` is grouped by area: `sphere/` (the 3D view and its shaders), `necklace/` (the model and the necklace view), `settings/` (the values, their persistence and the settings panel), `ui/` (buttons, theme, screen capture), `changelog/`, `info/`, `imprint/`, `i18n/`, plus `icons/`, `css/` and `mjs/`. `main.ts` and `Enums.ts` stay at the top. The private `src/imprint-gen.js` stays at the top of `src/` too: CI and `npm run imprint` expect it there. The README images are in `docs/images/`, not in `src/`.

- `src/main.ts` sets up the app: settings, theme switcher, model, sphere, necklace, screen capture and the version label.
- `src/necklace/NecklaceModel.ts` is the logic: the necklace configuration (from a number, lowest bit first, or from the bits of a string's characters), and the segment lengths and thief assignment for a cut. The shaders (`src/sphere/shaders/functions.glsl`) compute the same split for every point of the sphere; change both together. `shares(p)` gives thief A's shares without applying the cut, for the Borsuk-Ulam shape.
- `src/sphere/Sphere.ts` is the 3D view: renderer, camera, `OrbitControls`, the sphere as eight octant meshes (faces and wireframe sharing one geometry; Spread octants moves them, Undivided octants hides two, so the shaders know nothing of octants and no triangle spans two of them) with their GLSL shaders (`src/sphere/shaders/`, loaded through `vite-plugin-glsl`), the solution band, the raycast that picks the cut under the pointer (it interpolates the hit triangle's `cut` attribute), and the render loop. `octantGeometry.ts` builds an octant's geometry: the attribute `cut` holds the point of the unit sphere each vertex stands for, which the shaders color by; with the Borsuk-Ulam shape, the positions are (g(x), z) · radius, computed on the CPU with `NecklaceModel.shares`, so faces, wireframe and raycast all see the shape. The geometry is rebuilt by Radius and Segments, and with the shape also when the necklace or Discrete changes (`updateGeometry`). The shape follows Discrete (decided 2026-09-29): a discrete g is piecewise constant, so what shows are the walls across its jumps, and they stay. `OrbitControls` stay (decided 2026-09-28, instead of the `TrackballControls` Climate Helix uses): they reach every point of the sphere and keep the vertical axis vertical, so the axes and octants stay where the explanation puts them; trackball controls let the view tip over, and their momentum needs an update every frame, against drawing only on change. The loop draws only when something changed (`#needsRender`: camera, pointer, size, theme, sphere, material or visibility) and every frame while the rotation animation runs: set the flag when adding anything else that changes the picture. The pointer is hit-tested before drawing. `Resizer.ts` fits renderer and camera to the window; `Stats.ts` is the optional FPS monitor.
- `src/necklace/Necklace.ts` draws the necklace and the current cut on a 2D canvas. `src/necklace/NecklaceComponent.ts` is the base class of both views (container, canvas, model, theme observer).
- `src/settings/settingsValues.ts` holds `SETTINGS` with its defaults, the ranges of the numeric settings (`LIMITS`, used by the controls and to validate stored values), `EPS` and `MAX_JEWELS`; import them from there. `src/settings/Settings.ts` applies the remembered settings and builds the settings panel: `SettingsPanel.ts` is the native side panel (full screen on phones) with a scrolling body and a fixed footer, `settingsSections.ts` fills it (Necklace, View, Animation, Screen capture, a collapsed Advanced with the sphere's mesh and colors; the footer with Imprint, Check for updates and Restore defaults), from the controls in `settingsControls.ts` (section, checkbox, range, number field, text field, segmented buttons, button; each control's `update()` shows a value that changed elsewhere). Each control writes `SETTINGS`, dispatches the event the views listen for and saves the settings. `SettingsButton.ts` is the gear button; `h` and Escape open and close the panel too. The styles are in `src/css/settings.css`. `src/settings/PersistentState.ts` keeps the settings (those listed in `SETTING_FIELDS`, with the ranges of their controls), which input defined the necklace last, the theme and the camera across reloads in one Local Storage entry (`necklace-splitting.state`). `Settings.ts` applies them before building the panel, the controls save on every change; "Restore defaults" asks, clears the entry and reloads. A new setting that should be remembered goes into `SETTING_FIELDS`.
- `src/Enums.ts` holds the `Events` used between modules.
- `src/ui/` holds `SVGToggleButton.ts` (the icon buttons; give each one `labels`, its names for screen readers, and they work with Enter and Space), `OverlayPage.ts` (the full-page overlay of the imprint: an X fixed at the settings button's position, Escape closes it - only it, not the settings panel below -, listening in the capture phase since a focused control may stop key events), `ThemesSwitcher.ts`, `ScreenCapture.ts` and `ClassMutationObserver.ts`, and `loadHtml2canvas.ts`, which loads html2canvas on first use for the capture and the imprint (keep it out of static imports: it is about 200 kB). `ScreenCapture.ts` also makes WebGL keep its drawing buffer, so that a capture contains the sphere; that must run before the renderer is created, so the module stays a static import of `main.ts`. `src/imprint/Imprint.ts` shows the imprint. `src/ui/PwaUpdate.ts` registers the service worker (`virtual:pwa-register`), asks before reloading into a new version, and backs "Check for updates" in the settings; its status messages and dialog are styled in `src/css/pwa.css`.
- `src/changelog/Changelog.ts` shows `CHANGELOG.md` when the version label (lower right) or the version in the settings' footer is clicked; `changelogFormat.ts` parses and renders it. The file is loaded on demand (`CHANGELOG.md?raw`), and the build adds the newest entry's commit hash (`changelogCommit` in `vite.config.ts`). `src/changelog/WhatsNew.ts` shows the entries since the version used last, once per version (`lastSeenVersion` in the persistent state, kept by Restore defaults); entries marked "No functional change." are left out. Someone who used the app before What's new existed - recognized by stored settings or by a service worker already controlling the page - gets the news since v0.4.13, the version deployed before the modernization.
- `src/i18n/index.ts` chooses the language at startup: the one chosen under Language in the settings (stored as `language`), or else the browser's first language the app has, or else English. Changing it stores the choice and reloads the app.
- `src/info/Info.ts` is the info button (left of the theme button) and the explanation it opens as a full page: the README's explanation of the mapping, the solutions, the octants and the Borsuk-Ulam view, in `src/i18n/info/info.html`. It names settings as "Section › Label"; `e2e/info.spec.ts` checks that each exists, so rename them in both places.
- `src/icons/` holds the SVG icons as TypeScript modules.
- `src/css/` holds the styles, one file per area: `base.css` (theme variables for light and dark, `color-scheme` following the app's theme rather than the system's, the page, the version label), `necklace.css`, `overlays.css` (the overlay pages: imprint, changelog, info), `pwa.css` (the update dialog and status messages), `toggle-buttons.css` (imported by `SVGToggleButton.ts`) and `settings.css` (imported by `Settings.ts`). `style.css` imports the first four in cascade order and is imported first thing in `main.ts`, not linked from `index.html`: Vite resolves the `@import`s only for CSS imported from code.
- `src/mjs/create-imprint.mjs` (`npm run imprint`) encrypts the imprint text from `imprint.config.json` into `src/imprint-gen.js`. That file is private and gitignored; never stage it. `src/imprint/Imprint.ts` imports it so that Vite bundles it as its own chunk, which means the build fails without it: run `npm run imprint` once after cloning (without `imprint.config.json` it writes a stub, and the app shows no imprint).
- `vite.config.ts` configures the production base path, HTTPS development support (off with `VITE_HTTPS=false`), the GLSL plugin, PWA generation (`registerType: 'prompt'`) and `APP_VERSION`.

## Roadmap

What remains after the modernization, and the decisions still open, is in `ROADMAP.md`; `MODERNIZATION.md` records how the app got here.

## Implementation Conventions

- Follow the existing TypeScript style and keep changes focused on the owning module.
- Use the existing `Events` mechanism for communication between settings, theme changes, the model and the views.
- Reuse the existing Three.js and PWA dependencies and the settings controls in `src/settings/settingsControls.ts` rather than adding parallel abstractions.
- User-visible text goes into both message catalogs, `src/i18n/en.ts` (English, the source) and `src/i18n/de.ts` (German), and is shown with `t(key)`; numbers with `formatNumber` (`src/i18n/index.ts`). The type of `de` and `test/i18n.test.ts` fail when a German key or parameter is missing. The info page exists per language (`src/i18n/info/info.html`, `info.de.html`); change both, and keep the settings it names ("Section › Label") in step with the panel - `e2e/info.spec.ts` and `e2e/german.spec.ts` check them. The changelog stays English. German uses the informal "du", as in Climate Helix. Ask the project owner to review new German wording.
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

1. Run `npm run typecheck`, `npm test` and `npm run build`. After changes to the UI, `main.ts`, the settings, the sphere or necklace views, CSS, the service worker or `vite.config.ts`, also run `npm run test:e2e` (Chromium and Firefox), then `npm run build` again so that `dist/` does not keep the test build. The `release` skill lists the steps.
2. For text changes, update both languages (`src/i18n/en.ts`, `de.ts`, and both info pages); the i18n tests catch missing keys, not wording.
3. After visible changes, retake the README screenshots (`screenshots` skill) if they show the changed part.
4. Run `npm run dev` and look at the change in a real browser: light and dark theme, a phone-sized window, and Firefox as well as Chromium. The automated tests render WebGL in software and cannot judge how the sphere looks.
5. Check the browser console, and for build-related changes that the service worker still registers.
