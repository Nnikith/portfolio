# Operations

## Local development

Start:

```bash
make up
```

Stop:

```bash
make down
```

Quality gate:

```bash
make smoke
```

## Vercel deployment plan (later)

This repo is compatible with Vercel’s Next.js defaults:

- Build command: `npm run build`
- Output: Next.js (handled automatically by Vercel)
- Install: `npm install` (or `npm ci` depending on settings)

Recommended steps when you’re ready:

1. Create a Vercel project and import the GitHub repo.
2. Ensure the Node version matches your local LTS.
3. Configure environment variables (if you add any).
4. Enable automatic deployments for `main`.

## Domain plan (later)

You can keep using the free Vercel `*.vercel.app` domain until you buy one.

When you buy a domain:

1. Add it to the Vercel project.
2. Set DNS records as instructed by Vercel (usually A/AAAA or CNAME).
3. Enable HTTPS (Vercel handles certs).
4. Optionally add redirects (www → apex or vice versa).

Keep a short note in the README once the domain is active.
