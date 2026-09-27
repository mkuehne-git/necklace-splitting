![Necklace Splitting: the sphere with the cut at a solution](./docs/images/necklace.png)

# Necklace Splitting

An explorable visualization of the [necklace splitting problem](https://en.wikipedia.org/wiki/Necklace_splitting_problem) and its connection to the [Borsuk-Ulam theorem](https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem), in English and German.

**[Open the app](https://mkuehne-git.github.io/necklace-splitting/)** - it runs in the browser and can be installed as an app (PWA) on phones and computers.

After watching the [3Blue1Brown](https://www.youtube.com/@3blue1brown) video [The Borsuk-Ulam theorem and stolen necklaces](https://youtu.be/yuVqxCSsE7c) a couple of times, I wondered how the mapping of the necklace splitting onto a sphere would actually look.

## The sphere

Two thieves want to share a necklace with jewels of two kinds fairly, each getting half of each kind. Each point (x, y, z) on the sphere is a pair of cuts: they split the necklace into up to three pieces of the lengths x², y² and z². The sign of each coordinate gives its piece to thief A (+) or thief B (−).

Point at the sphere: the white marker shows the point, the necklace below shows its cuts, and the gauge how much of each kind of jewel each thief gets.

The colors show how much thief A gets of each kind: red for the first kind, green for the second. Bright yellow, a mix of both, means thief A gets most of both kinds.

## Solving the necklace splitting problem

A split is fair when both thieves get equally long pieces of the necklace. The orange band around the sphere marks these points, whatever the jewels (*Necklace › Solution band*); every solution lies on it.

Given the first cut, the second one follows, so the solutions of a necklace can be found in linear time by going through its jewels. They are marked in blue (*Necklace › Solutions*). In the picture at the top, the pointer rests on one of them: the gauge shows exactly half of each kind for each thief.

![The solutions, with the Necklace settings](./docs/images/necklace-with-solution.png)

The necklace is set by a number, whose binary digits are the jewels (lowest digit first), or by a text, whose characters' binary digits are the jewels.

## Octants

The signs of (x, y, z) divide the sphere into eight octants, numbered by the signs as binary digits. Opposite octants swap the thieves. The octants 000 and 111 give everything to one thief; *View › Single thief's area* hides them.

The octants 010 and 101 show the most variety: whenever two cuts are needed, the solutions lie there. *View › Octant offset* pulls the octants apart.

![The octants pulled apart, the single thief's area hidden](./docs/images/necklace-octants.png)

## Why a solution always exists

From [6:19](https://youtu.be/yuVqxCSsE7c?t=379) on, the video explains why the Borsuk-Ulam theorem is true. Let f(x) map the sphere continuously to the plane - here, the shares of thief A. It is enough to show that g(x) = f(x) − f(−x) has a zero: x and −x are opposite points.

Along a circle around the sphere, g(x) forms a closed loop around the origin, because g is continuous and g(−x) = −g(x). Moving the circle towards a pole shrinks the loop continuously to a single point, so on the way the loop must cross the origin.

*View › Borsuk-Ulam shape* shows the 3D shape formed by g(x) as the circle moves.

> **Note:** this is a rough first view. Each point of the sphere's mesh is simply moved to g(x), which does not preserve the mesh, so it can show rendering artifacts.

## Using the app

<img src="./docs/images/necklace-phone.png" alt="The app on a phone" width="195"> <img src="./docs/images/necklace-phone-settings.png" alt="The settings on a phone" width="195">

- **Settings** (gear button, or `h`): the necklace, what the view shows, the sphere's colors, a rotation animation and screen captures. The app remembers them; *Restore defaults* goes back to the original ones.
- **About this app** (info button): the explanation above, in the app.
- **Language**: the app follows the browser's language (English or German); *Language* at the bottom of the settings chooses one.
- **Changelog**: the version number in the lower right corner shows what changed; after an update, the app shows once what is new.
- The light and dark theme button follows the system until you choose one.

### Keyboard

| Key | Action |
| --- | --- |
| `h` | Open or close the settings |
| `Alt` + `S` | Save a screen capture (what *Screen capture* in the settings chooses) |
| `Esc` | Close the imprint, the changelog or the explanation; otherwise the settings |
| `Tab`, `Enter`, `Space` | Reach and use every button and control |

# Getting started

## Local installation

Install [Node.js](https://nodejs.org/) 24 (`nvm use` picks it from `.nvmrc`), download this repository and run

```bash
npm ci
npm run imprint
npm run dev
```

`npm run imprint` creates `src/imprint-gen.js`, which the build needs; without an `imprint.config.json` the app simply shows no imprint.

Open [https://localhost:5173](https://localhost:5173); the port may differ. The development server is also reachable from other devices in your network, for example a phone, at the network address it prints. It uses a self-signed certificate, so the browser asks you to accept it first. If that does not work, use `npm run dev:http` and open [http://127.0.0.1:5173](http://127.0.0.1:5173) instead (over plain HTTP, only `localhost` has the offline and update features).

## Development

```bash
npm run typecheck   # TypeScript types (the build does not check them)
npm test            # unit and component tests (Vitest)
npm run test:e2e    # end-to-end tests in Chromium and Firefox (Playwright); run `npm run build` afterwards
npm run screenshots # retake the README screenshots in docs/images/
```

`CLAUDE.md` describes the source layout and conventions, `TESTING.md` the tests, `ROADMAP.md` what is planned. Every change to `main` is checked by GitHub Actions (types, tests, build); Dependabot keeps the dependencies current.

## Build and deploy

```bash
npm ci
npm run imprint
npm run build
```

`deploy.sh` builds the app and force-pushes `dist/` to the `gh-pages` branch, from where GitHub Pages serves it. To deploy your own fork, change the repository in its `git push` line and the base path (`/necklace-splitting/`) in `vite.config.ts` to your repository's name.

# References

## Explaining necklace splitting

- [Sneaky Topology | The Borsuk-Ulam theorem and stolen necklaces](https://youtu.be/yuVqxCSsE7c) - video by 3Blue1Brown
- [Necklace splitting problem](https://en.wikipedia.org/wiki/Necklace_splitting_problem) - Wikipedia
- [Borsuk–Ulam theorem](https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem) - Wikipedia

## Implementation

- *Lewy Blue,* [Discover three.js](https://discoverthreejs.com/)
    - [WebGLProgram](https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram) - built-in uniforms and attributes
- *Patricio Gonzalez Vivo, Jen Lowe,* [The Book of Shaders](https://thebookofshaders.com/)

# Acknowledgments

- [three.js](https://threejs.org/) - WebGL
- [Vite](https://vite.dev/) - frontend tooling
- [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl) - imports and inlines shader chunks within GLSL files
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) - turns the app into a PWA, see `vite.config.ts`
- [@vitejs/plugin-basic-ssl](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl) - a self-signed certificate for the development server
- [html2canvas](https://html2canvas.hertzen.com/) - screen captures and the imprint
- [Vitest](https://vitest.dev/), [happy-dom](https://github.com/capricorn86/happy-dom) and [Playwright](https://playwright.dev/) - tests
- [DejaVu Sans](https://dejavu-fonts.github.io/) via [Fontsource](https://fontsource.org/)
- [FavIcon Generator](https://realfavicongenerator.net/) - the favicons and the related section in `index.html`; the PWA icons were generated with PWABuilder Studio in VS Code.
- The settings panel, overlays, changelog and update handling were ported from [Climate Helix](https://github.com/mkuehne-git/climate-helix), which grew out of this project.

# License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mkuehne-git/necklace-splitting/blob/main/LICENSE) file for details.
