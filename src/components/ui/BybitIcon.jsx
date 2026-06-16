import './BybitIcon.css'

export function BybitIcon({ glyph, className = '', family = 'material', label, size }) {
  const style = size ? { fontSize: `${size}px` } : undefined

  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={`bybit-icon bybit-icon--${family} ${className}`.trim()}
      style={style}
    >
      {glyph}
    </span>
  )
}
