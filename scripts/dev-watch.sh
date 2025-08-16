#!/bin/bash

# Start Docker Compose in watch mode for development

echo "🚀 Starting Astroneko Coffee development environment with watch mode..."
echo "This will:"
echo "  - Start PostgreSQL database"
echo "  - Start Spring Boot backend with hot reloading"
echo "  - Start Next.js frontend with hot reloading"
echo "  - Enable file watching for automatic updates"
echo ""

# Check if Docker Compose supports watch
if ! docker compose version | grep -q "v2.2"; then
    echo "⚠️  Warning: Docker Compose watch requires version 2.22+. Please update Docker Compose."
    echo "You can still run without watch mode using: docker compose -f compose.yml -f compose.dev.yml up"
    exit 1
fi

echo "📦 Building and starting services with watch mode..."
docker compose -f compose.yml -f compose.dev.yml up --watch

echo "🛑 Development environment stopped."
