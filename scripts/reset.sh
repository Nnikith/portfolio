#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/lib.sh"
cd_repo_root
require_docker

cat <<'WARN'
!!! DESTRUCTIVE OPERATION !!!
This will delete the local Postgres volume (db_data) and ALL local data.
WARN

if [[ "${YES_I_UNDERSTAND:-}" != "true" ]]; then
  echo "Set YES_I_UNDERSTAND=true to proceed."
  exit 1
fi

log "Stopping stack..."
compose down -v

log "Starting fresh stack..."
compose up -d --remove-orphans
log "Fresh stack started."
