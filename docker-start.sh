#!/bin/bash

echo "🚀 Starting ApnaGhar with Docker..."

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose down

# Remove old images (optional - uncomment if you want to rebuild from scratch)
# echo "🗑️ Removing old images..."
# docker compose down --rmi all

# Build and start all services
echo "🔨 Building and starting services..."
docker compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 15

# Check service status
echo "📊 Service Status:"
docker compose ps

# Show logs for debugging (optional)
echo ""
echo "📝 Recent logs:"
docker compose logs --tail=20

echo ""
echo "✅ ApnaGhar is starting up!"
echo ""
echo "🌐 Access points:"
echo "   Frontend: http://localhost:3000"
echo "   Database Admin: http://localhost:8081"
echo ""
echo "📊 Monitor with:"
echo "   docker compose logs -f [service-name]"
echo "   docker compose ps"
echo ""
echo "🛑 Stop with:"
echo "   docker compose down"