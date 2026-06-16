import adsActiveIcon from '../../assets/bybit/p2p/nav/ads-active-i.png'
import adsInactiveIcon from '../../assets/bybit/p2p/nav/ads-inactive-i.png'
import ordersActiveIcon from '../../assets/bybit/p2p/nav/orders-active-i.png'
import ordersInactiveIcon from '../../assets/bybit/p2p/nav/orders-inactive-i.png'
import profileActiveIcon from '../../assets/bybit/p2p/nav/profile-active-i.png'
import profileInactiveIcon from '../../assets/bybit/p2p/nav/profile-inactive-i.png'
import { useAppSettings } from '../../settings/AppSettingsContext'
import { BybitIcon } from '../ui/BybitIcon'
import './P2PBottomNav.css'

const navIcons = {
  ads: {
    active: adsActiveIcon,
    inactive: adsInactiveIcon,
  },
  orders: {
    active: ordersActiveIcon,
    inactive: ordersInactiveIcon,
  },
  profile: {
    active: profileActiveIcon,
    inactive: profileInactiveIcon,
  },
}

export function P2PBottomNav({ activeKey = 'p2p', onNavigate }) {
  const { settings } = useAppSettings()

  return (
    <nav className="p2p-bottom-nav" aria-label="P2P навигация">
      {settings.p2p.bottomNavItems.map((item) => {
        const isActive = item.key === activeKey

        return (
          <button
            className={isActive ? 'is-active' : ''}
            key={item.label}
            onClick={() => onNavigate?.(item.key)}
          >
            {item.icon === 'home' ? (
              <BybitIcon family="tab" glyph={'\ue900'} size={23} />
            ) : (
              <img
                className={`p2p-bottom-nav__image p2p-bottom-nav__image--${item.icon}`}
                src={navIcons[item.icon]?.[isActive ? 'active' : 'inactive']}
                alt=""
              />
            )}
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
