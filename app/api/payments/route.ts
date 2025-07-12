import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import z from "zod";

export async function GET() {
  const payments = await prisma.payment.findMany();

  return NextResponse.json(payments);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

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
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
