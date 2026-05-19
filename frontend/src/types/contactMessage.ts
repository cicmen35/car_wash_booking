export interface ContactMessageRequest {
  name: string
  phone: string
  email: string
  message?: string
}

export interface ContactMessageResponse {
  id: number
  name: string
  phone: string
  email: string
  message?: string
  createdAt: string
}
