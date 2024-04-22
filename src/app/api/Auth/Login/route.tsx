import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET_KEY = process.env.SECRET_KEY

export async function POST(request: Request) {
  const body = await request.json();
  const identifier = body.identifier; // This can be either name or email
  const password = body.password;
  
  if (!identifier || !password) {
    return Response.error(400, 'Identifier or password is missing');
  }

  // Check for an existing user by both name and email
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { name: identifier },
        { email: identifier },
      ],
    },
  });

  if (!existingUser) {
    return Response.error(401, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return Response.error(401, 'Invalid password');
  }

  // If the identifier and password match, generate a JWT
  const token = jwt.sign({ id: existingUser.id }, SECRET_KEY, { expiresIn: '1h' });

  // Return the JWT
  return Response.json({ token });
}