# Getting Started with Moleculer Search Service

This guide will help you set up and test the Google Simple Search integration.

## Prerequisites

1. **Google Custom Search API Key** - Get one from [Google Cloud Console](https://console.cloud.google.com/)
2. **Google Search Engine ID** - Create a custom search engine at [Programmable Search Engine](https://programmablesearchengine.google.com/)
3. **Node.js 18+** installed
4. **Java 17+** and Maven installed

## Quick Start

### Step 1: Configure Google API Credentials

Edit `node/moleculer-search/.env`:

```bash
GOOGLE_API_KEY=your_actual_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
SERVICE_REGISTRY_URL=http://localhost:8090/api/registry
SERVICE_PORT=4050
SERVICE_HOST=localhost
```

### Step 2: Start the Broker Gateway

```bash
cd spring/broker-gateway
./mvnw spring-boot:run
```

The broker-gateway (with integrated service-registry) will start on port 8080.

### Step 3: Start the Moleculer Search Service

```bash
cd node/moleculer-search
npm install
npm run dev
```

The service will:
- Start on port 4050
- Automatically register with broker-gateway using the broker protocol
- Send periodic heartbeats

### Step 4: Verify Registration

Check that the service registered successfully via the broker:

```bash
curl -X POST http://localhost:8080/api/broker/submitRequest \
  -H "Content-Type: application/json" \
  -d '{
    "service": "serviceRegistry",
    "operation": "getAllServices",
    "params": {}
  }'
```

You should see:

```json
{
  "data": [
    {
      "serviceName": "googleSearchService",
      "operations": ["simpleSearch"],
      "endpoint": "http://localhost:4050",
      "healthCheck": "http://localhost:4050/api/health",
      "status": "HEALTHY"
    }
  ]
}
```

### Step 5: Test the Search Service Directly

```bash
curl -X POST http://localhost:4050/api/search/simple \
  -H "Content-Type: application/json" \
  -d '{"query": "moleculer microservices"}'
```

### Step 6: Test Through the Broker

Now test the search through the broker gateway (this is how the Angular client will use it):

```bash
curl -X POST http://localhost:8080/api/broker/submitRequest \
  -H "Content-Type: application/json" \
  -d '{
    "service": "googleSearchService",
    "operation": "simpleSearch",
    "params": {
      "query": "spring boot microservices",
      "token": "test-token"
    }
  }'
```

## Architecture Flow

```
Angular Client
    ↓
Broker Gateway (8080) - includes service-registry component
    ↓ (queries internal registry)
    ↓ "Which service handles 'simpleSearch'?"
    ↓
Moleculer Search (4050) - Executes search
    ↓
Google Custom Search API
```

## Troubleshooting

### Service Not Registering

Check the Moleculer logs for registration errors:
```
Failed to register with Spring service registry: connect ECONNREFUSED
```

**Solution**: Make sure broker-gateway is running on port 8080.

### Google API Errors

```
Failed to perform search: Request failed with status code 403
```

**Solutions**:
- Verify your API key is correct
- Check that the Custom Search API is enabled in Google Cloud Console
- Ensure you haven't exceeded your daily quota (100 free searches/day)

### Health Check Failing

```bash
curl http://localhost:4050/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2025-01-16T...",
  "service": "moleculer-search"
}
```

## Next Steps

1. **Add More Search Providers**: Create `gemini-search.service.ts` or `unsplash-search.service.ts`
2. **Update Angular Client**: Modify `web/angular-throttler` to use the new search service
3. **Add Caching**: Implement Redis caching in the search service
4. **Add Rate Limiting**: Protect the Google API quota

## Docker Compose

To run everything with Docker:

```bash
# Set environment variables
export GOOGLE_API_KEY=your_key
export GOOGLE_SEARCH_ENGINE_ID=your_id

# Start all services
docker-compose up broker-gateway moleculer-search
```

## Development Tips

- Use `npm run dev` for hot-reload during development
- Check service registry via broker: POST to `/api/broker/submitRequest` with `service: "serviceRegistry", operation: "getAllServices"`
- Monitor Moleculer logs for service communication
- Use Moleculer REPL for debugging: `npm run cli`