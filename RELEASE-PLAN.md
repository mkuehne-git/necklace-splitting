# Feature Release Plan (2.x)

The plan for the next feature release on GitHub, from v2.0.7: the three features in `ROADMAP.md`. It is not a major version: no full code review, no `x` increase.

Work through the phases in order. Each step is one commit with a version bump and a changelog entry (`release` skill). A step that adds a feature increases `y`; tests, docs and fixes along the way increase `z`. The project owner approves each phase before it starts, as with `MODERNIZATION.md`. Once a step is done, its item leaves `ROADMAP.md` and `CLAUDE.md` describes how it works.

## Decisions (2026-10-01)

- **Discrete for the necklace view only.** The new switch applies to what the necklace shows: how jewels are split, where the handles snap, the shares in the fairness meter and the fair split. The sphere (shader, solution band, solutions, Borsuk-Ulam shape) keeps the existing Discrete. With different values, the sphere's colors at the marker can disagree with the necklace's shares. That is accepted, and the explanations say so.
- **The dice rolls a configuration** for the current number of jewels. It defines the necklace by number, replacing a necklace given by text. It shows only in *Cut the necklace* and starts a new game.

## Phase 1: Layout (minor)

> **Done** in v2.1.0: rows 28 px apart, the meter's space 12 px below the handles, the canvas `calc(20% + 16px)`, so the meter keeps its old space and fills 95% of it.

Done first, because the dice needs the room it makes.

1. **Sphere 10% higher.** Shift the projection with `camera.setViewOffset` in `Resizer.ts` (by 10% of the height), not by moving the camera or the orbit's target. The camera stored in the persistent state stays valid, and the raycast and `showCut` keep working, since both go through the camera's projection. Check the necklace mode's `turnCamera` and the capture.
2. **Fairness meter 5% smaller and further from the necklace.** In `Necklace.ts`: radius × 0.95 in `drawGauge`, and its top `y0` (now `50 + OVERHANG`) lower, so that the gap to the necklace's rows grows.
3. **Taller necklace.** `Y_GAP_BETWEEN_THIEVES` 20 → about 28, so the two rows (thief A, thief B) stand further apart. `ROWS_HEIGHT`, `HANDLES_HEIGHT` and the handle grips follow it. The canvas grows from 20% to about 23% of the height (`necklace.css`), and the fair split message (`bottom: calc(20% + 16px)`) moves up with it.
4. Validate on a phone-sized window in both orientations: the meter must not shrink below its `radius >= 10` limit, and the switcher with its wrapped morph slider must not collide with the sphere. Then run the e2e tests (handle positions in `e2e/necklace.spec.ts` may depend on the row heights) and retake the screenshots.

The exact values (28 px, 23%) are starting points; the owner judges them in the browser.

## Phase 2: Discrete for the necklace (minor)

1. **Setting.** `SETTINGS.necklace.discrete_necklace` (name open), default `false`, remembered (`SETTING_FIELDS`). The existing `necklace.discrete` keeps its key and default (`true`), so stored settings stay valid. It now means the sphere.
2. **Model.** `NecklaceModel.applyCut` (the shares of the current cut, behind the gauge and the fair split) uses the necklace's switch. `shares(p, discrete)` keeps its parameter. `octantGeometry.ts` passes the sphere's switch explicitly for the shape, and `Sphere.ts` keeps `u_necklace_discrete` and the geometry key on the sphere's switch. `UPDATE_SPHERE_MATERIAL` re-applying the cut stays, so a change to either switch updates the shares.
3. **Necklace view.** `Necklace.ts`: the jewel split in `drawNecklace`, `snap` in `startCutting` and dragging, and the sliders' `step` follow the necklace's switch.
4. **Settings panel.** The Necklace section gets two rows, e.g. "Discrete necklace" and "Discrete sphere" (wording open, both catalogs), each with its ⓘ explanation. The info pages (`info.html`, `info.de.html`) name both as "Necklace › …". `e2e/info.spec.ts` and `e2e/german.spec.ts` check them.
5. **Tests.** Unit: model shares follow the necklace switch, `shares(p, d)` the argument, and stored settings load both. Update `test/NecklaceModel.test.ts` where it sets `necklace.discrete`. e2e: handles snap only with the necklace's switch, and `e2e/necklace.spec.ts:167` sets the new key. `e2e/split.spec.ts` passes `discrete` explicitly and stays as it is.
6. German wording for the owner's review.

## Phase 3: Roll the dice (minor)

1. **Button.** A DOM button with a dice icon (`src/icons/`), left of the fairness meter, in the necklace's container. It is a real button (focusable, `aria-label` in both catalogs), not drawn on the canvas, and it follows the gauge's position and size from `drawGauge`. It is visible only while `cutsFromNecklace()` holds and the gauge shows, and disabled with 0 jewels.
2. **Roll.** A random configuration in `1 … maxConfiguration() - 1` (both thieves' colors present), different from the current one. Set `necklace.configuration`, `persistentState.update({ necklaceSource: 'number' })`, dispatch `SET_NECKLACE_CONFIGURATION_BY_NUMBER`, and have the settings panel's controls `update()` (number field, text field). Put the pure part (random configuration, given a random source) in its own function, so it can be unit tested.
3. **New game.** `resetSolutionHints()`, the handles back to their starting cut (1/3, 2/3, default thieves) and the fair split state cleared. The model keeps the cut across necklace changes today, so the dice resets it explicitly.
4. **Animation.** The icon tumbles for about half a second (CSS keyframes) while the new necklace appears. Skip it with `prefers-reduced-motion`. The roll does not wait for the animation.
5. **Tests.** Unit: the random configuration (range, not all one color, never the current one). e2e: the button shows only in the game, a roll changes the necklace and the configuration in the settings, the hints are hidden again, a reload keeps the rolled necklace, and it is reachable by keyboard. Then retake the screenshots.

## Phase 4: Release (patch)

1. `CLAUDE.md` and `README.md` (with screenshots) up to date, `TESTING.md` lists the new tests, and `ROADMAP.md` keeps only Node 26 and anything decided to wait.
2. A closing changelog entry for users, like v2.0.0's, summing up the release.
3. Only when asked: `npm ci`, `npm run imprint`, `deploy.sh`, and the GitHub release (`gh release create vX.Y.0`) with that summary as its notes. Check CI after the push.
