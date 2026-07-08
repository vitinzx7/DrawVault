import { NavLink } from 'react-router-dom'

export function SiteHeader() {
  return (
    <header className="site-header">
      <NavLink className="brand-mark" to="/" aria-label="DrawVault home">
        DrawVault
      </NavLink>
      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}
