# Roadmap

What remains after the modernization (`MODERNIZATION.md`, phases 0 to 8, v0.4.14 to v0.12.x). Items are ordered by priority within each section; the project owner decides what is done and when.

## Maintenance

- **Node.js 26** becomes the Active LTS in October 2026: update `.nvmrc`, the CI workflow and, if needed, `engines` together (see "Node.js version" in `CLAUDE.md`), and lift the `@types/node` ignore rule in `.github/dependabot.yml`.
- **Dependabot pull requests** need a version bump and a changelog entry before they are merged (every commit is a version).

## Features

Planned in this order (decided 2026-09-29): lighting (v1.3.0), the view switcher with the morph (v1.4.0), cuts on the necklace (v1.5.0). Lighting makes the morph worth watching; the switcher is needed by both later features; the handles are the largest piece.

### The view switcher

Buttons at the lower left of the sphere area, just above the necklace (the necklace canvas spans the full width of the bottom 20%, so the corner itself would cover its left end). Modeled on Climate Helix's `SceneSwitcher` (`~/dev/climate-helix/src/ui/SceneSwitcher.ts`, `scenes.css`): icon buttons with a tooltip and an accessible name, the active one highlighted, the state remembered in the persistent state. Two independent choices:

- **Input mode**, two exclusive buttons: *Sphere* (the pointer on the sphere sets the cuts, as now) and *Necklace* (handles on the necklace set the cuts, feature 3). They come with feature 3.
- **Borsuk-Ulam shape**, a toggle button (feature 2). It replaces the checkbox View › Borsuk-Ulam shape, which is removed from the settings panel; a stored `sphere.show_borsuk_ulam_proof_shape` carries over to the toggle. While it is on, the view is about the sphere morphing into the shape of g: the necklace and the gauge are hidden, the input-mode buttons stay in place but are disabled, and the pointer on the shape still moves the marker. Turning it off restores the previous mode, the necklace and the gauge. The info pages name the button instead of the setting (`e2e/info.spec.ts`, `e2e/german.spec.ts`).

### 1. Lighting

The Borsuk-Ulam shape shows little detail without the wireframe; shading makes its facets and walls visible.

- Shading in the existing shader, no Three.js light objects: a flat normal per fragment from screen-space derivatives (`normalize(cross(dFdx(p), dFdy(p)))`, flipped with `gl_FrontFacing`), and a headlight along the camera's view direction. The shape's vertex normals stay deleted: averaged normals would smear across the walls of the discrete shape, and derivative normals keep working while the shape morphs.
- The colors carry meaning, so the light only dims them gently (about `0.6 + 0.4 · max(dot(n, l), 0)`); the pointer marker and the solution band stay unlit. The wireframe is unaffected.
- Setting View › Lighting: Off / Shape / Always (segmented buttons), default Shape: the shape is lit, the sphere stays as it is today unless Always is chosen. No intensity control. Remembered in `SETTING_FIELDS`; both languages.

### 2. Morph between sphere and Borsuk-Ulam shape

Comes with the view switcher and its Borsuk-Ulam toggle.

- Sphere and shape share each octant's mesh, vertex for vertex, so the shape becomes a Three.js morph target: `geometry.morphAttributes.position = [shape positions]`, `mesh.morphTargetInfluences[0] = t`. The wireframe's `MeshBasicMaterial` morphs by itself; `sphere.vert` gets Three's morph chunks. The raycast respects morph targets, so the cut under the pointer stays right mid-morph; bounding volumes must include the target.
- The shape's positions are computed when first needed and rebuilt, as now, when the necklace or Discrete changes.
- The toggle animates the transition (about 1 s, eased), drawing every frame while it runs (`#needsRender`). A horizontal slider (0 to 1) beside the switcher, shown only while the toggle is on, scrubs the morph by hand; toggle and slider follow each other. Short enough for phones.
- With Lighting on Shape, the light fades in with the morph.

### 3. Cuts on the necklace

Inversion of control, and a little game: in the *Necklace* input mode, two handles on the necklace set the cuts, which propagate to the gauge and the sphere. In the *Sphere* mode the handles are drawn read-only at the current cuts, so switching modes does not jump.

- The handles set the segment lengths only; which thief gets each segment is chosen by tapping or clicking the segment, which moves it to the other row (thief A's jewels are drawn on top, B's below). Handles at a <= b in [0, 1] give the point (sx·√a, sy·√(b-a), sz·√(1-b)); the mapping and its inverse go into `NecklaceModel` as pure, unit-tested functions, applied with `applyCut` (so `NECKLACE_CUT` updates the gauge as now).
- The signs start from the current cut's, else (+,-,+): (+,+,+) is an undivided octant, hidden by default. A zero-length segment keeps its sign.
- Dragging a handle past the other swaps their roles. With Discrete, handles snap to the gaps between jewels; otherwise they move freely.
- Pointer events with `touch-action: none` and hit areas of at least about 24 px (the canvas is 20% of the height): this also gives phones a way to set cuts, which the sphere's `mousemove` does not. Keyboard: handles are focusable, arrow keys move them by a jewel, Enter and Space swap a segment; screen-reader labels via `t()`.
- In the *Necklace* mode the pointer on the sphere only rotates the view and sets no cut. The marker (`u_intersect`) follows `model.cuts` (on `NECKLACE_CUT`) rather than the last raycast hit. In the *Sphere* mode, a cut is applied only after a real `mousemove`, not on every frame drawn.
- Camera: when a handle is released and the point is on the far side, the camera turns around `OrbitControls.target` to show it, animated. The target point includes the octant offset and the group's rotation. While the rotation animation runs, the handles work but the camera does not follow.
- Game: visible feedback when the split is fair (the gauge reaches its target). Challenges (a random necklace, counting moves) are a later, separate feature.
- Tests: unit tests for the mapping; e2e for switching modes, dragging a handle, toggling a segment, and the marker following.
