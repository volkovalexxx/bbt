import { useEffect, useRef, useState } from 'react'
import { CircleHelp, Eye, EyeOff, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useAppSettings } from '../../../settings/AppSettingsContext'
import { ProfileHeader } from './ProfileHeader'
import './ProfileDetailsPage.css'

function ValueNote({ note, type }) {
  if (!note) {
    return null
  }

  if (type === 'rating') {
    const [likes = '0', dislikes = '0'] = String(note)
      .split('|')
      .map((value) => value.trim())

    return (
      <span className="p2p-profile-details__value-note is-rating">
        <ThumbsUp size={11} strokeWidth={2} />
        {likes}
        <span className="p2p-profile-details__divider">|</span>
        <ThumbsDown size={11} strokeWidth={2} />
        {dislikes}
      </span>
    )
  }

  return <span className="p2p-profile-details__value-note">{note}</span>
}

function NameRevealLoader() {
  return (
    <div className="p2p-profile-details__reveal-loader" role="status" aria-label="Раскрытие имени">
      <div className="p2p-profile-details__reveal-logo">
        <span className="p2p-profile-details__reveal-base" aria-hidden="true">
          <span>B</span>
          <span>Y</span>
          <span>B</span>
          <span className="is-accent">I</span>
          <span>T</span>
        </span>
        <span className="p2p-profile-details__reveal-fill" aria-hidden="true">
          <span>B</span>
          <span>Y</span>
          <span>B</span>
          <span className="is-accent">I</span>
          <span>T</span>
        </span>
      </div>
    </div>
  )
}

function Row({ item, onRevealStart }) {
  const timerRef = useRef(null)
  const [isHidden, setIsHidden] = useState(true)
  const displayValue =
    item.valueIcon === 'hidden' && item.revealedValue
      ? isHidden
        ? item.value
        : item.revealedValue
      : item.value

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handleToggle = () => {
    if (item.valueIcon !== 'hidden') {
      return
    }

    if (!isHidden) {
      setIsHidden(true)
      return
    }

    onRevealStart?.()
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setIsHidden(false)
    }, 1_250)
  }

  return (
    <div className="p2p-profile-details__row">
      <span className="p2p-profile-details__label">
        {item.label}
        {item.help ? <CircleHelp size={12} strokeWidth={2} /> : null}
      </span>
      <div className="p2p-profile-details__value-wrap">
        <div className="p2p-profile-details__value-main">
          <strong>{displayValue}</strong>
          {item.valueIcon === 'hidden' ? (
            <button className="p2p-profile-details__toggle" onClick={handleToggle}>
              {isHidden ? <EyeOff size={14} strokeWidth={2} /> : <Eye size={14} strokeWidth={2} />}
            </button>
          ) : null}
        </div>
        <ValueNote note={item.valueNote} type={item.valueNoteType} />
      </div>
    </div>
  )
}

export function ProfileDetailsPage({ onBack }) {
  const { settings } = useAppSettings()
  const { user, details } = settings.p2p.profile
  const revealLoaderTimer = useRef(null)
  const [isRevealLoading, setIsRevealLoading] = useState(false)

  useEffect(
    () => () => {
      window.clearTimeout(revealLoaderTimer.current)
    },
    [],
  )

  const handleRevealStart = () => {
    window.clearTimeout(revealLoaderTimer.current)
    setIsRevealLoading(true)
    revealLoaderTimer.current = window.setTimeout(() => {
      setIsRevealLoading(false)
    }, 1_250)
  }

  return (
    <main className="p2p-profile-details">
      <ProfileHeader
        compact
        helpLabel=""
        onBack={onBack}
        title={user.name}
        titleCentered
      />
      {details.sections.map((section, index) => (
        <section className="p2p-profile-details__section" key={index}>
          {section.map((item) => (
            <Row item={item} key={item.label} onRevealStart={handleRevealStart} />
          ))}
        </section>
      ))}
      {isRevealLoading ? <NameRevealLoader /> : null}
    </main>
  )
}
