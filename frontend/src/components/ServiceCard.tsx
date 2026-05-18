import type { Service } from '../types'
import { Link } from 'react-router-dom'

interface ServiceCardProps {
  service: Service
  showBookingButton?: boolean
  isSelected?: boolean
  onSelect?: (service: Service) => void
}

function ServiceCard({
  service,
  showBookingButton = false,
  isSelected = false,
  onSelect,
}: ServiceCardProps) {
  function handleSelect() {
    onSelect?.(service)
  }

  return (
    <article
      className={`service-card${isSelected ? ' service-card--selected' : ''}${onSelect ? ' service-card--clickable' : ''}`}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleSelect()
        }
      }}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      <div className="service-card__header">
        <h2>{service.name}</h2>
        <p className="service-card__price">€{service.price}</p>
      </div>

      <p className="service-card__duration">
        {service.durationMinutes} minutes
      </p>
      <p>{service.description}</p>

      {showBookingButton && (
        <Link
          className="button-primary service-card__action"
          to={`/book?serviceId=${service.id}`}
        >
          Book this service
        </Link>
      )}
    </article>
  )
}

export default ServiceCard
