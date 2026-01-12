#!/usr/bin/env bash
set -Eeuo pipefail

# ==========================================
# lib.sh — shared helpers for scripts/
# ==========================================

# --------
# Colors
# --------
if [[ -t 1 ]]; then
  C_RESET=$'\033[0m'
  C_BOLD=$'\033[1m'
  C_DIM=$'\033[2m'
  C_RED=$'\033[31m'
  C_GREEN=$'\033[32m'
  C_YELLOW=$'\033[33m'
  C_CYAN=$'\033[36m'
else
  C_RESET=""; C_BOLD=""; C_DIM=""; C_RED=""; C_GREEN=""; C_YELLOW=""; C_CYAN=""
fi

log()   { echo "${C_CYAN}==>${C_RESET} $*"; }
ok()    { echo "${C_GREEN}OK:${C_RESET} $*"; }
warn()  { echo "${C_YELLOW}WARN:${C_RESET} $*"; }
err()   { echo "${C_RED}ERROR:${C_RESET} $*" >&2; }
die()   { err "$*"; exit 1; }

# --------
# Repo root
# --------
repo_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

cd_repo_root() {
  local root
  root="$(repo_root)"
  cd "$root"
}

# --------
# Package manager + node tools
# --------
pm() {
  # Use PM env var if set, default npm.
  echo "${PM:-npm}"
}

ensure_cmd() {
  local name="$1"
  command -v "$name" >/dev/null 2>&1 || die "Required command not found: $name"
}

ensure_node() {
  ensure_cmd node
  ensure_cmd "$(pm)"
}

npm_run() {
  # Runs a package.json script via the configured package manager.
  # Works for npm/pnpm/yarn with common syntax.
  local script="$1"; shift || true
  local manager
  manager="$(pm)"

  case "$manager" in
    npm)  "$manager" run -s "$script" -- "$@" ;;
    pnpm) "$manager" -s run "$script" -- "$@" ;;
    yarn) "$manager" -s "$script" -- "$@" ;;
    *) die "Unsupported PM=$manager (expected npm|pnpm|yarn)" ;;
  esac
}

pm_install() {
  local manager
  manager="$(pm)"
  case "$manager" in
    npm)  "$manager" ci ;;
    pnpm) "$manager" install --frozen-lockfile ;;
    yarn) "$manager" install --frozen-lockfile ;;
    *) die "Unsupported PM=$manager (expected npm|pnpm|yarn)" ;;
  esac
}

# --------
# Process management
# --------
pid_file() {
  echo ".devserver.pid"
}

is_running() {
  local pid="$1"
  [[ -n "${pid:-}" ]] || return 1
  kill -0 "$pid" >/dev/null 2>&1
}

read_pid() {
  local f
  f="$(pid_file)"
  [[ -f "$f" ]] || return 1
  cat "$f"
}

write_pid() {
  local pid="$1"
  echo "$pid" > "$(pid_file)"
}

remove_pid() {
  rm -f "$(pid_file)"
}

# --------
# Safe prompts (used only for very destructive actions)
# --------
confirm() {
  local prompt="${1:-Are you sure?}"
  read -r -p "${prompt} Type 'yes' to continue: " reply
  [[ "$reply" == "yes" ]]
}

# --------
# Time helpers
# --------
timestamp() {
  date +"%Y-%m-%d %H:%M:%S"
}
