#!/usr/bin/env bash
set -Eeuo pipefail

# stop.sh — stop Next.js dev server (best effort)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "$SCRIPT_DIR/lib.sh"

cd_repo_root

if ! pid="$(read_pid 2>/dev/null || true)"; then
  warn "No pid file found; nothing to stop."
  exit 0
fi

if is_running "$pid"; then
  log "Stopping dev server (pid=$pid)…"
  kill "$pid" || true

  # Wait a bit then force kill if needed.
  for _ in {1..20}; do
    if ! is_running "$pid"; then
      ok "Stopped."
      remove_pid
      exit 0
    fi
    sleep 0.2
  done

  warn "Process still running; sending SIGKILL."
  kill -9 "$pid" || true
  remove_pid
  ok "Stopped (forced)."
else
  warn "Pid file exists but process not running; cleaning pid file."
  remove_pid
fi
