"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    type: "MIDTERM",
    date: ""
  });

  async function loadExams() {
    const response = await fetch("/api/exams");
    setExams(await response.json());
  }

  useEffect(() => {
    loadExams();
  }, []);

  async function addExam(e) {
    e.preventDefault();

    await fetch("/api/exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm({
      name: "",
      subject: "",
      type: "MIDTERM",
      date: ""
    });

    loadExams();
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
        <h1>Examination Management</h1>

        <div className="form-card">
          <h2>Create Examination</h2>

          <form
            className="form-grid"
            onSubmit={addExam}
          >
            <input
              placeholder="Exam name"
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
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value
                })
              }
            >
              <option value="MIDTERM">
                Mid Term
              </option>

              <option value="FINAL">
                Final
              </option>

              <option value="UNIT_TEST">
                Unit Test
              </option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value
                })
              }
              required
            />

            <button className="primary-button">
              Create Exam
            </button>
          </form>
        </div>

        <div className="dashboard-section">
          <h2>Examinations</h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Results</th>
                </tr>
              </thead>

              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.name}</td>
                    <td>{exam.subject}</td>
                    <td>{exam.type}</td>
                    <td>
                      {new Date(
                        exam.date
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {exam.results.length}
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