import { useEffect, useState } from 'react'

import { getReservations } from '../api/reservationApi'
import type { ReservationResponse } from '../types'
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
    return <p>Loading reservations...</p>
  }

  if (errorMessage) {
    return <p className="form-message error">{errorMessage}</p>
  }

  if (reservations.length === 0) {
    return <p>No reservations yet.</p>
  }

  return (
    <div className="reservation-table-wrapper">
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Contact</th>
            <th>Car</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.customerName}</td>
              <td>
                <div>{reservation.email}</div>
                <div>{reservation.phone}</div>
              </td>
              <td>{reservation.carModel}</td>
              <td>{reservation.serviceName}</td>
              <td>{reservation.reservationDate}</td>
              <td>{reservation.reservationTime}</td>
              <td>
                <StatusBadge status={reservation.status} />
              </td>
              <td>{reservation.additionalNotes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReservationTable
