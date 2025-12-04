# Atomic Platform Documentation

Welcome to the comprehensive documentation for the Atomic Platform. This manual provides organized access to all documentation across the various services and components.

## Core Documentation

- [Main Project Overview](README.md) - Platform overview and quick start
- [Projects Inventory](projects.md) - Complete list and description of all projects
- [License](../LICENSE) - Project licensing information

## Part I: Core Architecture

### Broker Service System
- [Nucleus Broker Service](nucleus-broker-service.md) - Core broker service documentation
- [Nucleus Broker Service Login](nucleus-broker-service-login.md) - Authentication and login flow
- [Broker Security Patterns](broker-security.md) - Security patterns for broker-based services
- [Service Registry Architecture](SERVICE_REGISTRY_ARCHITECTURE.md) - Service discovery and registration
- [Refined Architecture](REFINED_ARCHITECTURE.md) - Host-server as primary registry
- [Polyglot Service Mesh](POLYGLOT_SERVICE_MESH.md) - Multi-framework service registration

### Design Patterns
- [REST API Adapter Pattern](REST_API_ADAPTER_PATTERN.md) - How to wrap any REST API for broker integration
- [Service Backend Implementation](SERVICE_BACKEND_IMPLEMENTATION.md) - Service instance backend connections
- [FS Crawler Adapter Implementation](FS_CRAWLER_ADAPTER_IMPLEMENTATION.md) - REST API adapter example

### Architecture Documentation
- [User Service Architecture](user-service-architecture.md) - Architecture overview of the user service
- [Architecture Refinement Summary](ARCHITECTURE_REFINEMENT_SUMMARY.md) - Summary of architectural improvements

## Part II: Spring Boot Services

### Core Broker Services
- [Spring Services Overview](spring-services-overview.md) - Overview of all Spring Boot services
- [Broker Gateway](broker-gateway.md) - Main API gateway and request router
- [Broker Service](broker-service.md) - Core service brokering logic
- [Broker Service API](broker-service-api.md) - API definitions for service communication
- [Broker Service SPI](broker-service-spi.md) - Service Provider Interface for extensibility
- [Broker Gateway Security Bot](broker-gateway-sec-bot.md) - Security bot for gateway

### Host Server (Service Registry)
- [Host Server](host-server.md) - Comprehensive server/service/configuration management
- [Host Server API Examples](host-server-api-examples.md) - Practical API usage examples
- [Host Server Architecture](host-server-architecture.md) - Detailed architecture and design patterns
- [Host Server Diagrams](host-server-diagrams.md) - Visual representations of data model and flows
- [Host Server Quick Reference](host-server-quick-reference.md) - Fast lookup guide
- [Host Server Implementation Summary](host-server-implementation-summary.md) - Overview of what was built
- [Host Server Production Guide](host-server-production-guide.md) - Migration path to production
- [Backend Connections API](host-server-backend-connections-api.md) - Service instance backend connections
- [Backend Quick Start](host-server-backend-quick-start.md) - Quick reference for backend connections

### User Management Services
- [User Service](user-service.md) - Primary user management with MongoDB
- [User Access Service](user-access-service.md) - User management with dual ID system
- [User API](user-api.md) - User service API definitions
- [Login Service](login-service.md) - Authentication service
- [User Authentication Flow](user-auth-flow.md) - Complete user authentication flow

### Data Services
- [File Service](file-service.md) - File management service
- [File Service API](file-service-api.md) - API for file service
- [Upload Service](upload-service.md) - File upload service
- [Export Service](export-service.md) - Data export service
- [Note Service](note-service.md) - Notes management with MongoDB
- [Shrapnel Data](shrapnel-data.md) - Data management service

### Security & Authentication
- [Token-Based Authentication Integration](token-auth-integration.md) - Token-based authentication documentation
- [Broker Security Patterns](broker-security.md) - Security patterns for broker-based services

## Part III: Alternative JVM Implementations

### Quarkus Services
- [Broker Gateway Quarkus](broker-gateway-quarkus.md) - Quarkus implementation of broker gateway
- [Host Server Integration](broker-gateway-quarkus-host-integration.md) - Polyglot service registration example

### Helidon Services
- [Helidon Services Overview](helidon-services-overview.md) - Overview of Helidon-based services
- [Helidon Satellite Service](helidon-satellite.md) - Helidon satellite service

## Part IV: Node.js Services

### Core Node Services
- [Node.js Services Overview](node-services-overview.md) - Overview of all Node.js services
- [Broker Service Proxy](broker-service-proxy.md) - TypeScript proxy for broker gateway
- [File System Server](file-system-server.md) - File system server implementation
- [Moleculer Search Service](moleculer-search.md) - Moleculer-based search service
- [Image Server](image-server.md) - Image serving and processing

## Part V: Python Services

### Python Services
- [Python Services Overview](python-services-overview.md) - Overview of all Python services
- [FS Crawler](fs-crawler.md) - File system crawler and media metadata service
- [FS Crawler Adapter](fs-crawler-adapter.md) - Broker adapter example

## Part VI: Go Services

### Go Services
- [Go Services Overview](go-services-overview.md) - Overview of all Go services
- [Project Manager Service](go-projman.md) - Go-based project management service

## Part VII: Web Applications

### Angular Applications
- [Angular Atomic Admin](angular-atomic-admin.md) - Admin dashboard for managing servers and services
- [Angular Cool People Admin](angular-cool-people-admin.md) - Admin dashboard for Cool People
- [Angular Cool People Backend Requirements](angular-cool-people-backend-requirements.md) - Backend requirements
- [Angular Throttler](angular-throttler.md) - Angular throttler application

### Next.js Applications
- [Next.js API Tester](nextjs-api-tester.md) - API testing utility
- [Next.js Cool People](nextjs-cool-people.md) - Social application
- [Next.js Log Watch](nextjs-log-watch.md) - Real-time log monitoring

### React Applications
- [React Crypto API Tester](react-crypto-api-tester.md) - Cryptocurrency API testing tool

### Other Web Applications
- [Google Custom Search App](google-custom-search-app.md) - Custom search implementation
- [Google Cloud Search Assistant](google-cloud-search-assistant.md) - Assistant for Google Cloud Search

## Part VIII: Development & Operations

### Getting Started
- [Getting Started with Search](GETTING_STARTED_SEARCH.md) - Search service setup and usage

### Configuration & Setup
- [Environment Management](env-management.md) - Environment configuration guide
- [Spring Profiles Guide](spring-profiles-guide.md) - Spring Boot profiles documentation
- [Angular Throttler Setup](angular-throttler-setup.md) - Setup guide for Angular Throttler

### Troubleshooting
- [CORS Troubleshooting](cors-troubleshooting.md) - CORS configuration and troubleshooting
- [Health Checks](health-checks.md) - Health check implementation guide

### Utilities
- [Bash Utilities](bash-utilities.md) - Bash scripts and utilities
- [PowerShell Utilities](pwsh-utilities.md) - PowerShell scripts and utilities

## Appendices

### Deployment
- [Docker Compose](../docker-compose.yml) - Docker configuration for the project
- [Makefile](../Makefile) - Build automation commands
- [Procfile](../Procfile) - Process type declarations for deployment

### Additional Resources
- [Architecture Diagrams](host-server-diagrams.md) - Visual architecture documentation
- [API Examples](host-server-api-examples.md) - Practical API usage examples
