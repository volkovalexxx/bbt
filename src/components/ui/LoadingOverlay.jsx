import './LoadingOverlay.css'

export function LoadingOverlay({ label = 'Fiat P2P', variant = 'dots' }) {
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

  if (variant === 'p2p') {
    return (
      <div className="loading-overlay loading-overlay--p2p" role="status" aria-label="Загрузка P2P">
        <div className="loading-overlay__p2p-wrap">
          <div className="loading-overlay__p2p-bars" aria-hidden="true">
            <span className="is-short" />
            <span className="is-tall" />
            <span className="is-short" />
          </div>
          <strong className="loading-overlay__p2p-label">{label}</strong>
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
