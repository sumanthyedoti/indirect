interface Info {
  space_id: number
  name: string
  description: string | null
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
