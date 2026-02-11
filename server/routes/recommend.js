const router = require('express').Router();
const movies = require('../data/movies');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Optional auth: attaches user if token present, otherwise continues as guest
const optionalAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    req.user = null;
    return next(); // Guest — no token, just continue
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    req.user = user || null;
  } catch {
    req.user = null;
  }
  next();
};

// GET /api/recommend/movies 
// Supports Auth (User DB prefs) OR Guest (Query params: ?genres=action,sci-fi)
router.get('/movies', optionalAuth, async (req, res) => {
  try {
    let userGenres = [];
    let likedIds = [];

    if (req.user) {
      userGenres = req.user.preferences.movieGenres;
      likedIds = req.user.preferences.likedMovies.map(m => m.id);
    } else if (req.query.genres) {
      userGenres = req.query.genres.split(',');
      likedIds = (req.query.liked || '').split(',').map(Number);
    }

    if (userGenres.length === 0) {
      return res.json({ recommendations: movies.slice(0, 20), source: 'popular' });
    }

    const scored = movies
      .filter(m => !likedIds.includes(m.id))
      .map(m => {
        const matchCount = m.genres.filter(g => userGenres.includes(g.toLowerCase())).length;
        return { ...m, matchScore: matchCount };
      })
      .filter(m => m.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20);

    res.json({ recommendations: scored, source: 'personalized', basedOn: userGenres });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/recommend/food
router.get('/food', optionalAuth, async (req, res) => {
  try {
    let categories = [];
    let areas = [];

    if (req.user) {
      categories = req.user.preferences.foodCategories;
      areas = req.user.preferences.foodAreas;
    } else {
      categories = (req.query.categories || '').split(',').filter(Boolean);
      areas = (req.query.areas || '').split(',').filter(Boolean);
    }

    if (categories.length === 0 && areas.length === 0) {
      const random = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await random.json();
      const results = (data.meals || []).slice(0, 15).map(m => ({
        id: m.idMeal, name: m.strMeal, image: m.strMealThumb,
        category: m.strCategory, area: m.strArea
      }));
      return res.json({ recommendations: results, source: 'popular' });
    }

    let recommendations = [];
    for (const cat of categories.slice(0, 3)) {
      try {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(cat)}`);
        const data = await resp.json();
        if (data.meals) {
          recommendations.push(...data.meals.map(m => ({
            id: m.idMeal, name: m.strMeal, image: m.strMealThumb,
            category: cat, area: '', matchReason: `You like ${cat}`
          })));
        }
      } catch { }
    }

    recommendations = recommendations.sort(() => Math.random() - 0.5).slice(0, 20);
    res.json({ recommendations, source: 'personalized', basedOn: { categories, areas } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

