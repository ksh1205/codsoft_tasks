import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: true,
        attendance: true,
        results: {
          include: {
            exam: true
          }
        },
        fees: true
      },
      orderBy: {
        id: "desc"
      }
    });

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const password = await import("bcryptjs").then(
      (bcrypt) => bcrypt.default.hash(body.password || "student123", 10)
    );

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash: password,
        role: "STUDENT"
      }
    });

    const student = await prisma.student.create({
      data: {
        userId: user.id,
        rollNo: body.rollNo,
        department: body.department,
        semester: Number(body.semester),
        phone: body.phone
      },
      include: {
        user: true
      }
    });

    return NextResponse.json(student, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}