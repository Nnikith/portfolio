#!/usr/bin/env bash
set -Eeuo pipefail

# doctor.sh — read-only diagnostics for local dev + CI

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "$SCRIPT_DIR/lib.sh"

usage() {
  cat <<'EOF'
doctor.sh — diagnostics (read-only)

Usage:
  make doctor
  ./scripts/doctor.sh

Checks:
  - git present + repo root
  - node + package manager present
  - package.json scripts presence
  - lockfile consistency hints
  - eslint/tsconfig presence
  - next.config presence (optional)
  - dev server pid file status

EOF
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

cd_repo_root

log "Repo"
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  ok "git repo: $(repo_root)"
else
  die "Not inside a git repository."
fi

log "Node tooling"
if command -v node >/dev/null 2>&1; then
  ok "node: $(node -v)"
else
  err "node not found"
fi

if command -v "$(pm)" >/dev/null 2>&1; then
  ok "pm ($(pm)): $($(pm) -v 2>/dev/null || echo 'unknown')"
else
  err "package manager not found: $(pm)"
fi

log "Project files"
[[ -f package.json ]] && ok "package.json present" || err "package.json missing"
[[ -f tsconfig.json ]] && ok "tsconfig.json present" || warn "tsconfig.json missing (unexpected for TS)"
[[ -f .eslintrc.json || -f .eslintrc.cjs || -f eslint.config.js || -f eslint.config.mjs ]] \
  && ok "eslint config present" || warn "eslint config not found (check your setup)"
[[ -d src/app ]] && ok "src/app present (App Router)" || warn "src/app missing (App Router expected)"

log "Scripts"
if [[ -f package.json ]]; then
  node - <<'NODE'
const p=require('./package.json');
const scripts=p.scripts||{};
const req=['dev','build','lint'];
for(const s of req){
  if(!scripts[s]) console.log(`WARN: package.json missing script: ${s}`);
  else console.log(`OK: script: ${s} -> ${scripts[s]}`);
}
NODE
fi

log "Lockfile"
if [[ -f package-lock.json ]]; then ok "package-lock.json present"
elif [[ -f pnpm-lock.yaml ]]; then ok "pnpm-lock.yaml present"
elif [[ -f yarn.lock ]]; then ok "yarn.lock present"
else warn "No lockfile found (recommend committing one)"
fi

log "Dev server status"
if pid="$(read_pid 2>/dev/null || true)"; then
  if is_running "$pid"; then
    ok "dev server running (pid=$pid)"
  else
    warn "stale pid file exists (pid=$pid)"
  fi
else
  ok "dev server not running"
fi

ok "Doctor finished."
