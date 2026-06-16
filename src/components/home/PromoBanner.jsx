import footballField from '../../assets/bybit/promo/football-field.png'
import { useAppSettings } from '../../settings/AppSettingsContext'
import './PromoBanner.css'

export function PromoBanner() {
  const { settings } = useAppSettings()
  const { countLabel, eyebrow, lines } = settings.home.promoBanner

  return (
    <section className="promo-banner" aria-label="Футбольный сезон">
      <img className="promo-banner__image" src={footballField} alt="" />
      <div className="promo-banner__content">
        <span className="promo-banner__eyebrow">{eyebrow}</span>
        <strong>
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </strong>
      </div>
      <span className="promo-banner__count">{countLabel}</span>
    </section>
  )
}
