# Decisions

This doc captures intentional choices so future-you doesn’t have to re-derive context.

## 1) No Docker

**Decision:** run locally using Node directly.

**Why:** portfolio site is front-end heavy, fast to run, and Docker adds friction for contributors/interviewers.

**Consequence:** local environment must have Node installed. `make doctor` helps verify.

## 2) Makefile + scripts/

**Decision:** `Makefile` is the stable entrypoint; logic lives in `scripts/`.

**Why:** makes commands discoverable and consistent; scripts are testable and CI-friendly.

## 3) Dark, minimal homepage

**Decision:** start with a single-page professional layout: hero + projects + skills + experience + contact.

**Why:** fast iteration, looks credible, and can expand later (blog, case studies, etc.).

## 4) Vercel later

**Decision:** deploy later; document the plan now.

**Why:** separates “build the artifact” from “pick infra”. Keep repo ready for Vercel from day 1.
