#!/usr/bin/env bash
set -Eeuo pipefail

# smoke.sh — fast, CI-friendly checks (no prompts)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "$SCRIPT_DIR/lib.sh"

cd_repo_root
ensure_node

log "Smoke checks…"

# Ensure deps
if [[ ! -d node_modules ]]; then
  log "Installing dependencies…"
  pm_install
fi

log "Lint…"
npm_run lint

log "Typecheck…"
# Prefer next lint/tsc presence. If project doesn't have a typecheck script, run tsc.
if node -e "const p=require('./package.json'); process.exit(p.scripts?.typecheck?0:1)"; then
  npm_run typecheck
else
  ./node_modules/.bin/tsc -p tsconfig.json --noEmit
fi

log "Build…"
npm_run build

ok "Smoke passed."
