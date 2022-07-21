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

export enum Constraints {
  name = 60,
  tagline = 100,
  description = 3000,
}
