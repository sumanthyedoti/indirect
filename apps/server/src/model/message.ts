import db from '../db'

type Message = {
  text?: string | null
  user_id: number
  file?: string | null
}

async function createMessage(message: Message) {
  const { text, file, user_id } = message
  const [id] = await db('messages')
    .insert({
      text,
      file,
      user_id,
    })
    .returning('id')
  return id
}

export default {
  createMessage,
}
