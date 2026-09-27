# Gotchas

## GitHub Pages Dynamic Imports

A local dynamic import with `@vite-ignore` can work in Vite development but fail after deployment. Vite cannot discover and emit the module chunk, and GitHub Pages cannot resolve the runtime-relative path under `/necklace-splitting/`. Both Climate Helix and this app hit this with the imprint; `src/Imprint.ts` now imports `./imprint-gen` without `@vite-ignore`.

Keep local dynamic imports analyzable by Vite and inspect `dist/assets/` after a production build to confirm the expected chunk was emitted.
