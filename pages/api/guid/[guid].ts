import { NextApiRequest, NextApiResponse } from 'next'
import { createGuid, deleteGuid, getGuid, updateGuid } from 'lib/guid'

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
  const guid: string = cleanQueryInput(req.query.guid)
  const user: string = req.body.user
  if (!user) {
    res.json({
      guid: null,
      user: '',
    })
  } else {
    const entity = await createGuid(guid, user)

    if (entity) {
      const response = {
        guid: entity.guid,
        user: entity.user,
      }
      return res.status(201).json(response)
    } else {
      return res
        .status(400)
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
    res.json({
      guid: null,
      user: '',
    })
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
        .json({ message: `Entity not found with guid: ${req.body.id}` })
    }
  }
}

async function putHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const guid: string = cleanQueryInput(req.query.guid)
  const user: string = req.body.guid
  if (!guid) {
    res.json({
      guid: null,
      user: '',
    })
  } else {
    const entity = await updateGuid(guid, user)
    const response = {
      guid: entity.guid,
      name: entity.user,
    }

    if (entity) {
      return res.status(201).json(response)
    } else {
      return res
        .status(400)
        .json({ message: `Entity not found with guid: ${req.body.id}` })
    }
  }
}

async function deleteHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const guid: string = cleanQueryInput(req.query.guid)
  if (!guid) {
    res.json({
      guid: null,
      user: '',
    })
  } else {
    const success = await deleteGuid(guid)
    return res.status(201).json({})
  }
}

function cleanQueryInput(input: string | string[]): string {
  if (Array.isArray(input)) {
    input = input.length > 0 ? input[0] : ''
  }
  return input
}
