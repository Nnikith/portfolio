#!/usr/bin/env bash
set -Eeuo pipefail

# start.sh — start Next.js dev server (no Docker)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "$SCRIPT_DIR/lib.sh"

cd_repo_root
ensure_node

log "Starting Next.js dev server…"
log "Package manager: $(pm)"
log "Tip: stop with 'make down'"

# If already running, be polite.
if pid="$(read_pid 2>/dev/null || true)"; then
  if is_running "$pid"; then
    ok "Dev server already running (pid=$pid)."
    exit 0
  else
    warn "Found stale pid file; removing."
    remove_pid
  fi
fi

# Ensure deps exist (best effort; smoke/reset handle more strictly).
if [[ ! -d node_modules ]]; then
  warn "node_modules not found; installing deps…"
  pm_install
fi

# Start in background, capture PID.
# Use nohup to survive terminal interruptions.
nohup "$(pm)" run dev >/tmp/next-dev.log 2>&1 &
pid=$!
write_pid "$pid"

ok "Started (pid=$pid)."
echo "Logs: /tmp/next-dev.log"
echo "Open: http://localhost:3000"
