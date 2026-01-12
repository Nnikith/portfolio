# Troubleshooting

## `make up` starts but site doesn't load

- Check the log: `/tmp/next-dev.log`
- Verify port 3000 is free:
  - macOS/Linux: `lsof -i :3000`
  - Windows: `netstat -ano | findstr :3000`

If something else is using it, stop that process or configure Next.js to use another port.

## `make down` says no pid file

If you started Next.js manually (not via `make up`), `make down` won't know about it.
Stop it with Ctrl+C in the terminal where it’s running.

## TypeScript errors during smoke

Run:

```bash
make smoke
```

Fix the first error; type errors often cascade.

## Lint errors

Run:

```bash
npm run lint
```

If you’re unsure whether a rule is worth keeping, document the decision in [`decisions.md`](decisions.md).
