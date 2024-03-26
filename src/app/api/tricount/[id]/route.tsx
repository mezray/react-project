import prisma from '../../../../lib/prisma'

export async function GET(request: Request, {params}: {params: {id: string}}) { 
  console.log("params",params)
  const id = params.id;
  const tricount = await prisma.cost.findMany({
    where: { tricountId: Number(id) },
    include: { 
      payer: true,
      debtors: true,
    },
  });
  console.log("tricount",tricount);
  return Response.json(tricount); 
}