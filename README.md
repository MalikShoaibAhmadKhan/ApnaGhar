<div align="center">

# 🏡 ApnaGhar - Real Estate Search Portal

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET 8" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  <strong>A modern, full-stack real estate platform for browsing, searching, and managing property listings</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

</div>

## ✨ Features

### 🌐 Public Access
- **Property Browsing** - Explore extensive property listings with rich media
- **Smart Search** - Real-time search with advanced filtering
- **Property Comparison** - Compare multiple properties side-by-side
- **Responsive Design** - Seamless experience across all devices

### 🔐 Authenticated Users
- **User Authentication** - Secure JWT-based authentication
- **Favorites Management** - Save and organize favorite properties
- **Recently Viewed** - Track your browsing history
- **Property Management** - Add, edit, and delete property listings

## 🚀 Quick Start

### 🐳 Docker Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/MalikShoaibAhmadKhan/ApnaGhar.git
cd ApnaGhar

# Start everything with Docker
./docker-start.sh    # Linux/macOS
docker-start.bat     # Windows
```

**Access the application:**
- 🌐 **Application**: http://localhost:3000
- 🗄️ **Database Admin**: http://localhost:8081
- 📡 **API**: http://localhost:5000

## 🛠 Tech Stack

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://techstack-generator.vercel.app/csharp-icon.svg" alt="C#" width="65" height="65" />
      <br>C#
    </td>
    <td align="center" width="96">
      <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="React" width="65" height="65" />
      <br>React
    </td>
    <td align="center" width="96">
      <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="MySQL" width="65" height="65" />
      <br>MySQL
    </td>
    <td align="center" width="96">
      <img src="https://techstack-generator.vercel.app/docker-icon.svg" alt="Docker" width="65" height="65" />
      <br>Docker
    </td>
  </tr>
</table>

### Backend
- **.NET 8 Web API** with Entity Framework Core
- **JWT Authentication** for secure access
- **Repository Pattern** for clean architecture
- **AutoMapper** for object mapping

### Frontend
- **React 19 + Vite** for fast development
- **Material-UI** for beautiful components
- **React Router** for navigation
- **Axios** for API communication

## 📦 Project Structure

```
ApnaGhar/
├── backend/
│   └── RealEstate.API/       # .NET Web API
├── frontend/
│   └── src/                  # React application
├── docker-compose.yml        # Docker configuration
└── README.md                 # Documentation
```

## 🔧 Manual Setup

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- Docker Desktop

### Database Setup
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Backend Setup
```bash
cd backend/RealEstate.API
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/{id}` - Get property by ID
- `POST /api/properties` - Create property (auth required)
- `PUT /api/properties/{id}` - Update property (auth required)
- `DELETE /api/properties/{id}` - Delete property (auth required)

### Favorites
- `GET /api/favorites` - Get user favorites (auth required)
- `POST /api/favorites/{id}` - Add to favorites (auth required)
- `DELETE /api/favorites/{id}` - Remove from favorites (auth required)

### Recently Viewed
- `GET /api/recentlyviewed` - Get recently viewed (auth required)
- `POST /api/recentlyviewed/{id}` - Record property view (auth required)

## 🧪 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@realestate.com | admin123 |
| User | user@realestate.com | user123 |

## 🚢 Deployment

### Production with Docker
```bash
docker-compose up --build -d
```

### Environment Variables
- `ASPNETCORE_ENVIRONMENT` - Set to Production
- `ConnectionStrings__DefaultConnection` - Database connection
- `Jwt__Key` - JWT secret key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Support

For issues and questions, please [open an issue](https://github.com/MalikShoaibAhmadKhan/ApnaGhar/issues) on GitHub.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/MalikShoaibAhmadKhan">Malik Shoaib Ahmad Khan</a></p>
</div>
