#!/usr/bin/env bash
# dev.sh — Dev-Server steuern: ./dev.sh up | down
# 'up' läuft im VORDERGRUND (eigene Pane, Ctrl+C = stop) — nie nohup/& (Zombies!).
set -euo pipefail
cd "$(dirname "$0")"
PORT=4323

case "${1:-up}" in
  up)
    exec pnpm dev --port "$PORT"
    ;;
  down)
    PID=$(ss -tlnp 2>/dev/null | grep ":$PORT " | grep -oP 'pid=\K[0-9]+' | head -1 || true)
    if [ -n "${PID:-}" ]; then
      kill "$PID" && echo "Dev-Server (PID $PID) auf Port $PORT gestoppt."
    else
      echo "Kein Dev-Server auf Port $PORT."
    fi
    ;;
  *)
    echo "Usage: ./dev.sh [up|down]" >&2
    exit 1
    ;;
esac
