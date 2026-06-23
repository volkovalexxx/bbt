import { useEffect, useMemo, useRef, useState } from 'react'
import { CircleHelp, Eye, EyeOff, ThumbsDown, ThumbsUp, X } from 'lucide-react'
import { useAppSettings } from '../../../settings/AppSettingsContext'
import { ProfileHeader } from './ProfileHeader'
import googleAuthIcon from '../../../../740fd7c1-a5e0-44cc-a2c9-64cad5a3feac-removebg-preview.png'
import './ProfileDetailsPage.css'

function ValueNote({ note, type }) {
  if (!note) {
    return null
  }

  if (type === 'rating') {
    const [likes = '0', dislikes = '0'] = String(note)
      .split('|')
      .map((value) => value.trim())

    return (
      <span className="p2p-profile-details__value-note is-rating">
        <ThumbsUp size={11} strokeWidth={2} />
        {likes}
        <span className="p2p-profile-details__divider">|</span>
        <ThumbsDown size={11} strokeWidth={2} />
        {dislikes}
      </span>
    )
  }

  return <span className="p2p-profile-details__value-note">{note}</span>
}

function GoogleAuthenticatorIcon() {
  return (
    <img alt="" aria-hidden="true" className="p2p-profile-details__ga-icon" src={googleAuthIcon} />
  )
}

