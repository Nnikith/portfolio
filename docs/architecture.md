# Architecture

## High-level

- Next.js App Router + TypeScript
- Auth.js / NextAuth (GitHub OAuth first; provider expansion later)
- Postgres + Prisma
- Multi-tenant:
  - Normal users: only their own data
  - Root admin: full access
  - Public visitors: only unlisted share links

## Public links

Public URL format:

- `/u/{username}/{randomId}`

`randomId` is non-guessable and maps to a **PublicLink** record which points to a **Variant** (mutable).

## Route protection

- `/app/**` requires authentication
- `/admin/**` requires `isAdmin`
- `/u/{username}` behaves like a professional service:
  - not authed → login
  - authed + authorized → dashboard

## Data model

- User
- Variant (theme + content JSON)
- PublicLink (randomId → variantId mapping)
- Standard Auth.js tables (Account, Session, VerificationToken)
