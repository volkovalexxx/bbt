import { ChevronRight } from 'lucide-react'
import { useAppSettings } from '../../../settings/AppSettingsContext'
import './ProfileMakerBanner.css'

export function ProfileMakerBanner() {
  const { settings } = useAppSettings()
  const banner = settings.p2p.profile.makerBanner

  if (!banner?.visible) {
    return null
  }

  return (
    <section className="p2p-profile-maker-banner">
      <div className="p2p-profile-maker-banner__copy">
        <strong>{banner.title}</strong>
        <p>{banner.description}</p>
      </div>
      <span className="p2p-profile-maker-banner__arrow" aria-hidden="true">
        <ChevronRight size={15} strokeWidth={2.15} />
      </span>
    </section>
  )
}
