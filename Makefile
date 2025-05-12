# Docker commands
up:
	docker-compose up

build:
	docker-compose up --build

down:
	docker-compose down

down-v:
	docker-compose down -v

# Development commands
install-frontend:
	cd frontend && npm install

install-backend:
	cd backend && npm install

install: install-frontend install-backend

# Docker container commands
frontend-shell:
	docker-compose exec frontend sh

backend-shell:
	docker-compose exec backend sh

db-shell:
	docker-compose exec db mysql -u user -ppassword bookingapp

# Logs
logs:
	docker-compose logs

logs-frontend:
	docker-compose logs frontend

logs-backend:
	docker-compose logs backend

logs-db:
	docker-compose logs db

# Clean up
clean:
	docker-compose down -v
	docker system prune -f

# Help
help:
	@echo "Available commands:"
	@echo "  up              - Start all containers"
	@echo "  up-build       - Build and start all containers"
	@echo "  down           - Stop all containers"
	@echo "  down-v         - Stop all containers and remove volumes"
	@echo "  install        - Install dependencies for both frontend and backend"
	@echo "  frontend-shell - Access frontend container shell"
	@echo "  backend-shell  - Access backend container shell"
	@echo "  db-shell       - Access database shell"
	@echo "  logs           - View all container logs"
	@echo "  logs-frontend  - View frontend container logs"
	@echo "  logs-backend   - View backend container logs"
	@echo "  logs-db        - View database container logs"
	@echo "  clean          - Remove all containers, volumes, and unused images" 