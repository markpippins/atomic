# Atomic Platform

A comprehensive Spring Boot microservices platform featuring broker-based service architecture, user management, and data services.

## Overview

The Atomic platform consists of multiple interconnected services designed to provide a scalable, distributed system built on **Spring Boot 3.5.0** with Java 21. The architecture includes:

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
- `note-service`: User notes management with token-based authentication
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

### New Services and Features

#### Note Service (`note-service`)

- **Purpose**: User notes management with MongoDB persistence
- **Authentication**: Uses token-based authentication via the broker system
- **Integration**: Full broker system integration with operations for get, save, and delete notes
- **Architecture**: Follows the same token validation pattern as other services, communicating with login-service via broker

#### Broker Service Proxy (`node/broker-service-proxy`)

- **Purpose**: TypeScript-based proxy server that forwards requests to the broker gateway
- **Location**: `/node/broker-service-proxy`
- **Function**: Acts as an intermediary between clients and the broker gateway
- **Features**: Transparent proxying, health checks, configurable endpoints

#### Quarkus-based Broker Gateway (`quarkus/broker-gateway-quarkus`)

- **Purpose**: Alternative implementation of the broker-gateway using Quarkus framework
- **Technology**: Java 21, Quarkus 3.15.1, RESTEasy Reactive
- **Port**: 8190 (by default)
- **Features**: Identical routing and service orchestration functionality to Spring Boot version
- **Benefits**: Improved startup time, lower memory footprint, potential for native compilation
- **Architecture**: Fully compatible with existing Atomic platform services and clients

#### CORS Configuration Updates

- **Purpose**: Fixed CORS issues across the platform
- **Location**: `spring/broker-gateway/CorsFilter.java`, `CorsConfig.java`
- **Features**: High-priority servlet filter, proper credential handling, explicit method declarations

### Security Architecture

The platform implements token-based authentication across services with a focus on broker-driven communication and shared state management:

#### Authentication Flow

1. **login-service**: Authenticates users against user-access-service through the broker service and generates UUID tokens
2. **Token Storage**: Validated token-user mappings stored in Redis for shared state across service instances
3. **Token Validation**: Other services (like file-service, note-service) validate tokens with login-service via broker communication
4. **Access Control**: Token validation ensures users can only access their own resources
5. **Service Decoupling**: All inter-service communication now occurs through the broker service to improve modularity and maintainability

#### Current Token-Based Integrations

- **file-service**: Requires tokens for all file operations instead of direct alias access, communicates with login-service via broker
- **note-service**: Validates user tokens for note operations through the broker
- **login-service**: Formerly had direct dependency on user-access-service, now uses broker service for user validation (refactored for better decoupling)
- **Cross-Service Security**: All file and note operations validated against user's authenticated identity
- **Session Management**: Tokens can be invalidated on logout

#### Broker Service Integration Pattern

Many services now communicate internally through the broker service rather than direct HTTP calls:
- Services register with the broker and use ServiceRequest/ServiceResponse patterns for communication
- This provides better service discovery, load balancing, and fault tolerance
- The broker acts as a central orchestration point for all internal service communications

#### Security Benefits

- **User Isolation**: Users can only access their own files/folders/notes
- **Reduced Attack Surface**: No direct alias exposure in operations
- **Centralized Validation**: All authentication handled by login-service via broker
- **Audit Trail**: All operations tied to authenticated sessions

## Service Architecture

### Core Services

```
Angular Client → Broker Gateway (8080) → [Service Registry Component]
                       ↓                           ↓
                Internal Services          External Services
                ├── File System (4040)     ├── Moleculer Search (4050)
                ├── User Access (8081)     └── Future services...
                ├── Login (8082)
                └── User Service (8083)
```

### External Service Registration via Broker Protocol

The platform supports **dynamic service registration** for polyglot microservices using the standard broker protocol:

1. **Service Registry**: Integrated into broker-gateway as a `@BrokerOperation` service
2. **Registration Protocol**: External services register using `ServiceRequest` format:
   ```json
   {
     "service": "serviceRegistry",
     "operation": "register",
     "params": {
       "registration": { ... }
     }
   }
   ```
3. **Auto-Registration**: External services (like Moleculer) register on startup via broker-gateway
4. **Unified Entry Point**: All traffic flows through broker-gateway - no separate registry service needed

This pattern maintains architectural consistency - service-registry follows the same `@BrokerOperation` pattern as all other services.

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
- **Redis**: `localhost:6379` (for session management and caching)

#### Spring Boot Services

- **broker-gateway**: `http://localhost:8080` - Main API gateway with integrated service registry
- **user-access-service**: `http://localhost:8081` - Legacy-compatible user management (MySQL)
- **login-service**: `http://localhost:8082` - Authentication service
- **user-service**: `http://localhost:8083` - Primary user management (MongoDB)

#### Node.js Services

- **file-system-server**: `http://localhost:4040` - Proxy file system service
- **moleculer-search**: `http://localhost:4050` - Moleculer-based search service (Google, Gemini, Unsplash)

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

# Redis (for session management)
./start-redis.sh  # Linux/Mac
./start-redis.ps1  # Windows PowerShell
```

### Manual Service Startup

For development, services can be started individually:

```bash
# Spring Boot services (from respective directories)
cd spring/broker-gateway && ./mvnw spring-boot:run
cd spring/user-access-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
cd spring/login-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8082"
cd spring/user-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8083"

# Quarkus service
cd quarkus/broker-gateway-quarkus && ./mvnw compile quarkus:dev

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
