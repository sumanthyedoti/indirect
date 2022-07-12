import db from '../../db'
import T from './message-types.d'

async function createMessage(message: T.CreateMessage): Promise<number> {
  const { text, sender_id } = message
  const [savedMessage]: T.GetMessage[] = await db('messages')
    .insert({
      text,
      sender_id,
    })
    .returning('id')
  return savedMessage.id
}

async function getMessages(): Promise<T.GetMessages[]> {
  const messages: T.GetMessages[] = await db('messages').select(
    'id',
    'text',
    'sender_id'
  )
  return messages
}

export default {
  createMessage,
  getMessages,
}
