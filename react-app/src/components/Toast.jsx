export default function Toast({ message, type, onClose }) {
  if (!message) return null;

  const bg = type === 'error' ? 'var(--red)' : type === 'success' ? 'var(--green)' : 'var(--cyan)';
  
  return (
    <div className="toast-notification" style={{ borderLeft: `4px solid ${bg}` }}>
      <span className="toast-icon">
        {type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}
      </span>
      <p>{message}</p>
      <button onClick={onClose}>×</button>
    </div>
  );
}
