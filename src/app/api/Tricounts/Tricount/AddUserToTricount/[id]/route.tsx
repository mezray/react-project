import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';


export async function POST(request: Request, { params }: { params: { id: string } }) {
  const userId = verifyToken(request);

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