interface Info {
  name: string
  tagline?: string | null
  description?: string | null
  is_private: boolean
}

import { User } from './users'
import { Profile } from './profile'

export interface CreateSpace extends Info {}

export interface Space extends Info {
  id: number
}

export interface UpdateSpace extends Info {}

export interface SpaceUser extends User, Profile {}

export enum Constraints {
  name = 60,
  tagline = 255,
  description = 3000,
}
