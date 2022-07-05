import ajv from '../../config/ajv'
import { JSONSchemaType } from 'ajv'

export const USERNAME_LENGTH = 40
export const FULLNAME_LENGTH = 40

interface CreateUser {
  fullname: string
  username: string
}
const createUserScheme: JSONSchemaType<CreateUser> = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 4, maxLength: USERNAME_LENGTH },
    fullname: { type: 'string', minLength: 2, maxLength: FULLNAME_LENGTH },
  },
  required: ['username', 'fullname'],
  additionalProperties: false,
}

export const createUserSchemaValidator = ajv.compile(createUserScheme)
