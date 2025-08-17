@echo off
REM Start Astroneko Coffee in development mode

echo 🚀 Starting Astroneko Coffee (Development Mode)
echo ===============================================
echo This will start:
echo   🗄️  PostgreSQL database (port 5434)
echo   ☕ Spring Boot backend (port 8083) 
echo   🌐 Next.js frontend (port 3001)
echo   📖 API docs available at: http://localhost:8083/swagger-ui.html
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo ✅ Docker is running
echo 📦 Building and starting development services...
echo.

docker compose up --build

echo.
echo 🛑 Development environment stopped.
pause
