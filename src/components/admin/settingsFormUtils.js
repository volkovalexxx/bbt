export function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function formatKeyLabel(key) {
  return String(key)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function cloneSettings(value) {
  return JSON.parse(JSON.stringify(value))
}

export function updateByPath(source, path, nextValue) {
  if (path.length === 0) {
    return nextValue
  }

  const [head, ...rest] = path
  const clone = Array.isArray(source) ? [...source] : { ...source }
  clone[head] = updateByPath(source?.[head], rest, nextValue)
  return clone
}

export function inferFieldType(value) {
  if (typeof value === 'boolean') {
    return 'boolean'
  }

  if (typeof value === 'number') {
    return 'number'
  }

  return 'text'
}

export function fieldDescription(path, value) {
  const pathLabel = path.join('.')

  if (typeof value === 'boolean') {
    return `Переключатель: ${pathLabel}`
  }

  if (typeof value === 'number') {
    return `Числовое поле: ${pathLabel}`
  }

  return `Текстовое поле: ${pathLabel}`
}
