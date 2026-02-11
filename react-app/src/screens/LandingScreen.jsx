import { motion } from 'framer-motion';
import { getStats } from '../store';

export default function LandingScreen({ onSelect, onHistory, soundEnabled, onToggleSound }) {
  const stats = getStats();

  return (
    <section className="screen landing-screen">
      <div className="top-bar">
        <button className="icon-btn" onClick={onHistory} title="History & Stats">
          📊
        </button>
        <button className="icon-btn" onClick={onToggleSound} title="Toggle Sound">
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      <div className="logo-area">
        <h1 className="glitch" data-text="MATCHBYTE">MATCHBYTE</h1>
        <p className="subtitle">DECIDE FASTER · PLAY SMARTER</p>
      </div>

      <p className="prompt-text">What are we deciding today?</p>

      <div className="mode-buttons">
        <motion.button
          className="mode-btn"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('food')}
        >
          <span className="mode-icon">🍔</span>
          <span className="mode-label">FOOD</span>
          <span className="mode-sub">Dinner plans?</span>
        </motion.button>

        <motion.button
          className="mode-btn"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('movie')}
        >
          <span className="mode-icon">🎬</span>
          <span className="mode-label">MOVIES</span>
          <span className="mode-sub">Movie night?</span>
        </motion.button>
      </div>

      {stats.sessions > 0 && (
        <div className="mini-stats">
          <span>{stats.sessions} sessions played</span> • <span>{stats.matches} matches found</span>
        </div>
      )}
    </section>
  );
}
