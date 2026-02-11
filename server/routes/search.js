const router = require('express').Router();
const movies = require('../data/movies');

// GET /api/search/food?q=pizza
router.get('/food', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Query required' });

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`);
    const data = await response.json();

    if (!data.meals) return res.json({ results: [] });

    const results = data.meals.map(m => ({
      id: m.idMeal,
      name: m.strMeal,
      image: m.strMealThumb,
      category: m.strCategory,
      area: m.strArea,
      tags: [m.strCategory, m.strArea].filter(Boolean).map(s => s.toLowerCase()),
      instructions: m.strInstructions ? m.strInstructions.slice(0, 150) + '...' : ''
    }));

    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to search food', details: err.message });
  }
});

// GET /api/search/movies?q=endgame
router.get('/movies', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.status(400).json({ error: 'Query required' });

  const results = movies.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.genres.some(g => g.toLowerCase().includes(q))
  ).slice(0, 20);

  res.json({ results });
});

module.exports = router;
