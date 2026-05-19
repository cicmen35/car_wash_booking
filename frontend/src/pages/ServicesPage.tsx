import { useEffect, useState } from 'react'

import { getServices } from '../api/serviceApi'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import ServiceCard from '../components/ServiceCard'
import type { Service, ServiceResponse } from '../types'

function toService(service: ServiceResponse): Service {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    price: service.price,
    durationMinutes: service.duration,
  }
}

function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadServices() {
      try {
        const serviceData = await getServices()
        setServices(serviceData.map(toService))
      } catch {
        setErrorMessage('Services could not be loaded. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  return (
    <main>
      <section className="page-heading">
        <h1>Naše služby</h1>
      </section>

      {isLoading && <LoadingSpinner label="Loading services..." />}
      <ErrorMessage message={errorMessage} />

      {!isLoading && !errorMessage && (
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              showBookingButton
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default ServicesPage
