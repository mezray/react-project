import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth';

async function getTransaction(id: number) {
  const transaction = await prisma.transaction.findMany({
  select: {
    id: true,
    title: true,
    price: true,
    payer: { 
      select: {
        name: true,
      },
    },
    debtors: {
      select: {
        name: true,
      },
    },
  },
  where: {
    tricountId: Number(id),
  },

})
return transaction;
}

export type Cost = Awaited<ReturnType<typeof getTransaction>>;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  verifyToken(request);

  const id = params.id;
  const transaction = await getTransaction(Number(id));
return Response.json(transaction); 
}