import btcIcon from '../../assets/bybit/coins/btc.png'
import defaultCoinIcon from '../../assets/bybit/coins/coin-default-dark.png'
import adaIcon from '../../assets/bybit/coins/ada.png'
import dogeIcon from '../../assets/bybit/coins/doge.png'
import ethIcon from '../../assets/bybit/coins/eth.png'
import ltcIcon from '../../assets/bybit/coins/ltc.png'
import mntIcon from '../../assets/bybit/coins/mnt-dark.svg'
import solIcon from '../../assets/bybit/coins/sol.png'
import xrpIcon from '../../assets/bybit/coins/xrp.png'
import './CoinIcon.css'

const coinIcons = {
  ada: adaIcon,
  btc: btcIcon,
  doge: dogeIcon,
  eth: ethIcon,
  ltc: ltcIcon,
  mnt: mntIcon,
  sol: solIcon,
  xrp: xrpIcon,
}

export function CoinIcon({ coin }) {
  return (
    <img className="coin-icon" src={coinIcons[coin] ?? defaultCoinIcon} alt="" />
  )
}
