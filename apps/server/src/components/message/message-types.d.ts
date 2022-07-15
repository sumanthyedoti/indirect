interface Info {
  text?: string | null
  sender_id: number
}
export interface CreateMessage extends Info {}

export interface Message extends Info {
  id: number
  created_at: Date
}
