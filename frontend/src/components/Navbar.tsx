import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  function handleContactClick() {
    navigate('/')

    window.setTimeout(() => {
      document
        .getElementById('contact')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/book">Book</NavLink>
        <button type="button" onClick={handleContactClick}>
          Contact
        </button>
      </nav>
    </header>
  )
}

export default Navbar
