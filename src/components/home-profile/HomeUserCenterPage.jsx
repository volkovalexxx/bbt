import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CircleHelp,
  Copy,
  Globe,
  IdCard,
  Link2,
  Moon,
  Percent,
  ShieldCheck,
  UserCircle2,
  Users,
  WalletCards,
} from 'lucide-react'
import avatarKyc from '../../assets/bybit/profile/kyc1.png'
import { defaultSettings } from '../../data/defaultSettings'
import vipZeroImage from '../../../vip0-b684a62dc66dbf0571741fa7243dae16.png'
import './HomeUserCenterPage.css'

function RowIcon({ type }) {
  if (type === 'avatar') return <UserCircle2 size={20} strokeWidth={1.9} />
  if (type === 'nickname') return <IdCard size={20} strokeWidth={1.9} />
  if (type === 'uid') return <div className="home-user-center-page__id-badge" aria-hidden="true" />
  if (type === 'verification') {
    return (
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M5.787 2.999h9.723a2.083 2.083 0 0 1 2.083 2.083v9.028a2.083 2.083 0 0 1-2.084 2.084h-2.173L11.1 18.11a.694.694 0 0 1-.718.115.695.695 0 0 1-.227-.15L8.28 16.194H5.787a2.083 2.083 0 0 1-2.083-2.084V5.082A2.083 2.083 0 0 1 5.787 3Zm10.214 11.602a.695.695 0 0 0 .203-.49V5.081a.695.695 0 0 0-.695-.694H5.787a.694.694 0 0 0-.694.694v9.028a.694.694 0 0 0 .694.695h2.778a.696.696 0 0 1 .493.201l1.625 1.632 1.945-1.667a.694.694 0 0 1 .451-.166h2.43c.185 0 .361-.074.492-.204Zm-2.707-6.2a2.59 2.59 0 0 1-.695 1.737 4.126 4.126 0 0 1 2.209 3.208.695.695 0 0 1-.611.764h-.077a.695.695 0 0 1-.736-.618 2.778 2.778 0 0 0-5.514 0 .699.699 0 1 1-1.389-.153 4.125 4.125 0 0 1 2.257-3.201 2.59 2.59 0 0 1-.694-1.736 2.625 2.625 0 0 1 5.25 0ZM9.96 9.43a1.236 1.236 0 1 0 1.374-2.056A1.236 1.236 0 0 0 9.96 9.43Z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
  if (type === 'vip') return <ShieldCheck size={20} strokeWidth={1.9} />
  if (type === 'fees') {
    return (
      <div className="home-user-center-page__circle-icon">
        <Percent size={13} strokeWidth={2.05} />
      </div>
    )
  }
  if (type === 'verificationExtra') return <WalletCards size={20} strokeWidth={1.9} />
  if (type === 'subaccount') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M5 21.75A2.75 2.75 0 0 1 2.25 19V5A2.75 2.75 0 0 1 5 2.25h14A2.75 2.75 0 0 1 21.75 5v14A2.75 2.75 0 0 1 19 21.75H5ZM3.75 19c0 .69.56 1.25 1.25 1.25h14c.69 0 1.25-.56 1.25-1.25V5c0-.69-.56-1.25-1.25-1.25H5c-.69 0-1.25.56-1.25 1.25v14Z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M9.75 9.5a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm4.732 2.812a3.75 3.75 0 1 0-4.963 0A5.75 5.75 0 0 0 6.25 17.5a.75.75 0 0 0 1.5 0 4.25 4.25 0 0 1 8.5 0 .75.75 0 0 0 1.5 0 5.75 5.75 0 0 0-3.268-5.188Z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
  if (type === 'link') return <Link2 size={20} strokeWidth={1.9} />
  return <Users size={20} strokeWidth={1.9} />
}

function TrailingContent({ row }) {
  if (row.trailing === 'avatar') {
    return (
      <div className="home-user-center-page__trailing-avatar-wrap">
        <img className="home-user-center-page__trailing-avatar" src={avatarKyc} alt="" />
      </div>
    )
  }

  if (row.trailing === 'copy') {
    return (
      <div className="home-user-center-page__row-copy">
        <span>{row.value}</span>
        <Copy size={15} strokeWidth={1.9} />
      </div>
    )
  }

  if (row.trailing === 'socials') {
    return (
      <div className="home-user-center-page__socials">
        <span className="is-telegram">✈</span>
        <span className="is-x">X</span>
      </div>
    )
  }

  if (row.value) {
    return (
      <div className="home-user-center-page__row-value">
        {row.valuePrefixImage === 'vip0' ? (
          <img className="home-user-center-page__value-prefix-image" src={vipZeroImage} alt="" />
        ) : row.valuePrefix ? (
          <i>{row.valuePrefix}</i>
        ) : null}
        <span>{row.value}</span>
      </div>
    )
  }

  return null
}

export function HomeUserCenterPage({ onBack, onOpenKyc, settings }) {
  const safeSettings = settings ?? defaultSettings.home.profilePage.userCenter
  const { logoutLabel, protect, rows, siteChipLabel, tabs, title, userName } = safeSettings

  return (
    <main className="home-user-center-page">
      <header className="home-user-center-page__topbar">
        <button className="home-user-center-page__back" onClick={onBack} type="button">
          <ArrowLeft size={24} strokeWidth={2.1} />
        </button>
        <strong>{title}</strong>
        <div className="home-user-center-page__tools">
          <button type="button">
            <Moon size={22} strokeWidth={1.9} />
          </button>
          <button type="button">
            <Globe size={22} strokeWidth={1.9} />
          </button>
        </div>
      </header>

      <section className="home-user-center-page__identity">
        <img className="home-user-center-page__avatar" src={avatarKyc} alt="" />
        <div className="home-user-center-page__identity-copy">
          <strong>{userName}</strong>
          <span>{siteChipLabel}</span>
        </div>
      </section>

      <section className="home-user-center-page__protect-card">
        <div className="home-user-center-page__protect-title">
          <strong>{protect.title}</strong>
          <CircleHelp size={15} strokeWidth={1.8} />
        </div>
        <p>{protect.description}</p>
        <button className="home-user-center-page__protect-action" type="button">
          {protect.actionLabel}
          <ChevronRight size={16} strokeWidth={1.9} />
        </button>
      </section>

      <nav className="home-user-center-page__tabs" aria-label="Категории">
        {tabs.map((tab, index) => (
          <button
            className={`home-user-center-page__tab${index === 0 ? ' is-active' : ''}`}
            key={tab}
            type="button"
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="home-user-center-page__rows">
        {rows.map((row) => (
          <button
            className="home-user-center-page__row"
            key={row.label}
            onClick={row.action === 'kyc' ? onOpenKyc : undefined}
            type="button"
          >
            <div className="home-user-center-page__row-left">
              <span className="home-user-center-page__row-icon">
                <RowIcon type={row.icon} />
              </span>
              <span className="home-user-center-page__row-label">
                {String(row.label)
                  .split('\n')
                  .map((part, index) => (
                    <span key={`${row.label}-${index}`}>{part}</span>
                  ))}
              </span>
            </div>
            <div className="home-user-center-page__row-right">
              <TrailingContent row={row} />
              <ArrowRight size={17} strokeWidth={1.9} />
            </div>
          </button>
        ))}
      </section>

      <footer className="home-user-center-page__logout-bar">
        <button className="home-user-center-page__logout" type="button">
          {logoutLabel}
        </button>
      </footer>
    </main>
  )
}
