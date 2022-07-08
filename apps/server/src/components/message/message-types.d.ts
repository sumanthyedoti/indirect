interface Info {
  text?: string | null
  sender_id: number
}
export interface CreateMessage extends Info {}

export interface GetMessage extends Info {
  id: number
}
