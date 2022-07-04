import ajv from '../../config/ajv'
import { JSONSchemaType } from 'ajv'

interface CreateUser {
  fullname: string
  username: string
}
const createUserScheme: JSONSchemaType<CreateUser> = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    fullname: { type: 'string' },
  },
  required: ['username', 'fullname'],
  additionalProperties: false,
}

export const createUserSchemaValidator = ajv.compile(createUserScheme)
