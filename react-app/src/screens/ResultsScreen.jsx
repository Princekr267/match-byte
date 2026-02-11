import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { saveHistory } from '../store';
import { sfx } from '../sfx';

export default function ResultsScreen({ picks, mode, tags, total, onRestart, soundEnabled }) {
  
  useEffect(() => {
    // Celebration confetti if good matches found
    if (picks.length > 0) {
      if (soundEnabled) sfx.result();
      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00f0ff', '#ff2d95', '#39ff14']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00f0ff', '#ff2d95', '#39ff14']
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }

    // Save to history
    saveHistory({
      date: Date.now(),
      mode,
      tags,
      matches: picks.length,
      totalSwipes: total,
      picks
    });
  }, []); // Run once on mount

  const handleShare = () => {
    const text = `I got ${picks.length} matches on MatchByte! 🍔🎬`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <section className="screen results-screen">
      <h2 className="screen-title">YOUR MATCHES</h2>
      
      {picks.length > 0 ? (
        <>
          <p className="results-summary">
            You liked <strong>{picks.length}</strong> items!
          </p>
          
          <div className="results-grid">
            {picks.map((item, i) => (
              <motion.div 
                key={i} 
                className="result-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
              {(item.image || item.poster) ? (
                  <img src={item.image || item.poster} alt={item.name || item.title} className="result-img" />
                ) : (
                  <div className="card-emoji">{item.emoji || '🎬'}</div>
                )}
                <div className="result-info">
                  <h3>{item.name || item.title}</h3>
                  <div className="card-tags">
                     {(item.tags || item.genres || []).slice(0,3).map(t => <span key={t} className="card-tag">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button className="share-btn" onClick={handleShare}>SHARE RESULTS 📤</button>
        </>
      ) : (
        <div className="no-picks">
          <span className="no-picks-icon">💔</span>
          <p>You didn't like anything.<br/>Maybe lower your standards?</p>
        </div>
      )}

      <button className="cta-btn restart-btn" onClick={onRestart}>PLAY AGAIN 🔄</button>
    </section>
  );
}
