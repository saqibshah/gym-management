import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
