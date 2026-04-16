# 🚀 Sudhanshu Kumar - Portfolio

A modern, responsive portfolio website showcasing my projects, skills, and mobile applications. Built with React and deployed on Vercel.

## 🌐 Live Demo

**Portfolio Website**: [https://portfolio-sand-delta-56anb24ojn.vercel.app/](https://portfolio-sand-delta-56anb24ojn.vercel.app/)

## 📱 Featured Mobile Applications

### MusiqFlow - Advanced Music Streaming Platform
- **Description**: Cross-platform PWA with YouTube integration, real-time lyrics, and smart recommendations
- **Tech Stack**: Capacitor, JavaScript, Node.js, YouTube API, PWA
- **Features**: 
  - 🎵 High-quality music streaming
  - 📝 Real-time synced lyrics
  - 🔄 Background playback
  - 📱 Cross-platform support
  - 🎯 Smart recommendations

### MusiqFlow Lite - Native Android Music Player
- **Repository**: [sudhansh296/musiqflow-lite](https://github.com/sudhansh296/musiqflow-lite)
- **Description**: Native Android music player built with Kotlin and Jetpack Compose
- **Tech Stack**: Kotlin, Jetpack Compose, Media3, MVVM, Coroutines
- **Features**:
  - ⚡ Native Android performance
  - 🎨 Material Design 3
  - 🔔 Notification controls
  - 🔋 Optimized battery usage
  - 🎵 Background service

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM
- **Styling**: CSS3 with custom properties
- **Animations**: Framer Motion
- **Icons**: Font Awesome
- **Build Tool**: Create React App

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (JSON-based storage)
- **Authentication**: JWT + bcrypt
- **Email**: EmailJS integration

### Deployment
- **Platform**: Vercel
- **CI/CD**: GitHub Actions
- **Domain**: Custom Vercel domain

## 🎨 Features

### 🏠 Homepage
- Modern hero section with animated background
- Skills showcase with interactive elements
- Project grid with filtering capabilities
- Mobile apps portfolio section
- Contact form with EmailJS integration

### 📱 Mobile Apps Section
- Dedicated mobile applications showcase
- Interactive phone mockups
- Download and share functionality
- Responsive design for all devices
- Professional app descriptions

### 🎯 Projects Section
- Dynamic project loading from API
- Category-based filtering (Web, Mobile, Desktop, AI/ML)
- Interactive project cards with hover effects
- Modal view for detailed project information
- GitHub and live demo links

### 👨‍💼 Admin Panel
- Secure authentication system
- Project management (CRUD operations)
- User analytics and statistics
- Popup configuration management
- Real-time data updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudhansh296/Portfolio.git
   cd Portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in backend directory:
   ```env
   JWT_SECRET=your_jwt_secret_here
   ADMIN_PASSWORD=your_admin_password
   PORT=5000
   ```

5. **Start development servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Portfolio/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── images/          # Project and app screenshots
│   │   └── downloads/       # APK files for mobile apps
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── MusiqFlowSection.jsx
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── MobileApps.jsx
│   │   ├── api.js           # API configuration
│   │   └── App.jsx          # Main app component
│   └── package.json
├── backend/                 # Node.js backend
│   ├── server.js           # Express server
│   ├── routes/             # API routes
│   └── package.json
├── musiqflow-android/      # MusiqFlow Capacitor app
├── musiqflow-native/       # MusiqFlow Native (Kotlin)
├── .github/
│   └── workflows/          # GitHub Actions
├── vercel.json            # Vercel deployment config
└── README.md
```

## 🎯 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/popup-config` - Get popup configuration
- `POST /api/signup` - User registration
- `POST /api/login` - User authentication

### Admin Endpoints (Protected)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/popup-config` - Update popup config
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 🎨 Design Features

### 🌙 Dark/Light Theme
- Toggle between dark and light modes
- Persistent theme preference
- Smooth transitions

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

### ⚡ Performance
- Lazy loading for images
- Code splitting
- Optimized bundle size
- Fast loading times

### 🎭 Animations
- Smooth page transitions
- Hover effects on interactive elements
- Loading animations
- Scroll-triggered animations

## 🔧 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/build`
3. Set environment variables in Vercel dashboard
4. Deploy automatically on git push

### Manual Deployment
```bash
# Build frontend
cd frontend
npm run build

# Deploy to Vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sudhanshu Kumar**
- GitHub: [@sudhansh296](https://github.com/sudhansh296)
- Portfolio: [https://portfolio-sand-delta-56anb24ojn.vercel.app/](https://portfolio-sand-delta-56anb24ojn.vercel.app/)
- Email: [Contact through portfolio](https://portfolio-sand-delta-56anb24ojn.vercel.app/#contact)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vercel for seamless deployment
- Font Awesome for beautiful icons
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**

📱 **Check out my mobile apps:**
- [MusiqFlow Lite](https://github.com/sudhansh296/musiqflow-lite) - Native Android Music Player
- MusiqFlow - Advanced Music Streaming Platform (this repository)

🚀 **Live Portfolio**: [https://portfolio-sand-delta-56anb24ojn.vercel.app/](https://portfolio-sand-delta-56anb24ojn.vercel.app/)