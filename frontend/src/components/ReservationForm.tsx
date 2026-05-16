import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { createReservation } from '../api/reservationApi'
import { getServices } from '../api/serviceApi'
import type { ReservationRequest } from '../types'
import type { ServiceResponse } from '../types/service'

const initialFormData = {
  customerName: '',
  email: '',
  phone: '',
  carModel: '',
  serviceId: '',
  reservationDate: '',
  reservationTime: '',
  additionalNotes: '',
}

function ReservationForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [services, setServices] = useState<ServiceResponse[]>([])
  const [isLoadingServices, setIsLoadingServices] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadServices() {
      try {
        const serviceData = await getServices()
        setServices(serviceData)
      } catch {
        setErrorMessage('Services could not be loaded. Please try again later.')
      } finally {
        setIsLoadingServices(false)
      }
    }

    loadServices()
  }, [])

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')
    setIsSubmitting(true)

    const reservation: ReservationRequest = {
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      carModel: formData.carModel,
      serviceId: Number(formData.serviceId),
      reservationDate: formData.reservationDate,
      reservationTime: formData.reservationTime,
      additionalNotes: formData.additionalNotes || undefined,
    }

    try {
      await createReservation(reservation)
      setSuccessMessage('Reservation request submitted successfully.')
      setFormData(initialFormData)
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message ??
            'Reservation could not be submitted. Please try again.',
        )
      } else {
        setErrorMessage('Reservation could not be submitted. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      {successMessage && <p className="form-message success">{successMessage}</p>}
      {errorMessage && <p className="form-message error">{errorMessage}</p>}

      <label>
        Customer name
        <input
          name="customerName"
          type="text"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Car model
        <input
          name="carModel"
          type="text"
          value={formData.carModel}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Service
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          disabled={isLoadingServices}
          required
        >
          <option value="">
            {isLoadingServices ? 'Loading services...' : 'Select a service'}
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - €{service.price} / {service.duration} min
            </option>
          ))}
        </select>
      </label>

      <label>
        Reservation date
        <input
          name="reservationDate"
          type="date"
          value={formData.reservationDate}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Reservation time
        <input
          name="reservationTime"
          type="time"
          value={formData.reservationTime}
          onChange={handleChange}
          required
        />
      </label>

      <label className="full-width">
        Additional notes
        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows={4}
        />
      </label>

      <button type="submit" disabled={isSubmitting || isLoadingServices}>
        {isSubmitting ? 'Submitting...' : 'Submit reservation'}
      </button>
    </form>
  )
}

export default ReservationForm
