import * as T from '@api-types/channels'
import { Message as MessageT } from '@api-types/messages'
import db from '../../db'

async function CreateChannel(channel: T.CreateChannel): Promise<T.Channel> {
  const { space_id, name, description } = channel
  const [channelCreated]: T.Channel[] = await db('channels')
    .insert({
      name,
      space_id,
      description,
    })
    .returning('id')
  return channelCreated
}

async function getChannel(id: number): Promise<T.Channel> {
  const [channel]: T.Channel[] = await db('channels').select().where({ id })
  return channel
}

async function getChannelMessages(id: number): Promise<MessageT[]> {
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

async function UpdateChannel(
  id: number,
  channel: T.UpdateChannel
): Promise<number> {
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

async function deleteChannel(id: number): Promise<number> {
  const channel = await db('channels')
    .where({
      id,
    })
    .del()
  return channel
}

export default {
  CreateChannel,
  getChannel,
  getChannelMessages,
  UpdateChannel,
  deleteChannel,
}
