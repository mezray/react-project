import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'

// This should be a secure, random
const SECRET_KEY = '1234'

export async function GET(request: Request) {
  // Get the token from the Authorization header
  const token = request.headers.get('Authorization')?.split(' ')[1]
  if (!token) {
    return Response.json({ error: 'No token provided' })
  }

  let userId

  try {
    // Verify the token and extract the user's ID
    const decoded = jwt.verify(token, SECRET_KEY)
    userId = decoded.id
  } catch (err) {
    return Response.json({ error: 'Invalid token' })
  }

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