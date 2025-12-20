# Atomic Platform - Project Inventory

This document provides an inventory of all projects within the Atomic Platform codebase, including their technologies, ports, and startup information.

## Root-level Files/Directories

### Root Directory
- **Type**: Configuration/Orchestration
- **Technologies**: Docker, Makefile
- **Startup**: `make dev` to run complete dev environment
- **Ports**: Various (see individual services)

## Project Categories

### Spring Boot Services (Java/Kotlin) - `/spring`
**Directory**: `/spring`
**Technology**: Java 21, Spring Boot 3.3.5, Maven
**Build**: `mvn clean compile`

### Quarkus Services (Java/Jakarta EE) - `/quarkus`
**Directory**: `/quarkus`
**Technology**: Java 21, Quarkus 3.15.1, Maven
**Build**: `mvn clean compile`

- **broker-gateway**
  - **Function**: Alternative implementation of broker-gateway using Quarkus framework
  - **Port**: 8190
  - **Tech**: Quarkus, RESTEasy Reactive, MongoDB
  - **Startup**: `./mvnw compile quarkus:dev` or `java -jar target/*-runner.jar`
  - **Dependencies**: MongoDB, external services (user-service, login-service, file-service, search-service)
  - **Description**: Provides identical functionality to broker-gateway but with improved performance and lower resource consumption

#### Core Services
- **broker-gateway** 
  - **Function**: Main API entry point, service orchestration
  - **Port**: 8080
  - **Tech**: Spring Boot, MongoDB
  - **Startup**: `./mvnw spring-boot:run` or `docker-compose up`
  - **Dependencies**: MySQL, file-system-server

- **user-access-service**
  - **Function**: Legacy-compatible user management with dual ID system
  - **Port**: 8081
  - **Tech**: Spring Boot, MySQL (JPA)
  - **Startup**: `./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"`
  - **Dependencies**: MySQL

- **login-service**
  - **Function**: Authentication and session management
  - **Port**: 8082
  - **Tech**: Spring Boot, Redis, broker-service integration
  - **Startup**: `./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8082"`
  - **Dependencies**: Redis, broker-service, user-access-service (communicates via broker)
  - **Description**: Stores active session tokens and user mappings in Redis for shared state across multiple service instances; uses broker-service for all communication with user-access-service instead of direct dependency, improving service decoupling and maintainability

- **user-service**
  - **Function**: Primary user management with social features
  - **Port**: 8083
  - **Tech**: Spring Boot, MongoDB (document approach)
  - **Startup**: `./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8083"`
  - **Dependencies**: MongoDB

- **note-service**
  - **Function**: User notes management with MongoDB persistence and token-based authentication
  - **Tech**: Spring Boot, MongoDB, broker-service integration
  - **Startup**: Integrated as component in broker-gateway
  - **Dependencies**: MongoDB, login-service (for token validation via broker), broker-service

#### Additional Services
- **broker-service**
  - **Function**: Central broker service for service orchestration and communication
  - **Tech**: Spring Boot, MongoDB
  - **Startup**: `./mvnw spring-boot:run`
  - **Description**: Orchestrates communication between services using ServiceRequest/ServiceResponse pattern; login-service now uses this for user validation instead of direct dependency on user-access-service

- **file-service**
  - **Function**: File handling services with MongoDB
  - **Tech**: Spring Boot, MongoDB
  - **Startup**: `./mvnw spring-boot:run`

- **upload-service**
  - **Function**: File upload services with MongoDB
  - **Tech**: Spring Boot, MongoDB
  - **Startup**: `./mvnw spring-boot:run`

- **shrapnel-data**
  - **Function**: Data management with JPA implementation
  - **Tech**: Spring Boot, JPA, MySQL
  - **Startup**: `./mvnw spring-boot:run`

- **broker-gateway-sec-bot** 
  - **Function**: Security bot for broker gateway
  - **Tech**: Spring Boot
  - **Startup**: `./mvnw spring-boot:run`

- **user-api**
  - **Function**: User API definitions
  - **Tech**: Java API module

- **broker-service-api**
  - **Function**: Broker service API definitions
  - **Tech**: Java API module

- **broker-service-spi**
  - **Function**: Broker service SPI (Service Provider Interface)
  - **Tech**: Java SPI module

- **file-service-api**
  - **Function**: File service API definitions
  - **Tech**: Java API module

### Node.js Services - `/node`
**Directory**: `/node`

