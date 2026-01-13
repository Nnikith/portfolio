#!/usr/bin/env bash
set -euo pipefail

repo_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

cd_repo_root() {
  cd "$(repo_root)"
}

log() { echo "[$(date +'%H:%M:%S')] $*"; }

die() {
  echo "ERROR: $*" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

require_docker() {
  require_cmd docker
  docker info >/dev/null 2>&1 || die "Docker is not running."
}

compose() {
  docker compose "$@"
}
