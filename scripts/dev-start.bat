@echo off
REM Start Docker Compose for development (without watch)

echo 🚀 Starting Astroneko Coffee development environment...
echo This will:
echo   - Start PostgreSQL database
echo   - Start Spring Boot backend
echo   - Start Next.js frontend
echo.

echo 📦 Building and starting services...
docker compose up --build

echo 🛑 Development environment stopped.
pause
