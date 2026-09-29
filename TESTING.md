# Testing

This file describes the automated tests for Necklace Splitting. They were set up in phase 3 of `MODERNIZATION.md` (the steps below) and have grown with every feature since; the version in brackets says when a test came. Keep this file current when adding tests, and the "Change Validation" section of `CLAUDE.md` when the way to run them changes.

## Tooling

| Layer | Tool | Runs |
| --- | --- | --- |
| Unit and component tests | [Vitest](https://vitest.dev/), with [happy-dom](https://github.com/capricorn86/happy-dom) for DOM tests | Locally and in CI (`.github/workflows/ci.yml`) |
| End-to-end tests | [Playwright](https://playwright.dev/) (Chromium and Firefox) against `vite preview` | Locally and in CI (a job of its own, with a stub imprint; Firefox in a window on the virtual display of `xvfb-run`, as headless Firefox finds no OpenGL there) |

Vitest reuses `vite.config.ts`, so the GLSL plugin, TypeScript and asset handling work in tests the same way as in the app. It runs the files in `test/` (`test.include`); the end-to-end tests live in `e2e/`. Vitest 5 needs Node 22.12+, 24 or 26+.

```sh
npm test            # Vitest, single run
npm run test:watch  # Vitest in watch mode
npm run test:e2e    # Playwright against a production build (vite preview)
```

`src/imprint-gen.js` is private and gitignored. Tests that load `Imprint.ts` mock it, but Vite still has to resolve the import: without the file run `npm run imprint` first, which writes a stub when `imprint.config.json` is missing; CI writes the same stub directly.

## Step 1: Pure logic (done, v0.4.27)

`test/NecklaceModel.test.ts`. The model listens for its configuration events on `window`, so the file runs in happy-dom; it configures the model through those events, as the settings panel does. To load the model without lil-gui, the values and defaults moved from `Settings.ts` into `src/settings/settingsValues.ts` (the split phase 5 planned anyway).

- **Configuration by number:** the lowest bit is the first jewel (regression for v0.3.1, fixed in 9ca5be0), leading zeros fill up to the number of jewels, counts per type.
- **Configuration by string:** the binary digits of each character, one after the other.
- **Cuts, discrete:** a point (x, y, z) splits the necklace into segments of length x², y², z² (scaled to the necklace), assigned to thief A by a positive sign; a jewel belongs to the segment it starts in.
- **Cuts, continuous:** a jewel at a cut is split by fraction, also when both cuts fall into the same jewel; every jewel is assigned completely.
- **Symmetry:** the antipodal point swaps the thieves (random points, discrete and continuous).
- **Shares** (v1.2.0): `shares(p)`, the f of the Borsuk-Ulam shape, gives thief A's canonical shares as `applyCut` would, without applying the cut.
- **Necklace splitting theorem:** every necklace of 8 jewels with an even count of each type has a fair split with two cuts, found by the model at the matching point on the sphere. The test reconfigures one model: every model listens on `window`, so one per necklace would add up.
- **Text necklaces** (v1.7.2): `necklaceFromText` takes only the whole characters that fit into `MAX_NECKLACE_JEWELS`.
- **A changed necklace or Discrete** (v1.7.5): the model keeps its cut and gives the shares for the new necklace, and for Discrete as it is now.

`test/handles.test.ts` (v1.5.0): the necklace's handles and the point of the sphere map to each other and back, a part of length 0 keeps its thief, crossed or out-of-range handles are clamped, snapping to the gaps between jewels, and the part at a position.

`test/solutionHints.test.ts` (v1.6.0): the game hides the solution band and the solutions without changing the settings, shows them for one game on request, and the Borsuk-Ulam scene follows the settings.

`test/octantGeometry.test.ts` (v1.2.0, v1.4.0): each octant's geometry lies in its octant; its `cut` attribute holds the points of the unit sphere; with the Borsuk-Ulam shape, the geometry gets it as its morph target, each point at (g(x), z) · radius, the sphere unchanged, and the bounding sphere (which the raycaster culls by) contains both.

The solution band and the solution highlighting are computed only in the shaders (`src/sphere/shaders/`); end-to-end tests check that they show (`e2e/app.spec.ts`, `e2e/necklace.spec.ts`). The model mirrors the shader's split calculation (`calculate_stolen_necklace_*` in `functions.glsl`), so a change to one must be made in the other; `e2e/split.spec.ts` (step 3) compares them.

## Step 2: Components (done, v0.4.28)

happy-dom tests; html2canvas is mocked, since it needs a real browser. It is loaded with a dynamic import, so the tests wait with `vi.dynamicImportSettled()`. All code loads it through `loadHtml2canvas()`, which starts the import once: when two dynamic imports of a mocked module start at the same time, Vitest gives one of them the real module.

- **`SVGToggleButton`** (`test/SVGToggleButton.test.ts`): one SVG per icon, show, toggle and select, the click that is reported only when the pulse animation (`toggle-buttons.css`) has ended, the button role with the name of the icon shown, and Enter and Space (v0.6.0).
- **`settingsControls`** (`test/settingsControls.test.ts`, ported from Climate Helix): sections, labelled checkboxes and sliders, segmented buttons with the pressed one marked and the stacked layout, the number field (whole numbers, clamped to limits read again on update, an empty field ignored) and the text field (v0.8.0); explanations behind an ⓘ button, a call-out below the row, one open at a time (v1.7.0).
- **Changelog** (`test/changelogFormat.test.ts`, `test/Changelog.test.ts`, `test/WhatsNew.test.ts`, ported from Climate Helix): `CHANGELOG.md` itself - every heading parses, the newest entry is the version in `package.json`, versions are newest first, every entry but v0.1.0 and v0.2.0 has a date and every older one its commit; parsing, rendering (bullets, nesting, emphasis, code, links, escaping); the changelog view opens and closes; What's new shows the functional news since the last seen version once, the news since v0.4.13 to visitors from before What's new (stored settings or a service worker controlling the page), and nothing to new visitors (v0.9.0).
- **`i18n`** (`test/i18n.test.ts`): German has exactly the English keys with the same parameters and no empty text; `t` follows the language; the chosen language wins over the browser's, then the browser's first known one, then English; German numbers use a decimal comma; the English and German info pages have the same structure. `test/setup.ts` pins English for all other tests (v0.11.0).
- **`PersistentState`** (`test/PersistentState.test.ts`): broken, foreign or out-of-range stored values are dropped, Lighting only as one of its choices (v1.3.0); settings round-trip, a configuration too large for the jewels is clamped; writes are grouped and flushed; Restore defaults stops saving; no storage or failing storage still works for the visit (v0.7.0).
- **`PwaUpdate`** (`test/PwaUpdate.test.ts`, `virtual:pwa-register` mocked): the update dialog appears only when a new version is waiting, Reload updates and Later closes it; Check for updates reports a waiting update, no update, no registration and no service worker support (v0.5.0), and says so when the check fails, e.g. offline (v1.7.9).
- **`Imprint`** (`test/Imprint.test.ts`, `imprint-gen` mocked, ported from Climate Helix): the X is there before rendering finishes and stays when it fails, closes on the click itself, Escape closes - also while the settings panel has the focus (regression for v0.4.25) - other keys do not, the application events open and close it, and a burst of resize events redraws once, only while open.

## Step 3: End-to-end (done, v0.4.29)

Playwright in Chromium and Firefox (`playwright.config.ts`, `e2e/`). `npm run test:e2e` builds with `VITE_E2E=true` (32 instead of 128 sphere segments, `settingsValues.ts`) and serves it with `vite preview` over HTTP, where browsers allow the service worker. **Run `npm run build` afterwards**, so that `dist/` does not keep the test build.

- **`e2e/app.spec.ts`:** the app loads without console errors; hovering the sphere cuts the necklace and hides the pointer, and hovering the Borsuk-Ulam shape marks the point (v1.2.0, v1.4.0); the pointer over the settings panel does not move the cut on the sphere behind it (v1.7.3); the Borsuk-Ulam button morphs the sphere, hides the necklace and is remembered, another scene restores the sphere at once, the slider moves between sphere and shape, and the player buttons play the morph either way, pause it and go on (v1.4.0, v1.6.0); a text too long for the necklace is cut short and the sphere is still drawn (v1.7.2); the solution band shows for a necklace of one kind of jewel (v1.7.4); an ⓘ button explains a setting (v1.7.0); Lighting shades the sphere (v1.3.0); the mesh shows on the light theme (v1.2.0); the theme switcher; the gear button opens and closes the settings; a new configuration changes necklace and sphere; the service worker registers; Check for updates reports that there is none (v0.5.0); the icon buttons have names and work with the keyboard (v0.6.0); `h` opens and closes the settings (also the first time) but not while typing, Escape closes them; fewer jewels clamp the configuration; the footer's order; the panel fits a phone without scrolling sideways (v0.8.0); controls the browser draws follow the app theme on a system with the other theme (v0.8.1). The update itself is not tested end to end: it needs two builds of different versions.
- **`e2e/render.spec.ts`:** counts WebGL draw calls and the frames they are drawn in: the resting view is not drawn again; pointer moves, dragging and theme changes draw it; the rotation animation draws every frame and stops drawing when it stops (v0.4.33); the morph draws while it runs and rests afterwards (v1.4.0). At rest, one frame per second is allowed (v1.7.13): a real event may come in late and rightly draw once, while a view drawn every frame draws dozens.
- **`e2e/necklace.spec.ts`** (v1.5.0): the game. The necklace mode starts with handles at a third and two thirds and is remembered; dragging a handle moves the cut on the necklace and the sphere, and one dragged past the other takes its place; tapping a part gives it to the other thief; the keyboard moves the handles and gives parts away; a fair split is announced; the pointer on the sphere sets no cut; the scenes are exclusive and cutting the necklace leaves the Borsuk-Ulam shape at once (v1.6.0); the game hides the solutions for itself without changing the settings (v1.6.0).
- **`e2e/split.spec.ts`** (v1.2.4): the model and the shader split the same necklaces (8, 10 and 32 jewels, one kind of jewel only, a text) alike at 200 random points each, discrete and continuous. The model runs in the test process (Node, with `window` and `document.body` as bare event targets); `calculate_stolen_necklace_*` from `functions.glsl` runs in a small WebGL2 program of its own, one pixel per point, with the whole jewels and the fraction of each count in their own color channels. Discrete points close to a jewel boundary are left out, where float precision on the GPU may decide differently. The tests fail when a line of either split is changed.
- **`e2e/memory.spec.ts`:** counts the live WebGL buffers and shader programs: rebuilding the sphere (Segments) and changing the number of jewels (a new shader program) leave as many alive as before, and Spread octants, which only moves the octants' meshes, creates none; switching to the Borsuk-Ulam shape and back and changing the necklace in between leave as many alive too. They fail when the `dispose()` calls in `Sphere.ts` are removed.
- **`e2e/capture.spec.ts`:** a capture of the sphere contains the rendered sphere, also after the view has rested (the WebGL canvas keeps its drawing buffer, `ScreenCapture.ts`); html2canvas is loaded on the first capture, not at startup (v0.4.35); a capture of everything leaves out the settings panel (v0.8.0); Alt+S works where it types another character, as "ß" on macOS (v1.7.8); a capture that fails says so (v1.7.9).
- **`e2e/persistence.spec.ts`:** Solution band, jewels, Discrete and the theme survive a reload; a necklace entered as text is rebuilt from the text; Restore defaults asks, then brings back the defaults and removes the stored state, and keeps everything when not confirmed, and keeps only the last seen version (v0.7.0, v0.8.0, v0.9.0).
- **`e2e/changelog.spec.ts`, `e2e/whats-new.spec.ts`:** the version label and the settings footer open the changelog, the X (on top, desktop and phone) and Escape close it, older entries link their commit; What's new shows the news since the last used version once, the news since v0.4.13 to earlier users, leads to the full changelog, and stays closed for new visitors (v0.9.0).
- **`e2e/info.spec.ts`:** the info button opens the explanation with its sections (desktop and phone), the X and Escape close it, it works while the settings are open, and every setting the text names ("Section › Label") exists in the panel (v0.10.0).
- **`e2e/german.spec.ts`:** a browser set to German gets German buttons, panel, numbers and info page, whose named settings exist under their German labels; the changelog says its entries are English; Language switches to English and back to automatic across reloads (v0.11.0). `playwright.config.ts` pins `en-US` for the other tests.
- **`e2e/imprint.spec.ts`:** the imprint shows as an image and closes with its X, which is on top at desktop and phone width and stays in view while the imprint scrolls, and with Escape, which leaves the settings panel below open (v0.8.0). Needs the private `src/imprint-gen.js`; skipped with the stub.

The settings helpers in `e2e/app.ts` (`openSettings`, `openSection`, `field` by label, `panelButton` by name) find the controls the way a screen reader does. The tests compare canvas screenshots before and after a change (`pixels`). The settings panel and the icon buttons lie on top of the sphere, so they are hidden in those screenshots; otherwise opening a folder alone would count as a change.

## Timing in CI

GitHub's runners are much slower than a desktop and draw WebGL in software, so a test that races an animation or waits a fixed time may pass locally and fail there. Since v1.7.11:

- Tests that act on a running animation (the morph player) stop the page's clock and move it by hand (`stopClock`, `page.clock.runFor`): `page.clock.install()` alone keeps the time running. A stopped clock plays every frame, and each one is drawn: these tests are marked `test.slow()`.
- Tests that expect the view to rest first wait until it has stopped drawing (`settled` in `render.spec.ts`), rather than a fixed time.
- To find such races locally, slow Chromium's CPU down for a run (CDP `Emulation.setCPUThrottlingRate`, rate 6).
- A failed CI run uploads the traces of the failed tests: `gh run download <id>`, then `npx playwright show-trace` or the steps' times in `test.trace` show which step took the time.

After a push, check the CI run (`gh run list --workflow ci.yml`). `gotchas.md` has the details.

The `h` shortcut of the lil-gui panel kept its own visible/hidden flag, which started out wrong (the first `h` after loading did nothing); the native panel (v0.8.0) fixed it, and `e2e/app.spec.ts` tests the first press.
