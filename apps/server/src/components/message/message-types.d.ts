interface Info {
  text?: string | null
  sender_id: number
}
export interface CreateMessage extends Info {}

export interface GetMessage extends Info {
  id: number
}

export interface GetMessages extends Info {
  text: string
  sender_id: number
}
