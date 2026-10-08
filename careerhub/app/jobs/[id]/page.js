"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function JobDetails() {
  const params = useParams();

  const [job, setJob] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((jobs) => {
        const found = jobs.find(
          (item) => item.id === Number(params.id)
        );

        setJob(found);
      });
  }, [params.id]);

  async function apply() {
    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    const response = await fetch(
      "/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobId: Number(params.id),
          name,
          email,
          coverLetter
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    alert("Application submitted successfully!");
  }

  if (!job) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b18] text-slate-100">

      <nav className="bg-white shadow-sm px-6 py-5g-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="text-blue-600 font-semibold"
          >
            ← Back to Jobs
          </Link>
        </div>

      </nav>


      <section className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white rounded-xl p-8 shadow-sm">

          <div className="flex justify-between">

            <div>

              <h1 className="text-4xl font-bold">
                {job.title}
              </h1>

              <p className="text-blue-600 text-xl mt-2">
                {job.company}
              </p>

            </div>

            <div className="text-5xl">
              💼
            </div>

          </div>


          <div className="flex gap-3 mt-6">

            <span className="bg-gray-100 px-4 py-2 rounded-lg">
              📍 {job.location}
            </span>

            <span className="bg-gray-100 px-4 py-2 rounded-lg">
              💼 {job.type}
            </span>

          </div>


          <h2 className="text-2xl font-bold mt-10">
            Job Description
          </h2>

          <p className="text-gray-400 mt-3">
            {job.description}
          </p>


          <h2 className="text-2xl font-bold mt-8">
            Requirements
          </h2>

          <p className="text-gray-400 mt-3">
            {job.requirements}
          </p>

        </div>


        <div className="bg-white rounded-xl p-8 shadow-sm mt-8">

          <h2 className="text-2xl font-bold">
            Apply for this job
          </h2>

          <input
            className="w-full border p-3 rounded-lg mt-6"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="w-full border p-3 rounded-lg mt-4"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <textarea
            className="w-full border p-3 rounded-lg mt-4"
            rows="5"
            placeholder="Cover Letter"
            value={coverLetter}
            onChange={(e) =>
              setCoverLetter(e.target.value)
            }
          />

          <button
            onClick={apply}
            className="bg-blue-600 text-white px-7 py-3 rounded-lg mt-5 font-semibold"
          >
            Submit Application
          </button>

        </div>

      </section>

    </main>
  );
}