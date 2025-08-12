# Real Estate Search Portal

A full-stack web application for a real estate search portal where users can browse properties, save favorites, and manage their property searches.

## 🎯 Features

### Public Access
- Browse and search property listings
- Filter properties by price, bedrooms, suburb, and listing type (Sale/Rent)
- View detailed property information with images
- Responsive design with smooth animations

### Authenticated Users (Buyers)
- User registration and JWT-based authentication
- Save/unsave properties to favorites
- View saved properties list
- Track recently viewed properties
- Protected routes for authenticated features

## 🧱 Property Data Model

Each property includes:
- Title and description
- Address (city/suburb)
- Price (sale or rental)
- Listing type (Rent or Sale)
- Bedrooms, bathrooms, car spots
- Multiple image URLs
- Property specifications

## 🛠 Tech Stack

### Backend (.NET 8)
- **Framework:** ASP.NET Core Web API
- **Database:** MySQL with Entity Framework Core
- **Authentication:** JWT Bearer tokens
- **Architecture:** Clean layered architecture (Controllers → Services → Repositories)
- **Mapping:** AutoMapper for DTOs
- **Validation:** Data annotations

### Frontend (React)
- **Framework:** React 19 with Vite
- **Routing:** React Router DOM
- **UI Library:** Material-UI (MUI)
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **State Management:** React hooks and context

## 📦 Project Structure

```
├── backend/
│   └── RealEstate.API/
│       ├── Controllers/          # API endpoints
│       ├── DTOs/                # Data transfer objects
│       ├── Entities/            # Database models
│       ├── Data/                # DbContext and seed data
│       ├── Repositories/        # Data access layer
│       ├── Services/            # Business logic
│       ├── Interfaces/          # Contracts
│       └── Helpers/             # AutoMapper profiles
├── frontend/
│   └── src/
│       ├── components/          # Reusable UI components
│       ├── pages/              # Route components
│       ├── services/           # API service layer
│       ├── hooks/              # Custom React hooks
│       └── assets/             # Static assets
└── docker-compose.yml          # MySQL database setup
```

## 🚀 Setup and Installation

### 🐳 Docker Setup (Recommended)

The easiest way to run the entire application:

#### Prerequisites
- Docker Desktop or Docker Engine (20.10+)
- Docker Compose (2.0+)

#### Quick Start
```bash
# Linux/macOS
./docker-start.sh

# Windows
docker-start.bat

# Or manually
docker-compose up --build -d
```

#### Access Points
- **Application**: http://localhost:3000
- **Database Admin**: http://localhost:8081 (realuser/password123)

See [DOCKER_SETUP.md](DOCKER_SETUP.md) for detailed Docker instructions.

---

### 🛠️ Manual Setup (Development)

#### Prerequisites
- .NET 8 SDK
- Node.js (v18 or higher)
- Docker (for MySQL database)

#### Database Setup

1. **Start MySQL with Docker:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```
   This will start MySQL on port 3307 and phpMyAdmin on port 8081.

2. **Access phpMyAdmin (optional):**
   - URL: http://localhost:8081
   - Username: realuser
   - Password: password123

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend/RealEstate.API
   ```

2. **Install EF Core tools (if not already installed):**
   ```bash
   dotnet tool install --global dotnet-ef
   ```

3. **Create and run migrations:**
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. **Run the backend:**
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001` and `http://localhost:5000`

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Properties
- `GET /api/properties` - Get all properties (with optional filters)
- `GET /api/properties/{id}` - Get property by ID
- `POST /api/properties` - Create property (authenticated)
- `PUT /api/properties/{id}` - Update property (authenticated)
- `DELETE /api/properties/{id}` - Delete property (authenticated)

### Favorites
- `GET /api/favorites` - Get user's favorite properties (authenticated)
- `POST /api/favorites/{propertyId}` - Add property to favorites (authenticated)
- `DELETE /api/favorites/{propertyId}` - Remove property from favorites (authenticated)

### Recently Viewed
- `GET /api/recentlyviewed` - Get recently viewed properties (authenticated)
- `POST /api/recentlyviewed/{propertyId}` - Record property view (authenticated)

## 🎨 Features in Detail

### Property Search & Filtering
- Search by suburb/location
- Filter by price range (min/max)
- Filter by number of bedrooms
- Filter by listing type (Sale/Rent)
- Real-time search results

### User Authentication
- Secure JWT-based authentication
- Password hashing with HMACSHA512
- Token expiration handling
- Protected routes and API endpoints

### Favorites System
- Add/remove properties from favorites
- Persistent favorites storage
- Visual indicators for favorited properties
- Dedicated favorites page

### Recently Viewed
- Automatic tracking of viewed properties
- Chronological ordering
- Duplicate prevention with timestamp updates
- Limited to recent 10 properties

## 🔧 Configuration

### Backend Configuration (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3307;Database=RealEstateDb;User=realuser;Password=password123;"
  },
  "Jwt": {
    "Key": "YOUR_SECRET_KEY_HERE",
    "Issuer": "RealEstate.API",
    "Audience": "RealEstate.API"
  }
}
```

### Frontend Configuration (vite.config.js)
The frontend is configured to proxy API requests to the backend:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

## 🧪 Testing

### Test Users (Seeded Data)
- **Admin:** admin@realestate.com / admin123
- **User:** user@realestate.com / user123

### Sample Properties
The application includes seeded sample properties with various types:
- Downtown apartments
- Suburban family homes
- Luxury penthouses
- Studio apartments
- Rental properties

## 🚀 Deployment

### Production Considerations
1. **Security:**
   - Change JWT secret key
   - Use environment variables for sensitive data
   - Enable HTTPS
   - Implement rate limiting

2. **Database:**
   - Use production database connection
   - Enable connection pooling
   - Set up database backups

3. **Frontend:**
   - Build for production: `npm run build`
   - Configure proper API base URL
   - Enable compression and caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues:**
   - Ensure MySQL container is running
   - Check connection string in appsettings.json
   - Verify database exists and migrations are applied

2. **CORS Issues:**
   - Backend is configured to allow all origins in development
   - For production, configure specific allowed origins

3. **JWT Token Issues:**
   - Check token expiration
   - Verify JWT secret key configuration
   - Clear localStorage if tokens are corrupted

4. **Port Conflicts:**
   - Backend: Default ports 5000/5001
   - Frontend: Default port 5173
   - MySQL: Port 3307 (to avoid conflicts with local MySQL)
   - phpMyAdmin: Port 8081
