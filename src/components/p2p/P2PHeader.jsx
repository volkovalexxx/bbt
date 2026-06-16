import { ArrowLeft } from 'lucide-react'
import arrowDown from '../../assets/bybit/ui/arrow-down-grey.svg'
import { useAppSettings } from '../../settings/AppSettingsContext'
import './P2PHeader.css'

export function P2PHeader({ onBack }) {
  const { settings } = useAppSettings()
  const { currency, tabs } = settings.p2p.header

  return (
    <header className="p2p-header">
      <button className="p2p-header__back" onClick={onBack} aria-label="Назад">
        <ArrowLeft size={23} strokeWidth={2.5} />
      </button>
      <div className="p2p-header__tabs">
        <span>{tabs[0]}</span>
        <strong>{tabs[1]}</strong>
        <span>{tabs[2]}</span>
      </div>
      <button className="p2p-header__currency">
        <span>{currency}</span>
        <img src={arrowDown} alt="" />
      </button>
    </header>
  )
}
