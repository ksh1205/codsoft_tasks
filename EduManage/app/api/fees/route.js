import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const fees = await prisma.fee.findMany({
    include: {
      student: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      dueDate: "asc"
    }
  });

  return NextResponse.json(fees);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const amount = Number(body.amount);
    const paid = Number(body.paid || 0);

    let status = "PENDING";

    if (paid >= amount) {
      status = "PAID";
    } else if (paid > 0) {
      status = "PARTIAL";
    }

    const fee = await prisma.fee.create({
      data: {
        studentId: Number(body.studentId),
        amount,
        paid,
        dueDate: new Date(body.dueDate),
        status
      }
    });

    return NextResponse.json(fee, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}