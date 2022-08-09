import { Knex } from 'knex'

import * as T from '@api-types/channels'
import {
  Message as MessageT,
  CreateMessage as CreateMessageT,
} from '@api-types/messages'
import messageModel from '../message/message-model'
import db from '../../db'

async function createChannel(
  channel: T.CreateChannel,
  queryTrx: Knex.Transaction | Knex = db
) {
  const [createdChannel]: T.Channel[] = await queryTrx('channels')
    .insert(channel)
    .returning('*')
  await createChannelMembers(
    createdChannel.id,
    channel.space_id,
    [channel.creator_id],
    queryTrx
  )
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

async function updateChannel(
  id: number,
  channel: T.UpdateChannel,
  creator_id: number
) {
  const recordId: number = await db('channels')
    .where({
      id,
      creator_id,
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
  space_id: number,
  user_ids: number[],
  queryTrx: Knex.Transaction | Knex = db
) {
  const res = await queryTrx('profiles')
    .select('user_id', 'space_id')
    .where({
      space_id,
    })
    .whereIn('user_id', user_ids)
  if (res.length !== user_ids.length) {
    return null
  }
  const users: number[] = await queryTrx('channel_users').insert(
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

async function createChannelMessage(message: CreateMessageT) {
  const [channelMember] = await db('channel_users')
    .select('user_id', 'channel_id')
    .where({
      user_id: message.sender_id,
      channel_id: message.channel_id,
    })
  if (!channelMember) {
    return null
  }
  const result = await messageModel.createMessage(message)
  return result
}

export default {
  createChannel,
  getChannel,
  getChannelMessages,
  updateChannel,
  deleteChannel,
  createChannelMembers,
  getChannelMembers,
  deleteChannelMember,
  createChannelMessage,
}
