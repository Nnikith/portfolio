# scripts/

All scripts are bash, safe-by-default, and intended to be called via `make`.

- `start.sh` — start docker compose stack
- `stop.sh` — stop docker compose stack
- `reset.sh` — **destructive** wipe local DB volume and restart
- `smoke.sh` — quick smoke checks (CI-friendly)
- `doctor.sh` — diagnostics (read-only)
- `commit.sh` — commit helper (optional)
- `lib.sh` — shared helpers
