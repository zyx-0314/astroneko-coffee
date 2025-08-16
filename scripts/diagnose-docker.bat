@echo off
echo 🔧 Astroneko Coffee Docker Troubleshooting Script
echo.

echo 📋 Step 1: Checking Docker Installation...
docker --version
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not in PATH
    exit /b 1
)

docker compose version
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not available
    exit /b 1
)

echo ✅ Docker and Docker Compose are available
echo.

echo 📋 Step 2: Checking project structure...


if not exist "backend\Dockerfile.dev" (
    echo ❌ backend\Dockerfile.dev not found
    exit /b 1
)



if not exist "frontend\Dockerfile.dev" (
    echo ❌ frontend\Dockerfile.dev not found
    exit /b 1
)

if not exist "compose.yml" (
    echo ❌ compose.yml not found
    exit /b 1
)



echo ✅ All required Docker files found
echo.

echo 📋 Step 3: Cleaning up any existing containers...
docker compose down --remove-orphans
docker system prune -f

echo ✅ Cleanup complete
echo.

echo 📋 Step 4: Testing basic development build...
echo Building backend development image...
docker build -f backend/Dockerfile.dev -t astroneko-backend-dev backend
if %errorlevel% neq 0 (
    echo ❌ Backend development build failed
    exit /b 1
)

echo Building frontend development image...
docker build -f frontend/Dockerfile.dev -t astroneko-frontend-dev frontend
if %errorlevel% neq 0 (
    echo ❌ Frontend development build failed
    exit /b 1
)

echo ✅ Development images built successfully
echo.

echo 📋 Step 5: Starting services...
echo Starting development environment...
docker compose up -d

if %errorlevel% neq 0 (
    echo ❌ Failed to start services
    echo.
    echo 📊 Container status:
    docker compose ps
    echo.
    echo 📋 Logs:
    docker compose logs --tail=20
    exit /b 1
)

echo ✅ Services started successfully
echo.

echo 📋 Step 6: Checking service health...
timeout /t 30 >nul

echo 📊 Container status:
docker compose ps

echo.
echo 📋 Service logs (last 10 lines each):
echo === PostgreSQL ===
docker compose logs postgres --tail=10

echo.
echo === Backend ===
docker compose logs backend --tail=10

echo.
echo === Frontend ===
docker compose logs frontend --tail=10

echo.
echo 🌐 Access URLs:
echo   - Frontend: http://localhost:3001
echo   - Backend:  http://localhost:8083/swagger-ui.html
echo   - Database: localhost:5434 (user: astro, password: astro123, db: astroneko_dev)
echo.

echo 📝 Next steps:
echo   - Test frontend: http://localhost:3001
echo   - Test backend health: http://localhost:8083/actuator/health
echo   - Test API docs: http://localhost:8083/swagger-ui.html
echo.

echo 🛑 To stop services: docker compose down
pause
