export default function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-image shimmer" />
      <div className="skeleton-text shimmer" style={{ width: '60%' }} />
      <div className="skeleton-text shimmer" style={{ width: '80%' }} />
      <div className="skeleton-chips">
        <div className="skeleton-chip shimmer" />
        <div className="skeleton-chip shimmer" />
        <div className="skeleton-chip shimmer" />
      </div>
    </div>
  );
}
