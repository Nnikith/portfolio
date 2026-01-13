#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/lib.sh"
cd_repo_root
require_docker

log "Stopping docker compose stack..."
compose down
log "Done."
