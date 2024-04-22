import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const identifier = body.identifier; // This can be either name or email
  const password = body.password;
  console.log(body.identifier, body.password)
  
  if (!identifier || !password) {
    return NextResponse.json({
      message: "Missing something I would say"
    }, {
      status: 400,
    })
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
    return NextResponse.json({
      message: "Nope! No user found with that identifier. Try again!"
    }, {
      status: 401,
    })
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return NextResponse.json({
      message: "Invalid password Try another brute force attack!"
    }, {
      status: 401,
    })
  }

  // If the identifier and password match, generate a JWT
  const token = jwt.sign({ id: existingUser.id }, SECRET_KEY, { expiresIn: '1h' });

  // Return the JWT
  return NextResponse.json({ token });
}