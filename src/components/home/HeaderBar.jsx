import { useRef } from 'react'
import avatarKyc from '../../assets/bybit/profile/kyc1.png'
import {
  createQuickActionPreset,
  quickActionPresetCount,
} from '../../data/quickActionPresets'
import referralIcon from '../../assets/bybit/icons/referral-program.svg'
import { useAppSettings } from '../../settings/AppSettingsContext'
import { BybitIcon } from '../ui/BybitIcon'
import './HeaderBar.css'

export function HeaderBar({ onOpenHomeProfile, onOpenSecretSettings }) {
  const bellClickTimesRef = useRef([])
  const scannerClickTimesRef = useRef([])
  const { saveSettings, settings } = useAppSettings()
  const { searchText, tools } = settings.home.header

  const handleScannerClick = async () => {
    const now = Date.now()
    const nextClicks = [...scannerClickTimesRef.current, now].filter((time) => now - time <= 550)
    scannerClickTimesRef.current = nextClicks

    if (nextClicks.length < 2) {
      return
    }

    scannerClickTimesRef.current = []

    const currentPresetIndex = settings.home.quickActionPresetIndex ?? 0
    const nextPresetIndex = (currentPresetIndex + 1) % quickActionPresetCount
    const nextQuickActions = createQuickActionPreset(nextPresetIndex)

    await saveSettings({
      ...settings,
      home: {
        ...settings.home,
        quickActionPresetIndex: nextPresetIndex,
        quickActions: nextQuickActions,
      },
    })
  }

  const handleBellClick = () => {
    const now = Date.now()
    const nextClicks = [...bellClickTimesRef.current, now].filter((time) => now - time <= 900)
    bellClickTimesRef.current = nextClicks

    if (nextClicks.length >= 3) {
      bellClickTimesRef.current = []
      onOpenSecretSettings?.()
    }
  }

  return (
    <header className="header-bar">
      <button className="avatar-button" aria-label="Профиль" onClick={onOpenHomeProfile}>
        <img className="avatar-button__image" src={avatarKyc} alt="" />
      </button>

      <div className="search-pill" aria-label="Поиск">
        <BybitIcon family="moly" glyph={'\ue7c2'} size={18} />
        <span className="search-pill__text">{searchText}</span>
      </div>

      <div className="header-tools">
        {tools.map(({ label, glyph, badge }) => (
          <button
            className="header-tool"
            key={label}
            aria-label={label}
            onClick={
              label === 'Уведомления'
                ? handleBellClick
                : label === 'Сканер'
                  ? handleScannerClick
                  : undefined
            }
          >
            {label === 'Пригласить друга' ? (
              <img className="header-tool__image" src={referralIcon} alt="" />
            ) : (
              <BybitIcon family="moly" glyph={glyph} size={22} />
            )}
            {badge && <span className="header-tool__badge">{badge}</span>}
          </button>
        ))}
      </div>
    </header>
  )
}
