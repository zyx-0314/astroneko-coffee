@echo off
REM Start Astroneko Coffee in development mode with hot-reload

echo 🚀 Starting Astroneko Coffee (Development + Hot Reload)
echo ========================================================
echo This will start with hot-reload enabled:
echo   🗄️  PostgreSQL database (port 5434)
echo   ☕ Spring Boot backend (port 8083) + hot-reload
echo   🌐 Next.js frontend (port 3001) + hot-reload  
echo   📁 File watching for automatic updates
echo   📖 API docs: http://localhost:8083/swagger-ui.html
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

REM Check if Docker Compose supports watch
docker compose version 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker Compose not found. Please install Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker is running
echo 📦 Starting development services with hot-reload...
echo.

REM Try watch mode first, fallback to regular mode
docker compose up --watch 2>nul

REM If watch mode fails, try regular mode
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Watch mode not supported, falling back to regular development mode...
    echo 📦 Building and starting services...
    docker compose up --build
)

echo 🛑 Development environment stopped.
pause
