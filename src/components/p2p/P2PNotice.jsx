import { Megaphone } from 'lucide-react'
import { useAppSettings } from '../../settings/AppSettingsContext'
import './P2PNotice.css'

export function P2PNotice() {
  const { settings } = useAppSettings()
  const { text } = settings.p2p.notice

  return (
    <div className="p2p-notice">
      <Megaphone size={17} fill="currentColor" strokeWidth={2.4} />
      <div className="p2p-notice__marquee">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}
