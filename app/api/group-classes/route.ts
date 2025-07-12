import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import schema from "./schema";

export async function GET() {
  const groupClass = await prisma.groupClass.findMany();

  return NextResponse.json(groupClass);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(z.treeifyError(validation.error), { status: 400 });

  const groupClass = await prisma.groupClass.findUnique({
    where: { name: body.name },
  });
  if (groupClass)
    return NextResponse.json(
      { error: "Class already exists" },
      { status: 400 }
    );

  const newGroupClass = await prisma.groupClass.create({
    data: {
      name: body.name,
      trainerId: body.trainerId,
      time: body.time,
      days: body.days,
      shift: body.shift,
      gender: body.gender,
    },
  });

  return NextResponse.json(newGroupClass);
}
