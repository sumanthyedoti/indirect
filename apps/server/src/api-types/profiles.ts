export interface CreateProfile {
  user_id: number
  space_id: number
}

export interface Profile {
  user_id: number
  space_id: number
  display_name: string | null
  status_text: string | null
  status_emoji: string | null
  status_duration: string | null
  is_active: boolean
  created_at: Date
  updated_at: Date
}
