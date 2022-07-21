interface Info {
  name: string
  tagline?: string | null
  description?: string | null
}

export interface CreateSpace extends Info {}

export interface Space extends Info {
  id: number
}

export interface UpdateSpace extends Info {}

export interface SpaceUser {
  id: number
  user_id: number
  space_id: number
  fullname: string
  display_name: string | null
  email: string
  status_text: string | null
  status_emoji: string | null
  status_duration: string | null
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export enum Constraints {
  name = 60,
  tagline = 255,
  description = 3000,
}
