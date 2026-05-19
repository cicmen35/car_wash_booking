import { useState } from 'react'
import { Link } from 'react-router-dom'

import exterior1After from '../assets/exterior1_after.png'
import exterior1Before from '../assets/exterior1_before.png'
import exterior2After from '../assets/exterior2_after.png'
import exterior2Before from '../assets/exterior2_before.png'
import exterior3After from '../assets/exterior3_after.png'
import exterior3Before from '../assets/exterior3_before.png'
import exterior5After from '../assets/exterior5_after.png'
import exterior5Before from '../assets/exterior5_before.png'
import interior1After from '../assets/interior1_after.png'
import interior1Before from '../assets/interior1_before.png'
import interior2After from '../assets/interior2_after.png'
import interior2Before from '../assets/interior2_before.png'
import interior3After from '../assets/interior3_after.png'
import interior3Before from '../assets/interior3_before.png'
import interior4After from '../assets/interior4_after.png'
import interior4Before from '../assets/interior4_before.png'
import logo from '../assets/logo.jpg'
import SuccessMessage from '../components/SuccessMessage'

const showcaseItems = [
  {
    title: 'Exterior wash',
    before: exterior1Before,
    after: exterior1After,
  },
  {
    title: 'Paint refresh',
    before: exterior2Before,
    after: exterior2After,
  },
  {
    title: 'Exterior detailing',
    before: exterior3Before,
    after: exterior3After,
  },
  {
    title: 'Premium exterior finish',
    before: exterior5Before,
    after: exterior5After,
  },
  {
    title: 'Interior cleaning',
    before: interior1Before,
    after: interior1After,
  },
  {
    title: 'Seat and cabin care',
    before: interior2Before,
    after: interior2After,
  },
  {
    title: 'Dashboard detail',
    before: interior3Before,
    after: interior3After,
  },
  {
    title: 'Full interior refresh',
    before: interior4Before,
    after: interior4After,
  },
]

function HomePage() {
  const [messageSent, setMessageSent] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
  } | null>(null)

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
        <div className="section-heading section-heading--centered">
          <h2>Results from our work</h2>
        </div>
        <div className="showcase-grid">
          {showcaseItems.map((item) => (
            <article className="showcase-card" key={item.title}>
              <div className="showcase-pair">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage({
                      src: item.before,
                      alt: `${item.title} before`,
                    })
                  }
                >
                  <img src={item.before} alt={`${item.title} before`} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage({
                      src: item.after,
                      alt: `${item.title} after`,
                    })
                  }
                >
                  <img src={item.after} alt={`${item.title} after`} />
                </button>
              </div>
            </article>
          ))}
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

      {selectedImage ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged showcase image"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="image-lightbox__close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
          >
            ×
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </main>
  )
}

export default HomePage
