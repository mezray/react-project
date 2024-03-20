import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/tricount/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postId = req.query.id
  const tricount = await prisma.cost.findMany({
    where: { tricountId: Number(postId) }
  })
  return res.status(200).json(tricount)
}