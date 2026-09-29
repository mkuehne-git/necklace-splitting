# Gotchas

## GitHub Pages Dynamic Imports

A local dynamic import with `@vite-ignore` can work in Vite development but fail after deployment. Vite cannot discover and emit the module chunk, and GitHub Pages cannot resolve the runtime-relative path under `/necklace-splitting/`. Both Climate Helix and this app hit this with the imprint; `src/imprint/Imprint.ts` now imports `../imprint-gen` without `@vite-ignore`.

Keep local dynamic imports analyzable by Vite and inspect `dist/assets/` after a production build to confirm the expected chunk was emitted.

## The imprint stub and the type check

CI type-checks against a stub `src/imprint-gen.js` (`() => undefined`), not the private one (`() => string`). With `allowJs`, TypeScript infers the module's type from whichever file is there, so a type check that passes locally can fail in CI (v1.2.2 did). `Imprint.ts` types the module itself (`ImprintModule`), which both fit. After changing `Imprint.ts`, check with the stub too: copy the private file aside, write the stub, `npm run typecheck`, and copy it back.

## Firefox without a GPU

On GitHub's runners Firefox could not create a WebGL context at all ("tryNativeGL () Exhausted GL driver options", in the console of the trace): the sphere is never created and every Firefox test fails at its first look at the canvas (v1.2.5). Firefox draws WebGL through the system's OpenGL; the runner has no GPU, and headless Firefox finds no driver there. Chromium brings its own (SwiftShader). Neither `webgl.force-enabled` (v1.2.6) nor installing Mesa (v1.2.7) was enough on its own. What works (v1.2.8): on CI, Firefox runs with a window (`headless: !process.env.CI` in `playwright.config.ts`) on the virtual display of `xvfb-run` (`ci.yml`), where it gets Mesa's software renderer. The Mesa step (`libegl1`, `libgl1-mesa-dri`) and the preference stay as part of that setup; whether each is still needed was not tested. Locally, with a GPU and its drivers, the problem does not show, not even with `LIBGL_ALWAYS_SOFTWARE=1`. The browser console of a failed test is in its trace: download the `playwright-test-results` artifact of the run.
