import { Response } from 'express'

import * as T from '@api-types/channels'
import channelModel from './channel-model'
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
    const spaceId = await channelModel.CreateChannel(req.body)
    res.status(201).json({
      data: {
        id: spaceId,
      },
      message: 'Created the channel successfully!',
    })
  } catch (err) {
    console.error(err)
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
    logger.error(err)
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
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function UpdateChannel(
  req: TypedRequest<{ id: number }, T.UpdateChannel>,
  res: Response
) {
  try {
    const id = req.params.id

    const result = await channelModel.updateChannel(id, req.body)
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
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function deleteChannel(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id

    const result = await channelModel.deleteChannel(id)
    if (!result) {
      res.status(404).json({ id, message: 'Channel not found' })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

async function createChannelMembers(
  req: TypedRequest<{ id: number }, T.ChannelMembers>,
  res: Response
) {
  try {
    const { id } = req.params
    const result = await channelModel.createChannelMembers(id, req.body)
    if (!result) {
      res.status(404).json({ message: 'Channel/Users not found' })
      return
    }
    res.status(201).json({
      message: 'Added the members to the channel successfully!',
    })
  } catch (err) {
    logger.error(err)
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
    logger.error(err)
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
      res.status(404).json({ id, message: 'Channel not found' })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error(err)
    res.status(500).send('Something went wrong!')
  }
}

export default {
  createChannel,
  getChannel,
  getChannelMessages,
  UpdateChannel,
  deleteChannel,
  createChannelMembers,
  getChannelMembers,
  deleteChannelMember,
}
