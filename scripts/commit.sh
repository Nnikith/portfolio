#!/usr/bin/env bash
set -Eeuo pipefail

# ==========================================
# scripts/commit.sh — Auto / Custom Commit Helper
#
# Usage:
#   make commit
#   make commit MSG="your custom message"
#   ./scripts/commit.sh "your custom message"
#
# Priority for commit message:
#   1) CLI argument(s)
#   2) MSG environment variable
#   3) Auto timestamp message
#
# Behavior:
# - Shows status
# - Stages changes (default: interactive-safe; see STAGE_MODE)
# - Commits
# - Pushes (default: enabled; set PUSH=0 to disable)
#
# Env:
#   MSG="..."         custom message
#   PUSH=0            skip push
#   STAGE_MODE=all    stage all changes (git add -A)  [default]
#   STAGE_MODE=patch  stage interactively (git add -p)
#   STAGE_MODE=none   do not stage (assumes you staged)
#   PAUSE=1           pause on exit (local use only)
# ==========================================

pause_if_requested() {
  if [[ "${PAUSE:-0}" == "1" ]]; then
    read -r -p "Press Enter to exit..." _
  fi
}

die() {
  echo "ERROR: $*" >&2
  pause_if_requested
  exit 1
}

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || die "Not a git repository."
cd "$REPO_ROOT"

command -v git >/dev/null 2>&1 || die "git not found in PATH."

echo "=========================================================="
echo "[0] Repo sanity"
echo "=========================================================="
echo "Repo: $REPO_ROOT"
echo

echo "=========================================================="
echo "[1] Current changes (before staging)"
echo "=========================================================="
git status
echo
git status --porcelain || true
echo

# Commit message logic
if [[ $# -gt 0 ]]; then
  COMMIT_MSG="$*"
elif [[ -n "${MSG:-}" ]]; then
  COMMIT_MSG="$MSG"
else
  if command -v python3 >/dev/null 2>&1; then
    TS="$(python3 -c "from datetime import datetime; print(datetime.now().strftime('%Y-%m-%d_%H-%M-%S'))")"
  else
    TS="$(date +"%Y-%m-%d_%H-%M-%S")"
  fi
  COMMIT_MSG="chore: update ${TS}"
fi

# Create temp file for message
MSGFILE="$(mktemp)"
trap 'rm -f "$MSGFILE" >/dev/null 2>&1 || true' EXIT
printf "%s\n" "$COMMIT_MSG" > "$MSGFILE"

echo "=========================================================="
echo "[2] Commit message"
echo "=========================================================="
echo "MSG = \"$COMMIT_MSG\""
echo

# Stage files
STAGE_MODE="${STAGE_MODE:-all}"

echo "=========================================================="
echo "[3] Staging (STAGE_MODE=$STAGE_MODE)"
echo "=========================================================="
case "$STAGE_MODE" in
  all)
    git add -A
    ;;
  patch)
    git add -p
    ;;
  none)
    echo "Skipping staging (STAGE_MODE=none)."
    ;;
  *)
    die "Unknown STAGE_MODE: $STAGE_MODE (use: all|patch|none)"
    ;;
esac
echo

echo "--- Staged files ---"
git diff --name-only --cached || true
echo

# Nothing to commit?
if git diff --cached --quiet; then
  echo "=========================================================="
  echo "[4] Nothing staged - no commit created"
  echo "=========================================================="
  echo "Done."
  pause_if_requested
  exit 0
fi

# Commit
echo "=========================================================="
echo "[4] Commit"
echo "=========================================================="
git commit -F "$MSGFILE"
echo

# Push
PUSH="${PUSH:-1}"
if [[ "$PUSH" == "1" ]]; then
  echo "=========================================================="
  echo "[5] Push"
  echo "=========================================================="
  git push
  echo
else
  echo "=========================================================="
  echo "[5] Push skipped (PUSH=0)"
  echo "=========================================================="
  echo
fi

echo "Done."
pause_if_requested
exit 0
