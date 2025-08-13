@echo off
echo 🚀 Setting up ApnaGhar Database...

REM Start Docker containers
echo 📦 Starting MySQL container...
docker-compose up -d

REM Wait for MySQL to be ready
echo ⏳ Waiting for MySQL to be ready...
timeout /t 10 /nobreak > nul

REM Navigate to backend directory
cd backend\RealEstate.API

REM Check if dotnet-ef is installed
dotnet tool list --global | findstr "dotnet-ef" > nul
if errorlevel 1 (
    echo 🔧 Installing Entity Framework tools...
    dotnet tool install --global dotnet-ef
)

REM Create migration if it doesn't exist
if not exist "Migrations" (
    echo 📝 Creating initial migration...
    dotnet ef migrations add InitialCreate
)

REM Update database
echo 🗄️ Updating database...
dotnet ef database update

echo ✅ Database setup complete!
echo 🌐 You can access phpMyAdmin at: http://localhost:8081
echo    Username: realuser
echo    Password: password123
echo.
echo 🚀 To start the application:
echo    Backend: cd backend\RealEstate.API ^&^& dotnet run
echo    Frontend: cd frontend ^&^& npm install ^&^& npm run dev

pause