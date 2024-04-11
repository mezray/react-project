import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../../../lib/auth';

const SECRET_KEY = process.env.SECRET_KEY

export async function POST(request: Request) {
  const userId = verifyToken(request);
  
  const { title, price, payers, debtors, tricountId } = await request.json();
  
  const newCost = await prisma.cost.create({
    data: {
      title,
      price,
      payer: {
        connect: {
          id: parseInt(payers[0].id),
        },
      },
      debtors: {
        connect: debtors.map(debtor => ({ id: parseInt(debtor.id) })),
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