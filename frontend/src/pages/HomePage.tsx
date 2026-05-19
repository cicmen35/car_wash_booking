import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.jpg'
import SuccessMessage from '../components/SuccessMessage'

function HomePage() {
  const [messageSent, setMessageSent] = useState(false)

  function handleTextUsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessageSent(true)
    event.currentTarget.reset()
  }

  return (
    <main className="home-page">
      <section className="home-hero">
        <img
          className="home-hero__logo"
          src={logo}
          alt=""
          aria-hidden="true"
        />
        <div className="home-hero__content">
          <div className="hero-actions">
            <Link className="button-primary" to="/book">
              Book a wash
            </Link>
            <Link className="button-secondary" to="/services">
              View services
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Cleaning options for every car</h2>
        </div>
        <div className="feature-grid">
          <article>
            <h3>Exterior wash</h3>
            <p>Hand washing, wheel cleaning, and a clean finish for daily use.</p>
          </article>
          <article>
            <h3>Interior cleaning</h3>
            <p>Vacuuming, dashboard care, window cleaning, and cabin refresh.</p>
          </article>
          <article>
            <h3>Full detailing</h3>
            <p>Complete interior and exterior care for a more polished result.</p>
          </article>
        </div>
      </section>

      <section className="text-us-section">
        <div className="section-heading">
          <p className="eyebrow">Contact us</p>
          <h2>Need help choosing a service?</h2>
          <p>
            Leave your contact details and message. We will help you choose the
            right wash, detailing option, or reservation time.
          </p>
        </div>

        <form className="text-us-form" onSubmit={handleTextUsSubmit}>
          <SuccessMessage
            message={
              messageSent
                ? 'Your message is ready. We will connect this form to the backend later.'
                : ''
            }
          />

          <label>
            Name
            <input name="name" type="text" required />
          </label>

          <label>
            Phone number
            <input name="phone" type="tel" required />
          </label>

          <label>
            Email
            <input name="email" type="email" required />
          </label>

          <label className="full-width">
            Message
            <textarea name="message" rows={5} />
          </label>

          <button type="submit">Send message</button>
        </form>
      </section>

      <section className="map-section">
        <div className="section-heading">
          <p className="eyebrow">Location</p>
          <h2>Where you can find us</h2>
        </div>

        <div className="map-preview">
          <iframe
            title="Umyvanie aut Nitra location map"
            src="https://www.google.com/maps?q=Nitra%2C%20Slovakia&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  )
}

export default HomePage
