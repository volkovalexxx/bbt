import { useEffect, useRef, useState } from 'react'
import { SecretSettingsPage } from './components/admin/SecretSettingsPage'
import { HomePage } from './components/home/HomePage'
import { HomeProfilePage } from './components/home-profile/HomeProfilePage'
import { AppShell } from './components/layout/AppShell'
import { ServicesPage } from './components/services/ServicesPage'
import { ServicesSearchPage } from './components/services/ServicesSearchPage'
import { LoadingOverlay } from './components/ui/LoadingOverlay'
import { P2PPage } from './components/p2p/P2PPage'
import { AppSettingsProvider } from './settings/AppSettingsContext'
import { useAppSettings } from './settings/AppSettingsContext'

function isP2PHash() {
  return window.location.hash === '#p2p' || window.location.hash === '#p2p-profile'
}

function AppContent({
  isLoading,
  onOpenHomeProfile,
  onOpenP2P,
  onOpenSecretSettings,
  onOpenHome,
  onOpenServices,
  onOpenServicesSearch,
  screen,
}) {
  const { isHydrating, lastSavedAt } = useAppSettings()

  return (
    <>
      {screen === 'settings' ? (
        <AppShell
          nav={null}
        >
          <SecretSettingsPage
            key={`settings-${isHydrating}-${lastSavedAt}`}
            onBack={onOpenHome}
          />
        </AppShell>
      ) : screen === 'p2p' ? (
        <P2PPage
          initialSection={window.location.hash === '#p2p-profile' ? 'profile' : 'p2p'}
          onBack={onOpenHome}
        />
      ) : screen === 'services' ? (
        <AppShell nav={null}>
          <ServicesPage onBack={onOpenHome} onOpenSearch={onOpenServicesSearch} />
        </AppShell>
      ) : screen === 'services-search' ? (
        <AppShell nav={null}>
          <ServicesSearchPage onBack={onOpenServices} onOpenP2P={onOpenP2P} />
        </AppShell>
      ) : screen === 'home-profile' ? (
        <AppShell nav={null}>
          <HomeProfilePage onBack={onOpenHome} />
        </AppShell>
      ) : (
        <HomePage
          onOpenHomeProfile={onOpenHomeProfile}
          onOpenP2P={onOpenP2P}
          onOpenSecretSettings={onOpenSecretSettings}
          onOpenServices={onOpenServices}
        />
      )}
      {isLoading ? <LoadingOverlay /> : null}
    </>
  )
}

export default function App() {
  const loadingTimer = useRef(null)
  const bootTimer = useRef(null)
  const [screen, setScreen] = useState(() => (isP2PHash() ? 'p2p' : 'home'))
  const [isLoading, setIsLoading] = useState(false)
  const [isBootLoading, setIsBootLoading] = useState(true)

  useEffect(() => {
    const handleHashChange = () => {
      setScreen(isP2PHash() ? 'p2p' : 'home')
    }

    bootTimer.current = window.setTimeout(() => {
      setIsBootLoading(false)
    }, 1_350)

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.clearTimeout(loadingTimer.current)
      window.clearTimeout(bootTimer.current)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const openP2P = () => {
    window.clearTimeout(loadingTimer.current)
    setIsLoading(true)
    loadingTimer.current = window.setTimeout(() => {
      window.location.hash = 'p2p'
      setScreen('p2p')
      setIsLoading(false)
    }, 1_000)
  }

  const openHome = () => {
    window.clearTimeout(loadingTimer.current)
    setIsLoading(false)
    window.history.replaceState(null, '', window.location.pathname)
    setScreen('home')
  }

  const openSecretSettings = () => {
    window.clearTimeout(loadingTimer.current)
    setIsLoading(false)
    setScreen('settings')
  }

  const openHomeProfile = () => {
    window.clearTimeout(loadingTimer.current)
    setIsLoading(false)
    setScreen('home-profile')
  }

  const openServices = () => {
    window.clearTimeout(loadingTimer.current)
    setIsLoading(false)
    setScreen('services')
  }

  const openServicesSearch = () => {
    window.clearTimeout(loadingTimer.current)
    setIsLoading(false)
    setScreen('services-search')
  }

  return (
    <AppSettingsProvider>
      {isBootLoading ? <LoadingOverlay variant="splash" /> : null}
      <AppContent
        isLoading={isLoading}
        onOpenHome={openHome}
        onOpenHomeProfile={openHomeProfile}
        onOpenP2P={openP2P}
        onOpenSecretSettings={openSecretSettings}
        onOpenServices={openServices}
        onOpenServicesSearch={openServicesSearch}
        screen={screen}
      />
    </AppSettingsProvider>
  )
}
