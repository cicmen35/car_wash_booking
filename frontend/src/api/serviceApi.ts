import { apiClient } from './client'
import type { ServiceResponse } from '../types/service'

export async function getServices(): Promise<ServiceResponse[]> {
  const response = await apiClient.get<ServiceResponse[]>('/services')
  return response.data
}

export async function getServiceById(id: number): Promise<ServiceResponse> {
  const response = await apiClient.get<ServiceResponse>(`/services/${id}`)
  return response.data
}
