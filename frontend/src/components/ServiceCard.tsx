import type { Service } from '../types'

interface ServiceCardProps {
  service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="service-card__header">
        <h2>{service.name}</h2>
        <p className="service-card__price">€{service.price}</p>
      </div>

      <p className="service-card__duration">
        {service.durationMinutes} minutes
      </p>
      <p>{service.description}</p>
    </article>
  )
}

export default ServiceCard
