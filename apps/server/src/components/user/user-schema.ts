import ajv from '../../config/ajv'
import { JSONSchemaType } from 'ajv'

export const DATA_LENGTH = Object.freeze({
  email: 100,
  fullname: 40,
  quote: 100,
  password: 40,
  googleId: 100,
})

interface CreateUser {
  email: string
  fullname: string
  password: string
  google_id: string
}
const createUserScheme: JSONSchemaType<CreateUser> = {
  type: 'object',
  properties: {
    email: { type: 'string', minLength: 2, maxLength: DATA_LENGTH.email },
    fullname: { type: 'string', minLength: 2, maxLength: DATA_LENGTH.fullname },
    password: { type: 'string', minLength: 2, maxLength: DATA_LENGTH.password },
    google_id: {
      type: 'string',
      minLength: 2,
      maxLength: DATA_LENGTH.googleId,
    },
  },
  required: ['fullname', 'email', 'password'],
  additionalProperties: false,
}

export const createUserSchemaValidator = ajv.compile(createUserScheme)
