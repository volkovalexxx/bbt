import { Clock, Zap } from 'lucide-react'
import './P2POrderCard.css'

const methodColors = ['#ff9c2e', '#18c284', '#ff425f']

function MerchantAvatar({ name }) {
  return (
    <span className="p2p-order__avatar">
      {name.charAt(0)}
      <i />
    </span>
  )
}

function getTimeMinutes(time) {
  const match = time?.match(/\d+/)

  return match ? Number(match[0]) : null
}

export function P2POrderCard({ order, featured = false }) {
  const timeMinutes = getTimeMinutes(order.time)
  const hasFastBadge = order.fast ?? (Number.isFinite(timeMinutes) && timeMinutes <= 2)
  const hasMeta = order.time || hasFastBadge || featured
  const metaClassName = hasMeta ? 'has-meta' : 'has-no-meta'

  return (
    <article className={`p2p-order ${featured ? 'is-featured' : ''} ${metaClassName}`}>
      {order.badge ? <span className="p2p-order__badge">{order.badge}</span> : null}
      <div className="p2p-order__top">
        <div className="p2p-order__merchant">
          <MerchantAvatar name={order.name} />
          <strong>{order.name}</strong>
        </div>
        {!featured ? <span className="p2p-order__completion">{order.completion}</span> : null}
      </div>

      {hasMeta ? (
        <div className="p2p-order__meta">
          {order.time ? (
            <span>
              <Clock size={13} />
              {order.time}
            </span>
          ) : null}
          {hasFastBadge ? (
            <span className="p2p-order__fast">
              <Zap size={12} fill="currentColor" />
              Быстрое получение
            </span>
          ) : null}
          {featured ? <span className="p2p-order__completion">{order.completion}</span> : null}
        </div>
      ) : null}

      <div className="p2p-order__body">
        <div className="p2p-order__details">
          <div className="p2p-order__price">
            <span>₽</span>
            <strong>{order.price}</strong>
          </div>
          <p>
            <span>Лимиты</span>
            <b>{order.limit}</b>
          </p>
          <p>
            <span>Количество</span>
            <b>{order.quantity}</b>
          </p>
          <div className="p2p-order__methods">
            {order.methods.map((method, index) => (
              <span key={method} style={{ '--method-color': methodColors[index] }}>
                {method}
              </span>
            ))}
          </div>
        </div>
        {order.disabled ? (
          <span className="p2p-order__disabled">Недоступно</span>
        ) : (
          <button className="p2p-order__buy">Покупка</button>
        )}
      </div>
    </article>
  )
}
