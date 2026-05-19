import { AxiosError } from 'axios'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import { useSearchParams } from 'react-router-dom'

import { createReservation, getReservations } from '../api/reservationApi'
import { getServices } from '../api/serviceApi'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import ServiceCard from '../components/ServiceCard'
import SuccessMessage from '../components/SuccessMessage'
import type { ReservationRequest, ReservationResponse, Service } from '../types'
import type { ServiceResponse } from '../types/service'

// Later this should come from an admin-managed backend availability endpoint.
const defaultTimeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

const initialCustomerData = {
  customerName: '',
  email: '',
  phone: '',
  carModel: '',
  additionalNotes: '',
}

const weekDays = ['Pon', 'Uto', 'Str', 'Štv', 'Pia', 'Sob', 'Ned']

function toService(service: ServiceResponse): Service {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    price: service.price,
    durationMinutes: service.duration,
  }
}

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getUpcomingDates(days: number): string[] {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return formatDate(date)
  })
}

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

function getMonthDifference(fromDate: Date, toDate: Date): number {
  return (
    (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
    (toDate.getMonth() - fromDate.getMonth())
  )
}

function getCalendarDates(monthDate: Date): string[] {
  const firstDayOfMonth = getMonthStart(monthDate)
  const mondayOffset = (firstDayOfMonth.getDay() + 6) % 7
  const firstCalendarDay = new Date(firstDayOfMonth)
  firstCalendarDay.setDate(firstDayOfMonth.getDate() - mondayOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstCalendarDay)
    date.setDate(firstCalendarDay.getDate() + index)
    return formatDate(date)
  })
}

function isSameMonth(date: string, monthDate: Date): boolean {
  const parsedDate = new Date(`${date}T00:00:00`)
  return (
    parsedDate.getFullYear() === monthDate.getFullYear() &&
    parsedDate.getMonth() === monthDate.getMonth()
  )
}

