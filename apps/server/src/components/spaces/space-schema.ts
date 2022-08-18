import { JSONSchemaType } from 'ajv'

import ajv from '../../config/ajv'
import {
  CreateSpace,
  UpdateSpace,
  Invites,
  Constraints,
} from '@api-types/spaces'

const createSpaceScheme: JSONSchemaType<CreateSpace> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: Constraints.name,
      transform: ['trim'],
    },
    tagline: {
      type: 'string',
      nullable: true,
      maxLength: Constraints.tagline,
      transform: ['trim'],
    },
    description: {
      type: 'string',
      nullable: true,
      maxLength: Constraints.description,
      transform: ['trim'],
    },
    creator_id: { type: 'number' },
    is_private: { type: 'boolean', nullable: true },
  },
  required: ['name', 'creator_id'],
  // additionalProperties: false,
}

const updateSpaceScheme: JSONSchemaType<UpdateSpace> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: Constraints.name,
      transform: ['trim'],
    },
    tagline: {
      type: 'string',
      minLength: 1,
      maxLength: Constraints.tagline,
      nullable: true,
      transform: ['trim'],
    },
    description: {
      type: 'string',
      nullable: true,
      minLength: 1,
      maxLength: Constraints.description,
      transform: ['trim'],
    },
  },
  required: ['name'],
  // additionalProperties: false,
}

const invitesToSpaceScheme: JSONSchemaType<Invites> = {
  type: 'object',
  properties: {
    emails: {
      type: 'array',
      minItems: 1,
      maxItems: 100,
      items: {
        type: 'string',
        transform: ['trim'],
      },
    },
    spaceName: {
      type: 'string',
      transform: ['trim'],
    },
  },
  required: ['emails', 'spaceName'],
  // additionalProperties: false,
}

export const createSpaceSchemaValidator = ajv.compile(createSpaceScheme)
export const updateSpaceSchemaValidator = ajv.compile(updateSpaceScheme)
export const invitesToSpaceSchemeValidator = ajv.compile(invitesToSpaceScheme)
