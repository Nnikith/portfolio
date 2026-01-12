# Architecture

## App structure (Next.js App Router)

- `src/app/` is the App Router root.
  - `layout.tsx` defines shared layout (html/body, fonts, nav if present).
  - `page.tsx` is the homepage route (`/`).
- UI is built with Tailwind and TypeScript.

## Repo structure

The repo uses a lightweight “ops layer”:

- `Makefile` is the primary interface (what you type).
- `scripts/` contains the real implementations (bash).
- `docs/` captures decisions and run/operate guidance.

This keeps commands stable while letting scripts evolve without Makefile churn.

## Process model (dev server)

- `make up` runs `next dev` in the background and writes `.devserver.pid`.
- `make down` stops the process id from that pid file.
- Logs go to `/tmp/next-dev.log` (simple and local-only).

## Deployment model (planned)

- Vercel will build via `npm run build` and deploy the Next.js app.
- Domain will be added later (documented in [`operations.md`](operations.md)).
