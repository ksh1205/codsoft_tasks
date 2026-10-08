import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const exams = await prisma.exam.findMany({
    include: {
      results: {
        include: {
          student: {
            include: {
              user: true
            }
          }
        }
      }
    },
    orderBy: {
      date: "desc"
    }
  });

  return NextResponse.json(exams);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const exam = await prisma.exam.create({
      data: {
        name: body.name,
        subject: body.subject,
        type: body.type,
        date: new Date(body.date)
      }
    });

    return NextResponse.json(exam, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}