import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

import { z } from "zod";

export async function GET() {
  const clients = await prisma.client.findMany();

  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const client = await prisma.client.findUnique({
    where: { membershipNumber: body.membershipNumber },
  });
  if (client)
    return NextResponse.json(
      { error: "Client already exists" },
      { status: 400 }
    );

  const newClient = await prisma.client.create({
    data: {
      name: body.name,
      membershipNumber: body.membershipNumber,
      contact: body.contact,
      gender: body.gender,
      category: body.category,
      fee: body.fee,
      shift: body.shift,
    },
  });

  return NextResponse.json(newClient, { status: 201 });
}
