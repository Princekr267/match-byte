import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchFood, searchMovies, savePreference } from '../api';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function SearchScreen({ mode, token, onClose, onFinish, onLike }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState([]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length > 2) {
        setLoading(true);
        const searchFn = mode === 'food' ? searchFood : searchMovies;
        searchFn(query)
          .then(data => setResults(data))
          .catch(() => setResults([]))
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [query, mode]);

  const handleLike = async (item) => {
    if (liked.includes(item.id)) return;
    setLiked(prev => [...prev, item.id]);
    
    if (onLike) {
      onLike(item); // Parent handles persistence (API or LocalStorage)
    } else if (token) {
       // Fallback for direct usage
       try { await savePreference(mode, item, token); } catch {}
    }
  };

  return (
    <div className="screen search-screen">
      <div className="search-header">
        <button className="back-btn" onClick={onClose}>← BACK</button>
        <input 
          type="text" 
          className="search-input"
          placeholder={`Search ${mode}... (e.g. ${mode === 'food' ? 'Pizza' : 'Endgame'})`}
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="results-list">
        {loading && <div className="loading-spinner">Searching...</div>}
        
        {!loading && results.length === 0 && query.length > 2 && (
          <p className="no-results">No matches found in the mainframe.</p>
        )}

        <div className="search-grid">
          {results.map(item => (
            <motion.div 
              key={item.id} 
              className={`search-item ${liked.includes(item.id) ? 'liked' : ''}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleLike(item)}
            >
              <img src={item.image || item.poster} alt={item.name || item.title} />
              <div className="search-info">
                <h4>{item.name || item.title}</h4>
                <p>{(item.tags || item.genres || []).slice(0, 2).join(', ')}</p>
              </div>
              {liked.includes(item.id) && <div className="liked-badge">SAVED</div>}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="search-footer">
        <p>{liked.length} preferences saved</p>
        <button className="cta-btn small" onClick={onFinish}>DONE</button>
      </div>
    </div>
  );
}
