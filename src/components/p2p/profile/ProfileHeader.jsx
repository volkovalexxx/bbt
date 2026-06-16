import { ArrowLeft } from 'lucide-react'
import './ProfileHeader.css'

export function ProfileHeader({
  compact = false,
  helpLabel = 'Help & Support',
  onBack,
  title,
  titleCentered = false,
}) {
  return (
    <header
      className={`p2p-profile-header ${titleCentered ? 'is-centered' : ''} ${compact ? 'is-compact' : ''}`}
    >
      <button className="p2p-profile-header__back" onClick={onBack} aria-label="Назад">
        <ArrowLeft size={22} strokeWidth={2.5} />
      </button>
      {title ? <strong className="p2p-profile-header__title">{title}</strong> : null}
      {helpLabel ? <button className="p2p-profile-header__help">{helpLabel}</button> : null}
    </header>
  )
}
