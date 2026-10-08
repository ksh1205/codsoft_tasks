"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmployerPage() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full Time",
    salary: "",
    description: "",
    requirements: ""
  });

  async function loadData() {
    const jobsResponse = await fetch("/api/jobs");
    const applicationsResponse =
      await fetch("/api/applications");

    setJobs(await jobsResponse.json());
    setApplications(await applicationsResponse.json());
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createJob(e) {
    e.preventDefault();

    await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        employerId: 1
      })
    });

    alert("Job posted successfully!");

    setForm({
      title: "",
      company: "",
      location: "",
      type: "Full Time",
      salary: "",
      description: "",
      requirements: ""
    });

    loadData();
  }

  async function updateApplication(id, status) {
    await fetch("/api/applications", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        status
      })
    });

    loadData();
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <nav className="bg-gray-900 text-white px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between">

          <Link
            href="/"
            className="text-2xl font-bold"
          >
            💼 CareerHub
          </Link>

          <span>
            Employer Dashboard
          </span>

        </div>
      </nav>


      <section className="max-w-6xl mx-auto px-6 py-10">

        {/* STATISTICS */}

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Jobs Posted
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {jobs.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Applications
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {applications.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Active Platform
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ✓
            </h2>
          </div>

        </div>


        {/* CREATE JOB */}

        <div className="bg-white rounded-xl p-8 mt-8">

          <h2 className="text-2xl font-bold">
            Post a New Job
          </h2>

          <form
            onSubmit={createJob}
            className="grid md:grid-cols-2 gap-4 mt-6"
          >

            <input
              required
              className="border p-3 rounded-lg"
              placeholder="Job Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value
                })
              }
            />

            <input
              required
              className="border p-3 rounded-lg"
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                setForm({
                  ...form,
                  company: e.target.value
                })
              }
            />

            <input
              required
              className="border p-3 rounded-lg"
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value
                })
              }
            />

            <select
              className="border p-3 rounded-lg"
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value
                })
              }
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>

            <input
              className="border p-3 rounded-lg"
              placeholder="Salary"
              value={form.salary}
              onChange={(e) =>
                setForm({
                  ...form,
                  salary: e.target.value
                })
              }
            />

            <input
              className="border p-3 rounded-lg"
              placeholder="Requirements"
              value={form.requirements}
              onChange={(e) =>
                setForm({
                  ...form,
                  requirements: e.target.value
                })
              }
            />

            <textarea
              required
              className="border p-3 rounded-lg md:col-span-2"
              rows="4"
              placeholder="Job Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
            />

            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold md:col-span-2"
            >
              + Post Job
            </button>

          </form>

        </div>


        {/* APPLICATIONS */}

        <div className="bg-white rounded-xl p-8 mt-8">

          <h2 className="text-2xl font-bold">
            Applications
          </h2>

          <div className="space-y-4 mt-6">

            {applications.map((application) => (

              <div
                key={application.id}
                className="border rounded-lg p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg">
                      {application.applicant.name}
                    </h3>

                    <p className="text-gray-500">
                      {application.applicant.email}
                    </p>

                    <p className="text-blue-600 mt-2">
                      {application.job.title}
                    </p>

                  </div>

                  <select
                    value={application.status}
                    onChange={(e) =>
                      updateApplication(
                        application.id,
                        e.target.value
                      )
                    }
                    className="border rounded p-2 h-fit"
                  >
                    <option value="APPLIED">
                      Applied
                    </option>

                    <option value="SHORTLISTED">
                      Shortlisted
                    </option>

                    <option value="INTERVIEW">
                      Interview
                    </option>

                    <option value="SELECTED">
                      Selected
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>
                  </select>

                </div>

                {application.coverLetter && (
                  <p className="text-gray-600 mt-4">
                    {application.coverLetter}
                  </p>
                )}

              </div>

            ))}

            {applications.length === 0 && (
              <p className="text-gray-500">
                No applications yet.
              </p>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}