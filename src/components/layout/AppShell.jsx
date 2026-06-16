import './AppShell.css'

export function AppShell({ children, nav }) {
  return (
    <div className="viewport">
      <div className="phone-screen">{children}</div>
      {nav}
    </div>
  )
}
