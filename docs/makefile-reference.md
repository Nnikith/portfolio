# Makefile reference

- `make up` — start local stack (app + postgres)
- `make down` — stop local stack
- `make reset` — **destructive**: wipe db volume and start fresh
- `make smoke` — quick smoke checks
- `make doctor` — diagnostics (read-only)
- `make prisma-migrate` — run Prisma migrations
- `make prisma-studio` — open Prisma Studio
- `make logs` — tail compose logs
- `make psql` — open psql shell
