import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <NavLink to="/" className="site-logo">
        Umyvanie aut Nitra
      </NavLink>

      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/book">Book</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
