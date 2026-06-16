import { useState } from 'react'
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

function Row({ item }) {
  const [isHidden, setIsHidden] = useState(true)
  const displayValue =
    item.valueIcon === 'hidden' && item.revealedValue
      ? isHidden
        ? item.value
        : item.revealedValue
      : item.value

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
            <button
              className="p2p-profile-details__toggle"
              onClick={() => setIsHidden((current) => !current)}
            >
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
            <Row item={item} key={item.label} />
          ))}
        </section>
      ))}
    </main>
  )
}
