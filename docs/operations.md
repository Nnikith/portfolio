# Operations

## Local dev

Use Docker compose:

- `make up`
- `make down`

## Database

- Migrate: `make prisma-migrate`
- Inspect: `make prisma-studio` or `make psql`

## Admin

Admin is determined by `User.isAdmin`.

In v1 scaffold, you can flip this via Prisma Studio.
