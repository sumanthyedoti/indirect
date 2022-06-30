import db from '../../db'

type Message = {
  text?: string | null
  user_id: number
  file?: string | null
}

async function createMessage(message: Message) {
  const { text, file, user_id } = message
  return await db('users')
    .insert({
      text,
      file,
      user_id,
    })
    .returning('id')
}

export default {
  createMessage,
}
