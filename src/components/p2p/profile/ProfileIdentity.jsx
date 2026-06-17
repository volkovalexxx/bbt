import { AlertCircle, CheckCircle2 } from 'lucide-react'
import vipBronzeIcon from '../../../assets/bybit/profile/VIP_bronze.png'
import vipGoldIcon from '../../../assets/bybit/profile/VIP_Gold.png'
import vipMerchantIcon from '../../../assets/bybit/profile/VIP_merchant.png'
import vipSilverIcon from '../../../assets/bybit/profile/VIP_Silver.png'
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
  const { badges, presence, statuses, user } = settings.p2p.profile
  const avatarLetter = user.avatarLetter ?? user.name.trim().charAt(0).toUpperCase()
  const activeBadges = [
    badges?.merchant ? { icon: vipMerchantIcon, label: 'Merchant' } : null,
    badges?.vipBronze ? { icon: vipBronzeIcon, label: 'VIP Bronze' } : null,
    badges?.vipSilver ? { icon: vipSilverIcon, label: 'VIP Silver' } : null,
    badges?.vipGold ? { icon: vipGoldIcon, label: 'VIP Gold' } : null,
  ].filter(Boolean)

  return (
    <section className="p2p-profile-identity">
      <div className="p2p-profile-identity__avatar">{avatarLetter}</div>
      <div className="p2p-profile-identity__copy">
        <div className="p2p-profile-identity__name-row">
          <strong>{user.name}</strong>
          {activeBadges.length ? (
            <span className="p2p-profile-identity__badges">
              {activeBadges.map((badge) => (
                <img alt={badge.label} key={badge.label} src={badge.icon} />
              ))}
            </span>
          ) : null}
        </div>
        <div className="p2p-profile-identity__statuses">
          {statuses.map((status) => (
            <Status active={status.active} key={status.label} label={status.label} />
          ))}
        </div>
        <div className="p2p-profile-identity__presence">
          {presence?.online ? presence?.onlineLabel : presence?.offlineLabel}
        </div>
      </div>
    </section>
  )
}
