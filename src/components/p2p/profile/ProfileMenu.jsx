import {
  Bell,
  ChevronRight,
  ScanFace,
  Ticket,
  ThumbsUp,
  UserRound,
  UsersRound,
  Wallet,
} from 'lucide-react'
import { useAppSettings } from '../../../settings/AppSettingsContext'
import './ProfileMenu.css'

const icons = {
  blacklist: ScanFace,
  merchant: UserRound,
  notifications: Bell,
  review: ThumbsUp,
  subscriptions: UsersRound,
  ticket: Ticket,
  wallet: Wallet,
}

function formatValue(label, value) {
  if (value === undefined || value === null || value === '') {
    return null
  }

  if (label === 'Оставьте отзыв' && Number.isInteger(value)) {
    return `${Math.max(0, Math.min(100, value))}%`
  }

  return String(value)
}

function MenuRow({ accent = false, icon, label, value }) {
  const Icon = icons[icon]
  const displayValue = formatValue(label, value)
  const accentClassName =
    accent && displayValue === 'Подать заявку' ? 'is-accent' : ''

  return (
    <button className="p2p-profile-menu__row">
      <Icon size={19} strokeWidth={1.75} />
      <span>{label}</span>
      {displayValue ? <strong className={accentClassName}>{displayValue}</strong> : null}
      <ChevronRight size={15} strokeWidth={1.8} />
    </button>
  )
}

export function ProfileMenu() {
  const { settings } = useAppSettings()
  const { menuGroups } = settings.p2p.profile

  return (
    <section className="p2p-profile-menu">
      {menuGroups.map((group, index) => (
        <div className="p2p-profile-menu__group" key={index}>
          {group.map((item) => (
            <MenuRow key={item.label} {...item} />
          ))}
        </div>
      ))}
    </section>
  )
}
