interface Info {
  name: string
  tagline?: string | null
  description?: string | null
  creator_id: number
}

import { User } from './users'
import { Profile } from './profiles'

export interface CreateSpace extends Info {
  is_private?: boolean
}

export interface Space extends Info {
  id: number
  is_private: boolean
  general_channel_id: number
  created_at: Date
}

export interface UpdateSpace extends Omit<Info, 'creator_id'> {}

export interface SpaceUser extends User, Profile {}

export interface UserLeftSpace {
  user_id: number
  space_id: number
}

export interface Invites {
  emails: string[]
  spaceName: string
}

export enum Constraints {
  name = 60,
  tagline = 255,
  description = 3000,
}
