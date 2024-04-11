import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { verifyToken } from '../../../lib/auth';

export async function POST(request: Request) {
  const userId = verifyToken(request);

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