function NameRevealLoader() {
  return (
    <div className="p2p-profile-details__reveal-loader" role="status" aria-label="Раскрытие имени">
      <div className="p2p-profile-details__reveal-logo">
        <span className="p2p-profile-details__reveal-base" aria-hidden="true">
          <span>B</span>
          <span>Y</span>
          <span>B</span>
          <span className="is-accent">I</span>
          <span>T</span>
        </span>
        <span className="p2p-profile-details__reveal-fill" aria-hidden="true">
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

function IdentityVerificationSheet({ isOpen, isLoading, isClosing, onClose, onConfirm }) {
  const inputRefs = useRef([])
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const isComplete = code.every(Boolean)

  useEffect(() => {
    if (!isOpen) {
      setCode(['', '', '', '', '', ''])
      setKeyboardOffset(0)
      return undefined
    }

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
        inputRefs.current[index]?.blur()
        inputRefs.current[index]?.setAttribute('readonly', 'readonly')
        inputRefs.current[index]?.removeAttribute('readonly')
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
    <div className="p2p-profile-details__sheet-overlay">
      <div
        className={`p2p-profile-details__sheet${isClosing ? ' is-closing' : ''}`}
        style={{ bottom: `${keyboardOffset}px` }}
      >
        <header className="p2p-profile-details__sheet-header">
          <strong>Проверка идентификации</strong>
          <button className="p2p-profile-details__sheet-close" disabled={isLoading} onClick={onClose}>
            <X size={22} strokeWidth={2.1} />
          </button>
        </header>
        <div className="p2p-profile-details__sheet-provider">
          <GoogleAuthenticatorIcon />
          <span>Google Authenticator</span>
        </div>
        <div className="p2p-profile-details__sheet-fields">
          {code.map((value, index) => (
            <input
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              className={`p2p-profile-details__sheet-input${value ? ' is-filled' : ''}`}
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
        <div className="p2p-profile-details__sheet-actions">
          <button className="p2p-profile-details__sheet-paste" onClick={handlePaste}>
            Вставить
          </button>
        </div>
        <button
          className={`p2p-profile-details__sheet-confirm${isComplete ? ' is-ready' : ''}`}
          onClick={handleConfirm}
        >
          Подтвердить
        </button>
        <p className="p2p-profile-details__sheet-help">Возникли проблемы с верификацией?</p>
      </div>
      {isLoading ? <NameRevealLoader /> : null}
    </div>
  )
}

function Row({ item, isRevealed, onRevealRequest, onHide }) {
  const displayValue =
    item.valueIcon === 'hidden' && item.revealedValue
      ? isRevealed
        ? item.revealedValue
        : item.value
      : item.value

  const handleToggle = () => {
    if (item.valueIcon !== 'hidden') {
      return
    }

    if (isRevealed) {
      onHide?.(item.label)
      return
    }

    onRevealRequest?.(item)
  }

  return (
    <div className="p2p-profile-details__row">
      <span className="p2p-profile-details__label">
        {item.label}
        {item.help ? <CircleHelp size={12} strokeWidth={2} /> : null}
      </span>
      <div className="p2p-profile-details__value-wrap">
        <div className="p2p-profile-details__value-main">
          <strong>{displayValue}</strong>
          {item.valueIcon === 'hidden' ? (
            <button className="p2p-profile-details__toggle" onClick={handleToggle}>
              {isRevealed ? <Eye size={14} strokeWidth={2} /> : <EyeOff size={14} strokeWidth={2} />}
            </button>
          ) : null}
        </div>
        <ValueNote note={item.valueNote} type={item.valueNoteType} />
      </div>
    </div>
  )
}

export function ProfileDetailsPage({ onBack }) {
  const { settings } = useAppSettings()
  const { user, details } = settings.p2p.profile
  const bodyRef = useRef(null)
  const touchStateRef = useRef({
    isPulling: false,
    startY: 0,
  })
  const [revealedItems, setRevealedItems] = useState({})
  const [pendingRevealItem, setPendingRevealItem] = useState(null)
  const revealTimerRef = useRef(null)
  const closeTimerRef = useRef(null)
  const [isRevealLoading, setIsRevealLoading] = useState(false)
  const [isSheetClosing, setIsSheetClosing] = useState(false)
  const [directRevealItem, setDirectRevealItem] = useState(null)
  const [pullOffset, setPullOffset] = useState(0)
  const [isPullAnimating, setIsPullAnimating] = useState(false)

  const sections = useMemo(() => details.sections, [details.sections])

  useEffect(
    () => () => {
      window.clearTimeout(revealTimerRef.current)
      window.clearTimeout(closeTimerRef.current)
    },
    [],
  )

  const handleRevealRequest = (item) => {
    if (!details.requireTwoFactorReveal) {
      setDirectRevealItem(item)
      setIsRevealLoading(true)
      window.clearTimeout(revealTimerRef.current)
      revealTimerRef.current = window.setTimeout(() => {
        setIsRevealLoading(false)
        setRevealedItems((current) => ({
          ...current,
          [item.label]: true,
        }))
        setDirectRevealItem(null)
      }, 1_150)
      return
    }

    setPendingRevealItem(item)
    setIsSheetClosing(false)
  }

  const handleRevealConfirm = () => {
    if (!pendingRevealItem || isRevealLoading) {
      return
    }

    setIsRevealLoading(true)
    window.clearTimeout(revealTimerRef.current)
    window.clearTimeout(closeTimerRef.current)

    revealTimerRef.current = window.setTimeout(() => {
      setIsRevealLoading(false)
      setIsSheetClosing(true)

      closeTimerRef.current = window.setTimeout(() => {
        setRevealedItems((current) => ({
          ...current,
          [pendingRevealItem.label]: true,
        }))
        setPendingRevealItem(null)
        setIsSheetClosing(false)
      }, 240)
    }, 1_150)
  }

  const handleHide = (label) => {
    setRevealedItems((current) => ({
      ...current,
      [label]: false,
    }))
  }

  const handleBodyTouchStart = (event) => {
    const bodyNode = bodyRef.current
    if (!bodyNode) {
      return
    }

    touchStateRef.current.startY = event.touches[0].clientY
    touchStateRef.current.isPulling = bodyNode.scrollTop <= 0
    if (pullOffset === 0) {
      setIsPullAnimating(false)
    }
  }

  const handleBodyTouchMove = (event) => {
    const bodyNode = bodyRef.current
    if (!bodyNode || !touchStateRef.current.isPulling) {
      return
    }

    const deltaY = event.touches[0].clientY - touchStateRef.current.startY
    if (deltaY <= 0) {
      if (pullOffset !== 0) {
        setPullOffset(0)
      }
      return
    }

    const nextOffset = Math.min(52, deltaY * 0.32)
    setIsPullAnimating(false)
    setPullOffset(nextOffset)
    if (event.cancelable) {
      event.preventDefault()
    }
  }

  const handleBodyTouchEnd = () => {
    touchStateRef.current.isPulling = false
    if (pullOffset === 0) {
      return
    }

    setIsPullAnimating(true)
    setPullOffset(0)
  }

  return (
    <main className="p2p-profile-details">
      <ProfileHeader
        compact
        helpLabel=""
        onBack={onBack}
        title={user.name}
        titleCentered
      />
      <div
        className="p2p-profile-details__body"
        onTouchEnd={handleBodyTouchEnd}
        onTouchMove={handleBodyTouchMove}
        onTouchStart={handleBodyTouchStart}
        ref={bodyRef}
      >
        <div
          className={`p2p-profile-details__body-inner${isPullAnimating ? ' is-returning' : ''}`}
          style={{ transform: `translateY(${pullOffset}px)` }}
        >
          {sections.map((section, index) => (
            <section className="p2p-profile-details__section" key={index}>
              {section.map((item) => (
                <Row
                  item={item}
                  isRevealed={Boolean(revealedItems[item.label])}
                  key={item.label}
                  onHide={handleHide}
                  onRevealRequest={handleRevealRequest}
                />
              ))}
            </section>
          ))}
        </div>
      </div>
      {isRevealLoading && directRevealItem ? <NameRevealLoader /> : null}
      <IdentityVerificationSheet
        isClosing={isSheetClosing}
        isLoading={isRevealLoading && Boolean(pendingRevealItem)}
        isOpen={Boolean(pendingRevealItem)}
        onClose={() => {
          if (isRevealLoading) {
            return
          }

          setPendingRevealItem(null)
          setIsSheetClosing(false)
        }}
        onConfirm={handleRevealConfirm}
      />
    </main>
  )
}
