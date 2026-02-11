export const saveHistory = (session) => {
  const history = getHistory();
  const newHistory = [session, ...history].slice(0, 50); // Keep last 50
  localStorage.setItem('matchbyte_history', JSON.stringify(newHistory));
  
  // Update aggregate stats
  const stats = getStats();
  stats.sessions += 1;
  stats.totalSwipes += session.totalSwipes || 0;
  stats.matches += session.matches || 0;
  localStorage.setItem('matchbyte_stats', JSON.stringify(stats));
};

export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('matchbyte_history')) || [];
  } catch { return []; }
};

export const getStats = () => {
  try {
    return JSON.parse(localStorage.getItem('matchbyte_stats')) || { sessions: 0, totalSwipes: 0, matches: 0 };
  } catch { return { sessions: 0, totalSwipes: 0, matches: 0 }; }
};

export const clearHistory = () => {
  localStorage.removeItem('matchbyte_history');
  localStorage.removeItem('matchbyte_stats');
};

export const getSettings = () => {
  try {
    return JSON.parse(localStorage.getItem('matchbyte_settings')) || { sound: true };
  } catch { return { sound: true }; }
};

export const saveSettings = (settings) => {
  localStorage.setItem('matchbyte_settings', JSON.stringify(settings));
};
