#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/lib.sh"
cd_repo_root
require_docker

log "Smoke: checking containers..."
compose ps

log "Smoke: checking app HTTP..."
require_cmd curl
curl -fsS http://localhost:3000 >/dev/null

log "Smoke: checking db health..."
compose exec -T db pg_isready -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-portfolio}" >/dev/null

log "Smoke OK."
