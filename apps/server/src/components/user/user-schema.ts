import ajv from '../../config/ajv'
import { JSONSchemaType } from 'ajv'

export const DATA_LENGTH = Object.freeze({
  username: 20,
  fullname: 40,
  status: 100,
  quote: 100,
})

interface CreateUser {
  fullname: string
  username: string
  status: string
  quote: string
}
const createUserScheme: JSONSchemaType<CreateUser> = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 2, maxLength: DATA_LENGTH.username },
    fullname: { type: 'string', minLength: 2, maxLength: DATA_LENGTH.fullname },
    status: { type: 'string', minLength: 2, maxLength: DATA_LENGTH.status },
    quote: { type: 'string', minLength: 2, maxLength: DATA_LENGTH.quote },
  },
  required: ['username', 'fullname'],
  additionalProperties: false,
}

export const createUserSchemaValidator = ajv.compile(createUserScheme)
