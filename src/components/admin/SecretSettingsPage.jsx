import { useRef, useState } from 'react'
import { ArrowLeft, RotateCcw, Save } from 'lucide-react'
import { useAppSettings } from '../../settings/AppSettingsContext'
import { defaultSettings } from '../../data/defaultSettings'
import { cloneSettings, updateByPath } from './settingsFormUtils'
import './SecretSettingsPage.css'

function normalizeWholeNonNegative(value) {
  const parsed = Number.parseInt(String(value).replace(/[^\d-]/g, ''), 10)

  if (!Number.isFinite(parsed)) {
    return '0'
  }

  return String(Math.max(0, parsed))
}

function Section({ children, sectionRef, title }) {
  return (
    <section className="secret-settings-page__section" ref={sectionRef}>
      <header className="secret-settings-page__section-header">
        <strong>{title}</strong>
      </header>
      <div className="secret-settings-page__section-body">{children}</div>
    </section>
  )
}

function Field({ label, onChange, type = 'text', value }) {
  return (
    <label className="secret-settings-page__field">
      <span>{label}</span>
      <input
        className="secret-settings-page__input"
        onChange={onChange}
        spellCheck={false}
        type={type}
        value={value}
      />
    </label>
  )
}

function Toggle({ checked, label, onChange }) {
  return (
    <label className="secret-settings-page__toggle">
      <span>{label}</span>
      <input checked={checked} onChange={onChange} type="checkbox" />
    </label>
  )
}