function formatMonthTitle(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatDisplayDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

function getAvailableTimes(
  date: string,
  reservations: ReservationResponse[],
): string[] {
  const bookedTimes = new Set(
    reservations
      .filter((reservation) => reservation.reservationDate === date)
      .map((reservation) => reservation.reservationTime.slice(0, 5)),
  )

  return defaultTimeSlots.filter((time) => !bookedTimes.has(time))
}

function BookingPage() {
  const [searchParams] = useSearchParams()
  const preselectedServiceId = Number(searchParams.get('serviceId'))
  const pageTopRef = useRef<HTMLElement>(null)
  const scheduleRef = useRef<HTMLElement>(null)
  const detailsRef = useRef<HTMLElement>(null)

  const [services, setServices] = useState<Service[]>([])
  const [reservations, setReservations] = useState<ReservationResponse[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [calendarMonth, setCalendarMonth] = useState(() =>
    getMonthStart(new Date()),
  )
  const [customerData, setCustomerData] = useState(initialCustomerData)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const currentMonth = useMemo(() => getMonthStart(new Date()), [])
  const maxCalendarMonth = useMemo(() => addMonths(currentMonth, 3), [currentMonth])
  const calendarDates = useMemo(
    () => getCalendarDates(calendarMonth),
    [calendarMonth],
  )
  const canGoToPreviousMonth =
    getMonthDifference(currentMonth, calendarMonth) > 0
  const canGoToNextMonth =
    getMonthDifference(currentMonth, calendarMonth) < 3

  useEffect(() => {
    async function loadBookingData() {
      try {
        const [serviceData, reservationData] = await Promise.all([
          getServices(),
          getReservations(),
        ])
        const mappedServices = serviceData.map(toService)

        setServices(mappedServices)
        setReservations(reservationData)

        const preselectedService = mappedServices.find(
          (service) => service.id === preselectedServiceId,
        )
        if (preselectedService) {
          setSelectedService(preselectedService)
        }

        const closestAvailableDate = getUpcomingDates(60).find(
          (date) => getAvailableTimes(date, reservationData).length > 0,
        )
        if (closestAvailableDate) {
          setSelectedDate(closestAvailableDate)
          setCalendarMonth(getMonthStart(new Date(`${closestAvailableDate}T00:00:00`)))
        }
      } catch {
        setErrorMessage('Booking data could not be loaded. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadBookingData()
  }, [preselectedServiceId])

  const availableTimes = selectedDate
    ? getAvailableTimes(selectedDate, reservations)
    : []

  function handleServiceSelect(service: Service) {
    setSelectedService(service)
    setSelectedTime('')
    setSuccessMessage('')
    requestAnimationFrame(() => {
      scheduleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function handleDateSelect(date: string) {
    setSelectedDate(date)
    setSelectedTime('')
    setSuccessMessage('')
  }

  function handlePreviousMonth() {
    setCalendarMonth((activeMonth) => {
      const previousMonth = addMonths(activeMonth, -1)
      return previousMonth < currentMonth ? activeMonth : previousMonth
    })
  }

  function handleNextMonth() {
    setCalendarMonth((activeMonth) => {
      const nextMonth = addMonths(activeMonth, 1)
      return nextMonth > maxCalendarMonth ? activeMonth : nextMonth
    })
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
    setSuccessMessage('')
    requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function scrollToFeedback() {
    requestAnimationFrame(() => {
      pageTopRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  function handleCustomerChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target
    setCustomerData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function validateBooking(): string {
    if (!selectedService) {
      return 'Please select a service.'
    }
    if (!selectedDate) {
      return 'Please select a reservation date.'
    }
    if (!selectedTime) {
      return 'Please select a reservation time.'
    }
    if (!customerData.customerName.trim()) {
      return 'Name and surname are required.'
    }
    if (!customerData.email.trim()) {
      return 'Email is required.'
    }
    if (!customerData.phone.trim()) {
      return 'Phone number is required.'
    }
    if (!customerData.carModel.trim()) {
      return 'Car model is required.'
    }

    return ''
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const validationMessage = validateBooking()
    if (validationMessage) {
      setErrorMessage(validationMessage)
      scrollToFeedback()
      return
    }

    if (!selectedService) {
      return
    }

    const reservation: ReservationRequest = {
      customerName: customerData.customerName.trim(),
      email: customerData.email.trim(),
      phone: customerData.phone.trim(),
      carModel: customerData.carModel.trim(),
      serviceId: selectedService.id,
      reservationDate: selectedDate,
      reservationTime: selectedTime,
      additionalNotes: customerData.additionalNotes.trim() || undefined,
    }

    setIsSubmitting(true)

    try {
      const createdReservation = await createReservation(reservation)
      setReservations((currentReservations) => [
        ...currentReservations,
        createdReservation,
      ])
      setCustomerData(initialCustomerData)
      setSelectedTime('')
      setSuccessMessage(
        'Rezervácia úspešne vytvorená.',
      )
      scrollToFeedback()
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message ??
          'Rezerváciu sa nepodarilo vytvoriť. Skúste to znovu.',
        )
      } else {
        setErrorMessage('Rezerváciu sa nepodarilo vytvoriť. Skúste to znovu.')
      }
      scrollToFeedback()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="booking-page">
      <section className="page-heading" ref={pageTopRef}>
        <h1>Rezervujte si termín</h1>
        <p>
          Zvolte si službu, vyberte si vhodný termín a zanechajte svoje kontaktné údaje.
        </p>
      </section>

      {isLoading && <LoadingSpinner label="Loading booking options..." />}
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />

      {!isLoading && (
        <form className="booking-flow" onSubmit={handleSubmit}>
          <section className="booking-step">
            <div className="section-heading">
              <h2>Výber služby</h2>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isSelected={selectedService?.id === service.id}
                  onSelect={handleServiceSelect}
                />
              ))}
            </div>
          </section>

// Doplnkové služby tu

          <section className="booking-step" ref={scheduleRef}>
            <div className="section-heading">
              <h2>Výber dátumu a času</h2>
            </div>
            <div className="availability-picker">
              <div className="calendar-picker" aria-label="Available dates">
                <div className="calendar-header">
                  <button
                    type="button"
                    onClick={handlePreviousMonth}
                    disabled={!canGoToPreviousMonth}
                  >
                    {'<'}
                  </button>
                  <h3>{formatMonthTitle(calendarMonth)}</h3>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    disabled={!canGoToNextMonth}
                  >
                    {'>'}
                  </button>
                </div>

                <div className="calendar-grid">
                  {weekDays.map((day) => (
                    <div className="calendar-weekday" key={day}>
                      {day}
                    </div>
                  ))}

                  {calendarDates.map((date) => {
                    const times = getAvailableTimes(date, reservations)
                    const isPast = date < formatDate(new Date())
                    const isDisabled = isPast || times.length === 0
                    const dayNumber = new Date(`${date}T00:00:00`).getDate()
                    const className = [
                      date === selectedDate ? 'selected' : '',
                      isSameMonth(date, calendarMonth) ? '' : 'outside-month',
                    ]
                      .filter(Boolean)
                      .join(' ')

                    return (
                      <button
                        key={date}
                        type="button"
                        className={className}
                        disabled={isDisabled}
                        onClick={() => handleDateSelect(date)}
                      >
                        <span>{dayNumber}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="time-list" aria-label="Available times">
                {availableTimes.length === 0 && (
                  <p>No available times for this date.</p>
                )}
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={time === selectedTime ? 'selected' : ''}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="booking-step" ref={detailsRef}>
            <div className="section-heading">
              <h2>Vaše údaje</h2>
            </div>

            <div className="booking-details-grid">
              <div className="customer-details">
                <label>
                  Meno a priezvisko
                  <input
                    name="customerName"
                    type="text"
                    value={customerData.customerName}
                    onChange={handleCustomerChange}
                    required
                  />
                </label>

                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={customerData.email}
                    onChange={handleCustomerChange}
                    required
                  />
                </label>

                <label>
                  Telefónne číslo
                  <input
                    name="phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={handleCustomerChange}
                    required
                  />
                </label>

                <label>
                  Model auta
                  <input
                    name="carModel"
                    type="text"
                    value={customerData.carModel}
                    onChange={handleCustomerChange}
                    required
                  />
                </label>

                <label className="full-width">
                  Poznámka
                  <textarea
                    name="additionalNotes"
                    value={customerData.additionalNotes}
                    onChange={handleCustomerChange}
                    rows={5}
                  />
                </label>
              </div>

              <aside className="booking-summary">
                <h2>Sumarizácia</h2>
                <dl>
                  <div>
                    <dt>Služba</dt>
                    <dd>{selectedService?.name ?? '-'}</dd>
                  </div>
                  <div>
                    <dt>Dátum</dt>
                    <dd>
                      {selectedDate ? formatDisplayDate(selectedDate) : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt>Čas</dt>
                    <dd>{selectedTime || '-'}</dd>
                  </div>
                  <div>
                    <dt>Finálna suma</dt>
                    <dd>{selectedService ? `€${selectedService.price}` : '-'}</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </section>

          <button
            className="create-reservation-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Vytváram rezerváciu...' : 'Vytvoriť rezerváciu'}
          </button>
        </form>
      )}
    </main>
  )
}

export default BookingPage
