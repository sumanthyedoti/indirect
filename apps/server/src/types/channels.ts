interface Info {
  space_id: number
  name: string
  description: string | null
  creator_id: number
  is_private: boolean
}

export interface Channel extends Info {
  id: number
  is_shared: boolean
}

export interface CreateChannel extends Info {}

export interface UpdateChannel {
  name: string | null
  description: string | null
}

export enum Constraints {
  name = 60,
  description = 3000,
}
