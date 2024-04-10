import prisma from '../../../../lib/prisma'
import jwt from 'jsonwebtoken'

// This should be a secure, random string
const SECRET_KEY = '1234'

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
  const id = params.id;
  
  const cost = await prisma.cost.findMany({
  select: {
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
});
return Response.json(cost); 
}