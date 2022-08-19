import { Response } from 'express'

import * as T from '@api-types/spaces'
import spaceModel from './space-model'
import profileModel from '../profiles/profile-model'
import {
  TypedRequest,
  TypedRequestParams,
  TypedRequestBody,
} from '../../types.d'
import { sendInviteToSpace } from '../email'
import logger from '../../config/logger'

async function createSpace(
  req: TypedRequestBody<T.CreateSpace>,
  res: Response
) {
  const { name, tagline, description, creator_id } = req.body

  try {
    const space = await spaceModel.createSpace({
      name,
      tagline,
      description,
      creator_id,
    })
    if (!space) {
      res
        .status(500)
        .json({ error: 'Space not created. Something went wrong.' })
      return
    }
    res.status(201).json({
      data: space,
      message: 'Created the space successfully!',
    })
  } catch (err) {
    console.error(err)
    res.send('Something went wrong!')
  }
}

async function getSpace(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id
    const result: T.Space = await spaceModel.getSpace(id)
    if (!result) {
      res.status(404).json({ id, error: 'Space not found' })
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

async function getSpaceChannels(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id
    const channels = await spaceModel.getSpaceChannels(id)
    if (!channels) {
      res.status(204).json({ id, error: 'No channels found for this space' })
      return
    }
    res.status(200).json({
      data: channels,
    })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function getSpaceUsers(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id
    const users = await spaceModel.getSpaceUsers(id)

    if (!users) {
      res.status(204).json({ id, error: 'No channels users for this space' })
      return
    }
    res.status(200).json({
      data: users,
    })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function updateSpace(
  req: TypedRequest<{ id: number }, T.UpdateSpace>,
  res: Response
) {
  try {
    const id = req.params.id
    const userId = req.user?.id
    if (!userId) {
      res.sendStatus(401)
      return
    }
    const result = await spaceModel.updateSpace(id, req.body, userId)
    if (!result) {
      res.status(404).json({ id, error: 'Space not found' })
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

async function deleteSpace(
  req: TypedRequestParams<{ id: number }>,
  res: Response
) {
  try {
    const id = req.params.id

    const userId = req.user?.id
    const space = await spaceModel.getSpace(id)
    if (space.creator_id !== userId) {
      res.sendStatus(403)
      return
    }
    const result = await spaceModel.deleteSpace(id)
    if (!result) {
      res.status(404).json({ id, message: 'Space not found' })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function addUserToSpace(
  req: TypedRequestParams<{ id: number; uid: number }>,
  res: Response
) {
  try {
    const { id, uid } = req.params
    const result = await spaceModel.createProfile({
      //@ts-ignore
      user_id: parseInt(uid),
      space_id: id,
    })
    if (!result) {
      res.status(404).json({ message: 'Space/User not found' })
      return
    }
    res.status(201).json({ message: 'Added User to the Space' })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function deleteUserFromSpace(
  req: TypedRequestParams<{ id: number; uid: number }>,
  res: Response
) {
  try {
    const { id, uid } = req.params
    //@ts-ignore
    const result = await profileModel.deleteProfile(id, parseInt(uid))
    if (!result) {
      res.status(404).json({ id, message: 'Space/User not found' })
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error('::', err)
    res.status(500).send('Something went wrong!')
  }
}

async function sendInvites(
  req: TypedRequestBody<{ emails: string[]; spaceName: string }>,
  res: Response
) {
  try {
    const { emails, spaceName } = req.body
    const emailsToSend = emails.map((email) =>
      sendInviteToSpace(email, spaceName)
    )
    Promise.all(emailsToSend)
      .then((emails) => {
        res.json({
          message: 'Sent invitations successfully',
          emails,
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
  } catch (err) {
    logger.error('::', err)
    res.status(500).send(err)
  }
}

export default {
  createSpace,
  getSpace,
  getSpaceChannels,
  getSpaceUsers,
  updateSpace,
  deleteSpace,
  addUserToSpace,
  deleteUserFromSpace,
  sendInvites,
}
