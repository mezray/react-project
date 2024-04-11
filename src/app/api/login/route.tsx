import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET_KEY = process.env.SECRET_KEY

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;
  const password = body.password;
  
  if (!email || !password) {
    return Response.error(400, 'Email or password is missing');
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return Response.error(401, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return Response.error(401, 'Invalid password');
  }

  // If the email and password match, generate a JWT
  const token = jwt.sign({ id: existingUser.id }, SECRET_KEY, { expiresIn: '1h' });

  // Return the JWT
  return Response.json({ token });
}