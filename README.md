# Atomic Platform

A comprehensive Spring Boot microservices platform featuring broker-based service architecture, user management, and data services.

## Overview

The Atomic platform consists of multiple interconnected services designed to provide a scalable, distributed system. The architecture includes:

- **Broker Service**: Central hub for request routing and service orchestration
- **User Management**: Dual-architecture user services (user-service for MongoDB, user-access-service for legacy compatibility)
- **Data Services**: Various specialized services for file handling, content management, and more
- **Authentication**: Secure login and session management

## Architecture

### Service Types

#### MongoDB-Based Services

The following services now use MongoDB for data persistence:

- `user-service`: Primary user management with social features
- `user-access-service`: User management with dual ID system (Long ID for client compatibility, String mongoId for storage)
- `broker-gateway`: Uses MongoDB for some configurations
- `shrapnel-data`: Data management with MongoDB

#### Non-JPA Services (JPA configuration commented out)

The following services previously had JPA configurations but these have been commented out as they don't contain JPA entities:

- `broker-service`: Now uses MongoDB configurations instead of JPA
- `file-service`: Now uses MongoDB configurations instead of JPA
- `upload-service`: Now uses MongoDB configurations instead of JPA

#### JPA-Based Services (Still use JPA)

These services continue to use JPA with MySQL since they have JPA entities:

- `shrapnel-data`: Full JPA implementation with entity models and repositories
- Some API services that haven't been converted

### Dual User Architecture

The platform implements a unique dual user service architecture:

#### user-service

- Primary user management service using MongoDB
- Handles social features (posts, comments, reactions, forums)
- Uses native MongoDB document approach

#### user-access-service

- Legacy compatibility service using MongoDB with dual ID system
- Maintains compatibility with existing web clients expecting Long IDs
- Features `ValidUser` model with both `id` (Long for clients) and `mongoId` (String for storage)

## Running the Platform

### Quick Start with Docker Compose (Recommended)

Start the entire platform with one command:

```bash
docker-compose up --build
```

This will start all services with proper networking and dependencies.

### Service Ports and URLs

#### Databases

- **MySQL**: `localhost:3306` (user: root, password: rootpass)
- **MongoDB**: `localhost:27017`

#### Spring Boot Services

- **broker-gateway**: `http://localhost:8080` - Main API gateway and entry point
- **user-access-service**: `http://localhost:8081` - Legacy-compatible user management (MySQL)
- **login-service**: `http://localhost:8082` - Authentication service
- **user-service**: `http://localhost:8083` - Primary user management (MongoDB)

#### Node.js Internal Services

- **file-system-server**: `http://localhost:4040` - Proxy file system service

#### Web Applications

- **nextjs-api-tester**: `http://localhost:9012` - API testing interface
- **nextjs-cool-people**: `http://localhost:9002` - User interface application

### Manual Database Setup

If not using Docker Compose, start databases manually:

```bash
# MySQL
./start-mysql.sh

# MongoDB (Windows)
mongodb-docker-start.bat

# MongoDB (Linux/Mac)
./mongodb-docker-start.sh
```

### Manual Service Startup

For development, services can be started individually:

```bash
# Spring Boot services (from respective directories)
cd spring/broker-gateway && ./mvnw spring-boot:run
cd spring/user-access-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
cd spring/login-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8082"
cd spring/user-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8083"

# Node.js services
cd node/file-system-server && npm start

# Web applications
cd web/nextjs-api-tester && npm run dev
cd web/nextjs-cool-people && npm run dev
```

### Alternative Orchestration

Use the provided orchestration tools:

```bash
# Using Foreman (requires: npm install)
npm run dev

# Using Make
make dev

# Using individual commands
make start-db
make start-services
make start-web
```

## Development

The platform is designed for modular development with clear separation of concerns between services.

### Service Dependencies

```
Web Apps (9002, 9012)
    ↓
Broker Gateway (8080)
    ↓
├── File System Server (4040)
├── User Access Service (8081) → MySQL
├── Login Service (8082) → User Access Service
└── User Service (8083) → MongoDB
```

### Development Workflow

1. **Start databases**: `docker-compose up mysql mongodb -d`
2. **Start core services**: `docker-compose up broker-gateway user-access-service user-service -d`
3. **Start web apps**: `docker-compose up nextjs-api-tester nextjs-cool-people -d`

Or start everything at once: `docker-compose up --build`

### Configuration Files

- **Docker Compose**: `docker-compose.yml` - Complete orchestration
- **Process Manager**: `Procfile` - For Foreman-based development
- **Make**: `Makefile` - Granular control over services
- **Package.json**: Root-level scripts for common tasks
