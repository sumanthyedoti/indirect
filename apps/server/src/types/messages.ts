interface Info {
  text: string | null
  sender_id: number
}
export interface CreateMessage extends Info {}

export interface Message extends Info {
  id: number
  channel_id: number | null
  conversation_id: number | null
  created_at: Date
}

export enum Constraints {
  text = 3000,
}
