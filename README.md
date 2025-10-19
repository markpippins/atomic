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

### Database Setup

For services using MongoDB, you can start MongoDB using the provided script:

```bash
# On Windows
mongodb-docker-start.bat

# On Linux/Mac
./mongodb-docker-start.sh
```

### Service Startup

Each service can be started individually:
- `broker-gateway`: Provides the main API entry point
- `login-service`: Handles authentication
- `user-service`: Manages user operations
- `user-access-service`: Provides legacy-compatible user operations

## Development

The platform is designed for modular development with clear separation of concerns between services.
