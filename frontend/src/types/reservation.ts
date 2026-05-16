export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'

export interface ReservationRequest {
  customerName: string
  email: string
  phone: string
  carModel: string
  serviceId: number
  reservationDate: string
  reservationTime: string
  additionalNotes?: string
}

export interface ReservationResponse {
  id: number
  customerName: string
  email: string
  phone: string
  carModel: string
  serviceName: string
  reservationDate: string
  reservationTime: string
  additionalNotes?: string
  status: ReservationStatus
  createdAt: string
}

export interface UpdateReservationStatusRequest {
  status: ReservationStatus
}
