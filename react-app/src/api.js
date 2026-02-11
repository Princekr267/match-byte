const API_BASE = 'http://localhost:5000/api';

// ── AUTH ──
export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

export async function signup(username, password) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// ── SEARCH ──
export async function searchFood(query) {
  const res = await fetch(`${API_BASE}/search/food?q=${encodeURIComponent(query)}`);
  return (await res.json()).results || [];
}

export async function searchMovies(query) {
  const res = await fetch(`${API_BASE}/search/movies?q=${encodeURIComponent(query)}`);
  return (await res.json()).results || [];
}

// ── PREFERENCES (AUTH) ──
export async function savePreference(type, item, token) {
  const endpoint = type === 'food' ? 'like-food' : 'like-movie';
  const res = await fetch(`${API_BASE}/preferences/${endpoint}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(item)
  });
  return res.json();
}

// ── RECOMMENDATIONS (HYBRID) ──
export async function getRecommendations(type, token, guestPrefs = null) {
  let url = `${API_BASE}/recommend/${type}`;
  let headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (guestPrefs) {
    const params = new URLSearchParams();
    if (type === 'movies') {
      params.append('genres', (guestPrefs.movieGenres || []).join(','));
      params.append('liked', (guestPrefs.likedMovies || []).map(m=>m.id).join(','));
    } else {
      params.append('categories', (guestPrefs.foodCategories || []).join(','));
    }
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, { headers });
  const data = await res.json();
  return data.recommendations || [];
}