- **broker-client**
  - **Function**: Client library for broker communication
  - **Tech**: TypeScript/JavaScript
  - **Files**: broker-client.ts, fs-client.ts, image-client.ts

- **broker-service-proxy**
  - **Function**: Proxy service that forwards requests to the broker gateway
  - **Port**: 3333 (configurable via BROKER_PROXY_PORT)
  - **Tech**: TypeScript/Express
  - **Files**: src/server.ts, src/controllers/BrokerProxyController.ts
  - **Startup**: npm run dev or npm start
  - **Dependencies**: broker-gateway

- **file-system-server**
  - **Function**: File system server implementation
  - **Port**: 3001
  - **Tech**: TypeScript
  - **Files**: fs-serv.ts
  - **Startup**: Node.js server

- **google**
  - **Function**: Google-related services integration
  - **Tech**: TypeScript/JavaScript

- **image-server**
  - **Function**: Image serving and processing
  - **Tech**: TypeScript/JavaScript

- **mock-broker-service**
  - **Function**: Mock broker service for testing
  - **Tech**: TypeScript/JavaScript

- **unsplash**
  - **Function**: Unsplash API integration
  - **Tech**: TypeScript/JavaScript

- **utils**
  - **Function**: Utility libraries
  - **Tech**: TypeScript/JavaScript

### Web Applications - `/web`
**Directory**: `/web`

- **google-cloud-search-assistant**
  - **Function**: Google Cloud Search assistant application
  - **Tech**: Web application

- **google-custom-search-app**
  - **Function**: Google Custom Search application
  - **Tech**: Web application

- **nextjs-api-tester**
  - **Function**: Next.js API testing application
  - **Port**: 3000 (when running via docker-compose)
  - **Tech**: Next.js 15.3.3, React, TypeScript, Tailwind CSS
  - **Startup**: `npm run dev` or `docker-compose up`
  - **Dependencies**: broker-gateway

- **nextjs-cool-people**
  - **Function**: Next.js application for "cool people"
  - **Port**: 3002 (when running via docker-compose)
  - **Tech**: Next.js, React, TypeScript, Tailwind CSS
  - **Startup**: `npm run dev -- --port 3002`
  - **Dependencies**: broker-gateway

- **nextjs-log-watch**
  - **Function**: Log monitoring application using Next.js
  - **Tech**: Next.js, React, TypeScript

- **react-cripto-api-tester**
  - **Function**: React application for crypto API testing
  - **Tech**: React, TypeScript

- **static**
  - **Function**: Static web content
  - **Tech**: HTML, CSS, JavaScript

### Desktop Applications - `/desktop`
**Directory**: `/desktop`

- **electron-vue**
  - **Function**: Electron-based file explorer application with Vue.js
  - **Port**: 5173/5174 (dev server)
  - **Tech**: Electron, Vue 3, TypeScript, Tailwind CSS
  - **Startup**: `bun run dev`
  - **Type**: Cross-platform desktop application

- **angular-throttler**
  - **Function**: Angular-based throttler application
  - **Tech**: Angular

### Python Services - `/python`
**Directory**: `/python`

- **fs-utils**
  - **Function**: File system utilities
  - **Tech**: Python

- **fs-utils-enhanced**
  - **Function**: Enhanced file system utilities
  - **Tech**: Python

- **image-serv**
  - **Function**: Image server in Python
  - **Tech**: Python

### Other Directories

- **bash** 
  - **Function**: Bash scripts
  - **Content**: README.md with bash utilities

- **docs**
  - **Function**: Documentation
  - **Content**: Project documentation

- **scripts**
  - **Function**: Utility scripts
  - **Content**: Various utility scripts

- **templates**
  - **Function**: Code templates
  - **Content**: Development templates

## Database Services
- **MySQL**: Port 3306 (for user-access-service, shrapnel-data, etc.)
- **MongoDB**: Port 27017 (for user-service, broker-service, etc.)
- **Redis**: Port 6379 (for login-service session management)
- **Database startup**: Use `./mongodb-docker-start.bat`, `./start-mysql.sh`, or `./scripts/start-redis.sh`

## Orchestration
- **Docker Compose**: `docker-compose.yml` orchestrates all services
- **Makefile**: Contains development lifecycle commands
  - `make dev`: Start complete development environment
  - `make install`: Install dependencies
  - `make start-db`: Start databases only
  - `make start-services`: Start Spring Boot services
  - `make start-web`: Start web applications