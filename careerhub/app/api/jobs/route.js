import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        employer: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to load jobs"
      },
      {
        status: 500
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const job = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        location: body.location,
        type: body.type,
        salary: body.salary,
        description: body.description,
        requirements: body.requirements,
        employerId: Number(body.employerId)
      }
    });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 400
      }
    );
  }
}