import prisma from '../../../../lib/prisma'

export async function POST(request: Request, {params} : {params: {title: string}}) {
  const title =  params.title;
  const tricount = await prisma.tricount.create({
    data: {
      name: title,
    },
  });
  return Response.json(tricount);
}
