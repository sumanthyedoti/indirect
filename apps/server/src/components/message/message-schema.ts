import { JSONSchemaType } from 'ajv'

import ajv from '../../config/ajv'
import { CreateMessage } from '@libs/types/messages'

export const DATA_LENGTH = Object.freeze({
  text: 3000,
})

const createMessageScheme: JSONSchemaType<CreateMessage> = {
  type: 'object',
  properties: {
    text: { type: 'string', minLength: 1, maxLength: DATA_LENGTH.text },
    sender_id: { type: 'number' },
  },
  required: ['text', 'sender_id'],
  // additionalProperties: false,
}

export const createMessageSchemaValidator = ajv.compile(createMessageScheme)
