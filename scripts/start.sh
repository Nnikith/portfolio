#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/lib.sh"
cd_repo_root
require_docker

log "Starting docker compose stack..."
compose up -d --remove-orphans
log "Done. App: http://localhost:3000"
