# Troubleshooting

## Docker not running

Run:

```bash
make doctor
```

Ensure Docker Desktop is started.

## Port already in use

If port 3000 or 5432 is taken, stop the other service or adjust `docker-compose.yml`.

## Auth errors

Verify:

- `NEXTAUTH_URL` matches where you're serving the app
- `NEXTAUTH_SECRET` is set
- GitHub OAuth callback URL includes `/api/auth/callback/github`
