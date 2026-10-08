import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const teachers = await prisma.teacher.findMany({
    include: {
      user: true
    },
    orderBy: {
      id: "desc"
    }
  });

  return NextResponse.json(teachers);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const passwordHash = await bcrypt.hash(
      body.password || "teacher123",
      10
    );

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
        role: "TEACHER"
      }
    });

    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        employeeId: body.employeeId,
        department: body.department
      },
      include: {
        user: true
      }
    });

    return NextResponse.json(teacher, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}