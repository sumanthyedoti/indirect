interface Info {
  html: string | null
  sender_id: number
  channel_id: number | null
  personal_channel_id: number | null
}
export interface CreateMessage extends Info {}

export interface Message extends Info {
  id: number
  created_at: Date
}

export interface SocketMessage {
  html: string
  tempId: number
  channelId: number
  spaceId: number
}

export enum Constraints {
  html = 6000,
}
