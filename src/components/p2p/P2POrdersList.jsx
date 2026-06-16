import { useAppSettings } from '../../settings/AppSettingsContext'
import { P2POrderCard } from './P2POrderCard'
import './P2POrdersList.css'

export function P2POrdersList() {
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

  return (
    <section className="p2p-orders">
      {visibleOrders.map((order) => (
        <P2POrderCard featured={Boolean(order.featured)} key={order.name} order={order} />
      ))}
    </section>
  )
}
