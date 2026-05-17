import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'

import { createReservation } from '../api/reservationApi'
import { getServices } from '../api/serviceApi'
import type { ReservationRequest } from '../types'
import type { ServiceResponse } from '../types/service'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'

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

function validateForm(formData: typeof initialFormData): string {
  if (!formData.customerName.trim()) {
    return 'Customer name is required.'
  }
  if (!formData.email.trim()) {
    return 'Email is required.'
  }
  if (!formData.phone.trim()) {
    return 'Phone number is required.'
  }
  if (!formData.carModel.trim()) {
    return 'Car model is required.'
  }
  if (!formData.serviceId) {
    return 'Service is required.'
  }
  if (!formData.reservationDate) {
    return 'Reservation date is required.'
  }
  if (!formData.reservationTime) {
    return 'Reservation time is required.'
  }

  return ''
}

function ReservationForm() {
  const [searchParams] = useSearchParams()
  const selectedServiceId = searchParams.get('serviceId') ?? ''
  const [formData, setFormData] = useState({
    ...initialFormData,
    serviceId: selectedServiceId,
  })
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

    const validationMessage = validateForm(formData)
    if (validationMessage) {
      setErrorMessage(validationMessage)
      return
    }

    setIsSubmitting(true)

    const reservation: ReservationRequest = {
      customerName: formData.customerName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      carModel: formData.carModel.trim(),
      serviceId: Number(formData.serviceId),
      reservationDate: formData.reservationDate,
      reservationTime: formData.reservationTime,
      additionalNotes: formData.additionalNotes.trim() || undefined,
    }

    try {
      await createReservation(reservation)
      setSuccessMessage(
        'Reservation request submitted successfully. We will confirm your booking soon.',
      )
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
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />

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
        Phone number
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
