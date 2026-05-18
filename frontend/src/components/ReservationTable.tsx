import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getReservations } from '../api/reservationApi'
import type { ReservationResponse } from '../types'
import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'
import StatusBadge from './StatusBadge'

function ReservationTable() {
  const [reservations, setReservations] = useState<ReservationResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadReservations() {
      try {
        const reservationData = await getReservations()
        setReservations(reservationData)
      } catch {
        setErrorMessage('Reservations could not be loaded.')
      } finally {
        setIsLoading(false)
      }
    }

    loadReservations()
  }, [])

  if (isLoading) {
    return <LoadingSpinner label="Loading reservations..." />
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />
  }

  if (reservations.length === 0) {
    return <p>No reservations yet.</p>
  }

  return (
    <>
      <ErrorMessage message={errorMessage} />
      <div className="reservation-table-wrapper">
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Reservation</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.reservationDate}</td>
                <td>{reservation.reservationTime}</td>
                <td>
                  <StatusBadge status={reservation.status} />
                </td>
                <td>
                  <Link
                    className="reservation-detail-link"
                    to={`/admin/reservations/${reservation.id}`}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ReservationTable
