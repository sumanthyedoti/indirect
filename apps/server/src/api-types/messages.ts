interface Info {
  text: string | null
  sender_id: number
  channel_id: number | null
  personal_channel_id: number | null
}
export interface CreateMessage extends Info {}

export interface Message extends Info {
  id: number
  created_at: Date
}

export enum Constraints {
  text = 3000,
}
