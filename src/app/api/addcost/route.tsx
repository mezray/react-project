import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'

// This should be a secure, random
const SECRET_KEY = '1234'

export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1]
  if (!token) {
    throw new Error('No token provided')
  }

  let userId
  try {
    const decoded = jwt.verify(token, SECRET_KEY) // Replace with your actual secret key
    userId = decoded.id
  } catch (err) {
    throw new Error('Failed to authenticate token')
  }

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