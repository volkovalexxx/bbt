import { quickActionVisuals } from '../../data/quickActionPresets'
import { useAppSettings } from '../../settings/AppSettingsContext'
import { BybitIcon } from '../ui/BybitIcon'
import './QuickActions.css'

export function QuickActions({ onOpenP2P, onOpenServices }) {
  const { settings } = useAppSettings()
  const isExpandedPreset = settings.home.quickActions.length > 4
  const isWidePreset = settings.home.quickActions.length > 8

  return (
    <nav
      className={[
        'quick-actions',
        isExpandedPreset ? 'quick-actions--expanded' : '',
        isWidePreset ? 'quick-actions--wide' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Быстрые действия"
    >
      {settings.home.quickActions.map((action) => (
        <button
          className={`quick-action quick-action--${action.type}`}
          key={action.label}
          onClick={
            action.type === 'p2p'
              ? onOpenP2P
              : action.type === 'more'
                ? onOpenServices
                : undefined
          }
        >
          <span className={`quick-action__bubble quick-action__bubble--${action.type}`}>
            {quickActionVisuals[action.type]?.image ? (
              <img
                className={`quick-action__image quick-action__image--${action.type}`}
                src={quickActionVisuals[action.type].image}
                alt=""
              />
            ) : (
              <BybitIcon
                className={`quick-icon quick-icon--${action.type}`}
                family={quickActionVisuals[action.type]?.family ?? 'moly'}
                glyph={action.glyph}
                size={24}
              />
            )}
            {action.badge ? <b className="quick-action__badge">{action.badge}</b> : null}
          </span>
          <span
            className={`quick-action__label ${String(action.label).includes('\n') ? 'quick-action__label--multiline' : ''}`.trim()}
          >
            {String(action.label)}
          </span>
        </button>
      ))}
    </nav>
  )
}
