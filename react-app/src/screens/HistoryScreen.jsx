import { motion } from 'framer-motion';
import { getHistory, getStats, clearHistory } from '../store';
import { sfx } from '../sfx';

export default function HistoryScreen({ onBack }) {
  const history = getHistory();
  const stats = getStats();

  function handleClear() {
    if (confirm('Clear all history? This cannot be undone.')) {
      sfx.nah();
      clearHistory();
      onBack();
    }
  }

  return (
    <section className="screen history-screen">
      <div className="history-header">
        <button className="back-btn" onClick={onBack}>← BACK</button>
        <h2 className="screen-title">YOUR STATS</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-val">{stats.sessions}</span>
          <span className="stat-label">SESSIONS</span>
        </div>
        <div className="stat-card">
          <span className="stat-val">{stats.totalSwipes}</span>
          <span className="stat-label">SWIPES</span>
        </div>
        <div className="stat-card">
          <span className="stat-val">{stats.matches}</span>
          <span className="stat-label">MATCHES</span>
        </div>
      </div>

      <h3 className="section-title">RECENT SESSIONS</h3>
      <div className="history-list">
        {history.length === 0 ? (
          <p className="no-history">No history yet. Go swipe!</p>
        ) : (
          history.map((session, i) => (
            <motion.div 
              key={i} 
              className="history-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="h-icon">{session.mode === 'food' ? '🍔' : '🎬'}</div>
              <div className="h-info">
                <span className="h-date">{new Date(session.date).toLocaleDateString()}</span>
                <span className="h-tags">{session.tags.slice(0, 3).join(', ')}</span>
              </div>
              <div className="h-score">{session.matches} picks</div>
            </motion.div>
          ))
        )}
      </div>

      {history.length > 0 && (
        <button className="clear-btn" onClick={handleClear}>
          CLEAR HISTORY 🗑
        </button>
      )}
    </section>
  );
}
