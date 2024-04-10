import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'


const SECRET_KEY = '1234'


export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1]
  if (!token) {
    throw new Error('No token provided')
  }

  let userId
  try {
    const decoded = jwt.verify(token, SECRET_KEY) 
    userId = decoded.id
  } catch (err) {
    throw new Error('Failed to authenticate token')
  }

  const body = await request.json()
  const title = body.title

  const tricount = await prisma.tricount.create({
    data: {
      name: title,
      users: {
        connect: { id: userId },
      },
    },
  })

  return Response.json(tricount)
}