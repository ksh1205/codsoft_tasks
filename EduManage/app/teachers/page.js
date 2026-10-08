"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: ""
  });

  async function loadTeachers() {
    const response = await fetch("/api/teachers");
    const data = await response.json();
    setTeachers(data);
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  async function addTeacher(e) {
    e.preventDefault();

    const response = await fetch("/api/teachers", {
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
      employeeId: "",
      department: ""
    });

    loadTeachers();
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
        <h1>Teacher Management</h1>

        <div className="form-card">
          <h2>Add Teacher</h2>

          <form
            className="form-grid"
            onSubmit={addTeacher}
          >
            <input
              placeholder="Teacher name"
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
              placeholder="Employee ID"
              value={form.employeeId}
              onChange={(e) =>
                setForm({
                  ...form,
                  employeeId: e.target.value
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

            <button className="primary-button">
              Add Teacher
            </button>
          </form>
        </div>

        <div className="dashboard-section">
          <h2>Teachers</h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.user.name}</td>
                    <td>{teacher.user.email}</td>
                    <td>{teacher.employeeId}</td>
                    <td>{teacher.department}</td>
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