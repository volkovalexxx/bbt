import earnIcon from '../../assets/bybit/icons/quick-earn.png'
import p2pIcon from '../../assets/bybit/icons/quick-p2p.png'
import walletIcon from '../../assets/bybit/icons/wallet-web3-program.svg'
import { useAppSettings } from '../../settings/AppSettingsContext'
import { BybitIcon } from '../ui/BybitIcon'
import './QuickActions.css'

const quickImages = {
  earn: earnIcon,
  p2p: p2pIcon,
  wallet: walletIcon,
}

export function QuickActions({ onOpenP2P }) {
  const { settings } = useAppSettings()

  return (
    <nav className="quick-actions" aria-label="Быстрые действия">
      {settings.home.quickActions.map((action) => (
        <button
          className="quick-action"
          key={action.label}
          onClick={action.type === 'p2p' ? onOpenP2P : undefined}
        >
          <span className={`quick-action__bubble quick-action__bubble--${action.type}`}>
            {quickImages[action.type] ? (
              <img
                className={`quick-action__image quick-action__image--${action.type}`}
                src={quickImages[action.type]}
                alt=""
              />
            ) : (
              <BybitIcon
                className={`quick-icon quick-icon--${action.type}`}
                family="moly"
                glyph={action.glyph}
                size={24}
              />
            )}
          </span>
          <span className="quick-action__label">{action.label}</span>
        </button>
      ))}
    </nav>
  )
}
