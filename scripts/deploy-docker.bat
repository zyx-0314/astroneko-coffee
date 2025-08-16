@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting Astroneko Coffee Docker Deployment
echo =============================================

REM Check if Docker is running
docker info >nul 2>&1
if !errorlevel! neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    exit /b 1
)

echo ✅ Docker is running

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if !errorlevel! neq 0 (
    docker compose version >nul 2>&1
    if !errorlevel! neq 0 (
        echo ❌ Docker Compose is not available. Please install Docker Compose and try again.
        exit /b 1
    )
)

echo ✅ Docker Compose is available

REM Stop and remove existing containers
echo.
echo 📦 Stopping existing containers...
docker-compose down --remove-orphans

REM Build and start services
echo.
echo 🔨 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo.
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Show service status
echo.
echo 📊 Service Status:
docker-compose ps

REM Show service URLs
echo.
echo 🌐 Service URLs:
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8083
echo Swagger UI: http://localhost:8083/swagger-ui/index.html
echo Database: localhost:5435 (user: astro, password: astro123, db: astroneko)

REM Show logs command
echo.
echo 📋 To view logs, run:
echo docker-compose logs -f [service_name]
echo Services: postgres, backend, frontend

echo.
echo 🎉 Deployment completed successfully!
echo Your Astroneko Coffee application is now running in Docker containers.

pause
