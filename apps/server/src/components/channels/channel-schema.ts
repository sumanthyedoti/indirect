import { JSONSchemaType } from 'ajv'

import ajv from '../../config/ajv'
import {
  CreateChannel,
  UpdateChannel,
  ChannelMembers,
  Constraints,
} from '@api-types/channels'

const createChannelScheme: JSONSchemaType<CreateChannel> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, maxLength: Constraints.name },
    space_id: { type: 'number' },
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

const updateChannelScheme: JSONSchemaType<UpdateChannel> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, maxLength: Constraints.name },
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

const createChannelMembersScheme: JSONSchemaType<ChannelMembers> = {
  type: 'object',
  properties: {
    user_ids: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
  required: ['user_ids'],
  // additionalProperties: false,
}

export const createChannelSchemaValidator = ajv.compile(createChannelScheme)
export const updateChannelSchemaValidator = ajv.compile(updateChannelScheme)
export const createChannelMembersSchemaValidator = ajv.compile(
  createChannelMembersScheme
)
