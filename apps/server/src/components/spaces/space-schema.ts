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
    name: { type: 'string', minLength: 1, maxLength: Constraints.name },
    tagline: {
      type: 'string',
      nullable: true,
      maxLength: Constraints.tagline,
    },
    description: {
      type: 'string',
      nullable: true,
      maxLength: Constraints.description,
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

const invitesToSpaceScheme: JSONSchemaType<Invites> = {
  type: 'object',
  properties: {
    emails: {
      type: 'array',
      minItems: 1,
      maxItems: 100,
      items: {
        type: 'string',
      },
    },
    spaceName: {
      type: 'string',
    },
  },
  required: ['emails', 'spaceName'],
  // additionalProperties: false,
}

export const createSpaceSchemaValidator = ajv.compile(createSpaceScheme)
export const updateSpaceSchemaValidator = ajv.compile(updateSpaceScheme)
export const invitesToSpaceSchemeValidator = ajv.compile(invitesToSpaceScheme)
