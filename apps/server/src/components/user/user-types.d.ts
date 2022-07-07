interface PasswordT {
  password_hash: string
  password_salt: string
}
interface InfoT {
  email: string
  fullname: string
}
export interface CreateUserT extends PasswordT, InfoT {}

export interface GetUserT extends InfoT {
  id: number
}

export interface GetUserByEmail extends PasswordT, InfoT {
  id: number
}

export interface UpdateUserT extends Omit<InfoT, 'email'> {
  id: number
}
