import T from '@libs/types/messages'
import db from '../../db'

async function createMessage(message: T.CreateMessage): Promise<T.Message> {
  const { text, sender_id } = message
  const [savedMessage]: T.Message[] = await db('messages')
    .insert({
      text,
      sender_id,
    })
    .returning(['id', 'text', 'sender_id', 'created_at'])
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
