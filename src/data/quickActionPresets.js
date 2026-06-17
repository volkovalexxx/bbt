import { Wallet } from 'lucide-react'
import earnIcon from '../assets/bybit/icons/quick-earn.png'
import earningsDarkIcon from '../assets/bybit/icons/earnings-dark.png'
import moreIcon from '../assets/bybit/icons/more.png'
import p2pIcon from '../assets/bybit/icons/quick-p2p.png'
import walletIcon from '../assets/bybit/icons/wallet-web3-program.svg'
import alphaIcon from '../assets/bybit/services/alpha.svg'
import bonusIcon from '../assets/bybit/services/bonus.svg'
import copytradeIcon from '../assets/bybit/services/copytrade.svg'
import depositIcon from '../assets/bybit/services/deposit.svg'
import tradingBotIcon from '../assets/bybit/services/trading-bot.svg'
import tradfiIcon from '../assets/bybit/services/tradfi.svg'

const actionDefinitions = {
  alpha: { label: 'Alpha', type: 'alpha' },
  bonus: { label: 'Бонусы', type: 'bonus' },
  copytrade: { label: 'Копитрейдинг', type: 'copytrade' },
  deposit: { label: 'Депозит', type: 'deposit' },
  earn: { glyph: '\ue8fe', label: 'Bybit Earn', type: 'earn' },
  more: { glyph: '\ue8ec', label: 'Ещё', type: 'more' },
  p2p: { glyph: '\ue8cd', label: 'P2P торговля', type: 'p2p' },
  tradfi: { label: 'TradFi', type: 'tradfi' },
  tradingBot: { label: 'Trading Bot', type: 'tradingBot' },
  wallet: { glyph: '\ue766', label: 'Кошелёк', type: 'wallet' },
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
}

const presetTypes = [
  ['p2p', 'wallet', 'tradingBot', 'more'],
  ['deposit', 'tradingBot', 'alpha', 'more'],
]

const randomPresetPool = [
  'p2p',
  'wallet',
  'earn',
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
    return [...shuffle(randomPresetPool).slice(0, 3), 'more'].map(createAction)
  }

  return (presetTypes[index] ?? presetTypes[0]).map(createAction)
}

export const quickActionPresetCount = 3
export const defaultQuickActions = createQuickActionPreset(0)
