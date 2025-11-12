# Atomic Project Documentation Index

Welcome to the documentation index for the Atomic project. This file provides organized access to all documentation across the various subprojects.

## Core Documentation

- [README](README.md) - Main project overview
- [Projects Overview](projects.md) - List and description of all projects
- [License](LICENSE) - Project licensing information

## Main Documentation Files

- [User Service Architecture](docs/user-service-architecture.md) - Architecture overview of the user service
- [Nucleus Broker Service](docs/nucleus-broker-service.md) - Documentation for the nucleus broker service
- [Nucleus Broker Service Login](docs/nucleus-broker-service-login.md) - Login specific documentation for the broker service

## Web Projects

### Next.js Applications
- [Next.js Log Watch](web/nextjs-log-watch/README.md) - Real-time log monitoring application
- [Next.js Log Watch Documentation](web/nextjs-log-watch/docs/blueprint.md) - Technical blueprint for log watch
- [Next.js Cool People](web/nextjs-cool-people/README.md) - Social application for connecting with interesting people
- [Next.js Cool People Documentation](web/nextjs-cool-people/docs/blueprint.md) - Technical blueprint for cool people app
- [Next.js API Tester](web/nextjs-api-tester/README.md) - API testing utility
- [Next.js API Tester Documentation](web/nextjs-api-tester/docs/blueprint.md) - Technical blueprint for API tester

### Other Web Applications
- [Google Custom Search App](web/google-custom-search-app/README.md) - Custom search implementation
- [Google Cloud Search Assistant](web/google-cloud-search-assistant/README.md) - Assistant for Google Cloud Search
- [React Cripto API Tester](web/react-cripto-api-tester/README.md) - Cryptocurrency API testing tool
- [PowerShell Web Tool](web/pwsh/README.md) - PowerShell utilities for web
- [Bash Web Utilities](web/bash/README.md) - Bash utilities for web

### Web POC (Proof of Concept)
- [React App POC](web-poc/react-app/README.md) - React application proof of concept

## Node.js Projects

- [Node.js README](node/README.md) - Overview of Node.js projects
- [Broker Service Proxy](node/broker-service-proxy/README.md) - Proxy service for broker communications

## Spring Boot Projects

### Core Services
- [Spring README](spring/README.md) - Overview of Spring projects
- [User Service](spring/user-service/README.md) - User management service
- [User API](spring/user-api/README.md) - API for user management
- [User Access Service](spring/user-access-service/README.md) - Access control service
- [Login Service](spring/login-service/README.md) - Authentication service
- [Upload Service](spring/upload-service/README.md) - File upload service
- [Export Service](spring/export-service/README.md) - Data export service
- [File Service](spring/file-service/README.md) - File management service
- [File Service API](spring/file-service-api/README.md) - API for file service

### Authentication & Security Documentation
- [Token-Based Authentication Integration](docs/token-auth-integration.md) - Documentation for token-based authentication between file-service and login-service
- [User Authentication Flow](docs/user-auth-flow.md) - Complete user authentication flow documentation
- [Broker Security Patterns](docs/broker-security.md) - Security patterns for broker-based services

### Broker Services
- [Broker Service](spring/broker-service/README.md) - Main broker service
- [Broker Service API](spring/broker-service-api/README.md) - API for broker service
- [Broker Service SPI](spring/broker-service-spi/README.md) - Service Provider Interface for broker service
- [Broker Gateway](spring/broker-gateway/README.md) - Gateway for broker communications
- [Broker Gateway Security Bot](spring/broker-gateway-sec-bot/README.md) - Security bot for gateway
- [Broker Gateway Security Bot Additional](spring/broker-gateway-sec-bot/README-2.md) - Additional security bot documentation

### Data Services
- [Shrapnel Data](spring/shrapnel-data/README.md) - Data management service

## Utility Projects

### Bash Scripts
- [Bash README](bash/README.md) - Documentation for bash utilities

### Scripts
- [Scripts Folder](scripts/) - Various utility scripts (no documentation file found)

## Other Resources

### Environment Setup
- [Docker Compose](docker-compose.yml) - Docker configuration for the project
- [Clean Install Script](clean-install.sh) - Script to clean and install the project
- [MongoDB Docker Start (Linux)](mongodb-docker-start.sh) - Script to start MongoDB with Docker
- [MongoDB Docker Start (Windows)](mongodb-docker-start.bat) - Windows batch script for MongoDB
- [MySQL Start Script](start-mysql.sh) - Script to start MySQL

### Development Tools
- [Package.json](package.json) - Node.js package configuration
- [Makefile](Makefile) - Build automation commands
- [Procfile](Procfile) - Process type declarations for deployment