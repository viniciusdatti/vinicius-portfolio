#!/bin/sh
set -e

wait_for_postgres() {
  if [ -z "${DATABASE_URL}" ]; then
    return 0
  fi
  case "${DATABASE_URL}" in
    postgresql*|postgres*)
      echo "Waiting for PostgreSQL..."
      python - <<'PY'
import os
import sys
import time
from urllib.parse import urlparse

import psycopg2

url = urlparse(os.environ["DATABASE_URL"])
host = url.hostname or "postgres"
port = url.port or 5432
user = url.username or "portfolio"
password = url.password or ""
dbname = (url.path or "/portfolio").lstrip("/")

for attempt in range(60):
    try:
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            dbname=dbname,
        )
        conn.close()
        print("PostgreSQL is ready.")
        sys.exit(0)
    except psycopg2.OperationalError:
        time.sleep(1)

print("PostgreSQL did not become ready in time.", file=sys.stderr)
sys.exit(1)
PY
      ;;
    *)
      return 0
      ;;
  esac
}

wait_for_postgres

if [ "${RUN_SEED}" = "true" ]; then
  echo "Running database seed (RUN_SEED=true)..."
  python scripts/seed.py || true
  echo "Ensuring default admin user exists..."
  python scripts/create_admin.py || true
fi

exec "$@"