function OrderEditor({ index, onChange, order }) {
  return (
    <div className="secret-settings-page__card">
      <strong className="secret-settings-page__card-title">Ордер {index + 1}</strong>
      <div className="secret-settings-page__grid">
        <Field
          label="Ник"
          onChange={(event) => onChange(['p2p', 'orders', index, 'name'], event.target.value)}
          value={order.name ?? ''}
        />
        <Field
          label="Ордера / рейтинг"
          onChange={(event) =>
            onChange(['p2p', 'orders', index, 'completion'], event.target.value)
          }
          value={order.completion ?? ''}
        />
        <Field
          label="Цена"
          onChange={(event) => onChange(['p2p', 'orders', index, 'price'], event.target.value)}
          value={order.price ?? ''}
        />
        <Field
          label="Время"
          onChange={(event) => onChange(['p2p', 'orders', index, 'time'], event.target.value)}
          value={order.time ?? ''}
        />
        <Field
          label="Лимиты"
          onChange={(event) => onChange(['p2p', 'orders', index, 'limit'], event.target.value)}
          value={order.limit ?? ''}
        />
        <Field
          label="Количество"
          onChange={(event) =>
            onChange(['p2p', 'orders', index, 'quantity'], event.target.value)
          }
          value={order.quantity ?? ''}
        />
        <Field
          label="Методы оплаты"
          onChange={(event) =>
            onChange(
              ['p2p', 'orders', index, 'methods'],
              event.target.value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
          value={(order.methods ?? []).join(', ')}
        />
      </div>
      <div className="secret-settings-page__toggles">
        <Toggle
          checked={Boolean(order.disabled)}
          label="Недоступно"
          onChange={(event) =>
            onChange(['p2p', 'orders', index, 'disabled'], event.target.checked)
          }
        />
        <Toggle
          checked={order.visible ?? true}
          label="Показывать"
          onChange={(event) =>
            onChange(['p2p', 'orders', index, 'visible'], event.target.checked)
          }
        />
      </div>
    </div>
  )
}

export function SecretSettingsPage({ onBack }) {
  const { resetSettings, saveSettings, settings } = useAppSettings()
  const [draft, setDraft] = useState(() => cloneSettings(settings))
  const [isSaving, setIsSaving] = useState(false)
  const profileSectionRef = useRef(null)
  const homeSectionRef = useRef(null)
  const homeProfileSectionRef = useRef(null)
  const ordersSectionRef = useRef(null)
  const detailsSectionRef = useRef(null)
  const sectionRefs = {
    profile: profileSectionRef,
    home: homeSectionRef,
    homeProfile: homeProfileSectionRef,
    orders: ordersSectionRef,
    details: detailsSectionRef,
  }

  const navItems = [
    { key: 'profile', label: 'Профиль' },
    { key: 'home', label: 'Главная' },
    { key: 'homeProfile', label: 'Профиль Home' },
    { key: 'orders', label: 'P2P ордеры' },
    { key: 'details', label: 'Больше данных' },
  ]

  const handleChange = (path, nextValue) => {
    setDraft((current) => updateByPath(current, path, nextValue))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const nextSettings = await saveSettings(draft)
      setDraft(cloneSettings(nextSettings))
    } catch (error) {
      window.alert(`Ошибка сохранения: ${error.message}`)
    } finally {
      window.setTimeout(() => {
        setIsSaving(false)
      }, 380)
    }
  }

  const handleReset = async () => {
    try {
      const defaults = await resetSettings()
      setDraft(cloneSettings(defaults))
    } catch (error) {
      window.alert(`Ошибка сброса: ${error.message}`)
    }
  }

  const profileMenu = draft.p2p.profile.menuGroups
  const profileStats = draft.p2p.profile.stats
  const homeProfile = draft.home.profilePage
  const homeKycPage =
    homeProfile.userCenter.kycPage ?? defaultSettings.home.profilePage.userCenter.kycPage
  const profileBadges = draft.p2p.profile.badges
  const profileStatuses = draft.p2p.profile.statuses
  const detailStats = draft.p2p.profile.details.sections[0]
  const detailExtra = draft.p2p.profile.details.sections[1]
  const featuredOrder = draft.p2p.orders[0]
  const ratingVotes = String(detailStats[2].valueNote ?? '0 | 0')
    .split('|')
    .map((value) => value.trim())
  const ratingLikes = normalizeWholeNonNegative(ratingVotes[0] ?? '0')
  const ratingDislikes = normalizeWholeNonNegative(ratingVotes[1] ?? '0')

  const scrollToSection = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="secret-settings-page">
      <header className="secret-settings-page__header">
        <button className="secret-settings-page__icon-button" onClick={onBack}>
          <ArrowLeft size={20} strokeWidth={2.4} />
        </button>
        <strong>Admin</strong>
        <div className="secret-settings-page__actions">
          <button className="secret-settings-page__icon-button" onClick={handleReset}>
            <RotateCcw size={18} strokeWidth={2.1} />
          </button>
          <button
            className={`secret-settings-page__save ${isSaving ? 'is-saving' : ''}`}
            disabled={isSaving}
            onClick={handleSave}
          >
            <Save size={16} strokeWidth={2.1} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      <nav className="secret-settings-page__nav" aria-label="Навигация по настройкам">
        {navItems.map((item) => (
          <button
            className="secret-settings-page__nav-chip"
            key={item.key}
            onClick={() => scrollToSection(item.key)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="secret-settings-page__content">
        <Section sectionRef={profileSectionRef} title="Профиль">
          <div className="secret-settings-page__grid">
            <Field
              label="Ник"
              onChange={(event) => handleChange(['p2p', 'profile', 'user', 'name'], event.target.value)}
              value={draft.p2p.profile.user.name}
            />
            <Toggle
              checked={Boolean(draft.p2p.profile.makerBanner?.visible)}
              label="Плашка мейкера"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'makerBanner', 'visible'], event.target.checked)
              }
            />
            <Field
              label="Заголовок плашки"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'makerBanner', 'title'], event.target.value)
              }
              value={draft.p2p.profile.makerBanner?.title ?? ''}
            />
            <Field
              label="Описание плашки"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'makerBanner', 'description'], event.target.value)
              }
              value={draft.p2p.profile.makerBanner?.description ?? ''}
            />
            <Toggle
              checked={Boolean(profileBadges?.merchant)}
              label="Мерчант бейдж"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'badges', 'merchant'], event.target.checked)
              }
            />
            <Toggle
              checked={Boolean(profileBadges?.vipBronze)}
              label="VIP Bronze"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'badges', 'vipBronze'], event.target.checked)
              }
            />
            <Toggle
              checked={Boolean(profileBadges?.vipSilver)}
              label="VIP Silver"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'badges', 'vipSilver'], event.target.checked)
              }
            />
            <Toggle
              checked={Boolean(profileBadges?.vipGold)}
              label="VIP Gold"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'badges', 'vipGold'], event.target.checked)
              }
            />
            <Toggle
              checked={Boolean(profileStatuses?.[0]?.active)}
              label="Эл. почта"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'statuses', 0, 'active'], event.target.checked)
              }
            />
            <Toggle
              checked={Boolean(profileStatuses?.[1]?.active)}
              label="SMS"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'statuses', 1, 'active'], event.target.checked)
              }
            />
            <Toggle
              checked={Boolean(profileStatuses?.[2]?.active)}
              label="Верификация личности"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'statuses', 2, 'active'], event.target.checked)
              }
            />
            <Toggle
              checked={Boolean(profileStatuses?.[3]?.active)}
              label="Депозит"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'statuses', 3, 'active'], event.target.checked)
              }
            />
            <Field
              label="Способ оплаты"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'menuGroups', 0, 1, 'value'], event.target.value)
              }
              value={profileMenu[0][1].value ?? ''}
            />
            <Field
              label="Мерчант"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'menuGroups', 0, 2, 'value'], event.target.value)
              }
              value={profileMenu[0][2].value ?? ''}
            />
            <Field
              label="Отзывы %"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'menuGroups', 1, 0, 'value'], Number(event.target.value))
              }
              type="number"
              value={profileMenu[1][0].value ?? 0}
            />
            <Field
              label="Ордеры за 30 дней"
              onChange={(event) => handleChange(['p2p', 'profile', 'stats', 0, 'value'], event.target.value)}
              value={profileStats[0].value}
            />
            <Field
              label="Исполнено за 30 дней"
              onChange={(event) => handleChange(['p2p', 'profile', 'stats', 1, 'value'], event.target.value)}
              value={profileStats[1].value}
            />
            <Field
              label="Средн. время перевода"
              onChange={(event) => handleChange(['p2p', 'profile', 'stats', 2, 'value'], event.target.value)}
              value={profileStats[2].value}
            />
            <Field
              label="Средн. время оплаты"
              onChange={(event) => handleChange(['p2p', 'profile', 'stats', 3, 'value'], event.target.value)}
              value={profileStats[3].value}
            />
          </div>
        </Section>

        <Section sectionRef={homeSectionRef} title="Главная">
          <Field
            label="Баланс"
            onChange={(event) =>
              handleChange(['home', 'assetOverview', 'balanceUsd'], Number(event.target.value))
            }
            type="number"
            value={draft.home.assetOverview.balanceUsd}
          />
        </Section>

        <Section sectionRef={homeProfileSectionRef} title="Профиль главной">
          <div className="secret-settings-page__grid">
            <Field
              label="Ник"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'user', 'name'], event.target.value)
              }
              value={homeProfile.user.name}
            />
            <Field
              label="UID"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'user', 'uid'], event.target.value)
              }
              value={homeProfile.user.uid}
            />
            <Field
              label="Site"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'user', 'siteLabel'], event.target.value)
              }
              value={homeProfile.user.siteLabel}
            />
            <Field
              label="Бейдж верификации"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'user', 'verificationLabel'], event.target.value)
              }
              value={homeProfile.user.verificationLabel}
            />
            <Field
              label="Бейдж VIP"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'user', 'vipLevelLabel'], event.target.value)
              }
              value={homeProfile.user.vipLevelLabel}
            />
            <Field
              label="VIP заголовок"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'promo', 'title'], event.target.value)
              }
              value={homeProfile.promo.title}
            />
            <Field
              label="VIP описание"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'promo', 'description'], event.target.value)
              }
              value={homeProfile.promo.description}
            />
            <Field
              label="VIP ссылка"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'promo', 'linkLabel'], event.target.value)
              }
              value={homeProfile.promo.linkLabel}
            />
            <Field
              label="VIP кнопка"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'promo', 'buttonLabel'], event.target.value)
              }
              value={homeProfile.promo.buttonLabel}
            />
            <Field
              label="Карта Bybit"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'shortcuts', 0, 'title'], event.target.value)
              }
              value={homeProfile.shortcuts[0].title}
            />
            <Field
              label="Подпись карты"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'shortcuts', 0, 'subtitle'], event.target.value)
              }
              value={homeProfile.shortcuts[0].subtitle}
            />
            <Field
              label="Бонусы"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'shortcuts', 1, 'title'], event.target.value)
              }
              value={homeProfile.shortcuts[1].title}
            />
            <Field
              label="Подпись бонусов"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'shortcuts', 1, 'subtitle'], event.target.value)
              }
              value={homeProfile.shortcuts[1].subtitle}
            />
            <Field
              label="Реферал"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'shortcuts', 2, 'title'], event.target.value)
              }
              value={homeProfile.shortcuts[2].title}
            />
            <Field
              label="Подпись реферала"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'shortcuts', 2, 'subtitle'], event.target.value)
              }
              value={homeProfile.shortcuts[2].subtitle}
            />
            <Field
              label="Недавно использовано"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'recentTitle'], event.target.value)
              }
              value={homeProfile.recentTitle}
            />
            <Field
              label="Кнопка сервисов"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'allServicesLabel'], event.target.value)
              }
              value={homeProfile.allServicesLabel}
            />
            <Field
              label="Нижний левый текст"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'footerLinks', 0], event.target.value)
              }
              value={homeProfile.footerLinks[0]}
            />
            <Field
              label="Нижний правый текст"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'footerLinks', 1], event.target.value)
              }
              value={homeProfile.footerLinks[1]}
            />
            <Field
              label="User Center заголовок"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'userCenter', 'title'], event.target.value)
              }
              value={homeProfile.userCenter.title}
            />
            <Field
              label="User Center ник"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'userCenter', 'userName'], event.target.value)
              }
              value={homeProfile.userCenter.userName}
            />
            <Field
              label="User Center site"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'userCenter', 'siteChipLabel'], event.target.value)
              }
              value={homeProfile.userCenter.siteChipLabel}
            />
            <Field
              label="Protect заголовок"
              onChange={(event) =>
                handleChange(['home', 'profilePage', 'userCenter', 'protect', 'title'], event.target.value)
              }
              value={homeProfile.userCenter.protect.title}
            />
            <Field
              label="Protect описание"
              onChange={(event) =>
                handleChange(
                  ['home', 'profilePage', 'userCenter', 'protect', 'description'],
                  event.target.value,
                )
              }
              value={homeProfile.userCenter.protect.description}
            />
            <Field
              label="Protect действие"
              onChange={(event) =>
                handleChange(
                  ['home', 'profilePage', 'userCenter', 'protect', 'actionLabel'],
                  event.target.value,
                )
              }
              value={homeProfile.userCenter.protect.actionLabel}
            />
            <Toggle
              checked={Boolean(homeKycPage.twoFactor?.requireTwoFactorReveal)}
              label="KYC 2FA при раскрытии данных"
              onChange={(event) =>
                handleChange(
                  [
                    'home',
                    'profilePage',
                    'userCenter',
                    'kycPage',
                    'twoFactor',
                    'requireTwoFactorReveal',
                  ],
                  event.target.checked,
                )
              }
            />
            <Field
              label="KYC имя после раскрытия"
              onChange={(event) =>
                handleChange(
                  ['home', 'profilePage', 'userCenter', 'kycPage', 'twoFactor', 'revealedName'],
                  event.target.value,
                )
              }
              value={homeKycPage.twoFactor?.revealedName ?? ''}
            />
            <Field
              label="KYC документ после раскрытия"
              onChange={(event) =>
                handleChange(
                  ['home', 'profilePage', 'userCenter', 'kycPage', 'twoFactor', 'revealedDocumentId'],
                  event.target.value,
                )
              }
              value={homeKycPage.twoFactor?.revealedDocumentId ?? ''}
            />
            <Field
              label="KYC страна после раскрытия"
              onChange={(event) =>
                handleChange(
                  ['home', 'profilePage', 'userCenter', 'kycPage', 'twoFactor', 'revealedCountry'],
                  event.target.value,
                )
              }
              value={homeKycPage.twoFactor?.revealedCountry ?? ''}
            />
          </div>
        </Section>

        <Section sectionRef={ordersSectionRef} title="P2P ордеры">
          <div className="secret-settings-page__card">
            <strong className="secret-settings-page__card-title">Первый ордер с оранжевой плашкой</strong>
            <div className="secret-settings-page__grid">
              <Field
                label="Текст плашки"
                onChange={(event) =>
                  handleChange(['p2p', 'orders', 0, 'badge'], event.target.value)
                }
                value={featuredOrder.badge ?? ''}
              />
              <Field
                label="Ник"
                onChange={(event) =>
                  handleChange(['p2p', 'orders', 0, 'name'], event.target.value)
                }
                value={featuredOrder.name ?? ''}
              />
              <Field
                label="Ордера / рейтинг"
                onChange={(event) =>
                  handleChange(['p2p', 'orders', 0, 'completion'], event.target.value)
                }
                value={featuredOrder.completion ?? ''}
              />
              <Field
                label="Цена"
                onChange={(event) =>
                  handleChange(['p2p', 'orders', 0, 'price'], event.target.value)
                }
                value={featuredOrder.price ?? ''}
              />
              <Field
                label="Время"
                onChange={(event) =>
                  handleChange(['p2p', 'orders', 0, 'time'], event.target.value)
                }
                value={featuredOrder.time ?? ''}
              />
              <Field
                label="Лимиты"
                onChange={(event) =>
                  handleChange(['p2p', 'orders', 0, 'limit'], event.target.value)
                }
                value={featuredOrder.limit ?? ''}
              />
              <Field
                label="Количество"
                onChange={(event) =>
                  handleChange(['p2p', 'orders', 0, 'quantity'], event.target.value)
                }
                value={featuredOrder.quantity ?? ''}
              />
              <Field
                label="Методы оплаты"
                onChange={(event) =>
                  handleChange(
                    ['p2p', 'orders', 0, 'methods'],
                    event.target.value
                      .split(',')
                      .map((item) => item.trim())
                      .filter(Boolean),
                  )
                }
                value={(featuredOrder.methods ?? []).join(', ')}
              />
            </div>
            <div className="secret-settings-page__toggles">
              <Toggle
                checked={draft.p2p.config.showFeaturedOffer}
                label="Показывать спец-ордер"
                onChange={(event) =>
                  handleChange(['p2p', 'config', 'showFeaturedOffer'], event.target.checked)
                }
              />
              <Toggle
                checked={featuredOrder.visible ?? true}
                label="Видим в списке"
                onChange={(event) =>
                  handleChange(['p2p', 'orders', 0, 'visible'], event.target.checked)
                }
              />
            </div>
          </div>

          {draft.p2p.orders.map((order, index) => (
            index === 0 ? null : (
              <OrderEditor index={index} key={index} onChange={handleChange} order={order} />
            )
          ))}
        </Section>

        <Section sectionRef={detailsSectionRef} title="Больше данных">
          <div className="secret-settings-page__grid">
            <Field
              label="Исполненные ордера за 30 дней"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 0, 0, 'value'], event.target.value)}
              value={detailStats[0].value}
            />
            <Field
              label="Все исполненные ордера"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 0, 1, 'value'], event.target.value)}
              value={detailStats[1].value}
            />
            <Field
              label="Покупка | Продажа"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 0, 1, 'valueNote'], event.target.value)}
              value={detailStats[1].valueNote ?? ''}
            />
            <Field
              label="Высокий рейтинг %"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 0, 2, 'value'], event.target.value)}
              value={detailStats[2].value}
            />
            <Field
              label="Лайки"
              onChange={(event) =>
                handleChange(
                  ['p2p', 'profile', 'details', 'sections', 0, 2, 'valueNote'],
                  `${normalizeWholeNonNegative(event.target.value)} | ${ratingDislikes}`,
                )
              }
              type="number"
              value={ratingLikes}
            />
            <Field
              label="Дизлайки"
              onChange={(event) =>
                handleChange(
                  ['p2p', 'profile', 'details', 'sections', 0, 2, 'valueNote'],
                  `${ratingLikes} | ${normalizeWholeNonNegative(event.target.value)}`,
                )
              }
              type="number"
              value={ratingDislikes}
            />
            <Field
              label="Процент исполнения"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 0, 3, 'value'], event.target.value)}
              value={detailStats[3].value}
            />
            <Field
              label="Средн. время перевода"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 0, 4, 'value'], event.target.value)}
              value={detailStats[4].value}
            />
            <Field
              label="Средн. время оплаты"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 0, 5, 'value'], event.target.value)}
              value={detailStats[5].value}
            />
            <Field
              label="Дней с создания аккаунта"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 1, 0, 'value'], event.target.value)}
              value={detailExtra[0].value}
            />
            <Field
              label="Дней с первой сделки"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 1, 1, 'value'], event.target.value)}
              value={detailExtra[1].value}
            />
            <Field
              label="Показать имя"
              onChange={(event) =>
                handleChange(['p2p', 'profile', 'details', 'sections', 1, 2, 'revealedValue'], event.target.value)
              }
              value={detailExtra[2].revealedValue ?? ''}
            />
            <Toggle
              checked={Boolean(draft.p2p.profile.details.requireTwoFactorReveal)}
              label="2FA при раскрытии имени"
              onChange={(event) =>
                handleChange(
                  ['p2p', 'profile', 'details', 'requireTwoFactorReveal'],
                  event.target.checked,
                )
              }
            />
            <Field
              label="Торговый объём за 30 дней"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 1, 3, 'value'], event.target.value)}
              value={detailExtra[3].value}
            />
            <Field
              label="Общий торговый объём"
              onChange={(event) => handleChange(['p2p', 'profile', 'details', 'sections', 1, 4, 'value'], event.target.value)}
              value={detailExtra[4].value}
            />
          </div>
        </Section>
      </div>
    </main>
  )
}
