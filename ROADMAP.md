# Roadmap

What remains after the modernization (`MODERNIZATION.md`, phases 0 to 8, v0.4.14 to v0.12.x). Items are ordered by priority within each section; the project owner decides what is done and when.

## Maintenance

- **Node.js 26** becomes the Active LTS in October 2026: update `.nvmrc`, the CI workflow and, if needed, `engines` together (see "Node.js version" in `CLAUDE.md`), and lift the `@types/node` ignore rule in `.github/dependabot.yml`.
- **Dependabot pull requests** need a version bump and a changelog entry before they are merged (every commit is a version).
