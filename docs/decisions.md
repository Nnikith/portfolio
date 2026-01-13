# Decisions

## Auth: GitHub first, expandable later

We start with GitHub OAuth via Auth.js/NextAuth. The user model + adapter supports adding providers (Google/email) later without schema changes.

## Variants store structured content as JSON

Variant content is stored as JSON in Postgres (Prisma `Json`), enabling flexible sections early. Ordering is stored explicitly to support reorder controls.

## Public links are unlisted and mutable

`randomId` identifies a PublicLink which points to a Variant. Editing the Variant updates the public view automatically. Repointing a link changes what it shows.
