import { useAppSettings } from '../../settings/AppSettingsContext'
import { BybitIcon } from '../ui/BybitIcon'
import './BottomNav.css'

export function BottomNav() {
  const { settings } = useAppSettings()

  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      {settings.home.bottomNavItems.map(({ label, glyph, active }) => (
        <button className={active ? 'is-active' : ''} key={label}>
          <BybitIcon family="tab" glyph={glyph} size={25} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
