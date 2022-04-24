import { NextApiRequest, NextApiResponse } from 'next'
import { cleanQueryInput, createGuid, generateGuid } from 'lib/guid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method == "POST") {
    return postHandler(req, res)
  }
}

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const user: string = req.body.user
  if (!user) {
    return res
        .status(400)
        .json({ message: 'Error: Missing user field' })
  } else {
    let guid = generateGuid()
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
        .json({ message: 'Could not create new GUID' })
    }
  }
}
