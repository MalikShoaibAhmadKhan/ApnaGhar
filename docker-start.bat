@echo off
echo 🚀 Starting Real Estate Portal with Docker...

REM Stop any existing containers
echo 🛑 Stopping existing containers...
docker compose down

REM Build and start all services
echo 🔨 Building and starting services...
docker compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 15 /nobreak > nul

REM Check service status
echo 📊 Service Status:
docker compose ps

REM Show logs for debugging
echo.
echo 📝 Recent logs:
docker compose logs --tail=20

echo.
echo ✅ Real Estate Portal is starting up!
echo.
echo 🌐 Access points:
echo    Frontend: http://localhost:3000
echo    Database Admin: http://localhost:8081
echo.
echo 📊 Monitor with:
echo    docker compose logs -f [service-name]
echo    docker compose ps
echo.
echo 🛑 Stop with:
echo    docker compose down

pause