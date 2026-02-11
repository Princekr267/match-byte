import { useState } from 'react';
import { motion } from 'framer-motion';
import { login, signup } from '../api';

export default function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const data = isLogin 
        ? await login(username, password)
        : await signup(username, password);
      
      onLogin(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="screen auth-screen">
      <div className="logo-area">
        <h1 className="glitch" data-text="MATCHBYTE">MATCHBYTE</h1>
        <p className="subtitle">JOIN THE HIVE MIND</p>
      </div>

      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="auth-tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>LOGIN</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>SIGNUP</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>USERNAME</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              placeholder="NeonRider"
              required 
            />
          </div>
          
          <div className="input-group">
            <label>PASSWORD</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="cta-btn full-width" disabled={loading}>
            {loading ? 'PROCESSING...' : (isLogin ? 'ENTER SYSTEM' : 'CREATE ID')}
          </button>
        </form>

        <div className="guest-divider"><span>OR</span></div>
        <button className="guest-btn full-width" onClick={() => onLogin({ username: 'Guest' }, null)}>
          CONTINUE AS GUEST 👻
        </button>
      </motion.div>
    </section>
  );
}
