import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
