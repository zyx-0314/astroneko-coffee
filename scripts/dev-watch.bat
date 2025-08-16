@echo off
REM Start Docker Compose in watch mode for development

echo 🚀 Starting Astroneko Coffee development environment with watch mode...
echo This will:
echo   - Start PostgreSQL database
echo   - Start Spring Boot backend with hot reloading
echo   - Start Next.js frontend with hot reloading
echo   - Enable file watching for automatic updates
echo.

REM Check if Docker Compose supports watch
docker compose version | findstr "v2.2" >nul
if %errorlevel% neq 0 (
    echo ⚠️  Warning: Docker Compose watch requires version 2.22+. Please update Docker Compose.
    echo You can still run without watch mode using: docker compose -f compose.yml -f compose.dev.yml up
    exit /b 1
)

echo 📦 Building and starting services with watch mode...
docker compose -f compose.yml -f compose.dev.yml up --watch

echo 🛑 Development environment stopped.
pause
