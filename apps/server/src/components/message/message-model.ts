import * as T from '@api-types/messages'
import db from '../../db'

async function createMessage(message: T.CreateMessage): Promise<T.Message> {
  const { text, sender_id, channel_id } = message
  const [savedMessage]: T.Message[] = await db('messages')
    .insert({
      text,
      sender_id,
      channel_id,
    })
    .returning(['id', 'text', 'sender_id', 'channel_id', 'created_at'])
  return savedMessage
}

async function getMessages() {
  const messages: T.Message[] = await db('messages').select(
    'id',
    'text',
    'sender_id',
    'channel_id',
    'created_at'
  )
  return messages
}

async function deleteMessage(message_id: number, sender_id: number) {
  const result = await db('messages').where({ id: message_id, sender_id }).del()
  return result
}

export default {
  createMessage,
  getMessages,
  deleteMessage,
}
