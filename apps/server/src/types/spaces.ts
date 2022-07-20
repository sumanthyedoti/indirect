interface Info {
  name: string
  tagline?: string
  description?: string
}
export interface CreateSpace extends Info {}

export interface Space {
  id: number
  name: string
  tagline?: string
  description?: string
}

export enum Constraints {
  name = 60,
  tagline = 100,
  description = 3000,
}
