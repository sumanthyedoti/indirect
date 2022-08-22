import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('messages').truncate()

  const userIds = [1, 2]

  return

  // Inserts seed entries
  const query = knex('messages').insert(
    Array.from(Array(1000)).map((_, i) => {
      return {
        text: 'message ' + i,
        sender_id: userIds[Math.floor(Math.random() * userIds.length)],
        channel_id: 1,
      }
    })
  )
  await query
}
