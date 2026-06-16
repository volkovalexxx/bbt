import { useEffect, useState } from 'react'

const PNL_UPDATE_INTERVAL = 2_000

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function calculatePnl(balance) {
  const now = Date.now()
  const percent = 0.95 + Math.sin(now / 6_000) * 0.08 + Math.cos(now / 13_000) * 0.03
  const positivePercent = Math.max(percent, 0.01)
  const usd = (balance * positivePercent) / 100

  return {
    percent: `+${positivePercent.toFixed(2)}%`,
    usd: formatUsd(usd),
  }
}

export function useDynamicPnl(balance) {
  const [pnl, setPnl] = useState(() => calculatePnl(balance))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPnl(calculatePnl(balance))
    }, PNL_UPDATE_INTERVAL)

    return () => window.clearInterval(timer)
  }, [balance])

  return pnl
}
