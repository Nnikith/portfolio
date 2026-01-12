# Makefile reference

All commands are invoked via `make <target>`.

## Targets

### `make help`

Prints available targets and short descriptions.

### `make up` / `make dev`

Starts Next.js dev server in the background.

- PID: `.devserver.pid`
- Logs: `/tmp/next-dev.log`
- URL: http://localhost:3000

### `make down`

Stops the dev server (best-effort).

### `make reset`

**Destructive**. Stops dev server, removes `node_modules/` and `.next/`, reinstalls deps.

### `make smoke`

Non-interactive checks:

- install deps if needed
- lint
- typecheck
- build

### `make doctor`

Read-only diagnostics: node/git presence, expected files, scripts, dev server status.

### `make commit`

Commit helper. Runs `make smoke` first unless `SKIP_SMOKE=1`.

Examples:

```bash
make commit MSG="feat: add skills section"
SKIP_SMOKE=1 make commit MSG="wip: checkpoint"
```
