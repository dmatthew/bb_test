import { NextApiRequest, NextApiResponse } from 'next'
import {
  cleanQueryInput,
  createGuid,
  deleteGuid,
  isValidGuid,
  generateGuid,
  getGuid,
  updateGuid
} from 'lib/guid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method == "POST") {
    return postHandler(req, res)
  } else if (req.method == "PUT") {
    return putHandler(req, res)
  } if (req.method == "DELETE") {
    return deleteHandler(req, res)
  } else {
    return getHandler(req, res)
  }
}

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let guid: string = cleanQueryInput(req.query.guid)
  const user: string = req.body.user
  if (!user) {
    return res
        .status(500)
        .json({ message: 'Error: missing user field' })
  } else {
    if (!guid) {
      guid = generateGuid()
    } else if (!isValidGuid(guid)) {
      return res
        .status(400)
        .json({ message: 'Error: invalid GUID' })
    }
    const entity = await createGuid(guid, user)

    if (entity) {
      const response = {
        guid: entity.guid,
        user: entity.user,
      }
      return res.status(201).json(response)
    } else {
      return res
        .status(500)
        .json({ message: `Could not create new GUID` })
    }
  }
}

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const guid: string = cleanQueryInput(req.query.guid)
  if (!guid) {
    return res
        .status(400)
        .json({ message: 'Error: Missing guid.' })
  } else {
    const entity = await getGuid(guid)

    if (entity) {
      const response = {
        guid: entity.guid,
        name: entity.user,
      }
      return res.status(201).json(response)
    } else {
      return res
        .status(400)
        .json({ message: `Entity not found with guid: ${guid}` })
    }
  }
}

async function putHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const guid: string = cleanQueryInput(req.query.guid)
  const user: string = req.body.user
  if (!guid) {
    return res
        .status(400)
        .json({ message: 'Error: Missing guid' })
  } else {
    const entity = await updateGuid(guid, user)

    if (entity) {
      const response = {
        guid: entity.guid,
        user: entity.user,
      }
      return res.status(201).json(response)
    } else {
      return res
        .status(400)
        .json({ message: `Entity not found with guid: ${guid}` })
    }
  }
}

async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const guid: string = cleanQueryInput(req.query.guid)
  if (!guid) {
    return res
        .status(400)
        .json({ message: 'Error: missing guid' })
  } else {
    const success = await deleteGuid(guid)
    return res.status(201).json({})
  }
}
