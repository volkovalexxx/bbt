import {
  ArrowLeft,
  CircleHelp,
  Ellipsis,
  Eye,
  EyeOff,
  Headphones,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import geoIcon from '../../assets/bybit/kyc/geo-removebg-preview.png'
import verificationCardImage from '../../../verificationCardSuccess-a512f82e.png'
import googleAuthIcon from '../../../740fd7c1-a5e0-44cc-a2c9-64cad5a3feac-removebg-preview.png'
import { defaultSettings } from '../../data/defaultSettings'
import './HomeKycPage.css'

const KYC_MASKS = {
  country: '********',
  document: '**** **** ****',
  name: '****',
}

function KycRevealLoader() {
  return (
    <div className="home-kyc-page__reveal-loader" role="status" aria-label="Раскрытие данных">
      <div className="home-kyc-page__reveal-logo">
        <span className="home-kyc-page__reveal-base" aria-hidden="true">
          <span>B</span>
          <span>Y</span>
          <span>B</span>
          <span className="is-accent">I</span>
          <span>T</span>
        </span>
        <span className="home-kyc-page__reveal-fill" aria-hidden="true">
          <span>B</span>
          <span>Y</span>
          <span>B</span>
          <span className="is-accent">I</span>
          <span>T</span>
        </span>
      </div>
    </div>
  )
}

function IdentityVerificationSheet({ isClosing, isLoading, isOpen, onClose, onConfirm }) {
  const inputRefs = useRef([])
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const isComplete = code.every(Boolean)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const resetTimer = window.setTimeout(() => {
      setCode(['', '', '', '', '', ''])
      setKeyboardOffset(0)
    }, 0)

    const focusTimer = window.setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 260)

    const updateViewportOffset = () => {
      const viewport = window.visualViewport
      if (!viewport) {
        return
      }

      const offset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
      setKeyboardOffset(offset)
    }

    updateViewportOffset()
    window.visualViewport?.addEventListener('resize', updateViewportOffset)
    window.visualViewport?.addEventListener('scroll', updateViewportOffset)

    return () => {
      window.clearTimeout(resetTimer)
      window.clearTimeout(focusTimer)
      window.visualViewport?.removeEventListener('resize', updateViewportOffset)
      window.visualViewport?.removeEventListener('scroll', updateViewportOffset)
    }
  }, [isOpen])

  const handleChange = (index, value) => {
    const nextChar = value.replace(/\D/g, '').slice(-1)
    const nextCode = [...code]
    nextCode[index] = nextChar
    setCode(nextCode)

    if (nextChar && index === nextCode.length - 1) {
      window.setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }, 0)
      return
    }

    if (nextChar && index < nextCode.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      const normalized = clipboardText.replace(/\D/g, '').slice(0, 6).split('')
      if (!normalized.length) {
        return
      }

      const nextCode = Array.from({ length: 6 }, (_, index) => normalized[index] ?? '')
      setCode(nextCode)
      const targetIndex = Math.min(normalized.length, 5)
      inputRefs.current[targetIndex]?.focus()
    } catch {
      // no-op
    }
  }

  const handleConfirm = () => {
    if (!isComplete || isLoading || isClosing) {
      return
    }

    onConfirm()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="home-kyc-page__sheet-overlay">
      <div
        className={`home-kyc-page__sheet${isClosing ? ' is-closing' : ''}`}
        style={{ bottom: `${keyboardOffset}px` }}
      >
        <header className="home-kyc-page__sheet-header">
          <strong>Проверка идентификации</strong>
          <button className="home-kyc-page__sheet-close" disabled={isLoading} onClick={onClose}>
            <X size={22} strokeWidth={2.1} />
          </button>
        </header>
        <div className="home-kyc-page__sheet-provider">
          <img alt="" aria-hidden="true" className="home-kyc-page__ga-icon" src={googleAuthIcon} />
          <span>Google Authenticator</span>
        </div>
        <div className="home-kyc-page__sheet-fields">
          {code.map((value, index) => (
            <input
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              className={`home-kyc-page__sheet-input${value ? ' is-filled' : ''}`}
              inputMode="numeric"
              key={index}
              maxLength={1}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              ref={(node) => {
                inputRefs.current[index] = node
              }}
              type="text"
              value={value}
            />
          ))}
        </div>
        <div className="home-kyc-page__sheet-actions">
          <button className="home-kyc-page__sheet-paste" onClick={handlePaste}>
            Вставить
          </button>
        </div>
        <button
          className={`home-kyc-page__sheet-confirm${isComplete ? ' is-ready' : ''}`}
          onClick={handleConfirm}
        >
          Подтвердить
        </button>
        <p className="home-kyc-page__sheet-help">Возникли проблемы с верификацией?</p>
      </div>
      {isLoading ? <KycRevealLoader /> : null}
    </div>
  )
}

