import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="eyebrow">Professional car cleaning</p>
        <h1>Umyvanie aut Nitra</h1>
        <p className="hero-copy">
          Interior and exterior car wash reservations with careful detailing,
          flexible booking times, and friendly local service.
        </p>
        <div className="hero-actions">
          <Link className="button-primary" to="/book">
            Book a wash
          </Link>
          <Link className="button-secondary" to="/services">
            View services
          </Link>
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

      <section className="home-section">
        <div className="section-heading">
          <p className="eyebrow">Why choose us</p>
          <h2>Simple booking, careful work</h2>
        </div>
        <div className="feature-grid">
          <article>
            <h3>Interior and exterior detailing</h3>
            <p>Choose the level of cleaning that fits your car and schedule.</p>
          </article>
          <article>
            <h3>Flexible reservation times</h3>
            <p>Book online and choose the time slot that works for your day.</p>
          </article>
          <article>
            <h3>Friendly local service</h3>
            <p>Clear communication and practical care from a local car wash team.</p>
          </article>
        </div>
      </section>

      <section className="contact-cta">
        <div>
          <p className="eyebrow">Questions?</p>
          <h2>Need help choosing a service?</h2>
          <p>Contact us and we will help you pick the right wash or detailing package.</p>
        </div>
        <Link className="button-primary" to="/contact">
          Contact us
        </Link>
      </section>
    </main>
  )
}

export default HomePage
