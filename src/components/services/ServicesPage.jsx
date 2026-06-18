import { ArrowLeft, Search } from 'lucide-react'
import { quickActionVisuals } from '../../data/quickActionPresets'
import { useAppSettings } from '../../settings/AppSettingsContext'
import { BybitIcon } from '../ui/BybitIcon'
import {
  buyCryptoServices,
  recommendedServices,
  servicesTabs,
  tradingServices,
} from './servicesData'
import './ServicesPage.css'

function ServiceIcon({ icon: Icon, image, label, glyph, family, type }) {
  if (image) {
    return (
      <img
        className={`services-page__icon-image services-page__icon-image--${type}`.trim()}
        src={image}
        alt=""
        aria-hidden="true"
      />
    )
  }

  if (glyph) {
    return (
      <BybitIcon
        family={family}
        glyph={glyph}
        size={label === 'P2P торговля' ? 30 : 26}
        label={label}
      />
    )
  }

  return <Icon aria-hidden="true" size={24} strokeWidth={1.9} />
}

function ServicesGrid({ items, columns = 4 }) {
  return (
    <div
      className="services-page__grid"
      style={{ '--services-columns': columns }}
    >
      {items.map(({ badge, icon, image, label, glyph, family, type }) => (
        <button className="services-page__grid-item" key={label}>
          <span className="services-page__grid-icon">
            <ServiceIcon
              icon={icon}
              image={image}
              label={label}
              glyph={glyph}
              family={family}
              type={type}
            />
            {badge ? <b>{badge}</b> : null}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}

export function ServicesPage({ onBack, onOpenSearch }) {
  const { settings } = useAppSettings()
  const favoriteServices = settings.home.quickActions.slice(0, 3)

  return (
    <main className="services-page">
      <header className="services-page__header">
        <button className="services-page__back" onClick={onBack} aria-label="Назад">
          <ArrowLeft size={24} strokeWidth={2.4} />
        </button>
        <strong>Услуги</strong>
        <span className="services-page__spacer" aria-hidden="true" />
      </header>

      <button className="services-page__search" onClick={onOpenSearch}>
        <Search size={18} strokeWidth={2.1} />
        <span>Поиск</span>
      </button>

      <section className="services-page__section">
        <h2>Избранное</h2>
        <div className="services-page__favorites-card">
          <div className="services-page__favorites-list">
            {favoriteServices.map(({ icon, image, label, glyph, family, type }) => (
              <span className="services-page__favorite" key={label}>
                <ServiceIcon
                  icon={icon ?? quickActionVisuals[type]?.icon}
                  image={
                    type === 'p2p'
                      ? undefined
                      : image ??
                        quickActionVisuals[type]?.servicesImage ??
                        quickActionVisuals[type]?.image
                  }
                  label={label}
                  glyph={
                    type === 'p2p'
                      ? '\ue8cd'
                      : glyph ?? quickActionVisuals[type]?.glyph
                  }
                  family={family ?? quickActionVisuals[type]?.family}
                  type={type}
                />
              </span>
            ))}
          </div>
          <button className="services-page__edit">Изменить</button>
        </div>
      </section>

      <div className="services-page__tabs" role="tablist" aria-label="Категории услуг">
        {servicesTabs.map((tab, index) => (
          <button className={index === 0 ? 'is-active' : ''} key={tab}>
            {tab}
          </button>
        ))}
      </div>

      <section className="services-page__section">
        <ServicesGrid items={recommendedServices} columns={4} />
      </section>

      <section className="services-page__section">
        <h3>КУПИТЬ КРИПТОВАЛЮТУ</h3>
        <ServicesGrid items={buyCryptoServices} columns={4} />
      </section>

      <section className="services-page__section">
        <h3>Торговать</h3>
        <ServicesGrid items={tradingServices} columns={4} />
      </section>
    </main>
  )
}
