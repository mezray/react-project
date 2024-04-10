import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";

const SECRET_KEY = "1234";

export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1]
  if (!token) {
    throw new Error('No token provided')
  }

  let userId
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    userId = decoded.id
  } catch (err) {
    throw new Error('Failed to authenticate token')
  }

  const body = await request.json();
  const { title, price, payer, tricountId, debtors } = body;

  const newCost = await prisma.cost.create({
    data: {
      title,
      price,
      payer: {
        create: payers.map(payer => ({
          name: payer.name,
        }))
      ,
      tricountId,
      debtors: {
        create: debtors.map(debtor => ({
          name: debtor.name,
        }))
      }
    },
  });

  return new Response(JSON.stringify(newCost), { status: 201 });
}