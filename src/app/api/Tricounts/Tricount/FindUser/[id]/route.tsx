import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  verifyToken(request);

  const allUsers = await prisma.user.findMany({
    where: {
      tricounts: {
        some: {
          id: Number(params.id),
        },
      },
    },
  });

  return Response.json(allUsers); 
}