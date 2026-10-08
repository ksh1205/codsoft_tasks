"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "Computer Science",
    semester: 5,
    phone: ""
  });

  async function loadStudents() {
    const response = await fetch("/api/students");
    const data = await response.json();
    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function addStudent(e) {
    e.preventDefault();

    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    setForm({
      name: "",
      email: "",
      rollNo: "",
      department: "Computer Science",
      semester: 5,
      phone: ""
    });

    loadStudents();
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
        <h1>Student Management</h1>

        <div className="form-card">
          <h2>Add Student</h2>

          <form
            className="form-grid"
            onSubmit={addStudent}
          >
            <input
              placeholder="Student name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              required
            />

            <input
              placeholder="Roll number"
              value={form.rollNo}
              onChange={(e) =>
                setForm({
                  ...form,
                  rollNo: e.target.value
                })
              }
              required
            />

            <input
              placeholder="Department"
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value
                })
              }
              required
            />

            <input
              type="number"
              min="1"
              max="8"
              placeholder="Semester"
              value={form.semester}
              onChange={(e) =>
                setForm({
                  ...form,
                  semester: e.target.value
                })
              }
              required
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
            />

            <button className="primary-button">
              Add Student
            </button>
          </form>
        </div>

        <div className="dashboard-section">
          <h2>Students</h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll No.</th>
                  <th>Department</th>
                  <th>Semester</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.user.name}</td>
                    <td>{student.user.email}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.department}</td>
                    <td>{student.semester}</td>
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