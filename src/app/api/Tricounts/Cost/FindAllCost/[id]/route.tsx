import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth';


export async function GET(request: Request, { params }: { params: { id: string } }) {
  verifyToken(request);

  const id = params.id;
  const cost = await prisma.cost.findMany({
  select: {
    title: true,
    price: true,
    payer: { 
      select: {
        name: true,
      },
    },
    debtors: {
      select: {
        name: true,
      },
    },
  },
  where: {
    tricountId: Number(id),
  },
});
return Response.json(cost); 
}