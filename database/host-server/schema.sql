-- ============================================================================
-- Atomic Host Server Schema
-- Generated based on JSON configuration files
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Frameworks
-- Stores information about development frameworks (e.g., Spring Boot, NestJS)
-- ----------------------------------------------------------------------------
CREATE TABLE frameworks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- Format: LANGUAGE_FRAMEWORK (e.g., JAVA_SPRING)
    language VARCHAR(50) NOT NULL,
    version VARCHAR(50),
    url VARCHAR(255),
    supports_broker BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 2. Servers
-- Stores physical or virtual server infrastructure details
-- ----------------------------------------------------------------------------
CREATE TABLE servers (
    id SERIAL PRIMARY KEY,
    hostname VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL, -- PHYSICAL, VIRTUAL, CONTAINER, CLOUD
    environment VARCHAR(50) NOT NULL, -- DEVELOPMENT, STAGING, PRODUCTION
    operating_system VARCHAR(100),
    cpu_cores INTEGER,
    memory_mb INTEGER,
    disk_gb INTEGER,
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, MAINTENANCE
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 3. Services
-- Defines the microservices and their properties
-- ----------------------------------------------------------------------------
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    framework_id INTEGER REFERENCES frameworks(id),
    type VARCHAR(50) NOT NULL, -- REST_API, GATEWAY, etc.
    default_port INTEGER,
    api_base_path VARCHAR(255),
    repository_url VARCHAR(255),
    version VARCHAR(50),
    status VARCHAR(50) DEFAULT 'PLANNED', -- ACTIVE, DEPRECATED, ARCHIVED, PLANNED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. Service Dependencies
-- Manages many-to-many relationships between services
-- ----------------------------------------------------------------------------
CREATE TABLE service_dependencies (
    source_service_id INTEGER REFERENCES services(id),
    target_service_id INTEGER REFERENCES services(id),
    dependency_type VARCHAR(50) DEFAULT 'REQUIRED', -- REQUIRED, OPTIONAL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (source_service_id, target_service_id)
);

-- ----------------------------------------------------------------------------
-- 5. Deployments
-- Tracks instances of services running on servers
-- ----------------------------------------------------------------------------
CREATE TABLE deployments (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) NOT NULL,
    server_id INTEGER REFERENCES servers(id) NOT NULL,
    port INTEGER NOT NULL,
    version VARCHAR(50),
    status VARCHAR(50), -- RUNNING, STOPPED, FAILED, etc.
    environment VARCHAR(50) NOT NULL,
    health_check_url VARCHAR(255),
    health_status VARCHAR(50), -- HEALTHY, UNHEALTHY, DEGRADED
    deployment_path VARCHAR(255),
    started_at TIMESTAMP,
    last_health_check TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 6. Service Configurations
-- Environment-specific configurations for services
-- ----------------------------------------------------------------------------
CREATE TABLE service_configurations (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) NOT NULL,
    config_key VARCHAR(255) NOT NULL,
    config_value TEXT,
    environment VARCHAR(50) DEFAULT 'ALL', -- ALL, DEVELOPMENT, PRODUCTION, etc.
    type VARCHAR(50) DEFAULT 'STRING', -- STRING, NUMBER, BOOLEAN, URL, DATABASE_URL
    is_secret BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(service_id, config_key, environment)
);

-- Indexes for performance
CREATE INDEX idx_services_framework ON services(framework_id);
CREATE INDEX idx_deployments_service ON deployments(service_id);
CREATE INDEX idx_deployments_server ON deployments(server_id);
CREATE INDEX idx_service_configs_service ON service_configurations(service_id);
