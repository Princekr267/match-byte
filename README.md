# 🎮 MatchByte — AI-Powered Recommendation Engine

<div align="center">

![MatchByte Banner](https://img.shields.io/badge/MatchByte-Cyberpunk_Recommender-00f0ff?style=for-the-badge&logo=react)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A retro-futuristic, Tinder-style swipe interface for discovering food and movies**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Recommendation Algorithm](#-recommendation-algorithm)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**MatchByte** is a modern recommendation system built for **Engi Prix 2026** that solves the universal problem of group indecision. Using an intuitive swipe-based interface inspired by dating apps, it helps users quickly decide what to eat or watch.

### Problem Statement
> *"Build a decision-making app for groups who struggle to decide what to eat or watch. Transform everyday indecision into a fun, swipe-based experience by combining simple logic with familiar UI patterns users already trust."*

### Solution
MatchByte uses **tag-based matching algorithms** combined with a **cyberpunk-themed UI** to make recommendations feel like a game. Users can:
- 🍔 **Browse food** from TheMealDB API with real-time search
- 🎬 **Discover movies** from a curated database with genre matching
- ✅ **Save preferences** (authenticated users) or use guest mode
- 📊 **Track history** and get personalized recommendations

---

## ✨ Features

### Core Functionality
- **🎯 Smart Recommendations**
  - Tag-based matching algorithm
  - Personalized suggestions based on user preferences
  - Hybrid mode: Works for both authenticated users and guests

- **💳 Card-Based Swiping**
  - Tinder-style swipe interface
  - Keyboard shortcuts (`←` Nah, `→` Yeah, `Z` Undo)
  - Smooth animations with Framer Motion
  - Real-time progress tracking

- **🔐 User Authentication**
  - JWT-based secure login/signup
  - Guest mode for instant access
  - Persistent user preferences in MongoDB

- **🔍 Real-Time Search**
  - Debounced search with instant results
  - Integration with TheMealDB API
  - Local movie database with fuzzy matching

- **🎨 Cyberpunk UI**
  - Retro-futuristic design with neon accents
  - Animated particles background
  - CRT scanline effects
  - Custom sound effects using Web Audio API

### Advanced Features
- **📊 Statistics Dashboard** — Track sessions, swipes, and matches
- **🎉 Confetti Celebrations** — Visual feedback on successful matches
- **📱 Responsive Design** — Works seamlessly on mobile and desktop
- **🔊 Audio Feedback** — Retro chiptune sound effects
- **💾 Local Storage** — Guest preferences saved locally

---

## 🎥 Demo

### Screenshots

<div align="center">

| Landing Screen | Card Swipe | Results |
|:---:|:---:|:---:|
| ![Landing](https://via.placeholder.com/250x150/050510/00f0ff?text=Landing+Screen) | ![Swipe](https://via.placeholder.com/250x150/050510/ff2d95?text=Swipe+Cards) | ![Results](https://via.placeholder.com/250x150/050510/39ff14?text=Your+Matches) |

</div>

### Live Demo
🚀 **[Try MatchByte Live](#)** *(Coming Soon)*

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19.2** | UI framework with latest features |
| **Framer Motion** | Smooth animations and gestures |
| **Canvas Confetti** | Celebration effects |
| **Vite** | Fast build tool and dev server |
| **Web Audio API** | Custom sound effects |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | RESTful API server |
| **MongoDB + Mongoose** | User data and preferences |
| **JWT** | Secure authentication |
| **bcrypt.js** | Password hashing |

### External APIs
- **TheMealDB** — Food data and search
- **Custom Movie Database** — Curated movie collection

---

## 📁 Project Structure

```
matchbyte/
├── react-app/                # Frontend React Application
│   ├── src/
│   │   ├── screens/          # Main app screens
│   │   │   ├── LandingScreen.jsx
│   │   │   ├── AuthScreen.jsx
│   │   │   ├── FeedScreen.jsx
│   │   │   ├── CardScreen.jsx
│   │   │   ├── SearchScreen.jsx
│   │   │   └── ResultsScreen.jsx
│   │   ├── components/       # Reusable components
│   │   │   ├── ParticlesBg.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── LoadingSkeleton.jsx
│   │   ├── App.jsx           # Main app logic
│   │   ├── api.js            # API client functions
│   │   ├── data.js           # Static data and helpers
│   │   ├── store.js          # LocalStorage utilities
│   │   ├── sfx.js            # Sound effects
│   │   └── index.css         # Cyberpunk styling
│   └── package.json
│
├── server/                   # Backend Node.js Server
│   ├── routes/
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── search.js         # Search endpoints
│   │   ├── preferences.js    # User preference management
│   │   └── recommend.js      # Recommendation engine
│   ├── models/
│   │   └── User.js           # MongoDB user schema
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   ├── data/
│   │   └── movies.js         # Movie database
│   ├── index.js              # Server entry point
│   └── package.json
│
└── README.md                 # You are here!
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** >= 18.0.0
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/matchbyte.git
cd matchbyte
```

### Step 2: Install Dependencies

#### Frontend
```bash
cd react-app
npm install
```

#### Backend
```bash
cd ../server
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/matchbyte
# OR use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/matchbyte

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
```

### Step 4: Start Development Servers

#### Terminal 1 — Backend
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

#### Terminal 2 — Frontend
```bash
cd react-app
npm run dev
# Frontend runs on http://localhost:5173
```

### Step 5: Open Browser
Navigate to **http://localhost:5173** and start swiping! 🎉

---

## ⚙️ Configuration

### Frontend Configuration
Edit `react-app/src/api.js` to change the API base URL:
```javascript
const API_BASE = 'http://localhost:5000/api';
```

### Backend Configuration
Key environment variables in `server/.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGO_URI` | MongoDB connection string | localhost:27017 |
| `JWT_SECRET` | Secret key for JWT tokens | *Required* |

---

## 📖 Usage

### 1️⃣ Choose Your Mode
Select **Food** 🍔 or **Movies** 🎬 from the landing screen.

### 2️⃣ Browse Recommendations
- **Logged In:** Get personalized recommendations based on your saved preferences
- **Guest Mode:** Get popular items or search manually

### 3️⃣ Swipe to Decide
- **Swipe Right / Click ♥** → Save to your picks
- **Swipe Left / Click ✖** → Pass
- **Press Z** → Undo last action

### 4️⃣ View Your Matches
See all items you liked and share your results!

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `→` or `L` | Like current item |
| `←` or `H` | Pass on current item |
| `Z` or `U` | Undo last swipe |

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### `POST /auth/signup`
Create a new user account.

**Request:**
```json
{
  "username": "neonrider",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "neonrider",
    "preferences": {
      "movieGenres": [],
      "foodCategories": []
    }
  }
}
```

#### `POST /auth/login`
Authenticate existing user.

**Request:**
```json
{
  "username": "neonrider",
  "password": "securepass123"
}
```

**Response:** Same as signup.

---

### Search Endpoints

#### `GET /search/food?q=pizza`
Search for food items.

**Response:**
```json
{
  "results": [
    {
      "id": "52772",
      "name": "Margherita Pizza",
      "image": "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      "category": "Pizza",
      "area": "Italian",
      "tags": ["pizza", "italian"]
    }
  ]
}
```

#### `GET /search/movies?q=inception`
Search for movies in the database.

**Response:**
```json
{
  "results": [
    {
      "id": 1,
      "title": "Inception",
      "genres": ["sci-fi", "thriller", "action"],
      "poster": "https://example.com/inception.jpg",
      "rating": 8.8
    }
  ]
}
```

---

### Preferences Endpoints

#### `POST /preferences/like-movie`
Save a movie preference (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "id": 1,
  "title": "Inception",
  "genres": ["sci-fi", "thriller"],
  "poster": "https://example.com/poster.jpg"
}
```

**Response:**
```json
{
  "message": "Movie preference saved",
  "preferences": {
    "movieGenres": ["sci-fi", "thriller"],
    "likedMovies": [...]
  }
}
```

#### `POST /preferences/like-food`
Save a food preference (requires authentication).

---

### Recommendation Endpoints

#### `GET /recommend/movies`
Get movie recommendations.

**Authenticated Request:**
```
GET /recommend/movies
Authorization: Bearer <token>
```

**Guest Request:**
```
GET /recommend/movies?genres=action,sci-fi&liked=1,5,10
```

**Response:**
```json
{
  "recommendations": [
    {
      "id": 2,
      "title": "The Dark Knight",
      "genres": ["action", "thriller"],
      "matchScore": 2,
      "matchReason": "You like action"
    }
  ],
  "source": "personalized",
  "basedOn": ["action", "sci-fi"]
}
```

#### `GET /recommend/food`
Get food recommendations (works similarly to movies).

---

## 🧠 Recommendation Algorithm

### Tag-Based Matching
MatchByte uses a simple but effective **tag intersection algorithm**:

```javascript
function scoreItems(items, userPreferences) {
  return items.map(item => {
    const matchScore = item.tags.filter(tag => 
      userPreferences.includes(tag)
    ).length;
    
    return {
      ...item,
      matchScore,
      matchPercentage: (matchScore / userPreferences.length) * 100
    };
  })
  .filter(item => item.matchScore > 0)
  .sort((a, b) => b.matchScore - a.matchScore);
}
```

### How It Works

1. **User Preferences Collection**
   - For authenticated users: stored in MongoDB
   - For guests: stored in localStorage

2. **Preference Learning**
   - When user likes an item, extract its tags/genres
   - Add to user's preference profile

3. **Matching Process**
   - Count overlapping tags between items and user preferences
   - Rank items by match score
   - Return top 20 recommendations

4. **Hybrid Mode**
   - Authenticated: Use database preferences
   - Guest: Use URL query parameters or local storage

### Example
```
User Preferences: ["spicy", "cheap", "fast"]

Item A: ["spicy", "cheap", "fast", "mexican"]
→ Match Score: 3/3 = 100% ✅ Top Match

Item B: ["fast", "italian", "vegetarian"]
→ Match Score: 1/3 = 33%

Item C: ["expensive", "french", "gourmet"]
→ Match Score: 0/3 = 0% ❌ Filtered Out
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/matchbyte.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly

4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add collaborative voting mode"
   git commit -m "fix: resolve swipe animation glitch"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Contribution Ideas
- 🎨 New UI themes (dark mode, light mode)
- 🌐 Internationalization (i18n)
- 🎮 Multi-user voting mode
- 📊 Advanced analytics dashboard
- 🔗 Social sharing features
- 🎵 More sound effect packs

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 MatchByte Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

See [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgments

- **Engi Prix 2026** — For the problem statement and inspiration
- **TheMealDB** — For providing free food API
- **React Team** — For the amazing framework
- **Framer Motion** — For buttery-smooth animations
- **MongoDB** — For flexible data storage

---

## 📬 Contact & Support

- **GitHub Issues:** [Report bugs or request features](https://github.com/yourusername/matchbyte/issues)
- **Email:** support@matchbyte.dev
- **Twitter:** [@MatchByteApp](https://twitter.com/matchbyteapp)

---

<div align="center">

**Made with ❤️ and ⚡ by the MatchByte Team**

⭐ **Star this repo if you found it helpful!** ⭐

[⬆ Back to Top](#-matchbyte--ai-powered-recommendation-engine)

</div>
