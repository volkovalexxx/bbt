import { Gem, Sparkles, Wallet } from 'lucide-react'
import referralIcon from '../../assets/bybit/icons/referral-program.svg'
import bonusIcon from '../../assets/bybit/services/bonus.svg'
import depositIcon from '../../assets/bybit/services/deposit.svg'
import fiatDepositIcon from '../../assets/bybit/services/fiat-deposit.svg'
import convertIcon from '../../assets/bybit/services/convert.svg'
import tradingBotIcon from '../../assets/bybit/services/trading-bot.svg'
import copytradeIcon from '../../assets/bybit/services/copytrade.svg'
import tradfiIcon from '../../assets/bybit/services/tradfi.svg'
import alphaIcon from '../../assets/bybit/services/alpha.svg'
import premarketBessrochnyIcon from '../../assets/bybit/services/premarket-bessrochny.svg'
import tradingSpreadIcon from '../../assets/bybit/services/trading-spread.svg'
import demotradingIcon from '../../assets/bybit/services/demotrading.svg'

export const servicesTabs = [
  'Рекомендовано',
  'КУПИТЬ КРИПТОВАЛЮТУ',
  'Торговать',
]

export const recommendedServices = [
  { label: 'Бонусы', image: bonusIcon },
  { label: 'Приглашение друзей', image: referralIcon },
]

export const buyCryptoServices = [
  { label: 'Депозит', image: depositIcon },
  { label: 'Купить криптовалюту', icon: Wallet },
  { label: 'P2P торговля', glyph: '\ue8cd', family: 'moly' },
  { label: 'Депозит в фиатной валюте', image: fiatDepositIcon },
]

export const tradingServices = [
  { label: 'Обмен', image: convertIcon },
  { label: 'Trading Bot', image: tradingBotIcon, badge: 'HOT' },
  { label: 'Копитрейдинг', image: copytradeIcon },
  { label: 'TradFi', image: tradfiIcon },
  { label: 'Alpha', image: alphaIcon },
  { label: 'Премаркет бессрочный...', image: premarketBessrochnyIcon },
  { label: 'Внебиржевая торговля', icon: Gem },
  { label: 'Торговля спредами', image: tradingSpreadIcon },
  { label: 'Демо-трейдинг', image: demotradingIcon },
  { label: 'Мировые активы', icon: Sparkles },
]
