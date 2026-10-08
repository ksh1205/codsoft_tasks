"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeesPage() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    amount: "",
    paid: "",
    dueDate: ""
  });

  async function loadData() {
    const [feesResponse, studentsResponse] =
      await Promise.all([
        fetch("/api/fees"),
        fetch("/api/students")
      ]);

    setFees(await feesResponse.json());
    setStudents(await studentsResponse.json());
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addFee(e) {
    e.preventDefault();

    await fetch("/api/fees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm({
      studentId: "",
      amount: "",
      paid: "",
      dueDate: ""
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
        <h1>Fee Management</h1>

        <div className="form-card">
          <h2>Add Fee Record</h2>

          <form
            className="form-grid"
            onSubmit={addFee}
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
                  {student.user.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Total amount"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value
                })
              }
              required
            />

            <input
              type="number"
              placeholder="Paid amount"
              value={form.paid}
              onChange={(e) =>
                setForm({
                  ...form,
                  paid: e.target.value
                })
              }
            />

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  dueDate: e.target.value
                })
              }
              required
            />

            <button className="primary-button">
              Add Fee
            </button>
          </form>
        </div>

        <div className="dashboard-section">
          <h2>Fee Records</h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Remaining</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>

              <tbody>
                {fees.map((fee) => (
                  <tr key={fee.id}>
                    <td>
                      {fee.student.user.name}
                    </td>

                    <td>₹{fee.amount}</td>

                    <td>₹{fee.paid}</td>

                    <td>
                      ₹{fee.amount - fee.paid}
                    </td>

                    <td>
                      <span className="status">
                        {fee.status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        fee.dueDate
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