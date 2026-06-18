import { AppShell } from '../layout/AppShell'
import { AssetOverview } from './AssetOverview'
import { BottomNav } from './BottomNav'
import { HeaderBar } from './HeaderBar'
import { MarketsPanel } from './MarketsPanel'
import { PromoBanner } from './PromoBanner'
import { QuickActions } from './QuickActions'
import './HomePage.css'

export function HomePage({ onOpenHomeProfile, onOpenP2P, onOpenSecretSettings, onOpenServices }) {
  return (
    <AppShell nav={<BottomNav />}>
      <HeaderBar
        onOpenHomeProfile={onOpenHomeProfile}
        onOpenSecretSettings={onOpenSecretSettings}
      />
      <main className="home-page">
        <AssetOverview />
        <QuickActions onOpenP2P={onOpenP2P} onOpenServices={onOpenServices} />
        <PromoBanner />
        <MarketsPanel />
      </main>
    </AppShell>
  )
}
