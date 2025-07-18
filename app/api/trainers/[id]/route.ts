import { trainerSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const validation = trainerSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const trainer = await prisma.trainer.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!trainer)
    return NextResponse.json({ error: "Invalid trainer" }, { status: 404 });

  const updatedTrainer = await prisma.trainer.update({
    where: { id: trainer.id },
    data: {
      name: body.name,
      canTakeGroup: body.canTakeGroup,
      canTakePersonal: body.canTakePersonal,
      shift: body.shift,
      specialization: body.specialization,
    },
  });

  return NextResponse.json(updatedTrainer);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const trainer = await prisma.trainer.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!trainer)
    return NextResponse.json({ error: "Invalid trainer" }, { status: 404 });

  await prisma.trainer.delete({
    where: { id: trainer.id },
  });

  return NextResponse.json({});
}
