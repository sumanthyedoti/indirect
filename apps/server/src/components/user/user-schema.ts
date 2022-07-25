import { JSONSchemaType } from 'ajv'

import ajv from '../../config/ajv'
import { RegisterUser, LoginUser, Constraints } from '@api-types/users'

const registerUserScheme: JSONSchemaType<RegisterUser> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: Constraints.emailMin,
      maxLength: Constraints.emailMax,
    },
    password: {
      type: 'string',
      minLength: Constraints.passwordMin,
      maxLength: Constraints.passwordMax,
    },
    fullname: { type: 'string', minLength: 2, maxLength: Constraints.fullname },
    google_id: {
      type: 'string',
      nullable: true,
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
    email: {
      type: 'string',
      minLength: Constraints.emailMin,
      maxLength: Constraints.emailMax,
    },
    password: {
      type: 'string',
      minLength: Constraints.passwordMin,
      maxLength: Constraints.passwordMax,
    },
  },
  required: ['email', 'password'],
  // additionalProperties: false,
}

export const loginUserSchemaValidator = ajv.compile(loginUserScheme)
