.PHONY: help build up down restart logs clean dev-frontend dev-auth

# Default target executed when no arguments are given to make.
default: help

# Help target - shows available commands with descriptions
help:
	@echo "Multiplayer Game Platform - Available commands:"
	@echo "make build       - Build all containers"
	@echo "make up          - Start all containers in the background"
	@echo "make down        - Stop all containers"
	@echo "make restart     - Restart all containers"
	@echo "make logs        - View logs from all containers"
	@echo "make clean       - Remove all containers and volumes"
	@echo "make dev-frontend - Run frontend in development mode"
	@echo "make dev-auth    - Run auth service in development mode"

# Build all Docker containers
build:
	docker-compose build

# Start all containers in the background
up:
	docker-compose up -d

# Start all containers in the foreground
upf:
	docker-compose up

# Stop all containers
down:
	docker-compose down

# Restart all containers
restart:
	docker-compose restart

# View logs from all containers
logs:
	docker-compose logs -f

# Remove all containers and volumes
clean:
	docker-compose down -v --rmi local

# Run frontend in development mode (locally)
dev-frontend:
	cd services/frontend && npm install --legacy-peer-deps && npm start

# Run auth service in development mode (locally, if implemented)
dev-auth:
	@echo "Auth service development mode not yet implemented"
	# When implemented, uncomment:
	# cd services/auth && uvicorn main:app --reload

# Build and run in one command (most common development usage)
dev: build upf