# bitOrbit

bitOrbit is an offline-first engineering learning encyclopedia built with React, TypeScript, Vite, TailwindCSS, React Router, Framer Motion, Lucide Icons, and Fuse.js.

It is intentionally not an LMS, portfolio, or coding platform. The framework organizes private engineering notes into learning paths, modules, chapters, bookmarks, search, and progress while keeping content local to the project.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content

Chapter metadata is defined in `src/data/learningPaths.ts`. Markdown bodies are loaded from `src/content`.

Example path:

```text
src/content/python/core-language/execution-model.md
```

No generated learning content is included. Add your own markdown notes to turn the framework into your personal encyclopedia.
