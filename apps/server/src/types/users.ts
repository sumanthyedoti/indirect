interface Info {
  email: string
  fullname: string
}

export interface CreateUser extends Info {
  password_hash: string
}

export interface RegisterUser extends Info {
  password: string
  google_id: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface GetUser extends Info {
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
  emailMax = 100,
  fullname = 40,
  quote = 100,
  passwordMin = 6,
  passwordMax = 40,
  googleId = 100,
}
