const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const employer = await prisma.user.upsert({
    where: {
      email: "hr@techcorp.com"
    },
    update: {},
    create: {
      name: "TechCorp HR",
      email: "hr@techcorp.com",
      passwordHash: "demo-password",
      role: "EMPLOYER"
    }
  });

  const jobs = [
    {
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Pune",
      type: "Full Time",
      salary: "₹5-8 LPA",
      description:
        "Build modern and responsive web applications using React and Next.js.",
      requirements:
        "React, JavaScript, HTML, CSS"
    },
    {
      title: "Backend Developer",
      company: "InnovateLabs",
      location: "Bangalore",
      type: "Full Time",
      salary: "₹6-10 LPA",
      description:
        "Develop scalable backend services and REST APIs.",
      requirements:
        "Node.js, Express, SQL, APIs"
    },
    {
      title: "Python Developer Intern",
      company: "DataWorks",
      location: "Remote",
      type: "Internship",
      salary: "₹20,000/month",
      description:
        "Work on Python applications and data processing projects.",
      requirements:
        "Python, SQL, Git"
    },
    {
      title: "AI/ML Engineer",
      company: "AIVision",
      location: "Hyderabad",
      type: "Full Time",
      salary: "₹8-14 LPA",
      description:
        "Develop machine learning models and AI-powered applications.",
      requirements:
        "Python, Machine Learning, TensorFlow"
    },
    {
      title: "Full Stack Developer",
      company: "WebSolutions",
      location: "Mumbai",
      type: "Full Time",
      salary: "₹7-12 LPA",
      description:
        "Develop complete web applications using modern technologies.",
      requirements:
        "React, Node.js, SQL, Git"
    }
  ];

  for (const job of jobs) {
    const existing = await prisma.job.findFirst({
      where: {
        title: job.title,
        company: job.company
      }
    });

    if (!existing) {
      await prisma.job.create({
        data: {
          ...job,
          employerId: employer.id
        }
      });
    }
  }

  console.log("CareerHub database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });