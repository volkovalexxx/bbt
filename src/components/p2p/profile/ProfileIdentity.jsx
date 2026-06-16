import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAppSettings } from '../../../settings/AppSettingsContext'
import './ProfileIdentity.css'

function Status({ active = false, label }) {
  const Icon = active ? CheckCircle2 : AlertCircle

  return (
    <span className={active ? 'is-active' : ''}>
      <Icon size={11} strokeWidth={2.2} />
      {label}
    </span>
  )
}

export function ProfileIdentity() {
  const { settings } = useAppSettings()
  const { statuses, user } = settings.p2p.profile
  const avatarLetter = user.avatarLetter ?? user.name.trim().charAt(0).toUpperCase()

  return (
    <section className="p2p-profile-identity">
      <div className="p2p-profile-identity__avatar">{avatarLetter}</div>
      <div className="p2p-profile-identity__copy">
        <strong>{user.name}</strong>
        <div className="p2p-profile-identity__statuses">
          {statuses.map((status) => (
            <Status active={status.active} key={status.label} label={status.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
