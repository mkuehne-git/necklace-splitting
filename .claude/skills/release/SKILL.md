---
name: release
description: Prepare a Necklace Splitting version for commit - pick the version bump, update package.json and CHANGELOG.md, validate, check the working tree, then commit (within an approved phase of MODERNIZATION.md) or ask the project owner first. Use whenever work is ready to be committed, or when asked to "release", "bump the version" or "commit".
---

# Release

Every commit in this repository is a release: `CLAUDE.md` requires a version bump and a changelog entry before *every* commit, including test-only and docs-only commits.

## 1. Pick the version

Read the current version from `package.json` and the top entry of `CHANGELOG.md`.

- **Patch (`z`)**: fixes, small improvements, tests, docs, refactors without behavior change.
- **Minor (`y`)**: new user-visible features (a new control, view or option).
- **Major (`x`)**: never on your own - only the project owner decides.

If the previous version was never committed (it is still in the working tree), extend its changelog entry instead of adding a new version.

## 2. Update version and changelog

- Version: `npm version X.Y.Z --no-git-tag-version`. It updates `package.json` and both version fields in `package-lock.json` and nothing else; do not search-and-replace the old version in the lockfile, where dependencies can share it.
- `CHANGELOG.md`: a new `## vX.Y.Z · YYYY-MM-DD` section at the top (today's date), one bullet per change.
- Add the commit to the previous entry, which is the version committed at `HEAD`: `## vA.B.C · YYYY-MM-DD · [abc1234](https://github.com/mkuehne-git/necklace-splitting/commit/abc1234)`, with `git rev-parse --short=7 HEAD`. A commit cannot contain its own hash, so the new entry stays without one.
- Write for users of the app: what changed and why it matters, not which functions moved. Name fixed bugs by their symptom. Say "No functional change." for test, docs and refactor-only versions.

## 3. Validate

Run what exists and report failures with their output - do not commit around them. Extend this list as `TESTING.md` adds the tools (end-to-end tests in its step 3).

1. `npm run typecheck` (tsc; Vite builds without checking types), then `npm test` (Vitest).
2. `npm run build`.
3. For build-related changes (dependencies, `vite.config.ts`, imports): check that `dist/assets/` holds the expected chunks, and for the imprint that `src/imprint-gen.js` was bundled.
4. For visual changes, say what still needs a manual look in a real browser (light and dark theme, phone width, Firefox), as `CLAUDE.md` asks.

## 4. Check the working tree

- `git status --short`: every changed and new file must belong to this change. Watch for leftovers such as scratch files or a stray `package-lock.json` change.
- Never stage `src/imprint-gen.js` (private, gitignored) or `dist/`.
- If a dependency was added: check its `engines` field against the Node version in `.nvmrc` (see "Node.js version" in `CLAUDE.md`), and check that the lockfile only gained the expected packages.

## 5. Commit

Within a phase of `MODERNIZATION.md` the owner has approved, commit right away and continue with the next step; at the end of the phase, summarize its commits and ask before starting the next phase. Outside that plan, summarize what the commit contains and ask the project owner first.

- Stage the files by name (no `git add -A`).
- Message: `type: summary (vX.Y.Z)` with `type` one of `feat`, `fix`, `test`, `docs`, `refactor`, `chore`; then a body explaining what and why; then the co-author trailer from the current session's instructions.
- Do not push, tag or deploy unless asked. `deploy.sh` force-pushes to GitHub Pages.

## 6. GitHub release (major and minor versions only)

A GitHub release is a page on GitHub attached to a git tag, with release notes and source archives. It deploys nothing: the site comes from the `gh-pages` branch that `deploy.sh` pushes. Every commit here is a version, so releases are made only for major and minor versions (`x.0.0`, `x.y.0`), never for patches.

Creating a release is public, so offer it after the commit and ask the project owner each time. Only after an explicit yes, in this order:

1. **Push** `main` (`git push`). The changelog links to commits on GitHub, and those links return 404 until the commits are pushed.
2. **Deploy**, if the owner wants the release to match the live site: `deploy.sh`, as described in `CLAUDE.md` - only when asked.
3. **Release notes**: the version's `CHANGELOG.md` entry without its heading, written to a scratchpad file.
4. **Create** the tag and the release in one step, on the pushed commit:
   `gh release create vX.Y.Z --target main --title "Necklace Splitting X.Y.Z" --notes-file <notes>`
   This creates the tag `vX.Y.Z` on GitHub; run `git fetch --tags` afterwards to have it locally.
5. Report the release URL that `gh` prints.

If `gh` is not installed or not logged in (`gh auth status`), say so and give the owner the command instead of working around it.
