import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;
  const password = body.password;
  const name = body.name;
  
  if (!email || !password || !name) {
    return NextResponse.json({
      message: "Missing something I would say"
    }, {
      status: 400,
    })
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return NextResponse.json({
      message: "Too late, Username already taken"
    }, {
      status: 400,
    })
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
  if (!SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined');
  }
  // If the user is created successfully, generate a JWT
  const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });

  // Return the JWT
  return NextResponse.json({ token });
}