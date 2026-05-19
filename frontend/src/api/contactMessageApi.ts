import { apiClient } from './client'
import type {
  ContactMessageRequest,
  ContactMessageResponse,
} from '../types/contactMessage'

export async function createContactMessage(
  message: ContactMessageRequest,
): Promise<ContactMessageResponse> {
  const response = await apiClient.post<ContactMessageResponse>(
    '/contact-messages',
    message,
  )
  return response.data
}

export async function getContactMessages(): Promise<ContactMessageResponse[]> {
  const response = await apiClient.get<ContactMessageResponse[]>(
    '/contact-messages',
  )
  return response.data
}

export async function deleteContactMessage(id: number): Promise<void> {
  await apiClient.delete(`/contact-messages/${id}`)
}
