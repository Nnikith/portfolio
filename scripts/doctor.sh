#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/lib.sh"
cd_repo_root

log "Doctor: basic environment"
require_cmd git
require_cmd docker
docker --version
git --version

log "Doctor: docker info"
docker info >/dev/null

log "Doctor: compose services"
compose ps || true

log "Doctor: ports"
require_cmd sh
( command -v lsof >/dev/null 2>&1 && lsof -i :3000 -i :5432 2>/dev/null ) || true

log "Doctor complete."
