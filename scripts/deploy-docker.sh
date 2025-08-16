#!/bin/bash

# Astroneko Coffee Docker Deployment Script

echo "🚀 Starting Astroneko Coffee Docker Deployment"
echo "============================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

print_status "Docker is running"

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not available. Please install Docker Compose and try again."
    exit 1
fi

print_status "Docker Compose is available"

# Stop and remove existing containers
echo -e "\n${YELLOW}📦 Stopping existing containers...${NC}"
docker compose down --remove-orphans

# Build and start services
echo -e "\n${YELLOW}🔨 Building and starting services...${NC}"
docker compose up --build -d

# Wait for services to be healthy
echo -e "\n${YELLOW}⏳ Waiting for services to be healthy...${NC}"

# Function to wait for service health
wait_for_service() {
    local service=$1
    local timeout=120
    local count=0
    
    while [ $count -lt $timeout ]; do
        if docker compose ps | grep "$service" | grep -q "healthy"; then
            print_status "$service is healthy"
            return 0
        fi
        
        if [ $((count % 10)) -eq 0 ]; then
            echo -e "${YELLOW}Waiting for $service to be healthy... (${count}s/${timeout}s)${NC}"
        fi
        
        sleep 1
        count=$((count + 1))
    done
    
    print_error "$service failed to become healthy within $timeout seconds"
    return 1
}

# Wait for each service
wait_for_service "postgres" || exit 1
wait_for_service "backend" || exit 1
wait_for_service "frontend" || exit 1

# Show service status
echo -e "\n${GREEN}📊 Service Status:${NC}"
docker compose ps

# Show service URLs
echo -e "\n${GREEN}🌐 Service URLs:${NC}"
echo "Frontend: http://localhost:3001"
echo "Backend API: http://localhost:8083"
echo "Swagger UI: http://localhost:8083/swagger-ui/index.html"
echo "Database: localhost:5434 (user: astro, password: astro123, db: astroneko_dev)"

# Show logs command
echo -e "\n${YELLOW}📋 To view logs, run:${NC}"
echo "docker compose logs -f [service_name]"
echo "Services: postgres, backend, frontend"

echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
echo "Your Astroneko Coffee application is now running in Docker containers."
