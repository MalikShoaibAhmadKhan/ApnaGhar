#!/bin/bash

API_BASE="http://localhost:5000/api"

echo "🧪 Testing Real Estate API Endpoints..."
echo "Make sure the backend is running on http://localhost:5000"
echo ""

# Test public endpoints
echo "📋 Testing public endpoints..."

echo "1. GET /api/properties"
curl -s -o /dev/null -w "Status: %{http_code}\n" "$API_BASE/properties"

echo "2. GET /api/properties/1"
curl -s -o /dev/null -w "Status: %{http_code}\n" "$API_BASE/properties/1"

# Test auth endpoints
echo ""
echo "🔐 Testing authentication endpoints..."

echo "3. POST /api/auth/register (test user)"
REGISTER_RESPONSE=$(curl -s -X POST "$API_BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  -w "Status: %{http_code}")
echo "$REGISTER_RESPONSE"

echo "4. POST /api/auth/login (test user)"
LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}')
echo "Login response received"

# Extract token (basic extraction, might need adjustment)
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$TOKEN" ]; then
    echo ""
    echo "🔑 Testing authenticated endpoints with token..."
    
    echo "5. GET /api/favorites"
    curl -s -o /dev/null -w "Status: %{http_code}\n" "$API_BASE/favorites" \
      -H "Authorization: Bearer $TOKEN"
    
    echo "6. POST /api/favorites/1 (add favorite)"
    curl -s -o /dev/null -w "Status: %{http_code}\n" -X POST "$API_BASE/favorites/1" \
      -H "Authorization: Bearer $TOKEN"
    
    echo "7. GET /api/recentlyviewed"
    curl -s -o /dev/null -w "Status: %{http_code}\n" "$API_BASE/recentlyviewed" \
      -H "Authorization: Bearer $TOKEN"
else
    echo "❌ Could not extract token from login response"
fi

echo ""
echo "✅ API testing complete!"
echo "Expected status codes:"
echo "  200 = Success"
echo "  201 = Created"
echo "  400 = Bad Request"
echo "  401 = Unauthorized"
echo "  404 = Not Found"