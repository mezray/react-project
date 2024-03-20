import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/tricount/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postId = req.query.id
  const post = await prisma.tricount.findMany({
    where: { id: Number(postId) }
  })
  return res.json(post)
}