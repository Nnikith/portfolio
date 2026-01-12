# scripts/

Shell scripts are the operational interface behind the `Makefile`.

## Conventions

- All scripts are **bash** and start with `set -Eeuo pipefail`.
- Scripts run from **repo root** (via `lib.sh`).
- Defaults are **safe**:
  - `doctor.sh` is read-only
  - `smoke.sh` is CI-friendly and non-interactive
  - `reset.sh` is destructive and prompts unless `CI=true`

## Scripts

- `lib.sh` — shared helpers (logging, repo root, package manager abstraction, pid file)
- `start.sh` — starts `next dev` in the background and writes `.devserver.pid`
- `stop.sh` — stops the dev server using `.devserver.pid`
- `reset.sh` — stops + deletes `.next/` and `node_modules/` then reinstalls deps
- `smoke.sh` — install (if needed) + lint + typecheck + build
- `doctor.sh` — environment diagnostics
- `commit.sh` — run smoke + stage + commit (message from args/MSG/timestamp)

## Package manager selection

By default scripts use `npm`. Override with:

```bash
make up PM=pnpm
make smoke PM=yarn
```

## Logs

`start.sh` writes Next.js logs to:

- `/tmp/next-dev.log`
