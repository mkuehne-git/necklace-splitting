# Gotchas

## GitHub Pages Dynamic Imports

A local dynamic import with `@vite-ignore` can work in Vite development but fail after deployment. Vite cannot discover and emit the module chunk, and GitHub Pages cannot resolve the runtime-relative path under `/necklace-splitting/`. Climate Helix hit this with its imprint; `src/Imprint.ts` here has the same pattern until it is fixed (`MODERNIZATION.md`, phase 1).

Keep local dynamic imports analyzable by Vite and inspect `dist/assets/` after a production build to confirm the expected chunk was emitted.
