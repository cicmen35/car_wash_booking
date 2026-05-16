import type { ReservationStatus } from '../types'

interface StatusBadgeProps {
  status: ReservationStatus
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status.toLowerCase()}`}>
      {status}
    </span>
  )
}

export default StatusBadge
