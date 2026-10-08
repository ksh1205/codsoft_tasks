"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [
        studentsResponse,
        teachersResponse,
        attendanceResponse,
        feesResponse
      ] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/teachers"),
        fetch("/api/attendance"),
        fetch("/api/fees")
      ]);

      setStudents(await studentsResponse.json());
      setTeachers(await teachersResponse.json());
      setAttendance(await attendanceResponse.json());
      setFees(await feesResponse.json());
    }

    loadData();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST"
    });

    window.location.href = "/login";
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

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to EduManage administration panel.</p>
          </div>

          <div className="admin-badge">
            ADMIN
          </div>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <span>👨‍🎓</span>
            <div>
              <p>Students</p>
              <h2>{students.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>👨‍🏫</span>
            <div>
              <p>Teachers</p>
              <h2>{teachers.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>📋</span>
            <div>
              <p>Attendance</p>
              <h2>{attendance.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>💰</span>
            <div>
              <p>Fee Records</p>
              <h2>{fees.length}</h2>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Recent Students</h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No.</th>
                  <th>Department</th>
                  <th>Semester</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.user.name}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.department}</td>
                    <td>{student.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="quick-links">
          <Link href="/students">
            Manage Students →
          </Link>

          <Link href="/attendance">
            Manage Attendance →
          </Link>

          <Link href="/exams">
            Manage Examinations →
          </Link>

          <Link href="/fees">
            Manage Fees →
          </Link>
        </section>
      </main>
    </div>
  );
}