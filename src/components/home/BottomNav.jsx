import { useAppSettings } from '../../settings/AppSettingsContext'
import { BybitIcon } from '../ui/BybitIcon'
import './BottomNav.css'
import homeIcon from '../../assets/bybit/home-nav/home.png'
import marketsIcon from '../../assets/bybit/home-nav/rynki.png'
import tradeIcon from '../../assets/bybit/home-nav/trade.png'
import earnIcon from '../../assets/bybit/home-nav/earn.png'
import activitiesIcon from '../../assets/bybit/home-nav/activities.png'

const navImages = {
  activities: activitiesIcon,
  earn: earnIcon,
  home: homeIcon,
  markets: marketsIcon,
  trade: tradeIcon,
}

export function BottomNav() {
  const { settings } = useAppSettings()

  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      {settings.home.bottomNavItems.map(({ label, glyph, active, icon }) => (
        <button className={active ? 'is-active' : ''} key={label}>
          {icon && navImages[icon] ? (
            <img
              className={`bottom-nav__image bottom-nav__image--${icon}`}
              src={navImages[icon]}
              alt=""
              aria-hidden="true"
            />
          ) : (
            <BybitIcon family="tab" glyph={glyph} size={25} />
          )}
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
