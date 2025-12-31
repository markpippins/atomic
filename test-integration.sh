#!/bin/bash

echo "🧪 Testing Angular Services Console + Node.js Backend Integration"
echo "============================================================"

# Function to check if server is running
check_server() {
    local port=$1
    local name=$2
    if curl -s "http://localhost:$port/health" > /dev/null 2>&1; then
        echo "✅ $name is running on port $port"
        return 0
    else
        echo "❌ $name is not running on port $port"
        return 1
    fi
}

echo "📋 Prerequisites Check:"
echo "1. Check if Node.js backend is running..."
check_server 3001 "Node.js Backend"

echo ""
echo "2. Check if Angular dev server is running..."
check_server 4200 "Angular Frontend"

echo ""
echo "🚀 Starting Services (if not running)..."

# Start Node.js backend if not running
if ! check_server 3001 "Node.js Backend" > /dev/null 2>&1; then
    echo "🔧 Starting Node.js backend..."
    cd node/services-console-backend
    npm install > /dev/null 2>&1
    npm run build > /dev/null 2>&1
    echo "📊 Creating database and schema..."
    mysql -u root -prootpass -e "CREATE DATABASE IF NOT EXISTS services_console;" 2>/dev/null || echo "Database already exists or connection failed"
    npm run db:push > /dev/null 2>&1
    npm run db:seed > /dev/null 2>&1
    npm run dev > /dev/null 2>&1 &
    BACKEND_PID=$!
    echo "📡 Backend started with PID: $BACKEND_PID"
    sleep 3
fi

echo ""
echo "🔗 API Connectivity Test:"
echo "Testing Node.js backend endpoints..."

API_BASE="http://localhost:3001/api"
ENDPOINTS=("health" "languages" "categories" "vendors" "services" "servers")

for endpoint in "${ENDPOINTS[@]}"; do
    if [ "$endpoint" = "health" ]; then
        URL="http://localhost:3001/health"
    else
        URL="$API_BASE/$endpoint"
    fi
    
    if curl -s "$URL" | grep -q '\['\|'status'; then
        echo "✅ GET /$endpoint - OK"
    else
        echo "❌ GET /$endpoint - FAILED"
    fi
done

echo ""
echo "📝 Integration Instructions:"
echo "1. Make sure MySQL is running with credentials: root/rootpass"
echo "2. Make sure Node.js backend is running on http://localhost:3001"
echo "3. Start Angular development server:"
echo "   cd web-poc/angular/services-console"
echo "   npm install"
echo "   npm run dev"
echo "3. Open http://localhost:4200 in your browser"
echo "4. The app should now load data from MySQL via the Node.js API"
echo ""
echo "🔍 What to verify:"
echo "- All navigation items show data from backend"
echo "- Create, Edit, Delete operations work"
echo "- No debug mode toggle (removed from UI)"
echo "- Backend status shows 'MySQL API' in top bar"

if [ ! -z "$BACKEND_PID" ]; then
    echo ""
    echo "💡 To stop the backend server: kill $BACKEND_PID"
fi

echo ""
echo "🎉 Integration setup complete!"