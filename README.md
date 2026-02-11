# Match-Byte 🎬🍕

A full-stack personalized recommendation app that helps users discover movies and food based on their preferences. Built with React, Node.js/Express, and MongoDB.

## ✨ Features

- **User Authentication**: Secure signup/login with JWT tokens and bcrypt password hashing
- **Movie Recommendations**: Personalized movie suggestions based on genre preferences
- **Food Discovery**: Search and get recommendations for food from TheMealDB API
- **Preference Learning**: App learns from your likes to improve recommendations
- **Guest Mode**: Browse recommendations without creating an account
- **Interactive UI**: Swipe-style interface with smooth animations using Framer Motion
- **Real-time Updates**: Toast notifications for user actions

## 🏗️ Project Structure

```
match-byte/
├── server/               # Backend (Node.js/Express)
│   ├── routes/          # API routes
│   │   ├── auth.js      # Authentication endpoints
│   │   ├── search.js    # Search functionality
│   │   ├── preferences.js # User preference management
│   │   └── recommend.js # Recommendation engine
│   ├── models/          # MongoDB schemas
│   │   └── User.js      # User model with preferences
│   ├── middleware/      # Custom middleware (auth)
│   ├── data/           # Static data (movies)
│   └── index.js        # Server entry point
│
└── react-app/          # Frontend (React + Vite)
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── screens/     # Page-level components
    │   ├── assets/      # Images and static files
    │   ├── App.jsx      # Main app component
    │   ├── api.js       # API client
    │   ├── store.js     # State management
    │   └── sfx.js       # Sound effects and animations
    └── index.html
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Princekr267/match-byte.git
   cd match-byte
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Set up the frontend**
   ```bash
   cd ../react-app
   npm install
   ```

### Running the Application

#### Terminal 1 — Backend
```bash
cd server
node index.js
# Server runs on http://localhost:5000
```

#### Terminal 2 — Frontend
```bash
cd react-app
npm run dev
# App runs on http://localhost:5173
```

Visit `http://localhost:5173` in your browser to use the app.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login with existing credentials
- `GET /api/auth/me` - Get current user info (protected)

### Search
- `GET /api/search/food?q=pizza` - Search for food items
- `GET /api/search/movies?q=action` - Search for movies

### Recommendations
- `GET /api/recommend/movies` - Get personalized movie recommendations
- `GET /api/recommend/food` - Get personalized food recommendations

### Preferences
- `POST /api/preferences/like-movie` - Save a liked movie
- `POST /api/preferences/like-food` - Save a liked food item
- `DELETE /api/preferences/unlike-movie/:id` - Remove a liked movie
- `GET /api/preferences` - Get user preferences (protected)

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **React Toastify** - Toast notifications
- **Canvas Confetti** - Celebration effects

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### External APIs
- **TheMealDB API** - Food data and recipes

## 📝 Features in Detail

### Personalization Engine
- Learns from user's liked movies and food
- Tracks genre preferences for movies
- Remembers food categories and cuisine areas
- Provides both authenticated and guest recommendations

### User Preferences Schema
```javascript
{
  movieGenres: ["action", "sci-fi"],
  foodCategories: ["chicken", "dessert"],
  foodAreas: ["italian", "japanese"],
  likedMovies: [...],
  likedFoods: [...],
  searchHistory: [...]
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

A collaboration between:
- **Princekr267** - [@Princekr267](https://github.com/Princekr267)
- **codelawyer-max** - [@codelawyer-max](https://github.com/codelawyer-max)

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for the food API
- React and Vite teams for amazing tools
- All contributors who help improve this project

---

Made with ❤️ by Princekr267 & codelawyer-max