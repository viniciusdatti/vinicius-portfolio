# Docker shortcuts (Linux/macOS). Windows: scripts/docker/*.ps1
ENV_FILE ?= .env.docker
COMPOSE_DEV = docker compose --env-file $(ENV_FILE)
COMPOSE_PROD = docker compose -f docker-compose.prod.yml --env-file $(ENV_FILE)

.PHONY: docker-up docker-down docker-logs docker-build docker-ps docker-seed docker-prod-up docker-prod-down docker-reset

docker-up:
	$(COMPOSE_DEV) up --build -d

docker-down:
	$(COMPOSE_DEV) down

docker-logs:
	$(COMPOSE_DEV) logs -f

docker-build:
	$(COMPOSE_DEV) build

docker-ps:
	$(COMPOSE_DEV) ps

docker-seed:
	$(COMPOSE_DEV) exec backend python scripts/seed.py

docker-prod-up:
	$(COMPOSE_PROD) up --build -d

docker-prod-down:
	$(COMPOSE_PROD) down

docker-reset:
	$(COMPOSE_DEV) down -v
	docker volume rm portfolio_postgres_data portfolio_frontend_node_modules 2>/dev/null || true
