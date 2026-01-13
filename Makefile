\
SHELL := /usr/bin/env bash

.DEFAULT_GOAL := help

.PHONY: help up down reset smoke doctor logs psql prisma-migrate prisma-studio lint format test

help: ## Show this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<TARGET>\033[0m\n\nTargets:\n"} /^[a-zA-Z0-9_-]+:.*##/ { printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

up: ## Start local stack (app + postgres) via Docker.
	@./scripts/start.sh

down: ## Stop local stack.
	@./scripts/stop.sh

reset: ## Destructive: wipe local DB volume and start fresh.
	@./scripts/reset.sh

smoke: ## Run smoke checks (CI-friendly).
	@./scripts/smoke.sh

doctor: ## Run read-only diagnostics (CI-friendly).
	@./scripts/doctor.sh

logs: ## Tail docker compose logs.
	@docker compose logs -f --tail=200

psql: ## Open psql shell inside postgres container.
	@docker compose exec -it db psql -U "$${POSTGRES_USER:-postgres}" -d "$${POSTGRES_DB:-portfolio}"

prisma-migrate: ## Run Prisma migrations (inside app container).
	@docker compose exec -it app sh -lc "pnpm prisma migrate dev"

prisma-studio: ## Open Prisma Studio (inside app container).
	@docker compose exec -it app sh -lc "pnpm prisma studio --hostname 0.0.0.0 --port 5555"

lint: ## Run ESLint (inside app container).
	@docker compose exec -it app sh -lc "pnpm lint"

format: ## Run formatter (noop scaffold; add prettier later if desired).
	@echo "No formatter configured (intentionally)."

test: ## Run tests (noop scaffold).
	@echo "No tests configured yet."

