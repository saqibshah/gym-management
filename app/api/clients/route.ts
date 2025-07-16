import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET() {
  const clients = await prisma.client.findMany();

  return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = clientSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const newClient = await prisma.client.create({
    data: {
      name: body.name,
      contact: body.contact,
      gender: body.gender,
      category: body.category,
      fee: body.fee,
      shift: body.shift,
      assignedTrainerId: body.assignedTrainerId,
      groupClassId: body.groupClassId,
    },
  });

  return NextResponse.json(newClient, { status: 201 });
}
