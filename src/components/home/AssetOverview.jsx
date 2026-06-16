import { BybitIcon } from '../ui/BybitIcon'
import arrowDown from '../../assets/bybit/ui/arrow-down-grey.svg'
import chevronDown from '../../assets/bybit/ui/chevron-down-wide.svg'
import { useAppSettings } from '../../settings/AppSettingsContext'
import { useDynamicPnl } from '../../hooks/useDynamicPnl'
import './AssetOverview.css'

export function AssetOverview() {
  const { settings } = useAppSettings()
  const { balanceUsd, depositButtonLabel, pnlLabel, totalAssetsLabel } = settings.home.assetOverview
  const pnl = useDynamicPnl(balanceUsd)

  return (
    <section className="asset-overview">
      <div className="asset-overview__chart" aria-hidden="true" />
      <div className="asset-overview__copy">
        <div className="asset-overview__label">
          <span>{totalAssetsLabel}</span>
          <BybitIcon glyph={'\ue67c'} size={15} />
        </div>
        <div className="asset-overview__balance">
          <strong>{balanceUsd.toFixed(2)}</strong>
          <span>USD</span>
          <img className="asset-overview__arrow" src={arrowDown} alt="" />
        </div>
        <div className="asset-overview__pnl">
          <span>
            {pnlLabel}{' '}
            <strong>
              {pnl.usd} USD({pnl.percent})
            </strong>
          </span>
          <img className="asset-overview__chevron" src={chevronDown} alt="" />
        </div>
      </div>
      <button className="deposit-button">{depositButtonLabel}</button>
    </section>
  )
}
