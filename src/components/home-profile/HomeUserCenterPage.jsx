import {
  ArrowLeft,
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
  UserRoundCheck,
  Users,
  WalletCards,
} from 'lucide-react'
import avatarKyc from '../../assets/bybit/profile/kyc1.png'
import { defaultSettings } from '../../data/defaultSettings'
import './HomeUserCenterPage.css'

function RowIcon({ type }) {
  if (type === 'avatar') return <UserCircle2 size={20} strokeWidth={1.9} />
  if (type === 'nickname') return <IdCard size={20} strokeWidth={1.9} />
  if (type === 'uid') return <div className="home-user-center-page__id-badge">ID</div>
  if (type === 'verification') return <UserRoundCheck size={20} strokeWidth={1.9} />
  if (type === 'vip') return <ShieldCheck size={20} strokeWidth={1.9} />
  if (type === 'fees') return <Percent size={20} strokeWidth={1.9} />
  if (type === 'verificationExtra') return <WalletCards size={20} strokeWidth={1.9} />
  if (type === 'subaccount') return <Users size={20} strokeWidth={1.9} />
  if (type === 'link') return <Link2 size={20} strokeWidth={1.9} />
  return <Users size={20} strokeWidth={1.9} />
}

function TrailingContent({ row }) {
  if (row.trailing === 'avatar') {
    return (
      <div className="home-user-center-page__trailing-avatar-wrap">
        <img className="home-user-center-page__trailing-avatar" src={avatarKyc} alt="" />
        <ChevronRight size={17} strokeWidth={1.9} />
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
        {row.valuePrefix ? <i>{row.valuePrefix}</i> : null}
        <span>{row.value}</span>
      </div>
    )
  }

  return null
}

export function HomeUserCenterPage({ onBack, settings }) {
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
          <button className="home-user-center-page__row" key={row.label} type="button">
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
              <ChevronRight size={17} strokeWidth={1.9} />
            </div>
          </button>
        ))}
      </section>

      <button className="home-user-center-page__logout" type="button">
        {logoutLabel}
      </button>
    </main>
  )
}
