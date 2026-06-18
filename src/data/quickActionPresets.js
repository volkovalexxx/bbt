import { Wallet } from 'lucide-react'
import earnIcon from '../assets/bybit/icons/quick-earn.png'
import earningsDarkIcon from '../assets/bybit/icons/earnings-dark.png'
import moreIcon from '../assets/bybit/icons/more.png'
import p2pIcon from '../assets/bybit/icons/quick-p2p.png'
import walletIcon from '../assets/bybit/icons/wallet-web3-program.svg'
import alphaIcon from '../assets/bybit/services/alpha.svg'
import ballIcon from '../assets/bybit/quick-actions/ball.png'
import bonusIcon from '../assets/bybit/services/bonus.svg'
import copytradeIcon from '../assets/bybit/services/copytrade.svg'
import depositIcon from '../assets/bybit/services/deposit.svg'
import tradingBotIcon from '../assets/bybit/services/trading-bot.svg'
import tradfiIcon from '../assets/bybit/services/tradfi.svg'

const actionDefinitions = {
  alpha: { label: 'Alpha', type: 'alpha' },
  bonus: { label: 'Бонусы', type: 'bonus' },
  copytrade: { label: 'Копи-\nтрейдинг', type: 'copytrade' },
  deposit: { label: 'Депозит', type: 'deposit' },
  earn: { glyph: '\ue8fe', label: 'Bybit Earn', type: 'earn' },
  more: { glyph: '\ue8ec', label: 'Ещё', type: 'more' },
  p2p: { glyph: '\ue8cd', label: 'P2P торговля', type: 'p2p' },
  tradfi: { label: 'TradFi', type: 'tradfi' },
  tradingBot: { badge: 'HOT', label: 'Trading Bot', type: 'tradingBot' },
  wallet: { glyph: '\ue766', label: 'Кошелёк', type: 'wallet' },
  worldCup: { badge: 'NEW', label: 'Чемпионат\nмира по', type: 'worldCup' },
}

export const quickActionVisuals = {
  alpha: { image: alphaIcon },
  bonus: { image: bonusIcon },
  copytrade: { image: copytradeIcon },
  deposit: { image: depositIcon },
  earn: { image: earnIcon, servicesImage: earningsDarkIcon },
  more: { image: moreIcon },
  p2p: { family: 'moly', glyph: '\ue8cd', image: p2pIcon },
  tradfi: { image: tradfiIcon },
  tradingBot: { image: tradingBotIcon },
  wallet: { icon: Wallet, image: walletIcon },
  worldCup: { image: ballIcon, servicesImage: ballIcon },
}

const presetTypes = [
  ['p2p', 'wallet', 'worldCup', 'more'],
  ['deposit', 'tradingBot', 'worldCup', 'more'],
  ['p2p', 'wallet', 'tradingBot', 'alpha', 'deposit', 'bonus', 'copytrade', 'tradfi', 'worldCup', 'more'],
]

const randomPresetPool = [
  'p2p',
  'wallet',
  'deposit',
  'tradingBot',
  'alpha',
  'bonus',
  'copytrade',
  'tradfi',
]

function createAction(type) {
  return { ...actionDefinitions[type] }
}

function shuffle(source) {
  const items = [...source]

  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = items[index]
    items[index] = items[swapIndex]
    items[swapIndex] = current
  }

  return items
}

export function createQuickActionPreset(index) {
  if (index === 2) {
    return [...shuffle(randomPresetPool).slice(0, 2), 'worldCup', 'more'].map(createAction)
  }

  if (index === 3) {
    return presetTypes[2].map(createAction)
  }

  return (presetTypes[index] ?? presetTypes[0]).map(createAction)
}

export const quickActionPresetCount = 4
export const defaultQuickActions = createQuickActionPreset(0)
