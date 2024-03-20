import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    console.log(req.body);
  const { title } = req.body
  const result = await prisma.tricount.create({
    data: {
      name: title
    },
  })
  return res.status(201).json(result)
}