import prisma from '../../../lib/prisma'

export async function GET() { 
  
  const tricount = await prisma.tricount.findMany({
  });
  return Response.json(tricount); 
}