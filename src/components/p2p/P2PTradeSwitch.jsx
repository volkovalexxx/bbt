import { useState } from 'react'
import trxIcon from '../../assets/bybit/p2p/trx.png'
import { useAppSettings } from '../../settings/AppSettingsContext'
import './P2PTradeSwitch.css'

export function P2PTradeSwitch() {
  const [mode, setMode] = useState('buy')
  const { settings } = useAppSettings()
  const { buyLabel, sellLabel, tokenBadgeLabel } = settings.p2p.tradeSwitch

  return (
    <section className="p2p-trade-switch-wrap">
      <div className={`p2p-trade-switch is-${mode}`}>
        <span className="p2p-trade-switch__thumb" />
        <button className={mode === 'buy' ? 'is-active' : ''} onClick={() => setMode('buy')}>
          {buyLabel}
        </button>
        <button className={mode === 'sell' ? 'is-active' : ''} onClick={() => setMode('sell')}>
          {sellLabel}
        </button>
      </div>
      <div className="p2p-core-badge">
        <img src={trxIcon} alt="" />
        <b>{tokenBadgeLabel}</b>
      </div>
    </section>
  )
}
