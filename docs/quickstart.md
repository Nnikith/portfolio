# Quickstart

## Prereqs

- Docker Desktop (or Docker Engine) running
- Git

## Configure env

Copy the example env file:

```bash
cp .env.example .env
```

Set:

- `NEXTAUTH_SECRET` (long random string)
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` (GitHub OAuth app)
- Optionally `NEXTAUTH_URL` (default: http://localhost:3000)

## Run

```bash
make up
```

App: http://localhost:3000

## Initialize database

Run Prisma migration inside the app container:

```bash
make prisma-migrate
```

(Optional) Prisma Studio:

```bash
make prisma-studio
# then open http://localhost:5555
```

## Stop

```bash
make down
```

## Reset local DB (destructive)

```bash
YES_I_UNDERSTAND=true make reset
```
