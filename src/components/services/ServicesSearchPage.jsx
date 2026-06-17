import { useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { BybitIcon } from '../ui/BybitIcon'
import './ServicesSearchPage.css'

export function ServicesSearchPage({ onBack, onOpenP2P }) {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    const nextRawValue = event.target.value

    if (nextRawValue.length < value.length) {
      setValue(value.slice(0, nextRawValue.length))
      return
    }

    const limitedLength = Math.min(nextRawValue.length, 3)
    const addedCount = limitedLength - value.length

    if (addedCount <= 0) {
      return
    }

    let nextValue = value

    for (let index = 0; index < addedCount; index += 1) {
      nextValue += 'p2p'[nextValue.length % 3]
    }

    setValue(nextValue)
  }

  return (
    <main className="services-search-page">
      <header className="services-search-page__header">
        <label className="services-search-page__searchbar" aria-label="Поиск">
          <Search size={18} strokeWidth={2.1} />
          <input
            autoFocus
            className="services-search-page__input"
            onChange={handleChange}
            placeholder="Поиск"
            type="text"
            value={value}
          />
        </label>
        <button className="services-search-page__cancel" onClick={onBack}>
          Отмена
        </button>
      </header>

      {value.length >= 2 ? (
        <button
          className="services-search-page__suggestion"
          onClick={onOpenP2P}
          type="button"
        >
          <span className="services-search-page__suggestion-left">
            <span className="services-search-page__suggestion-icon" aria-hidden="true">
              <BybitIcon family="moly" glyph={'\ue8cd'} size={22} />
            </span>
            <span>P2P торговля</span>
          </span>
          <ArrowRight size={20} strokeWidth={1.8} />
        </button>
      ) : (
        <div className="services-search-page__empty" aria-label="Нет результатов">
          <div className="services-search-page__empty-art" aria-hidden="true">
            <i className="services-search-page__bar services-search-page__bar--left" />
            <i className="services-search-page__bar services-search-page__bar--center" />
            <i className="services-search-page__bar services-search-page__bar--right" />
            <div className="services-search-page__glass">
              <span className="services-search-page__dots">
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
          <p>Нет результатов</p>
        </div>
      )}
    </main>
  )
}
