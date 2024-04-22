import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth';

export async function DELETE( request: Request) {
    verifyToken(request);
    const body = await request.json()
    const id = body.transactionId

    const transaction = await prisma.transaction.delete({
        where: {
          id: id,
      },
  })
  
    return Response.json(transaction);
  }