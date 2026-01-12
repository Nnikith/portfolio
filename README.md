# portfolio-website

Professional portfolio site for a data engineer job hunt.

- **Stack**: Next.js (App Router), TypeScript, Tailwind CSS, ESLint
- **Local dev**: no Docker
- **Deploy**: planned for Vercel (documented in [`docs/operations.md`](docs/operations.md))

## How to run

```bash
make up
# open http://localhost:3000
```

## Common commands

```bash
make help
make smoke
make doctor
make down
make reset
make commit MSG="feat: add projects section"
```

## Docs

- How to run the system: [`quickstart.md`](docs/quickstart.md)
- Repo architecture: [`architecture.md`](docs/architecture.md)
- Decisions: [`decisions.md`](docs/decisions.md)
- Makefile reference: [`makefile-reference.md`](docs/makefile-reference.md)
- Operations / Vercel plan: [`operations.md`](docs/operations.md)
- Observability: [`observability.md`](docs/observability.md)
- Troubleshooting: [`troubleshooting.md`](docs/troubleshooting.md)
- Runbooks: [`runbooks/`](docs/runbooks)

## Repository layout

```text
.
├── Makefile
├── README.md
├── docs/
│   ├── README.md
│   ├── quickstart.md
│   ├── architecture.md
│   ├── decisions.md
│   ├── makefile-reference.md
│   ├── operations.md
│   ├── observability.md
│   ├── troubleshooting.md
│   └── runbooks/
│       └── runbook-release.md
└── scripts/
    ├── README.md
    ├── lib.sh
    ├── start.sh
    ├── stop.sh
    ├── reset.sh
    ├── smoke.sh
    ├── doctor.sh
    └── commit.sh
```

## UI

The homepage lives at `src/app/page.tsx` and is intentionally simple + professional (dark theme) with:

- Hero
- Projects
- Skills
- Experience
- Contact
