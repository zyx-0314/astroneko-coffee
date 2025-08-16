@echo off
REM Start Docker Compose in watch mode for development

echo 🚀 Starting Astroneko Coffee development environment with watch mode...
echo This will:
echo   - Start PostgreSQL database
echo   - Start Spring Boot backend with hot reloading
echo   - Start Next.js frontend with hot reloading
echo   - Enable file watching for automatic updates
echo.

REM Check if Docker Compose is available
docker compose version 2>nul
if %errorlevel% neq 0 (
    echo ❌ Error: Docker Compose not found. Please install Docker Desktop.
    exit /b 1
)

echo 📋 Docker Compose version:
docker compose version
echo.

REM Try watch mode first, fallback to regular mode
echo 📦 Attempting to start with watch mode...
docker compose up --watch 2>nul

REM If watch mode fails, try regular mode
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Watch mode not supported, starting in regular development mode...
    echo 📦 Building and starting services...
    docker compose up --build
)

echo 🛑 Development environment stopped.
pause
