import { apiClient } from './client'
import type {
  ReservationRequest,
  ReservationResponse,
  ReservationStatus,
} from '../types/reservation'

export async function createReservation(
  reservation: ReservationRequest,
): Promise<ReservationResponse> {
  const response = await apiClient.post<ReservationResponse>(
    '/reservations',
    reservation,
  )
  return response.data
}

export async function getReservations(): Promise<ReservationResponse[]> {
  const response = await apiClient.get<ReservationResponse[]>('/reservations')
  return response.data
}

export async function getReservationById(
  id: number,
): Promise<ReservationResponse> {
  const response = await apiClient.get<ReservationResponse>(
    `/reservations/${id}`,
  )
  return response.data
}

export async function updateReservationStatus(
  id: number,
  status: ReservationStatus,
): Promise<ReservationResponse> {
  const response = await apiClient.patch<ReservationResponse>(
    `/reservations/${id}/status`,
    { status },
  )
  return response.data
}

export async function deleteReservation(id: number): Promise<void> {
  await apiClient.delete(`/reservations/${id}`)
}
