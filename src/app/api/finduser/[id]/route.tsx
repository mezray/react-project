import prisma from '../../../../lib/prisma'
import jwt from 'jsonwebtoken'

// This should be a secure, random string
const SECRET_KEY = '1234'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const token = request.headers.get('authorization')?.split(' ')[1]
  if (!token) {
    throw new Error('No token provided')
  }

  try {
    jwt.verify(token, SECRET_KEY) // Replace with your actual secret key
  } catch (err) {
    throw new Error('Failed to authenticate token')
  }

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