import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const menu = await prisma.menuItem.findMany({
      where: {
        available: true
      },
      include: {
        category: true
      },
      orderBy: {
        id: "asc"
      }
    });

    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load menu" },
      { status: 500 }
    );
  }
}