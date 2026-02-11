import { motion } from 'framer-motion';

export default function FeedScreen({ recommendations, mode, onSearch, onStartSwipe, user }) {
  return (
    <section className="screen feed-screen">
      <div className="feed-header">
        <div>
          <h2 className="greeting">WELCOME BACK, <span className="highlight">{user.username}</span></h2>
          <p className="subtext">Based on your taste in {mode}...</p>
        </div>
        <button className="icon-btn search-trigger" onClick={onSearch}>🔍</button>
      </div>

      <div className="feed-grid">
        {recommendations.map((item, i) => (
          <motion.div 
            key={item.id} 
            className="feed-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onStartSwipe(recommendations, i)}
          >
            <div className="img-container">
              <img src={item.image || item.poster} alt={item.name} loading="lazy" />
              {item.matchReason && <span className="reason-tag">{item.matchReason}</span>}
            </div>
            <div className="feed-info">
              <h3>{item.name || item.title}</h3>
              <p>{item.genres ? item.genres.slice(0, 2).join(', ') : item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        className="cta-btn floating-start"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onStartSwipe(recommendations, 0)}
      >
        START MATCHING ⚡
      </motion.button>
    </section>
  );
}
