import authOptions from "@/app/auth/authOptions";
import { clientSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = await prisma.client.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!client)
    return NextResponse.json({ error: "Client not found" }, { status: 404 });

  return NextResponse.json(client);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = clientSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const client = await prisma.client.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!client)
    return NextResponse.json({ error: "Invalid client" }, { status: 404 });

  const updatedClient = await prisma.client.update({
    where: { id: client.id },
    data: {
      name: body.name,
      contact: body.contact,
      gender: body.gender,
      category: body.category,
      fee: body.fee,
      shift: body.shift,
      assignedTrainerId: body.assignedTrainerId,
      groupClassId: body.groupClassId,
      joinedAt: new Date(body.joinedAt),
    },
  });

  return NextResponse.json(updatedClient);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const client = await prisma.client.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!client)
    return NextResponse.json({ error: "Invalid client" }, { status: 404 });

  await prisma.client.delete({
    where: { id: client.id },
  });

  return NextResponse.json({});
}
