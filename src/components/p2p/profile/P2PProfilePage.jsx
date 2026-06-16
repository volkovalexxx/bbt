import { useState } from 'react'
import { useAppSettings } from '../../../settings/AppSettingsContext'
import { ProfileDetailsPage } from './ProfileDetailsPage'
import { ProfileHeader } from './ProfileHeader'
import { ProfileIdentity } from './ProfileIdentity'
import { ProfileMenu } from './ProfileMenu'
import { ProfileStats } from './ProfileStats'
import './P2PProfilePage.css'

export function P2PProfilePage({ onBack }) {
  const [view, setView] = useState('summary')
  const { settings } = useAppSettings()

  if (view === 'details') {
    return <ProfileDetailsPage onBack={() => setView('summary')} />
  }

  return (
    <main className="p2p-profile-page">
      <ProfileHeader helpLabel={settings.p2p.profile.helpLabel} onBack={onBack} />
      <ProfileIdentity />
      <ProfileStats onOpenDetails={() => setView('details')} />
      <ProfileMenu />
    </main>
  )
}
