import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { trainerSchema } from "@/app/validationSchemas";

export async function GET() {
  const trainers = await prisma.trainer.findMany();
  return NextResponse.json(trainers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = trainerSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const newTrainer = await prisma.trainer.create({
    data: {
      name: body.name,
      specialization: body.specialization,
      shift: body.shift,
      canTakeGroup: body.canTakeGroup,
      canTakePersonal: body.canTakePersonal,
    },
  });

  return NextResponse.json(newTrainer, { status: 201 });
}
