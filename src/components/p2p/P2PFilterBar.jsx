import { ChevronDown, Filter } from 'lucide-react'
import usdtIcon from '../../assets/bybit/p2p/usdt.png'
import { useAppSettings } from '../../settings/AppSettingsContext'
import './P2PFilterBar.css'

export function P2PFilterBar() {
  const { settings } = useAppSettings()
  const { amountLabel, coinLabel, paymentLabel } = settings.p2p.filterBar

  return (
    <div className="p2p-filter-bar">
      <button className="p2p-filter-bar__coin">
        <img src={usdtIcon} alt="" />
        <span>{coinLabel}</span>
        <ChevronDown size={12} strokeWidth={3} />
      </button>
      <button>
        <span>{amountLabel}</span>
        <ChevronDown size={11} strokeWidth={3} />
      </button>
      <button className="p2p-filter-bar__payment">
        <span>{paymentLabel}</span>
        <ChevronDown size={11} strokeWidth={3} />
      </button>
      <button className="p2p-filter-bar__filter" aria-label="Фильтр">
        <Filter size={16} strokeWidth={2.1} />
      </button>
    </div>
  )
}
