#!/bin/bash

echo "🚀 Setting up ApnaGhar Database..."

# Start Docker containers
echo "📦 Starting MySQL container..."
docker-compose up -d

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
sleep 10

# Navigate to backend directory
cd backend/RealEstate.API

# Check if dotnet-ef is installed
if ! command -v dotnet-ef &> /dev/null; then
    echo "🔧 Installing Entity Framework tools..."
    dotnet tool install --global dotnet-ef
fi

# Create migration if it doesn't exist
if [ ! -d "Migrations" ]; then
    echo "📝 Creating initial migration..."
    dotnet ef migrations add InitialCreate
fi

# Update database
echo "🗄️ Updating database..."
dotnet ef database update

echo "✅ Database setup complete!"
echo "🌐 You can access phpMyAdmin at: http://localhost:8081"
echo "   Username: realuser"
echo "   Password: password123"
echo ""
echo "🚀 To start the application:"
echo "   Backend: cd backend/RealEstate.API && dotnet run"
echo "   Frontend: cd frontend && npm install && npm run dev"