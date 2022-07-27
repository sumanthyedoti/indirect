interface Info {
  space_id: number
  name: string
  description: string | null
  creator_id: number
}

export interface Channel extends Info {
  id: number
  is_shared: boolean
  is_private: boolean
}

export interface CreateChannel extends Info {
  is_private?: boolean
}

export interface UpdateChannel {
  name: string | null
  description: string | null
}

export interface ChannelMembers {
  user_ids: number[]
}
export enum Constraints {
  name = 60,
  description = 3000,
}
