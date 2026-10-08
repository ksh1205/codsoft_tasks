import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const reservations =
    await prisma.reservation.findMany({
      orderBy: {
        date: "asc"
      }
    });

  return NextResponse.json(reservations);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const reservation =
      await prisma.reservation.create({
        data: {
          customerName: body.customerName,
          phone: body.phone,
          date: new Date(body.date),
          guests: Number(body.guests)
        }
      });

    return NextResponse.json(reservation);

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}