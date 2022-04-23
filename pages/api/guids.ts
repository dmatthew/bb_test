import { NextApiRequest, NextApiResponse } from 'next'
import { getAllGuids } from 'lib/guid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const guids = await getAllGuids()
  if (guids) {
    return res.status(201).json({items: guids})
  } else {
    return res
      .status(400)
      .json({ message: `Unable to load guids` })
  }
}
