import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;
  const password = body.password;
  const name = body.name;
  
  if (!email || !password) {
    return Response.error(400, 'Email or password is missing');
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return Response.error(400, 'User already exists');
  }

  // Hash the password before storing it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  // If the user is created successfully, generate a JWT
  const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });

  // Return the JWT
  return Response.json({ token });
}