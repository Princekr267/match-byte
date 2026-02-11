const router = require('express').Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// POST /api/preferences/like-movie — user likes a movie
router.post('/like-movie', authMiddleware, async (req, res) => {
  try {
    const { id, title, genres, poster } = req.body;
    const user = await User.findById(req.user._id);

    // Add to liked movies (avoid duplicates)
    const alreadyLiked = user.preferences.likedMovies.some(m => m.id === id);
    if (!alreadyLiked) {
      user.preferences.likedMovies.push({ id, title, genres, poster });
    }

    // Merge genres into preferences (deduplicate)
    const newGenres = genres.map(g => g.toLowerCase()).filter(g => !user.preferences.movieGenres.includes(g));
    user.preferences.movieGenres.push(...newGenres);

    await user.save();
    res.json({ message: 'Movie preference saved', preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/preferences/like-food — user likes a food
router.post('/like-food', authMiddleware, async (req, res) => {
  try {
    const { id, name, category, area, image } = req.body;
    const user = await User.findById(req.user._id);

    const alreadyLiked = user.preferences.likedFoods.some(f => f.id === id);
    if (!alreadyLiked) {
      user.preferences.likedFoods.push({ id, name, category, area, image });
    }

    // Learn categories and cuisines
    if (category && !user.preferences.foodCategories.includes(category.toLowerCase())) {
      user.preferences.foodCategories.push(category.toLowerCase());
    }
    if (area && !user.preferences.foodAreas.includes(area.toLowerCase())) {
      user.preferences.foodAreas.push(area.toLowerCase());
    }

    await user.save();
    res.json({ message: 'Food preference saved', preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/preferences/unlike-movie/:id
router.delete('/unlike-movie/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.preferences.likedMovies = user.preferences.likedMovies.filter(m => String(m.id) !== req.params.id);
    await user.save();
    res.json({ message: 'Removed', preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/preferences — get user preferences
router.get('/', authMiddleware, (req, res) => {
  res.json({ preferences: req.user.preferences });
});

module.exports = router;
