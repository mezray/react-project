import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth';

async function getCost(id: number) {
  const cost = await prisma.cost.findMany({
  select: {
    id: true,
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

})
return cost;
}

export type Cost = Awaited<ReturnType<typeof getCost>>;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  verifyToken(request);

  const id = params.id;
  const cost = await getCost(Number(id));
return Response.json(cost); 
}