import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  const userId = verifyToken(request);

  const body = await request.json()
  const title = body.title

  const tricount = await prisma.tricount.create({
    data: {
      name: title,
      users: {
        connect: { id: userId },
      },
    },
  })

  return Response.json(tricount)
}