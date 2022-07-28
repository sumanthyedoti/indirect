interface Info {
  name: string
  tagline?: string | null
  description?: string | null
  creator_id: number
}

import { User } from './users'
import { Profile } from './profile'

export interface CreateSpace extends Info {
  is_private?: boolean
}

export interface Space extends Info {
  id: number
  is_private: boolean
}

export interface UpdateSpace extends Info {}

export interface SpaceUser extends User, Profile {}

export enum Constraints {
  name = 60,
  tagline = 255,
  description = 3000,
}
