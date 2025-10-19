.PHONY: help install start stop clean dev

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	@echo "Installing Node.js dependencies..."
	cd web/nextjs-api-tester && npm install
	cd web/nextjs-cool-people && npm install
	cd node/file-system-server && npm install
	@echo "Building Spring Boot services..."
	cd spring && mvn clean compile

start-db: ## Start databases
	@echo "Starting MySQL..."
	./start-mysql.sh &
	@echo "Starting MongoDB..."
	./mongodb-docker-start.bat &

start-services: ## Start all services
	@echo "Starting Spring Boot services..."
	cd spring/broker-gateway && ./mvnw spring-boot:run &
	cd spring/user-access-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8081" &
	cd spring/login-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8082" &
	cd spring/user-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8083" &
	@echo "Starting Node.js services..."
	cd node/file-system-server && npm start &

start-web: ## Start web applications
	@echo "Starting web applications..."
	cd web/nextjs-api-tester && npm run dev -- --port 3000 &
	cd web/nextjs-cool-people && npm run dev -- --port 3002 &

dev: start-db start-services start-web ## Start everything for development

stop: ## Stop all services
	@echo "Stopping all services..."
	pkill -f "spring-boot:run" || true
	pkill -f "next-server" || true
	pkill -f "node.*server" || true

clean: ## Clean build artifacts
	cd spring && mvn clean
	find web -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
	find node -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true