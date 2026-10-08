const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@edumanage.com"
    },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@edumanage.com",
      passwordHash: password,
      role: "ADMIN"
    }
  });

  const teacherPassword = await bcrypt.hash("teacher123", 10);

  const teacherUser = await prisma.user.upsert({
    where: {
      email: "teacher@edumanage.com"
    },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "teacher@edumanage.com",
      passwordHash: teacherPassword,
      role: "TEACHER"
    }
  });

  await prisma.teacher.upsert({
    where: {
      userId: teacherUser.id
    },
    update: {},
    create: {
      userId: teacherUser.id,
      employeeId: "T001",
      department: "Computer Science"
    }
  });

  const studentPassword = await bcrypt.hash("student123", 10);

  const studentUser = await prisma.user.upsert({
    where: {
      email: "student@edumanage.com"
    },
    update: {},
    create: {
      name: "Aarav Mehta",
      email: "student@edumanage.com",
      passwordHash: studentPassword,
      role: "STUDENT"
    }
  });

  const student = await prisma.student.upsert({
    where: {
      userId: studentUser.id
    },
    update: {},
    create: {
      userId: studentUser.id,
      rollNo: "CSE001",
      department: "Computer Science",
      semester: 5,
      phone: "9876543210"
    }
  });

  await prisma.attendance.create({
    data: {
      studentId: student.id,
      subject: "Database Management",
      status: "PRESENT"
    }
  });

  await prisma.attendance.create({
    data: {
      studentId: student.id,
      subject: "Computer Networks",
      status: "PRESENT"
    }
  });

  const exam = await prisma.exam.create({
    data: {
      name: "Mid Semester Examination",
      subject: "Database Management",
      type: "MIDTERM",
      date: new Date()
    }
  });

  await prisma.result.create({
    data: {
      studentId: student.id,
      examId: exam.id,
      marks: 82,
      grade: "A"
    }
  });

  await prisma.fee.create({
    data: {
      studentId: student.id,
      amount: 50000,
      paid: 30000,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "PARTIAL"
    }
  });

  console.log("EduManage database seeded successfully.");
  console.log("");
  console.log("ADMIN");
  console.log("Email: admin@edumanage.com");
  console.log("Password: admin123");
  console.log("");
  console.log("TEACHER");
  console.log("Email: teacher@edumanage.com");
  console.log("Password: teacher123");
  console.log("");
  console.log("STUDENT");
  console.log("Email: student@edumanage.com");
  console.log("Password: student123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });