import authOptions from "@/app/auth/authOptions";
import { groupClassSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const groupClass = await prisma.groupClass.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!groupClass)
    return NextResponse.json({ error: "Class not found" }, { status: 404 });

  return NextResponse.json(groupClass);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = groupClassSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const groupClass = await prisma.groupClass.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!groupClass)
    return NextResponse.json({ error: "Invalid class" }, { status: 404 });

  const updatedClass = await prisma.groupClass.update({
    where: { id: groupClass.id },
    data: {
      name: body.name,
      gender: body.gender,
      shift: body.shift,
      time: body.time,
      trainerId: body.trainerId,
      days: body.days,
    },
  });

  return NextResponse.json(updatedClass);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const groupClass = await prisma.groupClass.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!groupClass)
    return NextResponse.json({ error: "Invalid class" }, { status: 404 });

  await prisma.groupClass.delete({
    where: { id: groupClass.id },
  });

  return NextResponse.json({});
}
