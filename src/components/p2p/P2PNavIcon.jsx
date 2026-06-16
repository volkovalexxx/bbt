import './P2PNavIcon.css'

export function P2PNavIcon({ type }) {
  if (type === 'orders') {
    return (
      <svg className="p2p-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="3.8" width="14" height="16.4" rx="2" fill="currentColor" />
        <path
          d="M8.3 8.2h3.4M8.3 12h3.4M8.3 15.8h3.4"
          stroke="#050505"
          strokeLinecap="round"
          strokeWidth="1.7"
        />
        <path
          d="M14.7 8.1l1.15 1.15 2.05-2.25M14.7 12l1.15 1.15 2.05-2.25"
          fill="none"
          stroke="#050505"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.55"
        />
      </svg>
    )
  }

  if (type === 'ads') {
    return (
      <svg className="p2p-nav-icon p2p-nav-icon--ads" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.2" y="5.3" width="15.6" height="11.4" rx="2" fill="currentColor" />
        <path
          d="M7.4 13.2l3.05-2.65 2.3 1.8 3.85-4.1"
          fill="none"
          stroke="#050505"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.65"
        />
        <path
          d="M15.1 8.25h1.5v1.5"
          fill="none"
          stroke="#050505"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.65"
        />
        <path d="M7.2 18.6h9.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      </svg>
    )
  }

  return (
    <svg className="p2p-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.2 5.6c0-1.15.9-2.05 2.05-2.05h9.5c1.15 0 2.05.9 2.05 2.05v8.05c0 1.15-.9 2.05-2.05 2.05h-6.3l-4.15 3.2c-.48.37-1.1.03-1.1-.57V5.6Z"
        fill="currentColor"
      />
      <circle cx="9" cy="9.4" r="1.05" fill="#050505" />
      <circle cx="12" cy="9.4" r="1.05" fill="#050505" />
      <circle cx="15" cy="9.4" r="1.05" fill="#050505" />
    </svg>
  )
}
