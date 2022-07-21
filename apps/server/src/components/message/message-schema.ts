import { JSONSchemaType } from 'ajv'

import ajv from '../../config/ajv'
import { CreateMessage, Constraints } from '@api-types/messages'

const createMessageScheme: JSONSchemaType<CreateMessage> = {
  type: 'object',
  properties: {
    text: { type: 'string', minLength: 1, maxLength: Constraints.text },
    sender_id: { type: 'number' },
    channel_id: { type: 'number' },
    personal_channel_id: { type: 'number' },
  },
  required: ['text', 'sender_id'],
  oneOf: [
    {
      required: ['channel_id'],
    },
    {
      required: ['personal_channel_id'],
    },
  ],
  // additionalProperties: false,
}

export const createMessageSchemaValidator = ajv.compile(createMessageScheme)
