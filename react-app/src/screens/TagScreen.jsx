import { motion } from 'framer-motion';

export default function TagScreen({ mode, tags, selectedTags, onToggle, onFind, onBack }) {
  return (
    <section className="screen tag-screen">
      <button className="back-btn" onClick={onBack}>← BACK</button>

      <h2 className="screen-title">
        {mode === 'food' ? '🍔 PICK YOUR FOOD VIBE' : '🎬 PICK YOUR MOVIE VIBE'}
      </h2>
      <p className="hint-text">Select tags that match your mood right now</p>

      <div className="tags-container">
        {tags.map(tag => (
          <motion.button
            key={tag}
            className={`tag-pill${selectedTags.includes(tag) ? ' selected' : ''}`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(tag)}
          >
            {tag}
          </motion.button>
        ))}
      </div>

      <motion.button
        className="cta-btn"
        disabled={selectedTags.length === 0}
        whileHover={selectedTags.length > 0 ? { scale: 1.06 } : {}}
        whileTap={selectedTags.length > 0 ? { scale: 0.96 } : {}}
        onClick={onFind}
      >
        FIND MATCHES 🎯
      </motion.button>

      <p className="tag-count">{selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected</p>
    </section>
  );
}
