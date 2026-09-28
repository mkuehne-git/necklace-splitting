---
name: screenshots
description: Retake the Necklace Splitting README screenshots in docs/images/ with Playwright (npm run screenshots), review them and update the README if a view was added or renamed. Use after visible UI changes, before a major or minor release, or when asked to update, refresh or retake screenshots.
---

# Screenshots

The README shows five screenshots in `docs/images/`. `npm run screenshots` retakes them all with Playwright (`playwright.screenshots.config.ts`, specs in `screenshots/readme.spec.ts`), always in the dark theme, like the original ones.

| Image | Shows | Viewport |
| --- | --- | --- |
| `necklace.png` | The sphere seen from (1, −1, 1), the pointer on a solution: the gauge shows a fair split | 1366 x 632 |
| `necklace-with-solution.png` | The same, with the settings open at Necklace | 1366 x 632 |
| `necklace-octants.png` | Octants spread 1.6, undivided octants hidden, settings open at View | 1366 x 632 |
| `necklace-phone.png` | The app on a phone, the pointer on a solution | 390 x 844 |
| `necklace-phone-settings.png` | The settings on a phone | 390 x 844 |

`necklace-line-segments.png` and `favicon.png` in `docs/images/` are older images, not taken by the script and not used by the README.

## 1. When

- A visible change to the sphere, the necklace, the gauge or the settings panel that a screenshot shows.
- A version bump that the screenshots should show: the version label is in every image. Retake them **after** updating `package.json`.
- Not for every patch release: an outdated version label alone is no reason.

## 2. Take

1. Update `package.json` first if the version changes in this commit.
2. `npm run screenshots`. It builds a production build (full sphere mesh, unlike the e2e tests' `VITE_E2E` build), serves it on port 4181 and writes the images over the committed ones. `dist/` is left as a normal production build.
3. The camera and settings come from a seeded stored state (`withStoredState` in `e2e/app.ts`); the pointer finds a solution by reading the blue marker's pixels from the sphere's canvas (`pointAtSolution`). If the default necklace changes, check that its solutions are still in view.

## 3. Review

Open every changed image (the Read tool shows images) and check:

- The white marker sits on a blue solution marker in `necklace.png` and `necklace-phone.png`, and the gauge is split exactly in half.
- The sphere is not cropped (the phone uses the default camera distance, 50).
- The version label shows the new version.

`git status` shows which images changed. Revert images that changed only by rendering noise, unless the version label differs.

## 4. Adjust

- **A new view or dialog to show**: add a test to `screenshots/readme.spec.ts`, reference the image in `README.md`, and add it to the table above.
- **A step fails** (a selector changed): fix the spec with the same helpers as the e2e tests in `e2e/app.ts`.

Commit the images with the change, following the `release` skill.
