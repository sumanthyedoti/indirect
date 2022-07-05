import ajv from '../../config/ajv'
import { JSONSchemaType } from 'ajv'

interface CreateUser {
  fullname: string
  username: string
}
const createUserScheme: JSONSchemaType<CreateUser> = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 4, maxLength: 30 },
    fullname: { type: 'string', minLength: 2, maxLength: 30 },
  },
  required: ['username', 'fullname'],
  additionalProperties: false,
}

export const createUserSchemaValidator = ajv.compile(createUserScheme)
