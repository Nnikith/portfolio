#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/lib.sh"
cd_repo_root

require_cmd git

msg="${1:-${MSG:-}}"
if [[ -z "${msg}" ]]; then
  msg="chore: commit $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
fi

log "Staging changes..."
git add -A

if git diff --cached --quiet; then
  die "No staged changes to commit."
fi

log "Committing: ${msg}"
git commit -m "${msg}"

log "Done."
