import { useState } from 'react'
import { useAppSettings } from '../../../settings/AppSettingsContext'
import { ProfileDetailsPage } from './ProfileDetailsPage'
import { ProfileHeader } from './ProfileHeader'
import { ProfileIdentity } from './ProfileIdentity'
import { ProfileMakerBanner } from './ProfileMakerBanner'
import { ProfileMenu } from './ProfileMenu'
import { ProfileStats } from './ProfileStats'
import './P2PProfilePage.css'

export function P2PProfilePage({ onBack, onDetailsViewChange }) {
  const [view, setView] = useState('summary')
  const { settings } = useAppSettings()
  const showMakerBanner = Boolean(settings.p2p.profile.makerBanner?.visible)

  if (view === 'details') {
    return (
      <ProfileDetailsPage
        onBack={() => {
          onDetailsViewChange?.(false)
          setView('summary')
        }}
      />
    )
  }

  return (
    <main className="p2p-profile-page">
      <ProfileHeader helpLabel={settings.p2p.profile.helpLabel} onBack={onBack} />
      <ProfileIdentity />
      <section className={`p2p-profile-page__stats-wrap ${showMakerBanner ? 'has-banner' : ''}`}>
        <ProfileMakerBanner />
        <ProfileStats
          hasBanner={showMakerBanner}
          onOpenDetails={() => {
            onDetailsViewChange?.(true)
            setView('details')
          }}
        />
      </section>
      <ProfileMenu />
    </main>
  )
}
