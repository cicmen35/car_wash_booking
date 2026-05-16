export interface Service {
  id: number
  name: string
  description: string
  price: number
  durationMinutes: number
}

export interface ServiceResponse {
  id: number
  name: string
  description: string
  price: number
  duration: number
}
