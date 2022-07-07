interface Info {
  email: string
  fullname: string
}

export interface CreateUser extends Info, InfoT {
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

export interface UpdateUser extends Omit<Info, 'email'> {
  id: number
}
