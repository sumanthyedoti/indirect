export type User = {
  id: number
  fullname: string
  email: string
}

export interface Message {
  id: number
  sender_id: number
  created_at: Date
  text: string
}
