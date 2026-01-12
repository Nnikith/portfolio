#!/usr/bin/env bash
set -Eeuo pipefail

# reset.sh — destructive clean: stop + remove caches + reinstall

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "$SCRIPT_DIR/lib.sh"

cd_repo_root
ensure_node

log "Reset will:"
echo "  - stop dev server"
echo "  - remove .next/ node_modules/"
echo "  - reinstall dependencies"
echo ""

if [[ "${CI:-}" != "true" ]]; then
  confirm "This is destructive." || die "Aborted."
fi

"$SCRIPT_DIR/stop.sh" || true

log "Removing build artifacts and dependencies…"
rm -rf .next node_modules

log "Reinstalling dependencies with $(pm)…"
pm_install

ok "Reset complete."
