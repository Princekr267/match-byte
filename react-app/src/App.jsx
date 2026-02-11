import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRecommendations, savePreference } from './api';
import LandingScreen from './screens/LandingScreen';
import AuthScreen from './screens/AuthScreen';
import SearchScreen from './screens/SearchScreen';
import FeedScreen from './screens/FeedScreen';
import CardScreen from './screens/CardScreen';
import ResultsScreen from './screens/ResultsScreen';
import ParticlesBg from './components/ParticlesBg';
import Toast from './components/Toast';
import './index.css';

const SCREENS = { LANDING: 0, AUTH: 1, FEED: 2, SEARCH: 3, CARDS: 4, RESULTS: 5 };

export default function App() {
  const [screen, setScreen] = useState(SCREENS.LANDING);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [mode, setMode] = useState('');
  const [items, setItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Guest State
  const [guestPrefs, setGuestPrefs] = useState(() => {
    return JSON.parse(localStorage.getItem('guestPrefs')) || {
      movieGenres: [], foodCategories: [], likedMovies: []
    };
  });

  const showToast = (msg, type='info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (userData, newToken) => {
    setUser(userData);
    setToken(newToken);
    if (newToken) localStorage.setItem('token', newToken);
    setScreen(SCREENS.LANDING);
    showToast(`Welcome, ${userData.username}!`, 'success');
  };

  const handleModeSelect = async (m) => {
    if (!token && !user) { 
      setScreen(SCREENS.AUTH);
      return;
    }
    
    // Normalize: 'movie' -> 'movies', 'food' stays 'food'
    const apiMode = m === 'movie' ? 'movies' : m;
    setMode(m);
    setLoading(true);
    
    try {
      const recs = await getRecommendations(apiMode, token, !token ? guestPrefs : null);
      setRecommendations(recs);
      setScreen(SCREENS.FEED);
    } catch (err) {
      console.error(err);
      showToast('Offline or Error. Use Search!', 'error');
      setScreen(SCREENS.SEARCH);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLike = (item, type) => {
    if (token) {
      savePreference(type, item, token).catch(console.error);
    } else {
      // Update local guest prefs
      const newPrefs = { ...guestPrefs };
      if (type === 'movies') {
        newPrefs.likedMovies.push({ id: item.id });
        const newGenres = (item.genres || []).filter(g => !newPrefs.movieGenres.includes(g));
        newPrefs.movieGenres.push(...newGenres);
      } else {
        if (item.category && !newPrefs.foodCategories.includes(item.category)) {
          newPrefs.foodCategories.push(item.category);
        }
      }
      setGuestPrefs(newPrefs);
      localStorage.setItem('guestPrefs', JSON.stringify(newPrefs));
    }
  };

  const handleStartSwipe = (list, startIndex = 0) => {
    setItems(list.slice(startIndex));
    setScreen(SCREENS.CARDS);
  };

  const handleRestart = () => {
    setMode('');
    setItems([]);
    setScreen(SCREENS.LANDING);
  };

  return (
    <div className="app-shell">
      <ParticlesBg />
      <div className="scanlines" />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <AnimatePresence mode="wait">
        {screen === SCREENS.LANDING && (
          <motion.div key="landing" className="screen-wrapper" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <LandingScreen 
              onSelect={handleModeSelect} 
              onHistory={() => showToast(token ? 'History Loading...' : 'Login to save history', 'info')}
              soundEnabled={true}
              onToggleSound={() => {}}
              user={user}
            />
          </motion.div>
        )}

        {screen === SCREENS.AUTH && (
          <motion.div key="auth" className="screen-wrapper" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0}}>
            <AuthScreen onLogin={handleLogin} />
          </motion.div>
        )}

        {screen === SCREENS.FEED && (
          <motion.div key="feed" className="screen-wrapper" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <FeedScreen 
              recommendations={recommendations} 
              mode={mode} 
              user={user || { username: 'Guest' }}
              onSearch={() => setScreen(SCREENS.SEARCH)}
              onStartSwipe={handleStartSwipe}
            />
          </motion.div>
        )}

        {screen === SCREENS.SEARCH && (
          <motion.div key="search" className="screen-wrapper" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0}}>
            <SearchScreen 
              mode={mode} 
              token={token}
              onLike={(item) => handleGuestLike(item, mode === 'food' ? 'food' : 'movies')}
              onClose={() => setScreen(SCREENS.FEED)}
              onFinish={() => handleModeSelect(mode)} 
            />
          </motion.div>
        )}

        {screen === SCREENS.CARDS && (
          <motion.div key="cards" className="screen-wrapper">
             <CardScreen
               recommendations={items}
               loading={loading}
               onFinish={(picks) => {
                 setItems(picks);
                 setScreen(SCREENS.RESULTS);
               }}
               onBack={() => setScreen(SCREENS.FEED)}
               soundEnabled={true}
               onSwipe={(dir, item) => {
                  if (dir === 'right') handleGuestLike(item, mode === 'food' ? 'food' : 'movies');
               }}
             />
          </motion.div>
        )}

        {screen === SCREENS.RESULTS && (
          <motion.div key="results" className="screen-wrapper" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <ResultsScreen
              picks={items} 
              total={recommendations.length}
              mode={mode}
              tags={['personalized']} 
              onRestart={handleRestart}
              soundEnabled={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
