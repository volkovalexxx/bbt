import { useState } from 'react'
import { AppShell } from '../layout/AppShell'
import { P2PBottomNav } from './P2PBottomNav'
import { P2PFilterBar } from './P2PFilterBar'
import { P2PHeader } from './P2PHeader'
import { P2PNotice } from './P2PNotice'
import { P2POrdersList } from './P2POrdersList'
import { P2PTradeSwitch } from './P2PTradeSwitch'
import { P2PProfilePage } from './profile/P2PProfilePage'
import './P2PPage.css'

export function P2PPage({ initialSection = 'p2p', onBack }) {
  const [activeSection, setActiveSection] = useState(initialSection)

  const navigateSection = (section) => {
    setActiveSection(section)

    if (section === 'profile') {
      window.location.hash = 'p2p-profile'
    } else if (section === 'p2p') {
      window.location.hash = 'p2p'
    }
  }

  const openP2PSection = () => navigateSection('p2p')

  return (
    <AppShell
      nav={<P2PBottomNav activeKey={activeSection} onNavigate={navigateSection} />}
    >
      {activeSection === 'profile' ? (
        <P2PProfilePage onBack={openP2PSection} />
      ) : (
        <main className="p2p-page">
          <P2PHeader onBack={onBack} />
          <P2PNotice />
          <P2PTradeSwitch />
          <P2PFilterBar />
          <P2POrdersList />
        </main>
      )}
    </AppShell>
  )
}
