import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  const userId = verifyToken(request);
  
  const { title, price, payers, debtors, tricountId } = await request.json();
  
  const newCost = await prisma.transaction.create({
    data: {
      title,
      price,
      payer: {
        connect: {
          id: parseInt(payers[0].id),
        },
      },
      debtors: {
        connect: debtors.map((debtor: { id: string }) => ({ id: parseInt(debtor.id) })),
      },
      tricount: {
        connect: {
          id: parseInt(tricountId),
        },
      },
    },
  });

  return Response.json(newCost);
}