export function HomeKycPage({ onBack, settings }) {
  const defaultKycSettings = defaultSettings.home.profilePage.userCenter.kycPage
  const safeSettings = {
    ...defaultKycSettings,
    ...(settings ?? {}),
    limits: {
      ...defaultKycSettings.limits,
      ...(settings?.limits ?? {}),
    },
    twoFactor: {
      ...defaultKycSettings.twoFactor,
      ...(settings?.twoFactor ?? {}),
    },
  }
  const {
    countryLabel,
    documentIdLabel,
    levelLabel,
    limits,
    limitsTitle,
    nameLabel,
    personalDataTitle,
    statusTitle,
    tabs,
    twoFactor,
    updateLabel,
  } = safeSettings
  const [activeTab, setActiveTab] = useState('advanced')
  const [isDataRevealed, setIsDataRevealed] = useState(false)
  const [isRevealLoading, setIsRevealLoading] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isSheetClosing, setIsSheetClosing] = useState(false)
  const revealTimerRef = useRef(null)
  const closeTimerRef = useRef(null)
  const activeLimits = activeTab === 'standard' ? limits.standard : limits.advanced
  const showSkeleton = isRevealLoading || isSheetOpen

  useEffect(
    () => () => {
      window.clearTimeout(revealTimerRef.current)
      window.clearTimeout(closeTimerRef.current)
    },
    [],
  )

  const startReveal = () => {
    if (isDataRevealed) {
      setIsDataRevealed(false)
      return
    }

    if (twoFactor.requireTwoFactorReveal) {
      setIsSheetOpen(true)
      setIsSheetClosing(false)
      return
    }

    setIsRevealLoading(true)
    window.clearTimeout(revealTimerRef.current)
    revealTimerRef.current = window.setTimeout(() => {
      setIsRevealLoading(false)
      setIsDataRevealed(true)
    }, 1_150)
  }

  const handleRevealConfirm = () => {
    if (isRevealLoading) {
      return
    }

    setIsRevealLoading(true)
    window.clearTimeout(revealTimerRef.current)
    window.clearTimeout(closeTimerRef.current)

    revealTimerRef.current = window.setTimeout(() => {
      setIsRevealLoading(false)
      setIsSheetClosing(true)

      closeTimerRef.current = window.setTimeout(() => {
        setIsDataRevealed(true)
        setIsSheetOpen(false)
        setIsSheetClosing(false)
      }, 240)
    }, 1_150)
  }

  const renderValue = (mask, revealedValue) => {
    if (showSkeleton) {
      return (
        <span
          className="home-kyc-page__value-skeleton"
          style={{ '--skeleton-width': `${mask.length}ch` }}
          aria-hidden="true"
        />
      )
    }

    return <b>{isDataRevealed ? revealedValue : mask}</b>
  }

  return (
    <main className="home-kyc-page">
      <header className="home-kyc-page__topbar">
        <button className="home-kyc-page__icon-button" onClick={onBack} type="button">
          <ArrowLeft size={24} strokeWidth={2.1} />
        </button>
        <div className="home-kyc-page__tools">
          <button className="home-kyc-page__icon-button" type="button">
            <CircleHelp size={20} strokeWidth={1.9} />
          </button>
          <button className="home-kyc-page__icon-button" type="button">
            <Headphones size={22} strokeWidth={1.9} />
          </button>
        </div>
      </header>

      <section className="home-kyc-page__hero">
        <img className="home-kyc-page__hero-card" src={verificationCardImage} alt="" />

        <div className="home-kyc-page__status">
          <span className="home-kyc-page__status-check">✓</span>
          <strong>{statusTitle}</strong>
        </div>

        <span className="home-kyc-page__level-pill">{levelLabel}</span>
      </section>

      <section className="home-kyc-page__section">
        <div className="home-kyc-page__section-head">
          <strong>{personalDataTitle}</strong>
          <button className="home-kyc-page__eye-button" onClick={startReveal} type="button">
            {isDataRevealed ? <Eye size={17} strokeWidth={1.9} /> : <EyeOff size={17} strokeWidth={1.9} />}
          </button>
        </div>

        <div className="home-kyc-page__info-card">
          <div className="home-kyc-page__info-row">
            <span>{nameLabel}</span>
            {renderValue(KYC_MASKS.name, twoFactor.revealedName)}
          </div>
          <div className="home-kyc-page__info-row">
            <span>{documentIdLabel}</span>
            {renderValue(KYC_MASKS.document, twoFactor.revealedDocumentId)}
          </div>
          <div className="home-kyc-page__info-row">
            <span>{countryLabel}</span>
            {renderValue(KYC_MASKS.country, twoFactor.revealedCountry)}
          </div>
        </div>

        <div className="home-kyc-page__actions">
          <button className="home-kyc-page__update-button" type="button">
            {updateLabel}
          </button>
          <button className="home-kyc-page__more-button" type="button">
            <Ellipsis size={19} strokeWidth={2} />
          </button>
        </div>
      </section>

      <section className="home-kyc-page__section">
        <strong className="home-kyc-page__limits-title">{limitsTitle}</strong>

        <div className="home-kyc-page__limit-tabs">
          <button
            className={`home-kyc-page__limit-tab home-kyc-page__limit-tab--standard${
              activeTab === 'standard' ? ' is-active' : ''
            }`}
            onClick={() => setActiveTab('standard')}
            type="button"
          >
            <i>✓</i>
            {tabs[0]}
          </button>
          <button
            className={`home-kyc-page__limit-tab home-kyc-page__limit-tab--advanced${
              activeTab === 'advanced' ? ' is-active' : ''
            }`}
            onClick={() => setActiveTab('advanced')}
            type="button"
          >
            {tabs[1]}
          </button>
        </div>

        <div className="home-kyc-page__limits-card">
          {activeLimits.rows.map((row) => (
            <div className="home-kyc-page__limit-row" key={row.label}>
              <span>{row.label}</span>
              <b>{row.value}</b>
            </div>
          ))}

          {activeTab === 'advanced' ? (
            <>
              <div className="home-kyc-page__advanced-divider" />
              <div className="home-kyc-page__advanced-note-label">{activeLimits.noteLabel}</div>
              <div className="home-kyc-page__advanced-note-row">
                <span className="home-kyc-page__advanced-note-icon">
                  <img src={geoIcon} alt="" />
                </span>
                <strong>{activeLimits.noteText}</strong>
              </div>
            </>
          ) : null}
        </div>

        <button className="home-kyc-page__cta-button" type="button">
          {activeLimits.buttonLabel}
        </button>
      </section>
      {isRevealLoading && !isSheetOpen ? <KycRevealLoader /> : null}
      <IdentityVerificationSheet
        isClosing={isSheetClosing}
        isLoading={isRevealLoading && isSheetOpen}
        isOpen={isSheetOpen}
        onClose={() => {
          if (isRevealLoading) {
            return
          }

          setIsSheetOpen(false)
          setIsSheetClosing(false)
        }}
        onConfirm={handleRevealConfirm}
      />
    </main>
  )
}
