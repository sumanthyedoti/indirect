import { JSONSchemaType } from 'ajv'

import ajv from '../../config/ajv'
import {
  CreateChannel,
  UpdateChannel,
  CreateChannelMembers,
  CreateChannelMessage,
  Constraints,
} from '@api-types/channels'
import { Constraints as MessageConstraints } from '@api-types/messages'

const createChannelScheme: JSONSchemaType<CreateChannel> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: Constraints.name,
      transform: ['trim', 'toLowerCase'],
    },
    space_id: { type: 'number' },
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

const updateChannelScheme: JSONSchemaType<UpdateChannel> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: Constraints.name,
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

const createChannelMembersScheme: JSONSchemaType<CreateChannelMembers> = {
  type: 'object',
  properties: {
    space_id: {
      type: 'number',
    },
    user_ids: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
  required: ['user_ids', 'space_id'],
  // additionalProperties: false,
}

const createChannelMessageScheme: JSONSchemaType<CreateChannelMessage> = {
  type: 'object',
  properties: {
    html: {
      type: 'string',
      minLength: 1,
      maxLength: MessageConstraints.html,
      transform: ['trim'],
    },
  },
  required: ['html'],
  // additionalProperties: false,
}

export const createChannelSchemaValidator = ajv.compile(createChannelScheme)
export const updateChannelSchemaValidator = ajv.compile(updateChannelScheme)
export const createChannelMembersSchemaValidator = ajv.compile(
  createChannelMembersScheme
)
export const createChannelMessageSchemaValidator = ajv.compile(
  createChannelMessageScheme
)
