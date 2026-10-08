import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const applications =
    await prisma.application.findMany({
      include: {
        job: true,
        applicant: true
      },
      orderBy: {
        appliedAt: "desc"
      }
    });

  return NextResponse.json(applications);
}

export async function POST(request) {
  try {
    const body = await request.json();

    let applicant =
      await prisma.user.findUnique({
        where: {
          email: body.email
        }
      });

    if (!applicant) {
      applicant =
        await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            passwordHash: "demo-password",
            role: "JOB_SEEKER"
          }
        });
    }

    const existing =
      await prisma.application.findFirst({
        where: {
          jobId: Number(body.jobId),
          applicantId: applicant.id
        }
      });

    if (existing) {
      return NextResponse.json(
        {
          error: "You have already applied for this job."
        },
        {
          status: 400
        }
      );
    }

    const application =
      await prisma.application.create({
        data: {
          jobId: Number(body.jobId),
          applicantId: applicant.id,
          coverLetter: body.coverLetter
        }
      });

    return NextResponse.json(application);

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
export async function PATCH(request) {
  try {
    const body = await request.json();

    const application =
      await prisma.application.update({
        where: {
          id: Number(body.id)
        },
        data: {
          status: body.status
        }
      });

    return NextResponse.json(application);

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