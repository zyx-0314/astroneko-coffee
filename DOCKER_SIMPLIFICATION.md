# Docker Simplification Summary

## Changes Made

### 1. Removed Production Mode
- Deleted production Dockerfiles (`backend/Dockerfile` and `frontend/Dockerfile`)
- Removed separate `compose.dev.yml` file
- Updated main `compose.yml` to be development-only

### 2. Updated Container Configuration
- **Container Names**: Added `_dev` suffix (e.g., `astroneko_postgres_dev`)
- **Database**: Changed to `astroneko_dev` database name
- **Ports**: 
  - Frontend: `3003` → `3001`
  - Database: `5435` → `5434`
- **Docker Images**: Now uses `Dockerfile.dev` for both services

### 3. Enhanced Development Features
- Added debug port `5005` for backend debugging
- Enabled Spring DevTools for hot reloading
- Added SQL query logging (`SPRING_JPA_SHOW_SQL: true`)
- Simplified watch mode configuration
- Disabled Next.js telemetry

### 4. Updated Scripts
- `dev-watch.bat/sh`: Now uses single `compose.yml`
- `dev-start.bat`: Simplified command structure
- `deploy-docker.bat/sh`: Updated for development-only mode
- `diagnose-docker.bat`: Removed production Dockerfile checks

### 5. Updated Documentation
- `DOCKER_README.md`: Focused on development-only setup
- `readme.md`: Added Docker as recommended installation method
- Updated all port references and service URLs

### 6. Simplified Command Structure
**Before:**
```bash
docker compose -f compose.yml -f compose.dev.yml up --watch
```

**After:**
```bash
docker compose up --watch
```

## Benefits

1. **Simpler Setup**: Single compose file eliminates configuration confusion
2. **Faster Development**: Development-optimized containers with hot reloading
3. **Easier Maintenance**: Less configuration files to maintain
4. **Better Developer Experience**: Enhanced debugging and logging capabilities
5. **Consistent Environment**: All developers use the same development setup

## Service URLs (New)

- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:8083
- **Database**: localhost:5434 (astroneko_dev)
- **Debug Port**: localhost:5005

## Usage

```bash
# Start development environment with watch mode
./scripts/dev-watch.bat

# Start development environment (basic)
./scripts/dev-start.bat

# Diagnose issues
./scripts/diagnose-docker.bat
```
