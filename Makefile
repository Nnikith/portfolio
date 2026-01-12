# Makefile — portfolio-website
# Primary interface for local dev + repo hygiene.
# No Docker. Uses npm (or pnpm/yarn if you change scripts/lib.sh).

SHELL := /usr/bin/env bash

.DEFAULT_GOAL := help

# Allow overriding Node package manager from env (npm by default).
# Example: make up PM=pnpm
PM ?= npm

# --------
# Targets
# --------
.PHONY: help up dev down reset smoke doctor commit

help: ## Show this help.
	@./scripts/doctor.sh --help >/dev/null 2>&1 || true
	@echo ""
	@echo "Usage:"
	@echo "  make <target>"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_\-]+:.*##/ {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "Notes:"
	@echo "  - PM can be overridden: make up PM=pnpm"
	@echo "  - Scripts are safe-by-default; reset is destructive (removes node_modules/.next)."

up: ## Start Next.js dev server (alias: dev).
	@PM="$(PM)" ./scripts/start.sh

dev: up ## Start Next.js dev server (alias: up).

down: ## Stop local dev server (best-effort).
	@PM="$(PM)" ./scripts/stop.sh

reset: ## Destructive clean: stop + remove node_modules/.next + reinstall.
	@PM="$(PM)" ./scripts/reset.sh

smoke: ## Quick non-interactive checks: install, lint, typecheck, build.
	@PM="$(PM)" ./scripts/smoke.sh

doctor: ## Read-only diagnostics for common issues.
	@PM="$(PM)" ./scripts/doctor.sh

commit:
	./scripts/commit.sh "$(MSG)"
