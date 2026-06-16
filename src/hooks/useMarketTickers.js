import { useEffect, useMemo, useRef, useState } from 'react'

const REST_TICKER_URL = 'https://api.bybit.com/v5/market/tickers'
const WS_TICKER_URL = 'wss://stream.bybit.com/v5/public/spot'
const TICKER_UPDATE_INTERVAL = 2_000

function formatPrice(value) {
  const price = Number(value)

  if (!Number.isFinite(price)) {
    return null
  }

  const fractionDigits = price >= 1 ? 2 : 5

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(price)
}

function formatTurnover(value) {
  const turnover = Number(value)

  if (!Number.isFinite(turnover)) {
    return null
  }

  if (turnover >= 1_000_000_000) {
    return `${(turnover / 1_000_000_000).toFixed(2)}B USDT`
  }

  if (turnover >= 1_000_000) {
    return `${(turnover / 1_000_000).toFixed(2)}M USDT`
  }

  if (turnover >= 1_000) {
    return `${(turnover / 1_000).toFixed(2)}K USDT`
  }

  return `${turnover.toFixed(2)} USDT`
}

function formatChange(value) {
  const ratio = Number(value)

  if (!Number.isFinite(ratio)) {
    return null
  }

  const percent = ratio * 100
  const sign = percent > 0 ? '+' : ''

  return `${sign}${percent.toFixed(2)}%`
}

function normalizeTicker(ticker) {
  const price = formatPrice(ticker.lastPrice)
  const volume = formatTurnover(ticker.turnover24h)
  const change = formatChange(ticker.price24hPcnt)

  if (!ticker.symbol || !price || !volume || !change) {
    return null
  }

  return {
    change,
    changeDirection: Number(ticker.price24hPcnt) >= 0 ? 'positive' : 'negative',
    price,
    symbol: ticker.symbol,
    volume,
  }
}

async function fetchTicker(symbol, signal) {
  const params = new URLSearchParams({ category: 'spot', symbol })
  const response = await fetch(`${REST_TICKER_URL}?${params}`, { signal })
  const payload = await response.json()

  return payload?.result?.list?.[0] ?? null
}

export function useMarketTickers(symbols) {
  const symbolKey = symbols.join('|')
  const stableSymbols = useMemo(() => symbolKey.split('|').filter(Boolean), [symbolKey])
  const rawTickersRef = useRef(new Map())
  const [tickers, setTickers] = useState({})

  useEffect(() => {
    const controller = new AbortController()
    const pendingTickers = new Map()
    rawTickersRef.current = new Map()

    const updateTicker = (ticker) => {
      if (!ticker) {
        return
      }

      setTickers((current) => ({
        ...current,
        [ticker.symbol]: ticker,
      }))
    }

    const queueTicker = (ticker) => {
      if (!ticker) {
        return
      }

      pendingTickers.set(ticker.symbol, ticker)
    }

    const mergeTicker = (ticker, fallbackSymbol) => {
      const symbol = ticker?.symbol ?? fallbackSymbol

      if (!symbol) {
        return null
      }

      const previous = rawTickersRef.current.get(symbol) ?? {}
      const mergedTicker = { ...previous, ...ticker, symbol }
      rawTickersRef.current.set(symbol, mergedTicker)

      return normalizeTicker(mergedTicker)
    }

    const flushQueuedTickers = () => {
      if (pendingTickers.size === 0) {
        return
      }

      setTickers((current) => {
        const next = { ...current }

        pendingTickers.forEach((ticker, symbol) => {
          next[symbol] = ticker
        })

        pendingTickers.clear()
        return next
      })
    }

    let snapshotInFlight = false

    const loadSnapshot = async () => {
      if (snapshotInFlight) {
        return
      }

      snapshotInFlight = true
      const snapshots = await Promise.allSettled(
        stableSymbols.map((symbol) => fetchTicker(symbol, controller.signal)),
      )

      snapshots.forEach((snapshot, index) => {
        if (snapshot.status === 'fulfilled') {
          updateTicker(mergeTicker(snapshot.value, stableSymbols[index]))
        }
      })

      snapshotInFlight = false
    }

    loadSnapshot()
    const snapshotTimer = window.setInterval(loadSnapshot, TICKER_UPDATE_INTERVAL)
    const updateTimer = window.setInterval(flushQueuedTickers, TICKER_UPDATE_INTERVAL)

    let socket
    let pingTimer

    try {
      socket = new WebSocket(WS_TICKER_URL)

      socket.addEventListener('open', () => {
        socket.send(
          JSON.stringify({
            op: 'subscribe',
            args: stableSymbols.map((symbol) => `tickers.${symbol}`),
          }),
        )

        pingTimer = window.setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ op: 'ping' }))
          }
        }, 20_000)
      })

      socket.addEventListener('message', (event) => {
        const payload = JSON.parse(event.data)
        const topicSymbol = payload.topic?.split('.')?.at(-1)
        const payloadData = Array.isArray(payload.data) ? payload.data : [payload.data]

        payloadData.forEach((item) => queueTicker(mergeTicker(item ?? {}, topicSymbol)))
      })
    } catch {
      // REST polling above keeps the UI live enough if WebSocket is unavailable.
    }

    return () => {
      controller.abort()
      window.clearInterval(snapshotTimer)
      window.clearInterval(updateTimer)
      window.clearInterval(pingTimer)

      if (socket) {
        socket.close()
      }
    }
  }, [stableSymbols])

  return tickers
}
