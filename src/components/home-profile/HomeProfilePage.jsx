import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Gift,
  RefreshCcw,
  Send,
  WalletCards,
} from 'lucide-react'
import avatarKyc from '../../assets/bybit/profile/kyc1.png'
import topToolsStrip from '../../assets/bybit/home-profile/top-tools.jpg'
import referralIcon from '../../assets/bybit/icons/referral-program.svg'
import { quickActionVisuals } from '../../data/quickActionPresets'
import { useAppSettings } from '../../settings/AppSettingsContext'
import { BybitIcon } from '../ui/BybitIcon'
import './HomeProfilePage.css'

function ShortcutIcon({ type }) {
  if (type === 'card') {
    return <WalletCards size={34} strokeWidth={1.9} />
  }

  if (type === 'bonus') {
    return <Gift size={34} strokeWidth={1.9} />
  }

  return <img className="home-profile-page__shortcut-image" src={referralIcon} alt="" />
}

function RecentIcon({ type }) {
  if (type === 'p2p') {
    return <BybitIcon family="moly" glyph={'\ue8cd'} size={28} label="P2P торговля" />
  }

  if (type === 'wallet') {
    return <img className="home-profile-page__recent-image" src={quickActionVisuals.wallet?.image} alt="" />
  }

  if (type === 'convert') {
    return <RefreshCcw size={28} strokeWidth={1.9} />
  }

  return <Send size={28} strokeWidth={1.9} />
}

export function HomeProfilePage({ onBack }) {
  const { settings } = useAppSettings()
  const { profilePage } = settings.home

  const recentActions = [
    { icon: 'p2p', label: 'P2P торговля' },
    { icon: 'wallet', label: 'Кошелёк' },
    { icon: 'convert', label: 'Обмен' },
    { icon: 'notifications', label: 'Оповещения' },
  ]

  return (
    <main className="home-profile-page">
      <header className="home-profile-page__topbar">
        <button className="home-profile-page__back" onClick={onBack} aria-label="Назад">
          <ArrowLeft size={30} strokeWidth={2.2} />
        </button>

        <div className="home-profile-page__tools">
          <img className="home-profile-page__tools-strip" src={topToolsStrip} alt="" aria-hidden="true" />
        </div>
      </header>

      <section className="home-profile-page__identity">
        <img className="home-profile-page__avatar" src={avatarKyc} alt="" />

        <div className="home-profile-page__identity-main">
          <div className="home-profile-page__identity-row">
            <strong>{profilePage.user.name}</strong>
            <ArrowLeft className="home-profile-page__forward" size={28} strokeWidth={2.1} />
          </div>

          <div className="home-profile-page__meta">
            <span>UID: {profilePage.user.uid}</span>
            <Copy size={15} strokeWidth={2} />
            <i />
            <span>{profilePage.user.siteLabel}</span>
          </div>

          <div className="home-profile-page__badges">
            <span className="home-profile-page__badge home-profile-page__badge--dark">
              <span className="home-profile-page__badge-check">✓</span>
              {profilePage.user.verificationLabel}
            </span>
            <span className="home-profile-page__badge home-profile-page__badge--light">
              {profilePage.user.vipLevelLabel}
              <ArrowLeft className="home-profile-page__badge-arrow" size={18} strokeWidth={2.1} />
            </span>
          </div>
        </div>
      </section>

      <section className="home-profile-page__vip-card">
        <strong>{profilePage.promo.title}</strong>
        <p>{profilePage.promo.description}</p>
        <span className="home-profile-page__vip-line" />
        <div className="home-profile-page__vip-footer">
          <button className="home-profile-page__vip-link">
            {profilePage.promo.linkLabel}
            <ArrowLeft className="home-profile-page__vip-link-arrow" size={22} strokeWidth={2} />
          </button>
          <button className="home-profile-page__vip-button">{profilePage.promo.buttonLabel}</button>
        </div>
      </section>

      <section className="home-profile-page__shortcuts">
        {profilePage.shortcuts.map((shortcut) => (
          <button className="home-profile-page__shortcut" key={shortcut.title}>
            <ShortcutIcon type={shortcut.icon} />
            <div className="home-profile-page__shortcut-copy">
              <strong>{shortcut.title}</strong>
              <span>{shortcut.subtitle}</span>
            </div>
          </button>
        ))}
      </section>

      <section className="home-profile-page__recent">
        <h2>{profilePage.recentTitle}</h2>
        <div className="home-profile-page__recent-grid">
          {recentActions.map((action) => (
            <button className="home-profile-page__recent-item" key={action.label}>
              <RecentIcon type={action.icon} />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
        <button className="home-profile-page__all-services">{profilePage.allServicesLabel}</button>
      </section>

      <footer className="home-profile-page__footer">
        <button className="home-profile-page__footer-link home-profile-page__footer-link--lite">
          <span>{profilePage.footerLinks[0]}</span>
          <svg
            className="home-profile-page__footer-lite-icon"
            aria-hidden="true"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 4H3.5M3.5 4L7 1M3.5 4L7 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 12H16.5M16.5 12L13 9M16.5 12L13 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <i />
        <button className="home-profile-page__footer-link home-profile-page__footer-link--about">
          <span>{profilePage.footerLinks[1]}</span>
          <ArrowRight size={18} strokeWidth={2.1} />
        </button>
      </footer>
    </main>
  )
}
