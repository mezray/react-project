import prisma from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';

// This should be a secure, random string
const SECRET_KEY = '1234';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    throw new Error('No token provided');
  }

  let userId;
  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Replace with your actual secret key
    userId = decoded.id;
  } catch (err) {
    throw new Error('Failed to authenticate token');
  }

  const tricountId = params.id;
  const { email } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ error: 'No user found with this email' }, { status: 400 });
  }

  await prisma.tricount.update({
    where: { id: parseInt(tricountId) },
    data: {
      users: {
        connect: { id: user.id },
      },
    },
  });

  return Response.json({ success: true });
}