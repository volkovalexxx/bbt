import { CircleHelp } from 'lucide-react'
import { useAppSettings } from '../../../settings/AppSettingsContext'
import './ProfileStats.css'

export function ProfileStats({ hasBanner = false, onOpenDetails }) {
  const { settings } = useAppSettings()
  const { stats, summaryActionLabel } = settings.p2p.profile

  return (
    <section className={`p2p-profile-stats ${hasBanner ? 'has-banner' : ''}`}>
      {stats.map((item) => (
        <div className="p2p-profile-stats__row" key={item.label}>
          <span>
            {item.label}
            {item.help ? <CircleHelp size={11} strokeWidth={2} /> : null}
          </span>
          <strong>{item.value}</strong>
        </div>
      ))}
      <button className="p2p-profile-stats__more" onClick={onOpenDetails}>
        {summaryActionLabel} ›
      </button>
    </section>
  )
}
