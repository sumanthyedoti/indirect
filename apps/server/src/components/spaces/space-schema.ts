import { JSONSchemaType } from 'ajv'

import ajv from '../../config/ajv'
import { CreateSpace, Constraints } from '@api-types/spaces'

const createSpaceScheme: JSONSchemaType<CreateSpace> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, maxLength: Constraints.name },
    tagline: {
      type: 'string',
      minLength: 1,
      maxLength: Constraints.tagline,
      nullable: true,
    },
    description: {
      type: 'string',
      nullable: true,
      minLength: 1,
      maxLength: Constraints.description,
    },
  },
  required: ['name'],
  // additionalProperties: false,
}

export const createSpaceSchemaValidator = ajv.compile(createSpaceScheme)
