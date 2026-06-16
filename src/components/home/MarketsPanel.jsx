import { useAppSettings } from '../../settings/AppSettingsContext'
import { useMarketTickers } from '../../hooks/useMarketTickers'
import { CoinIcon } from './CoinIcon'
import './MarketsPanel.css'

export function MarketsPanel() {
  const { settings } = useAppSettings()
  const { marketRows, subTabs, topTabs } = settings.home
  const tickers = useMarketTickers(marketRows.map((row) => row.pair))

  return (
    <section className="markets-panel">
      <div className="markets-panel__tabs" aria-label="Категории рынка">
        {topTabs.map((tab) => (
          <button className={tab === 'Популярные' ? 'is-active' : ''} key={tab}>
            {tab}
          </button>
        ))}
      </div>

      <div className="markets-panel__subtabs" aria-label="Тип рынка">
        {subTabs.map((tab) => (
          <button className={tab === 'Спот' ? 'is-selected' : ''} key={tab}>
            {tab}
          </button>
        ))}
      </div>

      <div className="market-list">
        {marketRows.map((row) => {
          const ticker = tickers[row.pair]
          const price = ticker?.price ?? row.price
          const volume = ticker?.volume ?? row.volume
          const change = ticker?.change ?? row.change
          const changeDirection =
            ticker?.changeDirection ?? (row.change.startsWith('+') ? 'positive' : 'negative')

          return (
          <article className="market-row" key={row.pair}>
            <CoinIcon coin={row.coin} />
            <div className="market-row__asset">
              <strong className="market-row__pair">
                <span className="market-row__base">{row.base}</span>
                <em>/</em>
                <small className="market-row__quote">{row.quote}</small>
                <b>{row.leverage}</b>
              </strong>
              <span className="market-row__volume">{volume}</span>
            </div>
            <strong className="market-row__price">{price}</strong>
            <span className={`market-row__change is-${changeDirection}`}>{change}</span>
          </article>
          )
        })}
      </div>
    </section>
  )
}
