interface Info {
  email: string
  fullname: string
}

export interface CreateUser extends Info {
  password_hash: string
}

export interface RegisterUser extends Info {
  password: string
  google_id?: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface User extends Info {
  id: number
}

export interface GetUserByEmail extends Info {
  id: number
  password_hash: string
}

export interface UpdateUser {
  fullname: string
}

export enum Constraints {
  emailMin = 6,
  emailMax = 255,
  fullname = 60,
  quote = 255,
  passwordMin = 6,
  passwordMax = 255,
  googleId = 100,
}
