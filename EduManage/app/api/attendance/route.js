import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const attendance = await prisma.attendance.findMany({
    include: {
      student: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      date: "desc"
    }
  });

  return NextResponse.json(attendance);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const attendance = await prisma.attendance.create({
      data: {
        studentId: Number(body.studentId),
        subject: body.subject,
        status: body.status
      }
    });

    return NextResponse.json(attendance, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}