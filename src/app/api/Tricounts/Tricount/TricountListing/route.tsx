import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  const userId = verifyToken(request);

  const tricounts = await prisma.tricount.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });

  return Response.json(tricounts)
}