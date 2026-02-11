import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { sfx } from '../sfx';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function CardScreen({ recommendations, loading, onFinish, onBack, soundEnabled }) {
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState([]);
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState(null);

  // Drag Motion Values
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const bgLike = useTransform(x, [0, 150], [0, 1]);
  const bgNope = useTransform(x, [-150, 0], [1, 0]);

  const current = recommendations[index];
  const nextCard = recommendations[index + 1];

  // Feedback Flash
  const flash = useCallback((type) => {
    setFeedback(type);
    setTimeout(() => setFeedback(null), 450);
  }, []);

  // Handle Drag End
  const handleDragEnd = (_, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) doYeah();
    else if (info.offset.x < -threshold) doNah();
    else x.set(0); // Snap back if not swiped enough
  };

  const nextParams = useCallback(() => {
    x.set(0);
    const next = index + 1;
    if (next >= recommendations.length) onFinish(picks);
    else setIndex(next);
  }, [index, recommendations.length, picks, onFinish, x]);

  // YEAH
  const doYeah = useCallback(() => {
    if (soundEnabled) sfx.yeah();
    flash('yeah');
    setPicks(prev => [...prev, recommendations[index]]);
    setHistory(prev => [...prev, { action: 'yeah', idx: index }]);
    nextParams();
  }, [index, recommendations, soundEnabled, flash, nextParams]);

  // NAH
  const doNah = useCallback(() => {
    if (soundEnabled) sfx.nah();
    flash('nah');
    setHistory(prev => [...prev, { action: 'nah', idx: index }]);
    nextParams();
  }, [index, soundEnabled, flash, nextParams]);

  // UNDO
  const doUndo = useCallback(() => {
    if (history.length === 0) return;
    if (soundEnabled) sfx.select();
    const last = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setIndex(last.idx);
    if (last.action === 'yeah') setPicks(prev => prev.slice(0, -1));
    x.set(0);
  }, [history, soundEnabled, x]);

  // Keyboard
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'l') doYeah();
      if (e.key === 'ArrowLeft'  || e.key === 'h') doNah();
      if (e.key === 'z' || e.key === 'u') doUndo();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doYeah, doNah, doUndo]);

  if (loading) return <div className="screen card-screen"><LoadingSkeleton /></div>;
  if (!current) return null;

  return (
    <section className="screen card-screen">
      <div className="cards-header">
        <button className="back-btn" onClick={onBack}>← ABORT</button>
        <div className="progress-area">
          <span className="progress-label">{index + 1} / {recommendations.length}</span>
          <div className="progress-track">
            <motion.div 
              className="progress-bar" 
              animate={{ width: `${((index + 1) / recommendations.length) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="card-area">
        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div 
              className={`feedback-flash ${feedback}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {feedback === 'yeah' ? 'YEAH' : 'NAH'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Card (Preview) */}
        {nextCard && (
          <div className="match-card behind-card">
             {nextCard.image ? (
                <img src={nextCard.image} alt={nextCard.name} className="card-img" />
             ) : (
                <div className="card-emoji">{nextCard.emoji}</div>
             )}
          </div>
        )}

        {/* Active Card (Draggable) */}
        <motion.div
          className="match-card active-card"
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: 'grabbing' }}
        >
          {/* Swipe Indicators */}
          <motion.div className="swipe-indicator like" style={{ opacity: bgLike }}>LIKE</motion.div>
          <motion.div className="swipe-indicator nope" style={{ opacity: bgNope }}>NOPE</motion.div>

          <div className="card-content">
            {current.image ? (
              <div className="img-wrapper">
                 <img src={current.image} alt={current.name} className="card-img" loading="eager" />
              </div>
            ) : (
              <div className="card-emoji">{current.emoji}</div>
            )}
            
            <div className="card-info">
              <h2 className="card-name">{current.name}</h2>
              <p className="card-desc">{current.desc}</p>
              
              <div className="card-meta">
                <span>{current.meta1 || 'N/A'}</span>
                <span>{current.meta2 || 'N/A'}</span>
              </div>
              
              <div className="card-tags">
                {current.tags.slice(0,3).map(t => (
                  <span key={t} className="card-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="action-buttons">
        <button className="action-btn nah" onClick={doNah}>✖</button>
        <button 
          className="action-btn undo" 
          onClick={doUndo} 
          disabled={history.length === 0}
        >↩</button>
        <button className="action-btn yeah" onClick={doYeah}>♥</button>
      </div>
      
      <p className="hint-text keyboard-hint">Swipe right or use arrows ➡</p>
    </section>
  );
}
