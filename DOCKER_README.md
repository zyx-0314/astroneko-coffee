# Docker Setup for Astroneko Coffee

## Development Mode Only

This project now uses a simplified development-only Docker setup for easier maintenance and faster development cycles.

## Quick Start

### Option 1: Automatic Diagnosis and Setup
```bash
# Run the diagnostic script to check and fix common issues
./scripts/diagnose-docker.bat
```

### Option 2: Manual Development Setup
```bash
# Start basic development environment
./scripts/dev-start.bat

# OR start with watch mode (if supported)
./scripts/dev-watch.bat
```

## Access URLs
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8083/swagger-ui.html
- **Backend Health**: http://localhost:8083/actuator/health
- **Database**: localhost:5434 (user: astro, password: astro123, db: astroneko_dev)

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3001, 8083, and 5434 are available
2. **Docker not running**: Start Docker Desktop
3. **Build failures**: Run `docker system prune -f` to clean up

### Manual Commands

```bash
# Stop all services
docker compose down

# Rebuild and start
docker compose up --build

# View logs
docker compose logs [service_name]

# Check container status
docker compose ps

# Start with watch mode
docker compose up --watch
```

### File Watching (Development)

The watch mode automatically syncs code changes to containers:
- **Frontend**: All source files sync instantly with hot reload
- **Backend**: Java source files sync with Spring DevTools auto-restart
- **Config changes**: Trigger container rebuilds when needed

### Development Features

- **Hot Reloading**: Both frontend and backend support hot reloading
- **Debug Port**: Backend debug port 5005 available for IDE debugging
- **SQL Logging**: Spring JPA shows SQL queries in development
- **Live Reload**: Spring DevTools provides live reload capabilities
- **Optimized Builds**: Development Dockerfiles optimized for faster builds
