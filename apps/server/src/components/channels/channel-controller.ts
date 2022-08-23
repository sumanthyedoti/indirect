import { Response } from 'express'
import { Socket, Server } from 'socket.io'

import * as T from '@api-types/channels'
import { SocketMessage as SocketMessageT } from '@api-types/messages'
import channelModel from './channel-model'
import spaceModel from '../spaces/space-model'
import {
  TypedRequest,
  TypedRequestParams,
  TypedRequestBody,
} from '../../types.d'
import logger from '../../config/logger'

async function createChannel(
  req: TypedRequestBody<T.CreateChannel>,
  res: Response
) {
  try {
    const channel = await channelModel.createChannel(req.body)
    res.status(201).json({
      data: channel,
      message: 'Created the channel successfully!',
    })
  } catch (err) {
    logger.error('::', err)
    res.send('Something went wrong!')
  }
}

async function getChannel(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id
    const result = await channelModel.getChannel(id)
    if (!result) {
      res.status(404).json({ id, error: 'Channel not found' })
      return
    }
    res.status(200).json({
      data: result,
    })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function getChannelMessages(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id
    const messages = await channelModel.getChannelMessages(id)
    if (!messages) {
      res.status(204).json({ id, error: 'No channels found for this space' })
      return
    }
    res.status(200).json({
      data: messages,
    })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function updateChannel(
  req: TypedRequest<{ id: number }, T.UpdateChannel>,
  res: Response
) {
  try {
    const id = req.params.id
    const userId = req.user?.id
    if (!userId) {
      res.sendStatus(401)
      return
    }
    const result = await channelModel.updateChannel(id, req.body, userId)
    if (!result) {
      res.status(404).json({ id, error: 'Channel not found' })
      return
    }
    res.status(200).json({
      data: {
        id,
        ...req.body,
        message: 'Updated Successfully',
      },
      message: 'Updated the space successfully!',
    })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function deleteChannel(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id

    const userId = req.user?.id

    const channel = await channelModel.getChannel(id)
    if (channel.creator_id !== userId) {
      res.sendStatus(403)
      return
    }

    const space = await spaceModel.getSpace(channel.space_id)

    if (space.general_channel_id === channel.id) {
      res.status(406).send('Can not delete general channel of a space')
      return
    }
    const result = await channelModel.deleteChannel(id)
    if (!result) {
      res.status(404).json({ id, message: 'Channel not found' })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function createChannelMembers(
  req: TypedRequest<{ id: number }, T.CreateChannelMembers>,
  res: Response
) {
  try {
    const { id } = req.params
    const result = await channelModel.createChannelMembers(
      id,
      req.body.space_id,
      req.body.user_ids
    )
    if (!result) {
      res.status(404).json({
        message:
          'Channel/Users not found or User(s) are not member of the Space',
      })
      return
    }
    res.status(201).json({
      message: 'Added the members to the channel successfully!',
    })
  } catch (err) {
    logger.error('::', err)
    res
      .status(500)
      .send(
        'Something went wrong! User(s) might already be member of the channel or channel/users might not exist'
      )
  }
}

async function getChannelMembers(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id
    const result = await channelModel.getChannelMembers(id)
    if (!result) {
      res.status(404).json({ id, error: 'Channel not found' })
      return
    }
    res.status(200).json({
      data: result,
    })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function deleteChannelMember(
  req: TypedRequestParams<{ id: number; uid: number }>,
  res: Response
) {
  try {
    const { id, uid } = req.params

    const result = await channelModel.deleteChannelMember(id, uid)
    if (!result) {
      res.status(404).json({ id, message: 'Channel/User not found' })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function createChannelMessage(
  req: TypedRequest<{ id: number }, T.CreateChannelMessage>,
  res: Response
) {
  try {
    const { id } = req.params
    const { html } = req.body
    const userId = req.user?.id
    if (!userId) {
      res.sendStatus(401)
      return
    }
    const result = await channelModel.createChannelMessage({
      html,
      sender_id: userId,
      channel_id: id,
      personal_channel_id: null,
    })
    if (!result) {
      res.status(404).json({
        message: 'Failed. User is not the memeber of the channel',
      })
      return
    }
    res.status(201).json({
      message: 'Added the members to the channel successfully!',
    })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function createChannelMessageOnSocket(
  socket: Socket,
  io: Server,
  message: SocketMessageT
) {
  try {
    //@ts-ignore
    const userId = socket.request.user.id
    if (!userId) {
      io.to(`channel-${message.channelId}`).emit('message-failed', {
        tempId: message.tempId,
        channelId: message.channelId,
      })
      return
    }
    const result = await channelModel.createChannelMessage({
      html: message.html,
      sender_id: userId,
      channel_id: message.channelId,
      personal_channel_id: null,
    })
    if (!result) {
      io.to(`channel-${message.channelId}`).emit('message-failed', {
        tempId: message.tempId,
        channelId: message.channelId,
      })
      return
    }
    io.to(`channel-${message.channelId}`).emit('message-success', {
      tempId: message.tempId,
      message: result,
    })
  } catch (err) {
    logger.error('::', err)
    io.to(`channel-${message.channelId}`).emit('message-failed', {
      tempId: message.tempId,
      channelId: message.channelId,
    })
  }
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
  createChannelMessageOnSocket,
}
