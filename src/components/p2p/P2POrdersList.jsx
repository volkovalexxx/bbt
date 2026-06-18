import { useAppSettings } from '../../settings/AppSettingsContext'
import { P2POrderCard } from './P2POrderCard'
import './P2POrdersList.css'

function SkeletonOrder({ featured = false, keyId }) {
  return (
    <article
      className={`p2p-order-skeleton ${featured ? 'is-featured' : ''}`}
      key={keyId}
      aria-hidden="true"
    >
      {featured ? <span className="p2p-order-skeleton__badge" /> : null}
      <div className="p2p-order-skeleton__top">
        <div className="p2p-order-skeleton__merchant">
          <span className="p2p-order-skeleton__avatar" />
          <span className="p2p-order-skeleton__line is-name" />
        </div>
        <span className="p2p-order-skeleton__line is-completion" />
      </div>
      <div className="p2p-order-skeleton__meta">
        <span className="p2p-order-skeleton__line is-time" />
        <span className="p2p-order-skeleton__pill" />
        <span className="p2p-order-skeleton__line is-orders" />
      </div>
      <div className="p2p-order-skeleton__body">
        <div className="p2p-order-skeleton__details">
          <span className="p2p-order-skeleton__price" />
          <span className="p2p-order-skeleton__line is-detail-long" />
          <span className="p2p-order-skeleton__line is-detail-medium" />
          <div className="p2p-order-skeleton__methods">
            <span className="p2p-order-skeleton__line is-method" />
            <span className="p2p-order-skeleton__line is-method short" />
          </div>
        </div>
        <span className="p2p-order-skeleton__buy" />
      </div>
    </article>
  )
}

export function P2POrdersList({ isLoading = false }) {
  const { settings } = useAppSettings()
  const { config, orders } = settings.p2p

  const visibleOrders = orders.filter((order) => {
    if (order.visible === false) {
      return false
    }

    if (order.badge && order.featured === false) {
      return false
    }

    if (order.featured && !config.showFeaturedOffer) {
      return false
    }

    return true
  })

  if (isLoading) {
    return (
      <section className="p2p-orders p2p-orders--loading">
        <SkeletonOrder featured keyId="featured" />
        <SkeletonOrder keyId="order-1" />
        <SkeletonOrder keyId="order-2" />
        <SkeletonOrder keyId="order-3" />
      </section>
    )
  }

  return (
    <section className="p2p-orders">
      {visibleOrders.map((order) => (
        <P2POrderCard featured={Boolean(order.featured)} key={order.name} order={order} />
      ))}
    </section>
  )
}
