# Quickstart

## Prereqs

- Node.js LTS installed
- `npm` (default) or `pnpm` / `yarn`
- Git

## First run

```bash
make doctor
make up
```

Open:

- http://localhost:3000

## Quality checks

Run the same checks you’d expect in CI:

```bash
make smoke
```

## Stop

```bash
make down
```

## Full reset (destructive)

```bash
make reset
```

This removes `node_modules/` and `.next/` and reinstalls dependencies.
