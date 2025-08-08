import authOptions from "@/app/auth/authOptions";
import { paymentSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  const payments = await prisma.payment.findMany();

  return NextResponse.json(payments);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = paymentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const client = await prisma.client.findUnique({
    where: { id: body.clientId },
  });
  if (!client) {
    return NextResponse.json({ error: `Client not found.` }, { status: 404 });
  }

  const payment = await prisma.payment.create({
    data: {
      clientId: body.clientId,
      amount: body.amount,
      month: body.month,
      method: body.method,
      paidAt: new Date(body.paidAt),
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
