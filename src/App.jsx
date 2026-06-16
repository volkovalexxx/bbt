import { useEffect, useRef, useState } from 'react'
import { SecretSettingsPage } from './components/admin/SecretSettingsPage'
import { HomePage } from './components/home/HomePage'
import { AppShell } from './components/layout/AppShell'
import { LoadingOverlay } from './components/ui/LoadingOverlay'
import { P2PPage } from './components/p2p/P2PPage'
import { AppSettingsProvider } from './settings/AppSettingsContext'
import { useAppSettings } from './settings/AppSettingsContext'

function isP2PHash() {
  return window.location.hash === '#p2p' || window.location.hash === '#p2p-profile'
}

function AppContent({ isLoading, onOpenP2P, onOpenSecretSettings, onOpenHome, screen }) {
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
      ) : (
        <HomePage onOpenP2P={onOpenP2P} onOpenSecretSettings={onOpenSecretSettings} />
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
    }, 2_000)
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

  return (
    <AppSettingsProvider>
      {isBootLoading ? <LoadingOverlay variant="splash" /> : null}
      <AppContent
        isLoading={isLoading}
        onOpenHome={openHome}
        onOpenP2P={openP2P}
        onOpenSecretSettings={openSecretSettings}
        screen={screen}
      />
    </AppSettingsProvider>
  )
}
