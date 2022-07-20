import { JSONSchemaType } from 'ajv'

import ajv from '../../config/ajv'
import { RegisterUser, LoginUser, Constraints } from '@api-types/users'

const registerUserScheme: JSONSchemaType<RegisterUser> = {
  type: 'object',
  properties: {
    email: { type: 'string', minLength: 4, maxLength: Constraints.email },
    fullname: { type: 'string', minLength: 2, maxLength: Constraints.fullname },
    password: { type: 'string', minLength: 6, maxLength: Constraints.password },
    google_id: {
      type: 'string',
      minLength: 2,
      maxLength: Constraints.googleId,
    },
  },
  required: ['fullname', 'email', 'password'],
  // additionalProperties: false,
}

export const createUserSchemaValidator = ajv.compile(registerUserScheme)

const loginUserScheme: JSONSchemaType<LoginUser> = {
  type: 'object',
  properties: {
    email: { type: 'string', minLength: 6, maxLength: Constraints.email },
    password: { type: 'string', minLength: 6, maxLength: Constraints.password },
  },
  required: ['email', 'password'],
  // additionalProperties: false,
}

export const loginUserSchemaValidator = ajv.compile(loginUserScheme)
