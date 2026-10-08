"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    subject: "",
    status: "PRESENT"
  });

  async function loadData() {
    const [a, s] = await Promise.all([
      fetch("/api/attendance"),
      fetch("/api/students")
    ]);

    setAttendance(await a.json());
    setStudents(await s.json());
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addAttendance(e) {
    e.preventDefault();

    await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm({
      studentId: "",
      subject: "",
      status: "PRESENT"
    });

    loadData();
  }

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>🎓 EduManage</h2>

        <nav>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/students">Students</Link>
          <Link href="/teachers">Teachers</Link>
          <Link href="/attendance">Attendance</Link>
          <Link href="/exams">Examinations</Link>
          <Link href="/fees">Fees</Link>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Attendance Management</h1>

        <div className="form-card">
          <form
            className="form-grid"
            onSubmit={addAttendance}
          >
            <select
              value={form.studentId}
              onChange={(e) =>
                setForm({
                  ...form,
                  studentId: e.target.value
                })
              }
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.user.name} - {student.rollNo}
                </option>
              ))}
            </select>

            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject: e.target.value
                })
              }
              required
            />

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value
                })
              }
            >
              <option value="PRESENT">
                Present
              </option>

              <option value="ABSENT">
                Absent
              </option>

              <option value="LATE">
                Late
              </option>
            </select>

            <button className="primary-button">
              Record Attendance
            </button>
          </form>
        </div>

        <div className="dashboard-section">
          <h2>Attendance Records</h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.student.user.name}
                    </td>

                    <td>{item.subject}</td>

                    <td>
                      <span
                        className={`status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        item.date
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}