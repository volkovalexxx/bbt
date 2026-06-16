import './LoadingOverlay.css'

export function LoadingOverlay({ variant = 'dots' }) {
  if (variant === 'splash') {
    return (
      <div className="loading-overlay loading-overlay--splash" role="status" aria-label="Загрузка">
        <div className="loading-overlay__brand" aria-label="BYBIT">
          <span className="loading-overlay__brand-letter">B</span>
          <span className="loading-overlay__brand-letter">Y</span>
          <span className="loading-overlay__brand-letter">B</span>
          <span className="loading-overlay__brand-letter loading-overlay__brand-letter--accent">
            I
          </span>
          <span className="loading-overlay__brand-letter">T</span>
        </div>
      </div>
    )
  }

  return (
    <div className="loading-overlay" role="status" aria-label="Загрузка">
      <div className="loading-overlay__bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
