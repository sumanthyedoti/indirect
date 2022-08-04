import * as T from '@api-types/channels'
import { Message as MessageT } from '@api-types/messages'
import db from '../../db'

async function createChannel(channel: T.CreateChannel) {
  const [createdChannel]: T.Channel[] = await db('channels')
    .insert(channel)
    .returning('*')
  await createChannelMembers(createdChannel.id, {
    user_ids: [channel.creator_id],
  })
  return createdChannel
}

async function createGeneralChannel(channel: {
  space_id: number
  name: string
  creator_id: number
}) {
  const [createdChannel]: T.Channel[] = await db('channels')
    .insert(channel)
    .returning('*')
  return createdChannel
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
  { user_ids }: T.CreateChannelMembers
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
  const users: { user_id: number }[] = await db('channel_users')
    .select('user_id')
    .where({ channel_id })
  return users.map((u) => u.user_id)
}

async function deleteChannelMember(channel_id: number, user_id: number) {
  const channelId: number = await db('channel_users')
    .where({
      channel_id,
      user_id,
    })
    .del()
  return channelId
}

export default {
  createChannel,
  createGeneralChannel,
  getChannel,
  getChannelMessages,
  updateChannel,
  deleteChannel,
  createChannelMembers,
  getChannelMembers,
  deleteChannelMember,
}
