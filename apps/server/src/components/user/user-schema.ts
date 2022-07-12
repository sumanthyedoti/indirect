import ajv from '../../config/ajv'
import { JSONSchemaType } from 'ajv'

export const DATA_LENGTH = Object.freeze({
  email: 100,
  fullname: 40,
  quote: 100,
  password: 40,
  googleId: 100,
})

interface RegisterUser {
  email: string
  fullname: string
  password: string
  google_id: string
}
const registerUserScheme: JSONSchemaType<RegisterUser> = {
  type: 'object',
  properties: {
    email: { type: 'string', minLength: 4, maxLength: DATA_LENGTH.email },
    fullname: { type: 'string', minLength: 2, maxLength: DATA_LENGTH.fullname },
    password: { type: 'string', minLength: 6, maxLength: DATA_LENGTH.password },
    google_id: {
      type: 'string',
      minLength: 2,
      maxLength: DATA_LENGTH.googleId,
    },
  },
  required: ['fullname', 'email', 'password'],
  // additionalProperties: false,
}

export const createUserSchemaValidator = ajv.compile(registerUserScheme)

interface LoginUser {
  email: string
  password: string
}
const loginUserScheme: JSONSchemaType<LoginUser> = {
  type: 'object',
  properties: {
    email: { type: 'string', minLength: 6, maxLength: DATA_LENGTH.email },
    password: { type: 'string', minLength: 6, maxLength: DATA_LENGTH.password },
  },
  required: ['email', 'password'],
  // additionalProperties: false,
}

export const loginUserSchemaValidator = ajv.compile(loginUserScheme)
