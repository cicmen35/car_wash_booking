import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  deleteReservation,
  getReservationById,
  updateReservationStatus,
} from '../api/reservationApi'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import StatusBadge from '../components/StatusBadge'
import type { ReservationResponse, ReservationStatus } from '../types'

function AdminReservationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const reservationId = Number(id)
  const [reservation, setReservation] = useState<ReservationResponse | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isActionRunning, setIsActionRunning] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadReservation() {
      if (!reservationId) {
        setErrorMessage('Reservation ID is missing.')
        setIsLoading(false)
        return
      }

      try {
        const reservationData = await getReservationById(reservationId)
        setReservation(reservationData)
      } catch {
        setErrorMessage('Reservation could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadReservation()
  }, [reservationId])

  async function handleStatusUpdate(status: ReservationStatus) {
    if (!reservation) {
      return
    }

    setErrorMessage('')
    setIsActionRunning(true)

    try {
      const updatedReservation = await updateReservationStatus(
        reservation.id,
        status,
      )
      setReservation(updatedReservation)
    } catch {
      setErrorMessage('Reservation status could not be updated.')
    } finally {
      setIsActionRunning(false)
    }
  }

  async function handleDelete() {
    if (!reservation) {
      return
    }

    const shouldDelete = window.confirm(
      'Are you sure you want to delete this reservation?',
    )

    if (!shouldDelete) {
      return
    }

    setErrorMessage('')
    setIsActionRunning(true)

    try {
      await deleteReservation(reservation.id)
      navigate('/admin/reservations')
    } catch {
      setErrorMessage('Reservation could not be deleted.')
      setIsActionRunning(false)
    }
  }

  if (isLoading) {
    return <LoadingSpinner label="Loading reservation..." />
  }

  if (!reservation) {
    return <ErrorMessage message={errorMessage || 'Reservation not found.'} />
  }

  return (
    <main className="admin-reservation-detail">
      <Link className="back-link" to="/admin/reservations">
        Back to reservations
      </Link>

      <ErrorMessage message={errorMessage} />

      <section className="reservation-detail-grid">
        <div className="reservation-detail-card">
          <h2>Booking</h2>
          <dl>
            <div>
              <dt>Service</dt>
              <dd>{reservation.serviceName}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{reservation.reservationDate}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{reservation.reservationTime}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <StatusBadge status={reservation.status} />
              </dd>
            </div>
          </dl>
        </div>

        <div className="reservation-detail-card">
          <h2>Customer</h2>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{reservation.customerName}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{reservation.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{reservation.phone}</dd>
            </div>
            <div>
              <dt>Car model</dt>
              <dd>{reservation.carModel}</dd>
            </div>
          </dl>
        </div>

        <div className="reservation-detail-card full-width">
          <h2>Notes</h2>
          <p>{reservation.additionalNotes || 'No additional notes.'}</p>
        </div>
      </section>

      <section className="reservation-detail-actions">
        <button
          type="button"
          disabled={isActionRunning || reservation.status === 'CONFIRMED'}
          onClick={() => handleStatusUpdate('CONFIRMED')}
        >
          Confirm reservation
        </button>
        <button
          type="button"
          disabled={isActionRunning || reservation.status === 'CANCELLED'}
          onClick={() => handleStatusUpdate('CANCELLED')}
        >
          Cancel reservation
        </button>
        <button
          type="button"
          disabled={isActionRunning || reservation.status === 'COMPLETED'}
          onClick={() => handleStatusUpdate('COMPLETED')}
        >
          Mark as completed
        </button>
        <button
          className="danger"
          type="button"
          disabled={isActionRunning}
          onClick={handleDelete}
        >
          Delete reservation
        </button>
      </section>
    </main>
  )
}

export default AdminReservationDetailPage
