# Necklace Splitting

## Overview

Necklace Splitting is a Vite-powered TypeScript and Three.js web app that visualizes the [necklace splitting problem](https://en.wikipedia.org/wiki/Necklace_splitting_problem) and its connection to the Borsuk-Ulam theorem: every point (x, y, z) on a sphere is a pair of cuts of a two-colored necklace, with segment lengths (x², y², z²) and the signs choosing the thief. A 2D canvas shows the necklace and the current cut. The app can be installed as a PWA and is deployed to GitHub Pages at `/necklace-splitting/`.

Climate Helix (`~/dev/climate-helix`) grew out of this project and shares several UI modules. `MODERNIZATION.md` is the plan for bringing its later improvements over here; work through it in order and keep this file current as each phase lands.

## Development Commands

Run these commands from the repository root:

```sh
npm install        # install dependencies
npm run imprint    # generate the private src/imprint-gen.js from imprint.config.json
npm run dev        # start the Vite development server (localhost only)
npm run expose     # start Vite on all interfaces over HTTPS, for testing on a phone
npm run build      # create a production build in dist/
npm run serve      # preview the production build
```

There is no type check, no test suite and no lint script yet (see `MODERNIZATION.md`, phases 2 and 3). Vite builds without checking types.

## Versioning

The app follows semantic versioning (`x.y.z`). Fixes, refactors, tests and docs increase `z`; new features increase `y`. Increases to `x` are decided by the project owner.

Every commit is a version: update the version in `package.json` and add an entry to `CHANGELOG.md` before creating a commit.

## Git Workflow

Always ask the project owner for approval before creating a commit. Do not commit changes without explicit approval. Do not push or deploy unless asked.

## Source Layout

All sources are flat in `src/` for now; grouping them by area is phase 5 of `MODERNIZATION.md`. The README images are in `src/images/`.

- `src/main.ts` sets up the app: settings, theme switcher, model, sphere, necklace, screen capture and the version label.
- `src/NecklaceModel.ts` is the logic: the necklace configuration (from a number or a string of `0`/`1`), the segment lengths and thief assignment for a cut, and the linear-time search for solutions.
- `src/Sphere.ts` is the 3D view: renderer, camera, `OrbitControls`, the sphere mesh with its GLSL shaders (`src/shaders/`, loaded through `vite-plugin-glsl`), the solution band, the raycast gauge that picks the cut under the pointer, and the render loop. The loop currently runs `requestAnimationFrame` continuously.
- `src/Necklace.ts` draws the necklace and the current cut on a 2D canvas. `src/NecklaceComponent.ts` is the shared base class (container, canvas, model, theme observer).
- `src/Settings.ts` owns `SETTINGS` and builds the lil-gui panel (Necklace, View with Sphere/Other Controls/Color/Animation, Screen capture, the showcases). Settings are not remembered across reloads. `src/SettingsButton.ts` is the gear button that opens it; `src/css/lil-gui.css` themes it.
- `src/Enums.ts` holds the `Events` used between modules and the `Showcase` identifiers.
- `src/SVGToggleButton.ts`, `src/ThemesSwitcher.ts`, `src/ScreenCapture.ts` (html2canvas), `src/Imprint.ts`, `src/Resizer.ts`, `src/ClassMutationObserver.ts` and `src/Stats.ts` (the optional FPS monitor) implement the surrounding UI.
- `src/icons/` holds the SVG icons as TypeScript modules; `src/css/style.css` the styles, linked from `index.html`.
- `src/mjs/create-imprint.mjs` (`npm run imprint`) encrypts the imprint text from `imprint.config.json` into `src/imprint-gen.js`. That file is private and gitignored; never stage it.
- `vite.config.ts` configures the production base path, HTTPS development support, the GLSL plugin, PWA generation (`registerType: 'autoUpdate'`) and `APP_VERSION`.

## Implementation Conventions

- Follow the existing TypeScript style and keep changes focused on the owning module.
- Use the existing `Events` mechanism for communication between settings, theme changes, the model and the views.
- Reuse the existing Three.js, lil-gui and PWA dependencies rather than adding parallel abstractions.
- Keep static assets in `public/` and import them using the project's existing Vite asset patterns.
- Preserve the PWA base path and offline behavior when modifying `vite.config.ts` or asset URLs.
- Do not edit generated output in `dist/` or `dev-dist/` as a source change; regenerate it with the build when needed.

## Deployment

`deploy.sh` builds the app and force-pushes the contents of `dist/` to the `gh-pages` branch of `mkuehne-git/necklace-splitting`. Review the generated build and remote configuration before running it, and run it only when asked. A production build sets the base path to `/necklace-splitting/`; local development uses `/`. Run `npm run imprint` before building, otherwise the deployed app has no imprint.

Dynamic imports of local modules must remain analyzable by Vite. Do not use `@vite-ignore` for modules that need to be bundled for GitHub Pages, and verify that production builds emit their chunks under the `/necklace-splitting/` base path. `src/Imprint.ts` still breaks this rule; fixing it is phase 1 of `MODERNIZATION.md`.

## Change Validation

At minimum:

1. Run `npm run build`.
2. Run `npm run dev` and open the reported URL.
3. Exercise the affected interaction in both light and dark themes where relevant: the sphere (rotate, hover gauge), the necklace canvas, the settings panel, the showcases, screen capture and the imprint.
4. Check browser console errors and verify that the PWA/service worker still registers for build-related changes.
