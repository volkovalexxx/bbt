/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  cloneDefaults,
  loadStoredSettings,
  persistSettings,
  SETTINGS_API_URL,
} from './appSettingsStorage'

const AppSettingsContext = createContext(null)

export function AppSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => cloneDefaults())
  const [isHydrating, setIsHydrating] = useState(true)
  const [lastSavedAt, setLastSavedAt] = useState('')

  useEffect(() => {
    let isMounted = true

    loadStoredSettings().then((nextSettings) => {
      if (!isMounted) {
        return
      }

      setSettings(nextSettings)
      setIsHydrating(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const saveSettings = async (nextSettings) => {
    const mergedSettings = await persistSettings(nextSettings)
    setSettings(mergedSettings)
    setLastSavedAt(new Date().toISOString())
    return mergedSettings
  }

  const resetSettings = async () => {
    const defaults = cloneDefaults()
    const mergedSettings = await persistSettings(defaults)
    setSettings(mergedSettings)
    setLastSavedAt(new Date().toISOString())
    return mergedSettings
  }

  return (
    <AppSettingsContext.Provider
      value={{
        resetSettings,
        saveSettings,
        settings,
        isHydrating,
        lastSavedAt,
        storageKey: SETTINGS_API_URL,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  )
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext)

  if (!context) {
    throw new Error('useAppSettings must be used within AppSettingsProvider')
  }

  return context
}
