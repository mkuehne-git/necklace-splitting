# Testing

This file describes the automated tests for Necklace Splitting, phase 3 of `MODERNIZATION.md`. Each step is its own commit with a patch version bump (tests are not user-visible). Once a step is done, mark it here and update the "Change Validation" section of `CLAUDE.md`.

## Tooling

| Layer | Tool | Runs |
| --- | --- | --- |
| Unit and component tests | [Vitest](https://vitest.dev/), with [happy-dom](https://github.com/capricorn86/happy-dom) for DOM tests | Locally and in CI (`.github/workflows/ci.yml`) |
| End-to-end tests | [Playwright](https://playwright.dev/) (Chromium and Firefox) against `vite preview` | Locally only |

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
- **Necklace splitting theorem:** every necklace of 8 jewels with an even count of each type has a fair split with two cuts, found by the model at the matching point on the sphere.

Not covered: the solution band, the solution highlighting and the octants are computed only in the shaders (`src/sphere/shaders/`). The model mirrors the shader's split calculation (`calculate_stolen_necklace_*` in `functions.glsl`), so a change to one must be made in the other. The octant number (`displace_octant` in `sphere.vert`) is computed but not used; octant `000` gets the number 1.

## Step 2: Components (done, v0.4.28)

happy-dom tests; html2canvas is mocked, since it needs a real browser. It is loaded with a dynamic import, so the tests wait with `vi.dynamicImportSettled()`. All code loads it through `loadHtml2canvas()`, which starts the import once: when two dynamic imports of a mocked module start at the same time, Vitest gives one of them the real module.

- **`SVGToggleButton`** (`test/SVGToggleButton.test.ts`): one SVG per icon, show and toggle, and the click that is reported only when the pulse animation (`lil-gui.css`) has ended.
- **`Imprint`** (`test/Imprint.test.ts`, `imprint-gen` mocked): the text is rendered as an image with the trailer and Close button, opens once, opens and closes through the application events, closes with Escape - also while the settings panel has the focus (regression for v0.4.25) - and redraws on resize only while open.

## Step 3: End-to-end (done, v0.4.29)

Playwright in Chromium and Firefox (`playwright.config.ts`, `e2e/`). `npm run test:e2e` builds with `VITE_E2E=true` (32 instead of 128 sphere segments, `settingsValues.ts`) and serves it with `vite preview` over HTTP, where browsers allow the service worker. **Run `npm run build` afterwards**, so that `dist/` does not keep the test build.

- **`e2e/app.spec.ts`:** the app loads without console errors; hovering the sphere cuts the necklace and hides the pointer; the theme switcher; the gear button opens and closes the settings; a showcase changes the sphere; a new configuration changes necklace and sphere; the service worker registers.
- **`e2e/render.spec.ts`:** counts WebGL draw calls: the resting view is not drawn again; pointer moves, dragging and theme changes draw it; the rotation animation draws every frame and stops drawing when it stops (v0.4.33).
- **`e2e/memory.spec.ts`:** counts the live WebGL buffers and shader programs: switching showcases (which rebuilds the sphere) and changing the number of jewels (a new shader program) leave as many alive as before. They fail when the `dispose()` calls in `Sphere.ts` are removed.
- **`e2e/capture.spec.ts`:** a capture of the sphere contains the rendered sphere, also after the view has rested (the WebGL canvas keeps its drawing buffer, `ScreenCapture.ts`); html2canvas is loaded on the first capture, not at startup (v0.4.35).
- **`e2e/imprint.spec.ts`:** the imprint shows as an image and closes with its button, and with Escape while the settings keep the focus (v0.4.25). Needs the private `src/imprint-gen.js`; skipped with the stub.

The tests compare canvas screenshots before and after a change (`pixels` in `e2e/app.ts`). The settings panel and the icon buttons lie on top of the sphere, so they are hidden in those screenshots; otherwise opening a folder alone would count as a change.

Not covered: the `h` shortcut. It keeps its own visible/hidden flag, which starts out wrong (the first `h` after loading does nothing) and gets out of step with the gear button. The native settings panel (`MODERNIZATION.md`, phase 7) replaces it.
