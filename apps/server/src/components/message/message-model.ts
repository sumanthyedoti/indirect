import db from '../../db'
import T from './message-types.d'

async function createMessage(message: T.CreateMessage): Promise<T.Message> {
  const { text, sender_id } = message
  const [savedMessage]: T.Message[] = await db('messages')
    .insert({
      text,
      sender_id,
    })
    .returning(['id', 'text', 'sender_id'])
  return savedMessage
}

async function getMessages(): Promise<T.Message[]> {
  const messages: T.Message[] = await db('messages').select(
    'id',
    'text',
    'sender_id',
    'created_at'
  )
  return messages
}

export default {
  createMessage,
  getMessages,
}
