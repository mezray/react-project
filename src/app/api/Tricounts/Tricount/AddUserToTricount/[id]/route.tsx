import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { NextResponse} from 'next/server';


export async function POST(request: Request, { params }: { params: { id: string } }) {
  const userId = verifyToken(request);

  const tricountId = params.id;
  const { email } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({
      message: "No user found with this email"
    }, {
      status: 400,
    })
  }

  const tricount =await prisma.tricount.findUnique({
    where: { id: parseInt(tricountId) },
    select: { users: { where: { id: user.id } } },
  });

  if (tricount && tricount.users.some(u => u.id === user.id)) {
    return NextResponse.json({
      message: "User is already in the tricount"
    }, {
      status: 400,
    })
  }

  await prisma.tricount.update({
    where: { id: parseInt(tricountId) },
    data: {
      users: {
        connect: { id: user.id },
      },
    },
  });

  return Response.json({ success: true, user });
}