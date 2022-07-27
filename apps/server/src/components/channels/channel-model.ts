import * as T from '@api-types/channels'
import { Message as MessageT } from '@api-types/messages'
import db from '../../db'

async function CreateChannel(channel: T.CreateChannel) {
  const channelCreated: number = await db('channels')
    .insert(channel)
    .returning('id')
  return channelCreated
}

async function getChannel(id: number) {
  const [channel]: T.Channel[] = await db('channels').select().where({ id })
  return channel
}

async function getChannelMessages(id: number) {
  const result: MessageT[] = await db
    .select(
      'id',
      'text',
      'sender_id',
      'channel_id',
      // 'conversation_id',
      'created_at',
      'is_edited',
      'is_files_attached'
    )
    .from('messages')
    .where({ channel_id: id })
  return result
}

async function updateChannel(id: number, channel: T.UpdateChannel) {
  const recordId: number = await db('channels')
    .where({
      id: id,
    })
    .update({
      name: channel.name,
      description: channel.description,
    })

  return recordId
}

async function deleteChannel(id: number) {
  const channelId: number = await db('channels')
    .where({
      id,
    })
    .del()
  return channelId
}

async function createChannelMembers(
  channel_id: number,
  { user_ids }: T.ChannelMembers
) {
  const users: number[] = await db('channel_users').insert(
    user_ids.map((userId) => ({
      user_id: userId,
      channel_id,
    }))
  )
  return users
}

async function getChannelMembers(
  channel_id: number
): Promise<T.ChannelMembers> {
  const users = await db('channel_users')
    .select('user_id')
    .where({ channel_id })
  return { user_ids: users.map((u) => u.user_id) }
}

export default {
  CreateChannel,
  getChannel,
  getChannelMessages,
  updateChannel,
  deleteChannel,
  createChannelMembers,
  getChannelMembers,
}
