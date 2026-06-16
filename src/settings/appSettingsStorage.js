import { defaultSettings } from '../data/defaultSettings'

export const SETTINGS_API_URL = '/api/settings'

export function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaultSettings))
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function mergeWithDefaults(defaultValue, nextValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(nextValue) ? nextValue : defaultValue
  }

  if (isPlainObject(defaultValue)) {
    const source = isPlainObject(nextValue) ? nextValue : {}
    const merged = {}

    Object.keys(defaultValue).forEach((key) => {
      merged[key] = mergeWithDefaults(defaultValue[key], source[key])
    })

    Object.keys(source).forEach((key) => {
      if (!(key in merged)) {
        merged[key] = source[key]
      }
    })

    return merged
  }

  return nextValue === undefined ? defaultValue : nextValue
}

export async function loadStoredSettings() {
  try {
    const response = await fetch(SETTINGS_API_URL, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`settings load failed: ${response.status}`)
    }

    return mergeWithDefaults(cloneDefaults(), await response.json())
  } catch {
    return cloneDefaults()
  }
}

export async function persistSettings(nextSettings) {
  const mergedSettings = mergeWithDefaults(cloneDefaults(), nextSettings)

  const response = await fetch(SETTINGS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mergedSettings),
  })

  if (!response.ok) {
    throw new Error(`settings save failed: ${response.status}`)
  }

  return mergedSettings
}
